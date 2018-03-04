const { isUndefined, isArray, arrayContains } = require('./checkHelper.js');
const { INVALID_HOSTNAME_CHARACTERS, HOST_PROTOCOLS } = require('./constants.js');

function TinyURI() {
}

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
    const rejectEmptyHostname = hasProtocol ? rejectEmptyHostname = HOST_PROTOCOLS.includes(protocol) : false;

    if (rejectEmptyHostname && !hasHostname) {
        throw new TypeError('Hostname cannot be empty, if protocol is ' + protocol);
    } else if (v && v.match(INVALID_HOSTNAME_CHARACTERS)) {
        if (toASCII(v).match(INVALID_HOSTNAME_CHARACTERS)) {
            throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_]');
        }
    }
};

module.exports = TinyURI;
