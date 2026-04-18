import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: '张同学',
    avatar: '/avatar-1.jpg',
    role: '阳澄湖校区 大三',
    content: '校心理中心的老师很专业，在我考研焦虑的时候给了我很大帮助。预约方便，完全免费，隐私保护也很好。',
    rating: 5,
  },
  {
    id: '2',
    name: '李同学',
    avatar: '/avatar-2.jpg',
    role: '阳澄湖校区 研一',
    content: '12356热线真的很暖心，深夜压力大的时候打过几次，接线员都很耐心地倾听和开导。',
    rating: 5,
  },
  {
    id: '3',
    name: '王同学',
    avatar: '/avatar-3.jpg',
    role: '阳澄湖校区 大二',
    content: '通过这个地图找到了广济医院，离学校很近，医生很专业。有医保报销，费用也不贵。',
    rating: 5,
  },
  {
    id: '4',
    name: '陈同学',
    avatar: '/avatar-1.jpg',
    role: '阳澄湖校区 大四',
    content: '参加了一次校心理中心组织的团体辅导活动，认识了很多有相似困扰的同学，感觉不再孤单了。',
    rating: 5,
  },
  {
    id: '5',
    name: '刘同学',
    avatar: '/avatar-3.jpg',
    role: '阳澄湖校区 大三',
    content: '相城人民医院心理科离学校就几公里，骑电动车很快就到了。医生态度很好，治疗效果也不错。',
    rating: 5,
  },
  {
    id: '6',
    name: '赵同学',
    avatar: '/avatar-2.jpg',
    role: '阳澄湖校区 研二',
    content: '苏老师热线专门针对青少年，很适合我们学生。有时候学业压力大，打个电话倾诉一下会好很多。',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-title',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pause animation on hover
  useEffect(() => {
    if (row1Ref.current && row2Ref.current) {
      row1Ref.current.style.animationPlayState = isPaused ? 'paused' : 'running';
      row2Ref.current.style.animationPlayState = isPaused ? 'paused' : 'running';
    }
  }, [isPaused]);

  const renderTestimonialCard = (testimonial: Testimonial, index: number) => (
    <div
      key={`${testimonial.id}-${index}`}
      className="flex-shrink-0 w-80 sm:w-96 bg-white rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all duration-500 hover:scale-[1.02] cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Quote Icon */}
      <div className="w-10 h-10 rounded-full bg-mint/10 flex items-center justify-center mb-4">
        <Quote className="w-5 h-5 text-mint" />
      </div>

      {/* Content */}
      <p className="text-text-dark leading-relaxed mb-6">
        "{testimonial.content}"
      </p>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow fill-yellow" />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-rounded font-bold text-text-dark">
            {testimonial.name}
          </div>
          <div className="text-sm text-text-muted">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );

  // Duplicate testimonials for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      <div className="w-full">
        {/* Section Title */}
        <div className="text-center mb-16 px-6">
          <h2 className="testimonials-title font-rounded text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            同学心声
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            听听阳澄湖校区的同学们使用心理资源后的真实感受
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative" style={{ transform: 'rotate(-2deg)' }}>
          {/* Row 1 - Left to Right */}
          <div className="mb-6 overflow-hidden">
            <div
              ref={row1Ref}
              className="flex gap-6 marquee"
              style={{ width: 'fit-content' }}
            >
              {duplicatedTestimonials.map((testimonial, index) =>
                renderTestimonialCard(testimonial, index)
              )}
            </div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="overflow-hidden">
            <div
              ref={row2Ref}
              className="flex gap-6 marquee-reverse"
              style={{ width: 'fit-content' }}
            >
              {[...duplicatedTestimonials].reverse().map((testimonial, index) =>
                renderTestimonialCard(testimonial, index)
              )}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cream to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
