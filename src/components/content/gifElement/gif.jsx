import "./gif.css";

export default function GifItems({ imageUrl, title, url }) {
  return (
    <div className="gif_wrapper">
      <a href={url} target="_blank" rel="noreferrer">
        <img src={imageUrl} alt={title} />
      </a>
    </div>
  );
}
