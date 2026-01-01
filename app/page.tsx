import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import InteractiveDemo from "@/components/InteractiveDemo";
import { BookOpen, Search, Zap, Globe2 } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Smart PDF Reading",
      description: "Experience a clean, distraction-free reading environment optimized for complex academic papers.",
      delay: "0s"
    },
    {
      icon: Search,
      title: "Contextual Q&A",
      description: "Highlight any text and ask questions. Get instant clarifications, references, and related concepts.",
      delay: "0.2s"
    },
    {
      icon: Zap,
      title: "Instant Summaries",
      description: "Grasp the core ideas in seconds. Generate concise summaries of abstracts, methods, or entire papers.",
      delay: "0.4s"
    },
    {
      icon: Globe2,
      title: "Translation & Simplification",
      description: "Translate difficult sections into your native language or simplify technical jargon into plain English.",
      delay: "0.6s"
    }
  ];

  return (
    <main className="min-h-screen bg-black overflow-hidden selection:bg-blue-500/30 bg-grid-paper">

      <Hero />

      <InteractiveDemo />

      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
            Research <span className="text-gradient">Smarter</span>, Not Harder
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Our AI-powered tools help you deconstruct complex papers, understand key findings, and accelerate your research process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-12 relative z-10 bg-black">
        <div className="container mx-auto px-4 text-center text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Scholar AI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
