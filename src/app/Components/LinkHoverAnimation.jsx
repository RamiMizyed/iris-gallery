import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;
const WORD_INTERVAL = 3000; // 3 seconds

const LinkHoverAnimated = ({ words, className }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (isHovered) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % words.length);
		}, WORD_INTERVAL);

		return () => clearInterval(interval);
	}, [isHovered, words.length]);

	const currentWord = words[currentIndex];

	return (
		<motion.div
			initial="initial"
			whileHover="hovered"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`${className} uppercase relative block overflow-hidden whitespace-nowrap min-w-[300px] dark:text-white text-black font-semibold`}
			style={{ lineHeight: 1 }}>
			<AnimatePresence mode="wait">
				<motion.div
					key={currentWord}
					initial={{ opacity: 1, y: "210%" }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 1, y: "0%" }}
					transition={{ duration: 0.4, ease: "easeInOut" }}>
					<div>
						{currentWord.split("").map((l, i) => (
							<motion.span
								variants={{
									initial: { y: 0 },
									hovered: { y: "-110%" },
								}}
								transition={{
									duration: DURATION,
									ease: "easeInOut",
									delay: STAGGER * i,
								}}
								className="inline-block"
								key={"top-" + i}>
								{l}
							</motion.span>
						))}
					</div>
					<div className="absolute inset-0 text-[#ff7a18]">
						{currentWord.split("").map((l, i) => (
							<motion.span
								variants={{
									initial: { y: "110%" },
									hovered: { y: 0 },
								}}
								transition={{
									duration: DURATION,
									ease: "easeInOut",
									delay: STAGGER * i,
								}}
								className="inline-block"
								key={"bottom-" + i}>
								{l}
							</motion.span>
						))}
					</div>
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
};

export default LinkHoverAnimated;
