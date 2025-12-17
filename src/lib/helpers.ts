import { format } from "date-fns";
import JPGFileIcon from "@/assets/file-icons/jpg.svg";
import PNGFileIcon from "@/assets/file-icons/png.svg";
import SVGFileIcon from "@/assets/file-icons/svg.svg";
import MP4FileIcon from "@/assets/file-icons/mp4.svg";
import MOVFileIcon from "@/assets/file-icons/mov.svg";

export function formatDatetime(date: string | Date, pattern = "HH:mm dd MMM yyyy") {
  return format(new Date(date), pattern);
}

export function formatDate(date: string | Date, pattern = "dd MMM yyyy") {
  return format(new Date(date), pattern);
}

export const convertToUnix = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};

export const formatCountdown = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0) {
    return `${m} min ${s}s`;
  }
  return `${s}s`;
};

export const ls = {
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Unable to set local storage [${key}]:`, error);
    }
  },

  get(key: string, fallback: string = ""): string {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch (error) {
      console.error(`Unable to get local storage [${key}]:`, error);
      return fallback;
    }
  },

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Unable to remove local storage [${key}]:`, error);
    }
  },

  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  },

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Unable to clear local storage:", error);
    }
  },
};

export const getExtFileIcon = (ext: string) => {
  switch (ext) {
    case "jpg":
      return JPGFileIcon;
    case "png":
      return PNGFileIcon;
    case "svg":
      return SVGFileIcon;
    case "mov":
      return MOVFileIcon;
    case "mp4":
      return MP4FileIcon;
    default:
      return JPGFileIcon;
  }
};
