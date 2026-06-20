const DEFAULT_MAX_SIZE_BYTES = 1024 * 1024;
const DEFAULT_MAX_DIMENSION = 2048;
const DEFAULT_INITIAL_QUALITY = 0.85;
const DEFAULT_MIN_QUALITY = 0.4;

export interface ImageWebpLoaderOptions {
  maxSizeBytes?: number;
  maxWidth?: number;
  maxHeight?: number;
  initialQuality?: number;
  minQuality?: number;
}

const loadImageElement = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("IMAGE_LOAD_FAILED"));
    };

    image.src = url;
  });

const getScaledDimensions = (
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
) => {
  const ratio = Math.min(maxWidth / width, maxHeight / height, 1);

  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
};

const canvasToWebpBlob = (
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Blob | null> =>
  new Promise((resolve) => {
    canvas.toBlob(resolve, "image/webp", quality);
  });

const toWebpFileName = (fileName: string) =>
  `${fileName.replace(/\.[^.]+$/, "")}.webp`;

const blobToWebpFile = (blob: Blob, fileName: string) =>
  new File([blob], toWebpFileName(fileName), {
    type: "image/webp",
    lastModified: Date.now(),
  });

// canvas를 이용해 이미지를 WebP로 변환하고, 지정 크기(기본 1MB) 이하가 되도록 압축
export const ImageWebpLoader = async (
  file: File,
  options: ImageWebpLoaderOptions = {},
): Promise<File> => {
  const {
    maxSizeBytes = DEFAULT_MAX_SIZE_BYTES,
    maxWidth = DEFAULT_MAX_DIMENSION,
    maxHeight = DEFAULT_MAX_DIMENSION,
    initialQuality = DEFAULT_INITIAL_QUALITY,
    minQuality = DEFAULT_MIN_QUALITY,
  } = options;

  if (!file.type.startsWith("image/")) {
    throw new Error("INVALID_IMAGE_TYPE");
  }

  if (file.size <= maxSizeBytes && file.type === "image/webp") {
    return file;
  }

  const image = await loadImageElement(file);
  let quality = initialQuality;
  let dimensionScale = 1;

  const baseWidth = image.naturalWidth;
  const baseHeight = image.naturalHeight;

  while (true) {
    const { width, height } = getScaledDimensions(
      baseWidth,
      baseHeight,
      maxWidth * dimensionScale,
      maxHeight * dimensionScale,
    );

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("CANVAS_CONTEXT_FAILED");
    }

    context.drawImage(image, 0, 0, width, height);

    const blob = await canvasToWebpBlob(canvas, quality);

    if (!blob) {
      throw new Error("WEBP_CONVERSION_FAILED");
    }

    if (blob.size <= maxSizeBytes) {
      return blobToWebpFile(blob, file.name);
    }

    if (quality > minQuality + 0.05) {
      quality = Math.max(minQuality, quality - 0.1);
      continue;
    }

    if (dimensionScale > 0.3) {
      dimensionScale *= 0.85;
      quality = initialQuality;
      continue;
    }

    return blobToWebpFile(blob, file.name);
  }
};
