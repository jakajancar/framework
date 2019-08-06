/**
 * Represents an HTTP request method.
 *
 * @export
 * @enum {string}
 */
export enum Method {

    // The GET method requests a representation of the specified resource.
    // Requests using GET should only retrieve data.
    Get = 'GET',
    // The HEAD method asks for a response identical to that of a GET request,
    // but without the response body.
    Head = 'HEAD',
    // The POST method is used to submit an entity to the specified resource,
    // often causing a change in state or side effects on the server.
    Post = 'POST',
    // The PUT method replaces all current representations of the target resource
    // with the request payload.
    Put = 'PUT',
    // The DELETE method deletes the specified resource.
    Delete = 'DELETE',
    // The CONNECT method establishes a tunnel to the server identified by
    // the target resource.
    Connect = 'CONNECT',
    // The OPTIONS method is used to describe the communication options
    // for the target resource.
    Options = 'OPTIONS',
    // The TRACE method performs a message loop-back test along the path
    // to the target resource.
    Trace = 'TRACE',
    // The PATCH method is used to apply partial modifications to a resource.
    Patch = 'PATCH'

}

/**
 * Represents an HTTP request.
 *
 * @export
 * @class HTTPRequest
 */
export class HTTPRequest {

    /**
     * Represents the request HTTP version.
     *
     * @protected
     * @type {number}
     * @memberof HTTPRequest
     */
    protected version: number

    /**
     * Represents the request method.
     *
     * @protected
     * @type {Method}
     * @memberof HTTPRequest
     */
    protected http_method: Method

    /**
     * Represents the request URL.
     *
     * @protected
     * @type {URL}
     * @memberof HTTPRequest
     */
    protected url: URL

    /**
     * Represents the request headers.
     *
     * @protected
     * @type {Header}
     * @memberof HTTPRequest
     */
    protected headers: Headers

    /**
     * Represents the request body.
     *
     * @protected
     * @type {Uint8Array}
     * @memberof HTTPRequest
     */
    protected body: Uint8Array

    /**
     * Input parameters.
     *
     * @protected
     * @type {object}
     * @memberof HTTPRequest
     */
    protected input_params: object = {}

    /**
     * Query parameters.
     *
     * @protected
     * @type {object}
     * @memberof HTTPRequest
     */
    protected query_params: object = {}

    /**
     * Creates an instance of HTTPRequest.
     *
     * @param {Method} method
     * @param {string} URI
     * @param {Uint8Array} [body]
     * @param {Headers} [headers]
     * @param {number} [version=1.1]
     * @memberof HTTPRequest
     */
    constructor(
        method: Method,
        url: URL,
        body: Uint8Array = new Uint8Array,
        headers: Headers = new Headers,
        version: number = 1.1
    ) {
        this.http_method = method
        this.url = url
        this.body = body
        this.headers = headers
        this.version = version
    }

    /**
     * Determine if the request is sending JSON.
     *
     * @returns {boolean}
     * @memberof HTTPRequest
     */
    isJson(): boolean {
        const header = this.header('Content-Type')[0]
        return header.includes('application/json')
            || header.includes('application/ld+json')
    }

    /**
     * Determine if the current request accepts any content type.
     *
     * @returns {boolean}
     * @memberof HTTPRequest
     */
    acceptsAnyContentType(): boolean {
        return this.accept('*/*', true)
            || this.accept('*' , true)
    }

    /**
     * Determines whether a request accepts JSON.
     *
     * @returns {boolean}
     * @memberof HTTPResponse
     */
    acceptsJson(): boolean {
        return this.accept('application/json')
            || this.accept('application/ld+json')
    }

    /**
     * Determines whether a request accepts HTML.
     *
     * @returns {boolean}
     * @memberof HTTPRequest
     */
    acceptsHtml(): boolean {
        return this.accept('text/html')
    }

    /**
     * Returns true if the request accepts a given mime type.
     *
     * @param {string} type
     * @param {boolean} [strict=false]
     * @returns {boolean}
     * @memberof HTTPRequest
     */
    accept(type: string, strict: boolean = false): boolean {
        const header = this.header('Accept')[0]
        if (strict) {
            return header.includes(type)
        }
        return header.includes(type)
            || header.includes('*/*')
            || header.includes('*')
    }

    /**
     * Determine if a header is set on the request.
     *
     * @param {string} key
     * @returns {boolean}
     * @memberof HTTPResponse
     */
    hasHeader(key: string): boolean {
        return this.headers.has(key)
    }

    /**
     * Retrieve a header from the request.
     *
     * @param {string} [key]
     * @param {string} [def]
     * @returns {string[]}
     * @memberof HTTPResponse
     */
    header(key?: string, def?: string[]): string[] {
        if (!key) {
            const result: string[] = []
            for (const h of this.headers) {
                result.push(h[0])
            }
            return result
        }
        const header = this.headers.get(key)
        if (!header) {
            // Will be changed to a null coalescing operator when available.
            return def ? def : ['']
        }
        return [header]
    }

    /**
     * Returns the HTTP methods used in the request.
     *
     * @returns {Method}
     * @memberof HTTPRequest
     */
    method(): Method {
        return this.http_method
    }

    /**
     * Returns the
     *
     * @returns {string}
     * @memberof HTTPRequest
     */
    path(): string {
        return this.url.pathname
    }

}

/**
 * Parameters.
 *
 * @export
 * @interface Parameters
 */
export interface Parameters {
    [key: string]: string
}

/**
 * A request is represented by an HTTPRequest class.
 *
 * @export
 * @type {Request}
 */
export interface Request {
    request: HTTPRequest
    params: Parameters
}
