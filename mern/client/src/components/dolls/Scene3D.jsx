/**
 * Scene3D — scroll-driven Three.js r128 scene, ported from buildScene()
 * in the original index__6.html. Torus-knot intro, About solids + swarm,
 * Expertise cubes, Skills gyroscope, Highlights planets, Education tunnel,
 * Contact core, floating shapes / hearts / stars, particle field, camera
 * stops per section, HUD, mouse parallax and theme colours.
 * Renders only when mode === '3d'; the parent keeps it mounted and the
 * loop paused in 2D mode. prefers-reduced-motion defaults to 2D (parent).
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { makeDoll, heartGeo, starGeo } from './doll3d';

const IDS = ['top', 'about', 'expertise', 'skills', 'highlights', 'education', 'contact'];
const LABELS = ['Intro', 'About', 'Expertise', 'Skills', 'Highlights', 'Education', 'Contact'];
const ZS = [9, -14, -38, -62, -84, -106, -136];
const COLORS = {
  dark: { a: 0xc084fc, b: 0xf472b6, c: 0xa78bfa, pts: 0xfbcfe8, fog: 0x150a24 },
  light: { a: 0xc026d3, b: 0xec4899, c: 0x9333ea, pts: 0xf472b6, fog: 0xfff4fb },
};

export default function Scene3D({ mode, theme, onSection }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const modeRef = useRef(mode);
  const themeRef = useRef(theme);
  modeRef.current = mode;
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || stateRef.current) return undefined;
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 820px)').matches;
    const root = document.documentElement;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile }); } catch (_e) { return undefined; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 200);
    camera.position.set(0, 0, 9);
    const cur = COLORS[root.getAttribute('data-theme')] || COLORS.dark;
    scene.fog = new THREE.Fog(cur.fog, 14, 70);
    scene.add(new THREE.AmbientLight(0xffffff, 0.62));
    const sun = new THREE.DirectionalLight(0xffffff, 0.5); sun.position.set(4, 6, 8); scene.add(sun);
    const rim = new THREE.PointLight(0xff9fd4, 0.35, 40); rim.position.set(-4, 2, 6); scene.add(rim);
    const mats = { a: [], b: [], c: [] }; const spinners = []; const dolls = [];
    const wire = (role, op) => { const m = new THREE.MeshBasicMaterial({ color: cur[role], wireframe: true, transparent: true, opacity: op }); mats[role].push(m); return m; };
    const solid = (role, op) => { const m = new THREE.MeshBasicMaterial({ color: cur[role], transparent: true, opacity: op }); mats[role].push(m); return m; };
    function place(o, x, y, z, sx, sy, sz) {
      o.position.set(x, y, z); scene.add(o);
      if (sx || sy || sz) spinners.push({ o, x: sx || 0, y: sy || 0, z: sz || 0, bx: o.rotation.x, by: o.rotation.y, bz: o.rotation.z });
      return o;
    }
    const mesh = (g, m) => new THREE.Mesh(g, m);
    const ctx = { scene, place, dolls };
    const doll = (o) => makeDoll(THREE, ctx, o);
    function layoutDolls() {
      const W = window.innerWidth; const aspect = W / window.innerHeight; const tn = Math.tan((29 * Math.PI) / 180); const wide = W >= 1200;
      dolls.forEach((d) => {
        if (!d.side || isMobile) return;
        const halfW = tn * d.dist * aspect; const gut = Math.max((W - 876) / 4, 60);
        d.g.position.x = d.side * (wide ? 1 - gut / (W / 2) : 0.86) * halfW;
        const pxw = W / (2 * halfW); const target = wide ? Math.min(180, ((W - 876) / 2) * 0.78) : 110;
        d.g.scale.setScalar(Math.max(0.45, Math.min(1.1, target / pxw / 2.7)));
      });
    }
    const hx = isMobile ? 0.8 : 3.4; const hs = isMobile ? 0.75 : 1;
    const knot = place(mesh(new THREE.TorusKnotGeometry(1.55, 0.46, isMobile ? 90 : 130, isMobile ? 12 : 18), wire('a', 0.34)), hx, 0.2, -1, 0.16, 0.22, 0);
    knot.scale.setScalar(hs);
    const core = place(mesh(new THREE.IcosahedronGeometry(0.72, 1), wire('b', 0.8)), hx, 0.2, -1, 0, -0.5, 0.3);
    [2.5, 3.1, 3.7].forEach((r, i) => {
      const ring = mesh(new THREE.TorusGeometry(r, 0.014, 8, 120), solid(i === 1 ? 'b' : 'a', 0.5));
      ring.rotation.x = Math.PI / 2.4 + i * 0.28; ring.rotation.y = i * 0.5; ring.scale.setScalar(hs);
      place(ring, hx, 0.2, -1, 0, 0, 0.14 + i * 0.07);
    });
    if (isMobile) doll({ hair: 0x4a2c2a, dress: 0xf9a8d4, acc: 'cap', wave: true, x: 2.5, y: -2.3, z: 0, s: 0.5, face: -0.3 });
    else doll({ hair: 0x4a2c2a, dress: 0xf9a8d4, acc: 'cap', wave: true, x: hx - 0.4, y: -0.75, z: 2.2, s: 0.62, face: -0.35 });
    const ax = isMobile ? 0 : -4.8;
    place(mesh(new THREE.IcosahedronGeometry(2.2, 1), wire('a', 0.3)), ax, 0, -30, 0.12, 0.18, 0);
    place(mesh(new THREE.OctahedronGeometry(1.1, 0), wire('b', 0.75)), ax, 0, -30, -0.3, 0.4, 0.1);
    const swarm = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2;
      const m = mesh(new THREE.TetrahedronGeometry(0.28, 0), wire('c', 0.85));
      m.position.set(Math.cos(ang) * 3.4, Math.sin(ang * 2) * 0.8, Math.sin(ang) * 3.4);
      swarm.add(m);
    }
    place(swarm, ax, 0, -30, 0, 0.25, 0);
    doll({ hair: 0x2f2a4a, dress: 0xc4b5fd, acc: 'book', x: 2.7, y: -0.6, z: -26, s: 0.6, face: isMobile ? -0.3 : 0.45, side: -1, dist: 12 });
    for (let c = 0; c < 4; c++) {
      const cx = isMobile ? (c % 2 ? 3.6 : -3.6) : -5.5 + c * 3.7;
      const cy = (c % 2 ? -2.6 : 2.6) * (isMobile ? 1.4 : 1);
      place(mesh(new THREE.BoxGeometry(1.4, 1.4, 1.4), wire(['a', 'b', 'c', 'a'][c], 0.5)), cx, cy, -50 - (c % 2) * 2, 0.3 + c * 0.05, 0.4, 0.1);
    }
    const sx = isMobile ? 0 : 4.8;
    place(mesh(new THREE.TorusKnotGeometry(1.2, 0.36, 100, 14, 3, 2), wire('a', 0.35)), sx, 0, -74, 0.2, 0.3, 0);
    for (let g = 0; g < 3; g++) {
      const gr = mesh(new THREE.TorusGeometry(2.2 + g * 0.55, 0.018, 8, 100), solid(g === 1 ? 'b' : 'a', 0.55));
      gr.rotation.x = g * 1.05;
      place(gr, sx, 0, -74, 0.2 + g * 0.1, 0.35 - g * 0.08, 0);
    }
    doll({ hair: 0xb4532a, dress: 0xfde68a, acc: 'pencil', x: -2.7, y: -0.6, z: -74, s: 0.6, face: isMobile ? 0.3 : -0.45, side: 1, dist: 12 });
    const hsx = isMobile ? 3.6 : 6.2;
    [[-hsx, 1.2, -96], [hsx, -1.2, -97], [0, 5, -100]].forEach((pz, i) => {
      place(mesh(new THREE.SphereGeometry(1.4, 14, 10), wire(i === 2 ? 'b' : 'a', 0.32)), pz[0], pz[1], pz[2], 0.05, 0.15, 0);
      place(mesh(new THREE.IcosahedronGeometry(0.55, 0), wire('c', 0.85)), pz[0], pz[1], pz[2], 0.3, -0.4, 0);
    });
    for (let t = 0; t < 10; t++) {
      const tr = mesh(new THREE.TorusGeometry(5.6, 0.03, 6, 10), solid(t % 2 ? 'b' : 'a', 0.55));
      place(tr, 0, 0, -100 - t * 3.6, 0, 0, t % 2 ? 0.12 : -0.12);
    }
    place(mesh(new THREE.IcosahedronGeometry(2.6, 1), wire('b', 0.7)), 0, 2, -148, 0.1, 0.25, 0);
    place(mesh(new THREE.TorusKnotGeometry(3.2, 0.8, 120, 16), wire('a', 0.22)), 0, 2, -148, 0.08, 0.12, 0);
    [6, 7.6].forEach((r, i) => {
      const rr = mesh(new THREE.TorusGeometry(r, 0.02, 8, 120), solid(i ? 'a' : 'b', 0.5));
      rr.rotation.x = 1.2 + i * 0.4;
      place(rr, 0, 2, -148, 0, 0, 0.1 + i * 0.05);
    });
    doll({ hair: 0x3b2a20, dress: 0xf9a8d4, acc: 'bow', wave: true, x: -2.9, y: -1.0, z: -148, s: 0.6, face: 0.5, side: -1, dist: 12 });
    doll({ hair: 0xe8b45a, dress: 0xa7f3d0, acc: 'cap', wave: true, x: 2.9, y: -1.0, z: -148, s: 0.6, face: -0.5, side: 1, dist: 12 });
    const geos = [new THREE.IcosahedronGeometry(0.34, 0), new THREE.OctahedronGeometry(0.4, 0), new THREE.TetrahedronGeometry(0.44, 0), new THREE.TorusGeometry(0.3, 0.12, 10, 22)];
    const NS = isMobile ? 8 : 20;
    for (let f = 0; f < NS; f++) {
      const sgn = Math.random() < 0.5 ? -1 : 1;
      place(mesh(geos[f % 4], wire(['a', 'b', 'c'][f % 3], 0.7)), sgn * (5.5 + Math.random() * 7), (Math.random() - 0.5) * 14, 8 - Math.random() * 160, 0.2 + Math.random() * 0.6, 0.2 + Math.random() * 0.6, 0);
    }
    const hg = heartGeo(THREE); const sg = starGeo(THREE);
    const pastel = [0xf9a8d4, 0xfbcfe8, 0xc4b5fd, 0xfde68a, 0xa7f3d0].map((c) => new THREE.MeshLambertMaterial({ color: c }));
    const NH = isMobile ? 7 : 16; const NSt = isMobile ? 6 : 14;
    for (let h = 0; h < NH + NSt; h++) {
      const sg2 = Math.random() < 0.5 ? -1 : 1; const it = mesh(h < NH ? hg : sg, pastel[h % 5]);
      it.scale.setScalar(0.55 + Math.random() * 0.55);
      place(it, sg2 * (4.8 + Math.random() * 7), (Math.random() - 0.5) * 14, 8 - Math.random() * 160, 0, 0.4 + Math.random() * 0.6, 0);
    }
    const N = isMobile ? 500 : 1300; const pos = new Float32Array(N * 3);
    for (let j = 0; j < N; j++) { pos[j * 3] = (Math.random() - 0.5) * 28; pos[j * 3 + 1] = (Math.random() - 0.5) * 18; pos[j * 3 + 2] = 10 - Math.random() * 175; }
    const pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pmat = new THREE.PointsMaterial({ color: cur.pts, size: 0.06, transparent: true, opacity: 0.85 });
    scene.add(new THREE.Points(pgeo, pmat));
    const setTheme = (name) => {
      const c = COLORS[name] || COLORS.dark;
      ['a', 'b', 'c'].forEach((k) => mats[k].forEach((m) => m.color.setHex(c[k])));
      pmat.color.setHex(c.pts); scene.fog.color.setHex(c.fog);
    };
    function resize() {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
      layoutDolls();
    }
    const S = { renderer, scene, camera, spinners, core, hs, dolls, resize, setTheme };
    stateRef.current = S;
    let WP = []; let mx = 0; let my = 0; let hudIdx = -1; let rafId = 0;
    function measure() {
      const vh = window.innerHeight; const maxY = Math.max(0, document.documentElement.scrollHeight - vh);
      WP = [];
      IDS.forEach((id, i) => {
        const el = document.getElementById(id); let y = 0;
        if (id !== 'top' && el) { const r = el.getBoundingClientRect(); y = r.top + window.scrollY + r.height / 2 - vh / 2; }
        y = Math.max(0, Math.min(y, maxY));
        if (i && y <= WP[i - 1].y) y = WP[i - 1].y + 1;
        WP.push({ y, z: ZS[i] });
      });
    }
    function camZ(y) {
      if (!WP.length) return ZS[0];
      if (y <= WP[0].y) return WP[0].z;
      for (let i = 1; i < WP.length; i++) {
        if (y <= WP[i].y) { const a = WP[i - 1]; const b = WP[i]; let t = (y - a.y) / (b.y - a.y); t = t * t * (3 - 2 * t); return a.z + (b.z - a.z) * t; }
      }
      return WP[WP.length - 1].z;
    }
    const onPointer = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', onPointer, { passive: true });
    function frame() {
      rafId = requestAnimationFrame(frame);
      const t = performance.now() / 1000; const cam = S.camera;
      const maxY = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY; const p = Math.min(1, Math.max(0, y / maxY));
      const tz = camZ(y); const dz = tz - cam.position.z;
      cam.position.z += dz * 0.07;
      cam.position.x += ((Math.sin(p * Math.PI * 5) * (isMobile ? 0.25 : 0.45) + mx * 1.2) - cam.position.x) * 0.05;
      cam.position.y += ((Math.cos(p * Math.PI * 4) * 0.7 - my * 0.8) - cam.position.y) * 0.05;
      cam.rotation.z += ((Math.max(-0.12, Math.min(0.12, -dz * 0.003))) - cam.rotation.z) * 0.08;
      cam.rotation.y += ((-mx * 0.06) - cam.rotation.y) * 0.05;
      cam.rotation.x += ((-my * 0.04) - cam.rotation.x) * 0.05;
      S.spinners.forEach((s) => {
        if (s.x) s.o.rotation.x = s.bx + t * s.x;
        if (s.y) s.o.rotation.y = s.by + t * s.y;
        if (s.z) s.o.rotation.z = s.bz + t * s.z;
      });
      S.core.scale.setScalar((1 + Math.sin(t * 1.6) * 0.07) * S.hs);
      S.dolls.forEach((d) => {
        d.g.position.y = d.by + Math.sin(t * 1.4 + d.ph) * 0.12;
        d.g.rotation.y = d.face + Math.sin(t * 0.6 + d.ph) * 0.12;
        d.head.rotation.z = Math.sin(t * 1.1 + d.ph) * 0.06;
        d.head.rotation.y += ((mx * 0.7) - d.head.rotation.y) * 0.06;
        d.head.rotation.x += ((my * 0.5) - d.head.rotation.x) * 0.06;
        d.armR.rotation.z = d.wave ? 1.38 : 0.4 + Math.sin(t * 1.4 + d.ph) * 0.04;
        d.elR.rotation.z = d.wave ? 1.47 + Math.sin(t * 6 + d.ph) * 0.24 : 0.12;
        const eo = ((t + d.ph) % 4.2) > 4.05 ? 0.15 : 1.35;
        d.eyes[0].scale.y = eo; d.eyes[1].scale.y = eo;
      });
      S.renderer.render(S.scene, cam);
      let best = 0; let bd = 1e9;
      for (let k = 0; k < WP.length; k++) { const d = Math.abs(y - WP[k].y); if (d < bd) { bd = d; best = k; } }
      if (best !== hudIdx) { hudIdx = best; if (onSection) onSection(LABELS[best], p); }
      else if (onSection) onSection(LABELS[best], p);
    }
    S.measure = measure; S.start = () => { if (!rafId) { resize(); measure(); frame(); } };
    S.stop = () => { if (rafId) { cancelAnimationFrame(rafId); rafId = 0; } };
    let rzTimer = 0;
    const onResize = () => { clearTimeout(rzTimer); rzTimer = setTimeout(() => { S.resize(); measure(); }, 120); };
    window.addEventListener('resize', onResize);
    window.addEventListener('load', measure);
    const onVis = () => { if (document.hidden) S.stop(); else if (modeRef.current === '3d' && !rafId) frame(); };
    document.addEventListener('visibilitychange', onVis);
    S.cleanup = () => { S.stop(); window.removeEventListener('pointermove', onPointer); window.removeEventListener('resize', onResize); window.removeEventListener('load', measure); document.removeEventListener('visibilitychange', onVis); renderer.dispose(); };
    resize(); measure();
    return () => { if (stateRef.current) { stateRef.current.cleanup(); stateRef.current = null; } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const S = stateRef.current;
    if (!S) return;
    if (mode === '3d') S.start();
    else S.stop();
  }, [mode]);

  useEffect(() => {
    const S = stateRef.current;
    if (S) S.setTheme(theme);
  }, [theme]);

  return <canvas id="scene" ref={canvasRef} aria-hidden="true" />;
}
