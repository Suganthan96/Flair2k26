"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const events = ["pointerdown", "keydown", "touchstart"] as const;
    const cleanup = () =>
      events.forEach((event) => document.removeEventListener(event, start));

    let started = false;
    function start() {
      if (started) return;
      audio!.volume = 0.4;
      audio!
        .play()
        .then(() => {
          started = true;
          cleanup();
        })
        .catch(() => {});
    }

    events.forEach((event) => document.addEventListener(event, start));

    return cleanup;
  }, []);

  return <audio ref={audioRef} src="/mp3/bg_music.MP3" loop />;
}
