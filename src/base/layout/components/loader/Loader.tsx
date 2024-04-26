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
                className="kk-loader-svg"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 141.7 141.7"
            >
                <g>
                    <path
                        className="kk-loader-path"
                        d="M69.2,72L58,60.7l-19.5,0l32.4,37l58.9-84l0-13.7L69.2,72z"
                    />
                    <path
                        className="kk-loader-path"
                        d="M128.4,32.7L128.4,32.7C128.4,32.7,128.4,32.7,128.4,32.7L128.4,32.7C128.4,32.7,128.4,32.7,128.4,32.7z
		 M111.5,56.7c1.8,4.8,2.8,9.9,2.8,15.3c0,24-19.4,43.5-43.5,43.5c-24,0-43.5-19.5-43.5-43.5c0-24,19.5-43.5,43.5-43.5
		c6.7,0,13,1.5,18.6,4.2l17.2-20.5C96.2,6,84,2.4,70.8,2.4C32.4,2.4,1.2,33.6,1.2,72.1c0,38.5,31.2,69.7,69.7,69.7
		c38.5,0,69.7-31.2,69.7-69.7c0-14.6-4.5-28.1-12.2-39.3L111.5,56.7z"
                    />
                </g>
            </svg>
        </div>
    );
}
