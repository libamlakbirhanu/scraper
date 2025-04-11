import { NextResponse } from "next/server";

import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const jobUrl = body.url;

    if (!jobUrl) {
      return NextResponse.json(
        { error: "Job URL is required" },
        { status: 400 }
      );
    }

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      // headless: "new",
    });

    const page = await browser.newPage();
    await page.goto(jobUrl, { waitUntil: "networkidle0" });

    const rawJobData = await page.evaluate(() => {
      const company = "Datavant";
      const title = document.querySelector("h1")?.textContent?.trim() || "";
      const identifier =
        document.querySelector(".identifier")?.textContent?.trim() || "";
      const location =
        document.querySelector(".location")?.textContent?.trim() || "";
      const employee_type =
        document.querySelector(".employee-type")?.textContent?.trim() || "";
      const job_description =
        document.getElementById("job-description")?.innerHTML || "";

      return {
        title,
        company,
        identifier,
        location,
        employee_type,
        job_description,
      };
    });

    await browser.close();

    const jobData = {
      ...rawJobData,
    };

    return NextResponse.json(jobData);
  } catch (error) {
    console.error("Puppeteer scraping error:", error);
    return NextResponse.json(
      {
        error: "Failed to scrape job data. Try again later.",
      },
      { status: 500 }
    );
  }
}
