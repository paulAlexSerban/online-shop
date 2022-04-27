import del from "del";
import { paths } from "../config/paths";

export const clean = () => {
  return del([`${paths.dist}`]);
};
