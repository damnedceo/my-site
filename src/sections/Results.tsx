import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Award, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CaseCardProps {
  image: string;
  title: string;
  metric1: { value: string; label: string };
  metric2: { value: string; label: string };
  index: number;
}

const CaseCard = ({ image, title, metric1, metric2, index }: CaseCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [metric1Value, setMetric1Value] = useState(0);
  const [metric2Value, setMetric2Value] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              // Animate metrics
              const val1 = parseInt(metric1.value.replace(/\D/g, ''));
              const val2 = parseInt(metric2.value.replace(/\D/g, ''));
              
              gsap.to({ val: 0 }, {
                val: val1,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function() {
                  setMetric1Value(Math.round(this.targets()[0].val));
                }
              });

              gsap.to({ val: 0 }, {
                val: val2,
                duration: 2,
                delay: 0.3,
                ease: 'power2.out',
                onUpdate: function() {
                  setMetric2Value(Math.round(this.targets()[0].val));
                }
              });
            }
          }
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index, metric1.value, metric2.value]);

  return (
    <div
      ref={cardRef}
      className="group bg-white border border-black overflow-hidden opacity-0"
    >
      {/* Image */}
      <div className="relative h-48 lg:h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale-hover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <h3 className="text-lg lg:text-xl font-bold uppercase tracking-tight mb-6">
          {title}
        </h3>

        {/* Metrics */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <TrendingUp size={18} className="text-black" />
            <div>
              <span className="text-2xl lg:text-3xl font-black">
                {metric1.value.includes('%') ? `${metric1Value}%` : `+${metric1Value}%`}
              </span>
              <span className="text-sm text-gray-500 ml-2">{metric1.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Target size={18} className="text-black" />
            <div>
              <span className="text-xl lg:text-2xl font-bold">
                {metric2.label.includes('TOP') ? metric2.label : `${metric2Value}%`}
              </span>
              {!metric2.label.includes('TOP') && (
                <span className="text-sm text-gray-500 ml-2">{metric2.label}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Results = () => {
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

  const cases = [
    {
      image: '/case1.jpg',
      title: 'ИНТЕРНЕТ-МАГАЗИН',
      metric1: { value: '340', label: 'трафика за 6 мес' },
      metric2: { value: '85', label: 'TOP-10: 85% запросов' }
    },
    {
      image: '/case2.jpg',
      title: 'СЕРВИСНАЯ КОМПАНИЯ',
      metric1: { value: '280', label: 'заявок за 4 мес' },
      metric2: { value: '40', label: 'снижение CPC на 40%' }
    },
    {
      image: '/case3.jpg',
      title: 'B2B ПОРТАЛ',
      metric1: { value: '500', label: 'органики за 8 мес' },
      metric2: { value: '60', label: 'TOP-3: 60% запросов' }
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="results"
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-gray-500 mb-4 block">
            НАШИ ДОСТИЖЕНИЯ
          </span>
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-black uppercase tracking-tight opacity-0"
          >
            РЕЗУЛЬТАТЫ КЛИЕНТОВ
          </h2>
        </div>

        {/* Cases grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cases.map((caseItem, index) => (
            <CaseCard
              key={caseItem.title}
              image={caseItem.image}
              title={caseItem.title}
              metric1={caseItem.metric1}
              metric2={caseItem.metric2}
              index={index}
            />
          ))}
        </div>

        {/* Trust badge */}
        <div className="mt-16 lg:mt-20 flex items-center justify-center gap-4">
          <Award size={24} className="text-black" />
          <span className="font-mono text-sm tracking-widest text-gray-600">
            ГАРАНТИЯ РЕЗУЛЬТАТА ИЛИ ВОЗВРАТ ДЕНЕГ
          </span>
        </div>
      </div>
    </section>
  );
};

export default Results;
