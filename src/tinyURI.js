const { isUndefined } = require('./helper.js');

function TinyURI() {
}

TinyURI.encode = (string) => {
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escape)
      .replace(/\*/g, '%2A');
};

TinyURI.encodeQuery = (string, escapeQuerySpace) => {
    var escaped = TinyURI.encode(string + '');
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

module.exports = TinyURI;
