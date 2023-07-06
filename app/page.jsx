import React from "react";
import Feed from "@components/Feed";

const Home = () => {

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        A creative hub for
        <br className="max-hd:hidden" />
        <span className="blue_gradient text-center">Finding and Sharing Prompts</span>
      </h1>
      <Feed></Feed>
    </section>
  );
};

export default Home;
