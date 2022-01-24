import { Comments } from "../graphql/typing";

interface Props {
  comments: [Comments];
}

const CommentsBox = ({ comments }: Props) => {
  return (
    <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
      <h3 className="text-4xl">Comments</h3>
      <hr className="pb-2" />

      {comments.map((comment) => (
        <div key={comment.id}>
          <p>
            <span className="text-yellow-500">{comment.name}: </span>
            <span className="text-sm mr-2">
              {new Date(comment.createdAt).toDateString()}
            </span>
          </p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsBox;
