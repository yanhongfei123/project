(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
              if (clientWidth > 750) clientWidth = 750;
           docEl.style.fontSize = 20*(clientWidth /320) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

     //  if (clientWidth > 750) clientWidth = 750;
       //     docEl.style.fontSize = clientWidth /3.75 + 'px';