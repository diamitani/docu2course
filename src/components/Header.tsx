
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const handleFeaturesClick = (e: React.MouseEvent) => {
    // Check if we're on the index page
    if (window.location.pathname === '/') {
      e.preventDefault();
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
      handleNavClick();
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-medium tracking-tight">
            docu<span className="text-primary">2</span>course
          </Link>
        </div>
        
        <nav className={cn(
          "md:flex items-center space-x-8 md:space-y-0 transition-all",
          menuOpen 
            ? "absolute top-full left-0 right-0 flex flex-col items-center space-y-4 py-6 bg-white shadow-md" 
            : "hidden md:flex"
        )}>
          <Link 
            to="/#features" 
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={handleFeaturesClick}
          >
            Features
          </Link>
          <Link 
            to="/#how-it-works" 
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={handleNavClick}
          >
            How It Works
          </Link>
          <Link 
            to="/rag-framework" 
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={handleNavClick}
          >
            RAG Framework
          </Link>
          <Link 
            to="/faq" 
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={handleNavClick}
          >
            FAQ
          </Link>
          <Link 
            to="/#pricing" 
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={handleNavClick}
          >
            Pricing
          </Link>
          <Button 
            variant="default" 
            size="sm" 
            className="ml-4" 
            onClick={() => {
              document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
              handleNavClick();
            }}
          >
            Get Started
          </Button>
        </nav>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
