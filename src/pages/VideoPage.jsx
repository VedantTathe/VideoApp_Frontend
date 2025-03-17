import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VideoPage() {
  const { videoid } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await axios.get(`https://adaptable-delight-production.up.railway.app/api/videos/${videoid}`);
        setVideoUrl(convertToEmbedUrl(response.data.videoUrl));
        setWebsiteUrl(response.data.websiteUrl);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideoUrl();
  }, [videoid]);

  const convertToEmbedUrl = (youtubeUrl) => {
    const match = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : youtubeUrl;
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 text-white">
      <div className="w-full max-w-3xl text-center ">
        <h2 className="text-2xl font-bold my-4">YouTube Video Player</h2>
        
        <div className="text-left my-5">
          
        <h5><span className="text-lg font-bold ">Portfolio Website: </span><a className="text-blue-500" href="https://vedanttathe.netlify.app" target="_blank">https://vedanttathe.netlify.app</a></h5>
        
        {websiteUrl ? (<h5><span className="text-lg font-bold ">Hosted Website Link: </span><a className="text-blue-500" href={websiteUrl} target="_blank">{websiteUrl}</a></h5>):(<p></p> )}
        
        </div>

        {videoUrl ? (
          <iframe
            src={videoUrl}
            title="YouTube Video"
            width="100%"
            height="500px"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-md shadow-lg"
          />
        ) : (
          <p className="text-red-500">Loading video...</p>
        )}
      </div>
    </div>
  );
}

export default VideoPage;
