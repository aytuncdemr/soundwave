"use client";

import {
	faChevronDown,
	faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Question({
	header,
	answer,
}: {
	header: string;
	answer: string;
}) {
	const [toggle, setToggle] = useState(false);

	return (
		<div className="question mx-auto w-full flex flex-col gap-2 text-gray-700 hover:text-gray-800 duration-150 border border-black">
			<div
				onClick={() => setToggle((prevToggle) => !prevToggle)}
				className="flex cursor-pointer justify-between items-center gap-4 py-3 px-6"
			>
				<h3 className="text-lg xl:text-xl">{header}</h3>
				<FontAwesomeIcon
					className="text-lg xl:text-xl"
					icon={toggle ? faChevronUp : faChevronDown}
				></FontAwesomeIcon>
			</div>

			{toggle && (
				<div className="px-6 pb-4">
					<p className="text-gray-500 text-lg">{answer}</p>
				</div>
			)}
		</div>
	);
}
