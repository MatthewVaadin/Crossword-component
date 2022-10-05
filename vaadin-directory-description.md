[![Published on vaadin.com/directory](https://img.shields.io/badge/Vaadin%20Directory-published-blue.svg?colorB=00b4f0)](https://vaadin.com/directory/component/matthew_vaadinlit-crossword)
[![Star on vaadin.com/directory](https://img.shields.io/vaadin-directory/star/matthew_vaadinlit-component.svg)](https://vaadin.com/directory/component/matthew_vaadinlit-component)
[![Rating on vaadin.com/directory](https://img.shields.io/vaadin-directory/rating/matthew_vaadinlit-component.svg)](https://vaadin.com/directory/component/matthew_vaadinlit-component)
[![Rating count on vaadin.com/directory](https://img.shields.io/vaadin-directory/rc/matthew_vaadinlit-component.svg)](https://vaadin.com/directory/component/matthew_vaadinlit-component)
[![Latest version on vaadin.com/directory](https://img.shields.io/vaadin-directory/v/matthew_vaadinlit-component)](https://vaadin.com/directory/component/matthew_vaadinlit-component)
[![Latest release date on vaadin.com/directory](https://img.shields.io/vaadin-directory/rd/matthew_vaadinlit-component.svg)](https://vaadin.com/directory/component/matthew_vaadinlit-component)

# &lt;lit-crossword&gt;

[&lt;lit-crossword&gt;](https://vaadin.com/directory/component/matthew_vaadinlit-component) is a [Lit](https://lit.dev/) web component for a multiplayer crossword puzzle in Vaadin 14+.

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
```html
<lit-crossword></lit-crossword>
```


# Getting Started  

To use &lt;lit-crossword&gt;, create an instance of the Crossword class, passing a unique identifier for the local user. Then pass a valid Puzzle instance to the setPuzzle() method. Puzzle is a JSON parser that uses the standard defined <a href="https://www.xwordinfo.com/JSON/">here</a>.
