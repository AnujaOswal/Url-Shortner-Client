import { Link, useHistory } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login({ setLogin }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const obj = await fetch("https://db-url-shortner.herokuapp.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      mode: "cors",
      credentials: "include",
    });

    const signin = await obj.json();

    if (obj.status === 400 || !signin) {
      alert(signin.error);
    } else {
      alert("Login Successful!");
      setLogin(true);
      history.push("/urlshortener");
    }
  };
  return (
    <div className="generateForm aligned login">
      <p>{"{ Sign-In }"}</p>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex b-border">
          <MdEmail className="form-icon" />
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            {...register("email")}
          />
        </div>
        <p className="message">{errors.email && "⚠ Email is required!"}</p>

        <div className="flex b-border">
          <RiLockPasswordFill className="form-icon" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...register("password")}
          />
        </div>
        <p className="message">
          {errors.password && "⚠ Password is required!"}
        </p>

        <input type="submit" value="Sign-In" />

        <div className="lLink" style={{ width: "100%" }}>
          <Link className="uline" to="forgotpassword">
            Forgot Password?
          </Link>
        </div>
      </form>

      {/* Register Link */}
      <div className="lLink">
        <Link className="uline" to="/register">
          New User? Sign-Up!
        </Link>
      </div>
    </div>
  );
}
