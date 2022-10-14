import { Component, createSignal, Show } from "solid-js";
import toast, { Toaster } from "solid-toast";
import styles from "./App.module.css"; // Import css modules stylesheet as styles

const App: Component = () => {
  const [imageUrl, setImageUrl] = createSignal<string | null>(null);

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
    toast.success("Toast launched successfully!");
    setImageUrl(URL.createObjectURL(file as Blob));
  }

  return (
    <div class={styles.App}>
      <Toaster />
      <Show
        when={imageUrl()}
        fallback={
          <input type="file" accept="image/*" onChange={handleUpload} />
        }
      >
        <div class={styles.imageContainer}>
          <img class={styles.image} src={imageUrl() as string}></img>
        </div>
      </Show>
    </div>
  );
};

export default App;
