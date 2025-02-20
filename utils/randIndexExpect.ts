export default function randIndexExpect(minVal: number, maxVal: number, expect?: number): number {
    if (minVal >= maxVal) {
        throw new Error("minVal must be less than maxVal");
    }

    let rand: number;

    do {
        rand = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    } while (expect !== undefined && rand === expect);

    return rand;
}
