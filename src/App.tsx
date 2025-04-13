import { useState, useEffect } from "react";
import "./App.css";
import HeartGame from "./HeartGame";
import PoemScreen from "./PoemScreen";
import LetterScreen from "./LetterScreen";

function App() {
  const [screen, setScreen] = useState<"intro" | "game" | "done" | "poemIntro" | "poem" | "letter">("intro");
  const [startedPoemMusic, setStartedPoemMusic] = useState(false);

  const handleContinue = () => {
    setScreen("game");
  };

  const handleGameEnd = () => {
    setScreen("done");
  };
  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (audio) {
      audio.autoplay = false;
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);
  
  useEffect(() => {
    const container = document.querySelector(".app-container");

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 4 + Math.random() * 3 + "s";
      container?.appendChild(heart);
      setTimeout(() => heart.remove(), 7000);
    };

    const heartInterval = setInterval(createHeart, 800);
    return () => clearInterval(heartInterval);
  }, []);

  return (
    <div className="app-container">
      {/* Hidden audio player */}
      <audio id="bg-music" preload="auto" loop>
        <source
          src="https://github.com/Hyper468/mp3host/raw/refs/heads/main/BgSongN.mp3"
          type="audio/mpeg"
        />
      </audio>
      
      {screen === "intro" && (
        <div className="message-screen">
          <p className="intro-message">
            Hi Chhavi… Kaisi hai? It’s been almost a month since we last spoke.
            I know you said you didn’t want to talk, and maybe I should’ve respected that…
            but I guess when it comes to you, I’m still a little stubborn.
            <br /><br />
            So here I am, just to speak my heart.
            <br />
            I’ve made something for you, something honest, something real.
            <br /><br />
            Been pouring my heart into this for days
            <br />
            I hope it makes you smile.
            <br /><br />
            (🔊 For the full experience, keep your volume up)
          </p>
          <button className="continue-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      )}

      {screen === "game" && <HeartGame onGameEnd={handleGameEnd} />}

      {screen === "done" && (
        <div className="message-screen end-screen">
          <p className="end-message">
            You caught them all.<br />Just like you have mine ❤️
          </p>
          <button className="continue-button" onClick={() => setScreen("poemIntro")}>
            Continue
          </button>
        </div>
      )}

{screen === "poemIntro" && (
  <div className="message-screen">
    <p className="intro-message">
      I wrote something for you… <br />
      Something from the heart.
    </p>
    <button
      className="continue-button"
      onClick={() => {
        // ✅ prevent re-triggering audio
        if (!startedPoemMusic) {
          setStartedPoemMusic(true);

          const audio = document.getElementById("bg-music") as HTMLAudioElement;
          if (audio) {
            audio.volume = 0;
            audio.play().catch((e) => console.log("Audio play error:", e));
            let volume = 0;
            const fadeIn = setInterval(() => {
              if (volume < 0.075) {
                volume += 0.005;
                audio.volume = volume;
              } else {
                clearInterval(fadeIn);
              }
            }, 200);
          }
        }

        setScreen("poem");
      }}
    >
      Continue
    </button>
  </div>
)}

      {screen === "poem" && (
        <PoemScreen
          onPoemEnd={() => {
            const poemAudio = document.getElementById("bg-music") as HTMLAudioElement;
            if (poemAudio) {
              poemAudio.pause();
              poemAudio.currentTime = 0;
            }

        

            setScreen("letter");
          }}
        />
      )}

      {screen === "letter" && <LetterScreen />}
    </div>
  );
}

export default App;
