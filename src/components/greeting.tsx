import { useEffect, useState } from "react";

export default function Greeting() {
  const [greeting, setGreeting] = useState("");

  const updateGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good morning");
    } else if (hours < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  };

  useEffect(() => {
    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <h6 className="text-3xl leading-[54px] font-bold">{greeting}</h6>;
}
