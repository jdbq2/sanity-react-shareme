import Router from "./router/MainRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router />;
    </GoogleOAuthProvider>
  );
}

export default App;
