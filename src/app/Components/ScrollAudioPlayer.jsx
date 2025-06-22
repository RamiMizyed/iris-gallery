"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollAudioPlayer = () => {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [buttonVisible, setButtonVisible] = useState(true);
	const [showScrollPrompt, setShowScrollPrompt] = useState(false);
	const buttonRef = useRef(null);
	const promptRef = useRef(null);

	useEffect(() => {
		if (!isPlaying) return;

		const audio = audioRef.current;
		if (!audio) return;

		audio.volume = 0;
		audio.play().catch((err) => console.error("Play error:", err));

		// Animate volume on scroll only after play
		const volumeTween = gsap.to(audio, {
			volume: 1,
			ease: "none",
			scrollTrigger: {
				trigger: document.body,
				start: "top top",
				end: "bottom bottom",
				scrub: true,
			},
		});

		// Show scroll prompt after play button fades
		setShowScrollPrompt(true);
		if (promptRef.current) {
			gsap.fromTo(
				promptRef.current,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 1 }
			);
			// Hide prompt after 3 seconds
			gsap.to(promptRef.current, {
				opacity: 0,
				y: -20,
				delay: 3,
				duration: 1,
				onComplete: () => setShowScrollPrompt(false),
			});
		}

		return () => {
			volumeTween.kill();
			ScrollTrigger.getAll().forEach((st) => st.kill());
		};
	}, [isPlaying]);

	const handlePlayClick = () => {
		setIsPlaying(true);
		// Fade out button
		if (buttonRef.current) {
			gsap.to(buttonRef.current, {
				opacity: 0,
				duration: 1,
				onComplete: () => setButtonVisible(false),
			});
		}
	};

	return (
		<>
			<audio
				ref={audioRef}
				src="/TBA presentation audio .mp3"
				loop
				preload="auto"
			/>

			{buttonVisible && (
				<button
					ref={buttonRef}
					onClick={handlePlayClick}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 text-white text-3xl font-semibold cursor-pointer select-none"
					style={{ opacity: 1 }}
					aria-label="Play audio">
					▶️ Play
				</button>
			)}

			{showScrollPrompt && (
				<div
					ref={promptRef}
					className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-40 bg-black bg-opacity-70 text-white px-6 py-3 rounded-xl text-xl select-none pointer-events-none opacity-45"
					aria-live="polite">
					Please scroll down <span className="animate-bounce">↓</span>
				</div>
			)}
		</>
	);
};

export default ScrollAudioPlayer;
