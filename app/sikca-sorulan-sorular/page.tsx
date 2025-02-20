import Question from "@/components/Question";

export default function FAQ() {
	const questions = [
		{
			header: "Sipariş verdim, servis talebi oluşturabilir miyim?",
			answer: "Evet, www.Soundwavesky.com adresinden servis talebi oluşturabilir ve yedek parça satın alabilirsiniz.",
		},
		{
			header: "Kurulum veya diğer konularla ilgili nasıl destek alabilirim?",
			answer: "“İletişim” sayfasındaki WhatsApp adresinden bize ulaşabilir ve destek alabilirsiniz.",
		},
		{
			header: "İade için nelere dikkat etmeliyim?",
			answer: "Ürünle birlikte isim, soyisim ve telefon numaranızı eklemelisiniz. Kanatlarda çizik veya hasar varsa iade reddedilebilir.",
		},
		{
			header: "Pervaneleri değiştirirken nelere dikkat etmeliyim?",
			answer: "A ve B pervaneleri farklıdır. Değiştirdiğiniz yedek pervane, drone üzerindeki aynı grup pervaneyle eşleşmelidir. Yanlış montaj durumunda drone havalanamaz ve takla atar.",
		},
	];

	return (
		<section className="faq-section py-24 px-4">
			<div className="faq-contanier">
				<h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">
					Sıkça Sorulan Sorular
				</h2>
				<div className="questions flex flex-col max-w-[42rem] mx-auto  gap-4">
					{questions.map((q, index) => (
						<Question
							key={index}
							header={q.header}
							answer={q.answer}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
