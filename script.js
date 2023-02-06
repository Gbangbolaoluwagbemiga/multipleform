'use strict';

// Event listeners
const toggleRadio = document.querySelectorAll('.toggler');
const form = document.querySelector('.form');
const radio = document.querySelectorAll('.radio');
const btnNxt = document.querySelectorAll('.btn--nxt');
const btnPrev = document.querySelectorAll('.btn--prev');
const formInput = document.querySelectorAll('.form--input');
const switcher = document.querySelector('.switch');
const btnConfirm = document.querySelector('.confirm');
const appreciation = document.querySelector('.appreciation');
const toggOff = document.querySelector('.fa-toggle-off');
const toggOn = document.querySelector('.fa-toggle-on');

// Helper functions

// Add hidden classlist
const addClasses = function () {
  radio.forEach(r => r.classList.add('hidden'));
};

// Default display that automatically get triggers the moment the website loads
const defaultDisplay = function () {
  addClasses();
  form.classList.remove('hidden');
};
defaultDisplay();

// Next btn functionality
const nxt = function (e) {
  // e.preventDefault();
  // if (btnNO === 1 && formInput.forEach(inp => inp.value === '')) {
  //   console.log('hi');
  // }
  const btnNO = +e.target.dataset.nxt;
  radio.forEach(number => {
    const value = +number.dataset.num;
    if (btnNO >= curSlide) {
      if (value === btnNO + 1) {
        number.classList.remove('hidden');
      } else {
        number.classList.add('hidden');
      }
    }
  });
  curSlide++;
};

// Back btn functionality
const prev = function (e) {
  e.preventDefault();
  const btnNO = +e.target.dataset.prev;
  radio.forEach(number => {
    const value = +number.dataset.num;
    if (btnNO >= curSlide) {
      if (value + 1 === btnNO) {
        number.classList.remove('hidden');
      } else {
        number.classList.add('hidden');
      }
    }
  });
  curSlide--;
};

const toggler = function (e) {
  addClasses();
  const individual = e.target.value;
  radio.forEach(number => {
    const value = number.dataset.num;
    if (individual === value) {
      number.classList.remove('hidden');
    }
  });
};
// End of helper functions
// The switch toggler
let clicked = true;
switcher.addEventListener('click', function () {
  if (clicked) {
    toggOff.classList.add('hidden');
    toggOn.classList.remove('hidden');
  } else {
    toggOff.classList.remove('hidden');
    toggOn.classList.add('hidden');
  }
  clicked = !clicked;
});

// Responsiveness for switching radio wrt to their data
toggleRadio.forEach(movs => movs.addEventListener('click', toggler));
let curSlide = 0; // To keep the data of the slide

// Next btn functionality
btnNxt.forEach(btn => btn.addEventListener('click', nxt));
btnPrev.forEach(btn => btn.addEventListener('click', prev));
btnConfirm.addEventListener('click', function () {
  radio.forEach(r => r.classList.add('hidden'));
  appreciation.classList.remove('hidden');
  addClasses();
  toggleRadio.forEach(movs => movs.removeEventListener('click', toggler));
});