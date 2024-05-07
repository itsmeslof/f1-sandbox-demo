import PropTypes from 'prop-types';

SimpleSessionResultBreakdown.propTypes = {
    result: PropTypes.object,
    onBack: PropTypes.func,
};

export default function SimpleSessionResultBreakdown({ result, onBack }) {
    return (
        <div className="flex flex-col gap-4 items-start">
            <div className="flex items-center gap-4">
                <button
                    className="rounded-md p-2 bg-white/5 hover:bg-white/10 active:bg-white/20 transition duration-150 ease-in-out inline-flex items-center gap-2"
                    onClick={onBack}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <p className="text-xl">
                    Breakdown for {result.driverName} - POS {result.pos}
                </p>
            </div>

            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <p className="text-2xl">Session</p>
                    <div className="bg-black/30 w-full rounded-md p-4 flex gap-6 flex-wrap">
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Track Evolution (Session Lap Time Modifier)</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                +{result.meta.trackEvolution}s
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-2xl">Car</p>
                    <div className="bg-black/30 w-full rounded-md p-4 flex gap-6 flex-wrap">
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Car</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.carName}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Team</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.teamName}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Reference Lap Time</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.meta.carPerformanceBaseTime}s
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Performance Fluctuation Range</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.meta.carPerformanceFluctuationRangeStr}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Rolled Performance Fluctuation Value</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.meta.carPerformanceFluctuationValue}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-2xl">Driver</p>
                    <div className="bg-black/30 w-full rounded-md p-4 flex gap-6 flex-wrap">
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Pace Modifier Range</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.meta.driverPaceModifierRangeStr}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Rolled Fastest Lap Pace Modifier Value</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.meta.driverFastestLapPaceModifierValue}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Fastest Lap Time</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.formattedFastestLap}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Gap To Leader</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.dnf ? "DNF" : result.gapStr || "---"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}