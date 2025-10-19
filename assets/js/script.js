const wrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dots span');

let index = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;

function showSlide(i) {
  wrapper.style.transition = 'transform 0.4s ease';
  wrapper.style.transform = `translateX(${-i * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[i].classList.add('active');
}

// клик по точкам
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    showSlide(index);
  });
});

// свайп мышью / пальцем
wrapper.addEventListener('touchstart', startDrag);
wrapper.addEventListener('mousedown', startDrag);
wrapper.addEventListener('touchmove', drag);
wrapper.addEventListener('mousemove', drag);
wrapper.addEventListener('touchend', endDrag);
wrapper.addEventListener('mouseup', endDrag);
wrapper.addEventListener('mouseleave', endDrag);

function startDrag(e) {
  isDragging = true;
  startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  wrapper.style.transition = 'none';
}

function drag(e) {
  if (!isDragging) return;
  currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  const diff = currentX - startX;
  wrapper.style.transform = `translateX(${ -index * 100 + (diff / wrapper.offsetWidth) * 100 }%)`;
}

function endDrag(e) {
  if (!isDragging) return;
  isDragging = false;
  const diff = currentX - startX;

  if (Math.abs(diff) > 50) {
    if (diff < 0 && index < slides.length - 1) index++;
    if (diff > 0 && index > 0) index--;
  }
  slides.forEach(slide => {
  const img = slide.querySelector('img');
  if (img) {
    img.addEventListener('dragstart', e => e.preventDefault());
  }
});

  showSlide(index);
}


  const burger = document.getElementById('burger')
  const nav = document.getElementById('nav')

  burger.addEventListener('click', () => {
    nav.classList.toggle('open')
    burger.classList.toggle('active')
  })
