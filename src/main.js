import App from "./App.vue";
import "./app.css";
import { ViteSSG } from "vite-ssg/single-page";

export const createApp = ViteSSG(App);
