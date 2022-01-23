const moment = require('moment');

export function getBoolean(value:any): boolean {
    switch(value){
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default:
            return false;
    }
}

export function urlTitle(value: string): string {
    return value
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        .replace(/(\-){2,}/g,'-');
}

export function dateToTimestamp(date: any ): number {
    try {
        return moment(date).utc('UTC').unix();
    } catch (e) {
        return 0;
    }
}

export function timestampToDate(timestamp: any ): string {
    try {
        return moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss");
    } catch (e) {
        return "";
    }
}

export function dateParser(input: string, inputFormat: string, outputFormat: string='YYYY-MM-DD HH:mm:ss'): string | undefined {
    try {
        return moment(input, inputFormat).utc('UTC').format(outputFormat);
    } catch (e) {
        return undefined;
    }
}

export function ucFirst(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}