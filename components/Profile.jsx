"use client"
import PromptCard from "./PromptCard";

const Profile = ({ name, posts, handleEdit, handleDelete }) => {
  
  return (
    <section className="w-full">
      <h1 className="head_text text-left">{name} <span className="blue_gradient">Profile</span></h1>
      <div className="mt-10 prompt_layout">
        {posts && posts.map((post) => (
          <PromptCard
            key={post._id}
            postData={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
    
      </div>
    </section>
  );
};

export default Profile;
