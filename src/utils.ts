
export function isFile(obj: any): obj is File{
	return obj instanceof File;
}
