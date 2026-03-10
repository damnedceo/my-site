import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  
  const [url, setUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Form entrance
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );

      // Decorative lines
      gsap.fromTo(
        lineLeftRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true
          }
        }
      );

      gsap.fromTo(
        lineRightRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          delay: 0.5,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Аноним (быстрая заявка)',
          email: 'Не указан',
          phone: 'Не указан',
          website: url,
          message: 'Заявка на бесплатный SEO-аудит с главной страницы'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setUrl('');
        }, 3000);
      } else {
        alert('Ошибка отправки. Пожалуйста, свяжитесь через Telegram: @damn_seo');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка отправки. Пожалуйста, свяжитесь через Telegram: @damn_seo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Decorative lines */}
      <div
        ref={lineLeftRef}
        className="absolute top-1/2 left-0 w-1/4 h-px bg-white/20 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
      <div
        ref={lineRightRef}
        className="absolute top-1/2 right-0 w-1/4 h-px bg-white/20 origin-right"
        style={{ transform: 'scaleX(0)' }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-4xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6 opacity-0"
        >
          ГОТОВЫ ВЫЙТИ В ТОП?
        </h2>

        {/* Subtitle */}
        <p className="text-lg lg:text-xl text-white/70 mb-12">
          Получите бесплатный SEO-аудит вашего сайта
        </p>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto opacity-0"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://ваш-сайт.ru"
            className="flex-1 px-6 py-4 bg-white text-black placeholder:text-gray-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className={`pulse-animation group inline-flex items-center justify-center gap-3 px-8 py-4 font-mono text-sm tracking-widest transition-all duration-300 ${
              isSubmitted
                ? 'bg-green-500 text-white'
                : isSubmitting
                ? 'bg-gray-300 text-black cursor-not-allowed'
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                ОТПРАВКА...
              </>
            ) : isSubmitted ? (
              <>
                <Check size={18} />
                ОТПРАВЛЕНО
              </>
            ) : (
              <>
                ЗАКАЗАТЬ АУДИТ
                <Send 
                  size={18} 
                  className="transition-transform duration-300 group-hover:translate-x-1" 
                />
              </>
            )}
          </button>
        </form>

        {/* Trust text */}
        <p className="mt-8 text-white/50 text-sm font-mono">
          Ответ в течение 24 часов. Без спама и обязательств.
        </p>

        {/* Quick Telegram link */}
        <a
          href="https://t.me/damn_seo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 text-white/70 hover:text-white transition-colors text-sm"
        >
          <Send size={14} />
          Или напишите нам в Telegram: @damn_seo
        </a>
      </div>
    </section>
  );
};

export default CTA;
