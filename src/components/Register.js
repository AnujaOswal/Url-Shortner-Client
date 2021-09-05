import { useHistory } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  fname: yup.string().required(),
  lname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6, "⚠ Minimum 6 characters!").required(),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
});

export default function Register() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const response = await fetch("https://db-url-shortner.herokuapp.com/signup", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
      }),
    });

    const signup = await response.json();

    if (signup) {
      alert("Signup Successful!\nCheck your mail to verify your account.");
      reset();
      history.push("/");
    } else {
      alert(signup.error);
    }
  };

  return (
    <div className="generateForm aligned login">
      <p>{"{ Sign-Up }"}</p>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <p className="uline back" onClick={() => history.goBack()}>
          ⇐ click to go back
        </p>

        <div className="flex b-border">
          <FaUserAlt className="form-icon" />
          <input
            type="text"
            placeholder="First Name"
            name="fname"
            {...register("fname")}
          />
        </div>
        <p className="message">{errors.fname && "⚠ First name is empty!"}</p>

        <div className="flex b-border">
          <FaUserAlt className="form-icon" />
          <input
            type="text"
            placeholder="Last Name"
            name="lname"
            {...register("lname")}
          />
        </div>
        <p className="message">{errors.lname && "⚠ Last name is empty!"}</p>

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
        <p className="message">{errors.password?.message}</p>

        <div className="flex b-border">
          <RiLockPasswordFill className="form-icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            {...register("cpassword")}
          />
        </div>
        <p className="message">
          {errors.cpassword && "⚠ Oops! Passwords should match!"}
        </p>

        <input type="submit" value="Sign-Up" />
      </form>
    </div>
  );
}
