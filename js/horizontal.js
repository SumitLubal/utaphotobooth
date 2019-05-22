jQuery(function ($) {
    'use strict';
    (function () {
        var effectsArray = [];
        // first load our list
        for (var effect in config.enabled_effects) {
            // add effect to list
            var node = document.createElement("li");
            var textnode = document.createTextNode("" + config.enabled_effects[effect]);
            effectsArray.push(""+config.enabled_effects[effect]);
            node.appendChild(textnode);
            document.getElementById("effectlist").appendChild(node);
        }
        var $frame = $('#forcecentered');
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'forceCentered',
            smart: 1,
            activateMiddle: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1
        });
        $('#forcecentered').sly('on', 'active', function (eventName, itemIndex) {
            console.log(effectsArray[itemIndex]); // 'load
            fc.setEffect(effectsArray[itemIndex]);
        });

    }());
});