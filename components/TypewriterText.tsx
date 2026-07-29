"use client";

import { useEffect, useState } from "react";
import "./TypewriterText.css";

export default function TypewriterText({
  text,
  speed = 95,
}: {
  text: string;
  speed?: number;
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <>
      {shown}
    </>
  );
}
