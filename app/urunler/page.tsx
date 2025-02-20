import AdditionalProdutcs from "@/components/AdditionalProducts";
import DroneProducts from "@/components/DroneProducts";

export default function ProductsPage() {
	return (
		<>
			<section className="drone-products-section">
				<DroneProducts standAlonePage></DroneProducts>
			</section>
			<section className="additional-products " id="additionals">
				<AdditionalProdutcs></AdditionalProdutcs>
			</section>
		</>
	);
}
