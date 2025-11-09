import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '../ui/menubar';
import { Menu, Info, ArrowLeft } from 'lucide-react';
import { AboutDialog } from './AboutDialog';

/**
 * Mobile hamburger menu for gallery pages
 * Contains navigation to main app and about dialog
 */
export const GalleryMobileMenu: React.FC = () => {
  const [showAboutDialog, setShowAboutDialog] = useState(false);

  return (
    <>
      <Menubar className="border-none bg-transparent p-0">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              aria-label="Menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </MenubarTrigger>
          <MenubarContent align="start" className="border-border/50">
            <MenubarItem 
              onClick={() => window.location.href = 'https://ascii-motion.app'} 
              className="cursor-pointer"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Go to App</span>
            </MenubarItem>
            
            <MenubarItem onClick={() => setShowAboutDialog(true)} className="cursor-pointer">
              <Info className="mr-2 h-4 w-4" />
              <span>About</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {/* About Dialog */}
      <AboutDialog 
        isOpen={showAboutDialog} 
        onOpenChange={setShowAboutDialog} 
      />
    </>
  );
};
