import { useState } from "react";

export default function Upload() {
  const [videoLink, setVideoLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Video link submitted:", videoLink);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        
    </div>
  );
}
