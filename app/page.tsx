"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants, useScroll, useSpring } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaArrowUp,
  FaLaptopCode, FaServer, FaTools, FaDownload, FaBriefcase, FaUser, 
  FaMapMarkerAlt, FaGraduationCap, FaBullseye, FaTimes, FaBars,
  FaAward, FaTrophy, FaCheckCircle, FaCalendarAlt, FaCode,
  FaChevronLeft, FaChevronRight, FaExpandArrowsAlt, FaImage, FaExternalLinkAlt,
  FaFilePdf, FaPrint
} from "react-icons/fa";

import { 
  SiReact, SiNextdotjs, SiHtml5, SiCss, SiJavascript, SiTailwindcss, 
  SiNodedotjs, SiPhp, SiLaravel, SiExpress, SiGit, SiMysql, SiFirebase, SiSupabase, SiTypescript, SiVercel 
} from "react-icons/si";

import Image from "next/image";

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// --- COMPONENTS ---

const Navbar = ({ activeSection, onOpenResume }: { activeSection: string, onOpenResume: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Keep header always visible on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Certifications', 'Contact'];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'} px-6 md:px-12 flex justify-between items-center`}
      >
        <div className="text-xl md:text-2xl font-black tracking-tighter text-white cursor-pointer flex items-center gap-2" onClick={() => window.scrollTo(0,0)}>
          JS<span className="text-accent">.</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-8 items-center bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((item) => {
            const sectionId = item.toLowerCase();
            const isActive = activeSection === sectionId;
            return (
              <li key={item} className="relative group">
                <a href={`#${sectionId}`} className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-accent' : 'text-gray-300 hover:text-white'}`}>
                  {item}
                </a>
                {isActive && (
                  <motion.span 
                    layoutId="activeSection"
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <button onClick={onOpenResume} className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 border border-white/10 hover:border-white/20">
          Resume <FaFilePdf className="text-sm text-accent" />
        </button>

        {/* Mobile Hamburger Button */}
        <button 
          className="lg:hidden text-2xl text-gray-300 hover:text-accent transition-colors z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-[#0f172a] border-b border-white/10 py-8 flex flex-col items-center gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.9)] lg:hidden z-40"
            >
              {navLinks.map((item) => {
                const sectionId = item.toLowerCase();
                const isActive = activeSection === sectionId;
                return (
                  <a 
                    key={item} 
                    href={`#${sectionId}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-xl transition-colors duration-300 ${isActive ? 'text-accent font-bold' : 'text-gray-200 hover:text-white'}`}
                  >
                    {item}
                  </a>
                );
              })}
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onOpenResume(); }}
                className="flex items-center gap-2 px-8 py-3 mt-4 bg-accent text-white rounded-full font-medium transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)]"
              >
                View Resume <FaFilePdf />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-purple-500 to-cyan-400 origin-left z-[60]"
        style={{ scaleX }}
      />
    </>
  );
};

const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] mix-blend-screen animate-pulse"></div>
    <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-cyan-600/20 blur-[120px] mix-blend-screen animate-pulse animation-delay-2000"></div>
    <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-purple-700/20 blur-[120px] mix-blend-screen animate-pulse animation-delay-4000"></div>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
  </div>
);

const Hero = ({ onOpenResume }: { onOpenResume: () => void }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-28 relative">
      <div className="text-center max-w-5xl z-10 w-full flex flex-col items-center">

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-300">Available for Opportunities</span>
        </motion.div>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-accent font-mono text-sm sm:text-base md:text-lg mb-2 sm:mb-4">
          Hello, I'm
        </motion.p>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 pb-2 break-words w-full">
          John Carl S. Sanchez
        </motion.h1>

        <motion.h2 variants={fadeUp} initial="hidden" animate="visible" className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-300 mb-6 h-12 md:h-16 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-accent">
            <Typewriter
              words={[
                'Web Developer.',  
                'Tech Enthusiast.',
                'Problem Solver.'
              ]}
              loop={true}
              cursor
              cursorStyle='_'
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </span>
        </motion.h2>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg md:text-xl font-light">
          BS Information Technology Graduate • <span className="text-white font-medium">Cum Laude</span> <br className="hidden md:block" />
          A dedicated professional equipped with hands-on technical internship experience, eager to deliver impactful contributions across IT support, system administration, and modern web application development.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap justify-center items-center gap-4 w-full">
          <a href="#projects" className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-darkBg rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] text-sm sm:text-base">
            View Projects
          </a>
          <button onClick={onOpenResume} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-transparent border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm flex items-center gap-2 text-sm sm:text-base">
            Resume <FaFilePdf className="text-accent" />
          </button>
          <div className="flex gap-3 sm:gap-4 mt-2 sm:mt-0">
            <a href="https://github.com/cjxsanchez" target="_blank" rel="noreferrer" className="p-3 sm:p-3.5 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300">
              <FaGithub size={18} className="sm:text-xl" />
            </a>
            <a href="https://www.linkedin.com/in/john-carl-sanchez-974658418" target="_blank" rel="noreferrer" className="p-3 sm:p-3.5 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 transition-all duration-300">
              <FaLinkedin size={18} className="sm:text-xl" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">About Me</h2>
        <div className="h-[1px] bg-gradient-to-r from-accent to-transparent flex-grow ml-4"></div>
      </motion.div>
      
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl space-y-6 text-gray-400 text-base sm:text-lg leading-relaxed font-light">
        <p>
          Hello! I'm a passionate Web Developer who loves architecting solutions that solve complex, real-world problems. My journey in tech is driven by a deep curiosity for how software can streamline processes and create intuitive user experiences.
        </p>
        <p>
          I recently graduated with a <strong className="text-white font-medium">Bachelor of Science in Information Technology</strong> from Catanduanes State University, earning the prestigious <strong className="text-accent font-medium">Cum Laude</strong> distinction. 
        </p>
        <p>
          During my academic year, I've spearheaded significant projects. I served as the Programmer of our capstone project <span className="text-white font-medium">AccrediTrack</span>, a robust accreditation management system, and developed the <span className="text-white font-medium">PDOHO Digital Records Hub</span> during my internship to modernize their document management workflow.
        </p>
        <p>
          Driven by an enduring passion for technology and continuous learning, I thrive in problem-solving environments. I am highly motivated to apply my skills to IT operations, technical support, and software development teams as I continue to grow and evolve as an IT professional.
        </p>
      </motion.div>
    </section>
  );
};

const Achievements = () => {
  const achievements = [
    { icon: <FaGraduationCap />, title: "BS Information Technology", desc: "Catanduanes State University" },
    { icon: <FaAward />, title: "Cum Laude", desc: "Latin Honors Graduate" },
    { icon: <FaCheckCircle />, title: "Programmer", desc: "AccrediTrack Capstone" },
    { icon: <FaTrophy />, title: "Cisco Certified", desc: "Networking & Cybersecurity" }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {achievements.map((item, i) => (
          <motion.div 
            key={i} 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            className="glass p-5 sm:p-6 rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 group bg-white/[0.02]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center text-accent text-lg sm:text-xl mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
              {item.icon}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">{item.title}</h3>
            <p className="text-xs sm:text-sm text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: "Programmer (Capstone Project)",
      company: "AccrediTrack",
      date: "2025 - 2026",
      description: "Architected and developed a comprehensive web-based accreditation management system. Implemented secure document validation, real-time analytics dashboards, and streamlined institutional data handling.",
      tech: ["PHP", "MySQL", "JavaScript", "Supabase Storage", "HTML", "CSS", "Bootstrap"]
    },
    {
      role: "Web Developer Intern",
      company: "Provincial Department of Health Office (PDOHO)",
      date: "2026",
      description: "Designed and built the PDOHO Digital Records Hub. Digitized manual workflows, significantly improving document management efficiency, retrieval speeds, and secure data storage for sensitive health records.",
      tech: ["PHP", "MySQL", "HTML", "Bootstrap", "JavaScript", "CSS"]
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Experience</h2>
        <div className="h-[1px] bg-gradient-to-r from-accent to-transparent flex-grow ml-4"></div>
      </motion.div>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {experiences.map((exp, idx) => (
          <motion.div key={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0f172a] bg-accent text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <FaBriefcase size={14} />
            </div>
            <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] glass p-5 sm:p-6 md:p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-colors shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <h3 className="font-bold text-lg sm:text-xl text-white break-words">{exp.role}</h3>
                <span className="text-accent text-xs sm:text-sm font-mono whitespace-nowrap">{exp.date}</span>
              </div>
              <p className="text-gray-300 font-medium mb-3 sm:mb-4 text-sm sm:text-base">{exp.company}</p>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">{exp.description}</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {exp.tech.map((tech, i) => (
                  <span key={i} className="text-[10px] sm:text-xs font-mono text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/10">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    { 
      title: "Frontend", icon: <FaLaptopCode />, 
      skills: [
        { name: "React", icon: <SiReact /> }, { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "TypeScript", icon: <SiTypescript /> }, { name: "Tailwind", icon: <SiTailwindcss /> },
        { name: "JavaScript", icon: <SiJavascript /> }, { name: "HTML/CSS", icon: <SiHtml5 /> }
      ] 
    },
    { 
      title: "Backend & DB", icon: <FaServer />, 
      skills: [
        { name: "PHP", icon: <SiPhp /> }, { name: "Laravel", icon: <SiLaravel /> },
        { name: "Node.js", icon: <SiNodedotjs /> }, { name: "Express", icon: <SiExpress /> },
        { name: "MySQL", icon: <SiMysql /> }, { name: "Supabase", icon: <SiSupabase /> }
      ] 
    },
    { 
      title: "Tools & Cloud", icon: <FaTools />, 
      skills: [
        { name: "Git", icon: <SiGit /> }, { name: "Vercel", icon: <SiVercel /> },
        { name: "Firebase", icon: <SiFirebase /> }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Technical Skills</h2>
        <div className="h-[1px] bg-gradient-to-r from-accent to-transparent flex-grow ml-4"></div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div key={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass p-6 sm:p-8 rounded-3xl border border-white/5 hover:bg-white/[0.03] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-accent/10 rounded-full blur-[40px] sm:blur-[50px] -mr-10 -mt-10 group-hover:bg-accent/20 transition-colors"></div>

            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-2 sm:p-3 bg-white/5 rounded-xl text-accent border border-white/10 text-xl sm:text-2xl">
                {category.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{category.title}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {category.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 group/skill cursor-default">
                  <div className="text-lg sm:text-xl text-gray-500 group-hover/skill:text-accent transition-colors duration-300">
                    {skill.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover/skill:text-white transition-colors duration-300">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- INDIVIDUAL PROJECT CARD COMPONENT ---
const ProjectCard = ({ project, onOpenModal }: { project: any, onOpenModal: (project: any, index: number) => void }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    if(e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  }, [project.images.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    if(e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  }, [project.images.length]);

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16 md:mb-24 glass rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/10 shadow-2xl bg-[#0f172a]/60 backdrop-blur-xl w-full overflow-hidden">

      {/* Header / Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 md:mb-8 border-b border-white/10 pb-4 md:pb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <FaAward className="text-accent text-xl md:text-2xl shrink-0" />
          <span className="text-white font-bold tracking-wider uppercase text-xs sm:text-sm">{project.type}</span>
        </div>
        <span className="px-3 py-1 md:px-4 md:py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300 text-xs sm:text-sm font-mono whitespace-nowrap">
          {project.role}
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-start w-full">

        {/* Left Side: Interactive Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-400 font-mono px-1 gap-1">
            <span>Interactive Screenshot Gallery</span>
            <span>{project.images.length} {project.images.length === 1 ? 'Preview' : 'System Modules'}</span>
          </div>

          {/* Main Image Viewer */}
          <div 
            className="relative w-full aspect-video md:aspect-[16/10] bg-[#050B14] rounded-xl border border-white/10 overflow-hidden group cursor-pointer"
            onClick={() => onOpenModal(project, currentImgIndex)}
          >
            <Image 
              src={project.images[currentImgIndex].src} 
              alt={project.images[currentImgIndex].label}
              fill 
              className="object-contain transition-transform duration-500"
              unoptimized
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/90 via-transparent to-transparent opacity-80"></div>

            {/* Top left counter indicator */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/60 backdrop-blur text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md flex items-center gap-1.5 sm:gap-2 border border-white/10">
               <FaExpandArrowsAlt /> {currentImgIndex + 1} of {project.images.length}
            </div>

            {/* Bottom Labels & Hint */}
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 flex items-center gap-2 pr-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent animate-pulse shrink-0"></span>
              <span className="text-white font-medium text-xs sm:text-sm md:text-base drop-shadow-md truncate">{project.images[currentImgIndex].label}</span>
            </div>
            <div className="hidden sm:block absolute bottom-4 right-4 text-gray-300 text-xs font-mono bg-black/40 px-3 py-1 rounded backdrop-blur border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to expand
            </div>

            {/* In-viewer navigation arrows (Hidden if only 1 image) */}
            {project.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-accent transition-colors opacity-0 group-hover:opacity-100 backdrop-blur border border-white/10">
                  <FaChevronLeft size={14} />
                </button>
                <button onClick={nextImage} className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-accent transition-colors opacity-0 group-hover:opacity-100 backdrop-blur border border-white/10">
                  <FaChevronRight size={14} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Row (Hidden if only 1 image) */}
          {project.images.length > 1 && (
            <div className="w-full overflow-hidden">
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide py-1 w-full">
                {project.images.map((img: any, idx: number) => (
                  <div 
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`relative shrink-0 w-20 sm:w-24 aspect-[16/10] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${currentImgIndex === idx ? 'border-2 border-accent scale-105' : 'border border-white/10 opacity-50 hover:opacity-100'}`}
                  >
                    <Image src={img.src} alt={img.label} fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Project Details */}
        <div className="lg:col-span-5 flex flex-col h-full justify-center min-w-0 w-full mt-4 lg:mt-0">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 md:mb-6 tracking-tight leading-tight break-words">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 md:mb-8 break-words">
            {project.description}
          </p>

          {/* Key Highlights */}
          <div className="mb-6 md:mb-8">
            <h4 className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-widest mb-3 md:mb-4">Key Highlights:</h4>
            <ul className="space-y-2 md:space-y-3">
              {project.highlights.map((highlight: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 md:gap-3 text-xs sm:text-sm text-gray-300 leading-relaxed break-words">
                  <FaCheckCircle className="text-accent mt-0.5 sm:mt-1 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mt-auto">
            <h4 className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-widest mb-3 md:mb-4">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string, i: number) => (
                <span key={i} className="text-[10px] sm:text-xs font-mono text-gray-300 bg-white/5 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-center whitespace-nowrap">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links (GitHub) */}
          {project.github && (
            <div className="mt-6 md:mt-8">
              <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium rounded-full transition-all duration-300 border border-white/10 hover:border-white/20 hover:-translate-y-0.5 shadow-lg">
                <FaGithub size={16} className="sm:text-[18px]" /> View Repository
              </a>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [modalState, setModalState] = useState<{isOpen: boolean, project: any | null, index: number}>({ isOpen: false, project: null, index: 0 });

  const projectsData = [
    {
      title: "AccrediTrack",
      type: "Featured Capstone Project",
      role: "Role: Programmer / Leader",
      description: "Developed a comprehensive web-based accreditation management system that centralizes institutional compliance tracking, document compilation, and enhances accreditation workflow management for educational departments.",
      highlights: [
        "Digitized institutional records and document tracking processes",
        "Real-time workflow and status monitoring for accreditation stages",
        "Relational database architecture using MySQL",
        "Secure authentication and role-based access control",
        "Administrative dashboard and departmental portal modules"
      ],
      tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
      github: "https://github.com/cjxsanchez/accreditrack-source-code.git",
      images: [
        { src: "/Login-Page.png", label: "Login Page" },
        { src: "/admin.png", label: "Admin Dashboard Overview" },
        { src: "/Program.png", label: "Program Module" },
        { src: "/Document Validation.png", label: "Document Validation" },
        { src: "/User Management.png", label: "User Management" },
        { src: "/Accreditation Folders.png", label: "Accreditation Folders" },
        { src: "/Faculty Dashboard.png", label: "Faculty Dashboard" },
        { src: "/Uploading.png", label: "Faculty Uploading" }
      ]
    },
    {
      title: "PDOHO Digital Records Hub",
      type: "Internship Project",
      role: "Role: Web Developer Intern",
      description: "A secure digital records management system tailored to modernize data handling, ensuring quick retrieval and safe storage of sensitive health information for the Provincial Department of Health Office.",
      highlights: [
        "Digitized manual office workflows for enhanced productivity",
        "Significantly improved document retrieval speeds and accuracy",
        "Secure data storage tailored for sensitive health records",
        "Intuitive user interface for fast adoption by administrative staff"
      ],
      tech: ["PHP", "MySQL", "Bootstrap", "CSS", "HTML", "JavaScript"],
      github: "https://github.com/cjxsanchez/pdoho-digital-records-hub.git",
      images: [
        { src: "/admin-login.png", label: "Login Page" },
        { src: "/admin-dashboard.png", label: "Hub Dashboard Overview" },
        { src: "/categories.png", label: "Document Categories" },
        { src: "/archives.png", label: "Archives" },
        { src: "/profile.png", label: "Profile" },
        { src: "/change-password.png", label: "Change Password" }
      ]
    },
    {
      title: "Portfolio v1.0",
      type: "Personal Project",
      role: "Role: Full-Stack Developer",
      description: "A world-class, premium developer portfolio built to showcase professional experience, projects, and skills with high-performance animations, fluid navigation, and modern UI/UX principles.",
      highlights: [
        "Built entirely with modern Next.js App Router architecture",
        "High-performance complex animations utilizing Framer Motion",
        "Responsive, mobile-first styling achieved through Tailwind CSS",
        "Custom interactive image galleries and full-screen preview modals"
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/cjxsanchez/my-portfolio.git",
      images: [
        { src: "/portfolio.png", label: "Portfolio Live Interface" }
      ]
    }
  ];

  const openModal = useCallback((project: any, index: number) => {
    setModalState({ isOpen: true, project, index });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const modalNextImage = useCallback(() => {
    setModalState(prev => {
      if (!prev.project) return prev;
      return { ...prev, index: prev.index === prev.project.images.length - 1 ? 0 : prev.index + 1 };
    });
  }, []);

  const modalPrevImage = useCallback(() => {
    setModalState(prev => {
      if (!prev.project) return prev;
      return { ...prev, index: prev.index === 0 ? prev.project.images.length - 1 : prev.index - 1 };
    });
  }, []);

  // Keyboard navigation for the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalState.isOpen) return;
      if (e.key === "ArrowRight") modalNextImage();
      if (e.key === "ArrowLeft") modalPrevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalState.isOpen, modalNextImage, modalPrevImage, closeModal]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20 w-full overflow-hidden">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-4 mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Selected Works</h2>
        <div className="h-[1px] bg-gradient-to-r from-accent to-transparent flex-grow ml-4"></div>
      </motion.div>

      {/* Render All Projects with the Gallery Layout */}
      {projectsData.map((project, idx) => (
        <ProjectCard key={idx} project={project} onOpenModal={openModal} />
      ))}

      {/* --- FULL SCREEN IMAGE MODAL --- */}
      <AnimatePresence>
        {modalState.isOpen && modalState.project && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050B14]/95 backdrop-blur-xl px-2 sm:px-4 py-6 sm:py-8"
          >
            {/* Modal Header */}
            <div className="absolute top-0 left-0 w-full px-4 sm:px-6 py-4 flex justify-between items-center z-50">
              <div className="flex flex-col max-w-[70%]">
                <h3 className="text-white font-bold text-sm sm:text-lg md:text-xl flex items-center gap-2 sm:gap-3 truncate">
                  <FaImage className="text-accent hidden sm:block shrink-0" /> <span className="truncate">{modalState.project.title}</span>
                </h3>
                <p className="text-accent text-xs sm:text-sm font-mono mt-0.5 sm:mt-1 truncate">
                  {modalState.project.images[modalState.index].label} <span className="text-gray-500 hidden sm:inline">({modalState.index + 1} of {modalState.project.images.length})</span>
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-accent text-white flex items-center justify-center rounded-full transition-colors border border-white/10 shrink-0"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Main Image (with Drag/Swipe support) */}
            <div className="relative w-full max-w-6xl flex-grow my-12 flex items-center justify-center">
              <motion.div 
                key={modalState.index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full max-h-[60vh] sm:max-h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/40"
                drag={modalState.project.images.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                  if (modalState.project.images.length <= 1) return;
                  if (offset.x > 50) modalPrevImage();
                  else if (offset.x < -50) modalNextImage();
                }}
              >
                <Image 
                  src={modalState.project.images[modalState.index].src} 
                  alt={modalState.project.images[modalState.index].label} 
                  fill 
                  className="object-contain pointer-events-none" 
                  unoptimized
                />
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-white/10 text-white text-xs sm:text-sm font-medium shadow-xl whitespace-nowrap max-w-[90%] truncate">
                  {modalState.project.images[modalState.index].label}
                </div>
              </motion.div>

              {/* Side Navigation Buttons (Hidden if only 1 image) */}
              {modalState.project.images.length > 1 && (
                <>
                  <button onClick={modalPrevImage} className="absolute left-0 sm:-left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/10 hover:bg-accent text-white flex items-center justify-center rounded-full transition-colors border border-white/10 backdrop-blur-sm z-50">
                    <FaChevronLeft size={16} />
                  </button>
                  <button onClick={modalNextImage} className="absolute right-0 sm:-right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/10 hover:bg-accent text-white flex items-center justify-center rounded-full transition-colors border border-white/10 backdrop-blur-sm z-50">
                    <FaChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer (Thumbnails & Hint) */}
            <div className="absolute bottom-4 sm:bottom-6 left-0 w-full flex flex-col items-center gap-4 sm:gap-6 px-2 sm:px-4 z-50">
              {modalState.project.images.length > 1 && (
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide max-w-full px-4 w-full justify-start sm:justify-center">
                  {modalState.project.images.map((img: any, idx: number) => (
                    <div 
                      key={idx}
                      onClick={() => setModalState(prev => ({ ...prev, index: idx }))}
                      className={`relative shrink-0 w-20 sm:w-24 md:w-32 aspect-[16/10] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 shadow-lg ${modalState.index === idx ? 'border-2 border-accent scale-105' : 'border border-white/20 opacity-50 hover:opacity-100'}`}
                    >
                      <Image src={img.src} alt={img.label} fill className="object-cover" unoptimized />
                    </div>
                  ))}
                </div>
              )}
              <p className="text-gray-500 font-mono text-[10px] sm:text-sm flex items-center gap-1.5 sm:gap-2">
                {modalState.project.images.length > 1 && (
                  <>Use <span className="px-1.5 sm:px-2 py-0.5 border border-gray-600 rounded bg-black/30">←</span> <span className="px-1.5 sm:px-2 py-0.5 border border-gray-600 rounded bg-black/30">→</span> or swipe • </>
                )}
                <span className="px-1.5 sm:px-2 py-0.5 border border-gray-600 rounded bg-black/30">ESC</span> to exit
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};


const Education = () => {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Education</h2>
        <div className="h-[1px] bg-gradient-to-r from-accent to-transparent flex-grow ml-4"></div>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative pl-6 md:pl-0">
        <div className="hidden md:block absolute left-[50%] -translate-x-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent"></div>
        <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent"></div>

        <div className="relative flex flex-col md:flex-row md:justify-between items-center w-full">
          {/* Dot */}
          <div className="absolute left-[-29px] md:left-[50%] md:-translate-x-[50%] w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0f172a] border-4 border-accent shadow-[0_0_10px_rgba(236,72,153,0.5)] z-10"></div>

          {/* Content */}
          <div className="w-full md:w-[45%] glass p-6 sm:p-8 rounded-2xl border border-white/5 text-left md:text-right relative mb-8 md:mb-0">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 break-words">Bachelor of Science in Information Technology</h3>
            <p className="text-gray-400 font-medium mb-4 text-sm sm:text-base">Catanduanes State University</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs sm:text-sm font-semibold mb-4">
              <FaAward /> Cum Laude
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Graduated with Latin Honors. Focused on full-stack web development, IT support, networking, troubleshooting, cybersecurity, database management, and user-centered design.
            </p>
          </div>

          <div className="w-full md:w-[45%] flex justify-start md:pl-8 text-gray-500 font-mono text-xs sm:text-sm mt-2 md:mt-0">
            Year Graduated: 2026
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<{ title: string; issuer: string; image: string } | null>(null);

  const certs = [
    { title: "Google AI", issuer: "Coursera", image: "/google-ai.png" },
    { title: "Junior Cybersecurity Analyst", issuer: "Cisco Networking Academy", image: "/junior-cyber.png" },
    { title: "Cybersecurity Defense Analyst", issuer: "Cisco Networking Academy", image: "/cybersecurity-defense-analyst.png" },
    { title: "Network Technician", issuer: "Cisco Networking Academy", image: "/Network-technician.png" },
    { title: "IT Customer Support Basics", issuer: "Cisco Networking Academy", image: "/it-support.png" },
    { title: "Ethical Hacker", issuer: "Cisco Networking Academy", image: "/ethical-hacker.png" },
    { title: "Python Essentials 1", issuer: "Cisco Networking Academy", image: "/python.png" },
    { title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", image: "/intro-cyber.png" }
    
  ];

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Certifications</h2>
        <div className="h-[1px] bg-gradient-to-r from-accent to-transparent flex-grow ml-4"></div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {certs.map((cert, idx) => (
          <motion.div 
            key={idx} 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            onClick={() => setSelectedCert(cert)}
            className="group relative glass p-5 sm:p-6 rounded-2xl border border-white/5 hover:border-accent/30 cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between bg-white/[0.01]"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 text-white">
              <FaAward size={50} className="sm:text-[60px]" />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-2 py-1 bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-gray-400 rounded mb-3 sm:mb-4">Credential Verified</span>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-accent transition-colors leading-snug mb-2 pr-6 sm:pr-8">{cert.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{cert.issuer}</p>
            </div>

            <div className="relative z-10 mt-6 sm:mt-8 flex items-center gap-2 text-accent text-xs sm:text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
              <FaExternalLinkAlt size={10} className="sm:text-[12px]" /> View Certificate
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-8 bg-[#0f172a]/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-4xl glass rounded-2xl p-2 border border-white/10 shadow-2xl bg-[#1e293b]"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 text-white hover:text-accent hover:bg-white/10 transition-colors p-2.5 sm:p-3 text-lg sm:text-xl bg-[#0f172a] border border-white/10 rounded-full shadow-lg z-10"
              >
                <FaTimes />
              </button>

              <div className="relative w-full aspect-[1.414/1] rounded-xl overflow-hidden bg-black/40 flex items-center justify-center">
                <p className="absolute text-gray-500 font-mono text-[10px] sm:text-sm z-0">Loading high-res document...</p>
                <Image 
                  src={selectedCert.image} 
                  alt={selectedCert.title} 
                  fill 
                  className="object-contain z-10"
                  unoptimized
                />
              </div>

              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">{selectedCert.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1.5 sm:mt-2">{selectedCert.issuer}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Contact = () => {
  const myEmail = "johncarlsanchez06@gmail.com"; 

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 max-w-4xl mx-auto text-center scroll-mt-20">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs sm:text-sm font-semibold mb-6 sm:mb-8">
        <FaEnvelope /> Let's Connect
      </motion.div>
      <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 sm:mb-8 tracking-tight text-white">Get In Touch</motion.h2>
      <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-400 mb-10 sm:mb-12 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
        I am currently looking for new opportunities to contribute to exciting projects. Whether you have a question, a potential role, or just want to connect, my inbox is always open!
      </motion.p>

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
        <a href={`mailto:${myEmail}`} className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-[#0f172a] rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
           Send an Email <FaArrowUp className="rotate-45" />
        </a>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 sm:mt-20 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto border-t border-white/10 pt-10 sm:pt-12">
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-300 text-lg sm:text-xl border border-white/10">
            <FaMapMarkerAlt />
          </div>
          <h4 className="text-white font-semibold text-sm sm:text-base">Location</h4>
          <p className="text-gray-400 text-xs sm:text-sm">Catanduanes, Philippines</p>
        </div>
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-300 text-lg sm:text-xl border border-white/10">
            <FaEnvelope />
          </div>
          <h4 className="text-white font-semibold text-sm sm:text-base">Email</h4>
          <p className="text-gray-400 text-xs sm:text-sm">johncarlsanchez06@gmail.com</p>
        </div>
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-300 text-lg sm:text-xl border border-white/10">
            <FaCalendarAlt />
          </div>
          <h4 className="text-white font-semibold text-sm sm:text-base">Availability</h4>
          <p className="text-gray-400 text-xs sm:text-sm">Open to roles</p>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-6 sm:py-8 text-center border-t border-white/10 bg-[#0f172a]/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl font-black tracking-tighter text-white">
          JS<span className="text-accent">.</span>
        </div>

        <div className="flex justify-center gap-4 sm:gap-6">
          <a href="https://github.com/cjxsanchez" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300"><FaGithub size={18} className="sm:text-[20px]" /></a>
          <a href="https://www.linkedin.com/in/john-carl-sanchez-974658418" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors duration-300"><FaLinkedin size={18} className="sm:text-[20px]" /></a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-gray-500 font-mono text-[10px] sm:text-xs">© {new Date().getFullYear()} John Carl S. Sanchez. All rights reserved.</p>
          <p className="text-gray-600 font-mono text-[10px] sm:text-xs flex items-center gap-1">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN PAGE LAYOUT ---

export default function Home() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 500);

      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'];
      let current = 'home';

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            current = section;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsResumeModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative selection:bg-accent/30 selection:text-white bg-[#0f172a] text-white min-h-screen overflow-x-hidden w-full">
      <AnimatedBackground />
      <Navbar activeSection={activeSection} onOpenResume={() => setIsResumeModalOpen(true)} />

      <Hero onOpenResume={() => setIsResumeModalOpen(true)} />
      <About />
      <Achievements />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />

      {/* --- FLOATING SCROLL TO TOP --- */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 p-3 sm:p-4 bg-white text-[#0f172a] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:bg-gray-200 transition-colors duration-300 z-50 flex items-center justify-center border border-white/20 hover:-translate-y-2"
            aria-label="Scroll to top"
          >
            <FaArrowUp size={14} className="sm:text-base" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- RESUME PDF VIEWER MODAL --- */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#050B14]/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-[90vh] glass rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl bg-[#0f172a] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 border-b border-white/10 bg-[#1e293b]/80 gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 overflow-hidden w-full sm:w-auto">
                  <div className="p-1.5 sm:p-2 bg-accent/20 text-accent rounded-lg shrink-0">
                    <FaFilePdf className="text-lg sm:text-2xl" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-bold text-xs sm:text-sm md:text-lg truncate">John_Carl_Sanchez_Resume.pdf</h3>
                      <span className="text-[8px] sm:text-[10px] uppercase tracking-wider bg-blue-500/20 text-blue-400 px-1.5 sm:px-2 py-0.5 rounded border border-blue-500/30 whitespace-nowrap">Official PDF</span>
                    </div>
                    <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 truncate">Fresh BSIT Graduate • Full-Stack Web Developer</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto shrink-0 w-full sm:w-auto justify-end border-t sm:border-none border-white/5 pt-2 sm:pt-0">
                  <a href="/resume.pdf" download className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-accent hover:bg-pink-600 text-white text-xs sm:text-sm rounded-md transition-colors shadow-lg">
                    <FaDownload /> <span className="hidden sm:inline">Download</span>
                  </a>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm rounded-md transition-colors border border-white/10">
                    <FaExternalLinkAlt /> <span className="hidden sm:inline">Open Tab</span>
                  </a>
                  <button onClick={() => setIsResumeModalOpen(false)} className="p-1.5 sm:p-2 ml-0 sm:ml-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-md transition-colors border border-white/10">
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* PDF Embed Content */}
              <div className="flex-grow w-full bg-[#323639] relative flex items-center justify-center">
                <p className="absolute text-gray-500 font-mono text-xs sm:text-sm z-0">Loading document...</p>
                <iframe 
                  src="/resume.pdf#toolbar=0&navpanes=0" 
                  className="w-full h-full border-none z-10 relative bg-white"
                  title="Resume PDF Viewer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}