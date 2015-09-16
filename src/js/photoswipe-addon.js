var PhotoSwipeAddon = function (c_opts) {
    'use strict';

    var that = this,
        _thumbs = '';

    that.options = {
        el: '',
        thumbnails: true,
        wrap: 'pswp-addon',
        item: 'a',
        items: [],
        animateZoom: true,
        pswp_settings: {}
    };

    if (c_opts !== null) {
        $.extend(that.options, c_opts);
    }

    that.init = function () {
        that.pswpElement = document.querySelectorAll('.pswp')[0];
        that.getItems();
        that.makePswpSettings();
        that.makeThumbs();
        that.openPSWP();
        that.bindThumbsEvents();
        that.setActiveThumb();
    };

    that.getItems = function () {
        if (that.options.items.length === 0) {
            that.options.el.closest(that.options.wrap).find(that.options.item).each(function (i, v) {
                var obj = $(this),
                    obj_data = {
                        src: obj.attr('href'),
                        msrc: obj.find('img').attr('src'),
                        w: obj.attr('data-w'),
                        h: obj.attr('data-h'),
                        title: obj.attr('title'),
                        pid: i,
                        el: obj
                    };
                that.options.items.push(obj_data);

                if (that.options.thumbnails === true) {
                    var thumb = '<li>' + obj.html() + '</li>';

                    _thumbs += thumb;
                }
            });
        } else {
            //todo
        }
    };

    that.makeThumbs = function () {
        if (that.options.thumbnails === true && _thumbs.length > 0) {
            $('.pswp').addClass('pswp__has-thumbs');
            $('.pswp__thumbs-list').html('').append('<ul>' + _thumbs + '</ul>');
        }
    };

    that.bindThumbsEvents = function () {
        var pswp = $('.pswp');

        if (_thumbs.length > 0) {
            $(document).off('click').on('click', '.pswp__thumbs li', function () {
                var $el = $(this);

                that.pswpGallery.goTo($el.index());
                $el.addClass('pswp__thumb-active').siblings().removeClass('pswp__thumb-active');
            });

            that.pswpGallery.listen('afterChange', function() {
                that.setActiveThumb();
            });

            that.pswpGallery.listen('close', function() {
                $('.pswp').removeClass('pswp__has-thumbs');
            });
        }
    };

    that.setActiveThumb = function () {
        if (_thumbs.length > 0) {
            var $newActive = $('.pswp__thumbs li').eq(that.pswpGallery.getCurrentIndex()),
                scrollPos = 0;

            if(!$newActive.prev().length > 0) {
                scrollPos = $newActive.offset().left + $('.pswp__thumbs').scrollLeft()
            } else {
                scrollPos = $newActive.prev().offset().left + $('.pswp__thumbs').scrollLeft()
            }

            $('.pswp__thumbs').stop(false, false).animate({
                scrollLeft: scrollPos
            }, 300, 'swing');

            $newActive.addClass('pswp__thumb-active').siblings().removeClass('pswp__thumb-active');
        }
    };

    that.makePswpSettings = function () {
        if (that.options.animateZoom) {
            that.pswp_settings_addon = {
                getThumbBoundsFn: function(index) {
                    var thumbnail = that.options.items[index].el[0].getElementsByTagName('img')[0],
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                }
            }
        }
        $.extend(that.options.pswp_settings, that.pswp_settings_addon);
    };

    // that.checkFullscreenMode = function () {
        // var pswp = $('.pswp');

        // document.addEventListener("fullscreenchange", function () {
        //     if(!document.fullscreen) {
        //         that.pswpGallery.updateSize(true);
        //     }
        // }, false);

        // document.addEventListener("mozfullscreenchange", function () {
        //     if(!document.mozFullScreen && $('.pswp').hasClass('pswp--open')) {
        //         that.pswpGallery.updateSize();
        //     }
        // }, false);

        // document.addEventListener("webkitfullscreenchange", function () {
        //     if(!document.webkitIsFullScreen) {
        //         that.pswpGallery.updateSize();
        //     }
        // }, false);

        // document.addEventListener("msfullscreenchange", function () {
        //     if(!document.msFullscreenElement) {
        //         that.pswpGallery.updateSize(true);
        //     }
        // }, false);
    // };

    that.openPSWP = function () {
        that.pswpGallery = new PhotoSwipe(that.pswpElement, PhotoSwipeUI_Default, that.options.items, that.options.pswp_settings);
        that.pswpGallery.init();
    };

    that.init();
};