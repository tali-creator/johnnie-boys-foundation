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
      name: "Barnabas Johnnie Bamanja",
      role: "Founder & Executive Director",
      shortBio: "Social innovator, researcher, creative practitioner, youth advocate, and community builder.",
      fullBio: "Barnabas Johnnie is a Nigerian social innovator, researcher, creative practitioner, youth advocate, and community builder working at the intersection of culture, creativity, research, youth development, climate action, and social impact. He is the Managing Director and Chief Researcher at Duniatè Culture, a research and creative project management organization in Kaduna State. He is also the Founder of Johnnie Boys Foundation, an emerging platform dedicated to mentoring and empowering underserved young boys in Northern Nigeria through education, exposure, skills development, advocacy, and emotional support. He serves as Impact Officer for the Kaduna Global Shapers Hub and as Team Lead for the Kaduna Climate Action Lab (KCAL). Academically, Barnabas has a background in Biochemistry and is currently pursuing a Master's degree in Nutrition.",
      email: "",
      photoUrl: "/barnabas.jpeg",
      socialLinks: { linkedin: "#", twitter: "#" },
      order: 1,
    },
    {
      name: "Abijah Johnnie Bamanja",
      role: "Deputy Director / Vice President",
      shortBio: "Passionate Software Engineer with 7+ years of experience designing full-stack and backend systems.",
      fullBio: "Abijah is a passionate and hands-on Software Engineer with 7+ years of experience designing and shipping full-stack and backend systems across fintech, edtech, and blockchain. He specializes in building scalable APIs, crafting smart contracts, and contributing to the decentralized future, working fluently with JavaScript, PHP, Rust, Cairo, and Solidity. From launching CBN-integrated financial products in Nigeria to designing Octaflip, a multiplayer Web3 game on Starknet, he has led projects that combine strong engineering with real-world impact. He is deeply involved in open source, with 50+ Web3 contributions, and has strong experience with DevOps pipelines using Docker and GitHub Actions. He is driven by the opportunity to build the future—secure, decentralized, and inclusive.",
      email: "",
      photoUrl: "/abijah.png",
      socialLinks: { linkedin: "#", twitter: "#" },
      order: 2,
    },
    {
      name: "Chioma Ayomide Johnnie",
      role: "Finance & Administration Manager",
      shortBio: "Mass Communication graduate with experience in HR, Public Relations, and administrative support.",
      fullBio: "Chioma Ayomide is a Mass Communication graduate with experience in Human Resources, Protocol, Public Relations, virtual assistance, and administrative support. She is a strong communicator with excellent interpersonal skills and a keen ability to handle sensitive and confidential responsibilities with professionalism. A dependable team player, she brings organization, discretion, and a collaborative spirit to her role, helping to ensure effective coordination and smooth day-to-day operations within the organization.",
      email: "",
      photoUrl: "/chioma.jpeg",
      socialLinks: { linkedin: "#", twitter: "#" },
      order: 3,
    },
    {
      name: "Godsfear Fyhenum Joseph",
      role: "Communications & Media Officer",
      shortBio: "Creative media professional and storyteller passionate about visual communication and impact.",
      fullBio: "Godsfear is a creative media professional and storyteller passionate about using visual communication to inspire, connect, and create impact. As the Media Director at the organization, he leads the development of compelling visual content, digital storytelling, and media strategies that bring the organization's vision and work to life. With a strong eye for creativity and a passion for meaningful storytelling, he continues to use media as a powerful tool for amplifying voices, engaging communities, and driving positive change.",
      email: "",
      photoUrl: "/godsfear.jpeg",
      socialLinks: { linkedin: "#", twitter: "#" },
      order: 4,
    },
    {
      name: "Benjamin Johnnie Bamanja",
      role: "Operations & Logistics Manager",
      shortBio: "Dependable force behind smooth and successful operations with a problem-solving mindset.",
      fullBio: "Benjamin is the dependable force behind smooth and successful operations. As the Logistics Manager, he brings organization, precision and a problem-solving mindset to every project, ensuring that people, resources and plans come together seamlessly. Calm under pressure and committed to excellence, Benjamin helps turn every vision into a well-executed experience.",
      email: "",
      photoUrl: "/benjamin.jpeg",
      socialLinks: { linkedin: "#", twitter: "#" },
      order: 5,
    },
    {
      name: "Tali Nanzing",
      role: "ICT Director",
      shortBio: "Leading the foundation's information and communication technology initiatives.",
      fullBio: "Tali serves as the ICT Director, overseeing the foundation's technology infrastructure and digital initiatives. Tali ensures that the organization leverages technology effectively to achieve its mission and deliver impactful programs to the communities it serves.",
      email: "",
      photoUrl: "/tali.png",
      socialLinks: { linkedin: "#", twitter: "#" },
      order: 6,
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
    { name: "Barnabas Johnnie Bamanja", role: "Chairman", order: 1, photoUrl: "/barnabas.jpeg" },
    { name: "Abijah Johnnie Bamanja", role: "Trustee", order: 2, photoUrl: "/abijah.png" },
    { name: "Chioma Ayomide Johnnie", role: "Secretary / Trustee", order: 3, photoUrl: "/chioma.jpeg" },
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

  // ─── Initiatives ────────────────────────────────────────────────────────
  const initiatives = [
    {
      slug: "bloom",
      name: "BLOOM",
      tagline: "Upgrading Minds. Shaping Futures.",
      summary:
        "BLOOM is a youth development initiative creating pathways for young people to discover their potential, develop practical skills, and gain the confidence to shape their futures.",
      status: "ACTIVE" as const,
      heroImage: "/impact/intro-session.jpg",
      stats: [
        { label: "Students Reached", value: "2,867" },
        { label: "Schools Visited", value: "16+" },
        { label: "Exercise Books Distributed", value: "300+" },
        { label: "Writing Materials Distributed", value: "2,000+" },
        { label: "Learning Materials Distributed", value: "2,000+" },
      ],
      content: [
        { type: "heading", level: 2, text: "Introducing BLOOM" },
        {
          type: "paragraph",
          text: "BLOOM is a youth development initiative of Johnnie Boy's Foundation designed to create pathways for young people to discover their potential, develop practical skills and gain the confidence and support needed to shape their futures.",
        },
        {
          type: "paragraph",
          text: "As a growing platform for youth empowerment, BLOOM brings together complementary projects that address different stages of young people's development. One of its key projects is the 50 Schools Journey to Purpose, an outreach initiative focused on taking purpose discovery, mentorship, leadership, character development, career guidance and learning resources directly to students in schools.",
        },
        {
          type: "paragraph",
          text: "The project has so far reached 2,867 students across 16+ schools, alongside the distribution of writing materials, mathematical sets and other learning resources.",
        },
        { type: "heading", level: 2, text: "The Two Components" },
        {
          type: "paragraph",
          text: "The first component is the 50 Schools Journey to Purpose — an outreach initiative focused on taking purpose discovery, mentorship, leadership, character development, career guidance and learning resources directly to students in schools across Kaduna State.",
        },
        {
          type: "paragraph",
          text: "The second component is Skill Acquisition and Mentorship, which builds on the foundation created through the school outreach. It provides young people with practical, future-oriented skills including Artificial Intelligence, AI automation, graphic design, photography, content creation, social media management, entrepreneurship, leadership, communication, purpose discovery and career development.",
        },
        {
          type: "paragraph",
          text: "Together, these projects represent the BLOOM approach: first helping young people discover their purpose, then equipping them with the skills, mentorship and opportunities to turn that purpose into meaningful action.",
        },
        { type: "heading", level: 2, text: "Our Story" },
        {
          type: "paragraph",
          text: "The 50 Schools Journey to Purpose Initiative began with a question that would not let us rest: what if the greatest barrier holding students back was not intelligence, but a lack of exposure and direction?",
        },
        {
          type: "paragraph",
          text: "We saw students who could recite formulas but had never been asked what they wanted their lives to stand for. We saw classrooms where potential leaders, entrepreneurs and innovators sat quietly, waiting for someone to notice them. That gap is what Johnnie Boy's Foundation set out to close.",
        },
        {
          type: "paragraph",
          text: "What started as a conversation among a small group of passionate young volunteers has grown into a structured outreach reaching thousands of students across public and private schools in Kaduna State.",
        },
        {
          type: "blockquote",
          text: "Every student we meet is a reminder of why this work matters — potential is everywhere; what is missing is exposure and a mentor who believes in them.",
          attribution: "Israel Olabode Tope, Team Lead MindUpgrade",
        },
        { type: "heading", level: 2, text: "Future Skills & Mentorship Programme" },
        {
          type: "paragraph",
          text: "Building on the momentum of the 50 Schools Journey to Purpose Initiative, Johnnie Boy's Foundation and its partners launched the Future Skills & Mentorship Programme — a structured, completely FREE training programme for selected students who have been reached through our school outreaches.",
        },
        {
          type: "paragraph",
          text: "Training Areas: Artificial Intelligence (AI), AI Automation, Graphic Design, Photography, Content Creation, Social Media Management, Entrepreneurship, Leadership, Data Analysis, Purpose Discovery, Career Development.",
        },
        {
          type: "paragraph",
          text: "Participants receive hands-on training from experienced facilitators, one-on-one and group mentorship, real hands-on projects, and a Certificate of Completion.",
        },
        { type: "heading", level: 2, text: "Why This Matters" },
        {
          type: "paragraph",
          text: "For many students in the communities we serve, opportunities like the Future Skills & Mentorship Program simply do not exist. Without exposure to AI, digital skills, entrepreneurship or structured mentorship, countless capable young people will finish school without ever discovering what they are truly capable of.",
        },
        {
          type: "paragraph",
          text: "Investing in one student does not just change that student — it changes a household. A young person equipped with purpose, skills and confidence becomes a source of income, guidance and hope for their family. Multiply that across hundreds of students and you begin to see how mentoring young people today quietly builds the stronger, more resilient communities of tomorrow.",
        },
      ],
      partners: [
        { name: "MindUpgrade" },
        { name: "DanSebo Global Services Ltd" },
        { name: "ShineGirl Africa" },
        { name: "Blossomine Foundation" },
        { name: "Artizen" },
      ],
      progressCurrent: null,
      progressGoal: null,
      progressLabel: null,
      order: 1,
    },
    {
      slug: "rooted",
      name: "Rooted",
      tagline: "Building spaces where young minds grow",
      summary:
        "A planned physical space in Taraba State combining a tech hub and creative studio — currently in the fundraising and planning stage. Full details coming soon.",
      status: "FUNDRAISING" as const,
      heroImage: null,
      stats: [],
      content: [
        { type: "heading", level: 2, text: "About Rooted" },
        {
          type: "paragraph",
          text: "Rooted is an exciting new initiative from Johnnie Boy's Foundation — a planned physical space in Taraba State that will combine a tech hub and creative studio under one roof.",
        },
        {
          type: "paragraph",
          text: "The vision is to create a dedicated space where young people can access technology, learn digital skills, explore creative arts, and receive mentorship in a supportive environment. The space will include computer labs, creative studios, meeting rooms, and mentorship areas.",
        },
        {
          type: "paragraph",
          text: "We are currently in the fundraising and planning stage. Full details, images, and fundraising targets will be added soon.",
        },
        {
          type: "blockquote",
          text: "Every young person deserves a space where they can dream, learn, and grow. Rooted will be that space for the youth of Taraba State.",
          attribution: "Johnnie Boy's Foundation",
        },
      ],
      partners: [],
      progressCurrent: 0,
      progressGoal: null,
      progressLabel: "Raised so far",
      order: 2,
    },
  ];

  for (const initiative of initiatives) {
    await prisma.initiative.upsert({
      where: { slug: initiative.slug },
      update: initiative,
      create: initiative,
    });
  }
  console.log("✅ Initiatives seeded");

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
