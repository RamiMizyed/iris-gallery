"use client";

import React, { useState } from "react";
import {
	motion,
	AnimatePresence,
	useMotionValue,
	useSpring,
} from "framer-motion";
import { useRouter } from "next/navigation";
import TypewriterText from "./TypeWriter";

const clipPathVariants = {
	initial: {
		clipPath: "circle(0% at 50% 50%)",
		opacity: 0,
	},
	animate: {
		clipPath: "circle(150% at 50% 50%)",
		opacity: 1,
		transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0 },
};

const screenVariants = {
	initial: { opacity: 0, scale: 0.95 },
	animate: { opacity: 1, scale: 1, transition: { duration: 1 } },
	exit: { opacity: 0, scale: 0.95, transition: { duration: 0.8 } },
};

const Landing = () => {
	const [hovered, setHovered] = useState(false);
	const [isExiting, setIsExiting] = useState(false);
	const router = useRouter();

	const cursorX = useMotionValue(0);
	const cursorY = useMotionValue(0);

	const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
	const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

	const handleMouseMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		cursorX.set(e.clientX - rect.left);
		cursorY.set(e.clientY - rect.top);
	};

	const handleClick = () => {
		setIsExiting(true);
		setTimeout(() => {
			router.push("/project1");
		}, 800); // wait for exit animation
	};

	return (
		<AnimatePresence>
			{!isExiting && (
				<motion.div
					initial="initial"
					animate="animate"
					exit="exit"
					variants={screenVariants}
					className="w-full h-[calc(100svh-100px)] relative flex flex-col  items-center justify-center gap-10 py-10  px-6 2xl:px-[20%] mx-auto ">
					{/* Video with Clip Path Intro Animation */}
					<div className="w-full h-full flex items-center justify-center relative">
						<motion.video
							initial="initial"
							animate="animate"
							variants={clipPathVariants}
							onMouseEnter={() => setHovered(true)}
							onMouseLeave={() => setHovered(false)}
							onMouseMove={handleMouseMove}
							onClick={handleClick}
							muted
							autoPlay
							loop
							className="w-full h-[65svh]   object-cover rounded-lg cursor-pointer"
							src="/Video/video-bosque.mov"></motion.video>
						<h1 className="absolute  text-white text-4xl font-bold pointer-events-none">
							<TypewriterText text="the myth" speed={120} />
						</h1>
					</div>

					{/* Card that follows cursor */}
					<AnimatePresence>
						{hovered && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.4 }}
								style={{
									x: springX,
									y: springY,
									translateX: "-50%",
									translateY: "-50%",
								}}
								className="absolute pointer-events-none text-white text-center  p-6 backdrop-blur-2xl bg-gradient-to-br from-black/50 to-zinc-950/40 rounded-lg flex flex-col items-center justify-center">
								<motion.h1
									variants={cardVariants}
									initial="hidden"
									animate="visible"
									transition={{ duration: 0.8, delay: 0.8 }}
									className="text-sm">
									Explore
								</motion.h1>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Always visible title */}
					<div className="w-full h-fit flex items-center justify-start">
						<motion.h2
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.6, duration: 1 }}
							className=" text-white text-start  px-4">
							bosque_bosque
							<br /> Territorio Abadía Retuerta
						</motion.h2>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Landing;
