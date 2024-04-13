import type { Ai } from "@cloudflare/ai";

async function generateThumbnail(req: Request, ai: Ai) {
	const formData = await req.formData();

	const url = new URL(req.url)
	const title = formData.get("title");
	// const objects = formData.get("objects") || "invalid";
	// const objects = formData.get("objects");
	if (!title || title instanceof File)
		return;
	const img = await ai.run("@cf/stabilityai/stable-diffusion-xl-base-1.0", {
		prompt: title,
	})

	return new Response(img)
}

export default generateThumbnail;
