import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  value: string;
  label: string;
  suffix?: string;
  delay: number;
}

const StatItem = ({ value, label, suffix = '', delay }: StatItemProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const numericValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: itemRef.current,
        start: 'top 80%',
        onEnter: () => {
          // Animate the counter
          gsap.to({ val: 0 }, {
            val: numericValue,
            duration: 2,
            delay: delay,
            ease: 'power2.out',
            onUpdate: function() {
              setDisplayValue(Math.round(this.targets()[0].val));
            }
          });
        },
        once: true
      });
    }, itemRef);

    return () => ctx.revert();
  }, [numericValue, delay]);

  return (
    <div ref={itemRef} className="text-center lg:text-left">
      <div className="text-4xl lg:text-6xl font-black text-white mb-2">
        {displayValue}{suffix}
      </div>
      <div className="font-mono text-xs lg:text-sm tracking-widest text-white/70">
        {label}
      </div>
    </div>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '150', suffix: '+', label: 'ПРОДВИНУТЫХ САЙТОВ' },
    { value: '3', suffix: '', label: 'СРЕДНЯЯ ПОЗИЦИЯ' },
    { value: '98', suffix: '%', label: 'КЛИЕНТОВ ОСТАЮТСЯ' },
    { value: '7', suffix: '', label: 'ЛЕТ ОПЫТА В SEO' },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-black py-16 lg:py-20 opacity-0"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
