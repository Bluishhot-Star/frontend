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

  

  return (
    <div className="App">
      {
        pageNum == 0 ? <Main scrolled={scrolled} targetRef={targetRef}/> : null
      }
      {/* <div className="test"></div> */}
      {/* <div className="page1">
        <div className="top"></div>
        <div className="nav">
          <FontAwesomeIcon className='icon-bars' icon={faBars} />
          <FontAwesomeIcon className={classnames('icon-dog',{visible:true})} ref={targetRef} icon={faShieldDog} />
          <FontAwesomeIcon className='icon-user' icon={faUser} />
        </div>
      </div> */}


    </div>
  );
}

//page 0
function Main(props){
  const dragRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    console.log(1);
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + dragRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    console.log(2);
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    console.log(3);
    if (isDrag) {
      dragRef.current.scrollLeft = startX - e.pageX;
    }
  };
  const throttle = (func, ms) => {
    let throttled = false;
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };  
  let delay = 100;
  const onThrottleDragMove = throttle(onDragMove, delay);

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
        <div className="container-page0">
            <div className="item item0"><div className='item-inner emergency'>응급</div></div>
            <div className="item item1"><div className="item-inner report">진료기록</div></div>
            <div className="item item2"><div className="item-inner insurance">보험</div></div>
            <div className='item ad'></div>
            <div className="item item3"><div className="item-inner petCare">펫케어</div></div>
            <div className="item item4"><div className="item-inner nearHP">장례</div></div>
        </div>
      </div>
    </div>
  );
}

function Map() {
  return(
    <div className="page0">

    </div>
  );
}

export default App;
