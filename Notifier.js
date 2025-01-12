const channel = new BroadcastChannel("customNotifier");
let globalData = "";

function notifyMessage(data) {
    console.log("Message send: " + data);
    channel.postMessage(data);
}

channel.onmessage = function (event) {
    console.log("Message received: " + event.data);
    getMessage(event.data);
}

function getMessage(data) {
    const div = document.getElementById("mydiv");
    globalData = data;
    let e = new CustomEvent("notify", {
        bubbles: true,
        detail: { data: () => globalData }
    });
    div.dispatchEvent(e);
}