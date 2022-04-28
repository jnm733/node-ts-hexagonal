export default interface ILogger {
    debug(message: string): void;
    error(message: string | Error): void;
    info(message: string): void;
}
