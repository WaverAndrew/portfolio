"use client";
import { Award, Book, Code, Lightbulb, Rocket, Trophy } from "lucide-react";

const achievements = [
  { icon: Trophy, text: "Top Developer 2023" },
  { icon: Code, text: "1M+ Lines of Code" },
  { icon: Book, text: "50+ Certifications" },
  { icon: Rocket, text: "100+ Projects Launched" },
  { icon: Award, text: "25 Hackathon Wins" },
  { icon: Lightbulb, text: "10 Patents Filed" },
  { icon: Book, text: "50+ Certifications" },
  { icon: Rocket, text: "100+ Projects Launched" },
  { icon: Award, text: "25 Hackathon Wins" },
  { icon: Lightbulb, text: "10 Patents Filed" },
];

export function AchievementBanner() {
  return (
    <div className="w-full overflow-hidden py-8">
      <div className="flex animate-scroll">
        {[...achievements, ...achievements].map((achievement, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-12 w-32 transition-all duration-300 transform"
            style={
              {
                filter: "blur(var(--blur))",
                opacity: "var(--opacity)",
                transform: "scale(var(--scale))",
                ["--blur" as string]: "0px",
                ["--opacity" as string]: "1",
                ["--scale" as string]: "1",
              } as React.CSSProperties
            }
          >
            <div className="relative">
              <achievement.icon
                className="w-12 h-12 text-black mb-2 transition-all duration-300"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))",
                }}
              />
              <div className="absolute inset-0 bg-black opacity-10 blur-md rounded-full" />
            </div>
            <p className="text-sm text-center font-bold">{achievement.text}</p>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-scroll > div:nth-child(n) {
          --blur: 4px;
          --opacity: 0.5;
          --scale: 0.9;
        }

        .animate-scroll > div:nth-child(3n + 1),
        .animate-scroll > div:nth-child(3n + 2) {
          --blur: 0px;
          --opacity: 1;
          --scale: 1;
        }
      `}</style>
    </div>
  );
}
