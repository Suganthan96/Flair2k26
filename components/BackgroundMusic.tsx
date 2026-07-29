"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const events = ["pointerdown", "keydown", "touchstart"] as const;
    const cleanup = () =>
      events.forEach((event) => document.removeEventListener(event, start));

    let started = false;
    function start(e: Event) {
      if (started) return;
      // The mute button owns its own click entirely (see toggleMute) — if
      // this generic "first interaction" listener also fired for it, one
      // click would both start playback AND immediately toggle it muted.
      if (e.target instanceof Node && buttonRef.current?.contains(e.target)) return;
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

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // First-ever click landing on this button: start playback unmuted
    // rather than toggling mute on audio that was never playing.
    if (audio.paused) {
      audio.volume = 0.4;
      audio.muted = false;
      audio.play().catch(() => {});
      setMuted(false);
      return;
    }

    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <>
      <audio ref={audioRef} src="/mp3/bg_music.MP3" loop />
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute background music" : "Mute background music"}
        // Matches the hamburger button's size/style, positioned just to its
        // left with the same right-offset gap at each breakpoint.
        className="fixed right-24 top-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-avenger-red/60 sm:right-28 sm:top-8"
      >
        {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>
    </>
  );
}
