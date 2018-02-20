function TinyURI() {
}

TinyURI.encode = (string) => {
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escape)
      .replace(/\*/g, '%2A');
};

TinyURI.encodeQuery = (string, escapeQuerySpace) => {
    var escaped = TinyURI.encode(string + '');
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = true;
    }

    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
};
