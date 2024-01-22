import { motion } from "framer-motion";

type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
};

const defaultAnimations = {
  hidden: { opacity: 0 },

  visible: { opacity: 1 },
};

export const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
}: AnimatedTextProps) => {
  if (text == "Machien is thinking") {
    // TODO: then only stagger the last full stops;
    text = "...";
  }
  return (
    <Wrapper className={className} key={text}>
      <motion.span
        aria-hidden
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.02 }}
      >
        {text.split("").map((char, index) => (
          <motion.span variants={defaultAnimations} key={`${char}-${index}`}>
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};
