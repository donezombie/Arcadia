import React from "react";
import useSagaCreators from "hooks/useSagaCreators";
import { Formik, Form, FastField } from "formik";
import ErrorFocus from "components/ErrorFocus";
import InputField from "components/CustomField/InputField";
import { GetAuthSelector } from "redux/selectors/auth";
import { Redirect } from "react-router-dom";
import { RouteBase } from "constants/routeUrl";
import { Paper, Stack, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import CommonStyles from "components/CommonStyles";
import { useTranslation } from "react-i18next";
import { useLogin } from "hooks/authentication/useAuthenticationHooks";
import withNotification from "components/HOCs/withNotification";
import { EnumTypeSnackbar } from "constants/enum";
import AuthenticationModel from "models/AuthenticationModel";
import { authActions } from "redux/creators/modules/auth";
import LoginImage from "assets/login-img.webp";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    p: theme.spacing(4),
    minHeight: 600,
    [theme.breakpoints.down("md")]: {
      "& > div": {
        justifyContent: "center",
        padding: 24,
      },
    },
  },
  left: {
    flex: 6,
  },
  form: {
    flex: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  },
  imageLogin: {
    overflow: "hidden",
    borderRadius: "8px 0px 0px 8px",
    width: "100%",
    height: "100%",
    "& img": {
      width: "100%",
      height: "100%",
    },
    [theme.breakpoints.down("md")]: {
      borderRadius: "8px",
    },
  },
}));

const validationSchema = yup.object().shape({
  email: yup.string().email("Email is wrong !").required("Enter your Email."),
  password: yup
    .string()
    .required("Enter your password.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = (props) => {
  //! State
  const { openNotification } = props;
  const classes = useStyle();
  const { dispatch } = useSagaCreators();
  const { t } = useTranslation();
  const auth = GetAuthSelector();
  const { isLogin } = auth;

  const { mutateAsync: login, isLoading, error: errorMsg } = useLogin();

  if (isLogin) {
    return <Redirect to={RouteBase().Dashboard} />;
  }

  //! Function
  const handleSubmit = async (values) => {
    const body = new AuthenticationModel(values);
    await login(
      { email: body.email, password: body.password },
      {
        onSuccess: (response) => {
          dispatch(authActions.saveInfoUser, {
            token: response?.data?.data?.token,
          });
        },
        onError: (error) => {
          openNotification({
            type: EnumTypeSnackbar.error,
            message: error?.toString(),
          });
        },
      }
    );
  };

  //! Render
  return (
    <CommonStyles.Container>
      <Paper className={classes.root}>
        <Grid container>
          <Grid item lg={6}>
            <div className={classes.imageLogin}>
              <img src={LoginImage} alt="Login-app" />
            </div>
          </Grid>
          <Grid container xs={12} lg={6} md={6} className={classes.form}>
            <Grid lg={7} item>
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {(formik) => {
                  return (
                    <Form>
                      <ErrorFocus />
                      <Typography variant="h4" mb={2}>
                        {t("login:login_to_your_account")}
                      </Typography>
                      <Stack spacing={2}>
                        <FastField
                          component={InputField}
                          name="email"
                          label={t("common:enter", {
                            key: t("common:email").toLowerCase(),
                          })}
                        />

                        <FastField
                          component={InputField}
                          label={t("common:enter", {
                            key: t("common:password").toLowerCase(),
                          })}
                          type="password"
                          name="password"
                        />

                        <CommonStyles.Button
                          loading={isLoading}
                          variant="contained"
                          type="submit"
                        >
                          {t("common:login")}
                        </CommonStyles.Button>
                      </Stack>

                      <div className={classes.signUp}>
                        <Typography component="span" noWrap>
                          {t("login:dont_have_account_yet")}
                        </Typography>

                        <CommonStyles.NavLink to={RouteBase().Register} exact>
                          <Typography
                            className={classes.signUpTypo}
                            component="span"
                          >
                            {t("common:signup")}
                          </Typography>
                        </CommonStyles.NavLink>
                      </div>

                      {errorMsg && (
                        <Typography sx={{ color: "red", textAlign: "center" }}>
                          {errorMsg?.toString()}
                        </Typography>
                      )}
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
export default withNotification(LoginPage);
