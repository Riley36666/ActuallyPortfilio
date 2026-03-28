export default function Background() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute w-125 h-125 bg-teal-500/20 blur-3xl rounded-full 
                      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />

      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-teal-300 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
} 

