const scrollToTop = (prevProps, props) => {
  if (!prevProps || !props) {
    return true
  }

  if (prevProps.location.pathname !== props.location.pathname) {
    return [0, 0]
  }

  return true
}

export default scrollToTop
