import { CheckCircle2, Heart } from "lucide-react";
import Image from "next/image";
import { images } from "./data";
import { AnimateIn } from "@/components/animate-in";

export function Impact() {
  return (
    <section
      id="impact"
      className="bg-primary py-24 text-primary-foreground lg:py-32"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-30px); }
          60% { transform: translateY(-15px); }
        }
        .bounce-circle {
          animation: bounce 2s infinite ease-in-out;
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          bottom: "-30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
        className="bounce-circle"
      >
        
      </div>
      <div className="relative z-10 mx-auto h-auto grid max-w-9xl gap-14 px-5 md:px-15 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <AnimateIn direction="up" >
          <div>
            <p className="eyebrow text-accent">Our mission</p>
            <h2 className="section-title text-primary-foreground">
              Opportunity changes <span className="text-accent">everything.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/75">
              We believe education, mentorship, and practical skills can break
              cycles of poverty and create future leaders who strengthen their
              communities.
            </p>
            <AnimateIn delay={150} direction="up">
              <div className="mt-8 flex items-center gap-3">
                <CheckCircle2 className="text-accent" />
                <span className="font-semibold">A safe place to grow</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <CheckCircle2 className="text-accent" />
                <span className="font-semibold">Tools for independence</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <CheckCircle2 className="text-accent" />
                <span className="font-semibold">Role models for the journey</span>
              </div>
            </AnimateIn>
            
          </div>
          <svg className="mt-10" width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="150" r="150" fill="#ffffff" />
          
        </svg>
        </AnimateIn>
        <AnimateIn delay={200} direction="up">
          <div className="grid sm:grid-cols-2 gap-4 p-5 md:p-20">
            <div className="relative aspect-square w-full">
              <Image
                src={"/mentor.png"}
                alt="Mentor working with boys at computers"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="rounded-3xl object-cover"
              />
            </div>
            <div className="flex aspect-square flex-col justify-center items-center space-y-30 rounded-3xl bg-primary-foreground/20 p-6 text-accent-foreground">
              <h3 className="text-3xl font-bold text-accent">
                Why It Matters:
              </h3>
              <p className="font-serif font-bold text-primary-foreground/75">
                Every boy deserves a future filled with opportunity. Through
                Little Men, Big Dreams, we are breaking the cycle of poverty,
                empowering boys to dream without limits and helping them become
                future leaders who can create positive change in their
                communities.
              </p>
            </div>
            <div className="relative aspect-square w-full">
              <Image
                src={images.skills}
                alt="Skills training program poster"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="rounded-3xl object-cover"
              />
            </div>
            <div className="flex aspect-square flex-col justify-end rounded-3xl bg-primary-foreground/20 p-6 text-accent-foreground">
              <Heart className="mb-auto" color="#00C4C5" fill="#00C4C5" />
              <p className="font-serif text-3xl text-accent font-bold">
                Your support makes room for possibility.
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
