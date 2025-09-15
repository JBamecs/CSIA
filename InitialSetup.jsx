import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const InitialSetup = ({ onStart }) => {
  const [mode, setMode] = useState('');
  const [subject, setSubject] = useState('');
  const { user } = useAuth();

  const modes = [
    { id: 'ia', title: 'Internal Assessment (IA)' },
    { id: 'ee', title: 'Extended Essay (EE)' },
  ];

  const subjects = [
    { id: 'biology', name: 'Biology' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'physics', name: 'Physics' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'history', name: 'History' },
    { id: 'geography', name: 'Geography' },
    { id: 'economics', name: 'Economics' },
    { id: 'business', name: 'Business Management' },
    { id: 'computer-science', name: 'Computer Science' },
    { id: 'english', name: 'English Literature' },
    { id: 'visual-arts', name: 'Visual Arts' },
    { id: 'ess', name: 'Environmental Systems' },
    { id: 'psychology', name: 'Psychology' },
    { id: 'music', name: 'Music' },
  ];

  const handleStartClick = () => {
    if (!mode || !subject) {
      toast({
        title: "Selection Incomplete",
        description: "Please select both a mode and a subject to continue.",
        variant: "destructive",
      });
      return;
    }
    onStart(mode, subject);
  };

  return (
    <motion.div 
      className="max-w-2xl mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Welcome, {user?.email.split('@')[0]}!</h1>
      <p className="text-muted-foreground text-lg mb-10">Let's find the perfect topic for your next big project.</p>
      
      <div className="space-y-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label className="block text-left text-sm font-medium text-gray-700 mb-2">Select Assessment Type</label>
          <Select onValueChange={setMode} value={mode}>
            <SelectTrigger className="w-full h-14 rounded-full text-lg px-6 shadow-inner bg-gray-50">
              <SelectValue placeholder="Choose between IA/EE" />
            </SelectTrigger>
            <SelectContent>
              {modes.map((m) => (
                <SelectItem key={m.id} value={m.id}>{m.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <label className="block text-left text-sm font-medium text-gray-700 mb-2">Select Subject</label>
          <Select onValueChange={setSubject} value={subject}>
            <SelectTrigger className="w-full h-14 rounded-full text-lg px-6 shadow-inner bg-gray-50">
              <SelectValue placeholder="Select an IB subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
      >
        <Button 
          onClick={handleStartClick}
          className="gradient-button h-16 rounded-full px-16 text-xl font-semibold shadow-lg"
        >
          START
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default InitialSetup;
