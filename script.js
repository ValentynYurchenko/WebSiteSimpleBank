'use strict';

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

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

////////////////////////////////////////////////
// Implementation of smooth scrolling

btnScrollTo.addEventListener('click', function (e) {
  // new approach (but working only for the new browsers):
  section1.scrollIntoView({ behavior: 'smooth' });

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
});

////////////////////////////////////////////////////////////// Smooth page navigation:
// Первый способ рабочий, но не оптимальный, так как может влиять на производительность. Поэтому используем второй способ: event delegation.

// document.querySelectorAll('.nav__link').forEach(function (htmlElement) {
//   htmlElement.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event delegation
// 1. Add event listener to the total parent
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // 2. Define the target element
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

// Creating tab (создание вкладки)
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab');
  // Guard clause - пункт охраны
  if (!clickedButton) return;

  // Active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  // Active content
  tabContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////// Виды Событий И Обработчиков Событий
/*
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
*/
////////////////////////////////////////////////////////////
/*
// Event Propagation
// rgb(123, 56, 78)

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const getRandomColor = () =>
  `rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(
    0,
    255
  )}, ${getRandomIntInclusive(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = getRandomColor();
  console.log('Link', e.target, e.currentTarget);
  console.log(this === e.currentTarget);
  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = getRandomColor();
  console.log('Links', e.target, e.currentTarget);
  console.log(this === e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = getRandomColor();
    console.log('Nav', e.target, e.currentTarget);
    console.log(this === e.currentTarget);
  } //, true // установка третьего аргумента в true означает, что eventListener будет реагировать на событие на стадии перехвата (при движении от root к target). Но в современном js это не используеться. EventListener реагирует на события при движении их снизу вверх (от target к root), поэтому дефолтное значение третьего аргумента false.
);

document.querySelector('body').addEventListener('click', function (e) {
  this.style.backgroundColor = getRandomColor();
  console.log('Body', e.target, e.currentTarget);
  console.log(this === e.currentTarget);
}); */

// e.target - это элемент для которого фактически произошло событие;
// e.currentTarget - это элемент для которого сработал обработчик события.

////////////////////////////////////////////////////////////// DOM traversing (перемещение по DOM)
/*

const h1 = document.querySelector('h1');

// Перемещение вниз (к потомкам)

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); // получаем нод лист состоящих из всех вложеный элементов (не очень полезный метод, так как содержит много излишней информации)
console.log(h1.children); // получаем прямых потомков в формате HTML Collection
console.log(h1.firstElementChild); // получаем первого потомка (первый дочерний элемент для h1)
h1.firstElementChild.style.color = 'yellow'; // так же можно например програмно устанавливать стиль для первого потомка
console.log(h1.lastElementChild); // последный потомок
h1.lastElementChild.style.color = 'rgb(255, 88, 6)';

// Перемещение вверх (к родителям)
console.log(h1.parentNode); // получение прямых родителей
console.log(h1.parentElement); // получение прямых родителей

const h2 = document.querySelector('h2');
console.log(h2);
h2.closest('.section').style.backgroundColor = 'blue'; // данный метод выбирает ближайшего родителя с указанным классом для элемента h2
h2.closest('h2').style.backgroundColor = 'green'; // в данном случае для h2 произошел выбор самого себя

// Перемещение в стороны (на одном уровне) - в js мы можем выбирать только соседние элементы (тоесть те которые находяться рядом: либо предыдущий, либо следующий)

console.log(h2.previousElementSibling); // получение предыдущего элемента одного уровня (если такого элемента нету, будет возвращено null)
console.log(h2.nextElementSibling); // получение следующего элемента одного уровня

console.log(h1.parentElement.children); // в этом случае мы получаем все одноуровнивые элементы для h1. Сначала для h1 мы переходим к его родительскому элементу, а потом получаем всех прямых потомков (вложености первого уровня) этого родителя в форме HTML Collection. */
