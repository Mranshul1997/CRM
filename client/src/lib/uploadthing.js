import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

const URL = "https://crm-mpqk.onrender.com/api/uploadthing";

export const { useUploadThing, getRouteConfig, uploadFiles } = generateReactHelpers({
  url: URL,
});
export const UploadButton = generateUploadButton({ url: URL });
export const UploadDropzone = generateUploadDropzone({ url: URL });
