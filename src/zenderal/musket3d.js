// The firearms section's double-barrel flintlock Gewehr with dragonbone stock (public/uploads/zenderal/gewehr.glb,
// Ordo Legionis' mesh exported with
// NifSkope and its PBR textures), loaded on demand by Musket.jsx so three.js stays out of the main bundle. The page
// sets its pose from the scroll: it starts aimed at the viewer, muzzle-on and close, then swings round to lie level in
// profile, muzzle right, rolling once about its barrel on the way. Before that it can stand upright in profile, muzzle
// up and small, as the I of the section's label, then tip forward out of the word into the aimed pose. Once level the page can move it, bring it closer
// and fire it (a recoil kick), and asks where its muzzle is on screen to place the flash.
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Box3,
  DirectionalLight,
  Group,
  MathUtils,
  PMREMGenerator,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const MODEL_URL = `${import.meta.env.BASE_URL}uploads/zenderal/gewehr.glb`;
// Turns the barrel (along the mesh's z, muzzle towards -z, y up) to point along x, muzzle right, when level.
const LEVEL = -Math.PI / 2;

// Mounts the musket into `box`. Calls `onReady` once it's on screen; returns { set(pose), muzzle(), dispose }. The
// pose's `turn` runs 0 (aimed at the viewer) → 1 (level, in profile); `x`/`y` (px from the middle, y down) and
// `zoom` (1 = the level fit, larger is closer) place it, and `kick` (0 → 1 → 0) is the recoil. `stand` (1 → 0) blends
// in from standing upright as a letter: `sx`/`sy` (px from the middle) is the letter's centre and `sh` its height. muzzle() gives the
// muzzle's position in px within `box`, as of the last frame drawn. It only draws when the pose or size changes.
export function mount(box, onReady) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  box.appendChild(renderer.domElement);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.6;

  // The same lights as the sword: a warm key from above right, a gold rim from behind and a cool fill.
  const key = new DirectionalLight(0xffe2b8, 2.4);
  key.position.set(2, 3, 3);
  const rim = new DirectionalLight(0xc9ab76, 4);
  rim.position.set(-3, 1.5, -2.5);
  const fill = new DirectionalLight(0x8fa3c0, 0.6);
  fill.position.set(-3, -1, 2);
  scene.add(key, rim, fill, new AmbientLight(0xffffff, 0.2));

  const camera = new PerspectiveCamera(24, 1, 0.1, 1000);
  // lift: tips the aimed gun up to stand muzzle-up; aim: swings the barrel from the camera round to the side; roll:
  // about the barrel.
  const lift = new Group();
  const aim = new Group();
  const roll = new Group();
  aim.add(roll);
  lift.add(aim);
  scene.add(lift);
  let length = 1;
  let height = 1;

  const pose = { turn: 0, x: 0, y: 0, zoom: 1, kick: 0, stand: 0, sx: 0, sy: 0, sh: 1 };
  const tip = new Vector3();
  const muzzleAt = new Vector3();
  let fitNear = 1;
  let fitW = 1;
  let boxH = 1;
  let dirty = true;

  function resize() {
    const { width, height: h } = box.getBoundingClientRect();
    if (!width || !h) return;
    renderer.setSize(width, h, false);
    boxH = h;
    dirty = true;
    camera.aspect = width / h;
    camera.updateProjectionMatrix();
    // Level, the gun spans 78% of the width; aimed at the viewer, its stock is about half the height, from a camera
    // in front of the muzzle by its own length.
    const half = Math.tan(MathUtils.degToRad(camera.fov / 2));
    fitW = length / 2 / (half * camera.aspect * 0.78);
    fitNear = length / 2 + height / 2 / (half * 0.5);
  }

  let frame = 0;
  let visible = true;
  let loaded = false;
  function tick() {
    frame = requestAnimationFrame(tick);
    if (!visible || !loaded || !dirty) return;
    dirty = false;
    const t = pose.turn;
    const e = t * t * (3 - 2 * t);
    const half = Math.tan(MathUtils.degToRad(camera.fov / 2));
    // Standing, the camera backs off until the gun's length is the letter's height (blended in log space, so the
    // zoom out of the word runs evenly).
    const s = pose.stand * pose.stand * (3 - 2 * pose.stand);
    const standDist = (length * boxH) / (2 * half * Math.max(1, pose.sh));
    const near = MathUtils.lerp(fitNear, fitW, e) / pose.zoom;
    const dist = Math.exp(MathUtils.lerp(Math.log(near), Math.log(standDist), s));
    camera.position.set(0, 0, dist);
    // World units per screen pixel on the gun's plane.
    const unit = (2 * dist * half) / boxH;
    lift.position.set(pose.sx * unit * s, -pose.sy * unit * s, 0);
    lift.rotation.x = (-Math.PI / 2) * s;
    // The recoil shoves the gun back along its barrel and throws the muzzle up.
    aim.position.set(pose.x * unit - pose.kick * 0.06 * length, -pose.y * unit, 0);
    aim.rotation.z = pose.kick * 0.12;
    aim.rotation.y = (-Math.PI / 2) * (1 - e);
    aim.rotation.x = 0.18 * Math.sin(Math.PI * e);
    // Standing, it rolls a quarter turn so its side faces the viewer.
    roll.rotation.x = Math.PI * 2 * e + (Math.PI / 2) * s;
    rim.position.x = -3 + Math.sin(roll.rotation.x) * 2;
    renderer.render(scene, camera);
    muzzleAt.copy(tip);
    roll.localToWorld(muzzleAt).project(camera);
  }

  const seen = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    dirty = true;
  });
  seen.observe(box);
  const sized = new ResizeObserver(resize);
  sized.observe(box);

  let disposed = false;
  new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(MODEL_URL, (gltf) => {
    if (disposed) return;
    const model = gltf.scene;
    const holder = new Group();
    holder.add(model);
    holder.rotation.y = LEVEL;
    const bounds = new Box3().setFromObject(holder);
    holder.position.sub(bounds.getCenter(new Vector3()));
    const size = bounds.getSize(new Vector3());
    length = size.x;
    height = size.y;
    // The muzzle: the middle of the vertices at the far right end, found from the mesh so any gun works.
    holder.updateMatrixWorld(true);
    const ends = [];
    const p = new Vector3();
    model.traverse((o) => {
      if (!o.isMesh) return;
      const at = o.geometry.attributes.position;
      for (let i = 0; i < at.count; i++) {
        p.fromBufferAttribute(at, i).applyMatrix4(o.matrixWorld);
        if (p.x > bounds.max.x + holder.position.x - 0.015 * length) ends.push(p.clone());
      }
    });
    for (const q of ends) tip.add(q);
    tip.divideScalar(ends.length || 1);
    const aniso = renderer.capabilities.getMaxAnisotropy();
    model.traverse((o) => {
      if (o.isMesh) for (const v of Object.values(o.material)) if (v?.isTexture) v.anisotropy = aniso;
    });
    roll.add(holder);
    resize();
    loaded = true;
    dirty = true;
    onReady();
  });
  frame = requestAnimationFrame(tick);

  return {
    set(next) {
      for (const k in next) {
        if (pose[k] !== next[k]) {
          pose[k] = next[k];
          dirty = true;
        }
      }
    },
    muzzle() {
      return { x: ((muzzleAt.x + 1) / 2) * boxH * camera.aspect, y: ((1 - muzzleAt.y) / 2) * boxH };
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      seen.disconnect();
      sized.disconnect();
      scene.traverse((o) => {
        o.geometry?.dispose();
        for (const m of [].concat(o.material ?? [])) {
          for (const v of Object.values(m)) if (v?.isTexture) v.dispose();
          m.dispose();
        }
      });
      scene.environment?.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
