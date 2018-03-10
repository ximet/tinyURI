const isUndefined = (value) => {
    return value === void 0;
};

const isArray = Array.isArray || function(value) {
    return toString.call(value) === '[object Array]';
};

const getType = (value) => {
    if (isUndefined(value)) {
        return 'Undefined';
    }

        return String(Object.prototype.toString.call(value)).slice(8, -1);
  }

module.exports = {
    isUndefined, isArray, getType
}