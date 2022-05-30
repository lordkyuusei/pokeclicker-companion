/**
 * Constants
 */
const FEATURES = 'js/features';
const mainScriptUrl = `${FEATURES}/toggleMainScript.js`;
const autoclickUrl = `${FEATURES}/autoclicker/autoclickerScript.js`;
const undoclickUrl = `${FEATURES}/autoclicker/undoclickerScript.js`;
const autohatchUrl = `${FEATURES}/hatchery/autohatchScript.js`;
const undohatchUrl = `${FEATURES}/hatchery/undohatchScript.js`;
const autodungeonUrl = `${FEATURES}/dungeon/autodungeonScript.js`;
const undodungeonUrl = `${FEATURES}/dungeon/undodungeonScript.js`;
const autocatchtypeUrl = `${FEATURES}/catching/autocatchScript.js`;
const undocatchtypeUrl = `${FEATURES}/catching/undocatchScript.js`;
const autogymbattleUrl = `${FEATURES}/gyms/autogymbattleScript.js`;
const undogymbattleUrl = `${FEATURES}/gyms/undogymbattleScript.js`;
const gathergymsUrl = `${FEATURES}/gyms/gathergymsScript.js`;
const undogathergymsUrl = `${FEATURES}/gyms/undogathergymsScript.js`;
const autoBattleFrontierUrl = `${FEATURES}/battleFrontier/autobattlefrontierScript.js`;
const undoBattleFrontierUrl = `${FEATURES}/battleFrontier/undoBattlefrontierScript.js`;

const mainScriptId = 'toggleMainId';
const autohatchId = 'autohatchScript';
const autoclickId = 'autoclickerScript';
const undoclickId = 'undoclickerScript';
const undohatchId = 'undohatchScript';
const autodungeonId = 'autodungeonScript';
const undodungeonId = 'undodungeonScript';
const autocatchtypeId = 'autocatchTypeScript';
const undocatchtypeId = 'undocatchtypeScript';
const autogymbattleId = 'autogymbattleScript';
const undogymbattleId = 'undogymbattleScript';
const gathergymsId = 'gathergymsScript';
const undogathergymsId = 'undogathergymsScript';
const autoBattleFrontierId = 'autobattlefrontierScript';
const undoBattleFrontierId = 'undobattlefrontierScript';

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
    const autoclicker = document.getElementById(autoclickId);
    const autohatch = document.getElementById(autohatchId);
    const dungeon = document.getElementById(autodungeonId);
    const battleFrontier = document.getElementById(autoBattleFrontierId);
    const autocatch = document.getElementById(autocatchtypeId);
    const autogym = document.getElementById(autogymbattleId);

    return {
        autoclicker: autoclicker !== null,
        autohatch: autohatch !== null,
        dungeon: dungeon !== null,
        battleFrontier: battleFrontier !== null,
        autocatch: autocatch !== null,
        autogym: autogym !== null
    };
}

/**
 * Toggle auto gym battle on.
 */

const toggleGymBattleOff = () => {
    ejectScript(autogymbattleId);
    injectScript(undogymbattleUrl, undogymbattleId);
    return ejectScript(undogymbattleId);
}
const toggleGymBattleOn = (params) => injectScript(autogymbattleUrl, autogymbattleId, params);

const feedGymsOff = () => {
    ejectScript(gathergymsId);
    injectScript(undogathergymsUrl, undogathergymsId);
    return ejectScript(undogathergymsId);
}
const feedGymsOn = () => injectScript(gathergymsUrl, gathergymsId);


/**
 * Toggling autocatch type on. 
 */
const toggleAutoCatchTypeOff = () => {
    ejectScript(autocatchtypeId);
    injectScript(undocatchtypeUrl, undocatchtypeId);
    return ejectScript(undocatchtypeId);
}
const toggleAutoCatchTypeOn = (params) => injectScript(autocatchtypeUrl, autocatchtypeId, params);

/**
 * Toggling Battle Frontier Reset.
 */
const toggleBattleFrontierOff = () => {
    ejectScript(autoBattleFrontierId);
    injectScript(undoBattleFrontierUrl, undoBattleFrontierId);
    return ejectScript(autoBattleFrontierId);
}
const toggleBattleFrontierOn = () => injectScript(autoBattleFrontierUrl, autoBattleFrontierId);

/**
 * Toggling Dungeon Runner. Set to Autoclicker Speed.
 */
const toggleDungeonRunnerOff = () => {
    ejectScript(autodungeonId);
    injectScript(undodungeonUrl, undodungeonId);
    return ejectScript(undodungeonId);
}
const toggleDungeonRunnerOn = (params) => injectScript(autodungeonUrl, autodungeonId, params);
/**
 * Toggling Autohatch. Set to 1000ms to match game's ticks.
 */
const toggleOptimizedHatcheryOff = () => {
    ejectScript(autohatchId);
    injectScript(undohatchUrl, undohatchId);
    return ejectScript(undohatchId);
}

const toggleOptimizedHatcheryOn = (params) => injectScript(autohatchUrl, autohatchId, params);

/**
 * Toggling Autoclicker. Set to 100ms to match speedrun's allowed tools.
 */
const toggleAutoclickerOff = () => {
    ejectScript(autoclickId);
    injectScript(undoclickUrl, undoclickId);
    return ejectScript(undoclickId);
};
const toggleAutoclickerOn = (params) => injectScript(autoclickUrl, autoclickId, params);

/**
 * Toggle main script with interval map.
 */
const toggleMainOff = () => console.log('off');
const toggleMainOn = () => injectScript(mainScriptUrl, mainScriptId);

const mapMessageToFunction = {
    'toggle-autoclicker-on': toggleAutoclickerOn,
    'toggle-autoclicker-off': toggleAutoclickerOff,
    'toggle-optimized-hatchery-on': toggleOptimizedHatcheryOn,
    'toggle-optimized-hatchery-off': toggleOptimizedHatcheryOff,
    'toggle-autocatch-type-on': toggleAutoCatchTypeOn,
    'toggle-autocatch-type-off': toggleAutoCatchTypeOff,
    'toggle-dungeon-runner-on': toggleDungeonRunnerOn,
    'toggle-dungeon-runner-off': toggleDungeonRunnerOff,
    'toggle-battlefrontier-on': toggleBattleFrontierOn,
    'toggle-battlefrontier-off': toggleBattleFrontierOff,
    'toggle-gym-battle-on': toggleGymBattleOn,
    'toggle-gym-battle-off': toggleGymBattleOff,
    'toggle-main-on': toggleMainOn,
    'toggle-main-off': toggleMainOff,
    'feed-gyms-on': feedGymsOn,
    'feed-gyms-off': feedGymsOff,
    'update-toggles': getTogglesStates,
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { message, params } = request;
    const func = mapMessageToFunction[message];
    if (func) {
        sendResponse(func(params));
    }
});