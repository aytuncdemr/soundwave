import { type Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ProductsProvider from "@/context/ProductsProvider";
import UserProvider from "@/context/UserProvider";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify";

config.autoAddCss = false;

export const metadata: Metadata = {
	title: "SoundWave - Gelişmiş Drone Modelleri | Havacılığı Birlikte Yazıyoruz",
	description:
		"SoundWave'in performans, güvenilirlik ve yenilik için tasarlanmış en yeni drone modellerini keşfedin. Şimdi alışveriş yapın ve havada yepyeni bir deneyime ulaşın.",
	keywords:
		"drone satışı, Pervane, Uçak, Kanat, Drone, SoundWave droneları, gelişmiş dronelar,  drone, uçuş, havacılık, drone satın al, hava fotoğrafçılığı droneları, drone aksesuarları",
	metadataBase: new URL("https://www.soundwavesky.com"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "SoundWave - Gelişmiş Drone Satışı",
		description:
			"SoundWave ile drone teknolojisindeki en son yenilikleri keşfedin. Hem hobi meraklıları hem de profesyoneller için profesyonel drone modelleri.",
		url: "https://www.soundwavesky.com",
		images: [
			{
				url: "/banner.jpeg",
				width: 800,
				height: 600,
				alt: "SoundWave Droneları",
			},
		],
		type: "website",
	},
	robots: "index, follow",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="tr-TR">
			<body>
				<ProductsProvider>
					<UserProvider>
						<Header></Header>
						<main className="min-h-screen">{children}</main>
						<Footer></Footer>
					</UserProvider>
				</ProductsProvider>
				<ToastContainer></ToastContainer>
			</body>
		</html>
	);
}
