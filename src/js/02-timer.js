import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimeEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;

let userDate;
const actualDate = new Date();

let options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < actualDate) {
      btnStart.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
    } else if (selectedDates[0] > actualDate) {
      btnStart.disabled = false;
      Notiflix.Notify.success("OK, let's start!");
      userDate = selectedDates[0].getTime();
    }
  },
};

const counterTime = () => {
  btnStart.disabled = true;
  const counter = setInterval(() => {
    let gapTime = userDate - new Date().getTime();
    let gapTimeMs = convertMs(gapTime);
    if (gapTime <= 0) {
      clearInterval(counter);
    } else {
      time(gapTimeMs);
    }
  }, 1000);
};

const dateTime = flatpickr(dateTimeEl, options);
btnStart.addEventListener('click', counterTime);

const time = gapTimeMs => {
  days.textContent = gapTimeMs.days;
  hours.textContent = gapTimeMs.hours;
  minutes.textContent = gapTimeMs.minutes;
  seconds.textContent = gapTimeMs.seconds;
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
