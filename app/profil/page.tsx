"use client";

import { UserContext } from "@/context/UserProvider";
import { User } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";

export default function ProfilePage() {
	const userContext = useContext(UserContext);
	const [initialUserInfo, setInitialUserInfo] = useState(userContext?.user);
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [newAddress, setNewAddress] = useState<string | null>(null);

	useEffect(() => {
		if (!userContext?.user) {
			router.push("/");
		}
	}, [userContext?.user,router]);

	function submitHandler(e: FormEvent) {
		e.preventDefault();
		setIsEditing(false);
		setNewAddress(null);
		if (newAddress) {
			userContext?.dispatch({
				type: "addresses",
				payload: newAddress,
			});
		}
		userContext?.dispatch({ type: "updateUser", payload: "none" });
		setInitialUserInfo(userContext?.user);
	}

	async function sendPasswordRenew() {
		setError(null);
		setSuccess(null);

		try {
			const response = await fetch("/api/sifre-yenile", {
				method: "POST",
				body: JSON.stringify({
					email: userContext?.user?.email,
					_id: userContext?.user?._id,
				}),
			});
			const data = await response.json();

			if (!response.ok) {
				throw data;
			}
			setSuccess(data);
		} catch (error: unknown) {
			if (error instanceof String) {
				setError(error as string);
			}
		}
	}

	return (
		<>
			<section className="user-info-section py-24 px-2">
				<div className="user-info-container max-w-[42rem] mx-auto">
					<header className="mb-4">
						<h2 className="text-3xl text-center lg:text-4xl">
							Profilim
						</h2>
					</header>

					<form
						onSubmit={submitHandler}
						className="flex flex-col gap-2 py-4 px-4 lg:gap-4"
					>
						<div className="flex flex-col lg:text-lg gap-1 lg:gap-2">
							<label htmlFor="name">İsim - Soyisim</label>
							<input
								className="border py-1 px-1 outline-1 outline-gray-200"
								type="text"
								id="name"
								value={userContext?.user?.name}
								disabled={!isEditing}
								onChange={(e) =>
									userContext?.dispatch({
										type: "name",
										payload: e.target.value,
									})
								}
							/>
						</div>
						<div className="flex flex-col gap-1 lg:text-lg lg:gap-2">
							<label htmlFor="email">E-posta</label>
							<input
								className="border py-1 px-1 outline-1 outline-gray-200"
								type="email"
								id="email"
								value={userContext?.user?.email}
								disabled={true}
								onChange={(e) =>
									userContext?.dispatch({
										type: "email",
										payload: e.target.value,
									})
								}
							/>
						</div>
						<div className="flex flex-col gap-1 lg:text-lg lg:gap-2">
							<label htmlFor="phoneNumber">
								Telefon Numarası
							</label>
							<input
								maxLength={11}
								className="border py-1 px-1 outline-1 outline-gray-200"
								type="text"
								id="phoneNumber"
								value={userContext?.user?.phoneNumber}
								disabled={!isEditing}
								onChange={(e) => {
									e.target.value = e.target.value.replace(
										/\D/g,
										""
									);
									userContext?.dispatch({
										type: "phoneNumber",
										payload: e.target.value,
									});
								}}
							/>
						</div>
						<div className="flex flex-col gap-1 lg:text-lg lg:gap-2">
							<label htmlFor="registeredAt">Üyelik Tarihi</label>
							<input
								className="border py-1 px-1 outline-1 outline-gray-200"
								type="text"
								id="registeredAt"
								value={userContext?.user?.registeredAt}
								disabled
							/>
						</div>
						<div className="flex flex-col gap-2 lg:text-lg lg:gap-3">
							<label htmlFor="address">
								Adreslerim{" "}
								<button
									type="button"
									className={`text-blue-600 underline ${
										isEditing && "text-black no-underline"
									}`}
									onClick={() => {
										setError(null);
										setSuccess(null);
										setIsEditing(true);
									}}
								>
									(Adres Ekle)
								</button>
							</label>
							{userContext?.user?.addresses.map(
								(address, index: number) => {
									return (
										<textarea
											key={index}
											className="border py-1 px-1 outline-1 outline-gray-200"
											id="address"
											value={address}
											disabled
										/>
									);
								}
							)}
						</div>
						{isEditing && (
							<>
								<label htmlFor="address">Yeni Adres Ekle</label>
								<textarea
									className="border w-full min-h-32 py-1 px-1 outline-1 outline-gray-200"
									id="address"
									value={newAddress || ""}
									onChange={(e) => {
										setNewAddress(e.target.value);
									}}
								/>
							</>
						)}

						{!isEditing && (
							<>
								<button
									type="button"
									onClick={sendPasswordRenew}
									className="underline text-md"
								>
									Şifremi Unuttum
								</button>
								{success && (
									<p className="text-green-500 text-center text-md">
										{success}
									</p>
								)}

								{error && (
									<p className="text-red-500 text-md">
										{error}
									</p>
								)}
							</>
						)}
						<button
							type={isEditing ? "submit" : "button"}
							className="py-2 px-2 bg-black max-w-[1/2] w-1/2 mx-auto text-white md:hover:bg-white md:hover:text-black mt-4"
							onClick={(e) => {
								if (!isEditing) {
									e.preventDefault();
									setError(null);
									setSuccess(null);
									setIsEditing(true);
								}
							}}
						>
							{isEditing ? "Kaydet" : "Düzenle"}
						</button>
						{isEditing && (
							<button
								onClick={() => {
									setIsEditing(false);
									setNewAddress(null);
									if (initialUserInfo) {
										userContext?.dispatch({
											type: "setUser",
											payload: initialUserInfo as User,
										});
									}
								}}
								className="py-2 px-2 bg-black max-w-[1/2] w-1/2 mx-auto text-white md:hover:bg-white md:hover:text-black"
								type="button"
							>
								İptal Et
							</button>
						)}
						{!isEditing && (
							<button
								type="button"
								onClick={() => {
									userContext?.dispatch({
										type: "logOut",
										payload: "none",
									});

									router.push("/");
								}}
								className="py-2 rounded-sm border border-black max-w-[1/2] w-1/2 mx-auto bg-black text-white hover:bg-white hover:text-black duration-150"
							>
								Çıkış Yap
							</button>
						)}
					</form>
				</div>
			</section>
		</>
	);
}
