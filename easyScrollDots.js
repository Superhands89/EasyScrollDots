// custom scroll indicator
~function () {
    let scrollIndi = document.querySelectorAll('.scroll-indicator');
    if (scrollIndi.length) {
        const scrollIndiTemplate = '<div class="scroll-indicator-controller"><span></span></div>';
        document.querySelector('body').lastElementChild.insertAdjacentHTML('afterend', scrollIndiTemplate);
        const scrollIndiController = document.querySelector('.scroll-indicator-controller');
        const scrollIndiElems = Array.prototype.slice.call(scrollIndi);

        scrollIndiElems.forEach(function (e, i) {
            const scrollIndiId = e.getAttribute('id');
            const scrollIndiTitle = e.getAttribute('data-scroll-indicator-title');
            let firstActiveClass = '';

            if (i == 0) {
                firstActiveClass = 'active';
            }
            scrollIndiController.lastElementChild.insertAdjacentHTML('afterend', '<div class="' + firstActiveClass + '" data-indi-controller-id="' + scrollIndiId + '" onclick="scrollIndiClicked(\'' + scrollIndiId + '\');"><span>' + scrollIndiTitle + '</span><div></div></div>');
        });

        const scrollIndiControllerDots = scrollIndiController.querySelectorAll('[data-indi-controller-id]');

        var handleIndiScroll = throttle(function () {
            let indiScrollTopCollection = {};

            scrollIndiElems.forEach(function (e) {
                const scrollIndiIdScroll = e.getAttribute('id');
                const indiScrollTop = e.getBoundingClientRect().top;

                indiScrollTopCollection[scrollIndiIdScroll] = indiScrollTop;
            });

            // const indiOffsetValues = Object.values(indiScrollTopCollection); not supported in ie
            const indiOffsetValues = Object.keys(indiScrollTopCollection).map(function (itm) { return indiScrollTopCollection[itm]; });
            const indiOffsetMin = function () {
                const indiRemoveMinuses = indiOffsetValues.filter(function (x) { return x > -1; });
                return Math.min.apply(null, indiRemoveMinuses);
            }; 
            
            Object.keys(indiScrollTopCollection).forEach(function (e) {
               // console.log("propertyName = " + e + " --- collectionEntry = " + indiScrollTopCollection[e] + " --- minOffset = " + indiOffsetMin());
                if (indiScrollTopCollection[e] == indiOffsetMin()) {
                    Array.prototype.forEach.call(scrollIndiControllerDots, function (el) {
                        if (el.classList.contains('active')) {
                            el.classList.remove('active');
                        }
                    });
                    scrollIndiController.querySelector('[data-indi-controller-id="' + e + '"]').classList.add('active');
                }
            });

        }, 300);

        $(window).on('scroll', handleIndiScroll);
    }
}();

function scrollIndiClicked(indiId) {
    $('html, body').animate({
        scrollTop: $('#' + indiId).offset().top
    }, 700);
    const scrollPos = document.body.getBoundingClientRect().top;

    setTimeout(function () {
        if (document.body.getBoundingClientRect().top > scrollPos && window.matchMedia('(min-width: 768px)').matches) {
            $('html, body').animate({
                scrollTop: $('#' + indiId).offset().top - 108
            }, 400);
        }
    }, 400);
}
