function toggleTextButton() {
  const hiddenText = document.querySelector('.card__text--hidden');
  const button = document.querySelector('.card__button');

  hiddenText.classList.toggle('active');

  // Update button text based on the 'active' class presence
  if (hiddenText.classList.contains('active')) {
    button.textContent = 'Show less';
  } else {
    button.textContent = 'Learn more';
  }
}

// IntersectionObserver to reveal/hide the card
const card = document.querySelector('.card');

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  },
  {
    rootMargin: '0px',
    threshold: 0.2, // Trigger when element is 20% visible
  }
);

observer.observe(card);
