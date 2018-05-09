import React from 'react';
import {Component} from "react";
import './App.css';


const req1 = new XMLHttpRequest();
req1.open("GET", "https://jsonplaceholder.typicode.com/posts", false);
req1.send(null);
const users = JSON.parse(req1.responseText);
console.log(users);

const req = new XMLHttpRequest();
req.open("GET", "https://jsonplaceholder.typicode.com/photos", false);
req.send(null);
const photos = JSON.parse(req.responseText);
console.log(photos);


class User extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        };
    }

    userInfo = ()=>{
        const photos = document.getElementById('photos');
        photos.style.display = 'flex';
        console.log(this.props.id);
        this.setState({search: this.props.id});
        const blocks = document.getElementById('blocks');
        blocks.style.display = "none";
    }

    render() {
        return (
            <div  id={this.props.user.id} className="block" onClick={this.userInfo.bind(this)}>
                <div id="block">
                    <h3 >{this.props.user.title}</h3>
                </div>
            </div>
        );
    }
}

class Photo extends Component{
    render() {
        return (
            <div key={this.props.photo.id} className="photo">
                <img src={this.props.photo.url} alt="img"/>
            </div>
        );
    }
}


class Content extends Component{
    constructor() {
        super();
        this.state = {
            search: ''
        };
    }

    logIn = () =>{
        if(this.myInput.value >= 11 || this.myInput.value <= 0){
            alert('Input User from "1" to "10"');
            this.myInput.value = '';
        }else{
            this.setState({search: this.myInput.value});
        }
        console.log(this.myInput.value);
    };

    logOut = () =>{
        this.setState({search: ''});
    };

    render(){
        let filteredMans = this.props.users.filter((user)=>{
            return user.userId.toString() === this.state.search;
        });
        let filteredPhoto =  this.props.photos.filter((photo)=>{
            return photo.albumId.toString() === this.state.search;
        });
        if(filteredMans.length !== 0){
            console.log(filteredMans);
            return (
                <div>
                    <div className="header">
                        <button onClick={this.logOut.bind(this)} id="logOut" className="btn">logOut</button>
                    </div>
                    <div className="userName"><h2>Hi, User {this.myInput.value}</h2></div>
                    <div id="blocks">
                        {
                            filteredMans.map(function(user) {
                                return <User key={user.id} user={user} id={user.id}
                                />;})
                        }
                    </div>
                    <div id='photos' className={photos}>
                        {
                            filteredPhoto.map(function(photo) {
                                return <Photo key={photo.albumId} photo={photo}
                                />;})
                        }
                    </div>
                </div>
            )
        }else{
            return (
                <div>
                    <div className="header">
                        <input type="text" placeholder="Your ID" ref={(input)=>{this.myInput = input}}/>
                        <button onClick={this.logIn.bind(this)} id="logIn" className="btn">logIn</button>
                    </div>
                </div>

            )
        }
    }
}

class List extends Component {
    render() {
        return (
            <div>
                <Content users={this.props.users} photos={this.props.photos}/>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="content"><List users={users} photos={photos}/></div>
        )
    }
}
export default App;