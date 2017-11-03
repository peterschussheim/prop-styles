# prop-styles

[![Travis](https://img.shields.io/travis/peterschussheim/prop-styles.svg?style=flat-square)](https://travis-ci.org/peterschussheim/prop-styles)

Utility to create flexible React components which accepts props to enable/disable certain styles.

---

- [prop-styles](#prop-styles)
  - [Why](#why)
  - [This Solution](#this-solution)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Example: `glamorous`](#example-glamorous)
    - [Example: `styled-components`](#example-styled-components)
  - [Inspiration](#inspiration)
  - [License](#license)

## Why

I like implementing and using React components using a code style where during component usage, a prop can be added as a 'flag', rather than relying on ternaries to handle the logic.  In my opinion, this leads to improved legibility and has the potential to reduce typos.

Credit for the original source goes to [Kent C. Dodds](https://twitter.com/kentcdodds) who [was kind enough to post a snippet](https://codesandbox.io/s/AGRRMl63).

## This Solution

Exposes a function, `propStyles` that accepts an object where the key is a prop and the value are the styles that should be applied if that prop is passed. Returns a **function** which you pass to a
`glamorousComponentFactory`.

Users of `styled-components` should reference the [example](#example---styled-componentshttpswwwstyled-componentscom) below.

## Installation

This package is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/en/) and should be installed as one of your project's `dependencies`:

`yarn add prop-styles` or `npm install -s prop-styles`

## Usage

### Example: `glamorous`

Usage with [💄`glamorous`💄](https://glamorous.rocks).

[Live demo](https://codesandbox.io/s/92m6q0krqr)

```javascript
import React from "react";
import { render } from "react-dom";
import glamorous, { ThemeProvider } from "glamorous";
import propStyles from "prop-styles";

const heading = {
  display: "block",
  fontFamily: "inherit",
  fontWeight: "500",
  lineHeight: "1.1"
};
const largerHeading = {
  marginTop: "20px",
  marginBottom: "10px"
};

const smallerHeading = {
  marginTop: "10px",
  marginBottom: "10px"
};

// shoutout to https://seek-oss.github.io/seek-style-guide/typography/
const Text = glamorous.span(
  propStyles({
    faded: ({ theme }) => ({ color: theme.colors.faded }),
    fadedExtra: ({ theme }) => ({ color: theme.colors.fadedExtra }),
    superheading: [heading, largerHeading, { fontSize: 36 }],
    heading: [heading, largerHeading, { fontSize: 30 }],
    subheading: [heading, largerHeading, { fontSize: 24 }],
    superstandard: [heading, smallerHeading, { fontSize: 18 }],
    standard: [heading, smallerHeading, { fontSize: 14 }],
    substandard: [heading, smallerHeading, { fontSize: 12 }]
  })
);

function App() {
  return (
    <ThemeProvider
      theme={{
        colors: {
          faded: "#666",
          fadedExtra: "#888"
        }
      }}
    >
      <glamorous.Div maxWidth={600} margin="auto">
        <Text>Normal</Text>
        <Text subheading>subheading</Text>
        <Text faded superheading>
          faded superheading
        </Text>
        <Text fadedExtra substandard>
          fadedExtra substandard
        </Text>
      </glamorous.Div>
    </ThemeProvider>
  );
}

render(<App />, document.getElementById("root"));
```

### Example: `styled-components`

Usage with [`styled-components`](https://www.styled-components.com/).

[Live demo](https://codesandbox.io/s/10ml2qn394)

```javascript
import React from 'react'
import {render} from 'react-dom'
import styled, {ThemeProvider} from 'styled-components'
import propStyles from 'prop-styles'

const heading = {
  display: 'block',
  fontFamily: 'inherit',
  fontWeight: '500',
  lineHeight: '1.1',
}
const largerHeading = {
  marginTop: '20px',
  marginBottom: '10px',
}

const smallerHeading = {
  marginTop: '10px',
  marginBottom: '10px',
}

// shoutout to https://seek-oss.github.io/seek-style-guide/typography/
const textPropStyles = propStyles({
  faded: ({theme}) => ({color: theme.colors.faded}),
  fadedExtra: ({theme}) => ({color: theme.colors.fadedExtra}),
  superheading: [heading, largerHeading, {fontSize: '36px'}],
  heading: [heading, largerHeading, {fontSize: '30px'}],
  subheading: [heading, largerHeading, {fontSize: '24px'}],
  superstandard: [heading, smallerHeading, {fontSize: '18px'}],
  standard: [heading, smallerHeading, {fontSize: '14px'}],
  substandard: [heading, smallerHeading, {fontSize: '12px'}],
})
const Text = styled.span`${textPropStyles};`

function App() {
  return (
    <ThemeProvider
      theme={{
        colors: {
          faded: '#666',
          fadedExtra: '#888',
        },
      }}
    >
      <div style={{maxWidth: 600, margin: 'auto'}}>
        <Text>Normal</Text>
        <Text subheading>subheading</Text>
        <Text faded superheading>
          faded superheading
        </Text>
        <Text fadedExtra substandard>
          fadedExtra substandard
        </Text>
      </div>
    </ThemeProvider>
  )
}

render(<App />, document.getElementById('root'))
```

## Inspiration

- [Kent C. Dodds](https://twitter.com/kentcdodds)
- [Ryan Florence](https://twitter.com/ryanflorence)
- [reactpatterns.com](http://reactpatterns.com/#style-component)

## License

AGPL-3.0

