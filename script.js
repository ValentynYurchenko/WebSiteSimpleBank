'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button =>
  button.addEventListener('click', openModalWindow)
);

// for (let i = 0; i < btnsOpenModalWindow.length; i++)
//   btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

////////////////////////////////////////////////////////////
/*
// Выбор элементов
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

console.log(document.querySelector('.header'));
const sections = document.querySelectorAll('.section');
console.log(sections);

console.log(document.getElementById('section--1'));
const buttons = document.getElementsByTagName('button');
console.log(buttons);

console.log(document.getElementsByClassName('btn'));

////////////////////////////////////////////////////////////
// Создание и вставка элементов
// .insertAdjacentHTML()

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'Мы используем на этом сайте cookie для улучшения функциональности.';
message.innerHTML =
  'Мы используем на этом сайте cookie для улучшения функциональности. <button class="btn btn--close-cookie">Ok!</button>';

const header = document.querySelector('.header');
header.prepend(message); // добавляет элемент message в качестве первого дочернего элемента header
header.append(message); // добавляет элемент message в качестве последнего дочернего элемента header (при этом message не может находиться в двух местах одновременно. Он просто переместился с начала header в конец).
// header.append(message.cloneNode(true)); // таким образом элемент message клонируеться и будет отображаться и в начале header и в конце.
// header.before(message);
// header.after(message);

// Удаление элементов
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message); // старый способ удаления елементов
  });

// Стили

message.style.backgroundColor = '#076785'; // стиль добавлен к элементу DOM таким способом (програмно) называеться inline и соответственно его можно также считывать.
message.style.width = '120%';
console.log(message.style.width);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color); // способ считывания стиля который не являеться inline
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 50 + 'px';
console.log(message.style.height); // считывание inline стиля

document.documentElement.style.setProperty('--color-first', 'yellow'); // установка значения свойства стиля в обьекте root (css переменных)

// Атрибуты

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); // http://127.0.0.1:8080/img/logo.png - абсолютный путь к logo
console.log(logo.getAttribute('src')); // img/logo.png - относительный путь (относительно index.html)
console.log(logo.className);

logo.alt = 'Лого прекрасного банка';

// Нестандартный атрибут
console.log(logo.developer); // undefined
console.log(logo.getAttribute('developer'));
logo.setAttribute('copyright', 'Masters Of Code');

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes

console.log(logo.dataset.versionNumber); // способ считать значения атрибута типа data (название атрибута data всегда начинаеться с data-). Используеться для сохранения данных в UI.

// Classes

logo.classList.add('a', 'b');
logo.classList.remove('a', 'b');
logo.classList.toggle('a');
logo.classList.contains('c');

// Не использовать:
// logo.className = 'a'; // будут удалены все предыдущие классы и установиться только текущий */

// Implementation of smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // old approach:
  // const sectionCoords = section1.getBoundingClientRect();

  // console.log(sectionCoords);
  // console.log(e.target.getBoundingClientRect());
  // console.log(
  //   'Текущее прокручивание (расстояние от viewport до начала страницы): x, y',
  //   window.pageXOffset,
  //   window.pageYOffset
  // );
  // console.log(
  //   'Ширина и высота viewport (границы текущей области видимости)',
  //   document.documentElement.clientWidth,
  //   document.documentElement.clientHeight
  // );

  // window.scrollTo(
  //   sectionCoords.left + window.pageXOffset,
  //   sectionCoords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: sectionCoords.left + window.pageXOffset,
  //   top: sectionCoords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // new approach (but working only for the new browsers):
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////////////////////// Виды Событий И Обработчиков Событий

const h1 = document.querySelector('h1');
// const alertMouseEnterH1 = function (e) {
//   alert('addEventListener: You are now at the h1 element');
//   h1.removeEventListener('mouseenter', alertMouseEnterH1);
// };

// h1.addEventListener('mouseenter', alertMouseEnterH1);

const alertMouseEnterH1 = function (e) {
  alert('addEventListener: You are now at the h1 element');
};
h1.addEventListener('mouseenter', alertMouseEnterH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertMouseEnterH1), 5000);

// old approach
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: You are now at the h1 element');
// };

// h1.onclick = function (e) {
//   alert('onclick: You are now at the h1 element');
// };
