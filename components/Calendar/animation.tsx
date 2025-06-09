import {Variants} from "framer-motion";

export const buttonHover: Variants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
};

export const transition = {
    type: "spring",
    stiffness: 200,
    damping: 20,
};

export const slideFromLeft: Variants = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
};
export const slideFromRight: Variants = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
};