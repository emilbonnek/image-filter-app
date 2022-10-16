import { Component, createSignal, Show } from "solid-js";
import toast, { Toaster } from "solid-toast";
import styles from "./App.module.css"; // Import css modules stylesheet as styles
import {
  DEFAULT_BRIGHTNESS,
  DEFAULT_CONTRAST,
  DEFAULT_HUE,
  DEFAULT_SATURATION,
  MAX_BRIGHTNESS,
  MAX_CONTRAST,
  MAX_HUE,
  MAX_SATURATION,
  MIN_BRIGHTNESS,
  MIN_CONTRAST,
  MIN_HUE,
  MIN_SATURATION,
} from "./config";

const App: Component = () => {
  const [imageUrl, setImageUrl] = createSignal<string | null>(null);

  const [contrast, setContrast] = createSignal(DEFAULT_CONTRAST);
  const [brightness, setBrightness] = createSignal(DEFAULT_BRIGHTNESS);
  const [hue, setHue] = createSignal(DEFAULT_HUE);
  const [saturate, setSaturate] = createSignal(DEFAULT_SATURATION);

  function handleUpload(event: Event) {
    // Get filelist from event
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList?.length !== 1) {
      toast.error("Oops! Something went wrong.");
      return;
    }

    // Get first (only) file from filelist
    const file = fileList.item(0) as File;
    if (file.type.indexOf("image") === -1) {
      toast.error("Oops! Something went wrong.");
      return;
    }

    // Create data url from image file
    toast.success("Image loaded successfully!");
    setImageUrl(URL.createObjectURL(file as Blob));
  }

  return (
    <div class={styles.App}>
      <Toaster />
      <div class={styles.Card}>
        <Show
          when={imageUrl()}
          fallback={
            <input
              class={styles.fileInput}
              type="file"
              accept="image/*"
              onChange={handleUpload}
            />
          }
        >
          <button
            onClick={(e) => {
              setImageUrl(null);
              setContrast(DEFAULT_CONTRAST);
              setBrightness(DEFAULT_BRIGHTNESS);
              setHue(DEFAULT_HUE);
              setSaturate(DEFAULT_HUE);
            }}
          >
            Clear image
          </button>
          <img
            class={styles.image}
            style={{
              filter: `contrast(${contrast()}%) brightness(${brightness()}%) hue-rotate(${hue()}deg) saturate(${saturate()}%)`,
            }}
            src={imageUrl() as string}
          ></img>
          <div class={styles.sliderGroup}>
            <label>
              Contrast
              <input
                class={styles.slider}
                onInput={(e) => setContrast(e.currentTarget.valueAsNumber)}
                type="range"
                min={MIN_CONTRAST}
                max={MAX_CONTRAST}
                value={contrast()}
              />
            </label>
            <label>
              Brightness
              <input
                class={styles.slider}
                onInput={(e) => setBrightness(e.currentTarget.valueAsNumber)}
                type="range"
                min={MIN_BRIGHTNESS}
                max={MAX_BRIGHTNESS}
                value={brightness()}
              />
            </label>
            <label>
              Hue
              <input
                class={styles.slider}
                onInput={(e) => setHue(e.currentTarget.valueAsNumber)}
                type="range"
                min={MIN_HUE}
                max={MAX_HUE}
                value={hue()}
              />
            </label>
            <label>
              Saturate
              <input
                class={styles.slider}
                onInput={(e) => setSaturate(e.currentTarget.valueAsNumber)}
                type="range"
                min={MIN_SATURATION}
                max={MAX_SATURATION}
                value={saturate()}
              />
            </label>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default App;
