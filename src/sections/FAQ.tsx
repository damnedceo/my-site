import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem = ({ question, answer, isOpen, onClick, index }: FAQItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 90%',
            once: true
          }
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, [index]);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, {
          height: 'auto',
          duration: 0.4,
          ease: 'power2.out'
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className="border-b border-black/20 opacity-0"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg lg:text-xl font-semibold pr-8 group-hover:text-gray-600 transition-colors">
          {question}
        </span>
        <ChevronDown
          size={24}
          className={`flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <p className="pb-6 text-gray-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const faqs = [
    {
      question: 'Сколько времени занимает продвижение?',
      answer: 'Первые результаты видны через 2-3 месяца — это улучшение технических показателей и рост позиций по низкочастотным запросам. Значимый рост трафика и позиций по высокочастотным запросам обычно наступает через 4-6 месяцев регулярной работы.'
    },
    {
      question: 'Какие гарантии вы даёте?',
      answer: 'Мы гарантируем рост позиций и трафика в рамках agreed KPI. Если в течение 3 месяцев не будет положительной динамики — вернём деньги или продолжим работу бесплатно до достижения результата.'
    },
    {
      question: 'Что входит в стоимость?',
      answer: 'В стоимость входит всё необходимое: технический аудит и оптимизация, подбор и кластеризация семантики, создание и размещение контента, наращивание ссылочной массы, еженедельная отчётность и консультации.'
    },
    {
      question: 'Работаете ли вы с Директом?',
      answer: 'Да, мы настраиваем и ведём контекстную рекламу в Яндекс.Директ. Это может быть как отдельная услуга, так и часть комплексного продвижения. Обычно снижаем стоимость клика на 30-40% при сохранении или увеличении конверсии.'
    },
    {
      question: 'Как происходит оплата?',
      answer: 'Работаем по договору с юридическими и физическими лицами. Оплата — ежемесячно, по факту выполненных работ. Возможна оплата по безналичному расчёту, картой или через СБП.'
    }
  ];

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 lg:py-32 bg-[#f5f5f5]"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-gray-500 mb-4 block">
            ВОПРОСЫ И ОТВЕТЫ
          </span>
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-black uppercase tracking-tight opacity-0"
          >
            FAQ
          </h2>
        </div>

        {/* FAQ items */}
        <div className="bg-white border border-black p-6 lg:p-10">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
