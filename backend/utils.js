// We need require to properly import some of these
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const axios = require('axios');
// Env variables
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
require('dotenv').config({ path: (__dirname + '\\.env')});

export async function translateUsingDeepl(text) {
    let params  = new URLSearchParams([['auth_key', process.env.DEEPL_API_KEY], ['text', text], ['target_lang', 'en-GB'], ['source_lang', 'zh']])
    console.log(process.env.DEEPL_API_KEY)
    let data = (await axios.get('https://api-free.deepl.com/v2/translate', { params })).data;

    return data.translations[0].text; // Assuming it's all sent in one big block
}