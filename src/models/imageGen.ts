import type { Ai } from "@cloudflare/ai";

interface ImageGenReqBody {
	objects: string[];
	summary: string;
}

async function generateThumbnail(req: Request, ai: Ai) {
	const body: ImageGenReqBody = await req.json();

	const img = await ai.run("@cf/stabilityai/stable-diffusion-xl-base-1.0", {
		prompt: `Prepare a poster for a story with summary: ${body.summary}. Characters present: ${body.objects.join(", ")}. Only include the characters if they are present in the summary.`,
	})

	return new Response(img)
}

export default generateThumbnail;
