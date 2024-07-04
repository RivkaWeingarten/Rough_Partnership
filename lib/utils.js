import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNumberCommas(x) {
  // Ensure x is a number before formatting
  if (isNaN(x)) {
    throw new Error("Input is not a valid number");
  }

  // Round the number
  const roundedNumber = Math.round(Number(x));

  // Format the number with commas
  const formattedNumber = roundedNumber
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formattedNumber;
}
export function totalPriceWithDiscount(list, disc, size) {
  const discountMultiplier = Math.abs(disc) / 100;

  const discountedPrice = list * (1 - discountMultiplier);

  const totalPrice = discountedPrice * size;

  // Return the total price
  return totalPrice;
}
