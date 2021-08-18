import GifItems from "../content/gifElement/gif";
import "./content.css";

export default function Content({ list, darkMode }) {
  const renderGif = (item) => {
    const gif = item.images.downsized.url;
    return (
      <div className="gifContainer">
        <GifItems
          key={item.id}
          title={item.title}
          imageUrl={gif}
          url={item.url}
        />
      </div>
    );
  };

  return (
    <div className="contentContainer">
      <p className={`fraseContent ${darkMode} ? "dark" : "light"`}> </p>
      {!list || !list.length === 0 ? (
        <p> </p>
      ) : list.length ? (
        list.map((item) => renderGif(item))
      ) : (
        <p> ... loading </p>
      )}
    </div>
  );
}
