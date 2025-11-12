import React, { useState, useEffect, useCallback } from 'react';
import type { Student } from './types';
import { View } from './types';
import Header from './components/Header';
import Certificate from './components/Certificate';

// --- IMPORTANT ---
// PASTE THE WEB APP URL YOU COPIED FROM GOOGLE APPS SCRIPT HERE
// FIX: Explicitly type GOOGLE_SCRIPT_URL as string to prevent a TypeScript literal type comparison error.
const GOOGLE_SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycbxTuNSJANx89FGLa9PtZh1PPC1-O7-iGaPOkwtse0DmQpNpYMUUdAeENviKi5olE9bQ/exec';

// --- Reusable UI Components ---

interface CardProps {
  title: string;
  children: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ title, children }) => (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-brand-blue mb-6">{title}</h2>
        {children}
    </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}
const Input: React.FC<InputProps> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label} {props.required && <span className="text-red-500">*</span>}
        </label>
        <input
            id={id}
            {...props}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
        />
    </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    id: string;
    children: React.ReactNode;
}
const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label} {props.required && <span className="text-red-500">*</span>}
        </label>
        <select
            id={id}
            {...props}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 bg-white focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm rounded-md shadow-sm"
        >
            {children}
        </select>
    </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.HOME);
  const [students, setStudents] = useState<Student[]>([]);
  const [loggedInStudent, setLoggedInStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoginEnabled, setIsLoginEnabled] = useState<boolean>(false);
  const [workshopDate, setWorkshopDate] = useState<string | null>(null);
  const [workshopName, setWorkshopName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  // --- Form State ---
  const [registerForm, setRegisterForm] = useState({ name: '', phone: '', college: '', department: '', year: '1st' });
  const [loginForm, setLoginForm] = useState({ name: '', phone: '' });

  useEffect(() => {
    // Load students and admin settings from Google Sheet on initial render
    if (GOOGLE_SCRIPT_URL === 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        setError('Application is not configured. Please set the Google Apps Script URL.');
        setIsLoading(false);
        return;
    }

    fetch(GOOGLE_SCRIPT_URL)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            setStudents(data.students || []);
            setIsLoginEnabled(data.isLoginEnabled || false);
            setWorkshopDate(data.workshopDate || null);
            setWorkshopName(data.workshopName || null);
        })
        .catch(e => {
            console.error("Failed to fetch data from Google Sheet:", e);
            setError('Could not load data. Please check the backend configuration.');
        })
        .finally(() => {
            setIsLoading(false);
        });
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(registerForm).some(field => !field.trim())) {
        setError('All fields are required.');
        return;
    }
    if (registerForm.name !== registerForm.name.toUpperCase()) {
        setError('Student Name must be in UPPERCASE letters only.');
        return;
    }
    if (registerForm.phone.length !== 10) {
        setError('Phone number must be exactly 10 digits.');
        return;
    }
    if (students.find(s => String(s.phone) === registerForm.phone)) {
        setError('A student with this phone number is already registered.');
        return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for simple POST requests to Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerForm),
        });
        
        // As 'no-cors' prevents reading the response, we optimistically update the UI.
        const newStudent: Student = { id: Date.now().toString(), ...registerForm };
        setStudents([...students, newStudent]);

        alert('You have been successfully registered for your upcoming workshop');
        setView(View.HOME);
        setRegisterForm({ name: '', phone: '', college: '', department: '', year: '1st' });

    } catch(err) {
        console.error("Registration failed:", err);
        setError("Registration failed. Please try again later.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => s.name.toLowerCase().trim() === loginForm.name.toLowerCase().trim() && String(s.phone).trim() === loginForm.phone.trim());
    if (student) {
        setLoggedInStudent(student);
        setView(View.CERTIFICATE);
        setLoginForm({ name: '', phone: '' });
        setError('');
    } else {
        setError('Invalid credentials. Please check your name and phone number.');
    }
  };

  const handleLogout = () => {
    setLoggedInStudent(null);
    setView(View.HOME);
  };
  
  const renderView = () => {
    if (isLoading) {
        return (
            <div className="text-center">
                <svg className="animate-spin mx-auto h-10 w-10 text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-2 text-gray-600">Loading Data...</p>
            </div>
        );
    }

    if (error && view === View.HOME) {
        return <div className="text-center bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>;
    }

    switch (view) {
      case View.CERTIFICATE:
        return loggedInStudent && <Certificate student={loggedInStudent} onLogout={handleLogout} workshopDate={workshopDate} workshopName={workshopName} />;
      
      case View.REGISTER:
        return (
            <Card title="Workshop Registration">
                 <form onSubmit={handleRegister} className="space-y-4">
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <Input label="Student Name" id="reg-name" type="text" value={registerForm.name} onChange={e => {setRegisterForm({...registerForm, name: e.target.value }); setError('');}} placeholder="Enter your full name in CAPS" required />
                    <Input 
                        label="Phone Number" 
                        id="reg-phone" 
                        type="tel" 
                        value={registerForm.phone} 
                        onChange={e => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 10) {
                                setRegisterForm({...registerForm, phone: value });
                                setError('');
                            }
                        }}
                        maxLength={10}
                        pattern="\d{10}"
                        title="Phone number must be exactly 10 digits."
                        placeholder="Enter 10-digit mobile number"
                        required 
                    />
                    <Input label="College Name" id="reg-college" type="text" value={registerForm.college} onChange={e => {setRegisterForm({...registerForm, college: e.target.value }); setError('');}} placeholder="Enter your college name" required />
                    <Input label="Department" id="reg-dept" type="text" value={registerForm.department} onChange={e => {setRegisterForm({...registerForm, department: e.target.value }); setError('');}} placeholder="e.g., Computer Science" required />
                    <Select label="Year of Study" id="reg-year" value={registerForm.year} onChange={e => setRegisterForm({...registerForm, year: e.target.value})} required>
                        <option>1st</option>
                        <option>2nd</option>
                        <option>3rd</option>
                        <option>4th</option>
                    </Select>
                    <div className="flex items-center justify-between pt-2">
                        <button type="button" onClick={() => { setView(View.HOME); setError(''); }} className="text-sm font-medium text-brand-blue hover:underline">
                            &larr; Back to Home
                        </button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-brand-red text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
            </Card>
        );

      case View.LOGIN:
        return (
            <Card title="Student Login">
                 <form onSubmit={handleLogin} className="space-y-6">
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <Input label="Student Name" id="login-name" type="text" value={loginForm.name} onChange={e => {setLoginForm({...loginForm, name: e.target.value}); setError('');}} placeholder="Enter your registered name" required />
                    <Input 
                        label="Phone Number" 
                        id="login-phone" 
                        type="tel" 
                        value={loginForm.phone} 
                        onChange={e => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 10) {
                                setLoginForm({...loginForm, phone: value});
                                setError('');
                            }
                        }} 
                        maxLength={10}
                        pattern="\d{10}"
                        title="Phone number must be exactly 10 digits."
                        placeholder="Enter your registered 10-digit phone number"
                        required 
                    />
                    <div className="flex items-center justify-between pt-2">
                        <button type="button" onClick={() => { setView(View.HOME); setError(''); }} className="text-sm font-medium text-brand-blue hover:underline">
                            &larr; Back to Home
                        </button>
                        <button type="submit" className="px-4 py-2 bg-brand-red text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                            Login
                        </button>
                    </div>
                </form>
            </Card>
        );
        
      case View.HOME:
      default:
        return (
            <div className="text-center">
                <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-3xl font-bold text-brand-blue mb-2">Welcome to RKS Infotech</h2>
                    <p className="text-gray-600 mb-8">Register for your upcoming workshop</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => setView(View.REGISTER)} className="px-8 py-3 bg-brand-blue text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300">
                            Register Now
                        </button>
                        {isLoginEnabled ? (
                            <button onClick={() => setView(View.LOGIN)} className="px-8 py-3 bg-brand-red text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300">
                                Download Certificate
                            </button>
                        ) : (
                            <div className="px-8 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg shadow-inner cursor-not-allowed" title="Login is currently disabled by the administrator.">
                                Download Certificate
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
            {renderView()}
        </main>
        <footer className="p-4 bg-white text-center text-xs text-gray-500 border-t">
            <p>&copy; {new Date().getFullYear()} RKS Infotech. All rights reserved.</p>
             
        </footer>
    </div>
  );
};

export default App;