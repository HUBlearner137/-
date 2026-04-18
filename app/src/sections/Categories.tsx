import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, User, Users, BookOpen, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const categories: Category[] = [
  {
    id: 'crisis',
    icon: Phone,
    title: '危机支持',
    description: '24小时心理援助热线，紧急情况下随时为您提供帮助',
    color: 'text-pink',
    bgColor: 'bg-pink/10 hover:bg-pink/20',
  },
  {
    id: 'counseling',
    icon: User,
    title: '个人咨询',
    description: '校内外专业心理咨询师一对一服务，保护隐私',
    color: 'text-mint',
    bgColor: 'bg-mint/10 hover:bg-mint/20',
  },
  {
    id: 'outreach',
    icon: Users,
    title: '团体辅导',
    description: '心理健康活动、团体辅导和同伴支持小组',
    color: 'text-blue',
    bgColor: 'bg-blue/10 hover:bg-blue/20',
  },
  {
    id: 'selfhelp',
    icon: BookOpen,
    title: '自助资源',
    description: '心理测评工具、自助学习资料和心理健康知识库',
    color: 'text-yellow',
    bgColor: 'bg-yellow/10 hover:bg-yellow/30',
  },
];

const Categories = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.category-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { rotateX: 90, opacity: 0, y: 30 },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (id: string | null) => {
    setHoveredCard(id);
  };

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2
              ref={titleRef}
              className="font-rounded text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark mb-4"
            >
              资源类型
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              根据您的需求，选择适合的心理健康支持服务
            </p>
          </div>

          {/* Category Cards */}
          <div
            ref={cardsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isHovered = hoveredCard === category.id;

              return (
                <div
                  key={category.id}
                  className="category-card group relative"
                  onMouseEnter={() => handleCardHover(category.id)}
                  onMouseLeave={() => handleCardHover(null)}
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className={`relative h-full p-8 rounded-3xl ${category.bgColor} border border-transparent hover:border-mint/20 transition-all duration-500 cursor-pointer ${
                      isHovered ? 'shadow-soft scale-[1.02] -translate-y-2' : ''
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-6 transition-transform duration-500 ${
                        isHovered ? 'rotate-[360deg] scale-110' : ''
                      }`}
                    >
                      <Icon className={`w-7 h-7 ${category.color}`} />
                    </div>

                    {/* Content */}
                    <h3 className="font-rounded text-xl font-bold text-text-dark mb-3">
                      {category.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-6">
                      {category.description}
                    </p>

                    {/* Arrow */}
                    <div
                      className={`flex items-center text-sm font-medium ${category.color} transition-all duration-300 ${
                        isHovered ? 'translate-x-2' : ''
                      }`}
                    >
                      <span>了解更多</span>
                      <ArrowRight
                        className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                          isHovered ? 'translate-x-1' : ''
                        }`}
                      />
                    </div>

                    {/* Decorative dot */}
                    <div
                      className={`absolute top-4 right-4 w-2 h-2 rounded-full ${category.color.replace(
                        'text-',
                        'bg-'
                      )} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
