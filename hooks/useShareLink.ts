// take the  to share web pages using the native OS sharing options.

import { useEffect, useState } from 'react';

export const useShareLink = () => {
  const [canShare, setCanShare] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState('');

  useEffect(() => {
    if (typeof navigator.share === 'function') {
      setCanShare(true);
    }
  }, []);

  // should we take current url or pass it as an argument
  useEffect(() => {
    if (canShare) {
      navigator.share({
        title: document.title,
        text: document.title,
        url: window.location.href,
      });
    }
  }, [canShare]);

  const shareLink = async (title: string, text: string, url: string) => {
    if (!canShare) {
      console.error('Sharing not supported');
      return;
    }
    try {
      await navigator.share({ title, text, url });
      setCopiedUrl(url);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return { shareLink, canShare, copiedUrl };
};

// Usage
// import { useShareLink } from './hooks/useShareLink';

// function ShareButton() {
//   const { shareLink, canShare, copiedUrl } = useShareLink();

//   return (
//     <button onClick={handleShare} disabled={!canShare}>
//       Share
//     </button>
//   );
// }

// inspired by
// class ShareButton extends HTMLElement {
//   static register(tagName) {
//     if ('customElements' in window && window.navigator.share) {
//       customElements.define(tagName || 'share-button', ShareButton);
//     }
//   }

//   connectedCallback() {
//     this.button.addEventListener('click', this.share);
//   }

//   get button() {
//     return this.querySelector('button');
//   }

//   share = () => {
//     const root = this.getRootNode();
//     window.navigator
//       .share({
//         title: root.title,
//         text: root.title,
//         url: window.location.href,
//       })
//       .then(() => console.log('Page was succesffuly shared'))
//       .catch((error) => console.log(error));
//   };
// }

// ShareButton.register();
