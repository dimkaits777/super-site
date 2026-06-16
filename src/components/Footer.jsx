export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e8d5c0] py-8 px-4 text-center text-sm text-[#8b5e3c]">
      <p className="mb-3" style={{ fontFamily: 'Georgia, serif' }}>
        © 2026 Кокос. ФОП Іванов І.І.
      </p>
      <div className="flex justify-center gap-6 flex-wrap">
        <a href="/docs/privacy" className="underline hover:text-[#2c1a0e] transition-colors">
          Політика конфіденційності
        </a>
        <a href="/docs/terms" className="underline hover:text-[#2c1a0e] transition-colors">
          Умови використання
        </a>
      </div>
      <p className="mt-4 text-xs text-[#b8977a]">
        м. Житомир, вул. В.Бердичівська, 49а
      </p>
    </footer>
  )
}
