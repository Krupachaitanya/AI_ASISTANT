import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Code, Database, Cpu, Globe, Palette, LineChart, Shield, Cloud, Smartphone, Bot, Binary, Microscope, Film, Briefcase, Building2, Lightbulb, Rocket, Network, Blocks, Download } from 'lucide-react';

const courseRoadmaps = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    icon: <Globe className="w-6 h-6" />,
    duration: "32 weeks",
    difficulty: "Intermediate",
    roadmap: [
      { phase: "Frontend Fundamentals", topics: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design"] },
      { phase: "Frontend Frameworks", topics: ["React", "State Management", "TypeScript", "Testing"] },
      { phase: "Backend Development", topics: ["Node.js", "Express", "RESTful APIs", "Authentication"] },
      { phase: "Database & Deployment", topics: ["MongoDB", "PostgreSQL", "Docker", "AWS/Vercel"] }
    ]
  },
  {
    id: 2,
    title: "Data Science & Analytics",
    icon: <LineChart className="w-6 h-6" />,
    duration: "28 weeks",
    difficulty: "Advanced",
    roadmap: [
      { phase: "Mathematics Foundation", topics: ["Statistics", "Linear Algebra", "Calculus", "Probability"] },
      { phase: "Programming Basics", topics: ["Python", "Pandas", "NumPy", "Jupyter"] },
      { phase: "Machine Learning", topics: ["Scikit-learn", "Supervised Learning", "Unsupervised Learning", "Model Evaluation"] },
      { phase: "Advanced Topics", topics: ["Deep Learning", "Natural Language Processing", "Computer Vision", "Big Data"] }
    ]
  },
  {
    id: 3,
    title: "Mobile App Development",
    icon: <Smartphone className="w-6 h-6" />,
    duration: "24 weeks",
    difficulty: "Intermediate",
    roadmap: [
      { phase: "Mobile Fundamentals", topics: ["UI/UX Design", "React Native", "State Management", "Navigation"] },
      { phase: "Advanced Features", topics: ["Native Modules", "Push Notifications", "Offline Storage", "Analytics"] },
      { phase: "Backend Integration", topics: ["API Integration", "Authentication", "Real-time Data", "Cloud Services"] },
      { phase: "Deployment", topics: ["App Store", "Play Store", "CI/CD", "Monitoring"] }
    ]
  },
  {
    id: 4,
    title: "Cybersecurity",
    icon: <Shield className="w-6 h-6" />,
    duration: "30 weeks",
    difficulty: "Advanced",
    roadmap: [
      { phase: "Security Fundamentals", topics: ["Network Security", "Cryptography", "Security Protocols", "Risk Assessment"] },
      { phase: "Offensive Security", topics: ["Penetration Testing", "Vulnerability Assessment", "Ethical Hacking", "Social Engineering"] },
      { phase: "Defensive Security", topics: ["Incident Response", "Forensics", "Security Operations", "Threat Intelligence"] },
      { phase: "Advanced Security", topics: ["Cloud Security", "Application Security", "Zero Trust", "Compliance"] }
    ]
  },
  {
    id: 5,
    title: "Cloud Computing",
    icon: <Cloud className="w-6 h-6" />,
    duration: "26 weeks",
    difficulty: "Intermediate",
    roadmap: [
      { phase: "Cloud Fundamentals", topics: ["AWS Core Services", "Azure Basics", "Cloud Architecture", "IaaS/PaaS/SaaS"] },
      { phase: "DevOps Practices", topics: ["CI/CD", "Infrastructure as Code", "Containerization", "Orchestration"] },
      { phase: "Cloud Security", topics: ["Identity Management", "Security Controls", "Compliance", "Encryption"] },
      { phase: "Advanced Cloud", topics: ["Serverless", "Microservices", "Cloud Native", "Multi-cloud"] }
    ]
  },
  {
    id: 6,
    title: "Artificial Intelligence",
    icon: <Bot className="w-6 h-6" />,
    duration: "34 weeks",
    difficulty: "Advanced",
    roadmap: [
      { phase: "AI Foundations", topics: ["Linear Algebra", "Calculus", "Probability", "Optimization"] },
      { phase: "Machine Learning", topics: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Neural Networks"] },
      { phase: "Deep Learning", topics: ["CNNs", "RNNs", "Transformers", "GANs"] },
      { phase: "Applied AI", topics: ["Computer Vision", "NLP", "Speech Recognition", "Robotics"] }
    ]
  },
  {
    id: 7,
    title: "Blockchain Development",
    icon: <Blocks className="w-6 h-6" />,
    duration: "28 weeks",
    difficulty: "Advanced",
    roadmap: [
      { phase: "Blockchain Basics", topics: ["Cryptography", "Consensus Mechanisms", "Smart Contracts", "Web3.js"] },
      { phase: "Smart Contracts", topics: ["Solidity", "Security", "Testing", "Deployment"] },
      { phase: "DApp Development", topics: ["Frontend Integration", "Wallets", "IPFS", "Token Standards"] },
      { phase: "Advanced Topics", topics: ["DeFi", "NFTs", "Layer 2", "Cross-chain"] }
    ]
  },
  {
    id: 8,
    title: "DevOps Engineering",
    icon: <Binary className="w-6 h-6" />,
    duration: "30 weeks",
    difficulty: "Advanced",
    roadmap: [
      { phase: "Infrastructure", topics: ["Linux", "Networking", "Cloud Platforms", "Infrastructure as Code"] },
      { phase: "CI/CD", topics: ["Git", "Jenkins", "GitHub Actions", "ArgoCD"] },
      { phase: "Containerization", topics: ["Docker", "Kubernetes", "Service Mesh", "Monitoring"] },
      { phase: "SRE Practices", topics: ["SLOs", "Observability", "Chaos Engineering", "Incident Management"] }
    ]
  },
  {
    id: 9,
    title: "UI/UX Design",
    icon: <Palette className="w-6 h-6" />,
    duration: "24 weeks",
    difficulty: "Intermediate",
    roadmap: [
      { phase: "Design Fundamentals", topics: ["Color Theory", "Typography", "Layout", "Design Systems"] },
      { phase: "User Experience", topics: ["User Research", "Wireframing", "Prototyping", "Usability Testing"] },
      { phase: "Design Tools", topics: ["Figma", "Adobe XD", "Sketch", "Principle"] },
      { phase: "Advanced Design", topics: ["Motion Design", "Design Systems", "Accessibility", "Design Strategy"] }
    ]
  },
  {
    id: 10,
    title: "Game Development",
    icon: <Cpu className="w-6 h-6" />,
    duration: "32 weeks",
    difficulty: "Intermediate",
    roadmap: [
      { phase: "Game Fundamentals", topics: ["Unity Basics", "C#", "2D Graphics", "Game Physics"] },
      { phase: "Game Systems", topics: ["Input Systems", "Animation", "Sound", "UI Systems"] },
      { phase: "Advanced Features", topics: ["3D Graphics", "Multiplayer", "AI", "Optimization"] },
      { phase: "Publishing", topics: ["Monetization", "Platform Integration", "Marketing", "Analytics"] }
    ]
  }
];

const CourseRoadmaps = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const downloadCourseRoadmap = (course) => {
    const content = `
${course.title} - Learning Roadmap
Duration: ${course.duration}
Difficulty Level: ${course.difficulty}

Course Overview:
This comprehensive course will guide you through becoming a proficient ${course.title} professional.

Detailed Roadmap:
${course.roadmap.map((phase, index) => `
Phase ${index + 1}: ${phase.phase}
${phase.topics.map(topic => `  • ${topic}`).join('\n')}`).join('\n')}

Note: This roadmap is designed to provide a structured learning path. 
Adapt the pace according to your learning style and available time.
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.title.toLowerCase().replace(/\s+/g, '-')}-roadmap.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const renderCourseList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {courseRoadmaps.map((course) => (
        <div
          key={course.id}
          className="bg-purple-800 bg-opacity-20 rounded-lg p-6 cursor-pointer hover:bg-opacity-30 transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-700 rounded-lg">
              {course.icon}
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-purple-200 text-sm">{course.duration} • {course.difficulty}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadCourseRoadmap(course);
              }}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Download Roadmap
            </button>
            <button
              onClick={() => setSelectedCourse(course)}
              className="text-purple-300 hover:text-white transition-colors text-sm"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCourseDetail = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setSelectedCourse(null)}
          className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>
        <button
          onClick={() => downloadCourseRoadmap(selectedCourse)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Roadmap
        </button>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="p-4 bg-purple-700 rounded-lg">
          {selectedCourse.icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
          <p className="text-purple-200">{selectedCourse.duration} • {selectedCourse.difficulty}</p>
        </div>
      </div>

      <div className="space-y-8">
        {selectedCourse.roadmap.map((phase, index) => (
          <div key={index} className="relative">
            {index !== selectedCourse.roadmap.length - 1 && (
              <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-purple-700"></div>
            )}
            <div className="bg-purple-800 bg-opacity-20 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Phase {index + 1}: {phase.phase}</h3>
              <div className="grid grid-cols-2 gap-4">
                {phase.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-6">
      {selectedCourse ? renderCourseDetail() : renderCourseList()}
    </div>
  );
};

export default CourseRoadmaps;