"use client";

import Link from "next/link";

export default function NotFound() {
	return (
		<section className="not-found-section flex items-center justify-center max-h-screen h-screen">
			<div className="not-found-container flex flex-col items-center gap-4">
				<h1 className="text-5xl md:text-6xl 2xl:text-7xl font-bold">
					404
				</h1>
				<p className="text-gray-600 text-2xl md:text-2xl 2xl:text-3xl text-center">
					Oops! <br />
					Görünüşe göre böyle bir sayfamız yok.
				</p>
				<Link
					href="/"
					className=" bg-black text-white px-6 py-2 md:px-8 md:py-3 md:text-lg rounded duration-150 hover:bg-gray-800"
				>
					Anasayfaya Dön
				</Link>
			</div>
		</section>
	);
}
