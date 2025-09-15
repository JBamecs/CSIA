import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InitialSetup from '@/components/InitialSetup';
import Questionnaire from '@/components/Questionnaire';
import ResultsPage from '@/components/ResultsPage';

const Tool = () => {
  const [currentStep, setCurrentStep] = useState('initial');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [generatedTopics, setGeneratedTopics] = useState([]);
  const [researchQuestions, setResearchQuestions] = useState([]);

  const handleStart = (mode, subject) => {
    setSelectedMode(mode);
    setSelectedSubject(subject);
    setCurrentStep('questionnaire');
  };

  const handleQuestionnaireComplete = (topics, questions) => {
    setGeneratedTopics(topics);
    setResearchQuestions(questions);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('initial');
    setSelectedMode('');
    setSelectedSubject('');
    setGeneratedTopics([]);
    setResearchQuestions([]);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <AnimatePresence mode="wait">
      {currentStep === 'initial' && (
        <motion.div
          key="initial"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <InitialSetup onStart={handleStart} />
        </motion.div>
      )}

      {currentStep === 'questionnaire' && (
        <motion.div
          key="questionnaire"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Questionnaire
            selectedMode={selectedMode}
            selectedSubject={selectedSubject}
            onComplete={handleQuestionnaireComplete}
            onBack={() => setCurrentStep('initial')}
          />
        </motion.div>
      )}

      {currentStep === 'results' && (
        <motion.div
          key="results"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <ResultsPage
            topics={generatedTopics}
            researchQuestions={researchQuestions}
            selectedMode={selectedMode}
            selectedSubject={selectedSubject}
            onRegenerate={() => setCurrentStep('questionnaire')}
            onRestart={handleRestart}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tool;
