"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clickTimeDate = () => {
    const clickTimestamp = new Date();
    const hours = clickTimestamp.getHours();
    const tempMin = clickTimestamp.getMinutes();
    const minutes = tempMin < 10 ? `0${tempMin}` : tempMin;
    const clickTime = `${hours}:${minutes}`;
    const days = clickTimestamp.getDate();
    const months = 1 + clickTimestamp.getMonth();
    const years = clickTimestamp.getFullYear();
    const clickDate = `${days}/${months}/${years}`;
    return {
        clickTime,
        clickDate,
    };
};
exports.default = clickTimeDate;
