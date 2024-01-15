const YoutubeEmbed = ({ embedId }) => {
  return (
    <div className="relative w-70 h-50 lg:w-[468px] lg:h-[263px]">
      <iframe
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Cara penggunaan aplikasi smart internship"
        className="left-0 top-0 h-full w-full absolute rounded-xl"
      />
    </div>
  );
};

export default YoutubeEmbed;
