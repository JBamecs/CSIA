import React, { createContext, useContext, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [tempEmail, setTempEmail] = useState(localStorage.getItem('tempEmail') || '');
  const navigate = useNavigate();

  const sendVerificationCode = (email) => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    toast({
      title: 'Verification Code Sent (Simulation)',
      description: `Your one-time code is: ${verificationCode}`,
      duration: 15000,
      className: 'bg-blue-500 text-white',
    });
    localStorage.setItem('tempVerificationCode', verificationCode); 
  };
  
  const login = (email, password) => {
    if (email && password) {
      const userData = { email };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast({ title: 'Login Successful!', description: `Welcome back, ${email}!` });
      navigate('/');
    } else {
      toast({ title: 'Login Failed', description: 'Invalid credentials.', variant: 'destructive' });
    }
  };

  const signup = (email, password) => {
    if (email && password) {
      setTempEmail(email);
      localStorage.setItem('tempEmail', email);
      sendVerificationCode(email);
      navigate('/verify');
    } else {
      toast({ title: 'Signup Failed', description: 'Please fill all fields.', variant: 'destructive' });
    }
  };
  
  const requestNewCode = () => {
    if(tempEmail) {
        sendVerificationCode(tempEmail);
    } else {
        toast({ title: 'Error', description: 'Could not send code. Please try signing up again.', variant: 'destructive' });
        navigate('/signup');
    }
  };

  const verify = (code) => {
    const storedCode = localStorage.getItem('tempVerificationCode');
    if (code && tempEmail && code === storedCode) {
      const userData = { email: tempEmail };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setTempEmail('');
      localStorage.removeItem('tempEmail');
      localStorage.removeItem('tempVerificationCode');
      toast({ title: 'Account Verified!', description: `Welcome, ${userData.email}!` });
      navigate('/');
    } else {
      toast({ title: 'Verification Failed', description: 'Invalid code. Please try again.', variant: 'destructive' });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    navigate('/login');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    tempEmail,
    login,
    signup,
    logout,
    verify,
    requestNewCode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
