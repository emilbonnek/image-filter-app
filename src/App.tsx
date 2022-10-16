import { Component, createSignal, Show } from "solid-js";
import toast, { Toaster } from "solid-toast";
import styles from "./App.module.css"; // Import css modules stylesheet as styles

const App: Component = () => {
  const [imageUrl, setImageUrl] = createSignal<string | null>(null);

  const [contrast, setContrast] = createSignal(100);
  const [brightness, setBrightness] = createSignal(100);
  const [hue, setHue] = createSignal(0);
  const [saturate, setSaturate] = createSignal(100);

  function handleUpload(event: Event) {
    // Get filelist from event
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList?.length !== 1) {
      toast.error("Oops! Something went wrong.");
      return;
    }

    // Get first
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
            <input type="file" accept="image/*" onChange={handleUpload} />
          }
        >
          <button onClick={(e) => setImageUrl(null)}>Clear image</button>
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
                min="0"
                max="200"
                value={contrast()}
              />
            </label>
            <label>
              Brightness
              <input
                class={styles.slider}
                onInput={(e) => setBrightness(e.currentTarget.valueAsNumber)}
                type="range"
                min="0"
                max="200"
                value={brightness()}
              />
            </label>
            <label>
              Hue
              <input
                class={styles.slider}
                onInput={(e) => setHue(e.currentTarget.valueAsNumber)}
                type="range"
                min="-180"
                max="180"
                value={hue()}
              />
            </label>
            <label>
              Saturate
              <input
                class={styles.slider}
                onInput={(e) => setSaturate(e.currentTarget.valueAsNumber)}
                type="range"
                min="0"
                max="200"
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
