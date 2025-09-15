import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 p-4 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text hidden sm:block">IA/EE Brainstormer</h1>
            </div>
          </motion.div>
        </Link>
        
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
