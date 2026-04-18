import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ExternalLink, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedResource {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  distance: string;
  color: string;
  features: string[];
  website: string;
}

// 苏州大学阳澄湖校区周边特色心理资源
const featuredResources: FeaturedResource[] = [
  {
    id: '1',
    name: '苏州市广济医院',
    category: '精神卫生中心',
    description: '苏州市精神卫生中心、心理卫生中心，三级甲等精神专科医院，距阳澄湖校区约3公里',
    rating: 4.9,
    distance: '约3公里',
    color: 'from-pink/20 to-pink/5',
    features: ['24小时热线', '危机干预', '专科诊疗'],
    website: 'https://www.szghyy.com/',
  },
  {
    id: '2',
    name: '苏州大学心理中心',
    category: '校内服务',
    description: '面向苏大学生的免费心理咨询服务，提供个体咨询、团体辅导、心理测评',
    rating: 4.8,
    distance: '校内',
    color: 'from-mint/20 to-mint/5',
    features: ['学生免费', '隐私保护', '专业团队'],
    website: 'https://xlgc.suda.edu.cn/',
  },
  {
    id: '3',
    name: '苏州市心理卫生中心',
    category: '心理咨询',
    description: '平江中心提供六大特色门诊：婚姻情感、孕产期心理、青少年心理等',
    rating: 4.7,
    distance: '约8公里',
    color: 'from-blue/20 to-blue/5',
    features: ['特色门诊', '婚姻咨询', '青少年心理'],
    website: 'https://www.szghyy.com/',
  },
  {
    id: '4',
    name: '苏州市相城人民医院',
    category: '综合医院',
    description: '相城区主要心理咨询机构，开展心理健康评估、心理咨询服务',
    rating: 4.6,
    distance: '约5公里',
    color: 'from-yellow/30 to-yellow/10',
    features: ['医保定点', '心理测评', '门诊服务'],
    website: 'http://www.xcyy.com/',
  },
  {
    id: '5',
    name: '苏州大学附属第四医院',
    category: '综合医院',
    description: '独墅湖医院精神医学科，提供药物、心理、物理治疗等综合诊疗',
    rating: 4.7,
    distance: '约15公里',
    color: 'from-pink/20 to-pink/5',
    features: ['综合治疗', '物理治疗', '心理治疗'],
    website: 'https://www.sdhmdp.com/',
  },
];

const FeaturedResources = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.featured-title',
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

      gsap.fromTo(
        '.carousel-container',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? featuredResources.length - 1 : prev - 1));
    scrollToCard(activeIndex === 0 ? featuredResources.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === featuredResources.length - 1 ? 0 : prev + 1));
    scrollToCard(activeIndex === featuredResources.length - 1 ? 0 : activeIndex + 1);
  };

  const scrollToCard = (index: number) => {
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll('.featured-card');
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div className="featured-title">
              <h2 className="font-rounded text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
                特色推荐
              </h2>
              <p className="text-text-muted text-lg max-w-xl">
                苏州大学阳澄湖校区周边优质心理健康服务机构
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6 md:mt-0">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border-2 border-mint/30 text-mint hover:bg-mint hover:text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="w-12 h-12 rounded-full border-2 border-mint/30 text-mint hover:bg-mint hover:text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Carousel */}
          <div className="carousel-container relative">
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-grab active:cursor-grabbing"
              style={{ scrollSnapType: 'x mandatory' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {featuredResources.map((resource, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={resource.id}
                    className={`featured-card flex-shrink-0 w-80 sm:w-96 transition-all duration-500 ${
                      isActive ? 'scale-100' : 'scale-95 opacity-80'
                    }`}
                    style={{ scrollSnapAlign: 'center' }}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div
                      className={`relative h-full rounded-3xl p-8 bg-gradient-to-br ${resource.color} border border-white/50 shadow-soft hover:shadow-lg transition-all duration-500`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <span className="text-sm text-text-muted mb-1 block">
                            {resource.category}
                          </span>
                          <h3 className="font-rounded text-2xl font-bold text-text-dark">
                            {resource.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1 bg-white/80 rounded-full px-3 py-1">
                          <Star className="w-4 h-4 text-yellow fill-yellow" />
                          <span className="text-sm font-medium">{resource.rating}</span>
                        </div>
                      </div>

                      {/* Distance Badge */}
                      <div className="flex items-center gap-1 text-sm text-mint mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{resource.distance}</span>
                      </div>

                      {/* Description */}
                      <p className="text-text-muted mb-6 leading-relaxed">
                        {resource.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {resource.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 bg-white/60 rounded-full text-text-dark"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-text-muted">
                          距离校区 <span className="font-bold text-text-dark">{resource.distance}</span>
                        </div>
                        <a
                          href={resource.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-mint hover:bg-white/60 transition-colors"
                        >
                          访问网站
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {featuredResources.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    scrollToCard(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-mint'
                      : 'w-2 bg-mint/30 hover:bg-mint/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources;
