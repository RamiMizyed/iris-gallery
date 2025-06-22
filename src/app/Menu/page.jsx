import Image from "next/image";
import React from "react";

const page = () => {
	return (
		<div className="w-full h-[calc(100svh-100px)] relative flex flex-col  items-center justify-start gap-10 py-10  px-6 2xl:px-[20%] mx-auto">
			<div className="flex flex-col gap-6">
				<h2>
					Nature captivates and astonishes. We, as society, project the
					disaffection we feel toward our lives and systems onto it. It is
					escape, and delight. Paradoxically, nature is most often experienced
					only in its most controlled, domesticated, and instrumentalized form.
				</h2>
				<h2>
					We —Guillermo, Rita, Cristiano and Iris— arrived at Abadía Retuerta, a
					winery and hotel of the highest prestige. We found gardens and
					canals—strikingly beautiful. Also forests, and a fierce river. As we
					delved into the site's history, we discovered a fissure: an ancient
					belief that questions these very dualities.
				</h2>
				<h2>
					bosque_bosque is an artistic research in which a myth is legally
					activated in a small area of the land that Abadía Retuerta plans to
					reforest. This act formalizes the bond between the spiritual and the
					mundane by granting full rights to the area through a legal contract,
					which also determines its future.
				</h2>
				<h2>
					No thought, sound, body, or human trace is allowed to intervene within
					the square. In the midst of a humanly reforested landscape, another
					forest will emerge—one that remains virgin, mythical, and untouchable.
				</h2>
				<h2>A forest within a forest.</h2>
				<div className="flex flex-col lg:flex-row items-center justify-center w-full gap-6 py-10">
					<div className="rounded-lg w-full h-full">
						<Image
							width={600}
							height={600}
							src={"/legal-space.jpg"}
							alt="Legal"
						/>
					</div>
					<div className="rounded-lg w-full h-full">
						<Image width={600} height={600} src={"/space.jpg"} alt="Legal" />
					</div>
					<div className="rounded-lg w-full h-full">
						<Image
							width={600}
							height={600}
							src={"/bosquebosque13.jpg"}
							alt="Legal"
						/>
					</div>
					<div className="rounded-lg w-full h-full">
						<Image
							width={600}
							height={600}
							src={"/legal-space.jpg"}
							alt="Legal"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
