import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Tool from '@/components/Tool';
import Login from '@/components/auth/Login';
import SignUp from '@/components/auth/SignUp';
import Verify from '@/components/auth/Verify';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/verify" element={!isAuthenticated ? <Verify /> : <Navigate to="/" />} />
      <Route path="/" element={isAuthenticated ? <Tool /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Helmet>
          <title>IA/EE Brainstormer - IB Topic Organizer</title>
          <meta name="description" content="A tool to help IB students brainstorm and refine topics for their Internal Assessments (IA) and Extended Essays (EE)." />
          <meta property="og:title" content="IA/EE Brainstormer - IB Topic Organizer" />
          <meta property="og:description" content="A tool to help IB students brainstorm and refine topics for their Internal Assessments (IA) and Extended Essays (EE)." />
        </Helmet>
        
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main className="container mx-auto px-4 pt-24 pb-12 sm:pt-32">
            <AppRoutes />
          </main>
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
