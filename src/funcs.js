import { cars, grid, modifiers, pointsMap } from './gameData';

/**
 * Simulates FP1, FP2 and FP3.
 * 
 * @returns {Object} practiceData
 */
export function simulatePractice() {
    const driverNames = Object.keys(grid);

    return {
        FP1: simulateSimpleSession(
            driverNames,
            randFloatRange(3.500, 5.000),
            8, 30,
            () => randFloatRange(-0.400, 1.000)
        ),
        FP2: simulateSimpleSession(
            driverNames,
            randFloatRange(2.500, 3.500),
            8, 30,
            () => randFloatRange(-0.200, 0.700)
        ),
        FP3: simulateSimpleSession(
            driverNames,
            randFloatRange(1.500, 2.500),
            8, 30,
            () => randFloatRange(-0.100, 0.500)
        )
    };
}

/**
 * Simulates Q1, Q2 and Q3.
 * 
 * @returns {Object} qualifyingData
 */
export function simulateQualifying() {
    const q1DriverNames = Object.keys(grid);

    const q1Data = simulateSimpleSession(
        q1DriverNames,
        randFloatRange(1.000, 1.500),
        2, 4,
        () => randFloatRange(-0.200, 0.400)
    );

    const q2DriverNames = q1Data.results.slice(0, 15).map((result) => result.driverName);

    const q2Data = simulateSimpleSession(
        q2DriverNames,
        randFloatRange(0.500, 1.200),
        1, 3,
        () => randFloatRange(-0.200, 0.200)
    );

    const q3DriverNames = q2Data.results.slice(0, 10).map((result) => result.driverName);

    const q3Data = simulateSimpleSession(
        q3DriverNames,
        randFloatRange(0.250, 0.750),
        1, 2,
        () => randFloatRange(-0.050, 0.100)
    );

    return {
        Q1: q1Data,
        Q2: q2Data,
        Q3: q3Data
    };
}

/**
 * Simulates a full race session.
 * 
 * @returns {Object} raceData
 */
export function simulateRace() {
    const sessionLapTimeModifier = randFloatRange(2.000, 4.000);

    let fastestLap = null;
    let fastestLapDriverName = "";
    let fastestTotalRaceTime = null;

    let results = Object.keys(grid).map((name) => {
        const driverData = grid[name];
        const carData = cars[driverData.car];

        const carPerformanceFluctuation = randFloatRange(
            -carData.fluctuation,
            carData.fluctuation
        );

        const driverFastestLapPaceModifierValue = randFloatRange(
            driverData.paceModMin, driverData.paceModMax
        );

        const driverFastestLap = parseFloat((
            parseFloat(carData.baseTime) +
            parseFloat(sessionLapTimeModifier) +
            parseFloat(carPerformanceFluctuation) +
            driverFastestLapPaceModifierValue
        ));

        if (!fastestLap || driverFastestLap < fastestLap) {
            fastestLap = parseFloat(driverFastestLap);
            fastestLapDriverName = name;
        }

        // generic time calc loss across entire race
        const driverMistakeTimeLoss = randFloatRange(0.000, 25.000);
        let mechanicalIssueTimeLoss = 0.000;

        let totalLapsWithIssue = 0;
        let timeLossPerLap = 0.000;
        if (randIntRange(1, 100) <= modifiers.mechanicalIssueChance) {
            const startLap = randIntRange(1, 57);
            const endLap = randIntRange(startLap, 57);

            totalLapsWithIssue = Math.max(1, endLap - startLap);
            timeLossPerLap = randFloatRange(modifiers.mechanicalIssueModMin, modifiers.mechanicalIssueModMin);

            mechanicalIssueTimeLoss = parseFloat(timeLossPerLap * totalLapsWithIssue);
        }

        const driverAvgLapPaceModifierValue = randFloatRange(
            driverData.paceModMin, driverData.paceModMax
        );

        const driverAvgLap = parseFloat((
            driverFastestLap +
            1.250 +
            driverAvgLapPaceModifierValue
        ));

        const driverTotalRaceTime = parseFloat(
            parseFloat((driverAvgLap * 56) + driverFastestLap) +
            parseFloat(driverMistakeTimeLoss) +
            parseFloat(mechanicalIssueTimeLoss)
        );

        if (!fastestTotalRaceTime || driverTotalRaceTime < fastestTotalRaceTime) {
            fastestTotalRaceTime = driverTotalRaceTime;
        }

        return {
            pos: 0,
            points: 0,
            driverName: name,
            teamName: driverData.team,
            carName: driverData.car,
            totalRaceTime: driverTotalRaceTime,
            formattedFastestLap: formatTimeString(driverFastestLap),
            formattedTotalRaceTime: formatTimeString(driverTotalRaceTime),
            gapStr: "",
            dnf: randIntRange(1, 100) <= modifiers.dnfChance,
            meta: {
                trackEvolution: sessionLapTimeModifier.toFixed(3),
                carPerformanceBaseTime: formatTimeString(carData.baseTime),
                carPerformanceFluctuationValue: carPerformanceFluctuation >= 0.000 ? `+${carPerformanceFluctuation.toFixed(3)}s` : `${carPerformanceFluctuation.toFixed(3)}s`,
                carPerformanceFluctuationRangeStr: `-${carData.fluctuation.toFixed(3)} - +${carData.fluctuation.toFixed(3)}`,
                driverPaceModifierRangeStr: `+${driverData.paceModMin.toFixed(3)}s - +${driverData.paceModMax.toFixed(3)}s`,
                driverAvgLapPaceModifierValue: `+${driverAvgLapPaceModifierValue.toFixed(3)}s`,
                driverFastestLapPaceModifierValue: `+${driverFastestLapPaceModifierValue.toFixed(3)}s`,
                driverAvgLap: formatTimeString(driverAvgLap),
                driverMistakeTimeLossRange: "+0.000s - +25.000s",
                driverMistakeTimeLoss: `+${driverMistakeTimeLoss.toFixed(3)}s`,
                mechanicalIssueChance: modifiers.mechanicalIssueChance,
                mechanicalIssueTimeLossRange: `+${modifiers.mechanicalIssueModMin.toFixed(3)}s - +${modifiers.mechanicalIssueModMax.toFixed(3)}s`,
                mechanicalIssueLapsAffected: `${totalLapsWithIssue} ${totalLapsWithIssue === 1 ? 'lap' : 'laps'}`,
                mechanicalIssueTimeLossPerLap: `+${timeLossPerLap.toFixed(3)}s`,
                totalMechanicalIssueTimeLoss: `+${mechanicalIssueTimeLoss.toFixed(3)}s`,
            }
        };

    });

    const raceFinishers = results.filter((result) => !result.dnf)
        .sort((a, b) => a.totalRaceTime > b.totalRaceTime);
    
    const dnfs = results.filter((result) => result.dnf);

    results = [...raceFinishers, ...dnfs].map((result, index) => {
        const gap = parseFloat(result.totalRaceTime - fastestTotalRaceTime).toFixed(3);
        const gapStr = (index === 0) ? "" : `+${gap}s`;

        let points = pointsMap[index + 1];
        if (result.driverName === fastestLapDriverName && index < 10) points++;

        return {
            ...result,
            pos: index + 1,
            points,
            gapStr
        };
    });

    return { fastestLapDriverName, results };
}

/**
 * Shared session generation logic for all practice and qualifying sessions. Generates a single fastest lap for each driver, taking into account the sessionLapTimeModifier. Also generates faux lap times between the provided range.
 * 
 * @param {Array} driverNames
 * @param {Number} sessionLapTimeModifier 
 * @param {Number} minLaps
 * @param {Number} maxLaps
 * @param {Function} additionalModifierCallback
 * 
 * @returns {Object} sessionData
 */
function simulateSimpleSession(
    driverNames,
    sessionLapTimeModifier,
    minLaps,
    maxLaps,
    additionalModifierCallback = () => 0.000
) {
    let fastestLap = null;
    let fastestLapDriverName = "";

    let results = driverNames.map((name) => {
        const driverData = grid[name];
        const carData = cars[driverData.car];

        const carPerformanceFluctuation = randFloatRange(
            -carData.fluctuation,
            carData.fluctuation
        );

        const driverFastestLapPaceModifierValue = randFloatRange(
            driverData.paceModMin, driverData.paceModMax
        );

        const additionalTimeLoss = parseFloat(additionalModifierCallback());

        const driverFastestLap = parseFloat((
            parseFloat(carData.baseTime) +
            parseFloat(sessionLapTimeModifier) +
            parseFloat(carPerformanceFluctuation) +
            driverFastestLapPaceModifierValue +
            additionalTimeLoss
        ).toFixed(3));

        if (!fastestLap || driverFastestLap < fastestLap) {
            fastestLap = driverFastestLap;
            fastestLapDriverName = name;
        }

        return {
            pos: 0,
            driverName: name,
            teamName: driverData.team,
            carName: driverData.car,
            fastestLap: driverFastestLap,
            formattedFastestLap: formatTimeString(driverFastestLap),
            gapStr: "",
            totalLaps: randIntRange(minLaps, maxLaps),
            meta: {
                trackEvolution: sessionLapTimeModifier.toFixed(3),
                carPerformanceBaseTime: formatTimeString(carData.baseTime),
                carPerformanceFluctuationValue: carPerformanceFluctuation >= 0.000 ? `+${carPerformanceFluctuation.toFixed(3)}s` : `${carPerformanceFluctuation.toFixed(3)}s`,
                carPerformanceFluctuationRangeStr: `-${carData.fluctuation.toFixed(3)} - +${carData.fluctuation.toFixed(3)}`,
                driverPaceModifierRangeStr: `+${driverData.paceModMin.toFixed(3)}s - +${driverData.paceModMax.toFixed(3)}s`,
                driverFastestLapPaceModifierValue: `+${driverFastestLapPaceModifierValue.toFixed(3)}s`,
                additionalTimeLoss: `+${additionalTimeLoss.toFixed(3)}s`
            }
        };
    });

    results = results.sort((a, b) => a.fastestLap > b.fastestLap).map((result, index) => {
        const gap = parseFloat(result.fastestLap - fastestLap).toFixed(3);
        const gapStr = (result.driverName === fastestLapDriverName) ? "" : `+${gap}s`;

        return {
            ...result,
            pos: index + 1,
            gapStr
        };
    });

    return { fastestLapDriverName, results };
}

/**
 * Generates a random integer between the min and max values (inclusive).
 * 
 * @param {Number} min
 * @param {Number} max
 * 
 * @returns {Number} result
 */
export function randIntRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * Generates a random float between the min and max values (exclusive).
 * 
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} result
 */
export function randFloatRange(min, max) {
    return parseFloat(Math.random() * (max - min) + min);
}

/**
 * Formats a Number representing a time into HH:MM:SS format.
 * 
 * @param {Number} seconds
 * @returns {String} result
 */
export function formatTimeString(seconds) {
    let sec = parseFloat(seconds);
    let min = 0;
    let hour = 0;

    while (sec >= 60) {
        min += 1;
        sec -= 60;
    }

    while (min >= 60) {
        hour += 1;
        min -= 60;
    }

    const hourStr = String(hour).padStart(2, "0");
    const minStr = hour ? String(min).padStart(2, "0") : String(min);
    const secStr = String(sec.toFixed(3)).padStart(6, "0");

    if (hour) return `${hourStr}:${minStr}:${secStr}`;

    return `${minStr}:${secStr}`;
}

