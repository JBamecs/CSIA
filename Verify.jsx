import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Verify = () => {
  const [code, setCode] = useState('');
  const { verify, tempEmail, requestNewCode } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    verify(code);
  };

  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="auth-card rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Check Your Email</h1>
          <p className="text-muted-foreground">
            We've sent a 6-digit verification code to <br />
            <span className="font-bold text-foreground">{tempEmail || 'your email address'}</span>.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
            <input
              type="text"
              id="code"
              maxLength="6"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-14 rounded-lg text-2xl text-center tracking-[0.5em] px-4 border-2 border-gray-200 focus:ring-blue-500 focus:border-blue-500 transition shadow-inner bg-gray-50/50"
              required
              autoComplete="one-time-code"
            />
          </div>
          <Button type="submit" className="w-full gradient-button h-12 rounded-lg text-base font-semibold shadow-lg">
            Verify Account
          </Button>
        </form>
        <div className="text-center text-sm text-muted-foreground mt-6 space-y-2">
            <p>
                Didn't get a code? <button onClick={requestNewCode} className="font-medium text-primary hover:underline">Resend code</button>
            </p>
            <Link to="/signup" className="inline-flex items-center font-medium text-primary hover:underline">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Sign Up
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Verify;
