import Link from "next/link";
import { Post } from "../graphql/typing";

interface Props {
  posts: [Post];
}

const Posts = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
      {posts.map((post) => {
        return (
          <Link key={post.node.slug} href={`/post/${post.node.slug}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition transform duration-200 ease-in-out"
                src={post.node.featuredImage.url}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div className="w-full h-full">
                  <p className="text-lg font-bold">{post.node.title} </p>
                  <p className="text-xs">
                    {post.node.excerpt} by {post.node.author.name}
                  </p>
                </div>

                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={post.node.author.photo.url}
                  alt=""
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Posts;
