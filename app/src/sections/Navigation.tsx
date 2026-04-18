import { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '压力游戏', href: '#game' },
    { name: '首页', href: '#hero' },
    { name: '资源类型', href: '#categories' },
    { name: '周边资源', href: '#search' },
    { name: '特色推荐', href: '#featured' },
    { name: '同学心声', href: '#testimonials' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 custom-expo ${
          isScrolled
            ? 'py-3 mx-auto mt-3 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl rounded-full glass-effect shadow-soft'
            : 'py-5 w-full bg-transparent'
        }`}
      >
        <div className={`${isScrolled ? 'px-6' : 'px-6 lg:px-12'}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 rounded-full bg-mint flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-rounded font-bold text-lg text-text-dark">
                苏大心理资源
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="relative px-4 py-2 text-sm font-medium text-text-dark/80 hover:text-text-dark transition-colors duration-300 group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-0 rounded-full bg-mint/0 group-hover:bg-mint/10 transition-colors duration-300" />
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-mint scale-0 group-hover:scale-100 transition-transform duration-300" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection('#emergency')}
                className="bg-pink hover:bg-pink/90 text-text-dark font-medium rounded-full px-5 py-2 text-sm transition-all duration-300 hover:shadow-glow-pink hover:scale-105"
              >
                紧急求助
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-mint/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-text-dark" />
              ) : (
                <Menu className="w-6 h-6 text-text-dark" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 right-4 w-64 bg-white rounded-3xl shadow-soft p-6 transition-all duration-500 custom-fluid ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-4 scale-95'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="px-4 py-3 text-text-dark hover:bg-mint/10 rounded-xl transition-colors duration-300"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {link.name}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                onClick={() => scrollToSection('#emergency')}
                className="w-full bg-pink hover:bg-pink/90 text-text-dark font-medium rounded-full"
              >
                紧急求助
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
