const REGEX_NOT_AN_ASCII = /[^\x20-\x7E]/; //not-ASCII chars
const REGEX_SEPARATORS = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

const INVALID_HOSTNAME_CHARACTERS = /[^a-zA-Z0-9\.\-:_]/;
const HOST_PROTOCOLS  = [
    'http',
    'https'
];