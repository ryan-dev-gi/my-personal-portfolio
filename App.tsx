import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import ThreeScene from './components/ThreeScene';
import AIAssistant from './components/AIAssistant';
import { PROJECTS, SKILLS, SOCIAL_LINKS, BUILDER_APPS, ABOUT_DATA, CONTACT_CONFIG } from './constants';
import { Project } from './types';

// Enhanced Scroll Reveal Wrapper Component
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ 
  children, 
  delay = 0, 
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] transform-gpu ease-[cubic-bezier(0.22,1,0.36,1)] ${className} ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-[0.97]"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Skill Bar Sub-component
const SkillBar: React.FC<{ name: string; level: number; icon: string }> = ({ name, level, icon }) => {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 300);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="space-y-4 group">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
            <i className={`${icon}`}></i>
          </div>
          <span className="text-white font-bold tracking-tight">{name}</span>
        </div>
        <span className="text-indigo-400 font-black text-xs tracking-widest">{level}%</span>
      </div>
      <div ref={barRef} className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <div 
          className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(79,70,229,0.5)]"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Portfolio Inquiry', message: '' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState('All');

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    if (!window.location.hash) window.location.hash = '#home';
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('sending');

    try {
      const response = await fetch(CONTACT_CONFIG.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: 'Portfolio Inquiry', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('error');
    }
  };

  const handleSocialClick = (platform: string) => {
    const url = SOCIAL_LINKS[platform.toLowerCase() as keyof typeof SOCIAL_LINKS];
    if (url) window.open(url, '_blank');
  };

  // View Components
  const HomeView = () => (
    <section className="relative h-screen flex items-center justify-center overflow-hidden hero-gradient animate-in fade-in duration-700">
      <ThreeScene />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] lg:text-[10px] font-black tracking-[0.4em] uppercase">
          Available for Opportunities
        </div>
        <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-extrabold font-heading mb-6 tracking-tighter animate-glow-pulse leading-[1] md:leading-[0.9] text-white">
          RYAN <span className="text-indigo-500">CERDA</span>
        </h1>
        <p className="text-base md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto mb-10 md:mb-12 leading-relaxed font-medium">
          I am a beginner web developer who is eager to learn, improve, and grow in the field of web development. Committed to delivering excellence and ensuring client satisfaction.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigateTo('#about')}
            className="px-8 py-5 md:px-12 md:py-6 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-50 hover:text-white transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95"
          >
            Full Profile <i className="fas fa-id-card text-[10px]"></i>
          </button>
          <button 
            onClick={() => navigateTo('#contact')}
            className="px-8 py-5 md:px-12 md:py-6 bg-indigo-600/20 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] border border-indigo-500/30 backdrop-blur-md hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            Hire Me <i className="fas fa-handshake text-[10px]"></i>
          </button>
        </div>
      </div>
    </section>
  );

  const AboutView = () => (
    <section className="py-24 lg:py-32 bg-[#020617] min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* 3D Profile Sidebar */}
          <div className="lg:w-1/3 lg:sticky top-32 tilt-3d-container">
            <Reveal>
              <div className="tilt-3d-card glass-card rounded-[2.5rem] p-8 border-indigo-500/40 border-2 shadow-[0_0_50px_rgba(79,70,229,0.15)] space-y-8 group relative overflow-hidden">
                <div className="scan-line"></div>
                
                <div className="aspect-square rounded-[2rem] overflow-hidden relative border-4 border-indigo-500/10 transition-transform duration-500 group-hover:scale-[1.02]">
                  <img 
                    src={ABOUT_DATA.profileImage} 
                    alt="Ryan Cerda" 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/Profile.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold text-white mb-1">Cerda Ryan, A.</h3>
                    <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">BSIT Graduate</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  {ABOUT_DATA.personalInfo.map((info, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                      <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest block mb-1">{info.label}</span>
                      <span className="text-xs text-gray-300 font-bold">{info.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center gap-2">
                  {['facebook', 'instagram', 'tiktok', 'github'].map((social) => (
                    <button
                      key={social}
                      onClick={() => handleSocialClick(social)}
                      className="w-full h-12 rounded-xl bg-white/5 hover:bg-indigo-600 text-gray-400 hover:text-white border border-white/10 hover:border-indigo-500 transition-all duration-300 flex items-center justify-center shadow-lg"
                    >
                      <i className={`fab fa-${social}`}></i>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => navigateTo('#contact')}
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
                >
                  LET'S COLLABORATE <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </Reveal>
          </div>

          {/* Main Info */}
          <div className="lg:w-2/3 space-y-20">
            <Reveal delay={200}>
              <div className="space-y-8">
                <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest">Career Mission</div>
                <p className="text-gray-300 text-xl lg:text-3xl font-bold leading-tight tracking-tight">
                  "{ABOUT_DATA.objective}"
                </p>
              </div>
            </Reveal>

            <div className="space-y-10">
              <Reveal>
                <h3 className="text-3xl font-bold font-heading text-white flex items-center gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500"><i className="fas fa-graduation-cap"></i></span> 
                  Education
                </h3>
              </Reveal>
              <div className="grid gap-6">
                {ABOUT_DATA.education.map((edu, idx) => (
                  <Reveal key={idx} delay={idx * 150}>
                    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">{edu.institution}</h4>
                        <span className="text-[10px] text-indigo-400 font-black bg-indigo-500/10 px-4 py-2 rounded-full">{edu.period}</span>
                      </div>
                      <p className="text-gray-400 font-medium text-lg">{edu.degree}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <Reveal>
                <h3 className="text-3xl font-bold font-heading text-white flex items-center gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500"><i className="fas fa-briefcase"></i></span> 
                  Work Experience
                </h3>
              </Reveal>
              <div className="grid gap-6">
                {ABOUT_DATA.experience.map((exp, idx) => (
                  <Reveal key={idx} delay={idx * 150}>
                    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all flex justify-between items-center group">
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{exp.role}</h4>
                        <p className="text-gray-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest bg-black/40 px-4 py-2 rounded-full">{exp.period}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const ProjectsView = () => {
    const allTags = ['All', ...new Set(PROJECTS.flatMap(p => p.tags))];
    const filteredProjects = projectFilter === 'All' 
      ? PROJECTS 
      : PROJECTS.filter(p => p.tags.includes(projectFilter));

    return (
      <section className="py-24 lg:py-40 bg-[#030712] min-h-screen">
        <div className="container mx-auto px-6">
          <Reveal className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <span className="text-indigo-500 font-black uppercase tracking-[0.4em] text-[10px]">Selected Archive</span>
                <h2 className="text-5xl lg:text-8xl font-bold font-heading text-white leading-none">Innovation <span className="text-indigo-500 italic block">Loop</span></h2>
              </div>
              
              <div className="flex flex-wrap gap-2 md:pb-4">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setProjectFilter(tag)}
                    className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${
                      projectFilter === tag 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-600/30' 
                        : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.id} delay={idx % 2 === 0 ? 0 : 200}>
                <div className="glass-card rounded-[3rem] overflow-hidden border-white/5 hover:border-indigo-500/30 transition-all duration-700 shadow-2xl group">
                  <div className="relative h-72 lg:h-96 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" />
                    <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-all"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <button onClick={() => setSelectedProject(project)} className="px-10 py-4 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-indigo-500 hover:text-white transition-all">Inspect Core</button>
                    </div>
                  </div>
                  <div className="p-10 lg:p-14 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                      <i className="fas fa-arrow-up-right-from-square text-gray-700 group-hover:text-indigo-500 transition-colors"></i>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-[9px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest bg-white/5 text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const SkillsView = () => (
    <section className="py-24 lg:py-40 bg-[#020617] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-20">
          <Reveal className="text-center space-y-4">
            <span className="text-indigo-500 font-black uppercase tracking-[0.4em] text-[10px] block">Neural Capabilities</span>
            <h2 className="text-5xl lg:text-7xl font-bold font-heading text-white">Technical Benchmarks</h2>
          </Reveal>
          <div className="space-y-12">
            {SKILLS.map((skill, idx) => (
              <Reveal key={skill.name} delay={idx * 100}>
                <SkillBar {...skill} />
              </Reveal>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-16">
            {BUILDER_APPS.map((app, idx) => (
              <Reveal key={app.name} delay={idx * 100}>
                <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 flex flex-col items-center gap-4 transition-all hover:bg-white/10 hover:border-indigo-500/30 group">
                  <i className={`${app.icon} text-3xl text-gray-600 group-hover:text-indigo-400 transition-colors`}></i>
                  <span className="text-[10px] text-gray-500 group-hover:text-white font-black uppercase tracking-widest transition-colors">{app.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const ContactView = () => (
    <section className="py-24 lg:py-40 bg-[#030712] min-h-screen relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="container mx-auto px-6 relative z-10">
        <Reveal className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 rounded-[3rem] lg:rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl">
            <div className="lg:col-span-5 p-10 lg:p-20 bg-gradient-to-br from-indigo-900/40 to-black/80 flex flex-col justify-between">
              <div>
                <h2 className="text-5xl lg:text-7xl font-bold font-heading text-white mb-12 leading-none">Let's <span className="text-indigo-500">Forge</span> Something.</h2>
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 shadow-xl"><i className="fas fa-envelope text-xl"></i></div>
                    <span className="text-xl lg:text-2xl font-bold text-white">{SOCIAL_LINKS.email}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 shadow-xl"><i className="fas fa-phone-volume text-xl"></i></div>
                    <span className="text-xl lg:text-2xl font-bold text-white">{SOCIAL_LINKS.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 p-10 lg:p-24 bg-black/40">
              <form onSubmit={handleFormSubmit} className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <input required placeholder="Your full name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-indigo-500 outline-none text-lg font-bold transition-all" />
                  <input required type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-indigo-500 outline-none text-lg font-bold transition-all" />
                </div>
                <textarea required rows={4} placeholder="Describe your project..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-[2rem] px-8 py-8 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none text-base font-medium"></textarea>
                <button type="submit" disabled={formStatus === 'sending'} className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] transition-all shadow-2xl shadow-indigo-600/20 active:scale-[0.98]">
                  {formStatus === 'sending' ? 'Transmitting...' : 'Execute Broadcast'}
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen relative selection:bg-indigo-500/30 overflow-x-hidden bg-[#030712]">
      <Navbar />
      <main className="relative">
        {currentHash === '#home' && <HomeView />}
        {currentHash === '#about' && <AboutView />}
        {currentHash === '#projects' && <ProjectsView />}
        {currentHash === '#skills' && <SkillsView />}
        {currentHash === '#ai-twin' && <div className="pt-24 min-h-screen"><AIAssistant /></div>}
        {currentHash === '#contact' && <ContactView />}
      </main>

      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6"><div className="fixed inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setSelectedProject(null)}></div><div className="relative w-full max-w-5xl glass-card rounded-[4rem] overflow-hidden border-white/10 flex flex-col md:flex-row"><div className="md:w-1/2 h-80 md:h-auto overflow-hidden"><img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" /></div><div className="p-16 md:w-1/2 bg-[#0a0a0a] flex flex-col justify-center"><h2 className="text-5xl font-bold text-white mb-8">{selectedProject.title}</h2><p className="text-gray-400 text-lg mb-10">{selectedProject.description}</p><div className="flex gap-6"><a href={selectedProject.link} target="_blank" className="flex-1 py-5 bg-indigo-600 text-white text-center rounded-2xl font-black uppercase text-[10px] tracking-widest">Live View</a><button onClick={() => setSelectedProject(null)} className="flex-1 py-5 bg-white/5 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border border-white/10">Close</button></div></div></div></div>
      )}

      <footer className="py-24 bg-[#030712] border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-700 text-[9px] font-black uppercase tracking-[0.4em]">© {new Date().getFullYear()} Ryan Cerda | BSIT Graduate | Manila, PH.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;