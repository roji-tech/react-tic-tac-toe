// Web Audio API Synthesizer for UI sound effects

class SoundSystem {
  private ctx: AudioContext | null = null;
  public muted = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    return this.muted;
  }

  public playMove(isO = false) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(isO ? 523.25 : 659.25, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isO ? 659.25 : 880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio play error:", e);
    }
  }

  public playWin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.09);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + index * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.09 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + index * 0.09);
        osc.stop(this.ctx.currentTime + index * 0.09 + 0.25);
      });
    } catch (e) {
      console.warn("Audio win error:", e);
    }
  }

  public playDraw() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [440, 415.3, 392];
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.12);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + index * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.12 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + index * 0.12);
        osc.stop(this.ctx.currentTime + index * 0.12 + 0.2);
      });
    } catch (e) {
      console.warn("Audio draw error:", e);
    }
  }
}

export const sounds = new SoundSystem();
