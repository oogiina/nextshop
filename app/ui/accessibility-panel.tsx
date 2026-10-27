"use client";

import { Accessibility, Eye, Keyboard, Type } from "lucide-react";
import { useEffect, useState } from "react";

type FontSize = "small" | "normal" | "large" | "xlarge";

export default function AccessibilityPanel() {
  const [fontSize, setFontSize] = useState<FontSize>("normal");

  useEffect(() => {
    const saved = (localStorage.getItem("font-size") as FontSize) || "normal";
    applyFontSize(saved);
    setFontSize(saved);
  }, []);

  function applyFontSize(value: FontSize) {
    document.documentElement.classList.remove("font-small", "font-large", "font-xlarge");
    if (value !== "normal") document.documentElement.classList.add(`font-${value}`);
  }

  function chooseFontSize(value: FontSize) {
    setFontSize(value);
    applyFontSize(value);
    localStorage.setItem("font-size", value);
  }

  return (
    <section id="accessibility" className="accessibility-section accessibility-top" aria-labelledby="accessibility-heading">
      <div className="accessibility-intro">
        <span className="eyebrow">ХҮРТЭЭМЖТЭЙ ХУДАЛДАА</span>
        <h2 id="accessibility-heading">Хараандаа тохируулж уншаарай.</h2>
        <p>Доорх хэмжээнээс сонгоод энэ дэлгэцийн үсгийг өөрийн хараанд тохируулна уу.</p>
        <div className="font-size-controls" role="group" aria-label="Үсгийн хэмжээ сонгох">
          {(["small", "normal", "large", "xlarge"] as FontSize[]).map((value) => (
            <button key={value} type="button" className={fontSize === value ? "active" : ""} aria-pressed={fontSize === value} onClick={() => chooseFontSize(value)}>
              {value === "small" ? "A−" : value === "normal" ? "A" : value === "large" ? "A+" : "A++"}
            </button>
          ))}
        </div>
      </div>
      <div className="accessibility-features">
        <div><Accessibility size={21} aria-hidden="true" /><span>Хүртээмжтэй бүтэц</span></div>
        <div><Eye size={21} aria-hidden="true" /><span>Өндөр контраст</span></div>
        <div><Type size={21} aria-hidden="true" /><span>Том бичвэр</span></div>
        <div><Keyboard size={21} aria-hidden="true" /><span>Keyboard дэмжлэг</span></div>
      </div>
    </section>
  );
}
