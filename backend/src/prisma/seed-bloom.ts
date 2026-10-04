import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.initiative.deleteMany({ where: { slug: "bloom" } });

  const bloom = await prisma.initiative.create({
    data: {
      slug: "bloom",
      name: "BLOOM",
      tagline: "Little Men, Big Dreams — Upgrading Minds, Shaping Futures",
      summary:
        "A youth development initiative designed to create pathways for young people to discover their potential, develop practical skills and gain the confidence and support needed to shape their futures.",
      status: "ACTIVE",
      heroImage: "/hero.jpeg",
      order: 1,

      stats: [
        { label: "Students Reached", value: "2,867", order: 1 },
        { label: "Schools Visited", value: "16+", order: 2 },
        { label: "Exercise Books Distributed", value: "300+ dozen", order: 3 },
        { label: "Writing Materials Distributed", value: "2,000+", order: 4 },
        { label: "Learning Materials Distributed", value: "2,000+", order: 5 },
        { label: "Practical Skill Acquisition", value: "1 Month", order: 6 },
      ],

      partners: [
        { name: "MindUpgrade", logoUrl: "/partner.png", order: 1 },
        { name: "DanSebo Global Services Ltd", logoUrl: "/partner.png", order: 2 },
        { name: "ShineGirl Africa", logoUrl: "/partner.png", order: 3 },
        { name: "Blossomine Foundation", logoUrl: "/partner.png", order: 4 },
      ],

      content: [
        // ── Introducing BLOOM ──────────────────────────────────────────────
        {
          type: "heading",
          level: 2,
          text: "Introducing BLOOM",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "BLOOM is a youth development initiative of Johnnie Boy's Foundation designed to create pathways for young people to discover their potential, develop practical skills and gain the confidence and support needed to shape their futures.",
          bold: false,
        },
        {
          type: "paragraph",
          text: "As a growing platform for youth empowerment, BLOOM brings together complementary projects that address different stages of young people's development.",
          bold: false,
        },
        {
          type: "image",
          src: "/hero.jpeg",
          alt: "50 Schools Journey to Purpose Initiative — group photo with students and mentors",
          variant: "full",
          width: "full",
        },
        {
          type: "heading",
          level: 3,
          text: "50 Schools Journey to Purpose Initiative",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "An outreach initiative focused on taking purpose discovery, mentorship, leadership, character development, career guidance and learning resources directly to students in schools. The project has so far reached 2,867 students across 16+ schools, alongside the distribution of writing materials, mathematical sets and other learning resources.",
          bold: false,
        },
        {
          type: "heading",
          level: 3,
          text: "Skill Acquisition & Mentorship",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "Building on the foundation created through the school outreach, this component provides young people with practical, future-oriented skills including Artificial Intelligence, AI automation, graphic design, photography, content creation, social media management, entrepreneurship, leadership, communication, purpose discovery and career development.",
          bold: false,
        },
        {
          type: "paragraph",
          text: "Participants also receive hands-on training, mentorship, practical projects and certificates of completion.",
          bold: false,
        },
        {
          type: "image",
          src: "/impact/skills-training-1.jpg",
          alt: "Students learning digital skills around a laptop",
          variant: "full",
          width: "full",
        },
        {
          type: "divider",
          style: "line",
        },

        // ── Our Story ──────────────────────────────────────────────────────
        {
          type: "heading",
          level: 2,
          text: "Our Story",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "The 50 Schools Journey to Purpose Initiative began with a question that would not let us rest: what if the greatest barrier holding students back was not intelligence, but a lack of exposure and direction?",
          bold: false,
        },
        {
          type: "paragraph",
          text: "We saw students who could recite formulas but had never been asked what they wanted their lives to stand for. We saw classrooms where potential leaders, entrepreneurs and innovators sat quietly, waiting for someone to notice them. That gap is what Johnnie Boy's Foundation set out to close.",
          bold: false,
        },
        {
          type: "paragraph",
          text: "What started as a conversation among a small group of passionate young volunteers has grown into a structured outreach reaching thousands of students across public and private schools in Kaduna State.",
          bold: false,
        },
        {
          type: "image",
          src: "/impact/school-session-2.jpg",
          alt: "Team and students at a 50 Schools Journey to Purpose outreach session",
          variant: "full",
          width: "full",
        },
        {
          type: "stats-highlight",
          variant: "grid-3",
          stats: [
            { number: "2,867", label: "Students Reached" },
            { number: "16+", label: "Schools Visited" },
            { number: "300+", label: "Dozens of Exercise Books Distributed" },
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Mentorship Sessions Delivered On:",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "Purpose Discovery • Leadership • Entrepreneurship • Character Development • Career Guidance • AI and Digital Skills",
          bold: false,
        },
        {
          type: "image",
          src: "/impact/skills-training-1.jpg",
          alt: "Facilitator engaging students during a purpose discovery session",
          variant: "full",
          width: "full",
        },
        {
          type: "image",
          src: "/slides/IMG_0012.jpg",
          alt: "Facilitator speaking to students at a school outreach event",
          variant: "full",
          width: "full",
        },
        {
          type: "divider",
          style: "line",
        },

        // ── Schools Reached ────────────────────────────────────────────────
        {
          type: "heading",
          level: 2,
          text: "Schools Reached",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "The 50 Schools Journey to Purpose Initiative has so far reached students across a growing number of public and private secondary schools in Kaduna State, including Government Boys Secondary School and several other post-basic institutions. Each visit is tailored to the school's context and every session leaves behind learning materials, mentorship and a renewed sense of purpose among students.",
          bold: false,
        },
        {
          type: "image",
          src: "/hero.jpeg",
          alt: "Students seated in a classroom during a purpose discovery session",
          variant: "full",
          width: "full",
        },
        {
          type: "image",
          src: "/impact/school-session-2.jpg",
          alt: "Students receiving learning materials during an outreach session",
          variant: "full",
          width: "full",
        },
        {
          type: "image",
          src: "/impact/skills-training-1.jpg",
          alt: "Large gathering of students at a 50 Schools Journey to Purpose event",
          variant: "full",
          width: "full",
        },
        {
          type: "paragraph",
          text: "As the initiative grows, we look forward to reaching all 50 targeted schools and expanding into new communities, with the support of committed partners.",
          bold: false,
        },
        {
          type: "divider",
          style: "line",
        },

        // ── Our Partners ───────────────────────────────────────────────────
        {
          type: "heading",
          level: 2,
          text: "Our Partners",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "The 50 Schools Journey to Purpose Initiative has been made possible through the support and collaboration of like-minded organisations who believe in investing in young people:",
          bold: false,
        },
        {
          type: "paragraph",
          text: "MindUpgrade — Strategic Partners, providing volunteer resource persons and outreach support",
          bold: false,
        },
        {
          type: "paragraph",
          text: "DanSebo Global Services Ltd — providing volunteer resource persons and logistical support",
          bold: false,
        },
        {
          type: "paragraph",
          text: "ShineGirl Africa — supporting our work with young girls across partner schools",
          bold: false,
        },
        {
          type: "paragraph",
          text: "Blossomine Foundation — supporting learning materials and student welfare",
          bold: false,
        },
        {
          type: "image",
          src: "/impact/skills-training-3.jpg",
          alt: "Partner logos — MindUpgrade, Johnnie Boy's Foundation, ShineGirl Africa, DanSebo, Blossomine",
          variant: "full",
          width: "full",
        },
        {
          type: "image",
          src: "/slides/IMG_0012.jpg",
          alt: "Team and students posing with the 50 Schools Journey to Purpose banner",
          variant: "full",
          width: "full",
        },
        {
          type: "divider",
          style: "line",
        },

        // ── Future Skills & Mentorship Program ─────────────────────────────
        {
          type: "heading",
          level: 2,
          text: "Future Skills & Mentorship Program",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "Building on the momentum of the 50 Schools Journey to Purpose Initiative, Johnnie Boy's Foundation and its partners launched the Future Skills & Mentorship Programme — a structured, completely FREE training programme for selected students who have been reached through our school outreaches.",
          bold: false,
        },
        {
          type: "image",
          src: "/impact/skills-training-1.jpg",
          alt: "Students working on laptops during the Future Skills training programme",
          variant: "full",
          width: "full",
        },
        {
          type: "heading",
          level: 3,
          text: "Programme Details",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "Duration: August 2026 • Twice weekly (Tuesday & Thursday) • 2 hours per session",
          bold: false,
        },
        {
          type: "heading",
          level: 3,
          text: "Training Areas",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "Artificial Intelligence (AI) • AI Automation • Graphic Design • Photography • Content Creation • Social Media Management • Entrepreneurship • Leadership • Data Analysis • Purpose Discovery • Career Development",
          bold: false,
        },
        {
          type: "image",
          src: "/impact/school-session-2.jpg",
          alt: "Students and mentor working together on a laptop during training",
          variant: "full",
          width: "full",
        },
        {
          type: "image",
          src: "/impact/skills-training-3.jpg",
          alt: "Computer lab session during the Future Skills & Mentorship Programme",
          variant: "full",
          width: "full",
        },
        {
          type: "heading",
          level: 3,
          text: "What Participants Receive",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "Hands-on training from experienced facilitators • One-on-one and group mentorship • Real, hands-on projects • A Certificate of Completion",
          bold: false,
        },
        {
          type: "image",
          src: "/impact/skills-training-1.jpg",
          alt: "Mentor guiding students through a practical exercise on a laptop",
          variant: "full",
          width: "full",
        },
        {
          type: "divider",
          style: "line",
        },

        // ── Why This Matters ───────────────────────────────────────────────
        {
          type: "heading",
          level: 2,
          text: "Why This Matters",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "For many students in the communities we serve, opportunities like the Future Skills & Mentorship Program simply do not exist. Without exposure to AI, digital skills, entrepreneurship or structured mentorship, countless capable young people will finish school without ever discovering what they are truly capable of.",
          bold: false,
        },
        {
          type: "paragraph",
          text: "Investing in one student does not just change that student — it changes a household. A young person equipped with purpose, skills and confidence becomes a source of income, guidance and hope for their family. Multiply that across hundreds of students and you begin to see how mentoring young people today quietly builds the stronger, more resilient communities of tomorrow.",
          bold: false,
        },
        {
          type: "image",
          src: "/hero.jpeg",
          alt: "Facilitator speaking to students about purpose and future possibilities",
          variant: "full",
          width: "full",
        },
        {
          type: "divider",
          style: "line",
        },

        // ── Your Support So Far ────────────────────────────────────────────
        {
          type: "heading",
          level: 2,
          text: "Your Support So Far",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "Every programme Johnnie Boy's Foundation runs — from the 50 Schools Journey to Purpose Initiative to the Future Skills & Mentorship Programme — is offered completely free to students. This is only possible because of partners who believe in investing in young people.",
          bold: false,
        },
        {
          type: "paragraph",
          text: "Your partnership has helped us provide: Training venues, materials and equipment • Internet access for digital skills training • Project materials for hands-on learning • Learning resources and books • Certificates of completion • Student refreshments during sessions • Transportation to and from partner schools • Ongoing mentorship support • Expansion of the initiative to more schools and states • Payment of stipends to qualified mentors and resource persons",
          bold: false,
        },
        {
          type: "image",
          src: "/impact/school-session-2.jpg",
          alt: "Students and mentors at a Future Skills & Mentorship Programme session",
          variant: "full",
          width: "full",
        },
        {
          type: "image",
          src: "/slides/IMG_0012.jpg",
          alt: "Students and mentor posing during a training session",
          variant: "full",
          width: "full",
        },
        {
          type: "divider",
          style: "line",
        },

        // ── Closing ────────────────────────────────────────────────────────
        {
          type: "heading",
          level: 2,
          text: "Closing",
          alignment: "left",
        },
        {
          type: "paragraph",
          text: "Together, we can raise a generation of purpose-driven leaders, innovators, entrepreneurs, and problem-solvers who will transform our communities and our nation.",
          bold: false,
        },
        {
          type: "cta",
          text: "Partner With Us",
          href: "/contact",
          style: "primary",
        },
      ],
    },
  });

  console.log("✅ Bloom initiative created:", bloom.id);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
