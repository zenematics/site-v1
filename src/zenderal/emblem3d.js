// The 3D hero emblem (public/uploads/zenderal-emblem.glb), loaded on demand by
// Emblem.jsx so three.js stays out of the main bundle. It sways slowly, tilts
// toward the cursor and is rim-lit in the site's gold.
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Box3,
  DirectionalLight,
  Group,
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

const MODEL_URL = `${import.meta.env.BASE_URL}uploads/zenderal-emblem.glb`;
const SWAY = 0.35; // radians either side, so the generated back never comes into view
const TILT = 0.3; // how far the cursor turns it

// Mounts the emblem into `box`. Calls `onReady` once the model is on screen;
// returns a cleanup function.
export function mount(box, onReady) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  box.appendChild(renderer.domElement);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.35;

  // Warm key from the front right, a gold rim from behind (the backdrop's light), a cool fill.
  const key = new DirectionalLight(0xffe2b8, 2.2);
  key.position.set(2, 2.5, 3);
  const rim = new DirectionalLight(0xc9ab76, 5);
  rim.position.set(-2.5, 1.5, -2.5);
  const fill = new DirectionalLight(0x8fa3c0, 0.5);
  fill.position.set(-3, -1, 2);
  scene.add(key, rim, fill, new AmbientLight(0xffffff, 0.15));

  const camera = new PerspectiveCamera(28, 1, 0.1, 50);
  const pivot = new Group();
  scene.add(pivot);
  let radius = 1;

  function resize() {
    const { width, height } = box.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Fit the model's bounding sphere to the narrower side, with a little margin.
    const fov = (camera.fov * Math.PI) / 180;
    const fitH = radius / Math.sin(fov / 2);
    const fitW = radius / Math.sin(Math.atan(Math.tan(fov / 2) * camera.aspect));
    camera.position.set(0, 0, Math.max(fitH, fitW) * 0.92);
    camera.updateProjectionMatrix();
  }

  // Measured from the emblem's centre, so it faces straight out while the
  // cursor is level with it rather than with the middle of the window.
  const pointer = { x: 0, y: 0 };
  const onPointer = (e) => {
    const r = box.getBoundingClientRect();
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    pointer.x = clamp(((e.clientX - (r.left + r.width / 2)) / innerWidth) * 2);
    pointer.y = clamp(((e.clientY - (r.top + r.height / 2)) / innerHeight) * 2);
  };
  addEventListener('pointermove', onPointer, { passive: true });

  let frame = 0;
  let visible = true;
  let loaded = false;
  const rot = { x: 0, y: 0 };
  const start = performance.now();
  function tick(now) {
    frame = requestAnimationFrame(tick);
    if (!visible || !loaded) return;
    const t = (now - start) / 1000;
    const ty = Math.sin(t * 0.25) * SWAY + pointer.x * TILT;
    const tx = pointer.y * TILT * 0.5 + Math.sin(t * 0.4) * 0.03;
    rot.y += (ty - rot.y) * 0.05;
    rot.x += (tx - rot.x) * 0.05;
    pivot.rotation.set(rot.x, rot.y, 0);
    pivot.position.y = Math.sin(t * 0.6) * radius * 0.02;
    // The rim light trails the sway so the edges catch the light as it turns.
    rim.position.x = -2.5 - rot.y * 3;
    renderer.render(scene, camera);
  }

  const seen = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  seen.observe(box);
  const sized = new ResizeObserver(resize);
  sized.observe(box);

  let disposed = false;
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  loader.load(MODEL_URL, (gltf) => {
    if (disposed) return;
    const model = gltf.scene;
    const bounds = new Box3().setFromObject(model);
    model.position.sub(bounds.getCenter(new Vector3()));
    radius = bounds.getSize(new Vector3()).length() / 2;
    pivot.add(model);
    resize();
    loaded = true;
    onReady();
  });
  frame = requestAnimationFrame(tick);

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    removeEventListener('pointermove', onPointer);
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
  };
}
