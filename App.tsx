import React, { useState, useEffect } from 'react';
import { Brain, BookOpen, Target, Users, Trophy, ChevronRight, Download, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import CourseRoadmaps from './components/CourseRoadmaps';

// Mock study plan data
const studyPlans = [
  {
    title: "Computer Science Fundamentals",
    duration: "4 weeks",
    topics: ["Algorithms", "Data Structures", "Programming Basics"],
    schedule: "2 hours/day"
  },
  {
    title: "Web Development Path",
    duration: "6 weeks",
    topics: ["HTML/CSS", "JavaScript", "React Basics"],
    schedule: "3 hours/day"
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [studyStreak, setStudyStreak] = useState(0);
  const [focusScore, setFocusScore] = useState(85);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showDataTable, setShowDataTable] = useState(false);
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      const today = new Date().toDateString();
      const lastLogin = new Date(currentUser.lastLogin).toDateString();
      
      if (today !== lastLogin) {
        const updatedUser = {
          ...currentUser,
          streak: today === new Date(lastLogin).toDateString() ? currentUser.streak + 1 : 0,
          lastLogin: new Date().toISOString()
        };
        
        setCurrentUser(updatedUser);
        setUsers(users.map(u => u.email === updatedUser.email ? updatedUser : u));
        setStudyStreak(updatedUser.streak);
      }
    }
  }, [currentUser]);

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    const newUser = {
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      streak: 0,
      lastLogin: new Date().toISOString(),
      studyPlans: [],
      focusScore: 85
    };
    
    setUsers([...users, newUser]);
    setShowSignupForm(false);
    setSignupData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
    
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setShowLoginForm(false);
      setStudyStreak(user.streak);
      setFocusScore(user.focusScore);
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setStudyStreak(0);
    setActiveTab('dashboard');
  };

  const downloadStudyPlan = (plan) => {
    const content = `
Study Plan: ${plan.title}
Duration: ${plan.duration}
Topics: ${plan.topics.join(', ')}
Schedule: ${plan.schedule}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plan.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Learning",
      description: "Personalized study plans that adapt to your progress",
      content: <CourseRoadmaps />
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Focus Enhancement",
      description: "Track distractions and optimize study effectiveness",
      content: (
        <div className="mt-4">
          <div className="bg-purple-800 bg-opacity-20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Focus Tracking</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Today's Focus Score</span>
                <span>{focusScore}%</span>
              </div>
              <div className="w-full bg-purple-900 rounded-full h-2">
                <div
                  className="bg-purple-400 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${focusScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Gamified Experience",
      description: "Interactive missions and rewards for motivation",
      content: (
        <div className="mt-4 space-y-4">
          <div className="bg-purple-800 bg-opacity-20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Daily Missions</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Complete 2 hours of focused study</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Take practice quiz</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Review yesterday's material</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Learning",
      description: "AI-matched study groups and peer learning",
      content: (
        <div className="mt-4">
          <div className="bg-purple-800 bg-opacity-20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Study Groups</h4>
            <div className="space-y-2">
              <p className="text-sm">Matched study partners with similar goals:</p>
              <div className="flex gap-2">
                <div className="bg-purple-700 rounded-full w-8 h-8 flex items-center justify-center">JS</div>
                <div className="bg-purple-700 rounded-full w-8 h-8 flex items-center justify-center">AK</div>
                <div className="bg-purple-700 rounded-full w-8 h-8 flex items-center justify-center">MR</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 slide-in">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <Brain className="w-10 h-10 text-purple-300 animate-float" />
            <h1 className="text-3xl font-bold text-white">StudyAI Assistant</h1>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="glass-effect rounded-lg px-4 py-2 text-white">
                  <span className="font-semibold">{studyStreak} Day Streak! 🔥</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={() => setShowSignupForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Login Modal */}
        {showLoginForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLoginForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Signup Modal */}
        {showSignupForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSignupForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main Content */}
        {isLoggedIn ? (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Panel - Study Stats */}
            <div className="glass-effect rounded-xl p-6 text-white slide-in">
              <h2 className="text-xl font-semibold mb-4">Today's Progress</h2>
              <div className="space-y-4">
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>Focus Score</div>
                    <div className="text-purple-300">{focusScore}%</div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200 bg-opacity-20">
                    <div 
                      style={{ width: `${focusScore}%` }}
                      className="animate-pulse-slow shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-400"
                    ></div>
                  </div>
                </div>
                <div className="bg-purple-800 bg-opacity-30 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-300" />
                    <span>Next Study Session in 45 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Panel - Features */}
            <div className="md:col-span-2 glass-effect rounded-xl p-6 text-white slide-in">
              <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index}>
                    <div 
                      className="flex items-center gap-4 bg-purple-800 bg-opacity-30 rounded-lg p-4 hover:bg-opacity-40 transition-all cursor-pointer"
                      onClick={() => setActiveTab(feature.title)}
                    >
                      <div className="p-2 bg-purple-700 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-purple-200 text-sm">{feature.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 ml-auto text-purple-300" />
                    </div>
                    {activeTab === feature.title && feature.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-white py-12">
            <h2 className="text-2xl font-bold mb-4">Welcome to StudyAI Assistant</h2>
            <p className="mb-8">Please login or sign up to access your personalized study dashboard.</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowDataTable(!showDataTable)}
            className="text-purple-300 hover:text-white transition-colors"
          >
            Data
          </button>
        </div>

        {/* Data Table */}
        {showDataTable && (
          <div className="mt-8 glass-effect rounded-xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">User Data</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Streak</th>
                    <th className="px-4 py-2 text-left">Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="border-t border-purple-800">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.streak}</td>
                      <td className="px-4 py-2">{new Date(user.lastLogin).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;