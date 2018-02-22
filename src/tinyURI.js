const { isUndefined, isArray } = require('./helper.js');

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

module.exports = TinyURI;
