import PropTypes from 'prop-types';
import SessionTabButton from './SessionTabButton';
import { useState } from 'react';
import { cars } from '../gameData';

const FP1 = "FP1";
const FP2 = "FP2";
const FP3 = "FP3";

PracticeResultsTable.propTypes = {
    practiceData: PropTypes.object
};

export default function PracticeResultsTable({ practiceData }) {
    const [fpSession, setFpSession] = useState(FP1);
    const sessionData = practiceData[fpSession];
    const sessionResults = sessionData.results;

    return (
        <div className="flex basis-0 grow overflow-y-scroll">
            <div className="w-full">
                <div className="flex flex-col gap-4 grow">
                    <div className="flex w-full justify-between">
                        <p className="font-bold text-2xl">
                            Practice Results - {fpSession}
                        </p>

                        <div className="flex gap-2 items-center">
                            <SessionTabButton
                                text={FP1}
                                active={fpSession === FP1}
                                onClick={() => setFpSession(FP1)}
                            />
                            <SessionTabButton
                                text={FP2}
                                active={fpSession === FP2}
                                onClick={() => setFpSession(FP2)}
                            />
                            <SessionTabButton
                                text={FP3}
                                active={fpSession === FP3}
                                onClick={() => setFpSession(FP3)}
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
