/*eslint-disable */ //Lint 지우는 기능
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faSquareCaretRight} from "@fortawesome/free-regular-svg-icons";
import { render } from '@testing-library/react';
function App() {
  let logo = "Kassidlog";
  let [title, setTitle] = useState(['은행동 성심당','자양동 빵한모금', '오정동 몽심']);
  let [emoji, setEmoji] = useState(['🍞','🥐','🥖','🥨','🥯','🍪']);
  let [good, setGood] = useState([[0,0,0],[0,0,0]]);
  let [pageTitle, setPageTitle] = useState(['대전 빵 맛집','서울 빵 맛집']);
  let [pageNum, setPageNum] = useState(0);
  let [post, setPost] = useState([
    [{place:"은행동",store:'성심당',date:'2022-07-20',bread:'튀김소보로, 보문산메아리'},
    {place:"자양동",store:'빵한모금',date:'2022-08-06',bread:'얼그레이까눌레, 꾸인아망'},
    {place:"오정동",store:'몽심',date:'2022-08-15',bread:'말차마들렌, 유자마들렌'}],
    [{place:"망원동",store:'어글리베이커리',date:'2022-05-20',bread:'감동의 말차맘모스, 얼그레이 크림빵'},
    {place:"북촌",store:'런던베이글뮤지엄',date:'2022-06-08',bread:'플레인베이글, 바질페스토베이글'},
    {place:"성수동",store:'빵의 정석',date:'2022-07-15',bread:'빨미카레, 올리브스틱'}],
  ])
  let [modal, setModal] = useState(false);
  let [modalIndex, setModalIndex] = useState(0);
  const changePost = ()=>{
    // let copy = [...pageTitle];
    // copy.unshift(copy.pop());
    // setPageTitle(copy);
    // copy = [...good];
    // copy.unshift(copy.pop());
    // setGood(copy);
    let num = pageNum;
    setPageNum((num+1)%2);
    setModal(false);
  };
  const orderHangeul = ()=>{
    let copy = [...post];
  }
  const changeModal = ()=>{
    let copy = modalIndex;
    setModalIndex((copy+1)%post[0].length);
    popModal(-1);
  }
  const popModal = (index) =>{
    if (index == -1){ setModal(true); return;} // next modal
    if (modalIndex != index){ // select diff post
      setModal(true)
    }
    else{ // select same post
      modal == true ? setModal(false) : setModal(true);
      modalIndex = setModalIndex(index);
    }
    modalIndex = setModalIndex(index);
  }
  const updateGood = (i)=>{
    let copy = [...good];
    copy[pageNum][i] +=1;
    setGood(copy);
  }
  const checkPost = (input)=>{
    console.log(input);
    for (let i = 0; i < input.length-1; i++) {
      console.log(input[i].value);
      if(input[i].value == '') return true;
    }
    return false;
  }
  const addPost = (input)=>{
    input.preventDefault();
    if(checkPost(input.target)) return;
    let copy = [...post];
    let tempPost = copy[pageNum];
    tempPost.push({store:input.target[0].value, place:input.target[1].value, date:input.target[2].value,bread:input.target[3].value})
    copy[pageNum] = tempPost;
    setPost(copy);

    copy = [...good];
    let tempGood = copy[pageNum];
    tempGood.push(0);
    copy[pageNum] = tempGood;
    console.log(good);
    setGood(copy);
    for (let i = 0; i < input.target.length-1; i++) {
      input.target[i].value = '';
    }
    input.target.value = ''
  }

  const deletePost = (index)=>{
    let copy = [...post];
    copy[pageNum].splice(index,1);
    setPost(copy);
  }
  return (
    <div className="App">
      <div className="nav">
        {/* <h1 style={{color:'red', paddingRight : "20vh"}}>Kassidlog</h1> */}
        <h1>{logo}</h1>
      </div>
      <div className="title-container">
        <div className="title">{pageTitle[pageNum]}</div>
        <div className='Next' onClick={()=>{changePost()}}><FontAwesomeIcon className='next-btn' icon={faSquareCaretRight} /></div>
      </div>
      <div className="filter">
        <div className='order order-hangeul' onClick={()=>{}}>가나다순</div>
        <div className='order order-date'>날짜순</div>
        <div className='order order-good'>지역순</div>
      </div>
      {/* <div className="list-container">
        <div className="list-head-container">
          <h4>{emoji[0]} 《 {post[0][0].place} {post[0][0].store} 》</h4>
          <div onClick={()=>{let copy=good[0][0]; setGood(copy)}} className='recommends'>
            <FontAwesomeIcon className='thumbs-up' icon={faThumbsUp} /> {good}
          </div>
        </div>
        <div className="list-content-container">
          <div className='content'>{post[0][0].bread}</div>
          <div className='Date'>{post[0][0].date} 발행</div>
        </div>
      </div>
      <div className="list-container">
        <div className="list-head-container">
          <h4>{emoji[1]} 《 {post[0][1].place} {post[0][1].store} 》</h4>
          <div className='recommends'>
            <FontAwesomeIcon className='thumbs-up' icon={faThumbsUp} /> 0
          </div>
        </div>
        <div className="list-content-container">
          <div className='content'>{post[0][1].bread}</div>
          <div className='Date'>{post[0][1].date} 발행</div>
        </div>
      </div>
      <div className="list-container" onClick={()=>{popModal()}}>
        <div className="list-head-container">
          <h4>{emoji[2]} 《 {post[0][2].place} {post[0][2].store} 》</h4>
          <div className='recommends'>
            <FontAwesomeIcon className='thumbs-up' icon={faThumbsUp} /> 0
          </div>
        </div>
        <div className="list-content-container">
          <div className='content'>{post[0][2].bread}</div>
          <div className='Date'>{post[0][2].date} 발행</div>
        </div>
      </div> */}
      {
        post[pageNum].map((article,index)=>{
          return(
            <div className="list-container" key={index}>
              <button className='delete-post-btn' onClick={(e)=>{deletePost(index)}}>x</button>
              <div className="list-head-container">
                <h4 className='list-title' onClick={()=>{popModal(index)}}>{emoji[index % emoji.length]} 《 {article.place} {article.store} 》</h4>
                <div className='recommends' onClick={()=>{updateGood(index)}}>
                  <FontAwesomeIcon className='thumbs-up' icon={faThumbsUp} /> <div>{good[pageNum][index]}</div>
                </div>
              </div>
              <div className="list-content-container">
                <div className='content'>{article.bread}</div>
                <div className='Date'>{article.date} 발행</div>
              </div>
            </div>
          );
        })
      }
      {
        modal == true ? <Modal changeModal={changeModal} post={post[pageNum][modalIndex]}/> : null
      }
      <div className="input-container">
        <h4 className='input-title'>글 추가하기</h4>
        <form className='new-post-form' onSubmit={(e)=>{addPost(e);}}>
          <p>상호명</p><input type="text" className='input-store' onChange={()=>{}}/>
          <p>위치</p><input type="text" className='input-place' onChange={()=>{}}/>
          <p>날짜</p><input type="date" className='input-date' onChange={()=>{}}/>
          <p>추천메뉴</p><textarea className='input-bread'></textarea>
          <div></div><div className='input-btn-container'><button type='submit'>추가</button></div>
        </form>
      </div>
    </div>
  );
}

function Modal(props) {
  return(
    <div className='modal-container'>
      <div className="modal-title-container">
        <h4 className='modal-title'>{props.post.store}</h4>
        <div className='Next' onClick={()=>{props.changeModal()}}><FontAwesomeIcon className='next-btn' icon={faSquareCaretRight} /></div>
      </div>
      <div className="modal-location">
        <p className='modal-content-title'>위치</p> <p>{props.post.place}</p>
      </div>
      <div className='modal-date'>
        <p className='modal-content-title'>날짜</p> <p>{props.post.date}</p>
      </div>
      <div className='modal-menu'>
        <p className='modal-content-title'>추천 메뉴</p> <p>{props.post.bread}</p>
      </div>
    </div>
  );
}
export default App;