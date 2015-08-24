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
        pswp_settings: {}
    };

    if (c_opts !== null) {
        $.extend(that.options, c_opts);
    }

    that.init = function () {
        that.pswpElement = document.querySelectorAll('.pswp')[0];
        that.getItems();
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
                        w: obj.attr('data-w'),
                        h: obj.attr('data-h'),
                        pid: i
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
        if (_thumbs.length > 0) {
            $('.pswp').addClass('pswp__has-thumbs');
            $('.pswp__thumbs-list').html('').append('<ul>' + _thumbs + '</ul>');
        }
    };

    that.bindThumbsEvents = function () {
        if (_thumbs.length > 0) {
            $(document).off('click').on('click', '.pswp__thumbs li', function () {
                var $el = $(this);

                that.pswpGallery.goTo($el.index());
                $el.addClass('pswp__thumb-active').siblings().removeClass('pswp__thumb-active');
            });

            that.pswpGallery.listen('afterChange', function() {
                that.setActiveThumb();    
            });
        }     
    };

    that.setActiveThumb = function () {
        if (_thumbs.length > 0) {
            var $newActive = $('.pswp__thumbs li').eq(that.pswpGallery.getCurrentIndex()),
                scrollPos = $newActive.offset().left + $('.pswp__thumbs').scrollLeft() - 20;

            $('.pswp__thumbs').stop(false, false).animate({
                scrollLeft: scrollPos
            }, 300, 'swing');

            $newActive.addClass('pswp__thumb-active').siblings().removeClass('pswp__thumb-active');   
        }
    };

    that.openPSWP = function () {
        that.pswpGallery = new PhotoSwipe(that.pswpElement, PhotoSwipeUI_Default, that.options.items, that.options.pswp_settings);
        that.pswpGallery.init();
    };

    that.init();
};