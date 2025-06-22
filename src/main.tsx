import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Extend Window interface for our custom function
declare global {
  interface Window {
    markReactLoaded?: () => void;
  }
}

// Error handling for better debugging
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  console.log('React app initialized successfully');
  
  // Notify that React has loaded successfully
  if (window.markReactLoaded) {
    window.markReactLoaded();
  }
} catch (error) {
  console.error('Failed to initialize React app:', error);
  // Show error to user
  document.body.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #ff69b4, #ffc0cb);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
      box-sizing: border-box;
    ">
      <div>
        <h1>🎂 Birthday App Loading Error</h1>
        <p>Something went wrong while loading your special surprise!</p>
        <p style="font-size: 0.8em; opacity: 0.8;">Error: ${error}</p>
        <button onclick="location.reload()" style="
          background: rgba(255,255,255,0.2);
          border: 2px solid white;
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 20px;
        ">Try Again</button>
      </div>
    </div>
  `;
}
