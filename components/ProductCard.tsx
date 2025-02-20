"use client";

import { type Product } from "@/interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
	return (
		<div className="product max-w-[21rem] ">
			<Link href={product.link} className="product flex flex-col px-2">
				<div className="rounded-sm w-full overflow-hidden">
					<Image
						src={product.imgPaths[0]}
						alt={product.name}
						width={1920}
						height={1080}
						className="transition-transform duration-[360ms] max-h-[280px] hover:scale-110 hover:shadow-lg"
					></Image>
				</div>
				<p className="text-left text-xl font-thin">{product.name}</p>
				<p className="text-xl">{product.price}.00TL</p>
			</Link>
		</div>
	);
}
