"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Users,
  Heart,
} from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { SocialLinks } from "@/components/social-links";

const contactCards = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "johnnieboysfoundation@gmail.com",
    href: "mailto:johnnieboysfoundation@gmail.com",
    description: "We reply within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+234 813 157 6436",
    href: "tel:+2348131576436",
    description: "Mon - Fri, 9am - 5pm WAT",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "Kaduna, Nigeria",
    href: "#map",
    description: "No 3 Mozambique Crescent, Barnawa Shopping Complex",
  },
];

const inquiryTypes = [
  { icon: Heart, label: "Support a Program", value: "program" },
  { icon: Users, label: "Volunteer", value: "volunteer" },
  { icon: MessageCircle, label: "General Inquiry", value: "general" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState("");

  return (
    <section id="contact" className="bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-primary py-24 text-primary-foreground lg:py-32">
        <Image
          src="/hero.jpeg"
          alt="Contact Johnnie Boy's Foundation"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/30 via-primary/70 to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 text-center lg:px-8">
          <AnimateIn direction="up">
            <p className="eyebrow text-accent">Get in Touch</p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-[.98] tracking-tight sm:text-6xl lg:text-8xl">
              Let&apos;s Start a
              <br />
              <span className="text-accent">Conversation</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-primary-foreground/80">
              Have questions, want to volunteer, or interested in partnering with
              us? We&apos;d love to hear from you. Every conversation is a step
              toward changing a life.
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-background [clip-path:ellipse(70%_100%_at_50%_100%)]" />
      </div>

      {/* Contact Cards */}
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <AnimateIn direction="up">
          <div className="text-center">
            <p className="eyebrow">Reach Out</p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              How can we <span className="text-accent">help?</span>
            </h2>
          </div>
        </AnimateIn>
        <AnimateIn delay={200} direction="up">
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contactCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-border bg-card p-8 transition hover:shadow-xl hover:border-accent/30"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 transition group-hover:bg-accent/20">
                  <card.icon className="text-accent" size={24} />
                </div>
                <h3 className="mt-6 font-serif text-xl font-bold">
                  {card.title}
                </h3>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {card.detail}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {card.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent transition group-hover:gap-2">
                  Get in touch <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* Form + Info Section */}
      <div className="bg-primary py-20 text-primary-foreground lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            {/* Left: Info */}
            <AnimateIn direction="up">
              <div className="flex flex-col justify-center">
                <p className="eyebrow text-accent">Send a Message</p>
                <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                  We&apos;re here to support you.
                </h2>
                <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
                  Whether you&apos;re looking to enroll a boy, volunteer your
                  time, explore partnership opportunities, or simply want to learn
                  more about our mission — we&apos;re ready to listen.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15">
                      <Clock className="text-accent" size={18} />
                    </div>
                    <div>
                      <p className="font-bold">Response Time</p>
                      <p className="text-sm text-primary-foreground/70">
                        We aim to respond within 24 hours on business days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15">
                      <MapPin className="text-accent" size={18} />
                    </div>
                    <div>
                      <p className="font-bold">Our Office</p>
                      <p className="text-sm text-primary-foreground/70">
                        No 3 Mozambique Crescent, Barnawa Shopping Complex,
                        Kaduna, Nigeria
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="mb-4 text-sm font-bold uppercase tracking-wider text-primary-foreground/60">
                    Follow Us
                  </p>
                  <SocialLinks />
                </div>
              </div>
            </AnimateIn>

            {/* Right: Form */}
            <AnimateIn delay={200} direction="up">
              {sent ? (
                <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl bg-white/5 p-8 text-center backdrop-blur-sm">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/15">
                    <CheckCircle2 className="text-accent" size={40} />
                  </div>
                  <h3 className="mt-8 font-serif text-3xl font-bold">
                    Message Sent!
                  </h3>
                  <p className="mt-3 max-w-sm text-lg text-primary-foreground/70">
                    Thank you for reaching out. Our team will get back to you
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-accent px-6 py-3 font-bold text-accent transition hover:bg-accent hover:text-accent-foreground"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-5 rounded-3xl bg-white/5 p-6 backdrop-blur-sm sm:p-8"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm font-bold">
                      Full Name
                      <input
                        required
                        placeholder="John Doe"
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 font-normal text-white placeholder-white/40 outline-none transition focus:ring-2 focus:ring-accent"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-bold">
                      Email Address
                      <input
                        required
                        type="email"
                        placeholder="you@example.com"
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 font-normal text-white placeholder-white/40 outline-none transition focus:ring-2 focus:ring-accent"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-2 text-sm font-bold">
                    Phone Number
                    <input
                      type="tel"
                      placeholder="+234 000 000 0000"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 font-normal text-white placeholder-white/40 outline-none transition focus:ring-2 focus:ring-accent"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-bold">
                    I&apos;m interested in...
                    <div className="grid grid-cols-3 gap-3">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setSelectedInquiry(type.value)}
                          className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center text-xs font-bold transition ${
                            selectedInquiry === type.value
                              ? "border-accent bg-accent/15 text-accent"
                              : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                          }`}
                        >
                          <type.icon size={20} />
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-bold">
                    Subject
                    <input
                      required
                      placeholder="How can we help?"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 font-normal text-white placeholder-white/40 outline-none transition focus:ring-2 focus:ring-accent"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-bold">
                    Message
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us more about your inquiry..."
                      className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 font-normal text-white placeholder-white/40 outline-none transition focus:ring-2 focus:ring-accent"
                    />
                  </label>

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-accent-foreground transition hover:bg-accent/90 hover:translate-y-[-2px]"
                  >
                    Send Message <Send size={18} />
                  </button>
                </form>
              )}
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* Map / Location Section */}
      <div id="map" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <AnimateIn direction="up">
          <div className="text-center">
            <p className="eyebrow">Find Us</p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Our <span className="text-accent">Location</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Visit us at our office in Kaduna. We welcome visitors who want to
              learn more about our programs or discuss partnership opportunities.
            </p>
          </div>
        </AnimateIn>
        <AnimateIn delay={200} direction="up">
          <div className="mt-16 overflow-hidden rounded-3xl border border-border">
            <div className="relative aspect-[21/9] w-full bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.8!2d7.43!3d10.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDMxJzEyLjAiTiA3wrAyNSc0OC4wIkU!5e0!3m2!1sen!2sng!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-20 text-primary-foreground lg:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <AnimateIn direction="up">
            <p className="text-accent">Join the Movement</p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Ready to make a <span className="text-accent">difference?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80">
              Every boy deserves a chance to dream. Your support — whether
              through time, resources, or partnership — helps us guide more boys
              toward greatness.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/get-involved"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-accent-foreground transition hover:bg-accent/90 hover:translate-y-[-2px]"
              >
                Get Involved <ArrowRight size={18} />
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-8 py-4 font-bold transition hover:bg-primary-foreground hover:text-primary"
              >
                Learn About Us
              </a>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
