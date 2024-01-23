import {React, Button, Input, InputLabel, FormHelperText, IconButton, InputAdornment, Visibility, VisibilityOff, CloseIcon, useForm} from "../../../assets/MaterialUiImports.js";
import { DisplayLogin } from "../../../assets/DialogueAsset";
import { useDispatch, useSelector} from "react-redux";
import { loginUser, userLoggedIn } from "../../../features/auth/authSlice.js";
import SignUp from "../SignUp/SignUp.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import "./Login.css";

const login = ({openLogin, setOpen}) => {
  const {register, handleSubmit, formState: { errors }} = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();
  const {loading} = useSelector(userLoggedIn);

  const submitForm = (data) => {
    dispatch(loginUser(data))
  };

  return (
    <>
    <DisplayLogin
        id="displayLogin"
        onClose={()=> setOpen(false)}
        open={openLogin}
      >
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>    
    <form className="signInFormMain" onSubmit={handleSubmit(submitForm)}>
      <div className="signInForm">
        <p className="signInHeading">Sign in</p>
        <p className="signInHeading signInMsg">
          Welcome Back. Sign in to stay updated
        </p>
        <InputLabel htmlFor="email" id="email">Your Email</InputLabel>
        <Input
          id="email"
          autoComplete="off"
          {...register("email", {
            required: "Required field",
            pattern: {
              value: /^[A-Z0-9.%+-]+@[A-Z0-9.]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={!!errors?.email}
        />
        <FormHelperText id="signInFormInputs">{errors?.email?.message}</FormHelperText>
        <InputLabel htmlFor="password" id="password">Your Password</InputLabel>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "Required field" })}
          error={!!errors?.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText id="signInFormInputs">{errors?.password?.message}</FormHelperText>
        <Button id="loginBtn" type="submit" variant="contained" >
          {loading === "idle" ? "SignIn" : <CircularProgress size={20} style={{color:"white"}}/>}
        </Button>
      </div>
      <p className="signUp">
        Don't have an account ? <a onClick={()=>{setOpen(false); setOpenSignUp(true);}} className="signUpClick">SignUp</a>
      </p>
    </form>
   
    </DisplayLogin>
    <SignUp openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} />
    </>
  );
};

export default login;
