import { Grid, Paper, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputField from "components/CustomField/InputField";
import ErrorFocus from "components/ErrorFocus";
import { FastField, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import CommonStyles from "components/CommonStyles";
import { useSignUp } from "hooks/authentication/useAuthenticationHooks";
import AuthenticationModel from "models/authentication.model";
import { EnumTypeSnackbar } from "constants/enum";
import { RouteBase } from "constants/routeUrl";
import { GetAuthSelector } from "redux/selectors";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useTranslation } from "react-i18next";
import RegisterImage from "assets/register-img.webp";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    p: theme.spacing(4),
    minHeight: 600,
  },
  signUp: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
  signUpTypo: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: `${theme.spacing(1)} !important`,
    cursor: "pointer",
    textAlign: "center",
  },
  imageLogin: {
    overflow: "hidden",
    borderRadius: "8px 0px 0px 8px",
    width: "100%",
    height: "100%",
    minHeight: 600,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  form: {
    flex: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const validationSchema = yup.object().shape({
  email: yup.string().email("Email is wrong !").required("Enter your Email."),
  password: yup
    .string()
    .required("Enter your password.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = (props) => {
  //! State
  const { openNotification } = props;
  const classes = useStyle();
  const history = useHistory();
  const auth = GetAuthSelector();
  const { isLogin } = auth;
  const { t } = useTranslation();
  const { mutateAsync: signUp, isLoading } = useSignUp();

  //! Function
  const handleRegister = async (values) => {
    const body = new AuthenticationModel(values);
    await signUp(body, {
      onSuccess: () => {
        openNotification({
          type: EnumTypeSnackbar.success,
          message: t("message:register_successfully"),
        });
        setTimeout(() => {
          history.push(RouteBase.Login);
        }, 1500);
      },
      onError: (error) => {
        openNotification({
          type: EnumTypeSnackbar.error,
          message: error?.toString(),
        });
      },
    });
  };

  if (isLogin) {
    return <Redirect to={RouteBase.Dashboard} />;
  }

  //! Render
  return (
    <CommonStyles.Container>
      <Paper className={classes.root}>
        <Grid container>
          <Grid item lg={6} className={classes.left}>
            <div className={classes.imageLogin}>
              <img src={RegisterImage} alt="Login-app" />
            </div>
          </Grid>
          <Grid container xs={12} lg={6} md={6} className={classes.form}>
            <Grid item lg={7}>
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleRegister}
              >
                {(formik) => {
                  return (
                    <Form>
                      <ErrorFocus />
                      <Typography variant="h3" mb={2}>
                        Sign up to Salas
                      </Typography>
                      <Stack spacing={2}>
                        <FastField
                          name="email"
                          component={InputField}
                          label="Enter your email"
                        />
                        <FastField
                          component={InputField}
                          label={t("common:enter", {
                            key: t("common:password"),
                          })}
                          type="password"
                          name="password"
                        />

                        <FastField
                          component={InputField}
                          label={t('common:confirm', { key: t('common:password')})}
                          type="password"
                          name="confirmPassword"
                        />

                        <CommonStyles.Button
                          loading={isLoading}
                          variant="contained"
                          type="submit"
                        >
                          Sign Up
                        </CommonStyles.Button>
                      </Stack>
                      <div className={classes.signUp}>
                        <Typography component="span" noWrap>
                          {t("login:already_have_account")}
                          <CommonStyles.NavLink to={RouteBase.Login}>
                            <Typography
                              className={classes.signUpTypo}
                              component="span"
                            >
                              {t("common:login")}
                            </Typography>
                          </CommonStyles.NavLink>
                        </Typography>
                        <span>{"  "}</span>
                        <CommonStyles.NavLink to="/login" exact>
                          <Typography
                            className={classes.signUpTypo}
                            component="span"
                          >
                            {signUp}
                          </Typography>
                        </CommonStyles.NavLink>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </CommonStyles.Container>
  );
};
export default RegisterPage;
