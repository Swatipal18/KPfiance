import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Sidebar from './Component/Sidebar/Sidebar';
import Header from './Component/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import KPFiananceLoader from './Component/pages/loader/KPFiananceLoader/KPFiananceLoader';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <KPFiananceLoader />;
  }

  return (
    <>
      <div className="layout">
        <Sidebar />
        {/* Main Content */}
        <div className="main" >
          <Header />
          <main className='contect'>
            <Outlet />
          </main>
        </div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1e293b',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;