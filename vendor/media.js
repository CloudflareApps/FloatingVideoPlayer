(function () {
  'use strict'

  var playerScript = document.createElement('script')
  playerScript.src = 'https://video.t3st3r.net/js/cf-video-embed.0.0.1-10.js'
  playerScript.addEventListener('error', function playerScriptError (error) {
    console.error('Cloudflare Apps: Video Player failed to load', error)
  })

  CloudflareApps.createMediaPlayer = function createMediaPlayer (options) {
    options = options || {}
    options.videos = options.videos || []
    options.player = options.player || {}

    if (!document.head.contains(playerScript)) {
      document.head.appendChild(playerScript)
    }

    // TODO: Add playlist support.
    var video = options.videos[0]
    var videoElement = document.createElement('video')
    videoElement.autoplay = !!options.player.autoplay
    videoElement.muted = !!options.player.muted
    videoElement.setAttribute('data-cf-video', '')

    video.sources.forEach(function (source) {
      var sourceElement = document.createElement('source')
      sourceElement.src = source.src
      sourceElement.type = source.type

      videoElement.appendChild(sourceElement)
    })

    return videoElement
  }
}())
