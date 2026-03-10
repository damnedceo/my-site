import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        columnsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            once: true
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    { label: 'SEO-Аудит', href: '/services' },
    { label: 'Продвижение', href: '/services' },
    { label: 'Яндекс.Директ', href: '/services' },
    { label: 'Контент', href: '/services' },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-white border-t border-black"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Logo & Description */}
          <div
            ref={(el) => { if (el) columnsRef.current[0] = el; }}
            className="opacity-0"
          >
            <Link to="/" className="font-mono text-lg font-bold tracking-wider mb-4 block">
              YANDEXSEO.PRO
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Профессиональное продвижение сайтов в Яндекс с 2017 года. 
              Гарантия результатов, прозрачная отчётность.
            </p>
            <div className="flex gap-4">
              <a
                href="https://t.me/damn_seo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-black hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Telegram"
              >
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div
            ref={(el) => { if (el) columnsRef.current[1] = el; }}
            className="opacity-0"
          >
            <h4 className="font-mono text-sm tracking-widest mb-6">УСЛУГИ</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.href}
                    className="text-gray-600 hover:text-black transition-colors link-underline text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div
            ref={(el) => { if (el) columnsRef.current[2] = el; }}
            className="opacity-0"
          >
            <h4 className="font-mono text-sm tracking-widest mb-6">НАВИГАЦИЯ</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-black transition-colors link-underline text-sm"
                >
                  О компании
                </Link>
              </li>
              <li>
                <Link
                  to="/cases"
                  className="text-gray-600 hover:text-black transition-colors link-underline text-sm"
                >
                  Кейсы
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-600 hover:text-black transition-colors link-underline text-sm"
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="text-gray-600 hover:text-black transition-colors link-underline text-sm"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contacts */}
          <div
            ref={(el) => { if (el) columnsRef.current[3] = el; }}
            className="opacity-0"
          >
            <h4 className="font-mono text-sm tracking-widest mb-6">КОНТАКТЫ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Send size={16} className="flex-shrink-0 mt-1" />
                <a 
                  href="https://t.me/damn_seo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  @damn_seo
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="flex-shrink-0 mt-1" />
                <a 
                  href="tel:+79990000000" 
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  +7 (999) 000-00-00
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="flex-shrink-0 mt-1" />
                <a 
                  href="mailto:hello@yandexseo.pro" 
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  hello@yandexseo.pro
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="flex-shrink-0 mt-1" />
                <span className="text-gray-600 text-sm">
                  Москва, ул. Примерная, 123
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 YandexSEO.Pro. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-500 hover:text-black transition-colors text-sm">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
