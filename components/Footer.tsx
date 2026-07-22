export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative px-[15vw] py-5 text-sm text-fg-secondary">
      <p>© {year} Florencia Micieli</p>
    </footer>
  );
}
