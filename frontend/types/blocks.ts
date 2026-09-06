// ─── Extended Content Block Types ─────────────────────────────────────────────
// Extends the existing gallery-data types with variant fields and new block types

export type HeadingAlignment = "left" | "center";
export type ImageVariant = "full" | "contained" | "with-caption";
export type ImageGalleryVariant = "grid-2" | "grid-3" | "carousel";
export type BlockquoteVariant = "centered-large" | "sidebar-style";
export type CtaStyle = "primary" | "secondary" | "outline";
export type DividerStyle = "line" | "dots" | "gradient";

export interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3;
  text: string;
  alignment?: HeadingAlignment;
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
  variant?: ImageVariant;
  width?: "full" | "two-thirds" | "half";
}

export interface ImageGalleryBlock {
  type: "image-gallery";
  images: { src: string; alt: string; caption?: string }[];
  variant?: ImageGalleryVariant;
}

export interface VideoEmbedBlock {
  type: "video-embed";
  url: string;
  title?: string;
}

export interface YoutubeBlock {
  type: "youtube";
  youtubeId: string;
}

export interface BlockquoteBlock {
  type: "blockquote";
  text: string;
  attribution?: string;
  variant?: BlockquoteVariant;
}

export interface CtaBlock {
  type: "cta";
  text: string;
  href: string;
  style?: CtaStyle;
}

export interface TwoColumnBlock {
  type: "two-column";
  left: ContentBlock[];
  right: ContentBlock[];
}

export interface DividerBlock {
  type: "divider";
  style?: DividerStyle;
}

export interface SpacerBlock {
  type: "spacer";
  height?: "sm" | "md" | "lg";
}

export interface StatsHighlightBlock {
  type: "stats-highlight";
  stats: { number: string; label: string }[];
  variant?: "grid-2" | "grid-3" | "grid-4";
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | ImageGalleryBlock
  | VideoEmbedBlock
  | YoutubeBlock
  | BlockquoteBlock
  | CtaBlock
  | TwoColumnBlock
  | DividerBlock
  | SpacerBlock
  | StatsHighlightBlock;

// ─── Block Metadata (for editor) ─────────────────────────────────────────────

export interface BlockTypeMeta {
  type: ContentBlock["type"];
  label: string;
  icon: string;
  description: string;
  defaults: Record<string, unknown>;
}

export const BLOCK_TYPES: BlockTypeMeta[] = [
  {
    type: "heading",
    label: "Heading",
    icon: "H",
    description: "Section title",
    defaults: { level: 2, text: "New heading", alignment: "left" },
  },
  {
    type: "paragraph",
    label: "Paragraph",
    icon: "¶",
    description: "Body text",
    defaults: { text: "Write your content here..." },
  },
  {
    type: "image",
    label: "Image",
    icon: "🖼",
    description: "Single image with optional caption",
    defaults: { src: "", alt: "", variant: "full", caption: "" },
  },
  {
    type: "image-gallery",
    label: "Image Gallery",
    icon: "⊞",
    description: "Multiple images in a grid or carousel",
    defaults: { images: [], variant: "grid-3" },
  },
  {
    type: "video-embed",
    label: "Video Embed",
    icon: "▶",
    description: "YouTube or Vimeo video",
    defaults: { url: "", title: "" },
  },
  {
    type: "blockquote",
    label: "Quote",
    icon: "“",
    description: "Blockquote with attribution",
    defaults: { text: "Quote text", attribution: "", variant: "centered-large" },
  },
  {
    type: "cta",
    label: "CTA Button",
    icon: "→",
    description: "Call-to-action button",
    defaults: { text: "Click here", href: "#", style: "primary" },
  },
  {
    type: "two-column",
    label: "Two Columns",
    icon: "⠿",
    description: "Side-by-side content layout",
    defaults: { left: [], right: [] },
  },
  {
    type: "divider",
    label: "Divider",
    icon: "—",
    description: "Visual separator",
    defaults: { style: "line" },
  },
  {
    type: "spacer",
    label: "Spacer",
    icon: "↕",
    description: "Vertical spacing",
    defaults: { height: "md" },
  },
  {
    type: "stats-highlight",
    label: "Stats Highlight",
    icon: "#",
    description: "Number + label impact figures",
    defaults: {
      stats: [
        { number: "100+", label: "Boys Served" },
        { number: "30+", label: "Mentors" },
      ],
      variant: "grid-3",
    },
  },
];
