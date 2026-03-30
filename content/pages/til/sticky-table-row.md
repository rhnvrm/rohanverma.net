+++
title = "How to Make a Table Row Sticky"
weight = 3
template = "pages-page.html"
date = 2024-10-21
draft = false

[extra]
section_title = "TIL"
+++

I needed to pin a summary row at the bottom of a scrollable data table, the kind where you have hundreds of rows and the totals row should always be visible. Came up while building a real-time options table with lots of scrolling.

## The approach

The basic idea is `position: sticky` on a `<tr>` or `<tfoot>` with `bottom: 0`. This pins the row to the bottom of the scroll container.

```css
tfoot tr {
  position: sticky;
  bottom: 0;
  background: var(--bg); /* prevent content bleeding through */
  z-index: 1;
}
```

For header pinning, same idea but `top: 0` on `<thead>`.

The tricky part is that `position: sticky` on table elements requires the table (or its container) to be the scroll container. If the page itself scrolls instead of the table, the sticky row sticks to the viewport, not what you want. Wrap the table in a `div` with `overflow-y: auto` and a fixed height.

For row pinning mid-table (not header/footer), libraries like [Material React Table](https://www.material-react-table.com/docs/guides/row-pinning) handle it by absolutely positioning pinned rows. The [Cushion App approach](https://cushionapp.com/journal/sticky-line-item-totals) is simpler: just sticky footers.

## Mobile gotchas

`position: sticky` breaks on some mobile browsers. Common causes:

- **`overflow: hidden`** on any ancestor kills sticky behavior. The element needs an actual scroll container up the chain
- **`-webkit-overflow-scrolling: touch`** on iOS can interfere
- Some Android browsers don't support sticky on `<tr>` elements, so you may need to apply it to each `<td>` in the row instead

Relevant threads: [SO #1](https://stackoverflow.com/questions/70653610/sticky-position-is-not-working-only-on-mobile), [SO #2](https://stackoverflow.com/questions/60511542/css-sticky-position-not-working-properly-on-mobile)

## References

- [CSS-Tricks: Making Tables with Sticky Header and Footers](https://css-tricks.com/making-tables-with-sticky-header-and-footers-got-a-bit-easier/)
- [MDN: Element.scrollIntoView()](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) — alternative approach: scroll the target row into view programmatically
- [Material React Table: Row Pinning](https://www.material-react-table.com/docs/guides/row-pinning)
