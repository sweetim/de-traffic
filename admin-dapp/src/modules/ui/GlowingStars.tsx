import { cn } from "@/utils/cn"
import clsx from "clsx"
import {
  AnimatePresence,
  motion,
} from "framer-motion"
import {
  useEffect,
  useRef,
  useState,
} from "react"

export const Illustration = () => {
  const stars = 540
  const columns = 18

  const [ glowingStars, setGlowingStars ] = useState<number[]>([])

  const highlightedStars = useRef<number[]>([])

  useEffect(() => {
    const interval = setInterval(
      function createGlowingStars() {
        highlightedStars.current = Array.from({ length: 20 }, () => Math.floor(Math.random() * stars))
        setGlowingStars([ ...highlightedStars.current ])

        return createGlowingStars
      }(),
      3000,
    )

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="h-full p-1 w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `1px`,
      }}
    >
      {[ ...Array(stars) ].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx)
        const delay = (starIdx % 10) * 0.1

        return (
          <div
            key={`matrix-col-${starIdx}}`}
            className="relative flex items-center justify-center"
          >
            <Star
              isGlowing={isGlowing}
              delay={delay}
            />

            <AnimatePresence mode="wait">
              {isGlowing && <Glow delay={delay} />}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [ 1, 1.2, 2.5, 2.2, 1.5 ] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn("bg-[#666] h-[1px] w-[1px] rounded-full relative z-20")}
    >
    </motion.div>
  )
}

const Glow = ({ delay }: { delay: number }) => {
  const isEven = Math.floor(delay * 10) % 2 === 0
  const starColorClassName = clsx(
    "absolute left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full blur-[1px] shadow-3xl",
    {
      "bg-red-500": !isEven,
      "shadow-red-400": !isEven,
      "bg-green-500": isEven,
      "shadow-blue-400": isEven,
    },
  )

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className={starColorClassName}
    />
  )
}
