export function afterStarted(blazor) {
    blazor.registerCustomEventType('notify', {
        createEventArgs: event => {
            let e = {
                data: globalData
            }
            return e;
        }
    });
}