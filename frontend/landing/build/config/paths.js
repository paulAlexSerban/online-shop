
export const PARENT_DIR = "./frontend";
export const PROJECT_NAME = "landing";

export const PROJECT_PATH = `${PARENT_DIR}/${PROJECT_NAME}/`; // ./frontend/fe.landing/
export const SRC_DIR = `source`; // ./frontend/fe.landing/source
export const DIST_DIR = `dist`; // ./frontend/dist

export const paths = {
  src: {
    styles: {
      scssFiles: [
        `${SRC_DIR}/scss/*/*/*/*.scss`,
      ],
      scssWatchFiles: [
        `${SRC_DIR}/scss/*/*.scss`,
        `${SRC_DIR}/scss/*/*/*.scss`,
        `${SRC_DIR}/scss/*/*/*/*.scss`,
        `${SRC_DIR}/scss/*/*/*/*/*.scss`,
        `${SRC_DIR}/scss/*/*/*/*/*/*.scss`,
      ],
      scssEntries: [
        `${SRC_DIR}/scss/modules/layout/pages/*.scss`,
      ],
      cssEntries: [
        `${DIST_DIR}/*/*/styles/.tmp/*.page.css`,
        `${DIST_DIR}/*/*/styles/.tmp/*.template.css`,
      ],
      rawCssEntries: `${DIST_DIR}/styles/.tmp/*.css`,
    },
    javascript: {
      jsFiles: [
        `${SRC_DIR}/javascript/abstracts/*/*.js`,
        `${SRC_DIR}/javascript/modules/components/*/*.js`,
        `${SRC_DIR}/javascript/modules/structure/*/*.js`,
      ],
      jsEntries: [
        `${SRC_DIR}/javascript/modules/structure/pages/*.page.js`,
      ],
    },
  },
  dist: `${DIST_DIR}`
};
