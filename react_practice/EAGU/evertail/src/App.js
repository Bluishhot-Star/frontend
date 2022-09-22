/*eslint-disable */ //Lint 지우는 기능
import logo from './logo.svg';
import './App.css';
// import './App1.css';
import { useState, useRef, useEffect } from 'react';
import { render } from '@testing-library/react';
import classnames from 'classnames';

// fontawesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShieldDog} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {faShieldHeart} from "@fortawesome/free-solid-svg-icons";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {faBullhorn} from "@fortawesome/free-solid-svg-icons";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faPlusSquare} from "@fortawesome/free-regular-svg-icons";

function App() {
  let [pageNum,setPageNum] = useState(0);
  const dragHandler = (e) => {
    console.log(e);
  }
  const targetRef = useRef(null);
  let [scrolled, setScrolled] = useState(false);
  const handleScroll = (e) => {
    console.log(e);
    let chTop =targetRef.current.getBoundingClientRect().top + window.pageYOffset; //viewport 기준
    setScrolled(false);
    if(chTop > 67){
      setScrolled(true);
    }
  };
  useEffect(() => {    
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  let [name,setName] = useState(['댕댕이','똘이']);
  let [dogNum, setDogNum] = useState(0);

  return (
    <div className="App">
      {
        pageNum == 0 ? <DogProfile name={name} setDogNum={setDogNum} setPageNum={setPageNum}/>:null
      }
      {
        pageNum == 1 ? <Main scrolled={scrolled} setPageNum={setPageNum} targetRef={targetRef}/> : null
      }
      {
        pageNum == 2 ? <Emergency setPageNum={setPageNum} /> : null
      }
      {
        pageNum == 3 ? <Diagnosis name={name} dogNum={dogNum} setPageNum={setPageNum} /> : null
      }
      {/* <div className="test"></div> */}
      

    </div>
  );
}


function PopUp(props) {
  return(
    <div className="popUp-background">
      <div className='popUp-container'>
        <div className="popUp-title-container">
          <div className="popUp-title">
            {
              props.icon == 0 ? <FontAwesomeIcon className='icon-exclamation' icon={faExclamationTriangle} /> : null
            }
            {
              props.icon == 1 ? <FontAwesomeIcon className='icon-exclamation' icon={faBullhorn} /> : null
            }
            {props.popUpText.title}
          </div>
        </div>
        <div className="popUp-text-container">
          {props.popUpText.text}
        </div>
        <div className="popUp-btn-container">
          <button className='popUp-btn-left' onClick={()=>{props.setPopUp(false);}}><div>취소</div></button>
          <button className='popUp-btn-right' onClick={()=>{}}><div>확인</div></button>
        </div>
      </div>
    </div>
  );
}
function EmergencyPopUp(props) {
  return(
    <div className="popUp-background" onClick={()=>{props.setPopUp(false);}}>
      <div className='popUp-container'>
        <div className="emergency-popUp-title-container" onClick={(e)=>{e.stopPropagation(); }}>
          <div className="emergency-popUp-title">
            <FontAwesomeIcon className='icon-exclamation' icon={faExclamationTriangle} />
            {props.popUpText.title}
          </div>
            <FontAwesomeIcon className='icon-popUp-X' icon={faTimes}onClick={()=>{props.setPopUp(false);}} />
        </div>
        <div className="emergency-popUp-text-container" onClick={(e)=>{e.stopPropagation();}}>
          {props.popUpText.text}
        </div>
        <div className="emergency-popUp-btn-container">
          <button className='popUp-btn-left' onClick={()=>{props.setPopUp(false);}}><div className='popUp-btn-text'>일반<br/>TAXI</div></button>
          <button className='popUp-btn-right' onClick={()=>{}}><div className='popUp-btn-text'>펫<br/>TAXI</div></button>
        </div>
      </div>
    </div>
  );
}

//page 0
function Main(props){

  return(
    <div className="page0">
      <div className='main-container'>
        <div className="top"></div>
        <div className="nav-top-container">
          <div className="nav">
            <FontAwesomeIcon className='icon-bars' icon={faBars} />
            <FontAwesomeIcon className={classnames('icon-dog',{visible:props.scrolled})} ref={props.targetRef} icon={faShieldDog} />
            <FontAwesomeIcon className='icon-user' icon={faUser} />
          </div>
          <div className='title'>EVERTAIL</div>
        </div>
        <div className="item-container-page0">
            <div className="item item0" onClick={()=>{setTimeout(() => {props.setPageNum(2);}, 300);}} ><div className='item-inner emergency'>응급</div></div>
            <div className="item item1" onClick={()=>{setTimeout(() => {props.setPageNum(3);}, 300);}}><div className="item-inner report">진료기록</div></div>
            <div className="item item2"><div className="item-inner insurance">보험</div></div>
            <div className='item ad'></div>
            <div className="item item3"><div className="item-inner petCare">펫케어</div></div>
            <div className="item item4"><div className="item-inner nearHP">장례</div></div>
        </div>
      </div>
    </div>
  );
}

function Emergency(props) {
  let icon = 1;
  let [pupUp, setPopUp] = useState(false);
  let popUpText = {title: " 주의", text:"응급 호출 시 10만원의 비용이 결제됩니다"}
  return(
    <div className="page1">
      <div className="top"></div>
      <div className="nav">
        <FontAwesomeIcon className='icon-bars' icon={faBars} />
        <FontAwesomeIcon className={classnames('icon-dog',{visible:true})} icon={faShieldDog} onClick={()=>{props.setPageNum(1); }} />
        <FontAwesomeIcon className='icon-user' icon={faUser} />
      </div>
      <div className="item-container-page1">
        <div className="item item1"><div className="item-inner report">응급처치</div></div>
        <div className="item item2" onClick={(e)=>{ setPopUp(true)}}><div className="item-inner insurance">응급호출</div></div>
        <div className='item item3 alert'></div>
        <div className="item item3"><div className="item-inner petCare">가까운 병원</div></div>
        <div className="item3"></div>
      </div>
      {
        pupUp == true ? <EmergencyPopUp popUpText={popUpText} setPopUp={setPopUp}/> : null
      }
    </div>
      
  );
}

function Diagnosis(props) {
  let [post, setPost] = useState([[
    {date:'2022-06-08',disease:"방광암"},
    {date:'2022-03-11',disease:"홍역"},
    {date:'2021-10-15',disease:"파보바이러스"},
    {date:'2021-01-14',disease:"인플루엔자"},
    {date:'2020-08-23',disease:"갑상샘기능항진증"},
    {date:'2020-06-12',disease:"간문맥전신단락증"},
  ],
  [
    {date:'2022-07-20',disease:"각막염"},
    {date:'2022-04-21',disease:"골육종"},
    {date:'2022-01-18',disease:"포충증"},
    {date:'2021-11-17',disease:"코로나바이러스"},
    {date:'2021-03-23',disease:"슬개골탈구"},
    {date:'2020-08-12',disease:"슬개골탈구"},
  ]]
  )
  let [curPost,setCurPost] = useState([]);
  let [star,setStar] = useState([[false,false,false,false,false,false],[false,false,false,false,false,false]]);
  let changeStar = (index)=>{
    let copy = [...star];
    if (copy[props.dogNum][index] == true){
      copy[props.dogNum][index] = false;
    }
    else{
      copy[props.dogNum][index] = true;
    }
    setStar(copy);
  }
  let [starTag, setStarTag] = useState(false);
  let [newer, setNewer] = useState(false);
  let [older, setOlder] = useState(false);

  let sorting = ()=>{
    let copy = [...post[props.dogNum]];
    let arr = [];
    if(starTag == true){
      for (let i = 0; i < star[props.dogNum].length; i++) {
        if(star[props.dogNum][i] == true){
          arr.push(copy[i]);
        }
      }
    }
    else{
      arr = copy;
    }
    setCurPost(arr);
  }
  return(
    <div className="page2">
      <div className="top"></div>
      <div className="nav">
        <FontAwesomeIcon className='icon-bars' icon={faBars} />
        <FontAwesomeIcon className={classnames('icon-dog',{visible:true})} icon={faShieldDog} onClick={()=>{props.setPageNum(1); }}/>
        <FontAwesomeIcon className='icon-user' icon={faUser} />
      </div>
      <div className="item-container-page2">
        <div className='diag-top-container'>
          진료기록
          <div className="diag-sorting-container">
            <div className="diag-sorting">즐겨찾기</div>
            <div className="diag-sorting">새로운순</div>
            <div className="diag-sorting">오래된순</div>
          </div>
        </div>
        {
          curPost.map((article,index)=>{
            return(
              <div className="diag-list-container">
                <div className="diag-list item">
                  <FontAwesomeIcon className={classnames('icon-star',{starOn:star[props.dogNum][index]})} icon={faStar} onClick={()=>{changeStar(index)}}/>
                  <div className="date-container"><div className="date">{curPost[index].date}</div></div>
                  <div className="info-container">
                    <div className="name">{props.name[props.dogNum]}</div>
                    <div className="disease">{curPost[index].disease}</div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
      
  );
}
function Insurance() {
  return(
    <div className="page3">
      <div className="top"></div>
      <div className="nav">
        <FontAwesomeIcon className='icon-bars' icon={faBars} />
        <FontAwesomeIcon className={classnames('icon-dog',{visible:true})} icon={faShieldDog} />
        <FontAwesomeIcon className='icon-user' icon={faUser} />
      </div>
      <div className="item-container-page3">
            <div className="item item1"><div className="item-inner report">응급처치</div></div>
            <div className="item item2"><div className="item-inner insurance">응급호출</div></div>
            <div className='item ad'></div>
            <div className="item item3"><div className="item-inner petCare">가까운 병원</div></div>
            <div className="item3"></div>
      </div>
    </div>
      
  );
}
function DogProfile(props) {
  return(
    <>
      <div className="top"></div>
        <div className="dogProfile-logo"><FontAwesomeIcon className={classnames('icon-dog',{visible:true})} icon={faShieldDog}/> EVERTAIL</div>
      <div className="dogProfile-page-container">
        {
          props.name.map((article,index)=>{
            return(
              <div className='dogProfile-container'>
                <div className="dogProfile-image" onClick={()=>{setTimeout(() => {props.setDogNum(index); props.setPageNum(1);}, 350);}}>
                {/* {props.profileImage[index]} */}
                </div>
                <div className="dogProfile-name">{props.name[index]}</div>
              </div>

            );
          })
        }
        <div className="dogProfile-container">
          <div className="dogProfile-image">
            <FontAwesomeIcon className='icon-plusSquare' icon={faPlusSquare} />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
