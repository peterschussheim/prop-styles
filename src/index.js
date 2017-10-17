/**
 * @param {Object} styles The prop to styles object
 * @return {Function} the dynamic styles function
 */

export default function propStyles(styles) {
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
