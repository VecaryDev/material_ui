
export const addSelfDestructingEventListener = (element, eventType, callback) => {
    let handler = (e) => {
        callback(e);
        element.removeEventListener(eventType, handler);
    };
    element.addEventListener(eventType, handler);
};