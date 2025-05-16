import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  state = { 
    error: null,
    errorInfo: null 
  };
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Component Stack:", errorInfo.componentStack);
  }
  
  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: '2rem',
          margin: '1rem',
          backgroundColor: '#fff8f8',
          border: '2px solid #ffcccc',
          borderRadius: '8px',
          color: '#cc0000',
          fontFamily: 'sans-serif'
        }}>
          <h2 style={{ marginTop: 0 }}>⚠️ Application Error</h2>
          <p>{this.state.error.toString()}</p>
          
          <details style={{ 
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: '#fff',
            border: '1px solid #eee'
          }}>
            <summary>Error Details</summary>
            <pre style={{
              whiteSpace: 'pre-wrap',
              fontSize: '0.8rem',
              overflowX: 'auto'
            }}>
              {this.state.errorInfo.componentStack}
            </pre>
          </details>
          
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#cc0000',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML = `
    <div style="
      padding: 2rem;
      background: #ffebee;
      color: #b71c1c;
      font-family: sans-serif;
    ">
      <h1>Critical Rendering Error</h1>
      <p>Could not find root element (#root) in the DOM.</p>
      <p>Please check your index.html file.</p>
    </div>
  `;
  throw new Error('Missing root element');
}

const root = createRoot(rootElement);

// Development mode logging
if (import.meta.env.DEV) {
  console.log('React mounting in development mode');
  console.log('Store state:', store.getState());
}

root.render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <div data-app-container="true">
          <App />
        </div>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);

// Post-render verification
setTimeout(() => {
  const appContent = document.querySelector('[data-app-container]');
  if (!appContent || appContent.innerHTML.trim() === '') {
    console.warn('App rendered empty content');
    console.debug('Store state:', store.getState());
  }
}, 100);