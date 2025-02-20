import { MongoClient, MongoClientOptions } from "mongodb";

const uri: string | undefined = process.env.MONGODB_URI;
if (!uri) {
	throw new Error("Please add your MongoDB URI to .env.local");
}

const options: MongoClientOptions = {};

let client: MongoClient;
let mongodbClient: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
	let clientPromise: Promise<MongoClient> | undefined;
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
	mongodbClient = clientPromise;
} else {
	client = new MongoClient(uri, options);
	mongodbClient = client.connect();
}

export default mongodbClient;
