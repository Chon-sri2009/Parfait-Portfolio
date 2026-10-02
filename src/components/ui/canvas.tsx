"use client";

type Point = { x: number; y: number };
type SpringNode = Point & { vx: number; vy: number };

const settings = {
  friction: 0.53,
  dampening: 0.045,
  tension: 0.985,
  trails: 36,
  size: 32,
};

class Oscillator {
  private phase: number;

  constructor(
    private readonly offset: number,
    private readonly amplitude: number,
    private readonly frequency: number,
  ) {
    this.phase = Math.random() * Math.PI * 2;
  }

  update() {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

class TrailLine {
  private readonly nodes: SpringNode[];
  private readonly friction: number;

  constructor(private readonly spring: number, start: Point) {
    this.friction = settings.friction + Math.random() * 0.01 - 0.005;
    this.nodes = Array.from({ length: settings.size }, () => ({
      x: start.x,
      y: start.y,
      vx: 0,
      vy: 0,
    }));
  }

  update(target: Point) {
    let spring = this.spring;

    for (let index = 0; index < this.nodes.length; index++) {
      const node = this.nodes[index];
      const previous = this.nodes[index - 1];

      if (previous) {
        node.vx += (previous.x - node.x) * spring;
        node.vy += (previous.y - node.y) * spring;
        node.vx += previous.vx * settings.dampening;
        node.vy += previous.vy * settings.dampening;
      } else {
        node.vx += (target.x - node.x) * spring;
        node.vy += (target.y - node.y) * spring;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= settings.tension;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    const first = this.nodes[0];
    context.beginPath();
    context.moveTo(first.x, first.y);

    for (let index = 1; index < this.nodes.length - 2; index++) {
      const node = this.nodes[index];
      const next = this.nodes[index + 1];
      context.quadraticCurveTo(node.x, node.y, (node.x + next.x) / 2, (node.y + next.y) / 2);
    }

    const penultimate = this.nodes[this.nodes.length - 2];
    const last = this.nodes[this.nodes.length - 1];
    context.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
    context.stroke();
  }
}

/** Attach the pointer trail to one canvas and return its full cleanup function. */
export function renderCanvas(canvas: HTMLCanvasElement, target: HTMLElement) {
  const context = canvas.getContext("2d");
  if (!context) return () => {};

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hue = new Oscillator(255, 24, 0.008);
  const pointer: Point = { x: 0, y: 0 };
  let lines: TrailLine[] = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let lastMove = 0;

  const resize = () => {
    const bounds = target.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = bounds.width;
    height = bounds.height;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const stop = () => {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    context.clearRect(0, 0, width, height);
  };

  const draw = (now: number) => {
    frame = 0;
    if (document.hidden || reducedMotion.matches) {
      stop();
      return;
    }

    const opacity = Math.max(0, 1 - (now - lastMove) / 1800);
    context.clearRect(0, 0, width, height);
    if (opacity === 0) return;

    context.globalCompositeOperation = "lighter";
    context.strokeStyle = `hsla(${Math.round(hue.update())}, 100%, 69%, ${0.016 * opacity})`;
    context.lineWidth = 8;

    for (const line of lines) {
      line.update(pointer);
      line.draw(context);
    }

    context.globalCompositeOperation = "source-over";
    frame = window.requestAnimationFrame(draw);
  };

  const move = (event: PointerEvent) => {
    if (reducedMotion.matches) return;

    const bounds = target.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
    lastMove = performance.now();

    if (lines.length === 0) {
      lines = Array.from({ length: settings.trails }, (_, index) =>
        new TrailLine(0.38 + (index / settings.trails) * 0.07, pointer),
      );
    }

    if (!frame) frame = window.requestAnimationFrame(draw);
  };

  const handleVisibility = () => {
    if (document.hidden) stop();
  };

  const handleMotionPreference = () => {
    if (reducedMotion.matches) stop();
  };

  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(target);
  target.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("visibilitychange", handleVisibility);
  reducedMotion.addEventListener("change", handleMotionPreference);

  return () => {
    stop();
    resizeObserver.disconnect();
    target.removeEventListener("pointermove", move);
    document.removeEventListener("visibilitychange", handleVisibility);
    reducedMotion.removeEventListener("change", handleMotionPreference);
  };
}
