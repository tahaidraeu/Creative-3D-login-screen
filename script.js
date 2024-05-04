document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform login authentication using strong security system
    // For demonstration, let's assume login succeeds if email and password are both "admin"
    if (email === 'admin' && password === 'admin') {
        // Redirect to home page or display success message
        alert('Login successful!');
    } else {
        // Display error message
        document.getElementById('error-message').innerText = 'Invalid email or password. Please try again.';
    }
});
// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('spaceCanvas'), antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

// Create stars
const stars = [];
for (let i = 0; i < 2000; i++) {
    const star = createStar();
    stars.push(star);
    scene.add(star);
}

function createStar() {
    const starGeometry = new THREE.SphereGeometry(0.5, 24, 24);
    const starMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(THREE.MathUtils.randFloatSpread(1000), THREE.MathUtils.randFloatSpread(1000), THREE.MathUtils.randFloatSpread(1000));
    return star;
}

// Create rotating background
const background = createBackground();
scene.add(background);

function createBackground() {
    const backgroundGeometry = new THREE.SphereGeometry(2000, 64, 64);
    const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
    const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    return background;
}

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add point light (for star glow effect)
const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
scene.add(pointLight);

camera.position.z = 400;

function animate() {
    requestAnimationFrame(animate);

    // Rotate background
    background.rotation.y += 0.001;

    // Move stars
    stars.forEach(star => {
        star.position.z += 0.2;
        if (star.position.z > 1000) {
            star.position.z = -1000;
            star.position.x = THREE.MathUtils.randFloatSpread(1000);
            star.position.y = THREE.MathUtils.randFloatSpread(1000);
        }
    });

    // Update point light position to match camera position
    pointLight.position.copy(camera.position);

    renderer.render(scene, camera);
}

animate();
