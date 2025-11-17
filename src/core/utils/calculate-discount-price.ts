export const calculateDiscountPrice = (
    price: number,
    discountPercentage: number,
    fractionDigits?: number
) => {
    const discountPrice = price * (1 - discountPercentage / 100);
    return fractionDigits ? Number(discountPrice.toFixed(fractionDigits)) : discountPrice
}