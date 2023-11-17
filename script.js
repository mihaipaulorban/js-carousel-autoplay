'use strict';

const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg'];
const slider = document.querySelector('.slider');
const left = document.querySelector('.left');
const right = document.querySelector('.right');

let currentSlide = 0

let pippo 
// Variabile per l'autoplay
let autoplayInterval;

//Creazione markup html
for (let i = 0; i < images.length; i++) {
  
  //Creazione slide
  const slide = document.createElement('div');
  slide.classList.add('slide');

  if(i === currentSlide) {
    slide.classList.add('active');
  }


  //Aggiunta immagini
  const img = document.createElement('img');
  img.src = `img/${images[i]}`;
  img.alt = `Immagine Suggestiva ${i}`;

  slide.append(img);
  slider.append(slide);
}

// Funzione cambiare immagine ogni 3 secondi
function startAutoplay() {
    autoplayInterval = setInterval(() => {
      if (currentSlide < domSlides.length - 1) {
        domSlides[currentSlide].classList.remove('active');
        currentSlide++;
        domSlides[currentSlide].classList.add('active');
        updateThumbnails();
      } else {
        domSlides[currentSlide].classList.remove('active');
        currentSlide = 0;
        domSlides[currentSlide].classList.add('active');
        updateThumbnails();
      }
    }, 3000);
  }

// Avvia l'autoplay quando apri la pagina
window.addEventListener('load', startAutoplay);

//Bottone start
const startButton = document.querySelector('.start');
startButton.addEventListener('click', () => {
  startAutoplay();
});

// Evento click sul bottone Stop
const stopButton = document.querySelector('.stop');
stopButton.addEventListener('click', () => {
  clearInterval(autoplayInterval); // Interrompe l'autoplay
});
const domSlides = document.querySelectorAll('.slide');


//Eventi che manipolano lo slider


// Tasto destro
left.addEventListener('click', function () {

  //Se la slide selezionata dell'array ha una posizione maggiore di 0, rimuovo la classe active da questa, mi sposto di una slide e poi aggiungo la classe active
  if (currentSlide > 0) {

    domSlides[currentSlide].classList.remove('active');
    currentSlide--;
    domSlides[currentSlide].classList.add('active');
    updateThumbnails();

  } else {

    // Se si è alla prima immagine e si clicca a sinistra, vai all'ultima immagine
    domSlides[currentSlide].classList.remove('active');
    currentSlide = domSlides.length - 1;
    domSlides[currentSlide].classList.add('active');
    updateThumbnails();
  }
});


// Tasto sinistro
right.addEventListener('click', function () {

  //Se la slide selezionata dell'array ha una posizione minore della lunghezza totale dell'array - 1, rimuovo la classe active da questa, mi sposto di una slide e poi aggiungo la classe active
  if (currentSlide < domSlides.length - 1) {

    domSlides[currentSlide].classList.remove('active');
    currentSlide++;
    domSlides[currentSlide].classList.add('active');
    updateThumbnails();

  } else {

    // Se si è all'ultima immagine e si clicca a destra, vai alla prima immagine
    domSlides[currentSlide].classList.remove('active');
    currentSlide = 0;
    domSlides[currentSlide].classList.add('active');
    updateThumbnails();
  }
});


//Miniature

//Seleziono il div thumbnails
const thumbnailsContainer = document.querySelector('.thumbnails');

// Creazione delle miniature delle immagini tramite un ciclo in base all'array 'images'
for (let i = 0; i < images.length; i++) {

  //Creo l'elemento div per rappresentare la miniatura e gli aggiungo la classe 'thumbnail'
  const thumbnail = document.createElement('div');
  thumbnail.classList.add('thumbnail');

  //Se l'immagine è quella selezionata gli aggiungo la classe active per il bordo e l'opacità
  if (i === currentSlide) {
    thumbnail.classList.add('active');
  }

  // Imposta il background della miniatura
  thumbnail.style.backgroundImage = `url(img/${images[i]})`;

  //Aggiungo l'evento di click per la miniatura 
  thumbnail.addEventListener('click', () => {

    // Gestisci il click sulla miniatura per cambiare l'immagine seleionata
    domSlides[currentSlide].classList.remove('active');
    currentSlide = i;
    domSlides[currentSlide].classList.add('active');
    updateThumbnails();
  });

  // Aggiunge le thumbnail al container in html
  thumbnailsContainer.appendChild(thumbnail);
}

const thumbnails = document.querySelectorAll('.thumbnail');

// Funzione per aggiornare lo stato delle miniature
function updateThumbnails() {
  domSlides.forEach((slide, index) => {
    if (index === currentSlide) {
      thumbnails[index].classList.add('active');
    } else {
      thumbnails[index].classList.remove('active');
    }
  });
}

// Cambia la miniatura selezionata quando cambio immagine

domSlides.forEach((slide, index) => {
  slide.addEventListener('transitionend', () => {
    updateThumbnails();
  });
});
