import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        모달 열기
      </button>

      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-modal.overlay"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-modal.content">
            <h2 className="text-xl font-bold mb-4">모달 제목</h2>
            <p className="mb-4">모달 내용입니다.</p>
            <input
              type="text"
              className="w-full p-2 border rounded z-modal-content"
              placeholder="입력해주세요"
            />
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              닫기
            </button>
          </div>
        </>
      )}

      <div className="mt-8">
        <div className="relative inline-block">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            툴팁 보기
          </button>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white px-3 py-1 rounded text-sm z-tooltip">
            툴팁 내용
          </div>
        </div>
      </div>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
