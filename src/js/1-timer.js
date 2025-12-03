// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const chosenDate = selectedDates[0];

    if (chosenDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
      return;
    }

    userSelectedDate = chosenDate;
    startBtn.disabled = false;
  },
};

flatpickr(input, options);

// ------------------ TIMER LOGIC ------------------

startBtn.addition = false;

startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startBtn.disabled = true;
  input.disabled = true;

  intervalId = setInterval(() => {
    const now = Date.now();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(intervalId);
      updateTimer(0);
      input.disabled = false;
      return;
    }

    updateTimer(diff);
  }, 1000);
});

// ------------------ HELPER FUNCTIONS ------------------

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysEl.textContent = days;
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//

// const input = document.querySelector('#datetime-picker');
// const startBtn = document.querySelector('[data-start]');

// const daysEl = document.querySelector('[data-days]');
// const hoursEl = document.querySelector('[data-hours]');
// const minutesEl = document.querySelector('[data-minutes]');
// const secondsEl = document.querySelector('[data-seconds]');

// startBtn.disabled = true;

// let userSelectedDate = null;
// let intervalId = null;

// flatpickr(input, {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,

//   onClose(selectedDates) {
//     const selectedDate = selectedDates[0];

//     if (selectedDate <= new Date()) {
//       iziToast.error({
//         title: 'Error',
//         message: 'Please choose a date in the future',
//         position: 'topRight',
//       });
//       startBtn.disabled = true;
//       return;
//     }

//     userSelectedDate = selectedDate;
//     startBtn.disabled = false;
//   },
// });

// // ---------------- TIMER -----------------

// startBtn.addEventListener('click', () => {
//   if (!userSelectedDate) return;

//   startBtn.disabled = true;
//   input.disabled = true;

//   intervalId = setInterval(() => {
//     const now = Date.now();
//     const diff = userSelectedDate - now;

//     if (diff <= 0) {
//       clearInterval(intervalId);
//       updateTimer(0);
//       input.disabled = false;
//       return;
//     }

//     updateTimer(diff);
//   }, 1000);
// });

// // ---------------- HELPERS -----------------

// function updateTimer(ms) {
//   const { days, hours, minutes, seconds } = convertMs(ms);

//   daysEl.textContent = days;
//   hoursEl.textContent = addLeadingZero(hours);
//   minutesEl.textContent = addLeadingZero(minutes);
//   secondsEl.textContent = addLeadingZero(seconds);
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   return {
//     days: Math.floor(ms / day),
//     hours: Math.floor((ms % day) / hour),
//     minutes: Math.floor(((ms % day) % hour) / minute),
//     seconds: Math.floor((((ms % day) % hour) % minute) / second),
//   };
// }
