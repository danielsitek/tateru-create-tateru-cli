#!/usr/bin/env node

import path from 'node:path';
import { mkdir, readdir, stat, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import readline from 'node:readline/promises';
import { commands } from './cli/cli';

const renameFiles: Record<string, string | undefined> = {
    _gitignore: '.gitignore',
};

const getTemplatePath = (template: string) => {
    return path.resolve(__dirname, '..', 'templates', `template-${template}`);
};

const getDestinationPath = (directory: string) => {
    return path.resolve(process.cwd(), directory);
};

const validateInputs = (template: string, directory: string) => {
    if (!template) {
        throw new Error('Error: Template name is required.');
    }
    if (!directory) {
        throw new Error('Error: Destination directory is required.');
    }
};

const ensureDirectoryEmpty = async (directory: string) => {
    if (existsSync(directory)) {
        const files = await readdir(directory);
        if (files.length > 0) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            const answer = await rl.question(
                `Warning: Destination directory "${directory}" is not empty. Do you want to continue? (y/N): `,
            );
            rl.close();

            if (answer.toLowerCase() !== 'y') {
                throw new Error('Operation aborted.');
            }
        }
    } else {
        await mkdir(directory, { recursive: true });
    }
};

const copyTemplateFiltered = async (src: string, dest: string) => {
    const stats = await stat(src);

    if (stats.isDirectory()) {
        await mkdir(dest, { recursive: true });
        const entries = await readdir(src);

        for (const entry of entries) {
            const srcPath = path.join(src, entry);
            const destPath = path.join(dest, renameFiles[entry] || entry);
            await copyTemplateFiltered(srcPath, destPath);
        }
    } else {
        await copyFile(src, dest);
    }
};

const copyTemplate = async (templatePath: string, destinationPath: string) => {
    try {
        await copyTemplateFiltered(templatePath, destinationPath);
    } catch (error) {
        throw new Error(
            [
                'Error copying template:',
                (error as unknown as Error).message,
            ].toString(),
        );
    }
};

const beginMessage = (template: string, directory: string) => {
    return `
Copying template "${template}" to destination "${directory}"...
`;
};

const doneMessage = (directory: string) => {
    return `
Done. Template successfully copied. Now run:

cd ${directory}
npm install
npm run dev
`;
};

const init = async () => {
    try {
        const result = await commands(path.resolve(__dirname, '..'));

        if (!result) {
            process.exit(0);
            return;
        }

        const { template, directory } = result;

        validateInputs(template, directory);

        console.log(beginMessage(template, directory));

        const templatePath = getTemplatePath(template);
        const destinationPath = getDestinationPath(directory);

        if (!existsSync(templatePath)) {
            throw new Error(`Error: Template "${template}" not found.`);
        }

        await ensureDirectoryEmpty(destinationPath);

        await copyTemplate(templatePath, destinationPath);

        console.log(doneMessage(directory));
    } catch (error) {
        console.error('Unexpected error:', (error as unknown as Error).message);
        process.exit(1);
    }
};

init();
