# prop-styles

Utility to create flexible React components which accepts props to enable/disable certain styles.

---

[![Travis](https://img.shields.io/travis/peterschussheim/prop-styles.svg?style=flat-square)](https://travis-ci.org/peterschussheim/prop-styles)

- [prop-styles](#prop-styles)
  - [Why](#why)
  - [This Solution](#this-solution)
  - [Installation](#installation)
  - [Usage](#usage)
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

<details>
<summary>
Example using glamorous, without ThemeProvider
</summary>

[Live demo](https://codesandbox.io/s/kx3q8kmx17)

This is a minimal example of `prop-styles` usage with `glamorous`:


```javascript
import React from 'react'
import { render } from 'react-dom'
import glamorous, { Div } from 'glamorous'
import propStyles from 'prop-styles'

const button = {
  fontSize: 16,
  margin: 10,
  border: 'none',
  cursor: 'pointer',
  display: 'inline-block',
  padding: '10px 20px',
  textAlign: 'center',
  transition: '0.25s cubic-bezier(0.17, 0.67, 0.52, 0.97)',
  borderRadius: 0,
  color: '#fff',
  boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
  ':hover': {
    opacity: 0.7,
    transform: 'translateY(-1px)',
    boxShadow: '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)'
  },
  ':focus': { outline: 0 },
  ':active': {
    transform: 'translateY(1px)'
  }
}

const small = {
  padding: '8px 16px'
}

const large = {
  padding: '12px 24px'
}

const colors = {
  success: '#29A88E',
  danger: '#C65F4A',
  primary: '#6DCFD3',
  info: '#FFD035',
  gray: '#5A6E73',
  accent: '#8E83A3'
}

const Button = glamorous.button(
  button,
  propStyles({
    success: success => ({ backgroundColor: colors.success }),
    danger: danger => ({ backgroundColor: colors.danger }),
    primary: primary => ({ backgroundColor: colors.primary }),
    info: info => ({ backgroundColor: colors.info }),
    gray: gray => ({ backgroundColor: colors.gray }),
    accent: accent => ({ backgroundColor: colors.accent }),
    small: [button, small, { fontSize: 12 }],
    large: [button, large, { fontSize: 18 }]
  })
)

function App() {
  return (
    <Div>
      <Div>
        <Button small success>
          Success
        </Button>
        <Button small danger>
          Danger
        </Button>
        <Button small primary>
          Primary
        </Button>
        <Button small info>
          Info
        </Button>
        <Button small gray>
          Gray
        </Button>
        <Button small accent>
          Accent
        </Button>
      </Div>
      <Div>
        <Button success>Success</Button>
        <Button danger>Danger</Button>
        <Button primary>Primary</Button>
        <Button info>Info</Button>
        <Button gray>Gray</Button>
        <Button accent>Accent</Button>
      </Div>
      <Div>
        <Button large success>
          Success
        </Button>
        <Button large danger>
          Danger
        </Button>
        <Button large primary>
          Primary
        </Button>
        <Button large info>
          Info
        </Button>
        <Button large gray>
          Gray
        </Button>
        <Button large accent>
          Accent
        </Button>
      </Div>
    </Div>
  )
}

render(<App />, document.getElementById('root'))
```
</details>

<details>
<summary>
Example with glamorous
</summary>

[Live demo](https://codesandbox.io/s/92m6q0krqr)

Similar to the example above, this sample shows how `prop-styles` and `glamorous` `ThemeProvider` work together:

```javascript
import React from "react"
import { render } from "react-dom"
import glamorous, { ThemeProvider } from "glamorous"
import propStyles from "prop-styles"

const heading = {
  display: "block",
  fontFamily: "inherit",
  fontWeight: "500",
  lineHeight: "1.1"
}

const largerHeading = {
  marginTop: "20px",
  marginBottom: "10px"
}

const smallerHeading = {
  marginTop: "10px",
  marginBottom: "10px"
}

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
)

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
  )
}

render(<App />, document.getElementById("root"));
```
</details>

<details>
<summary>
Example with styled-components
</summary>

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
</details>

## Inspiration

- [Kent C. Dodds](https://twitter.com/kentcdodds)
- [Ryan Florence](https://twitter.com/ryanflorence)
- [reactpatterns.com](http://reactpatterns.com/#style-component)

## License

AGPL-3.0

