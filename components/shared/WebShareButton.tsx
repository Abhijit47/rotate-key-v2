'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function WebShareButton() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(!!navigator.canShare);
  }, []);

  const handleShare = async () => {
    if (isSupported) {
      try {
        const shareData = {
          title: 'Blog Post Title',
          text: 'Check out this blog post:',
          url: 'https://your-blog-post-url.com',
        };

        await navigator.share(shareData);
        toast.success('Shared successfully');
      } catch (error) {
        toast.error('Error sharing' + error);
      }
    } else {
      // Fallback to other sharing methods
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    const shareUrl = 'https://your-blog-post-url.com';
    window.open(
      `https://www.linkedin.com/sharing/share?url=${shareUrl}`,
      '_blank'
    );
    // Add more social media buttons or a copy-to-clipboard option
    return (
      <div className='flex gap-2'>
        <button
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=https://your-blog-post-url.com`
            )
          }
          className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'>
          Twitter
        </button>
        <button
          onClick={() => {
            window.open(
              `https://www.linkedin.com/sharing/share?url=https://your-blog-post-url.com`
            );
            copyToClipboard();
            alert('Link copied to clipboard');
          }}
          className='px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
          LinkedIn
        </button>
        <button
          onClick={() => {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=https://your-blog-post-url.com`
            );
            copyToClipboard();
          }}
          className='px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800'>
          Facebook
        </button>
      </div>
    );
  };

  return (
    <div className='flex items-center justify-center'>
      <Button onClick={handleShare}>Share Post</Button>
    </div>
  );
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText('https://your-blog-post-url.com');
    toast.success('Link copied to clipboard');
  } catch (error) {
    toast.error('Failed to copy link' + error);
  }
};
