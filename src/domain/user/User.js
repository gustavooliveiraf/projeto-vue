export default class User {

  constructor(email='', password='', name='', user='', company='') {
    this.name = name;
    this.user = user;
    this.email = email;
    this.company = company;
    this.password = password;
  }
}