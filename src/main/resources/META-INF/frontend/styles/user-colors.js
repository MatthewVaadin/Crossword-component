import {css} from 'lit';

// These are based on the user colors from the Vaadin Lumo theme.
const userColors = css`
    :host {
        --crossword-highlight-user-color-0: #f6d5e4;
        --crossword-highlight-user-color-1: #dcd5f1;
        --crossword-highlight-user-color-2: #d5e0e9;
        --crossword-highlight-user-color-3: #e9dcd5;
        --crossword-highlight-user-color-4: #eed6fb;
        --crossword-highlight-user-color-5: #d5d8e4;
        --crossword-highlight-user-color-6: #d5e2d7;
        --crossword-focus-user-color-0: #e672ad;
        --crossword-focus-user-color-1: #9172d7;
        --crossword-focus-user-color-2: #72a1be;
        --crossword-focus-user-color-3: #c09072;
        --crossword-focus-user-color-4: #cd74f5;
        --crossword-focus-user-color-5: #7281ad;
        --crossword-focus-user-color-6: #72a77c;
    }
    
    [theme~='dark'] {
        --crossword-highlight-user-color-0: #8c386d;
        --crossword-highlight-user-color-1: #564c8c;
        --crossword-highlight-user-color-2: #4c8c38;
        --crossword-highlight-user-color-3: #8c6838;
        --crossword-highlight-user-color-4: #783b8c;
        --crossword-highlight-user-color-5: #388c89;
        --crossword-highlight-user-color-6: #7e8c38;
        --crossword-focus-user-color-0: #e45bb2;
        --crossword-focus-user-color-1: #8c7be4;
        --crossword-focus-user-color-2: #7be45b;
        --crossword-focus-user-color-3: #e4a95b;
        --crossword-focus-user-color-4: #c560e4;
        --crossword-focus-user-color-5: #5be4e0;
        --crossword-focus-user-color-6: #cee45b;
    }`;

const $tpl = document.createElement('template');
$tpl.innerHTML = `<style>${userColors.toString().replace(':host', 'html')}</style>`;
document.head.appendChild($tpl.content);

export { userColors };
