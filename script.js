const root = document.documentElement;
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Reveal elements as they enter the viewport.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Project slide-out panel.
const projects = [
  {
    title: 'Smart Mosque — IoT Climate Control',
    description: 'An IoT-based temperature monitoring and automatic fan control system for Masjid Al-Ikhlas. The prototype uses ESP8266, DHT11, PZEM-004T, relay modules, LCD, and a web dashboard connected to Supabase.',
    tags: ['ESP8266', 'DHT11', 'PZEM-004T', 'Supabase', 'HTML / CSS / JS']
  },
  {
    title: 'Landslide Early Warning System',
    description: 'A multi-sensor monitoring prototype that combines environmental and movement data to support early landslide risk detection. Sensor readings are sent to Supabase and can trigger Telegram notifications when configured thresholds are exceeded.',
    tags: ['ESP32', 'BMP280', 'MPU6050', 'Supabase', 'Telegram Bot']
  },
  {
    title: 'Smart Garden Monitoring',
    description: 'A connected garden concept for monitoring soil moisture and air conditions, with manual and automatic pump control through a mobile-friendly dashboard.',
    tags: ['ESP32', 'DHT22', 'Soil Moisture', 'Blynk', 'Relay']
  }
];
const drawer = document.querySelector('.project-drawer');
const backdrop = document.querySelector('.project-backdrop');
const closeDrawer = () => { drawer.classList.remove('open'); backdrop.classList.remove('show'); drawer.setAttribute('aria-hidden', 'true'); };
document.querySelectorAll('.project-row').forEach(row => row.addEventListener('click', () => {
  const item = projects[Number(row.dataset.project)];
  drawer.querySelector('.drawer-title').textContent = item.title;
  drawer.querySelector('.drawer-description').textContent = item.description;
  drawer.querySelector('.drawer-tags').innerHTML = item.tags.map(tag => `<span>${tag}</span>`).join('');
  drawer.classList.add('open'); backdrop.classList.add('show'); drawer.setAttribute('aria-hidden', 'false');
}));
document.querySelector('.drawer-close').addEventListener('click', closeDrawer);
backdrop.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

// Copy email address. Change this address in the HTML before publishing.
document.querySelector('#copyEmail').addEventListener('click', async () => {
  const email = document.querySelector('#emailAddress').textContent.trim();
  const button = document.querySelector('#copyEmail');
  try {
    await navigator.clipboard.writeText(email);
    button.innerHTML = 'Copied! <span>✓</span>';
  } catch {
    button.innerHTML = 'Select email above <span>↗</span>';
  }
  setTimeout(() => button.innerHTML = 'Copy email <span>▣</span>', 1800);
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Custom cursor on devices with a fine pointer.
if (window.matchMedia('(pointer:fine)').matches) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let x = 0, y = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', e => {
    x = e.clientX; y = e.clientY;
    dot.style.opacity = ring.style.opacity = '1';
    dot.style.left = `${x}px`; dot.style.top = `${y}px`;
  });
  const animate = () => {
    rx += (x - rx) * .16; ry += (y - ry) * .16;
    ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
    requestAnimationFrame(animate);
  };
  animate();
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}
