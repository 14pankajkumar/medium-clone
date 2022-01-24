import { gql, request } from "graphql-request";

const graphqlAPI: string = `${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT}`;

export const getPosts = async () => {
  const query = gql`
    query GetPosts {
      postsConnection {
        edges {
          node {
            author {
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: {slug: $slug}) {
        slug
        title
        excerpt
        createdAt
        featuredImage {
          url
        }
        content {
          json
        }
        author {
          name
          bio
          photo {
            url
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.post;
}

export const submitComment = async (obj: object) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj)
  })

  return result.json()
}

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug}}) {
        id
        name
        email
        comment
        createdAt
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
}