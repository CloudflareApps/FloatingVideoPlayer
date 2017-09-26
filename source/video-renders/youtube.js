const fullRe = /(?:https?:\/\/)?(?:www\.)?youtube.com\/(watch|playlist)\?(v|list)=([a-zA-Z0-9\-_]+)/i
const shortRe = /(?:https?:\/\/)?youtu.be\/([a-zA-Z0-9]+)(?:\?list=([a-zA-Z0-9\-_]+))?/i

function parseURL (url) {
  let match = fullRe.exec(url)
  let type = 'watch'
  let id = '5Y85otqcPak'

  if (match) {
    return {
      type: match[1],
      id: match[3]
    }
  }

  match = shortRe.exec(url)

  if (match) {
    if (match[2]) {
      type = 'playlist'
      id = match[2]
    } else {
      id = match[1]
    }
  }

  return {type, id}
}

export default function youtubeRenderer (options) {
  const info = parseURL(options.videoSource.youtubeURL)
  // if (!info) return
  let iframeURL = 'https://www.youtube.com/embed'

  if (info.type === 'watch') {
    iframeURL += '/' + info.id + '?'
  } else {
    iframeURL += '?listType=playlist&list=' + info.id
  }

  if (options.player.autoplay) {
    iframeURL += '&autoplay=1'
  }

  if (options.player.hideControls) {
    iframeURL += '&controls=0'
  }

  iframeURL += '&modestbranding=1'

  const iframe = document.createElement('iframe')
  iframe.className = 'cf-player-element'
  iframe.src = iframeURL
  iframe.frameBorder = '0'
  iframe.setAttribute('allowfullscreen', '')

  return iframe
}
