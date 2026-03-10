import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  index: number;
}

const ProcessStep = ({ number, title, description, index }: ProcessStepProps) => {
  const stepRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Number bounce animation
      gsap.fromTo(
        numberRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.3 + 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }, stepRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={stepRef} className="relative flex gap-8 lg:gap-12">
      {/* Number */}
      <div
        ref={numberRef}
        className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-black text-white flex items-center justify-center text-2xl lg:text-3xl font-black opacity-0"
      >
        {number}
      </div>

      {/* Content */}
      <div ref={contentRef} className="pb-12 lg:pb-16 opacity-0">
        <h3 className="text-xl lg:text-2xl font-bold uppercase tracking-tight mb-3">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed max-w-lg">
          {description}
        </p>
      </div>
    </div>
  );
};

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
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

      // Timeline line draw animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'АУДИТ',
      description: 'Анализируем сайт, конкурентов, нишу. Составляем подробное техническое задание с приоритетами.'
    },
    {
      number: '02',
      title: 'СТРАТЕГИЯ',
      description: 'Разрабатываем план продвижения на 3-6 месяцев. Определяем KPI и ожидаемые результаты.'
    },
    {
      number: '03',
      title: 'ОПТИМИЗАЦИЯ',
      description: 'Устраняем технические ошибки, внедряем семантику, пишем и размещаем контент.'
    },
    {
      number: '04',
      title: 'ПРОДВИЖЕНИЕ',
      description: 'Наращиваем ссылочную массу, работаем с поведенческими факторами, анализируем конкурентов.'
    },
    {
      number: '05',
      title: 'РЕЗУЛЬТАТ',
      description: 'Выводим запросы в топ, увеличиваем органический трафик и количество заявок.'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-24 lg:py-32 bg-[#f5f5f5]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 lg:mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-gray-500 mb-4 block">
            ЭТАПЫ РАБОТЫ
          </span>
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-black uppercase tracking-tight opacity-0"
          >
            КАК МЫ РАБОТАЕМ
          </h2>
        </div>

        {/* Process timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-8 lg:left-10 top-0 bottom-0 w-px bg-black origin-top"
            style={{ transform: 'scaleY(0)' }}
          />

          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <ProcessStep
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
