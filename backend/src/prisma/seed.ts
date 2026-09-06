import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Admin ────────────────────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || "admin@johnnieboysfoundation.org";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-this-password";

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashPassword(adminPassword),
      name: "Super Admin",
      role: "admin",
    },
  });
  console.log("✅ Admin seeded");

  // ─── Programs ─────────────────────────────────────────────────────────────
  const programs = [
    {
      slug: "mentorship",
      title: "Mentorship",
      description:
        "Trusted role models who listen, guide, and help young men build confidence and purpose.",
      badge: "Featured",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1.jpg-KXpR71EOenqAMQ1C3G0IcaQikVpJER.jpeg",
      fullCopy:
        "Our mentorship program pairs boys and young men with experienced mentors who provide guidance, support, and encouragement. Through one-on-one relationships, our mentors help young people navigate challenges, set goals, and develop the confidence they need to succeed in life.",
      order: 1,
    },
    {
      slug: "education-support",
      title: "Education Support",
      description:
        "Educational resources and assistance offered to help boys excel in their studies.",
      badge: "Core Program",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boy%203.jpg-upchMBkkSTDh5WktvtbBrkJi0x97Qd.jpeg",
      fullCopy:
        "We provide learning materials, scholarships, tutoring, and school support to ensure every boy has access to quality education. Our programs help students stay in school, build academic skills, and discover their potential through structured educational opportunities.",
      order: 2,
    },
    {
      slug: "counseling",
      title: "Counseling",
      description:
        "Professional counseling services and support structure for emotional well-being.",
      badge: "Wellness",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bloom%20pet%20project-AcDJ6gkwxzKMNG1coRzDRxMwFswiG4.png",
      fullCopy:
        "Our counseling services offer a safe and confidential space for boys and young men to express themselves, process their emotions, and receive professional support. We provide individual and group counseling to help young people build resilience and emotional strength.",
      order: 3,
    },
    {
      slug: "leadership-development",
      title: "Leadership Development",
      description:
        "Programs building leadership skills, confidence, and purpose for the next generation.",
      badge: "New Program",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b3.jpg%20%281%29-UAqMGhDSGFWDAXC4ejCeUDwCEg29DX.jpeg",
      fullCopy:
        "Our leadership development programs are designed to cultivate the next generation of leaders. Through workshops, community projects, and mentorship, we help young men develop the skills, vision, and courage to lead with purpose and make a lasting impact in their communities.",
      order: 4,
    },
  ];

  for (const program of programs) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: program,
      create: program,
    });
  }
  console.log("✅ Programs seeded");

  // ─── Team Members ─────────────────────────────────────────────────────────
  const teamMembers = [
    {
      name: "Abubakar Ibrahim",
      role: "Founder & Executive Director",
      shortBio: "Visionary leader with a passion for youth empowerment.",
      fullBio: "Abubakar Ibrahim is the founder and executive director of Johnnie Boy's Foundation. With over a decade of experience in community development and youth advocacy, he has dedicated his life to creating opportunities for boys and young men in northern Nigeria. His vision and leadership have guided the foundation from a small community initiative to a recognized non-profit organization making real impact across multiple states.",
      email: "abubakar@johnnieboysfoundation.org",
      order: 1,
    },
    {
      name: "Fatima Abdullahi",
      role: "Program Director",
      shortBio: "Experienced program manager specializing in education and mentorship.",
      fullBio: "Fatima Abdullahi serves as the Program Director, overseeing all of the foundation's core programs. With a background in education and non-profit management, she ensures that every program delivers measurable impact. Her strategic approach to program design and implementation has been instrumental in the foundation's growth and success.",
      email: "fatima@johnnieboysfoundation.org",
      order: 2,
    },
    {
      name: "Ibrahim Musa",
      role: "Head of Education",
      shortBio: "Educator and curriculum developer with a love for teaching.",
      fullBio: "Ibrahim Musa leads the foundation's education support initiatives. As a qualified educator with years of teaching experience, he designs curricula and learning materials tailored to the needs of boys in underserved communities. His innovative approach to education has helped hundreds of boys improve their academic performance and stay in school.",
      email: "ibrahim@johnnieboysfoundation.org",
      order: 3,
    },
    {
      name: "Aisha Bello",
      role: "Mentorship Coordinator",
      shortBio: "Passionate about connecting young men with positive role models.",
      fullBio: "Aisha Bello coordinates the foundation's mentorship program, matching mentees with suitable mentors and ensuring productive relationships. Her background in psychology and community work gives her unique insight into the needs of young people and the qualities that make effective mentors.",
      email: "aisha@johnnieboysfoundation.org",
      order: 4,
    },
    {
      name: "Yusuf Danjuma",
      role: "Skills Training Lead",
      shortBio: "Tech professional dedicated to bridging the digital divide.",
      fullBio: "Yusuf Danjuma leads the foundation's skills training and digital literacy programs. With a background in software development and digital marketing, he brings real-world expertise to the classroom. His bootcamps and workshops have introduced dozens of boys to coding, design, and other marketable skills.",
      email: "yusuf@johnnieboysfoundation.org",
      order: 5,
    },
    {
      name: "Hauwa Suleiman",
      role: "Wellness Counselor",
      shortBio: "Certified counselor supporting the emotional health of young people.",
      fullBio: "Hauwa Suleiman provides counseling and wellness support to the boys in the foundation's programs. As a certified counselor, she offers individual and group sessions that help young people process their emotions, build resilience, and develop healthy coping strategies. Her work is vital to the holistic development of every boy the foundation serves.",
      email: "hauwa@johnnieboysfoundation.org",
      order: 6,
    },
    {
      name: "Khalid Abubakar",
      role: "Community Outreach Manager",
      shortBio: "Community organizer with deep roots in northern Nigeria.",
      fullBio: "Khalid Abubakar manages the foundation's community outreach and enrollment efforts. His deep connections in local communities and his ability to build trust with families have been crucial to reaching boys who need support the most. He leads the door-to-door outreach that identifies and enrolls boys into the foundation's programs.",
      email: "khalid@johnnieboysfoundation.org",
      order: 7,
    },
    {
      name: "Maryam Aliyu",
      role: "Communications Director",
      shortBio: "Storyteller and advocate spreading the foundation's mission.",
      fullBio: "Maryam Aliyu directs the foundation's communications and media efforts. With a background in journalism and digital media, she crafts compelling stories that highlight the foundation's impact and inspire support. Her work in social media, content creation, and public relations has significantly increased the foundation's visibility and reach.",
      email: "maryam@johnnieboysfoundation.org",
      order: 8,
    },
  ];

  for (let i = 0; i < teamMembers.length; i++) {
    const member = teamMembers[i];
    const existing = await prisma.teamMember.findFirst({
      where: { name: member.name },
    });
    if (existing) {
      await prisma.teamMember.update({
        where: { id: existing.id },
        data: { ...member, order: member.order || i + 1 },
      });
    } else {
      await prisma.teamMember.create({
        data: { ...member, order: member.order || i + 1 },
      });
    }
  }
  console.log("✅ Team members seeded");

  // ─── Trustees ─────────────────────────────────────────────────────────────
  const trustees = [
    { name: "Barnabas Johnnie", role: "Chairman", order: 1, photoUrl: "/barnabas.jpeg" },
    { name: "Abijah Johnnie", role: "Trustee", order: 2, photoUrl: "/abijah.png" },
    { name: "Chioma Oguegbu", role: "Secretary / Trustee", order: 3, photoUrl: null },
  ];

  for (const trustee of trustees) {
    const existing = await prisma.trustee.findFirst({
      where: { name: trustee.name },
    });
    if (!existing) {
      await prisma.trustee.create({ data: trustee });
    }
  }
  console.log("✅ Trustees seeded");

  // ─── Gallery Posts ────────────────────────────────────────────────────────
  const posts = [
    {
      slug: "summer-digital-bootcamp-2025",
      title: "Summer Digital Bootcamp 2025",
      description: "Our annual digital skills bootcamp equipped over 50 boys with hands-on training in coding, design, and digital literacy — preparing them for the future.",
      category: "PROGRAM" as const,
      coverImage: "/bootcamp.jpeg",
      author: "Johnnie Boy's Foundation",
      content: [
        { type: "heading", level: 2, text: "Empowering Boys Through Digital Skills" },
        { type: "paragraph", text: "This summer, Johnnie Boy's Foundation hosted its annual Digital Bootcamp in Kaduna, bringing together over 50 boys from underserved communities for an intensive week of hands-on learning in coding, graphic design, and digital literacy." },
        { type: "paragraph", text: "The bootcamp was designed to bridge the digital divide and equip young men with practical skills they can use in school, future careers, and everyday life. From building their first websites to understanding online safety, the participants gained confidence in navigating the digital world." },
        { type: "image", src: "/bootcamp.jpeg", alt: "Participants working on computers during the bootcamp", caption: "Boys working on their coding projects during the summer bootcamp.", width: "full" },
        { type: "heading", level: 2, text: "What the Boys Learned" },
        { type: "paragraph", text: "The curriculum covered a wide range of topics tailored to different skill levels. Beginners learned the fundamentals of HTML and CSS, while more advanced participants explored JavaScript and basic app development." },
        { type: "blockquote", text: "Before this bootcamp, I didn't know how to build a website. Now I can create one from scratch. This has changed how I see my future.", attribution: "Ahmed, 16, Bootcamp Participant" },
        { type: "cta", text: "Support Our Programs", href: "/get-involved", style: "primary" },
      ],
    },
    {
      slug: "mentorship-kickoff-kaduna",
      title: "Mentorship Kickoff — Kaduna Chapter",
      description: "Kicking off our mentorship program with 30 new mentor-mentee pairs. Young men met their guides for the first time in an inspiring opening ceremony.",
      category: "EVENT" as const,
      coverImage: "/mentor.png",
      author: "Johnnie Boy's Foundation",
      content: [
        { type: "heading", level: 2, text: "A New Chapter Begins" },
        { type: "paragraph", text: "On July 20th, 2025, Johnnie Boy's Foundation officially launched its Kaduna Chapter mentorship program with an inspiring opening ceremony that brought together 30 mentor-mentee pairs for the first time." },
        { type: "image", src: "/mentor.png", alt: "Mentors and mentees at the opening ceremony", caption: "The first mentor-mentee pairs meet at the Kaduna Chapter kickoff.", width: "full" },
        { type: "heading", level: 2, text: "The Power of Mentorship" },
        { type: "paragraph", text: "Research consistently shows that young men with mentors are more likely to stay in school, avoid risky behaviors, and develop the confidence they need to succeed." },
        { type: "blockquote", text: "Having a mentor means having someone who believes in you, even when you don't believe in yourself. That's what we're building here.", attribution: "Barnabas Johnnie, Chairman" },
        { type: "cta", text: "Become a Mentor", href: "/get-involved", style: "primary" },
      ],
    },
    {
      slug: "building-leaders-video",
      title: "Building Leaders, One Boy at a Time",
      description: "A look inside our leadership development program — workshops, community projects, and the young men who are stepping up to lead.",
      category: "PROGRAM" as const,
      coverImage: "/hero.jpeg",
      youtubeId: "dQw4w9WgXcQ",
      author: "Johnnie Boy's Foundation",
      content: [
        { type: "youtube", youtubeId: "dQw4w9WgXcQ" },
        { type: "heading", level: 2, text: "Why Leadership Matters" },
        { type: "paragraph", text: "Leadership isn't just a title — it's a mindset. Our Leadership Development Program is designed to help young men discover their strengths, build confidence, and develop the skills they need to lead with purpose." },
        { type: "blockquote", text: "I used to be afraid of speaking in front of people. Now I can stand up and share my ideas with confidence. This program changed my life.", attribution: "Ibrahim, 17, Program Graduate" },
        { type: "cta", text: "Join the Program", href: "/get-involved", style: "primary" },
      ],
    },
    {
      slug: "community-outreach-enrollment",
      title: "Community Outreach — Enrolling 100 Boys",
      description: "Our team hit the streets of Kaduna to enroll boys from underserved neighborhoods into our education support program. 100 boys, 100 new opportunities.",
      category: "ACTIVITY" as const,
      coverImage: "/enroll-a-boy.jpeg",
      author: "Johnnie Boy's Foundation",
      content: [
        { type: "heading", level: 2, text: "Reaching Every Boy" },
        { type: "paragraph", text: "On May 8th, our team set out across Kaduna with a bold goal: enroll 100 boys from underserved neighborhoods into our Education Support Program." },
        { type: "image", src: "/enroll-a-boy.jpeg", alt: "Team enrolling boys in the community", caption: "Our outreach team connects with families in underserved neighborhoods.", width: "full" },
        { type: "blockquote", text: "My son has never been this excited about school. Thank you for giving him a chance.", attribution: "Parent of an enrolled boy" },
        { type: "cta", text: "Enroll a Boy", href: "/get-involved", style: "primary" },
      ],
    },
    {
      slug: "empowering-next-generation-video",
      title: "Empowering the Next Generation",
      description: "See how Johnnie Boy's Foundation is transforming the lives of boys through education, mentorship, and skills training in northern Nigeria.",
      category: "PROGRAM" as const,
      coverImage: "/volunteer.png",
      youtubeId: "dQw4w9WgXcQ",
      author: "Johnnie Boy's Foundation",
      content: [
        { type: "youtube", youtubeId: "dQw4w9WgXcQ" },
        { type: "heading", level: 2, text: "Our Mission in Action" },
        { type: "paragraph", text: "This video showcases the heart of what we do at Johnnie Boy's Foundation — transforming the lives of boys and young men through education, mentorship, and skills training in northern Nigeria." },
        { type: "cta", text: "Get Involved Today", href: "/get-involved", style: "primary" },
      ],
    },
    {
      slug: "first-anniversary",
      title: "First Anniversary — One Year of Impact",
      description: "Celebrating one year since our official registration. From 10 boys to hundreds served — our journey of impact continues.",
      category: "MILESTONE" as const,
      coverImage: "/vision.png",
      author: "Johnnie Boy's Foundation",
      content: [
        { type: "heading", level: 2, text: "One Year of Guiding Boys to Greatness" },
        { type: "paragraph", text: "On May 14, 2025, Johnnie Boy's Foundation officially marked its first anniversary since registration. What began as a vision to support boys in underserved communities has grown into a movement that has touched hundreds of lives." },
        { type: "image", src: "/vision.png", alt: "Foundation anniversary celebration", caption: "Celebrating one year of impact with our community.", width: "full" },
        { type: "blockquote", text: "One year ago, we started with a dream and 10 boys. Today, we serve hundreds and our dream is bigger than ever.", attribution: "Barnabas Johnnie, Chairman" },
        { type: "cta", text: "Read Our Full Story", href: "/about", style: "outline" },
      ],
    },
    {
      slug: "partnership-drive-2025",
      title: "Partnership Drive — Corporate Collaborations",
      description: "We welcomed new corporate partners to our mission. Together, we're expanding reach and resources for boys across northern Nigeria.",
      category: "NEWS" as const,
      coverImage: "/partner.png",
      author: "Johnnie Boy's Foundation",
      content: [
        { type: "heading", level: 2, text: "Stronger Together" },
        { type: "paragraph", text: "We're thrilled to announce new corporate partnerships that will significantly expand our reach and resources." },
        { type: "image", src: "/partner.png", alt: "Partnership signing ceremony", caption: "New corporate partners join our mission.", width: "full" },
        { type: "cta", text: "Become a Partner", href: "/get-involved", style: "primary" },
      ],
    },
    {
      slug: "mentor-voices-video",
      title: "Stories of Change — Mentor Voices",
      description: "Our mentors share their experiences and the moments that made this journey worthwhile. Real stories, real impact.",
      category: "PROGRAM" as const,
      coverImage: "/volunteer.jpeg",
      youtubeId: "dQw4w9WgXcQ",
      author: "Johnnie Boy's Foundation",
      content: [
        { type: "youtube", youtubeId: "dQw4w9WgXcQ" },
        { type: "heading", level: 2, text: "Voices from the Field" },
        { type: "paragraph", text: "In this video, our mentors share their personal experiences of guiding and supporting young men through the Johnnie Boy's Foundation mentorship program." },
        { type: "blockquote", text: "When you see a young man who once doubted himself stand up and lead a team, you know you've made a difference.", attribution: "Chioma, Mentor" },
        { type: "cta", text: "Join as a Mentor", href: "/get-involved", style: "primary" },
      ],
    },
    {
      slug: "counseling-wellness-workshop",
      title: "Counseling & Wellness Workshop",
      description: "A day of emotional wellness sessions, group activities, and professional support for boys navigating life's challenges.",
      category: "PROGRAM" as const,
      coverImage: "/img3.jpeg",
      author: "Johnnie Boy's Foundation",
      content: [
        { type: "heading", level: 2, text: "Prioritizing Emotional Well-being" },
        { type: "paragraph", text: "On January 15th, we hosted a Counseling & Wellness Workshop designed to support the emotional and mental health of the boys in our program." },
        { type: "image", src: "/img3.jpeg", alt: "Boys participating in wellness activities", caption: "Participants engage in group activities during the wellness workshop.", width: "full" },
        { type: "blockquote", text: "I learned that it's okay to talk about how I feel. Before today, I kept everything inside.", attribution: "Yusuf, 14, Workshop Participant" },
        { type: "cta", text: "Support Wellness Programs", href: "/get-involved", style: "primary" },
      ],
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: { ...post, publishedAt: new Date() },
      create: { ...post, publishedAt: new Date() },
    });
  }
  console.log("✅ Gallery posts seeded");

  // ─── Site Settings ────────────────────────────────────────────────────────
  const settings: Record<string, string> = {
    phone: "+234 813 157 6436",
    email: "johnnieboysfoundation@gmail.com",
    address: "No 3 Mozambique Crescent, Barnawa Shopping Complex, Kaduna, Kaduna State, Nigeria",
    website: "https://johnnieboysfoundation.org",
    "social:instagram": "https://instagram.com/Johnnieboysfoundation",
    "social:facebook": "https://facebook.com/Johnnieboysfoundation",
    "social:twitter": "https://twitter.com/Johnnieboysfoundation",
    "social:whatsapp": "https://wa.me/2348131576436",
    "social:linkedin": "https://www.linkedin.com/in/johnnie-boys-foundation-084818297/",
    "social:email": "johnnieboysfoundation@gmail.com",
    orgName: "Johnnie Boy's Foundation",
    tagline: "Guiding boys to greatness.",
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  console.log("✅ Site settings seeded");

  console.log("\n🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
