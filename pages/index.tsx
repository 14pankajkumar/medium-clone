import { GetStaticProps } from "next";
import Head from "next/head";
import { Banner, Header, Posts } from "../components";
import { getPosts } from "../graphql";
import { Post } from "../graphql/typing";

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  return (
    <div className="max-w-5xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Banner */}
      <Banner />

      {/* Posts */}
      <Posts posts={posts} />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};
