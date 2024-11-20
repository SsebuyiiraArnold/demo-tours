!(function (a) {
  "object" == typeof module && "object" == typeof module.exports
    ? a(require("jquery"))
    : "function" == typeof define && define.amd
    ? define([], a(window.jQuery))
    : a(window.jQuery);
})(function (a) {
  return a
    ? ((a.Unslider = function (b, c) {
        var d = this;
        return (
          (d._ = "wprs_unslider"),
          (d.defaults = {
            autoplay: !1,
            delay: 3e3,
            speed: 750,
            easing: "swing",
            keys: { prev: 37, next: 39 },
            nav: !0,
            arrows: {
              prev: '<a class="' + d._ + '-arrow prev">Prev</a>',
              next: '<a class="' + d._ + '-arrow next">Next</a>',
            },
            animation: "horizontal",
            selectors: { container: "ul:first", slides: "li" },
            animateHeight: !1,
            activeClass: d._ + "-active",
            swipe: !0,
            swipeThreshold: 0.2,
          }),
          (d.$context = b),
          (d.options = {}),
          (d.$parent = null),
          (d.$container = null),
          (d.$slides = null),
          (d.$nav = null),
          (d.$arrows = []),
          (d.total = 0),
          (d.current = 0),
          (d.prefix = d._ + "-"),
          (d.eventSuffix = "." + d.prefix + ~~(2e3 * Math.random())),
          (d.interval = null),
          (d.init = function (b) {
            return (
              (d.options = a.extend({}, d.defaults, b)),
              (d.$container = d.$context
                .find(d.options.selectors.container)
                .addClass(d.prefix + "wrap")),
              (d.$slides = d.$container.children(d.options.selectors.slides)),
              d.setup(),
              a.each(["nav", "arrows", "keys", "infinite"], function (b, c) {
                d.options[c] && d["init" + a._ucfirst(c)]();
              }),
              jQuery.event.special.swipe && d.options.swipe && d.initSwipe(),
              d.options.autoplay && d.start(),
              d.calculateSlides(),
              d.$context.trigger(d._ + ".ready"),
              d.animate(d.options.index || d.current, "init")
            );
          }),
          (d.setup = function () {
            d.$context
              .addClass(d.prefix + d.options.animation)
              .wrap('<div class="' + d._ + '" />'),
              (d.$parent = d.$context.parent("." + d._));
            var a = d.$context.css("position");
            "static" === a && d.$context.css("position", "relative"),
              d.$context.css("overflow", "hidden");
          }),
          (d.calculateSlides = function () {
            if (
              ((d.$slides = d.$container.children(d.options.selectors.slides)),
              (d.total = d.$slides.length),
              "fade" !== d.options.animation)
            ) {
              var a = "width";
              "vertical" === d.options.animation && (a = "height"),
                d.$container
                  .css(a, 100 * d.total + "%")
                  .addClass(d.prefix + "carousel"),
                d.$slides.css(a, 100 / d.total + "%");
            }
          }),
          (d.start = function () {
            return (
              (d.interval = setTimeout(function () {
                d.next();
              }, d.options.delay)),
              d
            );
          }),
          (d.stop = function () {
            return clearTimeout(d.interval), d;
          }),
          (d.initNav = function () {
            var b = a('<nav class="' + d.prefix + 'nav"><ol /></nav>');
            d.$slides.each(function (c) {
              var e = this.getAttribute("data-nav") || c + 1;
              a.isFunction(d.options.nav) &&
                (e = d.options.nav.call(d.$slides.eq(c), c, e)),
                b
                  .children("ol")
                  .append('<li data-slide="' + c + '">' + e + "</li>");
            }),
              (d.$nav = b.insertAfter(d.$context)),
              d.$nav.find("li").on("click" + d.eventSuffix, function () {
                var b = a(this).addClass(d.options.activeClass);
                b.siblings().removeClass(d.options.activeClass),
                  d.animate(b.attr("data-slide"));
              });
          }),
          (d.initArrows = function () {
            d.options.arrows === !0 && (d.options.arrows = d.defaults.arrows),
              a.each(d.options.arrows, function (b, c) {
                d.$arrows.push(
                  a(c)
                    .insertAfter(d.$context)
                    .on("click" + d.eventSuffix, d[b])
                );
              });
          }),
          (d.initKeys = function () {
            d.options.keys === !0 && (d.options.keys = d.defaults.keys),
              a(document).on("keyup" + d.eventSuffix, function (b) {
                a.each(d.options.keys, function (c, e) {
                  b.which === e && a.isFunction(d[c]) && d[c].call(d);
                });
              });
          }),
          (d.initSwipe = function () {
            var a = d.$slides.width();
            "fade" !== d.options.animation &&
              d.$container.on({
                movestart: function (a) {
                  return (a.distX > a.distY && a.distX < -a.distY) ||
                    (a.distX < a.distY && a.distX > -a.distY)
                    ? !!a.preventDefault()
                    : void d.$container.css("position", "relative");
                },
                move: function (b) {
                  d.$container.css(
                    "left",
                    -(100 * d.current) + (100 * b.distX) / a + "%"
                  );
                },
                moveend: function (b) {
                  Math.abs(b.distX) / a > d.options.swipeThreshold
                    ? d[b.distX < 0 ? "next" : "prev"]()
                    : d.$container.animate(
                        { left: -(100 * d.current) + "%" },
                        d.options.speed / 2
                      );
                },
              });
          }),
          (d.initInfinite = function () {
            var b = ["first", "last"];
            a.each(b, function (a, c) {
              d.$slides.push.apply(
                d.$slides,
                d.$slides
                  .filter(':not(".' + d._ + '-clone")')
                  [c]()
                  .clone()
                  .addClass(d._ + "-clone")
                  ["insert" + (0 === a ? "After" : "Before")](
                    d.$slides[b[~~!a]]()
                  )
              );
            });
          }),
          (d.destroyArrows = function () {
            a.each(d.$arrows, function (a, b) {
              b.remove();
            });
          }),
          (d.destroySwipe = function () {
            d.$container.off("movestart move moveend");
          }),
          (d.destroyKeys = function () {
            a(document).off("keyup" + d.eventSuffix);
          }),
          (d.setIndex = function (a) {
            return (
              a < 0 && (a = d.total - 1),
              (d.current = Math.min(Math.max(0, a), d.total - 1)),
              d.options.nav &&
                d.$nav
                  .find('[data-slide="' + d.current + '"]')
                  ._active(d.options.activeClass),
              d.$slides.eq(d.current)._active(d.options.activeClass),
              d
            );
          }),
          (d.animate = function (b, c) {
            if (
              ("first" === b && (b = 0),
              "last" === b && (b = d.total),
              isNaN(b))
            )
              return d;
            d.options.autoplay && d.stop().start(),
              d.setIndex(b),
              d.$context.trigger(d._ + ".change", [b, d.$slides.eq(b)]);
            var e = "animate" + a._ucfirst(d.options.animation);
            return a.isFunction(d[e]) && d[e](d.current, c), d;
          }),
          (d.next = function () {
            var a = d.current + 1;
            return a >= d.total && (a = 0), d.animate(a, "next");
          }),
          (d.prev = function () {
            return d.animate(d.current - 1, "prev");
          }),
          (d.animateHorizontal = function (a) {
            var b = "left";
            return (
              "rtl" === d.$context.attr("dir") && (b = "right"),
              d.options.infinite && d.$container.css("margin-" + b, "-100%"),
              d.slide(b, a)
            );
          }),
          (d.animateVertical = function (a) {
            return (
              (d.options.animateHeight = !0),
              d.options.infinite &&
                d.$container.css("margin-top", -d.$slides.outerHeight()),
              d.slide("top", a)
            );
          }),
          (d.slide = function (a, b) {
            if ((d.animateHeight(b), d.options.infinite)) {
              var c;
              b === d.total - 1 && ((c = d.total - 3), (b = -1)),
                b === d.total - 2 && ((c = 0), (b = d.total - 2)),
                "number" == typeof c &&
                  (d.setIndex(c),
                  d.$context.on(d._ + ".moved", function () {
                    d.current === c &&
                      d.$container.css(a, -(100 * c) + "%").off(d._ + ".moved");
                  }));
            }
            var e = {};
            return (e[a] = -(100 * b) + "%"), d._move(d.$container, e);
          }),
          (d.animateFade = function (a) {
            d.animateHeight(a);
            var b = d.$slides.eq(a).addClass(d.options.activeClass);
            d._move(b.siblings().removeClass(d.options.activeClass), {
              opacity: 0,
            }),
              d._move(b, { opacity: 1 }, !1);
          }),
          (d.animateHeight = function (a) {
            d.options.animateHeight &&
              d._move(
                d.$context,
                { height: d.$slides.eq(a).outerHeight() },
                !1
              );
          }),
          (d._move = function (a, b, c, e) {
            return (
              c !== !1 &&
                (c = function () {
                  d.$context.trigger(d._ + ".moved");
                }),
              a._move(b, e || d.options.speed, d.options.easing, c)
            );
          }),
          d.init(c)
        );
      }),
      (a.fn._active = function (a) {
        return this.addClass(a).siblings().removeClass(a);
      }),
      (a._ucfirst = function (a) {
        return (a + "").toLowerCase().replace(/^./, function (a) {
          return a.toUpperCase();
        });
      }),
      (a.fn._move = function () {
        return (
          this.stop(!0, !0),
          a.fn[a.fn.velocity ? "velocity" : "animate"].apply(this, arguments)
        );
      }),
      void (a.fn.wprs_unslider = function (b) {
        return this.each(function (c, d) {
          var e = a(d),
            f = a(d).data("wprs_unslider");
          if (!(f instanceof a.Unslider)) {
            if ("string" == typeof b && e.data("wprs_unslider")) {
              b = b.split(":");
              var g = e.data("wprs_unslider")[b[0]];
              if (a.isFunction(g))
                return g.apply(e, b[1] ? b[1].split(",") : null);
            }
            return e.data("wprs_unslider", new a.Unslider(e, b));
          }
        });
      }))
    : console.warn("Unslider needs jQuery");
});

!(function (e) {
  "function" == typeof define && define.amd
    ? define([], e)
    : "undefined" != typeof module && null !== module && module.exports
    ? (module.exports = e)
    : e();
})(function () {
  window.Symbol ||
    (function (e) {
      "use strict";
      var t = Object.defineProperty,
        n = "__symbol-" + Math.ceil(1e9 * Math.random()) + "-",
        i = 0;
      function o(e) {
        if (!(this instanceof o)) return new o(e);
        var t = n + i++;
        this._symbol = t;
      }
      t(o.prototype, "toString", {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: function () {
          return this._symbol;
        },
      }),
        (e.Symbol = o);
    })(this);
  var e = Object.assign || (window.jQuery && jQuery.extend),
    t = 8,
    n =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (e, t) {
        return window.setTimeout(function () {
          e();
        }, 25);
      },
    i = { textarea: !0, input: !0, select: !0, button: !0 },
    o = { move: "mousemove", cancel: "mouseup dragstart", end: "mouseup" },
    a = { move: "touchmove", cancel: "touchend", end: "touchend" },
    c = /\s+/,
    u = { bubbles: !0, cancelable: !0 },
    r = Symbol("events");
  function d(e) {
    return e[r] || (e[r] = {});
  }
  function m(e, t, n, i, o) {
    t = t.split(c);
    var a,
      u = d(e),
      r = t.length;
    function m(e) {
      n(e, i);
    }
    for (; r--; )
      (u[(a = t[r])] || (u[a] = [])).push([n, m]), e.addEventListener(a, m);
  }
  function s(e, t, n, i) {
    t = t.split(c);
    var o,
      a,
      u,
      r = d(e),
      m = t.length;
    if (r)
      for (; m--; )
        if ((a = r[(o = t[m])]))
          for (u = a.length; u--; )
            a[u][0] === n &&
              (e.removeEventListener(o, a[u][1]), a.splice(u, 1));
  }
  function v(t, n, i) {
    var o = new CustomEvent(n, u);
    i && e(o, i), t.dispatchEvent(o);
  }
  function f() {}
  function l(e) {
    e.preventDefault();
  }
  function g(e, t) {
    var n, i;
    if (e.identifiedTouch) return e.identifiedTouch(t);
    for (n = -1, i = e.length; ++n < i; )
      if (e[n].identifier === t) return e[n];
  }
  function p(e, t) {
    var n = g(e.changedTouches, t.identifier);
    if (n && (n.pageX !== t.pageX || n.pageY !== t.pageY)) return n;
  }
  function h(e, t) {
    w(e, t, e, Y);
  }
  function X(e, t) {
    Y();
  }
  function Y() {
    s(document, o.move, h), s(document, o.cancel, X);
  }
  function y(e) {
    s(document, a.move, e.touchmove), s(document, a.cancel, e.touchend);
  }
  function w(e, n, i, o) {
    var a,
      c,
      u,
      r,
      d,
      m,
      s,
      l,
      g,
      p = i.pageX - n.pageX,
      h = i.pageY - n.pageY;
    p * p + h * h < t * t ||
      ((c = n),
      (u = i),
      (r = p),
      (d = h),
      (m = o),
      (s = (a = e).targetTouches),
      (l = a.timeStamp - c.timeStamp),
      (g = {
        altKey: a.altKey,
        ctrlKey: a.ctrlKey,
        shiftKey: a.shiftKey,
        startX: c.pageX,
        startY: c.pageY,
        distX: r,
        distY: d,
        deltaX: r,
        deltaY: d,
        pageX: u.pageX,
        pageY: u.pageY,
        velocityX: r / l,
        velocityY: d / l,
        identifier: c.identifier,
        targetTouches: s,
        finger: s ? s.length : 1,
        enableMove: function () {
          (this.moveEnabled = !0), (this.enableMove = f), a.preventDefault();
        },
      }),
      v(c.target, "movestart", g),
      m(c));
  }
  function b(e, t) {
    var n = t.timer;
    (t.touch = e), (t.timeStamp = e.timeStamp), n.kick();
  }
  function T(e, t) {
    var n = t.target,
      i = t.event,
      a = t.timer;
    s(document, o.move, b),
      s(document, o.end, T),
      S(n, i, a, function () {
        setTimeout(function () {
          s(n, "click", l);
        }, 0);
      });
  }
  function S(e, t, n, i) {
    n.end(function () {
      return v(e, "moveend", t), i && i();
    });
  }
  if (
    (m(document, "mousedown", function (e) {
      var t;
      1 !== (t = e).which ||
        t.ctrlKey ||
        t.altKey ||
        i[e.target.tagName.toLowerCase()] ||
        (m(document, o.move, h, e), m(document, o.cancel, X, e));
    }),
    m(document, "touchstart", function (e) {
      if (!i[e.target.tagName.toLowerCase()]) {
        var t = e.changedTouches[0],
          n = {
            target: t.target,
            pageX: t.pageX,
            pageY: t.pageY,
            identifier: t.identifier,
            touchmove: function (e, t) {
              var n, i, o;
              (o = p((n = e), (i = t))) && w(n, i, o, y);
            },
            touchend: function (e, t) {
              var n;
              (n = t), g(e.changedTouches, n.identifier) && y(n);
            },
          };
        m(document, a.move, n.touchmove, n),
          m(document, a.cancel, n.touchend, n);
      }
    }),
    m(document, "movestart", function (e) {
      if (!e.defaultPrevented && e.moveEnabled) {
        var t = {
            startX: e.startX,
            startY: e.startY,
            pageX: e.pageX,
            pageY: e.pageY,
            distX: e.distX,
            distY: e.distY,
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            velocityX: e.velocityX,
            velocityY: e.velocityY,
            identifier: e.identifier,
            targetTouches: e.targetTouches,
            finger: e.finger,
          },
          i = {
            target: e.target,
            event: t,
            timer: new (function (e) {
              var t = e,
                i = !1,
                o = !1;
              function a(e) {
                i ? (t(), n(a), (o = !0), (i = !1)) : (o = !1);
              }
              (this.kick = function (e) {
                (i = !0), o || a();
              }),
                (this.end = function (e) {
                  var n = t;
                  e &&
                    (o
                      ? ((t = i
                          ? function () {
                              n(), e();
                            }
                          : e),
                        (i = !0))
                      : e());
                });
            })(function (e) {
              var n, o, a;
              (n = t),
                (o = i.touch),
                (a = i.timeStamp - n.timeStamp),
                (n.distX = o.pageX - n.startX),
                (n.distY = o.pageY - n.startY),
                (n.deltaX = o.pageX - n.pageX),
                (n.deltaY = o.pageY - n.pageY),
                (n.velocityX = 0.3 * n.velocityX + (0.7 * n.deltaX) / a),
                (n.velocityY = 0.3 * n.velocityY + (0.7 * n.deltaY) / a),
                (n.pageX = o.pageX),
                (n.pageY = o.pageY),
                v(i.target, "move", t);
            }),
            touch: void 0,
            timeStamp: e.timeStamp,
          };
        void 0 === e.identifier
          ? (m(e.target, "click", l),
            m(document, o.move, b, i),
            m(document, o.end, T, i))
          : ((i.activeTouchmove = function (e, t) {
              var n, i, o, a, c;
              (n = e),
                (o = (i = t).event),
                (a = i.timer),
                (c = p(n, o)) &&
                  (n.preventDefault(),
                  (o.targetTouches = n.targetTouches),
                  (i.touch = c),
                  (i.timeStamp = n.timeStamp),
                  a.kick());
            }),
            (i.activeTouchend = function (e, t) {
              !(function (e, t) {
                var n,
                  i = t.target,
                  o = t.event,
                  c = t.timer;
                g(e.changedTouches, o.identifier) &&
                  ((n = t),
                  s(document, a.move, n.activeTouchmove),
                  s(document, a.end, n.activeTouchend),
                  S(i, o, c));
              })(e, t);
            }),
            m(document, a.move, i.activeTouchmove, i),
            m(document, a.end, i.activeTouchend, i));
      }
    }),
    window.jQuery)
  ) {
    var k =
      "startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY".split(
        " "
      );
    (jQuery.event.special.movestart = {
      setup: function () {
        return m(this, "movestart", j), !1;
      },
      teardown: function () {
        return s(this, "movestart", j), !1;
      },
      add: M,
    }),
      (jQuery.event.special.move = {
        setup: function () {
          return m(this, "movestart", K), !1;
        },
        teardown: function () {
          return s(this, "movestart", K), !1;
        },
        add: M,
      }),
      (jQuery.event.special.moveend = {
        setup: function () {
          return m(this, "movestart", E), !1;
        },
        teardown: function () {
          return s(this, "movestart", E), !1;
        },
        add: M,
      });
  }
  function j(e) {
    e.enableMove();
  }
  function K(e) {
    e.enableMove();
  }
  function E(e) {
    e.enableMove();
  }
  function M(e) {
    var t = e.handler;
    e.handler = function (e) {
      for (var n, i = k.length; i--; ) e[(n = k[i])] = e.originalEvent[n];
      t.apply(this, arguments);
    };
  }
});

void 0 !== jQuery.event.swipe ||
  (function (e) {
    "function" == typeof define && define.amd
      ? define(["jquery", void 0, "jquery.event.move"], e)
      : "undefined" != typeof module && null !== module && module.exports
      ? (module.exports = e)
      : e(jQuery);
  })(function (e, t) {
    var i = e.event.add,
      s = e.event.remove,
      n = function (t, i, s) {
        e.event.trigger(i, s, t);
      },
      r = { threshold: 0.4, sensitivity: 6 };
    function d(e) {
      var t, i, s;
      (t = e.currentTarget.offsetWidth),
        (i = e.currentTarget.offsetHeight),
        (s = {
          distX: e.distX,
          distY: e.distY,
          velocityX: e.velocityX,
          velocityY: e.velocityY,
          finger: e.finger,
        }),
        e.distX > e.distY
          ? e.distX > -e.distY
            ? (e.distX / t > r.threshold ||
                ((e.velocityX * e.distX) / t) * r.sensitivity > 1) &&
              ((s.type = "swiperight"), n(e.currentTarget, s))
            : (-e.distY / i > r.threshold ||
                ((e.velocityY * e.distY) / t) * r.sensitivity > 1) &&
              ((s.type = "swipeup"), n(e.currentTarget, s))
          : e.distX > -e.distY
          ? (e.distY / i > r.threshold ||
              ((e.velocityY * e.distY) / t) * r.sensitivity > 1) &&
            ((s.type = "swipedown"), n(e.currentTarget, s))
          : (-e.distX / t > r.threshold ||
              ((e.velocityX * e.distX) / t) * r.sensitivity > 1) &&
            ((s.type = "swipeleft"), n(e.currentTarget, s));
    }
    function o(t) {
      var i = e.data(t, "event_swipe");
      return i || ((i = { count: 0 }), e.data(t, "event_swipe", i)), i;
    }
    e.event.special.swipe =
      e.event.special.swipeleft =
      e.event.special.swiperight =
      e.event.special.swipeup =
      e.event.special.swipedown =
        {
          setup: function (e, t, s) {
            if (!(o(this).count++ > 0)) return i(this, "moveend", d), !0;
          },
          teardown: function () {
            if (!(--o(this).count > 0)) return s(this, "moveend", d), !0;
          },
          settings: r,
        };
  });
