import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import ParticlesBg from 'particles-bg';


const initialState= {
  input: '',
  imageUrl:'',
  box: {},
  route:'signin',
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries: 0, 
    joined: '', 

  }
}


class App extends Component {
    constructor(){
    super();
    this.state={
      input: '',
      imageUrl:'',
      box: {},
      route:'signin',
      isSignedIn: false,
      user:{
        id:'',
        name:'',
        email:'',
        entries: 0, 
        joined: '', 

      }
    }
  }
 
  calculateFaceLocation=(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById('inputImage');
    const width= Number(image.width)
    const height= Number(image.height)
    return{
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row* height,
      rightCol: width-(clarifaiFace.right_col*width),
      bottomRow: height-(clarifaiFace.bottom_row*height)
    }
    
  }

  displayFacebox =(box)=>{
    this.setState({box:box})
  }

  
  onInputChange = (event)=>{
    this.setState({input: event.target.value})
  }

  

  onButtonSubmit = ()=>{
    this.setState({imageUrl:this.state.input})
   
    fetch('https://fr-api.onrender.com/imageurl',{
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input:this.state.input
          })
        })
    .then(response => response.json())
    .then(response=> {
      if(response){
        fetch('https://fr-api.onrender.com/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id:this.state.user.id
          })})
          .then(response=>response.json())
          .then(count=> this.setState(Object.assign(this.state.user, {entries: count})))
        .catch(console.log)
      } 
      this.displayFacebox(this.calculateFaceLocation(response))
    })
    .catch(err =>console.log(err))
  }

  onRouteChange=(route)=>{
    if (route=== 'signin'){
      this.setState(initialState)
    } else if (route==='home'){
      this.setState({isSignedIn: 'true'})
    }
    this.setState({route: route})
  }

  loadUser=(data)=>{
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined 
      }
    })
  }
 

  render(){
    const {isSignedIn, imageUrl, route, box} = this.state; 
  return (
    
    <div className="App">
      <ParticlesBg type="circle" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>  
      {this.state.route=== 'home' ?
      <div>
      <Logo />
      <Rank 
        
        userName={this.state.user.name}
        userEntries={this.state.user.entries}
        />
      <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
      <FaceRecognition box={box} imageUrl={imageUrl}/>
      </div>
      : (this.state.route==='signin' ?
      
      <SignIn 
        onRouteChange={this.onRouteChange}
        loadUser={this.loadUser}
        /> :

      <Register 
          loadUser = {this.loadUser} 
          onRouteChange={this.onRouteChange}
          />)
           
      }
      
      
    </div>
  );
}
}
export default App;
