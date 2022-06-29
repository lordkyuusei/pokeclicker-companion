import toggle from '../../messages/toggle.js';

const togglePokerus = document.getElementById('toggle-pokerus');

togglePokerus.onchange = ({ target }) => toggle(target.checked, 'toggle-pokerus-on', 'toggle-pokerus-off');

export {
    togglePokerus
}

