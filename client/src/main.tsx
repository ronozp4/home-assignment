import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { PostsProvider } from "./context/PostsContext.tsx";

const root = document.getElementById("root");
if (root) ReactDOM.createRoot(root).render(<AuthProvider><PostsProvider><App /></PostsProvider></AuthProvider>);
