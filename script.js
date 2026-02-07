// --- 1. Navigation Logic ---
const openBtn = document.getElementById('openMenu');
const closeBtn = document.getElementById('closeMenu');
const overlay = document.getElementById('menuOverlay');
const links = document.querySelectorAll('.menu-link');

openBtn.addEventListener('click', () => overlay.style.display = 'flex');
closeBtn.addEventListener('click', () => overlay.style.display = 'none');
links.forEach(link => link.addEventListener('click', () => overlay.style.display = 'none'));

// --- 2. Certificate Interaction ---
function openCert(file) {
    window.open(file, '_blank');
}

// --- 3. Matrix & Typewriter ---
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

const chars = "01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ";
const drops = Array.from({ length: canvas.width / 14 }).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.font = "14px monospace";
    drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 14, y * 14);
        if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 50);

const phrases = ["Cybersecurity Specialist.", "Database Architect.", "Cloud Security Expert."];
let i = 0, j = 0, current = [], deleting = false;

function type() {
    const el = document.getElementById('typewriter');
    if (!deleting && j <= phrases[i].length) current.push(phrases[i][j++]);
    if (deleting && j <= phrases[i].length) { current.pop(); j--; }
    if (j == phrases[i].length) deleting = true;
    if (deleting && j == 0) { deleting = false; i = (i + 1) % phrases.length; }
    el.innerHTML = current.join('');
    setTimeout(type, deleting ? 50 : 150);
}
type();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});