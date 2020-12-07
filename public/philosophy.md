A line of code will be read 100s or 1000s of times and written hopefully once. Readability matters.

### Testing

I do not practice TDD, but I am open to it. I do practice BDD, in that I write down in English what a component should do (a spec) before writing any code. Once I have a decent beta version of the component I'll start writing tests based on that spec. My experience is that writing the tests first often leads to rewriting the tests as your assumptions about what a component is responsible for change as you get into the implementation. When this happens (which is almost always) the spec needs to change as well, but it is far easier to rework the spec than it is an entire battery of tests.

    <!-- <p>
      A bad idea with a good presentation is doomed eventually, a good idea with
      a bad presentation is doomed from the start.
    </p>
    <p>
      A line of code might be read thousands of times and written only once,
      therefore readable code is more important than saving lines.
    </p>
    <p>
      Spending an hour at a whiteboard can save you three at a keyboard.
    </p> -->
