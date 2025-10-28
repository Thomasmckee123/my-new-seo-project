import { blogPosts } from "@/app/lib/data/blog-posts";
import FitnessBlogCard from "./components/FitnessBlogCard";

const HomePage = () => {
  return (
    <>
      <div>Welcome to the Homepage</div>

      <div className="p-20 w-2/6">
        {blogPosts.map((post) => {
          return (
            <FitnessBlogCard
              key={post.id}
              title={post.title}
              description={post.slug}
            />
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
