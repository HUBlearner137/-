import { Heart, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: '首页', href: '#hero' },
      { name: '资源类型', href: '#categories' },
      { name: '周边资源', href: '#search' },
      { name: '特色推荐', href: '#featured' },
    ],
    resources: [
      { name: '危机支持', href: '#emergency' },
      { name: '个人咨询', href: '#search' },
      { name: '外展项目', href: '#search' },
      { name: '紧急求助', href: '#emergency' },
    ],
    about: [
      { name: '关于我们', href: '#' },
      { name: '联系方式', href: '#' },
      { name: '隐私政策', href: '#' },
      { name: '使用条款', href: '#' },
    ],
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-white pt-20 pb-8">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 fill-cream"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <div className="w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="font-rounded font-bold text-xl text-text-dark">
                  苏大心理资源地图
                </span>
              </div>
              <p className="text-text-muted leading-relaxed mb-6 max-w-sm">
                为苏州大学阳澄湖校区师生提供便捷的心理健康服务指南。我们相信，寻求帮助是勇敢的表现，每个人都值得被倾听和关爱。
              </p>
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-text-muted">
                  <MapPin className="w-4 h-4 mr-3 text-mint" />
                  苏州市相城区济学路8号（苏州大学阳澄湖校区）
                </div>
                <div className="flex items-center text-sm text-text-muted">
                  <Phone className="w-4 h-4 mr-3 text-mint" />
                  0512-67162246（苏大心理中心）
                </div>
                <div className="flex items-center text-sm text-text-muted">
                  <Mail className="w-4 h-4 mr-3 text-mint" />
                  xljk@suda.edu.cn
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-rounded font-bold text-text-dark mb-5">
                导航
              </h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-text-muted hover:text-mint transition-colors relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-mint transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-rounded font-bold text-text-dark mb-5">
                资源
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-text-muted hover:text-mint transition-colors relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-mint transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h4 className="font-rounded font-bold text-text-dark mb-5">
                关于
              </h4>
              <ul className="space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }
                      }}
                      className="text-text-muted hover:text-mint transition-colors relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-mint transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-sm text-text-muted text-center md:text-left">
                © {currentYear} 苏大心理资源地图. 保留所有权利.
              </p>

              {/* Emergency Reminder */}
              <p className="text-sm text-pink font-medium text-center">
                紧急情况请拨打 120 或 110
              </p>

              {/* Disclaimer */}
              <p className="text-xs text-text-muted/60 text-center md:text-right">
                本平台仅供参考，以实际机构信息为准
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
