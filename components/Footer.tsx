"use client";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ThreeDot } from "react-loading-indicators";

export default function Footer() {
	const [email, setEmail] = useState<string | null>(null);
	const [response, setResponse] = useState<string | null>(null);
	const [sending, setSending] = useState<boolean>(false);
	async function allowNotifications(e: FormEvent) {
		e.preventDefault();
		if (email) {
			setResponse(null);
			setEmail(null);
			setSending(true);
			try {
				const response = await fetch("/api/iletisim", {
					method: "POST",
					body: JSON.stringify({
						email,
						name: email,
						phoneNumber: "",
						message: ` ${email} Kampanyalardan haberdar olmak istiyor`,
						isNotificationAllow: true,
					}),
				});
				const message = await response.json();
				if (!response.ok) {
					throw message;
				} else {
					setResponse(message);
				}
			} catch (error) {
				if (error instanceof String) {
					setResponse(error as string);
				}
				if (error instanceof Error) {
					setResponse(error.message);
				}
			} finally {
				setSending(false);
			}
		}
	}

	return (
		<footer className="bg-black pt-10 pb-4 px-4 text-white ">
			<div className="footer-container flex flex-col max-w-[25rem] mx-auto justify-center">
				<h2 className="text-center text-xl md:text-2xl mb-4">
					Kampanyalarımızdan <br /> Haberdar Olun!
				</h2>

				<form
					onSubmit={allowNotifications}
					className="flex items-center px-3  border border-gray-700 py-2 mb-8"
				>
					<input
						onChange={(e) => setEmail(e.target.value)}
						value={email || ""}
						type="email"
						placeholder="E-posta"
						required
						className="flex-1 lg:text-xl border-none bg-black border outline-none"
					/>
					<button
						className="hover:cursor-pointer hover:text-gray-500 duration-150 text-xl"
						type="submit"
					>
						<FontAwesomeIcon
							icon={faChevronRight}
						></FontAwesomeIcon>
					</button>
				</form>
				{sending && (
					<div className="flex justify-center mb-8">
					<ThreeDot color="#fff" size="medium" />,
					</div>
				)}
				{!sending && response && (
					<p className="text-lg text-center lg:text-xl mb-8">
						{response}
					</p>
				)}

				<p id="kampanyalar" className="text-sm text-center">
					@2024 Soundwave -{" "}
					<Link
						className="underline underline-offset-2 decoration-[rgb(177,174,174)]"
						href={"/gizlilik-politikasi"}
					>
						Gizlilik Politikası
					</Link>
					<br />
					Tüm hakları saklıdır.
				</p>
			</div>
		</footer>
	);
}
