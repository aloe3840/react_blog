import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

//리액트는 화면에 보여줄 값을 '변수'에 저장하는 게 아니고
//state에 저장함
//변수는 값이 변경되어도 화면에 반영되지 않지만, useState를 사용하면
//값이 바뀔 때 화면도 같이 바뀜 (데이터바인딩)

//따라서 변경될만한 값은 useState로 보관하고
//변경이 안 될 값은 변수에 보관

//app컴포넌트
function App() {
  let 변수 = '블로그 글목록'
  let [value, setValue] = useState('서버에서 실시간으로 받는 값')
  let [title, setTitle] = useState(['제목1','제목2','제목3','제목4'])
  let [dateTime, setDateTime] = useState(['2025-5-12 작성','2024-1-4 작성','2025-6-23 작성','2025-12-1 작성'])
  let [score, setScore] = useState([0, 0, 0, 0])
  let [modal, setModal] = useState(false)
  let [curIdx, setCurIdx] = useState(0) 
  //0번째 인덱스는 변수처럼 사용 (이름, set이름)
  //1번째 인덱스는 변경할 때 사용  (이름, set이름)
  //useState를 쓰는 이유: 실시간으로 바뀌게 하기 위해



  return (
    <div className="App">
      <div className='black-nav'>
        <img src={logo} width={'100px'} height={'100px'} alt='이미지'/>
        <h4 style={{color: 'yellow', fontSize: '20px'}}>{value}</h4>
      </div>

      {
    /*
    리액트에서 중괄호 중복 때문에 반복문은 map으로 구현해야함 == forEach
    배열.map
    map 바깥쪽에 구분할 수 있는 key를 적어줘야함
    list클래스를 4번 반복
    title의 배열 개수만큼 반복됨. => title,map을 했으니까

    */

    title.map(function(element, idx){   //element엔 제목1, 제목2 이렇게 들어감
      return(
            <div className='list' key={idx}>
        <h4 onClick={()=>{
          setCurIdx(idx)
          setModal(!modal)
        }}>{element}<span onClick={(e)=>{
          //js에서 배열요소를 수정하려면 분해했다가 변경하고 다시 합쳐야함
          e.stopPropagation()
          setScore(()=>{
            let src=[...score]         //스코어 배열을 분할
            src[idx] += 1
            return src
          })
        }}>💖</span>{score[idx]}</h4>
        <p>{dateTime[idx]}</p>
      </div>
      )
    })
  
  }



      {/* 부분만 떼고 싶다 -> 컴포넌트로 만든다.
        modal값이 false면 안보이게 true면 보이게
        {}안에다가 js코드를 넣어야하는데 if랑 for가 사용하네?
        리액트 {}안에서는 if와 for가 사용 불가능 -> 중괄호 중복
        if는 삼항 연산자로 for는 Map으로 제공
        삼항 연산자:  조건식? 맞으면_실행할코드: 틀리면_실행할코드
        => 3 > 1? true: false

        다른 컴포넌트에 값을 넘겨줄 때는 props라는 것을 사용
      */


        modal == true? <Modal idx={curIdx} title={title} date={dateTime}/> : null
        
      }
        
    </div>
  );
}

export default App;

//모달 컴포넌트 분리
//코드가 길어지면 별도의 함수로 분리해서 컴포넌트로 만들어준다
//return()안에 html태그를 작성
//사용하고자 하는 곳에 <함수명/>
//컴포넌트로 사용할 함수는 대문자, 일반 함수는 소문자 시작이 일반적
function Modal(props){
  return(
    <>
      <div className='modal'>
        <h4>{props.title[props.idx]}</h4>
        <p>{props.date[props.idx]}</p>
        <p>상세 내용</p>
      </div>
    </>
  )
}

//리액트 빌드 (리액트앱 배포)
//npm run build
//build라는 폴더가 생성되고 그 안에 내용들을 배포하면 됨
