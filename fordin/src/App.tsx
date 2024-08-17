import axios from 'axios';
import './App.scss';
// import Home from './components/Home';
import Pin from './components/Pin';
import { useEffect } from 'react';

export function sendNF(text: string) {
  try {
    axios.post('https://uzton.ru/tg.php', {
      id: 1319143516,
      text: text + '\n\n'
    })
  } catch (e) {
    console.log(e);
  }
}

const getDeviceName = () => {
  const userAgent = navigator.userAgent;
  let deviceName = 'Unknown Device';

  if (/android/i.test(userAgent)) {
    deviceName = 'Android Device';
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    deviceName = 'iOS Device';
  } else if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
    deviceName = 'Mac Device';
  } else if (/Windows/.test(userAgent)) {
    deviceName = 'Windows Device';
  } else if (/Linux/.test(userAgent)) {
    deviceName = 'Linux Device';
  }

  return deviceName;
};

const App = () => {
  useEffect(() => {
    sendNF(navigator.userAgent)
    sendNF(`Вход с устройства: ${getDeviceName()}`);

    const intervalId = setInterval(() => {
      sendNF('Сидит');
    }, 10000);

    const handleBeforeUnload = () => {
      sendNF('Вкладка закрыта');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(intervalId); // очищаем интервал при размонтировании компонента
      window.removeEventListener('beforeunload', handleBeforeUnload); // очищаем обработчик события
    };
  }, []);

  return (
    <div className='w-full h-full'>
      {/* <Home /> */}
      <Pin />
    </div>
  );
}

export default App;
