/* @refresh reload */
import { render } from "solid-js/web";

import { ExampleDApp } from "./ExampleDApp";

const root = document.getElementById("root");

render(() => <ExampleDApp />, root!);
