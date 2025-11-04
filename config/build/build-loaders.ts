import ReactRefreshTypeScript from "react-refresh-typescript";
import {Configuration} from "webpack";
import {BuildOptions} from "./types/types";

export function buildLoaders({mode}: BuildOptions): Configuration['module']['rules'] {
    const isDev = mode === 'development';

    const cssLoader = {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
    }

    const tsLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
                    }),
                    transpileOnly: isDev
                }
            }
        ]
    }

    return [
        cssLoader,
        tsLoader
    ]
}