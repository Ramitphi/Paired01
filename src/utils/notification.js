import { notifications } from "../scripts/Notifications/notification.ts";

export const shownotification = async (profile) => {
  const res = notifications("0x018e");
  console.log(res);
};
