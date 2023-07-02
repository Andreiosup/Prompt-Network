"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import { set } from "mongoose";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId= searchParams.get("id")

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    getPromptDetails()
    console.log(post)  
  }, [promptId]);

  const getPromptDetails = async () => {
    const response = await fetch(`api/prompt/${promptId}`)
    const responseJSON = await response.json();
    setPost({
        prompt: responseJSON.prompt,
        tag: responseJSON.tag,
      });
  }

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!prompt) return alert("Prompt ID not found")

    console.log(post.prompt,post.tag)

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
