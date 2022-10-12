import GifItems from "../content/gifElement/gif";
import "./content.css";

export default function Content({ list, darkMode, show, loading }) {
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

  if (loading)
    return (
      <div className="containerLoading">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>
    );

  return (
    <div className="contentContainer">
      <p className={`fraseContent ${darkMode} ? "dark" : "light"`}> </p>
      {!list || !list.length === 0 ? (
        <p></p>
      ) : list.length ? (
        list.map((item) => renderGif(item))
      ) : (
        show && (
          <p className="fraseNoResults">
            {" "}
            ... no se encontraron resultados...{" "}
          </p>
        )
      )}
    </div>
  );
}
