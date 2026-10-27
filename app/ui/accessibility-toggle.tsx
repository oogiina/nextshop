"use client";

import { Accessibility, Type } from "lucide-react";
import { useEffect, useState } from "react";

export default function AccessibilityToggle() {
  const [largeText, setLargeText] = useState(false);
  useEffect(() => {
    const enabled = localStorage.getItem("large-text") === "true";
    document.documentElement.classList.toggle("large-text", enabled);
    setLargeText(enabled);
  }, []);
  function toggleLargeText() {
    const next = !largeText;
    document.documentElement.classList.toggle("large-text", next);
    localStorage.setItem("large-text", String(next));
    setLargeText(next);
  }
  return <div className="accessibility-tools"><button className="accessibility-link" type="button" onClick={toggleLargeText} aria-pressed={largeText} aria-label="Хүртээмжийн том бичвэр асаах, унтраах" title="Хүртээмжийн тохиргоо"><Accessibility size={17} aria-hidden="true" /></button><button className="accessibility-text-button" type="button" onClick={toggleLargeText} aria-pressed={largeText} aria-label="Том бичвэр асаах, унтраах" title="Том бичвэр"><Type size={16} aria-hidden="true" /> A+</button></div>;
}
