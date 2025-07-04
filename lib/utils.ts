import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isVideoFile(src: string): boolean {
  return src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov");
}
