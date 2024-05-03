import { useState } from 'react';
import { SessionState } from './utils';
import {
  simulatePractice,
  simulateQualifying,
  simulateRace,
} from './funcs';
import RaceWeekend from './RaceWeekend';
import './App.css';

function App() {
  const [session, setSession] = useState(SessionState.WeekendStart);
  const [practiceData, setPracticeData] = useState({});
  const [qualifyingData, setQualifyingData] = useState({});
  const [raceData, setRaceData] = useState({});

  function startPractice() {
    setSession(SessionState.Simulating);
    setPracticeData(simulatePractice());
    setTimeout(() => setSession(SessionState.PostPractice), 2000);
  }

  function startQualifying() {
    setSession(SessionState.Simulating);
    setQualifyingData(simulateQualifying());
    setTimeout(() => setSession(SessionState.PostQualifying), 2000);
  }

  function startRace() {
    setSession(SessionState.Simulating);
    setRaceData(simulateRace());
    setTimeout(() => setSession(SessionState.PostRace), 2000);
  }

  function reset() {
    setSession(SessionState.WeekendStart);
    setPracticeData({});
    setQualifyingData({});
    setRaceData({});
  }

  return (
    <div className="min-h-screen bg-[#0F0F19] p-5 gap-6 flex flex-col items-start">
      <RaceWeekend
        session={session}
        startPractice={startPractice}
        startQualifying={startQualifying}
        startRace={startRace}
        practiceData={practiceData} 
        qualifyingData={qualifyingData}
        raceData={raceData}
        onReset={reset}
      />
    </div>
  );
}

export default App;
