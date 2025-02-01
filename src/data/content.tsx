import React from "react";

type ImageSize = "small" | "medium" | "large";

export const timelineItems: {
  date: string;
  title: string;
  description: string;
  images?: { url: string; size: ImageSize }[];
}[] = [
  {
    date: "2024",
    title: "Eurys - AI Search Engine",
    description:
      "Building an AI-powered search engine for people that transforms natural language queries into relevant profile matches. Learning Next.js and expanding to full-stack development.",
  },
  {
    date: "2021 - 2022",
    title: "Idemos - Web3 Platform",
    description:
      "Built and scaled a Web3 platform serving 20+ international clients with $30k/month revenue. Won startup contest from Banca Intesa. Managed team and product development through multiple pivots.",
  },
  {
    date: "2023 - Present",
    title: "BSc in Economics and Management @ Bocconi University",
    description:
      "BSc in Economics and Management (GPA: 30.1/30). Active member of Bocconi Entrepreneurship Club, Blockchain Association, and Students for Machine Learning.",
    images: [
      {
        url: "https://pub-4515151b6c424acfad425474e1717a02.r2.dev/Bocconi_University_Logo.png",
        size: "large",
      },
    ],
  },
  {
    date: "2019",
    title: "Eaglecam - AI Photo Selection",
    description:
      "Developed a custom neural network at age 15 to automatically select the best photos from videos using TensorFlow, gaining hands-on experience with AI/ML implementation.",
  },
  {
    date: "2018",
    title: "Instascanner - Marketing Tool",
    description:
      "Created an automated tool for influencer discovery and marketing campaign analysis, calculating engagement rates and viral potential.",
  },
  {
    date: "2014",
    title: "First Line of Code",
    description:
      "Started programming with Python at age 11, beginning a journey into technology and entrepreneurship.",
  },
];

export const projects = [
  {
    title: "Eurys",
    category: "AI & Search",
    src: "/eurys.jpg",
    content: (
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-sm leading-relaxed">
          An AI-powered search engine that transforms natural language queries
          into relevant profile matches. Built to revolutionize networking.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {["Next.js", "AI", "Full-stack"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Idemos",
    category: "Web3",
    src: "/idemos.jpg",
    content: (
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-sm leading-relaxed">
          A Web3 platform enabling NFT projects to offer customizable
          experiences. Scaled to $30k/month revenue with 20+ international
          clients.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {["Blockchain", "NFT", "Web3"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Eaglecam",
    category: "AI & Machine Learning",
    src: "/eaglecam.jpg",
    content: (
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-sm leading-relaxed">
          Custom neural network built at age 15 to automatically select the best
          photos from videos using TensorFlow.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {["TensorFlow", "Neural Networks", "Computer Vision"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Instascanner",
    category: "Web Automation",
    src: "/instascanner.jpg",
    content: (
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-sm leading-relaxed">
          Automated tool for discovering Instagram influencers and analyzing
          marketing campaign potential.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {["Python", "Web Automation", "Analytics"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

export const achievements = [
  "Won startup contest from Banca Intesa at age 18",
  "Achieved $30,000+/month revenue from international clients at age 17",
  "Won Hackathon Award at UPenn, USA",
  "8th place in National Math Olympiad (2020)",
  "High School Valedictorian with 100/100 cum laude",
  "Multiple National Semi-finals in Italian, Physics, and Math Olympiads",
];
