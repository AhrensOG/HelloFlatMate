import { getAllToDosForNotificationsAdminPanel } from "./controllers/getToDosForNotifications";

export async function GET() {
  const result = await getAllToDosForNotificationsAdminPanel();
  return result;
}
