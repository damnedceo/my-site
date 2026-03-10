import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const decorRefs = useRef<HTMLDivElement[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Grid fade in
      tl.fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
      );

      // Title reveal animation - word by word
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { 
            opacity: 0, 
            y: 30,
            clipPath: 'inset(0 100% 0 0)'
          },
          { 
            opacity: 1, 
            y: 0,
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.8,
            stagger: 0.1
          },
          '-=1'
        );
      }

      // Subtitle fade in
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

      // CTA button
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5 },
        '-=0.3'
      );

      // Decorative rectangles
      tl.fromTo(
        decorRefs.current,
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8,
          stagger: 0.2
        },
        '-=0.8'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid-pattern opacity-0"
      />

      {/* Decorative rectangles */}
      <div
        ref={(el) => { if (el) decorRefs.current[0] = el; }}
        className="absolute top-20 right-20 w-32 h-32 bg-black opacity-0 hidden lg:block"
      />
      <div
        ref={(el) => { if (el) decorRefs.current[1] = el; }}
        className="absolute top-40 right-60 w-16 h-16 border-2 border-black opacity-0 hidden lg:block"
      />
      <div
        ref={(el) => { if (el) decorRefs.current[2] = el; }}
        className="absolute bottom-40 right-40 w-24 h-24 bg-black opacity-0 hidden lg:block"
      />
      <div
        ref={(el) => { if (el) decorRefs.current[3] = el; }}
        className="absolute bottom-20 right-80 w-12 h-12 border-2 border-black opacity-0 hidden lg:block"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-0">
        <div className="max-w-3xl">
          {/* Label */}
          <span className="font-mono text-xs tracking-[0.3em] text-gray-500 mb-6 block">
            SEO-ПРОДВИЖЕНИЕ
          </span>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase leading-[0.95] tracking-tight mb-8"
          >
            <span className="word inline-block">ВЫВОДИМ</span>{' '}
            <span className="word inline-block">САЙТЫ</span>{' '}
            <span className="word inline-block">В</span>{' '}
            <span className="word inline-block">ТОП</span>
            <br />
            <span className="word inline-block">ЯНДЕКСА</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg lg:text-xl text-gray-600 max-w-xl mb-10 leading-relaxed opacity-0"
          >
            Комплексное продвижение с гарантией результатов. 
            Только белые методы оптимизации.
          </p>

          {/* CTA Button */}
          <Link
            ref={ctaRef}
            to="/contacts"
            className="btn-fill group inline-flex items-center gap-4 border-2 border-black px-8 lg:px-10 py-4 lg:py-5 font-mono text-sm tracking-widest transition-all duration-300 opacity-0"
          >
            ПОЛУЧИТЬ АУДИТ
            <ArrowRight 
              size={18} 
              className="transition-transform duration-300 group-hover:translate-x-1" 
            />
          </Link>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10" />
    </section>
  );
}

export default Hero;
