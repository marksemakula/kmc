import { useEffect, useRef, useState } from 'react';
import { FaShareAlt, FaLink, FaCheck } from 'react-icons/fa';
import { FaXTwitter, FaLinkedin, FaFacebook, FaTiktok } from 'react-icons/fa6';

export default function ShareButton({ url, title }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tiktokHint, setTiktokHint] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; nothing to fall back to.
    }
  };

  const openShareWindow = (shareUrl) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const shareToX = () => {
    openShareWindow(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
  };

  const shareToLinkedIn = () => {
    openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
  };

  const shareToFacebook = () => {
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  };

  const shareToTikTok = async () => {
    await copyLink();
    setTiktokHint(true);
    setTimeout(() => setTiktokHint(false), 4000);
    window.open('https://www.tiktok.com/upload', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-6 rounded transition duration-300"
      >
        <FaShareAlt /> Share this Job
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 p-2">
          <button
            type="button"
            onClick={copyLink}
            className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-700 text-sm"
          >
            {copied ? <FaCheck className="text-secondary" /> : <FaLink className="text-gray-400" />}
            {copied ? 'Link copied!' : 'Copy link'}
          </button>
          <button
            type="button"
            onClick={shareToX}
            className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-700 text-sm"
          >
            <FaXTwitter className="text-gray-800" /> Share on X
          </button>
          <button
            type="button"
            onClick={shareToLinkedIn}
            className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-700 text-sm"
          >
            <FaLinkedin className="text-[#0A66C2]" /> Share on LinkedIn
          </button>
          <button
            type="button"
            onClick={shareToFacebook}
            className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-700 text-sm"
          >
            <FaFacebook className="text-[#1877F2]" /> Share on Facebook
          </button>
          <button
            type="button"
            onClick={shareToTikTok}
            className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-700 text-sm"
          >
            <FaTiktok className="text-gray-800" /> Share on TikTok
          </button>
          {tiktokHint && (
            <p className="text-xs text-gray-500 px-3 pt-1">
              Link copied — paste it into your TikTok caption or bio.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
