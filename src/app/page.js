"use client";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState("");
  const [result, setResult] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  async function fetchy() {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${user}`
      );
      const data = await response.json();
      setResult(data);
      if (data.items.length === 0) {
        setShowInfo(true);
        setTimeout(() => setShowInfo(false), 3000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (user.trim() !== "") {
      fetchy();
    }
  }
  console.log(result.items);
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center my-4 gap-4"
      >
        <input
          className="bg-stone-300 border-2 py-1 pl-4"
          type="text"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />
        <button className="px-4 py-1 w-40 bg-zinc-500 hover:bg-zinc-500/85 active:scale-x-110 active:scale-y-90 transition-transform duration-[5ms] shadow-md rounded-md font-semibold text-white border-2 border-white">
          Search
        </button>
      </form>
      {result.items?.length > 0 && (
        <ul className="grid gap-4 w-3/5 mx-auto">
          {result.items.map((item) => (
            <li
              key={item.id}
              className="border-2 border-zinc-400 grid place-items-center p-4 gap-4 bg-blue-950"
            >
              <img
                src={item.avatar_url}
                alt={item.login}
                className="w-full rounded-lg"
              />
              <a
                href={item.html_url}
                className="font-bold text-blue-600 dark:text-blue-500 hover:underline text-xl"
              >
                {item.login}
              </a>
            </li>
          ))}
        </ul>
      )}
      {showInfo && (
        <p className="text-center text-white">
          Something went wrong or no results were found
        </p>
      )}
    </div>
  );
};

export default Home;
