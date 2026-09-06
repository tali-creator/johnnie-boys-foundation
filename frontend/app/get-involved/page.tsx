import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/animate-in";
import { images } from "@/components/sections/data";

const cards = [
  {
    title: "ENROLL A BOY",
    headline: "Give a young man the support he deserves.",
    description:
      "Our programs provide mentorship, education, and skills training to boys and young men in underserved communities. Enroll a boy today and help him unlock his full potential.",
    buttonText: "ENROLL NOW",
    buttonAlt: "LEARN MORE",
    href: "#",
    image: "enroll-a-boy.jpeg",
    titleColor: "text-[#FFD700]",
    buttonBg: "bg-[#FFD700]",
    buttonTextAlt: "border-[#FFD700] text-[#FFD700]",
  },
  {
    title: "VOLUNTEER",
    headline: "Your expertise can change a life.",
    description:
      "Whether you have a ton of time or just a few hours, there's a way for you to share your expertise and make an impact in the lives of our boys. Don't have a technical background? No problem–all support is valued!",
    buttonText: "BECOME A MENTOR",
    buttonAlt: "FIND OUT MORE",
    href: "#",
    image: "volunteer.png",
    titleColor: "text-[#00E676]",
    buttonBg: "bg-[#00E676]",
    buttonTextAlt: "border-[#00E676] text-[#00E676]",
  },
  {
    title: "PARTNER",
    headline: "Building brighter futures requires collaboration.",
    description:
      "Improving the life outcomes of boys and young men requires thoughtful collaboration across many sectors. If you or your organization would like to team up, let us know and we will get back to you.",
    buttonText: "CONTACT US TODAY",
    buttonAlt: "FIND OUT MORE",
    href: "/contact",
    image: "partner.jpeg",
    titleColor: "text-[#FFD700]",
    buttonBg: "bg-[#FFD700]",
    buttonTextAlt: "border-[#FFD700] text-[#FFD700]",
  },
  {
    title: "DONATE",
    headline: "Your generosity fuels life-changing mentorship.",
    description:
      "When you donate, you help us provide education, mentorship, and skills training to boys who need it most. Every gift matters and creates lasting impact in our communities.",
    buttonText: "DONATE NOW",
    buttonAlt: "EXPLORE WAYS TO GIVE",
    href: "#",
    image: "donate.jpeg",
    titleColor: "text-[#00E676]",
    buttonBg: "bg-[#00E676]",
    buttonTextAlt: "border-[#00E676] text-[#00E676]",
  },
];

export default function GetInvolvedPage() {
  return (
    <section id="get-involved" className="relative">
      <div className="relative flex min-h-screen items-center justify-center bg-primary text-primary-foreground">
        <Image
          src="/get-involve.jpeg"
          alt="Get Involved"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-primary/30" />
        <div className="relative z-10 px-5 text-center">
          <h1 className="text-balance font-serif text-6xl font-bold leading-[.98] tracking-tight sm:text-7xl lg:text-8xl">
            GET INVOLVED
          </h1>
          <div className="mx-auto mt-10 max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-accent">
              WHERE DO YOU PLUG IN?
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/85">
              Whether you&apos;re a student, mentor, professional, tech company,
              or would like to make an impact by donating, there&apos;s a way
              for you to plug in with Johnnie Boy&apos;s Foundation and help
              shape the future of boys and young men in our communities.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-background [clip-path:ellipse(70%_100%_at_50%_100%)]" />
      </div>

      <div className=" py-24 lg:py-32">
        <div className="mx-auto max-w-9xl px-5 lg:px-15">
          <div className="grid gap-8 sm:grid-cols-2">
            {cards.map((card, index) => (
              <AnimateIn key={card.title} delay={index * 150} direction="up">
                <div className="group flex flex-col overflow-hidden rounded-2xl bg-[#111]">
                  <h2
                    className={`py-6 text-center font-serif text-3xl font-bold ${card.titleColor}`}
                  >
                    {card.title}
                  </h2>
                  <div className="relative aspect-7/3 w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col items-center p-8 text-center">
                    <h3 className="font-serif text-xl font-bold text-white">
                      {card.headline}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-gray-400">
                      {card.description}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                      <Link
                        href={card.href}
                        className={`rounded-lg px-6 py-3 text-sm font-bold text-black transition hover:opacity-90 ${card.buttonBg}`}
                      >
                        {card.buttonText}
                      </Link>
                      <Link
                        href={card.href}
                        className={`rounded-lg border px-6 py-3 text-sm font-bold transition hover:bg-white/10 ${card.buttonTextAlt}`}
                      >
                        {card.buttonAlt}
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
