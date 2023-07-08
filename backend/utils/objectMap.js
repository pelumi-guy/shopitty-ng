const objectMap = (object, mapFn) => {
    return Object.keys(object).reduce(function(result, key) {
        let v = object[key];
        if (typeof v === 'object' && !Array.isArray(v) && v !== null) {
            const temp = objectMap(v, mapFn);
            v = temp;
            // console.log({v});
        }
        // console.log({v});
      result[key] = mapFn(v);

      return result;
    }, {});
  };

  module.exports = objectMap;