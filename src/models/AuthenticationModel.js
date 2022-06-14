class AuthenticationModel {
  constructor(values) {
    this.email = values?.email || '';
    this.password = values?.password || '';
  }
}

export default AuthenticationModel;
