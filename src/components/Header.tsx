
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import NavLinks from './header/NavLinks';
import MobileMenu from './header/MobileMenu';
import UserMenu from './header/UserMenu';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    } else {
      // Navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">Docu2Course</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLinks scrollToSection={scrollToSection} />
          </nav>
          
          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <UserMenu 
              user={user} 
              handleSignOut={handleSignOut} 
              navigate={navigate} 
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        handleSignOut={handleSignOut}
        user={user}
        navigate={navigate}
      />
    </header>
  );
};

export default Header;
