"use client";

import { useTheme } from "../context/ThemeContext";
import { WavyBackground } from "./ui/wavy-background";

export function HeroWavyBackground({ children }) {
  const { theme } = useTheme();

  return theme === "dark" ? (
    <WavyBackground
      backgroundFill="#0F172A"
      colors={["#ff6b6b", "#4ecdc4", "#3dbedbff", "#a6f5a9ff", "#feca57"]}
      waveWidth={10}
      blur={8}
      speed="fast"
      waveOpacity={0.6}
      containerClassName="h-[400px] w-full rounded-lg overflow-visible"
      className="max-w-4xl mx-auto"
    >
      {children}
    </WavyBackground>
  ) : (
    <WavyBackground
      backgroundFill="#EFF6FF"
      colors={["#38bdf8", "#818cf8", "#c084fc"]}
      waveWidth={10}
      blur={8}
      speed="fast"
      waveOpacity={0.6}
      containerClassName="h-[400px] w-full rounded-lg overflow-visible"
      className="max-w-4xl mx-auto"
    >
      {children}
    </WavyBackground>
  );
}
