import React from 'react';
import ReactDOM from 'react-dom';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import './index.css';

import img1 from './images/woman.svg'
import img2 from './images/woman1.svg'
import img3 from './images/woman2.svg'
import img4 from './images/woman3.svg'
import img6 from './images/man.svg'
import img7 from './images/man1.svg'
import img8 from './images/man2.svg'
import img9 from './images/man3.svg'

const imageList = [img1, img2, img3, img4, img6, img7,img8, img9]


class UserAddApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text:'', imie:'', nazwisko:'', email:'', image:{src:'',value:0}};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onPick = this.onPick.bind(this);
      this.formClear = this.formClear.bind(this);
      console.log(this.state.image.src);
    }
  
    render() {
      return (
        <div id="glowny">
          <h3>Dodaj do listy użytkowników</h3>
          <div id="lewy">
            <form onSubmit={this.handleSubmit}>
              <div className="col1">
                <label className="label">
                  Imię
                </label>
              </div>
              <input name="imie"  onChange={this.handleChange} value={this.state.imie}/>
              <br></br>
              <div className="col1">
                <label className="label">
                  Nazwisko
                </label>
              </div>
              <input name="nazwisko" onChange={this.handleChange} value={this.state.nazwisko}/>
              <br></br>
              <div className="col1">
                <label className="label">
                  E-mail
                </label>
              </div>
              <input name="email" onChange={this.handleChange} value={this.state.email}/>
              <br></br><br></br>
              <div><h3>Wybierz swój avatar</h3></div>
              <div>
                <ImagePicker 
                  images={imageList.map((image, i) => ({src: image, value: i}))}
                  onPick={this.onPick}
                  key={this.state.imie}
                />
              </div>
              <input type="button" onClick={this.formClear} value="Wyczyść formularz" />
              &nbsp;&nbsp;
              <button>
                Dodaj #{this.state.items.length + 1}
              </button>
          </form>
          
          </div>
          <div id="prawy">
          <Lista items={this.state.items} />
          </div>
        </div>
      );
    }

    formClear() {
      this.setState(state => ({
        text: '',
        imie:'',
        nazwisko:'',
        email:'',
        image:{src:'',value:0}
      }));
    }

    onPick(image) {
      this.setState({image});
    }

    handleChange(e) {
      const target = e.target;
      const value = target.value
      const name = target.name;
  
      this.setState({[name]: value});
    }
      
    handleSubmit(e) {

      e.preventDefault();
      if ((this.state.imie.length === 0) || (this.state.nazwisko.length === 0) || (this.state.email.length === 0) || (this.state.image.src === '')) 
      {
        alert ("Wprowadź wszystkie dane i wybierz avatar!!!")
        return;
      }
      
      const newItem = {
        text: this.state.imie+" "+this.state.nazwisko+" - "+this.state.email,
        avatar: this.state.image.src,
        id: Date.now()
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: '',
        imie:'',
        nazwisko:'',
        email:'',
        image:{src:'',value:0}
      }));
      console.log(this.state.image);
    }
  }
  
  class Lista extends React.Component {
    render() {
      return (
        <div>
          {this.props.items.map(item => (
            <div className="line" key={item.id}><img className="avatar" src={item.avatar} alt="No avatar"></img>{item.text}</div>
          ))}
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <UserAddApp />,
    document.getElementById('root')
  );