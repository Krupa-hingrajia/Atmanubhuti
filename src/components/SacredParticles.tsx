"use client";

import React, { useEffect, useRef } from "react";

export default function SacredParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle definition: Golden sacred sparks / Hawan embers
    interface Spark {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedY: number;
      speedX: number;
      alpha: number;
      maxAlpha: number;
      fadeSpeed: number;
      growing: boolean;
    }

    const colors = [
      "rgba(255, 107, 0,",   // Saffron
      "rgba(245, 158, 11,",   // Gold
      "rgba(251, 191, 36,",   // Light Gold
      "rgba(234, 88, 12,",    // Deep Amber
    ];

    const sparksCount = 28;
    const sparks: Spark[] = [];

    const createSpark = (): Spark => ({
      x: Math.random() * width,
      y: height + Math.random() * 20,
      radius: Math.random() * 2.2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 0.7 + 0.35,
      speedX: (Math.random() - 0.5) * 0.5,
      alpha: 0,
      maxAlpha: Math.random() * 0.6 + 0.3,
      fadeSpeed: Math.random() * 0.008 + 0.004,
      growing: true,
    });

    for (let i = 0; i < sparksCount; i++) {
      const s = createSpark();
      s.y = Math.random() * height; // Spread across canvas initially
      s.alpha = Math.random() * s.maxAlpha;
      sparks.push(s);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      sparks.forEach((s) => {
        // Move upward gently like sacred fire embers
        s.y -= s.speedY;
        s.x += s.speedX;

        // Subtle swaying
        s.speedX += (Math.random() - 0.5) * 0.05;
        if (s.speedX > 0.6) s.speedX = 0.6;
        if (s.speedX < -0.6) s.speedX = -0.6;

        // Alpha fade in/out
        if (s.growing) {
          s.alpha += s.fadeSpeed;
          if (s.alpha >= s.maxAlpha) {
            s.growing = false;
          }
        } else {
          s.alpha -= s.fadeSpeed * 0.6;
        }

        // Reset if off top or faded out
        if (s.y < -10 || s.alpha <= 0) {
          Object.assign(s, createSpark());
        }

        // Draw glowing ember
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color} ${Math.max(0, s.alpha)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(245, 158, 11, 0.8)";
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-75"
    />
  );
}
