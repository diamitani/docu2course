
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavLinks from './NavLinks';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  handleSignOut: () => void;
  user: any;
  navigate: (path: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
  handleSignOut,
  user,
  navigate
}) => {
  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg">
      <nav className="flex flex-col space-y-4">
        <NavLinks 
          scrollToSection={scrollToSection} 
          setIsMenuOpen={setIsMenuOpen}
          isMobile={true}
        />

        {/* Auth Buttons - Mobile */}
        <div className="pt-4 border-t border-gray-100">
          {user ? (
            <>
              <div className="py-2 px-3 mb-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-700">
                  Signed in as: {user.name || "User"}
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
  );
};

export default MobileMenu;
