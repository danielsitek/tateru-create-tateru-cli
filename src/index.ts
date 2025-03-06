#!/usr/bin/env node

import path from 'node:path';
import { commands } from './cli/cli';

try {
    const { template, directory } = commands(path.resolve(__dirname, '..'));

    console.log('Template:', template);
    console.log('Directory:', directory);
} catch (error) {
    console.error(error);
    process.exit(1);
}
