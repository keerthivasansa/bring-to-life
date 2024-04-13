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

	const response = await ai.run(
		"@cf/facebook/detr-resnet-50",
		inputs
	);

	const uniqueObj = new Set(response.filter(obj => obj.label && obj.score && obj.score > 0.15).map(obj => obj.label || ""));

	const objects = Array.from(uniqueObj);

	return Response.json(objects);
}

export default detectObjects;
