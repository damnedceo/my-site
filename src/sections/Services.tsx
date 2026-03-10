import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, TrendingUp, Target, FileText, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon, title, description, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          y: 40,
          rotateX: 10
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.15,
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

  return (
    <div
      ref={cardRef}
      className="group relative bg-white border border-black p-8 lg:p-10 card-hover cursor-pointer opacity-0"
      style={{ perspective: '1000px' }}
    >
      {/* Icon */}
      <div className="mb-6 text-black">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl lg:text-2xl font-bold uppercase tracking-tight mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-6">
        {description}
      </p>

      {/* Arrow */}
      <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1">
        <ArrowUpRight size={24} />
      </div>

      {/* Bottom line accent */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-black transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal animation
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

  const services = [
    {
      icon: <Search size={40} strokeWidth={1.5} />,
      title: 'SEO-АУДИТ',
      description: 'Полный анализ сайта: технические ошибки, семантика, контент, ссылочный профиль. Детальный отчёт с рекомендациями.'
    },
    {
      icon: <TrendingUp size={40} strokeWidth={1.5} />,
      title: 'ПРОДВИЖЕНИЕ',
      description: 'Ежемесячная оптимизация: работа над позициями, трафиком, конверсией. Прозрачная отчётность каждую неделю.'
    },
    {
      icon: <Target size={40} strokeWidth={1.5} />,
      title: 'ЯНДЕКС.ДИРЕКТ',
      description: 'Настройка и ведение контекстной рекламы с оплатой за результат. Снижение стоимости клика до 40%.'
    },
    {
      icon: <FileText size={40} strokeWidth={1.5} />,
      title: 'КОНТЕНТ',
      description: 'Создание SEO-текстов, оптимизация существующего контента. Уникальные статьи от профессиональных копирайтеров.'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 lg:mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-gray-500 mb-4 block">
            ЧТО МЫ ДЕЛАЕМ
          </span>
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-black uppercase tracking-tight opacity-0"
          >
            УСЛУГИ
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
