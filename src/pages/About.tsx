import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Users, Award, TrendingUp, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroTitle = heroRef.current?.querySelector('h1');
      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
          }
        );
      }

      // Content sections
      const contentBlocks = contentRef.current?.querySelectorAll('.content-block');
      if (contentBlocks && contentBlocks.length > 0) {
        gsap.fromTo(
          contentBlocks,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // Values
      const valueCards = valuesRef.current?.querySelectorAll('.value-card');
      if (valueCards && valueCards.length > 0) {
        gsap.fromTo(
          valueCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: valuesRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // Team
      const teamMembers = teamRef.current?.querySelectorAll('.team-member');
      if (teamMembers && teamMembers.length > 0) {
        gsap.fromTo(
          teamMembers,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: teamRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: <Target size={32} />,
      title: 'РЕЗУЛЬТАТ',
      description: 'Мы фокусируемся на достижении конкретных KPI, а не на процессе'
    },
    {
      icon: <Users size={32} />,
      title: 'ПРОЗРАЧНОСТЬ',
      description: 'Полная открытость в работе: отчёты, метрики, стратегия'
    },
    {
      icon: <Award size={32} />,
      title: 'КАЧЕСТВО',
      description: 'Только белые методы оптимизации и проверенные решения'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'РАЗВИТИЕ',
      description: 'Постоянное обучение и внедрение новых технологий'
    }
  ];

  const team = [
    { name: 'Алексей Морозов', position: 'CEO & SEO-стратег', initial: 'А' },
    { name: 'Мария Иванова', position: 'Head of Content', initial: 'М' },
    { name: 'Дмитрий Петров', position: 'Technical SEO Lead', initial: 'Д' },
    { name: 'Анна Сидорова', position: 'PPC Specialist', initial: 'А' },
  ];

  const achievements = [
    '150+ успешно продвинутых проектов',
    '7 лет опыта в SEO-индустрии',
    '98% клиентов продолжают сотрудничество',
    'Средняя позиция в ТОП-3 по целевым запросам',
    'Сертифицированные специалисты Яндекса',
    'Члены РАЭК (Российская ассоциация электронных коммуникаций)'
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <div ref={heroRef} className="bg-black text-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs tracking-[0.3em] text-white/50 mb-6 block">
            О КОМПАНИИ
          </span>
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight max-w-3xl opacity-0">
            МЫ ПОМОГАЕМ БИЗНЕСУ РАСТИ В ИНТЕРНЕТЕ
          </h1>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Story */}
            <div className="content-block opacity-0">
              <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-8">
                НАША ИСТОРИЯ
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  YandexSEO.Pro была основана в 2017 году группой энтузиастов SEO, 
                  объединённых общей целью — помогать бизнесу расти через органический 
                  трафик из поисковых систем.
                </p>
                <p>
                  За 7 лет мы выросли из небольшой команды фрилансеров в полноценное 
                  агентство с штатом из 15 специалистов. За это время мы продвинули 
                  более 150 проектов в различных нишах — от интернет-магазинов до 
                  крупных B2B-порталов.
                </p>
                <p>
                  Мы верим в честный подход к SEO: только белые методы оптимизации, 
                  прозрачная отчётность и реальные результаты. Наша репутация — 
                  главный актив, и мы дорожим каждым клиентом.
                </p>
              </div>
            </div>

            {/* Achievements */}
            <div className="content-block opacity-0">
              <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-8">
                ДОСТИЖЕНИЯ
              </h2>
              <ul className="space-y-4">
                {achievements.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <CheckCircle size={20} className="flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div ref={valuesRef} className="py-24 lg:py-32 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-gray-500 mb-4 block">
              НАШИ ПРИНЦИПЫ
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight">
              ЦЕННОСТИ
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card bg-white border border-black p-8 opacity-0"
              >
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div ref={teamRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-gray-500 mb-4 block">
              НАША КОМАНДА
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight">
              ЭКСПЕРТЫ
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-member text-center opacity-0"
              >
                <div className="w-24 h-24 bg-black text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                  {member.initial}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
