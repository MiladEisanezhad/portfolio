import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowLeft, Mail, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProjectImage {
    id: number
    image: string
}

interface Project {
    id: number
    title: string
    description: string
    image_url: string
    tags: string[]
    link: string

    // optional extended fields your API may return
    long_description?: string
    features?: string[]
    tech_stack?: string[]
    github_url?: string
    demo_url?: string
    year?: string

    // فیلدهای جدید بک‌اند
    extra_images?: ProjectImage[]
    video_url?: string
}

// ─── Custom Cursor (same as App.tsx) ─────────────────────────────────────────
function CustomCursor() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)
    const springConfig = { damping: 28, stiffness: 350 }
    const x = useSpring(cursorX, springConfig)
    const y = useSpring(cursorY, springConfig)
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        const move = (e: MouseEvent) => { cursorX.set(e.clientX - 11); cursorY.set(e.clientY - 11) }
        const over = (e: MouseEvent) => {
            const t = e.target as HTMLElement
            setHovered(!!(t.closest('a') || t.closest('button') || t.closest('[data-cursor-hover]')))
        }
        window.addEventListener('mousemove', move)
        window.addEventListener('mouseover', over)
        return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
    }, [])

    return (
        <motion.div
            style={{ x, y, position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}
            animate={{ scale: hovered ? 1.8 : 1 }}
            transition={{ scale: { type: 'spring', stiffness: 300, damping: 18 } }}
        >
            <svg width="22" height="22" viewBox="0 0 22 22" style={{ display: 'block', overflow: 'visible' }}>
                <defs>
                    <radialGradient id="starGrad2" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={hovered ? '#e879f9' : '#ffffff'} stopOpacity="1" />
                        <stop offset="35%" stopColor={hovered ? '#a78bfa' : '#38bdf8'} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={hovered ? '#6366f1' : '#0ea5e9'} stopOpacity="0" />
                    </radialGradient>
                    <filter id="starBlur2"><feGaussianBlur stdDeviation="0.7" /></filter>
                </defs>
                <circle cx="11" cy="11" r="10" fill="url(#starGrad2)" filter="url(#starBlur2)" opacity="0.7" />
                <path d="M11 2 L12.5 9.5 L20 11 L12.5 12.5 L11 20 L9.5 12.5 L2 11 L9.5 9.5 Z" fill="url(#starGrad2)" />
                <circle cx="11" cy="11" r="2" fill="white" opacity="0.95" />
            </svg>
        </motion.div>
    )
}

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(40)].map((_, i) => (
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
                    transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 4, ease: 'easeInOut' }}
                />
            ))}
        </div>
    )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
    const navigate = useNavigate()
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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f2e]/90 backdrop-blur-md border-b border-white/10' : ''}`}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2.5" data-cursor-hover>
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs text-cyan-300"
                        style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)' }}
                    >
                        {'</>'}
                    </div>
                    <span className="font-bold text-white text-lg tracking-tight">M<span className="text-cyan-400">.</span>E</span>
                </a>
                <button
                    onClick={() => navigate(-1)}
                    data-cursor-hover
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
            </div>
        </motion.nav>
    )
}

// ─── Main Detail Page ─────────────────────────────────────────────────────────
export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`${import.meta.env.VITE_API_URL}/api/projects/${id}/`)
            .then(res => { if (!res.ok) throw new Error(); return res.json() })
            .then(data => { setProject(data); setLoading(false) })
            .catch(() => { setError(true); setLoading(false) })
    }, [id])

    // تبدیل لینک معمولی یوتیوب به لینک Embed
    const getEmbedUrl = (url: string) => {
        if (url.includes('youtube.com/watch?v=')) {
            return url.replace('watch?v=', 'embed/')
        }
        if (url.includes('youtu.be/')) {
            return url.replace('youtu.be/', 'www.youtube.com/embed/')
        }
        return url
    }

    return (
        <>
            <style>{`
        @media (pointer: fine) { * { cursor: none !important; } }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0f2e; }
        ::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 4px; }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(56,189,248,0.3); }
          50% { box-shadow: 0 0 40px rgba(56,189,248,0.7), 0 0 80px rgba(129,140,248,0.3); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
      `}</style>

            <CustomCursor />
            <Nav />

            <div
                className="min-h-screen relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #060b1f 0%, #0d1340 30%, #130a2e 60%, #060b1f 100%)' }}
            >
                <Particles />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)' }} />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-10 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)' }} />

                <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
                    <AnimatePresence mode="wait">
                        {loading && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
                            >
                                <motion.div
                                    className="w-12 h-12 rounded-full border-2 border-cyan-400/30 border-t-cyan-400"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                />
                                <p className="text-slate-400 text-sm">Loading project...</p>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center"
                            >
                                <div className="text-6xl">✦</div>
                                <h2 className="text-3xl font-bold text-white">Project not found</h2>
                                <p className="text-slate-400">This project doesn't exist or has been removed.</p>
                                <Button
                                    data-cursor-hover
                                    onClick={() => navigate('/')}
                                    style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', border: 'none', color: 'white' }}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
                                </Button>
                            </motion.div>
                        )}

                        {!loading && !error && project && (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Breadcrumb */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-center gap-2 text-sm text-slate-500 mb-10"
                                >
                                    <a href="/" className="hover:text-cyan-400 transition-colors" data-cursor-hover>Home</a>
                                    <span>/</span>
                                    <a href="/#projects" className="hover:text-cyan-400 transition-colors" data-cursor-hover>Projects</a>
                                    <span>/</span>
                                    <span className="text-slate-300">{project.title}</span>
                                </motion.div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                                    {/* LEFT — Main Image + Gallery */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.7, delay: 0.2 }}
                                        className="space-y-6"
                                    >
                                        <div
                                            className="rounded-2xl overflow-hidden relative group"
                                            style={{
                                                border: '1px solid rgba(56,189,248,0.2)',
                                                boxShadow: '0 30px 80px rgba(56,189,248,0.1)',
                                            }}
                                        >
                                            <motion.img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full aspect-video object-cover"
                                                whileHover={{ scale: 1.04 }}
                                                transition={{ duration: 0.5 }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#060b1f]/50 via-transparent to-transparent" />
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                style={{ boxShadow: 'inset 0 0 60px rgba(56,189,248,0.08)' }}
                                            />
                                        </div>

                                        {/* Gallery (extra_images) */}
                                        {project.extra_images && project.extra_images.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="grid grid-cols-3 gap-4"
                                            >
                                                {project.extra_images.map((img) => (
                                                    <motion.div
                                                        key={img.id}
                                                        whileHover={{ scale: 1.05 }}
                                                        className="rounded-xl overflow-hidden border border-white/5 cursor-pointer"
                                                    >
                                                        <img
                                                            src={img.image}
                                                            className="w-full h-24 object-cover"
                                                            alt="Gallery"
                                                        />
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}

                                        {/* Action buttons below image */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="flex gap-4 mt-6 flex-wrap"
                                        >
                                            {project.demo_url || project.link ? (
                                                <Button
                                                    asChild
                                                    data-cursor-hover
                                                    className="relative overflow-hidden group px-6"
                                                    style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', border: 'none', color: 'white' }}
                                                >
                                                    <a href={project.demo_url || project.link} target="_blank" rel="noopener noreferrer">
                                                        Live Demo <ExternalLink className="ml-2 w-4 h-4" />
                                                    </a>
                                                </Button>
                                            ) : null}
                                            {project.github_url && (
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    data-cursor-hover
                                                    className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 px-6"
                                                >
                                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                                        GitHub <ExternalLink className="ml-2 w-4 h-4" />
                                                    </a>
                                                </Button>
                                            )}
                                        </motion.div>
                                    </motion.div>

                                    {/* RIGHT — Info + Video */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.7, delay: 0.3 }}
                                        className="space-y-8"
                                    >
                                        {/* Label + title + description */}
                                        <div>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3"
                                            >
                                                {project.year ? `Project · ${project.year}` : 'Featured Project'}
                                            </motion.p>
                                            <motion.h1
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.45, duration: 0.6 }}
                                                className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
                                            >
                                                {project.title}
                                            </motion.h1>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.55 }}
                                                className="text-slate-400 text-lg leading-relaxed whitespace-pre-line"
                                            >
                                                {project.long_description || project.description}
                                            </motion.p>
                                        </div>

                                        {/* Video section */}
                                        {project.video_url && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                                className="mt-4"
                                            >
                                                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                                    <PlayCircle className="text-cyan-400" /> Project Preview
                                                </h3>
                                                <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
                                                    <iframe
                                                        className="w-full h-full"
                                                        src={getEmbedUrl(project.video_url)}
                                                        title="Project Video"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Tags / Technologies */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Technologies</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {(project.tech_stack || project.tags).map((tag, i) => (
                                                    <motion.span
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.65 + i * 0.05 }}
                                                        className="text-xs px-3 py-1.5 rounded-full text-cyan-300 font-medium"
                                                        style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}
                                                    >
                                                        {tag}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Features list (if available) */}
                                        {project.features && project.features.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Key Features</h3>
                                                <ul className="space-y-3">
                                                    {project.features.map((f, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.75 + i * 0.07 }}
                                                            className="flex items-start gap-3 text-slate-400 text-sm"
                                                        >
                                                            <span className="text-cyan-400 mt-0.5 shrink-0">✦</span>
                                                            {f}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}

                                        {/* Divider + CTA */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.85 }}
                                            className="pt-4 border-t"
                                            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                                        >
                                            <p className="text-slate-500 text-sm mb-4">Interested in working together?</p>
                                            <Button
                                                asChild
                                                variant="outline"
                                                data-cursor-hover
                                                className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10"
                                            >
                                                <a href="/#contact">
                                                    Contact Me <Mail className="ml-2 w-4 h-4" />
                                                </a>
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* ── More Projects ── */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="mt-24 text-center"
                                >
                                    <div
                                        className="inline-block rounded-2xl px-10 py-8"
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.07)',
                                            backdropFilter: 'blur(12px)',
                                        }}
                                    >
                                        <p className="text-cyan-400 text-xs font-medium tracking-widest uppercase mb-2">More Work</p>
                                        <h3 className="text-2xl font-bold text-white mb-4">Explore Other Projects</h3>
                                        <Button
                                            asChild
                                            data-cursor-hover
                                            style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', border: 'none', color: 'white' }}
                                        >
                                            <a href="/#projects">
                                                View All Projects <ExternalLink className="ml-2 w-4 h-4" />
                                            </a>
                                        </Button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <footer
                    className="relative z-10 border-t"
                    style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(6,11,31,0.8)' }}
                >
                    <div className="container mx-auto px-6 py-6 text-center text-xs text-slate-600">
                        © {new Date().getFullYear()} Milad Eisanezhad. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    )
}
