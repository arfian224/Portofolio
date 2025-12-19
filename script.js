/* ===============================
   PREMIUM PORTFOLIO JAVASCRIPT
   Interaction + Animation Layer
   =============================== */


/* ---------- Reveal On Scroll ---------- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => revealObserver.observe(el));

/* ---------- Sticky Header Shadow ---------- */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if(window.scrollY > 40){
    header.style.boxShadow = '0 10px 30px rgba(0,0,0,.35)';
  } else {
    header.style.boxShadow = 'none';
  }
});

/* ---------- Smooth Anchor Scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/* ---------- Video Autoplay Fallback ---------- */
const heroVideo = document.querySelector('.hero video');
if(heroVideo){
  heroVideo.muted = true;
  heroVideo.playsInline = true;
  heroVideo.play().catch(() => {
    console.warn('Autoplay blocked');
  });
}

/* ---------- Portfolio Hover Parallax ---------- */
document.querySelectorAll('.work').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 25;
    const moveY = (y - rect.height / 2) / 25;

    card.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translate(0,0)';
  });
});

gsap.from(".work.basic", {
  scrollTrigger: { trigger: ".basic", start: "top 85%" },
  y: 80,
  opacity: 0,
  duration: 1
});

gsap.from(".work.pro", {
  scrollTrigger: { trigger: ".pro", start: "top 85%" },
  y: 80,
  opacity: 0,
  delay: 0.2,
  duration: 1
});

gsap.from(".work.premium", {
  scrollTrigger: { trigger: ".premium", start: "top 85%" },
  scale: 0.85,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out"
});

/* ---------- CTA Pulse ---------- */
setInterval(() => {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ], {
      duration: 1200,
      iterations: 1
    });
  });
}, 7000);

/* ---------- Console Branding ---------- */
console.log('%cPremium Portfolio Loaded', 'color:#6cf2c2;font-size:18px;font-weight:bold');
