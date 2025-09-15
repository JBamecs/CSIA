import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { generateIdeas } from '@/lib/topicGenerator';
import { Copy, Check, Edit, Save, RefreshCw, FileDown, Home } from 'lucide-react';

const EditableField = ({ initialValue, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
    toast({ title: "Saved!", description: "Your changes have been saved." });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  if (isEditing) {
    return (
      <div className="flex items-start gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border rounded-md bg-white text-base"
          rows={3}
        />
        <Button size="icon" onClick={handleSave} className="bg-green-500 hover:bg-green-600">
          <Save className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="group relative p-2 rounded-md transition hover:bg-blue-50">
      <p className="text-base text-gray-800">{value}</p>
      <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

const ResultsPage = ({ topics, researchQuestions, selectedMode, selectedSubject, onRegenerate, onRestart }) => {
  const [currentTopics, setCurrentTopics] = useState(topics);
  const [currentRQs, setCurrentRQs] = useState(researchQuestions);

  const handleTopicSave = (index, newValue) => {
    const newTopics = [...currentTopics];
    newTopics[index] = newValue;
    setCurrentTopics(newTopics);
  };

  const handleRQSave = (index, newValue) => {
    const newRQs = [...currentRQs];
    newRQs[index] = newValue;
    setCurrentRQs(newRQs);
  };

  const handleFullRegenerate = () => {
    const { topics: newTopics, researchQuestions: newRQs } = generateIdeas(selectedMode, selectedSubject, {});
    setCurrentTopics(newTopics);
    setCurrentRQs(newRQs);
    toast({ title: "Ideas Regenerated!", description: "Here's a fresh batch of topics and questions." });
  };

  const exportToPDF = () => {
    toast({
      title: "🚧 Feature in progress!",
      description: "PDF export is coming soon. You can request it in your next prompt!",
      variant: "default",
    });
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Your Generated Ideas</h1>
        <p className="text-muted-foreground text-lg">Here are some starting points for your {selectedMode.toUpperCase()}. You can edit, copy, or regenerate them.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 text-left mb-12">
        <motion.div 
          className="border border-gray-200 bg-white/70 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Topic Suggestions</h2>
          {currentTopics.map((topic, index) => (
            <div key={index}>
              <EditableField initialValue={topic} onSave={(newValue) => handleTopicSave(index, newValue)} />
              {index < currentTopics.length - 1 && <hr className="my-2" />}
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="border border-gray-200 bg-white/70 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Research Questions</h2>
          {currentRQs.map((rq, index) => (
            <div key={index}>
              <EditableField initialValue={rq} onSave={(newValue) => handleRQSave(index, newValue)} />
              {index < currentRQs.length - 1 && <hr className="my-2" />}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={onRestart} variant="outline" className="h-12 rounded-full px-6 text-base font-semibold">
          <Home className="mr-2 h-4 w-4" /> Start Over
        </Button>
        <Button onClick={onRegenerate} className="gradient-button-secondary h-12 rounded-full px-6 text-base font-semibold shadow-md">
          <RefreshCw className="mr-2 h-4 w-4" /> Modify Answers
        </Button>
        <Button onClick={handleFullRegenerate} className="gradient-button h-14 rounded-full px-8 text-lg font-bold shadow-lg">
          <RefreshCw className="mr-2 h-5 w-5" /> Regenerate All
        </Button>
        <Button onClick={exportToPDF} className="gradient-button-tertiary h-12 rounded-full px-6 text-base font-semibold shadow-md">
          <FileDown className="mr-2 h-4 w-4" /> Export as PDF
        </Button>
      </div>
      
    </motion.div>
  );
};

export default ResultsPage;
