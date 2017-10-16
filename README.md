# prop-styles

Utility to make it easier to create a glamorous component which accepts props to enable/disable certain styles.

---

- [prop-styles](#prop-styles)
  - [Why](#why)
  - [Usage](#usage)
    - [Installation](#installation)
    - [Example demonstrating a component that accepts prop 'flags'](#example-demonstrating-a-component-that-accepts-prop-flags)
  - [Contributing](#contributing)
  - [Notes](#notes)
  - [License](#license)

## Why

// TODO

## Usage

### Installation

`yarn add prop-styles` or `npm install -s prop-styles`

### Example demonstrating a component that accepts prop 'flags'
[Live demo](https://codesandbox.io/s/92m6q0krqr)

```javascript
import React from "react";
import { render } from "react-dom";
import glamorous, { ThemeProvider } from "glamorous";
import { propStyles } from "prop-styles";

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

## Contributing

// TODO

## Notes

- For the sake of simplicity, the data is contained in a JSON file.
- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## License

AGPL-3.0
