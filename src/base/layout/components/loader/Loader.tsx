import clsx from "clsx";
import "./loader.css";

export default function Loader() {
  return (
    <div
      className="min-h-[calc(70vh-4rem)] flex items-center justify-center "
    >
      <div className="st-container">
        <div className="st-slice"></div>
        <div className="st-slice"></div>
        <div className="st-slice"></div>
        <div className="st-slice"></div>
        <div className="st-slice"></div>
        <div className="st-slice"></div>
      </div>
    </div>
  );
}
