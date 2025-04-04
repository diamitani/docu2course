
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  label: string;
  isHash?: boolean;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, label, isHash = false, onClick }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path.startsWith('#')) {
      return location.hash === path;
    }
    return location.pathname === path;
  };

  return (
    <>
      {isHash ? (
        <a 
          href={href}
          onClick={(e) => {
            e.preventDefault();
            if (onClick) onClick();
          }}
          className={cn(
            "text-sm font-medium transition-colors",
            isActive(href) 
              ? "text-primary font-semibold" 
              : "text-gray-700 hover:text-primary"
          )}
        >
          {label}
        </a>
      ) : (
        <Link 
          to={href} 
          className={cn(
            "text-sm font-medium transition-colors",
            isActive(href) 
              ? "text-primary font-semibold" 
              : "text-gray-700 hover:text-primary"
          )}
          onClick={onClick}
        >
          {label}
        </Link>
      )}
    </>
  );
};

interface NavLinksProps {
  scrollToSection: (sectionId: string) => void;
  setIsMenuOpen?: (isOpen: boolean) => void;
  isMobile?: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ 
  scrollToSection, 
  setIsMenuOpen,
  isMobile = false 
}) => {
  const className = isMobile 
    ? "text-sm font-medium py-2 px-3 rounded-md transition-colors" 
    : "";
  
  const closeMenu = () => {
    if (setIsMenuOpen) setIsMenuOpen(false);
  };

  return (
    <>
      <NavLink 
        href="#how-it-works"
        label="How It Works"
        isHash={true}
        onClick={() => {
          scrollToSection('how-it-works');
          closeMenu();
        }}
      />
      <NavLink 
        href="#features"
        label="Features"
        isHash={true}
        onClick={() => {
          scrollToSection('features');
          closeMenu();
        }}
      />
      <NavLink 
        href="/pricing" 
        label="Pricing"
        onClick={closeMenu}
      />
      <NavLink 
        href="/faq" 
        label="FAQ"
        onClick={closeMenu}
      />
      <NavLink 
        href="/rag-framework" 
        label="RAG Framework"
        onClick={closeMenu}
      />
      <NavLink 
        href="/dashboard" 
        label="Dashboard"
        onClick={closeMenu}
      />
    </>
  );
};

export default NavLinks;
