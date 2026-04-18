import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, AlertCircle, Clock, Heart, MessageCircle, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  description: string;
  available: string;
  icon: React.ElementType;
  color: string;
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: '苏州心理援助热线',
    phone: '12356',
    description: '苏州市统一心理援助热线，7×24小时免费服务，依托苏州市广济医院',
    available: '24小时',
    icon: Phone,
    color: 'bg-pink',
  },
  {
    id: '2',
    name: '苏州市广济医院热线',
    phone: '0512-65791001',
    description: '苏州市精神卫生中心专业心理危机干预热线',
    available: '24小时',
    icon: Heart,
    color: 'bg-mint',
  },
  {
    id: '3',
    name: '"苏老师"热线（青少年）',
    phone: '0512-65202000',
    description: '苏州市未成年人健康成长指导中心，面向青少年提供心理支持',
    available: '工作日 9:00-17:00',
    icon: GraduationCap,
    color: 'bg-blue',
  },
  {
    id: '4',
    name: '苏州大学心理中心',
    phone: '0512-67162246',
    description: '苏州大学心理健康教育研究中心，面向在校学生提供免费咨询',
    available: '工作日 8:30-17:00',
    icon: MessageCircle,
    color: 'bg-yellow',
  },
];

const Emergency = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.emergency-title',
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

      const cards = contentRef.current?.querySelectorAll('.emergency-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="emergency"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink/20 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-mint/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Alert Banner */}
          <div className="emergency-title mb-12">
            <div className="bg-gradient-to-r from-pink/20 to-pink/5 rounded-3xl p-8 border border-pink/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-pink flex items-center justify-center flex-shrink-0 animate-pulse">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="font-rounded text-2xl sm:text-3xl font-bold text-text-dark mb-2">
                    如果您正处于危机中
                  </h2>
                  <p className="text-text-muted">
                    请不要独自承受。苏州地区以下热线提供专业支持，随时为您提供帮助。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts Grid */}
          <div
            ref={contentRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {emergencyContacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <div
                  key={contact.id}
                  className="emergency-card group bg-white rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${contact.color} flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-rounded text-lg font-bold text-text-dark mb-2">
                    {contact.name}
                  </h3>
                  <p className="text-text-muted text-sm mb-4">
                    {contact.description}
                  </p>

                  {/* Phone */}
                  <a
                    href={`tel:${contact.phone}`}
                    className="block text-2xl font-bold text-mint hover:text-pink transition-colors mb-3"
                  >
                    {contact.phone}
                  </a>

                  {/* Availability */}
                  <div className="flex items-center text-sm text-text-muted">
                    <Clock className="w-4 h-4 mr-2" />
                    {contact.available}
                  </div>

                  {/* Call Button */}
                  <Button
                    className={`w-full mt-5 ${contact.color} hover:opacity-90 text-white rounded-xl transition-all duration-300 hover:shadow-lg`}
                    onClick={() => window.open(`tel:${contact.phone}`)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    立即拨打
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-text-muted text-sm">
              如果您或他人面临立即的生命危险，请直接拨打
              <a href="tel:120" className="text-pink font-bold mx-1 hover:underline">
                120
              </a>
              急救电话或
              <a href="tel:110" className="text-pink font-bold mx-1 hover:underline">
                110
              </a>
              报警电话
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Emergency;
