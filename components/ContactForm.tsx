"use client";

import { type FormData } from "@/app/api/iletisim/route";
import { UserContext } from "@/context/UserProvider";
import { useContext, useReducer, useState } from "react";
import { ThreeDot } from "react-loading-indicators";

export default function ContactForm() {
	const userContext = useContext(UserContext);
	const [contactData, dispatch] = useReducer(contactReducer, {
		name: userContext?.user?.name || null,
		email: userContext?.user?.email || null,
		phoneNumber: userContext?.user?.phoneNumber || null,
		message: null,
		isNotificationAllow: false,
	});
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	function contactReducer(
		contactData: FormData,
		action: { type: keyof FormData | "reset"; payload: string }
	) {
		if (action.type === "reset") {
			return {
				name: null,
				email: null,
				phoneNumber: null,
				message: null,
				isNotificationAllow: false,
			};
		}

		return { ...contactData, [action.type]: action.payload };
	}

	async function submitHandler(e: React.FormEvent) {
		e.preventDefault();
		setIsSending(true);
		setSuccess(null);
		setError(null);
		try {
			if (
				contactData.email &&
				contactData.message &&
				contactData.name &&
				contactData.phoneNumber
			) {
				const response = await fetch("/api/iletisim", {
					method: "POST",
					body: JSON.stringify(contactData),
				});
				const message = await response.json();
				if (!response.ok) {
					throw message;
				}
				setError(null);
				setSuccess(message);
			}
		} catch (message: unknown) {
			setError(message as string);
			setSuccess(null);
		} finally {
			setIsSending(false);
			dispatch({ type: "reset", payload: "none" });
		}
	}

	return (
		<form onSubmit={submitHandler} className="flex flex-col gap-2 xl:gap-3">
			<input
				type="text"
				id="name"
				placeholder="İsim"
				required
				value={contactData.name || ""}
				className="border border-gray-200 py-2 px-1 outline-none xl:py-3 xl:px-2 xl:text-xl"
				onChange={(e) =>
					dispatch({ type: "name", payload: e.target.value })
				}
			/>
			<input
				type="email"
				id="email"
				placeholder="E-posta"
				value={contactData.email || ""}
				required
				className="border border-gray-200 py-2 px-1 outline-none xl:py-3 xl:px-2 xl:text-xl"
				onChange={(e) =>
					dispatch({ type: "email", payload: e.target.value })
				}
			/>
			<input
				type="tel"
				id="phoneNumber"
				value={contactData.phoneNumber || ""}
				placeholder="Telefon Numarası"
				required
				className="border border-gray-200 py-2 px-1 outline-none xl:py-3 xl:px-2 xl:text-xl"
				onChange={(e) => {
					e.target.value = e.target.value.replace(/\D/g, "");
					dispatch({
						type: "phoneNumber",
						payload: e.target.value,
					});
				}}
			/>
			<textarea
				id="message"
				value={contactData.message || ""}
				placeholder="Mesajınız"
				required
				className="border border-gray-200 min-h-[250px] xl:min-h-[350px] py-2 px-1 outline-none xl:py-3 xl:px-2 xl:text-xl"
				onChange={(e) =>
					dispatch({ type: "message", payload: e.target.value })
				}
			/>

			<button
				type={isSending ? "button" : "submit"}
				className={`bg-black hover:bg-white hover:text-black duration-150 border border-black text-white py-2 text-lg xl:text-xl ${
					isSending && "bg-gray-800"
				}`}
			>
				Gönder
			</button>
			{isSending && (
				<div className="flex justify-center py-3">
					<ThreeDot color="#000000" size="medium" />
				</div>
			)}
			{success && (
				<p className="font-bold text-xl xl:text-2xl text-center">
					{success}
				</p>
			)}
			{error && (
				<p className="xl:text-2xl font-bold text-xl text-center">
					{error}
				</p>
			)}
		</form>
	);
}
