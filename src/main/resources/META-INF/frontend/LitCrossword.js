import {LitElement, html, css} from 'lit';
import './styles/user-colors.js';
import {mainStyles} from "./styles/main-styles";

class HighlightPosition {
    constructor(inputIndex, startIndex, endIndex) {
        this.inputIndex = inputIndex;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }
}

class Highlight {
    constructor(id, color, inputIndex, startIndex, endIndex) {
        this.id = id;
        this.color = color;
        this.position = new HighlightPosition(inputIndex, startIndex, endIndex);
    }
}

export class LitCrossword extends LitElement {
    static get properties() {
        return {
            error: {type: Boolean},
            across: {type: Boolean},

            title: {type: String},
            author: {type: String},

            cols: {type: Number},
            rows: {type: Number},
            grid: {type: Array},
            gridNums: {type: Array},
            answerGrid: {type: Array},
            acrossAnswers: {type: Array},
            downAnswers: {type: Array},
            acrossClues: {type: Array},
            downClues: {type: Array},

            users: {type: Array},
            localUserId: {type: String},
            localUser: {type: Highlight},

            skipFilled: {type: Boolean},
            showMistakes: {type: Boolean},
        };
    }

    constructor() {
        super();
        this.error = true;
        this.across = true;

        this.title = "";
        this.author = "";
        this.cols = 0;
        this.rows = 0;
        this.grid = [];
        this.gridNums =[];
        this.answerGrid = [];
        this.acrossAnswers = [];
        this.downAnswers = [];
        this.acrossClues = [];
        this.downClues = [];

        this.users = [];
        this.localUserId = "default";
        this.localUser = new Highlight("default", 0, -1, -1, -1);

        this.skipFilled = true;
        this.showMistakes = false;
    }

    static get styles() {
        return mainStyles;
    }

    rowTemplate(row) {
        const templates = [];
        for (let c = 0; c < this.cols; c++) {
            const index = (row * this.cols) + c;
            const answer = this.answerGrid[index];
            const letter = this.grid[index];
            const label = this.gridNums[index];
            if (letter === ".") {
                templates.push(html`<div class="crossword-cell"></div>`);
            } else {
                let bgColor = "inherit";
                let className = "";
                for (let u = 0; u < this.users.length; u++) {
                    const user = this.users[u];
                    const color = ((user.color % 7) + 7) % 7;
                    if (bgColor === "inherit" || user.id === this.localUserId) {
                        if (user.position.inputIndex === index) {
                            bgColor = "var(--crossword-focus-user-color-" + color + ")";
                        } else if (user.position.endIndex - user.position.startIndex < this.cols &&
                            index >= user.position.startIndex &&
                            index <= user.position.endIndex) {
                            bgColor = "var(--crossword-highlight-user-color-" + color + ")";
                        } else if (user.position.startIndex % this.cols === user.position.endIndex % this.cols &&
                            index >= user.position.startIndex &&
                            index <= user.position.endIndex &&
                            user.position.startIndex % this.cols === index % this.cols) {
                            bgColor = "var(--crossword-highlight-user-color-" + color + ")";
                        }
                        if (bgColor !== "inherit" && user.id === this.localUserId) {
                            break;
                        }
                    }
                }

                if (this.showMistakes && answer !== ' ' && answer !== letter) {
                    className = "incorrect";
                }
                templates.push(html`
                    <div id="${index}" class="crossword-cell input" @click="${this._setInput}">
                        <div class="crossword-letter ${className}" style="background-color:${bgColor};">${answer}</div>
                        ${label === 0 ? '' : html`<div class="clue-label">${label}</div>`}
                    </div>`);
            }
        }
        return templates;
    }

    mainTemplate() {
        const templates = [];
        for (let r = 0; r < this.rows; r++) {
            templates.push(html`<div class="crossword-row">
                ${this.rowTemplate(r)}
            </div>`);
        }
        return html`${templates}`;
    }

    acrossCluesTemplate() {
        const templates = [];
        for (let c = 0; c < this.acrossClues.length; c++) {
            templates.push(html`<div class="clue">
                ${this.acrossClues[c]}
            </div>`);
        }
        return html`${templates}`;
    }

    downCluesTemplate() {
        const templates = [];
        for (let c = 0; c < this.downClues.length; c++) {
            templates.push(html`<div class="clue">
                ${this.downClues[c]}
            </div>`);
        }
        return html`${templates}`;
    }

    render () {
        if (this.error) {
            return html`
                <div class="crossword-container">Unable to display crossword.</div>`;
        } else {
            return html`
                <div class="title">${this.title}</div>
                <div class="author">${this.author}</div>
                <div class="crossword-container" tabindex="0"
                     @keydown="${this._keydownListener}"
                     @keyup="${this._keyupListener}">
                    ${this.mainTemplate()}
                </div>
                <div class="clue-container">
                    <div class="clue-header">Across</div>
                    ${this.acrossCluesTemplate()}
                </div>
                <div class="clue-container">
                    <div class="clue-header">Down</div>
                    ${this.downCluesTemplate()}
                </div>`;
        }
    }

    updatePosition(position) {
        if (position !== undefined) {
            this.localUser.position = position;
            this.requestUpdate();

            let event = new CustomEvent("update-position", {
                detail: {
                    id: this.localUserId,
                    inputIndex: this.localUser.position.inputIndex,
                    startIndex: this.localUser.position.startIndex,
                    endIndex: this.localUser.position.endIndex
                }
            });
            this.dispatchEvent(event);
        }
    }

    updateLetter(index, letter) {
        this.answerGrid[index] = letter;
        this.requestUpdate();

        let event = new CustomEvent("update-letter", {
            detail: {
                index: index,
                letter: letter
            }
        });
        this.dispatchEvent(event);
    }

    addUser(id, colorIndex) {
        let highlight = new Highlight(id, colorIndex, -1, -1, -1);
        this.users.push(highlight);
        if (id === this.localUserId) {
            this.localUser = highlight;
        }
    }

    updateUser(id, inputIndex, startIndex, endIndex) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                this.users[i].position = new HighlightPosition(inputIndex, startIndex, endIndex);
                this.requestUpdate();
                break;
            }
        }
    }

    removeUser(id) {
        let index;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                index = i;
                break;
            }
        }
        if (index !== undefined) {
            this.users.splice(index, 1);
            this.requestUpdate();
        }
    }

    _keydownListener(event) {
        if (event.key === "Tab" || event.key === "ArrowRight" ||
            event.key === "ArrowLeft" || event.key === "ArrowDown" ||
            event.key === "ArrowUp") {
            event.preventDefault();
        }
    }

    _keyupListener(event) {
        if (event.key === ' ') {
            this._switch(this.localUser.position.inputIndex);
        } else if (event.key === "ArrowRight") {
            this._nextLetter(true, true, false, false, false);
        } else if (event.key === "ArrowLeft") {
            this._nextLetter(true, false, false, false, false);
        } else if (event.key === "ArrowDown") {
            this._nextLetter(false, true, false, false, false);
        } else if (event.key === "ArrowUp") {
            this._nextLetter(false, false, false, false, false);
        } else if (event.key === "Delete") {
            this.updateLetter(this.localUser.position.inputIndex, " ");
        } else if (event.key === "Backspace") {
            this.updateLetter(this.localUser.position.inputIndex, " ");
            this._nextLetter(this.across, false, false, true, false);
        } else if (event.key === "Enter" || event.key === "Tab") {
            this._nextLetter(this.across, !event.shiftKey, true, false, this.skipFilled, true);
        } else if (/^[a-zA-Z]$/.test(event.key)) {
            this.updateLetter(this.localUser.position.inputIndex, event.key.toUpperCase());
            this._nextLetter(this.across, true, true);
        }
    }

    _setInput(event) {
        let index = Number(event.currentTarget.id);
        if (this.localUser.position.inputIndex === index) {
            this._switch(index);
        } else {
            let position = this._findWord(index, this.across);
            if (position !== undefined) {
                this.updatePosition(position);
            } else {
                this._switch(index);
            }
        }
        this.requestUpdate();
    }

    _nextLetter(across, forward, labelOrder = false, stopAtBoundary = false, skipFilled = this.skipFilled, nextWord = false) {
        let forceForward = false;
        let index = this.localUser.position.inputIndex;
        let position = this.localUser.position;
        if (nextWord) {
            if (across && forward) {
                index = position.endIndex;
            } else {
                index = position.startIndex;
            }
        }
        while (true) {
            let xIncrement = (forward || forceForward) ? 1 : -1;
            let yIncrement = (forward || forceForward) ? this.cols : -this.cols;
            if (nextWord) {
                // Calculate the next potential index
                if (index === (forward ? this.grid.length - 1 : 0)) {
                    index = forward ? 0 : this.grid.length - 1;
                } else {
                    index += xIncrement;
                }

                // Check if there is a word at the index
                if (this.gridNums[index] !== 0) {
                    position = this._findWord(index, this.across);
                    if (position !== undefined && index === position.startIndex) {
                        if (!skipFilled || this.answerGrid[index] === " ") {
                            break;
                        }
                        nextWord = false;
                        forceForward = true;
                    }
                }
            } else {
                // Check if the index will leave the current word
                if (across !== this.across || index === ((forward || forceForward) ? position.endIndex : position.startIndex)) {
                    if (stopAtBoundary) {
                        break;
                    } else if (labelOrder) {
                        index = position.startIndex;
                        nextWord = true;
                        forceForward = false;
                        continue;
                    }
                }
                // Calculate the next index
                if (index === ((forward || forceForward) ? this.grid.length - 1 : 0)) {
                    index = (forward || forceForward) ? 0 : this.grid.length - 1;
                } else {
                    index += across ? xIncrement : yIncrement;
                    if (index < 0) {
                        index = index + this.grid.length - 1;
                    } else if (index >= this.grid.length) {
                        index = index - this.grid.length + 1;
                    }
                }

                if (this.grid[index] !== ".") {
                    if (!skipFilled || this.answerGrid[index] === " ") {
                        break;
                    }
                }
            }
        }

        position = this._findWord(index, this.across);
        if (position !== undefined) {
            this.updatePosition(position);
        } else {
           this._switch(index);
        }
    }

    _switch(index) {
        let position = this._findWord(index, !this.across);
        if (position !== undefined) {
            this.across = !this.across;
            this.updatePosition(position);
        }
    }

    _findWord(index, across) {
        let newStartIndex = index;
        let newEndIndex = index;

        const minIndex = across ? Math.floor(index / this.cols) * this.cols : index % this.cols;
        for (let newIndex = index; newIndex >= minIndex; newIndex -= across ? 1 : this.cols) {
            if (this.grid[newIndex] === ".") {
                break;
            }
            newStartIndex = newIndex;
        }
        const maxIndex = across ? minIndex + this.cols : this.grid.length;
        for (let newIndex = index; newIndex < maxIndex; newIndex += across ? 1 : this.cols) {
            if (this.grid[newIndex] === ".") {
                break;
            }
            newEndIndex = newIndex;
        }

        if (newStartIndex !== newEndIndex) {
            return new HighlightPosition(index, newStartIndex, newEndIndex);
        }

        return undefined;
    }
}

customElements.define('lit-crossword', LitCrossword);
