import './App.css';
import { useState } from 'react';

// Import Image
import logo from './image/black-cat.svg';
import guitar from './image/guitar.svg';
import hiphop from './image/dj.svg'
import dance from './image/man-dancing-light.svg'
import youtube from './image/youtube.svg';
import spotify from './image/spotify.svg';
import apple from './image/apple.svg';

// Variable & State
const author = "KASSID";


function App() {
  let [music, setMusic] = useState(
    [{"type": "Rock", "title": "Summer", "singer": "The Volunteers"},
    {"type": "HipHop", "title": "그 해 여름", "singer": "유토"},
    {"type": "Dance", "title": "Hype Boy", "singer": "New Jeans"}]
    )
  let [count, setCount] = useState(3);
  function setTypeImg(v){
    switch (v) {
      case "Rock":
        return guitar;
      break;
      case "HipHop":
        return hiphop;
      break;
      case "Dance":
        return dance;
      break;

    default:
      break;
  }};
  return (
    <div className="App">
      <div className="wrap">
        <div className="nav-container">
          <div className="nav">
            <div className="logo-container">
              <img className="logo" src={logo} alt="logo" />
            </div>
            <h1>{author} MUSIC</h1>
          </div>
        </div>
        <div className="music-list-container">

          {/* 1 */}
          <div className="music-list">
            <div className="music-type">
              <img className="music-type-img" src={setTypeImg(music[0].type)} alt="" />
              <span className="music-type-desc">
              {music[0].type}
              </span>
            </div>
            <div className="music-info-container">
              <div className="music-info">
                <h3 className="music-title">{music[0].title}</h3>
                <span className="music-singer">{music[0].singer}</span>
              </div>
              <div className="music-stream-container">
                <a href="."><img src={youtube} alt="" /></a>
                <a href="."><img src={spotify} alt="" /></a>
                <a href="."><img src={apple} alt="" /></a>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="music-list">
            <div className="music-type">
              <img className="music-type-img" src={setTypeImg(music[1].type)} alt="" />
              <span className="music-type-desc">
                HipHop
              </span>
            </div>
            <div className="music-info-container">
              <div className="music-info">
                <h3 className="music-title">{music[1].title}</h3>
                <span className="music-singer">{music[1].singer}</span>
              </div>
              <div className="music-stream-container">
                <a href="."><img src={youtube} alt="" /></a>
                <a href="."><img src={spotify} alt="" /></a>
                <a href="."><img src={apple} alt="" /></a>
              </div>
            </div>
          </div>


          {/* 3 */}
          <div className="music-list">
            <div className="music-type">
              <img className="music-type-img" src={setTypeImg(music[2].type)} alt="" />
              <span className="music-type-desc">
                Dance
              </span>
            </div>
            <div className="music-info-container">
              <div className="music-info">
                <h3 className="music-title">{music[2].title}</h3>
                <span className="music-singer">{music[2].singer}</span>
              </div>
              <div className="music-stream-container">
                <a href="."><img src={youtube} alt="" /></a>
                <a href="."><img src={spotify} alt="" /></a>
                <a href="."><img src={apple} alt="" /></a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
