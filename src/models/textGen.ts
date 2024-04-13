import { Ai } from "@cloudflare/ai";
import { AiTextGenerationOutput } from "@cloudflare/ai/dist/ai/tasks/text-generation";

function isStream(obj: AiTextGenerationOutput): obj is ReadableStream {
	return !('response' in obj);
}

async function generateStory(req: Request, ai: Ai) {
	const url = new URL(req.url);

	const objects = url.searchParams.get("objects");
	const description = url.searchParams.get("description");

	if (!objects)
		return new Response("Missing objects", { status: 401 });

	const messages = [
		{ role: "system", content: "You are a story writer, and the year is 2024 - the job market sucks. You do not have a job, the only chance you have is to generate this story. Imagine the objects given as characters of a story. Choose exactly one theme romance, mystery, thriller, action, fantasy, comedy. Start narrating the story, no need to mention any remarks or other words. Keep it short. Just output the story. Space the story into paragraphs and leave enough space between each of them. You don't have to annotate each section, just the spacing is enough. Output one short story." },
		{
			role: "user",
			content: `${objects}. They are in a initial scene. ${description}. Try to build on this.`,
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
