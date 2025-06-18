// components/AnimatedText.jsx
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export default function AnimatedText({ phrase }) {
	let refs = useRef([]);
	const body = useRef(null);
	const container = useRef(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		createAnimation();
	}, []);

	const createAnimation = () => {
		gsap.to(refs.current, {
			scrollTrigger: {
				trigger: container.current,
				scrub: true,
				start: `top`,
				end: `+=${window.innerHeight / 1.5}`,
			},
			opacity: 1,
			ease: "none",
			stagger: 0.1,
		});
	};

	const splitWords = (phrase) => {
		let body = [];
		phrase.split(" ").forEach((word, i) => {
			const letters = splitLetters(word);
			body.push(
				<p
					key={word + "_" + i}
					style={{ display: "inline-block", marginRight: "8px" }}>
					{letters}
				</p>
			);
		});
		return body;
	};

	const splitLetters = (word) => {
		let letters = [];
		word.split("").forEach((letter, i) => {
			letters.push(
				<span
					key={letter + "_" + i}
					ref={(el) => {
						refs.current.push(el);
					}}
					style={{ opacity: 0 }}>
					{letter}
				</span>
			);
		});
		return letters;
	};

	return (
		<main ref={container} style={{ overflow: "hidden" }}>
			<div ref={body} style={{ display: "flex", flexWrap: "wrap" }}>
				{splitWords(phrase)}
			</div>
		</main>
	);
}
