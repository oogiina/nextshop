
import { db } from "../lib/db";
import type { RowDataPacket } from "mysql2";
import { deletePost } from "../lib/action";

interface Post extends RowDataPacket {
  id: number;
  title: string;
  content: string;
}

export default async function BlogList() {
  const [posts] = await db.query<Post[]>(
    "SELECT id, title, content FROM blog_posts ORDER BY id DESC LIMIT 50"
  );

  if (posts.length === 0) {
    return <p>Одоогоор нийтлэл алга байна.</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>

          <form action={deletePost}>
            <input type="hidden" name="id" value={post.id} />
            <button type="submit">Delete Post</button>
          </form>
        </li>
      ))}
    </ul>
  );
}
