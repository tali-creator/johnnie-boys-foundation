"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockRenderer } from "@/components/block-renderer";
import { BLOCK_TYPES, type ContentBlock } from "@/types/blocks";
import { GripVertical, Plus, Trash2, X, ChevronDown } from "lucide-react";

function SortableBlock({
  block,
  index,
  activeIndex,
  onUpdate,
  onRemove,
  onSetActive,
}: {
  block: ContentBlock;
  index: number;
  activeIndex: number | null;
  onUpdate: (index: number, block: ContentBlock) => void;
  onRemove: (index: number) => void;
  onSetActive: (index: number | null) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
    opacity: isDragging ? 0.8 : 1,
  };

  const meta = BLOCK_TYPES.find((b) => b.type === block.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border bg-card transition ${
        activeIndex === index
          ? "border-accent shadow-md"
          : "border-border hover:border-accent/50"
      }`}
    >
      <div
        className="flex cursor-pointer items-center gap-3 border-b border-border px-4 py-3"
        onClick={() => onSetActive(activeIndex === index ? null : index)}
      >
        <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground">
          <GripVertical size={16} />
        </button>
        <span className="rounded bg-muted px-2 py-0.5 text-xs font-bold">
          {meta?.icon}
        </span>
        <span className="text-sm font-semibold">{meta?.label || block.type}</span>
        <div className="flex-1" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(index);
          }}
          className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 size={14} />
        </button>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform ${
            activeIndex === index ? "rotate-180" : ""
          }`}
        />
      </div>

      {activeIndex === index && (
        <div className="border-t border-border p-4">
          <BlockEditor
            block={block}
            onChange={(updated) => onUpdate(index, updated)}
          />
        </div>
      )}
    </div>
  );
}

function BlockEditor({
  block,
  onChange,
}: {
  block: ContentBlock;
  onChange: (b: ContentBlock) => void;
}) {
  const update = (field: string, value: any) => {
    onChange({ ...block, [field]: value } as ContentBlock);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent";
  const selectClass =
    "rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent";

  switch (block.type) {
    case "heading":
      return (
        <div className="flex flex-col gap-3">
          <input
            value={block.text}
            onChange={(e) => update("text", e.target.value)}
            className={inputClass}
            placeholder="Heading text"
          />
          <div className="flex gap-3">
            <select
              value={block.level}
              onChange={(e) => update("level", Number(e.target.value))}
              className={selectClass}
            >
              <option value={1}>H1</option>
              <option value={2}>H2</option>
              <option value={3}>H3</option>
            </select>
            <select
              value={block.alignment || "left"}
              onChange={(e) => update("alignment", e.target.value)}
              className={selectClass}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
            </select>
          </div>
        </div>
      );

    case "paragraph":
      return (
        <div className="flex flex-col gap-3">
          <textarea
            value={block.text}
            onChange={(e) => update("text", e.target.value)}
            rows={4}
            className={inputClass}
            placeholder="Write content..."
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={block.bold || false}
              onChange={(e) => update("bold", e.target.checked)}
              className="rounded"
            />
            Bold
          </label>
        </div>
      );

    case "image":
      return (
        <div className="flex flex-col gap-3">
          <input
            value={block.src}
            onChange={(e) => update("src", e.target.value)}
            className={inputClass}
            placeholder="Image URL"
          />
          <input
            value={block.alt}
            onChange={(e) => update("alt", e.target.value)}
            className={inputClass}
            placeholder="Alt text"
          />
          <input
            value={block.caption || ""}
            onChange={(e) => update("caption", e.target.value)}
            className={inputClass}
            placeholder="Caption (optional)"
          />
          <div className="flex gap-3">
            <select
              value={block.variant || "full"}
              onChange={(e) => update("variant", e.target.value)}
              className={selectClass}
            >
              <option value="full">Full Width</option>
              <option value="contained">Contained</option>
              <option value="with-caption">With Caption</option>
            </select>
            <select
              value={block.width || "full"}
              onChange={(e) => update("width", e.target.value)}
              className={selectClass}
            >
              <option value="full">Full</option>
              <option value="two-thirds">Two Thirds</option>
              <option value="half">Half</option>
            </select>
          </div>
        </div>
      );

    case "image-gallery":
      return (
        <div className="flex flex-col gap-3">
          <select
            value={block.variant || "grid-3"}
            onChange={(e) => update("variant", e.target.value)}
            className={selectClass}
          >
            <option value="grid-2">Grid 2 Columns</option>
            <option value="grid-3">Grid 3 Columns</option>
            <option value="carousel">Carousel</option>
          </select>
          {(block.images || []).map((img: any, i: number) => (
            <div key={i} className="flex gap-2">
              <input
                value={img.src}
                onChange={(e) => {
                  const imgs = [...(block.images || [])];
                  imgs[i] = { ...imgs[i], src: e.target.value };
                  update("images", imgs);
                }}
                className={inputClass}
                placeholder="Image URL"
              />
              <input
                value={img.alt}
                onChange={(e) => {
                  const imgs = [...(block.images || [])];
                  imgs[i] = { ...imgs[i], alt: e.target.value };
                  update("images", imgs);
                }}
                className={inputClass}
                placeholder="Alt"
              />
              <button
                onClick={() => {
                  const imgs = (block.images || []).filter(
                    (_: any, j: number) => j !== i
                  );
                  update("images", imgs);
                }}
                className="shrink-0 rounded p-2 text-destructive hover:bg-destructive/10"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const imgs = [
                ...(block.images || []),
                { src: "", alt: "", caption: "" },
              ];
              update("images", imgs);
            }}
            className="text-sm font-bold text-accent hover:underline"
          >
            + Add Image
          </button>
        </div>
      );

    case "video-embed":
      return (
        <div className="flex flex-col gap-3">
          <input
            value={block.url}
            onChange={(e) => update("url", e.target.value)}
            className={inputClass}
            placeholder="YouTube or Vimeo URL"
          />
          <input
            value={block.title || ""}
            onChange={(e) => update("title", e.target.value)}
            className={inputClass}
            placeholder="Video title"
          />
        </div>
      );

    case "blockquote":
      return (
        <div className="flex flex-col gap-3">
          <textarea
            value={block.text}
            onChange={(e) => update("text", e.target.value)}
            rows={3}
            className={inputClass}
            placeholder="Quote text"
          />
          <input
            value={block.attribution || ""}
            onChange={(e) => update("attribution", e.target.value)}
            className={inputClass}
            placeholder="Attribution (optional)"
          />
          <select
            value={block.variant || "centered-large"}
            onChange={(e) => update("variant", e.target.value)}
            className={selectClass}
          >
            <option value="centered-large">Centered Large</option>
            <option value="sidebar-style">Sidebar Style</option>
          </select>
        </div>
      );

    case "cta":
      return (
        <div className="flex flex-col gap-3">
          <input
            value={block.text}
            onChange={(e) => update("text", e.target.value)}
            className={inputClass}
            placeholder="Button text"
          />
          <input
            value={block.href}
            onChange={(e) => update("href", e.target.value)}
            className={inputClass}
            placeholder="Link URL"
          />
          <select
            value={block.style || "primary"}
            onChange={(e) => update("style", e.target.value)}
            className={selectClass}
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="outline">Outline</option>
          </select>
        </div>
      );

    case "two-column":
      return (
        <p className="text-sm text-muted-foreground">
          Edit left and right column content by adding blocks within each side.
        </p>
      );

    case "divider":
      return (
        <select
          value={block.style || "line"}
          onChange={(e) => update("style", e.target.value)}
          className={selectClass}
        >
          <option value="line">Line</option>
          <option value="dots">Dots</option>
          <option value="gradient">Gradient</option>
        </select>
      );

    case "spacer":
      return (
        <select
          value={block.height || "md"}
          onChange={(e) => update("height", e.target.value)}
          className={selectClass}
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      );

    case "stats-highlight":
      return (
        <div className="flex flex-col gap-3">
          <select
            value={block.variant || "grid-3"}
            onChange={(e) => update("variant", e.target.value)}
            className={selectClass}
          >
            <option value="grid-2">2 Columns</option>
            <option value="grid-3">3 Columns</option>
            <option value="grid-4">4 Columns</option>
          </select>
          {(block.stats || []).map((stat: any, i: number) => (
            <div key={i} className="flex gap-2">
              <input
                value={stat.number}
                onChange={(e) => {
                  const stats = [...(block.stats || [])];
                  stats[i] = { ...stats[i], number: e.target.value };
                  update("stats", stats);
                }}
                className={inputClass}
                placeholder="Number"
              />
              <input
                value={stat.label}
                onChange={(e) => {
                  const stats = [...(block.stats || [])];
                  stats[i] = { ...stats[i], label: e.target.value };
                  update("stats", stats);
                }}
                className={inputClass}
                placeholder="Label"
              />
              <button
                onClick={() => {
                  const stats = (block.stats || []).filter(
                    (_: any, j: number) => j !== i
                  );
                  update("stats", stats);
                }}
                className="shrink-0 rounded p-2 text-destructive hover:bg-destructive/10"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const stats = [
                ...(block.stats || []),
                { number: "0", label: "New Stat" },
              ];
              update("stats", stats);
            }}
            className="text-sm font-bold text-accent hover:underline"
          >
            + Add Stat
          </button>
        </div>
      );

    default:
      return null;
  }
}

export default function PostEditor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("EVENT");
  const [coverImage, setCoverImage] = useState("");
  const [author, setAuthor] = useState("Johnnie Boy's Foundation");
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addBlock = (type: ContentBlock["type"]) => {
    const meta = BLOCK_TYPES.find((b) => b.type === type);
    if (!meta) return;
    const newBlock = { ...meta.defaults, type } as ContentBlock;
    setBlocks((prev) => [...prev, newBlock]);
    setShowPicker(false);
    setActiveIndex(blocks.length);
  };

  const updateBlock = (index: number, block: ContentBlock) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? block : b)));
  };

  const removeBlock = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
    setActiveIndex(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setBlocks((items) => {
        const oldIndex = active.id as number;
        const newIndex = over!.id as number;
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = document.cookie
        .split("; ")
        .find((c) => c.startsWith("jbf_admin_token="))
        ?.split("=")[1];

      await fetch(`${API_URL}/api/admin/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          coverImage,
          author,
          content: blocks,
        }),
      });

      alert("Post saved!");
    } catch (error) {
      alert("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">New Post</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Build your post with drag-and-drop content blocks
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className="rounded-lg border border-border px-4 py-2 text-sm font-bold transition hover:bg-muted"
          >
            {preview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-accent px-6 py-2 text-sm font-bold text-accent-foreground transition hover:bg-accent/90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor */}
        <div className="space-y-4">
          {/* Meta Fields */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-col gap-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-lg font-bold outline-none focus:ring-2 focus:ring-accent"
                placeholder="Post title"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
                placeholder="Short description"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="EVENT">Event</option>
                  <option value="PROGRAM">Program</option>
                  <option value="ACTIVITY">Activity</option>
                  <option value="NEWS">News</option>
                  <option value="MILESTONE">Milestone</option>
                </select>
                <input
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Cover image URL"
                />
              </div>
            </div>
          </div>

          {/* Blocks */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map((_, i) => i)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {blocks.map((block, index) => (
                  <SortableBlock
                    key={index}
                    block={block}
                    index={index}
                    activeIndex={activeIndex}
                    onUpdate={updateBlock}
                    onRemove={removeBlock}
                    onSetActive={setActiveIndex}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Add Block */}
          <div className="relative">
            <button
              onClick={() => setShowPicker(!showPicker)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-4 text-sm font-bold text-muted-foreground transition hover:border-accent hover:text-accent"
            >
              <Plus size={18} />
              Add Block
            </button>

            {showPicker && (
              <div className="absolute inset-x-0 top-full z-20 mt-2 rounded-xl border border-border bg-card p-3 shadow-xl">
                <div className="grid grid-cols-3 gap-2">
                  {BLOCK_TYPES.map((bt) => (
                    <button
                      key={bt.type}
                      onClick={() => addBlock(bt.type)}
                      className="flex flex-col items-center gap-1 rounded-lg border border-border p-3 text-center transition hover:border-accent hover:bg-accent/5"
                    >
                      <span className="text-lg">{bt.icon}</span>
                      <span className="text-xs font-bold">{bt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Preview
            </h2>
            <article>
              {title && (
                <h1 className="font-serif text-3xl font-bold">{title}</h1>
              )}
              {description && (
                <p className="mt-2 text-muted-foreground">{description}</p>
              )}
              <div className="my-4 h-px bg-border" />
              <BlockRenderer blocks={blocks} />
            </article>
          </div>
        )}
      </div>
    </div>
  );
}
