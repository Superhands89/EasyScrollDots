<h1 align="center">Easy Scroll Dots :</h1>
<h2 align="center">Single page scroll JavaScript plugin</h2>
<p align="center"><strong>Quickly add anchor points throughout your web page/application and have vertical navigational dots automatically appear in a fixed position on the side of the page. This allows the user to click to scroll though sections of the page, and it updates as they scroll.</strong></p>
<p align="center"><em>Unlike some other plugins, Easy Scroll Dots does NOT require your web site or application to have a full page or full width slide design. Simply add your anchor points to any sections within your HTML and Easy Scroll Dots will do the rest.</em></p>
<p align="center"><img src="https://i.ibb.co/f4xMbHx/easy-Scroll-Dots-representation.jpg" alt="Easy Scroll Dots Representation" /></p>

# Browser/OS Support

<ul>
  <li><strong>Windows/Mac:</strong> Chrome &#10004; IE 11 &#10004; FF &#10004; Edge &#10004; Opera &#10004;</li>
  <li><strong>Android/IOS:</strong> Chrome &#10004; FF &#10004; Safari &#10004;</li>
</ul>
<p><em>Note: Easy Scroll Dots is vanilla and has no dependencies in order to work on latest Edge, Chrome, Firefox and Safari. However, jQuery is recommended if you need consistant and smooth animations on Old Edge.</em></p> 

# Installation

## Including Files

<p>Download the lastest release and find the files in the dist folder.</p>

```html
<!-- CSS for Easy Scroll Dots -->
<link rel="stylesheet" type="text/css" href="easyScrollDots.min.css" />

<!-- JS for Easy Scroll Dots -->
<script type="text/javascript" src="easyScrollDots.min.js"></script>
```

<p>Reference the CSS file within your head tag, and reference the JS file before the closing body tag. Update the paths depending on where you add the files within your project.</p>

## Usage

### Initialise

<p>Add the following function call somewhere in your javaScript AFTER the easyScrollDots.min.js file has been loaded...</p>

```javascript
easyScrollDots({
  'fixedNav': false,
  'fixedNavId': '',
  'fixedNavUpward': false,
  'offset': 0
});
```

### Add your anchor points

<p>Add the folliwing HTML snippet at the start of each section of the page that should have a dot associated with it...</p>

```html
<div>
    <div class="scroll-indicator" id="section01" data-scroll-indicator-title="Hello World"></div>
</div>
```

<p><strong>Replace the id with something different each time you add the snippet</strong>, and also update the data-scroll-indicator-title to represent the title for that section of the page.</p>

<p><em>Remember, an id cannot have any spaces and cannot start with a number. Adding a unique id each time is required, and can be useful for creating deep link URLs to your content e.g. mysite.com/#section01</em></p>

## Options

<p>Some sites have a fixed or sticky top navigation bar which gets in the way when easyScrollDots scrolls the browser window to the top of each section. Therefore you have to tell easyScrollDots if you have a <strong>fixed nav</strong>, and if so, you also need to provide the <strong>id of the navigation bar</strong>. You can also tell easyScrollDots if your fixed <strong>nav only appears when the user is scrolling upward</strong>. Finally, you can set an <strong>offset amount</strong> in order to adjust where the browser scrolls to when a dot is clicked.</p>

```javascript
easyScrollDots({
  'fixedNav': true, // Set to true if you have a fixed nav.
  'fixedNavId': 'myNav', // Set to the id of your navigation element if 'fixedNav' is true (easyScrollDots will measure the height of the element).
  'fixedNavUpward': true, // Set to true if your nav is only sticky when the user is scrolling up (requires 'fixedNav' to be true and 'fixedNavId' to be a value).
  'offset': 30 // Set to the amount of pixels you wish to offset the scroll amount by.
});
```

## Assumptions & Prerequisites

It is assumed that your application has a body tag. (easyScrollDots appends itself to the end of the body)

# Demo

<p>See a working demo:</p>

<strong><a href="https://easyscrolldots.primmis.com/" target="_blank">DEMO</a></strong>

<p><em>The demo is using jQuery for Old Edge support, but jQuery is NOT required.</em></p>

# Commercial License

<p>To use easyScrollDots on commercial projects, a commercial license is required...</p>

## Single Commercial License

<p>This license grants you to use easyScrollDots for one project, for yourself or for one client, and for commercial use. Purchase a one-off single commercial license <a href="https://gum.co/TdtEX" target="_blank">here</a>. ($25 exc. VAT - Includes free support)</p>

## Extended Commercial License

<p>This license grants you to use easyScrollDots for an unlimited amount of projects for commercial use. Purchase a one-off extended commercial license <a href="https://gum.co/NGfmlw" target="_blank">here</a>. ($79 exc. VAT - Includes free support)</p>

# Open Source License

<p>If your application is open source and under a GNU GPL v3 compatible license, then you can use easyScrollDots without a commercial license.</p>
