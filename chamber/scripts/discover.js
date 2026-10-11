
import { places } from '../data/places.mjs';

// Get HTML elements
const container = document.querySelector('#places');
const visitMessage = document.querySelector('#visit-message');
const dialog = document.querySelector('#place-dialog');

// Check that the page elements exist
if (!container) {
  console.error('Missing #places element in discover.html');
} else {
  // Create attraction cards
  places.forEach((place, index) => {
    const card = document.createElement('article');
    card.className = `place-card place-${index + 1}`;

    // Attraction name
    const title = document.createElement('h2');
    title.textContent = place.name;

    // Attraction image
    const figure = document.createElement('figure');
    const image = document.createElement('img');

    image.src = `images/${place.image}`;
    image.alt = `Photo of ${place.name}`;
    image.width = 300;
    image.height = 200;
    image.loading = 'lazy';

    figure.appendChild(image);

    // Attraction address
    const address = document.createElement('address');
    address.textContent = place.address;

    // Attraction description
    const description = document.createElement('p');
    description.textContent = place.description;

    // Learn More button
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Learn More';

    button.addEventListener('click', () => {
      if (dialog) {
        document.querySelector('#dialog-title').textContent =
          place.name;

        document.querySelector('#dialog-description').textContent =
          `${place.description} Location: ${place.address}`;

        dialog.showModal();
      }
    });

    // Add elements to card
    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    // Add card to the page
    container.appendChild(card);
  });
}

// Visitor message using localStorage
const storageKey = 'chamber-discover-last-visit';
const previousVisit = localStorage.getItem(storageKey);
const now = Date.now();

let message;

if (!previousVisit || Number(previousVisit) > now) {
  message = 'Welcome! Let us know if you have any questions.';
} else {
  const days = Math.floor(
    (now - Number(previousVisit)) / 86400000
  );

  if (days < 1) {
    message = 'Back so soon! Awesome!';
  } else {
    message = `You last visited ${days} day(s) ago.`;
  }
}

if (visitMessage) {
  visitMessage.textContent = message;
}

localStorage.setItem(storageKey, String(now));

// Mobile navigation
const menuButton = document.querySelector('#menu-btn');
const navList = document.querySelector('#nav-list');

if (menuButton && navList) {
  menuButton.addEventListener('click', () => {
    navList.classList.toggle('open');

    const isOpen = navList.classList.contains('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Footer information
const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent =
    `Last Modified: ${document.lastModified}`;
}

console.log('Discover page JavaScript loaded successfully.');
console.log('Number of attractions:', places.length);
