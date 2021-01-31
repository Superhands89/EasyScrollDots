/* Easy Scroll Dots 1.1.5 --- https://github.com/Superhands89/EasyScrollDots
* Quickly add anchor points throughout your web page/application and have navigational dots automatically appear
* in a fixed position on the side of the page. This allows the user to click to scroll though sections of the page,
* and it updates as they scroll.
*
* By Superhands89 2019-2021 --- https://github.com/Superhands89/
*
* GPLv3 Licence for open source use only
* or purchase a Single Commercial License at https://gum.co/TdtEX
* or purchase an Extended Commercial License at https://gum.co/NGfmlw
*/

// a throttle function
function dotsThrottle(func, wait, options) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    if (!options) options = {};
    const later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        const now = Date.now();
        if (!previous && options.leading === false) previous = now;
        const remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

// global fixed nav options
let dotFixedNavPresent = false;
let dotFixedNavId = '';
let dotFixedNavUp = false;
let dotOffset = 0;

// scroll indicator controller
function easyScrollDots(dotfixedOptions) {
    let scrollIndi = document.querySelectorAll('.scroll-indicator');
    dotfixedOptions.fixedNav === true ? dotFixedNavPresent = true : dotFixedNavPresent;
    dotfixedOptions.fixedNavId === '' ? dotFixedNavId = false : dotFixedNavId = dotfixedOptions.fixedNavId;
    dotfixedOptions.fixedNavUpward === true ? dotFixedNavUp = true : dotFixedNavUp;
    dotfixedOptions.offset > 0 ? dotOffset = dotfixedOptions.offset : dotOffset;

    if (scrollIndi.length) {
        const scrollIndiTemplate = '<div class="scroll-indicator-controller"><span></span></div>';
        document.querySelector('body').lastElementChild.insertAdjacentHTML('afterend', scrollIndiTemplate);
        const scrollIndiController = document.querySelector('.scroll-indicator-controller');
        if ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)) { scrollIndiController.classList.add('indi-mobile'); }
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

        const handleIndiScroll = dotsThrottle(function () {
            let indiScrollTopCollection = {};

            scrollIndiElems.forEach(function (e) {
                const scrollIndiIdScroll = e.getAttribute('id');
                const indiScrollTop = e.getBoundingClientRect().top;

                indiScrollTopCollection[scrollIndiIdScroll] = indiScrollTop;
            });

            // const indiOffsetValues = Object.values(indiScrollTopCollection); not supported in IE
            const indiOffsetValues = Object.keys(indiScrollTopCollection).map(function (itm) { return indiScrollTopCollection[itm]; });
            const indiOffsetMin = function () {
                const indiRemoveMinuses = indiOffsetValues.filter(function (x) { return x > -150; });

                return Math.min.apply(null, indiRemoveMinuses);
            }; 

            Object.keys(indiScrollTopCollection).forEach(function (e) {
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

      window.addEventListener('scroll', handleIndiScroll);
    }
};
    
function scrollIndiClicked(indiId) {
    if (window.jQuery) {
        // if jquery is availble then we can use jquery animations
        const dotDocumentHtml = $('html, body');
        if (dotFixedNavPresent === true && dotFixedNavId.length) {
            // there is a fixed nav and its id has been defined
            const dotNavHeightElem = document.getElementById(dotFixedNavId);
            const dotNavHeight = dotNavHeightElem.clientHeight;
            const indiElement = $('#' + indiId);
    
            if (dotFixedNavUp === true) {
                // fix nav on upward scroll only
                dotDocumentHtml.animate({
                    scrollTop: indiElement.offset().top - dotOffset
                }, 700);
                const scrollPos = document.body.getBoundingClientRect().top;
                setTimeout(function () {
                    if (document.body.getBoundingClientRect().top > scrollPos) {
                        dotDocumentHtml.animate({
                            scrollTop: indiElement.offset().top - dotNavHeight - dotOffset
                        }, 400);
                    }
                }, 400);
            }
            else {
                // fixed nav scroll
                dotDocumentHtml.animate({
                    scrollTop: indiElement.offset().top - dotNavHeight - dotOffset
                }, 700);
            }
        }
        else {
            // normal scroll
            dotDocumentHtml.animate({
                scrollTop: $('#' + indiId).offset().top - dotOffset
            }, 700);
        }    
    }
    else {
        // there is no jquery so we use vanilla scroll animations
        if (dotFixedNavPresent === true && dotFixedNavId.length) {
            // there is a fixed nav and its id has been defined
            const dotNavHeightElem = document.getElementById(dotFixedNavId);
            const dotNavHeight = dotNavHeightElem.clientHeight;
            const indiElement = document.getElementById(indiId);
    
            if (dotFixedNavUp === true) {
                // fix nav on upward scroll only
                window.scrollTo({
                    top: indiElement.offsetTop - dotOffset,
                    left: 0,
                    behavior: 'smooth'
                });
                const scrollPos = document.body.getBoundingClientRect().top;
                setTimeout(function () {
                    if (document.body.getBoundingClientRect().top > scrollPos) {
                        window.scrollTo({
                            top: indiElement.offsetTop - dotNavHeight - dotOffset,
                            left: 0,
                            behavior: 'smooth'
                        });
                    }
                }, 400);
            }
            else {
                // fixed nav scroll
                window.scrollTo({
                    top: indiElement.offsetTop - dotNavHeight - dotOffset,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
        else {
            // normal scroll
            window.scrollTo({
                top: document.getElementById(indiId).offsetTop - dotOffset,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
};
