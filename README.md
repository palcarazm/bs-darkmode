[![GitHub license](https://img.shields.io/github/license/palcarazm/bs-darkmode.svg)](https://github.com/palcarazm/bs-darkmode/blob/master/LICENSE)
[![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bs-darkmode/v2.X.X?logo=github)](https://github.com/palcarazm/bs-darkmode/releases)
[![JSDelivr Badge](https://img.shields.io/jsdelivr/npm/hm/bs-darkmode?color=success&label=hits&logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/package/npm/bs-darkmode)
[![NPM Badge](https://img.shields.io/npm/dm/bs-darkmode?logo=npm&color=success)](https://www.npmjs.com/package/bs-darkmode)
[![Maintenance](https://img.shields.io/badge/maintained%3F-yes-success.svg)](https://github.com/palcarazm/bs-darkmode/graphs/contributors)
[![Funding](https://img.shields.io/badge/sponsor-30363D?style=flat&logo=GitHub-Sponsors&logoColor=#white)](https://github.com/sponsors/palcarazm)
[![Rate this package](https://badges.openbase.com/js/rating/bs-darkmode.svg?)](https://openbase.com/js/bs-darkmode?utm_source=embedded&amp;utm_medium=badge&amp;utm_campaign=rate-badge)

# Bootstrap Darkmode

**Bootstrap Darkmode** is a bootstrap plugin/widget that supports toggling between light and dark theme.

***

#### Library Distributions
Branch | Bootstrap Support | Last Release
---|---|---
[bs-darkmode v2.X.X](https://github.com/palcarazm/bs-darkmode/tree/v2.X.X)     | [![Bootstrap 5](https://img.shields.io/static/v1?label=bootstrap&message=v5.X.X&color=informational&logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/5.0) | [![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bs-darkmode/v2.X.X?logo=github)](https://github.com/palcarazm/bs-darkmode/releases)
[bs-darkmode v1.X.X](https://github.com/palcarazm/bs-darkmode/tree/v1.X.X)     | [![Bootstrap 4](https://img.shields.io/static/v1?label=bootstrap&message=v4.X.X&color=informational&logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/4.0) | [![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bs-darkmode/v1.X.X?logo=github)](https://github.com/palcarazm/bs-darkmode/releases)
# Demos
**Demos and API Docs:** https://palcarazm.github.io/bs-darkmode/  

# Related Bootstrap Puglins
<div align="center">
  <a href="https://github.com/palcarazm/bootstrap5-toggle" title="Boostrap Toggle"
    ><img
      src="https://github-readme-stats.vercel.app/api/pin/?username=palcarazm&repo=bootstrap5-toggle&border_radius=10&show_owner=true"
  /></a>
</div>

***

<!-- To update TOC run .\node_modules\.bin\doctoc README.md --github -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Bootstrap Darkmode](#bootstrap-darkmode)
      - [Library Distributions](#library-distributions)
- [Demos](#demos)
- [Installation](#installation)
  - [CDN](#cdn)
    - [jQuery Interface](#jquery-interface)
    - [ECMAS Interface](#ecmas-interface)
  - [Download](#download)
  - [NPM](#npm)
  - [Yarn](#yarn)
- [Usage](#usage)
  - [Initialize With HTML](#initialize-with-html)
  - [Initialize With Code](#initialize-with-code)
- [API](#api)
  - [Options](#options)
  - [CSS Vars to change](#css-vars-to-change)
  - [Methods](#methods)
- [Events](#events)
  - [Event Propagation](#event-propagation)
  - [Stopping Event Propagation](#stopping-event-propagation)
- [Collaborators welcom!](#collaborators-welcom)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**************************************************************************************************

# Installation

## CDN
[![JSDelivr Badge](https://img.shields.io/jsdelivr/npm/hm/bs-darkmode?color=success&label=hits&logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/package/npm/bs-darkmode)
### jQuery Interface
```html
<link href="https://cdn.jsdelivr.net/npm/bs-darkmode@2.0.0/css/bs-darkmode.min.css" rel="stylesheet">  
<script src="https://cdn.jsdelivr.net/npm/bs-darkmode@2.0.0/js/bs-darkmode.jquery.min.js"></script>
```

### ECMAS Interface
```html
<link href="https://cdn.jsdelivr.net/npm/bs-darkmode@2.0.0/css/bs-darkmode.min.css" rel="stylesheet">  
<script src="https://cdn.jsdelivr.net/npm/bs-darkmode@2.0.0/js/bs-darkmode.ecmas.min.js"></script>
```

## Download
[![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bs-darkmode/v2.X.X?logo=github)](https://github.com/palcarazm/bs-darkmode/releases)

## NPM
[![NPM Badge](https://img.shields.io/npm/dm/bs-darkmode?logo=npm&color=success)](https://www.npmjs.com/package/bs-darkmode)
```ksh
npm install bs-darkmode@2.0.0
```

## Yarn
```ksh
yarn add bs-darkmode@2.0.0
```

# Usage

## Initialize With HTML
Simply add `data-plugin="bsdarkmode"` to automatically convert an element to a Bootstrap.

```html
<button class="btn btn-primary" data-plugin="bsdarkmode"></button>
```

## Initialize With Code
Toggles can also be initialized via JavaScript code.  

EX: Initialize id `darkmodeToggle` with a single line of JavaScript.
```html
<button class="btn btn-primary" id="darkmodeToggle"></button>
<script>
  $(function(){
    $('#darkmodeToggle').bsDarkmode();
  });
</script>
```

# API

## Options
* Options can be passed via data attributes or JavaScript
* For data attributes, append the option name to `data-` (ex: `data-state="light"`)

```html
<div id="api-example">
    <button class="btn btn-primary" data-plugin="bsdarkmode" data-state="dark" data-root="#api-example"
        data-lightvars='{"primary":"#FF0000","secondary":"#00FF00"}'
        data-darkvars='{"primary":"#0000FF","secondary":"#FFFF00"}'></button>
    <button class="btn btn-primary" id="darkmodeToggle"></button>
</div>
<script>
    $(function () {
        $('#darkmodeToggle').bsDarkmode({
            state: false,
            root:'#api-example',
            lightvars: '{"primary":"#FF0000","secondary":"#00FF00"}',
            darkvars: '{"primary":"#0000FF","secondary":"#FFFF00"}'
        });
    })
</script>
```

Name          |Type   |Default |Description                 
--------------|-------|--------|------------
`state`       |boolean|true    |Initial state (For data-state use `light` or `dark`). The user preferred color scheme dark is prioritary.
`root`        |string |":root" |Root element to apply CSS vars
`allowsCookie`|boolean|false   |Cookie authorization status
`lightlabel`  |html   |sun svg |Element inner HTML for light mode
`darklabel`   |html   |moon svg|Element inner HTML for dark mode
`lightvars`   |string |"{}"    |JSON object with CSS vars for light mode
`darkvars`    |string |"{}"    |JSON object with CSS vars for dark mode

## CSS Vars to change
The following CSS Vars that can be changed form `lightvars` and `darkvars` attributes.

Var             |Type     |Default Ligth|Default Dark|Description
----------------|---------|-------------|------------|-----------
`blue`          |HEX color|#0d6efd      |#3f6791     |Standard Bootstrap [color](https://getbootstrap.com/docs/4.0/getting-started/theming/#all-colors)
`indigo`        |HEX color|#6610f2      |#6610f2     |Standard Bootstrap [color](https://getbootstrap.com/docs/4.0/getting-started/theming/#all-colors)
`purple`        |HEX color|#6f42c1      |#6f42c1     |Standard Bootstrap [color](https://getbootstrap.com/docs/4.0/getting-started/theming/#all-colors)
`pink`          |HEX color|#d63384      |#e83e8c     |Standard Bootstrap [color](https://getbootstrap.com/docs/4.0/getting-started/theming/#all-colors)
`red`           |HEX color|#dc3545      |#e74c3c     |Standard Bootstrap [color](https://getbootstrap.com/docs/4.0/getting-started/theming/#all-colors)
`orange`        |HEX color|#fd7e14      |#fd7e14     |Standard Bootstrap [color](https://getbootstrap.com/docs/4.0/getting-started/theming/#all-colors)
`yellow`        |HEX color|#ffc107      |#f39c12     |Standard Bootstrap [color](https://getbootstrap.com/docs/4.0/getting-started/theming/#all-colors)
`green`         |HEX color|#198754      |#00bc8c     |Standard Bootstrap [color](https://getbootstrap.com/docs/4.0/getting-started/theming/#all-colors)
`teal`          |HEX color|#20c997      |#20c997     |Standard Bootstrap [color](https://getbootstrap.com/docs/4.0/getting-started/theming/#all-colors)
`cyan`          |HEX color|#0dcaf0      |#3498db     |Standard Bootstrap [color](https://getbootstrap.com/docs/4.0/getting-started/theming/#all-colors)
`gray`          |HEX color|#6c757d      |#ced4da     |Standard Bootstrap [gray color](https://getbootstrap.com/docs/4.0/getting-started/theming/#grays)
`gray-dark`     |HEX color|#343a40      |#e9ecef     |Standard Bootstrap [gray color](https://getbootstrap.com/docs/4.0/getting-started/theming/#grays)
`gray-100`      |HEX color|#f8f9fa      |#212529     |Standard Bootstrap [gray color](https://getbootstrap.com/docs/4.0/getting-started/theming/#grays)
`gray-200`      |HEX color|#e9ecef      |#343a40     |Standard Bootstrap [gray color](https://getbootstrap.com/docs/4.0/getting-started/theming/#grays)
`gray-300`      |HEX color|#dee2e6      |#495057     |Standard Bootstrap [gray color](https://getbootstrap.com/docs/4.0/getting-started/theming/#grays)
`gray-400`      |HEX color|#ced4da      |#6c757d     |Standard Bootstrap [gray color](https://getbootstrap.com/docs/4.0/getting-started/theming/#grays)
`gray-500`      |HEX color|#adb5bd      |#adb5bd     |Standard Bootstrap [gray color](https://getbootstrap.com/docs/4.0/getting-started/theming/#grays)
`gray-600`      |HEX color|#6c757d      |#ced4da     |Standard Bootstrap [gray color](https://getbootstrap.com/docs/4.0/getting-started/theming/#grays)
`gray-700`      |HEX color|#495057      |#dee2e6     |Standard Bootstrap [gray color](https://getbootstrap.com/docs/4.0/getting-started/theming/#grays)
`gray-800`      |HEX color|#343a40      |#e9ecef     |Standard Bootstrap [gray color](https://getbootstrap.com/docs/4.0/getting-started/theming/#grays)
`gray-900`      |HEX color|#212529      |#f8f9fa     |Standard Bootstrap [gray color](https://getbootstrap.com/docs/4.0/getting-started/theming/#grays)
`primary`       |HEX color|#0d6efd      |#3f6791     |Standard Bootstrap [theme color](https://getbootstrap.com/docs/4.0/getting-started/theming/#theme-colors)
`secondary`     |HEX color|#6c757d      |#ced4da     |Standard Bootstrap [theme color](https://getbootstrap.com/docs/4.0/getting-started/theming/#theme-colors)
`success`       |HEX color|#198754      |#00bc8c     |Standard Bootstrap [theme color](https://getbootstrap.com/docs/4.0/getting-started/theming/#theme-colors)
`info`          |HEX color|#0dcaf0      |#3498db     |Standard Bootstrap [theme color](https://getbootstrap.com/docs/4.0/getting-started/theming/#theme-colors)
`warning`       |HEX color|#ffc107      |#f39c12     |Standard Bootstrap [theme color](https://getbootstrap.com/docs/4.0/getting-started/theming/#theme-colors)
`danger`        |HEX color|#dc3545      |#e74c3c     |Standard Bootstrap [theme color](https://getbootstrap.com/docs/4.0/getting-started/theming/#theme-colors)
`light`         |HEX color|#f8f9fa      |#212529     |Standard Bootstrap [theme color](https://getbootstrap.com/docs/4.0/getting-started/theming/#theme-colors)
`dark`          |HEX color|#212529      |#f8f9fa     |Standard Bootstrap [theme color](https://getbootstrap.com/docs/4.0/getting-started/theming/#theme-colors)
`body-color`    |HEX color|#212529      |#f8f9fa     |Body color
`body-bg`       |HEX color|#fff         |#495057     |Body background color
`white`         |HEX color|#fff         |#000        |White color
`black`         |HEX color|#000         |#fff        |Black color

Theme colors, black and white are also exposed in HSL with `{color}-h`, `{color}-s` and `{color}-l`and in RGB with `{color}-rgb`.

## Methods
Methods can be used to control toggles directly.

```html
<button class="btn btn-primary" id="darkmodeToggle"></button>
```

Method               |Example                                                            |Description
---------------------|-------------------------------------------------------------------|------------
initialize           | `$('#darkmodeToggle').bsDarkmode()`                               |Initializes the darkmode plugin with options
light                | `$('#darkmodeToggle').bsDarkmode('light')`                        |Sets the darkmode toggle to 'light' state
dark                 | `$('#darkmodeToggle').bsDarkmode('dark')`                         |Sets the darkmode toggle to 'dark' state
toggle               | `$('#darkmodeToggle').bsDarkmode('toggle')`                       |Toggles the state of the darkmode toggle light/dark
setCookieAutorization| `$('#darkmodeToggle').bsDarkmode('setCookieAutorization', status)`|Sets the Cookie authorization status. Status can be `true` or `false`

# Events

## Event Propagation
Note All events are propagated to and from the element to the darkmode toggle.

You should listen to events from the HTML element directly rather than look for custom events.

```html
<button class="btn btn-primary" id="darkmodeToggle" data-plugin="bsdarkmode"></button>
<div id="console-event"></div>
<script>
  $(function() {
    $('#darkmodeToggle').change(function() {
      $('#console-event').html('Mode changed')
    })
  })
</script>
```

## Stopping Event Propagation
Passing `true` to the light, dark and toggle methods will enable the silent option to prevent the control from propagating the change event in cases where you want to update the controls light/dark state, but do not want to fire the onChange event.

```html
<button class="btn btn-primary" data-plugin="bsdarkmode" id="darkmodeToggle"></button>
<button class="btn btn-success" onclick="$('#darkmodeToggle').bsDarkmode('light',true)" >Light by API (silent)</button>
<button class="btn btn-success" onclick="$('#darkmodeToggle').bsDarkmode('dark',true)">Dark by API (silent)</button>
<button class="btn btn-warning" onclick="$('#darkmodeToggle').bsDarkmode('light')">Light by API (not silent)</button>
<button class="btn btn-warning" onclick="$('#darkmodeToggle').bsDarkmode('dark')">Dark by API (not silent)</button>
```

# Collaborators welcom!
- :sos: ¿Do you need some help? Open a issue in [GitHub help wanted](https://github.com/palcarazm/bs-darkmode/issues/new?assignees=&labels=help+wanted&template=help-wanted.md&title=%5BHELP%5D)
 - :bug: ¿Do you find a bug? Open a issue in [GitHub bug report](https://github.com/palcarazm/bs-darkmode/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D)
 - :bulb: ¿Do you have a great idea? Open a issue in [GitHub feature request](https://github.com/palcarazm/bs-darkmode/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D)
 - :computer: ¿Do you know how to fix a bug? Open a pull request in [GitHub pull repuest](https://github.com/palcarazm/bs-darkmode/compare).

[![GitHub Contributors](https://contrib.rocks/image?repo=palcarazm/bs-darkmode)](https://github.com/palcarazm/bs-darkmode/graphs/contributors)

¿Do you like the project? Give us a :star: in [GitHub](https://github.com/palcarazm/bs-darkmode).
