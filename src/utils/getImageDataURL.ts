export async function getImageDataURL(
  imageUri: string,
  contrast: number,
  brightness: number,
  hue: number,
  saturation: number
): Promise<string> {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imageUri;
  return new Promise<string>((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.filter = `contrast(${contrast}%) brightness(${brightness}%) hue-rotate(${hue}deg) saturate(${saturation}%)`;

      ctx.drawImage(image, 0, 0);

      const dataUrl = canvas.toDataURL();
      image.remove();
      canvas.remove();

      resolve(dataUrl);
    };
  });
}
