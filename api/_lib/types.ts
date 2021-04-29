export type FileType = 'png' | 'jpeg';
export type Pattern = 'cross' | 'polka';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    pattern: Pattern;
    md: boolean;
    fontSize: string;
}
