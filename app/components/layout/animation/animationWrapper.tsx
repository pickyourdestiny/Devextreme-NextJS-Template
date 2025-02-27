import * as motion from "motion/react-client";
import { AnimationProps } from "@/types";

export default function AnimationWrapper(
  props: React.PropsWithChildren<AnimationProps>
) {
  const { children, duration, slideX, slideY } = props;

  return (
    <motion.div
      initial={{ x: slideX ? 30 : 0, y: slideY ? 30 : 0, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration }}
    >
      {children}
    </motion.div>
  );
}
