
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

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

  const isActive = (path: string) => {
    if (path.startsWith('#')) {
      return location.hash === path;
    }
    return location.pathname === path;
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
            {!user ? (
              <>
                <a 
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('how-it-works');
                  }}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive('#how-it-works') 
                      ? "text-primary font-semibold" 
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  How It Works
                </a>
                <a 
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive('#features') 
                      ? "text-primary font-semibold" 
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  Features
                </a>
                <a 
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('pricing');
                  }}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive('#pricing') 
                      ? "text-primary font-semibold" 
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  Pricing
                </a>
                <Link 
                  to="/faq" 
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive('/faq') 
                      ? "text-primary font-semibold" 
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  FAQ
                </Link>
                <Link 
                  to="/rag-framework" 
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive('/rag-framework') 
                      ? "text-primary font-semibold" 
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  RAG Framework
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive('/dashboard') 
                      ? "text-primary font-semibold" 
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  My Courses
                </Link>
                <Link 
                  to="/dashboard/settings" 
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive('/dashboard/settings') 
                      ? "text-primary font-semibold" 
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  Settings
                </Link>
              </>
            )}
          </nav>
          
          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent">
                        <span className="text-sm font-medium">
                          {user.attributes.name || user.username}
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-3 p-4">
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                to="/dashboard"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium">Dashboard</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Manage your courses
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <button
                              onClick={handleSignOut}
                              className="w-full text-left block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium">Sign Out</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Log out of your account
                              </p>
                            </button>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/login')}
                  className={cn(
                    isActive('/login') && "bg-secondary"
                  )}
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/signup')}
                  className={cn(
                    isActive('/signup') && "bg-primary/80"
                  )}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {!user ? (
              <>
                <a 
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('how-it-works');
                  }}
                  className={cn(
                    "text-sm font-medium py-2 px-3 rounded-md transition-colors",
                    isActive('#how-it-works') 
                      ? "bg-primary/10 text-primary font-semibold" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  How It Works
                </a>
                <a 
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                  className={cn(
                    "text-sm font-medium py-2 px-3 rounded-md transition-colors",
                    isActive('#features') 
                      ? "bg-primary/10 text-primary font-semibold" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Features
                </a>
                <a 
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('pricing');
                  }}
                  className={cn(
                    "text-sm font-medium py-2 px-3 rounded-md transition-colors",
                    isActive('#pricing') 
                      ? "bg-primary/10 text-primary font-semibold" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Pricing
                </a>
                <Link 
                  to="/faq" 
                  className={cn(
                    "text-sm font-medium py-2 px-3 rounded-md transition-colors",
                    isActive('/faq') 
                      ? "bg-primary/10 text-primary font-semibold" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link 
                  to="/rag-framework" 
                  className={cn(
                    "text-sm font-medium py-2 px-3 rounded-md transition-colors",
                    isActive('/rag-framework') 
                      ? "bg-primary/10 text-primary font-semibold" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  RAG Framework
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className={cn(
                    "text-sm font-medium py-2 px-3 rounded-md transition-colors",
                    isActive('/dashboard') 
                      ? "bg-primary/10 text-primary font-semibold" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Courses
                </Link>
                <Link 
                  to="/dashboard/settings" 
                  className={cn(
                    "text-sm font-medium py-2 px-3 rounded-md transition-colors",
                    isActive('/dashboard/settings') 
                      ? "bg-primary/10 text-primary font-semibold" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
              </>
            )}

            {/* Auth Buttons - Mobile */}
            <div className="pt-4 border-t border-gray-100">
              {user ? (
                <>
                  <div className="py-2 px-3 mb-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium text-gray-700">
                      Signed in as: {user.attributes.name || user.username}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center" 
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full justify-center" 
                    onClick={() => {
                      navigate('/signup');
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
