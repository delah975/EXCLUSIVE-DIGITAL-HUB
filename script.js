// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    if (this.hash) {
      e.preventDefault();
      document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Fade-in animation for gallery images as you scroll
const galleryImages = document.querySelectorAll('.gallery-grid img');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  },
  { threshold: 0.3 }
);
galleryImages.forEach(img => observer.observe(img));

// Dynamic Gallery Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');
let currentImgIndex = 0;

function openLightbox(index) {
  lightbox.style.display = 'flex';
  lightboxImg.src = galleryImages[index].src;
  lightboxImg.alt = galleryImages[index].alt;
  currentImgIndex = index;
}
function closeLightbox() {
  lightbox.style.display = 'none';
}
function showPrev() {
  currentImgIndex = (currentImgIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentImgIndex);
}
function showNext() {
  currentImgIndex = (currentImgIndex + 1) % galleryImages.length;
  openLightbox(currentImgIndex);
}
galleryImages.forEach((img, idx) => {
  img.addEventListener('click', () => openLightbox(idx));
});
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'Escape') closeLightbox();
  }
});
