var Reflux = require('reflux');

var Actions = Reflux.createActions([
  "getSections",
  "getUsers",
  "findUser",
  "getUser",
  "addUser",
  "updateUser",
  "deleteUser",
  "uploadImages",
  "showModal",
  "hideModal",
]);

module.exports = Actions;
