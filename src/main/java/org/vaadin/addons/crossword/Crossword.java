package org.vaadin.addons.crossword;

import java.util.Arrays;
import java.util.stream.Collectors;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.DomEvent;
import com.vaadin.flow.component.EventData;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.shared.Registration;

@Tag("lit-crossword")
@JsModule("./LitCrossword.js")
public class Crossword extends Component {
    public Crossword(String localUserId) {
        super();
        this.getElement().setProperty("localUserId", localUserId);
    }

    /**
     * Sets the crossword puzzle data using the <code>Puzzle</code> class.
     * This class is designed to be populated from a JSON file that conforms
     * to the format <a href="https://www.xwordinfo.com/JSON/">here</a>.
     * <p>
     * If there is any issue with the supplied puzzle, the <code>error</code>
     * property is set to <code>true</code> and a message is printed in the
     * component.
     * @param puzzle The puzzle data
     */
    public void setPuzzle(Puzzle puzzle) {
        try {
            this.getElement().setProperty("title", puzzle.getTitle());
            this.getElement().setProperty("author", puzzle.getAuthor());
            this.getElement().setProperty("cols", puzzle.getCols());
            this.getElement().setProperty("rows", puzzle.getRows());
            this.getElement().executeJs("this.grid = [" +
                    Arrays.stream(puzzle.getGrid())
                            .map(s -> "\"" + s + "\"")
                            .collect(Collectors.joining(",")) +
                    "];");
            this.getElement().executeJs("this.answerGrid = [" +
                    Arrays.stream(puzzle.getGrid())
                            .map(s -> "\" \"")
                            .collect(Collectors.joining(",")) +
                    "];");
            this.getElement().executeJs("this.gridNums = [" +
                    Arrays.stream(puzzle.getGridnums())
                            .mapToObj(String::valueOf)
                            .collect(Collectors.joining(",")) +
                    "];");
            this.getElement().executeJs("this.acrossAnswers = [" +
                    Arrays.stream(puzzle.getAcrossAnswers())
                            .map(s -> "\"" + s + "\"")
                            .collect(Collectors.joining(",")) +
                    "];");
            this.getElement().executeJs("this.downAnswers = [" +
                    Arrays.stream(puzzle.getDownAnswers())
                            .map(s -> "\"" + s + "\"")
                            .collect(Collectors.joining(",")) +
                    "];");
            this.getElement().executeJs("this.acrossClues = [" +
                    Arrays.stream(puzzle.getAcrossClues())
                            .map(s -> "\"" + s.replaceAll("\"", "\\\\\"") +
                                    "\"")
                            .collect(Collectors.joining(",")) +
                    "];");
            this.getElement().executeJs("this.downClues = [" +
                    Arrays.stream(puzzle.getDownClues())
                            .map(s -> "\"" + s.replaceAll("\"", "\\\\\"") +
                                    "\"")
                            .collect(Collectors.joining(",")) +
                    "];");
            this.getElement().setProperty("error", false);
        } catch (Exception e) {
            e.printStackTrace();
            this.getElement().setProperty("error", true);
        }
    }

    /**
     * Sets whether the crossword navigation will skip over already filled-in
     * cells. This does not apply to selecting a cell with the mouse (or
     * touch) or to the arrow keys. By default, this is set to <code>true</code>.
     * @param skipFilled <code>true</code> if the crossword navigation should
     *                   skip filled cells
     */
    public void setSkipFilled(boolean skipFilled) {
        this.getElement().setProperty("skipFilled", skipFilled);
    }

    /**
     * Returns the value of the <code>skipFilled</code> attribute.
     * @return The value of skipFilled
     */
    public boolean getSkipFilled() {
        return this.getElement().getProperty("skipFilled", true);
    }

    /**
     * Sets whether the crossword will display errors in the guessed letters.
     * By default, this is set to <code>false</code>.
     * @param showMistakes <code>true</code> if the crossword should show
     *                     mistakes
     */
    public void setShowMistakes(boolean showMistakes) {
        this.getElement().setProperty("showMistakes", showMistakes);
    }

    /**
     * Returns the value of the <code>showMistakes</code> attribute.
     * @return The value of showMistakes
     */
    public boolean getShowMistakes() {
        return this.getElement().getProperty("showMistakes", false);
    }

    /**
     * Sets the guessed letter at a specified index. Crosswords are stored as
     * a one-dimensional array, even though they appear as a two-dimensional
     * grid. The order of cells is from the top left corner, proceeding
     * from left to right, and then each subsequent row in the same way.
     * @param index The array index to set
     * @param letter The guessed letter
     */
    public void setLetter(int index, String letter) {
        this.getElement().executeJs("this.answerGrid[" + index + "] = \"" +
                letter + "\"");
    }

    /**
     * Adds a user to the crossword. Initially, the new user will not be
     * shown on the grid, as the highlight position is initialized at index -1.
     * The <code>colorIndex</code> is used to determine how the highlight
     * position will be shown. There are 7 colors indexed from 0-6. If a
     * value outside this range is given, the modulo will be taken.
     * @param id The unique user id
     * @param colorIndex The color index associated with the user
     */
    public void addUser(String id, int colorIndex) {
        this.getElement().callJsFunction("addUser",
                id, colorIndex);
    }

    /**
     * Updates the highlight position of the specified user.
     * @param id The user id
     * @param inputIndex The index where the user is currently focused.
     * @param startIndex The index at the start of the currently highlighted
     *                   word
     * @param endIndex The index at the end of the currently highlighted word
     */
    public void updateUser(String id, int inputIndex, int startIndex,
            int endIndex) {
        this.getElement().callJsFunction("updateUser",
                id, inputIndex, startIndex, endIndex);
    }

    /**
     * Removes the specified user from the crossword.
     * @param id The user id
     */
    public void removeUser(String id) {
        this.getElement().callJsFunction("removeUser", id);
    }

    /**
     * Adds a listener for updates to the guessed answer letters. The event
     * contains the array index and the new letter.
     * @param listener The update letter listener
     * @return A <code>Registration</code> instance
     */
    public Registration addUpdateLetterListener(ComponentEventListener<UpdateLetterEvent> listener) {
        return addListener(UpdateLetterEvent.class, listener);
    }

    /**
     * Adds a listener for updates to the highlight positions. The event
     * contains the user id, and the input, start and end indexes.
     * @param listener The update position listener
     * @return A <code>Registration</code> instance
     */
    public Registration addUpdatePositionListener(ComponentEventListener<UpdatePositionEvent> listener) {
        return addListener(UpdatePositionEvent.class, listener);
    }

    /**
     * A custom event for updates to guessed letters.
     */
    @DomEvent("update-letter")
    public static class UpdateLetterEvent extends ComponentEvent<Crossword> {
        private final int index;
        private final String letter;

        public UpdateLetterEvent(Crossword source, boolean fromClient,
                @EventData("event.detail.index") int index,
                @EventData("event.detail.letter") String letter) {
            super(source, fromClient);
            this.index = index;
            this.letter = letter;
        }

        public int getIndex() {
            return index;
        }

        public String getLetter() {
            return letter;
        }
    }

    /**
     * A custom event for updates to highlight positions.
     */
    @DomEvent("update-position")
    public static class UpdatePositionEvent extends ComponentEvent<Crossword> {
        private final String id;
        private final int inputIndex;
        private final int startIndex;
        private final int endIndex;

        public UpdatePositionEvent(Crossword source, boolean fromClient,
                @EventData("event.detail.id") String id,
                @EventData("event.detail.inputIndex") int inputIndex,
                @EventData("event.detail.startIndex") int startIndex,
                @EventData("event.detail.endIndex") int endIndex) {
            super(source, fromClient);
            this.id = id;
            this.inputIndex = inputIndex;
            this.startIndex = startIndex;
            this.endIndex = endIndex;
        }

        public String getId() {
            return id;
        }

        public int getInputIndex() {
            return inputIndex;
        }

        public int getStartIndex() {
            return startIndex;
        }

        public int getEndIndex() {
            return endIndex;
        }
    }
}
