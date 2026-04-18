import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, MapPin, Phone, ExternalLink, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

interface Resource {
  id: string;
  name: string;
  type: string;
  location: string;
  phone: string;
  description: string;
  tags: string[];
  website: string;
}

// 苏州大学阳澄湖校区周边心理资源
const resources: Resource[] = [
  {
    id: '1',
    name: '苏州市广济医院',
    type: 'crisis',
    location: '苏州市相城区广前路11号（距校区约3公里）',
    phone: '0512-65791001',
    description: '苏州市精神卫生中心、心理卫生中心，三级甲等精神专科医院，提供24小时心理危机干预服务',
    tags: ['24小时热线', '危机干预', '专科医院', '医保定点'],
    website: 'https://www.szghyy.com/',
  },
  {
    id: '2',
    name: '苏州市相城人民医院心理科',
    type: 'counseling',
    location: '苏州市相城区阳澄湖东路8号（距校区约5公里）',
    phone: '0512-65791999',
    description: '相城区主要心理咨询机构，开展心理健康评估、心理咨询和心理危机干预等服务',
    tags: ['专业咨询', '医保定点', '心理测评'],
    website: 'http://www.xcyy.com/',
  },
  {
    id: '3',
    name: '苏州市心理卫生中心（平江中心）',
    type: 'counseling',
    location: '苏州市人民路3189号新平江商业广场3楼',
    phone: '0512-65796011',
    description: '提供六大特色心理咨询门诊：婚姻情感、孕产期心理、青少年心理等',
    tags: ['特色门诊', '婚姻咨询', '孕产期心理'],
    website: 'https://www.szghyy.com/',
  },
  {
    id: '4',
    name: '苏州大学附属第四医院精神医学科',
    type: 'counseling',
    location: '苏州工业园区崇文路9号（独墅湖医院）',
    phone: '0512-67982000',
    description: '苏州工业园区精神卫生中心，提供药物、心理、物理治疗等综合诊疗',
    tags: ['综合医院', '心理治疗', '物理治疗'],
    website: 'https://www.sdhmdp.com/',
  },
  {
    id: '5',
    name: '苏州大学附属第二医院心理门诊',
    type: 'counseling',
    location: '苏州市姑苏区三香路1055号',
    phone: '0512-68282000',
    description: '针对职场压力、亲密关系、青少年情绪与学习适应等方向开展服务',
    tags: ['专业咨询', '职场压力', '青少年心理'],
    website: 'https://www.sdfey.com/',
  },
  {
    id: '6',
    name: '苏州市第五人民医院心理科',
    type: 'counseling',
    location: '苏州市相城区广前路10号（距校区约3公里）',
    phone: '0512-65877000',
    description: '苏州市精神卫生服务网络重要组成部分，开展个体心理咨询、团体心理辅导',
    tags: ['专科医院', '团体辅导', '医保定点'],
    website: 'http://www.szdwyy.com/',
  },
  {
    id: '7',
    name: '苏州大学心理健康教育研究中心',
    type: 'outreach',
    location: '苏州大学各校区',
    phone: '0512-67162246',
    description: '面向苏大学生的免费心理咨询服务，提供个体咨询、团体辅导、心理测评',
    tags: ['学生免费', '校内服务', '隐私保护'],
    website: 'https://xlgc.suda.edu.cn/',
  },
  {
    id: '8',
    name: '苏州市立医院心理医学科',
    type: 'counseling',
    location: '苏州市姑苏区道前街26号',
    phone: '0512-62363500',
    description: '综合性医院心理科，提供心理咨询、危机干预、心理康复等服务',
    tags: ['综合医院', '医保定点', '门诊服务'],
    website: 'http://www.szslh.com/',
  },
];

const filters = [
  { id: 'all', label: '全部' },
  { id: 'crisis', label: '危机支持' },
  { id: 'counseling', label: '个人咨询' },
  { id: 'outreach', label: '外展项目' },
];

const ResourceSearch = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredResources, setFilteredResources] = useState(resources);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Search bar animation
      gsap.fromTo(
        searchRef.current,
        { width: '60%', opacity: 0 },
        {
          width: '100%',
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Results animation
      const cards = resultsRef.current?.querySelectorAll('.resource-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: resultsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let filtered = resources;

    if (activeFilter !== 'all') {
      filtered = filtered.filter((r) => r.type === activeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  }, [searchQuery, activeFilter]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crisis':
        return 'bg-pink/10 text-pink border-pink/20';
      case 'counseling':
        return 'bg-mint/10 text-mint border-mint/20';
      case 'outreach':
        return 'bg-blue/10 text-blue border-blue/20';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'crisis':
        return '危机支持';
      case 'counseling':
        return '个人咨询';
      case 'outreach':
        return '外展项目';
      default:
        return type;
    }
  };

  return (
    <section
      id="search"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="font-rounded text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
              周边资源
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              苏州大学阳澄湖校区周边的心理健康服务资源，距离校区从近到远排列
            </p>
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="max-w-3xl mx-auto mb-10">
            <div
              className={`relative transition-all duration-500 ${
                isFocused ? 'scale-[1.02]' : ''
              }`}
            >
              <div
                className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                  isFocused ? 'shadow-glow bg-mint/5' : 'shadow-soft'
                }`}
              />
              <div className="relative flex items-center bg-white rounded-3xl overflow-hidden">
                <Search className="w-5 h-5 text-text-muted ml-5" />
                <Input
                  type="text"
                  placeholder="搜索机构名称、服务类型..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="flex-1 border-0 bg-transparent px-4 py-6 text-text-dark placeholder:text-text-muted/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button className="mr-2 bg-mint hover:bg-mint/90 text-white rounded-2xl px-6">
                  搜索
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Filter className="w-5 h-5 text-text-muted mr-2" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-mint text-white shadow-glow scale-105'
                    : 'bg-white text-text-muted hover:bg-mint/10 hover:text-mint'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Results Grid */}
          <div
            ref={resultsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="resource-card group bg-white rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <Badge
                    variant="outline"
                    className={`${getTypeColor(resource.type)} rounded-full px-3 py-1`}
                  >
                    {getTypeLabel(resource.type)}
                  </Badge>
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-text-muted hover:bg-mint hover:text-white transition-colors"
                    title="访问官网"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Content */}
                <h3 className="font-rounded text-lg font-bold text-text-dark mb-2 group-hover:text-mint transition-colors">
                  {resource.name}
                </h3>
                <p className="text-text-muted text-sm mb-4 line-clamp-2">
                  {resource.description}
                </p>

                {/* Meta */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start text-sm text-text-muted">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 text-mint flex-shrink-0" />
                    <span>{resource.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-text-muted">
                    <Phone className="w-4 h-4 mr-2 text-mint" />
                    {resource.phone}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 bg-cream rounded-full text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-text-muted" />
              </div>
              <h3 className="font-rounded text-xl font-bold text-text-dark mb-2">
                未找到相关资源
              </h3>
              <p className="text-text-muted">
                请尝试其他关键词或筛选条件
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResourceSearch;
