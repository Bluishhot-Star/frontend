/*eslint-disable*/ 
// Lint제거 (warning 메세지 제거)

import './App.css';
import { useState } from 'react';
import React from 'react';
// Import Image
import logo from './image/black-cat.svg';
import guitar from './image/guitar.svg';
import hiphop from './image/dj.svg'
import dance from './image/man-dancing-light.svg'
import melody from './image/musical-keyboard.svg'
import rnb from './image/headphone.svg'
import youtube from './image/youtube.svg';
import spotify from './image/spotify.svg';
import apple from './image/apple.svg';

// Variable & State
const author = "KASSID";

function App() {
  let [music, setMusic] = useState([
    {"type": "Rock", "title": "Summer", "singer": "The Volunteers", "thumbs": 0, "comment": "백예린이 속한 밴드!"},
    {"type": "HipHop", "title": "그 해 여름", "singer": "유토", "thumbs": 0, "comment": "냥이가 좋아하는 가수"},
    {"type": "Dance", "title": "Hype Boy", "singer": "New Jeans", "thumbs": 0, "comment": "22년의 초신성"},
    {"type": "Rock", "title": "Mercurial", "singer": "실리카겔", "thumbs": 0, "comment": "내가 좋아하는 밴드"},
    {"type": "Dance", "title": "Spicy", "singer": "aespa", "thumbs": 0, "comment": "5월 말 멜론 1위"},
    {"type": "Melody", "title": "계절범죄", "singer": "미로", "thumbs": 0, "comment": "J-pop 멜로디!"},
    {"type": "R&B", "title": "우주를 건너", "singer": "백예린", "thumbs": 0, "comment": "멜론 R&B 8위"},

  ])

  let [music2, setMusic2] = useState([
    {"type": "HipHop", "title": "Circle", "singer": "Post Malone", "thumbs": 0, "detail": "포말 짱ㅠ"},
  ])

  const [modal, setModal] = useState([0,'closed']);

  function setTypeImg(v){
    switch (v) {
      case "Rock":
        return guitar;
      case "HipHop":
        return hiphop;
      case "Dance":
        return dance;
      case "Melody":
        return melody;
      case "R&B":
        return rnb;
      default:
        break;
  }};
  function updateThumbs(e){
    let copy = [...music]; //괄호 해제,, 깊은복사하기
    copy[e].thumbs +=1;
    setMusic(copy);
  }
  function popMusic(index){
    let copy = [...music];
    copy.splice(index,1);
    setMusic(copy)
    setModal([0,'closed'])
  }
  function addPost(input){
    input.preventDefault();
    if (!checkPost(input.target)){alert("정확히 입력해주세요"); return;}
    let tempMusic = {"type": input.target[0].value, "title": input.target[1].value, "singer": input.target[2].value, "thumbs": 0, "comment": input.target[3].value}
    let copy = [...music];
    copy.push(tempMusic);
    for (let i = 0; i < input.target.length-1; i++) {
      input.target[i].value = '';
    }
    input.target.value = ''
    setMusic(copy);
    setModal([0,'closed']);
  }
  function checkPost(target) {
    // console.log(targets);
    for (let i=0; i<4; i++) {
      if (target[i].value.length !== 0){continue;}
      else return false;
    }
    return true;
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
                if (copy.length === 0) return;
                copy.unshift(copy.pop());
                setMusic(copy);
                setModal([0,'closed']);
                }}>
                  <span>Rotate</span>
                </button>


              <button onClick={()=>{
                let copy = [...music];
                if (copy.length === 0) return;
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
                if (copy.length === 0) return;
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
                <div className='delete-list' onClick={(e)=>{
                  e.stopPropagation()
                  popMusic(i);
                }}>x</div>
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

        <div className="input-container">
          <h4 className='input-title'>🎵 New Music</h4>
          <form className='new-music-form' onSubmit={(e)=>{addPost(e);}}>
            <p>장르</p>
            <select className='select-genre'>
              <option value="Rock">🎸 Rock</option>
              <option value="HipHop">💽 HipHop</option>
              <option value="Dance">🕺🏻 Dance</option>
              <option value="Melody">🎹 Meoldy</option>
              <option value="R&B">🎧 R&B</option>
            </select>
            <p>제목</p><input type="text" className='input-title' onChange={()=>{}}/>
            <p>가수</p><input type="text" className='input-singer' onChange={()=>{}}/>
            <p>코멘트</p><textarea className='input-comment'></textarea>
            <div></div><div className='input-btn-container'><button type='submit'><span>추가</span></button></div>
          </form>
        </div>

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
          <div className="modal-comment-container modal-inner-container">
            <span>한 줄 코멘트</span>
            <div className="modal-comment">{props.music[props.i].comment}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;


