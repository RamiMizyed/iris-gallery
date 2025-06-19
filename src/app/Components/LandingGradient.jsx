"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const LandingGradient = () => {
	const GradientRefOne = useRef(null);
	const GradientRefTwo = useRef(null);
	const GradientRefThree = useRef(null);

	useEffect(() => {
		const handleMouseMove = (e) => {
			const { clientX, clientY } = e;
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;

			// Normalize cursor positions to a range of -1 to 1
			const x = (clientX / windowWidth) * 2 - 1;
			const y = (clientY / windowHeight) * 2 - 1;

			// Animate gradients
			gsap.to(GradientRefOne.current, {
				x: x * 100,
				y: y * 100,
				scale: 1.2 + y * 0.2,
				duration: 0.3,
				ease: "power2.out",
			});

			gsap.to(GradientRefTwo.current, {
				x: x * -80,
				y: y * -80,
				scale: 1 + x * 0.2,
				duration: 0.3,
				ease: "power2.out",
			});

			gsap.to(GradientRefThree.current, {
				x: x * 60,
				y: y * 60,
				scale: 1.1 + x * 0.1,
				duration: 0.3,
				ease: "power2.out",
			});
		};

		// Attach mousemove listener
		window.addEventListener("mousemove", handleMouseMove);

		// Cleanup listener on component unmount
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div className="w-full h-full absolute inset-0 overflow-hidden  opacity-15 -z-50">
			<div className="w-full h-full relative flex items-center justify-center">
				<div
					ref={GradientRefOne}
					id="GradientOne"
					className="w-[100vw] h-[100vh] bg-zinc-700/60 blur-[60px] rounded-[350px] absolute top-0 -z-10"></div>
				<div
					ref={GradientRefTwo}
					id="GradientTwo"
					className="w-[50vw] h-[50vw] bg-zinc-200/50 blur-[60px] rounded-[350px] absolute top-0 -z-10"></div>
				<div
					ref={GradientRefThree}
					id="GradientThree"
					className="w-[50vw] h-[50vw] bg-indigo-950/50 blur-[60px] rounded-[350px] absolute top-0 mix-blend-soft-light -z-10"></div>
			</div>
		</div>
	);
};

export default LandingGradient;
