import { SessionState } from "../utils";
import PropTypes from "prop-types";

WeekendCard.propTypes = {
    session: PropTypes.number,
    startPractice: PropTypes.func,
    startQualifying: PropTypes.func,
    startRace: PropTypes.func,
    onReset: PropTypes.func,
};

export default function WeekendCard({
    session,
    startPractice,
    startQualifying,
    startRace,
    onReset
}) {
    return <div className="bg-[#161523] border border-[#CFCFCF] p-5 rounded-lg min-w-[440px] flex flex-col gap-4 self-start">
        <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">Race Weekend</p>
            <button
                className="bg-[#E0944E] hover:bg-[#EE9D51] disabled:opacity-50 transition duration-150 text-white rounded-md text-lg font-bold px-4 py-1"
                onClick={onReset}
                disabled={[SessionState.WeekendStart, SessionState.Simulating].includes(session)}
            >
                Reset
            </button>
        </div>

        <div className="flex flex-col gap-2">
            <SessionButton
                text="Practice"
                description="Simulate FP1, FP2 and FP3"
                active={[SessionState.PostPractice].includes(session)}
                disabled={![SessionState.WeekendStart, SessionState.PostPractice].includes(session)}
                onClick={() => (session === SessionState.WeekendStart) ? startPractice() : null}
            />

            <SessionButton
                text="Qualifying"
                description="Simulate Q1, Q2 and Q3"
                active={[SessionState.PostQualifying].includes(session)}
                disabled={![SessionState.PostPractice, SessionState.PostQualifying].includes(session)}
                onClick={() => (session === SessionState.PostPractice) ? startQualifying() : null}
            />

            <SessionButton
                text="Race"
                description="Simulate 57 laps at Bahrain International Circuit"
                active={[SessionState.PostRace].includes(session)}
                disabled={![SessionState.PostQualifying, SessionState.PostRace].includes(session)}
                onClick={() => (session === SessionState.PostQualifying) ? startRace() : null}
            />
        </div>
    </div>;
}

SessionButton.propTypes = {
    text: PropTypes.string,
    description: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool
};

function SessionButton({ text, description, active, disabled, ...rest }) {
    const disabledClasses = "bg-[#26283F] text-white opacity-50";
    const activeClasses = "bg-[#F9F4F1] text-[#26283F]";
    const inactiveClasses = "bg-[#26283F] hover:bg-[#3D4058] text-white";

    const appliedClasses = active ? activeClasses : inactiveClasses;
    
    return <button
        className={
            `p-4 rounded-md text-left flex flex-col gap-2
            transition duration-150 ${disabled ? disabledClasses : appliedClasses}`
        }
        disabled={disabled}
        {...rest}

    >
        <p className="text-2xl">{text}</p>
        <p>{description}</p>
    </button>;
}
