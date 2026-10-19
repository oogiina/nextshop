
import { Suspense } from "react";
import BlogList from "./BlogList";
import BlogListSkeleton from "./BlogListSkeleton";
import { createPost } from "../lib/action";

export default function BlogPage() {
  return (
    <div className="blog-page">
      <header className="blog-header">
        <h1>Blog</h1>

        <p className="blog-description">
          Latest stories, ideas and useful information.
        </p>
      </header>

      {/* Шинэ пост үүсгэх форм */}
      <section className="create-post">
        <h2>Create a Post</h2>

        <form action={createPost}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              required
              placeholder="Post title"
            />
          </div>

          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              required
              placeholder="Write your post..."
            />
          </div>

          <button type="submit">Create Post</button>
        </form>
      </section>

      {/* Блогийн жагсаалт */}
      <main className="blog-main">
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList />
        </Suspense>
      </main>
    </div>
  );
}
