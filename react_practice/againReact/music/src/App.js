/*eslint-disable*/ 
// Lint제거 (warning 메세지 제거)

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
    [{"type": "Rock", "title": "Summer", "singer": "The Volunteers", "thumbs": 0, "detail": "백예린이 속한 밴드!"},
    {"type": "HipHop", "title": "그 해 여름", "singer": "유토", "thumbs": 0, "detail": "냥이가 좋아하는 가수"},
    {"type": "Dance", "title": "Hype Boy", "singer": "New Jeans", "thumbs": 0, "detail": "22년의 초신성"},
    {"type": "Rock", "title": "Mercurial", "singer": "실리카겔", "thumbs": 0, "detail": "내가 좋아하는 밴드"},
    {"type": "Dance", "title": "Spicy", "singer": "aespa", "thumbs": 0, "detail": "5월 말 멜론 1위"},
    {"type": "HipHop", "title": "Circle", "singer": "Post Malone", "thumbs": 0, "detail": "포말 짱ㅠ"},
    ])
  const [modal, setModal] = useState([0,'closed']);

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
  function updateThumbs(e){
    let copy = [...music]; //괄호 해제,, 깊은복사하기
    copy[e].thumbs +=1;
    setMusic(copy);
  }
  return (
    <div className="App">
      <div className="wrap">
        <div className="nav-container">
          <div className="nav">
            <div className="logo-container">
              <img className="logo" src={logo} alt="logo" />
            </div>
            <h1>{author} MUSIC</h1>
            <h3>K-POP</h3>
          </div>
        </div>
        <div className="music-list-container">

          <div className="sorting-container">

              <button onClick={()=>{
                let copy = [...music];
                copy.unshift(copy.pop());
                setMusic(copy);
                setModal([0,'closed']);
                }}>
                  <span>Rotate</span>
                </button>


              <button onClick={()=>{
                let copy = [...music];
                copy.sort((a,b)=>{
                  if (a.title > b.title) return 1;
                  if (a.title < b.title) return -1;
                  return 0;
                });
                setMusic(copy);
                setModal([0,'closed']);
              }}>
                <span>ABC</span>
              </button>
              
              <button onClick={()=>{
                let copy = [...music];
                copy.sort((a,b)=>{
                  if (a.thumbs > b.thumbs) return -1;
                  if (a.thumbs < b.thumbs) return 1;
                  return 0;
                });
                setMusic(copy);
                setModal([0,'closed']);
              }}>
                <span>LIKE</span>
              </button>
          </div>

          {
            music.map(function(a, i){return(
              <div className="music-list" key={i} onClick={()=>{modal[1] === 'closed' || modal[0] !== i ? setModal([i,'open']) : setModal([i,'closed'])}}>
                <div className="music-type">
                  <img className="music-type-img" src={setTypeImg(music[i].type)} alt="" />
                  <span className="music-type-desc">
                  {music[i].type}
                  </span>
                </div>
                <div className="music-info-container">
                  <div className="music-info">
                    <h3 className="music-title">{music[i].title}</h3>
                    <span className="music-singer">{music[i].singer}</span>
                  </div>
                  <div className="music-others-container">
                    <div className="music-thumbs-container">
                      <div className="thumbs">
                        <span onClick={(e)=>{
                          e.stopPropagation();
                          updateThumbs(i);
                          }}>👍 좋아요</span>
                      </div>
                      <span>{music[i].thumbs}</span>
                    </div>
                    <div className="music-stream-container">
                      <a href="."><img src={youtube} alt="" /></a>
                      <a href="."><img src={spotify} alt="" /></a>
                      <a href="."><img src={apple} alt="" /></a>
                    </div>
                  </div>
                </div>
              </div>
            )})
          }
        </div>
        {
          modal[1] === 'closed' ? null : <Modal music={music} i={modal[0]}></Modal>
        }
      </div>
    </div>
  );
}

function Modal(props){
  return(
    <>
      <div className="modal-container">
        <div className="modal">
          <div className="bar"></div>
          <div className="modal-title-container modal-inner-container">
            <span>제목</span>
            <div className="modal-title">{props.music[props.i].title}</div>
          </div>
          <div className="modal-singer-container modal-inner-container">
            <span>가수</span>
            <div className="modal-singer">{props.music[props.i].singer}</div>
          </div>
          <div className="modal-detail-container modal-inner-container">
            <span>세부사항</span>
            <div className="modal-detail">{props.music[props.i].detail}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;


