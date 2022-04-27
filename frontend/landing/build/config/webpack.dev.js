/* eslint-disable import/no-unresolved */
import webpack from "webpack";
import { es5jsLoader } from "../loaders/jsLoader";

const plugins = [new webpack.ProgressPlugin()];

export const webpackDevConfig = {
  mode: "development",
  devtool: false,
  cache: true,
  module: {
    rules: [es5jsLoader],
  },
  plugins: [...plugins],
};
