import { CardBalance1 } from "./partials/card-balance1";
import { CardBalance2 } from "./partials/card-balance2";
import { CardBalance3 } from "./partials/card-balance3";
import { CardAgents } from "./partials/card-agents";
import { CardTransactions } from "./partials/card-transactions";
import BlockNoteEditor from "@base/components/common/block-note/BlockNoteEditor";
import { Block } from "@blocknote/core";
import React from "react";

export const Home = () => {
  const [blocks, setBlocks] = React.useState<Block[]>([]);

  return (
    <div className="h-full lg:px-6">
      <BlockNoteEditor blocks={blocks} setBlocks={setBlocks} imageUploadEnabled/>
      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Available Balance</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
              <CardBalance1 />
              <CardBalance2 />
              <CardBalance3 />
            </div>
          </div>

          {/* Chart */}
          {/* <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Statistics</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
          <ExampleChart />
          </div>
        </div>*/}
        </div>

        {/* Left Section */}
        <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
          <h3 className="text-xl font-semibold">Section</h3>
          <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
            <CardAgents />
            <CardTransactions />
          </div>
        </div>
      </div>
    </div>
  );
};
