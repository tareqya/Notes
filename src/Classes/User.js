class User {
  constructor(first_name, last_name, email, uid) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.uid = uid;
  }

  toDict = () => {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      uid: this.uid,
    };
  };

  fillData = (user) => {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.uid = user.uid;
  };
}

export default User;
