import "./loader.css";

type LoaderProps = {
  isComponent?: boolean;
};
export default function Loader({ isComponent }: LoaderProps) {
  return (
    <div
      className={
        "kk-loader " + (!isComponent ? "kk-loader-100vh" : "kk-loader-100")
      }
    >
      <svg
      className="w-4 h-4"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="black"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="17.6768"
          r="15.6768"
          fill="none"
          stroke="black"
          strokeWidth="4"
        />
        <path
          d="M58.596 26.7677C58.596 30.9042 55.0282 34.3536 50.505 34.3536C45.9819 34.3536 42.4141 30.9042 42.4141 26.7677C42.4141 22.6313 45.9819 19.1819 50.505 19.1819C55.0282 19.1819 58.596 22.6313 58.596 26.7677Z"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
