import React, { useEffect, useState } from "react";
import "./Feed.css";
import thumbnails from "../../assets/defaultThumbnails.png";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

function Feed({ category }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
      const res = await fetch(videoList_url);

      if (!res.ok) {
        if (res.status === 403) {
          throw new Error("Access Forbidden - Check API Key or Quota");
        }
        throw new Error(`server Error:${res.status}`);
      }

      const data = await res.json();
      setData(data.items || []);
    } catch (err) {
      console.error("API Error:", err);
      setError("Something Went wrong. Please try again......");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feeds">
      {loading && <p className="loadingMess">Loading videos....</p>}

      {error && <p className="errormess">{error}</p>}

      {!loading &&
        !error &&
        data.map((items, index) => {
          return (
            <Link
              to={`video/${items.snippet.categoryId}/${items.id}`}
              key={items.id}
              className="Card"
            >
              <img
                src={items.snippet.thumbnails.medium.url || thumbnails}
                alt=""
              />
              <h2>{items.snippet.title}</h2>
              <h3>{items.snippet.channelTitle}</h3>
              <p>
                {value_converter(items.statistics.viewCount)} &bull;{" "}
                {moment(items.snippet.publishedAt).fromNow()}
              </p>
            </Link>
          );
        })}
    </div>
  );
}
//
export default Feed;
