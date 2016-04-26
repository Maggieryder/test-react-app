var React = require('react');

var Reflux = require('reflux');
var Actions = require('../../actions/actions.jsx');

var ReactDOMServer = require('react-dom/server');

var Bootstrap = require('react-bootstrap');
var ButtonInput = Bootstrap.ButtonInput;
var Image = Bootstrap.Image;
var Glyphicon = Bootstrap.Glyphicon;
var DropzoneComponent = require('react-dropzone-component');




var djsConfig = {
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview" style={{background:'transparent'}}>
      <div className="dz-image">
        <img data-dz-thumbnail="true" />
      </div>
      <div className="dz-details">
        <div className="dz-size"><span data-dz-size="true"></span></div>
        <div className="dz-filename"><span data-dz-name="true"></span></div>
      </div>
      <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
      <div className="dz-success-mark"><Glyphicon glyph="ok-sign" style={{color:'rgba(255,255,255,.8)', fontSize:'54px'}}/></div>
      <div className="dz-error-mark"><Glyphicon glyph="remove-sign" style={{color:'rgba(255,255,255,.8)', fontSize:'54px'}}/></div>
      <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
    </div>
  ),
  acceptedFiles: "image/jpeg,image/jpg,image/png,image/gif,image/bmp"
};

/**
 * If you want to attach multiple callbacks, simply
 * create an array filled with all your callbacks.
 * @type {Array}
 */
var callbackArray = [
    function() {
        console.log('Look Ma, I\'m a callback in an array!');
    },
    function() {
        console.log('Wooooow!');
    }
];

var onProgress = function(file){
  console.log('====> progess', file);
};

var onComplete = function(file){
  console.log('====> complete!!!', file);
};

var onQueueComplete = function(files){
  console.log('====> queue complete!!!');
};

/**
 * Simple callbacks work too, of course.
 */
var onDropEvent = function(files) {
    console.log('ON DROP EVENT');
    console.log(files.name, files);
};

var eventHandlers = {
    // All of these receive the event as first parameter:
    drop: null,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: onDropEvent,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: onProgress,
    sending: null,
    success: null,
    complete: onComplete,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecompleted: onQueueComplete
};

var componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    addRemoveLinks:true,
    uploadMultiple:false,
    dictDefaultMessage: 'Drop your fucking image here!',
    postUrl: '/upload'
};

var Uploader = React.createClass({

  getInitialState: function () {
      return {
        eventHandlers:{complete:null}
      };
  },
  componentWillMount: function(){
    this.setState({eventHandlers:{complete:this.props.onDrop}});
  },
  render: function () {
    //console.log('UPLOADER', this.state.eventHandlers);
    return (
      <DropzoneComponent
          config={componentConfig}
          eventHandlers={this.state.eventHandlers}
          djsConfig={djsConfig} />
    );
  }
});

module.exports = Uploader;
