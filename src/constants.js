const REGEX_NOT_AN_ASCII = /[^\x20-\x7E]/; //not-ASCII chars
const REGEX_SEPARATORS = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

const INVALID_HOSTNAME_CHARACTERS = /[^a-zA-Z0-9\.\-:_]/;
const HOST_PROTOCOLS  = [
    'http',
    'https'
];

const DEFAULT_PORTS = {
    http: '80',
    https: '443',
    ftp: '21',
    gopher: '70',
    ws: '80',
    wss: '443'
};

module.exports = {
    REGEX_NOT_AN_ASCII,
    REGEX_SEPARATORS,
    INVALID_HOSTNAME_CHARACTERS,
    HOST_PROTOCOLS,
    DEFAULT_PORTS
}