import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contacts = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  });

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

      // Form
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // Info
      const infoItems = infoRef.current?.querySelectorAll('.info-item');
      if (infoItems && infoItems.length > 0) {
        gsap.fromTo(
          infoItems,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:9999/.netlify/functions/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', website: '', message: '' });
        }, 3000);
      } else {
        alert('Ошибка отправки. Пожалуйста, попробуйте позже или свяжитесь через Telegram.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка отправки. Пожалуйста, попробуйте позже или свяжитесь через Telegram.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'ТЕЛЕФОН',
      content: '+7 (999) 000-00-00',
      link: 'tel:+79990000000'
    },
    {
      icon: <Mail size={24} />,
      title: 'EMAIL',
      content: 'hello@yandexseo.pro',
      link: 'mailto:hello@yandexseo.pro'
    },
    {
      icon: <Send size={24} />,
      title: 'TELEGRAM',
      content: '@damn_seo',
      link: 'https://t.me/damn_seo',
      isExternal: true
    },
    {
      icon: <MapPin size={24} />,
      title: 'АДРЕС',
      content: 'Москва, ул. Примерная, 123',
      link: null
    },
    {
      icon: <Clock size={24} />,
      title: 'РЕЖИМ РАБОТЫ',
      content: 'Пн-Пт: 9:00 - 18:00',
      link: null
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <div ref={heroRef} className="bg-black text-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs tracking-[0.3em] text-white/50 mb-6 block">
            СВЯЖИТЕСЬ С НАМИ
          </span>
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight max-w-3xl opacity-0">
            КОНТАКТЫ
          </h1>
          <p className="text-white/70 text-lg mt-8 max-w-2xl">
            Готовы обсудить ваш проект? Заполните форму или свяжитесь 
            с нами удобным способом. Быстрее всего — в Telegram.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <form ref={formRef} onSubmit={handleSubmit} className="opacity-0">
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">
                  ОСТАВИТЬ ЗАЯВКУ
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-mono text-xs tracking-widest mb-2">
                      ИМЯ *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-black focus:outline-none focus:border-2 transition-all"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs tracking-widest mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-black focus:outline-none focus:border-2 transition-all"
                      placeholder="ivan@company.ru"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-mono text-xs tracking-widest mb-2">
                      ТЕЛЕФОН
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-black focus:outline-none focus:border-2 transition-all"
                      placeholder="+7 (999) 000-00-00"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs tracking-widest mb-2">
                      САЙТ
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-black focus:outline-none focus:border-2 transition-all"
                      placeholder="https://company.ru"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block font-mono text-xs tracking-widest mb-2">
                    СООБЩЕНИЕ
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-black focus:outline-none focus:border-2 transition-all resize-none"
                    placeholder="Расскажите о вашем проекте..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`inline-flex items-center gap-4 px-10 py-5 font-mono text-sm tracking-widest border-2 border-black transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-green-500 text-white border-green-500'
                      : isSubmitting
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'btn-fill hover:text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ОТПРАВКА...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle size={18} />
                      ОТПРАВЛЕНО
                    </>
                  ) : (
                    <>
                      ОТПРАВИТЬ
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div ref={infoRef} className="lg:col-span-2">
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">
                КОНТАКТЫ
              </h2>

              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="info-item opacity-0">
                    <div className="flex items-start gap-4">
                      <div className="text-black">{item.icon}</div>
                      <div>
                        <div className="font-mono text-xs tracking-widest text-gray-500 mb-1">
                          {item.title}
                        </div>
                        {item.link ? (
                          <a 
                            href={item.link}
                            target={item.isExternal ? '_blank' : undefined}
                            rel={item.isExternal ? 'noopener noreferrer' : undefined}
                            className="text-lg hover:text-gray-600 transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <div className="text-lg">{item.content}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Telegram CTA */}
              <div className="mt-12 p-6 bg-black text-white">
                <h3 className="font-mono text-xs tracking-widest text-white/70 mb-3">
                  БЫСТРЫЙ СПОСОБ
                </h3>
                <p className="mb-4 text-white/80">
                  Напишите нам в Telegram — ответим за 15 минут
                </p>
                <a
                  href="https://t.me/damn_seo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 font-mono text-sm tracking-widest hover:bg-white/90 transition-colors"
                >
                  <Send size={18} />
                  НАПИСАТЬ В TELEGRAM
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="h-96 bg-[#f5f5f5] border-t border-black/10 flex items-center justify-center">
        <div className="text-center">
          <MapPin size={48} className="mx-auto mb-4 text-black/30" />
          <p className="font-mono text-sm tracking-widest text-gray-500">
            МОСКВА, УЛ. ПРИМЕРНАЯ, 123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
