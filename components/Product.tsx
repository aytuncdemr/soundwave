"use client";

import { ProductsContext } from "@/context/ProductsProvider";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image, { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "@/components/ProductCard";
import { UserContext } from "@/context/UserProvider";
import { toast } from "react-toastify";
import Link from "next/link";
import randIndexExpect from "@/utils/randIndexExpect";
import { type Product } from "@/interfaces/interfaces";

export default function Product() {
	const products = useContext(ProductsContext);
	const userContext = useContext(UserContext);
	const pathName = usePathname();
	const [amount, setAmount] = useState(0);
	const [product, setProduct] = useState<Product | null>(null);
	const [initialRender, setInitialRender] = useState(true);
	const [randomDroneProductIndex, setRandomDroneProductIndex] = useState<
		number | null
	>(null);
	const [randomAdditionalProductIndex, setRandomAdditionalProductIndex] =
		useState<number | null>(null);
	const [activeImageIndex, setActiveImageIndex] = useState(0);

	useEffect(() => {
		let foundIndex: number | null = null;
		let foundProduct: Product | undefined = products?.droneProducts?.find(
			(product: Product, index: number) => {
				if (product.link === pathName) {
					foundIndex = index;
					return true;
				}
				return false;
			}
		);

		if (!foundProduct) {
			foundProduct = products?.additionalProducts?.find(
				(product: Product, index: number) => {
					if (product.link === pathName) {
						foundIndex = index;
						return true;
					}
					return false;
				}
			);
		}

		if (foundProduct !== undefined) {
			setProduct(foundProduct);
			setRandomDroneProductIndex(
				randIndexExpect(
					0,
					(products?.droneProducts?.length ?? 1) - 1,
					foundIndex !== null ? foundIndex : undefined
				)
			);
			setRandomAdditionalProductIndex(
				randIndexExpect(
					0,
					(products?.additionalProducts?.length ?? 1) - 1,
					foundIndex !== null ? foundIndex : undefined
				)
			);
		}
	}, [products, pathName]);

	function addToBasket() {
		if (!userContext?.user) {
			toast.error(
				<p className="text-center">
					Lütfen önce hesabınıza{" "}
					<Link
						className="underline-offset-4 underline"
						href={"/giris-yap"}
					>
						giriş yapın
					</Link>{" "}
				</p>,
				{ className: "bg-black text-white" }
			);

			return;
		}

		if (product?.stockAmount && amount >= product?.stockAmount) {
			toast.error(
				<p>
					Bu üründen en fazla {product?.stockAmount} kadar sipariş
					verebilirsiniz.
				</p>
			);
			return;
		}
		if (amount > 0 && product) {
			const newItems = [];

			for (let i = 0; i < amount; i++) {
				newItems.push(product);
			}

			userContext?.dispatch({
				type: "bucket",
				payload: [...userContext.user.bucket, ...newItems],
			});
			toast.success("Ürünler sepetinize başarıyla eklendi");
		}
	}

	useEffect(() => {
		if (!initialRender) {
			const timeOutId = setTimeout(() => {
				userContext?.dispatch({ type: "updateUser", payload: "none" });
			}, 1500);
			return () => clearTimeout(timeOutId);
		}
		setInitialRender(false);
	}, [userContext?.user?.bucket]);
	console.log(activeImageIndex);
	return (
		<div className="product-container max-w-[36rem] xl:max-w-[82rem] mx-auto flex flex-col gap-16">
			<div className="flex flex-col items-center xl:items-start xl:flex-row gap-6">
				<div className="max-w-[42rem] xl:w-1/2">
					<Carousel
						autoPlay
						interval={2500}
						infiniteLoop
						showThumbs={false}
						showIndicators={false}
						selectedItem={activeImageIndex}
						statusFormatter={(
							currentIndex: number,
							totalSlides: number
						) => {
							return `${currentIndex} / ${totalSlides}`;
						}}
					>
						{product?.imgPaths.map(
							(imgPath: StaticImageData, index: number) => {
								return (
									<div key={index}>
										<Image
											className="rounded-sm w-full"
											src={imgPath}
											width={1920}
											height={1080}
											alt={product.name + " " + index}
										></Image>
									</div>
								);
							}
						)}
					</Carousel>
					{(product?.imgPaths.length || 0) > 1 && (
						<div className="images-small hover:cursor-pointer hidden xl:grid xl:grid-cols-2 xl:gap-4">
							{product?.imgPaths.map((imgPath, index: number) => {
								return (
									<div
										key={index}
										className="border border-gray-200"
										onClick={() =>
											setActiveImageIndex(index)
										}
									>
										<Image
											src={imgPath}
											width={1920}
											height={1080}
											alt={product.name + " " + index}
										></Image>
									</div>
								);
							})}
						</div>
					)}
				</div>
				<div className="product-info xl:w-1/2">
					<p className="my-2 lg:text-xl xl:text-2xl xl:mb-6">
						Soundwave SKY{" "}
						<span className="text-gray-500">
							<Link
								href={
									product?.category === "Dronelar"
										? "/urunler"
										: "/urunler#additionals"
								}
							>{`/${product?.category}`}</Link>
							{`/${product?.shortName}`}
						</span>
					</p>
					<p className="text-3xl lg:text-4xl xl:text-5xl text-gray-700 mb-2 xl:mb-4">
						{product?.name}
					</p>
					<div className="mb-4 xl:mb-8">
						<p className="text-xl lg:text-2xl xl:text-3xl text-gray-600 font-thin">
							{product?.price}.00 TL{" "}
						</p>
						<p className="text-gray-500 lg:text-lg xl:text-xl">
							Vergiler Dahil
						</p>
						{product?.stockAmount === 0 && (
							<p className="text-red-500 lg:text-lg xl:text-xl">
								Ürünün stoğu tükenmiş
							</p>
						)}
					</div>
					<p className="text-2xl lg:text-3xl  text-gray-600 mb-2">
						Adet
					</p>
					<div className="flex items-center xl:w-64 justify-between mb-4 border">
						<button
							className="flex items-center justify-center border-r  py-4 px-4"
							onClick={() =>
								setAmount((prevState) => prevState + 1)
							}
						>
							<FontAwesomeIcon
								className="lg:text-lg xl:text-xl"
								icon={faPlus}
							></FontAwesomeIcon>
						</button>
						<p className="text-xl lg:text-2xl xl:text-3xl">
							{amount}
						</p>
						<button
							className="flex items-center justify-center border-l py-4 px-4"
							onClick={() =>
								setAmount((prevState) =>
									prevState - 1 > -1 ? prevState - 1 : 0
								)
							}
						>
							<FontAwesomeIcon
								className="lg:text-lg xl:text-xl"
								icon={faMinus}
							></FontAwesomeIcon>
						</button>
					</div>
					<button
						disabled={amount < 1 || product?.stockAmount === 0}
						onClick={addToBasket}
						className={`text-center lg:text-lg xl:text-xl outline-none border border-black cursor-pointer bg-black text-white py-3 md:hover:bg-white md:hover:text-black duration-150  px-8 w-full xl:w-64 ${
							(amount < 1 || product?.stockAmount === 0) &&
							"bg-gray-500 border-none"
						}`}
					>
						Sepete Ekle
					</button>
				</div>
			</div>
			<div className="flex flex-col items-center gap-4">
				<p className="text-3xl lg:text-4xl xl:text-5xl text-center mb-12">
					İlginizi çekebilecek <br /> diğer ürünler
				</p>
				<div className="flex flex-col items-center md:flex-row gap-4">
					{randomAdditionalProductIndex !== null &&
						products?.additionalProducts?.[
							randomAdditionalProductIndex
						] && (
							<ProductCard
								product={
									products?.additionalProducts?.[
										randomAdditionalProductIndex
									]
								}
							></ProductCard>
						)}

					{randomDroneProductIndex !== null &&
						products?.droneProducts?.[randomDroneProductIndex] && (
							<ProductCard
								product={
									products?.droneProducts?.[
										randomDroneProductIndex
									]
								}
							></ProductCard>
						)}
				</div>
			</div>
		</div>
	);
}
