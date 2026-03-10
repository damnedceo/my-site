import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');

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

      // Featured
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // Posts
      const blogCards = postsRef.current?.querySelectorAll('.blog-card');
      if (blogCards && blogCards.length > 0) {
        gsap.fromTo(
          blogCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: postsRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const categories = [
    { value: 'all', label: 'ВСЕ' },
    { value: 'seo', label: 'SEO' },
    { value: 'marketing', label: 'МАРКЕТИНГ' },
    { value: 'analytics', label: 'АНАЛИТИКА' },
    { value: 'cases', label: 'КЕЙСЫ' },
  ];

  const featuredPost = {
    title: 'КАК ВЫЙТИ В ТОП ЯНДЕКСА В 2024: ПОЛНОЕ РУКОВОДСТВО',
    excerpt: 'Подробный разбор всех факторов ранжирования Яндекса в 2024 году. От технической оптимизации до поведенческих факторов — всё, что нужно знать для успешного продвижения.',
    image: '/case1.jpg',
    date: '15 марта 2024',
    readTime: '15 мин',
    category: 'SEO',
    categorySlug: 'seo'
  };

  const posts = [
    {
      id: 1,
      title: '10 ОШИБОК, КОТОРЫЕ УБИВАЮТ SEO',
      excerpt: 'Рассказываем о самых распространённых ошибках, которые мешают сайтам попасть в топ.',
      date: '10 марта 2024',
      readTime: '8 мин',
      category: 'SEO',
      categorySlug: 'seo'
    },
    {
      id: 2,
      title: 'ЯНДЕКС.ДИРЕКТ: КАК СНИЗИТЬ CPC НА 40%',
      excerpt: 'Практические советы по оптимизации рекламных кампаний в Директе.',
      date: '5 марта 2024',
      readTime: '10 мин',
      category: 'МАРКЕТИНГ',
      categorySlug: 'marketing'
    },
    {
      id: 3,
      title: 'GA4 ПРОТИВ ЯНДЕКС.МЕТРИКИ: ЧТО ВЫБРАТЬ',
      excerpt: 'Сравнение двух популярных систем аналитики для российского рынка.',
      date: '28 февраля 2024',
      readTime: '7 мин',
      category: 'АНАЛИТИКА',
      categorySlug: 'analytics'
    },
    {
      id: 4,
      title: 'КЕЙС: +300% ТРАФИКА ЗА 4 МЕСЯЦА',
      excerpt: 'Как мы вывели интернет-магазин одежды в топ по 200+ запросам.',
      date: '20 февраля 2024',
      readTime: '6 мин',
      category: 'КЕЙСЫ',
      categorySlug: 'cases'
    },
    {
      id: 5,
      title: 'СЕМАНТИЧЕСКОЕ ЯДРО: ПОШАГОВАЯ ИНСТРУКЦИЯ',
      excerpt: 'Как правильно собирать и кластеризовать ключевые слова.',
      date: '15 февраля 2024',
      readTime: '12 мин',
      category: 'SEO',
      categorySlug: 'seo'
    },
    {
      id: 6,
      title: 'E-COMMERCE SEO: СПЕЦИФИКА ПРОДВИЖЕНИЯ МАГАЗИНОВ',
      excerpt: 'Особенности оптимизации интернет-магазинов: фильтры, карточки, категории.',
      date: '8 февраля 2024',
      readTime: '9 мин',
      category: 'SEO',
      categorySlug: 'seo'
    },
  ];

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.categorySlug === activeCategory);

  return (
    <div className="pt-20">
      {/* Hero */}
      <div ref={heroRef} className="bg-black text-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs tracking-[0.3em] text-white/50 mb-6 block">
            БЛОГ
          </span>
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight max-w-3xl opacity-0">
            ПОЛЕЗНЫЕ МАТЕРИАЛЫ
          </h1>
          <p className="text-white/70 text-lg mt-8 max-w-2xl">
            Экспертные статьи о SEO, маркетинге и аналитике. 
            Делимся опытом и лучшими практиками.
          </p>
        </div>
      </div>

      {/* Featured Post */}
      <div ref={featuredRef} className="py-16 lg:py-24 bg-[#f5f5f5] opacity-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs tracking-[0.3em] text-gray-500 mb-8 block">
            ИЗБРАННАЯ СТАТЬЯ
          </span>
          
          <div className="bg-white border border-black overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="h-64 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-black text-white text-xs font-mono tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar size={14} />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock size={14} />
                    {featuredPost.readTime}
                  </span>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight mb-4">
                  {featuredPost.title}
                </h2>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <button className="inline-flex items-center gap-3 font-mono text-sm tracking-widest group">
                  ЧИТАТЬ СТАТЬЮ
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="py-8 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-6 py-2 font-mono text-xs tracking-widest border transition-all duration-300 ${
                  activeCategory === cat.value
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div ref={postsRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="blog-card bg-white border border-black p-6 opacity-0 group cursor-pointer hover:border-2 transition-all duration-300"
              >
                {/* Meta */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-2 text-gray-500 text-xs">
                    <Tag size={12} />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-2 text-gray-500 text-xs">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold uppercase tracking-tight mb-3 group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-black/10">
                  <span className="flex items-center gap-2 text-gray-500 text-xs">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    ЧИТАТЬ
                    <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-24 lg:py-32 bg-black text-white">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight mb-4">
            ПОДПИШИТЕСЬ НА РАССЫЛКУ
          </h2>
          <p className="text-white/70 mb-8">
            Получайте свежие статьи и кейсы раз в неделю. Без спама.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 bg-white text-black placeholder:text-gray-500 font-mono text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-black font-mono text-sm tracking-widest hover:bg-white/90 transition-colors"
            >
              ПОДПИСАТЬСЯ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
