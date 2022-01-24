import { gql, GraphQLClient } from "graphql-request"
import type { NextApiRequest, NextApiResponse } from "next"

const graphqlAPI: string = `${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT}`;

const comments = async (req: NextApiRequest, res: NextApiResponse) => {

    const graphQLClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
        }
    })

    const query = gql`
        mutation CreateComment (
            $name: String!
            $email: String!
            $comment: String!
            $slug: String!
        ) {
            createComment(
                data: {
                    name: $name
                    email: $email
                    comment: $comment
                    post: { connect : {slug: $slug}}
                }
            ) {
                id
            }
        }
    `;

    try {
        const result = await graphQLClient.request(query, req.body);

        try {
            const commentId = result.createComment.id;

            const publishComment = gql`
                mutation PublishComment($id: ID!) {
                    publishComment(where: {id: $id}, to: PUBLISHED) {
                        id
                    }
                }
            `;

            const publishResult = await graphQLClient.request(publishComment, { id: commentId });

            res.status(200).send(publishResult)

        } catch (error) {
            res.status(400).send(error)

        }

    } catch (error) {
        res.status(500).send(error)
    }
}

export default comments