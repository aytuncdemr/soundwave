import { Product } from "@/interfaces/interfaces";

export default function groupBucket(bucket: Product[] | null) {
	if (!bucket) {
		return null;
	}

	const groupedBucket: Product[] = [];
	for (let i = 0; i < (bucket.length ?? 0); i++) {
		const elem: Product = bucket[i];

		if (
			!groupedBucket.find(
				(groupedElem) => groupedElem.link === elem?.link
			) &&
			elem
		) {
			elem.bucketAmount = 0;
			groupedBucket.push(elem);
			for (let j = i; j < (bucket.length ?? 0); j++) {
				if (bucket[j].name === elem?.name) {
					++elem.bucketAmount;
				}
			}
		}
	}

	return groupedBucket;
}
