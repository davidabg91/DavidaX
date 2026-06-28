import { useState, type FC } from "react";
import { motion } from "framer-motion";

interface TextSplitProps {
  children: string;
  className?: string;
  topClassName?: string;
  bottomClassName?: string;
  maxMove?: number;
  falloff?: number;
}

const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(" ");
};

export const TextSplit: FC<TextSplitProps> = ({
  children,
  className,
  topClassName,
  bottomClassName,
  maxMove = 50,
  falloff = 0.3,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const getOffset = (index: number) => {
    if (hoverIndex === null) return 0;
    const distance = Math.abs(index - hoverIndex);
    return Math.max(0, maxMove * (1 - distance * falloff));
  };

  return (
    <span className={cn("text-split-container", className)}>
      {children.split("").map((char, index) => {
        const offset = getOffset(index);
        const displayChar = char === " " ? "\u00A0" : char;

        return (
          <span
            key={`${char}-${index}`}
            className="text-split-char-container"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <motion.span
              initial={false}
              animate={{
                y: `-${offset}%`,
              }}
              transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
              className={cn("text-split-char-top", topClassName)}
            >
              {displayChar}
            </motion.span>

            <motion.span
              initial={false}
              animate={{
                y: `${offset}%`,
              }}
              transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
              className={cn("text-split-char-bottom", bottomClassName)}
            >
              <span className="text-split-char-bottom-inner">{displayChar}</span>
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};
