// Relentless, Zen's sword (public/uploads/zenderal/relentless.glb, from the mod's mesh and 4K textures), loaded on
// demand by Sword.jsx so three.js stays out of the main bundle. The page sets its pose from the scroll: it turns from
// hanging tip-down to lying level, tip left (the way its runes read), spinning once about its blade on the way, and
// the runes light up as it settles. Once level the page can slide it, angle it and bring it closer, for the swings
// that cut between the combat clips.
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Box3,
  Color,
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

const MODEL_URL = `${import.meta.env.BASE_URL}uploads/zenderal/relentless.glb`;
const GLOW = new Color(0xffb35c);

// Mounts the sword into `box`. Calls `onReady` once it's on screen; returns { set(pose), dispose }. The pose's `turn`
// runs 0 → 1 over the turn and `glow` 0 → 1 lights the runes; `x`/`y` (px from the middle, y down), `angle` (radians,
// clockwise on screen) and `zoom` (1 = the level fit, larger is closer) place it once level. The page smooths the
// scroll itself, so the pose is drawn as given.
export function mount(box, onReady) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  box.appendChild(renderer.domElement);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.6;

  // A warm key from above right, a gold rim from behind and a cool fill, as on the emblem.
  const key = new DirectionalLight(0xffe2b8, 2.4);
  key.position.set(2, 3, 3);
  const rim = new DirectionalLight(0xc9ab76, 4);
  rim.position.set(-3, 1.5, -2.5);
  const fill = new DirectionalLight(0x8fa3c0, 0.6);
  fill.position.set(-3, -1, 2);
  scene.add(key, rim, fill, new AmbientLight(0xffffff, 0.2));

  const camera = new PerspectiveCamera(24, 1, 0.1, 1000);
  // turn: tip-down → level; spin: about the blade; tilt: a slight lean back so the flat catches the key light.
  const turn = new Group();
  const spin = new Group();
  turn.add(spin);
  scene.add(turn);
  let length = 1;
  let runes = [];

  const pose = { turn: 0, glow: 0, x: 0, y: 0, angle: 0, zoom: 1 };
  let fitH = 1;
  let fitW = 1;

  function resize() {
    const { width, height } = box.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    // Camera distances at which the blade spans 85% of the height upright, and 80% of the width level.
    const half = Math.tan(MathUtils.degToRad(camera.fov / 2));
    fitH = length / 2 / (half * 0.85);
    fitW = length / 2 / (half * camera.aspect * 0.8);
  }

  let frame = 0;
  let visible = true;
  let loaded = false;
  function tick(time) {
    frame = requestAnimationFrame(tick);
    if (!visible || !loaded) return;
    const t = pose.turn;
    const e = t * t * (3 - 2 * t);
    const dist = MathUtils.lerp(fitH, fitW, e) / pose.zoom;
    // World units per screen pixel on the sword's plane.
    const unit = (2 * dist * Math.tan(MathUtils.degToRad(camera.fov / 2))) / (renderer.domElement.clientHeight || 1);
    turn.position.set(pose.x * unit, -pose.y * unit, 0);
    turn.rotation.z = Math.PI - (Math.PI / 2) * e - pose.angle;
    turn.rotation.x = -0.25 * Math.sin(Math.PI * e);
    spin.rotation.y = Math.PI * 2 * e + Math.sin(time / 2400) * 0.06;
    camera.position.set(0, 0, dist);
    const pulse = 0.92 + Math.sin(time / 1600) * 0.08;
    for (const m of runes) m.emissiveIntensity = pose.glow * pulse * 2.2;
    rim.position.x = -3 + Math.sin(spin.rotation.y) * 2;
    renderer.render(scene, camera);
  }

  const seen = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  seen.observe(box);
  const sized = new ResizeObserver(resize);
  sized.observe(box);

  let disposed = false;
  new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(MODEL_URL, (gltf) => {
    if (disposed) return;
    const model = gltf.scene;
    const bounds = new Box3().setFromObject(model);
    model.position.sub(bounds.getCenter(new Vector3()));
    length = bounds.getSize(new Vector3()).y;
    // Full anisotropic filtering keeps the fine runes and engraving from shimmering while the blade is edge-on.
    const aniso = renderer.capabilities.getMaxAnisotropy();
    model.traverse((o) => {
      if (!o.isMesh) return;
      for (const v of Object.values(o.material)) if (v?.isTexture) v.anisotropy = aniso;
      o.material.emissive = GLOW.clone();
      o.material.emissiveIntensity = 0;
      runes.push(o.material);
    });
    spin.add(model);
    resize();
    loaded = true;
    onReady();
  });
  frame = requestAnimationFrame(tick);

  return {
    set(next) {
      Object.assign(pose, next);
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
