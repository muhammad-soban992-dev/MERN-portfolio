// IntersectionObserver reveal: adds .in to .reveal elements once visible.
export function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.16 });
  document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
  return () => io.disconnect();
}
export default initReveal;
