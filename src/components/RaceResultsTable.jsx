import PropTypes from 'prop-types';
import { cars } from '../gameData';
import { useState } from 'react';

RaceResultsTable.propTypes = {
    raceData: PropTypes.object
};

export default function RaceResultsTable({ raceData }) {
    return (
        <div className="flex basis-0 grow overflow-y-scroll overflow-x-scroll">
            <div className="w-full">
                <div className="flex flex-col gap-4 grow">
                    <div className="flex w-full justify-between">
                        <p className="font-bold text-2xl">
                            Races Results
                        </p>
                    </div>

                    <ResultsTable
                        results={raceData.results}
                        fastestLapDriverName={raceData.fastestLapDriverName}
                    />
                </div>
            </div>
        </div>
    );
}

ResultsTable.propTypes = {
    results: PropTypes.array,
    fastestLapDriverName: PropTypes.string,
};

function ResultsTable({ results, fastestLapDriverName }) {
    const [selectedResult, setSelectedResult] = useState(null);

    if (selectedResult) {
        return <ResultBreakdown result={selectedResult} onBack={() => setSelectedResult(null)} />;
    }

    return (
        <table className="table-auto w-full text-left">
            <thead>
                <tr className="w-full">
                    <th className="p-3 bg-[#2D2C39] w-[50px]">
                        POS
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[200px] min-w-[200px]">
                        Driver
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[200px] min-w-[200px]">
                        Team
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[50px]">
                        Best Lap
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[50px]">
                        Total Time
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[50px]">
                        Points
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[50px]"></th>
                </tr>
            </thead>
            <tbody className="text-lg">
                {results.map((result, index) => {
                    const flClasses = result.driverName === fastestLapDriverName
                        ? 'bg-[#351544]'
                        : '';
                    
                    const totalTimeStr = index === 0 ? result.formattedTotalRaceTime : result.gapStr;
                    const carBgColor = cars[result.carName].twBgColor;

                    return (
                        <tr
                            key={result.driverName}
                            className="bg-[#12111c] hover:bg-[#22212E] w-full"
                        >
                            <td className="p-3">{result.pos}</td>
                            <td className="p-3">{result.driverName}</td>
                            <td className="p-3">
                                <p className="flex justify-between items-center">
                                    {result.teamName}
                                    <span className={`rounded-lg px-2 text-sm text-black/70 font-bold ${carBgColor}`}>
                                        {result.carName}
                                    </span>
                                </p>
                            </td>
                            <td className={`p-3 ${flClasses}`}>{result.formattedFastestLap}</td>
                            <td className="p-3">{result.dnf ? "DNF" : totalTimeStr}</td>
                            <td className="p-3">{result.points}</td>
                            <td className="p-3">
                                <button className="rounded-md p-2 bg-white/5 hover:bg-white/10 active:bg-white/20 transition duration-150 ease-in-out inline-flex items-center gap-2" onClick={() => setSelectedResult(result)}>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5 transition duration-150 ease-in-out"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" 
                                            clipRule="evenodd"
                                        />
                                    </svg>

                                    Info
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

ResultBreakdown.propTypes = {
    result: PropTypes.object,
    onBack: PropTypes.func,
};

function ResultBreakdown({ result, onBack }) {
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
                    Breakdown for {result.driverName} - POS {result.pos} {result.dnf ? "- DNF" : ""}
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
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Driver Mistake Time Loss Range</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.meta.driverMistakeTimeLossRange}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Mechanical Issue Chance</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.meta.mechanicalIssueChance}%
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Mechanical Issue Time Loss Range</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.meta.mechanicalIssueTimeLossRange}
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
                            <p>Rolled Avg Lap Pace Modifier Value</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.meta.driverAvgLapPaceModifierValue}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Avg Lap Time</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.meta.driverAvgLap}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Total Race Time</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.dnf ? "DNF" : result.formattedTotalRaceTime}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Gap To Leader</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.dnf ? "DNF" : result.gapStr || "---"}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Driver Mistake Time Loss</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.dnf ? "DNF" : result.meta.driverMistakeTimeLoss}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Mechanical Issue Time Loss / Lap</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.dnf ? "DNF" : result.meta.mechanicalIssueTimeLossPerLap}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Mechanical Issue Laps Affected</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.dnf ? "DNF" : result.meta.mechanicalIssueLapsAffected}
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2">
                            <p>Total Mechanical Issue Time Loss</p>
                            <span className="px-4 py-2 border-l-4 border-sky-600 bg-white/5">
                                {result.dnf ? "DNF" : result.meta.totalMechanicalIssueTimeLoss}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
