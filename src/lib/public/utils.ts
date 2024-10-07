import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateAge = (birthDate: Date) => {
  const diff = Date.now() - birthDate.getTime();
  return new Date(diff).getUTCFullYear() - 1970; // Subtract epoch start year
};
