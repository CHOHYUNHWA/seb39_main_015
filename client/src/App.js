import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Join from './pages/Join.js';
import Login from './pages/Login.js';
import MyRoom from './pages/MyRoom.js';
import MainPage from './pages/MainPage.js';
import FindName from './pages/FindName.js';
import FindPw from './pages/FindPw.js';
import EditUser from './pages/EditUser';
import Header from './components/Header.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import RoomDetail from './pages/RoomDetail';
import { getCookieValue } from './hook/getCookieValue.js';
import { Loading } from './components/Loading.js';
import { RoobitListTestPage } from './pages/RoobitListTestPage';
import styled from 'styled-components';

export const ArrowUp = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  right: 50%;
  z-index: 105;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%) rotate(45deg);
  margin-top: 2px;
  border-top: 5px solid black;
  border-left: 5px solid black;
  display: ${(props) => props.displayNone};
  animation-name: fadeArrow;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  cursor: pointer;
  @keyframes fadeArrow {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  :hover {
    border-color: #ff8753;
    transform: translate(-50%, -50%) rotate(45deg) scale(1.02);
    animation: none;
  }
`;
export const ArrowDn = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  right: 50%;
  z-index: 55;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%) rotate(225deg);
  margin-top: 2px;
  border-top: 5px solid black;
  border-left: 5px solid black;
  display: ${(props) => props.displayNone};
  animation-name: fadeArrow;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  cursor: pointer;
  @keyframes fadeArrow {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  :hover {
    border-color: #ff8753;
    transform: translate(-50%, -50%) rotate(225deg) scale(1.02);
    animation: none;
  }
`;

function App() {
  const location = useLocation();
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    // query를 객체 형태로 가져오는 함수
    function get_query() {
      var url = document.location.href;
      var qs = url.substring(url.indexOf('?') + 1).split('&');
      for (var i = 0, result = {}; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
      }
      return result;
    }
    const googleAccessToken = get_query();
    if (googleAccessToken.access_token) {
      document.cookie = `Authorization=Bearer ${googleAccessToken.access_token};max-age=3600;`;
      window.location.replace('/#sectionOne');
    }
  }, []);

  useEffect(() => {
    setHash(window.location.hash);
  });

  // 아이디, 비밀번호에 대한 Auth 확인
  const { data } = useQuery(
    'auth',
    () =>
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/auth`, {
          headers: {
            Authorization: `${getCookieValue('Authorization')}`,
          },
        })
        .then((res) => res.data),
    { staleTime: 1000 * 60 * 5, retry: false }
  );
  data;

  const arrowUpClick = () => {
    if (hash === '#sectionTwo') {
      window.location.replace('/#sectionOne');
    } else if (hash === '#sectionThree') {
      window.location.replace('/#sectionTwo');
    }
  };
  const arrowDnClick = () => {
    if (hash === '#sectionOne' || hash === '') {
      window.location.replace('/#sectionTwo');
    } else if (hash === '#sectionTwo') {
      window.location.replace('/#sectionThree');
    }
  };
  const authData = getCookieValue('Authorization');
  return (
    <div>
      {!/^\/rooms\/+/.test(location.pathname) && <Header />}
      {window.location.pathname === '/' ? (
        <ArrowUp
          displayNone={hash === '#sectionOne' || hash === '' ? 'none' : ''}
          onClick={() => arrowUpClick()}
        />
      ) : (
        ''
      )}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={authData ? <MainPage /> : <Login />} />
        <Route path="/myroom" element={authData ? <MyRoom /> : <Login />} />
        <Route path="/findname" element={<FindName />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/rooms/:roomId" element={<RoomDetail />} />
        <Route path="/edituser" element={authData ? <EditUser /> : <Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/rooms/roobitslist" element={<RoobitListTestPage />} />
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {window.location.pathname === '/' ? (
        <ArrowDn
          displayNone={hash === '#sectionThree' ? 'none' : ''}
          onClick={() => arrowDnClick()}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
