import { UrlObserver } from "./urlObserver.js";
// Create a new instance of the UrlObserver class with a callback function that logs the new URL to the console
const urlObserver = new UrlObserver((url) => {
  console.log("Callback function called with URL:", url);
});