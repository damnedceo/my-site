import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  index: number;
}

const PricingCard = ({ name, price, description, features, isPopular = false, index }: PricingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fromX = index === 0 ? -50 : index === 2 ? 50 : 0;
      const fromY = index === 1 ? 50 : 0;
      const fromScale = index === 1 ? 0.9 : 1;

      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          x: fromX,
          y: fromY,
          scale: fromScale
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const scrollToCTA = () => {
    const element = document.querySelector('#cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative p-8 lg:p-10 opacity-0 ${
        isPopular 
          ? 'bg-black text-white' 
          : 'bg-white border border-black'
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 flex items-center gap-2">
          <Star size={14} fill="currentColor" />
          <span className="font-mono text-xs tracking-widest">ПОПУЛЯРНЫЙ</span>
        </div>
      )}

      {/* Name */}
      <h3 className={`text-xl lg:text-2xl font-bold uppercase tracking-tight mb-2 ${
        isPopular ? 'text-white' : 'text-black'
      }`}>
        {name}
      </h3>

      {/* Price */}
      <div className="mb-6">
        <span className={`text-4xl lg:text-5xl font-black ${
          isPopular ? 'text-white' : 'text-black'
        }`}>
          {price}
        </span>
        <span className={`text-sm ml-2 ${
          isPopular ? 'text-white/70' : 'text-gray-500'
        }`}>
          /мес
        </span>
      </div>

      {/* Description */}
      <p className={`mb-8 leading-relaxed ${
        isPopular ? 'text-white/80' : 'text-gray-600'
      }`}>
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={18} className={`flex-shrink-0 mt-0.5 ${
              isPopular ? 'text-white' : 'text-black'
            }`} />
            <span className={`text-sm ${
              isPopular ? 'text-white/90' : 'text-gray-600'
            }`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={scrollToCTA}
        className={`w-full py-4 font-mono text-sm tracking-widest transition-all duration-300 ${
          isPopular
            ? 'bg-white text-black hover:bg-white/90'
            : 'bg-black text-white hover:bg-black/90'
        }`}
      >
        ВЫБРАТЬ
      </button>
    </div>
  );
};

const Pricing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { 
          opacity: 0,
          clipPath: 'inset(0 100% 0 0)'
        },
        {
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: 'СТАРТ',
      price: '15 000 ₽',
      description: 'Для небольших сайтов и стартапов',
      features: [
        'SEO-аудит сайта',
        'До 10 запросов в месяц',
        'Базовая оптимизация',
        'Ежемесячный отчёт',
        'Поддержка по email'
      ],
      isPopular: false
    },
    {
      name: 'БИЗНЕС',
      price: '35 000 ₽',
      description: 'Для растущего бизнеса',
      features: [
        'Всё из тарифа СТАРТ',
        'До 50 запросов в месяц',
        'Настройка Яндекс.Директ',
        'Создание контента',
        'Приоритетная поддержка'
      ],
      isPopular: true
    },
    {
      name: 'ПРЕМИУМ',
      price: '70 000 ₽',
      description: 'Для крупных проектов',
      features: [
        'Всё из тарифа БИЗНЕС',
        'Неограниченные запросы',
        'Персональный менеджер',
        'Еженедельные звонки',
        '24/7 поддержка'
      ],
      isPopular: false
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 lg:py-32 bg-[#f5f5f5]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-gray-500 mb-4 block">
            СТОИМОСТЬ
          </span>
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-black uppercase tracking-tight opacity-0"
          >
            ТАРИФЫ
          </h2>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              index={index}
            />
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-gray-500 text-sm mt-12 font-mono">
          * Все цены указаны без НДС. Возможна оплата по договору.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
