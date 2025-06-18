"use client";

import React, { useState } from "react";
import {
	motion,
	AnimatePresence,
	useMotionValue,
	useSpring,
} from "framer-motion";
import { useRouter } from "next/navigation";

const clipPathVariants = {
	hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
	visible: {
		clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
		opacity: 1,
		transition: { duration: 1, ease: "easeInOut" },
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
					className="w-full h-[100svh] relative flex flex-col gap-10 items-center justify-center p-6 max-w-6xl mx-auto ">
					{/* Video with Clip Path Intro Animation */}
					<motion.video
						initial="hidden"
						animate="visible"
						variants={clipPathVariants}
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
						onMouseMove={handleMouseMove}
						onClick={handleClick}
						muted
						autoPlay
						loop
						className="w-full max-w-4xl  object-cover rounded-lg cursor-pointer"
						src="/Video/video-bosque.mov"></motion.video>

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
								className="absolute pointer-events-none text-white text-center w-2/3 h-[50%] p-4 backdrop-blur-2xl bg-gradient-to-br from-white/50 rounded-lg flex flex-col items-center justify-center">
								<motion.h1
									variants={cardVariants}
									initial="hidden"
									animate="visible"
									transition={{ duration: 0.8 }}
									className="text-lg mb-2">
									You are now under a spell
								</motion.h1>

								<motion.h1
									variants={cardVariants}
									initial="hidden"
									animate="visible"
									transition={{ duration: 0.8, delay: 0.8 }}
									className="text-sm">
									Do you want to break the spell? <br /> Then, explore our
									project.
								</motion.h1>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Always visible title */}
					<motion.h1
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 2.2, duration: 1 }}
						className=" text-white text-start text-lg px-4">
						Silence²
						<br /> Territorio Abadía Retuerta <br /> Organismo | año uno
					</motion.h1>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Landing;
