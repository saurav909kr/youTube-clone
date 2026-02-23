import React, { useEffect, useState } from "react";
import "./Feed.css";
// import { value_converter } from "../../data";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

function Feed({ category }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then((response) => response.json())
      .then((data) => setData(data.items));
  };
  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feeds">
      {data.map((items, index) => {
        return (
          <Link to={`video/${items.snippet.categoryId}/${items.id}`} key={items.id} className="Card">
            <img src={items.snippet.thumbnails.medium.url} alt="" />
             <h2>{items.snippet.title}</h2>
            <h3>{items.snippet.channelTitle}</h3>
            <p>{value_converter(items.statistics.viewCount)} &bull; {moment(items.snippet.publishedAt).fromNow()}</p>
          </Link>
        )
      })}
    </div>
  );
}

export default Feed;
