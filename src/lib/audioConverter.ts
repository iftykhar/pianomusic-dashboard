import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

let ffmpeg: FFmpeg | null = null;

export const loadFFmpeg = async () => {
    if (ffmpeg) return ffmpeg;

    ffmpeg = new FFmpeg();
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });

    return ffmpeg;
};

export const convertToMp3 = async (file: File): Promise<File> => {
    // If already mp3, return as is
    if (file.type === "audio/mpeg" || file.name.toLowerCase().endsWith(".mp3")) {
        return file;
    }

    try {
        const ffmpegInstance = await loadFFmpeg();
        const inputExtension = file.name.substring(file.name.lastIndexOf("."));
        const inputName = `input${inputExtension}`;
        const outputName = "output.mp3";

        await ffmpegInstance.writeFile(inputName, await fetchFile(file));

        // Basic conversion to mp3
        // -y to overwrite if exists
        await ffmpegInstance.exec(["-i", inputName, outputName]);

        const data = await ffmpegInstance.readFile(outputName);
        const uint8Array = new Uint8Array(
            typeof data === "string" ? new TextEncoder().encode(data) : data
        );
        const mp3Blob = new Blob([uint8Array], { type: "audio/mpeg" });

        // Clean up
        await ffmpegInstance.deleteFile(inputName);
        await ffmpegInstance.deleteFile(outputName);

        const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".mp3";
        return new File([mp3Blob], newFileName, {
            type: "audio/mpeg",
        });
    } catch (error) {
        console.error("Error converting audio to mp3:", error);
        // Return original file as fallback if conversion fails
        return file;
    }
};
