import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Upload, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const SessionManager = ({ sessionId, onSessionLoad, onSessionSave }) => {
  const [showManager, setShowManager] = useState(false);
  const [savedSessions, setSavedSessions] = useState([]);
  const [loadSessionId, setLoadSessionId] = useState('');

  React.useEffect(() => {
    loadSavedSessions();
  }, []);

  const loadSavedSessions = () => {
    const sessions = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('session-')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          sessions.push({
            id: key,
            ...data,
            displayId: key.slice(-8)
          });
        } catch (error) {
          console.error('Error loading session:', error);
        }
      }
    }
    setSavedSessions(sessions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  };

  const loadSession = (sessionData) => {
    onSessionLoad({
      mode: sessionData.mode,
      subject: sessionData.subject,
      selectedTopic: sessionData.topic,
      researchQuestions: sessionData.questions || [],
      questionnaireData: sessionData.questionnaireData || {},
      topics: sessionData.topics || [],
      currentStep: sessionData.currentStep || 'mode'
    });
    
    toast({
      title: "Session loaded!",
      description: `Successfully loaded session ${sessionData.displayId}`
    });
    
    setShowManager(false);
  };

  const loadSessionById = () => {
    if (!loadSessionId.trim()) {
      toast({
        title: "Please enter a session ID",
        description: "Enter the session ID you want to load.",
        variant: "destructive"
      });
      return;
    }

    const fullSessionId = loadSessionId.startsWith('session-') ? loadSessionId : `session-${loadSessionId}`;
    const sessionData = localStorage.getItem(fullSessionId);
    
    if (sessionData) {
      try {
        const data = JSON.parse(sessionData);
        loadSession({ ...data, displayId: fullSessionId.slice(-8) });
        setLoadSessionId('');
      } catch (error) {
        toast({
          title: "Invalid session data",
          description: "The session data appears to be corrupted.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Session not found",
        description: "No session found with that ID.",
        variant: "destructive"
      });
    }
  };

  const deleteSession = (sessionId) => {
    localStorage.removeItem(sessionId);
    loadSavedSessions();
    toast({
      title: "Session deleted",
      description: "Session has been removed from storage."
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <>
      {/* Floating Session Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Button
          onClick={() => setShowManager(true)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 rounded-full p-4 shadow-lg"
          size="lg"
        >
          <Save className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Session Manager Modal */}
      <AnimatePresence>
        {showManager && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowManager(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="academic-card rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold gradient-text">Session Manager</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowManager(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Load Session by ID */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Load Session by ID</h4>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Enter session ID..."
                    value={loadSessionId}
                    onChange={(e) => setLoadSessionId(e.target.value)}
                    className="flex-1 p-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button onClick={loadSessionById} className="bg-blue-600 hover:bg-blue-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Load
                  </Button>
                </div>
              </div>

              {/* Saved Sessions */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Saved Sessions</h4>
                {savedSessions.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">No saved sessions found</p>
                ) : (
                  <div className="space-y-3">
                    {savedSessions.map((session) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-800/30 border border-slate-600 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="font-medium text-white">ID: {session.displayId}</span>
                              <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                                {session.mode?.toUpperCase() || 'Unknown'}
                              </span>
                              <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                                {session.subject?.replace('-', ' ') || 'Unknown'}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-slate-400">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatDate(session.timestamp)}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => loadSession(session)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Load
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteSession(session.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SessionManager;
