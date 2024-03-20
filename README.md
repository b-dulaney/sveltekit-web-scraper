# 🤠 SvelteKit Web Scraper Demo

Live url: [https://sveltekit-web-scraper.vercel.app/](https://sveltekit-web-scraper.vercel.app/)

Does your SvelteKit application rely on data or images that are scraped from the web?
Are you too lazy to create and deploy a separate Python backend?
Do you think we should program predator drones with JavaScript?

If you answered yes to any of those questions - look no further. This application demonstrates how to use [Puppeteer](https://pptr.dev/) in a serverless environment in order to scrape data from the web.

Using SvelteKit's API routes, you can kick off web scraping jobs from within your SvelteKit code or from a separate location (like a cron job or an API request from another server).

While this is geared toward deploying with serverless functions, the same approach can still be used if you're deploying your SvelteKit app as a Node server with [adapter-node](https://kit.svelte.dev/docs/adapter-node).

## Background

Web scraping in full-stack JavaScript frameworks can be a bit tricky when you're deploying your app in a serverless environment. Most large hosting providers like Vercel and Netlify will bundle and deploy your app as a series of AWS Lambda functions under the hood. This can be great for keeping costs down and scaling to meet demand, but it does limit you when it comes to things like dependency size and long-running functions.

Puppeteer's standard JS library ships with a compatible version of Chrome, which by itself is enough to put us over the standard unzipped size limit for a Lambda function (250MB). Thankfully, Puppeteer provides another library called [puppeteer-core](https://www.npmjs.com/package/puppeteer-core). This library does not install Chrome and allows us to manage the browser ourselves.

To stay under the size limit, we use the [@sparticuz/chromium-min](https://www.npmjs.com/package/@sparticuz/chromium-min) package, a minimal version of Chromium that does not ship with all of the required brotli files. Instead of bundling these files with our Node dependencies, we'll fetch them when an instance of our serverless function is created. Downloading and unpacking the brotli files on the fly from a storage service or CDN allows us to get the functionality needed for web scraping while maintaining a small enough bundle size for serverless deployments.

I would recommend going through the entire [@sparticuz/chromium-min README](https://github.com/Sparticuz/chromium) to understand the version matching requirements and to get a better idea of what's going on under the hood.

This app's `puppeteer-core` version is pinned at `19.6.3` and it uses Chromium `v110.0.1`.

## Deployment Notes

Depending on your hosting provider, you may run into timeout issues when invoking your web scraper API route, mainly if you're on the provider's free tier. A request that cold starts the function and fetches the brotli files may exceed your free tier's timeout limit. Subsequent requests should be faster, provided the function was able to download the Chromium .tar files.

This project is hosted on Vercel's Pro plan, which allows serverless functions to run for up to 5 minutes. For reference, Vercel's hobby plan currently imposes a max runtime of 5 seconds for serverless functions.

You'll need to take this into account when adding web scraping functionality to a project on a serverless deployment.

## Vercel Features

In this demo, we're trying out the new [@vercel/blob](https://github.com/vercel/storage/tree/main/packages/blob#readme) library to store screenshots that we take with Puppeteer.

We're also using Vercel's cron job feature to do a daily cleanup of our blob storage, since we don't want to store these images forever.

To run this project locally or to deploy it yourself, you'll need a Vercel account as well as the Vercel CLI (or just rip out the platform-specific stuff - I won't tell Rich Harris).

## Project Structure

The project was generated with SvelteKit's skeleton template via `npm create svelte@latest`. We're using JSDoc instead of TypeScript because I fat-fingered the option in the CLI and was too lazy to change it 🤘.

We've added a couple of API routes in [src/routes/api](src/routes/api) for our web scraper and daily cleanup cron job.

The UI is located at the root page [src/routes/+page.svelte](src/routes/+page.svelte) and includes a simple form action to send a website's URL to our web scraper API route.

## Getting Started

To run this project locally, start by cloning the repository and installing the dependencies:

```bash
git clone https://github.com/b-dulaney/sveltekit-web-scraper.git
cd sveltekit-web-scraper
npm install
```

Running locally requires that you have a version of Chromium installed on your machine. See [Local Chromium Setup](#local-chromium-setup) for instructions.

You'll want to set up your own git repo and link the project to Vercel. You can find instructions for that in the [Vercel Docs](https://vercel.com/docs/projects/overview#creating-a-project).

Once your project is created, create a new Vercel Blob Store and link it to your project in the Vercel Dashboard. Follow the instructions for using the CLI to link the project locally.

Once you've linked your project, we need to add a few environment variables in the Vercel dashboard. Create the following variables in your Vercel project:

```env
CHROMIUM_DOWNLOAD_URL
CRON_SECRET
LOCAL_CHROMIUM_PATH
```

`CHROMIUM_DOWNLOAD_URL` should exist in all environments. This is the location that your serverless function will download the Chromium brotli files from. You can host these files yourself in S3 or Vercel Blob, or you can just point it at the GitHub releases download. The link for Chromium v110.0.1 is `https://github.com/Sparticuz/chromium/releases/download/v110.0.1/chromium-v110.0.1-pack.tar`

`CRON_SECRET` should only exist in Production. It is sent by Vercel Cron as an auth header when it calls our daily-cleanup function. This makes sure that nobody else can hit our public endpoint and prematurely delete all of our sweet screenshots. Vercel recommends that you make this something hard to guess. So create an alphanumeric password with special characters and make it at least 16 characters in length.

`LOCAL_CHROMIUM_PATH` should exist in all environments. It is the location of the Chromium installation on your machine. You'll need this to develop and test your changes locally. See the section below on how to get the value if you haven't already.

Once you've saved these variables in Vercel, run `vercel env pull .env.development.local` to create the env file in your local project.

With the file created, you should be ready to run the project.

## Local Chromium Setup

If you already have Chromium installed, run `which chromium` to grab the path.

To install a local version of Chromium, run this command:

```bash
npx @puppeteer/browsers install chromium@latest --path /tmp/localChromium
```

Copy the location output by the command, as you'll need to add it to the project's environment variables.

## Running the Project

To start the development server, run this command from the root of the project:

```bash
npm run dev
```

To test the web scraper API route, enter a valid URL into the input field and submit the form. You should see a screenshot of the page appear under the form if the action was successful.

![Example Response](docs/assets/example-response.png)

## Contributing

Contributions, issues, and questions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).
