import {css} from 'lit';

const mainStyles = css`
            .title {
                font-size: 110%;
                font-weight: bold;
            }
            .author {
                font-size: 80%;
                color: var(--lumo-contrast-50pct, gray);
            }
            .crossword-container {
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                line-height: 1.5;
                color: var(--lumo-contrast, black);
                display: inline-block;
                float: left;
                
                -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Safari */
                -khtml-user-select: none; /* Konqueror HTML */
                -moz-user-select: none; /* Old versions of Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none
            }
            
            .crossword-container:focus-visible {
                outline: none;
            }

            .crossword-row {
                display: flex;
                flex-direction: row;
            }

            .crossword-cell {
                position: relative;
                background: var(--lumo-contrast, black);
                flex: 1;
                border-top: 1px solid var(--lumo-contrast, black);
                border-left: 1px solid var(--lumo-contrast, black);
                width: 34px;
                height: 34px;
                z-index: 30;
            }

            .crossword-cell.input {
                background: var(--lumo-base-color, white);
            }

            .crossword-cell:after {
                content: "";
                float: left;
                display: block;
                padding-top: 100%;
            }

            .crossword-cell:last-child {
                border-right: 1px solid var(--lumo-contrast, black);
            }

            .crossword-row:last-child .crossword-cell {
                border-bottom: 1px solid var(--lumo-contrast, balck);
            }

            .clue-label {
                position: absolute;
                font-size: 11px;
                width: 10px;
                height: 10px;
                top: -2px;
                left: 2px;
                z-index: 40;
            }

            .circle-marker {
                position: absolute;
                width: 32px;
                height: 32px;
                left: 0px;
                top: 0px;
                border: 1px solid var(--lumo-contrast, black);
                border-radius: 50%;
                z-index: 20;
            }

            .crossword-letter {
                position: absolute;
                font-family: sans-serif;
                font-variant: small-caps;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                vertical-align: baseline;
                border: none;
                width: 100%;
                height: 30px;
                padding-top: 4px;
                z-index: 10;
            }
            
            .incorrect {
                color: var(--lumo-error-color, red);
            }
            
            .incorrect:before {
                border-top: 1px solid var(--lumo-error-color, red);
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                left: -50%;
                transform: rotate(-45deg);
                transform-origin: 100% 0;
            }

            .across-word-separator {
                box-shadow: inset -2px 0px 0px 0px var(--lumo-contrast, black);
            }

            .down-word-separator {
                box-shadow: inset 0px -2px 0px 0px var(--lumo-contrast, black);
            }
            
            .clue-container {
                float: left;
                width: 350px;
                height: 526px;
                overflow-y: scroll;
                margin-left: 5px;
            }
            
            .clue-header {
                position: sticky;
                padding-left: 10px;
                font-size: 110%;
                font-weight: bold;
                background-color: var(--lumo-primary-color-50pct, gray);
                color: var(--lumo-base-color, white);
            }
            
            .clue {
                font-size: 90%;
            }`;

export {mainStyles};
