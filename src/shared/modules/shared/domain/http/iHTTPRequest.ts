import {Readable} from "stream";

export type HTTPMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE';

export type HTTPBody = string | Buffer | object;

export type HTTPRequestOptions = {
    headers?: {[field: string]: string},
    timeout?: number,
    retry?: number,
    body?: HTTPBody,
    urlParams?: string | URLSearchParams | {[field: string]: string | number},
}

export type HTTPResponse = {
    code: number,
    body: string,
}

export default interface IHTTPRequest {

    get(url: string, options?: HTTPRequestOptions): Promise<HTTPResponse>,
    post(url: string, body: HTTPBody, options?: HTTPRequestOptions): Promise<HTTPResponse>,
    put(url: string, body: HTTPBody, options?: HTTPRequestOptions): Promise<HTTPResponse>,
    delete(url: string, options?: HTTPRequestOptions): Promise<HTTPResponse>,
    getAsStream(url: string, options?: HTTPRequestOptions): Promise<Readable>,
    postAsStream(url: string, body: HTTPBody, options?: HTTPRequestOptions): Promise<Readable>,

}