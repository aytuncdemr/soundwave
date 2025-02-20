"use client";

import { useContext } from "react";
import ProductCard from "@/components/ProductCard";
import { ProductsContext } from "@/context/ProductsProvider";
import { Product } from "@/interfaces/interfaces";

export default function DroneProducts({
	standAlonePage,
}: {
	standAlonePage?: boolean;
}) {
	const products = useContext(ProductsContext);
	return (
		<div
			className={`drone-products-container max-w-[75%] 2xl:max-w-[66%] mx-auto px-6 py-12 ${
				standAlonePage ? "text-black bg-white" : "text-white bg-black"
			}`}
		>
			<h2 className="text-4xl md:text-5xl mb-12  text-center  xl:text-start">
				Drone Modellerimiz
			</h2>

			<div className="drone-products max-w-[96rem] grid grid-cols-1 justify-items-center md:grid-cols-2 xl:grid-cols-4 gap-8">
				{products &&
					products?.droneProducts?.map(
						(product: Product, index: number) => (
							<ProductCard
								key={index}
								product={product}
							></ProductCard>
						)
					)}
			</div>
		</div>
	);
}
