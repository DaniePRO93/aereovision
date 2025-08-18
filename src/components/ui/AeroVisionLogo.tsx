import { cn } from "@/lib/utils";

interface AeroVisionLogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
  animated?: boolean;
}

const AeroVisionLogo = ({ 
  size = "medium", 
  className,
  animated = true 
}: AeroVisionLogoProps) => {
  const sizeMap = {
    small: "h-6 w-6",
    medium: "h-7 w-7", 
    large: "h-8 w-8"
  };

  return (
    <div className={cn("relative", sizeMap[size], className)}>
      <svg
        viewBox="0 0 100 100"
        className={cn("w-full h-full", animated && "transition-all duration-300")}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Primary Gradient */}
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--neon-green))" />
          </linearGradient>
          
          {/* Wing Gradient */}
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.8)" />
            <stop offset="50%" stopColor="hsl(var(--neon-green))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
          </linearGradient>
          
          {/* Lens Gradient */}
          <radialGradient id="lensGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary-glow))" />
            <stop offset="70%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </radialGradient>
        </defs>

        {/* Left Wing */}
        <path
          d="M15 40 C 10 35, 5 45, 12 52 L 35 50 C 32 45, 28 42, 15 40 Z"
          fill="url(#wingGradient)"
          className={cn(
            "opacity-90",
            animated && "animate-pulse-subtle group-hover:animate-float"
          )}
        />
        
        {/* Right Wing */}
        <path
          d="M85 40 C 90 35, 95 45, 88 52 L 65 50 C 68 45, 72 42, 85 40 Z"
          fill="url(#wingGradient)"
          className={cn(
            "opacity-90",
            animated && "animate-pulse-subtle group-hover:animate-float"
          )}
        />

        {/* Camera Body (Main Circle) */}
        <circle
          cx="50"
          cy="50"
          r="22"
          fill="url(#primaryGradient)"
          className={cn(
            "opacity-95",
            animated && "group-hover:animate-glow"
          )}
        />

        {/* Lens Outer Ring */}
        <circle
          cx="50"
          cy="50"
          r="18"
          fill="none"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="1.5"
          className="opacity-80"
        />

        {/* Lens Inner Ring */}
        <circle
          cx="50"
          cy="50"
          r="14"
          fill="url(#lensGradient)"
          className={cn(
            "opacity-90",
            animated && "group-hover:animate-pulse"
          )}
        />

        {/* Aperture Lines */}
        <g className="opacity-70">
          <line x1="42" y1="42" x2="58" y2="58" stroke="hsl(var(--primary-foreground))" strokeWidth="1" />
          <line x1="58" y1="42" x2="42" y2="58" stroke="hsl(var(--primary-foreground))" strokeWidth="1" />
          <line x1="50" y1="38" x2="50" y2="62" stroke="hsl(var(--primary-foreground))" strokeWidth="1" />
          <line x1="38" y1="50" x2="62" y2="50" stroke="hsl(var(--primary-foreground))" strokeWidth="1" />
        </g>

        {/* Central Focus Point */}
        <circle
          cx="50"
          cy="50"
          r="3"
          fill="hsl(var(--neon-green))"
          className={cn(
            "opacity-90",
            animated && "animate-pulse"
          )}
        />

        {/* Wing Details */}
        <path
          d="M20 45 L 32 47"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          className="opacity-60"
        />
        <path
          d="M80 45 L 68 47"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          className="opacity-60"
        />
      </svg>
    </div>
  );
};

export default AeroVisionLogo;