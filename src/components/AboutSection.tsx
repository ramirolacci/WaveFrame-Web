import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Canvas } from "@react-three/fiber"
import { Logo3DModel } from "./Logo3D"

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-32 bg-[#060c14] overflow-hidden border-t border-white/5">
      {/* Background grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="about-reveal">
              {/* 3D Logo moved here */}
              <div className="h-40 w-40 mb-[-20px] relative z-10 pointer-events-none -ml-6">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                  <ambientLight intensity={1.5} />
                  <pointLight position={[10, 10, 10]} intensity={25} color="#3dd6f5" />
                  <pointLight position={[-10, -10, -10]} intensity={20} color="#6040ff" />
                  <spotLight position={[0, 5, 0]} intensity={30} angle={0.5} penumbra={1} color="#ffffff" />
                  <Logo3DModel />
                </Canvas>
              </div>

              <div className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full border border-primary/20">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">Nuestra Esencia</span>
              </div>
            </div>
            
            <h2 className="about-reveal text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              Arquitectos del <br />
              <span className="text-gradient">Futuro Digital.</span>
            </h2>
            
            <p className="about-reveal text-xl text-white/50 leading-relaxed max-w-xl">
              WaveFrame nace de la necesidad de romper con lo convencional. No somos una agencia más; somos un laboratorio de innovación donde la precisión técnica se funde con el diseño de vanguardia.
            </p>

            <div className="about-reveal space-y-6 pt-4">
              <p className="text-white/70 font-medium italic border-l-2 border-primary pl-6">
                "Nuestra misión es simple: forjar la infraestructura tecnológica que permita a las empresas más ambiciosas dominar su industria."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Precisión", desc: "Código limpio, escalable y optimizado al milisegundo." },
              { title: "Innovación", desc: "Exploramos las fronteras de la IA y el desarrollo Web3." },
              { title: "Compromiso", desc: "Tu éxito es nuestra única métrica de rendimiento." },
              { title: "Diseño", desc: "Interfaces que cautivan y convierten desde el primer clic." },
            ].map((pillar) => (
              <div key={pillar.title} className="about-reveal glass p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-500 group">
                <div className="text-primary font-black mb-4 tracking-widest uppercase text-xs opacity-50 group-hover:opacity-100 transition-opacity">
                  {pillar.title}
                </div>
                <div className="text-white/80 font-bold leading-snug">
                  {pillar.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
