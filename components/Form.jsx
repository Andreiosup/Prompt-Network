import React from "react";
import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handleSubmit,session }) => {
  return (
    
    <div className="w-full max-w-full flex-start flex-col">
      {session?.user ?(
        <>
      <h1 className="head_text text-left">
        {type} <span className="blue_gradient">Prompt</span>
      </h1>
          <p className="desc text-left max-w-md">
            {type} and share your prompts from here
          </p>

          <form
            className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            onSubmit={handleSubmit}
          >
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Your prompt
              </span>
              <textarea
                className="form_textarea"
                value={post.prompt}
                onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                placeholder="Write your post here"
                required
              ></textarea>
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Your tag
                <span className="font-normal">
                  (#product, #webdevelopment, #idea, etc.)
                </span>
              </span>
              <input
                className="form_input"
                value={post.tag}
                placeholder="#tag"
                onChange={(e) => setPost({ ...post, tag: e.target.value })}
                required
              ></input>
            </label>

            <div className="flex-end mx-3 mb-5 gap-4">
              <Link href="/">Cancel</Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-1.5 text-sm bg-black rounded-full text-white"
              >
                {submitting ? `${type}ing...` : type}
              </button>
            </div>
          </form>
        </>
      ):(
        <h1>You have to be signed in to create a prompt</h1>
      )}
    </div>
  );
};

export default Form;
