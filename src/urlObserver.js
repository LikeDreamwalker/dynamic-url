// Define a class for observing URL changes
class UrlObserver {
  constructor(callback) {
    // Store the callback function that will be called when the URL changes
    this.callback = callback;
    // Store the current URL as the previous URL
    this.previousUrl = window.location.href;
    // Start observing URL changes
    this.startObserving();
    // Call the handleUrlChange method when the observer is first created
    this.handleUrlChange();
  }

  // Start observing URL changes
  startObserving() {
    // Listen for the popstate event (triggered by back/forward buttons)
    window.addEventListener("popstate", this.handleUrlChange.bind(this));
    // Listen for the hashchange event (triggered by changes to the URL hash)
    window.addEventListener("hashchange", this.handleUrlChange.bind(this));
    // Override the pushState method to listen for URL changes
    const originalPushState = history.pushState;
    history.pushState = function () {
      originalPushState.apply(this, arguments);
      this.dispatchEvent(new Event("pushstate"));
    }.bind(window.history);
    // Listen for the pushstate event (triggered by pushState method)
    window.addEventListener("pushstate", () => {
      this.handleUrlChange();
    });
    // Override the replaceState method to listen for URL changes
    const originalReplaceState = history.replaceState;
    history.replaceState = function () {
      originalReplaceState.apply(this, arguments);
      this.dispatchEvent(new Event("replacestate"));
    }.bind(window.history);
    // Listen for the replacestate event (triggered by replaceState method)
    window.addEventListener("replacestate", () => {
      this.handleUrlChange();
    });
  }

  // Stop observing URL changes
  stopObserving() {
    window.removeEventListener("popstate", this.handleUrlChange.bind(this));
    window.removeEventListener("hashchange", this.handleUrlChange.bind(this));
    window.removeEventListener("pushstate", this.handleUrlChange.bind(this));
    window.removeEventListener("replacestate", this.handleUrlChange.bind(this));
  }

  // Handle URL changes
  handleUrlChange() {
    // Get the current URL
    const currentUrl = window.location.href;
    // If the current URL is different from the previous URL, call the callback function
    if (currentUrl !== this.previousUrl) {
      console.log("URL has changed:", currentUrl);
      this.callback(currentUrl);
      // Update the previous URL
      this.previousUrl = currentUrl;
    }
  }
}

// Create a new instance of the UrlObserver class with a callback function that logs the new URL to the console
const urlObserver = new UrlObserver((url) => {
  console.log("Callback function called with URL:", url);
});
