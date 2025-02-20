import { LoginDataInterface } from "@/components/LoginForm";
import mongodbClient from "@/utils/mongodb";

export async function POST(request: Request) {
	try {
		const formData = (await request.json()) as LoginDataInterface;
		if (!formData.email || !formData.password) {
			return new Response(
				JSON.stringify({ error: "Lütfen tüm boşlukları doldurunuz" }),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		const client = await mongodbClient;

		const database = client.db("soundwave");
		const users = database.collection("users");

		const user = await users.findOne(formData, {
			projection: {
				password: 0,
			},
		});
		if (user) {
			return new Response(JSON.stringify(user), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			return new Response(JSON.stringify("Hatalı e-posta veya şifre"), {
				status: 404,
			});
		}
	} catch (error) {
		return new Response(
			JSON.stringify(error instanceof Error ? error.message : error),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
