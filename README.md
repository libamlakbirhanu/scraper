# Job Posting Scraper

A modern web application built with Next.js that extracts and displays job posting details from any URL. The application uses Puppeteer for web scraping and provides a clean, responsive UI with dark mode support.

## Features

- URL-based job posting scraping
- Modern, responsive UI with dark mode
- Fully responsive design
- Real-time loading states
- Smooth animations and transitions
- Error handling and user feedback

## Tech Stack

- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- Puppeteer (for web scraping)
- React Components (Shadcn UI)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Enter a job posting URL in the input field
2. Click the "Scrape" button
3. View the extracted job details including:
   - Job Title
   - Company Name
   - Location
   - Employee Type
   - Job Description

## Project Structure

```
├── app/                 # Next.js App Router files
│   ├── api/           # API routes
│   │   └── scrape/    # Job scraping endpoint
│   └── page.tsx       # Main application page
├── components/         # Reusable React components
├── lib/               # Utility functions and configurations
└── public/            # Static assets
```

## Environment Variables

No environment variables are required for local development.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Web scraping powered by [Puppeteer](https://pptr.dev/)
