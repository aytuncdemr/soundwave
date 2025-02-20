"use client";

import { UserContext } from "@/context/UserProvider";
import { Product } from "@/interfaces/interfaces";
import groupBucket from "@/utils/groupBucket";
import {
	faMinus,
	faPlus,
	faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function BasketPage() {
	const userContext = useContext(UserContext);
	const [bucketList, setBucketList] = useState<Product[] | null>(null);
	const [initialRender, setInitialRender] = useState(true);
	useEffect(() => {
		if (!userContext?.user?.bucket) {
			return;
		}

		setBucketList(groupBucket(userContext.user.bucket));
	}, [userContext?.user?.bucket]);

	function addItem(bucketElem: Product) {
		const newBucket = JSON.parse(
			JSON.stringify(userContext?.user?.bucket)
		) as Product[];

		const contextElem = newBucket?.find(
			(elem) => elem.name === bucketElem.name
		);

		if (contextElem && newBucket) {
			newBucket.push({ ...bucketElem });

			userContext?.dispatch({
				type: "bucket",
				payload: newBucket,
			});
		}
	}

	function removeItem(bucketElem: Product) {
		const newBucket = JSON.parse(
			JSON.stringify(userContext?.user?.bucket)
		) as Product[];

		const elemIndex = newBucket?.findIndex(
			(elem) => elem.name === bucketElem.name
		);

		if (elemIndex !== -1 && elemIndex !== undefined && newBucket) {
			newBucket.splice(elemIndex, 1);

			userContext?.dispatch({
				type: "bucket",
				payload: newBucket,
			});
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
	}, [userContext,initialRender]);

	return (
		<>
			<section className="basket-section max-w-[72rem] flex items-center justify-center mx-auto px-4 py-12">
				<div className="basket-container flex flex-col gap-4 ">
					{(bucketList?.length || 0) > 0 && (
						<>
							<div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-items-strech gap-4">
							{bucketList?.map((bucketElem, index: number) => (
								<div
									key={index}
									className="bucket-list-item max-w-[32rem]  flex flex-col gap-4 items-center"
								>
									<Link
										href={bucketElem.link}
										className="flex gap-2 items-center"
									>
										<Image
											width={1920}
											height={1080}
											src={bucketElem.imgPaths[0]}
											alt={`${bucketElem.name}-${index}`}
											className="max-w-[75px] lg:max-w-[100px] lg:w-[120px] lg:h-[120px]"
										/>
										<p className="text-sm lg:text-lg text-gray-600">
											{bucketElem.name}
										</p>
									</Link>
									<div className="flex items-center w-full justify-between gap-1">
										<div className="text-center">
											<p className="text-lg">Toplam Fiyat</p>
											<p className="text-lg">
												{bucketElem.price *
													(bucketElem.bucketAmount ||
														0)}
												TL
											</p>
										</div>
										<div className="flex items-center justify-between border">
											<button
												className="flex items-center justify-center border-r py-4 px-4"
												onClick={() =>
													addItem(bucketElem)
												}
											>
												<FontAwesomeIcon
													icon={faPlus}
												/>
											</button>
											<p className="py-4 px-5">
												{bucketElem.bucketAmount}
											</p>
											<button
												className="flex items-center justify-center border-l py-4 px-4"
												onClick={() => {
													removeItem(bucketElem);
												}}
											>
												<FontAwesomeIcon
													icon={faMinus}
												/>
											</button>
										</div>
									</div>
								</div>
							))}
							</div>
							<p className="text-gray-600 text-xl">
								Toplam Fiyat:{" "}
								{bucketList?.reduce(
									(prevValue, currValue) =>
										prevValue +
										currValue.price *
											(currValue.bucketAmount || 0),
									0
								)}
								TL
								<br />
								(Vergiler ve Kargo ücreti dahildir)
							</p>
							<Link
								className="py-2 px-2 max-w-[50%] w-[50%] mt-8 mx-auto border border-black font-bold text-center text-lg rounded-sm duration-150 bg-black text-white md:hover:bg-white md:hover:text-black"
								href={`/odeme?total=${bucketList?.reduce(
									(prevValue, currValue) =>
										prevValue +
										currValue.price *
											(currValue.bucketAmount || 0),
									0 // Initial value for accumulator
								)}`}
							>
								Ödemeye Geç
							</Link>
						</>
					)}

					{bucketList?.length === 0 && (
						<div className="text-center flex flex-col gap-4 py-64">
							<p className="text-xl lg:text-2xl xl:text-4xl">
								Görünüşe göre sepetinizde <br /> herhangi bir
								ürün yok.
							</p>
							<FontAwesomeIcon
								className="text-8xl xl:text-9xl"
								icon={faShoppingBag}
							></FontAwesomeIcon>
							<Link
								href={"/urunler"}
								className="text-2xl xl:text-3xl underline"
							>
								Ürünlerimizi görmek <br /> için tıklayın.
							</Link>
						</div>
					)}

					{!userContext?.user && (
						<div className="text-center flex flex-col gap-4 py-64">
							<p className="text-xl lg:text-2xl xl:text-4xl">
								Görünüşe göre daha <br /> giriş yapmamışsınız
							</p>
							<FontAwesomeIcon
								className="text-8xl xl:text-9xl"
								icon={faShoppingBag}
							></FontAwesomeIcon>
							<Link
								href={"/giris-yap"}
								className="text-2xl xl:text-3xl underline"
							>
								Giriş yapmak veya Kayıt <br /> olmak için
								tıklayın.
							</Link>
						</div>
					)}
				</div>
			</section>
		</>
	);
}
