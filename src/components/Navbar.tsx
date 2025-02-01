"use client";
import {
  IconHome,
  IconUser,
  IconClock,
  IconBriefcase,
  IconBrandX,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 100);

      // Determine active section based on scroll position
      const sections = ["home", "about", "timeline", "projects"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationLinks = [
    {
      title: "Home",
      icon: (
        <IconHome
          className={`h-full w-full transition-all duration-300 ${
            activeSection === "home"
              ? "text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              : "text-neutral-500"
          }`}
        />
      ),
      href: "#home",
    },
    {
      title: "About",
      icon: (
        <IconUser
          className={`h-full w-full transition-all duration-300 ${
            activeSection === "about"
              ? "text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              : "text-neutral-500"
          }`}
        />
      ),
      href: "#about",
    },
    {
      title: "Timeline",
      icon: (
        <IconClock
          className={`h-full w-full transition-all duration-300 ${
            activeSection === "timeline"
              ? "text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              : "text-neutral-500"
          }`}
        />
      ),
      href: "#timeline",
    },
    {
      title: "Projects",
      icon: (
        <IconBriefcase
          className={`h-full w-full transition-all duration-300 ${
            activeSection === "projects"
              ? "text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              : "text-neutral-500"
          }`}
        />
      ),
      href: "#projects",
    },
  ];

  const socialLinks = [
    {
      title: "X",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 hover:text-black transition-all duration-300" />
      ),
      href: "https://twitter.com/yourusername",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 hover:text-black transition-all duration-300" />
      ),
      href: "https://instagram.com/yourusername",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 hover:text-black transition-all duration-300" />
      ),
      href: "https://linkedin.com/in/andrea-bonarrigo",
    },
  ];

  return (
    <FloatingDock
      items={navigationLinks}
      socialItems={socialLinks}
      desktopClassName={`fixed transition-all duration-300 ${
        isAtTop ? "top-6" : "bottom-6"
      } left-1/2 -translate-x-1/2`}
      mobileClassName={`fixed transition-all duration-300 ${
        isAtTop ? "top-6" : "bottom-6"
      } left-1/2 -translate-x-1/2`}
    />
  );
}
