class AuthenticationService {
  constructor() {
    this.storage = window.sessionStorage;
  }

  isAuthenticated() {
    return this.getUser() ? true : false;
  }

  getUser() {
    const user = this.storage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  setUser(user) {
    this.storage.setItem("user", JSON.stringify(user));
  }

  logout() {
    this.storage.removeItem("user");
  }
}

export const authenticationService = new AuthenticationService();
