'use strict';

/**
 * Функція для показу сповіщень.
 * @param {string} text - Текст повідомлення
 * @param {boolean} isError - Чи це помилка
 */
function showNotification(text, isError = false) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.textContent = text;
  notification.classList.add('message');

  if (isError) {
    notification.classList.add('error-message');
  }

  document.body.appendChild(notification);
}

const logo = document.querySelector('.logo');

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  logo.addEventListener(
    'click',
    () => {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

firstPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));

const leftClick = new Promise((resolve) => {
  logo.addEventListener('click', () => resolve('Second promise was resolved'), {
    once: true,
  });
});

const rightClick = new Promise((resolve) => {
  logo.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

Promise.any([leftClick, rightClick]).then((msg) => showNotification(msg));

const leftForThird = new Promise((resolve) => {
  logo.addEventListener('click', () => resolve(), { once: true });
});

const rightForThird = new Promise((resolve) => {
  logo.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve();
    },
    { once: true },
  );
});

Promise.all([leftForThird, rightForThird]).then(() => {
  showNotification('Third promise was resolved');
});
