import { React, Button, IconButton, Input, InputLabel, FormHelperText, InputAdornment, Visibility, VisibilityOff, useForm, CloseIcon} from "../../../assets/MaterialUiImports.js";
import { DisplaySignUp } from "../../../assets/DialogueAsset";
import { useDispatch, useSelector } from "react-redux";
import { signupUser , userLoggedIn} from "../../../features/auth/authSlice.js";
import "./Signup.css";
import { CircularProgress } from "@mui/material";

const SignUp = ({ openSignUp, setOpenSignUp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const dispatch = useDispatch();
  const {loading} = useSelector(userLoggedIn);
  
  const submitForm = (data) => {
    dispatch(signupUser(data))
  };
  
  return (
    <>
      <DisplaySignUp onClose={() => setOpenSignUp(false)} open={openSignUp}>
        <IconButton
          onClick={() => setOpenSignUp(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="signUpForm">
            <p className="signUpHeading">Create Your Account</p>
            <InputLabel htmlFor="signUpName" id="signUpName">Name</InputLabel>
            <Input
              id="signUpName"
              autoComplete="off"
              {...register("name", {
                required: "Required field",
              })}
              error={!!errors?.name}
            />
            <FormHelperText id="signUpFormInputs">
              {errors?.name?.message}
            </FormHelperText>
            <InputLabel htmlFor="signUpemail" id="signUpemail">Email</InputLabel>
            <Input
              id="signUpemail"
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
            <FormHelperText id="signUpFormInputs">
              {errors?.email?.message}
            </FormHelperText>
            <InputLabel htmlFor="signUppNumber" id="signUppNumber">Phone no#</InputLabel>
            <Input
              id="signUppNumber"
              autoComplete="off"
              {...register("pNumber", {
                required: "Required field",
              })}
              error={!!errors?.pNumber}
            />
            <FormHelperText id="signUpFormInputs">
              {errors?.pNumber?.message}
            </FormHelperText>
            <div>
              <InputLabel htmlFor="signUppassword" id="signUppassword">Password</InputLabel>
              <Input
                id="signUppassword"
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
              <FormHelperText id="signUpFormInputs">
                {errors?.password?.message}
              </FormHelperText>
              <InputLabel htmlFor="signUpCpassword" id="signUpCpassword">
                Confirm Password
              </InputLabel>
              <Input
                id="signUpCpassword"
                type={showPassword ? "text" : "password"}
                {...register("cPassword", { required: "Required field" })}
                error={!!errors?.cPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="signUpFormInputs">
                {errors?.cPassword?.message}
              </FormHelperText>
            </div>
            <Button id="signUpBtn" type="submit" variant="contained">
              {loading === "idle" ? "SignUp" : <CircularProgress size={20} style={{color:"white"}}/>}
            </Button>
          </div>
          <p className="signIn">
            Already have an account ? <a className="signInClick">SignIn</a>
          </p>
        </form>
      </DisplaySignUp>
     
    </>
  );
};

export default SignUp;
