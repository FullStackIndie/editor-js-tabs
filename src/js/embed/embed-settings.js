export default class EmbedSettings {
  patterns = [
    {
      service: "youtu.be",
      pattern: "^https?://youtu\\.be\\/([a-zA-Z0-9_-]{11})",
    },
    {
      service: "youtube",
      pattern:
        "/(?:https?:\\/\\/)?(?:www\\.)?(?:youtube.com|youtu.be)\\/(?:watch\\?v=)?(.+)/i",
    },
    {
      service: "instagram",
      pattern: "/(?:https?:\\/\\/)?(?:www\\.)?instagram.com\\/p\\/([^\\/]+)/i",
    },
    {
      service: "twitter",
      pattern: "/(?:https?:\\/\\/)?(?:www\\.)?twitter.com\\/([^\\/]+)/i",
    },
    {
      service: "codepen",
      pattern: "/(?:https?:\\/\\/)?codepen.io\\/([^\\/]+)/i",
    },
    {
      service: "x",
      pattern: "/(?:https?:\\/\\/)?(?:www\\.)?x.com\\/([^\\/]+)/i",
    },
    {
      service: "vimeo",
      pattern: "/(?:https?:\\/\\/)?(?:www\\.)?vimeo.com\\/([^\\/]+)/i",
    },
    {
      service: "giphy",
      pattern: "/(?:https?:\\/\\/)?(?:www\\.)?giphy.com\\/gifs\\/([^\\/]+)/i",
    },
    {
      service: "imgur",
      pattern: "/(?:https?:\\/\\/)?(?:www\\.)?imgur.com\\/([^\\/]+)/i",
    },
    {
      service: "gist",
      pattern:
        '/<script src="(?:https?:\\/\\/)?(?:www\\.)?gist.github.com\\/([^\\/]+)\\/([^\\.]+).js"><\\/script>/i',
    },
  ];
}
