"use client";

import { UserContext } from "@/context/UserProvider";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function MobileNav({
	closeMobileNav,
	logOutHandler,
}: {
	logOutHandler: () => void;
	closeMobileNav: () => void;
}) {
	const pathName = usePathname();
	const userContext = useContext(UserContext);

	return (
		<nav className="mobile-nav md:hidden absolute max-w-[90%] w-[90%] h-full bg-black text-white left-0 top-0 pt-4 pb-6 px-5">
			<div className="mobile-nav-container h-full flex flex-col gap-10">
				<div className="flex items-center justify-between text-2xl">
					<h1>SoundWave</h1>
					<FontAwesomeIcon
						icon={faClose}
						onClick={closeMobileNav}
					></FontAwesomeIcon>
				</div>
				<ul className="flex flex-col gap-8 text-md flex-grow">
					<li>
						<Link
							className={`${pathName === "/" && "text-gray-400"}`}
							href={"/"}
							onClick={closeMobileNav}
						>
							Anasayfa
						</Link>
					</li>
					{!userContext?.user && (
						<li>
							<Link
								className={`${
									pathName === "/giris-yap" && "text-gray-400"
								}`}
								href={"/giris-yap"}
								onClick={closeMobileNav}
							>
								Giriş Yap \ Kayıt Ol
							</Link>
						</li>
					)}

					<li>
						<Link
							className={`${
								pathName === "/urunler" && "text-gray-400"
							}`}
							onClick={closeMobileNav}
							href={"/urunler"}
						>
							Ürünlerimiz
						</Link>
					</li>
					{userContext?.user && (
						<>
							<li>
								<Link
									className={`${
										pathName === "/profil" &&
										"text-gray-400"
									}`}
									onClick={closeMobileNav}
									href={"/profil"}
								>
									Hesabım
								</Link>
							</li>
							<li>
								<Link
									className={`${
										pathName === "/sepetim" &&
										"text-gray-400"
									}`}
									onClick={closeMobileNav}
									href={"/sepetim"}
								>
									Sepetim{" "}
									{`(${userContext.user.bucket.length ?? 0})`}
								</Link>
							</li>
						</>
					)}
					<li>
						<Link
							className={`${
								pathName === "/iletisim" && "text-gray-400"
							}`}
							onClick={closeMobileNav}
							href={"/iletisim"}
						>
							İletişim
						</Link>
					</li>
					{userContext?.user && (
						<li>
							<button onClick={logOutHandler}>
								<p>Çıkış Yap</p>
							</button>
						</li>
					)}

					<li className="mt-auto">
						<p className="text-center">
							2024 Soundwave -{" "}
							<Link
								onClick={closeMobileNav}
								href={"/gizlilik-politikasi"}
							>
								Gizlilik Politikası
							</Link>
						</p>
					</li>
				</ul>
			</div>
		</nav>
	);
}
