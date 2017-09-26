import * as videoRenders from './video-renders'

(function () {
  'use strict'

  if (!window.addEventListener) return // Check for IE9+

  let options = INSTALL_OPTIONS
  let container

  function updatePlayerPosition () {
    container.setAttribute('data-horizontal-alignment', options.player.horizontalAlignment)
    container.setAttribute('data-corner-alignment', options.player.cornerAlignment)
  }

  function updateContainer () {
    container = INSTALL.createElement(options.player.location, container)
    container.setAttribute('app', 'floating-video-player')
    updatePlayerPosition()


    const playerContainer = document.createElement('player-container')
    playerContainer.appendChild(videoRenders[options.videoSource.location](options))

    container.appendChild(playerContainer)
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
    document.addEventListener('DOMContentLoaded', updateContainer)
  } else {
    updateContainer()
  }
}())
