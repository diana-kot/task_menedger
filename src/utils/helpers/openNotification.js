import { notification } from "antd";

export default ({ text, type = "info", title, duration = 1 }) =>
  notification[type]({
    message: title,
    description: text,
    duration: duration,
  });
