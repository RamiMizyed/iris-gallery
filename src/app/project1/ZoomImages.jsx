"use client";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

// Import your images
import Picture1 from "../../../public/_MG_8473.jpeg";
import Picture2 from "../../../public/_MG_8570.jpeg";
import Picture3 from "../../../public/IMG_0526.jpeg";
import Picture4 from "../../../public/IMG_0536.jpeg";
// add more imports as needed

export default function ZoomParallax() {
	const container = useRef(null);

	// Scroll progress for the container
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});

	// Define scales for each image with different max scales
	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 2]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	// Array of images + scales
	const pictures = [
		{ src: Picture1, scale: scale4 },
		{ src: Picture2, scale: scale5 },
		{ src: Picture3, scale: scale6 },
		{ src: Picture4, scale: scale8 },
		// add more as needed
	];

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky overflow-hidden top-0 h-screen">
				{pictures.map(({ src, scale }, index) => {
					// Styles for each imageContainer based on index (1-based)
					const imageContainerStyles = {
						1: { top: "0", left: "0", width: "25vw", height: "25vh" },
						2: {
							top: "-30vh",
							left: "5vw",
							width: "35vw",
							height: "30vh",
						},
						3: { top: "-10vh", left: "-25vw", width: "20vw", height: "45vh" },
						4: { top: "0", left: "27.5vw", width: "25vw", height: "25vh" },
						5: { top: "27.5vh", left: "5vw", width: "20vw", height: "25vh" },
						6: {
							top: "27.5vh",
							left: "-22.5vw",
							width: "30vw",
							height: "25vh",
						},
						7: { top: "22.5vh", left: "25vw", width: "15vw", height: "15vh" },
					};

					const style =
						imageContainerStyles[index + 1] || imageContainerStyles[1]; // fallback

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className="absolute inset-0 flex items-center justify-center w-full h-full">
							<div
								className="relative"
								style={{
									position: "relative",
									top: style.top,
									left: style.left,
									width: style.width,
									height: style.height,
								}}>
								<Image
									src={src}
									alt={`image-${index}`}
									fill
									placeholder="blur"
									className="object-cover"
								/>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
