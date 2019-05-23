jQuery(function ($) {
    'use strict';
    (function () {
        var effectsArray = [];
        // first load our list
        for (var sticker in config.enabled_effects) {
            // add effect to list
            var node = document.createElement("li");
            var textnode = document.createTextNode("" + config.enabled_effects[sticker]);
            effectsArray.push("" + config.enabled_effects[sticker]);
            node.appendChild(textnode);
            document.getElementById("effectlist").appendChild(node);
        }
        var $frame = $('#effects_row');
        var $wrap = $frame.parent();

        // Call Sly on frame
        var onSlyLoad = function (eventName) {
            console.log(eventName);
            $('#collapsableFilters').addClass('collapse');
        }
        var onSlyActive = function (eventName, itemIndex) {
            console.log(effectsArray[itemIndex]); // 'load
            fc.setEffect(effectsArray[itemIndex]);
        }
        $frame.sly(
            {
                horizontal: 1,
                itemNav: 'forceCentered',
                smart: 1,
                activateMiddle: 1,
                activateOn: 'click',
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: 0,
                speed: 300,
                elasticBounds: 1,
                easing: 'easeOutExpo',
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1
            }, {
                load: onSlyLoad,
                active: onSlyActive
            });

        // stickers row

        var stickersArray = [];
        // first load our list
        for (var stickerInd in config.stickers) {
            // add effect to list
            var sticker = config.stickers[stickerInd];
            var node = document.createElement("li");
            var textnode = document.createTextNode("" + sticker.name);
            stickersArray.push(sticker);
            node.appendChild(textnode);
            document.getElementById("stickerslist").appendChild(node);
        }
        var $frame1 = $('#stickers_row');
        var $wrap1 = $frame.parent();

        // Call Sly on frame
        var onSlyLoad1 = function (eventName) {
            console.log(eventName);
            $('#collapsableStickers').addClass('collapse');
        }
        var onSlyActive1 = function (eventName, itemIndex) {
            console.log(stickersArray[itemIndex]);
            fc.setSticker(stickersArray[itemIndex]);
        }
        $frame1.sly({
            horizontal: 1,
            itemNav: 'forceCentered',
            smart: 1,
            activateMiddle: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1
        }, {
                load: onSlyLoad1,
                active: onSlyActive1
            });

    }());
});