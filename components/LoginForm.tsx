import { UserContext } from "@/context/UserProvider";
import { useContext, useReducer, useState } from "react";

export interface LoginDataInterface {
	password: string | null;
	email: string | null;
}
type FormLoginActionTypes = keyof LoginDataInterface;

export default function LoginForm() {
	const [formLoginData, loginDispatch] = useReducer(loginReducerFunction, {
		password: null,
		email: null,
	});
	const [error, setError] = useState<string | null>(null);
	const userContext = useContext(UserContext);

	function loginReducerFunction(
		prevLoginData: LoginDataInterface,
		action: { type: FormLoginActionTypes; payload: string }
	) {
		return { ...prevLoginData, [action.type]: action.payload };
	}

	async function loginSubmitHandler(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		try {
			const response = await fetch("/api/giris-yap", {
				method: "POST",
				body: JSON.stringify(formLoginData),
				headers: { "Content-Type": "application/json" },
			});

			if (!response.ok) {
				const errorMsg = await response.json();
				throw new Error(errorMsg);
			}
			const data = await response.json();

			userContext?.dispatch({ type: "setUser", payload: data });
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		}
	}

	return (
		<form onSubmit={loginSubmitHandler}>
			<div className="inputs flex flex-col gap-3 lg:gap-4 px-2 py-2">
				<input
					type="email"
					id="email"
					placeholder="E-posta"
					value={formLoginData.email || ""}
					required
					onChange={(e) =>
						loginDispatch({
							type: "email",
							payload: e.target.value,
						})
					}
					className="border border-gray-200 py-2 px-1 lg:text-xl outline-none w-full"
				/>
				<input
					type="password"
					id="password"
					value={formLoginData.password || ""}
					placeholder="Şifre"
					required
					onChange={(e) =>
						loginDispatch({
							type: "password",
							payload: e.target.value,
						})
					}
					className="border border-gray-200 lg:text-xl py-2 px-1 outline-none w-full"
				/>
				<button
					type="submit"
					className="bg-black text-white hover:bg-white hover:text-black duration-150 border border-black py-2 text-lg"
				>
					Giriş Yap
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
