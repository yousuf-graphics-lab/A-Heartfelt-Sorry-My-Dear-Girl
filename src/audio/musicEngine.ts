/**
 * "Pakhi" — a romantic generative nocturne, royalty-free and synthesized
 * entirely with the Web Audio API (no audio assets, works offline).
 *
 * Progression (A minor, 66 bpm, cinematic i–VI–III–VII):
 *   Am(add9) – Fmaj7 – Cmaj7 – G6 – Am7 – Fmaj7 – Bm7♭5 – E7
 *
 * Layers: breathing detuned-triangle pads, warm sine bass with soft
 * walking approach notes, a gentle music-box arpeggio with a hint of
 * swing, a singing sine-and-harmonic melody with delayed vibrato and
 * appoggiatura grace notes, and a celesta answering phrase. Swell
 * strings carry the tension bars (G6 and E7). The phrase breathes —
 * crescendoing across the eight bars — over a 3.6s generated reverb.
 */
export type MusicState = 'idle' | 'playing' | 'blocked';

const MUTE_KEY = 'pakhi-music-muted';
const BPM = 66;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;

interface ChordBar {
  bass: number;
  chord: number[];
}

const PROGRESSION: ChordBar[] = [
  { bass: 45, chord: [57, 60, 64, 71] }, // Am(add9) — home
  { bass: 41, chord: [57, 60, 64] },     // Fmaj7 — warm lift
  { bass: 36, chord: [55, 59, 64] },     // Cmaj7 — open harbour
  { bass: 43, chord: [59, 62, 64] },     // G6 — suspended breath
  { bass: 45, chord: [57, 60, 64, 67] }, // Am7 — the turn
  { bass: 41, chord: [57, 60, 64] },     // Fmaj7 — the fall
  { bass: 47, chord: [62, 65, 69] },     // Bm7♭5 — the ache
  { bass: 40, chord: [56, 59, 62] },     // E7 — the elegy, resolving home
];

/** Phrase-level dynamics: the loop blooms from a whisper to a near-climax. */
const BAR_ARC = [0.86, 0.92, 1.0, 1.05, 1.08, 1.14, 1.2, 1.28];

interface MelodyNote {
  bar: number;
  beat: number;
  midi: number;
  len: number;
  /** optional appoggiatura pickup, struck just before the beat */
  grace?: number;
}

/** The singing line — long phrases, appoggiaturas, an ending suspended on E7. */
const MELODY: MelodyNote[] = [
  { bar: 0, beat: 0, midi: 76, len: 1.7 },
  { bar: 0, beat: 2, midi: 72, len: 0.9 },
  { bar: 1, beat: 0, midi: 74, len: 1.2 },
  { bar: 1, beat: 1.6, midi: 76, len: 1.7 },
  { bar: 2, beat: 0.6, midi: 79, len: 1.9 },
  { bar: 2, beat: 3, midi: 76, len: 1.1 },
  { bar: 3, beat: 1, midi: 74, len: 1.0 },
  { bar: 3, beat: 2.4, midi: 71, len: 0.9, grace: 72 },
  { bar: 4, beat: 0, midi: 72, len: 1.8 },
  { bar: 4, beat: 2.2, midi: 74, len: 0.9 },
  { bar: 5, beat: 0.5, midi: 76, len: 2.2 },
  { bar: 6, beat: 0, midi: 77, len: 1.25 },
  { bar: 6, beat: 1.9, midi: 76, len: 0.85 },
  { bar: 7, beat: 0, midi: 71, len: 1.6 },
  { bar: 7, beat: 2, midi: 68, len: 0.85, grace: 69 },
  { bar: 7, beat: 3.1, midi: 69, len: 1.15 },
];

/** A celesta whispering answers between the melody's phrases. */
const COUNTER: MelodyNote[] = [
  { bar: 1, beat: 3.4, midi: 81, len: 0.6 },
  { bar: 3, beat: 0.2, midi: 76, len: 0.7 },
  { bar: 5, beat: 3.2, midi: 83, len: 0.6 },
  { bar: 6, beat: 3.3, midi: 81, len: 0.5 },
];

/** Soft walking approach notes on the bass, beat 4 of every other bar. */
const WALK = [
  { bar: 1, beat: 3.0, midi: 48 }, // fifth of Fmaj7
  { bar: 3, beat: 3.0, midi: 50 }, // fifth of G6
  { bar: 5, beat: 3.0, midi: 48 }, // fifth of Fmaj7
  { bar: 7, beat: 3.0, midi: 56 }, // major third of E7
];

/** Bars that get the swell-strings treatment (the two tension points). */
const SWELL_BARS = new Set([3, 7]);

const midiToFreq = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

class MusicEngine {
  onStateChange?: (state: MusicState) => void;

  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private dryBus: GainNode | null = null;
  private reverbBus: GainNode | null = null;
  private delaySend: GainNode | null = null;
  private scheduler: number | null = null;
  private nextBarTime = 0;
  private barIndex = 0;
  private loopCount = 0;
  private state: MusicState = 'idle';
  private muted = false;
  private gestureListenerAttached = false;

  constructor() {
    try {
      this.muted = typeof window !== 'undefined' && window.localStorage.getItem(MUTE_KEY) === '1';
    } catch {
      this.muted = false;
    }
  }

  getState() {
    return this.state;
  }

  isMuted() {
    return this.muted;
  }

  /** Attempt to start the music. Safe to call any number of times. */
  async tryStart() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
    } catch {
      /* fall through to blocked handling */
    }
    if (ctx.state === 'running') {
      this.beginPlayback();
    } else {
      this.attachGestureListener();
      this.setState('blocked');
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    try {
      window.localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
    } catch {
      /* private mode — preference simply won't persist */
    }
    if (this.ctx && this.master) {
      const t = this.ctx.currentTime;
      const target = muted ? 0 : 0.34;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setValueAtTime(this.master.gain.value, t);
      this.master.gain.linearRampToValueAtTime(target, t + 1.4);
    }
  }

  toggleMute() {
    const next = !this.muted;
    this.setMuted(next);
    return next;
  }

  /* ---------------- internals ---------------- */

  private setState(s: MusicState) {
    if (this.state === s) return;
    this.state = s;
    try {
      this.onStateChange?.(s);
    } catch {
      /* never let UI callbacks break audio */
    }
  }

  private attachGestureListener() {
    if (this.gestureListenerAttached || typeof window === 'undefined') return;
    this.gestureListenerAttached = true;
    const handler = () => {
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('keydown', handler);
      void this.tryStart();
    };
    window.addEventListener('pointerdown', handler, { once: false });
    window.addEventListener('keydown', handler);
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;

    const ctx = new AC();
    this.ctx = ctx;

    // --- master chain: master -> compressor -> destination
    const master = ctx.createGain();
    master.gain.value = 0; // faded in on start
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -21;
    compressor.knee.value = 20;
    compressor.ratio.value = 5;
    compressor.attack.value = 0.012;
    compressor.release.value = 0.3;
    master.connect(compressor);
    compressor.connect(ctx.destination);
    this.master = master;

    // --- dry / reverb / delay buses
    const dry = ctx.createGain();
    dry.gain.value = 0.72;
    dry.connect(master);
    this.dryBus = dry;

    const reverb = ctx.createConvolver();
    reverb.buffer = this.buildImpulseResponse(ctx, 3.6, 2.6);
    const reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.66;
    const reverbBus = ctx.createGain();
    reverbBus.gain.value = 1;
    reverbBus.connect(reverb);
    reverb.connect(reverbGain);
    reverbGain.connect(master);
    this.reverbBus = reverbBus;

    const delay = ctx.createDelay(2.0);
    delay.delayTime.value = BEAT * 0.75; // dotted eighth
    const feedback = ctx.createGain();
    feedback.gain.value = 0.36;
    const delayMix = ctx.createGain();
    delayMix.gain.value = 0.19;
    const delaySend = ctx.createGain();
    delaySend.gain.value = 1;
    delaySend.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(delayMix);
    delayMix.connect(master);
    delayMix.connect(reverbBus);
    this.delaySend = delaySend;

    return ctx;
  }

  private buildImpulseResponse(ctx: AudioContext, seconds: number, decay: number) {
    const rate = ctx.sampleRate;
    const length = Math.floor(rate * seconds);
    const impulse = ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        const t = i / length;
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay) * 0.85;
      }
    }
    return impulse;
  }

  private beginPlayback() {
    const ctx = this.ctx;
    if (!ctx || !this.master) return;
    if (this.scheduler !== null) {
      this.setState('playing');
      return; // already running — never restart the music
    }
    this.nextBarTime = ctx.currentTime + 0.12;
    this.barIndex = 0;
    this.loopCount = 0;

    // soft fade-in, honouring the mute preference
    const target = this.muted ? 0 : 0.34;
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setValueAtTime(this.master.gain.value, ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(target, ctx.currentTime + 3.4);

    this.scheduler = window.setInterval(() => this.tick(), 200);
    this.tick();
    this.setState('playing');
  }

  private tick() {
    const ctx = this.ctx;
    if (!ctx) return;
    const ahead = ctx.currentTime + 1.8;
    while (this.nextBarTime < ahead) {
      const barIdx = this.barIndex % PROGRESSION.length;
      this.scheduleBar(barIdx, this.nextBarTime, this.barIndex);
      this.advanceMelody(barIdx, this.nextBarTime);
      this.advanceCounter(barIdx, this.nextBarTime);
      this.nextBarTime += BAR;
      this.barIndex += 1;
      if (this.barIndex % PROGRESSION.length === 0) {
        this.loopCount += 1;
      }
    }
  }

  private scheduleBar(barIdx: number, when: number, absoluteBar: number) {
    const bar = PROGRESSION[barIdx];
    const arc = BAR_ARC[barIdx] * (1 + Math.min(this.loopCount, 3) * 0.05);

    // --- breathing pad: detuned triangles, blooming attack
    for (const midi of bar.chord) {
      this.padVoice(midiToFreq(midi), when, BAR * 1.06, 0.026, -7);
      this.padVoice(midiToFreq(midi), when, BAR * 1.06, 0.022, 8);
    }

    // --- warm bass on beat 1 (and a whisper on beat 3)
    this.bassVoice(midiToFreq(bar.bass), when, BAR * 0.94, 0.155 * arc);
    this.bassVoice(midiToFreq(bar.bass), when + BEAT * 2, BEAT * 1.6, 0.068 * arc);

    // --- gentle walking approach note
    for (const walk of WALK) {
      if (walk.bar !== barIdx) continue;
      this.bassVoice(midiToFreq(walk.midi), when + walk.beat * BEAT, BEAT * 0.85, 0.075 * arc);
    }

    // --- music-box arpeggio with a soft swing on the off-beats
    const pattern = [0, 1, 2, 3, 2, 1, 2, 3];
    const perNote = [0.082, 0.058, 0.068, 0.092, 0.052, 0.048, 0.062, 0.07];
    pattern.forEach((chordIndex, slot) => {
      const octave = slot === 3 || slot === 7 ? 12 : 0;
      const t = when + slot * BEAT * 0.5 + (slot % 2 === 1 ? BEAT * 0.045 : 0);
      this.musicBoxVoice(midiToFreq(bar.chord[chordIndex] + octave), t, perNote[slot] * arc);
    });

    // --- the seventh shimmers two octaves up at the end of odd bars
    if (absoluteBar % 2 === 1) {
      const sparkle = (bar.chord[3] ?? bar.chord[2]) + 24;
      this.musicBoxVoice(midiToFreq(sparkle), when + BEAT * 3.5, 0.047 * arc, 5.6);
    }

    // --- swell strings on the two tension bars
    if (SWELL_BARS.has(barIdx)) {
      this.stringVoice(midiToFreq(bar.chord[0] + 12), when, BAR * 1.02, 0.02 * arc);
      this.stringVoice(midiToFreq(bar.chord[2] + 12), when, BAR * 1.02, 0.014 * arc);
    }
  }

  private advanceMelody(barIdx: number, barStart: number) {
    for (const note of MELODY) {
      if (note.bar !== barIdx) continue;
      // gentle variation: skip an occasional melody note on later loops
      if (this.loopCount > 1 && (note.bar * 7 + Math.round(note.beat * 10)) % 11 === 0) continue;
      if (note.grace !== undefined) {
        const graceTime = barStart + note.beat * BEAT - 0.125;
        this.melodyVoice(midiToFreq(note.grace), graceTime, 0.085, 0.062);
      }
      const t = barStart + note.beat * BEAT;
      this.melodyVoice(midiToFreq(note.midi), t, note.len * BEAT, 0.152);
    }
  }

  private advanceCounter(barIdx: number, barStart: number) {
    for (const note of COUNTER) {
      if (note.bar !== barIdx) continue;
      // the celesta answers only on later loops — the song grows with you
      if (this.loopCount === 0) continue;
      const t = barStart + note.beat * BEAT;
      this.musicBoxVoice(midiToFreq(note.midi), t, 0.048, 4.6);
    }
  }

  private musicBoxVoice(freq: number, when: number, peak: number, brightness = 3.2) {
    const ctx = this.ctx;
    if (!ctx) return;
    const carrier = ctx.createOscillator();
    carrier.type = 'triangle';
    carrier.frequency.value = freq;

    const shimmer = ctx.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.value = freq * brightness;

    const carrierGain = this.envAt(when, peak, 0.008, 4.4);
    const shimmerGain = this.envAt(when, peak * 0.32, 0.008, 2.1);

    const out = ctx.createGain();
    out.gain.value = 1;
    carrier.connect(carrierGain).connect(out);
    shimmer.connect(shimmerGain).connect(out);
    this.voiceOutletAt(out, when, 0.5, 0.65);

    carrier.start(when);
    shimmer.start(when);
    carrier.stop(when + 4.8);
    shimmer.stop(when + 2.4);
  }

  private padVoice(freq: number, when: number, len: number, peak: number, detuneCents = 0) {
    const ctx = this.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    osc.detune.value = detuneCents;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.linearRampToValueAtTime(peak, when + 1.0);
    gain.gain.setValueAtTime(peak, when + len - 1.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + len);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 980;
    lowpass.Q.value = 0.4;

    osc.connect(gain).connect(lowpass);
    lowpass.connect(this.dryBus!);
    const wet = ctx.createGain();
    wet.gain.value = 0.8;
    lowpass.connect(wet).connect(this.reverbBus!);

    osc.start(when);
    osc.stop(when + len + 0.05);
  }

  private bassVoice(freq: number, when: number, len: number, peak: number) {
    const ctx = this.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.linearRampToValueAtTime(peak, when + 0.06);
    gain.gain.setValueAtTime(peak, when + Math.max(0.1, len - 0.7));
    gain.gain.exponentialRampToValueAtTime(0.0001, when + len);

    osc.connect(gain).connect(this.dryBus!);
    osc.start(when);
    osc.stop(when + len + 0.05);
  }

  private stringVoice(freq: number, when: number, len: number, peak: number) {
    const ctx = this.ctx;
    if (!ctx) return;
    const sawA = ctx.createOscillator();
    sawA.type = 'sawtooth';
    sawA.frequency.value = freq;
    const sawB = ctx.createOscillator();
    sawB.type = 'sawtooth';
    sawB.frequency.value = freq;
    sawB.detune.value = 9;

    // the lowpass blooms open through the middle of the bar, then exhales
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.Q.value = 0.7;
    lowpass.frequency.setValueAtTime(320, when);
    lowpass.frequency.linearRampToValueAtTime(1250, when + len * 0.45);
    lowpass.frequency.linearRampToValueAtTime(430, when + len);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.linearRampToValueAtTime(peak, when + len * 0.42);
    gain.gain.setValueAtTime(peak, when + len * 0.72);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + len);

    sawA.connect(lowpass);
    sawB.connect(lowpass);
    lowpass.connect(gain);
    this.voiceOutletAt(gain, when, 0.9, 0.18);

    sawA.start(when);
    sawB.start(when);
    sawA.stop(when + len + 0.05);
    sawB.stop(when + len + 0.05);
  }

  private melodyVoice(freq: number, when: number, len: number, peak: number) {
    const ctx = this.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const soft = ctx.createOscillator();
    soft.type = 'triangle';
    soft.frequency.value = freq * 2;

    // vibrato that arrives late, like a singer settling into the phrase
    const vibrato = ctx.createOscillator();
    vibrato.type = 'sine';
    vibrato.frequency.value = 5.1;
    const vibratoDepth = ctx.createGain();
    vibratoDepth.gain.setValueAtTime(0, when);
    vibratoDepth.gain.setValueAtTime(0, when + 0.45);
    vibratoDepth.gain.linearRampToValueAtTime(9, when + 1.15);
    vibrato.connect(vibratoDepth).connect(osc.detune);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.linearRampToValueAtTime(peak, when + 0.18);
    gain.gain.setValueAtTime(peak, when + Math.max(0.22, len - 0.35));
    gain.gain.exponentialRampToValueAtTime(0.0001, when + len + 0.3);

    const softGain = ctx.createGain();
    softGain.gain.setValueAtTime(0.0001, when);
    softGain.gain.linearRampToValueAtTime(peak * 0.35, when + 0.18);
    softGain.gain.exponentialRampToValueAtTime(0.0001, when + len + 0.12);

    const out = ctx.createGain();
    out.gain.value = 1;
    osc.connect(gain).connect(out);
    soft.connect(softGain).connect(out);
    this.voiceOutletAt(out, when, 0.82, 0.3);

    vibrato.start(when);
    osc.start(when);
    soft.start(when);
    vibrato.stop(when + len + 0.45);
    osc.stop(when + len + 0.45);
    soft.stop(when + len + 0.25);
  }

  /** Envelope scheduled against a specific time (not currentTime). */
  private envAt(when: number, peak: number, attack: number, decayTime: number) {
    const ctx = this.ctx!;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.linearRampToValueAtTime(peak, when + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + attack + decayTime);
    return gain;
  }

  private voiceOutletAt(voice: GainNode, when: number, reverbAmount: number, delayAmount: number) {
    void when;
    voice.connect(this.dryBus!);
    const wet = this.ctx!.createGain();
    wet.gain.value = reverbAmount;
    voice.connect(wet);
    wet.connect(this.reverbBus!);
    if (delayAmount > 0 && this.delaySend) {
      const dwet = this.ctx!.createGain();
      dwet.gain.value = delayAmount;
      voice.connect(dwet);
      dwet.connect(this.delaySend);
    }
  }
}

export const musicEngine = new MusicEngine();
