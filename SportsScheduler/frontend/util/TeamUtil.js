
exports.getMatching = function(searchString){
  return Object.keys(_teams).filter(function(team){
    return (
      team.name.indexOf(searchString) > -1  ||
      team.email.indexOf(searchString) > -1 ||
      team.contactName.indexOf(searchString) > -1 ||
      team.phone.indexOf(searchString) > -1
    );
  });
};
