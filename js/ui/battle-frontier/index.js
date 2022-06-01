import toggle from '../../messages/toggle.js';

const toggleBattleFrontier = document.getElementById('toggle-battlefrontier');

toggleBattleFrontier.onchange = ({ target }) => toggle(target.checked, 'toggle-battlefrontier-on', 'toggle-battlefrontier-off');

export {
    toggleBattleFrontier
}

