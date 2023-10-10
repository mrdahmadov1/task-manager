export class SignupModel {
  constructor(
    public companyName: string,
    public phoneNumber: string,
    public address: string,
    public username: string,
    public email: string,
    public password: string
  ) {}
}
