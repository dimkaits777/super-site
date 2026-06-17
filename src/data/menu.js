/**
 * Menu shown in the «Меню-витрина» 3D showcase (2×3 grid: 3 desserts + 3 coffee).
 * Names, prices and descriptions are taken from the café's real menu.
 * `model` selects the procedural 3D mini-model rendered inside each card.
 */

export const DESSERTS = [
  {
    id: 'cake-kokos',
    name: 'Торт «Кокос»',
    price: 180,
    unit: 'за 100 г',
    model: 'cake',
    badge: 'Фірмовий',
    description:
      'Повітряні кокосові бісквіти, просочені кокосовим молоком, ніжний крем-чіз та білосніжна стружка.',
  },
  {
    id: 'napoleon',
    name: 'Наполеон з ваніллю',
    price: 150,
    unit: 'за 100 г',
    model: 'napoleon',
    badge: 'Класика',
    description:
      'Багатошарове хрустке листкове тісто та фірмовий заварний крем із натуральною ваніллю Bourbon.',
  },
  {
    id: 'cheesecake',
    name: 'Чизкейк Сан-Себастьян',
    price: 160,
    unit: 'за 100 г',
    model: 'cheesecake',
    badge: 'Популярне',
    description:
      'Баскський чизкейк із карамельною скоринкою та неймовірно ніжною, текучою серцевиною.',
  },
];

export const COFFEE = [
  {
    id: 'cappuccino',
    name: 'Капучино',
    price: 45,
    unit: 'S / M / L',
    model: 'cup',
    badge: 'Популярне',
    description: 'Міцне еспресо та найніжніше спінене молоко з оксамитовою пінкою.',
  },
  {
    id: 'latte',
    name: 'Лате',
    price: 50,
    unit: 'S / M / L',
    model: 'cup',
    description: 'Тришарове задоволення: гаряче молоко, шар еспресо та делікатна пінка.',
  },
  {
    id: 'flat-white',
    name: 'Флет Вайт',
    price: 60,
    unit: 'S',
    model: 'cup',
    badge: 'Гурман',
    description: 'Вибір поціновувачів: подвійне еспресо під тонким шаром мікропінки.',
  },
];

export const MENU = [...DESSERTS, ...COFFEE];
