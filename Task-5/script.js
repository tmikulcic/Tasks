const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check the current theme when the page loads
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.src = '/Task-5/assets/svg/moon.svg';
} else {
  document.body.classList.remove('dark-mode');
  themeIcon.src = '/Task-5/assets/svg/sun.svg';
}

// Toggle the theme and icon when the button is clicked
themeToggleButton.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    themeIcon.src = '/Task-5/assets/svg/sun.svg';
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.add('dark-mode');
    themeIcon.src = '/Task-5/assets/svg/moon.svg';
    localStorage.setItem('theme', 'dark');
  }
});
