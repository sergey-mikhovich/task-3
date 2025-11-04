import path from 'path'
import { Configuration } from 'webpack'
import {BuildPaths} from "./config/build/types/types";
import {buildWebpack} from "./config/build/build-webpack";

interface EnvVariables {
    mode: Configuration['mode'],
    port: number
}

export default ({mode, port}: EnvVariables): Configuration => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        public: path.resolve(__dirname, 'public'),
    }

    return buildWebpack({
        mode: mode ?? 'development',
        port: port ?? 5000,
        paths
    })
}