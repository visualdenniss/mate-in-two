import React from 'react';
import { HiDownload } from 'react-icons/hi';
import { toast } from 'sonner';

const Download = ({ fen, id }) => {
  const downloadFen = async () => {
    try {
      const encodedFen = encodeURIComponent(fen);

      const lichessUrl = `https://lichess1.org/export/fen.gif?fen=${encodedFen}_-_0_1&color=white`;

      // Fetch image first
      const response = await fetch(lichessUrl);
      if (!response.ok) throw new Error('Failed to fetch image');

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);

      // Trigger download
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = `${id}.gif`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Failed to download FEN image:', error);
      toast.error('Failed to download the FEN image.');
    }
  };

  return (
    <button onClick={downloadFen}>
      <HiDownload />
    </button>
  );
};

export default Download;
