import nodemailer from "nodemailer";

async function sendEmail(email: string, newPassword: string) {
	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.APP_PASSWORD,
		},
	});

	const mailOptions = {
		from: `Soundwave SKY <www.soundwavesky.com>`,
		to: email,
		subject: `Yeni Şifre Talebi <SoundWave>`,
		text: `Yeni şifreniz: ${newPassword}\n`,
		html: `<p>Yeni şifreniz:${newPassword}</p>`,
	};

	await transporter.sendMail(mailOptions);
}

function generateSecurePassword() {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
	let password = "";
	const randomValues = new Uint8Array(8);
	globalThis.crypto.getRandomValues(randomValues);

	randomValues.forEach((value) => {
		password += chars.charAt(value % chars.length);
	});

	return password;
}

export async function POST(request: Request) {
	try {
		const body: { email: string; _id: string } = await request.json();

		if (!body.email) {
			return new Response(
				JSON.stringify("Include email information in the request."),
				{ status: 400 }
			);
		}
		const newPassword = generateSecurePassword();
		sendEmail(body.email, newPassword);
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/mongodb`,
			{
				method: "POST",
				body: JSON.stringify({ _id: body._id, password: newPassword }),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch /api/mongodb");
		}

		return new Response(
			JSON.stringify("Yeni şifreniz e-postanıza iletilmiştir"),
			{ status: 200 }
		);
	} catch (error) {
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
