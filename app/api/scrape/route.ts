import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const dynamic = "force-dynamic"; // Ensure it runs server-side, not edge

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" }); // waits for all requests to finish

    // Optional: wait for a selector that confirms content has loaded
    await page.waitForSelector(".job-title", { timeout: 10000 });

    const scrapedData = await page.evaluate(() => {
      const company =
        document.querySelector(".company")?.textContent?.trim() || "Datavant";
      const identifier =
        document.querySelector(".identifier")?.textContent?.trim() || "";
      const employee_type =
        document.querySelector(".employee-type")?.textContent?.trim() || "";
      const title =
        document.querySelector(".job-title")?.textContent?.trim() || "";
      const location =
        document.querySelector(".location")?.textContent?.trim() || "Remote";
      const content = document.querySelector(".content-intro")?.innerHTML || "";
      const contentDiv = document.querySelector("#job-description");
      const job_description = contentDiv ? contentDiv.innerHTML : "";

      return {
        title,
        company,
        job_description,
        identifier,
        employee_type,
        location,
        content,
      };
    });

    await browser.close();

    return NextResponse.json(scrapedData);
  } catch (error) {
    console.error("Puppeteer error:", error);
    return NextResponse.json(
      { error: "Failed to scrape the page." },
      { status: 500 }
    );
  }
}
