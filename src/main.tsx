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
console.log('🎂 Birthday App: Starting initialization...');

window.addEventListener('error', (e) => {
  console.error('🚨 Global error:', e.error);
  console.error('🚨 Error details:', e.filename, e.lineno, e.colno);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('🚨 Unhandled promise rejection:', e.reason);
});

// Log loading progress
console.log('🎂 Birthday App: Loading React modules...');

try {
  const rootElement = document.getElementById('root');
  console.log('🎂 Birthday App: Root element found:', !!rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  console.log('🎂 Birthday App: Creating React root...');
  const root = createRoot(rootElement);
  
  console.log('🎂 Birthday App: Rendering App component...');
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  console.log('🎂 Birthday App: React app initialized successfully!');
  
  // Notify that React has loaded successfully
  if (window.markReactLoaded) {
    window.markReactLoaded();
  }
  
  // Remove loading screen after successful initialization
  setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading && loading.parentNode) {
      console.log('🎂 Birthday App: Removing loading screen...');
      loading.style.opacity = '0';
      loading.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => {
        if (loading.parentNode) {
          loading.remove();
        }
      }, 500);
    }
  }, 1000);
  
} catch (error) {
  console.error('🚨 Failed to initialize React app:', error);
  // Show error to user
  const errorHtml = `
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
      z-index: 10000;
    ">
      <div>
        <h1>🎂 Birthday App Loading Error</h1>
        <p>Something went wrong while loading your special surprise!</p>
        <p style="font-size: 0.8em; opacity: 0.8; max-width: 500px;">Error: ${error instanceof Error ? error.message : String(error)}</p>
        <details style="margin: 20px 0; text-align: left;">
          <summary style="cursor: pointer;">🔍 Technical Details</summary>
          <pre style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 5px; overflow: auto; max-height: 200px; font-size: 0.7em;">${error instanceof Error ? error.stack : String(error)}</pre>
        </details>
        <button onclick="location.reload()" style="
          background: rgba(255,255,255,0.2);
          border: 2px solid white;
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 20px;
        ">🔄 Try Again</button>
        <br><br>
        <a href="https://github.com/Lagadnakul/Birthday" style="color: white; text-decoration: underline;">📁 View Source Code</a>
      </div>
    </div>
  `;
  
  // Remove loading screen and show error
  const loading = document.getElementById('loading');
  if (loading && loading.parentNode) {
    loading.remove();
  }
  
  document.body.insertAdjacentHTML('beforeend', errorHtml);
}
