export default function BlogListSkeleton() {
  return (
    <ul className="blog-list">
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className="blog-skeleton">
          <div className="skeleton-title" />
          <div className="skeleton-text" />
        </li>
      ))}
    </ul>
  );
}