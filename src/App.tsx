import { createFileUploader } from "@solid-primitives/upload";
import { Component, createSignal } from "solid-js";

const App: Component = () => {
  const { files, selectFiles } = createFileUploader({ accept: "image/*" });

  function handleUpload(event: Event) {
    console.log(event);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
    </div>
  );
};

export default App;
