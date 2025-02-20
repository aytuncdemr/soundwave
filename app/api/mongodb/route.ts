import { User } from "@/interfaces/interfaces";
import mongodbClient from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const collectionName = url.searchParams.get("collection");
	const query = url.searchParams.get("query");
	const options = url.searchParams.get("options");

	if (!collectionName) {
		return new Response(JSON.stringify("Collection name is required"), {
			status: 400,
		});
	}

	const database = (await mongodbClient).db(
		process.env.MONGODB_DB_NAME as string
	);

	const collection = database.collection(collectionName);

	const data = await collection
		.find(
			query ? JSON.parse(query) : {},
			options
				? { ...JSON.parse(options), projection: { password: 0 } } // password will not be sent
				: { projection: { password: 0 } } // password will not be sent
		)
		.toArray();

	if (data) {
		return new Response(JSON.stringify(data), { status: 200 });
	}

	return new Response(JSON.stringify("Beklenmedik bir hata oluştu"), {
		status: 500,
	});
}

export async function POST(request: Request) {
	try {
		const data = (await request.json()) as User;
		if (!data) {
			return new Response("Invalid data", { status: 400 });
		}
		const database = (await mongodbClient).db(
			process.env.MONGODB_DB_NAME as string
		);
		const collection = database.collection("users");
		const { _id, ...updateData } = data;

		const result = await collection.findOneAndUpdate(
			{ _id: new ObjectId(_id) },
			{ $set: updateData },
			{ returnDocument: "after" } // Return updated document
		);
		if (result) {
			return new Response("User updated", { status: 200 });
		} else {
			return new Response("User not found", { status: 404 });
		}
	} catch (error) {
		return new Response(
			JSON.stringify(error instanceof Error ? error.message : error),
			{ status: 500 }
		);
	}
}
