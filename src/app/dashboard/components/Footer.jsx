export default function Footer() {
  return (
    <footer className="p-4 text-center bg-[var(--header-bg)] border-t text-sm opacity-80">
      © {new Date().getFullYear()} CRT Application
    </footer>
  );
}
