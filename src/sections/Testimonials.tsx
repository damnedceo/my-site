import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: 'За 4 месяца вывели 50 запросов в ТОП-10. Трафик вырос в 3 раза, а количество заявок увеличилось на 180%. Профессиональный подход и отличная коммуникация.',
      author: 'Анна К.',
      position: 'E-Commerce Director'
    },
    {
      quote: 'Профессиональный подход, прозрачная отчётность, реальные результаты. Работаем уже второй год и планируем продолжать сотрудничество.',
      author: 'Михаил С.',
      position: 'CEO'
    },
    {
      quote: 'Лучшее агентство по SEO из всех, с кем работали. Ребята знают своё дело и всегда на связи. Рекомендую всем, кто хочет реальных результатов.',
      author: 'Елена В.',
      position: 'Marketing Head'
    }
  ];

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

      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sliderRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-gray-500 mb-4 block">
            ОТЗЫВЫ
          </span>
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-black uppercase tracking-tight opacity-0"
          >
            ЧТО ГОВОРЯТ КЛИЕНТЫ
          </h2>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="relative max-w-4xl mx-auto opacity-0">
          {/* Quote icon */}
          <Quote 
            size={48} 
            className="absolute -top-4 -left-4 lg:-top-8 lg:-left-8 text-black/10" 
          />

          {/* Testimonial content */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4 lg:px-12"
                >
                  <blockquote className="text-xl lg:text-2xl leading-relaxed text-gray-800 mb-8">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-lg font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.position}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prevSlide}
              className="p-3 border border-black hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 transition-all duration-300 ${
                    index === currentIndex ? 'bg-black w-6' : 'bg-black/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 border border-black hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
