exports.all = function(object) {
  return Object.keys(object).map(function(i){
    return object[i];
  });
};

exports.opposite = function(object, ids) {
  return Object.keys(object).filter(function(i){
    return ids.indexOf(parseInt(i)) === -1
  });
};
