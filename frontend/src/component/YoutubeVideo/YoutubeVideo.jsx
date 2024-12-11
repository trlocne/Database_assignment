import React from 'react'

const YoutubeVideo = ({videoId}) => {
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div>
        <iframe width="700" height="355" src={videoUrl} title="đồ án cuối kỳ: keylogger" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
     
      </div>
    );
}

export default YoutubeVideo