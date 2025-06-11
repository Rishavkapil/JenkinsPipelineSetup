import { parseCookies } from "nookies";
import Cookies from "js-cookie";

export function transformNumber(inputNumber = 0) {
  // Convert the number to a string to avoid scientific notation issues
  const str = String(inputNumber);

  // Check if the number is in exponential format
  if (str.includes("e")) {
    // Convert to a number and truncate it to 8 decimal places without rounding
    const truncatedNumber = Math.floor(Number(inputNumber) * 1e8) / 1e8;
    // Return the number as a string, strip trailing zeros using regex
    return truncatedNumber.toFixed(8).replace(/\.?0+$/, '');
  } else {
    // If it's not in exponential form, truncate it to 8 decimal places without rounding
    const truncatedNumber = Math.floor(inputNumber * 1e8) / 1e8;
    // Return the number as a string, strip trailing zeros using regex
    return truncatedNumber.toFixed(8).replace(/\.?0+$/, '');
  }
}

export function getCookie(name: string): string | undefined {
  if (typeof window === "undefined") {
    // Server-side
    const cookies = parseCookies();
    return cookies[name];
  } else {
    // Client-side
    return Cookies.get(name);
  }
}

// utils/getIsLogin.ts

export function getIsLogin(ctx?: any): string | undefined {
  const cookies = parseCookies(ctx);
  return cookies.token;
}

export const capitalizeFirstWord = (str: string) => {
  if (typeof str !== "string" || str.length === 0) return str;

  // Trim any extra spaces and split the string into words
  const words = str.trim().split(" ");

  // Capitalize the first word and join it with the rest of the string
  if (words.length === 0) return str;

  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();

  return words.join(" ");
};


export function getWithrawStatusText(statusCode: number) {
  const statusMap: Record<number, string> = {
    0: "Pending",
    1: "Unconfirmed",
    2: "Confirmed",
    3: "Declined",
    4: "Failed",
  };
  return statusMap[statusCode] || "N/A";
}