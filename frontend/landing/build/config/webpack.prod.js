/* eslint-disable import/no-unresolved */
import webpack from "webpack";
import { es5jsLoader } from "../loaders/jsLoader";
import TerserPlugin from "terser-webpack-plugin";

const plugins = [new webpack.ProgressPlugin()];

export const webpackProdConfig = {
  mode: "production",
  cache: true,
  module: {
    rules: [es5jsLoader],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [...plugins],
};
