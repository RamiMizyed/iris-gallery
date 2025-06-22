"use client";
import React from "react";
import Link from "next/link";

const Nav = () => {
	return (
		<nav className="w-full h-[60px] mt-10 flex items-center justify-center px-6 2xl:px-[20%] opacity-0">
			<div className="w-full flex items-center justify-between px-6 bg-gradient-to-bl from-zinc-950 to-stone-950 rounded-lg border-zinc-800 border h-full">
				<ul>
					<li>
						<Link href="/" className="hover:underline">
							Home
						</Link>
					</li>
				</ul>
				<ul className="flex items-center justify-center gap-6">
					<li>
						<Link href="/about" className="hover:underline">
							About
						</Link>
					</li>
					<li>
						<Link href="/projects" className="hover:underline">
							Projects
						</Link>
					</li>
					<li>
						<Link href="/contact" className="hover:underline">
							Contact
						</Link>
					</li>
					<li>
						<Link href="/blog" className="hover:underline">
							Blog
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
