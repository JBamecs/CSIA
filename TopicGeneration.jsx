import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RefreshCw, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TopicGeneration = ({ topics, selectedTopic, onTopicSelect, onRegenerate, onBack }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold gradient-text mb-4">Generated Topic Suggestions</h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Based on your responses, here are personalized research topics tailored to your interests and academic requirements.
        </p>
      </motion.div>

      <div className="grid gap-6 mb-8">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`
              academic-card rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-[1.02]
              ${selectedTopic === topic.title ? 'ring-2 ring-blue-400 pulse-glow' : 'hover:shadow-2xl'}
            `}
            onClick={() => onTopicSelect(topic.title)}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Topic {index + 1}</h3>
                  <div className="flex items-center text-sm text-emerald-400">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>{topic.relevance}% Relevance Match</span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-white mb-3 leading-relaxed">
              {topic.title}
            </h4>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              {topic.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                Research-focused
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                IB Criteria Aligned
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                Feasible Scope
              </span>
            </div>

            {selectedTopic === topic.title && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="border-t border-slate-600 pt-4"
              >
                <p className="text-blue-300 font-medium">
                  ✓ Selected - Click "Continue" to generate research questions for this topic
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="academic-card rounded-xl p-6 mb-8"
      >
        <h4 className="text-lg font-semibold text-white mb-3">💡 Topic Selection Tips</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div>
            <p className="font-medium text-blue-300 mb-1">Consider Feasibility:</p>
            <p>Ensure you have access to necessary resources and data for your investigation.</p>
          </div>
          <div>
            <p className="font-medium text-purple-300 mb-1">Personal Interest:</p>
            <p>Choose a topic that genuinely interests you - you'll be working on it for months!</p>
          </div>
          <div>
            <p className="font-medium text-green-300 mb-1">Scope Appropriateness:</p>
            <p>Make sure the topic fits within your word limit and time constraints.</p>
          </div>
          <div>
            <p className="font-medium text-orange-300 mb-1">Academic Rigor:</p>
            <p>Ensure the topic allows for proper analysis and meets IB assessment criteria.</p>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Questionnaire</span>
        </Button>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={onRegenerate}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Regenerate Topics</span>
          </Button>

          {selectedTopic && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 flex items-center space-x-2"
                size="lg"
              >
                <span>Continue to Research Questions</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicGeneration;
