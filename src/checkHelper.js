isUndefined = (value) => {
    return value === void 0;
};

isArray = Array.isArray || function(value) {
    return toString.call(value) === '[object Array]';
};

module.exports = {
    isUndefined, isArray
}