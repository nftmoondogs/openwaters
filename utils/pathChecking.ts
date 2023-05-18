export default function pathChecking(path: string, match: string) {
    if (path && match) {
        if (path === match) {
            return true;
        }
        return false;
    }
    return false;
}
