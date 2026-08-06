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

    // click/touchend/keydown — not pointerdown/touchstart. Per the WHATWG
    // spec, only click, mouseup, pointerup, touchend, and non-modifier
    // keydown count as "activation triggering" user gestures. Chrome is
    // lenient about pointerdown/touchstart, but Safari (iOS in particular)
    // strictly enforces the real list — play() called from those two was
    // silently rejected every time on Safari, and since `started` never
    // flipped to true, background music never actually started there.
    const events = ["click", "keydown", "touchend"] as const;
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
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-avenger-red/60 sm:bottom-8 sm:right-8"
      >
        {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>
    </>
  );
}
