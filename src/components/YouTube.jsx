import { useEffect, useState } from 'react';

// A YouTube video that loads nothing until `on`. YouTube's own embed poster is a
// low-res 480px frame, so until play is clicked we show the full-HD thumbnail
// with our own play button, then swap in the player. Turning `on` off resets it
// to the thumbnail. Fills its parent, which sets the size.
export default function YouTube({ id, title, on }) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!on) setPlaying(false);
  }, [on]);
  if (!on) return null;
  // Not every video has a maxres thumbnail; YouTube serves a 120px placeholder instead.
  const fallback = (e) => {
    const img = e.currentTarget;
    if (img.naturalWidth <= 120 && !img.src.includes('hqdefault')) img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  };
  return playing ? (
    <iframe
      className="yt__player"
      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
      title={title}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
    />
  ) : (
    <button type="button" className="yt__poster" aria-label={`Play ${title}`} onClick={() => setPlaying(true)}>
      <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" onLoad={fallback} onError={fallback} />
      <span className="yt__play" />
    </button>
  );
}
