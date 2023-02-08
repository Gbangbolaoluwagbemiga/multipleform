'use strict';

// Event listeners
// without loop
const form = document.querySelector('.form');
const switcher = document.querySelector('.switch');
const btnConfirm = document.querySelector('.confirm');
const appreciation = document.querySelector('.appreciation');
const toggOff = document.querySelector('.fa-toggle-off');
const toggOn = document.querySelector('.fa-toggle-on');
const planContainer = document.querySelector('.plan--container');

// involves looping
const toggleRadio = document.querySelectorAll('.toggler');
const radio = document.querySelectorAll('.radio');
const btnNxt = document.querySelectorAll('.btn--nxt');
const btnPrev = document.querySelectorAll('.btn--prev');
const formInput = document.querySelectorAll('.form--input');
const optionPlan = document.querySelectorAll('.option--plan');
const checkBox = document.querySelectorAll('.checkbox');
const adscontainer = document.querySelectorAll('.ads');

// General variable
let done = false;
let clicked = true;

///
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

// Help moves the radio button to the active page

function checkedRad(numrad) {
  toggleRadio.forEach(tr => {
    const check = numrad;
    const val = +tr.value;
    if (val === check) {
      // console.log('val');
      tr.checked = true;
    }
  });
}

// Next btn functionality
const nxt = function (e) {
  // e.preventDefault();
  // if (btnNO === 1 && formInput.forEach(inp => inp.value === '')) {
  console.log('hi');
  // }
  const btnNO = +e.target.dataset.nxt;
  radio.forEach(number => {
    const value = +number.dataset.num;
    if (btnNO >= curSlide) {
      if (value === btnNO + 1) {
        // console.log(number.dataset.num);
        number.classList.remove('hidden');
        checkedRad(value);
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
        // console.log(btnNO);
        number.classList.remove('hidden');
        checkedRad(btnNO - 1);
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
  // console.log(e.target.checked);
  radio.forEach(number => {
    const value = number.dataset.num;
    if (individual === value) {
      number.classList.remove('hidden');
    }
  });
};
// End of helper functions
// The switch toggler

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

  done = true;
  // After confirm is trigged
  if (done) {
    toggleRadio.forEach(tr => {
      tr.name = '';
      tr.checked = true;
    });
    // toggleRadio.forEach(movs => movs.remove('click', toggler));
  }
});

// section 2 responsiveness
function optPlan(e) {
  const link = e.target.closest('.option--plan');
  // console.log(link);
  // Guard clause
  if (!link) return;

  // Remove active classes
  optionPlan.forEach(t => t.classList.remove('active--sec2'));

  // Activate tab
  link.classList.add('active--sec2');
}
planContainer.addEventListener('click', optPlan);
// section 2 ends

// section 3
checkBox.forEach(cb =>
  cb.addEventListener('click', function (e) {
    const link = e.target;
    adscontainer.forEach(as => {
      // console.log(link.value);
      // console.log(as.dataset.cb);
      if (link.checked) {
        if (+link.value === +as.dataset.cb) {
          as.classList.add('active--sec3');
        }
      } else {
        console.log(link);
        as.classList.remove('active--sec3');

        // as.classList.add('active--sec3');
      }
    });
  })
);
