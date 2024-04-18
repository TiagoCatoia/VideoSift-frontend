import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function zipVideo(videoFile: File) {
  const zip = new JSZip();

  zip.file(videoFile.name, videoFile);

  const zipBlob = await zip
    .generateAsync({ type: "blob" })
    .then(function (content) {
      saveAs(content, "video.zip");
    });
  return zipBlob;
}
