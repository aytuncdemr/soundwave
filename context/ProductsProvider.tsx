"use client";

import { type Product } from "@/interfaces/interfaces";
import { createContext, useEffect, useState } from "react";

export interface ProductsContextInterface {
	droneProducts: Product[] | null;
	additionalProducts: Product[] | null;
}

export const ProductsContext = createContext<ProductsContextInterface | null>(
	null
);

export default function ProductsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [products, setProducts] = useState<ProductsContextInterface | null>(
		null
	);
	useEffect(() => {
		(async function () {
			const response = await fetch("/api/mongodb?collection=products");
			const products = (await response.json()) as [
				ProductsContextInterface
			];
			setProducts(...products);
		})();
	}, []);

	return (
		<ProductsContext.Provider
			value={{
				droneProducts: products?.droneProducts || null,
				additionalProducts: products?.additionalProducts || null,
			}}
		>
			{products ? children : null}
		</ProductsContext.Provider>
	);
}
