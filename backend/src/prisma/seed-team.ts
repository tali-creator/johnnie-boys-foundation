import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const realTeamMembers = [
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

async function main() {
  console.log("🌱 Replacing team members with real data...");

  // Delete all existing team members
  await prisma.teamMember.deleteMany();
  console.log("  Cleared old team members");

  // Create real team members
  for (let i = 0; i < realTeamMembers.length; i++) {
    const member = realTeamMembers[i];
    await prisma.teamMember.create({
      data: { ...member, order: member.order || i + 1 },
    });
    console.log(`  ✓ Created: ${member.name}`);
  }

  console.log("\n🎉 Team seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
