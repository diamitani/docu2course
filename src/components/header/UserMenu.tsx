
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

interface UserMenuProps {
  user: any;
  handleSignOut: () => void;
  navigate: (path: string) => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, handleSignOut, navigate }) => {
  if (!user) {
    return (
      <>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
        <Button 
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            <span className="text-sm font-medium">
              {user.name || "User"}
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
  );
};

export default UserMenu;
