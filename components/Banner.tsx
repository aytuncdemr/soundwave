"use client";

export default function Banner() {
	return (
		<div className="banner-container min-h-[46rem] py-12 px-2 flex flex-col justify-center md:justify-normal items-center ">
			<div className="md:mt-auto flex flex-col gap-4">
				<h2 className="text-white text-4xl md:text-5xl md:mb-4 text-center">
					Her Uçuş Yeni <br /> Bir Macera
				</h2>
				<button
					onClick={() => {
						document.getElementById("products")?.scrollIntoView({
							behavior: "smooth",
						});
					}}
					className=" text-white py-2 px-4 hover:bg-white md:text-xl hover:text-black duration-150 border-gray-400 border-2 hover:border-transparent"
				>
					Ürünlere Gözat
				</button>
			</div>
		</div>
	);
}
