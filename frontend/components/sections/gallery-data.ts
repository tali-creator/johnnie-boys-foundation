export type MediaType = "image" | "video";

export type GalleryCategory =
  | "Event"
  | "Program"
  | "Activity"
  | "News"
  | "Milestone";

export type ContentBlockType =
  | "heading"
  | "paragraph"
  | "image"
  | "blockquote"
  | "cta"
  | "youtube"
  | "spacer";

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3;
  text: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
  bold?: boolean;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  width?: "full" | "two-thirds" | "half";
}

export interface BlockquoteBlock {
  type: "blockquote";
  text: string;
  attribution?: string;
}

export interface CtaBlock {
  type: "cta";
  text: string;
  href: string;
  style?: "primary" | "outline";
}

export interface YoutubeBlock {
  type: "youtube";
  youtubeId: string;
}

export interface SpacerBlock {
  type: "spacer";
  height?: "sm" | "md" | "lg";
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | BlockquoteBlock
  | CtaBlock
  | YoutubeBlock
  | SpacerBlock;

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: GalleryCategory;
  type: MediaType;
  image: string;
  youtubeId?: string;
  slug: string;
  author?: string;
  content: ContentBlock[];
}

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Summer Digital Bootcamp 2025",
    description:
      "Our annual digital skills bootcamp equipped over 50 boys with hands-on training in coding, design, and digital literacy — preparing them for the future.",
    date: "August 12, 2025",
    category: "Program",
    type: "image",
    image: "/bootcamp.jpeg",
    slug: "summer-digital-bootcamp-2025",
    author: "Johnnie Boy's Foundation",
    content: [
      {
        type: "heading",
        level: 2,
        text: "Empowering Boys Through Digital Skills",
      },
      {
        type: "paragraph",
        text: "This summer, Johnnie Boy's Foundation hosted its annual Digital Bootcamp in Kaduna, bringing together over 50 boys from underserved communities for an intensive week of hands-on learning in coding, graphic design, and digital literacy.",
      },
      {
        type: "paragraph",
        text: "The bootcamp was designed to bridge the digital divide and equip young men with practical skills they can use in school, future careers, and everyday life. From building their first websites to understanding online safety, the participants gained confidence in navigating the digital world.",
      },
      {
        type: "image",
        src: "/bootcamp.jpeg",
        alt: "Participants working on computers during the bootcamp",
        caption: "Boys working on their coding projects during the summer bootcamp.",
        width: "full",
      },
      {
        type: "heading",
        level: 2,
        text: "What the Boys Learned",
      },
      {
        type: "paragraph",
        text: "The curriculum covered a wide range of topics tailored to different skill levels. Beginners learned the fundamentals of HTML and CSS, while more advanced participants explored JavaScript and basic app development. Design sessions introduced participants to tools like Canva and Figma, allowing them to create logos, flyers, and social media graphics.",
      },
      {
        type: "paragraph",
        text: "Beyond technical skills, the bootcamp emphasized digital citizenship — teaching the boys about online safety, responsible social media use, and how to protect their personal information in an increasingly connected world.",
      },
      {
        type: "blockquote",
        text: "Before this bootcamp, I didn't know how to build a website. Now I can create one from scratch. This has changed how I see my future.",
        attribution: "Ahmed, 16, Bootcamp Participant",
      },
      {
        type: "heading",
        level: 2,
        text: "Looking Ahead",
      },
      {
        type: "paragraph",
        text: "Building on the success of this year's bootcamp, we plan to expand the program to reach more boys across northern Nigeria. With continued support from our partners and donors, we aim to make digital literacy a core part of our education support initiatives.",
      },
      {
        type: "cta",
        text: "Support Our Programs",
        href: "/get-involved",
        style: "primary",
      },
    ],
  },
  {
    id: "2",
    title: "Mentorship Kickoff — Kaduna Chapter",
    description:
      "Kicking off our mentorship program with 30 new mentor-mentee pairs. Young men met their guides for the first time in an inspiring opening ceremony.",
    date: "July 20, 2025",
    category: "Event",
    type: "image",
    image: "/mentor.png",
    slug: "mentorship-kickoff-kaduna",
    author: "Johnnie Boy's Foundation",
    content: [
      {
        type: "heading",
        level: 2,
        text: "A New Chapter Begins",
      },
      {
        type: "paragraph",
        text: "On July 20th, 2025, Johnnie Boy's Foundation officially launched its Kaduna Chapter mentorship program with an inspiring opening ceremony that brought together 30 mentor-mentee pairs for the first time.",
      },
      {
        type: "paragraph",
        text: "The event was held at the Barnawa Community Center in Kaduna, where mentors and mentees gathered to meet one another, share their stories, and set goals for the months ahead. The energy in the room was electric as young men found their guides for the journey ahead.",
      },
      {
        type: "image",
        src: "/mentor.png",
        alt: "Mentors and mentees at the opening ceremony",
        caption: "The first mentor-mentee pairs meet at the Kaduna Chapter kickoff.",
        width: "full",
      },
      {
        type: "heading",
        level: 2,
        text: "The Power of Mentorship",
      },
      {
        type: "paragraph",
        text: "Research consistently shows that young men with mentors are more likely to stay in school, avoid risky behaviors, and develop the confidence they need to succeed. Our mentorship program pairs each boy with an experienced mentor who provides guidance, support, and encouragement on a regular basis.",
      },
      {
        type: "blockquote",
        text: "Having a mentor means having someone who believes in you, even when you don't believe in yourself. That's what we're building here.",
        attribution: "Barnabas Johnnie, Chairman",
      },
      {
        type: "paragraph",
        text: "The program will run for 12 months, with regular check-ins, group activities, and one-on-one sessions. We look forward to sharing the impact stories as these pairs grow together.",
      },
      {
        type: "cta",
        text: "Become a Mentor",
        href: "/get-involved",
        style: "primary",
      },
    ],
  },
  {
    id: "3",
    title: "Building Leaders, One Boy at a Time",
    description:
      "A look inside our leadership development program — workshops, community projects, and the young men who are stepping up to lead.",
    date: "June 15, 2025",
    category: "Program",
    type: "video",
    image: "/hero.jpeg",
    youtubeId: "dQw4w9WgXcQ",
    slug: "building-leaders-video",
    author: "Johnnie Boy's Foundation",
    content: [
      {
        type: "youtube",
        youtubeId: "dQw4w9WgXcQ",
      },
      {
        type: "heading",
        level: 2,
        text: "Why Leadership Matters",
      },
      {
        type: "paragraph",
        text: "Leadership isn't just a title — it's a mindset. Our Leadership Development Program is designed to help young men discover their strengths, build confidence, and develop the skills they need to lead with purpose in their schools, communities, and beyond.",
      },
      {
        type: "paragraph",
        text: "Through a combination of workshops, community projects, and peer mentorship, participants learn how to communicate effectively, solve problems, and take initiative. The program culminates in a community service project where the boys apply their skills in real-world settings.",
      },
      {
        type: "heading",
        level: 2,
        text: "Program Highlights",
      },
      {
        type: "paragraph",
        text: "Over the course of 8 weeks, participants engaged in team-building exercises, public speaking workshops, and project management sessions. Each week brought new challenges and opportunities for growth, as the young men stepped outside their comfort zones and discovered what they're truly capable of.",
      },
      {
        type: "blockquote",
        text: "I used to be afraid of speaking in front of people. Now I can stand up and share my ideas with confidence. This program changed my life.",
        attribution: "Ibrahim, 17, Program Graduate",
      },
      {
        type: "cta",
        text: "Join the Program",
        href: "/get-involved",
        style: "primary",
      },
    ],
  },
  {
    id: "4",
    title: "Community Outreach — Enrolling 100 Boys",
    description:
      "Our team hit the streets of Kaduna to enroll boys from underserved neighborhoods into our education support program. 100 boys, 100 new opportunities.",
    date: "May 8, 2025",
    category: "Activity",
    type: "image",
    image: "/enroll-a-boy.jpeg",
    slug: "community-outreach-enrollment",
    author: "Johnnie Boy's Foundation",
    content: [
      {
        type: "heading",
        level: 2,
        text: "Reaching Every Boy",
      },
      {
        type: "paragraph",
        text: "On May 8th, our team set out across Kaduna with a bold goal: enroll 100 boys from underserved neighborhoods into our Education Support Program. What followed was one of the most impactful days in our foundation's history.",
      },
      {
        type: "paragraph",
        text: "We visited communities where access to quality education is limited, and families often struggle to provide school supplies and support. Through door-to-door outreach, community meetings, and partnerships with local leaders, we identified boys who were eager to learn but lacked the resources to thrive.",
      },
      {
        type: "image",
        src: "/enroll-a-boy.jpeg",
        alt: "Team enrolling boys in the community",
        caption: "Our outreach team connects with families in underserved neighborhoods.",
        width: "full",
      },
      {
        type: "heading",
        level: 2,
        text: "What the Program Provides",
      },
      {
        type: "paragraph",
        text: "Each enrolled boy receives school supplies, textbooks, tutoring support, and access to our learning centers. But the program goes beyond materials — it provides mentorship, encouragement, and a community that believes in their potential.",
      },
      {
        type: "paragraph",
        text: "The response from families was overwhelming. Parents expressed gratitude for the opportunity, and the boys themselves were eager to start their learning journey. For many, this was the first time someone had invested in their education in such a meaningful way.",
      },
      {
        type: "blockquote",
        text: "My son has never been this excited about school. Thank you for giving him a chance.",
        attribution: "Parent of an enrolled boy",
      },
      {
        type: "cta",
        text: "Enroll a Boy",
        href: "/get-involved",
        style: "primary",
      },
    ],
  },
  {
    id: "5",
    title: "Empowering the Next Generation",
    description:
      "See how Johnnie Boy's Foundation is transforming the lives of boys through education, mentorship, and skills training in northern Nigeria.",
    date: "April 22, 2025",
    category: "Program",
    type: "video",
    image: "/volunteer.png",
    youtubeId: "dQw4w9WgXcQ",
    slug: "empowering-next-generation-video",
    author: "Johnnie Boy's Foundation",
    content: [
      {
        type: "youtube",
        youtubeId: "dQw4w9WgXcQ",
      },
      {
        type: "heading",
        level: 2,
        text: "Our Mission in Action",
      },
      {
        type: "paragraph",
        text: "This video showcases the heart of what we do at Johnnie Boy's Foundation — transforming the lives of boys and young men through education, mentorship, and skills training in northern Nigeria.",
      },
      {
        type: "paragraph",
        text: "From classroom sessions to outdoor activities, from one-on-one mentoring to community service, every moment captured in this video represents the real impact of your support. These aren't just stories — they're evidence that change is possible when we invest in our youth.",
      },
      {
        type: "heading",
        level: 2,
        text: "How You Can Help",
      },
      {
        type: "paragraph",
        text: "Whether you volunteer your time, donate resources, or spread the word about our mission, every action makes a difference. Watch the video, share it with your network, and join us in building a brighter future for boys across northern Nigeria.",
      },
      {
        type: "cta",
        text: "Get Involved Today",
        href: "/get-involved",
        style: "primary",
      },
    ],
  },
  {
    id: "6",
    title: "First Anniversary — One Year of Impact",
    description:
      "Celebrating one year since our official registration. From 10 boys to hundreds served — our journey of impact continues.",
    date: "May 14, 2025",
    category: "Milestone",
    type: "image",
    image: "/vision.png",
    slug: "first-anniversary",
    author: "Johnnie Boy's Foundation",
    content: [
      {
        type: "heading",
        level: 2,
        text: "One Year of Guiding Boys to Greatness",
      },
      {
        type: "paragraph",
        text: "On May 14, 2025, Johnnie Boy's Foundation officially marked its first anniversary since registration. What began as a vision to support boys in underserved communities has grown into a movement that has touched hundreds of lives across northern Nigeria.",
      },
      {
        type: "paragraph",
        text: "In just one year, we've launched four core programs, enrolled over 100 boys in our education support initiative, paired 30 mentor-mentee pairs, and hosted our first digital bootcamp. But beyond the numbers, it's the stories of transformation that define our impact.",
      },
      {
        type: "image",
        src: "/vision.png",
        alt: "Foundation anniversary celebration",
        caption: "Celebrating one year of impact with our community.",
        width: "full",
      },
      {
        type: "heading",
        level: 2,
        text: "Milestones Along the Way",
      },
      {
        type: "paragraph",
        text: "From our first community outreach to our partnership with local organizations, every milestone has been a step toward our vision of a northern Nigeria where every boy has the opportunity to dream big and achieve his potential.",
      },
      {
        type: "blockquote",
        text: "One year ago, we started with a dream and 10 boys. Today, we serve hundreds and our dream is bigger than ever. The best is yet to come.",
        attribution: "Barnabas Johnnie, Chairman",
      },
      {
        type: "cta",
        text: "Read Our Full Story",
        href: "/about",
        style: "outline",
      },
    ],
  },
  {
    id: "7",
    title: "Partnership Drive — Corporate Collaborations",
    description:
      "We welcomed new corporate partners to our mission. Together, we're expanding reach and resources for boys across northern Nigeria.",
    date: "March 18, 2025",
    category: "News",
    type: "image",
    image: "/partner.png",
    slug: "partnership-drive-2025",
    author: "Johnnie Boy's Foundation",
    content: [
      {
        type: "heading",
        level: 2,
        text: "Stronger Together",
      },
      {
        type: "paragraph",
        text: "We're thrilled to announce new corporate partnerships that will significantly expand our reach and resources. These collaborations represent a shared commitment to investing in the future of boys across northern Nigeria.",
      },
      {
        type: "paragraph",
        text: "Our new partners bring not only financial support but also expertise, networks, and a genuine passion for our mission. Together, we'll be able to serve more boys, launch new programs, and create lasting change in communities that need it most.",
      },
      {
        type: "image",
        src: "/partner.png",
        alt: "Partnership signing ceremony",
        caption: "New corporate partners join our mission at the signing ceremony.",
        width: "full",
      },
      {
        type: "heading",
        level: 2,
        text: "What This Means for Our Boys",
      },
      {
        type: "paragraph",
        text: "With increased resources, we can now expand our education support program to additional communities, invest in better learning materials, and provide more comprehensive mentorship opportunities. Every partnership directly translates to more boys receiving the support they need to thrive.",
      },
      {
        type: "cta",
        text: "Become a Partner",
        href: "/get-involved",
        style: "primary",
      },
    ],
  },
  {
    id: "8",
    title: "Stories of Change — Mentor Voices",
    description:
      "Our mentors share their experiences and the moments that made this journey worthwhile. Real stories, real impact.",
    date: "February 28, 2025",
    category: "Program",
    type: "video",
    image: "/volunteer.jpeg",
    youtubeId: "dQw4w9WgXcQ",
    slug: "mentor-voices-video",
    author: "Johnnie Boy's Foundation",
    content: [
      {
        type: "youtube",
        youtubeId: "dQw4w9WgXcQ",
      },
      {
        type: "heading",
        level: 2,
        text: "Voices from the Field",
      },
      {
        type: "paragraph",
        text: "In this video, our mentors share their personal experiences of guiding and supporting young men through the Johnnie Boy's Foundation mentorship program. Their stories reveal the profound impact that mentorship can have — not just on the mentees, but on the mentors themselves.",
      },
      {
        type: "paragraph",
        text: "From the first meeting to breakthrough moments, these mentors describe the rewards and challenges of walking alongside young men as they navigate life's complexities. Their dedication and passion are the backbone of our program.",
      },
      {
        type: "blockquote",
        text: "When you see a young man who once doubted himself stand up and lead a team, you know you've made a difference. That's why I mentor.",
        attribution: "Chioma, Mentor",
      },
      {
        type: "heading",
        level: 2,
        text: "Become a Mentor",
      },
      {
        type: "paragraph",
        text: "If you're inspired by these stories and want to make a difference in a young man's life, we'd love to have you on our team. No special qualifications needed — just a willingness to listen, guide, and show up consistently.",
      },
      {
        type: "cta",
        text: "Join as a Mentor",
        href: "/get-involved",
        style: "primary",
      },
    ],
  },
  {
    id: "9",
    title: "Counseling & Wellness Workshop",
    description:
      "A day of emotional wellness sessions, group activities, and professional support for boys navigating life's challenges.",
    date: "January 15, 2025",
    category: "Program",
    type: "image",
    image: "/img3.jpeg",
    slug: "counseling-wellness-workshop",
    author: "Johnnie Boy's Foundation",
    content: [
      {
        type: "heading",
        level: 2,
        text: "Prioritizing Emotional Well-being",
      },
      {
        type: "paragraph",
        text: "On January 15th, we hosted a Counseling & Wellness Workshop designed to support the emotional and mental health of the boys in our program. The day was filled with activities that encouraged self-expression, reflection, and healing.",
      },
      {
        type: "paragraph",
        text: "Led by professional counselors and trained volunteers, the workshop provided a safe space for boys to talk about their feelings, learn coping strategies, and connect with peers who share similar experiences. Emotional wellness is a critical component of our holistic approach to youth development.",
      },
      {
        type: "image",
        src: "/img3.jpeg",
        alt: "Boys participating in wellness activities",
        caption: "Participants engage in group activities during the wellness workshop.",
        width: "full",
      },
      {
        type: "heading",
        level: 2,
        text: "Activities and Sessions",
      },
      {
        type: "paragraph",
        text: "The workshop included guided meditation sessions, group discussions on stress management, creative expression through art, and one-on-one counseling for boys who needed additional support. Each activity was designed to build resilience and emotional intelligence.",
      },
      {
        type: "blockquote",
        text: "I learned that it's okay to talk about how I feel. Before today, I kept everything inside. Now I know I'm not alone.",
        attribution: "Yusuf, 14, Workshop Participant",
      },
      {
        type: "cta",
        text: "Support Wellness Programs",
        href: "/get-involved",
        style: "primary",
      },
    ],
  },
];

export const galleryCategories: GalleryCategory[] = [
  "Event",
  "Program",
  "Activity",
  "News",
  "Milestone",
];

export function getGalleryItemBySlug(slug: string): GalleryItem | undefined {
  return galleryItems.find((item) => item.slug === slug);
}
