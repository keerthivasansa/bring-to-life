import { Ai } from "@cloudflare/ai";
import { AiTextGenerationOutput } from "@cloudflare/ai/dist/ai/tasks/text-generation";

function isStream(obj: AiTextGenerationOutput): obj is ReadableStream {
	return !('response' in obj);
}

async function generateStory(req: Request, ai: Ai) {
	const url = new URL(req.url);

	const objects = url.searchParams.get("objects");

	if (!objects)
		return new Response("Missing objects", { status: 401 });

	const messages = [
		{ role: "system", content: "Imagine the objects given as characters of a story. Fix a theme for the story, start narrating the story, no need to mention any remarks or other words. Just output the story." },
		{
			role: "user",
			content: objects,
		},
	];

	const stream = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
		stream: true,
		messages,
	});

	if (!isStream(stream))
		return;

	return new Response(stream, {
		headers: {
			"content-type": "text/event-stream",
		},
	});
}

export default generateStory;
