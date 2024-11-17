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
