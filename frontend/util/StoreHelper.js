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

exports.addAvailability = function(a, resourceType, resourceList) {
  if (a.resourceType === resourceType) {

    var resource = resourceList[a.resourceId];

    delete a['resourceType']
    delete a['resourceId']

    if (a.availType === 'GENERAL') {
      delete a['availType'];
      resource.generalAvailabilities.push(a);

    } else {
      delete a['availType'];
      resource.specificAvailabilities.push(a);
    }

  }
};

exports.removeAvailability = function(a, resourceType, resourceList) {

  if (a.resourceType === resourceType) {

    var resource = resourceList[a.resourceId];
    if (a.availType === 'GENERAL'){
      var list = resource.generalAvailabilities;
    } else {
      var list = resource.specificAvailabilities;
    }

    for (var i = 0; i < list.length; i++) {
      if (list[i].id === a.availId) {
        list.splice(i, 1);
        break;
      }
    }

  }

};
