export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mx-auto max-w-3xl px-3 py-5 text-sm text-fg-secondary">
      <p>© {year} Florencia Micieli</p>
    </footer>
  );
}
