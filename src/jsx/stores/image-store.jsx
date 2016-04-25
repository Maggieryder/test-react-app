var request = require('superagent');
var Reflux = require('reflux');
var Actions = require('../actions/actions.jsx');

var ImageStore = Reflux.createStore({
  listenables: [Actions],
  uploadImages:function(file){
    console.log('files to upload', file.name);
    var req = request.post('/upload')
    //req.type('image/*');
    //files.forEach(function(file){
      //console.log(file.name, file);
      //req.attach(file.name, file);
    //});
    //req
    .attach(file.name, file)
    .end(function(err,res){
      if (err){
        console.log("ERROR", err);
      } else {
        console.log('SUCCESS', res);
        this.image = file;
        this.triggerUpdate();
      }
    }.bind(this));
  },

  // refresh data
  triggerUpdate: function(){
    this.trigger('change', this.image);
  }
});

module.exports = ImageStore;

/*API.post('/upload', files)
.then(function(response){
  this.console(response, "UPLOAD IMAGE");
  this.images = response;
  // refresh data
  this.triggerUpdate();
}.bind(this));
},
var formData = new FormData();
for (var key in files) {
  // is the item a File?
  if (files.hasOwnProperty(key) && files[key] instanceof File) {
    console.log(key, files[key]);
    formData.append(key, files[key]);
  }
}
console.log('++++>', formData[0]);*/
