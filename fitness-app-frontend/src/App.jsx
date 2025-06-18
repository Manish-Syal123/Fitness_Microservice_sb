import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Button } from "@/components/ui/button";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/authSlice";

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token && !authReady ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to the App</h1>
            <p className="mb-4">Please log in to continue.</p>
            <Button
              className="cursor-pointer"
              onClick={() => {
                logIn()
                  .then(() => {
                    setAuthReady(true);
                  })
                  .catch((error) => {
                    console.error("Login failed:", error);
                  });
              }}
            >
              Login
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
            <p className="mb-4">
              You are logged in as {tokenData?.name || "User"}.
            </p>
            <Button
              className="cursor-pointer"
              onClick={() => {
                logOut()
                  .then(() => {
                    setAuthReady(false);
                  })
                  .catch((error) => {
                    console.error("Logout failed:", error);
                  });
              }}
            >
              Logout
            </Button>
            <div className="mt-4 p-4 bg-gray-100 rounded overflow-y-scroll max-h-96 border-2 border-gray-300">
              <pre>{JSON.stringify(tokenData, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
