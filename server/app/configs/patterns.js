const { isMediaStream, isBlobUrl } = require('./utils');

const MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//
const MATCH_URL_SOUNDCLOUD = /(?:soundcloud\.com|snd\.sc)\/[^.]+$/
const MATCH_URL_VIMEO = /vimeo\.com\/(?!progressive_redirect).+/
const MATCH_URL_FACEBOOK = /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/
const MATCH_URL_FACEBOOK_WATCH = /^https?:\/\/fb\.watch\/.+$/
const MATCH_URL_STREAMABLE = /streamable\.com\/([a-z0-9]+)$/
const MATCH_URL_WISTIA = /(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?(.*)$/
const MATCH_URL_TWITCH_VIDEO = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/
const MATCH_URL_TWITCH_CHANNEL = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/
const MATCH_URL_DAILYMOTION = /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/
const MATCH_URL_MIXCLOUD = /mixcloud\.com\/([^/]+\/[^/]+)/
const MATCH_URL_VIDYARD = /vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/
const MATCH_URL_KALTURA = /^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_]+)$/
const AUDIO_EXTENSIONS = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i
const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i
const HLS_EXTENSIONS = /\.(m3u8)($|\?)/i
const DASH_EXTENSIONS = /\.(mpd)($|\?)/i
const FLV_EXTENSIONS = /\.(flv)($|\?)/i

const canPlayFile = url => {
  if (url instanceof Array) {
    for (const item of url) {
      if (typeof item === 'string' && canPlayFile(item)) {
        return true
      }
      if (canPlayFile(item.src)) {
        return true
      }
    }
    return false
  }
  if (isMediaStream(url) || isBlobUrl(url)) {
    return true
  }
  return (
    AUDIO_EXTENSIONS.test(url) ||
    VIDEO_EXTENSIONS.test(url) ||
    HLS_EXTENSIONS.test(url) ||
    DASH_EXTENSIONS.test(url) ||
    FLV_EXTENSIONS.test(url)
  )
}

const canPlay = {
  youtube: url => {
    if (url instanceof Array) {
      return url.every(item => MATCH_URL_YOUTUBE.test(item))
    }
    return MATCH_URL_YOUTUBE.test(url)
  },
  soundcloud: url => MATCH_URL_SOUNDCLOUD.test(url) && !AUDIO_EXTENSIONS.test(url),
  vimeo: url => MATCH_URL_VIMEO.test(url) && !VIDEO_EXTENSIONS.test(url) && !HLS_EXTENSIONS.test(url),
  facebook: url => MATCH_URL_FACEBOOK.test(url) || MATCH_URL_FACEBOOK_WATCH.test(url),
  streamable: url => MATCH_URL_STREAMABLE.test(url),
  wistia: url => MATCH_URL_WISTIA.test(url),
  twitch: url => MATCH_URL_TWITCH_VIDEO.test(url) || MATCH_URL_TWITCH_CHANNEL.test(url),
  dailymotion: url => MATCH_URL_DAILYMOTION.test(url),
  mixcloud: url => MATCH_URL_MIXCLOUD.test(url),
  vidyard: url => MATCH_URL_VIDYARD.test(url),
  kaltura: url => MATCH_URL_KALTURA.test(url),
  file: canPlayFile
}

module.exports = {
    canPlay,
    MATCH_URL_YOUTUBE,
    MATCH_URL_SOUNDCLOUD,
    MATCH_URL_VIMEO,
    MATCH_URL_FACEBOOK,
    MATCH_URL_FACEBOOK_WATCH,
    MATCH_URL_STREAMABLE,
    MATCH_URL_WISTIA,
    MATCH_URL_TWITCH_VIDEO,
    MATCH_URL_TWITCH_CHANNEL,
    MATCH_URL_DAILYMOTION,
    MATCH_URL_MIXCLOUD,
    MATCH_URL_VIDYARD,
    MATCH_URL_KALTURA,
    AUDIO_EXTENSIONS,
    VIDEO_EXTENSIONS,
    HLS_EXTENSIONS,
    DASH_EXTENSIONS,
    FLV_EXTENSIONS,
}