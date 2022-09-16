/*eslint-disable */ //Lint 지우는 기능
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let logo = "Kassidlog";
  let [title, setTitle] = useState(['은행동 성심당','자양동 빵한모금', '오정동 몽심']);
  let [date, setDate] = useState(['2022.07.20', '2022.08.06', '2022.08.15']);
  let [emoji, setEmoji] = useState(['🍞','🥐','🥖','🥨','🥯','🍪']);
  return (
    <div className="App">
      <div className="black-nav">
        {/* <h1 style={{color:'red', paddingRight : "20vh"}}>Kassidlog</h1> */}
        <h1>{logo}</h1>
      </div>
      <div className="list">
        <h4>{emoji[0]} 《 {title[0]} 》</h4>
        <p>튀김소보로, 보문산메아리</p>
        <p className='Date'>{date[0]} 발행</p>
      </div>
      <div className="list">
        <h4>{emoji[1]} 《{title[1]}》</h4>
        <p>얼그레이까눌레, 꾸인아망</p>
        <p className='Date'>{date[1]} 발행</p>
      </div>
      <div className="list">
        <h4>{emoji[2]} 《{title[2]}》</h4>
        <p>말차마들렌, 유자마들렌</p>
        <p className='Date'>{date[2]} 발행</p>
      </div>
    </div>
  );
}

export default App;
