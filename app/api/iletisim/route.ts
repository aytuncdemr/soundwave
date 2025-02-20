import nodemailer from "nodemailer";

export interface FormData {
	name: string | null;
	email: string | null;
	phoneNumber: string | null;
	message: string | null;
	isNotificationAllow: boolean;
}

async function sendEmail(formData: FormData) {
	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.APP_PASSWORD,
		},
	});

	const mailOptions = {
		from: `"${formData.name}" <${formData.email}>`,
		to: process.env.EMAIL,
		subject: `${formData.name}'dan gelen iletişim formu <SoundWave>`,
		text: `Mesaj: ${formData.message}\nE-mail:${formData.email}\nTelefon Numarası: ${formData.phoneNumber}`,
		html: `<p><strong>Mesaj:</strong> ${formData.message}</p>
               <p><strong>Telefon Numarası:</strong> ${formData.phoneNumber}</p>
			   <p><strong>E-mail:</strong> ${formData.email}</p>`,
	};

	await transporter.sendMail(mailOptions);
}

export async function POST(request: Request) {
	try {
		const formData = (await request.json()) as FormData;

		if (
			!formData.isNotificationAllow &&
			(!formData.email ||
				!formData.message ||
				!formData.name ||
				!formData.phoneNumber)
		) {
			return new Response(
				JSON.stringify("Lütfen tüm boşlukları doldurunuz"),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}
		await sendEmail(formData);

		return new Response(
			JSON.stringify(
				`${
					formData.isNotificationAllow ? "Talebiniz" : "Mesajınız"
				} başarıyla gönderilmiştir`
			),
			{ status: 200, headers: { "Content-Type": "application/json" } }
		);
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
