import './app.css'
import App from './App.svelte'
import HMR from "@roxi/routify/hmr";

const app = new App({
  target: document.getElementById('app'),
})

export default app
