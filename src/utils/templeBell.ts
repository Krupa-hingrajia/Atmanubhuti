// Authentic Web Audio API synthesized Indian Temple Brass Bell (मंदिर की घंटी)
export function playTempleBell() {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Harmonic frequencies simulating an auspicious brass temple bell chime
    // Fundamental tone ~528Hz (sacred frequency) + upper metallic bell partials
    const frequencies = [528, 1056, 1584, 2112, 3168];
    const gains = [0.4, 0.25, 0.15, 0.08, 0.03];
    const decays = [3.2, 2.5, 1.8, 1.2, 0.8];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, now);

      // Slight detune for brass bell richness
      if (i > 0) {
        osc.detune.setValueAtTime((Math.random() - 0.5) * 12, now);
      }

      // Bell strike attack & exponential ring decay
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(gains[i], now + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decays[i] + 0.1);
    });
  } catch (e) {
    console.error("Temple bell chime error:", e);
  }
}
