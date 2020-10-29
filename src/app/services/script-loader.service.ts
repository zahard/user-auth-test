import { Injectable } from '@angular/core';
const loadedResources = new Map();

@Injectable()
export class ScriptLoaderService {

  loadScript(url: string): Promise<void> {
    // If script was already loaded resolve immideately
    if (loadedResources.get(url)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = () => {
        loadedResources.set(url, true);
        document.head.removeChild(script);
        resolve();
      };
      script.onerror = () => reject();
      document.head.appendChild(script);
      script.src = url;
    });
  }
}
