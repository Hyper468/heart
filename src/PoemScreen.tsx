import { useEffect, useState } from "react";
import "./App.css";

const poemLines = [
  "Your eyes, like galaxies, pull me in,",
  "A universe where I always begin",

  "Your smile, the sunrise I crave each day,",
  "Lighting up shadows in the softest way",

  "Your scent still lingers in every breeze,",
  "A memory that brings me to my knees",

  "Your hair, the night’s most gentle wave,",
  "In its strands, all my love I gave",

  "You’re the rhythm to my silent song,",
  "The place my restless heart belongs",

  "I don’t just miss the love you gave",
  "I miss the heart that gave it so brave",

  "Remember these moments,",
  "like heart’s gentle components",

  "Remember the night when we first met,",
  "Stars above and no regret",

  "Your smile lit up the quiet street,",
  "My heart forgot how not to beat",

  "Take me back to that sacred time,",
  "When your laughter made the silence rhyme",

  "Riding through the city's glow,",
  "On your scooty, hearts in flow",

  "Those Sunday dates, just you and me,",
  "Across the table, wild and free",

  "You played with food, eyes full of light,",
  "That simple joy still feels so right",

  "Our evening walks by river side,",
  "Fingers laced, no need to hide",

  "The garden bloomed beneath your gaze,",
  "Each step with you, a golden phase",

  "That first touch, soft and light,",
  "Still warms my soul in quiet night",

  "Fingers met, no words, no sound,",
  "Yet in that moment, love was found",

  "The rose you gave me, I kept beneath a page,",
  "your scent still lingers, like love that won’t age",

  "Now every memory softly plays,",
  "Like favorite songs on rainy days",

  "I miss the way we used to be,",
  "In love, in peace, just you and me",

  "I regret the silence, the things unsaid,",
  "The dreams we shared, now in my head",

  "But I wait not with chains, not in pain,",
  "But with love, like sunshine after rain",

  "You’re the moon, calm and bright,",
  "I’m the sea that moves at night",

  "Even far, you guide my wave,",
  "In your light, my heart stays brave",

  "You are important like pulse to a heart,",
  "I still carry every promise, every start",

  "If your heart ever finds mine once more,",
  "I’ll be right here, like I was before",

  "You hold the pen, and this page awaits,",
  "To write if this is love’s twist, or fate",

  "If paths align and hearts remain,",
  "We’ll rise again, outshine the pain"
];


interface PoemScreenProps {
  onPoemEnd: () => void;
}

const PoemScreen = ({ onPoemEnd }: { onPoemEnd: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 2;
  
        // Allow the last pair to be shown fully
        if (nextIndex >= poemLines.length) {
          clearInterval(interval);
          setTimeout(() => {
            onPoemEnd();
          }, 5000); // give time to read the final lines
          return prev; // keep showing the last pair
        }
  
        return nextIndex;
      });
    }, 5000); // show new pair every 4 seconds
  
    return () => clearInterval(interval);
  }, [onPoemEnd]);
  
  return (
    <div className="poem-screen">
      <div className="poem-lines fade-in-out">
        <p>{poemLines[currentIndex]}</p>
        <p>{poemLines[currentIndex + 1]}</p>
      </div>
    </div>
  );
};

export default PoemScreen;
