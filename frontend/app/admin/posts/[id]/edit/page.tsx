"use client";

import { use } from "react";
import EditPostPage from "./editor";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <EditPostPage postId={id} />;
}
