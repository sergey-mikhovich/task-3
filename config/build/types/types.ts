import {Configuration} from "webpack";

export interface BuildPaths {
    entry: string
    html: string
    output: string
    src: string,
    public: string
}

export interface BuildOptions {
    port: number
    paths: BuildPaths
    mode: Configuration['mode'],
    analyzer?: boolean
}