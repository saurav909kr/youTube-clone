import React, { useEffect, useState } from "react";
import "./Recommanded.css";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";

function Recommanded({ categoryId }) {
  const [apidata, setApiData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=35&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
      const res = await fetch(relatedVideo_url);

      if (!res.ok) {
        throw new Error("Server Error");
      }

      const data = await res.json();
      setApiData(data.items);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load videos");
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);
  return (
    <div className="recommanded">
      { error && <p style={{ color: "red" }}>{error}</p>}
      {apidata.map((item, index) => {
        return (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            key={index}
            className="side-video-li"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="video-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Recommanded;
