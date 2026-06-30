/* =========================================================
   ⚙️  CONFIGURACIÓN — lo único que tienes que tocar
   =========================================================
   Cuando Apu POR FIN revele las fotos, cambia esto a true
   (o pon la fecha exacta en REVEAL_AT) y la página entera
   se transforma sola en "¡YA!" con confeti. 🎉
*/
const REVEALED = false;                 // ← ponlo en true el día glorioso
const REVEAL_AT = null;                  // ← o un ISO: "2026-12-25T20:00:00"
/* ========================================================= */

const $ = (id) => document.getElementById(id);

/* 🤬 Las excusas del vago — rotan solas cada 3.5s */
const EXCUSES = [
  "🎮 Jugando en el PC en vez de pasar las fotos.",
  "🌿 Fumando marihuana, otra vez.",
  "😴 Durmiendo como si tuviera derecho.",
  "📱 En visto desde hace 3 días, el muy sinvergüenza.",
  "🍕 Comiendo y dizque 'ahorita las paso'.",
  "🚬 Trabado, perdido en otra dimensión.",
  "💀 Haciéndose el muerto para no responder.",
  "🎧 Con audífonos puestos ignorando al mundo.",
  "🐌 Cargando las fotos a velocidad de tortuga con pereza.",
  "🤡 Diciendo 'mañana sí' por décima vez.",
  "📺 Viendo videos de gatos en vez de cumplir.",
  "🛌 Acostado mirando el techo, productivísimo.",
  "🤥 Inventando una excusa nueva ahora mismo.",
  "🦥 Siendo el ser humano más perezoso del planeta.",
];

function rotateExcuses() {
  const el = $("excuse");
  let i = Math.floor((Date.now() / 1000) % EXCUSES.length);
  el.textContent = EXCUSES[i];
  setInterval(() => {
    i = (i + 1) % EXCUSES.length;
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = EXCUSES[i];
      el.style.opacity = 1;
    }, 250);
  }, 3500);
}

function isRevealed() {
  if (REVEALED) return true;
  if (REVEAL_AT) return new Date() >= new Date(REVEAL_AT);
  return false;
}

function renderReveal() {
  document.title = "🎉 ¡Apu YA reveló las fotos!";
  const verdict = $("verdict");
  verdict.classList.remove("no");
  verdict.classList.add("yes");
  $("emoji").textContent = "🎉";
  $("word").textContent = "¡POR FIN!";
  $("subtitle").textContent = "¡MILAGRO! El vago de Apu por fin soltó las fotos. Anótalo en el calendario.";
  const excuse = $("excuse");
  if (excuse) excuse.textContent = "✅ Por una vez en su vida, hizo algo. Aplausos.";
  $("ping").style.display = "none";
  confetti();
}

/* Confeti casero, cero librerías 🎊 */
function confetti() {
  const c = document.createElement("canvas");
  c.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:99";
  document.body.appendChild(c);
  const ctx = c.getContext("2d");
  const resize = () => { c.width = innerWidth; c.height = innerHeight; };
  resize(); addEventListener("resize", resize);

  const colors = ["#ffd23f", "#ff4f81", "#2bd576", "#5b8cff", "#f5f3ff"];
  const bits = Array.from({ length: 160 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * -c.height,
    r: 4 + Math.random() * 6,
    color: colors[(Math.random() * colors.length) | 0],
    vy: 2 + Math.random() * 4,
    vx: -2 + Math.random() * 4,
    rot: Math.random() * 6.28,
    vr: -0.2 + Math.random() * 0.4,
  }));

  (function frame() {
    ctx.clearRect(0, 0, c.width, c.height);
    for (const b of bits) {
      b.y += b.vy; b.x += b.vx; b.rot += b.vr;
      if (b.y > c.height + 20) { b.y = -20; b.x = Math.random() * c.width; }
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.fillStyle = b.color;
      ctx.fillRect(-b.r / 2, -b.r / 2, b.r, b.r * 1.6);
      ctx.restore();
    }
    requestAnimationFrame(frame);
  })();
}

/* Botón "avísame": pide permiso de notificación y revisa cada minuto */
function setupPing() {
  const btn = $("ping");
  const hint = $("hint");
  btn.addEventListener("click", async () => {
    if (!("Notification" in window)) {
      hint.textContent = "Tu navegador no soporta notificaciones, pero igual deja la pestaña abierta 😉";
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      hint.textContent = "¡Listo! Te avisaremos en el segundo exacto. No cierres la pestaña 🙏";
      const watch = setInterval(() => {
        if (isRevealed()) {
          clearInterval(watch);
          new Notification("📸 ¡APU REVELÓ LAS FOTOS!", {
            body: "Corre a verlas YA mismo.",
          });
        }
      }, 60000);
    } else {
      hint.textContent = "Sin permiso no podemos notificarte, pero el contador sigue corriendo ⏳";
    }
  });
}

/* Arranque */
$("year").textContent = new Date().getFullYear();
if (isRevealed()) {
  renderReveal();
} else {
  rotateExcuses();
  setupPing();
}
