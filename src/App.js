import './App.css';
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Footer from './components/Footer';
import UrlShortener from './components/UrlShortner';
import Url from './components/Url';


function App() {
  const [login, setLogin] = useState(false);
  const [url, setUrl] = useState("");
  const [urlData, setUrlData] = useState([]);

  // Fetching the url data on page load and on data update
  const Data = async () => {
    const obj = await fetch("https://db-url-shortner.herokuapp.com/getUrl", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/JSON",
      },
      credentials: "include",
    });

    const data = await obj.json();
    setUrlData(data);
  };

  // Function to create and post the short and long urls to the  db
  const handleSubmit = async (event) => {
    event.preventDefault();
    const obj = await fetch("https://db-url-shortner.herokuapp.com/shorturl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl: url }),
    });

    if (obj.status === 401) {
      alert(obj.error);
    } else {
      setUrl("");
      alert("Your URL is Shortened!");
    }

    Data();
  };

  useEffect(() => {
    Data();
  });
  return (
    <div className="App">

   
 {/* Navigation Bar on top */}
  <NavBar login={login} />

  <Switch>
    {/* User Login */}
    <Route exact path="/">
      <Login setLogin={setLogin} />
    </Route>
 
    <Route path="/login">
    <Login setLogin={setLogin} />
    </Route>
    {/* User Registeration */}
    <Route path="/register">
      <Register />
    </Route>

    {/* Generate URL Shortener Route Dashboard */}
    <Route path="/urlshortener">
          <Url
            handleSubmit={handleSubmit}
            setUrl={setUrl}
            urlData={urlData}
            login={login}
          />
        </Route>

        {/* List of URLs generated */}
        <Route path="/urls">
          <UrlShortener urlData={urlData} handleSubmit={handleSubmit} login={login} />
        </Route>

        {/* Logout */}
        <Route path="/logout">
          <Logout login={login} setLogin={setLogin} />
        </Route>

  </Switch>

  {/* Footer */}
  <Footer />
  </div>
);
}

export default App;
