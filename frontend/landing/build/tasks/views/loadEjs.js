import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import { paths } from "../../config/paths";
// import debug from "gulp-debug";
import { PROJECT_PATH } from "../../config/constants";

export const loadEjs = () => {
  return src([
    `${paths.src.views.ejsDirectory}/*.ejs`,
    `${paths.src.views.ejsDirectory}/*/*.ejs`,
  ])
    .pipe(plumber())
    // .pipe(debug({ title: "loadEjs : ", minimal: false}))
    .pipe(dest([`${paths.dist.distDir}/${PROJECT_PATH}/views`]));
};
