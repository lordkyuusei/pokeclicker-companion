/**
 * Constants
 */
const mainScriptUrl = 'js/toggleMainScript.js';
const autoclickUrl = 'js/autoclicker/autoclickerScript.js';
const undoclickUrl = 'js/autoclicker/undoclickerScript.js';
const autohatchUrl = 'js/hatchery/autohatchScript.js';
const undohatchUrl = 'js/hatchery/undohatchScript.js';
const autodungeonUrl = 'js/dungeon/autodungeonScript.js';
const undodungeonUrl = 'js/dungeon/undodungeonScript.js';
const autocatchtypeUrl = 'js/catching/autocatchScript.js';
const undocatchtypeUrl = 'js/catching/undocatchScript.js';
const autoBattleFrontierUrl = 'js/battleFrontier/autobattlefrontierScript.js';
const undoBattleFrontierUrl = 'js/battleFrontier/undoBattlefrontierScript.js';

const mainScriptId = 'toggleMainId';
const autohatchId = 'autohatchScript';
const autoclickId = 'autoclickerScript';
const undoclickId = 'undoclickerScript';
const undohatchId = 'undohatchScript';
const autodungeonId = 'autodungeonScript';
const undodungeonId = 'undodungeonScript';
const autocatchtypeId = 'autocatchTypeScript';
const undocatchtypeId = 'undocatchtypeScript';
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

    return {
        autoclicker: autoclicker !== null,
        autohatch: autohatch !== null,
        dungeon: dungeon !== null,
        battleFrontier: battleFrontier !== null,
        autocatch: autocatch !== null
    };
}

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
const toggleDungeonRunnerOn = () => injectScript(autodungeonUrl, autodungeonId);
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
const toggleAutoclickerOn = () => injectScript(autoclickUrl, autoclickId);

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
    'toggle-main-on': toggleMainOn,
    'toggle-main-off': toggleMainOff,
    'update-toggles': getTogglesStates,
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { message, params } = request;
    const func = mapMessageToFunction[message];
    if (func) {
        sendResponse(func(params));
    }
});