#!/usr/bin/env node

import http from 'node:http';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import testDelay from './test_delay.mjs';

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            const filePath = join(__dirname, 'index.html');
            createReadStream(filePath, 'utf8').pipe(res);
        }
        if (req.url === '/test_delay.mjs') {
            const filePath = join(__dirname, 'test_delay.mjs');
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            createReadStream(filePath, 'utf8').pipe(res);
        }
    }
    if (req.method === 'POST') {
        let data;
        req.on('data', chunk => { data += chunk });
        req.on('end', async () => {
            const { range, findNumber } = JSON.parse(data.slice(9));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            const calculatedDelay = await testDelay(range, findNumber);
            res.end(JSON.stringify(calculatedDelay));
        });
    }
});

server.listen(3000, 'localhost', () => {
    console.log('server running on http://localhost:3000'); });