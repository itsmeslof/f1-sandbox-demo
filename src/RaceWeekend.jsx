import PropTypes from "prop-types";
import { SessionState } from "./utils";
import WeekendCard from "./components/WeekendCard";
import PracticeResultsTable from "./components/PracticeResultsTable";
import QualifyingResultsTable from "./components/QualifyingResultsTable";
import RaceResultsTable from "./components/RaceResultsTable";

RaceWeekend.propTypes = {
    session: PropTypes.string,
    startPractice: PropTypes.func,
    startQualifying: PropTypes.func,
    startRace: PropTypes.func,
    practiceData: PropTypes.object,
    qualifyingData: PropTypes.object,
    raceData: PropTypes.object,
    onReset: PropTypes.func
};

export default function RaceWeekend({
    session,
    startPractice,
    startQualifying,
    startRace,
    practiceData,
    qualifyingData,
    raceData,
    onReset
}) {
    return (
        <div className="flex gap-4 w-full grow">
            <WeekendCard
                session={session}
                startPractice={startPractice}
                startQualifying={startQualifying}
                startRace={startRace}
                onReset={onReset}
            />

            <div className="bg-[#161523] border border-[#CFCFCF] p-5 rounded-lg w-full flex flex-col gap-4 grow">
                
                <ResultsWrapper
                    session={session}
                    practiceData={practiceData}
                    qualifyingData={qualifyingData}
                    raceData={raceData}
                />
            </div>
        </div>
    );
}

ResultsWrapper.propTypes = {
    session: PropTypes.string,
    practiceData: PropTypes.object,
    qualifyingData: PropTypes.object,
    raceData: PropTypes.object
};

function ResultsWrapper({ session, practiceData, qualifyingData, raceData }) {
    if (session === SessionState.Simulating) {
        return <div className="self-center grow flex items-center">
            <p>Simulating Session...</p>
        </div>;
    }

    if (session === SessionState.PostPractice) {
        return <PracticeResultsTable practiceData={practiceData} />;
    }

    if (session === SessionState.PostQualifying) {
        return <QualifyingResultsTable qualifyingData={qualifyingData} />;
    }

    if (session === SessionState.PostRace) {
        return <RaceResultsTable raceData={raceData} />;
    }
}