import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Url(props) {
  const history = useHistory();
  const [todayUrl, setTodayUrl] = useState([]);

  const today = async () => {
    const obj = await fetch("https://db-url-shortner.herokuapp.com/currdate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await obj.json();
    setTodayUrl(data);
  };

  useEffect(() => {
    if (!props.login) {
      history.push("/");
    }

    today();
  });
  return (
    //   Input and generate button for generating a short url
    <div className="generateForm aligned">
      <h5 className="date">
        Today <span>{todayUrl.length}</span>
      </h5>
      <h5 className="date">
        This Month <span>{props.urlData.length}</span>
      </h5>
      <p>{"{ Shorten your URL below }"}</p>
      <form
        className="aligned"
        method="POST"
        onSubmit={(e) => props.handleSubmit(e)}
      >
        <div className="b-border">
          <input
            type="text"
            placeholder="Long URL"
            name="longurl"
            onChange={(ele) => props.setUrl(ele.target.value)}
          />
        </div>

        <input type="submit" value="Generate" />
      </form>
    </div>
  );
}