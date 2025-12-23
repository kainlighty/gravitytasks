import { dateTime } from "@gravity-ui/date-utils";

export const getDateNow = () => {
    return dateTime().format("DD.MM.YYYY");
};
export const getTimeNow = () => {
    return dateTime().format("HH:mm:ss");
};
export const getDateTimeNow = () => {
    return dateTime().format("DD.MM.YYYY HH:mm:ss");
};