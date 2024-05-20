import { WithChildren } from "@base/helpers/components/WithChildren";
import { Suspense } from "react";
import TopBarProgress from "react-topbar-progress-indicator";

const SuspensedView: React.FC<WithChildren> = ({ children }) => {
    TopBarProgress.config({
        barColors: {
            "0": "#10B981",
        },
        barThickness: 2,
        shadowBlur: 5,
        shadowColor: "#10B981",
    });
    return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export default SuspensedView;
