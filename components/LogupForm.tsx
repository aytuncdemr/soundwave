import { UserContext } from "@/context/UserProvider";
import getDate from "@/utils/getDate";
import { useContext, useReducer, useState } from "react";

export interface LogupDataInterface {
	email: string | null;
	addresses: string[] | null;
	phoneNumber: string | null;
	name: string | null;
	password: string | null;
	bucket: [];
	registeredAt: string;
}

type FormLogupActionTypes = keyof LogupDataInterface;

export default function LogupForm() {
	const [error, setError] = useState<string | null>(null);
	const [formLogupData, logupDispatch] = useReducer(logupReducerFunction, {
		email: null,
		addresses: null,
		phoneNumber: null,
		name: null,
		password: null,
		bucket: [],
		registeredAt: getDate(),
	});
	const userContext = useContext(UserContext);

	function logupReducerFunction(
		prevLogupData: LogupDataInterface,
		action: { type: FormLogupActionTypes; payload: string | string[] }
	) {
		return { ...prevLogupData, [action.type]: action.payload };
	}
	async function logupSubmitHandler(e: React.FormEvent) {
		e.preventDefault();

		setError(null);
		try {
			const response = await fetch("/api/kayit-ol", {
				method: "POST",
				body: JSON.stringify(formLogupData),
				headers: { "Content-Type": "application/json" },
			});
			if (!response.ok) {
				const error = await response.json();
				throw error;
			}
			const userData = await response.json();

			userContext?.dispatch({ type: "setUser", payload: userData });
		} catch (error) {
			setError(error as string);
		}
	}

	return (
		<form onSubmit={logupSubmitHandler}>
			<div className="inputs flex flex-col gap-3 px-2 py-2">
				<input
					type="text"
					id="name"
					placeholder="İsim - Soyisim"
					required
					value={formLogupData.name || ""}
					onChange={(e) =>
						logupDispatch({
							type: "name",
							payload: e.target.value,
						})
					}
					className="border border-gray-200 py-2 px-1 lg:text-xl outline-none w-full"
				/>

				<input
					type="email"
					id="email"
					placeholder="E-posta"
					required
					value={formLogupData.email || ""}
					onChange={(e) =>
						logupDispatch({
							type: "email",
							payload: e.target.value,
						})
					}
					className="border border-gray-200 py-2 px-1 lg:text-xl outline-none w-full"
				/>
				<input
					type="password"
					id="password"
					placeholder="Şifre"
					required
					value={formLogupData.password || ""}
					onChange={(e) =>
						logupDispatch({
							type: "password",
							payload: e.target.value,
						})
					}
					className="border border-gray-200 py-2 px-1 lg:text-xl outline-none w-full"
				/>
				<input
					type="tel"
					id="phoneNumber"
					placeholder="Telefon Numarası"
					required
					value={formLogupData.phoneNumber || ""}
					onChange={(e) => {
						e.target.value = e.target.value.replace(/\D/g, "");
						logupDispatch({
							type: "phoneNumber",
							payload: e.target.value,
						});
					}}
					className="border border-gray-200 py-2 px-1 lg:text-xl outline-none w-full"
				/>
				<textarea
					className="min-h-[200px] border border-gray-200 lg:text-xl py-2 px-1 outline-none w-full"
					placeholder="Adres"
					id="addresses"
					value={formLogupData.addresses || ""}
					onChange={(e) =>
						logupDispatch({
							type: "addresses",
							payload: [e.target.value],
						})
					}
				></textarea>
				<button
					type="submit"
					className="bg-black text-white py-2 text-lg hover:bg-white hover:text-black border border-black duration-150"
				>
					Tamam
				</button>
				{error && (
					<p className="text-red-500 text-center font-bold">
						{error}
					</p>
				)}
				<a href="#kampanyalar" className="text-center underline">
					Kampanyalardan ve Haberlerden faydalanmak için tıklayın
				</a>
			</div>
		</form>
	);
}
