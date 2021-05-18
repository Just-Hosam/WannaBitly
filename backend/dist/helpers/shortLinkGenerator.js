"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shortLinkGenerator = () => {
    let randomStr = 'http://localhost:8080/';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        randomStr += chars[randomIndex];
    }
    return randomStr;
};
exports.default = shortLinkGenerator;
