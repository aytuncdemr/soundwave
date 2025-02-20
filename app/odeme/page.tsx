"use client";

import { UserContext } from "@/context/UserProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function PaymentPage() {
	const userContext = useContext(UserContext);
	const router = useRouter();
	const total = useSearchParams().get("total");
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		if (!userContext?.user || !total) {
			router.push("/");
		}
		(async function () {
			setError(null);

			try {
				const response = await fetch("/api/odeme", {
					method: "POST",
					body: JSON.stringify({
						...userContext?.user,
						total: Number(total),
					}),
				});

				const data = await response.json();
				console.log(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
				if (error instanceof String) {
					setError(error as string);
				}
			}
		})();
	});

	return (
		<section className="pay-section">
			{error && (
				<p className="text-red-500 text-center text-2xl">{error}</p>
			)}
		</section>
	);
}
