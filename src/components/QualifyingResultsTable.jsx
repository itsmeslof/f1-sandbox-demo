import PropTypes from 'prop-types';
import SessionTabButton from './SessionTabButton';
import { useEffect, useState } from 'react';
import { cars } from '../gameData';
import SimpleSessionResultBreakdown from './SimpleSessionResultBreakdown';

const Q1 = "Q1";
const Q2 = "Q2";
const Q3 = "Q3";

QualifyingResultsTable.propTypes = {
    qualifyingData: PropTypes.object
};

export default function QualifyingResultsTable({ qualifyingData }) {
    const [selectedResult, setSelectedResult] = useState(null);
    const [qSession, setQSession] = useState(Q1);

    const sessionData = qualifyingData[qSession];
    const sessionResults = sessionData.results;

    useEffect(() => {
        setSelectedResult(null);
    }, [qSession]);

    return (
        <div className="flex basis-0 grow overflow-y-scroll">
            <div className="w-full">
                <div className="flex flex-col gap-4 grow">
                    <div className="flex w-full justify-between">
                        <p className="font-bold text-2xl">
                            Qualifying Results - {qSession}
                        </p>

                        <div className="flex gap-2 items-center">
                            <SessionTabButton
                                text={Q1}
                                active={qSession === Q1}
                                onClick={() => setQSession(Q1)}
                            />
                            <SessionTabButton
                                text={Q2}
                                active={qSession === Q2}
                                onClick={() => setQSession(Q2)}
                            />
                            <SessionTabButton
                                text={Q3}
                                active={qSession === Q3}
                                onClick={() => setQSession(Q3)}
                            />
                        </div>
                    </div>

                    <ResultsTable
                        results={sessionResults}
                        flDriverName={sessionData.fastestLapDriverName}
                        selectedResult={selectedResult}
                        setSelectedResult={setSelectedResult}
                    />
                </div>
            </div>
        </div>
    );
}

ResultsTable.propTypes = {
    results: PropTypes.array,
    flDriverName: PropTypes.string,
    selectedResult: PropTypes.object,
    setSelectedResult: PropTypes.func,
};

function ResultsTable({ results, flDriverName, selectedResult, setSelectedResult }) {
    if (selectedResult) {
        return <SimpleSessionResultBreakdown result={selectedResult} onBack={() => setSelectedResult(null)} />;
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
                        Best Time
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[50px]">
                        Gap
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[50px]">
                        Laps
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[50px]"></th>
                </tr>
            </thead>
            <tbody className="text-lg">
                {results.map((result) => {
                    const flClasses = result.driverName === flDriverName
                        ? 'bg-[#351544]'
                        : '';

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
                            <td className="p-3">{result.gapStr}</td>
                            <td className="p-3">{result.totalLaps}</td>
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
