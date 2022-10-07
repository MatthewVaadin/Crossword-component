[![Published on vaadin.com/directory](https://img.shields.io/badge/Vaadin%20Directory-published-blue.svg?colorB=00b4f0)](https://vaadin.com/directory/component/crossword-add-on)

# &lt;lit-crossword&gt;

[&lt;lit-crossword&gt;](https://vaadin.com/directory/component/crossword-add-on) is a [Lit](https://lit.dev/) web component for a multiplayer crossword puzzle in Vaadin 14+.


# Getting Started  

To use &lt;lit-crossword&gt;, create an instance of the Crossword class, passing a unique identifier for the local user. Then pass a valid Puzzle instance to the setPuzzle() method. Puzzle is a JSON parser that uses the standard defined <a href="https://www.xwordinfo.com/JSON/">here</a>.

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="vaadin-button.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->

```java
import java.io.InputStream;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.vaadin.addons.crossword.Crossword;
import org.vaadin.addons.crossword.Puzzle;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("")
public class CrosswordView extends VerticalLayout {
    Crossword crossword = new Crossword(UUID.randomUUID().toString());
    try {
        InputStream json = CrosswordView.class.getResource(
                "/puzzle.json").openStream();
        Puzzle puzzle = new ObjectMapper()
                .readerFor(Puzzle.class)
                .readValue(json);
        crossword.setPuzzle(puzzle);
    } catch (Exception e) {
        e.printStackTrace();
    }
    add(crossword);
}
```
