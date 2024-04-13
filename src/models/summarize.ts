import { Ai } from "@cloudflare/ai";

interface TitleBody {
	story: string;
	objects: string;
}

async function generatetTitle(req: Request, ai: Ai) {
	const body: TitleBody = await req.json();

	const result = await ai.run("@cf/facebook/bart-large-cnn", {
		max_length: 512,
		input_text: `The characters of these story are: ${body.objects}, ${body.story}. Also include what the name of each character is in the beginning.`
	})
	return new Response(result.summary)
}

export default generatetTitle;
