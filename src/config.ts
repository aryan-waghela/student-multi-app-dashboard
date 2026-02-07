const config = {
  projectUrl: String(import.meta.env.VITE_APPWRITE_URL),
  projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  todoTableId: String(import.meta.env.VITE_APPWRITE_TODO_TABLE_ID),
  plannerTableId: String(import.meta.env.VITE_APPWRITE_PLANNER_TABLE_ID),
  goalsTableId: String(import.meta.env.VITE_APPWRITE_GOALS_TABLE_ID),
} satisfies Record<string, string>

export default config