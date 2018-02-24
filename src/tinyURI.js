const { isUndefined, isArray, arrayContains } = require('./helper.js');

function TinyURI() {
}

TinyURI.INVALID_HOSTNAME_CHARACTERS = /[^a-zA-Z0-9\.\-:_]/;
TinyURI.HOST_PROTOCOLS = [
  'http',
  'https'
];

TinyURI.encode = (string) => {
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escape)
      .replace(/\*/g, '%2A');
};

TinyURI.encodeQuery = (string, escapeQuerySpace) => {
    const escaped = TinyURI.encode(string + '');

    if (isUndefined(escapeQuerySpace)) {
      escapeQuerySpace = true;
    }

    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
};

TinyURI.decode = decodeURIComponent;

TinyURI.decodeQuery = (string, escapeQuerySpace) => {
    string += '';
    if (isUndefined(escapeQuerySpace)) {
      escapeQuerySpace = true;
    }

    try {
      return TinyURI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch(e) {
      return string;
    }
};

TinyURI.buildQueryParameter = (name, value, escapeQuerySpace) => {
    return TinyURI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + TinyURI.encodeQuery(value, escapeQuerySpace) : '');
};

TinyURI.buildQuery = (data, duplicateQueryParameters, escapeQuerySpace) => {
    let result = '';

    for (let key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && key) {
            if (isArray(data[key])) {
                let unique = {};
                for (let i = 0; i < data[key].length; i++) {
                    if (!isUndefined(data[key][i]) && isUndefined(unique[data[key][i] + ''])) {
                        result += '&' + TinyURI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
                        if (!duplicateQueryParameters) {
                            unique[data[key][i] + ''] = true;
                        }
                    }
                }
            } else if (!isUndefined(data[key])) {
                  result += '&' + TinyURI.buildQueryParameter(key, data[key], escapeQuerySpace);
            }
        }
    }

    return result.substring(1);
};

TinyURI.ensureValidHostname = (v, protocol) => {
    const hasHostname = !!v;
    const hasProtocol = !!protocol;
    const rejectEmptyHostname = hasProtocol ? rejectEmptyHostname = arrayContains(TinyURI.HOST_PROTOCOLS, protocol) : false;

    if (rejectEmptyHostname && !hasHostname) {
        throw new TypeError('Hostname cannot be empty, if protocol is ' + protocol);
    } else if (v && v.match(TinyURI.INVALID_HOSTNAME_CHARACTERS)) {
        if (!punycode) {
            throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available');
        }
        if (punycode.toASCII(v).match(TinyURI.INVALID_HOSTNAME_CHARACTERS)) {
            throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_]');
        }
    }
};

module.exports = TinyURI;
