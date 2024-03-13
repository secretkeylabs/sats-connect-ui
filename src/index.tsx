/* @refresh reload */
import { render } from "solid-js/web";

import { DApp } from "./App";

const root = document.getElementById("root");

render(() => <DApp />, root!);
