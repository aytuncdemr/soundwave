import Banner from "@/components/Banner";
import DroneProducts from "@/components/DroneProducts";
import AdditionalProdutcs from "@/components/AdditionalProducts";
import ExampleProduct from "@/components/ExampleProduct";
import Why from "@/components/Why";

export default function Home() {
	return (
		<>
			<section className="banner-section">
				<Banner></Banner>
			</section>
			<section className="example-product-section">
				<ExampleProduct></ExampleProduct>
			</section>
			<section className="why-section">
				<Why></Why>
			</section>
			<section className="products-section bg-black" id="products">
				<DroneProducts></DroneProducts>
			</section>
			<section className="additional-products">
				<AdditionalProdutcs></AdditionalProdutcs>
			</section>
		</>
	);
}
