/* eslint-disable import/no-unresolved */
import { task, series, parallel, watch } from "gulp";
import { clean } from "./tasks/clean";

import { paths } from "./config/paths";
import { lintScss } from "./tasks/scss/lintScss";
import { lintJs } from "./tasks/javascript/lintJs";
import { cssTranspile } from "./tasks/scss/cssTranspile";
import { cssCleanMinify } from "./tasks/scss/cssCleanMinify";
import {
  jsTranspileProd,
  jsTranspileDev,
} from "./tasks/javascript/jsTranspile";
import { removeTemporaryFiles } from "./tasks/removeTemporaryFiles";

task("clean", clean);
task("clean:frontend", series("clean"));

// LINT
task("lint:styles", lintScss);
task("lint:scripts", lintJs);
task("lint", parallel("lint:styles", "lint:scripts"));

// // BUILD
task("build:styles", cssTranspile);
task("build:scripts:dev", jsTranspileDev);
task("build:scripts:prod", jsTranspileProd);
task("build", parallel("build:styles", "build:scripts:dev"));

// // MINIFY
task("minify:styles", series(cssCleanMinify));
task("minify", series(parallel("minify:styles"), removeTemporaryFiles));

task("build", series("clean", "lint", "build", "minify"));

// WATCH
task("watch:fe:landing", () => {
  watch(paths.src.javascript.jsFiles, series("lint:scripts", "build:scripts:dev"));
  watch(
    [...paths.src.styles.scssFiles, ...paths.src.styles.scssWatchFiles],
    series("lint:styles", "build:styles", "minify:styles")
  );
});
