import clsx from "clsx";
import * as React from "react";
import CountUp from 'react-countup';

interface StatItemProps {
    value: number;
    label: string;
    labelColor: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, labelColor }) => {
    return (
        <div className="flex flex-col mt-1">
            <div className="self-center text-base leading-6 text-neutral-800"><CountUp end={value} duration={
                Math.random() * (1.5 - 0.5) + 1
            } /></div>
            <div className={clsx("justify-center px-5 py-1.5 mt-1.5 text-sm leading-3 rounded-md font-semibold", {
                "bg-teal-100 text-teal-600": labelColor === "teal",
                "bg-cyan-100 text-cyan-600": labelColor === "cyan",
                "bg-rose-100 text-rose-600": labelColor === "rose",

            })}>
                {label}
            </div>
        </div>
    );
};

const DashboardCard: React.FC = () => {
    const stats = [
        { value: 100, label: "Yeni", labelColor: "teal" },
        { value: 878, label: "Açık", labelColor: "cyan" },
        { value: 897, label: "Kapalı", labelColor: "rose" },
    ];

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center bg-white rounded-xl border border-solid shadow-sm border-slate-200 border-opacity-70 w-full">
                <div className="flex flex-col justify-center w-full rounded-md bg-slate-200">
                    <div className="w-full bg-teal-500 rounded-xl min-h-[4px]" />
                </div>
                <h2 className="self-center mt-7 text-xs font-semibold tracking-wide leading-4 text-center uppercase text-slate-500">
                    Hizmet Talepleri
                </h2>
                <div className="self-center mt-6 text-5xl font-semibold text-center leading-[68.6px] text-neutral-800">
                    <CountUp end={1000} duration={
                        Math.random() * (1.5 - 0.5) + 1
                    } />
                </div>
                <div className="flex gap-3.5 justify-center items-start px-6 py-4 mt-10 font-semibold text-center whitespace-nowrap bg-white rounded-none border-t border-solid border-slate-200 border-opacity-70">
                    {stats.map((stat, index) => (
                        <React.Fragment key={index}>
                            <StatItem {...stat} />
                            {index < stats.length - 1 && (
                                <div className="shrink-0 w-px border-l border-solid border-slate-200 h-[43px]" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;