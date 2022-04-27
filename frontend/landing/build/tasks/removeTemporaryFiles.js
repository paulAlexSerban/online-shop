import del from "del";
import { paths, DIST_DIR } from "../config/paths";

export const removeTemporaryFiles = () => {
  return del([`${paths.dist}/styles/.tmp`]);
};
