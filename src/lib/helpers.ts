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
