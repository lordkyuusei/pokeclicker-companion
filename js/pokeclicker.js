const FEATURES = 'js/features';

const GYMS = `${FEATURES}/gyms`;
const CLICK = `${FEATURES}/clicking`;
const CATCH = `${FEATURES}/catching`;
const HATCH = `${FEATURES}/hatchery`;
const DUNGEON = `${FEATURES}/dungeon`;
const FRONTIER = `${FEATURES}/battle-frontier`;

const mainID = 'toggleMainScript';

const hatchID = 'autohatchScript';
const undoHatchID = 'undohatchScript';
const regionsID = 'gatherregionsScript';
const undoRegionsID = 'undogatherregionsScript';

const clickID = 'autoclickerScript';
const undoClickID = 'undoclickerScript';

const dungeonID = 'autodungeonScript';
const undoDungeonID = 'undodungeonScript';

const catchID = 'autocatchScript';
const undoCatchID = 'undocatchScript';

const gymID = 'autogymbattleScript';
const undoGymID = 'undogymbattleScript';
const gymsID = 'gathergymsScript';
const undoGymsID = 'undogathergymsScript';

const battleFrontierID = 'autobattlefrontierScript';
const undoBattleFrontierID = 'undobattlefrontierScript';

const mainURL = `${FEATURES}/${mainID}.js`;

const hatchURL = `${HATCH}/${hatchID}.js`;
const undoHatchURL = `${HATCH}/${undoHatchID}.js`;
const regionsURL = `${HATCH}/${regionsID}.js`;
const undoRegionsURL = `${HATCH}/${undoRegionsID}.js`;

const clickURL = `${CLICK}/${clickID}.js`;
const undoClickURL = `${CLICK}/${undoClickID}.js`;

const dungeonURL = `${DUNGEON}/${dungeonID}.js`;
const undoDungeonURL = `${DUNGEON}/${undoDungeonID}.js`;

const catchURL = `${CATCH}/${catchID}.js`;
const undoCatchURL = `${CATCH}/${undoCatchID}.js`;

const gymURL = `${GYMS}/${gymID}.js`;
const undoGymURL = `${GYMS}/${undoGymID}.js`;
const gymsURL = `${GYMS}/${gymsID}.js`;
const undoGymsURL = `${GYMS}/${undoGymsID}.js`;

const battleFrontierURL = `${FRONTIER}/${battleFrontierID}.js`;
const undoBattleFrontierURL = `${FRONTIER}/${undoBattleFrontierID}.js`;



/**
 * Utility injection & ejection scripts.
 */
const ejectScript = (id) => {
    const script = document.getElementById(id);
    if (script) script.remove();
    return { status: `${id} unloaded`, response: id };
}

const injectScript = (fileName, id, params) => {
    if (document.getElementById(id)) return { status: `${id} already loaded`, response: id };

    const script = document.createElement('script');
    const file = chrome.runtime.getURL(fileName);
    script.id = id;
    script.src = file;

    params?.forEach(param => {
        script.setAttribute(param.name, param.value);
    });

    document.body.appendChild(script);
    return { status: `${id} loaded`, response: id };
}

/**
 * Check if scripts have already been loaded & update accordingly.
 */
const getTogglesStates = () => {
    const click = document.getElementById(clickID);
    const hatch = document.getElementById(hatchID);
    const dungeon = document.getElementById(dungeonID);
    const battleFrontier = document.getElementById(battleFrontierID);
    const catch_ = document.getElementById(catchID);
    const gym = document.getElementById(gymID);

    return {
        click: click !== null,
        hatch: hatch !== null,
        dungeon: dungeon !== null,
        battleFrontier: battleFrontier !== null,
        catch_: catch_ !== null,
        gym: gym !== null
    };
}

/**
 * Toggle auto gym battle on.
 */

const toggleGymOff = () => {
    ejectScript(gymID);
    injectScript(undoGymURL, undoGymID);
    return ejectScript(undoGymID);
}
const toggleGymOn = (params) => injectScript(gymURL, gymID, params);

const selectGymsOff = () => {
    ejectScript(gymsID);
    injectScript(undoGymsURL, undoGymsID);
    return ejectScript(undoGymsID);
}
const selectGymsOn = () => injectScript(gymsURL, gymsID);


/**
 * Toggling autocatch type on. 
 */
const toggleCatchOff = () => {
    ejectScript(catchID);
    injectScript(undoCatchURL, undoCatchID);
    return ejectScript(undoCatchID);
}
const toggleCatchOn = (params) => injectScript(catchURL, catchID, params);

/**
 * Toggling Battle Frontier Reset.
 */
const toggleBattleFrontierOff = () => {
    ejectScript(battleFrontierID);
    injectScript(undoBattleFrontierURL, undoBattleFrontierID);
    return ejectScript(undoBattleFrontierID);
}
const toggleBattleFrontierOn = () => injectScript(battleFrontierURL, battleFrontierID);

/**
 * Toggling Dungeon Runner. Set to Autoclicker Speed.
 */
const toggleDungeonOff = () => {
    ejectScript(dungeonID);
    injectScript(undoDungeonURL, undoDungeonID);
    return ejectScript(undoDungeonID);
}
const toggleDungeonOn = (params) => injectScript(dungeonURL, dungeonID, params);
/**
 * Toggling Autohatch. Set to 1000ms to match game's ticks.
 */
const toggleHatchOff = () => {
    ejectScript(hatchID);
    injectScript(undoHatchURL, undoHatchID);
    return ejectScript(undoHatchID);
}

const toggleHatchOn = (params) => injectScript(hatchURL, hatchID, params);

const selectRegionsOff = () => {
    ejectScript(regionsID);
    injectScript(undoRegionsURL, undoRegionsID);
    return ejectScript(undoRegionsID);
}

const selectRegionsOn = (params) => injectScript(regionsURL, regionsID, params);

/**
* Toggling Autoclicker. Set to 100ms to match speedrun's allowed tools.
 */
const toggleClickOff = () => {
    ejectScript(clickID);
    injectScript(undoClickURL, undoClickID);
    return ejectScript(undoClickID);
};
const toggleClickOn = (params) => injectScript(clickURL, clickID, params);

/**
 * Toggle main script with interval map.
 */
const toggleMainOff = () => console.log('off');
const toggleMainOn = (params) => injectScript(mainURL, mainID, params);

const mapMessageToFunction = {
    'toggle-click-on': toggleClickOn,
    'toggle-click-off': toggleClickOff,
    'toggle-hatch-on': toggleHatchOn,
    'toggle-hatch-off': toggleHatchOff,
    'toggle-catch-on': toggleCatchOn,
    'toggle-catch-off': toggleCatchOff,
    'toggle-dungeon-on': toggleDungeonOn,
    'toggle-dungeon-off': toggleDungeonOff,
    'toggle-battlefrontier-on': toggleBattleFrontierOn,
    'toggle-battlefrontier-off': toggleBattleFrontierOff,
    'toggle-gym-on': toggleGymOn,
    'toggle-gym-off': toggleGymOff,
    'toggle-main-on': toggleMainOn,
    'toggle-main-off': toggleMainOff,
    'select-gyms-on': selectGymsOn,
    'select-gyms-off': selectGymsOff,
    'select-regions-on': selectRegionsOn,
    'select-regions-off': selectRegionsOff,
    'update-toggles': getTogglesStates,
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { message, params } = request;
    const func = mapMessageToFunction[message];
    if (func) {
        sendResponse(func(params));
    }
});