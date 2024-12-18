!(function (e) {
  function n(n, t, s) {
    if (s) {
      if (("object" != typeof n && (n = {}), "boolean" != typeof n.isMenu)) {
        var o = s.children();
        n.isMenu = 1 == o.length && o.is(t.panelNodetype);
      }
      return n;
    }
    return (
      (n = e.extend(!0, {}, e[a].defaults, n)),
      ("top" == n.position || "bottom" == n.position) &&
        ("back" == n.zposition || "next" == n.zposition) &&
        (e[a].deprecated(
          'Using position "' +
            n.position +
            '" in combination with zposition "' +
            n.zposition +
            '"',
          'zposition "front"'
        ),
        (n.zposition = "front")),
      n
    );
  }
  function t(n) {
    return (
      (n = e.extend(!0, {}, e[a].configuration, n)),
      "string" != typeof n.pageSelector &&
        (n.pageSelector = "> " + n.pageNodetype),
      "append" != n.menuInjectMethod && (n.menuInjectMethod = "prepend"),
      n
    );
  }
  function s() {
    (r.$wndw = e(window)),
      (r.$html = e("html")),
      (r.$body = e("body")),
      (r.$allMenus = e()),
      e.each([d, c, u], function (e, n) {
        n.add = function (e) {
          e = e.split(" ");
          for (var t in e) n[e[t]] = n.mm(e[t]);
        };
      }),
      (d.mm = function (e) {
        return "mm-" + e;
      }),
      d.add(
        "menu ismenu panel list subtitle selected label spacer current highest hidden page blocker modal background opened opening subopened subopen fullsubopen subclose"
      ),
      (d.umm = function (e) {
        return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e;
      }),
      (c.mm = function (e) {
        return "mm-" + e;
      }),
      c.add("parent style"),
      (u.mm = function (e) {
        return e + ".mm";
      }),
      u.add(
        "toggle open opening opened close closing closed update setPage setSelected transitionend webkitTransitionEnd mousedown touchstart mouseup touchend scroll touchmove click keydown keyup resize"
      ),
      r.$wndw.on(u.keydown, function (e) {
        return r.$html.hasClass(d.opened) && 9 == e.keyCode
          ? (e.preventDefault(), !1)
          : void 0;
      });
    var n = 0;
    r.$wndw.on(u.resize, function (e, t) {
      if (t || r.$html.hasClass(d.opened)) {
        var s = r.$wndw.height();
        (t || s != n) && ((n = s), r.$page.css("minHeight", s));
      }
    }),
      (e[a]._c = d),
      (e[a]._d = c),
      (e[a]._e = u),
      (e[a].glbl = r);
  }
  function o(n, t) {
    if (n.hasClass(d.current)) return !1;
    var s = e("." + d.panel, t),
      o = s.filter("." + d.current);
    return (
      s
        .removeClass(d.highest)
        .removeClass(d.current)
        .not(n)
        .not(o)
        .addClass(d.hidden),
      n.hasClass(d.opened)
        ? o.addClass(d.highest).removeClass(d.opened).removeClass(d.subopened)
        : (n.addClass(d.highest), o.addClass(d.subopened)),
      n
        .removeClass(d.hidden)
        .removeClass(d.subopened)
        .addClass(d.current)
        .addClass(d.opened),
      "open"
    );
  }
  function i(e, n, t) {
    var s = !1,
      o = function () {
        s || n.call(e[0]), (s = !0);
      };
    e.one(u.transitionend, o),
      e.one(u.webkitTransitionEnd, o),
      setTimeout(o, 1.1 * t);
  }
  var a = "mmenu",
    l = "4.2.7";
  if (!e[a]) {
    var r = {
        $wndw: null,
        $html: null,
        $body: null,
        $page: null,
        $blck: null,
        $allMenus: null,
      },
      d = {},
      c = {},
      u = {},
      p = 0,
      h = 0;
    (e[a] = function (e, n, t) {
      return (
        (r.$allMenus = r.$allMenus.add(e)),
        (this.$menu = e),
        (this.opts = n),
        (this.conf = t),
        (this.opened = !1),
        (this.serialnr = p++),
        this._init(),
        this
      );
    }),
      (e[a].prototype = {
        open: function () {
          if (this.opened) return !1;
          var e = this;
          return (
            this._openSetup(),
            setTimeout(function () {
              e._openFinish();
            }, 50),
            "open"
          );
        },
        _openSetup: function () {
          (h = r.$wndw.scrollTop() || 0),
            this.$menu.addClass(d.current),
            r.$allMenus.not(this.$menu).trigger(u.close),
            r.$page.data(c.style, r.$page.attr("style") || ""),
            r.$wndw.trigger(u.resize, [!0]),
            this.opts.modal && r.$html.addClass(d.modal),
            this.opts.moveBackground && r.$html.addClass(d.background),
            "left" != this.opts.position &&
              r.$html.addClass(d.mm(this.opts.position)),
            "back" != this.opts.zposition &&
              r.$html.addClass(d.mm(this.opts.zposition)),
            this.opts.classes && r.$html.addClass(this.opts.classes),
            r.$html.addClass(d.opened),
            this.$menu.addClass(d.opened);
        },
        _openFinish: function () {
          var e = this;
          i(
            r.$page,
            function () {
              (e.opened = !0), e.$menu.trigger(u.opened);
            },
            this.conf.transitionDuration
          ),
            r.$html.addClass(d.opening),
            this.$menu.trigger(u.opening);
        },
        close: function () {
          var e = this;
          return this.opened
            ? (i(
                r.$page,
                function () {
                  e.$menu.removeClass(d.current).removeClass(d.opened),
                    r.$html
                      .removeClass(d.opened)
                      .removeClass(d.modal)
                      .removeClass(d.background)
                      .removeClass(d.mm(e.opts.position))
                      .removeClass(d.mm(e.opts.zposition)),
                    e.opts.classes && r.$html.removeClass(e.opts.classes),
                    r.$page.attr("style", r.$page.data(c.style)),
                    (e.opened = !1),
                    e.$menu.trigger(u.closed);
                },
                this.conf.transitionDuration
              ),
              r.$html.removeClass(d.opening),
              this.$menu.trigger(u.closing),
              "close")
            : !1;
        },
        _init: function () {
          if (
            ((this.opts = n(this.opts, this.conf, this.$menu)),
            (this.direction = this.opts.slidingSubmenus
              ? "horizontal"
              : "vertical"),
            this._initPage(r.$page),
            this._initMenu(),
            this._initBlocker(),
            this._initPanles(),
            this._initLinks(),
            this._initOpenClose(),
            this._bindCustomEvents(),
            e[a].addons)
          )
            for (var t = 0; t < e[a].addons.length; t++)
              "function" == typeof this["_addon_" + e[a].addons[t]] &&
                this["_addon_" + e[a].addons[t]]();
        },
        _bindCustomEvents: function () {
          var n = this;
          this.$menu
            .off(u.open + " " + u.close + " " + u.setPage + " " + u.update)
            .on(
              u.open + " " + u.close + " " + u.setPage + " " + u.update,
              function (e) {
                e.stopPropagation();
              }
            ),
            this.$menu
              .on(u.open, function (t) {
                return e(this).hasClass(d.current)
                  ? (t.stopImmediatePropagation(), !1)
                  : n.open();
              })
              .on(u.close, function (t) {
                return e(this).hasClass(d.current)
                  ? n.close()
                  : (t.stopImmediatePropagation(), !1);
              })
              .on(u.setPage, function (e, t) {
                n._initPage(t), n._initOpenClose();
              });
          var t = this.$menu.find(
            this.opts.isMenu && "horizontal" != this.direction
              ? "ul, ol"
              : "." + d.panel
          );
          t
            .off(u.toggle + " " + u.open + " " + u.close)
            .on(u.toggle + " " + u.open + " " + u.close, function (e) {
              e.stopPropagation();
            }),
            "horizontal" == this.direction
              ? t.on(u.open, function () {
                  return o(e(this), n.$menu);
                })
              : t
                  .on(u.toggle, function () {
                    var n = e(this);
                    return n.triggerHandler(
                      n.parent().hasClass(d.opened) ? u.close : u.open
                    );
                  })
                  .on(u.open, function () {
                    return e(this).parent().addClass(d.opened), "open";
                  })
                  .on(u.close, function () {
                    return e(this).parent().removeClass(d.opened), "close";
                  });
        },
        _initBlocker: function () {
          var n = this;
          r.$blck ||
            (r.$blck = e('<div id="' + d.blocker + '" />').appendTo(r.$body)),
            r.$blck
              .off(u.touchstart)
              .on(u.touchstart, function (e) {
                e.preventDefault(),
                  e.stopPropagation(),
                  r.$blck.trigger(u.mousedown);
              })
              .on(u.mousedown, function (e) {
                e.preventDefault(),
                  r.$html.hasClass(d.modal) || n.$menu.trigger(u.close);
              });
        },
        _initPage: function (n) {
          n ||
            ((n = e(this.conf.pageSelector, r.$body)),
            n.length > 1 &&
              (e[a].debug(
                "Multiple nodes found for the page-node, all nodes are wrapped in one <" +
                  this.conf.pageNodetype +
                  ">."
              ),
              (n = n.wrapAll("<" + this.conf.pageNodetype + " />").parent()))),
            n.addClass(d.page),
            (r.$page = n);
        },
        _initMenu: function () {
          this.conf.clone &&
            ((this.$menu = this.$menu.clone(!0)),
            this.$menu
              .add(this.$menu.find("*"))
              .filter("[id]")
              .each(function () {
                e(this).attr("id", d.mm(e(this).attr("id")));
              })),
            this.$menu.contents().each(function () {
              3 == e(this)[0].nodeType && e(this).remove();
            }),
            this.$menu[this.conf.menuInjectMethod + "To"](
              this.conf.menuWrapperSelector
            ).addClass(d.menu),
            this.$menu.addClass(d.mm(this.direction)),
            this.opts.classes && this.$menu.addClass(this.opts.classes),
            this.opts.isMenu && this.$menu.addClass(d.ismenu),
            "left" != this.opts.position &&
              this.$menu.addClass(d.mm(this.opts.position)),
            "back" != this.opts.zposition &&
              this.$menu.addClass(d.mm(this.opts.zposition));
        },
        _initPanles: function () {
          var n = this;
          this.__refactorClass(
            e("." + this.conf.listClass, this.$menu),
            "list"
          ),
            this.opts.isMenu &&
              e("ul, ol", this.$menu).not(".mm-nolist").addClass(d.list);
          var t = e("." + d.list + " > li", this.$menu);
          this.__refactorClass(
            t.filter("." + this.conf.selectedClass),
            "selected"
          ),
            this.__refactorClass(t.filter("." + this.conf.labelClass), "label"),
            this.__refactorClass(
              t.filter("." + this.conf.spacerClass),
              "spacer"
            ),
            t.off(u.setSelected).on(u.setSelected, function (n, s) {
              n.stopPropagation(),
                t.removeClass(d.selected),
                "boolean" != typeof s && (s = !0),
                s && e(this).addClass(d.selected);
            }),
            this.__refactorClass(
              e("." + this.conf.panelClass, this.$menu),
              "panel"
            ),
            this.$menu
              .children()
              .filter(this.conf.panelNodetype)
              .add(
                this.$menu
                  .find("." + d.list)
                  .children()
                  .children()
                  .filter(this.conf.panelNodetype)
              )
              .addClass(d.panel);
          var s = e("." + d.panel, this.$menu);
          s.each(function (t) {
            var s = e(this),
              o = s.attr("id") || d.mm("m" + n.serialnr + "-p" + t);
            s.attr("id", o);
          }),
            s.find("." + d.panel).each(function () {
              var t = e(this),
                s = t.is("ul, ol") ? t : t.find("ul ,ol").first(),
                o = t.parent(),
                i = o.find("> a, > span"),
                a = o.closest("." + d.panel);
              if ((t.data(c.parent, o), o.parent().is("." + d.list))) {
                var l = e(
                  '<a class="' + d.subopen + '" href="#' + t.attr("id") + '" />'
                ).insertBefore(i);
                i.is("a") || l.addClass(d.fullsubopen),
                  "horizontal" == n.direction &&
                    s.prepend(
                      '<li class="' +
                        d.subtitle +
                        '"><a class="' +
                        d.subclose +
                        '" href="#' +
                        a.attr("id") +
                        '">' +
                        i.text() +
                        "</a></li>"
                    );
              }
            });
          var o = "horizontal" == this.direction ? u.open : u.toggle;
          if (
            (s.each(function () {
              var t = e(this),
                s = t.attr("id");
              e('a[href="#' + s + '"]', n.$menu)
                .off(u.click)
                .on(u.click, function (e) {
                  e.preventDefault(), t.trigger(o);
                });
            }),
            "horizontal" == this.direction)
          ) {
            var i = e("." + d.list + " > li." + d.selected, this.$menu);
            i.parents("li")
              .removeClass(d.selected)
              .end()
              .add(i.parents("li"))
              .each(function () {
                var n = e(this),
                  t = n.find("> ." + d.panel);
                t.length &&
                  (n.parents("." + d.panel).addClass(d.subopened),
                  t.addClass(d.opened));
              })
              .closest("." + d.panel)
              .addClass(d.opened)
              .parents("." + d.panel)
              .addClass(d.subopened);
          } else {
            var i = e("li." + d.selected, this.$menu);
            i.parents("li")
              .removeClass(d.selected)
              .end()
              .add(i.parents("li"))
              .addClass(d.opened);
          }
          var a = s.filter("." + d.opened);
          a.length || (a = s.first()),
            a.addClass(d.opened).last().addClass(d.current),
            "horizontal" == this.direction &&
              s.find("." + d.panel).appendTo(this.$menu);
        },
        _initLinks: function () {
          var n = this;
          e("." + d.list + " > li > a", this.$menu)
            .not("." + d.subopen)
            .not("." + d.subclose)
            .not('[rel="external"]')
            .not('[target="_blank"]')
            .off(u.click)
            .on(u.click, function (t) {
              var s = e(this),
                o = s.attr("href");
              n.__valueOrFn(n.opts.onClick.setSelected, s) &&
                s.parent().trigger(u.setSelected);
              var i = n.__valueOrFn(
                n.opts.onClick.preventDefault,
                s,
                "#" == o.slice(0, 1)
              );
              i && t.preventDefault(),
                n.__valueOrFn(n.opts.onClick.blockUI, s, !i) &&
                  r.$html.addClass(d.blocking),
                n.__valueOrFn(n.opts.onClick.close, s, i) &&
                  n.$menu.triggerHandler(u.close);
            });
        },
        _initOpenClose: function () {
          var n = this,
            t = this.$menu.attr("id");
          t &&
            t.length &&
            (this.conf.clone && (t = d.umm(t)),
            e('a[href="#' + t + '"]')
              .off(u.click)
              .on(u.click, function (e) {
                e.preventDefault(), n.$menu.trigger(u.open);
              }));
          var t = r.$page.attr("id");
          t &&
            t.length &&
            e('a[href="#' + t + '"]').on(u.click, function (e) {
              e.preventDefault(), n.$menu.trigger(u.close);
            });
        },
        __valueOrFn: function (e, n, t) {
          return "function" == typeof e
            ? e.call(n[0])
            : "undefined" == typeof e && "undefined" != typeof t
            ? t
            : e;
        },
        __refactorClass: function (e, n) {
          e.removeClass(this.conf[n + "Class"]).addClass(d[n]);
        },
      }),
      (e.fn[a] = function (o, i) {
        return (
          r.$wndw || s(),
          (o = n(o, i)),
          (i = t(i)),
          this.each(function () {
            var n = e(this);
            n.data(a) || n.data(a, new e[a](n, o, i));
          })
        );
      }),
      (e[a].version = l),
      (e[a].defaults = {
        position: "right",
        zposition: "back",
        moveBackground: !0,
        slidingSubmenus: !0,
        modal: !1,
        classes: "",
        onClick: { setSelected: !0 },
      }),
      (e[a].configuration = {
        panelClass: "Panel",
        listClass: "List",
        selectedClass: "Selected",
        labelClass: "Label",
        spacerClass: "Spacer",
        pageNodetype: "div",
        panelNodetype: "ul, ol, div",
        pageSelector: null,
        menuWrapperSelector: "body",
        menuInjectMethod: "prepend",
        transitionDuration: 400,
      }),
      (function () {
        var n = window.document,
          t = window.navigator.userAgent,
          s = (document.createElement("div").style, "ontouchstart" in n),
          o = "WebkitOverflowScrolling" in n.documentElement.style,
          i = (function () {
            return t.indexOf("Android") >= 0
              ? 2.4 > parseFloat(t.slice(t.indexOf("Android") + 8))
              : !1;
          })();
        e[a].support = {
          touch: s,
          oldAndroidBrowser: i,
          overflowscrolling: (function () {
            return s ? (o ? !0 : i ? !1 : !0) : !0;
          })(),
        };
      })(),
      (e[a].debug = function () {}),
      (e[a].deprecated = function (e, n) {
        "undefined" != typeof console &&
          "undefined" != typeof console.warn &&
          console.warn(
            "MMENU: " + e + " is deprecated, use " + n + " instead."
          );
      });
  }
})(jQuery);
/*
 * jQuery mmenu counters addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://en.wikipedia.org/wiki/MIT_License
 * http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
!(function (t) {
  var e = "mmenu",
    n = "counters";
  (t[e].prototype["_addon_" + n] = function () {
    var o = this,
      u = this.opts[n],
      a = t[e]._c,
      r = t[e]._d,
      d = t[e]._e;
    a.add("counter noresults"),
      d.add("updatecounters"),
      "boolean" == typeof u && (u = { add: u, update: u }),
      "object" != typeof u && (u = {}),
      (u = t.extend(!0, {}, t[e].defaults[n], u)),
      u.count &&
        (t[e].deprecated(
          'the option "count" for counters, the option "update"'
        ),
        (u.update = u.count)),
      this.__refactorClass(
        t("em." + this.conf.counterClass, this.$menu),
        "counter"
      );
    var s = t("." + a.panel, this.$menu);
    if (
      (u.add &&
        s.each(function () {
          var e = t(this),
            n = e.data(r.parent);
          if (n) {
            var o = t('<em class="' + a.counter + '" />'),
              u = n.find("> a." + a.subopen);
            u.parent().find("em." + a.counter).length || u.before(o);
          }
        }),
      u.update)
    ) {
      var c = t("em." + a.counter, this.$menu);
      c
        .off(d.updatecounters)
        .on(d.updatecounters, function (t) {
          t.stopPropagation();
        })
        .each(function () {
          var e = t(this),
            n = t(e.next().attr("href"), o.$menu);
          n.is("." + a.list) || (n = n.find("> ." + a.list)),
            n.length &&
              e.on(d.updatecounters, function () {
                var t = n
                  .children()
                  .not("." + a.label)
                  .not("." + a.subtitle)
                  .not("." + a.hidden)
                  .not("." + a.noresults);
                e.html(t.length);
              });
        })
        .trigger(d.updatecounters),
        this.$menu.on(d.update, function () {
          c.trigger(d.updatecounters);
        });
    }
  }),
    (t[e].defaults[n] = { add: !1, update: !1 }),
    (t[e].configuration.counterClass = "Counter"),
    (t[e].addons = t[e].addons || []),
    t[e].addons.push(n);
})(jQuery);
/*
 * jQuery mmenu dragOpen addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://en.wikipedia.org/wiki/MIT_License
 * http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
!(function (e) {
  function t(e, t, a) {
    return t > e && (e = t), e > a && (e = a), e;
  }
  var a = "mmenu",
    o = "dragOpen";
  (e[a].prototype["_addon_" + o] = function () {
    var n = this,
      r = this.opts[o];
    if (e.fn.hammer) {
      var i = e[a]._c,
        s = (e[a]._d, e[a]._e);
      i.add("dragging"), s.add("dragleft dragright dragup dragdown dragend");
      var d = e[a].glbl;
      if (
        ("boolean" == typeof r && (r = { open: r }),
        "object" != typeof r && (r = {}),
        "number" != typeof r.maxStartPos &&
          (r.maxStartPos =
            "left" == this.opts.position || "right" == this.opts.position
              ? 150
              : 75),
        (r = e.extend(!0, {}, e[a].defaults[o], r)),
        r.open)
      ) {
        var p = 0,
          g = !1,
          c = 0,
          h = 0,
          l = "width";
        switch (this.opts.position) {
          case "left":
          case "right":
            l = "width";
            break;
          default:
            l = "height";
        }
        switch (this.opts.position) {
          case "left":
            var f = {
              events: s.dragleft + " " + s.dragright,
              open_dir: "right",
              close_dir: "left",
              delta: "deltaX",
              page: "pageX",
              negative: !1,
            };
            break;
          case "right":
            var f = {
              events: s.dragleft + " " + s.dragright,
              open_dir: "left",
              close_dir: "right",
              delta: "deltaX",
              page: "pageX",
              negative: !0,
            };
            break;
          case "top":
            var f = {
              events: s.dragup + " " + s.dragdown,
              open_dir: "down",
              close_dir: "up",
              delta: "deltaY",
              page: "pageY",
              negative: !1,
            };
            break;
          case "bottom":
            var f = {
              events: s.dragup + " " + s.dragdown,
              open_dir: "up",
              close_dir: "down",
              delta: "deltaY",
              page: "pageY",
              negative: !0,
            };
        }
        var u = this.__valueOrFn(r.pageNode, this.$menu, d.$page);
        "string" == typeof u && (u = e(u));
        var m = d.$page.find(
            "." + i.mm("fixed-top") + ", ." + i.mm("fixed-bottom")
          ),
          v = d.$page;
        switch (n.opts.zposition) {
          case "back":
            v = v.add(m);
            break;
          case "front":
            v = n.$menu;
            break;
          case "next":
            v = v.add(n.$menu).add(m);
        }
        u.hammer()
          .on(s.touchstart + " " + s.mousedown, function (e) {
            if ("touchstart" == e.type)
              var t =
                  e.originalEvent.touches[0] ||
                  e.originalEvent.changedTouches[0],
                a = t[f.page];
            else if ("mousedown" == e.type) var a = e[f.page];
            switch (n.opts.position) {
              case "right":
              case "bottom":
                a >= d.$wndw[l]() - r.maxStartPos && (p = 1);
                break;
              default:
                a <= r.maxStartPos && (p = 1);
            }
          })
          .on(f.events + " " + s.dragend, function (e) {
            p > 0 && (e.gesture.preventDefault(), e.stopPropagation());
          })
          .on(f.events, function (e) {
            var a = f.negative ? -e.gesture[f.delta] : e.gesture[f.delta];
            if (
              ((g = a > c ? f.open_dir : f.close_dir),
              (c = a),
              c > r.threshold && 1 == p)
            ) {
              if (d.$html.hasClass(i.opened)) return;
              (p = 2),
                n._openSetup(),
                d.$html.addClass(i.dragging),
                (h = t(
                  d.$wndw[l]() * n.conf[o][l].perc,
                  n.conf[o][l].min,
                  n.conf[o][l].max
                ));
            }
            2 == p &&
              v.css(
                n.opts.position,
                t(c, 10, h) - ("front" == n.opts.zposition ? h : 0)
              );
          })
          .on(s.dragend, function () {
            2 == p &&
              (d.$html.removeClass(i.dragging),
              v.css(n.opts.position, ""),
              g == f.open_dir ? n._openFinish() : n.close()),
              (p = 0);
          });
      }
    }
  }),
    (e[a].defaults[o] = { open: !1, threshold: 50 }),
    (e[a].configuration[o] = {
      width: { perc: 0.8, min: 140, max: 440 },
      height: { perc: 0.8, min: 140, max: 880 },
    }),
    (e[a].addons = e[a].addons || []),
    e[a].addons.push(o);
})(jQuery);
/*
 * jQuery mmenu header addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://en.wikipedia.org/wiki/MIT_License
 * http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
!(function (e) {
  var t = "mmenu",
    a = "header";
  (e[t].prototype["_addon_" + a] = function () {
    var n = this,
      r = this.opts[a],
      d = this.conf[a],
      s = e[t]._c,
      i = (e[t]._d, e[t]._e);
    s.add("header hasheader prev next title titletext"), i.add("updateheader");
    var o = e[t].glbl;
    if (
      ("boolean" == typeof r && (r = { add: r, update: r }),
      "object" != typeof r && (r = {}),
      (r = e.extend(!0, {}, e[t].defaults[a], r)),
      r.add)
    ) {
      var h = r.content
        ? r.content
        : '<a class="' +
          s.prev +
          '" href="#"></a><span class="' +
          s.title +
          '"></span><a class="' +
          s.next +
          '" href="#"></a>';
      e('<div class="' + s.header + '" />')
        .prependTo(this.$menu)
        .append(h);
    }
    var p = e("div." + s.header, this.$menu);
    if ((p.length && this.$menu.addClass(s.hasheader), r.update && p.length)) {
      var l = p.find("." + s.title),
        u = p.find("." + s.prev),
        f = p.find("." + s.next),
        c = "#" + o.$page.attr("id");
      u.add(f).on(i.click, function (t) {
        t.preventDefault(), t.stopPropagation();
        var a = e(this).attr("href");
        "#" !== a &&
          (a == c ? n.$menu.trigger(i.close) : e(a, n.$menu).trigger(i.open));
      }),
        e("." + s.panel, this.$menu)
          .each(function () {
            var t = e(this),
              a = e("." + d.panelHeaderClass, t).text(),
              n = e("." + d.panelPrevClass, t).attr("href"),
              o = e("." + d.panelNextClass, t).attr("href");
            a || (a = e("." + s.subclose, t).text()),
              a || (a = r.title),
              n || (n = e("." + s.subclose, t).attr("href")),
              t.off(i.updateheader).on(i.updateheader, function (e) {
                e.stopPropagation(),
                  l[a ? "show" : "hide"]().text(a),
                  u[n ? "show" : "hide"]().attr("href", n),
                  f[o ? "show" : "hide"]().attr("href", o);
              }),
              t.on(i.open, function () {
                e(this).trigger(i.updateheader);
              });
          })
          .filter("." + s.current)
          .trigger(i.updateheader);
    }
  }),
    (e[t].defaults[a] = { add: !1, content: !1, update: !1, title: "Menu" }),
    (e[t].configuration[a] = {
      panelHeaderClass: "Header",
      panelNextClass: "Next",
      panelPrevClass: "Prev",
    }),
    (e[t].addons = e[t].addons || []),
    e[t].addons.push(a);
})(jQuery);
/*
 * jQuery mmenu labels addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://en.wikipedia.org/wiki/MIT_License
 * http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
!(function (e) {
  var l = "mmenu",
    s = "labels";
  (e[l].prototype["_addon_" + s] = function () {
    function a() {
      var e = t.hassearch && o.$menu.hasClass(t.hassearch),
        l = t.hasheader && o.$menu.hasClass(t.hasheader);
      return e ? (l ? 100 : 50) : l ? 60 : 0;
    }
    var o = this,
      n = this.opts[s],
      t = e[l]._c,
      i = (e[l]._d, e[l]._e);
    if (
      (t.add("collapsed"),
      t.add("fixedlabels original clone"),
      i.add("updatelabels position scroll"),
      e[l].support.touch && (i.scroll += " " + i.mm("touchmove")),
      "boolean" == typeof n && (n = { collapse: n }),
      "object" != typeof n && (n = {}),
      (n = e.extend(!0, {}, e[l].defaults[s], n)),
      n.collapse)
    ) {
      this.__refactorClass(
        e("li." + this.conf.collapsedClass, this.$menu),
        "collapsed"
      );
      var d = e("." + t.label, this.$menu);
      d.each(function () {
        var l = e(this),
          s = l.nextUntil(
            "." + t.label,
            "all" == n.collapse ? null : "." + t.collapsed
          );
        "all" == n.collapse &&
          (l.addClass(t.opened), s.removeClass(t.collapsed)),
          s.length &&
            (l.wrapInner("<span />"),
            e('<a href="#" class="' + t.subopen + " " + t.fullsubopen + '" />')
              .prependTo(l)
              .on(i.click, function (e) {
                e.preventDefault(),
                  l.toggleClass(t.opened),
                  s[l.hasClass(t.opened) ? "removeClass" : "addClass"](
                    t.collapsed
                  );
              }));
      });
    } else if (n.fixed) {
      if ("horizontal" != this.direction) return;
      this.$menu.addClass(t.fixedlabels);
      var r = e("." + t.panel, this.$menu),
        d = e("." + t.label, this.$menu);
      r.add(d)
        .off(i.updatelabels + " " + i.position + " " + i.scroll)
        .on(i.updatelabels + " " + i.position + " " + i.scroll, function (e) {
          e.stopPropagation();
        });
      var p = a();
      r.each(function () {
        var l = e(this),
          s = l.find("." + t.label);
        if (s.length) {
          var o = l.scrollTop();
          s.each(function () {
            var s = e(this);
            s.wrapInner("<div />").wrapInner("<div />");
            var a,
              n,
              d,
              r = s.find("> div"),
              c = e();
            s.on(i.updatelabels, function () {
              (o = l.scrollTop()),
                s.hasClass(t.hidden) ||
                  ((c = s
                    .nextAll("." + t.label)
                    .not("." + t.hidden)
                    .first()),
                  (a = s.offset().top + o),
                  (n = c.length ? c.offset().top + o : !1),
                  (d = r.height()),
                  s.trigger(i.position));
            }),
              s.on(i.position, function () {
                var e = 0;
                n && o + p > n - d
                  ? (e = n - a - d)
                  : o + p > a && (e = o - a + p),
                  r.css("top", e);
              });
          }),
            l
              .on(i.updatelabels, function () {
                (o = l.scrollTop()), (p = a()), s.trigger(i.position);
              })
              .on(i.scroll, function () {
                s.trigger(i.updatelabels);
              });
        }
      }),
        this.$menu
          .on(i.update, function () {
            r.trigger(i.updatelabels);
          })
          .on(i.opening, function () {
            r.trigger(i.updatelabels).trigger(i.scroll);
          });
    }
  }),
    (e[l].defaults[s] = { fixed: !1, collapse: !1 }),
    (e[l].configuration.collapsedClass = "Collapsed"),
    (e[l].addons = e[l].addons || []),
    e[l].addons.push(s);
})(jQuery);
/*
 * jQuery mmenu searchfield addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://en.wikipedia.org/wiki/MIT_License
 * http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
!(function (e) {
  function s(e) {
    switch (e) {
      case 9:
      case 16:
      case 17:
      case 18:
      case 37:
      case 38:
      case 39:
      case 40:
        return !0;
    }
    return !1;
  }
  var n = "mmenu",
    t = "searchfield";
  (e[n].prototype["_addon_" + t] = function () {
    var a = this,
      r = this.opts[t],
      o = e[n]._c,
      l = e[n]._d,
      d = e[n]._e;
    if (
      (o.add("search hassearch noresults nosubresults counter"),
      d.add("search reset change"),
      "boolean" == typeof r && (r = { add: r, search: r }),
      "object" != typeof r && (r = {}),
      (r = e.extend(!0, {}, e[n].defaults[t], r)),
      r.add &&
        (e('<div class="' + o.search + '" />')
          .prependTo(this.$menu)
          .append(
            '<input placeholder="' +
              r.placeholder +
              '" type="text" autocomplete="off" />'
          ),
        r.noResults &&
          e("ul, ol", this.$menu)
            .first()
            .append(
              '<li class="' + o.noresults + '">' + r.noResults + "</li>"
            )),
      e("div." + o.search, this.$menu).length &&
        this.$menu.addClass(o.hassearch),
      r.search)
    ) {
      var i = e("div." + o.search, this.$menu).find("input");
      if (i.length) {
        var u = e("." + o.panel, this.$menu),
          h = e("." + o.list + "> li." + o.label, this.$menu),
          c = e("." + o.list + "> li", this.$menu)
            .not("." + o.subtitle)
            .not("." + o.label)
            .not("." + o.noresults),
          f = "> a";
        r.showLinksOnly || (f += ", > span"),
          i
            .off(d.keyup + " " + d.change)
            .on(d.keyup, function (e) {
              s(e.keyCode) || a.$menu.trigger(d.search);
            })
            .on(d.change, function () {
              a.$menu.trigger(d.search);
            }),
          this.$menu
            .off(d.reset + " " + d.search)
            .on(d.reset + " " + d.search, function (e) {
              e.stopPropagation();
            })
            .on(d.reset, function () {
              a.$menu.trigger(d.search, [""]);
            })
            .on(d.search, function (s, n) {
              "string" == typeof n ? i.val(n) : (n = i.val()),
                (n = n.toLowerCase()),
                u.scrollTop(0),
                c.add(h).addClass(o.hidden),
                c.each(function () {
                  var s = e(this);
                  e(f, s).text().toLowerCase().indexOf(n) > -1 &&
                    s
                      .add(s.prevAll("." + o.label).first())
                      .removeClass(o.hidden);
                }),
                e(u.get().reverse()).each(function () {
                  var s = e(this),
                    n = s.data(l.parent);
                  if (n) {
                    var t = s
                      .add(s.find("> ." + o.list))
                      .find("> li")
                      .not("." + o.subtitle)
                      .not("." + o.label)
                      .not("." + o.hidden);
                    t.length
                      ? n
                          .removeClass(o.hidden)
                          .removeClass(o.nosubresults)
                          .prevAll("." + o.label)
                          .first()
                          .removeClass(o.hidden)
                      : (s.hasClass(o.current) && n.trigger(d.open),
                        n.addClass(o.nosubresults));
                  }
                }),
                a.$menu[
                  c.not("." + o.hidden).length ? "removeClass" : "addClass"
                ](o.noresults),
                a.$menu.trigger(d.update);
            });
      }
    }
  }),
    (e[n].defaults[t] = {
      add: !1,
      search: !1,
      showLinksOnly: !0,
      placeholder: "Search",
      noResults: "No results found.",
    }),
    (e[n].addons = e[n].addons || []),
    e[n].addons.push(t);
})(jQuery);

(function () {
  var l, a;
  (l = this),
    (a = function () {
      "use strict";
      var l = {},
        a = {};
      try {
        "undefined" != typeof window && (l = window),
          "undefined" != typeof document && (a = document);
      } catch (l) {}
      var e = (l.navigator || {}).userAgent,
        r = void 0 === e ? "" : e,
        n = l,
        o = a,
        u =
          (n.document,
          !!o.documentElement &&
            !!o.head &&
            "function" == typeof o.addEventListener &&
            o.createElement,
          ~r.indexOf("MSIE") || r.indexOf("Trident/"),
          "___FONT_AWESOME___"),
        t = (function () {
          try {
            return "production" === process.env.NODE_ENV;
          } catch (l) {
            return !1;
          }
        })();
      var f = n || {};
      f[u] || (f[u] = {}),
        f[u].styles || (f[u].styles = {}),
        f[u].hooks || (f[u].hooks = {}),
        f[u].shims || (f[u].shims = []);
      var i = f[u],
        s = [
          ["glass", null, "glass-martini"],
          ["meetup", "fab", null],
          ["star-o", "far", "star"],
          ["remove", null, "times"],
          ["close", null, "times"],
          ["gear", null, "cog"],
          ["trash-o", "far", "trash-alt"],
          ["file-o", "far", "file"],
          ["clock-o", "far", "clock"],
          ["arrow-circle-o-down", "far", "arrow-alt-circle-down"],
          ["arrow-circle-o-up", "far", "arrow-alt-circle-up"],
          ["play-circle-o", "far", "play-circle"],
          ["repeat", null, "redo"],
          ["rotate-right", null, "redo"],
          ["refresh", null, "sync"],
          ["list-alt", "far", null],
          ["dedent", null, "outdent"],
          ["video-camera", null, "video"],
          ["picture-o", "far", "image"],
          ["photo", "far", "image"],
          ["image", "far", "image"],
          ["pencil", null, "pencil-alt"],
          ["map-marker", null, "map-marker-alt"],
          ["pencil-square-o", "far", "edit"],
          ["share-square-o", "far", "share-square"],
          ["check-square-o", "far", "check-square"],
          ["arrows", null, "arrows-alt"],
          ["times-circle-o", "far", "times-circle"],
          ["check-circle-o", "far", "check-circle"],
          ["mail-forward", null, "share"],
          ["expand", null, "expand-alt"],
          ["compress", null, "compress-alt"],
          ["eye", "far", null],
          ["eye-slash", "far", null],
          ["warning", null, "exclamation-triangle"],
          ["calendar", null, "calendar-alt"],
          ["arrows-v", null, "arrows-alt-v"],
          ["arrows-h", null, "arrows-alt-h"],
          ["bar-chart", "far", "chart-bar"],
          ["bar-chart-o", "far", "chart-bar"],
          ["twitter-square", "fab", null],
          ["facebook-square", "fab", null],
          ["gears", null, "cogs"],
          ["thumbs-o-up", "far", "thumbs-up"],
          ["thumbs-o-down", "far", "thumbs-down"],
          ["heart-o", "far", "heart"],
          ["sign-out", null, "sign-out-alt"],
          ["linkedin-square", "fab", "linkedin"],
          ["thumb-tack", null, "thumbtack"],
          ["external-link", null, "external-link-alt"],
          ["sign-in", null, "sign-in-alt"],
          ["github-square", "fab", null],
          ["lemon-o", "far", "lemon"],
          ["square-o", "far", "square"],
          ["bookmark-o", "far", "bookmark"],
          ["twitter", "fab", null],
          ["facebook", "fab", "facebook-f"],
          ["facebook-f", "fab", "facebook-f"],
          ["github", "fab", null],
          ["credit-card", "far", null],
          ["feed", null, "rss"],
          ["hdd-o", "far", "hdd"],
          ["hand-o-right", "far", "hand-point-right"],
          ["hand-o-left", "far", "hand-point-left"],
          ["hand-o-up", "far", "hand-point-up"],
          ["hand-o-down", "far", "hand-point-down"],
          ["arrows-alt", null, "expand-arrows-alt"],
          ["group", null, "users"],
          ["chain", null, "link"],
          ["scissors", null, "cut"],
          ["files-o", "far", "copy"],
          ["floppy-o", "far", "save"],
          ["navicon", null, "bars"],
          ["reorder", null, "bars"],
          ["pinterest", "fab", null],
          ["pinterest-square", "fab", null],
          ["google-plus-square", "fab", null],
          ["google-plus", "fab", "google-plus-g"],
          ["money", "far", "money-bill-alt"],
          ["unsorted", null, "sort"],
          ["sort-desc", null, "sort-down"],
          ["sort-asc", null, "sort-up"],
          ["linkedin", "fab", "linkedin-in"],
          ["rotate-left", null, "undo"],
          ["legal", null, "gavel"],
          ["tachometer", null, "tachometer-alt"],
          ["dashboard", null, "tachometer-alt"],
          ["comment-o", "far", "comment"],
          ["comments-o", "far", "comments"],
          ["flash", null, "bolt"],
          ["clipboard", "far", null],
          ["paste", "far", "clipboard"],
          ["lightbulb-o", "far", "lightbulb"],
          ["exchange", null, "exchange-alt"],
          ["cloud-download", null, "cloud-download-alt"],
          ["cloud-upload", null, "cloud-upload-alt"],
          ["bell-o", "far", "bell"],
          ["cutlery", null, "utensils"],
          ["file-text-o", "far", "file-alt"],
          ["building-o", "far", "building"],
          ["hospital-o", "far", "hospital"],
          ["tablet", null, "tablet-alt"],
          ["mobile", null, "mobile-alt"],
          ["mobile-phone", null, "mobile-alt"],
          ["circle-o", "far", "circle"],
          ["mail-reply", null, "reply"],
          ["github-alt", "fab", null],
          ["folder-o", "far", "folder"],
          ["folder-open-o", "far", "folder-open"],
          ["smile-o", "far", "smile"],
          ["frown-o", "far", "frown"],
          ["meh-o", "far", "meh"],
          ["keyboard-o", "far", "keyboard"],
          ["flag-o", "far", "flag"],
          ["mail-reply-all", null, "reply-all"],
          ["star-half-o", "far", "star-half"],
          ["star-half-empty", "far", "star-half"],
          ["star-half-full", "far", "star-half"],
          ["code-fork", null, "code-branch"],
          ["chain-broken", null, "unlink"],
          ["shield", null, "shield-alt"],
          ["calendar-o", "far", "calendar"],
          ["maxcdn", "fab", null],
          ["html5", "fab", null],
          ["css3", "fab", null],
          ["ticket", null, "ticket-alt"],
          ["minus-square-o", "far", "minus-square"],
          ["level-up", null, "level-up-alt"],
          ["level-down", null, "level-down-alt"],
          ["pencil-square", null, "pen-square"],
          ["external-link-square", null, "external-link-square-alt"],
          ["compass", "far", null],
          ["caret-square-o-down", "far", "caret-square-down"],
          ["toggle-down", "far", "caret-square-down"],
          ["caret-square-o-up", "far", "caret-square-up"],
          ["toggle-up", "far", "caret-square-up"],
          ["caret-square-o-right", "far", "caret-square-right"],
          ["toggle-right", "far", "caret-square-right"],
          ["eur", null, "euro-sign"],
          ["euro", null, "euro-sign"],
          ["gbp", null, "pound-sign"],
          ["usd", null, "dollar-sign"],
          ["dollar", null, "dollar-sign"],
          ["inr", null, "rupee-sign"],
          ["rupee", null, "rupee-sign"],
          ["jpy", null, "yen-sign"],
          ["cny", null, "yen-sign"],
          ["rmb", null, "yen-sign"],
          ["yen", null, "yen-sign"],
          ["rub", null, "ruble-sign"],
          ["ruble", null, "ruble-sign"],
          ["rouble", null, "ruble-sign"],
          ["krw", null, "won-sign"],
          ["won", null, "won-sign"],
          ["btc", "fab", null],
          ["bitcoin", "fab", "btc"],
          ["file-text", null, "file-alt"],
          ["sort-alpha-asc", null, "sort-alpha-down"],
          ["sort-alpha-desc", null, "sort-alpha-down-alt"],
          ["sort-amount-asc", null, "sort-amount-down"],
          ["sort-amount-desc", null, "sort-amount-down-alt"],
          ["sort-numeric-asc", null, "sort-numeric-down"],
          ["sort-numeric-desc", null, "sort-numeric-down-alt"],
          ["youtube-square", "fab", null],
          ["youtube", "fab", null],
          ["xing", "fab", null],
          ["xing-square", "fab", null],
          ["youtube-play", "fab", "youtube"],
          ["dropbox", "fab", null],
          ["stack-overflow", "fab", null],
          ["instagram", "fab", null],
          ["flickr", "fab", null],
          ["adn", "fab", null],
          ["bitbucket", "fab", null],
          ["bitbucket-square", "fab", "bitbucket"],
          ["tumblr", "fab", null],
          ["tumblr-square", "fab", null],
          ["long-arrow-down", null, "long-arrow-alt-down"],
          ["long-arrow-up", null, "long-arrow-alt-up"],
          ["long-arrow-left", null, "long-arrow-alt-left"],
          ["long-arrow-right", null, "long-arrow-alt-right"],
          ["apple", "fab", null],
          ["windows", "fab", null],
          ["android", "fab", null],
          ["linux", "fab", null],
          ["dribbble", "fab", null],
          ["skype", "fab", null],
          ["foursquare", "fab", null],
          ["trello", "fab", null],
          ["gratipay", "fab", null],
          ["gittip", "fab", "gratipay"],
          ["sun-o", "far", "sun"],
          ["moon-o", "far", "moon"],
          ["vk", "fab", null],
          ["weibo", "fab", null],
          ["renren", "fab", null],
          ["pagelines", "fab", null],
          ["stack-exchange", "fab", null],
          ["arrow-circle-o-right", "far", "arrow-alt-circle-right"],
          ["arrow-circle-o-left", "far", "arrow-alt-circle-left"],
          ["caret-square-o-left", "far", "caret-square-left"],
          ["toggle-left", "far", "caret-square-left"],
          ["dot-circle-o", "far", "dot-circle"],
          ["vimeo-square", "fab", null],
          ["try", null, "lira-sign"],
          ["turkish-lira", null, "lira-sign"],
          ["plus-square-o", "far", "plus-square"],
          ["slack", "fab", null],
          ["wordpress", "fab", null],
          ["openid", "fab", null],
          ["institution", null, "university"],
          ["bank", null, "university"],
          ["mortar-board", null, "graduation-cap"],
          ["yahoo", "fab", null],
          ["google", "fab", null],
          ["reddit", "fab", null],
          ["reddit-square", "fab", null],
          ["stumbleupon-circle", "fab", null],
          ["stumbleupon", "fab", null],
          ["delicious", "fab", null],
          ["digg", "fab", null],
          ["pied-piper-pp", "fab", null],
          ["pied-piper-alt", "fab", null],
          ["drupal", "fab", null],
          ["joomla", "fab", null],
          ["spoon", null, "utensil-spoon"],
          ["behance", "fab", null],
          ["behance-square", "fab", null],
          ["steam", "fab", null],
          ["steam-square", "fab", null],
          ["automobile", null, "car"],
          ["envelope-o", "far", "envelope"],
          ["spotify", "fab", null],
          ["deviantart", "fab", null],
          ["soundcloud", "fab", null],
          ["file-pdf-o", "far", "file-pdf"],
          ["file-word-o", "far", "file-word"],
          ["file-excel-o", "far", "file-excel"],
          ["file-powerpoint-o", "far", "file-powerpoint"],
          ["file-image-o", "far", "file-image"],
          ["file-photo-o", "far", "file-image"],
          ["file-picture-o", "far", "file-image"],
          ["file-archive-o", "far", "file-archive"],
          ["file-zip-o", "far", "file-archive"],
          ["file-audio-o", "far", "file-audio"],
          ["file-sound-o", "far", "file-audio"],
          ["file-video-o", "far", "file-video"],
          ["file-movie-o", "far", "file-video"],
          ["file-code-o", "far", "file-code"],
          ["vine", "fab", null],
          ["codepen", "fab", null],
          ["jsfiddle", "fab", null],
          ["life-ring", "far", null],
          ["life-bouy", "far", "life-ring"],
          ["life-buoy", "far", "life-ring"],
          ["life-saver", "far", "life-ring"],
          ["support", "far", "life-ring"],
          ["circle-o-notch", null, "circle-notch"],
          ["rebel", "fab", null],
          ["ra", "fab", "rebel"],
          ["resistance", "fab", "rebel"],
          ["empire", "fab", null],
          ["ge", "fab", "empire"],
          ["git-square", "fab", null],
          ["git", "fab", null],
          ["hacker-news", "fab", null],
          ["y-combinator-square", "fab", "hacker-news"],
          ["yc-square", "fab", "hacker-news"],
          ["tencent-weibo", "fab", null],
          ["qq", "fab", null],
          ["weixin", "fab", null],
          ["wechat", "fab", "weixin"],
          ["send", null, "paper-plane"],
          ["paper-plane-o", "far", "paper-plane"],
          ["send-o", "far", "paper-plane"],
          ["circle-thin", "far", "circle"],
          ["header", null, "heading"],
          ["sliders", null, "sliders-h"],
          ["futbol-o", "far", "futbol"],
          ["soccer-ball-o", "far", "futbol"],
          ["slideshare", "fab", null],
          ["twitch", "fab", null],
          ["yelp", "fab", null],
          ["newspaper-o", "far", "newspaper"],
          ["paypal", "fab", null],
          ["google-wallet", "fab", null],
          ["cc-visa", "fab", null],
          ["cc-mastercard", "fab", null],
          ["cc-discover", "fab", null],
          ["cc-amex", "fab", null],
          ["cc-paypal", "fab", null],
          ["cc-stripe", "fab", null],
          ["bell-slash-o", "far", "bell-slash"],
          ["trash", null, "trash-alt"],
          ["copyright", "far", null],
          ["eyedropper", null, "eye-dropper"],
          ["area-chart", null, "chart-area"],
          ["pie-chart", null, "chart-pie"],
          ["line-chart", null, "chart-line"],
          ["lastfm", "fab", null],
          ["lastfm-square", "fab", null],
          ["ioxhost", "fab", null],
          ["angellist", "fab", null],
          ["cc", "far", "closed-captioning"],
          ["ils", null, "shekel-sign"],
          ["shekel", null, "shekel-sign"],
          ["sheqel", null, "shekel-sign"],
          ["meanpath", "fab", "font-awesome"],
          ["buysellads", "fab", null],
          ["connectdevelop", "fab", null],
          ["dashcube", "fab", null],
          ["forumbee", "fab", null],
          ["leanpub", "fab", null],
          ["sellsy", "fab", null],
          ["shirtsinbulk", "fab", null],
          ["simplybuilt", "fab", null],
          ["skyatlas", "fab", null],
          ["diamond", "far", "gem"],
          ["intersex", null, "transgender"],
          ["facebook-official", "fab", "facebook"],
          ["pinterest-p", "fab", null],
          ["whatsapp", "fab", null],
          ["hotel", null, "bed"],
          ["viacoin", "fab", null],
          ["medium", "fab", null],
          ["y-combinator", "fab", null],
          ["yc", "fab", "y-combinator"],
          ["optin-monster", "fab", null],
          ["opencart", "fab", null],
          ["expeditedssl", "fab", null],
          ["battery-4", null, "battery-full"],
          ["battery", null, "battery-full"],
          ["battery-3", null, "battery-three-quarters"],
          ["battery-2", null, "battery-half"],
          ["battery-1", null, "battery-quarter"],
          ["battery-0", null, "battery-empty"],
          ["object-group", "far", null],
          ["object-ungroup", "far", null],
          ["sticky-note-o", "far", "sticky-note"],
          ["cc-jcb", "fab", null],
          ["cc-diners-club", "fab", null],
          ["clone", "far", null],
          ["hourglass-o", "far", "hourglass"],
          ["hourglass-1", null, "hourglass-start"],
          ["hourglass-2", null, "hourglass-half"],
          ["hourglass-3", null, "hourglass-end"],
          ["hand-rock-o", "far", "hand-rock"],
          ["hand-grab-o", "far", "hand-rock"],
          ["hand-paper-o", "far", "hand-paper"],
          ["hand-stop-o", "far", "hand-paper"],
          ["hand-scissors-o", "far", "hand-scissors"],
          ["hand-lizard-o", "far", "hand-lizard"],
          ["hand-spock-o", "far", "hand-spock"],
          ["hand-pointer-o", "far", "hand-pointer"],
          ["hand-peace-o", "far", "hand-peace"],
          ["registered", "far", null],
          ["creative-commons", "fab", null],
          ["gg", "fab", null],
          ["gg-circle", "fab", null],
          ["tripadvisor", "fab", null],
          ["odnoklassniki", "fab", null],
          ["odnoklassniki-square", "fab", null],
          ["get-pocket", "fab", null],
          ["wikipedia-w", "fab", null],
          ["safari", "fab", null],
          ["chrome", "fab", null],
          ["firefox", "fab", null],
          ["opera", "fab", null],
          ["internet-explorer", "fab", null],
          ["television", null, "tv"],
          ["contao", "fab", null],
          ["500px", "fab", null],
          ["amazon", "fab", null],
          ["calendar-plus-o", "far", "calendar-plus"],
          ["calendar-minus-o", "far", "calendar-minus"],
          ["calendar-times-o", "far", "calendar-times"],
          ["calendar-check-o", "far", "calendar-check"],
          ["map-o", "far", "map"],
          ["commenting", null, "comment-dots"],
          ["commenting-o", "far", "comment-dots"],
          ["houzz", "fab", null],
          ["vimeo", "fab", "vimeo-v"],
          ["black-tie", "fab", null],
          ["fonticons", "fab", null],
          ["reddit-alien", "fab", null],
          ["edge", "fab", null],
          ["credit-card-alt", null, "credit-card"],
          ["codiepie", "fab", null],
          ["modx", "fab", null],
          ["fort-awesome", "fab", null],
          ["usb", "fab", null],
          ["product-hunt", "fab", null],
          ["mixcloud", "fab", null],
          ["scribd", "fab", null],
          ["pause-circle-o", "far", "pause-circle"],
          ["stop-circle-o", "far", "stop-circle"],
          ["bluetooth", "fab", null],
          ["bluetooth-b", "fab", null],
          ["gitlab", "fab", null],
          ["wpbeginner", "fab", null],
          ["wpforms", "fab", null],
          ["envira", "fab", null],
          ["wheelchair-alt", "fab", "accessible-icon"],
          ["question-circle-o", "far", "question-circle"],
          ["volume-control-phone", null, "phone-volume"],
          ["asl-interpreting", null, "american-sign-language-interpreting"],
          ["deafness", null, "deaf"],
          ["hard-of-hearing", null, "deaf"],
          ["glide", "fab", null],
          ["glide-g", "fab", null],
          ["signing", null, "sign-language"],
          ["viadeo", "fab", null],
          ["viadeo-square", "fab", null],
          ["snapchat", "fab", null],
          ["snapchat-ghost", "fab", null],
          ["snapchat-square", "fab", null],
          ["pied-piper", "fab", null],
          ["first-order", "fab", null],
          ["yoast", "fab", null],
          ["themeisle", "fab", null],
          ["google-plus-official", "fab", "google-plus"],
          ["google-plus-circle", "fab", "google-plus"],
          ["font-awesome", "fab", null],
          ["fa", "fab", "font-awesome"],
          ["handshake-o", "far", "handshake"],
          ["envelope-open-o", "far", "envelope-open"],
          ["linode", "fab", null],
          ["address-book-o", "far", "address-book"],
          ["vcard", null, "address-card"],
          ["address-card-o", "far", "address-card"],
          ["vcard-o", "far", "address-card"],
          ["user-circle-o", "far", "user-circle"],
          ["user-o", "far", "user"],
          ["id-badge", "far", null],
          ["drivers-license", null, "id-card"],
          ["id-card-o", "far", "id-card"],
          ["drivers-license-o", "far", "id-card"],
          ["quora", "fab", null],
          ["free-code-camp", "fab", null],
          ["telegram", "fab", null],
          ["thermometer-4", null, "thermometer-full"],
          ["thermometer", null, "thermometer-full"],
          ["thermometer-3", null, "thermometer-three-quarters"],
          ["thermometer-2", null, "thermometer-half"],
          ["thermometer-1", null, "thermometer-quarter"],
          ["thermometer-0", null, "thermometer-empty"],
          ["bathtub", null, "bath"],
          ["s15", null, "bath"],
          ["window-maximize", "far", null],
          ["window-restore", "far", null],
          ["times-rectangle", null, "window-close"],
          ["window-close-o", "far", "window-close"],
          ["times-rectangle-o", "far", "window-close"],
          ["bandcamp", "fab", null],
          ["grav", "fab", null],
          ["etsy", "fab", null],
          ["imdb", "fab", null],
          ["ravelry", "fab", null],
          ["eercast", "fab", "sellcast"],
          ["snowflake-o", "far", "snowflake"],
          ["superpowers", "fab", null],
          ["wpexplorer", "fab", null],
          ["cab", null, "taxi"],
        ];
      return (
        (function (l) {
          try {
            l();
          } catch (l) {
            if (!t) throw l;
          }
        })(function () {
          var l;
          "function" == typeof i.hooks.addShims
            ? i.hooks.addShims(s)
            : (l = i.shims).push.apply(l, s);
        }),
        s
      );
    }),
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = a())
      : "function" == typeof define && define.amd
      ? define(a)
      : (l["fontawesome-free-shims"] = a());
})();
