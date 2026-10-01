type Post = {
  id: number;
  title: string;
  content: string;
};

export default async function BlogList() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await fetch("https://api.vercel.app/blog");
  const posts: Post[] = await data.json();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  );
}