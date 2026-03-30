+++
title = "Go Testing Patterns"
weight = 1
template = "pages-page.html"
date = 2025-01-09
draft = false

[extra]
section_title = "Go"
+++

## `if got, want :=`

The `if got, want :=` pattern in Go tests improves clarity by clearly separating actual (`got`) and expected (`want`) values.

If you want to read a nice blog explaining this you can check this: [if got, want: A Simple Way to Write Better Go Tests · mtlynch.io](https://mtlynch.io/if-got-want-improve-go-tests/)

### Example

```go
func TestAdd(t *testing.T) {
  tests := []struct {
    a, b     int
    expected int
  }{
    {1, 2, 3},
    {2, 3, 5},
    {10, 5, 15},
  }

  for _, tt := range tests {
    t.Run(fmt.Sprintf("%d+%d", tt.a, tt.b), func(t *testing.T) {
      result := Add(tt.a, tt.b)
      if got, want := result, tt.expected; got != want {
        t.Errorf("got=%d, want=%d", got, want)
      }
    })
  }
}
```
