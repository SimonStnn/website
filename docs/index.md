# Simon Stijnen Portfolio

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

This project uses environment variables for configuration, which are stored in the `.env` file.

Key environment variables:

- `NEXT_PUBLIC_SITE_NAME`: The name of the website/author
- `NEXT_PUBLIC_SITE_URL`: The URL of the website
- `NEXT_PUBLIC_SITE_DESCRIPTION`: Description of the site for SEO
- `NEXT_PUBLIC_AUTHOR_NAME`: The author's name
- `NEXT_PUBLIC_AUTHOR_EMAIL`: Contact email address
- `NEXT_PUBLIC_GITHUB_URL`: GitHub profile URL
- `NEXT_PUBLIC_LINKEDIN_URL`: LinkedIn profile URL
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID (optional)

For development, the `.env` file contains default values. No additional environment files are needed.

## Code Formatting

This project uses Prettier with Tailwind CSS class sorting. The configuration ensures consistent code style and automatically sorts Tailwind classes in a logical order.

```bash
# Format all files
npm run format

# Check if files are properly formatted
npm run format:check
```

See the [Linting & Formatting documentation](04-development/08-linting-formatting.md) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment Options

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Deploy with Docker

This project includes Docker configuration for containerized deployment:

```bash
# Run in production mode
docker-compose up website-prod -d
```

For detailed information about Docker deployment, see the [Docker documentation](05-deployment/01-docker-guide.md).
