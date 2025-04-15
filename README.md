# Create Tateru CLI project

[![NPM Version](https://img.shields.io/npm/v/create-tateru-cli)](https://www.npmjs.com/package/create-tateru-cli)
[![GitHub Release](https://img.shields.io/github/v/release/danielsitek/tateru-create-tateru-cli)](https://github.com/danielsitek/tateru-create-tateru-cli/releases)

Simplest way to create a new project using [tateru-cli](https://github.com/danielsitek/tateru-cli).

## Usage

```sh
npm create tateru-cli@latest
```

You can also specify project name and template via additional command line options.

```sh
npm create tateru-cli@latest -- --template gulp-vanilla
```

```sh
npm create tateru-cli@latest -- --template gulp-vanilla project-name
```

You can use `.` for the name of the project to be created in the current directory.

Currently supported templates include:

-   `gulp-vanilla`

## Notes

-   If the destination directory is not empty, the script will exit with an error.
-   Ensure the template name is valid; otherwise, the script will notify you.
