"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ProductsContext } from "@/context/ProductsProvider";

export default function ExampleProduct() {
	const products = useContext(ProductsContext);
	const product = products?.droneProducts?.find(
		(product) => product.link === "/urunler/soundwave-mini-3"
	);

	if (!product) {
		return null;
	}

	return (
		<div className="example-product-container flex flex-col lg:flex-row lg:gap-8 lg:max-w-[84rem] max-w-[27rem] mx-auto  items-center gap-4 py-12 px-8">
			<div className="flex flex-col gap-6">
				<h2 className="text-3xl lg:text-4xl text-center lg:hidden">
					Yeni {product.shortName}
				</h2>

				<Link href={product?.link}>
					<Image
						src={product?.imgPaths[0]}
						width={1920}
						height={1080}
						alt={product.shortName}
						className="border border-gray-200 rounded-lg lg:max-w-[42rem]"
					></Image>
				</Link>
			</div>

			<div className="flex flex-col gap-2 items-start lg:max-w-[28rem]">
				<h2 className="text-3xl lg:text-5xl hidden lg:block">
					Yeni {product.shortName}
				</h2>
				<p className="text-lg lg:text-xl font-thin lg:mt-4 text-gray-500 px-2">
					Hafif, taşınabilir ve kullanıcı dostu bir drone paketidir.
					Full HD video çekimi, 4 km&apos;ye kadar iletim mesafesi ve 26
					dakikalık uçuş süresi gibi özelliklerle, hem hobi amaçlı hem
					de profesyonel kullanıcılara hitap eder. Fly More Combo
					seti, ek bataryalar, pervaneler ve taşıma çantası gibi
					aksesuarlarla gelir, böylece uçuş deneyiminizi daha uzun
					süre keyifle sürdürebilirsiniz. Kolay kullanım ve güçlü
					performansıyla hem yeni başlayanlar hem de deneyimli drone
					kullanıcıları için idealdir.
				</p>
				<button className="py-3 text-white mt-4 rounded-md px-8 hover:bg-white bg-black md:text-xl font-bold hover:text-black duration-150 border-gray-400 border-2 ">
					<Link href={product.link}>Ürüne git</Link>
				</button>
			</div>
		</div>
	);
}
