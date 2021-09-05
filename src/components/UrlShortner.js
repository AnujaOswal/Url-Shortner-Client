import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function UrlShortener(props) {
  const history = useHistory();
  
  useEffect(() => {
    if (!props.login) {
      history.push("/");
    }
  });
  return (
    <section className="urlList">
      <div className="row h-row">
        <h4 className="col r-border">Long Url</h4>

        <h4 className="col m-align r-border  s-width">Short Url</h4>

        <h4 className="col m-align s-width">Click Count</h4>
      </div>

      {/* List of urls created */}
      {props.urlData.map((ele) => {
        return (
          <div key={ele._id} className="row">
            <div className="ellip col r-border">{ele.longUrl}</div>

            <div className="col m-align r-border ellip s-width">
              <a href={ele.shortUrl} target="_blank" rel="noreferrer">
                {ele.urlCode}
              </a>
            </div>

            <div className="col m-align s-width">{ele.clicks}</div>
          </div>
        );
      })}
    </section>
  );
}