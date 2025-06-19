"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const phrases = [
	"Long before monks ever set foot at Abadía Retuerta, the land was dense with pine and silence. When the Premonstratensian order arrived, they cleared the trees to build, to till, to claim. All fell but one.",
	"It stood alone by the Duero, silent, immense and unyielding. Steel rang hollow against it. Axes splintered. Until it finally fell, at the hands of five monks, who persisted through a week of heavy incessant labour.",
	"They didn’t know—how could they?—that this tree held more than wood and root. It was the last tether of balance, the forest’s final breath. And when they felled it, something older than any of them slipped free: a spell not cast but awakened, spun from severance and silence, from a life taken without honour.",
	"At first, it was just a feeling—an unease in the air, dreams that clung too long. Then came the afflictions: failed crops, strange illnesses, weather that twisted oddly over the abbey and nowhere else. The neighbours thrived. The abbey suffered. Whispers rose: that the land was spellbound. But few dared speak such things of Christian ground.",
	"The monks, desperate, turned to stone and prayer. A great church began to rise, hauled up from the river stone by stone. For a while, fortune returned. Then, on the eve of San Juan, in calm weather, a barge carrying stones downriver from the quarry sank—all cargo was lost. That was the breaking point.",
	"Thus, the monks did what they had sworn never to do: they went to the spot where the last tree had been felled. There, filled with fear and doubt, they cried out, asking what was happening to the Abbey and why misfortune had befallen them. Before their astonished eyes, words appeared, etched into the stones on the ground: the forest the monks had destroyed was enchanted, and all the spirits of the non-humans—now wounded and angry—needed a virgin place to dwell. A pact was made: no human element could ever interfere in the place where that last tree had fallen—a symbol of resistance and sorrow.",
	"The monks obeyed. They left the square untouched. Wild things grew, taller and darker than elsewhere, but never beyond its edges. They ringed the place with the leftover stones, safely surrounded, protected. Slowly, the morose Abbey along with its monks and lands began to heal. It thrived again. Each year, the monks renewed their promise, vowing to uphold peace and respect for nature throughout the area. They told the tale of the tree's last breath through the frescoes and carvings on the church walls and on monastery columns. However, the construction of the church was never completed and it remains to this day—half-done, half-ruin—as a witness of what occurred.",
	"Each San Juan, they would step into the square one by one and make the vow: to protect Abadía Retuerta and its lands. If the vow was broken, the spell returned. Those who trespassed outside of this night were bound to ill-fortune: they would lose control of nature, of their bodies, of their thoughts. Unless they committed themselves to honouring nature's right to non-intervention through sincere actions, their misfortunes would continue and multiply until, the following feast of San Juan, they returned to the square to make this commitment a solemn vow. This tradition carried on for generations. But peace is fragile. During the period in Spain's history known as the Desamortización, the abbey was sold. The sacred land was ploughed by indifferent hands, then sold again to a grain company, which knew not of the warnings. Bankruptcy followed. Then came Novartis, and Abadía Retuerta—who used the land more sparingly. Still, sometimes, someone would step where they should not do. And then the land rebelled: frost in summer, wine turned to vinegar, boiling skies and weeks without rain. Always, only within the Abadía's lands. Local elders remember their grandparents taking part in the San Juan vow. They also told tales of the forest spirits—and of the refuge the monks offered them. Abadía Retuerta and all to follow must now ensure that the rite is kept. Trees alone won’t break the spell. Only memory. Only respectful contemplation. And a promise kept, year after year, to the last spirit of the forest. But... looking at the present and the future to come, it is important to reflect on climate change... Since temperature and weather are changing due to human actions, and the square is being directly affected by this... are we still alive?",
];

const videos = [
	"/Video/MVI_0383.mov",
	"/Video/MVI_0449.mov",
	"/Video/video-bosque.mov",
	"/Video/MVI_0436.mov",
	"/Video/video-riu.mov",
	"/Video/MVI_0523.mov",
	"/Video/MVI_0433.mov",
	"/Video/MVI_0422.mov",
];

export default function Home() {
	const refs = useRef([]);
	const container = useRef(null);
	const videoRefs = useRef([]);

	useEffect(() => {
		gsap.fromTo(
			refs.current,
			{
				opacity: 0.05,
				y: 10,
				filter: "blur(2px)",
			},
			{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				ease: "sine.in",
				stagger: 0.1,
				scrollTrigger: {
					trigger: container.current,
					scrub: 2,
					start: "top 35%",
					end: "bottom 100%",
				},
			}
		);

		videoRefs.current.forEach((video, index) => {
			gsap.fromTo(
				video,
				{
					clipPath: "inset(50% 50% 50% 50%)",
					opacity: 0,
				},
				{
					clipPath: "inset(0% 0% 0% 0%)",
					opacity: 1,
					ease: "power2.out",
					scrollTrigger: {
						trigger: video,
						start: "top 80%",
						end: "bottom 60%",
						scrub: true,
					},
				}
			);
		});
	}, []);

	const splitWords = (phrase) => {
		let body = [];

		phrase.split(" ").forEach((word, i) => {
			const letters = splitLetters(word);

			body.push(
				<p key={word + "_" + i} className="text-[3em] mr-[1.5vw] font-bold m-0">
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
						if (el) refs.current.push(el);
					}}
					className="opacity-20 inline-block"
					style={{ display: "inline-block", opacity: 0 }}>
					{letter}
				</span>
			);
		});

		return letters;
	};

	return (
		<main
			ref={container}
			className="w-full min-h-screen text-[rgb(211,211,211)] relative p-6 2xl:px-[20%]">
			{phrases.map((phrase, index) => (
				<div key={index} className="mb-16">
					<div className="w-full flex flex-wrap z-10 mt-[50px]">
						{splitWords(phrase)}
					</div>
					{index !== phrases.length - 1 && (
						<>
							<div className="w-full flex items-center justify-center">
								<video
									ref={(el) => (videoRefs.current[index] = el)}
									muted
									autoPlay
									loop
									className="md:w-1/2 my-6 lg:my-10 2xl:my-16"
									src={videos[index]}></video>
							</div>
							<div className="w-full h-[1px] bg-zinc-800 mb-6"></div>
						</>
					)}
				</div>
			))}
		</main>
	);
}
