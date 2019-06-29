export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpiredDate: Date
  ) {}

  get token() {
    // token expired after one hour
    if (new Date() > new Date(this._tokenExpiredDate)) {
      return null;
    } else {
      return this._token;
    }
  }
}
