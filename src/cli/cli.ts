import { readFileSync } from 'node:fs';
import path from 'node:path';

interface CommandsOptions {
    template: string;
    directory: string;
}

const DEFAULT_TEMPLATE_NAME = 'default';
const DEFAULT_DIRECTORY = '.';

const HELP_MESSAGE = `
Create a new Tateru CLI project with ease.

Usage:
  npx create-tateru-cli [OPTIONS] [ARGS] [DIRECTORY]

Options:
  -t, --template NAME       Set build environment (dev or prod). Default is dev.
  -h, --help                Display help and usage details.
  -v, --version             Display Tateru CLI version.

Available templates:
  default                   Default template with basic setup.
`;

/**
 * Prints the help message.
 */
function printHelp() {
    console.log(HELP_MESSAGE);
}

/**
 * Parses command-line arguments and returns options.
 * If --help or --version is provided, it prints output and exits the process.
 *
 * @param basePath The base path of the project. Used to locale package.json file.
 */
export function commands(basePath: string): CommandsOptions {
    const args = process.argv.slice(2);
    const options: CommandsOptions = {
        template: DEFAULT_TEMPLATE_NAME,
        directory: DEFAULT_DIRECTORY,
    };

    // Get package.json data
    const packageJsonPath = path.resolve(basePath, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        switch (arg) {
            case '--help':
            case '-h':
                printHelp();
                process.exit(0);
                break;

            case '--version':
            case '-V':
                console.log(packageJson.version);
                process.exit(0);
                break;

            case '--template':
            case '-t':
                if (args[i + 1] && !args[i + 1].startsWith('-')) {
                    options.template = args[i + 1] || DEFAULT_TEMPLATE_NAME;
                    i++;
                } else {
                    console.error('Error: Missing value for --template.');
                    process.exit(1);
                }
                break;

            default:
                if (arg.startsWith('-')) {
                    console.error(`Error: Unknown option "${arg}"\n`);
                    console.log(
                        `Run "npx create-tateru-cli --help" to see available options.\n`,
                    );

                    process.exit(1);
                }

                if (!arg.startsWith('-')) {
                    options.directory = arg;
                }
                break;
        }
    }

    return options;
}
