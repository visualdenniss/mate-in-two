import React from 'react';
import { HiDownload } from 'react-icons/hi';
import { toast } from 'sonner';

const Download = ({ fen, id }) => {
  const downloadFen = async () => {
    try {
      // Call your Netlify function instead of Lichess directly
      const proxyUrl = `/.netlify/functions/download-fen?fen=${encodeURIComponent(fen)}&id=${id}`;

      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Failed to fetch image via proxy');

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = `${id}.gif`;
      a.click();

      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download the image.');
    }
  };

  return (
    <button onClick={downloadFen} title="Download puzzle image">
      <HiDownload />
    </button>
  );
};

export default Download;
