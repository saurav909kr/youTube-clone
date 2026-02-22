import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../component/sidebar/sidebar";
import Feed from "../../component/feed/Feed";

function Home({ sidebar }) {
  const [category , setCategory] = useState(0);
  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
      <div className={`container ${sidebar ? "" : "large-conatiner"}`}>
        <Feed category = {category}/>
      </div>
    </>
  );
}

export default Home;
