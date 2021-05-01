import { IncomingMessage } from 'http';
import { parse } from 'url';
import { Pattern, ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { fontSize, pattern, md, overlay } = (query || {});

    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(pattern)) {
        throw new Error('Expected a single pattern');
    }
    if (Array.isArray(overlay)) {
        throw new Error('Expected a single overlay');
    }
    
    
    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop() as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        pattern: ['none', 'cross', 'polka'].includes(pattern || 'cross') ? pattern as Pattern : 'cross',
        md: md === '1' || md === 'true',
        fontSize: fontSize || '96px',
        overlay: decodeURIComponent(overlay || encodeURIComponent('https://og-image.eyemono.moe/OGP_overlay.png'))
    };
    return parsedRequest;
}
