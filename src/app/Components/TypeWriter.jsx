"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TypewriterText = ({ text, speed = 100, className = "" }) => {
	const [displayedText, setDisplayedText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showCursor, setShowCursor] = useState(true);

	useEffect(() => {
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				setDisplayedText((prev) => prev + text[currentIndex]);
				setCurrentIndex((prev) => prev + 1);
			}, speed);

			return () => clearTimeout(timeout);
		}
	}, [currentIndex, text, speed]);

	// Cursor blinking effect
	useEffect(() => {
		const cursorInterval = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 500); // Cursor blink speed

		return () => clearInterval(cursorInterval);
	}, []);

	return (
		<motion.span
			initial={{ opacity: 0, filter: "blur(4px)" }}
			animate={{ opacity: 1, filter: "blur(0px)" }}
			transition={{ duration: 1 }}
			className={className}>
			{displayedText}
			<span
				className={`ml-1 ${
					showCursor ? "opacity-100" : "opacity-0"
				} transition-opacity duration-300`}>
				|
			</span>
		</motion.span>
	);
};

export default TypewriterText;
