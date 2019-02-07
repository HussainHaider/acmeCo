export class User {
  Email: string;
  Password: string;
  UserName: string;
  CompanyName: string;

  constructor(Email: string, Password: string, UserName?: string, CompanyName?: string) {
    this.Email = Email;
    this.Password = Password;
    this.UserName = UserName;
    this.CompanyName = CompanyName;
  }
}
