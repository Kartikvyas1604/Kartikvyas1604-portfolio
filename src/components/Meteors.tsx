import { useEffect, useState } from "react"

interface MeteorProps {
  number?: number
}

export function Meteors({ number = 20 }: MeteorProps) {
  const [meteors, setMeteors] = useState<Array<{ id: number; delay: number; left: string }>>([])

  useEffect(() => {
    const meteorArray = Array.from({ length: number }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      left: Math.random() * 100 + "%",
    }))
    setMeteors(meteorArray)
  }, [number])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="meteor meteor-animate absolute top-0 h-0.5 w-0.5 rounded-full bg-primary shadow-[0_0_0_1px_hsl(var(--meteor-color))] rotate-45"
          style={{
            left: meteor.left,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${Math.random() * 2 + 2}s`,
          }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 w-[50px] h-0.5 -translate-x-1/2 bg-gradient-to-r from-primary to-transparent" />
        </span>
      ))}
    </div>
  )
}