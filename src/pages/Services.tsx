import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Search, 
  TrendingUp, 
  Target, 
  FileText, 
  BarChart3, 
  Link2,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const heroTitle = heroRef.current?.querySelector('h1');
      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
      }

      // Service cards
      const serviceCards = servicesRef.current?.querySelectorAll('.service-card');
      if (serviceCards && serviceCards.length > 0) {
        gsap.fromTo(
          serviceCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // Process steps
      const processSteps = processRef.current?.querySelectorAll('.process-step');
      if (processSteps && processSteps.length > 0) {
        gsap.fromTo(
          processSteps,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: processRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: <Search size={48} strokeWidth={1.5} />,
      title: 'SEO-АУДИТ',
      shortDesc: 'Полный анализ вашего сайта с рекомендациями',
      fullDesc: 'Комплексный аудит выявляет все технические ошибки, проблемы с контентом и ссылочным профилем. Вы получаете детальный отчёт с приоритетами и пошаговым планом исправлений.',
      features: [
        'Технический аудит (скорость, мобильная версия, индексация)',
        'Анализ семантического ядра',
        'Оценка контента и его оптимизации',
        'Аудит ссылочного профиля',
        'Анализ конкурентов в нише',
        'Детальный отчёт с рекомендациями'
      ],
      price: 'от 25 000 ₽',
      timeframe: '5-7 дней'
    },
    {
      icon: <TrendingUp size={48} strokeWidth={1.5} />,
      title: 'SEO-ПРОДВИЖЕНИЕ',
      shortDesc: 'Комплексное ежемесячное продвижение сайта',
      fullDesc: 'Полный цикл работ по выводу сайта в топ Яндекса: от технической оптимизации до наращивания ссылочной массы. Прозрачная отчётность каждую неделю.',
      features: [
        'Техническая оптимизация',
        'Расширение семантического ядра',
        'Создание и оптимизация контента',
        'Наращивание ссылочной массы',
        'Работа с поведенческими факторами',
        'Еженедельные отчёты и звонки'
      ],
      price: 'от 35 000 ₽/мес',
      timeframe: 'от 3 месяцев'
    },
    {
      icon: <Target size={48} strokeWidth={1.5} />,
      title: 'ЯНДЕКС.ДИРЕКТ',
      shortDesc: 'Настройка и ведение контекстной рекламы',
      fullDesc: 'Профессиональная настройка рекламных кампаний с фокусом на конверсию. Снижаем стоимость клика и увеличиваем ROI.',
      features: [
        'Аудит текущих кампаний',
        'Сбор и кластеризация ключевых слов',
        'Написание продающих объявлений',
        'Настройка ретаргетинга',
        'Ежедневная оптимизация ставок',
        'Детальная аналитика и отчёты'
      ],
      price: 'от 20 000 ₽/мес',
      timeframe: 'минимум 1 месяц'
    },
    {
      icon: <FileText size={48} strokeWidth={1.5} />,
      title: 'SEO-КОНТЕНТ',
      shortDesc: 'Создание текстов, которые продают',
      fullDesc: 'Профессиональные SEO-тексты от опытных копирайтеров. Учитываем интент пользователя, требования поисковиков и специфику вашей ниши.',
      features: [
        'Разработка контент-стратегии',
        'Написание SEO-статей',
        'Оптимизация существующего контента',
        'Создание посадочных страниц',
        'Наполнение интернет-магазина',
        'Публикация на сайте'
      ],
      price: 'от 3 000 ₽/текст',
      timeframe: '2-3 дня на текст'
    },
    {
      icon: <BarChart3 size={48} strokeWidth={1.5} />,
      title: 'АНАЛИТИКА',
      shortDesc: 'Настройка и ведение веб-аналитики',
      fullDesc: 'Правильная аналитика — основа принятия решений. Настроим Яндекс.Метрику и Google Analytics, настроим цели и воронки.',
      features: [
        'Настройка Яндекс.Метрики',
        'Настройка Google Analytics 4',
        'Создание целей и событий',
        'Настройка воронок продаж',
        'Сквозная аналитика',
        'Ежемесячные отчёты'
      ],
      price: 'от 15 000 ₽',
      timeframe: '3-5 дней'
    },
    {
      icon: <Link2 size={48} strokeWidth={1.5} />,
      title: 'ЛИНКБИЛДИНГ',
      shortDesc: 'Наращивание ссылочной массы',
      fullDesc: 'Безопасное наращивание качественных ссылок на ваш сайт. Работаем только с проверенными площадками и естественными анкорами.',
      features: [
        'Аудит текущего ссылочного профиля',
        'Анализ ссылок конкурентов',
        'Размещение на трастовых сайтах',
        'Гостевые посты',
        'Пресс-релизы',
        'Ежемесячный отчёт о размещениях'
      ],
      price: 'от 25 000 ₽/мес',
      timeframe: 'от 3 месяцев'
    }
  ];

  const process = [
    { step: '01', title: 'АНАЛИЗ', desc: 'Изучаем сайт, нишу и конкурентов' },
    { step: '02', title: 'СТРАТЕГИЯ', desc: 'Разрабатываем план работ' },
    { step: '03', title: 'ВНЕДРЕНИЕ', desc: 'Выполняем запланированные работы' },
    { step: '04', title: 'АНАЛИТИКА', desc: 'Анализируем результаты и корректируем' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <div ref={heroRef} className="bg-black text-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs tracking-[0.3em] text-white/50 mb-6 block">
            НАШИ УСЛУГИ
          </span>
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight max-w-3xl opacity-0">
            КОМПЛЕКСНОЕ ПРОДВИЖЕНИЕ САЙТОВ
          </h1>
          <p className="text-white/70 text-lg mt-8 max-w-2xl">
            От аудита до полного вывода в топ. Все этапы SEO-оптимизации 
            под контролем профессионалов.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div ref={servicesRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card bg-white border border-black p-8 lg:p-10 opacity-0 group hover:border-2 transition-all duration-300"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.fullDesc}</p>
                
                <ul className="space-y-2 mb-8">
                  {service.features.slice(0, 4).map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-6 border-t border-black/10">
                  <div>
                    <div className="font-bold text-lg">{service.price}</div>
                    <div className="text-sm text-gray-500">{service.timeframe}</div>
                  </div>
                  <Link
                    to="/contacts"
                    className="flex items-center gap-2 font-mono text-sm tracking-widest group-hover:gap-3 transition-all"
                  >
                    ЗАКАЗАТЬ
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div ref={processRef} className="py-24 lg:py-32 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-gray-500 mb-4 block">
              КАК МЫ РАБОТАЕМ
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight">
              ПРОЦЕСС
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="process-step opacity-0">
                <div className="text-5xl font-black text-black/10 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-6">
            НЕ ЗНАЕТЕ, ЧТО ВЫБРАТЬ?
          </h2>
          <p className="text-gray-600 mb-10">
            Получите бесплатную консультацию. Мы проанализируем ваш сайт 
            и предложим оптимальное решение.
          </p>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-4 btn-fill border-2 border-black px-10 py-5 font-mono text-sm tracking-widest"
          >
            ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
