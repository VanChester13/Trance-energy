let scrollY: number;

const syncHeight = () => {
  document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
};

export function bodyFixPosition() {
  syncHeight();
  window.addEventListener('resize', syncHeight);
  scrollY = window.scrollY;
  document.documentElement.classList.add('is-locked');
}

export function bodyUnfixPosition() {
  window.removeEventListener('resize', syncHeight);
  document.documentElement.classList.remove('is-locked');
  window.scrollTo(0, scrollY);
}
