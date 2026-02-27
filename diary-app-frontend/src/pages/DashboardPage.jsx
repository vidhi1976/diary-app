import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import ShadowButton from "../components/ShadowButton";
import ShadowBox from "../components/ShadowBox";
import diaryIcon from "../assets/diary-icon.png";
import radioClose from "../assets/radio-close.png";
import radioOpen from "../assets/radio-open.png";
import diaryOpen from "../assets/diary-open.png";
import music from "../assets/lofi-music.mp3";
import pageFlip from "../assets/page-flip.mp3";
import Calendar from "react-calendar";
import diarytext from "../assets/diary-text.png";
import coffee from "../assets/coffee.gif";
import habit from "../assets/habit-tracker.png";
import "react-calendar/dist/Calendar.css";

const DashboardPage = () => {
  const { logout, name } = useContext(AuthContext);
const [editingId, setEditingId] = useState(null);
const [editingContent, setEditingContent] = useState("");
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRadioOpen, setIsRadioOpen] = useState(false);
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);
  const [isRadioAnimating, setIsRadioAnimating] = useState(false);
  const [showEntriesView, setShowEntriesView] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const audioRef = useRef(null);
  const isToday = (date) => {
  const today = new Date();
  const d = new Date(date);
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
};
  // 🎵 Toggle Radio
  const toggleRadio = () => {
    if (isRadioOpen) {
      audioRef.current.pause();
      setIsRadioAnimating(false);
    } else {
      audioRef.current.play();
      setIsRadioAnimating(true);
    }
    setIsRadioOpen(!isRadioOpen);
  };

  // 📖 Toggle Diary
  const toggleDiary = () => {
    const pageFlipAudio = new Audio(pageFlip);
    pageFlipAudio.play();

    if (!isDiaryOpen) {
      setIsDiaryOpen(true);
      setTimeout(() => setShowEntriesView(true), 1000);
    } else {
      setIsDiaryOpen(false);
      setTimeout(() => setShowEntriesView(false), 1000);
    }
  };

  // Fetch entries
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

      setEntries([response.data, ...entries]);
      setContent("");

      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    } catch (error) {
      console.error("Could not create entry", error);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await api.delete(`/entries/${id}`);
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error("Could not delete entry", error);
    }
  };

  // 📅 Find entry for selected date
  const selectedEntry = entries.find((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getFullYear() === selectedDate.getFullYear() &&
      entryDate.getMonth() === selectedDate.getMonth() &&
      entryDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div className="max-w-4xl mx-auto sm:p-6 relative ">
      <header className="flex justify-between  items-center  h-24">
        <img src={diarytext} alt="Diary Text" className="w-56 ml-10 top-0 right-0  z-50 " />
        {/* <h1 className="text-5xl font-display text-coffee ml-9">
          Your Diary ✨
        </h1> */}
        
          
        <ShadowButton className="" onClick={logout}>logout :(</ShadowButton>
        
      </header>

      <div className="flex flex-col lg:flex-row gap-4">

        {/* LEFT ICONS */}
        <div className="hidden lg:flex flex-col items-center gap-2 -ml-52 mt-4">
          <div className="lg:w-60 lg:h-44 w-40 h-32 flex items-center justify-center">
            <img
              src={isDiaryOpen ? diaryOpen : diaryIcon}
              alt="Diary Icon"
              onClick={toggleDiary}
              className={`max-w-full max-h-full object-contain cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-3
                 ${isAnimating ? "animate-bounce scale-110 rotate-6" : ""}`}
            />
          </div>

          <img
            src={habit}
            alt="Habit Tracker"
            // onClick={toggleRadio}
            className={`lg:w-36 lg:h-36 cursor-pointer transition-all duration-500 hover:scale-110  hover:-rotate-3
              `}
          />
          <img
            src={isRadioOpen ? radioOpen : radioClose}
            alt="Radio"
            onClick={toggleRadio}
            className={`lg:w-48 lg:h-48 cursor-pointer transition-all duration-500 hover:scale-110 ${
              isRadioAnimating
                ? "animate-float drop-shadow-[0_0_25px_rgba(255,180,80,0.8)]"
                : ""
            }`}
          />

          <audio ref={audioRef} loop>
            <source src={music} type="audio/mpeg" />
          </audio>
        </div>

        {/* 📦 SHADOW BOX */}
        <ShadowBox className=" mt-8 lg:w-[900px] w-[420px] mb-8">

          {!showEntriesView ? (
            <>
              <h2 className="text-2xl font-bold text-coffee mb-4">
                What's on your mind today{" "}
                <span className="text-sunset">{name}</span>?
              </h2>

              <form onSubmit={handleCreateEntry}>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-80 px-4 text-coffee bg-[repeating-linear-gradient(white,white_20px,#d1d5db_25px)] rounded-md focus:outline-none focus:ring-2 focus:ring-sunset"
                  placeholder="Start writing..."
                ></textarea>

                <div className="flex justify-between mt-4">
                  <ShadowButton type="submit">
                    save my day ;)
                  </ShadowButton>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-coffee mb-6">
                {name}'s memories 📅✨
              </h2>

              <div className="flex flex-col lg:flex-row gap-8 ">

                {/* 📅 Calendar */}
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  className="custom-calendar"
                  
                  tileClassName={({ date }) => {
                    const hasEntry = entries.some((entry) => {
                      const entryDate = new Date(entry.date);
                      return (
                        entryDate.getFullYear() === date.getFullYear() &&
                        entryDate.getMonth() === date.getMonth() &&
                        entryDate.getDate() === date.getDate()
                      );
                    });
                    return hasEntry
                      ? "bg-pink-200 rounded-full"
                      : null;
                  }}
                />

                {/* 📖 Entry Display */}
                <div className="flex-1 bg-white rounded-lg p-6 shadow border-l-4 border-sunset">
                  <h3 className="font-bold mb-3">
                    {selectedDate.toDateString()}
                  </h3>

                  {selectedEntry ? (
  <>
    {editingId === selectedEntry._id ? (
      <>
        <textarea
          value={editingContent}
          onChange={(e) => setEditingContent(e.target.value)}
          className="w-full h-40 p-3 border rounded-md mb-3"
        />

        <div className="flex gap-3">
          <ShadowButton
            onClick={async () => {
              const res = await api.put(
                `/entries/${selectedEntry._id}`,
                { content: editingContent }
              );

              setEntries(
                entries.map((e) =>
                  e._id === selectedEntry._id ? res.data : e
                )
              );

              setEditingId(null);
            }}
          >
            Save
          </ShadowButton>

          <ShadowButton onClick={() => setEditingId(null)}>
            Cancel
          </ShadowButton>
        </div>
      </>
    ) : (
      <>
        <div className="max-h-64 overflow-y-auto pr-2 ">
  <p className="whitespace-pre-wrap text-gray-700">
    {selectedEntry.content}
  </p>
</div>

        <div className="flex gap-3 mt-4">
          {isToday(selectedEntry.date) && (
            <ShadowButton
              onClick={() => {
                setEditingId(selectedEntry._id);
                setEditingContent(selectedEntry.content);
              }}
            >
              Edit
            </ShadowButton>
          )}

          <ShadowButton
            onClick={() =>
              handleDeleteEntry(selectedEntry._id)
            }
          >
            Delete
          </ShadowButton>
        </div>
      </>
    )}
  </>
) : (
  <p className="text-coffee">
    No entry for this day 📭
  </p>
)}
                </div>
              </div>
            </>
          )}
        </ShadowBox>
      </div>
    </div>
  );
};

export default DashboardPage;