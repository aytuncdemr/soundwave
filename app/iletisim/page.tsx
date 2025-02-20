import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
	return (
		<section className="form-section py-24 px-4 flex items-center justify-center min-h-screen">
			<div className="form-container max-w-[38rem] w-[38rem] mx-auto">
				<header className="mb-8 xl:mb-12">
					<h1 className="text-4xl xl:text-5xl text-center">İletişim</h1>
				</header>

				<ContactForm></ContactForm>
			</div>
		</section>
	);
}
