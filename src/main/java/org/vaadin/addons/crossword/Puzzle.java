package org.vaadin.addons.crossword;

import java.util.ArrayList;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties({"acrossmap", "admin", "autowrap", "bbars",
        "code", "downmap", "hastitle", "hold", "id", "id2",
        "interpretcolors", "jnotes", "key", "mini", "notepad", "rbars",
        "shadecircles", "track", "type", "uniclue"})
public class Puzzle {
    private String title;
    private String author;
    private String editor;
    private String copyright;
    private String publisher;
    private String date;
    private String dow;

    private int cols;
    private int rows;
    private int[] circles;
    private String[] grid;
    private int[] gridnums;

    private String[] acrossAnswers;
    private String[] downAnswers;
    private String[] acrossClues;
    private String[] downClues;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getEditor() {
        return editor;
    }

    public void setEditor(String editor) {
        this.editor = editor;
    }

    public String getCopyright() {
        return copyright;
    }

    public void setCopyright(String copyright) {
        this.copyright = copyright;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDow() {
        return dow;
    }

    public void setDow(String dow) {
        this.dow = dow;
    }

    public int getCols() {
        return cols;
    }

    public void setCols(int cols) {
        this.cols = cols;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    @JsonProperty("size")
    private void unpackSize(Map<String,Object> size) {
        this.cols = (int)size.get("cols");
        this.rows = (int)size.get("rows");
    }

    public int[] getCircles() {
        return circles;
    }

    public void setCircles(int[] circles) {
        this.circles = circles;
    }

    public String[] getGrid() {
        return grid;
    }

    public void setGrid(String[] grid) {
        this.grid = grid;
    }

    public int[] getGridnums() {
        return gridnums;
    }

    public void setGridnums(int[] gridnums) {
        this.gridnums = gridnums;
    }

    public String[] getAcrossAnswers() {
        return acrossAnswers;
    }

    public void setAcrossAnswers(String[] acrossAnswers) {
        this.acrossAnswers = acrossAnswers;
    }

    public String[] getDownAnswers() {
        return downAnswers;
    }

    public void setDownAnswers(String[] downAnswers) {
        this.downAnswers = downAnswers;
    }

    @JsonProperty("answers")
    private void unpackAnswers(Map<String,String[]> answers) {
        this.acrossAnswers = answers.get("across");
        this.downAnswers = answers.get("down");
    }

    public String[] getAcrossClues() {
        return acrossClues;
    }

    public void setAcrossClues(String[] acrossClues) {
        this.acrossClues = acrossClues;
    }

    public String[] getDownClues() {
        return downClues;
    }

    public void setDownClues(String[] downClues) {
        this.downClues = downClues;
    }

    @JsonProperty("clues")
    private void unpackClues(Map<String,String[]> clues) {
        this.acrossClues = clues.get("across");
        this.downClues = clues.get("down");
    }
}
