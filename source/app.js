import * as videoRenders from './video-renders'

(function () {
  'use strict'

  if (!window.addEventListener) return // Check for IE9+

  let options = INSTALL_OPTIONS
  let appContainer
  let playerContainer

  function updatePlayerPosition () {
    appContainer.setAttribute('data-horizontal-alignment', options.player.horizontalAlignment)
    appContainer.setAttribute('data-corner-alignment', options.player.cornerAlignment)
  }

  function updateContainer () {
    appContainer = INSTALL.createElement(options.player.location, appContainer)
    appContainer.setAttribute('app', 'floating-video-player')
    updatePlayerPosition()

    playerContainer = document.createElement('player-container')
    playerContainer.appendChild(videoRenders[options.videoSource.location](options))

    appContainer.appendChild(playerContainer)
  }

  const cornerOffset = 10

  function checkContainerVisibility (intersections) {
    // const domRect = playerContainer.getBoundingClientRect()
    const [intersection] = intersections
    let top = playerContainer.dataset.originTop
    let left = playerContainer.dataset.originLeft
    let height = playerContainer.dataset.originHeight
    let width = playerContainer.dataset.originWidth

    if (!intersection.isIntersecting) {
      height = height / 2
      width = width / 2
      top = window.innerHeight - height - cornerOffset
      left = window.innerWidth - width - cornerOffset
    }

    playerContainer.style.height = height + 'px'
    playerContainer.style.width = width + 'px'
    playerContainer.style.top = top + 'px'
    playerContainer.style.left = left + 'px'
    appContainer.dataset.visibility = intersection.isIntersecting ? 'visible' : 'obscured'
  }

  function bootstrap () {
    updateContainer()

    window.requestAnimationFrame(() => {
      const domRect = playerContainer.getBoundingClientRect()
      appContainer.style.minHeight = domRect.height + 'px'

      playerContainer.dataset.originHeight = domRect.height
      playerContainer.dataset.originWidth = domRect.width
      playerContainer.dataset.originTop = domRect.top
      playerContainer.dataset.originLeft = domRect.left

      var observer = new window.IntersectionObserver(checkContainerVisibility, {
        rootMargin: '0px',
        threshold: [0, 1]
      })

      observer.observe(appContainer)
    })
  }

  window.INSTALL_SCOPE = {
    setOptions (nextOptions) {
      options = nextOptions

      updateContainer()
    },
    setPlayerPosition (nextOptions) {
      options = nextOptions

      updatePlayerPosition()
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap)
  } else {
    bootstrap()
  }
}())
