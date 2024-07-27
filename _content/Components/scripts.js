export let activeCalendar = null;

window.handlekeyDown = function (e, id) {
    if (e.key === "ArrowDown") activate(id);
    else if (e.key === "Enter") {
        preventDefault();
        return;
    }
}

//window.moveElements = function (n) {
//    const p = document.activeElement.parentElement.childNodes;
//    for (let i = 0; i < p.length; i++) {
//        if (p[i] == document.activeElement) {            
//            p[i + n]?.focus();
//            break;
//        }
//    }
//}

window.activate = function (e) {
    if (activeCalendar != null && activeCalendar != e) deactivate(activeCalendar);
    activeCalendar = e;    
    document.querySelector('#dp' + e).classList.add('show');
    updatePosition('#' + e, '#dp' + e);
    document.querySelector(`#dp${e} .today`)?.focus();
    document.querySelector(`#dp${e} .selected`)?.focus();
}

window.deactivate = function (e) {    
    if (activeCalendar == null) return;
    document.querySelector('#dp' + e)?.classList.remove('show');
}

export const updatePosition = function (p, e) {
    document.querySelector(p).classList.add("show");
    const parent = document.querySelector(p).getBoundingClientRect();    
    const element = document.querySelector(e);    
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    //const top = parent.y + parent.height;
    const left = parent.x;

    const toBottom = parent.bottom;
    const toTop = wh - parent.top + 4;    
    //alert(parent.Top + "+" + parent.Bottom);
    const top = toBottom < toTop ? toBottom : toTop;
    if (toBottom < toTop) {
        element.style.top = toBottom + "px";
        element.style.bottom = "unset";
    }
    else {
        element.style.bottom = toTop + "px";
        element.style.top = "unset";
    }
    //console.log(toBottom, toTop, top);

    //if (top + element.clientHeight < wh) {
    //    element.style.bottom = "unset";
    //    element.style.top = top + "px";
    //}
    //else {
    //    element.style.top = "unset";
    //    element.style.bottom = (wh - parent.top + 4) + "px";
    //}
    if (left + element.clientWidth < ww) {
        element.style.right = "unset";
        element.style.left = left + "px";
    }
    else {
        element.style.left = "unset";
        element.style.right = ww - (parent.left + parent.width) + "px";
    }
}

window.addEventListener("scroll", () => resetSearchBox());
window.addEventListener("resize", () => resetSearchBox());

window.addEventListener("click", e => {
    if (document.activeElement.parentElement.className.indexOf('sbc-date-picker') == -1)
        deactivate(activeCalendar);
})


function resetSearchBox() {    
    const searchBox = document.querySelector(".search-box")
    if (searchBox !== null) searchBox.parentElement.style.visibility = "collapse"
    const menuItems = document.querySelectorAll(".sbc-menu-items");
    menuItems?.forEach(m => m.classList.remove('show'));
}