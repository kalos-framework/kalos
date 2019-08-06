export function trimslashes(s) {
    if (s.length > 1 && s.indexOf('/', s.length - 1 - '/'.length) !== -1) {
        s = s.substr(0, s.length - 1);
    }
    return s;
}
