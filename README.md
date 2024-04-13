This project was built for the Cloudflare AI Challenge, 2024.

The project leverages multiple models offered by Cloudflare via their Worker AI. It gets an image, tries to detect objects within the image and generate a description of the image.
It then uses the description to generate a story with the objects as characters and an image that depicts the story.

## Installation Instructions

- Make sure you have both node and npm installed in your system.
- Clone the repository and move into it.
- Run `npm i` to install necessary packages.
- If you want to test locally:
	- Run the command: `npx wrangler dev`
	- Login to your Cloudflare account
	- Visit `http://localhost:8787`
	- NOTE: The SSE events used for story generation might get buffered in the local environment causing the output to only appear as a full text message after a long delay as opposed to a stream of characters. This issue will not be noticed if deployed to Cloudflare.

## Models Used:
Visit [here](https://developers.cloudflare.com/workers-ai/models/) to view a catalogue of all models available for use within the Worker AI platform.

- `@cf/unum/uform-gen2-qwen-500m`: Used to generate text describing the uploaded image.
- `@cf/facebook/detr-resnet-50`: Used to detect objects in the uploaded image.
- `@cf/meta/llama-2-7b-chat-int8`: Used to generate and stream a short story with the detected objects
- `@cf/facebook/bart-large-cnn`: Used to summarize the story to capture the main essence of the story.
- `@cf/stabilityai/stable-diffusion-xl-base-1.0`: Takes the output of the summarizer and uses that to generate an image that tries to capture the meaning and characters of the story.

Future plans:
- I might try and add a model to translate the story in different languages if time permits.
