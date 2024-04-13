/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Ai } from '@cloudflare/ai'
import homePage from "../index.html"
import detectObjects from './models/detect';
import generateStory from './models/textGen';
import generateThumbnail from './models/imageGen';
import generatetTitle from './models/summarize';

export interface Env {
	AI: Ai;
}

export default {
	async fetch(request: Request, env: Env) {

		const url = new URL(request.url);
		const ai = env.AI;

		const path = url.pathname.slice(1);

		switch (path) {
			case "detect":
				return detectObjects(request, ai);
			case "story":
				return generateStory(request, ai);
			case "image":
				return generateThumbnail(request, ai);
			case "summarize":
				return generatetTitle(request, ai);
			default:
				return new Response(homePage, {
					headers: {
						'Content-type': "text/html"
					}
				})
		}
	},
};
