"use client";

import { Product, type User } from "@/interfaces/interfaces";
import { createContext, useReducer } from "react";

type ActionType = keyof User | "setUser" | "logOut" | "updateUser";
type PayloadType = string | User | Product[];

interface UserContextInterface {
	user: User | null;
	dispatch: React.ActionDispatch<
		[
			action: {
				type: ActionType;
				payload: PayloadType;
			}
		]
	>;
}

export const UserContext = createContext<UserContextInterface | null>(null);

export default function UserProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, dispatch] = useReducer(userReducer, null);
	function userReducer(
		prevUser: User | null,
		action: {
			type: ActionType;
			payload: PayloadType;
		}
	) {
		if (!prevUser || action.type === "setUser") {
			return action.payload as User;
		}
		if (action.type === "addresses") {
			return {
				...prevUser,
				[action.type]: [
					...prevUser.addresses,
					action.payload as string,
				],
			};
		}
		if (action.type === "bucket") {
			return {
				...prevUser,
				[action.type]: [...(action.payload as Product[])],
			};
		}

		if (action.type === "logOut") {
			return null;
		}

		if (action.type === "updateUser") {
			(async function () {
				try {
					await fetch("/api/mongodb", {
						method: "POST",
						body: JSON.stringify({
							...prevUser,
						}),
					});
				} catch (error) {
					console.log("Error user is not updated:", error);
				}
			})();

			return { ...prevUser };
		}

		return { ...prevUser, [action.type]: action.payload };
	}

	return (
		<UserContext.Provider value={{ user, dispatch }}>
			{children}
		</UserContext.Provider>
	);
}
