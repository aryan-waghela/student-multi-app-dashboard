import {
  Client,
  ID,
  Permission,
  Query,
  Role,
  TablesDB,
  type Models,
} from "appwrite";
import config from "../config";
import authService from "./authService";

export interface TodoModel {
  title: string;
  content: string;
  isImportant: boolean;
  isCompleted: boolean;
  userId: string;
}

interface GetTodo {
  rowId: string;
}

export type UpdateTodo = Partial<Omit<TodoModel, "userId">>;

export type TodoRow = Models.Row & TodoModel;

export class TodoService {
  private readonly _client: Client = new Client();
  protected readonly tablesDB;
  private async getCurrentUserId(): Promise<string> {
    const user = await authService.getCurrentUser();
    return user.$id;
  }

  constructor() {
    this._client.setEndpoint(config.projectUrl).setProject(config.projectId);
    this.tablesDB = new TablesDB(this._client);
  }

  async createTodo({
    title,
    content,
    isImportant = false,
    isCompleted = false,
    userId,
  }: TodoModel): Promise<TodoRow> {
    try {
      return await this.tablesDB.createRow({
        databaseId: config.databaseId,
        tableId: config.todoTableId,
        rowId: ID.unique(),
        data: {
          title,
          content,
          isImportant,
          userId,
          isCompleted,
        },
        permissions: [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ],
      });
    } catch (error) {
      console.log("Appwrite todo service :: createTodo :: error", error);
      throw error;
    }
  }

  async getTodo({ rowId }: GetTodo): Promise<TodoRow | null> {
    try {
      return await this.tablesDB.getRow({
        databaseId: config.databaseId,
        tableId: config.todoTableId,
        rowId: rowId,
      });
    } catch (error) {
      console.log("Appwrite todo service :: getTodo :: error", error);
      return null;
    }
  }

  async listTodos(): Promise<Models.RowList<TodoRow>> {
    try {
      const userId = await this.getCurrentUserId();

      return await this.tablesDB.listRows({
        databaseId: config.databaseId,
        tableId: config.todoTableId,
        queries: [Query.equal("userId", userId)],
      });
    } catch (error) {
      console.log("Appwrite todo service :: listTodos :: error", error);
      throw error;
    }
  }

  async updateTodo(
    rowId: string,
    { title, content, isImportant, isCompleted}: UpdateTodo,
  ): Promise<TodoRow> {
    try {
      console.log("updating todo...");
      return await this.tablesDB.updateRow({
        databaseId: config.databaseId,
        tableId: config.todoTableId,
        rowId,
        data: {
          title,
          content,
          isImportant,
          isCompleted,
        },
      });
    } catch (error) {
      console.log("Appwrite todo service :: updateTodo :: error", error);
      throw error;
    }
  }

  async deleteTodo(rowId: string): Promise<boolean> {
    try {
      await this.tablesDB.deleteRow({
        databaseId: config.databaseId,
        tableId: config.todoTableId,
        rowId,
      });
      return true;
    } catch (error) {
      console.log("Appwrite todo service :: deleteTodo :: error", error);
      return false;
    }
  }
}

const todoService = new TodoService();

export default todoService;
