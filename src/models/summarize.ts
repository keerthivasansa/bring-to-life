import { Ai } from "@cloudflare/ai";

interface TitleBody {
	story: string;
	objects: string;
}

async function generatetTitle(req: Request, ai: Ai) {
	const body: TitleBody = await req.json();

	const result = await ai.run("@cf/facebook/bart-large-cnn", {
		max_length: 512,
		input_text: `Very important: the character names, overall genre of the story. The story: ${body.story}. `
	})
	return new Response(result.summary)
}

export default generatetTitle;
