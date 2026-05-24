// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
  const s = hamburger.querySelectorAll('span');
  if (hamburger.classList.contains('open')) {
    s[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    s[1].style.opacity = '0';
    s[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    s[0].style.transform = 'none';
    s[1].style.opacity = '1';
    s[2].style.transform = 'none';
  }
});
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform='none'; s.style.opacity='1'; });
  });
});

// Scroll top
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Modal
function openCurriculumModal() {
  document.getElementById('curriculumModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeCurriculumModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.closest('.modal-close')) return;
  document.getElementById('curriculumModal').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCurriculumModal(); });

// Syllabus Download
function downloadSyllabus() {
  const link = document.createElement('a');
  link.href = 'assets/Build Your First AI Assistant with Python.pdf';
  link.download = 'Python-AI-Assistant-Bootcamp-Syllabus.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Syllabus downloading... 📄');
}

// Share
function shareBootcamp() {
  const data = { title: 'Web Dev Bootcamp - Tamil Technology', text: 'Join the 4-Hour Live Bootcamp in Tamil! Only ₹199!', url: location.href };
  if (navigator.share) navigator.share(data).catch(() => {});
  else { navigator.clipboard.writeText(location.href).then(() => showToast('Link copied! 🔗')); }
}

// Toast
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1a1a2e;color:#fff;padding:12px 28px;border-radius:10px;font-size:.85rem;font-family:Plus Jakarta Sans,sans-serif;font-weight:600;z-index:3000;box-shadow:0 4px 20px rgba(0,0,0,.3);opacity:0;transition:opacity .3s;pointer-events:none'; document.body.appendChild(t); }
  t.textContent = msg; t.style.opacity = '1';
  setTimeout(() => { t.style.opacity = '0'; }, 3000);
}

// Countdown Timer
function initCountdown() {
  const targetDate = new Date("May 30, 2026 09:00:00").getTime();
  
  function updateTimer() {
    const daysEl = document.getElementById('days');
    if (!daysEl) return false;
    
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
      daysEl.innerText = "00";
      document.getElementById('hours').innerText = "00";
      document.getElementById('minutes').innerText = "00";
      document.getElementById('seconds').innerText = "00";
      return false;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    daysEl.innerText = days < 10 ? "0" + days : days;
    document.getElementById('hours').innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? "0" + seconds : seconds;
    return true;
  }
  
  if (updateTimer()) {
    setInterval(updateTimer, 1000);
  }
}
document.addEventListener('DOMContentLoaded', initCountdown);

// Scroll animations
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  // Original basic observer for other elements
  document.querySelectorAll('.why-card,.benefit-card,.instructor-card,.pricing-card,.timeline-item').forEach((el, i) => {
    el.style.opacity = '0'; el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity .5s ease ${i*.08}s, transform .5s ease ${i*.08}s`;
    obs.observe(el);
  });

  // GSAP Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Curriculum Modules - staggered slide in from right
    gsap.fromTo('.module-block', 
      { opacity: 0, x: 50 },
      {
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.curriculum-right',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Certificate Floating Effect
    gsap.to('.cert-showcase', {
      y: -10,
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Certificate Badge Pop
    gsap.from('.cert-badge', {
      scale: 0,
      rotation: -45,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: '.cert-section',
        start: "top 60%"
      }
    });

    // Certificate Features slide up
    gsap.from('.cert-feat', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.cert-showcase',
        start: "top 70%"
      }
    });
    
    // Certificate Section Glow Pulse
    gsap.to('.cert-bg-glow', {
      scale: 1.2,
      opacity: 0.7,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Hero Floating Logos
    const logos = ['.html-logo', '.css-logo', '.github-logo', '.netlify-logo'];
    logos.forEach((logo, index) => {
      gsap.to(logo, {
        y: -15,
        duration: 2 + (index * 0.5),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.2
      });
    });
  }
});

// Intersection callback for visible class
const style = document.createElement('style');
style.textContent = '.why-card.visible,.benefit-card.visible,.instructor-card.visible,.pricing-card.visible{opacity:1!important;transform:translateY(0)!important}';
document.head.appendChild(style);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

