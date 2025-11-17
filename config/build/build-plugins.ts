import {Configuration, DefinePlugin} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from "dotenv-webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import {BuildOptions} from "./types/types";

export function buildPlugins({mode, paths}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === "development";

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({template: paths.html})
    ]

    if (isDev) {
        plugins.push(
            new Dotenv(),
            new ReactRefreshWebpackPlugin(),
        )
    } else {
        plugins.push(new DefinePlugin({
            'process.env.REACT_APP_BASE_URL': JSON.stringify(process.env.REACT_APP_BASE_URL)
        }))
    }

    return plugins
}