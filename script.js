// 時計表示
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString();
  document.getElementById("clock").textContent = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// Three.js 初期化
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("dolphinCanvas"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 照明
const light = new THREE.HemisphereLight(0x89b7f7, 0x080820, 1);
scene.add(light);

// モデル読み込み
const loader = new THREE.GLTFLoader();
loader.load('dolphin.glb', function(gltf) {
  const dolphin = gltf.scene;
  dolphin.scale.set(1.2, 1.2, 1.2);
  dolphin.rotation.y = Math.PI;

  scene.add(dolphin);

  // アニメーション（ゆらゆら動く）
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    dolphin.position.y = Math.sin(t) * 0.1;
    dolphin.rotation.y += 0.005;
    renderer.render(scene, camera);
  }

  animate();
}, undefined, function(error) {
  console.error('モデル読み込みエラー:', error);
});

// リサイズ対応
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
