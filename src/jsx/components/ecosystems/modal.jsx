var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Reflux = require('reflux');
var Actions = require('../../actions/actions.jsx');
var ModalStore = require('../../stores/modal-store.jsx');


var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var OverlayTrigger = Bootstrap.OverlayTrigger;
var Popover = Bootstrap.Popover;
var Tooltip = Bootstrap.Tooltip;
var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var ButtonInput = Bootstrap.ButtonInput;
var Image = Bootstrap.Image;
//var Glyphicon = Bootstrap.Glyphicon;
var AlertBox = require('../atoms/alert-box.jsx');
var DropzoneComponent = require('../molecules/uploader.jsx');

var ModalInstance = React.createClass({
  mixins:[
    Reflux.listenTo(ModalStore, 'onModalUpdate')
  ],
  getInitialState:function(){
    return {
      showModal: false,
      showAlert:false,
      isUpdating:false,
      action:'',
      user:{},
      userId:null,
      userName:'',
      avatar:'',
      favColor:'',
      favFood:''
    };
  },
  onInputChange:function(key){
    return function (e) {
      //console.log(key +' : '+e.target.value);
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },
  clear:function(){
    this.setState({
      user:{},
      userId:null,
      userName:'',
      avatar:'./images/default.png',
      favColor:'',
      favFood:''
    });
  },

  validate: function(){
    if (this.state.userName.length < 1 || this.state.favFood.length < 1 || this.state.favColor.length < 1){
      this.setState({showAlert:true});
      return false;
    } else {
      this.setState({showAlert:false});
      return true;
    }
  },
  handleSubmit:function(e){
    e.preventDefault();
    if (this.validate()){
      var user = {
        id: this.state.userId,
        name: this.state.userName.trim(),
        avatar: this.state.avatar,
        favorite:{
          food:this.state.favFood,
          color:this.state.favColor
        }
      };
      if (this.state.action === 'DELETE'){
        this.props.onDeleteUser(user);
      } else {
        this.props.onSubmitUser(user);
      }
      this.clear();
      Actions.hideModal();
    }
  },
  onImageDrop:function(file){
    console.log('ON DROP EVENT FROM MODAL');
    console.log(file.name, file);
    this.setState({
      avatar: './images/'+file.name
    });
  },
  onImageUpload: function(e, file){
    console.log('Files', file);
    this.setState({
      avatar: '/images/'+file.name
    });
  },
  onModalUpdate: function(e, state, args) {
    //console.log('newModalState',state);
    //console.log('action',args[0]);
    //console.log('with data',args[1]);
    var action = args[0];
    var data = args[1];
    this.setState({
      isUpdating:false,
      showAlert:false,
      showModal: state,
      action: action
    });
    if (action && action!=="ADD"){
      this.setState({
        userId: data.id,
        userName: data.name,
        avatar: data.avatar,
        favColor: data.favorite.color,
        favFood: data.favorite.food
      });
    } else {
      this.clear();
    }
  },
  onUpdateImage:function(e){
    console.log("I WANT TO UPDATE THIS IMAGE");
    this.setState({isUpdating:true});
  },
  render: function(){
    var imageStyle = {
      width:"150px",
      padding:'10px'
    };
    var popover = <Popover id="popover" title={this.state.userName}>
        <div style={{width:"150px"}}>
          <Image style={{borderRadius:'20px'}} src={this.state.avatar} responsive rounded />
        </div>
      </Popover>;
    var tooltip = <Tooltip id="tooltip">Click to update your profile image</Tooltip>;
    return (

      <Modal show={this.state.showModal} onHide={Actions.hideModal}>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.action} USER</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {/*<p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger></p>*/}
            {this.state.action==="DELETE" ?
              <h3 style={{color:"#c00",textAlign:"center"}}>Are you sure you want to delete <OverlayTrigger overlay={popover} placement="left" ><a href="#">{this.state.userName}</a></OverlayTrigger>? <br />This can not be undone!</h3> :
              <div>
              {this.state.showAlert ? <AlertBox type="danger" text="All fields are required!"/> : null}
              <Input type="text" label="Name" value={this.state.userName} ref="userName" placeholder="Enter you name" onChange={this.onInputChange('userName')} />
              <Input type="text" label="Favorite Food" value={this.state.favFood} ref="favFood" placeholder="Enter your favorite food" onChange={this.onInputChange('favFood')} />
              <Input type="text" label="Favorite Color" className="form-control" value={this.state.favColor} ref="favColor" placeholder="Enter your favorite color" onChange={this.onInputChange('favColor')} />

              <label>{this.state.action === 'EDIT' ? 'Update' : 'Add'} Profile Image</label>
              {this.state.action === 'EDIT' && !this.state.isUpdating ?
                <div style={imageStyle} role='button' onClick={this.onUpdateImage} className='filepicker'>
                  <OverlayTrigger overlay={tooltip}><Image src={this.state.avatar} responsive rounded /></OverlayTrigger>
                </div> : null}
              {this.state.action === 'ADD' || this.state.isUpdating ? <DropzoneComponent ref='dropzone' onDrop={this.onImageDrop} /> : null}
              </div>
            }
          </Modal.Body>
          <Modal.Footer>
            <ButtonInput style={{float:'right', marginLeft:'10px'}} type="submit" value={this.state.action!=="EDIT" ? this.state.action+" USER" : "UPDATE"} />
            <ButtonInput style={{float:'right'}} type="reset" value="CANCEL" onClick={Actions.hideModal} />
          </Modal.Footer>
          </form>
      </Modal>

    );
  }
});

module.exports = ModalInstance;
