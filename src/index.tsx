/* @refresh reload */
import { render } from "solid-js/web";
import "github-corner-element";

import "./index.css";
import App from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
