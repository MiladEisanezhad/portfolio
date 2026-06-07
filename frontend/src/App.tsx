import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
    Rocket, Globe, Code, Palette, Zap,
    Mail, ExternalLink, Send
} from 'lucide-react'

// Inline SVGs — lucide-react dropped brand icons (Github/Linkedin/Twitter)
const IconGithub = ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
)

const IconLinkedin = ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

const IconX = ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.254 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
)

interface Project {
    id: number
    title: string
    description: string
    image_url: string
    tags: string[]
    link: string
}

// ─── Custom Cursor ───────────────────────────────────────────────────────────
function CustomCursor() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)
    const springConfig = { damping: 28, stiffness: 350 }
    const x = useSpring(cursorX, springConfig)
    const y = useSpring(cursorY, springConfig)
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX - 11)
            cursorY.set(e.clientY - 11)
        }
        const over = (e: MouseEvent) => {
            const t = e.target as HTMLElement
            setHovered(!!(t.closest('a') || t.closest('button') || t.closest('[data-cursor-hover]')))
        }
        window.addEventListener('mousemove', move)
        window.addEventListener('mouseover', over)
        return () => {
            window.removeEventListener('mousemove', move)
            window.removeEventListener('mouseover', over)
        }
    }, [])

    return (
        <motion.div
            style={{ x, y, position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}
            animate={{ scale: hovered ? 1.8 : 1 }}
            transition={{ scale: { type: 'spring', stiffness: 300, damping: 18 } }}
        >
            <svg width="22" height="22" viewBox="0 0 22 22" style={{ display: 'block', overflow: 'visible' }}>
                <defs>
                    <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={hovered ? '#e879f9' : '#ffffff'} stopOpacity="1" />
                        <stop offset="35%" stopColor={hovered ? '#a78bfa' : '#38bdf8'} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={hovered ? '#6366f1' : '#0ea5e9'} stopOpacity="0" />
                    </radialGradient>
                    <filter id="starBlur">
                        <feGaussianBlur stdDeviation="0.7" />
                    </filter>
                </defs>
                <circle cx="11" cy="11" r="10" fill="url(#starGrad)" filter="url(#starBlur)" opacity="0.7" />
                <path d="M11 2 L12.5 9.5 L20 11 L12.5 12.5 L11 20 L9.5 12.5 L2 11 L9.5 9.5 Z" fill="url(#starGrad)" />
                <circle cx="11" cy="11" r="2" fill="white" opacity="0.95" />
            </svg>
        </motion.div>
    )
}

// ─── Floating Particles ───────────────────────────────────────────────────────
function Particles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(60)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: Math.random() < 0.3 ? 3 : 1.5,
                        height: Math.random() < 0.3 ? 3 : 1.5,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#818cf8' : '#e879f9',
                    }}
                    animate={{ opacity: [0, 1, 0], y: [0, -30, 0] }}
                    transition={{
                        duration: Math.random() * 4 + 3,
                        repeat: Infinity,
                        delay: Math.random() * 4,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', h)
        return () => window.removeEventListener('scroll', h)
    }, [])

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f2e]/90 backdrop-blur-md border-b border-white/10' : ''
                }`}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs text-cyan-300"
                        style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)' }}
                    >
                        {'</>'}
                    </div>
                    <span className="font-bold text-white text-lg tracking-tight">M<span className="text-cyan-400">.</span>E</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm text-slate-300 hover:text-cyan-400 transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}
                </div>
                <div className="flex gap-3">
                    {[IconGithub, IconLinkedin, IconX].map((Icon, i) => (
                        <a key={i} href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                            <Icon className="w-4 h-4" />
                        </a>
                    ))}
                </div>
            </div>
        </motion.nav>
    )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
    const [projects, setProjects] = useState<Project[]>([])
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/projects/`)
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(() => { })
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormStatus('sending')
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            if (res.ok) {
                setFormStatus('success')
                setFormData({ name: '', email: '', message: '' })
            } else {
                setFormStatus('error')
            }
        } catch {
            setFormStatus('error')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const features = [
        { icon: <Code className="w-6 h-6" />, title: 'Clean Code', description: 'Maintainable, scalable, well-documented code following best practices.' },
        { icon: <Palette className="w-6 h-6" />, title: 'Modern Design', description: 'Beautiful, intuitive interfaces with attention to detail.' },
        { icon: <Zap className="w-6 h-6" />, title: 'Performance', description: 'Optimized for speed and efficiency across all devices.' },
        { icon: <Globe className="w-6 h-6" />, title: 'Responsive', description: 'Seamlessly adapts to any screen size.' },
        { icon: <Rocket className="w-6 h-6" />, title: 'Fast Delivery', description: 'On-time delivery with agile methodology.' },
        { icon: <Rocket className="w-6 h-6" />, title: 'Innovation', description: 'Latest technologies and cutting-edge solutions.' },
    ]

    return (
        <>
            {/* Custom cursor — only on non-touch devices */}
            <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0f2e; }
        ::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 4px; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(56,189,248,0.3); }
          50% { box-shadow: 0 0 40px rgba(56,189,248,0.7), 0 0 80px rgba(129,140,248,0.3); }
        }
        .profile-ring { animation: glow-pulse 3s ease-in-out infinite; }
        .float-card { animation: float 6s ease-in-out infinite; }
        .orbit-ring { animation: rotate-slow 20s linear infinite; }
      `}</style>

            <CustomCursor />
            <Nav />

            <div
                id="home"
                className="min-h-screen relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #060b1f 0%, #0d1340 30%, #130a2e 60%, #060b1f 100%)',
                }}
            >
                <Particles />

                {/* Ambient glow blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)' }} />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-10 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)' }} />

                {/* ── HERO ── */}
                <section className="relative z-10 container mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* LEFT — Name & Text */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4"
                                >
                                    Backend Developer
                                </motion.p>

                                <h1 className="text-6xl md:text-7xl xl:text-8xl font-black leading-none mb-6">
                                    <motion.span
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.7 }}
                                        className="block text-white"
                                    >
                                        Milad
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.7 }}
                                        className="block"
                                        style={{
                                            background: 'linear-gradient(90deg, #38bdf8, #818cf8, #e879f9)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        Eisanezhad
                                    </motion.span>
                                </h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-slate-400 text-lg mb-10 max-w-md leading-relaxed"
                                >
                                    Building exceptional digital experiences where design meets performance.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="flex gap-4 flex-wrap"
                                >
                                    <Button
                                        size="lg"
                                        data-cursor-hover
                                        className="relative overflow-hidden group px-8"
                                        style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', border: 'none', color: 'white' }}
                                        asChild
                                    >
                                        <a href="#projects">
                                            <span className="relative z-10 flex items-center gap-2">
                                                View Projects <ExternalLink className="w-4 h-4" />
                                            </span>
                                        </a>
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        data-cursor-hover
                                        className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 px-8"
                                        asChild
                                    >
                                        <a href="#contact">
                                            Contact Me <Mail className="ml-2 w-4 h-4" />
                                        </a>
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* RIGHT — Profile Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, delay: 0.3 }}
                            className="flex justify-center lg:justify-end relative"
                        >
                            {/* Orbit ring */}
                            <div className="relative flex items-center justify-center">
                                <div
                                    className="orbit-ring absolute w-80 h-80 rounded-full border border-cyan-400/20"
                                    style={{ borderStyle: 'dashed' }}
                                />
                                <div
                                    className="orbit-ring absolute w-64 h-64 rounded-full border border-violet-500/20"
                                    style={{ animationDirection: 'reverse', animationDuration: '14s' }}
                                />

                                {/* Glow ring + profile circle */}
                                <div
                                    className="profile-ring relative w-56 h-56 rounded-full overflow-hidden"
                                    style={{ border: '3px solid rgba(56,189,248,0.6)' }}
                                >
                                    {/* Replace src with your real photo */}
                                    <img
                                        src="/milad-profile.png"
                                        alt="Milad Eisanezhad"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1340]/40 via-transparent to-transparent" />
                                </div>

                                {/* Floating badge — experience */}
                                <motion.div
                                    className="float-card absolute -bottom-2 -left-6 bg-[#0d1340] border border-cyan-400/30 rounded-xl px-4 py-2 text-xs text-cyan-300 font-medium backdrop-blur-sm"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    ✦ Django developer
                                </motion.div>

                                {/* Floating badge — stack */}
                                <motion.div
                                    className="absolute -top-2 -right-4 bg-[#0d1340] border border-violet-400/30 rounded-xl px-4 py-2 text-xs text-violet-300 font-medium backdrop-blur-sm"
                                    style={{ animationDelay: '3s' }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.4 }}
                                >
                                    Backend
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll hint */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
                        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
                    </motion.div>
                </section>

                {/* ── FEATURES ── */}
                <section className="relative z-10 container mx-auto px-6 py-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center mb-16">
                            <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">Skills</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What I Bring</h2>
                            <p className="text-slate-400 max-w-xl mx-auto">
                                Technical expertise combined with creative vision to deliver outstanding results
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {features.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    data-cursor-hover
                                >
                                    <div
                                        className="h-full rounded-2xl p-6 border transition-all duration-300"
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: 'rgba(255,255,255,0.07)',
                                            backdropFilter: 'blur(12px)',
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.3)'
                                                ; (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.05)'
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                                                ; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
                                        }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-cyan-400"
                                            style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}
                                        >
                                            {f.icon}
                                        </div>
                                        <h3 className="text-white font-semibold text-base mb-2">{f.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* ── PROJECTS ── */}
                <section id="projects" className="relative z-10 container mx-auto px-6 py-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center mb-16">
                            <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">Work</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
                            <p className="text-slate-400 max-w-xl mx-auto">
                                A showcase of websites and applications I've crafted
                            </p>
                        </div>

                        {projects.length === 0 ? (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-slate-500 py-12"
                            >
                                Projects coming soon...
                            </motion.p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map((project, i) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: i * 0.12 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -10 }}
                                        onHoverStart={() => setHoveredProject(project.id)}
                                        onHoverEnd={() => setHoveredProject(null)}
                                        data-cursor-hover
                                    >
                                        <div
                                            className="h-full rounded-2xl overflow-hidden flex flex-col transition-all duration-500"
                                            style={{
                                                background: 'rgba(255,255,255,0.03)',
                                                border: hoveredProject === project.id
                                                    ? '1px solid rgba(56,189,248,0.4)'
                                                    : '1px solid rgba(255,255,255,0.07)',
                                                boxShadow: hoveredProject === project.id
                                                    ? '0 20px 60px rgba(56,189,248,0.15)'
                                                    : 'none',
                                            }}
                                        >
                                            {/* Image */}
                                            <div className="relative aspect-video overflow-hidden">
                                                <motion.img
                                                    src={project.image_url}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                    animate={{ scale: hoveredProject === project.id ? 1.08 : 1 }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#060b1f] via-[#060b1f]/20 to-transparent" />

                                                {/* Hover overlay with CTA */}
                                                <AnimatePresence>
                                                    {hoveredProject === project.id && (
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="absolute inset-0 flex items-center justify-center"
                                                            style={{ background: 'rgba(6,11,31,0.6)', backdropFilter: 'blur(4px)' }}
                                                        >
                                                            <motion.div
                                                                initial={{ scale: 0.8, y: 10 }}
                                                                animate={{ scale: 1, y: 0 }}
                                                                className="flex items-center gap-2 text-white font-medium text-sm"
                                                                style={{
                                                                    background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                                                                    padding: '10px 24px',
                                                                    borderRadius: '100px',
                                                                }}
                                                            >
                                                                View Project <ExternalLink className="w-4 h-4" />
                                                            </motion.div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 flex flex-col flex-1">
                                                <h3 className="text-white font-semibold text-base mb-2">{project.title}</h3>
                                                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.map((tag, j) => (
                                                        <span
                                                            key={j}
                                                            className="text-xs px-2.5 py-1 rounded-full text-cyan-300 font-medium"
                                                            style={{
                                                                background: 'rgba(56,189,248,0.1)',
                                                                border: '1px solid rgba(56,189,248,0.2)',
                                                            }}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </section>

                {/* ── ABOUT ── */}
                <section id="about" className="relative z-10 container mx-auto px-6 py-24">
                    <div className="text-center mb-8">
                        <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">About Me</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            A Passionate Developer<br />Who Loves to Code
                        </h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <p className="text-slate-400 text-lg leading-relaxed">
                            I’m a backend developer with a passion for building robust and scalable systems. With deep
                            expertise in Django, I craft the logic, APIs, and architecture that power great products
                            — turning complex requirements into clean, reliable solutions.
                        </p>
                    </motion.div>
                </section>
                {/* ── SKILLS ── */}
                <section id="skills" className="relative z-10 container mx-auto px-6 py-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center mb-16">
                            <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">Skills</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">My Tech Stack</h2>
                            <p className="text-slate-400 max-w-xl mx-auto">Technologies I work with to bring ideas to life</p>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
                            {[
                                { name: 'Django', svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" alt="Django" className="w-10 h-10" /> },
                                { name: 'TypeScript', svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-10 h-10" /> },
                                { name: 'JavaScript', svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-10 h-10" /> },
                                { name: 'Python', svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-10 h-10" /> },
                                { name: 'HTML5', svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" className="w-10 h-10" /> },
                                { name: 'PostgreSQL', svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-10 h-10" /> },
                                { name: 'CSS3', svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" className="w-10 h-10" /> },
                                { name: 'SQLite', svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" alt="SQlite" className="w-10 h-10" /> },
                                { name: 'MongoDB', svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-10 h-10" /> },
                                { name: 'REST API', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z" /></svg> },
                                { name: 'Git', svg: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-10 h-10" /> },
                            ].map((skill, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -6, scale: 1.05 }}
                                    data-cursor-hover
                                    className="flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 group"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.35)'
                                            ; (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.06)'
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                                            ; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
                                    }}
                                >
                                    <div className="w-10 h-10 text-slate-300 group-hover:text-cyan-400 transition-colors duration-300">
                                        {skill.svg}
                                    </div>
                                    <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors text-center font-medium">
                                        {skill.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>


                {/* ── CONTACT ── */}
                <section id="contact" className="relative z-10 container mx-auto px-6 py-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center mb-16">
                            <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">Contact</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Work Together</h2>
                            <p className="text-slate-400 max-w-xl mx-auto">
                                Have a project in mind? Get in touch!
                            </p>
                        </div>

                        <div className="max-w-xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="rounded-2xl p-8"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-300">Name</label>
                                        <input
                                            name="name"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-11 rounded-xl px-4 text-sm text-white placeholder-slate-500 outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-300">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-11 rounded-xl px-4 text-sm text-white placeholder-slate-500 outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-300">Message</label>
                                        <textarea
                                            name="message"
                                            placeholder="Tell me about your project..."
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                                        />
                                    </div>

                                    <AnimatePresence>
                                        {formStatus === 'success' && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="text-sm text-cyan-400"
                                            >
                                                ✓ Message sent! I'll get back to you soon.
                                            </motion.p>
                                        )}
                                        {formStatus === 'error' && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="text-sm text-red-400"
                                            >
                                                Something went wrong. Please try again.
                                            </motion.p>
                                        )}
                                    </AnimatePresence>

                                    <motion.button
                                        type="submit"
                                        disabled={formStatus === 'sending'}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        data-cursor-hover
                                        className="w-full h-12 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
                                        style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}
                                    >
                                        {formStatus === 'sending' ? 'Sending...' : (<>Send Message <Send className="w-4 h-4" /></>)}
                                    </motion.button>
                                </form>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* ── FOOTER ── */}
                <footer
                    className="relative z-10 border-t"
                    style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(6,11,31,0.8)' }}
                >
                    <div className="container mx-auto px-6 py-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            <div>
                                <div className="flex items-center gap-2.5 mb-3">
                                    <div
                                        className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] text-cyan-300"
                                        style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)' }}
                                    >
                                        {'</>'}
                                    </div>
                                    <span className="font-bold text-white">milad<span className="text-cyan-400">.</span>dev</span>
                                </div>
                                <p className="text-sm text-slate-500">Building the future, one line of code at a time.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-3 text-sm">Quick Links</h4>
                                <ul className="space-y-2 text-sm text-slate-500">
                                    {['Home', 'Projects', 'About', 'Contact'].map(l => (
                                        <li key={l}>
                                            <a href={`#${l.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">{l}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-3 text-sm">Connect</h4>
                                <div className="flex gap-3">
                                    {[IconGithub, IconLinkedin, IconX, Mail].map((Icon, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            data-cursor-hover
                                            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"
                                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                                        >
                                            <Icon className="w-4 h-4" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="border-t pt-6 text-center text-xs text-slate-600" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                            © {new Date().getFullYear()} Milad Eisanezhad. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
