"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ArtisticLoader = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate loading
		const timer = setTimeout(() => setIsLoading(false), 3000); // You can control the duration here
		return () => clearTimeout(timer);
	}, []);

	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}>
					<motion.div
						className="flex flex-col items-center space-y-6"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1, ease: "easeOut" }}>
						{/* Morphing SVG Shape */}

						{/* Flickering Loading Text */}
						<motion.p
							className="text-xl font-semibold"
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{
								repeat: Infinity,
								duration: 1.2,
								ease: "easeInOut",
							}}>
							Loading...
						</motion.p>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ArtisticLoader;
