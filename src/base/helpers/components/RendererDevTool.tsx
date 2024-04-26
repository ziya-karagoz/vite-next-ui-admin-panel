import { useRenderInfo } from "@uidotdev/usehooks";
import clsx from "clsx";

const RendererDevTool = () => {
    const renderInfo = useRenderInfo();


    return (
        <section className={clsx("fixed bottom-12 right-0 m-12 p-4 bg-white shadow-lg rounded-lg")}>
            <dl className="grid max-w-screen-xl grid-cols-1 gap-8 p-4 mx-auto text-gray-900">
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{renderInfo?.renders}</dt>
                    <dd className="text-gray-500">Render Count</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{renderInfo?.sinceLastRender}</dt>
                    <dd className="text-gray-500">Since Last Render (ms) </dd>
                </div>
            </dl>
        </section>
    );
};

export default RendererDevTool;
