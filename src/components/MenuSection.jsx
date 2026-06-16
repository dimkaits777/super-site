import MiniCanvas from './MiniCanvas'

const items = [
  { name: 'Наполеон',      price: '150₴', shape: 'box',    color: '#d4a574' },
  { name: 'Чизкейк',       price: '150₴', shape: 'sphere', color: '#f5c2a0' },
  { name: 'Червоний оксамит', price: '150₴', shape: 'box',  color: '#c0392b' },
  { name: 'Капучіно',      price: '150₴', shape: 'sphere', color: '#8b5e3c' },
]

export default function MenuSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-center text-3xl font-bold mb-8 tracking-wide text-[#2c1a0e]"
          style={{ fontFamily: 'Georgia, serif' }}>
        Меню
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col rounded-2xl overflow-hidden shadow-md border border-[#e8d5c0] bg-white hover:shadow-xl transition-shadow"
          >
            {/* Mini 3D canvas */}
            <div style={{ height: 140 }}>
              <MiniCanvas shape={item.shape} color={item.color} />
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
              <h3 className="text-lg font-semibold text-[#2c1a0e]"
                  style={{ fontFamily: 'Georgia, serif' }}>
                {item.name}
              </h3>
              <p className="text-[#8b5e3c] font-bold text-xl mt-auto">{item.price}</p>
              <button
                className="mt-2 py-2 px-4 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #c97b3a 0%, #8b4513 100%)' }}
              >
                Замовити
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
