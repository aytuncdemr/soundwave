import { ObjectId } from "mongodb";
import { StaticImageData } from "next/image";

export interface User {
	email: string;
	bucket: Product[];
	_id: ObjectId;
	addresses: string[];
	phoneNumber: string;
	name: string;
	registeredAt: string;
}

export interface Product {
	name: string;
	shortName: string;
	price: number;
	imgPaths: StaticImageData[];
	stockAmount: number;
	link: string;
	bucketAmount?: number;
	category: string;
}
