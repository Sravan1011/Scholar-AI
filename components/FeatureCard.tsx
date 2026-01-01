import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    delay?: string;
}

export default function FeatureCard({ icon: Icon, title, description, delay }: FeatureCardProps) {
    return (
        <div
            className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-colors duration-300 group"
            style={{ animationDelay: delay }}
        >
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-zinc-100">{title}</h3>
            <p className="text-zinc-400 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
