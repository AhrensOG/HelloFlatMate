import React from "react";

const VideoEmbedSection = ({ videoUrl }) => {
  // Función para verificar si el enlace es de YouTube
  const isYouTube = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  let embedUrl;

  if (isYouTube(videoUrl)) {
    // Extraer el ID del video de YouTube
    const videoId = videoUrl.includes("v=")
      ? videoUrl.split("v=")[1]
      : videoUrl.split("/").pop();
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else {
    // Si no es un video de YouTube, usar directamente la URL proporcionada
    embedUrl = videoUrl;
  }

  return (
    <div className="video-embed w-full">
      <iframe
        className="w-full"
        height="315"
        src={embedUrl}
        title="Video de la propiedad"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoEmbedSection;
