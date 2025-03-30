"use client";

import { useContext } from "react";
import ProductCard from "@/components/ProductCard";
import { ProductsContext } from "@/context/ProductsProvider";
import { type Product } from "@/interfaces/Product";

export default function AdditionalProdutcs() {
	const products = useContext(ProductsContext);
	return (
		<div className="additional-products-container max-w-[75%] 2xl:max-w-[66%] mx-auto  text-black px-6 py-12">
			<h2 className="text-4xl md:text-5xl mb-12  text-center  xl:text-start">
				Yedek Parçalar ({products?.additionalProducts.length}) 
			</h2>

			<div className="additional-products  grid grid-cols-1 justify-items-center md:grid-cols-2 xl:grid-cols-4 gap-8">
				{products &&
					products?.additionalProducts?.map(
						(product: Product) => (
							<ProductCard
								key={product.shortName}
								product={product}
							></ProductCard>
						)
					)}
			</div>
		</div>
	);
}
