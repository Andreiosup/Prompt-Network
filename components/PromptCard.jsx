"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const PromptCard = ({ postData, handleTagClick, handleEdit, handleDelete }) => {
  const {data:session} = useSession();
  const pathName = usePathname();
  const router= useRouter()

  const [copiedPrompt, setCopiedPrompt] = useState("");

  const handleProfileClick = () => {};

  const handleCopy = () => {
    setCopiedPrompt(postData.prompt);
    navigator.clipboard.writeText(postData.prompt);
    setTimeout(() => setCopiedPrompt(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5'">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={postData.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {postData.creator.username}{" "}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {postData.creator.email}{" "}
            </p>
          </div>
        </div>
        <div
          className="copy_button"
          onClick={() => {
            handleCopy();
          }}
        >
          <Image
            src={
              copiedPrompt === postData.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copiedPrompt === postData.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {postData.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(postData.tag)}
      >
        #{postData.tag}
      </p>
      {session?.user?.id === postData.creator._id && pathName === "/profile" && (
        <div className="mt-5 gap-4 flex-center border-t border-gray-100 pt-3">
          <p className="font-inter text-sm cursor-pointer" onClick={()=>{handleEdit()}}>
            EDIT
          </p>
          <p className="font-inter text-sm cursor-pointer" onClick={()=>{handleDelete()}}>
            DELETE
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
