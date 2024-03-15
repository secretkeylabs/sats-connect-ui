import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid(), dtsPlugin({ include: "src/lib/**/*" })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: "src/lib/index.ts",
      name: "walletSelector",
      fileName: "index",
    },
  },
});
