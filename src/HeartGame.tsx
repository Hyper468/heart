import React, { useRef, useEffect, useState } from "react";
import "./HeartGame.css";

const HeartGame: React.FC<{ onGameEnd: () => void }> = ({ onGameEnd }) => {
  const basketRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popSoundRef = useRef<HTMLAudioElement>(null); // Using this for the sound

  const [score, setScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  // Function to play the pop sound
  const playPopSound = () => {
    if (popSoundRef.current) {
      popSoundRef.current.currentTime = 0;
      popSoundRef.current.play();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowInstructions(false), 8000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
   
    if (popSoundRef.current) {
      popSoundRef.current.volume = 0.3; 
    }
  }, []);
  useEffect(() => {
    const container = containerRef.current;

    const moveBasket = (e: TouchEvent | MouseEvent) => {
      let x;
      if ("touches" in e) {
        x = e.touches[0].clientX;
      } else {
        x = e.clientX;
      }

      if (basketRef.current && container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = x - containerRect.left;
        const maxLeft = container.offsetWidth - basketRef.current.offsetWidth;

        basketRef.current.style.left = Math.min(
          Math.max(0, relativeX - basketRef.current.offsetWidth / 2),
          maxLeft
        ) + "px";
      }
    };

    const createHeart = () => {
      const heart = document.createElement("img");
      heart.src = "https://i.ibb.co/0RhPLm1q/Pngtree-red-3d-heart-emoji-realistic-7581933.png";
      heart.className = "falling-heart";
      heart.style.left = Math.random() * 90 + "vw";
      heart.style.width = "40px";
      heart.style.position = "absolute";
      heart.style.top = "0px";
      heart.style.zIndex = "5";

      if (container) {
        container.appendChild(heart);

        const fallInterval = setInterval(() => {
          const top = parseInt(heart.style.top || "0", 10);
          heart.style.top = top + 5 + "px";

          if (basketRef.current && heart) {
            const basketRect = basketRef.current.getBoundingClientRect();
            const heartRect = heart.getBoundingClientRect();

            const isCaught =
              heartRect.bottom >= basketRect.top &&
              heartRect.left <= basketRect.right &&
              heartRect.right >= basketRect.left;

            if (isCaught) {
              heart.remove();
              clearInterval(fallInterval);
              setScore((prev) => {
                const newScore = prev + 1;
                if (newScore === 10) {
                  onGameEnd();
                }
                playPopSound(); // Play sound when heart is caught
                return newScore;
              });
            }

            if (top > window.innerHeight) {
              heart.remove();
              clearInterval(fallInterval);
            }
          }
        }, 20);
      }
    };

    const heartInterval = setInterval(createHeart, 800);

    window.addEventListener("mousemove", moveBasket);
    window.addEventListener("touchmove", moveBasket);

    return () => {
      clearInterval(heartInterval);
      window.removeEventListener("mousemove", moveBasket);
      window.removeEventListener("touchmove", moveBasket);
    };
  }, [onGameEnd]);

  return (
    <>
      {/* Instructions */}
      {showInstructions && (
        <div className="game-instructions">
          💖 Move the basket with your finger or mouse to catch the falling hearts!
        </div>
      )}

      <div className="game-container" ref={containerRef}>
        <img
          ref={basketRef}
          src="https://i.ibb.co/rfXyy46T/Pngtree-wicker-four-corners-basket-clip-5805028.png"
          alt="basket"
          className="basket"
        />
        <div className="score">❤️ {score}</div>
      </div>

      {/* Pop sound effect */}
      <audio ref={popSoundRef} src="/assets/sounds/pop.mp3" preload="auto" />
    </>
  );
};

export default HeartGame;
