import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import ShadowButton from "../components/ShadowButton";

const DashboardPage = () => {
  const { logout } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState("");

  // Fetch entries when component mounts
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await api.get("/entries");
        setEntries(response.data);
      } catch (error) {
        console.error("Could not fetch entries", error);
      }
    };
    fetchEntries();
  }, []);

  const handleCreateEntry = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/entries", {
        content,
        date: new Date(),
      });
      setEntries([response.data, ...entries]); // Add new entry to the top
      setContent(""); // Clear textarea
    } catch (error) {
      console.error("Could not create entry", error);
    }
  };

  const handleDelete = async (e)=> {
    e.preventDefault();
    
  }

  return (
    // py-2 px-4 bg-amber-950 shadow-md text-white font-bold rounded-md hover:bg-opacity-90 transition-all duration-300
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-display text-coffee">Your Diary ✨</h1>
        <div className="flex flex-wrap">
          <ShadowButton onClick={logout}>
            logout :(
          </ShadowButton>
        </div>
      </header>

      {/* New Entry Form */}
      <div className="bg-peach p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-bold text-coffee mb-4">
          What's on your mind today?
        </h2>
        <form onSubmit={handleCreateEntry}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 p-3 text-coffee bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-sunset"
            placeholder="Start writing..."
          ></textarea>
          <ShadowButton type="submit" className="mt-4">save my day ;)</ShadowButton>
          
        </form>
      </div>

      {/* Display Entries */}
      <div className="space-y-6">
        {entries.map((entry) => (
          <div
            key={entry._id}
            className="bg-white p-6 rounded-xl shadow-md border-l-4 border-sunset"
          >
            
              <div
                className="relative h-96 overflow-y-auto 
                    bg-local bg-[repeating-linear-gradient(white,white_24px,#d1d5db_25px),url('/paper-texture.png')]

                    text-gray-800 font-handwriting p-4 pt-[22px] leading-[25px] w-full rounded-md"
              >
                {/* Optional red margin line */}
                <div className="absolute top-0 left-10 w-[2px] h-full bg-red-400"></div>
                <div className="flex justify-between">
                {/* Date */}
                <p className="text-sm text-coffee font-semibold mb-4 ml-12">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                  <button onClick={handleDelete} className="group relative ml-4">
                    <span className="absolute top-1 left-1 rounded bg-black transition-transform duration-200 group-hover:translate-x-[2px] group-hover:translate-y-[2px] w-full h-full"></span>
                    <span className="relative inline-block rounded border-2 border-black bg-white px-4 py-2 text-base font-bold text-black transition-all duration-200 group-hover:bg-amber-950 group-hover:text-yellow-100">
                        delete X
                    </span>
                </button> 
                </div>
                {/* Content */}
                <p className="text-gray-700 whitespace-pre-wrap ml-12">
                  {entry.content}
                </p>
              </div>
              
            </div>
          
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
