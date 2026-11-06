/**
 * doll3d.js — makeDoll() ported from the original index__6.html.
 * Builds a chibi girl-student doll from Three.js r128 primitives.
 * Arms match the 2D doll: puffed sleeve, upper arm, elbow, forearm and the
 * very same 2D hand (round palm + thumb + three fingers) drawn from SVG into a
 * flat texture, so the 3D hand looks identical to the 2D one. The right arm
 * bends at the elbow and waves from there (armR = shoulder, armR.userData.el = elbow).
 */
let handMat = null;
function getHandMat(THREE) {
  if (handMat) return handMat;
  const c = document.createElement('canvas'); c.width = 256; c.height = 256;
  const tex = new THREE.CanvasTexture(c); tex.minFilter = THREE.LinearFilter; tex.generateMipmaps = false;
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='158 116 34 34'><g fill='#ffe2d1'>"
    + "<circle cx='177' cy='133' r='10'/><circle cx='166.5' cy='134' r='4'/>"
    + "<circle cx='171' cy='125.5' r='3.2'/><circle cx='178' cy='123.5' r='3.2'/><circle cx='185' cy='127' r='3.2'/></g></svg>";
  const img = new Image();
  img.onload = () => { c.getContext('2d').drawImage(img, 0, 0, 256, 256); tex.needsUpdate = true; };
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  handMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.05, side: THREE.DoubleSide });
  return handMat;
}

export function makeDoll(THREE, ctx, o) {
  const { scene, place, dolls } = ctx;
  const L = (c) => new THREE.MeshLambertMaterial({ color: c });
  const skin = L(0xffe2d1), hair = L(o.hair), dress = L(o.dress), white = L(0xffffff), shoe = L(0xf472b6), pink = L(0xf472b6);
  const dark = new THREE.MeshBasicMaterial({ color: 0x2a1633 });
  const whiteB = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cheek = new THREE.MeshBasicMaterial({ color: 0xff8fb1, transparent: true, opacity: 0.65 });
  const g = new THREE.Group(); const body = new THREE.Group(); g.add(body);
  function M(geo, mat, x, y, z, parent) { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); (parent || body).add(m); return m; }
  const head = new THREE.Group(); head.position.y = 0.55; body.add(head);
  M(new THREE.SphereGeometry(1, 28, 22), skin, 0, 0, 0, head).scale.set(1, 0.92, 0.95);
  M(new THREE.SphereGeometry(1.08, 24, 18), hair, 0, 0.12, -0.2, head).scale.set(1.04, 1.02, 0.95);
  const bangs = M(new THREE.SphereGeometry(1.06, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.44), hair, 0, 0.04, 0.02, head);
  bangs.rotation.x = 0.28; bangs.scale.set(1, 0.95, 0.98);
  [-1, 1].forEach((sd) => {
    M(new THREE.SphereGeometry(0.4, 16, 12), hair, sd * 0.88, 0.82, -0.05, head);
    M(new THREE.SphereGeometry(0.13, 10, 8), pink, sd * 0.88, 0.64, 0.28, head);
  });
  const eyes = [];
  [-0.36, 0.36].forEach((x) => {
    const e = M(new THREE.SphereGeometry(0.13, 12, 10), dark, x, -0.05, 0.89, head); e.scale.set(1, 1.35, 0.5);
    M(new THREE.SphereGeometry(0.045, 8, 6), whiteB, x + 0.035, 0.01, 0.95, head);
    eyes.push(e);
  });
  [-0.58, 0.58].forEach((x) => { M(new THREE.SphereGeometry(0.15, 10, 8), cheek, x, -0.28, 0.78, head).scale.set(1, 0.6, 0.3); });
  const mouth = M(new THREE.TorusGeometry(0.11, 0.02, 6, 14, Math.PI), dark, 0, -0.3, 0.93, head); mouth.rotation.z = Math.PI;
  M(new THREE.CylinderGeometry(0.16, 0.16, 0.2, 10), skin, 0, -0.42, 0);
  M(new THREE.CylinderGeometry(0.34, 0.8, 1.25, 24), dress, 0, -1.15, 0);
  M(new THREE.CylinderGeometry(0.37, 0.4, 0.12, 20), white, 0, -0.55, 0);
  [-0.25, 0.25].forEach((x) => {
    M(new THREE.CylinderGeometry(0.11, 0.11, 0.55, 10), skin, x, -2.05, 0);
    M(new THREE.SphereGeometry(0.19, 12, 8), shoe, x, -2.35, 0.06).scale.set(1, 0.6, 1.4);
  });
  function arm(sd, long) {
    const U = long ? 0.67 : 0.32; const Fo = long ? 0.57 : 0.26;
    const pv = new THREE.Group(); pv.position.set(sd * 0.42, -0.74, 0); body.add(pv);
    M(new THREE.SphereGeometry(0.2, 16, 12), dress, 0, 0, 0, pv);                       // puffed sleeve
    M(new THREE.CylinderGeometry(0.105, 0.105, U, 14), skin, 0, -U / 2, 0, pv);         // upper arm
    const el = new THREE.Group(); el.position.y = -U; pv.add(el);                       // elbow
    M(new THREE.SphereGeometry(0.105, 14, 10), skin, 0, 0, 0, el);
    M(new THREE.CylinderGeometry(0.105, 0.105, Fo, 14), skin, 0, -Fo / 2, 0, el);       // forearm
    M(new THREE.SphereGeometry(0.105, 14, 10), skin, 0, -Fo, 0, el);
    const hp = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.55), getHandMat(THREE));  // the 2D hand, flat
    const th = long ? sd : -sd;                                                          // thumb on the body side, as in 2D
    hp.rotation.z = Math.PI; hp.position.set(th * 0.032, -(Fo + 0.14), 0.13); hp.scale.x = th; el.add(hp);
    pv.userData.el = el;
    return pv;
  }
  const armR = arm(1, !!o.wave); const armL = arm(-1, false);
  armL.rotation.z = -0.4; armL.userData.el.rotation.z = -0.12;
  const acc = o.acc;
  if (acc === 'cap') {
    const capM = L(0x3b1d5a); const gold = L(0xfbbf24);
    M(new THREE.CylinderGeometry(0.62, 0.66, 0.34, 20), capM, 0, 0.95, 0, head);
    M(new THREE.BoxGeometry(1.9, 0.09, 1.9), capM, 0, 1.14, 0, head).rotation.y = 0.785;
    M(new THREE.SphereGeometry(0.07, 8, 6), gold, 0, 1.2, 0, head);
    M(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 6), gold, 0.7, 1.02, 0.7, head);
    M(new THREE.SphereGeometry(0.07, 8, 6), gold, 0.7, 0.72, 0.7, head);
  } else if (acc === 'bow') {
    const cone = new THREE.ConeGeometry(0.28, 0.5, 10);
    M(cone, pink, -0.3, 1.0, 0.25, head).rotation.z = -Math.PI / 2;
    M(cone, pink, 0.3, 1.0, 0.25, head).rotation.z = Math.PI / 2;
    M(new THREE.SphereGeometry(0.12, 10, 8), L(0xec4899), 0, 1.0, 0.25, head);
  } else if (acc === 'book') {
    const bk = new THREE.Group(); bk.position.set(-0.78, -1.45, 0.3); bk.rotation.set(0.5, 0.2, -0.3); body.add(bk);
    M(new THREE.BoxGeometry(0.75, 0.14, 0.95), L(0xa78bfa), 0, 0, 0, bk);
    M(new THREE.BoxGeometry(0.66, 0.12, 0.86), white, 0.03, 0.01, 0, bk);
  } else if (acc === 'pencil') {
    const pc = new THREE.Group(); pc.position.set(-0.85, -1.3, 0.2); pc.rotation.z = 0.35; body.add(pc);
    M(new THREE.CylinderGeometry(0.07, 0.07, 1.2, 8), L(0xfcd34d), 0, 0, 0, pc);
    M(new THREE.ConeGeometry(0.07, 0.22, 8), L(0xfde7c3), 0, -0.7, 0, pc).rotation.z = Math.PI;
    M(new THREE.CylinderGeometry(0.075, 0.075, 0.14, 8), pink, 0, 0.67, 0, pc);
  }
  g.scale.setScalar(o.s || 1);
  place(g, o.x, o.y, o.z);
  dolls.push({ g, head, armR, elR: armR.userData.el, eyes, ph: Math.random() * 6, by: o.y, face: o.face || 0, wave: !!o.wave, side: o.side || 0, dist: o.dist || 12 });
  return g;
}

export function heartGeo(THREE) {
  const sh = new THREE.Shape();
  sh.moveTo(0, -0.5); sh.bezierCurveTo(-0.9, 0.1, -0.5, 0.8, 0, 0.35); sh.bezierCurveTo(0.5, 0.8, 0.9, 0.1, 0, -0.5);
  return new THREE.ExtrudeGeometry(sh, { depth: 0.2, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 2 });
}
export function starGeo(THREE) {
  const sh = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 0.22 : 0.5; const a = (i / 10) * Math.PI * 2 + Math.PI / 2;
    const x = Math.cos(a) * r; const y = Math.sin(a) * r;
    if (i) sh.lineTo(x, y); else sh.moveTo(x, y);
  }
  sh.closePath();
  return new THREE.ExtrudeGeometry(sh, { depth: 0.14, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 1 });
}
