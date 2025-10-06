'use client'

export default function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-green-100 to-emerald-100" />
      
      {/* Floating shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-200/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-32 right-20 w-16 h-16 bg-green-300/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-emerald-200/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 right-32 w-12 h-12 bg-green-400/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      
      {/* Geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-green-300/20 rotate-45 animate-pulse-slow" />
      <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-emerald-300/20 rotate-12 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-green-400/20 rotate-45 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Animated lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-300/50 to-transparent animate-pulse" />
      <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-emerald-300/50 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-200/20 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-200/20 to-transparent rounded-tr-full" />
    </div>
  )
}
