"use client";

import { createPortal } from "react-dom";
import {
	faArrowRightToBracket,
	faBars,
	faCartShopping,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/context/UserProvider";
import MobileNav from "./MobileNav";

export default function Header() {
	const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
	const pathName = usePathname();
	const router = useRouter();
	const userContext = useContext(UserContext);

	function logOutHandler() {
		closeMobileNav();
		userContext?.dispatch({ type: "logOut", payload: "none" });
		router.push("/");
	}

	function closeMobileNav() {
		setMobileNavOpen(false);
		document.body.style.overflow = "initial";
	}

	function openMobileNav() {
		setMobileNavOpen(true);
		window.scrollTo(0, 0);
		document.body.style.overflow = "hidden";
	}

	return (
		<header className="text-white bg-black py-4 px-4 md:py-8 md:px-4">
			<div className="header-container flex items-center justify-between max-w-[1250px] mx-auto">
				<div className="md:hidden">
					<FontAwesomeIcon
						icon={faBars}
						onClick={openMobileNav}
						className="text-lg"
					></FontAwesomeIcon>
				</div>
				<div className="hidden md:block">
					<nav className="desktop-nav">
						<ul className="flex gap-6 items-center md:text-lg lg:text-xl">
							<li>
								<Link
									className={`${
										pathName === "/" && "text-gray-400"
									} hover:text-gray-400 duration-150`}
									href={"/"}
								>
									Anasayfa
								</Link>
							</li>

							<li>
								<Link
									className={`${
										pathName === "/urunler" &&
										"text-gray-400"
									} hover:text-gray-400 duration-150`}
									href={"/urunler"}
								>
									Ürünlerimiz
								</Link>
							</li>

							<li>
								<Link
									className={`${
										pathName === "/iletisim" &&
										"text-gray-400"
									} hover:text-gray-400 duration-150`}
									href={"/iletisim"}
								>
									İletişim
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				<Link className="text-2xl lg:text-3xl" href={"/"}>
					SoundWave
				</Link>

				<div className="flex items-center gap-3  md:hidden">
					<Link href={userContext?.user ? "/profil" : "/giris-yap"}>
						<FontAwesomeIcon
							icon={
								userContext?.user
									? faUser
									: faArrowRightToBracket
							}
							className="text-lg"
						></FontAwesomeIcon>
					</Link>
					<Link href={"/sepetim"}>
						<FontAwesomeIcon
							icon={faCartShopping}
							className="text-lg"
						></FontAwesomeIcon>
					</Link>
				</div>

				<div className="hidden md:flex items-center gap-6 md:text-lg lg:text-xl">
					<Link
						className={`${
							pathName === "/profil" && "text-gray-400"
						} hover:text-gray-400 duration-150`}
						href={userContext?.user ? "/profil" : "/giris-yap"}
					>
						{userContext?.user ? "Profilim" : "Giriş Yap"}
					</Link>

					<Link
						className={`${
							pathName === "/sepetim" && "text-gray-400"
						} hover:text-gray-400 duration-150`}
						href={"/sepetim"}
					>
						Sepetim
					</Link>

					<Link
						className={`${
							pathName === "/sikca-sorulan-sorular" &&
							"text-gray-400"
						} hover:text-gray-400 duration-150`}
						href={"/sikca-sorulan-sorular"}
					>
						S.S.S
					</Link>
				</div>
			</div>
			{mobileNavOpen &&
				createPortal(
					<MobileNav
						logOutHandler={logOutHandler}
						closeMobileNav={closeMobileNav}
					></MobileNav>,
					document.querySelector("body") as HTMLBodyElement
				)}
		</header>
	);
}
