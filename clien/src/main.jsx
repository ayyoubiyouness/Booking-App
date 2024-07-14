import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SearchContext, SearchContextProvider } from './context/SearchContext.jsx'
import { AuthContextProvider } from './context/authContext.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>

    </AuthContextProvider>
  </React.StrictMode>
);
