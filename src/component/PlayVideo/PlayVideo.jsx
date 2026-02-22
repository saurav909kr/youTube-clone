import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import { API_KEY, value_converter } from "../../data";
import user_profile from "../../assets/user_profile.jpg";
import { data } from "react-router-dom";
import moment from "moment";

function PlayVideo({ videoId }) {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);

  // const fetchVideoData = async () => {
  //   const videodetail_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
  //   await fetch(videodetail_url)
  //     .then((response) => response.json())
  //     .then((data) => setApiData(data.items[0]));
  // };

  const fetchVideoData = async () => {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
    );

    const data = await response.json();
    setApiData(data.items[0]);
  } catch (error) {
    console.error("Video fetch error:", error);
    // setApiData([])
  }
};

  // const fetchchannelData = async () => {
  //   const channeldetail_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
  //   await fetch(channeldetail_url)
  //     .then((response) => response.json())
  //     .then((data) => setChannelData(data.items[0]));
  // };

  const fetchchannelData = async () => {
  if (!apiData) return;

  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
    );

    const data = await response.json();
    setChannelData(data.items[0]);
  } catch (error) {
    console.error("Channel fetch error:", error);
    // setApiData([])
  }
};

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (!apiData) {
      fetchchannelData();
    }
  }, [apiData]);

  if (!apiData) {
    return <div className="play-video">Loading...</div>;
  }

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      {/* <h3>{apiData?apiData.snippet.title:"Title Here"}</h3> */}
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "16k"}{" "}
          &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : ""}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span> 1M subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid_discription">
        <p>
          {apiData ? apiData.snippet.description.slice(0, 250) : "Description"}
        </p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : 102}{" "}
          Comments
        </h4>
        <div className="comments">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Arjun <span>1 days ago</span>
            </h3>
            <p> nice</p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comments">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Arjun <span>1 days ago</span>
            </h3>
            <p> nice</p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comments">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Arjun <span>1 days ago</span>
            </h3>
            <p> nice</p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comments">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Arjun <span>1 days ago</span>
            </h3>
            <p> nice</p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayVideo;
