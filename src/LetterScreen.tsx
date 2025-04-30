import LetterScreen from "./LetterScreen";
import React, { useState, useRef, useEffect } from "react";
import "./LetterScreen.css";

import catImage from './assets/cat.png'; // adjust the path if needed

const paragraphs = [
  "I was not expecting you nor was my soul searching for anyone, but you showed up as if the moon had whispered my need. Every post that runs through my veins writes love poems about you.",
  "You are not just part of my life, you are the life itself. I’ve known many faces, but yours is etched in a way time can’t fade. You are kindness in silence, laughter tucked behind shy smiles, and strength in the softest form.",
  "I still carry the warmth of our late night talks, the comfort of just knowing you were there. I’m sorry for the moments I let slip away, for not being my best when you needed it. I know I couldn’t express much in the past, but please believe my love for you has always been pure. It still is.",
  "What we promised each other, even in the quietest moments, I’m still committed to that. Every promise I made, I meant it. I gave all my heart to the only person who truly mattered.",
  "I know there's more to our story. I believe one day, when time is right, we'll be us again. If we ever find our way back to each other, I promise we’ll come back stronger with a love so steady, so radiant, it’ll glow with its own light.",
  "I just want to see you in your light, to watch your feminine energy bloom. You deserve to be loved softly, to be pampered like the rare soul you are. I’ll give everything I have to paint something beautiful together with you.",
  "I promise to give all of me to build something rare and real with you, something only we could create. A world where love doesn’t just exist, it breathes in every little moment we share.",
  "I still remember the little moments that stitched our story together: the night we first met, when everything around us faded, and it felt like time paused for us. The first time we held hands, no words were spoken, but in that quiet touch, something deep awakened in me.",
  "I remember sitting on the back of your scooty, feeling like I belonged nowhere else but there. Our late night rides through streets, with the wind brushing past and my heart beating louder than ever.",
  "Our walks in the garden or riverside, the peace in simply being beside you. I used to watch you when you weren’t looking—how you laughed, how your eyes sparkled when you spoke about things you loved. In those quiet, stolen glances, I fell for you again and again.",
  "The simple dinners on Sundays, those tiny food stalls where we shared bhel, ice cream, chana chur laughing over nothing and everything. You always played with your food, smiled with your eyes, and made the ordinary feel magical.",
  "I remember your birthday, the ring I gave you quiet and simple, but carrying everything I couldn’t say out loud.hoping it’d remind you of us every time you wore it. I still remember the way your eyes lit up when you opened it, like I'd just given the moon a mirror.",
"And you... you gifted me a black t-shirt that fit just right, sunscreen because you always noticed my skin more than I did, a glass bowl and a cup, so I’d have something soft, something yours, even during the quietest meals. You turned even the smallest things into reminders of care. And now, every time I wear that shirt or hold that cup, it’s like a whisper from the past finds its way back to me.",
  "And that rose you once gave me, I still have it, pressed gently inside a notebook, your scent still wrapped around its petals. The way you’d look at me when you thought I wasn’t noticing. The gentle way your voice would soften when you said my name.",
  "Your love was my calm, my place of quiet safety. And if there's one thing I miss the most, it’s the way your heart made space for mine. Each of those moments wasn’t just a memory, it was love in its raw, most beautiful form.",
  "I carry them with me still, like bookmarks to the happiest chapters of my life. And no matter how far we’ve drifted, those memories remain warm, untouched by time.",
  "You hold the pen now. The story from here is yours to write. I don't want to feel you any pressure, just a reminder that you meant something truly special to me.",
  "Even from a distance, you still reach me. Like the moon touches the sea, your reflection—your presence—stirs something deep in me.",
  "You may not see it, but I still feel every moment, every memory. I’m not chasing you, just waiting quietly, truly, like I always said I would. My heart’s holding on to what once felt like home.",
  "If there’s even a small window left open, I’ll keep sending pieces of my heart through it. If that door shuts, I’ll understand, but till then…",
  "Even after all this time, these two long, quiet months, my heart knows only one direction, it still beats quietly, steadily, for you.",
  "Even in silence, I’ll be somewhere nearby waiting, hoping, holding on to the small miracles the heart still believes in."
];

const LetterSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fadeIn");
  const [showIntro, setShowIntro] = useState(true);
  const [showVideoPrompt, setShowVideoPrompt] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showCatScreen, setShowCatScreen] = useState(false);
  const [finalScreenStep, setFinalScreenStep] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const finalSongRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleContinue = () => {
    setShowIntro(false);
    if (audioRef.current) {
      audioRef.current.volume = 0.08;
      audioRef.current.play().catch((e) => console.log("Audio play error:", e));
    }
  };

  const handleNext = () => {
    setFadeClass("fadeOut");
    setTimeout(() => {
      if (currentIndex < paragraphs.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setFadeClass("fadeIn");
      } else {
        // After letter ends, show "Rotate your phone" + Play button
        setShowVideoPrompt(true);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
    }, 1000);
  };

  const handlePlayVideo = () => {
    setShowVideoPrompt(false);
    setShowVideoPlayer(true);
  
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = true; // Start muted to satisfy autoplay
        videoRef.current.play()
          .then(() => {
            videoRef.current.muted = false; // Unmute after play starts
          })
          .catch((e) => console.log("Video play error:", e));
      }
    }, 100);
  };
  
  

  const handleVideoEnded = () => {
    setShowVideoPlayer(false);
    setShowFinalMessage(true);
  };

  const handleFinalContinue = () => {
    setShowFinalMessage(false);
    setShowCatScreen(true);
    setFinalScreenStep(0);

    if (finalSongRef.current) {
      finalSongRef.current.pause();
      finalSongRef.current.currentTime = 0;
      finalSongRef.current.volume = 0.25;
      finalSongRef.current.play().catch((e) => console.log("Play error:", e));
    }
  };

  useEffect(() => {
    if (!showCatScreen || finalScreenStep > 5) return;

    const delay = finalScreenStep === 0 ? 3000 : 4000;

    const timer = setTimeout(() => {
      setFinalScreenStep((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [finalScreenStep, showCatScreen]);

  return (
    <div className={`letter-container ${!showIntro && !showFinalMessage && !showVideoPrompt && !showVideoPlayer ? 'show-background' : ''}`}>
      {showIntro ? (
        <div className="intro">
          <p>Read this, not with your mind, but the heart that once smiled with mine</p>
          <p>A letter from the soul, for the one who felt it all</p>
          <button className="continue-btn" onClick={handleContinue}>Continue</button>
        </div>
      ) : showVideoPrompt ? (
        <div className="message-screen">
          <p className="intro-message">Rotate your phone 📱</p>
          <button className="continue-button" onClick={handlePlayVideo}>Play Video</button>
        </div>
      ) : showVideoPlayer ? (
        <div className="video-screen">
     <video
  ref={videoRef}
  src="https://github.com/Hyper468/mp3host/raw/refs/heads/main/Timeline%201%20(1).mp4"
  controls={false}
  muted
  playsInline
  onEnded={handleVideoEnded}
  className="video-player"
/>

        </div>
      ) : showFinalMessage ? (
        <div className="message-screen">
          <p className="intro-message">(rotate you phone vertical)</p>
          <p className="intro-message">In short, I just want to say is…</p>
          <button className="continue-button" onClick={handleFinalContinue}>Continue</button>
        </div>
      ) : showCatScreen ? (
        <div className="final-screen">
          <div className="cat-and-messages">
            {finalScreenStep >= 0 && (
              <img src={catImage} alt="Cat holding flowers" className="final-cat fade-in" />
            )}
            <div className="final-lines">
              {finalScreenStep >= 1 && (
                <p className="final-message fade-in">Can't wait to give you the real ones 🌻❤️.</p>
              )}
              {finalScreenStep >= 2 && (
                <>
                  <p className="final-message fade-in">
                    Even if your heart builds walls so high that the sky forgets your name, I’ll still leave flowers at the gate every day, just in case your soul remembers who stayed when the world moved on.
                  </p>
                  <p className="final-message fade-in">Hope this makes you smile.</p>
                </>
              )}
              {finalScreenStep >= 3 && (
                <p className="final-message fade-in">
                  And by any chance… if you liked it enough to open the window a little more...
                </p>
              )}
              {finalScreenStep >= 4 && (
                <p className="fade-in">
                  <a
                    href="https://instagram.com/anandt540"
                    className="insta-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here
                  </a>
                </p>
              )}
              {finalScreenStep >= 5 && (
                <p className="caption fade-in">(my request is still pending🙇‍♂️😁)</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="letter-content">
          <p className={`letter-paragraph ${fadeClass}`}>{paragraphs[currentIndex]}</p>
          <button className="next-btn" onClick={handleNext}>
            {currentIndex === paragraphs.length - 1 ? "Finish Letter" : "Next"}
          </button>
        </div>
      )}

      {/* Background Music */}
      <audio ref={audioRef} src="https://github.com/Hyper468/mp3host/raw/refs/heads/main/BgMusic.mp3" loop />
      {/* Final Cat Screen Song */}
      <audio ref={finalSongRef} src="https://github.com/Hyper468/mp3host/raw/refs/heads/main/BgSongA.mp3" loop />
    </div>
  );
};

export default LetterSection;
