import {Configuration} from "webpack";
import {BuildOptions} from "./types/types";
import {buildPlugins} from "./build-plugins";
import {buildLoaders} from "./build-loaders";
import {buildResolvers} from "./build-resolvers";
import {buildDevServer} from "./build-dev-server";
import {buildOptimization} from "./build-optimization";

export function buildWebpack(options: BuildOptions): Configuration {
    const {mode, paths} = options
    const isDev = mode === "development";

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true,
            publicPath: "/"
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devServer: isDev ? buildDevServer(options) : undefined,
        optimization: buildOptimization()
    }
}