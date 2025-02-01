import Image from "next/image";
import Navbar from "@/components/Navbar";
import Timeline from "@/components/Timeline";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import { Carousel, Card } from "@/components/ui/carousel";
import { timelineItems, projects } from "@/data/content";
import { AchievementBanner } from "@/components/ui/achievements";
import { BuildingButton } from "@/components/ui/BuildingButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-24">
        <main className="space-y-12">
          {/* Hero Section with Photo Collage */}
          <section className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="h-[120px] mb-1 sm:mb-10">
                <TypewriterEffect
                  words={[
                    { text: "Hi," },
                    { text: "I'm" },
                    { text: "Andrea", className: "text-gray-900" },
                    { text: ":)", className: "text-gray-900" },
                  ]}
                  className="text-left !block text-4xl sm:text-4xl md:text-5xl"
                  cursorClassName="bg-gray-900"
                />
              </div>
              <h2 className="text-lg font-medium text-gray-600 mt-4 mb-6">
                Addicted to building | BSc Student @ Bocconi
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                I am a 20 y/o student living in Milan, Italy.
                <br />I have a <strong>burning passion</strong> for startups and
                technology, started coding at 11 and quickly became passionate
                about bringing my ideas to life.
              </p>
              <div className="mt-8 border-t pt-6 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  What Others Say About Me
                </h3>
                <p className="text-lg text-gray-600">
                  That I am{" "}
                  <strong>curious, determined and quite competitive</strong>: I
                  will never back off without having reached my goals.
                </p>
              </div>
            </div>

            {/* Photo Collage Grid */}
            <div id="about" className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px]">
                <div className="row-span-2 relative rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://pub-4515151b6c424acfad425474e1717a02.r2.dev/IMG1%20copy%202.png"
                    alt="Photo w/ Dan"
                    fill
                    className="object-cover object-[center_20%]"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://pub-4515151b6c424acfad425474e1717a02.r2.dev/image.webp"
                    alt="Photo 3"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="row-span-2 relative rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://pub-4515151b6c424acfad425474e1717a02.r2.dev/IMG_8669-2.webp"
                    alt="Marocco"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://pub-4515151b6c424acfad425474e1717a02.r2.dev/IMG_5826-2.webp"
                    alt="Apple Park"
                    fill
                    className="object-cover object-[center_20%]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Achievements
          </h2>
          <AchievementBanner />

          {/* Timeline */}
          <section id="timeline" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Timeline</h2>
            <div className="relative -mx-6 sm:-mx-20">
              <Timeline items={timelineItems} />
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="scroll-mt-20 pb-24">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Projects</h2>
            <div className="relative -mx-6 sm:-mx-12">
              <Carousel
                items={projects.map((project, idx) => (
                  <Card
                    key={idx}
                    card={{
                      ...project,
                      src: project.src,
                      category: project.category || "Project",
                    }}
                    index={idx}
                    layout
                  />
                ))}
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
