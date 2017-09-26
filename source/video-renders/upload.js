export default function uploadRenderer (options) {
  // const playerConfig = options.videoSource.upload
  const playerConfig = {
    videos: [{
      id: 'abc123',
      sources: [
        {
          src: 'https://video.t3st3r.net/3338100/0266e98d63a376bced87c4dab892ff13.out/manifest/video.mpd',
          type: 'application/dash+xml'
        },
        {
          src: 'https://video.t3st3r.net/3338100/0266e98d63a376bced87c4dab892ff13.out/manifest/video.m3u8',
          type: 'application/x-mpegURL'
        }
      ]
    }]
  }

  const playerElement = INSTALL.createMediaPlayer(playerConfig)
  playerElement.classList.add('cf-player-element')

  return playerElement
}
