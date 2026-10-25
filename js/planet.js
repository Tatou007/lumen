
const planets = {
  mercury: ["#b9b6ad", "#55545a"],
  venus: ["#f5c477", "#9b542b"],
  mars: ["#ff8759", "#72251c"],
  jupiter: ["#f2d1a0", "#965c40"],
  saturn: ["#ead9a1", "#8e7545"],
  uranus: ["#a5edf0", "#397e99"],
  neptune: ["#639bff", "#14285e"]
};

const key = document.body.dataset.planet;
const host = document.querySelector("[data-three-planet]");
const stage = document.querySelector("[data-planet-stage]");

if (planets[key] && host && stage) {
  const [light, dark] = planets[key];

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "width:100%;height:100%;display:block;cursor:grab;touch-action:none";

  host.replaceChildren(canvas);

  const ctx = canvas.getContext("2d");
  let angle = 0;
  let zoom = 1;
  let dragging = false;
  let previousX = 0;

  function draw() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const radius = Math.min(w * 0.32, h * 0.39) * zoom;
    const x = w / 2;
    const y = h / 2;

    // Planet atmosphere glow
    const glow = ctx.createRadialGradient(
      x, y, radius * 0.7, x, y, radius * 1.5
    );
    glow.addColorStop(0, light + "55");
    glow.addColorStop(1, "#00000000");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Sphere surface
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.clip();

    const gradient = ctx.createLinearGradient(
      x - radius, y - radius, x + radius, y + radius
    );
    gradient.addColorStop(0, light);
    gradient.addColorStop(0.45, dark);
    gradient.addColorStop(1, "#080b18");

    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);

    // Rotating surface bands
    ctx.translate(x, y);
    ctx.rotate(angle);

    for (let i = -5; i <= 5; i++) {
      ctx.beginPath();
      ctx.ellipse(
        0, i * radius * 0.19,
        radius, radius * 0.055,
        0, 0, Math.PI * 2
      );
      ctx.fillStyle = i % 2 ? light + "55" : dark + "66";
      ctx.fill();
    }

    ctx.restore();

    // Three-dimensional shading
    const shade = ctx.createRadialGradient(
      x - radius * 0.4, y - radius * 0.4, radius * 0.05,
      x + radius * 0.25, y + radius * 0.15, radius * 1.2
    );
    shade.addColorStop(0, "#ffffff22");
    shade.addColorStop(0.5, "#00000000");
    shade.addColorStop(1, "#000000ee");

    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Saturn's rings
    if (key === "saturn") {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.3);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.5, radius * 0.4, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "#d9c79a";
      ctx.lineWidth = radius * 0.16;
      ctx.stroke();
      ctx.restore();
    }
  }

  canvas.addEventListener("pointerdown", e => {
    dragging = true;
    previousX = e.clientX;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = "grabbing";
  });

  canvas.addEventListener("pointermove", e => {
    if (!dragging) return;
    angle += (e.clientX - previousX) * 0.01;
    previousX = e.clientX;
    draw();
  });

  function stopDragging() {
    dragging = false;
    canvas.style.cursor = "grab";
  }

  canvas.addEventListener("pointerup", stopDragging);
  canvas.addEventListener("pointercancel", stopDragging);

  canvas.addEventListener("wheel", e => {
    e.preventDefault();
    zoom = Math.max(0.7, Math.min(1.4, zoom - e.deltaY * 0.001));
    draw();
  }, { passive: false });

  new ResizeObserver(draw).observe(host);
  draw();
}

