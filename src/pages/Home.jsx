import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaCopy, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [videoName, setVideoName] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [videoLinks, setVideoLinks] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);

  const navigate =  useNavigate();
  const isLoggedIn = !!localStorage.getItem("authToken");

  if(!isLoggedIn)
    navigate("/login");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("https://adaptable-delight-production.up.railway.app/api/videos");
        setVideoLinks(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVideo) {
        await axios.post("https://adaptable-delight-production.up.railway.app/api/videos", {
          id: editingVideo.id,
          userid: localStorage.userid,
          videoname: videoName,
          link: videoLink,
        });
        setEditingVideo(null);
      } else {
        await axios.post("https://adaptable-delight-production.up.railway.app/api/videos", {
          userid: localStorage.userid,
          videoname: videoName,
          link: videoLink,
        });
      }
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Failed to save video. Please try again.");
    }
    
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://adaptable-delight-production.up.railway.app/api/videos/${id}`);
      setVideoLinks(videoLinks.filter((video) => video.id !== id));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setVideoName(video.videoname);
    setVideoLink(video.link);
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_WEBSITE_URL}video/${id}`)
      .then(() => alert("Link copied to clipboard!"))
      .catch((error) => console.error("Failed to copy link:", error));
  };

  const handleView = (id) => {
    navigate(`/video/${id}`);
  };  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black p-6">
      <h2 className="text-3xl font-bold text-green-400 mb-6">Upload Your Video</h2>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-white">
        <input
          type="text"
          placeholder="Enter Video Name"
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          placeholder="Paste Google Drive link here"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-md mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button type="submit" className="w-full p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
          {editingVideo ? "Update Video" : "Submit Video"}
        </button>
      </form>

      <div className="mt-6 w-full max-w-2xl">
        <h3 className="text-xl font-semibold text-green-400 mb-4">Uploaded Videos</h3>
        {videoLinks.length === 0 ? (
          <p className="text-center text-lg text-gray-400">No videos available</p>
        ) : (
          <ul className="space-y-4">
            {videoLinks.map((video) => (
              <li key={video.id} className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center text-white">
                <div>
                  <p className="text-lg font-medium text-gray-100">{video.videoname}</p>
                  <p className="text-sm text-gray-400">{video.link}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={() => handleView(video.id)}>
                    <FaEye />
                  </button>
                  <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" onClick={() => handleCopy(video.id)}>
                    <FaCopy />
                  </button>
                  <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition" onClick={() => handleEdit(video)}>
                    <FaEdit />
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" onClick={() => handleDelete(video.id)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
