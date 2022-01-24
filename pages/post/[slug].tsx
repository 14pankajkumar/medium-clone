import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { CommentForm, CommentsBox, Header } from "../../components";
import { getComments, getPostDetails, getPosts } from "../../graphql";
import { PostDetails, Post, Comments } from "../../graphql/typing";

interface Props {
  post: PostDetails;
  comments: [Comments];
}

const PostDetails = ({ post, comments }: Props) => {
  const getContentFragment = (
    index: number,
    text: any,
    obj: any,
    type: string
  ) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item: string, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item: string, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item: string, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <main>
      <Head>
        <title>Medium Blog - {post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <img
        className="w-full h-40 object-cover"
        src={post.featuredImage.url}
        alt=""
      />

      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.excerpt}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={post.author.photo.url}
            alt=""
          />
          <p className="font-extralight text-sm">
            {" "}
            Blog post by{" "}
            <span className="text-green-600 font-semibold">
              {post.author.name}
            </span>{" "}
            - Published at {new Date(post.createdAt).toDateString()}
          </p>
        </div>

        <div className="mt-10">
          {post.content.json.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemIndex) =>
              getContentFragment(itemIndex, item.text, item, item.text)
            );

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </article>

      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />

      <CommentForm slug={post.slug} />

      <CommentsBox comments={comments} />
    </main>
  );
};

export default PostDetails;

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const post = await getPostDetails(slug);
  const comments = await getComments(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      comments,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.node.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
