import PropTypes from 'prop-types';
import SessionTabButton from './SessionTabButton';
import { useState } from 'react';
import { cars } from '../gameData';

const Q1 = "Q1";
const Q2 = "Q2";
const Q3 = "Q3";

QualifyingResultsTable.propTypes = {
    qualifyingData: PropTypes.object
};

export default function QualifyingResultsTable({ qualifyingData }) {
    const [qSession, setQSession] = useState(Q1);

    const sessionData = qualifyingData[qSession];
    const sessionResults = sessionData.results;

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
                    />
                </div>
            </div>
        </div>
    );
}

ResultsTable.propTypes = {
    results: PropTypes.array,
    flDriverName: PropTypes.string
};

function ResultsTable({ results, flDriverName }) {
    return (
        <table className="table-auto w-full text-left">
            <thead>
                <tr className="w-full">
                    <th className="p-3 bg-[#2D2C39] w-[50px]">
                        POS
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[50px]">
                        Driver
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[50px]">
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
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
