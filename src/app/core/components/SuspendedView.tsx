import { WithChildren } from "@base/helpers/components/WithChildren";
import { Suspense } from "react";
import TopBarProgress from "react-topbar-progress-indicator";

const SuspensedView: React.FC<WithChildren> = ({ children }) => {
    TopBarProgress.config({
        barColors: {
            "0": "#0550AE",
        },
        barThickness: 2,
        shadowBlur: 5,
        shadowColor: "#0550AE",
    });
    return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export default SuspensedView;
