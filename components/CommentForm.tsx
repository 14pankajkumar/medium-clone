import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { submitComment } from "../graphql";

interface IFromInput {
  name: string;
  email: string;
  comment: string;
  slug: string;
}

interface Props {
  slug: string;
}

const CommentForm = ({ slug }: Props) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFromInput>();

  const onSubmit: SubmitHandler<IFromInput> = (data) => {
    submitComment(data)
      .then((res) => {
        console.log(res);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
      >
        <h3 className="text-sm text-yellow-500">Enjoyed this article ?</h3>
        <h4 className="text-3xl font-bold">Leave a comment below!</h4>
        <hr className="py-3 mt-2" />

        <input
          {...register("slug", { required: true })}
          type="text"
          value={slug}
          hidden
        />

        <label className="block mb-5">
          <span className="text-gray-700">Name</span>
          <input
            {...register("name", { required: true })}
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
            type="text"
            placeholder="Name"
          />
        </label>
        <label className="block mb-5">
          <span className="text-gray-700">Email</span>
          <input
            {...register("email", { required: true })}
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
            type="email"
            placeholder="Email"
          />
        </label>
        <label className="block mb-5">
          <span className="text-gray-700">Comment</span>
          <textarea
            {...register("comment", { required: true })}
            className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
            rows={8}
            placeholder="Comment"
          />
        </label>

        <div className="flex flex-col p-5">
          {errors.name && (
            <span className="text-red-500">The Name field is required</span>
          )}
          {errors.email && (
            <span className="text-red-500">The Email field is required</span>
          )}
          {errors.comment && (
            <span className="text-red-500">The Comment field is required</span>
          )}
        </div>

        <input
          className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
          type="submit"
        />

        {submitted && (
          <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold">
              Thank you for submitting your comment
            </h3>
          </div>
        )}
      </form>
    </div>
  );
};

export default CommentForm;
