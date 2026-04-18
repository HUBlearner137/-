import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Cloud, Sun, Sparkles, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'expo.out' }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: 'power2.out' }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.6, ease: 'back.out(1.7)' }
      );

      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
        { clipPath: 'circle(100% at 50% 50%)', opacity: 1, duration: 1.2, ease: 'expo.out' }
      );

      // Decorations animation
      gsap.fromTo(
        decorRef.current?.children || [],
        { scale: 0, opacity: 0, rotation: -20 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          delay: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        }
      );

      // Floating animation for decorations
      gsap.to('.float-element', {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });

      // Sun pulse
      gsap.to('.sun-element', {
        scale: 1.1,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-mint/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Text Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-mint/10 rounded-full text-mint text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                苏州大学阳澄湖校区
              </div>

              <h1
                ref={titleRef}
                className="font-rounded text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark leading-tight mb-6"
              >
                校园周边
                <span className="block text-mint">心理健康资源地图</span>
              </h1>

              <p
                ref={subtitleRef}
                className="text-lg text-text-muted max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                为苏州大学阳澄湖校区师生精心整理的心理健康服务指南，
                从校心理中心到周边专业医院，让每一份帮助都触手可及。
              </p>

              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => scrollToSection('#categories')}
                  className="bg-mint hover:bg-mint/90 text-white font-medium rounded-full px-8 py-6 text-base transition-all duration-300 hover:shadow-glow hover:scale-105 group"
                >
                  探索资源
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  onClick={() => scrollToSection('#emergency')}
                  variant="outline"
                  className="border-2 border-pink/30 text-pink hover:bg-pink/10 font-medium rounded-full px-8 py-6 text-base transition-all duration-300"
                >
                  紧急求助
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                {[
                  { number: '8+', label: '周边机构' },
                  { number: '3km', label: '最近距离' },
                  { number: '24h', label: '热线支持' },
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="font-rounded text-2xl sm:text-3xl font-bold text-mint">
                      {stat.number}
                    </div>
                    <div className="text-sm text-text-muted mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image with decorations */}
            <div className="order-1 lg:order-2 relative">
              <div ref={imageRef} className="relative z-10">
                <img
                  src="/hero-image.jpg"
                  alt="心理健康支持"
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-soft"
                />
              </div>

              {/* Floating decorations */}
              <div ref={decorRef} className="absolute inset-0 pointer-events-none">
                {/* Sun */}
                <div className="sun-element float-element absolute -top-4 -right-4 w-16 h-16 bg-yellow rounded-full flex items-center justify-center shadow-lg">
                  <Sun className="w-8 h-8 text-white" />
                </div>

                {/* Clouds */}
                <div className="float-element absolute top-10 -left-8 w-20 h-12 bg-white rounded-full shadow-soft flex items-center justify-center">
                  <Cloud className="w-8 h-8 text-blue/60" />
                </div>

                <div className="float-element absolute bottom-20 -right-6 w-16 h-10 bg-white rounded-full shadow-soft flex items-center justify-center" style={{ animationDelay: '1s' }}>
                  <Cloud className="w-6 h-6 text-blue/40" />
                </div>

                {/* Sparkles */}
                <div className="float-element absolute bottom-10 left-0 w-10 h-10 bg-pink/30 rounded-full flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
                  <Sparkles className="w-5 h-5 text-pink" />
                </div>

                <div className="float-element absolute top-1/3 right-0 w-8 h-8 bg-mint/30 rounded-full flex items-center justify-center" style={{ animationDelay: '1.5s' }}>
                  <Sparkles className="w-4 h-4 text-mint" />
                </div>
              </div>

              {/* Background shape */}
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-mint/20 rounded-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
