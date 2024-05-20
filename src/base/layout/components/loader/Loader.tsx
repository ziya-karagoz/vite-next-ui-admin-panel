import clsx from "clsx";
import "./loader.css";

type LoaderProps = {
  isComponent?: boolean;
};
export default function Loader({ isComponent }: LoaderProps) {
  return (
    <div
      className={clsx({
        "min-h-[calc(70vh-4rem)] flex items-center justify-center ":
          true,
      })}
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
