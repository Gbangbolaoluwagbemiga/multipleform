'use strict';
// <i class="fa-solid fa-toggle-on"></i>
// <i class="fa-solid fa-toggle-off"></i>

// Event listeners
const toggleRadio = document.querySelectorAll('.toggler');
const form = document.querySelector('.form');
const radio = document.querySelectorAll('.radio');
const btnNxt = document.querySelectorAll('.btn--nxt');
const btnPrev = document.querySelectorAll('.btn--prev');
const formInput = document.querySelectorAll('.form--input');
const btnConfirm = document.querySelector('.confirm');
const appreciation = document.querySelector('.appreciation');

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

    if (formInput) {
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
