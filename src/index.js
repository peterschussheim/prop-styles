// @flow

/**
 * Credit for inspiration and original source: https://codesandbox.io/s/AGRRMl63.
 * 
 * Makes it easier to create a glamorous component which
 * accepts props to enable/disable certain styles.
 *
 * accepts an object where the key is a prop and the value
 * is the styles that should be applied if that prop is
 * passed. Returns a function which you pass to a
 * glamorousComponentFactory.
 *
 * @param {Object} styles The prop to styles object
 * @return {Function} the dynamic styles function
 */

function propStyles(styles) {
  return function dynamicStyles(props) {
    return Object.keys(props).map(key => {
      if (props[key]) {
        return typeof styles[key] === 'function'
          ? styles[key](props)
          : styles[key]
      }
      return null
    })
  }
}

module.exports = {
  propStyles
}
