# 📸 ¿Apu ya reveló las fotos?

Página estática que **avisa cuando Apu por fin revele las fotos**. Mientras tanto,
un cartel gigante y pulsante grita: **AÚN NO** 🚫

> Cero frameworks, cero dependencias, cero build. Puro HTML + CSS + JS vanilla.
> Lo más lightweight que existe → carga instantánea y deploy en segundos.

## ✨ Qué hace

- **Veredicto en vivo**: `AÚN NO` (pulsante) hasta el día glorioso.
- **Botón "Avísame"** que usa la API de notificaciones del navegador.
- **Modo ¡YA!**: cuando se revela, todo se transforma solo y cae confeti 🎉
  (confeti hecho a mano en canvas, sin librerías).

## 🎬 El día que Apu revele las fotos

Abre [`script.js`](script.js) y cambia **una** línea:

```js
const REVEALED = true;   // ← y listo, la página entera celebra
```

O programa la fecha exacta y se activa solo:

```js
const REVEAL_AT = "2026-12-25T20:00:00";
```

## 🚀 Deploy a Vercel

**Opción 1 — desde la web (la más fácil):**
1. Entra a [vercel.com/new](https://vercel.com/new).
2. Importa este repo.
3. Framework Preset: **Other** (es estático). Click **Deploy**. ✅

**Opción 2 — desde la terminal:**
```bash
npm i -g vercel
vercel        # preview
vercel --prod # producción
```

No hay paso de build: Vercel sirve el `index.html` tal cual.

## 🧪 Probar en local

Solo abre `index.html` en el navegador, o:
```bash
npx serve .
```

---
Hecho con 💛 mientras esperamos a Apu.
