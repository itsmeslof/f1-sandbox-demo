import PropTypes from 'prop-types';
import { cars } from '../gameData';

RaceResultsTable.propTypes = {
    raceData: PropTypes.object
};

export default function RaceResultsTable({ raceData }) {
    return (
        <div className="flex basis-0 grow overflow-y-scroll">
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
                        Best Lap
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[50px]">
                        Total Time
                    </th>
                    <th className="p-3 bg-[#2D2C39] w-[50px]">
                        Points
                    </th>
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
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
