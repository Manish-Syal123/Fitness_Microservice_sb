import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/authSlice";
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const ActivitiesPage = () => {
  return (
    <div className="container mx-auto p-4">
      <ActivityForm onActivityAdded={() => window.location.reload()} />
      <ActivityList />
    </div>
  );
};

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
      {!token ? (
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
        <div className="flex flex-col items-center justify-center">
          <div>
            <Alert className="mb-4 flex items-center shadow-lg">
              <CheckCircle2Icon />
              <AlertTitle>
                Success! You are logged in as "{tokenData?.name || "User"}"
              </AlertTitle>
              <AlertDescription className="ml-30">
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
              </AlertDescription>
            </Alert>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                token ? (
                  <Navigate to={"/activities"} replace />
                ) : (
                  <div>Welcome Please Login</div>
                )
              }
            />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
