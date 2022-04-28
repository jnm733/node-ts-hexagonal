import got from 'got';

import IHTTPRequest, {
    HTTPBody,
    HTTPMethod,
    HTTPRequestOptions,
} from "@node-ts-hexagonal/shared/modules/shared/domain/http/iHTTPRequest";
import {Readable} from "stream";

export default class GotHTTPRequest implements IHTTPRequest {

    private async request(method: HTTPMethod, url: string, options?: HTTPRequestOptions) {

        return await got(url, this.parseOptions(method, options)).then((response: any) => {
            return {
                code: response.statusCode,
                body: response.body
            }
        });

    }

    private async requestStream(method: HTTPMethod, url: string, options?: HTTPRequestOptions): Promise<Readable> {
        return got.stream(url, this.parseOptions(method, options));
    }

    public async get(url: string, options?: HTTPRequestOptions) {
        return this.request('GET', url, options);
    }

    public async post(url: string, body: HTTPBody, options?: HTTPRequestOptions) {
        if (!options)
            options = {};
        options.body = body;
        return this.request('POST', url, options);
    }

    public async put(url: string, body: HTTPBody, options?: HTTPRequestOptions) {
        if (!options)
            options = {};
        options.body = body;
        return this.request('PUT', url, options);
    }

    public async delete(url: string, options?: HTTPRequestOptions) {
        return this.request('PUT', url, options);
    }

    public async getAsStream(url: string, options?: HTTPRequestOptions) {
        return this.requestStream('GET', url, options);
    }

    public async postAsStream(url: string, body: HTTPBody, options?: HTTPRequestOptions) {
        if (!options)
            options = {};
        options.body = body;
        return this.requestStream('POST', url, options);
    }


    private parseOptions(method: HTTPMethod, options: HTTPRequestOptions | undefined): {[field: string]: string} | undefined  {

        if (options) {
            let gotOptions: any = {};

            gotOptions.method = method;

            if (options.headers)
                gotOptions.headers = options.headers;

            if (options.timeout)
                gotOptions.timeout = { request: options.timeout};

            if (options.retry)
                gotOptions.retry = { limit: options.retry};

            if (options.body) {
                if (typeof options.body == "object")
                    gotOptions.json = options.body;
                else
                    gotOptions.body = options.body;
            }

            if (options.urlParams)
                gotOptions.searchParams = options.urlParams;

            return gotOptions;
        } else {
            return undefined;
        }

    }
}