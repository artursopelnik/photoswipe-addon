(function($) {
    "use strict";

    var currentDoc = $(document),
        currentWindow = $(window);

    // DOM ready
    currentDoc.ready(function() {
        $('.gallery > a').on('click', function(e) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                items = [],
                thumbs = '',
                currentSliderPic = $(this).eq(),
                pswpGallery,
                photoswipe_opts;


            photoswipe_opts = {
                index: currentSliderPic,
                closeOnScroll: false,
                shareEl: false
            };

            $('.gallery > a').each(function() {
                var obj = $(this),
                    thumb = '<li>' + $(this).html() + '</li>',
                    el = {
                        originalImage: {
                            src: obj.attr('href'),
                            w: obj.attr('data-l-w'),
                            h: obj.attr('data-l-h')
                        }
                    };
                thumbs += thumb;
                items.push(el);
            });

            var video = {
                html: '<div class="pswp__yt-wrap"><div class="pswp__yt-cell"><div class="pswp__yt-elm"><h1>Fuck</h1></div></div></div>'
            };

            // items.push(video);

            $('.pswp__thumbs').append('<ul>' + thumbs + '</ul>');

            console.log(items);

            pswpGallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, photoswipe_opts);
            var realViewportWidth,
                useLargeImages = false,
                firstResize = true,
                imageSrcWillChange;

            pswpGallery.listen('gettingData', function(index, item) {
                if (item.originalImage) {
                    item.src = item.originalImage.src;
                    item.w = item.originalImage.w;
                    item.h = item.originalImage.h;
                }
            });

            pswpGallery.init();

            $(document).on('click', '.pswp__thumbs li', function () {
                pswpGallery.goTo($(this).index());
                $(this).addClass('active').siblings().removeClass('active');
            });

            pswpGallery.listen('afterChange', function() {
                $('.pswp__thumbs li').eq(pswpGallery.getCurrentIndex()).addClass('active').siblings().removeClass('active');
            });

            e.preventDefault();
        });
    });

    // recall functions after resize
    // currentWindow.on('resize', Foundation.utils.throttle(function () {

    // }, 400));
})(jQuery);