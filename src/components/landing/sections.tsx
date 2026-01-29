import { Badge } from "@/components/ui/badge"

export const sections = [
  {
    id: 'hero',
    subtitle: <Badge variant="outline" className="text-white border-white">Сертифицированная продукция</Badge>,
    title: "Защита от огня. Надёжность на годы.",
    showButton: true,
    buttonText: 'Получить консультацию',
    backgroundImage: 'https://invamat.ru/upload/iblock/044/hqgxrogb7uv3lbw7qk1uhplalvkrmreg/Pena-montazhnaya-termorasshiryayushchayasya-dvukhkomponentnaya-protivopozharnaya-INVAMAT-620.png'
  },
  {
    id: 'about',
    title: 'Почему выбирают нас?',
    content: 'Мы поставляем сертифицированные огнезащитные материалы для промышленных и коммерческих объектов. Гарантия качества и соответствие всем требованиям пожарной безопасности.',
    backgroundImage: 'https://invamat.ru/upload/iblock/720/zxlpdnfksr690pf279273by34u788es1.png'
  },
  {
    id: 'features',
    title: 'Наша продукция',
    content: 'Противопожарные пены, герметики и мастики для защиты конструкций. Полный комплекс решений: от огнестойких покрытий до герметизации кабельных проходок и швов.',
    backgroundImage: 'https://invamat.ru/upload/iblock/cac/6o7bjmeifztvfqwtsf2dscaimaj0yg2c.png'
  },
  {
    id: 'testimonials',
    title: 'Надёжность проверена временем',
    content: 'Более 500 объектов защищены нашими материалами. Работаем с промышленными предприятиями, торговыми центрами и жилыми комплексами по всей России.'
  },
  {
    id: 'join',
    title: 'Готовы защитить ваш объект?',
    content: 'Оставьте заявку — наши специалисты рассчитают необходимое количество материалов и предложат оптимальное решение для вашего объекта.',
    showButton: true,
    buttonText: 'Заказать расчёт'
  },
]