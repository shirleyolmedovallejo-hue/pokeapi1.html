const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    window.devicePixelRatio
);

document.body.appendChild(
    renderer.domElement
);

/* ======================
   GALAXIA
====================== */

const galaxyGeometry =
new THREE.BufferGeometry();

const starsCount = 100000;
const galaxyRadius = 600;
const branches = 5;

const positions =
new Float32Array(starsCount * 3);

const colors =
new Float32Array(starsCount * 3);

const galaxyColors = [
    new THREE.Color("#ffffff"), // blanco
    new THREE.Color("#ffe29a"), // amarillo
    new THREE.Color("#ffb870"), // naranja
    new THREE.Color("#8dc6ff"), // azul
    new THREE.Color("#c8a2ff"), // violeta
    new THREE.Color("#ff9b9b")  // rojo
];

for(let i = 0; i < starsCount; i++){

    const i3 = i * 3;

    const radius =
    Math.random() * galaxyRadius;

    const branchAngle =
    (i % branches) *
    ((Math.PI * 2) / branches);

    const spinAngle =
    radius * 0.045;

    const randomness =
    (Math.random() - 0.5) *
    (40 / (radius * 0.02 + 1));

    positions[i3] =
    Math.cos(branchAngle + spinAngle)
    * radius + randomness;

    positions[i3 + 1] =
    (Math.random() - 0.5) * 15;

    positions[i3 + 2] =
    Math.sin(branchAngle + spinAngle)
    * radius + randomness;

    const selectedColor =
    galaxyColors[
        Math.floor(
            Math.random() *
            galaxyColors.length
        )
    ];

    colors[i3] =
    selectedColor.r;

    colors[i3 + 1] =
    selectedColor.g;

    colors[i3 + 2] =
    selectedColor.b;
}

galaxyGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        positions,
        3
    )
);

galaxyGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(
        colors,
        3
    )
);

const galaxyMaterial =
new THREE.PointsMaterial({

    size: 1.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false

});

const galaxy =
new THREE.Points(
    galaxyGeometry,
    galaxyMaterial
);

scene.add(galaxy);

/* ======================
   NÚCLEO GALÁCTICO
====================== */

const coreGeometry =
new THREE.SphereGeometry(
    25,
    64,
    64
);

const coreMaterial =
new THREE.MeshBasicMaterial({

    color: 0xfff6d5

});

const core =
new THREE.Mesh(
    coreGeometry,
    coreMaterial
);

scene.add(core);

/* ======================
   LUZ CENTRAL
====================== */

const centerLight =
new THREE.PointLight(
    0xffffff,
    8,
    1500
);

centerLight.position.set(
    0,
    0,
    0
);

scene.add(
    centerLight
);

/* ======================
   FONDO ESTELAR
====================== */

const bgGeometry =
new THREE.BufferGeometry();

const bgCount = 40000;

const bgPositions =
new Float32Array(
    bgCount * 3
);

for(let i = 0; i < bgCount * 3; i++){

    bgPositions[i] =
    (Math.random() - 0.5) * 12000;
}

bgGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        bgPositions,
        3
    )
);

const bgMaterial =
new THREE.PointsMaterial({

    color: 0xffffff,
    size: 0.7

});

const backgroundStars =
new THREE.Points(
    bgGeometry,
    bgMaterial
);

scene.add(
    backgroundStars
);

/* ======================
   NEBULOSA
====================== */

const nebulaGeometry =
new THREE.SphereGeometry(
    900,
    64,
    64
);

const nebulaMaterial =
new THREE.MeshBasicMaterial({

    color: 0x7a4cff,
    transparent: true,
    opacity: 0.04,
    side: THREE.BackSide

});

const nebula =
new THREE.Mesh(
    nebulaGeometry,
    nebulaMaterial
);

scene.add(
    nebula
);

/* ======================
   LUZ AMBIENTE
====================== */

const ambientLight =
new THREE.AmbientLight(
    0xffffff,
    1.5
);

scene.add(
    ambientLight
);

/* ======================
   CÁMARA
====================== */

camera.position.set(
    0,
    100,
    800
);

let angle = 0;

/* ======================
   ANIMACIÓN
====================== */

function animate(){

    requestAnimationFrame(animate);

    angle += 0.0003;

    camera.position.x = Math.cos(angle) * 800;
    camera.position.z = Math.sin(angle) * 800;
    camera.position.y = 100 + Math.sin(angle * 3) * 30;

    camera.lookAt(0, 0, 0);

    galaxy.rotation.y += 0.00008;

    controls.update(); // 👈 IMPORTANTE

    renderer.render(scene, camera);
}

const controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableDamping = true; // movimiento suave
controls.dampingFactor = 0.05;

controls.enableZoom = true;   // zoom con scroll
controls.enablePan = true;    // mover lateralmente

animate();
controls.update();

/* ======================
   RESPONSIVE
====================== */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
        window.innerWidth /
        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }

    


);