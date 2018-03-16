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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9OYXZiYXJDb21wb25lbnQuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiIyMjXG5cdCMgVVNJTkcgTkFWQkFSQ09NUE9ORU5UXG5cblx0IyBSZXF1aXJlIHRoZSBtb2R1bGVcblx0TmF2YmFyQ29tcG9uZW50ID0gcmVxdWlyZSBcIk5hdmJhckNvbXBvbmVudFwiXG5cblx0bXlOYXZiYXIgPSBuZXcgTmF2YmFyQ29tcG9uZW50XG5cdFx0IyBHZW5lcmFsXG5cdFx0c3R5bGU6IDxzdHJpbmc+IChcImxpZ2h0XCIgfHwgXCJkYXJrXCIpXG5cdFx0c2l6ZTogPHN0cmluZz4gKFwibGFyZ2VcIiB8fCBcInNtYWxsXCIpXG5cdFx0dGl0bGU6IDxzdHJpbmc+XG5cblx0XHQjIEJ1dHRvbnNcblx0XHRidXR0b25Db3VudDogPG51bWJlcj5cblx0XHRidXR0b25TaXplOiA8bnVtYmVyPlxuXHRcdGJ1dHRvbkFjdGlvbnM6IDxhcnJheSBvZiBhY3Rpb25zPlxuXHRcdGltYWdlUHJlZml4OiA8c3RyaW5nPlxuXHRcdGltYWdlU3VmZml4OiA8c3RyaW5nPlxuXHRcdGJhY2tBY3Rpb246IDxhY3Rpb24+XG5cblx0XHQjIFNlYXJjaCBiYXJcblx0XHRzZWFyY2hMYWJlbDogPHN0cmluZz5cblx0XHRzZWFyY2g6IDxib29sZWFuPlxuXHRcdGRpY3RhdGlvbjogPGJvb2xlYW4+XG5cblx0XHQjIENvbG9yc1xuXHRcdHRleHRDb2xvcjogPHN0cmluZz4gKGhleCBvciByZ2JhKVxuXHRcdGJhY2tncm91bmRDb2xvcjogPHN0cmluZz4gKGhleCBvciByZ2JhKVxuXHRcdHNlYXJjaEJhckNvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0c2VhcmNoSWNvbkNvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0YWNjZW50Q29sb3I6IDxzdHJpbmc+IChoZXggb3IgcmdiYSlcblxuXHQjIEF0dGFjaCB0byBhIEZsb3dDb21wb25lbnQgb3IgU2Nyb2xsQ29tcG9uZW50XG5cdG15TmF2YmFyLnNjcm9sbFdpdGgobGF5ZXIpXG5cblx0IyBOYXZpZ2F0ZSB0byBuZXh0IHRpdGxlXG5cdG15TmF2YmFyLnNob3dOZXh0KDxzdHJpbmc+KVxuXG5cdCMgTmF2aWdhdGUgdG8gcHJldmlvdXMgdGl0bGVcblx0bXlOYXZiYXIuc2hvd1ByZXZpb3VzKClcblxuXHQjIEN1cnJlbnQgc2VhcmNoIGZpZWxkIHZhbHVlXG5cdG15TmF2YmFyLnNlYXJjaFxuXG5cdCMgSW5zcGVjdCB0aGUgc3RvcmVkIHRpdGxlc1xuXHRteU5hdmJhci5oaXN0b3J5XG4jIyNcblxuZGVmYXVsdHMgPVxuXHRidXR0b25Db3VudDogMFxuXHR0aXRsZTogXCJMYXJnZSBUaXRsZVwiXG5cdHNlYXJjaExhYmVsOiBcIlNlYXJjaFwiXG5cdHN0eWxlOiBcImxpZ2h0XCJcblx0c2l6ZTogXCJsYXJnZVwiXG5cdHNlYXJjaDogZmFsc2Vcblx0ZGljdGF0aW9uOiBmYWxzZVxuXHR0ZXh0Q29sb3I6IFwiXCJcblx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdHNlYXJjaEJhckNvbG9yOiBcIlwiXG5cdHNlYXJjaEljb25Db2xvcjogXCIjOEU4RTkzXCJcblx0YnV0dG9uU2l6ZTogMjRcblx0YWNjZW50Q29sb3I6IFwiIzAwN0FGRlwiXG5cdGltYWdlUHJlZml4OiBcIlwiXG5cdGltYWdlU3VmZml4OiBcInBuZ1wiXG5cdGJ1dHRvbkFjdGlvbnM6IFtdXG5cdGJhY2tBY3Rpb246ICgpIC0+XG5cbiMgTmF2YmFyQ29tcG9uZW50IGNsYXNzXG5jbGFzcyBOYXZiYXJDb21wb25lbnQgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zID0gXy5hc3NpZ24oe30sIGRlZmF1bHRzLCBAb3B0aW9ucylcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0bm9vcCA9ICgpIC0+XG5cdFx0QC5oaXN0b3J5ID0gW0BvcHRpb25zLnRpdGxlXVxuXHRcdEAubmF2TGV2ZWwgPSAwXG5cdFx0ZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uID0gMC4yNVxuXG5cdFx0c2l6ZVRleHRMYXllciA9IChsYXllcikgLT5cblx0XHRcdHN0eWxlID0gXy5waWNrKGxheWVyLnN0eWxlLCBUZXh0TGF5ZXIuX3RleHRQcm9wZXJ0aWVzKVxuXHRcdFx0dGV4dFdpZHRoID0gTWF0aC5jZWlsKFV0aWxzLnRleHRTaXplKGxheWVyLnRleHQsIHN0eWxlKS53aWR0aClcblx0XHRcdHJhdGlvID0gaWYgXy5pbmNsdWRlcyhGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUsIFwicGx1c1wiKSB0aGVuIDMgZWxzZSAyXG5cdFx0XHRsYXllci53aWR0aCA9IHRleHRXaWR0aC9yYXRpb1xuXG5cdFx0IyBoZWlnaHRzIGJ5IHNpemVcblx0XHRoZWlnaHRzID1cblx0XHRcdHNtYWxsOiA2NFxuXHRcdFx0bGFyZ2U6IDExNlxuXHRcdFx0c2VhcmNoOiA1NCAjIGFkZGl0aXZlXG5cblx0XHQjIHNjcm9sbCB0aHJlc2hvbGRzIGZvciB0cmlnZ2VyaW5nIG5hdmJhciBjaGFuZ2VzXG5cdFx0c2Nyb2xsVGhyZXNob2xkcyA9XG5cdFx0XHR0aXRsZVNjYWxlVGhyZXNob2xkOiA3MFxuXG5cdFx0bWFyZ2lucyA9XG5cdFx0XHRzaWRlOiAxNFxuXG5cdFx0IyBTVkdcblx0XHRjaGV2cm9uU1ZHID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBvbHlnb24gcG9pbnRzPScwIDEwLjUgMTAuNSAwIDEyLjUgMiA0IDEwLjUgMTIuNSAxOSAxMC41IDIxJyBmaWxsPScje0BvcHRpb25zLmFjY2VudENvbG9yfScgLz48L3N2Zz5cIlxuXG5cdFx0c2VhcmNoU1ZHID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nbTEzLjc0MzA5LDEyLjU3NDA2bC0zLjgzMywtMy44MzQ1YzAuNjg3MDgsLTAuOTM3MSAxLjA1NTE0LC0yLjA3MDAzIDEuMDUsLTMuMjMyYy0wLjAxMzExLC0zLjAzMzE1IC0yLjQ2NjM3LC01LjQ4OTk5IC01LjQ5OTUsLTUuNTA3NWMtMS40NTE1MiwtMC4wMDY1NyAtMi44NDUzNywwLjU2NzY1IC0zLjg3MTA2LDEuNTk0NzVjLTEuMDI1NjgsMS4wMjcwOSAtMS41OTc5OSwyLjQyMTc0IC0xLjU4OTQ0LDMuODczMjVjMC4wMTMxMSwzLjAzMzQyIDIuNDY2NjEsNS40OTA0OCA1LjUsNS41MDhjMS4xNjY3MSwwLjAwNTA1IDIuMzAzNzgsLTAuMzY3MyAzLjI0MTUsLTEuMDYxNWwwLjAwNCwtMC4wMDNsMy44Mjk1LDMuODMxNWMwLjIwNzA1LDAuMjE3MjEgMC41MTU1NywwLjMwNTEzIDAuODA2MDIsMC4yMjk3YzAuMjkwNDUsLTAuMDc1NDQgMC41MTcxOSwtMC4zMDIzNyAwLjU5MjM4LC0wLjU5Mjg5YzAuMDc1MTgsLTAuMjkwNTEgLTAuMDEzLC0wLjU5ODk1IC0wLjIzMDQsLTAuODA1ODFsMCwwem0tOC4yNDcsLTIuNjk2Yy0yLjQyNjU4LC0wLjAxMzk2IC00LjM4OTM0LC0xLjk3OTQgLTQuNCwtNC40MDZjLTAuMDA2NTQsLTEuMTYxMDYgMC40NTEzNCwtMi4yNzY1NSAxLjI3MTczLC0zLjA5ODE3YzAuODIwNCwtMC44MjE2MSAxLjkzNTIxLC0xLjI4MTE2IDMuMDk2MjcsLTEuMjc2MzNjMi40MjY1OSwwLjAxMzk1IDQuMzg5MzUsMS45NzkzOSA0LjQsNC40MDZjMC4wMDY1NSwxLjE2MTA1IC0wLjQ1MTMzLDIuMjc2NTUgLTEuMjcxNzMsMy4wOTgxNmMtMC44MjAzOSwwLjgyMTYxIC0xLjkzNTIsMS4yODExNiAtMy4wOTYyNywxLjI3NjM0eicgZmlsbD0nI3tAb3B0aW9ucy5zZWFyY2hJY29uQ29sb3J9JyAvPjwvc3ZnPlwiXG5cblx0XHRkaWN0YXRpb25TVkcgPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNNiwwIEw2LDAgQzcuNjU2ODU0MjUsMCA5LDEuMzQzMTQ1NzUgOSwzIEw5LDEwIEM5LDExLjY1Njg1NDIgNy42NTY4NTQyNSwxMyA2LDEzIEw2LDEzIEM0LjM0MzE0NTc1LDEzIDMsMTEuNjU2ODU0MiAzLDEwIEwzLDMgQzMsMS4zNDMxNDU3NSA0LjM0MzE0NTc1LDAgNiwwIFogTTExLjI1LDYuNSBDMTAuODM1Nzg2NCw2LjUgMTAuNSw2LjgzNTc4NjQ0IDEwLjUsNy4yNSBMMTAuNSwxMCBDMTAuNSwxMi40ODUyODE0IDguNDg1MjgxMzcsMTQuNSA2LDE0LjUgQzMuNTE0NzE4NjMsMTQuNSAxLjUsMTIuNDg1MjgxNCAxLjUsMTAgTDEuNSw3LjI1IEMxLjUsNi44MzU3ODY0NCAxLjE2NDIxMzU2LDYuNSAwLjc1LDYuNSBDMC4zMzU3ODY0MzgsNi41IDAsNi44MzU3ODY0NCAwLDcuMjUgTDAsMTAgQzAuMDAxNDgxMzQ0MzcsMTMuMDIyNTk1NSAyLjI1MTExMTA1LDE1LjU3MjE3NTkgNS4yNSwxNS45NSBMNS4yNSwxNy41IEwzLjI1LDE3LjUgQzIuODM1Nzg2NDQsMTcuNSAyLjUsMTcuODM1Nzg2NCAyLjUsMTguMjUgQzIuNSwxOC42NjQyMTM2IDIuODM1Nzg2NDQsMTkgMy4yNSwxOSBMOC43NSwxOSBDOS4xNjQyMTM1NiwxOSA5LjUsMTguNjY0MjEzNiA5LjUsMTguMjUgQzkuNSwxNy44MzU3ODY0IDkuMTY0MjEzNTYsMTcuNSA4Ljc1LDE3LjUgTDYuNzUsMTcuNSBMNi43NSwxNS45NSBDOS43NDg4ODg5NSwxNS41NzIxNzU5IDExLjk5ODUxODcsMTMuMDIyNTk1NSAxMiwxMCBMMTIsNy4yNSBDMTIsNi44MzU3ODY0NCAxMS42NjQyMTM2LDYuNSAxMS4yNSw2LjUgTDExLjI1LDYuNSBaJyBmaWxsPScje0BvcHRpb25zLnNlYXJjaEljb25Db2xvcn0nIC8+PC9zdmc+XCJcblxuXHRcdCMgc2V0IGRlZmF1bHQgY29sb3JzIHBlciBzdHlsZVxuXHRcdGlmIEBvcHRpb25zLnRleHRDb2xvciA9PSBcIlwiXG5cdFx0XHRAb3B0aW9ucy50ZXh0Q29sb3IgPSBzd2l0Y2ggQG9wdGlvbnMuc3R5bGVcblx0XHRcdFx0d2hlbiBcImRhcmtcIiB0aGVuIFwid2hpdGVcIlxuXHRcdFx0XHRlbHNlIFwiYmxhY2tcIlxuXG5cdFx0aWYgQG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID09IFwiXCJcblx0XHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IHN3aXRjaCBAb3B0aW9ucy5zdHlsZVxuXHRcdFx0XHR3aGVuIFwiZGFya1wiIHRoZW4gXCJoc2xhKDAsIDAlLCAxMSUsIDAuNzIpXCJcblx0XHRcdFx0ZWxzZSBcImhzbGEoMCwgMCUsIDk3JSwgMC44MilcIlxuXG5cdFx0aWYgQG9wdGlvbnMuc2VhcmNoQmFyQ29sb3IgPT0gXCJcIlxuXHRcdFx0QG9wdGlvbnMuc2VhcmNoQmFyQ29sb3IgPSBzd2l0Y2ggQG9wdGlvbnMuc3R5bGVcblx0XHRcdFx0d2hlbiBcImRhcmtcIiB0aGVuIFwiaHNsYSgyNDAsIDIlLCA1NyUsIDAuMTQpXCJcblx0XHRcdFx0ZWxzZSBcImhzbGEoMjQwLCAyJSwgNTclLCAwLjEyKVwiXG5cblx0XHRpbnB1dENTUyA9IFwiXCJcIlxuXHRcdGlucHV0W3R5cGU9J3RleHQnXSB7XG5cdFx0ICBhcHBlYXJhbmNlOiBub25lO1xuXHRcdCAgY29sb3I6ICN7QG9wdGlvbnMudGV4dENvbG9yfTtcblx0XHQgIGJvcmRlcjogbm9uZTtcblx0XHQgIG91dGxpbmU6IG5vbmU7XG5cdFx0ICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0XHQgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuXHRcdCAgZm9udC13ZWlnaHQ6IDUwMDtcblx0XHQgIHRleHQtYWxpZ246IGxlZnQ7XG5cdFx0ICBmb250LXNpemU6IDE3cHg7XG5cdFx0ICBtYXJnaW46IDA7XG5cdFx0ICBwYWRkaW5nOiAwO1xuXHRcdCAgd2lkdGg6IDEwMHB4O1xuXHRcdCAgaGVpZ2h0OiAzNnB4O1xuXHRcdCAgcG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdCAgdG9wOiAwO1xuXHRcdH1cIlwiXCJcblxuXHRcdFV0aWxzLmluc2VydENTUyhpbnB1dENTUylcblxuXHRcdEBsYXlvdXQgPSAoKSA9PlxuXHRcdFx0Zm9yIGxheWVyIGluIEAuY2hpbGRyZW5cblx0XHRcdFx0bGF5ZXIuZGVzdHJveSgpXG5cblx0XHRcdEAud2lkdGggPSBTY3JlZW4ud2lkdGhcblx0XHRcdEAuaGVpZ2h0ID0gaGVpZ2h0c1tAb3B0aW9ucy5zaXplXSArIEBvcHRpb25zLnNlYXJjaCAqIGhlaWdodHMuc2VhcmNoXG5cdFx0XHRALmJhY2tncm91bmRDb2xvciA9IFwiY2xlYXJcIlxuXG5cdFx0XHRia2dkID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRcdGhlaWdodDogQC5oZWlnaHQgKyBTY3JlZW4uaGVpZ2h0XG5cdFx0XHRcdHk6IEFsaWduLmJvdHRvbVxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBvcHRpb25zLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRzaGFkb3dZOiAwLjVcblx0XHRcdFx0c2hhZG93Qmx1cjogMFxuXHRcdFx0XHRzaGFkb3dDb2xvcjogXCJyZ2JhKDAsMCwwLDAuMjgpXCJcblx0XHRcdFx0c3R5bGU6XG5cdFx0XHRcdFx0XCItd2Via2l0LWJhY2tkcm9wLWZpbHRlclwiOiBcImJsdXIoNjBweClcIlxuXG5cdFx0XHRALmJrZ2QgPSBia2dkXG5cblx0XHRcdGNsaXBwaW5nRnJhbWUgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBALmhlaWdodFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiY2xlYXJcIlxuXHRcdFx0XHRjbGlwOiB0cnVlXG5cblx0XHRcdEAuY2xpcHBpbmdGcmFtZSA9IGNsaXBwaW5nRnJhbWVcblxuXHRcdFx0Zm9yIGkgaW4gWzAuLi5Ab3B0aW9ucy5idXR0b25Db3VudF1cblxuXHRcdFx0XHRpY29uRnJhbWUgPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRwYXJlbnQ6IGNsaXBwaW5nRnJhbWVcblx0XHRcdFx0XHRuYW1lOiBcImljb25GcmFtZVwiICsgaVxuXHRcdFx0XHRcdHdpZHRoOiAyOFxuXHRcdFx0XHRcdGhlaWdodDogMjhcblx0XHRcdFx0XHR4OiBBbGlnbi5yaWdodCgtMTEgLSAoMzkgKiBpKSlcblx0XHRcdFx0XHR5OiAyOVxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cblx0XHRcdFx0ZG8gKGkpID0+XG5cdFx0XHRcdFx0cmV2ZXJzZWRJbmRleCA9IEBvcHRpb25zLmJ1dHRvbkNvdW50IC0gMSAtIGkgIyByZXZlcnNlIHRoZSBvcmRlciBzbyB1c2VyIGNhbiBzdXBwbHkgYWN0aW9ucyBsZWZ0LXRvLXJpZ2h0XG5cdFx0XHRcdFx0aWYgQG9wdGlvbnMuYnV0dG9uQWN0aW9uc1tyZXZlcnNlZEluZGV4XSAhPSBub29wIGFuZCBAb3B0aW9ucy5idXR0b25BY3Rpb25zW3JldmVyc2VkSW5kZXhdICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0aWNvbkZyYW1lLm9uQ2xpY2sgPT5cblx0XHRcdFx0XHRcdFx0QG9wdGlvbnMuYnV0dG9uQWN0aW9uc1tyZXZlcnNlZEluZGV4XSgpXG5cblx0XHRcdFx0aWNvbiA9IG5ldyBMYXllclxuXHRcdFx0XHRcdHBhcmVudDogaWNvbkZyYW1lXG5cdFx0XHRcdFx0bmFtZTogXCJpY29uXCIgKyBpXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImNsZWFyXCJcblx0XHRcdFx0XHR3aWR0aDogQG9wdGlvbnMuYnV0dG9uU2l6ZVxuXHRcdFx0XHRcdGhlaWdodDogQG9wdGlvbnMuYnV0dG9uU2l6ZVxuXHRcdFx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0XHRcdGltYWdlOiBcImltYWdlcy8je0BvcHRpb25zLmltYWdlUHJlZml4fSN7aX0uI3tAb3B0aW9ucy5pbWFnZVN1ZmZpeH1cIlxuXG5cdFx0XHR0aXRsZUNsaXAgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBjbGlwcGluZ0ZyYW1lXG5cdFx0XHRcdHk6IGhlaWdodHMuc21hbGxcblx0XHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IGhlaWdodHNbQG9wdGlvbnMuc2l6ZV0gLSBoZWlnaHRzLnNtYWxsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdFx0XHRcdGNsaXA6IHRydWVcblxuXHRcdFx0QC50aXRsZUNsaXAgPSB0aXRsZUNsaXBcblxuXHRcdFx0dGl0bGUgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdHBhcmVudDogdGl0bGVDbGlwXG5cdFx0XHRcdHg6IG1hcmdpbnMuc2lkZVxuXHRcdFx0XHR5OiAyXG5cdFx0XHRcdGZvbnRTaXplOiAzNFxuXHRcdFx0XHRmb250V2VpZ2h0OiA3MDBcblx0XHRcdFx0Y29sb3I6IEBvcHRpb25zLnRleHRDb2xvclxuXHRcdFx0XHR0ZXh0OiBAb3B0aW9ucy50aXRsZVxuXHRcdFx0XHRvcmlnaW5YOiAwXG5cblx0XHRcdEAudGl0bGUgPSB0aXRsZVxuXG5cdFx0XHRjaGV2cm9uID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogY2xpcHBpbmdGcmFtZVxuXHRcdFx0XHR4OiA3LjVcblx0XHRcdFx0eTogMTIuNSAjIHdpbGwgYmUgYWRkZWQgdG8geToyMFxuXHRcdFx0XHR3aWR0aDogMTNcblx0XHRcdFx0aGVpZ2h0OiAyMlxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiY2xlYXJcIlxuXHRcdFx0XHRodG1sOiBjaGV2cm9uU1ZHXG5cblx0XHRcdGJhY2tMYWJlbCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0cGFyZW50OiBjbGlwcGluZ0ZyYW1lXG5cdFx0XHRcdHg6IDI2XG5cdFx0XHRcdHk6IDEyICMgd2lsbCBiZSBhZGRlZCB0byB5OjIwXG5cdFx0XHRcdGNvbG9yOiBAb3B0aW9ucy5hY2NlbnRDb2xvclxuXHRcdFx0XHRmb250U2l6ZTogMTdcblx0XHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRcdHRleHQ6IFwiXCJcblxuXHRcdFx0QC5iYWNrTGFiZWwgPSBiYWNrTGFiZWxcblxuXHRcdFx0c21hbGxUaXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0cGFyZW50OiBjbGlwcGluZ0ZyYW1lXG5cdFx0XHRcdHk6IDMyXG5cdFx0XHRcdGNvbG9yOiBAb3B0aW9ucy50ZXh0Q29sb3Jcblx0XHRcdFx0Zm9udFNpemU6IDE3XG5cdFx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0XHR0ZXh0OiBAb3B0aW9ucy50aXRsZVxuXHRcdFx0XHRvcGFjaXR5OiBpZiBAb3B0aW9ucy5zaXplID09IFwic21hbGxcIiB0aGVuIDEgZWxzZSAwXG5cblx0XHRcdHNpemVUZXh0TGF5ZXIoc21hbGxUaXRsZSlcblx0XHRcdHNtYWxsVGl0bGUueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0c21hbGxUaXRsZS5hdXRvV2lkdGggPSB5ZXNcblxuXHRcdFx0QC5zbWFsbFRpdGxlID0gc21hbGxUaXRsZVxuXG5cdFx0XHRiYWNrQnV0dG9uID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogY2xpcHBpbmdGcmFtZVxuXHRcdFx0XHR5OiAyMFxuXHRcdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLzJcblx0XHRcdFx0aGVpZ2h0OiBoZWlnaHRzLnNtYWxsIC0gMjBcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImNsZWFyXCJcblxuXHRcdFx0YmFja0J1dHRvbi5wbGFjZUJlZm9yZShia2dkKVxuXG5cdFx0XHRALmJhY2tCdXR0b24gPSBiYWNrQnV0dG9uXG5cblx0XHRcdGNoZXZyb24ucGFyZW50ID0gYmFja0J1dHRvblxuXHRcdFx0YmFja0xhYmVsLnBhcmVudCA9IGJhY2tCdXR0b25cblxuXHRcdFx0YmFja0J1dHRvbi5zdGF0ZXMgPVxuXHRcdFx0XHRzaG93OlxuXHRcdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdFx0XHRhbmltYXRpb25PcHRpb25zOiB0aW1lOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cblx0XHRcdFx0aGlkZTpcblx0XHRcdFx0XHRvcGFjaXR5OiAwXG5cdFx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczogdGltZTogZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uXG5cblx0XHRcdGJhY2tCdXR0b24uYW5pbWF0ZShcImhpZGVcIiwgaW5zdGFudDogdHJ1ZSlcblxuXHRcdFx0aWYgQG9wdGlvbnMuYmFja0FjdGlvbiAhPSBub29wXG5cdFx0XHRcdGJhY2tCdXR0b24ub25DbGljayA9PlxuXHRcdFx0XHRcdEBvcHRpb25zLmJhY2tBY3Rpb24oKVxuXG5cdFx0XHRpZiBAb3B0aW9ucy5zZWFyY2ggPT0gdHJ1ZVxuXHRcdFx0XHRzZWFyY2hCYXJDbGlwID0gbmV3IExheWVyXG5cdFx0XHRcdFx0cGFyZW50OiBjbGlwcGluZ0ZyYW1lXG5cdFx0XHRcdFx0eTogQWxpZ24uYm90dG9tXG5cdFx0XHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0XHRcdGhlaWdodDogaGVpZ2h0cy5zZWFyY2hcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiY2xlYXJcIlxuXHRcdFx0XHRcdGNsaXA6IHRydWVcblxuXHRcdFx0XHRzZWFyY2hCYXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0XHRwYXJlbnQ6IHNlYXJjaEJhckNsaXBcblx0XHRcdFx0XHR4OiA4XG4jRXJyb3IgaW4gdGhpcyBsaW5lXG5cdFx0XHRcdFx0eTogQWxpZ24uYm90dG9tKC0xNilcblx0XHRcdFx0XHR3aWR0aDogQC53aWR0aCAtIDE2XG5cdFx0XHRcdFx0aGVpZ2h0OiAzNlxuXHRcdFx0XHRcdGJvcmRlclJhZGl1czogMTBcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBvcHRpb25zLnNlYXJjaEJhckNvbG9yXG5cblx0XHRcdFx0QC5zZWFyY2hCYXIgPSBzZWFyY2hCYXJcblxuXHRcdFx0XHRzZWFyY2hCYXIub25UYXAgLT5cblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRzZWFyY2hJY29uID0gbmV3IExheWVyXG5cdFx0XHRcdFx0cGFyZW50OiBzZWFyY2hCYXJcblx0XHRcdFx0XHR4OiAxMFxuXHRcdFx0XHRcdHk6IDExXG5cdFx0XHRcdFx0d2lkdGg6IDE0XG5cdFx0XHRcdFx0aGVpZ2h0OiAxNFxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdFx0XHRcdFx0aHRtbDogc2VhcmNoU1ZHXG5cblx0XHRcdFx0c2VhcmNoVGV4dCA9IG5ldyBMYXllclxuXHRcdFx0XHRcdHBhcmVudDogc2VhcmNoQmFyXG5cdFx0XHRcdFx0eDogc2VhcmNoSWNvbi5tYXhYICsgN1xuXHRcdFx0XHRcdHdpZHRoOiBzZWFyY2hCYXIud2lkdGggLSA1OFxuXHRcdFx0XHRcdGhlaWdodDogc2VhcmNoQmFyLmhlaWdodFxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdFx0XHRcdFx0aHRtbDogXCI8aW5wdXQgaWQ9J3NlYXJjaCcgdHlwZT0ndGV4dCcgY29udGVudGVkaXRhYmxlPSd0cnVlJyBwbGFjZWhvbGRlcj0nI3tAb3B0aW9ucy5zZWFyY2hMYWJlbH0nPlwiXG5cblx0XHRcdFx0QC5zZWFyY2hUZXh0ID0gc2VhcmNoVGV4dFxuXG5cdFx0XHRcdGlmIEBvcHRpb25zLmRpY3RhdGlvbiA9PSB0cnVlXG5cdFx0XHRcdFx0ZGljdGF0aW9uSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0XHRcdFx0cGFyZW50OiBzZWFyY2hCYXJcblx0XHRcdFx0XHRcdHg6IEFsaWduLnJpZ2h0KC0xMClcblx0XHRcdFx0XHRcdHk6IDlcblx0XHRcdFx0XHRcdHdpZHRoOiAxMlxuXHRcdFx0XHRcdFx0aGVpZ2h0OiAxOVxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcImNsZWFyXCJcblx0XHRcdFx0XHRcdGh0bWw6IGRpY3RhdGlvblNWR1xuXG5cdFx0IyBlbmQgQGxheW91dCgpXG5cblx0XHRAbGF5b3V0KClcblxuXHRcdEBzY3JvbGxXaXRoID0gKGxheWVyKSA9PiAjIHNjcm9sbGluZyBlZmZlY3RzXG5cdFx0XHRzY3JvbGwgPSBudWxsXG5cdFx0XHRtaW5OYXZCYXJIZWlnaHQgPSBoZWlnaHRzW0BvcHRpb25zLnNpemVdXG5cdFx0XHRzbWFsbE5hdkJhckhlaWdodCA9IGhlaWdodHMuc21hbGxcblx0XHRcdHNlYXJjaEJhckhlaWdodCA9IGhlaWdodHMuc2VhcmNoQmFyXG5cdFx0XHRzZWFyY2hCYXJZID0gQC5zZWFyY2hCYXI/Lnkgb3IgMFxuXHRcdFx0c2VhcmNoQmFyU2hpZnQgPSBALnNlYXJjaEJhcj8ueSAtIDE2IC0gQC5zZWFyY2hCYXI/LmhlaWdodC8yIG9yIDBcblx0XHRcdHRpdGxlTW92ZVN0YXJ0ID0gaGVpZ2h0cy5zbWFsbCAqIEBvcHRpb25zLnNlYXJjaFxuXHRcdFx0dGl0bGVIZWlnaHQgPSBoZWlnaHRzW0BvcHRpb25zLnNpemVdIC0gaGVpZ2h0cy5zbWFsbFxuXHRcdFx0ZW5mb3JjZVNjcm9sbE1hdGNoaW5nID0gZmFsc2Vcblx0XHRcdGlmIGxheWVyIGluc3RhbmNlb2YgRmxvd0NvbXBvbmVudFxuXHRcdFx0XHRzY3JvbGwgPSBsYXllci5zY3JvbGxcblx0XHRcdGVsc2UgaWYgbGF5ZXIgaW5zdGFuY2VvZiBTY3JvbGxDb21wb25lbnRcblx0XHRcdFx0c2Nyb2xsID0gbGF5ZXJcblx0XHRcdGlmIHNjcm9sbCAhPSBudWxsIGFuZCBzY3JvbGwgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdHNjcm9sbC5vbk1vdmUgPT5cbiMgXHRcdFx0XHRcdHByaW50IHNjcm9sbC5zY3JvbGxZXG5cdFx0XHRcdFx0bWF4TmF2QmFySGVpZ2h0ID0gMFxuXHRcdFx0XHRcdGlmIEAubmF2TGV2ZWwgPiAwXG5cdFx0XHRcdFx0XHRtYXhOYXZCYXJIZWlnaHQgPSBoZWlnaHRzLnNtYWxsXG5cdFx0XHRcdFx0ZWxzZSBpZiBAb3B0aW9ucy5zZWFyY2ggPT0gdHJ1ZVxuXHRcdFx0XHRcdFx0bWF4TmF2QmFySGVpZ2h0ID0gaGVpZ2h0c1tAb3B0aW9ucy5zaXplXSArIGhlaWdodHMuc2VhcmNoXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0bWF4TmF2QmFySGVpZ2h0ID0gaGVpZ2h0c1tAb3B0aW9ucy5zaXplXVxuXHRcdFx0XHRcdEAudGl0bGUuc2NhbGUgPSBVdGlscy5tb2R1bGF0ZShzY3JvbGwuc2Nyb2xsWSwgWzAsIC1zY3JvbGxUaHJlc2hvbGRzLnRpdGxlU2NhbGVUaHJlc2hvbGRdLCBbMSwgMS4xXSwgdHJ1ZSlcblx0XHRcdFx0XHQjIGNsaXBwaW5nXG5cdFx0XHRcdFx0QC5jbGlwcGluZ0ZyYW1lLmhlaWdodCA9IFV0aWxzLm1vZHVsYXRlKHNjcm9sbC5zY3JvbGxZLCBbMCwgbWluTmF2QmFySGVpZ2h0XSwgW21heE5hdkJhckhlaWdodCwgc21hbGxOYXZCYXJIZWlnaHRdLCB0cnVlKVxuXHRcdFx0XHRcdEAuY2xpcHBpbmdGcmFtZS55ID0gTWF0aC5tYXgoMCwtc2Nyb2xsLnNjcm9sbFkpXG5cdFx0XHRcdFx0QC5ia2dkLnkgPSBNYXRoLm1heCgtU2NyZWVuLmhlaWdodCwgLXNjcm9sbC5zY3JvbGxZIC0gU2NyZWVuLmhlaWdodClcblx0XHRcdFx0XHRALnRpdGxlLnkgPSBVdGlscy5tb2R1bGF0ZShzY3JvbGwuc2Nyb2xsWSwgW3RpdGxlTW92ZVN0YXJ0LCBtaW5OYXZCYXJIZWlnaHRdLCBbMiwgLXRpdGxlSGVpZ2h0XSwgdHJ1ZSlcblx0XHRcdFx0XHRALmJrZ2QuaGVpZ2h0ID0gVXRpbHMubW9kdWxhdGUoc2Nyb2xsLnNjcm9sbFksIFswLCBtaW5OYXZCYXJIZWlnaHRdLCBbbWF4TmF2QmFySGVpZ2h0LCBzbWFsbE5hdkJhckhlaWdodF0sIHRydWUpICsgU2NyZWVuLmhlaWdodFxuXHRcdFx0XHRcdEAuc2VhcmNoQmFyPy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoc2Nyb2xsLnNjcm9sbFksIFswLCBzbWFsbE5hdkJhckhlaWdodF0sIFsxLDBdLCB0cnVlKVxuXHRcdFx0XHRcdEAuc2VhcmNoQmFyPy55ID0gVXRpbHMubW9kdWxhdGUoc2Nyb2xsLnNjcm9sbFksIFswLCBzbWFsbE5hdkJhckhlaWdodF0sIFtzZWFyY2hCYXJZLCBzZWFyY2hCYXJTaGlmdF0sIHRydWUpXG5cdFx0XHRcdFx0aWYgQG9wdGlvbnMuc2l6ZSA9PSBcImxhcmdlXCIgYW5kIEAubmF2TGV2ZWwgPT0gMFxuXHRcdFx0XHRcdFx0QC5zbWFsbFRpdGxlLm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShALnRpdGxlLnksIFsyIC0gdGl0bGVIZWlnaHQvMiwgLXRpdGxlSGVpZ2h0XSwgWzAsIDFdLCB0cnVlKVxuXG5cdFx0IyBlbmQgQHNjcm9sbFdpdGgoKVxuXG5cdFx0cmVzZXRUaXRsZSA9ICgpID0+XG5cdFx0XHRpZiBALm5hdkxldmVsID09IDFcblx0XHRcdFx0QC5ia2dkLmhlaWdodCA9IEAuaGVpZ2h0ICsgU2NyZWVuLmhlaWdodFxuXHRcdFx0XHRALmJrZ2QueSA9IEFsaWduLmJvdHRvbVxuXHRcdFx0XHRALnRpdGxlLnNjYWxlID0gMVxuXHRcdFx0XHRALnRpdGxlLnkgPSAyXG5cdFx0XHRcdCMgYnVnIGhlcmVcblx0XHRcdFx0I0Auc2VhcmNoQmFyLnkgPSBBbGlnbi5ib3R0b20oLTE2KVxuXHRcdFx0XHQjQC5zZWFyY2hCYXIub3BhY2l0eSA9IDFcblx0XHRcdFx0QC5jbGlwcGluZ0ZyYW1lLmhlaWdodCA9IEAuaGVpZ2h0XG5cdFx0XHRcdEAuY2xpcHBpbmdGcmFtZS55ID0gMFxuXG5cdFx0IyBlbmQgcmVzZXRUaXRsZSgpXG5cblx0XHRhbmltYXRlVG9OZXh0VGl0bGUgPSAobmV3VGl0bGUgPSBcIlwiLCBvbGRUaXRsZSA9IFwiXCIsIHRpdGxlTGF5ZXIgPSBALnRpdGxlKSA9PlxuXHRcdFx0QC5zbWFsbFRpdGxlLm9wYWNpdHkgPSAwXG5cdFx0XHRALnRpdGxlLm9wYWNpdHkgPSAwXG5cdFx0XHRALmJhY2tMYWJlbC5vcGFjaXR5ID0gMFxuXHRcdFx0dGl0bGVMYXllci5vcGFjaXR5ID0gMFxuXHRcdFx0dGVtcExhYmVsID0gdGl0bGVMYXllci5jb3B5KClcblx0XHRcdHRlbXBMYWJlbC5vcGFjaXR5ID0gMVxuXHRcdFx0dGVtcExhYmVsLnNjcmVlbkZyYW1lID0gdGl0bGVMYXllci5zY3JlZW5GcmFtZVxuXHRcdFx0dGVtcExhYmVsLnBhcmVudCA9IEAuY2xpcHBpbmdGcmFtZVxuXHRcdFx0dGVtcExhYmVsLnggPSB0aXRsZUxheWVyLnNjcmVlbkZyYW1lLnhcblx0XHRcdHRlbXBMYWJlbC55ID0gdGl0bGVMYXllci5zY3JlZW5GcmFtZS55XG5cdFx0XHR0ZW1wTGFiZWwudGV4dCA9IG9sZFRpdGxlXG5cdFx0XHR0ZW1wTGFiZWwuYW5pbWF0ZVxuXHRcdFx0XHR4OiBALmJhY2tMYWJlbC5zY3JlZW5GcmFtZS54XG5cdFx0XHRcdHk6IEAuYmFja0xhYmVsLnNjcmVlbkZyYW1lLnlcblx0XHRcdFx0Y29sb3I6IEBvcHRpb25zLmFjY2VudENvbG9yXG5cdFx0XHRcdGZvbnRTaXplOiAxN1xuXHRcdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdFx0b3B0aW9uczogdGltZTogZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uXG5cdFx0XHRALmJhY2tMYWJlbC5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdFx0b3B0aW9uczogdGltZTogZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uIC0gMC4wNSAjIG90aGVyd2lzZSB3aWxsIHN0aWxsIGJlIGFuaW1hdGluZyBpbiBuZXh0IHN0ZXBcblx0XHRcdEAuc21hbGxUaXRsZS50ZXh0ID0gbmV3VGl0bGVcblx0XHRcdEAuc21hbGxUaXRsZS5hbmltYXRlXG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdFx0b3B0aW9uczogdGltZTogZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uXG5cdFx0XHR0ZW1wTGFiZWwub25BbmltYXRpb25FbmQgPT5cblx0XHRcdFx0QC5iYWNrTGFiZWwudGV4dCA9IG9sZFRpdGxlXG5cdFx0XHRcdEAuYmFja0xhYmVsLndpZHRoID0gU2NyZWVuLndpZHRoIC0gbWFyZ2lucy5zaWRlICogMlxuXHRcdFx0XHRALmJhY2tMYWJlbC5vcGFjaXR5ID0gMVxuXHRcdFx0XHRVdGlscy5kZWxheSBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb24sID0+XG5cdFx0XHRcdFx0dGVtcExhYmVsLmRlc3Ryb3koKVxuXG5cdFx0IyBlbmQgYW5pbWF0ZVRvTmV4dFRpdGxlKClcblxuXHRcdGFuaW1hdGVUb1ByZXZpb3VzVGl0bGUgPSAocHJldkJhY2tMYWJlbCA9IFwiXCIsIGN1cnJlbnRCYWNrTGFiZWwgPSBcIlwiLCB0aXRsZUxheWVyID0gQC50aXRsZSkgPT5cblx0XHRcdHJlc2V0VGl0bGUoKVxuXHRcdFx0QC50aXRsZS5vcGFjaXR5ID0gMFxuXHRcdFx0QC5zbWFsbFRpdGxlLm9wYWNpdHkgPSAwXG5cdFx0XHRALmJhY2tMYWJlbC5vcGFjaXR5ID0gMFxuXHRcdFx0dGVtcFRpdGxlID0gQC5iYWNrTGFiZWwuY29weSgpXG5cdFx0XHR0ZW1wVGl0bGUub3BhY2l0eSA9IDFcblx0XHRcdHRlbXBUaXRsZS5zY3JlZW5GcmFtZSA9IEAuYmFja0xhYmVsLnNjcmVlbkZyYW1lXG5cdFx0XHR0ZW1wVGl0bGUucGFyZW50ID0gQC5jbGlwcGluZ0ZyYW1lXG5cdFx0XHR0ZW1wVGl0bGUuYW5pbWF0ZVxuXHRcdFx0XHR4OiB0aXRsZUxheWVyLnNjcmVlbkZyYW1lLnhcblx0XHRcdFx0eTogdGl0bGVMYXllci5zY3JlZW5GcmFtZS55XG5cdFx0XHRcdGNvbG9yOiBAb3B0aW9ucy50ZXh0Q29sb3Jcblx0XHRcdFx0Zm9udFNpemU6IHRpdGxlTGF5ZXIuZm9udFNpemVcblx0XHRcdFx0Zm9udFdlaWdodDogdGl0bGVMYXllci5mb250V2VpZ2h0XG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdFx0b3B0aW9uczogdGltZTogZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uXG5cdFx0XHRALmJhY2tMYWJlbC50ZXh0ID0gcHJldkJhY2tMYWJlbFxuXHRcdFx0QC5iYWNrTGFiZWwuYW5pbWF0ZVxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRcdG9wdGlvbnM6IHRpbWU6IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvblxuXHRcdFx0dGVtcFRpdGxlLm9uQW5pbWF0aW9uRW5kID0+XG5cdFx0XHRcdEAudGl0bGUudGV4dCA9IGN1cnJlbnRCYWNrTGFiZWxcblx0XHRcdFx0QC5zbWFsbFRpdGxlLnRleHQgPSBjdXJyZW50QmFja0xhYmVsXG5cdFx0XHRcdHRpdGxlTGF5ZXIub3BhY2l0eSA9IDFcblx0XHRcdFx0VXRpbHMuZGVsYXkgZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uLCA9PlxuXHRcdFx0XHRcdHRlbXBUaXRsZS5kZXN0cm95KClcblxuXHRcdCMgZW5kIGFuaW1hdGVUb1ByZXZpb3VzVGl0bGUoKVxuXG5cdFx0QHNob3dOZXh0ID0gVXRpbHMudGhyb3R0bGUgMC41LCAobmV3VGl0bGUgPSBcIk5ldyBUaXRsZVwiKSA9PlxuXHRcdFx0QC5oaXN0b3J5LnNwbGljZShALm5hdkxldmVsICsgMSwgMSwgbmV3VGl0bGUpXG5cdFx0XHRpZiBALm5hdkxldmVsID09IDAgYW5kIEBvcHRpb25zLnNpemUgPT0gXCJsYXJnZVwiXG5cdFx0XHRcdGFuaW1hdGVUb05leHRUaXRsZShuZXdUaXRsZSwgQC5oaXN0b3J5W0AubmF2TGV2ZWxdLCBALnRpdGxlKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRhbmltYXRlVG9OZXh0VGl0bGUobmV3VGl0bGUsIEAuaGlzdG9yeVtALm5hdkxldmVsXSwgQC5zbWFsbFRpdGxlKVxuXHRcdFx0QC5jbGlwcGluZ0ZyYW1lLmFuaW1hdGVcblx0XHRcdFx0aGVpZ2h0OiBoZWlnaHRzLnNtYWxsXG5cdFx0XHRcdG9wdGlvbnM6IHRpbWU6IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvblxuXHRcdFx0QC5ia2dkLmFuaW1hdGVcblx0XHRcdFx0aGVpZ2h0OiBoZWlnaHRzLnNtYWxsICsgU2NyZWVuLmhlaWdodFxuXHRcdFx0XHRvcHRpb25zOiB0aW1lOiBkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25cblx0XHRcdCsrQC5uYXZMZXZlbFxuXHRcdFx0ZGlzcGxheUJhY2tCdXR0b24oKVxuXG5cdFx0IyBlbmQgQHNob3dOZXh0KClcblxuXHRcdEBzaG93UHJldmlvdXMgPSBVdGlscy50aHJvdHRsZSAwLjUsICgpID0+XG5cdFx0XHRpZiBALm5hdkxldmVsID4gMFxuXHRcdFx0XHRpZiBALm5hdkxldmVsID09IDEgYW5kIEBvcHRpb25zLnNpemUgPT0gXCJsYXJnZVwiXG5cdFx0XHRcdFx0YW5pbWF0ZVRvUHJldmlvdXNUaXRsZShALmhpc3RvcnlbQC5uYXZMZXZlbCAtIDJdLCBALmhpc3RvcnlbQC5uYXZMZXZlbCAtIDFdLCBALnRpdGxlKVxuXHRcdFx0XHRcdEAuY2xpcHBpbmdGcmFtZS5hbmltYXRlXG5cdFx0XHRcdFx0XHRoZWlnaHQ6IGhlaWdodHNbQG9wdGlvbnMuc2l6ZV0gKyBAb3B0aW9ucy5zZWFyY2ggKiBoZWlnaHRzLnNlYXJjaFxuXHRcdFx0XHRcdFx0b3B0aW9uczogdGltZTogZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uXG5cdFx0XHRcdFx0QC5ia2dkLmFuaW1hdGVcblx0XHRcdFx0XHRcdGhlaWdodDogaGVpZ2h0c1tAb3B0aW9ucy5zaXplXSArIFNjcmVlbi5oZWlnaHQgKyBAb3B0aW9ucy5zZWFyY2ggKiBoZWlnaHRzLnNlYXJjaFxuXHRcdFx0XHRcdFx0b3B0aW9uczogdGltZTogZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRhbmltYXRlVG9QcmV2aW91c1RpdGxlKEAuaGlzdG9yeVtALm5hdkxldmVsIC0gMl0sIEAuaGlzdG9yeVtALm5hdkxldmVsIC0gMV0sIEAuc21hbGxUaXRsZSlcblx0XHRcdFx0QC5uYXZMZXZlbCA9IE1hdGgubWF4KDAsIEAubmF2TGV2ZWwgLSAxKVxuXHRcdFx0XHRkaXNwbGF5QmFja0J1dHRvbigpXG5cblx0XHQjIGVuZCBAc2hvd1ByZXZpb3VzKClcblxuXHRcdGRpc3BsYXlCYWNrQnV0dG9uID0gKCkgPT5cblx0XHRcdGlmIEAubmF2TGV2ZWwgPT0gMFxuXHRcdFx0XHRALmJhY2tCdXR0b24uYW5pbWF0ZShcImhpZGVcIilcblx0XHRcdGVsc2Vcblx0XHRcdFx0QC5iYWNrQnV0dG9uLmFuaW1hdGUoXCJzaG93XCIpXG5cblx0XHQjIGVuZCBkaXNwbGF5QmFja0J1dHRvbigpXG5cblx0XHQjIEhhbmRsZSBvcmllbnRhdGlvbiBzd2l0Y2hcblx0XHQjIENoZWNrIHdoZXRoZXIgdGhlIGRldmljZSBpcyBtb2JpbGUgb3Igbm90ICh2ZXJzdXMgRnJhbWVyKVxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKClcblx0XHRcdCMgQWRkIGV2ZW50IGxpc3RlbmVyIG9uIG9yaWVudGF0aW9uIGNoYW5nZVxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJvcmllbnRhdGlvbmNoYW5nZVwiLCA9PlxuXHRcdFx0XHRAbGF5b3V0KClcblx0XHRlbHNlXG5cdFx0XHQjIExpc3RlbiBmb3Igb3JpZW50YXRpb24gY2hhbmdlcyBvbiB0aGUgZGV2aWNlIHZpZXdcblx0XHRcdEZyYW1lci5EZXZpY2Uub24gXCJjaGFuZ2U6b3JpZW50YXRpb25cIiwgPT5cblx0XHRcdFx0QGxheW91dCgpXG5cblx0QGRlZmluZSAnc2VhcmNoJywgZ2V0OiAoKSAtPiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJykudmFsdWVcbm1vZHVsZS5leHBvcnRzID0gTmF2YmFyQ29tcG9uZW50XG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUVBQTs7QURBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBLHlCQUFBO0VBQUE7OztBQWdEQSxRQUFBLEdBQ0M7RUFBQSxXQUFBLEVBQWEsQ0FBYjtFQUNBLEtBQUEsRUFBTyxhQURQO0VBRUEsV0FBQSxFQUFhLFFBRmI7RUFHQSxLQUFBLEVBQU8sT0FIUDtFQUlBLElBQUEsRUFBTSxPQUpOO0VBS0EsTUFBQSxFQUFRLEtBTFI7RUFNQSxTQUFBLEVBQVcsS0FOWDtFQU9B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
