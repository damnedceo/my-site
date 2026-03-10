import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Target, Users, ArrowRight, Calendar, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Cases = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('all');

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

      // Cases
      const caseCards = casesRef.current?.querySelectorAll('.case-card');
      if (caseCards && caseCards.length > 0) {
        gsap.fromTo(
          caseCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: casesRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // Stats
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems && statItems.length > 0) {
        gsap.fromTo(
          statItems,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const cases = [
    {
      id: 1,
      client: 'TechStore',
      industry: 'ecommerce',
      industryLabel: 'E-Commerce',
      image: '/case1.jpg',
      title: 'ИНТЕРНЕТ-МАГАЗИН ЭЛЕКТРОНИКИ',
      description: 'Продвижение крупного интернет-магазина электроники в высококонкурентной нише.',
      duration: '6 месяцев',
      results: [
        { label: 'Рост трафика', value: '+340%', icon: <TrendingUp size={18} /> },
        { label: 'Запросов в ТОП-10', value: '85%', icon: <Target size={18} /> },
        { label: 'Рост заявок', value: '+180%', icon: <Users size={18} /> },
      ],
      tags: ['SEO', 'Контент', 'Линкбилдинг']
    },
    {
      id: 2,
      client: 'ServicePro',
      industry: 'service',
      industryLabel: 'Услуги',
      image: '/case2.jpg',
      title: 'СЕРВИСНАЯ КОМПАНИЯ',
      description: 'Комплексное продвижение сервисного центра с параллельной настройкой Директа.',
      duration: '4 месяца',
      results: [
        { label: 'Рост заявок', value: '+280%', icon: <TrendingUp size={18} /> },
        { label: 'Снижение CPC', value: '-40%', icon: <BarChart3 size={18} /> },
        { label: 'ROI рекламы', value: '450%', icon: <Target size={18} /> },
      ],
      tags: ['SEO', 'Директ', 'Аналитика']
    },
    {
      id: 3,
      client: 'B2B Portal',
      industry: 'b2b',
      industryLabel: 'B2B',
      image: '/case3.jpg',
      title: 'B2B ПОРТАЛ',
      description: 'Вывод в топ B2B-портала с высоким средним чеком и длинным циклом сделки.',
      duration: '8 месяцев',
      results: [
        { label: 'Рост органики', value: '+500%', icon: <TrendingUp size={18} /> },
        { label: 'Запросов в ТОП-3', value: '60%', icon: <Target size={18} /> },
        { label: 'B2B-лиды', value: '+220%', icon: <Users size={18} /> },
      ],
      tags: ['SEO', 'Контент-стратегия', 'Линкбилдинг']
    },
    {
      id: 4,
      client: 'FashionShop',
      industry: 'ecommerce',
      industryLabel: 'E-Commerce',
      image: '/case1.jpg',
      title: 'МАГАЗИН ОДЕЖДЫ',
      description: 'SEO-продвижение молодого бренда одежды с нуля.',
      duration: '5 месяцев',
      results: [
        { label: 'Рост трафика', value: '+250%', icon: <TrendingUp size={18} /> },
        { label: 'Запросов в ТОП-10', value: '72%', icon: <Target size={18} /> },
        { label: 'Продажи', value: '+150%', icon: <Users size={18} /> },
      ],
      tags: ['SEO', 'Контент']
    },
    {
      id: 5,
      client: 'MedClinic',
      industry: 'service',
      industryLabel: 'Услуги',
      image: '/case2.jpg',
      title: 'МЕДИЦИНСКАЯ КЛИНИКА',
      description: 'Продвижение сети медицинских клиник в Москве.',
      duration: '7 месяцев',
      results: [
        { label: 'Рост записей', value: '+320%', icon: <TrendingUp size={18} /> },
        { label: 'Запросов в ТОП-10', value: '78%', icon: <Target size={18} /> },
        { label: 'Новых пациентов', value: '+200%', icon: <Users size={18} /> },
      ],
      tags: ['SEO', 'Локальное SEO', 'Контент']
    },
    {
      id: 6,
      client: 'IT Company',
      industry: 'b2b',
      industryLabel: 'B2B',
      image: '/case3.jpg',
      title: 'IT-АУТСОРСИНГ',
      description: 'Продвижение услуг IT-аутсорсинга для среднего бизнеса.',
      duration: '6 месяцев',
      results: [
        { label: 'B2B-заявки', value: '+190%', icon: <TrendingUp size={18} /> },
        { label: 'Запросов в ТОП-10', value: '65%', icon: <Target size={18} /> },
        { label: 'Средний чек', value: '+45%', icon: <BarChart3 size={18} /> },
      ],
      tags: ['SEO', 'Контент-стратегия']
    },
  ];

  const filters = [
    { value: 'all', label: 'ВСЕ' },
    { value: 'ecommerce', label: 'E-COMMERCE' },
    { value: 'service', label: 'УСЛУГИ' },
    { value: 'b2b', label: 'B2B' },
  ];

  const filteredCases = filter === 'all' 
    ? cases 
    : cases.filter(c => c.industry === filter);

  const totalStats = {
    projects: '150+',
    trafficGrowth: '+280%',
    top10Rate: '78%',
    retention: '98%'
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <div ref={heroRef} className="bg-black text-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs tracking-[0.3em] text-white/50 mb-6 block">
            НАШИ РАБОТЫ
          </span>
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight max-w-3xl opacity-0">
            КЕЙСЫ И РЕЗУЛЬТАТЫ
          </h1>
          <p className="text-white/70 text-lg mt-8 max-w-2xl">
            Реальные проекты с реальными цифрами. 
            Каждый кейс — это история успеха нашего клиента.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="stat-item text-center opacity-0">
              <div className="text-4xl lg:text-5xl font-black mb-2">{totalStats.projects}</div>
              <div className="font-mono text-xs tracking-widest text-gray-500">ПРОЕКТОВ</div>
            </div>
            <div className="stat-item text-center opacity-0">
              <div className="text-4xl lg:text-5xl font-black mb-2">{totalStats.trafficGrowth}</div>
              <div className="font-mono text-xs tracking-widest text-gray-500">СРЕДНИЙ РОСТ ТРАФИКА</div>
            </div>
            <div className="stat-item text-center opacity-0">
              <div className="text-4xl lg:text-5xl font-black mb-2">{totalStats.top10Rate}</div>
              <div className="font-mono text-xs tracking-widest text-gray-500">В ТОП-10</div>
            </div>
            <div className="stat-item text-center opacity-0">
              <div className="text-4xl lg:text-5xl font-black mb-2">{totalStats.retention}</div>
              <div className="font-mono text-xs tracking-widest text-gray-500">ЛОЯЛЬНОСТЬ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="py-8 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-6 py-2 font-mono text-xs tracking-widest border transition-all duration-300 ${
                  filter === f.value
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div ref={casesRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="case-card bg-white border border-black opacity-0 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover grayscale-hover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-mono text-xs tracking-wider">
                    {caseItem.industryLabel}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar size={14} />
                    {caseItem.duration}
                  </div>

                  <h3 className="text-xl font-bold uppercase tracking-tight mb-3">
                    {caseItem.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-6">
                    {caseItem.description}
                  </p>

                  {/* Results */}
                  <div className="space-y-2 mb-6">
                    {caseItem.results.map((result, rIndex) => (
                      <div key={rIndex} className="flex items-center gap-3">
                        <div className="text-black">{result.icon}</div>
                        <span className="font-bold">{result.value}</span>
                        <span className="text-gray-500 text-sm">{result.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10">
                    {caseItem.tags.map((tag, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-3 py-1 bg-[#f5f5f5] text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 lg:py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-6">
            ХОТИТЕ ТАКИЕ ЖЕ РЕЗУЛЬТАТЫ?
          </h2>
          <p className="text-white/70 mb-10">
            Свяжитесь с нами для бесплатной консультации и аудита вашего сайта.
          </p>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 font-mono text-sm tracking-widest hover:bg-white/90 transition-colors"
          >
            ОБСУДИТЬ ПРОЕКТ
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cases;
