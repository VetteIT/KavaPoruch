// main.js
let scene, camera, renderer, snowflakes = [];
let mouseX = 0, mouseY = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add Snowflakes
    const snowflakeCount = 1000;
    for (let i = 0; i < snowflakeCount; i++) {
        let geometry = new THREE.SphereGeometry(0.05, 24, 24);
        let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        let snowflake = new THREE.Mesh(geometry, material);

        snowflake.position.x = Math.random() * window.innerWidth / 25 - window.innerWidth / 50;
        snowflake.position.y = Math.random() * window.innerHeight / 25;
        snowflake.position.z = Math.random() * window.innerWidth / 25 - window.innerWidth / 50;

        scene.add(snowflake);
        snowflakes.push(snowflake);
    }

    camera.position.z = 5;
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    animate();
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
}

function animate() {
    requestAnimationFrame(animate);

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    snowflakes.forEach(snowflake => {
        snowflake.position.y -= 0.02;
        if (snowflake.position.y < -window.innerHeight / 100) {
            snowflake.position.y = window.innerHeight / 50;
        }
    });

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.display = 'none';
});