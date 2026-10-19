
"use server";

import { redirect } from "next/navigation";
import { db } from "./db";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    !title.trim() ||
    !content.trim()
  ) {
    throw new Error("Title болон Content заавал бөглөнө үү.");
  }

  await db.execute(
    "INSERT INTO blog_posts (title, content) VALUES (?, ?)",
    [title.trim(), content.trim()]
  );

  revalidatePath("/blog");
  redirect("/blog");
}

export async function deletePost(formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    throw new Error("Post ID буруу байна.");
  }

  await db.execute("DELETE FROM blog_posts WHERE id = ?", [Number(id)]);

  redirect("/blog");
}
