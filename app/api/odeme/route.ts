//@ts-nocheck;
import { User } from "@/interfaces/interfaces";
import crypto from "crypto";

async function addOrderMongoDB() {}

async function generateOID() {
	return "1234";
}

function generatePaytrToken(
	user_ip: string,
	merchant_oid: string,
	email: string,
	total: number
) {
	const hashSTR = `${
		process.env.MERCHANT_ID
	}${user_ip}${merchant_oid}${email}${total}${"eft"}${"1"}`; //TODO: '0'
	const token = hashSTR + process.env.MERCHANT_SALT;
	const paytr_token = crypto
		.createHmac("sha256", process.env.MERCHANT_KEY as string)
		.update(token)
		.digest("base64");

	return paytr_token;
}

export async function POST(request: Request) {
	try {
		const user = (await request.json()) as User & {
			total: number;
		};

		if (!user) {
			return new Response(
				JSON.stringify("User object has not been sent"),
				{ status: 400 }
			);
		}

		const user_ip = "104.28.244.150";
		// request.headers.get("x-real-ip") || // Try to get IP from x-real-ip header
		// request.headers.get("x-forwarded-for")?.split(",")[0]; // Fallback to x-forwarded-for header

		if (!user_ip) {
			return new Response(
				JSON.stringify("User IP could not be determined"),
				{ status: 500 }
			);
		}
		let basket = JSON.stringify([
			["Örnek Ürün 1", "18.00", 1],
			["Örnek Ürün 2", "33.25", 2],
			["Örnek Ürün 3", "45.42", 1],
		]);
		let user_basket = Buffer.from(basket).toString("base64");

		const merchant_oid = await generateOID();
		const paytr_body = {
			merchant_id: process.env.MERCHANT_ID,
			merchant_key: process.env.MERCHANT_KEY,
			merchant_salt: process.env.MERCHANT_SALT,
			user_ip,
			merchant_oid,
			user_basket,
			email: user.email,
			currency: "TL",
			payment_amount: user.total,
			paytr_token: generatePaytrToken(
				user_ip,
				merchant_oid,
				user.email,
				user.total
			),
			no_installment: 1,
			max_installment: 1,
			user_address: user.addresses[0],
			user_phone: user.phoneNumber,
			merchant_ok_url: "https://www.google.com",
			merchant_fail_url: "https://www.google.com",
			user_name: user.name,
			payment_type: "eft",
			test_mode: "1", //TODO: '0'
		};
		paytr_body.user_ip = "104.28.244.150"; //TODO:
		const formData = new URLSearchParams();
		formData.append("merchant_id", paytr_body.merchant_id as string);
		formData.append("merchant_key", paytr_body.merchant_key as string);
		formData.append("merchant_salt", paytr_body.merchant_salt as string);
		formData.append("email", paytr_body.email);
		formData.append("payment_amount", String(paytr_body.payment_amount));
		formData.append("merchant_oid", paytr_body.merchant_oid);
		formData.append("user_name", paytr_body.user_name);
		formData.append("user_address", paytr_body.user_address);
		formData.append("user_phone", paytr_body.user_phone);
		formData.append("merchant_ok_url", paytr_body.merchant_ok_url);
		formData.append("merchant_fail_url", paytr_body.merchant_fail_url);
		formData.append("user_basket", paytr_body.user_basket);
		formData.append("user_ip", paytr_body.user_ip);
		formData.append("test_mode", paytr_body.test_mode);
		formData.append("no_installment", String(paytr_body.no_installment));
		formData.append("max_installment", String(paytr_body.max_installment));
		formData.append("currency", paytr_body.currency);
		formData.append("paytr_token", paytr_body.paytr_token);
		console.log("Formdata:", formData);
		const response = await fetch(
			"https://www.paytr.com/odeme/api/get-token",
			{
				method: "POST",
				headers: {
					"content-type": "application/x-www-form-urlencoded",
				},
				body: formData.toString(), // Convert URLSearchParams to a string
			}
		);

		const body = await response.json();
		console.log("Body:", body);

		if (!response.ok) {
			throw new Error("PayTR did not accept your request");
		}

		const token = await response.json();
		return new Response(JSON.stringify(token), { status: 200 });
	} catch (error) {
		if (error instanceof String) {
			return new Response(JSON.stringify(error), { status: 500 });
		}
		if (error instanceof Error) {
			return new Response(JSON.stringify(error.message), { status: 400 });
		}
	}
}
