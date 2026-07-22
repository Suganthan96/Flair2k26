"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    audio.play().catch(() => {
      // Autoplay with sound is blocked until the user interacts; that's fine.
    });
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.muted = false;
      audio.play().catch(() => {});
      setPlaying(true);
    } else if (audio.muted) {
      audio.muted = false;
      setPlaying(true);
    } else {
      audio.muted = true;
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/mp3/bg_music.MP3" loop muted autoPlay />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Mute background music" : "Play background music"}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-avenger-red to-avenger-purple text-white shadow-lg shadow-avenger-red/30 transition-transform hover:scale-105"
      >
        {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}
