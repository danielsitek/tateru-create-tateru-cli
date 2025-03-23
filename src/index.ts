#!/usr/bin/env node

import path from 'node:path';
import { cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { commands } from './cli/cli';

const getTemplatePath = (template: string) => {
    return path.resolve(__dirname, '..', 'templates', `template-${template}`);
};

const getTargetPath = (directory: string) => {
    return path.resolve(process.cwd(), directory);
};

const init = async () => {
    try {
        const result = await commands(path.resolve(__dirname, '..'));

        if (!result) {
            process.exit(0);
            return;
        }

        const { template, directory } = result;

        const templatePath = getTemplatePath(template);
        const targetPath = getTargetPath(directory);

        if (!existsSync(templatePath)) {
            console.error(`Error: Template "${template}" not found.`);
            process.exit(1);
        }

        console.log('Template:', template);
        console.log('Directory:', directory);
        console.log('Template Path:', templatePath);
        console.log('Target Path:', targetPath);

        await cp(templatePath, targetPath, { recursive: true });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

init();
