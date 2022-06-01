const makeLinksClickable = () => {
    const links = document.getElementsByTagName('a');
    Array.from(links).forEach(link => {
        link.onclick = () => chrome.tabs.create({ url: link.href });
    });
}

export default makeLinksClickable;