import { LogupDataInterface } from "@/components/LogupForm";
import mongodbClient from "@/utils/mongodb";

export async function POST(request: Request) {
	try {
		const formData = (await request.json()) as LogupDataInterface;
		if (
			!formData.name ||
			!formData.email ||
			!formData.password ||
			!((formData.addresses?.length || 0) > 0) ||
			!formData.password ||
			!formData.phoneNumber
		) {
			return new Response(
				JSON.stringify("Lütfen tüm boşlukları doldurunuz"),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		const client = await mongodbClient;
		await client.connect();
		const database = client.db("soundwave");
		const users = database.collection("users");

		const checkUser = await users.findOne(
			{ email: formData.email },
			{
				projection: {
					password: 0,
				},
			}
		);

		if (checkUser) {
			return new Response(
				JSON.stringify(
					"Başka bir kullanıcı bu email adresini kullanmakta"
				),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		const insertedDoc = await users.insertOne(formData);
		const user = await users.findOne(
			{ _id: insertedDoc.insertedId },
			{ projection: { password: 0 } }
		);
		return new Response(JSON.stringify(user), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
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
