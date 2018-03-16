require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"NavbarComponent":[function(require,module,exports){

/*
	 * USING NAVBARCOMPONENT

	 * Require the module
	NavbarComponent = require "NavbarComponent"

	myNavbar = new NavbarComponent
		 * General
		style: <string> ("light" || "dark")
		size: <string> ("large" || "small")
		title: <string>

		 * Buttons
		buttonCount: <number>
		buttonSize: <number>
		buttonActions: <array of actions>
		imagePrefix: <string>
		imageSuffix: <string>
		backAction: <action>

		 * Search bar
		searchLabel: <string>
		search: <boolean>
		dictation: <boolean>

		 * Colors
		textColor: <string> (hex or rgba)
		backgroundColor: <string> (hex or rgba)
		searchBarColor: <string> (hex or rgba)
		searchIconColor: <string> (hex or rgba)
		accentColor: <string> (hex or rgba)

	 * Attach to a FlowComponent or ScrollComponent
	myNavbar.scrollWith(layer)

	 * Navigate to next title
	myNavbar.showNext(<string>)

	 * Navigate to previous title
	myNavbar.showPrevious()

	 * Current search field value
	myNavbar.search

	 * Inspect the stored titles
	myNavbar.history
 */
var NavbarComponent, defaults,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defaults = {
  buttonCount: 0,
  title: "Large Title",
  searchLabel: "Search",
  style: "light",
  size: "large",
  search: false,
  dictation: false,
  textColor: "",
  backgroundColor: "",
  searchBarColor: "",
  searchIconColor: "#8E8E93",
  buttonSize: 24,
  accentColor: "#007AFF",
  imagePrefix: "",
  imageSuffix: "png",
  buttonActions: [],
  backAction: function() {}
};

NavbarComponent = (function(superClass) {
  extend(NavbarComponent, superClass);

  function NavbarComponent(options) {
    var animateToNextTitle, animateToPreviousTitle, chevronSVG, defaultAnimationDuration, dictationSVG, displayBackButton, heights, inputCSS, margins, noop, resetTitle, scrollThresholds, searchSVG, sizeTextLayer;
    this.options = options != null ? options : {};
    this.options = _.assign({}, defaults, this.options);
    NavbarComponent.__super__.constructor.call(this, this.options);
    noop = function() {};
    this.history = [this.options.title];
    this.navLevel = 0;
    defaultAnimationDuration = 0.25;
    sizeTextLayer = function(layer) {
      var ratio, style, textWidth;
      style = _.pick(layer.style, TextLayer._textProperties);
      textWidth = Math.ceil(Utils.textSize(layer.text, style).width);
      ratio = _.includes(Framer.Device.deviceType, "plus") ? 3 : 2;
      return layer.width = textWidth / ratio;
    };
    heights = {
      small: 64,
      large: 116,
      search: 54
    };
    scrollThresholds = {
      titleScaleThreshold: 70
    };
    margins = {
      side: 14
    };
    chevronSVG = "<svg xmlns='http://www.w3.org/2000/svg'><polygon points='0 10.5 10.5 0 12.5 2 4 10.5 12.5 19 10.5 21' fill='" + this.options.accentColor + "' /></svg>";
    searchSVG = "<svg xmlns='http://www.w3.org/2000/svg'><path d='m13.74309,12.57406l-3.833,-3.8345c0.68708,-0.9371 1.05514,-2.07003 1.05,-3.232c-0.01311,-3.03315 -2.46637,-5.48999 -5.4995,-5.5075c-1.45152,-0.00657 -2.84537,0.56765 -3.87106,1.59475c-1.02568,1.02709 -1.59799,2.42174 -1.58944,3.87325c0.01311,3.03342 2.46661,5.49048 5.5,5.508c1.16671,0.00505 2.30378,-0.3673 3.2415,-1.0615l0.004,-0.003l3.8295,3.8315c0.20705,0.21721 0.51557,0.30513 0.80602,0.2297c0.29045,-0.07544 0.51719,-0.30237 0.59238,-0.59289c0.07518,-0.29051 -0.013,-0.59895 -0.2304,-0.80581l0,0zm-8.247,-2.696c-2.42658,-0.01396 -4.38934,-1.9794 -4.4,-4.406c-0.00654,-1.16106 0.45134,-2.27655 1.27173,-3.09817c0.8204,-0.82161 1.93521,-1.28116 3.09627,-1.27633c2.42659,0.01395 4.38935,1.97939 4.4,4.406c0.00655,1.16105 -0.45133,2.27655 -1.27173,3.09816c-0.82039,0.82161 -1.9352,1.28116 -3.09627,1.27634z' fill='" + this.options.searchIconColor + "' /></svg>";
    dictationSVG = "<svg xmlns='http://www.w3.org/2000/svg'><path d='M6,0 L6,0 C7.65685425,0 9,1.34314575 9,3 L9,10 C9,11.6568542 7.65685425,13 6,13 L6,13 C4.34314575,13 3,11.6568542 3,10 L3,3 C3,1.34314575 4.34314575,0 6,0 Z M11.25,6.5 C10.8357864,6.5 10.5,6.83578644 10.5,7.25 L10.5,10 C10.5,12.4852814 8.48528137,14.5 6,14.5 C3.51471863,14.5 1.5,12.4852814 1.5,10 L1.5,7.25 C1.5,6.83578644 1.16421356,6.5 0.75,6.5 C0.335786438,6.5 0,6.83578644 0,7.25 L0,10 C0.00148134437,13.0225955 2.25111105,15.5721759 5.25,15.95 L5.25,17.5 L3.25,17.5 C2.83578644,17.5 2.5,17.8357864 2.5,18.25 C2.5,18.6642136 2.83578644,19 3.25,19 L8.75,19 C9.16421356,19 9.5,18.6642136 9.5,18.25 C9.5,17.8357864 9.16421356,17.5 8.75,17.5 L6.75,17.5 L6.75,15.95 C9.74888895,15.5721759 11.9985187,13.0225955 12,10 L12,7.25 C12,6.83578644 11.6642136,6.5 11.25,6.5 L11.25,6.5 Z' fill='" + this.options.searchIconColor + "' /></svg>";
    if (this.options.textColor === "") {
      this.options.textColor = (function() {
        switch (this.options.style) {
          case "dark":
            return "white";
          default:
            return "black";
        }
      }).call(this);
    }
    if (this.options.backgroundColor === "") {
      this.options.backgroundColor = (function() {
        switch (this.options.style) {
          case "dark":
            return "hsla(0, 0%, 11%, 0.72)";
          default:
            return "hsla(0, 0%, 97%, 0.82)";
        }
      }).call(this);
    }
    if (this.options.searchBarColor === "") {
      this.options.searchBarColor = (function() {
        switch (this.options.style) {
          case "dark":
            return "hsla(240, 2%, 57%, 0.14)";
          default:
            return "hsla(240, 2%, 57%, 0.12)";
        }
      }).call(this);
    }
    inputCSS = "input[type='text'] {\n  appearance: none;\n  color: " + this.options.textColor + ";\n  border: none;\n  outline: none;\n  background-color: transparent;\n  font-family: -apple-system, Helvetica, Arial, sans-serif;\n  font-weight: 500;\n  text-align: left;\n  font-size: 17px;\n  margin: 0;\n  padding: 0;\n  width: 100px;\n  height: 36px;\n  position: relative;\n  top: 0;\n}";
    Utils.insertCSS(inputCSS);
    this.layout = (function(_this) {
      return function() {
        var backButton, backLabel, bkgd, chevron, clippingFrame, dictationIcon, fn, i, icon, iconFrame, j, k, layer, len, ref, ref1, searchBar, searchBarClip, searchIcon, searchText, smallTitle, title, titleClip;
        ref = _this.children;
        for (j = 0, len = ref.length; j < len; j++) {
          layer = ref[j];
          layer.destroy();
        }
        _this.width = Screen.width;
        _this.height = heights[_this.options.size] + _this.options.search * heights.search;
        _this.backgroundColor = "clear";
        bkgd = new Layer({
          parent: _this,
          width: Screen.width,
          height: _this.height + Screen.height,
          y: Align.bottom,
          backgroundColor: _this.options.backgroundColor,
          shadowY: 0.5,
          shadowBlur: 0,
          shadowColor: "rgba(0,0,0,0.28)",
          style: {
            "-webkit-backdrop-filter": "blur(60px)"
          }
        });
        _this.bkgd = bkgd;
        clippingFrame = new Layer({
          parent: _this,
          width: Screen.width,
          height: _this.height,
          backgroundColor: "clear",
          clip: true
        });
        _this.clippingFrame = clippingFrame;
        fn = function(i) {
          var reversedIndex;
          reversedIndex = _this.options.buttonCount - 1 - i;
          if (_this.options.buttonActions[reversedIndex] !== noop && _this.options.buttonActions[reversedIndex] !== void 0) {
            return iconFrame.onClick(function() {
              return _this.options.buttonActions[reversedIndex]();
            });
          }
        };
        for (i = k = 0, ref1 = _this.options.buttonCount; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
          iconFrame = new Layer({
            parent: clippingFrame,
            name: "iconFrame" + i,
            width: 28,
            height: 28,
            x: Align.right(-11 - (39 * i)),
            y: 29,
            backgroundColor: "clear"
          });
          fn(i);
          icon = new Layer({
            parent: iconFrame,
            name: "icon" + i,
            backgroundColor: "clear",
            width: _this.options.buttonSize,
            height: _this.options.buttonSize,
            x: Align.center,
            y: Align.center,
            image: "images/" + _this.options.imagePrefix + i + "." + _this.options.imageSuffix
          });
        }
        titleClip = new Layer({
          parent: clippingFrame,
          y: heights.small,
          width: Screen.width,
          height: heights[_this.options.size] - heights.small,
          backgroundColor: "clear",
          clip: true
        });
        _this.titleClip = titleClip;
        title = new TextLayer({
          parent: titleClip,
          x: margins.side,
          y: 2,
          fontSize: 34,
          fontWeight: 700,
          color: _this.options.textColor,
          text: _this.options.title,
          originX: 0
        });
        _this.title = title;
        chevron = new Layer({
          parent: clippingFrame,
          x: 7.5,
          y: 12.5,
          width: 13,
          height: 22,
          backgroundColor: "clear",
          html: chevronSVG
        });
        backLabel = new TextLayer({
          parent: clippingFrame,
          x: 26,
          y: 12,
          color: _this.options.accentColor,
          fontSize: 17,
          fontWeight: 500,
          text: ""
        });
        _this.backLabel = backLabel;
        smallTitle = new TextLayer({
          parent: clippingFrame,
          y: 32,
          color: _this.options.textColor,
          fontSize: 17,
          fontWeight: 500,
          text: _this.options.title,
          opacity: _this.options.size === "small" ? 1 : 0
        });
        sizeTextLayer(smallTitle);
        smallTitle.x = Align.center;
        smallTitle.autoWidth = true;
        _this.smallTitle = smallTitle;
        backButton = new Layer({
          parent: clippingFrame,
          y: 20,
          width: Screen.width / 2,
          height: heights.small - 20,
          backgroundColor: "clear"
        });
        backButton.placeBefore(bkgd);
        _this.backButton = backButton;
        chevron.parent = backButton;
        backLabel.parent = backButton;
        backButton.states = {
          show: {
            opacity: 1,
            animationOptions: {
              time: defaultAnimationDuration
            }
          },
          hide: {
            opacity: 0,
            animationOptions: {
              time: defaultAnimationDuration
            }
          }
        };
        backButton.animate("hide", {
          instant: true
        });
        if (_this.options.backAction !== noop) {
          backButton.onClick(function() {
            return _this.options.backAction();
          });
        }
        if (_this.options.search === true) {
          searchBarClip = new Layer({
            parent: clippingFrame,
            y: Align.bottom,
            width: Screen.width,
            height: heights.search,
            backgroundColor: "clear",
            clip: true
          });
          searchBar = new Layer({
            parent: searchBarClip,
            x: 8,
            y: Align.bottom(-16),
            width: _this.width - 16,
            height: 36,
            borderRadius: 10,
            backgroundColor: _this.options.searchBarColor
          });
          _this.searchBar = searchBar;
          searchBar.onTap(function() {});
          searchIcon = new Layer({
            parent: searchBar,
            x: 10,
            y: 11,
            width: 14,
            height: 14,
            backgroundColor: "clear",
            html: searchSVG
          });
          searchText = new Layer({
            parent: searchBar,
            x: searchIcon.maxX + 7,
            width: searchBar.width - 58,
            height: searchBar.height,
            backgroundColor: "clear",
            html: "<input id='search' type='text' contenteditable='true' placeholder='" + _this.options.searchLabel + "'>"
          });
          _this.searchText = searchText;
          if (_this.options.dictation === true) {
            return dictationIcon = new Layer({
              parent: searchBar,
              x: Align.right(-10),
              y: 9,
              width: 12,
              height: 19,
              backgroundColor: "clear",
              html: dictationSVG
            });
          }
        }
      };
    })(this);
    this.layout();
    this.scrollWith = (function(_this) {
      return function(layer) {
        var enforceScrollMatching, minNavBarHeight, ref, ref1, ref2, scroll, searchBarHeight, searchBarShift, searchBarY, smallNavBarHeight, titleHeight, titleMoveStart;
        scroll = null;
        minNavBarHeight = heights[_this.options.size];
        smallNavBarHeight = heights.small;
        searchBarHeight = heights.searchBar;
        searchBarY = ((ref = _this.searchBar) != null ? ref.y : void 0) || 0;
        searchBarShift = ((ref1 = _this.searchBar) != null ? ref1.y : void 0) - 16 - ((ref2 = _this.searchBar) != null ? ref2.height : void 0) / 2 || 0;
        titleMoveStart = heights.small * _this.options.search;
        titleHeight = heights[_this.options.size] - heights.small;
        enforceScrollMatching = false;
        if (layer instanceof FlowComponent) {
          scroll = layer.scroll;
        } else if (layer instanceof ScrollComponent) {
          scroll = layer;
        }
        if (scroll !== null && scroll !== void 0) {
          return scroll.onMove(function() {
            var maxNavBarHeight, ref3, ref4;
            maxNavBarHeight = 0;
            if (_this.navLevel > 0) {
              maxNavBarHeight = heights.small;
            } else if (_this.options.search === true) {
              maxNavBarHeight = heights[_this.options.size] + heights.search;
            } else {
              maxNavBarHeight = heights[_this.options.size];
            }
            _this.title.scale = Utils.modulate(scroll.scrollY, [0, -scrollThresholds.titleScaleThreshold], [1, 1.1], true);
            _this.clippingFrame.height = Utils.modulate(scroll.scrollY, [0, minNavBarHeight], [maxNavBarHeight, smallNavBarHeight], true);
            _this.clippingFrame.y = Math.max(0, -scroll.scrollY);
            _this.bkgd.y = Math.max(-Screen.height, -scroll.scrollY - Screen.height);
            _this.title.y = Utils.modulate(scroll.scrollY, [titleMoveStart, minNavBarHeight], [2, -titleHeight], true);
            _this.bkgd.height = Utils.modulate(scroll.scrollY, [0, minNavBarHeight], [maxNavBarHeight, smallNavBarHeight], true) + Screen.height;
            if ((ref3 = _this.searchBar) != null) {
              ref3.opacity = Utils.modulate(scroll.scrollY, [0, smallNavBarHeight], [1, 0], true);
            }
            if ((ref4 = _this.searchBar) != null) {
              ref4.y = Utils.modulate(scroll.scrollY, [0, smallNavBarHeight], [searchBarY, searchBarShift], true);
            }
            if (_this.options.size === "large" && _this.navLevel === 0) {
              return _this.smallTitle.opacity = Utils.modulate(_this.title.y, [2 - titleHeight / 2, -titleHeight], [0, 1], true);
            }
          });
        }
      };
    })(this);
    resetTitle = (function(_this) {
      return function() {
        if (_this.navLevel === 1) {
          _this.bkgd.height = _this.height + Screen.height;
          _this.bkgd.y = Align.bottom;
          _this.title.scale = 1;
          _this.title.y = 2;
          _this.clippingFrame.height = _this.height;
          return _this.clippingFrame.y = 0;
        }
      };
    })(this);
    animateToNextTitle = (function(_this) {
      return function(newTitle, oldTitle, titleLayer) {
        var tempLabel;
        if (newTitle == null) {
          newTitle = "";
        }
        if (oldTitle == null) {
          oldTitle = "";
        }
        if (titleLayer == null) {
          titleLayer = _this.title;
        }
        _this.smallTitle.opacity = 0;
        _this.title.opacity = 0;
        _this.backLabel.opacity = 0;
        titleLayer.opacity = 0;
        tempLabel = titleLayer.copy();
        tempLabel.opacity = 1;
        tempLabel.screenFrame = titleLayer.screenFrame;
        tempLabel.parent = _this.clippingFrame;
        tempLabel.x = titleLayer.screenFrame.x;
        tempLabel.y = titleLayer.screenFrame.y;
        tempLabel.text = oldTitle;
        tempLabel.animate({
          x: _this.backLabel.screenFrame.x,
          y: _this.backLabel.screenFrame.y,
          color: _this.options.accentColor,
          fontSize: 17,
          fontWeight: 500,
          options: {
            time: defaultAnimationDuration
          }
        });
        _this.backLabel.animate({
          opacity: 0,
          options: {
            time: defaultAnimationDuration - 0.05
          }
        });
        _this.smallTitle.text = newTitle;
        _this.smallTitle.animate({
          opacity: 1,
          options: {
            time: defaultAnimationDuration
          }
        });
        return tempLabel.onAnimationEnd(function() {
          _this.backLabel.text = oldTitle;
          _this.backLabel.width = Screen.width - margins.side * 2;
          _this.backLabel.opacity = 1;
          return Utils.delay(defaultAnimationDuration, function() {
            return tempLabel.destroy();
          });
        });
      };
    })(this);
    animateToPreviousTitle = (function(_this) {
      return function(prevBackLabel, currentBackLabel, titleLayer) {
        var tempTitle;
        if (prevBackLabel == null) {
          prevBackLabel = "";
        }
        if (currentBackLabel == null) {
          currentBackLabel = "";
        }
        if (titleLayer == null) {
          titleLayer = _this.title;
        }
        resetTitle();
        _this.title.opacity = 0;
        _this.smallTitle.opacity = 0;
        _this.backLabel.opacity = 0;
        tempTitle = _this.backLabel.copy();
        tempTitle.opacity = 1;
        tempTitle.screenFrame = _this.backLabel.screenFrame;
        tempTitle.parent = _this.clippingFrame;
        tempTitle.animate({
          x: titleLayer.screenFrame.x,
          y: titleLayer.screenFrame.y,
          color: _this.options.textColor,
          fontSize: titleLayer.fontSize,
          fontWeight: titleLayer.fontWeight,
          opacity: 1,
          options: {
            time: defaultAnimationDuration
          }
        });
        _this.backLabel.text = prevBackLabel;
        _this.backLabel.animate({
          opacity: 1,
          options: {
            time: defaultAnimationDuration
          }
        });
        return tempTitle.onAnimationEnd(function() {
          _this.title.text = currentBackLabel;
          _this.smallTitle.text = currentBackLabel;
          titleLayer.opacity = 1;
          return Utils.delay(defaultAnimationDuration, function() {
            return tempTitle.destroy();
          });
        });
      };
    })(this);
    this.showNext = Utils.throttle(0.5, (function(_this) {
      return function(newTitle) {
        if (newTitle == null) {
          newTitle = "New Title";
        }
        _this.history.splice(_this.navLevel + 1, 1, newTitle);
        if (_this.navLevel === 0 && _this.options.size === "large") {
          animateToNextTitle(newTitle, _this.history[_this.navLevel], _this.title);
        } else {
          animateToNextTitle(newTitle, _this.history[_this.navLevel], _this.smallTitle);
        }
        _this.clippingFrame.animate({
          height: heights.small,
          options: {
            time: defaultAnimationDuration
          }
        });
        _this.bkgd.animate({
          height: heights.small + Screen.height,
          options: {
            time: defaultAnimationDuration
          }
        });
        ++_this.navLevel;
        return displayBackButton();
      };
    })(this));
    this.showPrevious = Utils.throttle(0.5, (function(_this) {
      return function() {
        if (_this.navLevel > 0) {
          if (_this.navLevel === 1 && _this.options.size === "large") {
            animateToPreviousTitle(_this.history[_this.navLevel - 2], _this.history[_this.navLevel - 1], _this.title);
            _this.clippingFrame.animate({
              height: heights[_this.options.size] + _this.options.search * heights.search,
              options: {
                time: defaultAnimationDuration
              }
            });
            _this.bkgd.animate({
              height: heights[_this.options.size] + Screen.height + _this.options.search * heights.search,
              options: {
                time: defaultAnimationDuration
              }
            });
          } else {
            animateToPreviousTitle(_this.history[_this.navLevel - 2], _this.history[_this.navLevel - 1], _this.smallTitle);
          }
          _this.navLevel = Math.max(0, _this.navLevel - 1);
          return displayBackButton();
        }
      };
    })(this));
    displayBackButton = (function(_this) {
      return function() {
        if (_this.navLevel === 0) {
          return _this.backButton.animate("hide");
        } else {
          return _this.backButton.animate("show");
        }
      };
    })(this);
    if (Utils.isMobile()) {
      window.addEventListener("orientationchange", (function(_this) {
        return function() {
          return _this.layout();
        };
      })(this));
    } else {
      Framer.Device.on("change:orientation", (function(_this) {
        return function() {
          return _this.layout();
        };
      })(this));
    }
  }

  NavbarComponent.define('search', {
    get: function() {
      return document.getElementById('search').value;
    }
  });

  return NavbarComponent;

})(Layer);

module.exports = NavbarComponent;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9OYXZiYXJDb21wb25lbnQuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiIyMjXG5cdCMgVVNJTkcgTkFWQkFSQ09NUE9ORU5UXG5cblx0IyBSZXF1aXJlIHRoZSBtb2R1bGVcblx0TmF2YmFyQ29tcG9uZW50ID0gcmVxdWlyZSBcIk5hdmJhckNvbXBvbmVudFwiXG5cblx0bXlOYXZiYXIgPSBuZXcgTmF2YmFyQ29tcG9uZW50XG5cdFx0IyBHZW5lcmFsXG5cdFx0c3R5bGU6IDxzdHJpbmc+IChcImxpZ2h0XCIgfHwgXCJkYXJrXCIpXG5cdFx0c2l6ZTogPHN0cmluZz4gKFwibGFyZ2VcIiB8fCBcInNtYWxsXCIpXG5cdFx0dGl0bGU6IDxzdHJpbmc+XG5cblx0XHQjIEJ1dHRvbnNcblx0XHRidXR0b25Db3VudDogPG51bWJlcj5cblx0XHRidXR0b25TaXplOiA8bnVtYmVyPlxuXHRcdGJ1dHRvbkFjdGlvbnM6IDxhcnJheSBvZiBhY3Rpb25zPlxuXHRcdGltYWdlUHJlZml4OiA8c3RyaW5nPlxuXHRcdGltYWdlU3VmZml4OiA8c3RyaW5nPlxuXHRcdGJhY2tBY3Rpb246IDxhY3Rpb24+XG5cblx0XHQjIFNlYXJjaCBiYXJcblx0XHRzZWFyY2hMYWJlbDogPHN0cmluZz5cblx0XHRzZWFyY2g6IDxib29sZWFuPlxuXHRcdGRpY3RhdGlvbjogPGJvb2xlYW4+XG5cblx0XHQjIENvbG9yc1xuXHRcdHRleHRDb2xvcjogPHN0cmluZz4gKGhleCBvciByZ2JhKVxuXHRcdGJhY2tncm91bmRDb2xvcjogPHN0cmluZz4gKGhleCBvciByZ2JhKVxuXHRcdHNlYXJjaEJhckNvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0c2VhcmNoSWNvbkNvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0YWNjZW50Q29sb3I6IDxzdHJpbmc+IChoZXggb3IgcmdiYSlcblxuXHQjIEF0dGFjaCB0byBhIEZsb3dDb21wb25lbnQgb3IgU2Nyb2xsQ29tcG9uZW50XG5cdG15TmF2YmFyLnNjcm9sbFdpdGgobGF5ZXIpXG5cblx0IyBOYXZpZ2F0ZSB0byBuZXh0IHRpdGxlXG5cdG15TmF2YmFyLnNob3dOZXh0KDxzdHJpbmc+KVxuXG5cdCMgTmF2aWdhdGUgdG8gcHJldmlvdXMgdGl0bGVcblx0bXlOYXZiYXIuc2hvd1ByZXZpb3VzKClcblxuXHQjIEN1cnJlbnQgc2VhcmNoIGZpZWxkIHZhbHVlXG5cdG15TmF2YmFyLnNlYXJjaFxuXG5cdCMgSW5zcGVjdCB0aGUgc3RvcmVkIHRpdGxlc1xuXHRteU5hdmJhci5oaXN0b3J5XG4jIyNcblxuZGVmYXVsdHMgPVxuXHRidXR0b25Db3VudDogMFxuXHR0aXRsZTogXCJMYXJnZSBUaXRsZVwiXG5cdHNlYXJjaExhYmVsOiBcIlNlYXJjaFwiXG5cdHN0eWxlOiBcImxpZ2h0XCJcblx0c2l6ZTogXCJsYXJnZVwiXG5cdHNlYXJjaDogZmFsc2Vcblx0ZGljdGF0aW9uOiBmYWxzZVxuXHR0ZXh0Q29sb3I6IFwiXCJcblx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdHNlYXJjaEJhckNvbG9yOiBcIlwiXG5cdHNlYXJjaEljb25Db2xvcjogXCIjOEU4RTkzXCJcblx0YnV0dG9uU2l6ZTogMjRcblx0YWNjZW50Q29sb3I6IFwiIzAwN0FGRlwiXG5cdGltYWdlUHJlZml4OiBcIlwiXG5cdGltYWdlU3VmZml4OiBcInBuZ1wiXG5cdGJ1dHRvbkFjdGlvbnM6IFtdXG5cdGJhY2tBY3Rpb246ICgpIC0+XG5cbiMgTmF2YmFyQ29tcG9uZW50IGNsYXNzXG5jbGFzcyBOYXZiYXJDb21wb25lbnQgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zID0gXy5hc3NpZ24oe30sIGRlZmF1bHRzLCBAb3B0aW9ucylcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0bm9vcCA9ICgpIC0+XG5cdFx0QC5oaXN0b3J5ID0gW0BvcHRpb25zLnRpdGxlXVxuXHRcdEAubmF2TGV2ZWwgPSAwXG5cdFx0ZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uID0gMC4yNVxuXG5cdFx0c2l6ZVRleHRMYXllciA9IChsYXllcikgLT5cblx0XHRcdHN0eWxlID0gXy5waWNrKGxheWVyLnN0eWxlLCBUZXh0TGF5ZXIuX3RleHRQcm9wZXJ0aWVzKVxuXHRcdFx0dGV4dFdpZHRoID0gTWF0aC5jZWlsKFV0aWxzLnRleHRTaXplKGxheWVyLnRleHQsIHN0eWxlKS53aWR0aClcblx0XHRcdHJhdGlvID0gaWYgXy5pbmNsdWRlcyhGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUsIFwicGx1c1wiKSB0aGVuIDMgZWxzZSAyXG5cdFx0XHRsYXllci53aWR0aCA9IHRleHRXaWR0aC9yYXRpb1xuXG5cdFx0IyBoZWlnaHRzIGJ5IHNpemVcblx0XHRoZWlnaHRzID1cblx0XHRcdHNtYWxsOiA2NFxuXHRcdFx0bGFyZ2U6IDExNlxuXHRcdFx0c2VhcmNoOiA1NCAjIGFkZGl0aXZlXG5cblx0XHQjIHNjcm9sbCB0aHJlc2hvbGRzIGZvciB0cmlnZ2VyaW5nIG5hdmJhciBjaGFuZ2VzXG5cdFx0c2Nyb2xsVGhyZXNob2xkcyA9XG5cdFx0XHR0aXRsZVNjYWxlVGhyZXNob2xkOiA3MFxuXG5cdFx0bWFyZ2lucyA9XG5cdFx0XHRzaWRlOiAxNFxuXG5cdFx0IyBTVkdcblx0XHRjaGV2cm9uU1ZHID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBvbHlnb24gcG9pbnRzPScwIDEwLjUgMTAuNSAwIDEyLjUgMiA0IDEwLjUgMTIuNSAxOSAxMC41IDIxJyBmaWxsPScje0BvcHRpb25zLmFjY2VudENvbG9yfScgLz48L3N2Zz5cIlxuXG5cdFx0c2VhcmNoU1ZHID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nbTEzLjc0MzA5LDEyLjU3NDA2bC0zLjgzMywtMy44MzQ1YzAuNjg3MDgsLTAuOTM3MSAxLjA1NTE0LC0yLjA3MDAzIDEuMDUsLTMuMjMyYy0wLjAxMzExLC0zLjAzMzE1IC0yLjQ2NjM3LC01LjQ4OTk5IC01LjQ5OTUsLTUuNTA3NWMtMS40NTE1MiwtMC4wMDY1NyAtMi44NDUzNywwLjU2NzY1IC0zLjg3MTA2LDEuNTk0NzVjLTEuMDI1NjgsMS4wMjcwOSAtMS41OTc5OSwyLjQyMTc0IC0xLjU4OTQ0LDMuODczMjVjMC4wMTMxMSwzLjAzMzQyIDIuNDY2NjEsNS40OTA0OCA1LjUsNS41MDhjMS4xNjY3MSwwLjAwNTA1IDIuMzAzNzgsLTAuMzY3MyAzLjI0MTUsLTEuMDYxNWwwLjAwNCwtMC4wMDNsMy44Mjk1LDMuODMxNWMwLjIwNzA1LDAuMjE3MjEgMC41MTU1NywwLjMwNTEzIDAuODA2MDIsMC4yMjk3YzAuMjkwNDUsLTAuMDc1NDQgMC41MTcxOSwtMC4zMDIzNyAwLjU5MjM4LC0wLjU5Mjg5YzAuMDc1MTgsLTAuMjkwNTEgLTAuMDEzLC0wLjU5ODk1IC0wLjIzMDQsLTAuODA1ODFsMCwwem0tOC4yNDcsLTIuNjk2Yy0yLjQyNjU4LC0wLjAxMzk2IC00LjM4OTM0LC0xLjk3OTQgLTQuNCwtNC40MDZjLTAuMDA2NTQsLTEuMTYxMDYgMC40NTEzNCwtMi4yNzY1NSAxLjI3MTczLC0zLjA5ODE3YzAuODIwNCwtMC44MjE2MSAxLjkzNTIxLC0xLjI4MTE2IDMuMDk2MjcsLTEuMjc2MzNjMi40MjY1OSwwLjAxMzk1IDQuMzg5MzUsMS45NzkzOSA0LjQsNC40MDZjMC4wMDY1NSwxLjE2MTA1IC0wLjQ1MTMzLDIuMjc2NTUgLTEuMjcxNzMsMy4wOTgxNmMtMC44MjAzOSwwLjgyMTYxIC0xLjkzNTIsMS4yODExNiAtMy4wOTYyNywxLjI3NjM0eicgZmlsbD0nI3tAb3B0aW9ucy5zZWFyY2hJY29uQ29sb3J9JyAvPjwvc3ZnPlwiXG5cblx0XHRkaWN0YXRpb25TVkcgPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNNiwwIEw2LDAgQzcuNjU2ODU0MjUsMCA5LDEuMzQzMTQ1NzUgOSwzIEw5LDEwIEM5LDExLjY1Njg1NDIgNy42NTY4NTQyNSwxMyA2LDEzIEw2LDEzIEM0LjM0MzE0NTc1LDEzIDMsMTEuNjU2ODU0MiAzLDEwIEwzLDMgQzMsMS4zNDMxNDU3NSA0LjM0MzE0NTc1LDAgNiwwIFogTTExLjI1LDYuNSBDMTAuODM1Nzg2NCw2LjUgMTAuNSw2LjgzNTc4NjQ0IDEwLjUsNy4yNSBMMTAuNSwxMCBDMTAuNSwxMi40ODUyODE0IDguNDg1MjgxMzcsMTQuNSA2LDE0LjUgQzMuNTE0NzE4NjMsMTQuNSAxLjUsMTIuNDg1MjgxNCAxLjUsMTAgTDEuNSw3LjI1IEMxLjUsNi44MzU3ODY0NCAxLjE2NDIxMzU2LDYuNSAwLjc1LDYuNSBDMC4zMzU3ODY0MzgsNi41IDAsNi44MzU3ODY0NCAwLDcuMjUgTDAsMTAgQzAuMDAxNDgxMzQ0MzcsMTMuMDIyNTk1NSAyLjI1MTExMTA1LDE1LjU3MjE3NTkgNS4yNSwxNS45NSBMNS4yNSwxNy41IEwzLjI1LDE3LjUgQzIuODM1Nzg2NDQsMTcuNSAyLjUsMTcuODM1Nzg2NCAyLjUsMTguMjUgQzIuNSwxOC42NjQyMTM2IDIuODM1Nzg2NDQsMTkgMy4yNSwxOSBMOC43NSwxOSBDOS4xNjQyMTM1NiwxOSA5LjUsMTguNjY0MjEzNiA5LjUsMTguMjUgQzkuNSwxNy44MzU3ODY0IDkuMTY0MjEzNTYsMTcuNSA4Ljc1LDE3LjUgTDYuNzUsMTcuNSBMNi43NSwxNS45NSBDOS43NDg4ODg5NSwxNS41NzIxNzU5IDExLjk5ODUxODcsMTMuMDIyNTk1NSAxMiwxMCBMMTIsNy4yNSBDMTIsNi44MzU3ODY0NCAxMS42NjQyMTM2LDYuNSAxMS4yNSw2LjUgTDExLjI1LDYuNSBaJyBmaWxsPScje0BvcHRpb25zLnNlYXJjaEljb25Db2xvcn0nIC8+PC9zdmc+XCJcblxuXHRcdCMgc2V0IGRlZmF1bHQgY29sb3JzIHBlciBzdHlsZVxuXHRcdGlmIEBvcHRpb25zLnRleHRDb2xvciA9PSBcIlwiXG5cdFx0XHRAb3B0aW9ucy50ZXh0Q29sb3IgPSBzd2l0Y2ggQG9wdGlvbnMuc3R5bGVcblx0XHRcdFx0d2hlbiBcImRhcmtcIiB0aGVuIFwid2hpdGVcIlxuXHRcdFx0XHRlbHNlIFwiYmxhY2tcIlxuXG5cdFx0aWYgQG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID09IFwiXCJcblx0XHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IHN3aXRjaCBAb3B0aW9ucy5zdHlsZVxuXHRcdFx0XHR3aGVuIFwiZGFya1wiIHRoZW4gXCJoc2xhKDAsIDAlLCAxMSUsIDAuNzIpXCJcblx0XHRcdFx0ZWxzZSBcImhzbGEoMCwgMCUsIDk3JSwgMC44MilcIlxuXG5cdFx0aWYgQG9wdGlvbnMuc2VhcmNoQmFyQ29sb3IgPT0gXCJcIlxuXHRcdFx0QG9wdGlvbnMuc2VhcmNoQmFyQ29sb3IgPSBzd2l0Y2ggQG9wdGlvbnMuc3R5bGVcblx0XHRcdFx0d2hlbiBcImRhcmtcIiB0aGVuIFwiaHNsYSgyNDAsIDIlLCA1NyUsIDAuMTQpXCJcblx0XHRcdFx0ZWxzZSBcImhzbGEoMjQwLCAyJSwgNTclLCAwLjEyKVwiXG5cblx0XHRpbnB1dENTUyA9IFwiXCJcIlxuXHRcdGlucHV0W3R5cGU9J3RleHQnXSB7XG5cdFx0ICBhcHBlYXJhbmNlOiBub25lO1xuXHRcdCAgY29sb3I6ICN7QG9wdGlvbnMudGV4dENvbG9yfTtcblx0XHQgIGJvcmRlcjogbm9uZTtcblx0XHQgIG91dGxpbmU6IG5vbmU7XG5cdFx0ICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0XHQgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuXHRcdCAgZm9udC13ZWlnaHQ6IDUwMDtcblx0XHQgIHRleHQtYWxpZ246IGxlZnQ7XG5cdFx0ICBmb250LXNpemU6IDE3cHg7XG5cdFx0ICBtYXJnaW46IDA7XG5cdFx0ICBwYWRkaW5nOiAwO1xuXHRcdCAgd2lkdGg6IDEwMHB4O1xuXHRcdCAgaGVpZ2h0OiAzNnB4O1xuXHRcdCAgcG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdCAgdG9wOiAwO1xuXHRcdH1cIlwiXCJcblxuXHRcdFV0aWxzLmluc2VydENTUyhpbnB1dENTUylcblxuXHRcdEBsYXlvdXQgPSAoKSA9PlxuXHRcdFx0Zm9yIGxheWVyIGluIEAuY2hpbGRyZW5cblx0XHRcdFx0bGF5ZXIuZGVzdHJveSgpXG5cblx0XHRcdEAud2lkdGggPSBTY3JlZW4ud2lkdGhcblx0XHRcdEAuaGVpZ2h0ID0gaGVpZ2h0c1tAb3B0aW9ucy5zaXplXSArIEBvcHRpb25zLnNlYXJjaCAqIGhlaWdodHMuc2VhcmNoXG5cdFx0XHRALmJhY2tncm91bmRDb2xvciA9IFwiY2xlYXJcIlxuXG5cdFx0XHRia2dkID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRcdGhlaWdodDogQC5oZWlnaHQgKyBTY3JlZW4uaGVpZ2h0XG5cdFx0XHRcdHk6IEFsaWduLmJvdHRvbVxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBvcHRpb25zLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRzaGFkb3dZOiAwLjVcblx0XHRcdFx0c2hhZG93Qmx1cjogMFxuXHRcdFx0XHRzaGFkb3dDb2xvcjogXCJyZ2JhKDAsMCwwLDAuMjgpXCJcblx0XHRcdFx0c3R5bGU6XG5cdFx0XHRcdFx0XCItd2Via2l0LWJhY2tkcm9wLWZpbHRlclwiOiBcImJsdXIoNjBweClcIlxuXG5cdFx0XHRALmJrZ2QgPSBia2dkXG5cblx0XHRcdGNsaXBwaW5nRnJhbWUgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBALmhlaWdodFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiY2xlYXJcIlxuXHRcdFx0XHRjbGlwOiB0cnVlXG5cblx0XHRcdEAuY2xpcHBpbmdGcmFtZSA9IGNsaXBwaW5nRnJhbWVcblxuXHRcdFx0Zm9yIGkgaW4gWzAuLi5Ab3B0aW9ucy5idXR0b25Db3VudF1cblxuXHRcdFx0XHRpY29uRnJhbWUgPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRwYXJlbnQ6IGNsaXBwaW5nRnJhbWVcblx0XHRcdFx0XHRuYW1lOiBcImljb25GcmFtZVwiICsgaVxuXHRcdFx0XHRcdHdpZHRoOiAyOFxuXHRcdFx0XHRcdGhlaWdodDogMjhcblx0XHRcdFx0XHR4OiBBbGlnbi5yaWdodCgtMTEgLSAoMzkgKiBpKSlcblx0XHRcdFx0XHR5OiAyOVxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cblx0XHRcdFx0ZG8gKGkpID0+XG5cdFx0XHRcdFx0cmV2ZXJzZWRJbmRleCA9IEBvcHRpb25zLmJ1dHRvbkNvdW50IC0gMSAtIGkgIyByZXZlcnNlIHRoZSBvcmRlciBzbyB1c2VyIGNhbiBzdXBwbHkgYWN0aW9ucyBsZWZ0LXRvLXJpZ2h0XG5cdFx0XHRcdFx0aWYgQG9wdGlvbnMuYnV0dG9uQWN0aW9uc1tyZXZlcnNlZEluZGV4XSAhPSBub29wIGFuZCBAb3B0aW9ucy5idXR0b25BY3Rpb25zW3JldmVyc2VkSW5kZXhdICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0aWNvbkZyYW1lLm9uQ2xpY2sgPT5cblx0XHRcdFx0XHRcdFx0QG9wdGlvbnMuYnV0dG9uQWN0aW9uc1tyZXZlcnNlZEluZGV4XSgpXG5cblx0XHRcdFx0aWNvbiA9IG5ldyBMYXllclxuXHRcdFx0XHRcdHBhcmVudDogaWNvbkZyYW1lXG5cdFx0XHRcdFx0bmFtZTogXCJpY29uXCIgKyBpXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImNsZWFyXCJcblx0XHRcdFx0XHR3aWR0aDogQG9wdGlvbnMuYnV0dG9uU2l6ZVxuXHRcdFx0XHRcdGhlaWdodDogQG9wdGlvbnMuYnV0dG9uU2l6ZVxuXHRcdFx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0XHRcdGltYWdlOiBcImltYWdlcy8je0BvcHRpb25zLmltYWdlUHJlZml4fSN7aX0uI3tAb3B0aW9ucy5pbWFnZVN1ZmZpeH1cIlxuXG5cdFx0XHR0aXRsZUNsaXAgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBjbGlwcGluZ0ZyYW1lXG5cdFx0XHRcdHk6IGhlaWdodHMuc21hbGxcblx0XHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IGhlaWdodHNbQG9wdGlvbnMuc2l6ZV0gLSBoZWlnaHRzLnNtYWxsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdFx0XHRcdGNsaXA6IHRydWVcblxuXHRcdFx0QC50aXRsZUNsaXAgPSB0aXRsZUNsaXBcblxuXHRcdFx0dGl0bGUgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdHBhcmVudDogdGl0bGVDbGlwXG5cdFx0XHRcdHg6IG1hcmdpbnMuc2lkZVxuXHRcdFx0XHR5OiAyXG5cdFx0XHRcdGZvbnRTaXplOiAzNFxuXHRcdFx0XHRmb250V2VpZ2h0OiA3MDBcblx0XHRcdFx0Y29sb3I6IEBvcHRpb25zLnRleHRDb2xvclxuXHRcdFx0XHR0ZXh0OiBAb3B0aW9ucy50aXRsZVxuXHRcdFx0XHRvcmlnaW5YOiAwXG5cblx0XHRcdEAudGl0bGUgPSB0aXRsZVxuXG5cdFx0XHRjaGV2cm9uID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogY2xpcHBpbmdGcmFtZVxuXHRcdFx0XHR4OiA3LjVcblx0XHRcdFx0eTogMTIuNSAjIHdpbGwgYmUgYWRkZWQgdG8geToyMFxuXHRcdFx0XHR3aWR0aDogMTNcblx0XHRcdFx0aGVpZ2h0OiAyMlxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiY2xlYXJcIlxuXHRcdFx0XHRodG1sOiBjaGV2cm9uU1ZHXG5cblx0XHRcdGJhY2tMYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0cGFyZW50OiBjbGlwcGluZ0ZyYW1lXG5cdFx0XHRcdHg6IDI2XG5cdFx0XHRcdHk6IDEyICMgd2lsbCBiZSBhZGRlZCB0byB5OjIwXG5cdFx0XHRcdGNvbG9yOiBAb3B0aW9ucy5hY2NlbnRDb2xvclxuXHRcdFx0XHRmb250U2l6ZTogMTdcblx0XHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRcdHRleHQ6IFwiXCJcblxuXHRcdFx0QC5iYWNrTGFiZWwgPSBiYWNrTGFiZWxcblxuXHRcdFx0c21hbGxUaXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0cGFyZW50OiBjbGlwcGluZ0ZyYW1lXG5cdFx0XHRcdHk6IDMyXG5cdFx0XHRcdGNvbG9yOiBAb3B0aW9ucy50ZXh0Q29sb3Jcblx0XHRcdFx0Zm9udFNpemU6IDE3XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0XHR0ZXh0OiBAb3B0aW9ucy50aXRsZVxuXHRcdFx0XHRvcGFjaXR5OiBpZiBAb3B0aW9ucy5zaXplID09IFwic21hbGxcIiB0aGVuIDEgZWxzZSAwXG5cblx0XHRcdHNpemVUZXh0TGF5ZXIoc21hbGxUaXRsZSlcblx0XHRcdHNtYWxsVGl0bGUueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0c21hbGxUaXRsZS5hdXRvV2lkdGggPSB5ZXNcblxuXHRcdFx0QC5zbWFsbFRpdGxlID0gc21hbGxUaXRsZVxuXG5cdFx0XHRiYWNrQnV0dG9uID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogY2xpcHBpbmdGcmFtZVxuXHRcdFx0XHR5OiAyMFxuXHRcdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLzJcblx0XHRcdFx0aGVpZ2h0OiBoZWlnaHRzLnNtYWxsIC0gMjBcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImNsZWFyXCJcblxuXHRcdFx0YmFja0J1dHRvbi5wbGFjZUJlZm9yZShia2dkKVxuXG5cdFx0XHRALmJhY2tCdXR0b24gPSBiYWNrQnV0dG9uXG5cblx0XHRcdGNoZXZyb24ucGFyZW50ID0gYmFja0J1dHRvblxuXHRcdFx0YmFja0xhYmVsLnBhcmVudCA9IGJhY2tCdXR0b25cblxuXHRcdFx0YmFja0J1dHRvbi5zdGF0ZXMgPVxuXHRcdFx0XHRzaG93OlxuXHRcdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdFx0XHRhbmltYXRpb25PcHRpb25zOiB0aW1lOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cblx0XHRcdFx0aGlkZTpcblx0XHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczogdGltZTogZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uXG5cblx0XHRcdGJhY2tCdXR0b24uYW5pbWF0ZShcImhpZGVcIiwgaW5zdGFudDogdHJ1ZSlcblxuXHRcdFx0aWYgQG9wdGlvbnMuYmFja0FjdGlvbiAhPSBub29wXG5cdFx0XHRcdGJhY2tCdXR0b24ub25DbGljayA9PlxuXHRcdFx0XHRcdEBvcHRpb25zLmJhY2tBY3Rpb24oKVxuXG5cdFx0XHRpZiBAb3B0aW9ucy5zZWFyY2ggPT0gdHJ1ZVxuXHRcdFx0XHRzZWFyY2hCYXJDbGlwID0gbmV3IExheWVyXG5cdFx0XHRcdFx0cGFyZW50OiBjbGlwcGluZ0ZyYW1lXG5cdFx0XHRcdFx0eTogQWxpZ24uYm90dG9tXG5cdFx0XHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0XHRcdGhlaWdodDogaGVpZ2h0cy5zZWFyY2hcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiY2xlYXJcIlxuXHRcdFx0XHRcdGNsaXA6IHRydWVcblxuXHRcdFx0XHRzZWFyY2hCYXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRwYXJlbnQ6IHNlYXJjaEJhckNsaXBcblx0XHRcdFx0XHR4OiA4XG5cdFx0XHRcdFx0eTogQWxpZ24uYm90dG9tKC0xNilcblx0XHRcdFx0XHR3aWR0aDogQC53aWR0aCAtIDE2XG5cdFx0XHRcdFx0aGVpZ2h0OiAzNlxuXHRcdFx0XHRcdGJvcmRlclJhZGl1czogMTBcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBvcHRpb25zLnNlYXJjaEJhckNvbG9yXG5cblx0XHRcdFx0QC5zZWFyY2hCYXIgPSBzZWFyY2hCYXJcblxuXHRcdFx0XHRzZWFyY2hCYXIub25UYXAgLT5cblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRzZWFyY2hJY29uID0gbmV3IExheWVyXG5cdFx0XHRcdFx0cGFyZW50OiBzZWFyY2hCYXJcblx0XHRcdFx0XHR4OiAxMFxuXHRcdFx0XHRcdHk6IDExXG5cdFx0XHRcdFx0d2lkdGg6IDE0XG5cdFx0XHRcdFx0aGVpZ2h0OiAxNFxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdFx0XHRcdFx0aHRtbDogc2VhcmNoU1ZHXG5cblx0XHRcdFx0c2VhcmNoVGV4dCA9IG5ldyBMYXllclxuXHRcdFx0XHRcdHBhcmVudDogc2VhcmNoQmFyXG5cdFx0XHRcdFx0eDogc2VhcmNoSWNvbi5tYXhYICsgN1xuXHRcdFx0XHRcdHdpZHRoOiBzZWFyY2hCYXIud2lkdGggLSA1OFxuXHRcdFx0XHRcdGhlaWdodDogc2VhcmNoQmFyLmhlaWdodFxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdFx0XHRcdFx0aHRtbDogXCI8aW5wdXQgaWQ9J3NlYXJjaCcgdHlwZT0ndGV4dCcgY29udGVudGVkaXRhYmxlPSd0cnVlJyBwbGFjZWhvbGRlcj0nI3tAb3B0aW9ucy5zZWFyY2hMYWJlbH0nPlwiXG5cblx0XHRcdFx0QC5zZWFyY2hUZXh0ID0gc2VhcmNoVGV4dFxuXG5cdFx0XHRcdGlmIEBvcHRpb25zLmRpY3RhdGlvbiA9PSB0cnVlXG5cdFx0XHRcdFx0ZGljdGF0aW9uSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0XHRcdFx0cGFyZW50OiBzZWFyY2hCYXJcblx0XHRcdFx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xMClcblx0XHRcdFx0XHRcdHk6IDlcblx0XHRcdFx0XHRcdHdpZHRoOiAxMlxuXHRcdFx0XHRcdFx0aGVpZ2h0OiAxOVxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImNsZWFyXCJcblx0XHRcdFx0XHRcdGh0bWw6IGRpY3RhdGlvblNWR1xuXG5cdFx0IyBlbmQgQGxheW91dCgpXG5cblx0XHRAbGF5b3V0KClcblxuXHRcdEBzY3JvbGxXaXRoID0gKGxheWVyKSA9PiAjIHNjcm9sbGluZyBlZmZlY3RzXG5cdFx0XHRzY3JvbGwgPSBudWxsXG5cdFx0XHRtaW5OYXZCYXJIZWlnaHQgPSBoZWlnaHRzW0BvcHRpb25zLnNpemVdXG5cdFx0XHRzbWFsbE5hdkJhckhlaWdodCA9IGhlaWdodHMuc21hbGxcblx0XHRcdHNlYXJjaEJhckhlaWdodCA9IGhlaWdodHMuc2VhcmNoQmFyXG5cdFx0XHRzZWFyY2hCYXJZID0gQC5zZWFyY2hCYXI/Lnkgb3IgMFxuXHRcdFx0c2VhcmNoQmFyU2hpZnQgPSBALnNlYXJjaEJhcj8ueSAtIDE2IC0gQC5zZWFyY2hCYXI/LmhlaWdodC8yIG9yIDBcblx0XHRcdHRpdGxlTW92ZVN0YXJ0ID0gaGVpZ2h0cy5zbWFsbCAqIEBvcHRpb25zLnNlYXJjaFxuXHRcdFx0dGl0bGVIZWlnaHQgPSBoZWlnaHRzW0BvcHRpb25zLnNpemVdIC0gaGVpZ2h0cy5zbWFsbFxuXHRcdFx0ZW5mb3JjZVNjcm9sbE1hdGNoaW5nID0gZmFsc2Vcblx0XHRcdGlmIGxheWVyIGluc3RhbmNlb2YgRmxvd0NvbXBvbmVudFxuXHRcdFx0XHRzY3JvbGwgPSBsYXllci5zY3JvbGxcblx0XHRcdGVsc2UgaWYgbGF5ZXIgaW5zdGFuY2VvZiBTY3JvbGxDb21wb25lbnRcblx0XHRcdFx0c2Nyb2xsID0gbGF5ZXJcblx0XHRcdGlmIHNjcm9sbCAhPSBudWxsIGFuZCBzY3JvbGwgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdHNjcm9sbC5vbk1vdmUgPT5cbiMgXHRcdFx0XHRcdHByaW50IHNjcm9sbC5zY3JvbGxZXG5cdFx0XHRcdFx0bWF4TmF2QmFySGVpZ2h0ID0gMFxuXHRcdFx0XHRcdGlmIEAubmF2TGV2ZWwgPiAwXG5cdFx0XHRcdFx0XHRtYXhOYXZCYXJIZWlnaHQgPSBoZWlnaHRzLnNtYWxsXG5cdFx0XHRcdFx0ZWxzZSBpZiBAb3B0aW9ucy5zZWFyY2ggPT0gdHJ1ZVxuXHRcdFx0XHRcdFx0bWF4TmF2QmFySGVpZ2h0ID0gaGVpZ2h0c1tAb3B0aW9ucy5zaXplXSArIGhlaWdodHMuc2VhcmNoXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0bWF4TmF2QmFySGVpZ2h0ID0gaGVpZ2h0c1tAb3B0aW9ucy5zaXplXVxuXHRcdFx0XHRcdEAudGl0bGUuc2NhbGUgPSBVdGlscy5tb2R1bGF0ZShzY3JvbGwuc2Nyb2xsWSwgWzAsIC1zY3JvbGxUaHJlc2hvbGRzLnRpdGxlU2NhbGVUaHJlc2hvbGRdLCBbMSwgMS4xXSwgdHJ1ZSlcblx0XHRcdFx0XHQjIGNsaXBwaW5nXG5cdFx0XHRcdFx0QC5jbGlwcGluZ0ZyYW1lLmhlaWdodCA9IFV0aWxzLm1vZHVsYXRlKHNjcm9sbC5zY3JvbGxZLCBbMCwgbWluTmF2QmFySGVpZ2h0XSwgW21heE5hdkJhckhlaWdodCwgc21hbGxOYXZCYXJIZWlnaHRdLCB0cnVlKVxuXHRcdFx0XHRcdEAuY2xpcHBpbmdGcmFtZS55ID0gTWF0aC5tYXgoMCwtc2Nyb2xsLnNjcm9sbFkpXG5cdFx0XHRcdFx0QC5ia2dkLnkgPSBNYXRoLm1heCgtU2NyZWVuLmhlaWdodCwgLXNjcm9sbC5zY3JvbGxZIC0gU2NyZWVuLmhlaWdodClcblx0XHRcdFx0XHRALnRpdGxlLnkgPSBVdGlscy5tb2R1bGF0ZShzY3JvbGwuc2Nyb2xsWSwgW3RpdGxlTW92ZVN0YXJ0LCBtaW5OYXZCYXJIZWlnaHRdLCBbMiwgLXRpdGxlSGVpZ2h0XSwgdHJ1ZSlcblx0XHRcdFx0XHRALmJrZ2QuaGVpZ2h0ID0gVXRpbHMubW9kdWxhdGUoc2Nyb2xsLnNjcm9sbFksIFswLCBtaW5OYXZCYXJIZWlnaHRdLCBbbWF4TmF2QmFySGVpZ2h0LCBzbWFsbE5hdkJhckhlaWdodF0sIHRydWUpICsgU2NyZWVuLmhlaWdodFxuXHRcdFx0XHRcdEAuc2VhcmNoQmFyPy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoc2Nyb2xsLnNjcm9sbFksIFswLCBzbWFsbE5hdkJhckhlaWdodF0sIFsxLDBdLCB0cnVlKVxuXHRcdFx0XHRcdEAuc2VhcmNoQmFyPy55ID0gVXRpbHMubW9kdWxhdGUoc2Nyb2xsLnNjcm9sbFksIFswLCBzbWFsbE5hdkJhckhlaWdodF0sIFtzZWFyY2hCYXJZLCBzZWFyY2hCYXJTaGlmdF0sIHRydWUpXG5cdFx0XHRcdFx0aWYgQG9wdGlvbnMuc2l6ZSA9PSBcImxhcmdlXCIgYW5kIEAubmF2TGV2ZWwgPT0gMFxuXHRcdFx0XHRcdFx0QC5zbWFsbFRpdGxlLm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShALnRpdGxlLnksIFsyIC0gdGl0bGVIZWlnaHQvMiwgLXRpdGxlSGVpZ2h0XSwgWzAsIDFdLCB0cnVlKVxuXG5cdFx0IyBlbmQgQHNjcm9sbFdpdGgoKVxuXG5cdFx0cmVzZXRUaXRsZSA9ICgpID0+XG5cdFx0XHRpZiBALm5hdkxldmVsID09IDFcblx0XHRcdFx0QC5ia2dkLmhlaWdodCA9IEAuaGVpZ2h0ICsgU2NyZWVuLmhlaWdodFxuXHRcdFx0XHRALmJrZ2QueSA9IEFsaWduLmJvdHRvbVxuXHRcdFx0XHRALnRpdGxlLnNjYWxlID0gMVxuXHRcdFx0XHRALnRpdGxlLnkgPSAyXG5cdFx0XHRcdCNALnNlYXJjaEJhci55ID0gQWxpZ24uYm90dG9tKC0xNilcblx0XHRcdFx0I0Auc2VhcmNoQmFyLm9wYWNpdHkgPSAxXG5cdFx0XHRcdEAuY2xpcHBpbmdGcmFtZS5oZWlnaHQgPSBALmhlaWdodFxuXHRcdFx0XHRALmNsaXBwaW5nRnJhbWUueSA9IDBcblxuXHRcdCMgZW5kIHJlc2V0VGl0bGUoKVxuXG5cdFx0YW5pbWF0ZVRvTmV4dFRpdGxlID0gKG5ld1RpdGxlID0gXCJcIiwgb2xkVGl0bGUgPSBcIlwiLCB0aXRsZUxheWVyID0gQC50aXRsZSkgPT5cblx0XHRcdEAuc21hbGxUaXRsZS5vcGFjaXR5ID0gMFxuXHRcdFx0QC50aXRsZS5vcGFjaXR5ID0gMFxuXHRcdFx0QC5iYWNrTGFiZWwub3BhY2l0eSA9IDBcblx0XHRcdHRpdGxlTGF5ZXIub3BhY2l0eSA9IDBcblx0XHRcdHRlbXBMYWJlbCA9IHRpdGxlTGF5ZXIuY29weSgpXG5cdFx0XHR0ZW1wTGFiZWwub3BhY2l0eSA9IDFcblx0XHRcdHRlbXBMYWJlbC5zY3JlZW5GcmFtZSA9IHRpdGxlTGF5ZXIuc2NyZWVuRnJhbWVcblx0XHRcdHRlbXBMYWJlbC5wYXJlbnQgPSBALmNsaXBwaW5nRnJhbWVcblx0XHRcdHRlbXBMYWJlbC54ID0gdGl0bGVMYXllci5zY3JlZW5GcmFtZS54XG5cdFx0XHR0ZW1wTGFiZWwueSA9IHRpdGxlTGF5ZXIuc2NyZWVuRnJhbWUueVxuXHRcdFx0dGVtcExhYmVsLnRleHQgPSBvbGRUaXRsZVxuXHRcdFx0dGVtcExhYmVsLmFuaW1hdGVcblx0XHRcdFx0eDogQC5iYWNrTGFiZWwuc2NyZWVuRnJhbWUueFxuXHRcdFx0XHR5OiBALmJhY2tMYWJlbC5zY3JlZW5GcmFtZS55XG5cdFx0XHRcdGNvbG9yOiBAb3B0aW9ucy5hY2NlbnRDb2xvclxuXHRcdFx0XHRmb250U2l6ZTogMTdcblx0XHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRcdG9wdGlvbnM6IHRpbWU6IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvblxuXHRcdFx0QC5iYWNrTGFiZWwuYW5pbWF0ZVxuXHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdG9wdGlvbnM6IHRpbWU6IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvbiAtIDAuMDUgIyBvdGhlcndpc2Ugd2lsbCBzdGlsbCBiZSBhbmltYXRpbmcgaW4gbmV4dCBzdGVwXG5cdFx0XHRALnNtYWxsVGl0bGUudGV4dCA9IG5ld1RpdGxlXG5cdFx0XHRALnNtYWxsVGl0bGUuYW5pbWF0ZVxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRcdG9wdGlvbnM6IHRpbWU6IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvblxuXHRcdFx0dGVtcExhYmVsLm9uQW5pbWF0aW9uRW5kID0+XG5cdFx0XHRcdEAuYmFja0xhYmVsLnRleHQgPSBvbGRUaXRsZVxuXHRcdFx0XHRALmJhY2tMYWJlbC53aWR0aCA9IFNjcmVlbi53aWR0aCAtIG1hcmdpbnMuc2lkZSAqIDJcblx0XHRcdFx0QC5iYWNrTGFiZWwub3BhY2l0eSA9IDFcblx0XHRcdFx0VXRpbHMuZGVsYXkgZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uLCA9PlxuXHRcdFx0XHRcdHRlbXBMYWJlbC5kZXN0cm95KClcblxuXHRcdCMgZW5kIGFuaW1hdGVUb05leHRUaXRsZSgpXG5cblx0XHRhbmltYXRlVG9QcmV2aW91c1RpdGxlID0gKHByZXZCYWNrTGFiZWwgPSBcIlwiLCBjdXJyZW50QmFja0xhYmVsID0gXCJcIiwgdGl0bGVMYXllciA9IEAudGl0bGUpID0+XG5cdFx0XHRyZXNldFRpdGxlKClcblx0XHRcdEAudGl0bGUub3BhY2l0eSA9IDBcblx0XHRcdEAuc21hbGxUaXRsZS5vcGFjaXR5ID0gMFxuXHRcdFx0QC5iYWNrTGFiZWwub3BhY2l0eSA9IDBcblx0XHRcdHRlbXBUaXRsZSA9IEAuYmFja0xhYmVsLmNvcHkoKVxuXHRcdFx0dGVtcFRpdGxlLm9wYWNpdHkgPSAxXG5cdFx0XHR0ZW1wVGl0bGUuc2NyZWVuRnJhbWUgPSBALmJhY2tMYWJlbC5zY3JlZW5GcmFtZVxuXHRcdFx0dGVtcFRpdGxlLnBhcmVudCA9IEAuY2xpcHBpbmdGcmFtZVxuXHRcdFx0dGVtcFRpdGxlLmFuaW1hdGVcblx0XHRcdFx0eDogdGl0bGVMYXllci5zY3JlZW5GcmFtZS54XG5cdFx0XHRcdHk6IHRpdGxlTGF5ZXIuc2NyZWVuRnJhbWUueVxuXHRcdFx0XHRjb2xvcjogQG9wdGlvbnMudGV4dENvbG9yXG5cdFx0XHRcdGZvbnRTaXplOiB0aXRsZUxheWVyLmZvbnRTaXplXG5cdFx0XHRcdGZvbnRXZWlnaHQ6IHRpdGxlTGF5ZXIuZm9udFdlaWdodFxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRcdG9wdGlvbnM6IHRpbWU6IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvblxuXHRcdFx0QC5iYWNrTGFiZWwudGV4dCA9IHByZXZCYWNrTGFiZWxcblx0XHRcdEAuYmFja0xhYmVsLmFuaW1hdGVcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRvcHRpb25zOiB0aW1lOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cblx0XHRcdHRlbXBUaXRsZS5vbkFuaW1hdGlvbkVuZCA9PlxuXHRcdFx0XHRALnRpdGxlLnRleHQgPSBjdXJyZW50QmFja0xhYmVsXG5cdFx0XHRcdEAuc21hbGxUaXRsZS50ZXh0ID0gY3VycmVudEJhY2tMYWJlbFxuXHRcdFx0XHR0aXRsZUxheWVyLm9wYWNpdHkgPSAxXG5cdFx0XHRcdFV0aWxzLmRlbGF5IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvbiwgPT5cblx0XHRcdFx0XHR0ZW1wVGl0bGUuZGVzdHJveSgpXG5cblx0XHQjIGVuZCBhbmltYXRlVG9QcmV2aW91c1RpdGxlKClcblxuXHRcdEBzaG93TmV4dCA9IFV0aWxzLnRocm90dGxlIDAuNSwgKG5ld1RpdGxlID0gXCJOZXcgVGl0bGVcIikgPT5cblx0XHRcdEAuaGlzdG9yeS5zcGxpY2UoQC5uYXZMZXZlbCArIDEsIDEsIG5ld1RpdGxlKVxuXHRcdFx0aWYgQC5uYXZMZXZlbCA9PSAwIGFuZCBAb3B0aW9ucy5zaXplID09IFwibGFyZ2VcIlxuXHRcdFx0XHRhbmltYXRlVG9OZXh0VGl0bGUobmV3VGl0bGUsIEAuaGlzdG9yeVtALm5hdkxldmVsXSwgQC50aXRsZSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0YW5pbWF0ZVRvTmV4dFRpdGxlKG5ld1RpdGxlLCBALmhpc3RvcnlbQC5uYXZMZXZlbF0sIEAuc21hbGxUaXRsZSlcblx0XHRcdEAuY2xpcHBpbmdGcmFtZS5hbmltYXRlXG5cdFx0XHRcdGhlaWdodDogaGVpZ2h0cy5zbWFsbFxuXHRcdFx0XHRvcHRpb25zOiB0aW1lOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cblx0XHRcdEAuYmtnZC5hbmltYXRlXG5cdFx0XHRcdGhlaWdodDogaGVpZ2h0cy5zbWFsbCArIFNjcmVlbi5oZWlnaHRcblx0XHRcdFx0b3B0aW9uczogdGltZTogZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uXG5cdFx0XHQrK0AubmF2TGV2ZWxcblx0XHRcdGRpc3BsYXlCYWNrQnV0dG9uKClcblxuXHRcdCMgZW5kIEBzaG93TmV4dCgpXG5cblx0XHRAc2hvd1ByZXZpb3VzID0gVXRpbHMudGhyb3R0bGUgMC41LCAoKSA9PlxuXHRcdFx0aWYgQC5uYXZMZXZlbCA+IDBcblx0XHRcdFx0aWYgQC5uYXZMZXZlbCA9PSAxIGFuZCBAb3B0aW9ucy5zaXplID09IFwibGFyZ2VcIlxuXHRcdFx0XHRcdGFuaW1hdGVUb1ByZXZpb3VzVGl0bGUoQC5oaXN0b3J5W0AubmF2TGV2ZWwgLSAyXSwgQC5oaXN0b3J5W0AubmF2TGV2ZWwgLSAxXSwgQC50aXRsZSlcblx0XHRcdFx0XHRALmNsaXBwaW5nRnJhbWUuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0aGVpZ2h0OiBoZWlnaHRzW0BvcHRpb25zLnNpemVdICsgQG9wdGlvbnMuc2VhcmNoICogaGVpZ2h0cy5zZWFyY2hcblx0XHRcdFx0XHRcdG9wdGlvbnM6IHRpbWU6IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvblxuXHRcdFx0XHRcdEAuYmtnZC5hbmltYXRlXG5cdFx0XHRcdFx0XHRoZWlnaHQ6IGhlaWdodHNbQG9wdGlvbnMuc2l6ZV0gKyBTY3JlZW4uaGVpZ2h0ICsgQG9wdGlvbnMuc2VhcmNoICogaGVpZ2h0cy5zZWFyY2hcblx0XHRcdFx0XHRcdG9wdGlvbnM6IHRpbWU6IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0YW5pbWF0ZVRvUHJldmlvdXNUaXRsZShALmhpc3RvcnlbQC5uYXZMZXZlbCAtIDJdLCBALmhpc3RvcnlbQC5uYXZMZXZlbCAtIDFdLCBALnNtYWxsVGl0bGUpXG5cdFx0XHRcdEAubmF2TGV2ZWwgPSBNYXRoLm1heCgwLCBALm5hdkxldmVsIC0gMSlcblx0XHRcdFx0ZGlzcGxheUJhY2tCdXR0b24oKVxuXG5cdFx0IyBlbmQgQHNob3dQcmV2aW91cygpXG5cblx0XHRkaXNwbGF5QmFja0J1dHRvbiA9ICgpID0+XG5cdFx0XHRpZiBALm5hdkxldmVsID09IDBcblx0XHRcdFx0QC5iYWNrQnV0dG9uLmFuaW1hdGUoXCJoaWRlXCIpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEAuYmFja0J1dHRvbi5hbmltYXRlKFwic2hvd1wiKVxuXG5cdFx0IyBlbmQgZGlzcGxheUJhY2tCdXR0b24oKVxuXG5cdFx0IyBIYW5kbGUgb3JpZW50YXRpb24gc3dpdGNoXG5cdFx0IyBDaGVjayB3aGV0aGVyIHRoZSBkZXZpY2UgaXMgbW9iaWxlIG9yIG5vdCAodmVyc3VzIEZyYW1lcilcblx0XHRpZiBVdGlscy5pc01vYmlsZSgpXG5cdFx0XHQjIEFkZCBldmVudCBsaXN0ZW5lciBvbiBvcmllbnRhdGlvbiBjaGFuZ2Vcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwib3JpZW50YXRpb25jaGFuZ2VcIiwgPT5cblx0XHRcdFx0QGxheW91dCgpXG5cdFx0ZWxzZVxuXHRcdFx0IyBMaXN0ZW4gZm9yIG9yaWVudGF0aW9uIGNoYW5nZXMgb24gdGhlIGRldmljZSB2aWV3XG5cdFx0XHRGcmFtZXIuRGV2aWNlLm9uIFwiY2hhbmdlOm9yaWVudGF0aW9uXCIsID0+XG5cdFx0XHRcdEBsYXlvdXQoKVxuXG5cdEBkZWZpbmUgJ3NlYXJjaCcsIGdldDogKCkgLT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaCcpLnZhbHVlXG5tb2R1bGUuZXhwb3J0cyA9IE5hdmJhckNvbXBvbmVudFxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7O0FEQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQSx5QkFBQTtFQUFBOzs7QUFnREEsUUFBQSxHQUNDO0VBQUEsV0FBQSxFQUFhLENBQWI7RUFDQSxLQUFBLEVBQU8sYUFEUDtFQUVBLFdBQUEsRUFBYSxRQUZiO0VBR0EsS0FBQSxFQUFPLE9BSFA7RUFJQSxJQUFBLEVBQU0sT0FKTjtFQUtBLE1BQUEsRUFBUSxLQUxSO0VBTUEsU0FBQSxFQUFXLEtBTlg7RUFPQSxTQUFBLEVBQVcsRUFQWDtFQVFBLGVBQUEsRUFBaUIsRUFSakI7RUFT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
