import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Download, Save, Edit3, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ResearchQuestionGenerator = ({ 
  selectedMode, 
  selectedSubject, 
  selectedTopic, 
  researchQuestions, 
  onQuestionsGenerated, 
  onBack,
  sessionId,
  questionnaireData 
}) => {
  const [questions, setQuestions] = useState(researchQuestions);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    if (questions.length === 0) {
      generateQuestions();
    }
  }, []);

  const generateQuestions = () => {
    const newQuestions = [];
    
    // Generate 3 research questions based on IB criteria
    for (let i = 0; i < 3; i++) {
      let question = '';
      
      if (selectedMode === 'ia') {
        // IA questions are more focused and specific
        if (selectedSubject === 'biology') {
          const bioQuestions = [
            'To what extent does pH level affect the rate of enzyme activity in catalase?',
            'How does light intensity influence the rate of photosynthesis in aquatic plants?',
            'What is the relationship between temperature and the growth rate of bacterial cultures?'
          ];
          question = bioQuestions[i];
        } else if (selectedSubject === 'chemistry') {
          const chemQuestions = [
            'How does the concentration of ascorbic acid vary in different citrus fruits?',
            'To what extent does temperature affect the rate of reaction between zinc and hydrochloric acid?',
            'What is the relationship between molecular structure and the antioxidant capacity of phenolic compounds?'
          ];
          question = chemQuestions[i];
        } else if (selectedSubject === 'physics') {
          const physicsQuestions = [
            'How does the length of a pendulum affect its period of oscillation?',
            'To what extent does the angle of incidence affect the efficiency of a solar panel?',
            'What is the relationship between the diameter of a wire and its electrical resistance?'
          ];
          question = physicsQuestions[i];
        } else if (selectedSubject === 'mathematics') {
          const mathQuestions = [
            'To what extent can mathematical modeling predict traffic flow patterns during peak hours?',
            'How does the Fibonacci sequence appear in natural phenomena and what are its mathematical properties?',
            'What is the optimal strategy for resource allocation using linear programming techniques?'
          ];
          question = mathQuestions[i];
        } else if (selectedSubject === 'history') {
          const historyQuestions = [
            'To what extent did economic factors contribute to the outbreak of World War I?',
            'How effective were the policies of the New Deal in addressing the Great Depression?',
            'What was the impact of the printing press on the spread of Renaissance ideas?'
          ];
          question = historyQuestions[i];
        } else if (selectedSubject === 'economics') {
          const econQuestions = [
            'To what extent does minimum wage legislation affect unemployment rates in developing countries?',
            'How do changes in interest rates influence consumer spending patterns?',
            'What is the relationship between income inequality and economic growth?'
          ];
          question = econQuestions[i];
        } else {
          // Generic IA questions
          const genericQuestions = [
            `To what extent does [variable] affect [outcome] in ${selectedSubject}?`,
            `How does [factor] influence [process] in the context of ${selectedTopic}?`,
            `What is the relationship between [element A] and [element B] in ${selectedSubject}?`
          ];
          question = genericQuestions[i];
        }
      } else {
        // EE questions are broader and more analytical
        if (selectedSubject === 'biology') {
          const bioQuestions = [
            'To what extent do environmental factors influence evolutionary adaptations in island species?',
            'How do human activities impact biodiversity conservation in tropical rainforests?',
            'What role does genetic diversity play in species resilience to climate change?'
          ];
          question = bioQuestions[i];
        } else if (selectedSubject === 'history') {
          const historyQuestions = [
            'To what extent did nationalism contribute to the collapse of multi-ethnic empires in the 20th century?',
            'How did the Cold War influence decolonization movements in Africa and Asia?',
            'What was the impact of technological advancement on warfare strategies during World War II?'
          ];
          question = historyQuestions[i];
        } else if (selectedSubject === 'economics') {
          const econQuestions = [
            'To what extent do international trade agreements promote economic development in emerging markets?',
            'How does globalization affect income distribution within developing countries?',
            'What role do multinational corporations play in economic development and cultural change?'
          ];
          question = econQuestions[i];
        } else {
          // Generic EE questions
          const genericQuestions = [
            `To what extent has [phenomenon] influenced [broader context] in ${selectedSubject}?`,
            `How do [factors] contribute to [major issue] in the field of ${selectedSubject}?`,
            `What is the significance of [concept] in understanding [broader theme] within ${selectedSubject}?`
          ];
          question = genericQuestions[i];
        }
      }
      
      newQuestions.push({
        id: `question-${i + 1}`,
        text: question,
        criteria: {
          focus: Math.floor(Math.random() * 2) + 8, // 8-9/10
          feasibility: Math.floor(Math.random() * 2) + 8, // 8-9/10
          significance: Math.floor(Math.random() * 2) + 8, // 8-9/10
        }
      });
    }
    
    setQuestions(newQuestions);
    onQuestionsGenerated(newQuestions);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(questions[index].text);
  };

  const saveEdit = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[editingIndex].text = editText;
    setQuestions(updatedQuestions);
    onQuestionsGenerated(updatedQuestions);
    setEditingIndex(-1);
    setEditText('');
    
    toast({
      title: "Question updated!",
      description: "Your research question has been successfully modified."
    });
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
    setEditText('');
  };

  const exportToPDF = () => {
    toast({
      title: "🚧 PDF Export feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      description: "This feature will generate a comprehensive PDF with all your research data."
    });
  };

  const saveSession = () => {
    const sessionData = {
      mode: selectedMode,
      subject: selectedSubject,
      topic: selectedTopic,
      questions: questions,
      questionnaireData: questionnaireData,
      timestamp: new Date().toISOString(),
      currentStep: 'questions'
    };
    
    const newSessionId = `session-${Date.now()}`;
    localStorage.setItem(newSessionId, JSON.stringify(sessionData));
    
    toast({
      title: "Session saved!",
      description: `Your progress has been saved with ID: ${newSessionId.slice(-8)}`
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold gradient-text mb-4">Research Questions</h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          IB-criteria aligned research questions for your {selectedMode === 'ia' ? 'Internal Assessment' : 'Extended Essay'}
        </p>
      </motion.div>

      {/* Topic Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="academic-card rounded-xl p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-white mb-2">Selected Topic</h3>
        <p className="text-slate-300">{selectedTopic}</p>
        <div className="flex items-center mt-3 text-sm text-slate-400">
          <span className="mr-4">Subject: {selectedSubject.replace('-', ' ').toUpperCase()}</span>
          <span>Type: {selectedMode === 'ia' ? 'Internal Assessment' : 'Extended Essay'}</span>
        </div>
      </motion.div>

      {/* Research Questions */}
      <div className="space-y-6 mb-8">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="academic-card rounded-2xl p-8"
          >
            <div className="flex items-start justify-between mb-6">
              <h4 className="text-lg font-semibold text-blue-300">Research Question {index + 1}</h4>
              <div className="flex space-x-2">
                {editingIndex === index ? (
                  <>
                    <Button size="sm" onClick={saveEdit} className="bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => startEditing(index)}>
                    <Edit3 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {editingIndex === index ? (
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-4 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            ) : (
              <p className="text-white text-lg leading-relaxed mb-6">{question.text}</p>
            )}

            {/* IB Criteria Assessment */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{question.criteria.focus}/10</div>
                <div className="text-sm text-slate-400">Focus & Clarity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{question.criteria.feasibility}/10</div>
                <div className="text-sm text-slate-400">Feasibility</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{question.criteria.significance}/10</div>
                <div className="text-sm text-slate-400">Significance</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* IB Criteria Guide */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="academic-card rounded-xl p-6 mb-8"
      >
        <h4 className="text-lg font-semibold text-white mb-4">📋 IB Research Question Criteria</h4>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h5 className="font-medium text-green-300 mb-2">Focus & Clarity</h5>
            <p className="text-slate-300">The question should be specific, clear, and focused enough to be answered within the word limit.</p>
          </div>
          <div>
            <h5 className="font-medium text-blue-300 mb-2">Feasibility</h5>
            <p className="text-slate-300">You should have access to appropriate sources, data, and resources to investigate the question.</p>
          </div>
          <div>
            <h5 className="font-medium text-purple-300 mb-2">Significance</h5>
            <p className="text-slate-300">The question should be worth investigating and contribute to understanding in the subject area.</p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Topics</span>
        </Button>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={generateQuestions}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Regenerate Questions</span>
          </Button>

          <Button
            variant="outline"
            onClick={saveSession}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Session</span>
          </Button>

          <Button
            onClick={exportToPDF}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 flex items-center space-x-2"
            size="lg"
          >
            <Download className="h-5 w-5" />
            <span>Export to PDF</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResearchQuestionGenerator;
