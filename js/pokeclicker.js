/**
 * Constants
 */
const autoclickUrl = 'js/autoclicker/autoclickerScript.js';
const undoclickUrl = 'js/autoclicker/undoclickerScript.js';
const autohatchUrl = 'js/hatchery/autohatchScript.js';
const undohatchUrl = 'js/hatchery/undohatchScript.js';
const autodungeonUrl = 'js/dungeon/autodungeonScript.js';
const undodungeonUrl = 'js/dungeon/undodungeonScript.js';

const autohatchId = 'autohatchScript';
const autoclickId = 'autoclickerScript';
const undoclickId = 'undoclickerScript';
const undohatchId = 'undohatchScript';
const autodungeonId = 'autodungeonScript';
const undodungeonId = 'undodungeonScript';

/**
 * Utility injection & ejection scripts.
 */
const ejectScript = (id) => {
    const script = document.getElementById(id);
    if (script) script.remove();
    return { status: "ok", response: id };
}

const injectScript = (fileName, id) => {
    if (document.getElementById(id)) return { status: "ok", response: id };

    const script = document.createElement('script');
    const file = chrome.runtime.getURL(fileName);
    script.id = id;
    script.src = file;
    document.body.appendChild(script);
    return { status: "ok", response: id };
}


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
const toggleOptimizedHatcheryOn = () => injectScript(autohatchUrl, autohatchId);

/**
 * Toggling Autoclicker. Set to 100ms to match speedrun's allowed tools.
 */
const toggleAutoclickerOff = () => {
    ejectScript(autoclickId);
    injectScript(undoclickUrl, undoclickId);
    return ejectScript(undoclickId);
};
const toggleAutoclickerOn = () => injectScript(autoclickUrl, autoclickId);


const mapMessageToFunction = {
    'toggle-autoclicker-on': toggleAutoclickerOn,
    'toggle-autoclicker-off': toggleAutoclickerOff,
    'toggle-optimized-hatchery-on': toggleOptimizedHatcheryOn,
    'toggle-optimized-hatchery-off': toggleOptimizedHatcheryOff,
    'toggle-dungeon-runner-on': toggleDungeonRunnerOn,
    'toggle-dungeon-runner-off': toggleDungeonRunnerOff,
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { message } = request;
    const func = mapMessageToFunction[message];
    if (func) {
        sendResponse(func());
    }
});