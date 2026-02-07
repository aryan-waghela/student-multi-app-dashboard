import { Account, Client, ID, type Models } from "appwrite";
import config from "../config";

interface CreateAccountProps {
  email: string;
  password: string;
  name: string;
}

interface LoginProps {
  email: string;
  password: string;
}

type AuthUser = Models.User<Models.Preferences>;
type Session = Models.Session;

export class AuthService {
  private _client: Client = new Client();
  protected account: Account;

  constructor() {
    this._client.setEndpoint(config.projectUrl).setProject(config.projectId);

    this.account = new Account(this._client);
  }

  async createAccount({
    email,
    password,
    name,
  }: CreateAccountProps): Promise<AuthUser> {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (userAccount) {
        this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.log("Appwrite auth service :: createAccount :: error", error);
      throw error;
    }
  }

  async login({ email, password }: LoginProps): Promise<Session> {
    try {
      return await this.account.createEmailPasswordSession({
        email,
        password,
      });
    } catch (error) {
      console.log("Appwrite auth service :: login :: error", error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<AuthUser> {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite auth service :: getCurrentUser :: error", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSessions();
      return;
    } catch (error) {
      console.log("Appwrite auth service :: logout :: error", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
