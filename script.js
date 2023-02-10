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
const Alltogether = document.querySelector('.sum');
const subSec4Text = document.querySelector('.sub__sec4--text');
const subSec4Price = document.querySelector('.sub--price');
const sec4Link = document.querySelector('.sec4--link');
const sec2container = document.querySelector('.plan');
const selectPeriod = document.querySelector('.period');

// involves looping
const toggleRadio = document.querySelectorAll('.toggler');
const radio = document.querySelectorAll('.radio');
const btnNxt = document.querySelectorAll('.btn--nxt');
const btnPrev = document.querySelectorAll('.btn--prev');
const formInput = document.querySelectorAll('.form--input');
const optionPlan = document.querySelectorAll('.option--plan');
const checkBox = document.querySelectorAll('.checkbox');
const adscontainer = document.querySelectorAll('.ads');
const secView4 = document.querySelectorAll('.view');
const priceNumber = document.querySelectorAll('.price--no');
const perMonth = document.querySelectorAll('.monthly');
const planPerMonth = document.querySelectorAll('.monthly--plan');
const planPerYear = document.querySelectorAll('.yearly--plan');
const perYear = document.querySelectorAll('.yearly');

// General variable
let done = false;
let clicked = true;
let curSlide = 0; // To keep the data of the slide
let btnClicked1 = false;

/////section 4 in section 3 variable
let number = 0;
let added = [];
let tired = [];
let tired2 = [];
let everyNo = [];

// section 4 in section 2 variable
let secNo2 = 9;

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
  const btnNO = +e.target.dataset.nxt;
  radio.forEach(number => {
    const value = +number.dataset.num;

    formInput.forEach(id => {
      if (btnNO === 1 && id.value !== '') {
        e.preventDefault();
        btnClicked1 = true;
        if (value === btnNO + 1) {
          // console.log(number.dataset.num);
          number.classList.remove('hidden');
          checkedRad(value);
        } else {
          number.classList.add('hidden');
        }
      }
    });

    if (btnNO !== 1 && btnNO >= curSlide) {
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

const myFunc = function (total, num) {
  return total + num;
};

///////////

// End of helper functions
// The switch toggler

switcher.addEventListener('click', function (e) {
  if (clicked) {
    toggOff.classList.add('hidden');
    toggOn.classList.remove('hidden');
    perYear.forEach(py => py.classList.remove('hidden'));
    perMonth.forEach(pm => pm.classList.add('hidden'));
    selectPeriod.textContent = `per year`;
    optionPlan.forEach(t => t.classList.remove('active--sec2'));
  } else {
    perYear.forEach(py => py.classList.add('hidden'));
    perMonth.forEach(pm => pm.classList.remove('hidden'));
    toggOff.classList.remove('hidden');
    toggOn.classList.add('hidden');
    optionPlan.forEach(t => t.classList.remove('active--sec2'));
  }

  if (!toggOn.classList.contains('hidden')) {
    planPerMonth.forEach(ppm => ppm.classList.add('hidden'));
    planPerYear.forEach(ppy => ppy.classList.remove('hidden'));
    console.log(clicked);
  } else {
    planPerMonth.forEach(ppm => ppm.classList.remove('hidden'));
    planPerYear.forEach(ppy => ppy.classList.add('hidden'));
    console.log(clicked);
  }

  clicked = !clicked;
});

// Responsiveness for switching radio wrt to their data
toggleRadio.forEach(movs => movs.addEventListener('click', toggler));

// Event handlers for the buttons
btnNxt.forEach(btn => btn.addEventListener('click', nxt));
btnPrev.forEach(btn => btn.addEventListener('click', prev));
btnConfirm.addEventListener('click', function () {
  // guard clause to make sure section 1 is sorted out
  if (btnClicked1) {
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
  } else {
    alert('Section 1 details not filled yet');
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

  // section 4 in section 2

  optionPlan.forEach(op => {
    if (op.classList.contains('active--sec2')) {
      const activeMo = op.querySelector('.monthly');
      const activeYr = op.querySelector('.yearly');
      let period = '';

      if (toggOn.classList.contains('hidden')) {
        activeYr.classList.contains('hidden')
          ? (period = activeMo.dataset.price)
          : (period = activeYr.dataset.period);
      } else {
        !activeYr.classList.contains('hidden')
          ? (period = activeYr.dataset.price)
          : (period = activeMo.dataset.period);
      }

      console.log(period);
      const activeText = op.querySelector('.bold--text');
      console.log(activeText);
      subSec4Text.textContent = activeText.textContent;
      subSec4Price.textContent = `$${period}/mo`;

      secNo2 = +period;
      // console.log(activeNo);
    }
    everyNo = [secNo2, ...tired2];

    Alltogether.textContent = `+$${everyNo.reduce(myFunc)}/mo`;
  });
}
planContainer.addEventListener('click', optPlan);

// section 2 ends

// section 3
checkBox.forEach(cb =>
  cb.addEventListener('click', function (e) {
    const link = e.target;
    // console.log(link.value);

    adscontainer.forEach(as => {
      if (link.checked && +link.value === +as.dataset.cb) {
        as.classList.add('active--sec3');

        // section 4

        secView4.forEach(sect => {
          if (
            as.classList.contains('active--sec3') &&
            +sect.dataset.finish === +as.dataset.cb
          ) {
            sect.classList.remove('hidden');

            // priceNumber.forEach(no => {
            if (link.checked && !sect.classList.contains('hidden')) {
              const selected = +sect.querySelector('.price--no').dataset.pn;
              if (link.value <= 2) {
                added.push(selected);
                number = [...new Set(added)];
              } else {
                tired.push(2);
                tired2 = [...new Set(tired)];
              }
              everyNo = [...number, secNo2, ...tired2];

              Alltogether.textContent = `+$${everyNo.reduce(myFunc)}/mo`;
            }
            // });
          }
        });
      } else if (!link.checked && +link.value === +as.dataset.cb) {
        as.classList.remove('active--sec3');

        // section 4
        secView4.forEach(sect => {
          if (
            !as.classList.contains('active--sec3') &&
            +sect.dataset.finish === +as.dataset.cb
          ) {
            sect.classList.add('hidden');

            if (!link.checked && sect.classList.contains('hidden')) {
              const selected = +sect.querySelector('.price--no').dataset.pn;
              if (link.value <= 2) {
                if (link.value === 1) {
                  added.pop(selected);
                  number = [...new Set(added)];
                } else {
                  added.shift();
                  number = [...new Set(added)];
                }
              } else {
                tired.pop(2);
                tired2 = [...new Set(tired)];
              }
              everyNo = [...number, secNo2, ...tired2];
              everyNo.length !== 0
                ? (Alltogether.textContent = `+$${everyNo.reduce(myFunc)}/mo`)
                : (Alltogether.textContent = `+$${0}/mo`);
            }
          }
        });
      }
    });
  })
);

// section 4 begins
sec4Link.addEventListener('click', function (e) {
  e.preventDefault();
  addClasses();
  sec2container.classList.remove('hidden');
  checkedRad(2);

  everyNo = [...number, secNo2, ...tired2];

  Alltogether.textContent = `+$${everyNo.reduce(myFunc)}/mo`;
});
