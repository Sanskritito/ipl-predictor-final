"use client"

export function StadiumBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Stadium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/80 z-10"></div>

      {/* Stadium lights */}
      <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_40px_20px_rgba(255,255,255,0.3)] z-0"></div>
      <div className="absolute top-0 right-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_40px_20px_rgba(255,255,255,0.3)] z-0"></div>

      {/* Field lines */}
      <div className="absolute left-1/2 top-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-white/5 z-0"></div>
      <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-white/5 z-0"></div>
      <div className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-white/5 z-0"></div>

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  )
}
