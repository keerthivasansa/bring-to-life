import { Ai } from "@cloudflare/ai";
import { isFile } from "../utils";

async function detectObjects(req: Request, ai: Ai) {
	const formData = await req.formData();

	const img = formData.get("image");

	if (!isFile(img))
		return new Response("Original image not attached", { status: 401 });

	const blob = await img.arrayBuffer();

	const inputs = {
		image: [...new Uint8Array(blob)],
	};

	const [img2text, detection] = await Promise.all([
		ai.run(
			"@cf/unum/uform-gen2-qwen-500m",
			inputs
		),
		ai.run("@cf/facebook/detr-resnet-50", inputs)
	]);

	const objects = detection.filter((object) => object.label && object.score && object.score > 0.15).map(obj => obj.label || "")
	const unique = new Set(objects);

	return Response.json({ description: img2text.description, objects: Array.from(unique) });
}

export default detectObjects;
