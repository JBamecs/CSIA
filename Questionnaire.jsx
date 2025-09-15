import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { generateIdeas } from '@/lib/topicGenerator';

const Questionnaire = ({ selectedMode, selectedSubject, onComplete, onBack }) => {
  const [answers, setAnswers] = useState({
    interest: '',
    situation: '',
    outcome: '',
  });

  const handleAnswerChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!answers.interest || !answers.situation || !answers.outcome) {
      toast({
        title: "Please complete all fields",
        description: "Your answers help generate better suggestions.",
        variant: "destructive",
      });
      return;
    }
    const { topics, researchQuestions } = generateIdeas(selectedMode, selectedSubject, answers);
    onComplete(topics, researchQuestions);
  };

  const questions = [
    { id: 'interest', label: 'What specific topic or concept are you interested in?' },
    { id: 'situation', label: 'What real-world situation, case study, or context will you investigate?' },
    { id: 'outcome', label: 'What do you aim to prove, evaluate, or discover with this investigation?' },
  ];

  return (
    <motion.div 
      className="max-w-3xl mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Brainstormer</h1>
      <p className="text-muted-foreground text-lg mb-10">Answer these questions to generate tailored ideas.</p>
      
      <div className="space-y-8 mb-12 text-left">
        {questions.map((q, index) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <label htmlFor={q.id} className="block text-lg font-medium text-gray-800 mb-3">{q.label}</label>
            <textarea
              id={q.id}
              name={q.id}
              value={answers[q.id]}
              onChange={handleAnswerChange}
              rows="2"
              className="w-full text-lg p-4 border-2 border-gray-200 rounded-2xl focus:ring-blue-500 focus:border-blue-500 transition shadow-inner bg-gray-50"
              placeholder={`e.g., For ${q.id}...`}
            />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
          <Button 
            onClick={onBack}
            variant="outline"
            className="h-14 rounded-full px-12 text-lg font-semibold w-full sm:w-auto"
          >
            Go Back
          </Button>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: "spring" }}>
          <Button 
            onClick={handleSubmit}
            className="gradient-button h-14 rounded-full px-12 text-lg font-semibold w-full sm:w-auto shadow-lg"
          >
            Generate Ideas
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Questionnaire;
