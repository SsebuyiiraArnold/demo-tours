!function(T, C) {
    "use strict";
    function A() {
        T("body").data("rs-fullScreenMode", !T("body").data("rs-fullScreenMode")),
        T("body").data("rs-fullScreenMode") && setTimeout(function() {
            P.window.trigger("resize")
        }, 200)
    }
    function D(e, t) {
        return T(0 == t ? e : (1 == t ? e : (2 == t ? e : (3 == t ? e : (4 == t ? e : e.parentNode).parentNode).parentNode).parentNode).parentNode)
    }
    function r(e, t, i) {
        if (P[t] !== C) {
            P[t].syncload--;
            var a, r = P.gA(e, "reference");
            for (a in P[t].loadqueue)
                P[t].loadqueue.hasOwnProperty(a) && "loaded" !== P[t].loadqueue[a].progress && r == P[t].loadqueue[a].src && (P[t].loadqueue[a].img = e,
                P[t].loadqueue[a].progress = i,
                P[t].loadqueue[a].width = e.naturalWidth,
                P[t].loadqueue[a].height = e.naturalHeight);
            m(t)
        }
    }
    function t(e) {
        function t() {
            e !== C && P !== C && P[e] !== C && (0 == T("body").find(P[e].c).length || null === P[e] || null === P[e].c || P[e].c === C || 0 === P[e].length ? (E(e),
            clearInterval(P[e].cdint)) : (P[e].c.trigger("revolution.slide.slideatend"),
            1 == P[e].c.data("conthoverchanged") && (P[e].conthover = P[e].c.data("conthover"),
            P[e].c.data("conthoverchanged", 0)),
            P.callingNewSlide(e, 1, !0)))
        }
        var i = tpGS.gsap.timeline({
            paused: !0
        })
          , a = "reset" === P[e].progressBar.reset || P[e].progressBar.notnew === C ? 0 : .2
          , r = (r = "slide" === P[e].progressBar.basedon ? 0 : P[e].pr_processing_key !== C ? P[e].pr_processing_key : P[e].pr_active_key) === C ? 0 : r;
        if ("horizontal" === P[e].progressBar.style) {
            if (i.add(tpGS.gsap.to(P[e].progressCBarInner[r], a, {
                scaleX: 0,
                transformOrigin: "right" === P[e].progressBar.horizontal ? "100% 50%" : "0% 50%"
            })),
            i.add(tpGS.gsap.to(P[e].progressCBarInner[r], P[e].duration / 1e3, {
                transformOrigin: "right" === P[e].progressBar.horizontal ? "100% 50%" : "0% 50%",
                force3D: "auto",
                scaleX: 1,
                onComplete: t,
                delay: .5,
                ease: P[e].progressBar.ease
            })),
            "module" === P[e].progressBar.basedon)
                for (var o = 0; o < P[e].slideamount; o++)
                    o !== r && i.add(tpGS.gsap.set(P[e].progressCBarInner[o], {
                        scaleX: o < r ? 1 : 0,
                        transformOrigin: "right" === P[e].progressBar.horizontal ? "100% 50%" : "0% 50%"
                    }), 0)
        } else if ("vertical" === P[e].progressBar.style) {
            if (P[e].progressCBarInner[r] !== C && i.add(tpGS.gsap.to(P[e].progressCBarInner[r], a, {
                scaleY: 0,
                transformOrigin: "bottom" === P[e].progressBar.vertical ? "50% 100%" : "50% 0%"
            })),
            P[e].progressCBarInner[r] !== C && i.add(tpGS.gsap.to(P[e].progressCBarInner[r], P[e].duration / 1e3, {
                transformOrigin: "bottom" === P[e].progressBar.vertical ? "50% 100%" : "50% 0%",
                force3D: "auto",
                scaleY: 1,
                onComplete: t,
                delay: .5,
                ease: P[e].progressBar.ease
            })),
            "module" === P[e].progressBar.basedon)
                for (o = 0; o < P[e].slideamount; o++)
                    o !== r && P[e].progressCBarInner[o] !== C && i.add(tpGS.gsap.set(P[e].progressCBarInner[o], {
                        scaleY: o < r ? 1 : 0,
                        transformOrigin: "botton" === P[e].progressBar.vertical ? "50% 100%" : "50% 0%"
                    }), 0)
        } else {
            var s = "slide" === P[e].progressBar.basedon ? 0 : Math.max(0, 360 / P[e].slideamount * r)
              , n = "slide" === P[e].progressBar.basedon ? 360 : 360 / P[e].slideamount * (r + 1);
            "ccw" === P[e].progressBar.style && "slide" !== P[e].progressBar.basedon && (s = 360 - n,
            n = 360 - 360 / P[e].slideamount * r),
            i.add(tpGS.gsap.to(P[e].progressBar, a, {
                degree: "cw" === P[e].progressBar.style ? s : n,
                onUpdate: function() {
                    S(e)
                }
            })),
            i.add(tpGS.gsap.to(P[e].progressBar, P[e].duration / 1e3, {
                degree: "cw" === P[e].progressBar.style ? n : s,
                onUpdate: function() {
                    S(e)
                },
                onComplete: t,
                delay: .5,
                ease: P[e].progressBar.ease
            }))
        }
        return P[e].progressBar.notnew = !0,
        i
    }
    function i() {
        T(".rev_redraw_on_blurfocus").each(function() {
            var e = this.id;
            if (P[e] == C || P[e].c == C || 0 === P[e].c.length)
                return !1;
            1 != P[e].windowfocused && (P[e].windowfocused = !0,
            tpGS.gsap.delayedCall(.1, function() {
                P[e].fallbacks.nextSlideOnWindowFocus && P[e].c.revnext(),
                P[e].c.revredraw(),
                "playing" == P[e].lastsliderstatus && P[e].c.revresume(),
                P[e].c.trigger("revolution.slide.tabfocused")
            }))
        })
    }
    function a() {
        document.hasFocus() || T(".rev_redraw_on_blurfocus").each(function(e) {
            var t = this.id;
            P[t].windowfocused = !1,
            P[t].lastsliderstatus = P[t].sliderstatus,
            P[t].c.revpause(),
            P[t].c.trigger("revolution.slide.tabblured")
        })
    }
    var e, o = "Slider Revolution 6.6.16", P = (window.RSANYID = window.RSANYID === C ? [] : window.RSANYID,
    window.RSANYID_sliderID = window.RSANYID_sliderID === C ? [] : window.RSANYID_sliderID,
    T.fn.revolution = T.fn.revolution || {},
    T.fn.revolution), P = (T.fn.revolutionInit = function(a) {
        return this.each(function() {
            P.ISM = P.ISM || P.is_mobile();
            for (var e = document.getElementsByClassName("rs-p-wp-fix"); e[0]; )
                e[0].parentNode.removeChild(e[0]);
            this.id !== C ? (P[t] = {
                anyid: []
            },
            this.id = P.revCheckIDS(t, this, !0)) : this.id = "rs_module_" + Math.round(1e7 * Math.random());
            var t = this.id
              , i = P.clone(a);
            P[t] = U(a),
            P[t].ignoreHeightChange = P.ISM && "fullscreen" === P[t].sliderLayout && P[t].ignoreHeightChange,
            P[t].option_export = i,
            P[t].anyid = [],
            P[t]._Lshortcuts = {},
            P[t].computedStyle = {},
            P[t].c = T(this),
            P[t].cpar = P[t].c.parent(),
            P[t].canvas = P[t].c.find("rs-slides"),
            P[t].caches = {
                calcResponsiveLayersList: [],
                contWidthManager: {},
                middleHeights: {}
            },
            P[t].sbgs = {},
            window.RSBrowser = window.RSBrowser === C ? P.get_browser() : window.RSBrowser,
            P.setIsIOS(),
            P.setIsChrome8889(),
            P.useBackdrop === C && P.checkBackdrop(),
            P[t].noDetach = P[t].BUG_ie_clipPath = "Edge" === window.RSBrowser || "IE" === window.RSBrowser,
            P.getByTag = s(),
            P[t].indexhelper = 0,
            P[t].fullScreenOffsetResult = 0,
            P[t].level = 0,
            P[t].rtl = T("body").hasClass("rtl") || "rtl" == document.dir,
            P[t]._L = P[t]._L === C ? {} : P[t]._L,
            P[t].emptyObject = "{}",
            P[t].dimensionReCheck = {},
            P.globalListener === C && P.pageHandler(t),
            P[t].stopAfterLoops != C && -1 < P[t].stopAfterLoops ? P[t].looptogo = P[t].stopAfterLoops : P[t].looptogo = "disabled",
            window.T = P[t],
            P[t].BUG_safari_clipPath = "Safari" === P.get_browser() && "12" < P.get_browser_version(),
            P[t].minHeight = "fullwidth" !== P[t].sliderLayout && "carousel" !== P[t].sliderType && P[t].minHeight != C && "" !== P[t].minHeight ? parseInt(P[t].minHeight, 0) : 0,
            P[t].minHeight = P[t].minHeight === C ? 0 : P[t].minHeight,
            P[t].isEdge = "Edge" === P.get_browser(),
            n(t),
            P.updateVisibleArea(t),
            V(t),
            P.mesuredScrollBarDone || P.mesureScrollBar(),
            window.requestAnimationFrame(function() {
                var e;
                "fullscreen" === P[t].sliderLayout && 0 !== (e = P.getFullscreenOffsets(t)) && P[t].cpar.height(P.getWinH(t) - e),
                P[t].cpar[0].style.visibility = "visible"
            }),
            "hero" == P[t].sliderType && P[t].c.find("rs-slide").each(function(e) {
                0 < e && T(this).remove()
            }),
            P[t].navigation.use = "hero" !== P[t].sliderType && ("carousel" == P[t].sliderType || P[t].navigation.keyboardNavigation || "on" == P[t].navigation.mouseScrollNavigation || "carousel" == P[t].navigation.mouseScrollNavigation || P[t].navigation.touch.touchenabled || P[t].navigation.arrows.enable || P[t].navigation.bullets.enable || P[t].navigation.thumbnails.enable || P[t].navigation.tabs.enable),
            P[t].c.find("rs-bgvideo").each(function() {
                "RS-BGVIDEO" !== this.tagName || this.id !== C && "" !== this.id || (this.id = "rs-bg-video-" + Math.round(1e6 * Math.random()))
            }),
            tpGS.force3D = "auto",
            !0 === P[t].modal.useAsModal && -1 === P.RS_prioList.indexOf(t) && (P.RS_toInit[t] = !1,
            P.RS_prioList.push(t)),
            P.RS_killedlist !== C && -1 !== P.RS_killedlist.indexOf(t) && (P.RS_toInit[t] = !1,
            P.RS_prioList.push(t)),
            !0 === P.RS_prioListFirstInit && !0 !== P[t].modal.useAsModal && -1 === P.RS_prioList.indexOf(t) && (P.RS_toInit[t] = !1,
            P.RS_prioList.push(t)),
            P.initNextRevslider(t)
        })
    }
    ,
    window.RS_F), s = (T.fn.extend({
        getRSJASONOptions: function(e) {
            console.log(JSON.stringify(P[e].option_export))
        },
        getRSVersion: function(e) {
            var t, i, a = window.SliderRevolutionVersion;
            if (!e) {
                for (var r in t = i = "---------------------------------------------------------\n",
                t += "    Currently Loaded Slider Revolution & SR Modules :\n" + i,
                a)
                    a.hasOwnProperty(r) && (t += a[r].alias + ": " + a[r].ver + "\n");
                t += i
            }
            return e ? a : t
        },
        revremoveslide: function(i) {
            return this.each(function() {
                var e, t = this.id;
                i < 0 || i > P[t].slideamount || P[t] && 0 < P[t].slides.length && (0 < i || i <= P[t].slides.length) && (e = P.gA(P[t].slides[i], "key"),
                P[t].slideamount = P[t].slideamount - 1,
                P[t].realslideamount = P[t].realslideamount - 1,
                l("rs-bullet", e, t),
                l("rs-tab", e, t),
                l("rs-thumb", e, t),
                T(P[t].slides[i]).remove(),
                P[t].thumbs = I(P[t].thumbs, i),
                P.updateNavIndexes && P.updateNavIndexes(t),
                i <= P[t].pr_active_key) && (P[t].pr_active_key = P[t].pr_active_key - 1)
            })
        },
        revaddcallback: function(e) {
            return this.each(function() {
                P[this.id] && (P[this.id].callBackArray === C && (P[this.id].callBackArray = []),
                P[this.id].callBackArray.push(e))
            })
        },
        revgetparallaxproc: function() {
            if (P[this[0].id])
                return P[this[0].id].scrollproc
        },
        revdebugmode: function() {},
        revscroll: function(t) {
            return this.each(function() {
                var e = T(this);
                T("body,html").animate({
                    scrollTop: e.offset().top + e.height() - t + "px"
                }, {
                    duration: 400
                })
            })
        },
        revredraw: function() {
            return this.each(function() {
                G(this.id, C, !0)
            })
        },
        revGoToFrame: function(e) {
            var t;
            e.layerid != C && e.frame != C && this != C && null != this && (e.moduleid = this[0].id,
            e.targetlayer = T("#" + e.layerid),
            e.targetlayer != C) && 0 != e.targetlayer.length && (t = {
                layer: e.targetlayer,
                frame: e.frame,
                mode: "trigger",
                id: e.moduleid
            },
            !0 === e.children && (t.updateChildren = !0,
            t.fastforward = !0),
            P.renderLayerAnimation) && P.renderLayerAnimation(t)
        },
        revkill: function() {
            return this.each(function() {
                if (this != C && null != this) {
                    var e = this.id
                      , t = (P[e].c.data("conthover", 1),
                    P[e].c.data("conthoverchanged", 1),
                    P[e].c.trigger("revolution.slide.onpause"),
                    P[e].tonpause = !0,
                    P[e].c.trigger("stoptimer"),
                    P[e].sliderisrunning = !1,
                    "updateContainerSizes." + P[e].c.attr("id"));
                    P.window.off(t),
                    tpGS.gsap.killTweensOf(P[e].c.find("*"), !1),
                    tpGS.gsap.killTweensOf(P[e].c, !1),
                    P[e].c.off("hover, mouseover, mouseenter,mouseleave, resize"),
                    P[e].c.find("*").each(function() {
                        var e = T(this);
                        e.off("on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer"),
                        e.data("mySplitText", null),
                        e.data("ctl", null),
                        e.data("tween") != C && e.data("tween").kill(),
                        e.data("pztl") != C && e.data("pztl").kill(),
                        e.data("timeline_out") != C && e.data("timeline_out").kill(),
                        e.data("timeline") != C && e.data("timeline").kill(),
                        e.remove(),
                        e.empty()
                    }),
                    tpGS.gsap.killTweensOf(P[e].c.find("*"), !1),
                    tpGS.gsap.killTweensOf(P[e].c, !1),
                    P[e].progressC.remove();
                    try {
                        P[e].c.closest(".rev_slider_wrapper").detach()
                    } catch (e) {}
                    try {
                        P[e].c.closest("rs-fullwidth-wrap").remove()
                    } catch (e) {}
                    try {
                        P[e].c.closest("rs-module-wrap").remove()
                    } catch (e) {}
                    try {
                        P[e].c.remove()
                    } catch (e) {}
                    P[e].cpar.detach(),
                    P[e].c.html(""),
                    P[e].c = null,
                    window[P[e].revapi] = C,
                    delete P[e],
                    delete P.RS_swapList[e],
                    delete P.slidersToScroll[e],
                    delete P.RS_toInit[e],
                    P.nextSlider == e && delete P.nextSlider,
                    P.RS_prioList.splice(P.RS_prioList.indexOf(e), 1),
                    P.RS_killedlist = P.RS_killedlist === C ? [] : P.RS_killedlist,
                    -1 === P.RS_killedlist.indexOf(e) && P.RS_killedlist.push(e)
                }
            })
        },
        revpause: function() {
            return this.each(function() {
                var e = T(this);
                e != C && 0 < e.length && 0 < T("body").find("#" + e.attr("id")).length && (e.data("conthover", 1),
                e.data("conthoverchanged", 1),
                e.trigger("revolution.slide.onpause"),
                P[this.id].tonpause = !0,
                e.trigger("stoptimer"))
            })
        },
        revresume: function() {
            return this.each(function() {
                var e;
                P[this.id] !== C && ((e = T(this)).data("conthover", 0),
                e.data("conthoverchanged", 1),
                e.trigger("revolution.slide.onresume"),
                P[this.id].tonpause = !1,
                e.trigger("starttimer"))
            })
        },
        revmodal: function(e) {
            var t = this instanceof T ? this[0] : this
              , i = t.id;
            P[t.id] !== C && P.revModal(i, e)
        },
        revstart: function() {
            var e = this instanceof T ? this[0] : this;
            return P[e.id] === C ? (console.log("Slider is Not Existing"),
            !1) : P[e.id].sliderisrunning || !0 === P[e.id].initEnded ? (console.log("Slider Is Running Already"),
            !1) : (P[e.id].c = T(e),
            P[e.id].canvas = P[e.id].c.find("rs-slides"),
            g(e.id),
            !0)
        },
        revnext: function() {
            return this.each(function() {
                P[this.id] !== C && P.callingNewSlide(this.id, 1, "carousel" === P[this.id].sliderType)
            })
        },
        revprev: function() {
            return this.each(function() {
                P[this.id] !== C && P.callingNewSlide(this.id, -1, "carousel" === P[this.id].sliderType)
            })
        },
        revmaxslide: function() {
            return T(this).find("rs-slide").length
        },
        revcurrentslide: function() {
            if (P[T(this)[0].id] !== C)
                return parseInt(P[T(this)[0].id].pr_active_key, 0) + 1
        },
        revlastslide: function() {
            return T(this).find("rs-slide").length
        },
        revshowslide: function(e) {
            return this.each(function() {
                P[this.id] !== C && e !== C && P.callingNewSlide(this.id, "to" + (e - 1))
            })
        },
        revcallslidewithid: function(e) {
            return this.each(function() {
                P[this.id] !== C && P.callingNewSlide(this.id, e, "carousel" === P[this.id].sliderType)
            })
        }
    }),
    P = T.fn.revolution,
    T.extend(!0, P, {
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        trim: function(e) {
            return e !== C && null !== e && "string" == typeof e ? e.trim() : e
        },
        setCookie: function(e, t, i) {
            var a = new Date
              , i = (a.setTime(a.getTime() + 60 * i * 60 * 1e3),
            "expires=" + a.toUTCString());
            document.cookie = e + "=" + t + ";" + i + ";path=/"
        },
        getCookie: function(e) {
            for (var t = e + "=", i = document.cookie.split(";"), a = 0; a < i.length; a++) {
                for (var r = i[a]; " " == r.charAt(0); )
                    r = r.substring(1);
                if (0 == r.indexOf(t))
                    return decodeURIComponent(r.substring(t.length, r.length))
            }
            return ""
        },
        mesureScrollBar: function() {
            P.mesuredScrollBarDone = !0,
            requestAnimationFrame(function() {
                var e = document.createElement("div");
                e.className = "RSscrollbar-measure",
                document.body.appendChild(e),
                P.mesuredScrollbarWidth = e.offsetWidth - e.clientWidth,
                document.body.removeChild(e)
            })
        },
        mobileTimedHeightCheck: function() {
            requestAnimationFrame(function() {
                P.mobileTimedHeightCheck()
            }),
            P.mobileHeights.now = Date.now(),
            P.mobileHeights.elapsed = P.mobileHeights.now - P.mobileHeights.then,
            P.mobileHeights.elapsed > P.mobileHeights.fpsInterval && (P.mobileHeights.then = P.mobileHeights.now - P.mobileHeights.elapsed % P.mobileHeights.fpsInterval,
            P.getWindowDimension())
        },
        pageHandler: function(e) {
            P.globalListener = !0,
            P.window = T(window),
            P.document = T(document),
            P.RS_toInit = {},
            P.RS_prioList = [],
            P.RS_swapping = [],
            P.RS_swapList = {},
            window.isSafari11 === C && (window.isSafari11 = P.isSafari11(),
            document.body.classList.add("rs-safari")),
            P.ISM ? (window.addEventListener("orientationchange", function() {
                P.getWindowDimension(!1, !0),
                setTimeout(function() {
                    P.getWindowDimension(!0, !0)
                }, 400)
            }),
            window.addEventListener("resize", P.getWindowDimension),
            tpGS.gsap.delayedCall(3, function() {
                window.removeEventListener("resize", P.getWindowDimension)
            }),
            P.mobileHeights = {
                fpsInterval: 500,
                then: Date.now()
            },
            P[e].ignoreHeightChange || P.mobileHeights.checking || (P.mobileHeights.checking = !0,
            P.mobileTimedHeightCheck())) : window.addEventListener("resize", P.getWindowDimension),
            P.getWindowDimension(!1),
            P.stickySupported = !1,
            "IE" !== window.RSBrowser && (P.stickySupported = !0),
            P.checkParrentOverflows(e);
            var t, i = P.getByTag(document, "RS-MODULE");
            for (t in i)
                i.hasOwnProperty(t) && (P.RS_toInit[i[t].id] = !1,
                P.RS_prioList.push(i[t].id));
            P.nextSlider = e,
            P.RS_prioListFirstInit = !0,
            P.document.one("click", function() {
                P.clickedOnce = !0
            }),
            document.addEventListener("visibilitychange", N),
            P.hasNavClickListener === C && (P.document.on(P.is_mobile() ? "touchstart" : "mouseenter", ".tparrows, .tp-bullets, .tp-bullet, .tp-tab, .tp-thumb, .tp-thumbs, .tp-tabs, .tp-rightarrow, .tp-leftarrow", function(e) {
                this.classList.add("rs-touchhover")
            }),
            P.document.on(P.is_mobile() ? "touchend" : "mouseleave", ".tparrows, .tp-bullets, .tp-bullet, .tp-tab, .tp-thumb, .tp-tabs,  .tp-rightarrow, .tp-leftarrow", function(e) {
                var t = this;
                requestAnimationFrame(function() {
                    t.classList.remove("rs-touchhover")
                })
            }),
            P.hasNavClickListener = !0)
        },
        destroyCanvas: function(e) {
            e && (e.width = e.height = 0,
            e.remove())
        },
        checkParrentOverflows: function(i) {
            window.requestAnimationFrame(function() {
                for (var e, t = P[i].cpar[0]; t.parentNode && !1 !== P.stickySupported; )
                    "RS-MODULE-WRAP" !== t.tagName && "RS-FULLWIDTH-WRAP" !== t.tagName && "RS-MODULE-WRAP" !== t.tagName && -1 === t.className.indexOf("wp-block-themepunch-revslider") && (e = window.getComputedStyle(t),
                    P.stickySupported = "hidden" !== e.overflow && "hidden" !== e.overflowX && "hidden" !== e.overflowY),
                    t = t.parentNode
            })
        },
        observeRemoved: function(t) {
            new MutationObserver(function(e) {
                try {
                    document.body.contains(e[0].target) || P[t].c.revkill()
                } catch (e) {}
            }
            ).observe(P[t].cpar[0], {
                childList: !0
            })
        },
        initNextRevslider: function(e) {
            P.RS_prioList[0] === e && !1 === P.RS_toInit[e] ? (P.RS_toInit[e] = "waiting",
            p(e),
            setTimeout(function() {
                P.initNextRevslider(e)
            }, 19)) : P.RS_prioList[0] === e && "waiting" === P.RS_toInit[e] ? setTimeout(function() {
                P.initNextRevslider(e)
            }, 19) : P.RS_prioList[0] === e && !0 === P.RS_toInit[e] ? (P.RS_prioList.shift(),
            0 !== P.RS_prioList.length && setTimeout(function() {
                P.initNextRevslider(e)
            }, 19)) : P.RS_prioList[0] !== e && !1 === P.RS_toInit[e] ? setTimeout(function() {
                P.initNextRevslider(e)
            }, 19) : 0 === P.RS_prioList.length && !0 === P.RS_toInit[e] && p(e)
        },
        scrollTicker: function(e) {
            1 != P.scrollTickerAdded && (P.slidersToScroll = [],
            P.scrollTickerAdded = !0,
            P.ISM ? (tpGS.gsap.ticker.fps(150),
            tpGS.gsap.ticker.add(function() {
                P.generalObserver()
            })) : document.addEventListener("scroll", function(e) {
                P.scrollRaF === C && (P.scrollRaF = requestAnimationFrame(P.generalObserver.bind(this, !0)))
            }, {
                passive: !0
            })),
            P.slidersToScroll.push(e),
            P.generalObserver(P.ISM)
        },
        generalObserver: function(e, t) {
            for (var i in P.scrollRaF && (P.scrollRaF = cancelAnimationFrame(P.scrollRaF)),
            P.lastwindowheight = P.lastwindowheight || P.winH,
            P.scrollY = window.scrollY,
            P.slidersToScroll)
                P.slidersToScroll.hasOwnProperty(i) && P.scrollHandling(P.slidersToScroll[i], e, C, t)
        },
        wrapObserver: {
            targets: [],
            init: function(a) {
                var r = 0
                  , o = 0
                  , s = e.bind(P.wrapObserver);
                function e() {
                    if (o++,
                    requestAnimationFrame(s),
                    !(o - r < 30)) {
                        r = o;
                        for (var e, t, i = 0; i < P.wrapObserver.targets.length; i++)
                            P.wrapObserver.targets.hasOwnProperty(i) && (t = (e = P.wrapObserver.targets[i]).elem.getBoundingClientRect(),
                            e.lw === t.width && e.lh === t.height || 0 === t.width || (e.callback && (e.callback.pause(),
                            e.callback.kill(),
                            e.callback = null),
                            e.callback = tpGS.gsap.to({}, {
                                duration: .2,
                                onComplete: a.bind(window, e.elem, e.id)
                            })),
                            e.lw = t.width,
                            e.lh = t.height)
                    }
                }
                e()
            },
            observe: function(e, t) {
                var i;
                "" !== (e = e.getBoundingClientRect ? e : e[0].getBoundingClientRect ? e[0] : "") && (i = e.getBoundingClientRect(),
                P.wrapObserver.targets.push({
                    elem: e,
                    id: t,
                    lw: i.width,
                    lh: i.height
                }))
            }
        },
        enterViewPort: function(i, e) {
            !0 !== P[i].started ? (P[i].started = !0,
            P.lazyLoadAllSlides(i),
            P[i].c.trigger("revolution.slide.firstrun"),
            setTimeout(function() {
                y(i),
                "hero" !== P[i].sliderType && P.manageNavigation && P[i].navigation.use && !0 === P[i].navigation.createNavigationDone && P.manageNavigation(i),
                1 < P[i].slideamount && x(i),
                setTimeout(function() {
                    P[i] !== C && (P[i].revolutionSlideOnLoaded = !0,
                    P[i].c.trigger("revolution.slide.onloaded"),
                    P.calcScrollToId())
                }, 50)
            }, P[i].startDelay),
            P[i].startDelay = 0,
            window.requestAnimationFrame(function() {
                u(i)
            })) : (P[i].waitForCountDown && (x(i),
            P[i].waitForCountDown = !1),
            "playing" != P[i].sliderlaststatus && P[i].sliderlaststatus != C || P[i].c.trigger("starttimer"),
            P[i].lastplayedvideos != C && 0 < P[i].lastplayedvideos.length && T.each(P[i].lastplayedvideos, function(e, t) {
                P.playVideo(t, i)
            }))
        },
        leaveViewPort: function(i) {
            P[i].sliderlaststatus = P[i].sliderstatus,
            P[i].c.trigger("stoptimer"),
            P[i].playingvideos != C && 0 < P[i].playingvideos.length && (P[i].lastplayedvideos = T.extend(!0, [], P[i].playingvideos),
            P[i].playingvideos) && T.each(P[i].playingvideos, function(e, t) {
                P[i].leaveViewPortBasedStop = !0,
                P.stopVideo && P.stopVideo(t, i)
            })
        },
        scrollHandling: function(e, t, i, a) {
            var r, o;
            P[e] !== C && (r = (P[e].topc !== C ? P[e].topc : 0 === P[e].canv.height ? P[e].cpar : P[e].c)[0].getBoundingClientRect(),
            o = P.ISM ? window.innerHeight : P.lastwindowheight,
            r.hheight = (0 === r.height ? 0 === P[e].canv.height ? P[e].module : P[e].canv : r).height,
            P[e].scrollproc = r.top < 0 || r.hheight > o && r.top < o ? r.top / r.hheight : r.bottom > o ? (r.bottom - o) / r.hheight : 0,
            o = Math.max(0, 1 - Math.abs(P[e].scrollproc)),
            P[e].viewPort.enable && ("%" === P[e].viewPort.vaType[P[e].level] && (P[e].viewPort.visible_area[P[e].level] <= o || 0 < o && o <= 1 && P[e].sbtimeline.fixed) || "px" === P[e].viewPort.vaType[P[e].level] && (r.top <= 0 && r.bottom >= P.lastwindowheight || 0 <= r.top && r.bottom <= P.lastwindowheight || 0 <= r.top && r.top < P.lastwindowheight - P[e].viewPort.visible_area[P[e].level] || r.bottom >= P[e].viewPort.visible_area[P[e].level] && r.bottom < P.lastwindowheight) ? P[e].inviewport || (P[e].inviewport = !0,
            P.enterViewPort(e, !0),
            P[e].c.trigger("enterviewport")) : P[e].inviewport && (P[e].inviewport = !1,
            P.leaveViewPort(e),
            P[e].c.trigger("leftviewport"))),
            P[e].inviewport ? (P.callBackHandling && P.callBackHandling(e, "parallax", "start"),
            requestAnimationFrame(function() {
                "fullscreen" === P[e].sliderLayout && P.getFullscreenOffsets(e)
            }),
            P.parallaxProcesses(e, r, a, i),
            P.callBackHandling && P.callBackHandling(e, "parallax", "end")) : !0 !== P.stickySupported && !1 !== P[e].fixedScrollOnState && (P[e].topc.removeClass("rs-fixedscrollon"),
            tpGS.gsap.set(P[e].cpar, {
                top: 0,
                y: 0
            }),
            P[e].fixedScrollOnState = !1))
        },
        clone: function(e, t) {
            return t === C && e === C ? {} : function e(t, i) {
                var a, r = Array.isArray(t) ? [] : {};
                for (a in t)
                    t.hasOwnProperty(a) && (t[a] !== C && "object" == typeof t[a] && i ? r[a] = e(t[a], !0) : t[a] !== C && (r[a] = t[a]));
                return r
            }(e, t)
        },
        closest: function(e, t) {
            return e && (t(e) ? e : P.closest(e.parentNode, t))
        },
        closestNode: function(e, t) {
            return P.closest(e, function(e) {
                return e.nodeName === t
            })
        },
        closestClass: function(e, t) {
            return P.closest(e, function(e) {
                return 0 <= (" " + e.className + " ").indexOf(" " + t + " ")
            })
        },
        getWinH: function(e) {
            return P[e].ignoreHeightChange ? P.mobileWinH : P.winH
        },
        getWindowDimension: function(e, t) {
            !1 === e ? (P.rAfScrollbar = "skip",
            P.winWAll = P.ISM && window.visualViewport ? document.documentElement.clientWidth : window.innerWidth,
            P.winWSbar = document.documentElement.clientWidth,
            P.ISM ? (P.zoom = t ? 1 : P.winWSbar / P.winWAll,
            P.winW = 1 !== P.zoom ? P.winWSbar * P.zoom : Math.min(P.winWAll, P.winWSbar),
            P.winH = 1 !== P.zoom ? window.innerHeight * P.zoom : window.innerHeight,
            t && window.visualViewport && (P.winH *= window.visualViewport.scale,
            P.winWAll *= window.visualViewport.scale),
            P.scrollBarWidth = 0) : (P.isModalOpen && P.openModalId !== C && P[P.openModalId] !== C && P[P.openModalId].canv.height > P.winH ? P.scrollBarWidth = P.mesuredScrollbarWidth : P.scrollBarWidth = P.winWAll - P.winWSbar,
            P.winW = Math.min(P.winWAll, P.winWSbar),
            P.winH = window.innerHeight),
            P.ISM && 125 < P.winH && (P.lastwindowheight !== C && Math.abs(P.lastwindowheight - P.winH) < 125 ? P.mobileWinH = P.lastwindowheight : P.mobileWinH = P.winH)) : clearTimeout(P.windowDimenstionDelay),
            P.windowDimenstionDelay = setTimeout(function() {
                P.rAfScrollbar = C,
                P.winWAll = P.ISM && window.visualViewport ? document.documentElement.clientWidth : window.innerWidth,
                P.winWSbar = document.documentElement.clientWidth,
                P.ISM ? (P.zoom = t ? 1 : P.winWSbar / P.winWAll,
                P.RS_px_ratio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth,
                P.winW = 1 !== P.zoom ? P.winWSbar * P.zoom : Math.min(P.winWAll, P.winWSbar),
                P.winH = 1 !== P.zoom ? window.innerHeight * P.zoom : window.innerHeight,
                t && window.visualViewport && (P.winH *= window.visualViewport.scale,
                P.winWAll *= window.visualViewport.scale),
                P.scrollBarWidth = 0,
                t && tpGS.gsap.delayedCall(.1, function() {
                    P.getWindowDimension()
                })) : (P.isModalOpen && P.openModalId !== C && P[P.openModalId] !== C && P[P.openModalId].canv.height > P.winH ? P.scrollBarWidth = P.mesuredScrollbarWidth : P.scrollBarWidth = P.winWAll - P.winWSbar,
                P.winW = Math.min(P.winWAll, P.winWSbar),
                P.winH = window.innerHeight),
                P.ISM && 125 < P.winH && (P.lastwindowheight !== C && Math.abs(P.lastwindowheight - P.winH) < 125 ? P.mobileWinH = P.lastwindowheight : P.mobileWinH = P.winH),
                !1 !== e && P.document.trigger("updateContainerSizes")
            }, 100)
        },
        aC: function(e, t) {
            e && (e.classList && e.classList.add ? e.classList.add("" + t) : T(e).addClass(t))
        },
        rC: function(e, t) {
            e && (e.classList && e.classList.remove ? e.classList.remove("" + t) : T(e).removeClass(t))
        },
        sA: function(e, t, i) {
            e && e.setAttribute && e.setAttribute("data-" + t, i)
        },
        gA: function(e, t, i) {
            return e === C ? C : e.hasAttribute && e.hasAttribute("data-" + t) && e.getAttribute("data-" + t) !== C && null !== e.getAttribute("data-" + t) ? e.getAttribute("data-" + t) : i !== C ? i : C
        },
        rA: function(e, t) {
            e && e.removeAttribute && e.removeAttribute("data-" + t)
        },
        iWA: function(e, t) {
            return P[e].justifyCarousel ? "static" === t ? P[e].carousel.wrapwidth : P[e].carousel.slide_widths[t !== C ? t : P[e].carousel.focused] : P[e].gridwidth[P[e].level]
        },
        iHE: function(e, t) {
            return P[e].useFullScreenHeight ? P[e].canv.height : Math.max(P[e].currentRowsHeight, P[e].gridheight[P[e].level])
        },
        updateFixedScrollTimes: function(e) {
            !0 === P[e].sbtimeline.set && !0 === P[e].sbtimeline.fixed && "auto" !== P[e].sliderLayout && (P[e].sbtimeline.rest = P[e].duration - P[e].sbtimeline.fixEnd,
            P[e].sbtimeline.time = P[e].duration - (P[e].sbtimeline.fixStart + P[e].sbtimeline.rest),
            P[e].sbtimeline.extended = P[e].sbtimeline.time / 10)
        },
        addSafariFix: function(e) {
            !0 === window.isSafari11 && !0 !== P[e].safari3dFix && (P[e].safari3dFix = !0,
            P[e].c[0].className += " safarifix")
        },
        openModalAPI: function(o, s, e, n, l, d) {
            window.RS_60_MODALS !== C && -1 != T.inArray(o, window.RS_60_MODALS) || window.RS_60_MODAL_API_CALLS !== C && -1 != T.inArray(o, window.RS_60_MODAL_API_CALLS) ? 0 <= T.inArray(o, window.RS_60_MODALS) && T.fn.revolution.document.trigger("RS_OPENMODAL_" + o, s) : (window.RS_60_MODAL_API_CALLS = window.RS_60_MODAL_API_CALLS || [],
            window.RS_60_MODAL_API_CALLS.push(o),
            (d = d === C ? {} : d).alias === C && (d.alias = o),
            n && P.showModalCover(l, d, "show"),
            T.ajax({
                type: "post",
                url: e,
                dataType: "json",
                data: {
                    action: "revslider_ajax_call_front",
                    client_action: "get_slider_html",
                    alias: o,
                    usage: "modal"
                },
                success: function(e, t, i) {
                    if (null !== e && 1 == e.success) {
                        if (l = l == C ? e.htmlid : l,
                        e.waiting !== C)
                            for (var a in e.waiting)
                                -1 == T.inArray(e.waiting[a], RS_MODULES.waiting) && (RS_MODULES.waiting.push(e.waiting[a]),
                                window.RS_MODULES.minimal = !1);
                        if (e.toload !== C) {
                            var r = "";
                            for (a in (RS_MODULES = RS_MODULES || {}).requestedScripts = [],
                            e.toload)
                                !e.toload.hasOwnProperty(a) || RS_MODULES != C && RS_MODULES[a] != C && !0 === RS_MODULES[a].loaded || -1 === T.inArray(a, RS_MODULES.requestedScripts) && (RS_MODULES.requestedScripts.push(a),
                                r += e.toload[a]);
                            "" !== r && T("body").append(r)
                        }
                        RS_MODULES !== C && RS_MODULES.modules[e.htmlid] != C || T("body").append(e.data),
                        n && P.showModalCover(l, d, "hide"),
                        P[o] !== C && P[o].openModalApiListener ? T.fn.revolution.document.trigger("RS_OPENMODAL_" + o, s) : T(document).on("RS_MODALOPENLISTENER_" + o, function(e) {
                            T.fn.revolution.document.trigger("RS_OPENMODAL_" + o, s)
                        })
                    } else
                        n && P.showModalCover(l, d, "hide")
                },
                error: function(e) {
                    n && P.showModalCover(l, d, "hide"),
                    console.log("Modal Can not be Loaded"),
                    console.log(e)
                }
            }))
        },
        showModalCover: function(e, t, i) {
            switch (i) {
            case "show":
                var a;
                t.spin !== C && "off" !== t.spin && (a = P.buildSpinner(e, "spinner" + t.spin, t.spinc, "modalspinner")),
                t.bg !== C && !1 !== t.bg && "false" !== t.bg && "transparent" !== t.bg ? (r = T('<rs-modal-cover data-alias="' + t.alias + '" data-rid="' + e + '" id="' + e + '_modal_bg" style="display:none;opacity:0;background:' + t.bg + '"></rs-modal-cover>'),
                T("body").append(r),
                t.speed = parseFloat(t.speed),
                t.speed = 200 < t.speed ? t.speed / 1e3 : t.speed,
                t.speed = Math.max(Math.min(3, t.speed), .3),
                tpGS.gsap.to(r, t.speed, {
                    display: "block",
                    opacity: 1,
                    ease: "power3.inOut"
                }),
                P.isModalOpen = !0,
                a !== C && r.append(a)) : a !== C && P[e].c.append(a);
                break;
            case "hide":
                var r;
                (r = T('rs-modal-cover[data-alias="' + t.alias + '"] .modalspinner')) !== C && 0 < r.length ? r.remove() : e !== C && P[e].c.find(".modalspinner").remove()
            }
        },
        revModal: function(i, e) {
            if (i !== C && P[i] !== C && "clicked" !== P[i].modal.closeProtection)
                if (!0 === P[i].modal.closeProtection)
                    P[i].modal.closeProtection,
                    setTimeout(function() {
                        P[i].modal.closeProtection = !1,
                        P.revModal(i, e)
                    }, 750);
                else
                    switch (P[i].modal.lastModalCall = e.mode,
                    e.mode) {
                    case "show":
                        !0 !== P[i].modal.isLive && !0 !== P.anyModalclosing && (P.document.trigger("RS_MODALOPENED"),
                        P[i].modal.isLive = !0,
                        e.slide = e.slide === C ? "to0" : e.slide,
                        P[i].modal.bodyclass !== C && 0 <= P[i].modal.bodyclass.length && document.body.classList.add(P[i].modal.bodyclass),
                        P[i].modal.bg.attr("data-rid", i),
                        tpGS.gsap.to(P[i].modal.bg, P[i].modal.coverSpeed, {
                            display: "block",
                            opacity: 1,
                            ease: "power3.inOut"
                        }),
                        tpGS.gsap.set(P[i].modal.c, {
                            display: "auto" === P[i].sliderLayout ? "inline-block" : "block",
                            opacity: 0
                        }),
                        P[i].cpar.removeClass("hideallscrollbars"),
                        tpGS.gsap.set(P[i].cpar, {
                            display: "block",
                            opacity: 1
                        }),
                        t = {
                            a: 0
                        },
                        P.isModalOpen = !0,
                        P[i].clearModalBG = !0,
                        "carousel" === P[i].sliderType && P[i].pr_active_bg !== C && 0 < P[i].pr_active_bg.length && tpGS.gsap.to(P[i].pr_active_bg, .5, {
                            opacity: 1
                        }),
                        tpGS.gsap.fromTo(t, P[i].modal.coverSpeed / 5, {
                            a: 0
                        }, {
                            a: 10,
                            ease: "power3.inOut",
                            onComplete: function() {
                                P.openModalId = i,
                                P[i].sliderisrunning ? ("to0" !== e.slide && (P[i].startedWithOtherSlide = !0),
                                P.callingNewSlide(i, e.slide)) : ("to0" !== e.slide && (P[i].startWithSlideKey = e.slide),
                                g(i))
                            }
                        }),
                        setTimeout(function() {
                            tpGS.gsap.fromTo([P[i].modal.c], .01, {
                                opacity: 0
                            }, {
                                opacity: 1,
                                delay: P[i].modal.coverSpeed / 4,
                                ease: "power3.inOut",
                                onComplete: function() {}
                            }),
                            window.overscrollhistory = document.body.style.overflow,
                            P[i].modal.allowPageScroll || (document.body.style.overflow = "hidden"),
                            "fullscreen" === P[i].sliderLayout && P.getWindowDimension()
                        }, 250),
                        "fullscreen" !== P[i].sliderLayout) && P.getWindowDimension();
                        break;
                    case "close":
                        !0 !== P.anyModalclosing && (P.anyModalclosing = !0,
                        P.openModalId = C,
                        z(i),
                        document.body.style.overflow = window.overscrollhistory,
                        P[i].cpar.addClass("hideallscrollbars"),
                        P[i].c.trigger("stoptimer"),
                        P[i].modal.bodyclass !== C && 0 <= P[i].modal.bodyclass.length && document.body.classList.remove(P[i].modal.bodyclass),
                        tpGS.gsap.to(P[i].modal.bg, P[i].modal.coverSpeed, {
                            display: "none",
                            opacity: 0,
                            ease: "power3.inOut"
                        }),
                        tpGS.gsap.to(P[i].modal.c, P[i].modal.coverSpeed / 6.5, {
                            display: "none",
                            delay: P[i].modal.coverSpeed / 4,
                            opacity: 0,
                            onComplete: function() {
                                tpGS.gsap.set(P[i].cpar, {
                                    display: "none",
                                    opacity: 0
                                }),
                                P.document.trigger("revolution.all.resize"),
                                P.document.trigger("revolution.modal.close", [P[i].modal]),
                                P.getWindowDimension(),
                                P.isModalOpen = !1
                            }
                        }),
                        P[i].modal.closeProtection = !0,
                        clearTimeout(P[i].modal.closeTimer),
                        P[i].modal.closeTimer = setTimeout(function() {
                            P.anyModalclosing = !1,
                            P[i].modal.isLive = !1,
                            P[i].modal.closeProtection = !1
                        }, Math.max(750, 1020 * P[i].modal.coverSpeed)));
                        break;
                    case "init":
                        if (window.RS_60_MODALS = window.RS_60_MODALS === C ? [] : window.RS_60_MODALS,
                        -1 === T.inArray(P[i].modal.alias, window.RS_60_MODALS) && window.RS_60_MODALS.push(P[i].modal.alias),
                        P[i].modal.listener === C && (P[i].modal.c = T("#" + i + "_modal"),
                        !1 !== P[i].modal.cover && "false" !== P[i].modal.cover || (P[i].modal.coverColor = "transparent"),
                        P[i].modal.bg = T('rs-modal-cover[data-alias="' + P[i].modal.alias + '"]'),
                        P[i].modal.bg === C || 0 === P[i].modal.bg.length ? (P[i].modal.bg = T('<rs-modal-cover style="display:none;opacity:0;background:' + P[i].modal.coverColor + '" data-rid="' + i + '" id="' + i + '_modal_bg"></rs-modal-cover>'),
                        ("auto" === P[i].sliderLayout && P[i].modal.cover ? T("body") : P[i].modal.c).append(P[i].modal.bg)) : P[i].modal.bg.attr("data-rid", i),
                        P[i].modal.c[0].className += "rs-modal-" + P[i].sliderLayout,
                        P[i].modal.calibration = {
                            left: "auto" === P[i].sliderLayout ? "center" === P[i].modal.horizontal ? "50%" : "left" === P[i].modal.horizontal ? "0px" : "auto" : "0px",
                            right: "auto" === P[i].sliderLayout && ("center" === P[i].modal.horizontal || "left" === P[i].modal.horizontal) ? "auto" : "0px",
                            top: "auto" === P[i].sliderLayout || "fullwidth" === P[i].sliderLayout ? "middle" === P[i].modal.vertical ? "50%" : "top" === P[i].modal.vertical ? "0px" : "auto" : "0px",
                            bottom: !("auto" !== P[i].sliderLayout && "fullwidth" !== P[i].sliderLayout || "middle" !== P[i].modal.vertical && "top" !== P[i].modal.vertical) ? "auto" : "0px",
                            y: ("auto" === P[i].sliderLayout || "fullwidth" === P[i].sliderLayout) && "middle" === P[i].modal.vertical ? "-50%" : 0,
                            x: "auto" === P[i].sliderLayout && "center" === P[i].modal.horizontal ? "-50%" : 0
                        },
                        "-50%" === P[i].modal.calibration.y && (P[i].modal.calibration.filter = "blur(0px)"),
                        tpGS.gsap.set(P[i].modal.c, "auto" === P[i].sliderLayout || "fullscreen" === P[i].sliderLayout ? T.extend(!0, P[i].modal.calibration, {
                            opacity: 0,
                            display: "none"
                        }) : {
                            opacity: 0,
                            display: "none"
                        }),
                        "fullwidth" === P[i].sliderLayout && tpGS.gsap.set(P[i].modal.c.find("rs-module-wrap"), P[i].modal.calibration),
                        P.document.on("RS_OPENMODAL_" + P[i].modal.alias, function(e, t) {
                            e !== C && e.detail !== C && e.detail.slide !== C && t == C && (t = e.detail.slide),
                            P[i].initEnded = !0,
                            P.revModal(i, {
                                mode: "show",
                                slide: t
                            })
                        }),
                        P[P[i].modal.alias] = P[P[i].modal.alias] || {},
                        P[P[i].modal.alias].openModalApiListener = !0,
                        P.document.trigger("RS_MODALOPENLISTENER_" + P[i].modal.alias),
                        P.document.on("click", "rs-modal-cover", function() {
                            P.revModal(P.gA(this, "rid"), {
                                mode: "close"
                            })
                        }),
                        P[i].modal.listener = !0,
                        P[i].modal.trigger !== C)) {
                            var t, a, r = P[i].modal.trigger.split(";");
                            for (t in P[i].modal.trigger = {},
                            r)
                                if (r.hasOwnProperty(t))
                                    switch ((a = r[t].split(":"))[0]) {
                                    case "t":
                                        P[i].modal.trigger.time = parseInt(a[1], 0);
                                        break;
                                    case "s":
                                        P[i].modal.trigger.scroll = a[1];
                                        break;
                                    case "so":
                                        P[i].modal.trigger.scrollo = parseInt(a[1], 0);
                                        break;
                                    case "e":
                                        P[i].modal.trigger.event = a[1];
                                        break;
                                    case "ha":
                                        P[i].modal.trigger.hash = a[1];
                                        break;
                                    case "co":
                                        P[i].modal.trigger.cookie = a[1]
                                    }
                            var o, s = !0;
                            P[i].modal.trigger.cookie !== C ? s = "true" !== P.getCookie(P[i].modal.alias + "_modal_one_time") : "true" == P.getCookie(P[i].modal.alias + "_modal_one_time") && P.setCookie(P[i].modal.alias + "_modal_one_time", !1, 10),
                            s && (P[i].modal.trigger.time !== C && 0 !== P[i].modal.trigger.time && (P[i].modal.trigger.cookie !== C && P.setCookie(P[i].modal.alias + "_modal_one_time", !0, P[i].modal.trigger.cookie),
                            setTimeout(function() {
                                P.document.trigger("RS_OPENMODAL_" + P[i].modal.alias)
                            }, P[i].modal.trigger.time)),
                            P[i].modal.trigger.scrollo === C && P[i].modal.trigger.scroll === C || (P[i].modal.trigger.scroll !== C && T(P[i].modal.trigger.scroll)[0] !== C && (P[i].modal.trigger.scroll = T(P[i].modal.trigger.scroll)[0]),
                            o = function() {
                                var e;
                                P[i].modal.trigger.scroll !== C && (e = (e = "string" == typeof P[i].modal.trigger.scroll ? document.getElementById(P[i].modal.trigger.scroll) : "object" == typeof P[i].modal.trigger.scroll ? P[i].modal.trigger.scroll : C) !== C && null !== e ? P[i].modal.trigger.scroll.getBoundingClientRect() : C),
                                (P[i].modal.trigger.scroll !== C && e !== C && Math.abs(e.top + (e.bottom - e.top) / 2 - P.getWinH(i) / 2) < 50 || P[i].modal.trigger.scrollo !== C && Math.abs(P[i].modal.trigger.scrollo - (P.scrollY !== C ? P : window).scrollY) < 100) && (P.document.trigger("RS_OPENMODAL_" + P[i].modal.alias),
                                P[i].modal.trigger.cookie !== C && P.setCookie(P[i].modal.alias + "_modal_one_time", !0, P[i].modal.trigger.cookie),
                                document.removeEventListener("scroll", o))
                            }
                            ,
                            document.addEventListener("scroll", o, {
                                id: i,
                                passive: !0
                            }))),
                            P[i].modal.trigger.event !== C && P.document.on(P[i].modal.trigger.event, function() {
                                P.document.trigger("RS_OPENMODAL_" + P[i].modal.alias)
                            }),
                            "t" == P[i].modal.trigger.hash && window.location.hash.substring(1) == P[i].modal.alias && P.document.trigger("RS_OPENMODAL_" + P[i].modal.alias)
                        }
                    }
        },
        smartConvertDivs: function(e) {
            var t = "";
            if ("string" == typeof e && 0 <= e.indexOf("#")) {
                var i, a = e.split(","), r = a.length - 1;
                for (i in a)
                    t = "string" == typeof a[i] && "#" === a[i][0] ? t + a[i][1] / a[i][3] * 100 + "%" + (i < r ? "," : "") : t + a[i] + (i < r ? "," : "")
            } else
                t = e;
            return t
        },
        revToResp: function(e, t, i, a) {
            if ((e = e === C ? i : e) !== C) {
                if (a = a === C ? "," : a,
                "boolean" != typeof e && ("object" != typeof e || Array.isArray(e))) {
                    try {
                        e = e.replace(/[[\]]/g, "").replace(/\'/g, "").split(a)
                    } catch (e) {}
                    for (e = Array.isArray(e) ? e : [e]; e.length < t; )
                        e[e.length] = e[e.length - 1]
                }
                return e
            }
        },
        loadImages: function(e, t, i, a) {
            if (e !== C && 0 !== e.length) {
                var r, o = [];
                if (Array.isArray(e))
                    for (var s in e)
                        e.hasOwnProperty(s) && e[s] !== C && o.push(e[s]);
                else
                    o.push(e);
                for (r in o)
                    if (o.hasOwnProperty(r)) {
                        var n, l, d = o[r].querySelectorAll("img, rs-sbg, .rs-svg"), c = P[t].lazyOnBg ? o[r].querySelectorAll("rs-bg-elem, rs-column, rs-layer") : [];
                        for (s in d)
                            d.hasOwnProperty(s) && (d[s] !== C && d[s].dataset !== C && d[s].dataset.src !== C && 0 <= d[s].dataset.src.indexOf("dummy.png") && 0 <= d[s].src.indexOf("data") && delete d[s].dataset.src,
                            l = B(d[s], C, t),
                            n = l !== C ? l : P.gA(d[s], "svg_src") != C ? P.gA(d[s], "svg_src") : d[s].src === C ? T(d[s]).data("src") : d[s].src,
                            l = P.gA(d[s], "svg_src") != C ? "svg" : "img",
                            n !== C) && P[t].loadqueue !== C && 0 == P[t].loadqueue.filter(function(e) {
                                return e.src === n
                            }).length && P[t].loadqueue.push({
                                src: n,
                                img: d[s],
                                index: s,
                                starttoload: Date.now(),
                                type: l || "img",
                                prio: i,
                                progress: d[s].complete && n === d[s].src ? "loaded" : "prepared",
                                static: a,
                                width: d[s].complete && n === d[s].src ? d[s].width : C,
                                height: d[s].complete && n === d[s].src ? d[s].height : C
                            });
                        for (s in c)
                            c.hasOwnProperty(s) && c[s] !== C && c[s].dataset !== C && c[s].dataset.bglazy !== C && 0 <= c[s].style.backgroundImage.indexOf("dummy.png") && (c[s].style.backgroundImage = 'url("' + c[s].dataset.bglazy + '")');
                        c[s] !== C && c[s].dataset !== C && c[s].dataset.bglazy !== C && 0 <= c[s].style.backgroundImage.indexOf("dummy.png") && (c[s].style.backgroundImage = 'url("' + c[s].dataset.bglazy + '")')
                    }
                !P[t].cparBgChecked && P[t].cpar[0] !== C && P[t].cpar[0].dataset !== C && P[t].cpar[0].dataset.bglazy !== C && 0 <= P[t].cpar[0].style.backgroundImage.indexOf("dummy.png") && (P[t].cparBgChecked = !0,
                P[t].cpar[0].style.backgroundImage = 'url("' + P[t].cpar[0].dataset.bglazy + '")'),
                m(t)
            }
        },
        waitForCurrentImages: function(e, t, i) {
            if (e !== C && 0 !== e.length && P[t] !== C) {
                var a, r = !1, o = [];
                if (Array.isArray(e))
                    for (var s in e)
                        e.hasOwnProperty(s) && e[s] !== C && o.push(e[s]);
                else
                    o.push(e);
                for (a in o)
                    if (o.hasOwnProperty(a)) {
                        var n, l, d, c, p, g, u = o[a].querySelectorAll("img, rs-sbg, .rs-svg");
                        for (s in u)
                            !u.hasOwnProperty(s) || "length" === s || 0 <= u[s].className.indexOf("rs-pzimg") || (n = T(u[s]).data(),
                            l = (l = B(u[s], C, t)) !== C ? l : P.gA(u[s], "svg_src") != C ? P.gA(u[s], "svg_src") : (u[s].src === C ? n : u[s]).src,
                            d = P.getLoadObj(t, l),
                            P.sA(u[s], "src-rs-ref", l),
                            n.loaded === C && d !== C && d.progress && "loaded" == d.progress && ("img" == d.type ? (u[s].src.slice(u[s].src.length - 10) !== d.src.slice(d.src.length - 10) && (u[s].src = d.src),
                            n.slidebgimage && (-1 == d.src.indexOf("Images/transparent.png") && -1 == d.src.indexOf("assets/transparent.png") || n.bgcolor === C || n.bgcolor !== C && "transparent" !== n.bgcolor && (d.bgColor = !0,
                            d.useBGColor = !0),
                            P.sA(o[a], "owidth", d.width),
                            P.sA(o[a], "oheight", d.height),
                            p = P.getByTag(o[a], "RS-SBG-WRAP"),
                            c = P.gA(o[a], "key"),
                            P[t].sbgs[c].loadobj = d,
                            0 < p.length && (P.sA(p[0], "owidth", d.width),
                            P.sA(p[0], "oheight", d.height)),
                            "carousel" === P[t].sliderType) && (p = T(p),
                            g = P.getSlideIndex(t, c),
                            (P[t].carousel.justify && P[t].carousel.slide_widths === C || P[t].carousel.slide_width === C) && P.setCarouselDefaults(t, !0),
                            p.data("panzoom") === C || P[t].panzoomTLs !== C && P[t].panzoomTLs[g] !== C || P.startPanZoom(p, t, 0, g, "prepare", c),
                            P[t].sbgs[c].isHTML5 && !P[t].sbgs[c].videoisplaying && (P[t].sbgs[c].video = P[t].sbgs[c].loadobj.img),
                            o[a].getAttribute("data-iratio") !== C && !o[a].getAttribute("data-iratio") && d.img && d.img.naturalWidth && (o[a].setAttribute("data-iratio", d.img.naturalWidth / d.img.naturalHeight),
                            P.setCarouselDefaults(t, "redraw", !0),
                            !0 === P[t].carousel.ocfirsttun) && P.organiseCarousel(t, "right", !0, !1, !1),
                            P.updateSlideBGs(t, c, P[t].sbgs[c]))) : "svg" == d.type && "loaded" == d.progress && (u[s].innerHTML = d.innerHTML),
                            n.loaded = !0),
                            d && d.progress && d.progress.match(/inprogress|inload|prepared/g) && (!d.error && Date.now() - d.starttoload < 15e3 ? r = !0 : (d.progress = "failed",
                            d.reported_img || (d.reported_img = !0,
                            console.log(l + "  Could not be loaded !")))),
                            1 != P[t].youtubeapineeded || window.YT && YT.Player != C || (r = f("youtube", t)),
                            1 != P[t].vimeoapineeded) || window.Vimeo || (r = f("vimeo", t))
                    }
                T.each(P[t].loadqueue, function(e, t) {
                    !0 === t.static && ("loaded" != t.progress && "done" !== t.progress || "failed" === t.progress) && ("failed" != t.progress || t.reported ? !t.error && Date.now() - t.starttoload < 5e3 ? r = !0 : t.reported || (t.reported = v(t.src, t.error)) : t.reported = v(t.src, t.error))
                }),
                r ? tpGS.gsap.delayedCall(.02, P.waitForCurrentImages, [e, t, i]) : i !== C && tpGS.gsap.delayedCall(1e-4, i)
            }
        },
        updateVisibleArea: function(e) {
            for (var t in P[e].viewPort.visible_area = P.revToResp(P[e].viewPort.visible_area, P[e].rle, "0px"),
            P[e].viewPort.vaType = new Array(4),
            P[e].viewPort.visible_area)
                P[e].viewPort.visible_area.hasOwnProperty(t) && (!1 === P[e].viewPort.local && !0 === P[e].viewPort.global ? (P[e].viewPort.vaType[t] = 0 <= P[e].viewPort.globalDist.indexOf("%") ? "%" : "px",
                P[e].viewPort.visible_area[t] = parseInt(P[e].viewPort.globalDist)) : (P.isNumeric(P[e].viewPort.visible_area[t]) && (P[e].viewPort.visible_area[t] += "%"),
                P[e].viewPort.visible_area[t] !== C && (P[e].viewPort.vaType[t] = 0 <= P[e].viewPort.visible_area[t].indexOf("%") ? "%" : "px"),
                P[e].viewPort.visible_area[t] = parseInt(P[e].viewPort.visible_area[t], 0)),
                P[e].viewPort.visible_area[t] = "%" == P[e].viewPort.vaType[t] ? P[e].viewPort.visible_area[t] / 100 : P[e].viewPort.visible_area[t])
        },
        observeFonts: function(e, t, i) {
            i = i === C ? 0 : i,
            P.fonts === C && (P.fonts = {},
            P.monoWidth = d("monospace"),
            P.sansWidth = d("sans-serif"),
            P.serifWidth = d("serif")),
            i++;
            var a = P.fonts[e];
            !0 !== P.fonts[e] && (P.fonts[e] = P.monoWidth !== d(e + ",monospace") || P.sansWidth !== d(e + ",sans-serif") || P.serifWidth !== d(e + ",serif")),
            100 === i || (!1 === a || a === C) && !0 === P.fonts[e] ? (d(e + ",monospace", !0),
            d(e + ",sans-serif", !0),
            d(e + ",serif", !0),
            t()) : setTimeout(function() {
                P.observeFonts(e, t, i)
            }, 19)
        },
        getversion: function() {
            return o
        },
        currentSlideIndex: function(e) {
            return P[e].pr_active_key
        },
        iOSVersion: function() {
            return !!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) && navigator.userAgent.match(/OS 4_\d like Mac OS X/i)
        },
        setIsIOS: function() {
            P.isiPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
            P.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || "MacIntel" === navigator.platform && void 0 !== navigator.standalone
        },
        setIsChrome8889: function() {
            P.isChrome8889 = P.isChrome8889 === C ? 0 <= navigator.userAgent.indexOf("Chrome/88") || 0 <= navigator.userAgent.indexOf("Chrome/89") : P.isChrome8889
        },
        isIE: function() {
            var e;
            return P.isIERes === C && ((e = T('<div style="display:none;"/>').appendTo(T("body"))).html("\x3c!--[if IE 8]><a>&nbsp;</a><![endif]--\x3e"),
            P.isIERes = e.find("a").length,
            e.remove()),
            P.isIERes
        },
        is_mobile: function() {
            var e = ["android", "webos", "iphone", "ipad", "blackberry", "Android", "webos", "iPod", "iPhone", "iPad", "Blackberry", "BlackBerry"]
              , t = !1;
            if (window.orientation !== C)
                t = !0;
            else
                for (var i in e)
                    e.hasOwnProperty(i) && (t = !!(t || 1 < navigator.userAgent.split(e[i]).length) || t);
            return t && document.body && -1 === document.body.className.indexOf("rs-ISM") && (document.body.className += " rs-ISM"),
            t
        },
        is_android: function() {
            var e, t = ["android", "Android"], i = !1;
            for (e in t)
                t.hasOwnProperty(e) && (i = !!(i || 1 < navigator.userAgent.split(t[e]).length) || i);
            return i
        },
        callBackHandling: function(e, i, a) {
            P[e].callBackArray && T.each(P[e].callBackArray, function(e, t) {
                t && t.inmodule && t.inmodule === i && t.atposition && t.atposition === a && t.callback && t.callback.call()
            })
        },
        get_browser: function() {
            var e, t = navigator.userAgent, i = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            return /trident/i.test(i[1]) ? (e = /\brv[ :]+(\d+)/g.exec(t) || [],
            "IE") : "Chrome" === i[1] && null != (e = t.match(/\b(OPR|Edge)\/(\d+)/)) ? e[1].replace("OPR", "Opera") : (i = i[2] ? [i[1], i[2]] : [navigator.appName, navigator.appVersion, "-?"],
            null != (e = t.match(/version\/(\d+)/i)) && i.splice(1, 1, e[1]),
            i[0])
        },
        get_browser_version: function() {
            var e = navigator.appName
              , t = navigator.userAgent
              , i = t.match(/(edge|opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            return i && null != (t = t.match(/version\/([\.\d]+)/i)) && (i[2] = t[1]),
            (i = i ? [i[1], i[2]] : [e, navigator.appVersion, "-?"])[1]
        },
        isFaceBook: function() {
            return P.isFaceBookApp == C && (P.isFaceBookApp = navigator.userAgent || navigator.vendor || window.opera,
            P.isFaceBookApp = -1 < P.isFaceBookApp.indexOf("FBAN") || -1 < P.isFaceBookApp.indexOf("FBAV")),
            P.isFaceBookApp
        },
        isFirefox: function(e) {
            return P[e].isFirefox = P[e].isFirefox === C ? "Firefox" === P.get_browser() : P[e].isFirefox,
            P.isFF = P[e].isFirefox,
            P[e].isFirefox
        },
        isSafari11: function() {
            return "safari" === P.trim(P.get_browser().toLowerCase()) && 11 <= parseFloat(P.get_browser_version())
        },
        isWebkit: function() {
            var e = /(webkit)[ \/]([\w.]+)/.exec(navigator.userAgent.toLowerCase());
            return e && e[1] && "webkit" === e[1]
        },
        isIE11: function() {
            return P.IE11 = P.IE11 === C ? !!navigator.userAgent.match(/Trident.*rv\:11\./) : P.IE11,
            P.IE11
        },
        checkBackdrop: function() {
            var e = document.createElement("div")
              , t = (e.style.cssText = "-webkit-backdrop-filter: blur(2px)",
            0 != e.style.length)
              , i = document.documentMode === C || 9 < document.documentMode;
            t && i || (e.style.cssText = "backdrop-filter: blur(2px)",
            t = 0 != e.style.length),
            e = null,
            P.useBackdrop = t && i
        },
        deepLink: function(e, t) {
            if (t !== C) {
                var i = parseInt(t.toString().replace(/^slide/, "").replace("-", ""), 10);
                if (isNaN(i))
                    for (var a in P[e].slides)
                        if (P[e].slides.hasOwnProperty(a) && P.gA(P[e].slides[a], "deeplink") === t) {
                            i = parseInt(P.gA(P[e].slides[a], "originalindex"), 10);
                            break
                        }
                return isNaN(i) || i < 1 || i > P[e].realslideamount ? void 0 : i
            }
        },
        getHorizontalOffset: function(e, t) {
            var i = c(e, ".outer-left")
              , e = c(e, ".outer-right");
            return "left" == t ? i : "right" == t ? e : "all" == t ? {
                left: i,
                right: e,
                both: i + e,
                inuse: i + e != 0
            } : i + e
        },
        getComingSlide: function(e, t) {
            var i = P[e].pr_next_key !== C ? P[e].pr_next_key : P[e].pr_processing_key !== C ? P[e].pr_processing_key : P[e].pr_active_key
              , a = 0
              , a = 0;
            if (P[e].pr_active_slide !== C && "true" == P.gA(P[e].pr_active_slide[0], "not_in_nav") && (i = P[e].pr_lastshown_key),
            t !== C && P.isNumeric(t) || t !== C && t.match(/to/g))
                a = 1 === t || -1 === t ? parseInt(i, 0) + t < 0 ? P[e].slideamount - 1 : parseInt(i, 0) + t >= P[e].slideamount ? 0 : parseInt(i, 0) + t : (t = P.isNumeric(t) ? t : parseInt(t.split("to")[1], 0)) < 0 ? 0 : t > P[e].slideamount - 1 ? P[e].slideamount - 1 : t;
            else if (t)
                for (var r in P[e].slides)
                    P[e].slides.hasOwnProperty(r) && (a = P[e].slides && P[e].slides[r] && (P.gA(P[e].slides[r], "key") === t || P[e].slides[r].id === t) ? r : a);
            return {
                nindex: a,
                aindex: i
            }
        },
        callingNewSlide: function(e, t, i, a) {
            t = P.getComingSlide(e, t);
            P[e].pr_next_key = t.nindex,
            P[e].sdir = ("bullet" === P[e].sc_indicator || P[e].pr_active_key != P[e].slideamount - 1 || 0 != P[e].pr_next_key) && P[e].pr_next_key < P[e].pr_active_key ? 1 : 0,
            i && P[e].carousel !== C && (P[e].carousel.focused = P[e].pr_next_key),
            "carousel" === P[e].sliderType && P[e].startedWithOtherSlide && (P[e].carousel.focused = P[e].pr_next_key,
            delete P[e].startedWithOtherSlide),
            P[e].ctNavElement ? P[e].ctNavElement = !1 : P[e].c.trigger("revolution.nextslide.waiting"),
            (P[e].started && t.aindex === P[e].pr_next_key && t.aindex === P[e].pr_lastshown_key || P[e].pr_next_key !== t.aindex && -1 != P[e].pr_next_key && P[e].pr_lastshown_key !== C) && y(e, i, a)
        },
        getLoadObj: function(e, t) {
            e = P[e].loadqueue !== C && P[e].loadqueue.filter(function(e) {
                return e.src === t
            })[0];
            return e === C ? {
                src: t
            } : e
        },
        getResponsiveLevel: function(e) {
            var t = 9999
              , i = 0
              , a = 0
              , r = 0;
            if (P[e].responsiveLevels && P[e].responsiveLevels.length)
                for (var o in P[e].responsiveLevels)
                    P[e].responsiveLevels.hasOwnProperty(o) && (P.winWAll < P[e].responsiveLevels[o] && (0 == i || i > parseInt(P[e].responsiveLevels[o])) && (t = parseInt(P[e].responsiveLevels[o]),
                    r = parseInt(o),
                    i = parseInt(P[e].responsiveLevels[o])),
                    P.winWAll > P[e].responsiveLevels[o]) && i < P[e].responsiveLevels[o] && (i = parseInt(P[e].responsiveLevels[o]),
                    a = parseInt(o));
            return i < t ? a : r
        },
        getSizeMultpilicator: function(e, t, i) {
            var a = {
                h: 0,
                w: 0
            };
            return P[e].justifyCarousel ? a.h = a.w = 1 : (a.w = i.width / P[e].gridwidth[P[e].level],
            a.h = i.height / P[e].gridheight[P[e].level],
            a.w = isNaN(a.w) ? 1 : a.w,
            a.h = isNaN(a.h) ? 1 : a.h,
            1 == P[e].enableUpscaling ? a.h = a.w : (a.w < a.h ? a.h = a.w : a.w = a.h,
            (1 < a.h || 1 < a.w) && (a.w = 1,
            a.h = 1))),
            a
        },
        updateDims: function(t, e) {
            var i, a = P[t].pr_processing_key || P[t].pr_active_key || 0, r = P[t].pr_active_key || 0, o = P[t].modal !== C && P[t].modal.useAsModal, s = o ? P.winWAll : P.winW, n = !1, l = (P[t].lastScrollBarWidth = P.scrollBarWidth,
            P[t].redraw = P[t].redraw === C ? {} : P[t].redraw,
            P[t].module = P[t].module === C ? {} : P[t].module,
            P[t].canv = P[t].canv === C ? {} : P[t].canv,
            P[t].content = P[t].content === C ? {} : P[t].content,
            P[t].drawUpdates = {
                c: {},
                cpar: {},
                canv: {}
            },
            "carousel" == P[t].sliderType ? P[t].module.margins = {
                top: parseInt(P[t].carousel.padding_top || 0, 0),
                bottom: parseInt(P[t].carousel.padding_bottom || 0, 0)
            } : P[t].module.margins = {
                top: 0,
                bottom: 0
            },
            P[t].module.paddings === C && (P[t].module.paddings = {
                top: parseInt(P[t].cpar.css("paddingTop"), 0) || 0,
                bottom: parseInt(P[t].cpar.css("paddingBottom"), 0) || 0
            }),
            P[t].blockSpacing !== C ? (P[t].block = {
                bottom: P[t].blockSpacing.bottom !== C ? parseInt(P[t].blockSpacing.bottom[P[t].level], 0) : 0,
                top: P[t].blockSpacing.top !== C ? parseInt(P[t].blockSpacing.top[P[t].level], 0) : 0,
                left: P[t].blockSpacing.left !== C ? parseInt(P[t].blockSpacing.left[P[t].level], 0) : 0,
                right: P[t].blockSpacing.right !== C ? parseInt(P[t].blockSpacing.right[P[t].level], 0) : 0
            },
            P[t].block.hor = P[t].block.left + P[t].block.right,
            P[t].block.ver = P[t].block.top + P[t].block.bottom) : P[t].block === C && (P[t].block = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                hor: 0,
                ver: 0
            }),
            P[t].blockSpacing !== C && (i = {
                paddingLeft: P[t].block.left,
                paddingRight: P[t].block.right,
                marginTop: P[t].block.top,
                marginBottom: P[t].block.bottom
            },
            l = JSON.stringify(i),
            i !== P[t].emptyObject) && l !== P[t].caches.setsizeBLOCKOBJ && (tpGS.gsap.set(P[t].blockSpacing.block, i),
            P[t].caches.setsizeBLOCKOBJ = l,
            n = !0),
            P[t].levelForced = P[t].level = P.getResponsiveLevel(t),
            P[t].rowHeights = P.getRowHeights(t),
            P[t].aratio = P[t].gridheight[P[t].level] / P[t].gridwidth[P[t].level],
            P[t].module.width = "auto" === P[t].sliderLayout || 1 == P[t].disableForceFullWidth ? P[t].cpar.width() : s - P[t].block.hor,
            P[t].outNavDims = P.getOuterNavDimension(t),
            P[t].canv.width = P[t].module.width - P[t].outNavDims.horizontal - (o ? P.scrollBarWidth : 0),
            o && "auto" === P[t].sliderLayout && (P[t].canv.width = Math.min(P[t].gridwidth[P[t].level], s)),
            "fullscreen" === P[t].sliderLayout || P[t].infullscreenmode ? (i = P.getWinH(t) - (!0 === P[t].modal.useAsModal ? 0 : P.getFullscreenOffsets(t)),
            P[t].canv.height = Math.max(P[t].rowHeights.cur, Math.max(i - P[t].outNavDims.vertical, P[t].minHeight)),
            r !== a && (P[t].currentSlideHeight = Math.max(P[t].rowHeights.last, Math.max(i - P[t].outNavDims.vertical, P[t].minHeight)),
            P[t].redraw.maxHeightOld = !0),
            P[t].drawUpdates.c.height = "100%") : (P[t].canv.height = P[t].keepBPHeight ? P[t].gridheight[P[t].level] : Math.round(P[t].canv.width * P[t].aratio),
            P[t].canv.height = P[t].autoHeight ? P[t].canv.height : Math.min(P[t].canv.height, P[t].gridheight[P[t].level]),
            P[t].carousel.prevNextVisCalculated = "carousel" == P[t].sliderType && "v" == P[t].carousel.orientation ? "%" == P[t].carousel.prevNextVisType ? P[t].canv.height * P[t].carousel.prevNextVis : P[t].carousel.prevNextVis : 0,
            P[t].canv.height = Math.max(Math.max(P[t].rowHeights.cur, P[t].canv.height), P[t].minHeight) + P[t].carousel.prevNextVisCalculated,
            P[t].drawUpdates.c.height = P[t].canv.height),
            "fullscreen" !== P[t].sliderLayout && "fullwidth" !== P[t].sliderLayout || (P[t].canv.width -= P[t].cpar.outerWidth() - P[t].cpar.width(),
            "fullscreen" === P[t].sliderLayout && (P[t].canv.height -= P[t].cpar.outerHeight() - P[t].cpar.height())),
            P[t].module.height = P[t].canv.height,
            "fullwidth" != P[t].sliderLayout || P[t].fixedOnTop || (P[t].drawUpdates.c.maxHeight = 0 != P[t].maxHeight ? Math.min(P[t].canv.height, P[t].maxHeight) : P[t].canv.height),
            P[t].CM = P.getSizeMultpilicator(t, P[t].enableUpscaling, {
                width: P[t].canv.width,
                height: P[t].canv.height
            }),
            P[t].content.width = P[t].gridwidth[P[t].level] * P[t].CM.w,
            P[t].content.height = Math.round(Math.max(P[t].rowHeights.cur, P[t].gridheight[P[t].level] * P[t].CM.h)),
            P[t].module.margins.top + P[t].module.margins.bottom + ("fullscreen" === P[t].sliderLayout ? 0 : P[t].outNavDims.vertical) + P[t].canv.height + P[t].module.paddings.top + P[t].module.paddings.bottom), s = (P[t].drawUpdates.cpar.height = l,
            P[t].drawUpdates.cpar.width = "auto" === P[t].sliderLayout ? "auto" : P[t].module.width,
            "auto" === P[t].sliderLayout || "fullscreen" === P[t].sliderLayout && !0 === P[t].disableForceFullWidth || P[t].rsFullWidthWrap === C ? "fullscreen" == P[t].sliderLayout && 1 == P[t].disableForceFullWidth && (P[t].drawUpdates.cpar.left = 0) : P[t].drawUpdates.cpar.left = 0 - Math.ceil(P[t].rsFullWidthWrap.offset().left - (P[t].outNavDims.left + P[t].block.left)),
            P[t].sbtimeline.set && P[t].sbtimeline.fixed ? (P[t].sbtimeline.extended === C && P.updateFixedScrollTimes(t),
            P[t].forcerHeight = 2 * l + P[t].sbtimeline.extended,
            P[t].sbtimeline.pullc && P[t].rsFullWidthWrap !== C && null !== P[t].rsFullWidthWrap[0] && requestAnimationFrame(function() {
                var e = P[t].rsFullWidthWrapMarginBottom + -1 * P[t].forcerHeight;
                P[t].rsFullWidthWrap[0].style.marginBottom = (isNaN(e) ? P[t].rsFullWidthBottomMarginPush : P[t].rsFullWidthBottomMarginPush + e) + "px"
            }),
            P[t].rsFullWidthWrap !== C && null !== P[t].rsFullWidthWrap[0] && "fullscreen" == P[t].sliderLayout && (P[t].rsFullWidthBottomMarginPush = P.getFullscreenOffsets(t),
            P[t].rsFullWidthWrap[0].style.marginBottom = P[t].rsFullWidthBottomMarginPush + "px")) : P[t].forcerHeight = l,
            P[t].forcerHeight !== P[t].caches.setsizeForcerHeight && P[t].forcer !== C && (P[t].caches.setsizeForcerHeight = P[t].forcerHeight,
            P[t].redraw.forcer = n = !0),
            P[t].drawUpdates.c.width = P[t].canv.width,
            "auto" === P[t].sliderLayout && (P[t].drawUpdates.c.left = P[t].outNavDims.left),
            P[t].drawUpdates.c !== P[t].emptyObject && JSON.stringify(P[t].drawUpdates.c) !== P[t].caches.setsizeCOBJ && (P[t].caches.setsizeCOBJ = JSON.stringify(P[t].drawUpdates.c),
            P[t].redraw.c = n = !0),
            P[t].drawUpdates.cpar !== P[t].emptyObject && JSON.stringify(P[t].drawUpdates.cpar) !== P[t].caches.setsizeCPAROBJ && (P[t].caches.setsizeCPAROBJ = JSON.stringify(P[t].drawUpdates.cpar),
            P[t].redraw.cpar = n = !0),
            o && "auto" === P[t].sliderLayout && P[t].caches.canWidth !== P[t].canv.width && (P[t].caches.canWidth = P[t].canv.width,
            P[t].redraw.modalcanvas = n = !0),
            P[t].slayers && 0 < P[t].slayers.length && P[t].outNavDims.left !== P[t].caches.outNavDimsLeft && "fullwidth" != P[t].sliderLayout && "fullscreen" != P[t].sliderLayout && (P[t].caches.outNavDimsLeft = P[t].outNavDims.left,
            P[t].redraw.slayers = !0),
            o && P[t].modal.calibration !== C && "middle" === P[t].modal.vertical && (P[t].modal.calibration.top = P.getWinH(t) < l ? "0%" : "50%",
            P[t].modal.calibration.y = P.getWinH(t) < l ? "0px" : "-50%",
            "fullwidth" === P[t].sliderLayout) && (P[t].redraw.modulewrap = n = !0),
            P[t].gridOffsetWidth = (P[t].module.width - P[t].gridwidth[P[t].level]) / 2,
            P[t].gridOffsetHeight = (P[t].module.height - P[t].content.height) / 2,
            P[t].caches.curRowsHeight = P[t].currentRowsHeight = P[t].rowHeights.cur,
            P[t].caches.moduleWidth = P[t].width = P[t].module.width,
            P[t].caches.moduleHeight = P[t].height = P[t].module.height,
            P[t].caches.canWidth = P[t].conw = P[t].canv.width,
            P[t].caches.canHeight = P[t].conh = P[t].canv.height,
            P[t].bw = P[t].CM.w,
            P[t].bh = P[t].CM.h,
            P[t].caches.outNavDimsLeft = P[t].outNavDims.left,
            window.requestAnimationFrame(function() {
                P[t].redraw.forcer && tpGS.gsap.set(P[t].forcer, {
                    height: P[t].forcerHeight
                }),
                P[t].redraw.c && tpGS.gsap.set(P[t].c, P[t].drawUpdates.c),
                P[t].redraw.cpar && tpGS.gsap.set(P[t].cpar, P[t].drawUpdates.cpar),
                P[t].redraw.modalcanvas && P[t] !== C && (P[t].modal !== C && P[t].modal.c !== C && tpGS.gsap.set(P[t].modal.c, {
                    width: P[t].canv.width
                }),
                P[t].canvas !== C) && tpGS.gsap.set(P[t].canvas, {
                    width: P[t].canv.width
                }),
                P[t].redraw.maxHeightOld && (P[t].slides[r].style.maxHeight = P[t].currentSlideHeight !== P[t].canv.height ? P[t].currentSlideHeight + "px" : "none"),
                P[t].redraw.slayers && tpGS.gsap.set(P[t].slayers, {
                    left: P[t].outNavDims.left
                }),
                P[t].redraw.modulewrap && tpGS.gsap.set(P[t].modal.c.find("rs-module-wrap"), P[t].modal.calibration),
                !0 !== P[t].navigation.initialised && "prepared" === e && ("hero" !== P[t].sliderType && P.createNavigation && P[t].navigation.use && !0 !== P[t].navigation.createNavigationDone && P.createNavigation(t),
                P.resizeThumbsTabs) && P.resizeThumbsTabs && P[t].navigation.use && P.resizeThumbsTabs(t),
                P[t].rebuildProgressBar && _(t),
                P.putRowsInPosition(t),
                P[t].redraw = {}
            }),
            P[t].inviewport && (P[t].heightInLayers !== C && P[t].module.height !== P[t].heightInLayers || P[t].widthInLayers !== C && P[t].module.width !== P[t].widthInLayers));
            return "ignore" !== e && s && (P[t].heightInLayers = C,
            P[t].widthInLayers = C,
            "carousel" !== P[t].sliderType && (P[t].pr_next_key !== C ? P.animateTheLayers({
                slide: P[t].pr_next_key,
                id: t,
                mode: "rebuild",
                caller: "swapSlideProgress_1"
            }) : P[t].pr_processing_key !== C ? P.animateTheLayers({
                slide: P[t].pr_processing_key,
                id: t,
                mode: "rebuild",
                caller: "swapSlideProgress_2"
            }) : P[t].pr_active_key !== C && P.animateTheLayers({
                slide: P[t].pr_active_key,
                id: t,
                mode: "rebuild",
                caller: "swapSlideProgress_3"
            })),
            n = !0),
            n && "ignore" !== e && P.requestLayerUpdates(t, "enterstage"),
            P[t].module.height !== P[t].module.lastHeight && (P[t].module.lastHeight = P[t].module.height,
            window.requestAnimationFrame(function() {
                window.innerHeight !== screen.height && Math.round(window.innerHeight * window.devicePixelRatio) !== screen.height && G(t, C, !1)
            })),
            tpGS.gsap.delayedCall(.1, function() {
                P[t].lastScrollBarWidth !== P.scrollBarWidth ? (P.updateDims(t, "ignore"),
                G(t)) : P.isModalOpen || P.scrollBarWidth === window.innerWidth - document.documentElement.clientWidth || P.rAfScrollbar === C && (P.rAfScrollbar = requestAnimationFrame(function() {
                    P.rAfScrollbar = C,
                    P.getWindowDimension(t, !1)
                }))
            }),
            n
        },
        putMiddleZoneInPosition: function(e, t) {
            P[e].middleZones == C || P[e].middleZones[t] == C || P[e].rowMiddleHeights == C || P[e].rowMiddleHeights[t] == C || P[e].caches.middleHeights[t] === P[e].rowMiddleHeights[t] && P[e].caches.lastModuleHeight === P[e].module.height || (tpGS.gsap.set(P[e].middleZones[t], {
                top: Math.round(P[e].module.height / 2 - P[e].rowMiddleHeights[t] / 2)
            }),
            P[e].caches.middleHeights[t] = P[e].rowMiddleHeights[t])
        },
        putRowsInPosition: function(e) {
            var t = P[e].activeRSSlide || 0
              , i = P[e].pr_processing_key;
            P.putMiddleZoneInPosition(e, t),
            t !== i && i !== C && P.putMiddleZoneInPosition(e, i),
            P[e].smiddleZones == C || P[e].rowMiddleHeights == C || P[e].rowMiddleHeights.static == C || P[e].caches.middleHeights.static === P[e].rowMiddleHeights.static && P[e].caches.lastModuleHeight === P[e].module.height || (tpGS.gsap.set(P[e].smiddleZones[0], {
                top: Math.round(P[e].module.height / 2 - P[e].rowMiddleHeights.static / 2)
            }),
            P[e].caches.middleHeights.static = P[e].rowMiddleHeights.static),
            P[e].caches.lastModuleHeight = P[e].module.height
        },
        getSlideIndex: function(e, t) {
            var i, a = !1;
            for (i in P[e].slides) {
                if (!P[e].slides.hasOwnProperty(i) || !1 !== a)
                    continue;
                a = P.gA(P[e].slides[i], "key") === t ? i : a
            }
            return !1 === a ? 0 : a
        },
        loadUpcomingContent: function(e) {
            var t, i, a, r;
            "smart" == P[e].lazyType && (t = [],
            a = (i = parseInt(P.getSlideIndex(e, P.gA(P[e].pr_next_slide[0], "key")), 0)) - 1 < 0 ? P[e].realslideamount - 1 : i - 1,
            r = i + 1 == P[e].realslideamount ? 0 : i + 1,
            a !== i && t.push(P[e].slides[a]),
            r !== i && t.push(P[e].slides[r]),
            0 < t.length) && (P.loadImages(t, e, 2),
            P.waitForCurrentImages(t, e, function() {}))
        },
        lazyLoadAllSlides: function(e) {
            if ("all" == P[e].lazyType && !0 !== P[e].lazyLoad_AllDone && (P[e].viewPort.enable && P[e].inviewport || !P[e].viewPort.enable)) {
                for (var t in P[e].slides)
                    P[e].slides.hasOwnProperty(t) && (P.loadImages(P[e].slides[t], e, t),
                    P.waitForCurrentImages(P[e].slides[t], e, function() {}));
                P[e].lazyLoad_AllDone = !0
            }
        },
        getFullscreenOffsets: function(e) {
            var t = 0;
            if (P[e].fullScreenOffsetContainer != C) {
                var i, a = ("" + P[e].fullScreenOffsetContainer).split(",");
                for (i in a)
                    a.hasOwnProperty(i) && (t += T(a[i]).outerHeight(!0) || 0)
            }
            return P[e].fullScreenOffset != C && (!P.isNumeric(P[e].fullScreenOffset) && 1 < P[e].fullScreenOffset.split("%").length ? t += P.getWinH(e) * parseInt(P[e].fullScreenOffset, 0) / 100 : P.isNumeric(parseInt(P[e].fullScreenOffset, 0)) && (t += parseInt(P[e].fullScreenOffset, 0) || 0)),
            P[e].fullScreenOffsetResult = t
        },
        unToggleState: function(e) {
            if (e !== C)
                for (var t = 0; t < e.length; t++)
                    try {
                        document.getElementById(e[t]).classList.remove("rs-tc-active")
                    } catch (e) {}
        },
        toggleState: function(e) {
            if (e !== C)
                for (var t = 0; t < e.length; t++)
                    try {
                        document.getElementById(e[t]).classList.add("rs-tc-active")
                    } catch (e) {}
        },
        swaptoggleState: function(e) {
            if (e != C && 0 < e.length)
                for (var t = 0; t < e.length; t++) {
                    var i = document.getElementById(e[t]);
                    if (P.gA(i, "toggletimestamp") !== C && (new Date).getTime() - P.gA(i, "toggletimestamp") < 250)
                        return;
                    P.sA(i, "toggletimestamp", (new Date).getTime()),
                    null !== i && (0 <= i.className.indexOf("rs-tc-active") ? i.classList.remove("rs-tc-active") : i.classList.add("rs-tc-active"))
                }
        },
        lastToggleState: function(e) {
            if (e !== C)
                for (var t = 0; t < e.length; t++)
                    var i = document.getElementById(e[t])
                      , a = !0 === a || null !== i && 0 <= i.className.indexOf("rs-tc-active") || a;
            return a
        },
        revCheckIDS: function(e, t) {
            var i, a, r;
            return P.gA(t, "idcheck") === C && (i = t.id,
            (r = -1) !== (a = T.inArray(t.id, window.RSANYID)) && (r = T.inArray(t.id, P[e].anyid),
            window.RSANYID_sliderID[a] === e && -1 === r || (t.id = t.id + "_" + Math.round(9999 * Math.random()),
            console.log("Warning - ID:" + i + " exists already. New Runtime ID:" + t.id),
            a = r = -1)),
            -1 === r && P[e].anyid.push(t.id),
            -1 === a) && (window.RSANYID.push(t.id),
            window.RSANYID_sliderID.push(e)),
            P.sA(t, "idcheck", !0),
            t.id
        },
        buildSpinner: function(e, t, i, a) {
            if ("off" !== t) {
                a = a === C ? "" : a,
                i = i === C ? "#ffffff" : i;
                var r = parseInt(t.replace("spinner", ""), 10);
                if (isNaN(r) || r < 6)
                    var o = 'style="background-color:' + i + '"'
                      , s = a === C || 3 !== r && 4 != r ? "" : o
                      , o = T("<rs-loader " + (a === C || 1 !== r && 2 != r ? "" : o) + ' class="' + t + " " + a + '"><div ' + s + ' class="dot1"></div><div ' + s + ' class="dot2"></div><div ' + s + ' class="bounce1"></div><div ' + s + ' class="bounce2"></div><div ' + s + ' class="bounce3"></div></rs-loader>');
                else {
                    for (var n, l = '<div class="rs-spinner-inner"', d = (7 === r ? (-1 !== i.search("#") ? (n = i.replace("#", ""),
                    n = "rgba(" + parseInt(n.substring(0, 2), 16) + ", " + parseInt(n.substring(2, 4), 16) + ", " + parseInt(n.substring(4, 6), 16) + ", ") : -1 !== i.search("rgb") && 2 < (n = i.substring(i.indexOf("(") + 1, i.lastIndexOf(")")).split(",")).length && (n = "rgba(" + n[0].trim() + ", " + n[1].trim() + ", " + n[2].trim() + ", "),
                    n && "string" == typeof n && (l += ' style="border-top-color: ' + n + "0.65); border-bottom-color: " + n + "0.15); border-left-color: " + n + "0.65); border-right-color: " + n + '0.15)"')) : 12 === r && (l += ' style="background:' + i + '"'),
                    l += ">",
                    [10, 0, 4, 2, 5, 9, 0, 4, 4, 2][r - 6]), c = 0; c < d; c++)
                        0 < c && (l += " "),
                        l += '<span style="background:' + i + '"></span>';
                    o = T('<rs-loader class="' + t + " " + a + '">' + (l += "</div>") + "</div></rs-loader>")
                }
                return o
            }
        },
        addStaticLayerTo: function(e, t, i) {
            var a;
            P[e].slayers.length < 2 ? ((a = document.createElement("rs-static-layers")).className = "rs-stl-" + t,
            a.appendChild(i[0]),
            P[e].c[0].appendChild(a),
            P[e].slayers.push(a)) : P[e].slayers[1].appendChild(i[0])
        }
    }),
    function() {
        return P.isIE11() ? function(e, t) {
            return e.querySelectorAll(t)
        }
        : function(e, t) {
            return e.getElementsByTagName(t)
        }
    }
    ), n = function(e) {
        P[e].responsiveLevels = P.revToResp(P[e].responsiveLevels, P[e].rle),
        P[e].visibilityLevels = P.revToResp(P[e].visibilityLevels, P[e].rle),
        P[e].responsiveLevels[0] = 9999,
        P[e].rle = P[e].responsiveLevels.length || 1,
        P[e].gridwidth = P.revToResp(P[e].gridwidth, P[e].rle),
        P[e].gridheight = P.revToResp(P[e].gridheight, P[e].rle),
        P[e].editorheight !== C && (P[e].editorheight = P.revToResp(P[e].editorheight, P[e].rle)),
        P.updateDims(e)
    }, I = function(e, i) {
        var a = [];
        return T.each(e, function(e, t) {
            e != i && a.push(t)
        }),
        a
    }, l = function(e, t, i) {
        P[i].c.find(e).each(function() {
            var e = T(this);
            e.data("key") === t && e.remove()
        })
    }, d = function(e, t) {
        if (P["rsfont_" + e] == C && (P["rsfont_" + e] = document.createElement("span"),
        P["rsfont_" + e].innerHTML = Array(100).join("wi"),
        P["rsfont_" + e].style.cssText = ["position:absolute", "width:auto", "font-size:128px", "left:-99999px"].join(" !important;"),
        P["rsfont_" + e].style.fontFamily = e,
        document.body.appendChild(P["rsfont_" + e])),
        t === C)
            return P["rsfont_" + e].clientWidth;
        document.body.removeChild(P["rsfont_" + e])
    }, c = function(e, t) {
        var i = 0;
        return e.find(t).each(function() {
            var e = T(this);
            !e.hasClass("tp-forcenotvisible") && i < e.outerWidth() && (i = e.outerWidth())
        }),
        i
    }, p = function(e) {
        if (e === C || P[e] === C || P[e].c === C)
            return !1;
        if (P[e].cpar !== C && P[e].cpar.data("aimg") != C && ("enabled" == P[e].cpar.data("aie8") && P.isIE(8) || "enabled" == P[e].cpar.data("amobile") && P.ISM))
            P[e].c.html('<img class="tp-slider-alternative-image" src="' + P[e].cpar.data("aimg") + '">');
        else {
            window._rs_firefox13 = !1,
            window._rs_firefox = P.isFirefox(),
            window._rs_ie = window._rs_ie === C ? !T.support.opacity : window._rs_ie,
            window._rs_ie9 = window._rs_ie9 === C ? 9 == document.documentMode : window._rs_ie9;
            var t, i = T.fn.jquery.split("."), a = parseFloat(i[0]), r = parseFloat(i[1]), o = (1 == a && r < 7 && P[e].c.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:' + i + " <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>"),
            1 < a && (window._rs_ie = !1),
            P[e].realslideamount = P[e].slideamount = 0,
            P.getByTag(P[e].canvas[0], "RS-SLIDE")), s = [];
            for (t in P[e].notInNav = [],
            P[e].slides = [],
            o)
                o.hasOwnProperty(t) && ("on" == P.gA(o[t], "hsom") && P.ISM ? s.push(o[t]) : (P.gA(o[t], "invisible") || 1 == P.gA(o[t], "invisible") ? P[e].notInNav.push(o[t]) : (P[e].slides.push(o[t]),
                P[e].slideamount++),
                P[e].realslideamount++,
                P.sA(o[t], "originalindex", P[e].realslideamount),
                P.sA(o[t], "origindex", P[e].realslideamount - 1)));
            for (t in s)
                s.hasOwnProperty(t) && s[t].remove();
            for (t in P[e].notInNav)
                P[e].notInNav.hasOwnProperty(t) && (P.sA(P[e].notInNav[t], "not_in_nav", !0),
                P[e].canvas[0].appendChild(P[e].notInNav[t]));
            P[e].canvas.css({
                visibility: "visible"
            }),
            P[e].slayers = P[e].c.find("rs-static-layers"),
            P[e].slayers[0] && P[e].slayers.className && -1 !== P[e].slayers[0].className.indexOf("rs-stl-visible") && P[e].c.addClass("rs-stl-visible"),
            0 < P[e].slayers.length && P.sA(P[e].slayers[0], "key", "staticlayers"),
            !0 === P[e].modal.useAsModal && (P[e].cpar.wrap('<rs-modal id="' + P[e].c[0].id + '_modal"></rs-modal>'),
            P[e].modal.c = T(P.closestNode(P[e].cpar[0], "RS-MODAL")),
            P[e].modal.c.appendTo(T("body")),
            P[e].modal !== C) && P[e].modal.alias !== C && P.revModal(e, {
                mode: "init"
            }),
            1 == P[e].waitForInit || 1 == P[e].modal.useAsModal ? (P.RS_toInit !== C && (P.RS_toInit[e] = !0),
            P[e].c.trigger("revolution.slide.waitingforinit"),
            P[e].waitingForInit = !0) : (window.requestAnimationFrame(function() {
                g(e)
            }),
            P[e].initEnded = !0)
        }
    }, B = function(e, t, i) {
        return P.gA(e, "lazyload") !== C ? P.gA(e, "lazyload") : P[i].lazyloaddata !== C && 0 < P[i].lazyloaddata.length && P.gA(e, P[i].lazyloaddata) !== C ? P.gA(e, P[i].lazyloaddata) : P.gA(e, "lazy-src") !== C ? P.gA(e, "lazy-src") : P.gA(e, "lazy-wpfc-original-src") !== C ? P.gA(e, "lazy-wpfc-original-src") : P.gA(e, "lazy") !== C ? P.gA(e, "lazy") : t
    }, g = function(t) {
        if (P[t] !== C) {
            (P[t].sliderisrunning = !0) !== P[t].noDetach && P[t].c.detach();
            var e = P[t].canvas.find("rs-slide:first-child");
            if (P[t].shuffle) {
                for (var i = P.gA(e[0], "firstanim"), a = 0; a < P[t].slideamount; a++)
                    P[t].canvas.find("rs-slide:eq(" + Math.round(Math.random() * P[t].slideamount) + ")").prependTo(P[t].canvas);
                P.sA(P[t].canvas.find("rs-slide:first-child")[0], "firstanim", i)
            }
            P[t].slides = P.getByTag(P[t].canvas[0], "RS-SLIDE"),
            P[t].thumbs = new Array(P[t].slides.length),
            P[t].slots = 1,
            P[t].firststart = 1,
            P[t].loadqueue = [];
            var r, o = P[t].syncload = 0, s = "carousel" === P[t].sliderType && P[t].carousel.border_radius !== C ? parseInt(P[t].carousel.border_radius, 0) : 0;
            for (r in "carousel" !== P[t].sliderType && tpGS.gsap.set(P[t].slides, {
                display: "none"
            }),
            "carousel" !== P[t].sliderType && tpGS.gsap.set(e, {
                display: "block"
            }),
            P[t].slides)
                if (P[t].slides.hasOwnProperty(r) && "length" !== r) {
                    var n = P[t].slides[r]
                      , l = P.getByTag(n, "IMG")[0]
                      , d = (P.gA(n, "key") === C && P.sA(n, "key", "rs-" + Math.round(999999 * Math.random())),
                    {
                        params: Array(12),
                        id: P.gA(n, "key"),
                        src: P.gA(n, "thumb") !== C ? P.gA(n, "thumb") : B(l, l !== C ? l.src : C, t)
                    });
                    P.gA(n, "title") === C && P.sA(n, "title", ""),
                    P.gA(n, "description") === C && P.sA(n, "description", ""),
                    d.params[0] = {
                        from: RegExp("\\{\\{title\\}\\}", "g"),
                        to: P.gA(n, "title")
                    },
                    d.params[1] = {
                        from: RegExp("\\{\\{description\\}\\}", "g"),
                        to: P.gA(n, "description")
                    };
                    for (var c = 1; c <= 10; c++)
                        P.gA(n, "p" + c) !== C ? d.params[c + 1] = {
                            from: RegExp("\\{\\{param" + c + "\\}\\}", "g"),
                            to: P.gA(n, "p" + c)
                        } : d.params[c + 1] = {
                            from: RegExp("\\{\\{param" + c + "\\}\\}", "g"),
                            to: ""
                        };
                    if (P[t].thumbs[o] = T.extend({}, !0, d),
                    0 < s && tpGS.gsap.set(n, {
                        borderRadius: s + "px"
                    }),
                    P.gA(n, "link") != C || P.gA(n, "linktoslide") !== C) {
                        var l = P.gA(n, "link")
                          , l = l !== C ? l : "slide"
                          , p = "slide" != l ? "no" : P.gA(n, "linktoslide")
                          , g = P.gA(n, "seoz")
                          , u = P.gA(n, "tag");
                        if (p != C && "no" != p && "next" != p && "prev" != p)
                            for (var h in P[t].slides)
                                P[t].slides.hasOwnProperty(h) && parseInt(P.gA(P[t].slides[h], "origindex"), 0) + 1 == P.gA(n, "linktoslide") && (p = P.gA(P[t].slides[h], "key"));
                        "slide" == l || "a" != u ? T(n).prepend('<rs-layer class="rs-layer slidelink" id="rs_slidelink_' + Math.round(1e5 * Math.random()) + '" data-zindex="' + ("back" === g ? 0 : "front" === g ? 95 : g !== C ? parseInt(g, 0) : 100) + '" dataxy="x:c;y:c" data-dim="w:100%;h:100%" data-basealign="slide"' + ("no" == p ? "slide" == l || P.ISM ? "" : "  data-actions='o:click;a:simplelink;target:" + (P.gA(n, "target") || "_self") + ";url:" + l + ";'" : "  data-actions='" + ("scroll_under" === p ? "o:click;a:scrollbelow;offset:100px;" : "prev" === p ? "o:click;a:jumptoslide;slide:prev;d:0.2;" : "next" === p ? "o:click;a:jumptoslide;slide:next;d:0.2;" : "o:click;a:jumptoslide;slide:" + p + ";d:0.2;") + "'") + " data-frame_1='e:power3.inOut;st:100;sp:100' data-frame_999='e:power3.inOut;o:0;st:w;sp:100'>" + (P.ISM ? "<a " + ("slide" != l ? ("_blank" === P.gA(n, "target") ? 'rel="noopener" ' : "") + 'target="' + (P.gA(n, "target") || "_self") + '" href="' + l + '"' : "") + "><span></span></a>" : "") + "</rs-layer>") : T(n).prepend('<a class="rs-layer slidelink" id="rs_slidelink_' + Math.round(1e5 * Math.random()) + '" data-zindex="' + ("back" === g ? 0 : "front" === g ? 95 : g !== C ? parseInt(g, 0) : 100) + '" dataxy="x:c;y:c" data-dim="w:100%;h:100%" data-basealign="slide" href="' + l + '" target="' + (P.gA(n, "target") || "_self") + '" rel="noopener" data-frame_1="e:power3.inOut;st:100;sp:100" data-frame_999="e:power3.inOut;o:0;st:w;sp:100"><span></span></a>')
                    }
                    o++
                }
            if (P[t].simplifyAll && (P.isIE(8) || P.iOSVersion()) && (P[t].c.find(".rs-layer").each(function() {
                var e = T(this);
                e.removeClass("customin customout").addClass("fadein fadeout"),
                e.data("splitin", ""),
                e.data("speed", 400)
            }),
            P[t].c.find("rs-slide").each(function() {
                var e = T(this);
                e.data("transition", "fade"),
                e.data("masterspeed", 500),
                e.data("slotamount", 1),
                (e.find(".rev-slidebg") || e.find(">img").first()).data("panzoom", null)
            })),
            window._rs_desktop = window._rs_desktop === C ? !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i) : window._rs_desktop,
            P[t].autoHeight = "fullscreen" == P[t].sliderLayout || P[t].autoHeight,
            "fullwidth" != P[t].sliderLayout || P[t].autoHeight || "carousel" === P[t].sliderType && "v" === P[t].carousel.orientation || P[t].c.css({
                maxHeight: P[t].gridheight[P[t].level] + "px"
            }),
            "auto" == P[t].sliderLayout || null !== P.closestNode(P[t].c[0], "RS-FULLWIDTH-WRAP") || "fullscreen" === P[t].sliderLayout && 1 == P[t].disableForceFullWidth ? P[t].topc = P[t].cpar : (i = P[t].cpar[0].style.marginTop,
            e = P[t].cpar[0].style.marginBottom,
            P[t].rsFullWidthWrapMarginBottom = parseInt(e, 0),
            P[t].rsFullWidthWrap = P[t].topc = T('<rs-fullwidth-wrap id="' + P[t].c[0].id + '_forcefullwidth" style="' + (i = i === C || "" === i ? "" : "margin-top:" + i + ";") + (e = e === C || "" === e ? "" : "margin-bottom:" + e + ";") + '"></rs-fullwidth-wrap>'),
            P[t].forcer = T('<rs-fw-forcer style="height:' + (P[t].forcerHeight === C ? P[t].cpar.height() : P[t].forcerHeight) + 'px"></rs-fw-forcer>'),
            P[t].topc.append(P[t].forcer),
            P[t].topc.insertBefore(P[t].cpar),
            P[t].cpar.detach(),
            P[t].cpar.css({
                marginTop: "0px",
                marginBottom: "0px",
                position: "absolute"
            }),
            P[t].cpar.prependTo(P[t].topc)),
            P[t].forceOverflow ? P[t].topc[0].classList.add("rs-forceoverflow") : "3D" === P[t].parallax.type && P[t].topc[0].classList.add("rs-parallax-hidden-of"),
            "carousel" === P[t].sliderType && !0 !== P[t].overflowHidden && P[t].c.css({
                overflow: "visible"
            }),
            0 !== P[t].maxHeight && tpGS.gsap.set([P[t].cpar, P[t].c, P[t].topc], {
                maxHeight: P[t].maxHeight + "px"
            }),
            P[t].fixedOnTop && tpGS.gsap.set(P[t].blockSpacing !== C && P[t].blockSpacing.block !== C ? P[t].blockSpacing.block : P[t].topc, {
                position: "fixed",
                top: "0px",
                left: "0px",
                pointerEvents: "none",
                zIndex: 5e3
            }),
            P[t].shadow !== C && 0 < P[t].shadow && P[t].cpar.addClass("tp-shadow" + P[t].shadow).append('<div class="tp-shadowcover" style="background-color:' + P[t].cpar.css("backgroundColor") + ";background-image:" + P[t].cpar.css("backgroundImage") + '"></div>'),
            P.updateDims(t, "prepared"),
            P.observeWraps === C && (P.observeWraps = new P.wrapObserver.init(function(e, t) {
                G(t, C, !0)
            }
            )),
            !P[t].c.hasClass("revslider-initialised")) {
                P[t].c[0].classList.add("revslider-initialised"),
                P[t].c[0].id = P[t].c[0].id === C ? "revslider-" + Math.round(1e3 * Math.random() + 5) : P[t].c[0].id,
                P.revCheckIDS(t, P[t].c[0]),
                P[t].origcd = parseInt(P[t].duration, 0),
                P[t].scrolleffect._L = [],
                P[t].sbas = P[t].sbas === C ? {} : P[t].sbas,
                P[t].layers = P[t].layers || {},
                P[t].sortedLayers = P[t].sortedLayers || {};
                var m, v = P[t].c[0].querySelectorAll("rs-layer, rs-row, rs-column, rs-group,  rs-bgvideo, .rs-layer");
                for (m in v)
                    if (v.hasOwnProperty(m)) {
                        !P.ISM && v[m].classList.contains("iospermaccwait") && v[m].remove();
                        var f, y, w = T(v[m]), b = w.data();
                        if (b.startclasses = v[m].className,
                        b.startclasses = b.startclasses === C || null === b.startclasses ? "" : b.startclasses,
                        b.animationonscroll = !!P[t].sbtimeline.set && P[t].sbtimeline.layers,
                        b.animationonscroll = !0 === b.animationonscroll || "true" == b.animationonscroll,
                        b.filteronscroll = !!P[t].scrolleffect.set && P[t].scrolleffect.layers,
                        b.pxundermask = 0 <= b.startclasses.indexOf("rs-pxmask") && "off" !== P[t].parallax.type && 0 <= b.startclasses.indexOf("rs-pxl-"),
                        b.noPevents = 0 <= b.startclasses.indexOf("rs-noevents"),
                        b.sba)
                            for (var c in f = b.sba.split(";"))
                                f.hasOwnProperty(c) && ("t" == (y = f[c].split(":"))[0] && (b.animationonscroll = y[1],
                                "false" == y[1]) && (b.animOnScrollForceDisable = !0),
                                "e" == y[0] && (b.filteronscroll = y[1]),
                                "so" == y[0]) && (b.scrollBasedOffset = parseInt(y[1]) / 1e3);
                        if ("true" != b.animationonscroll && 1 != b.animationonscroll || (b.startclasses += " rs-sba",
                        w[0].className += " rs-sba"),
                        0 <= b.startclasses.indexOf("rs-layer-static") && P.handleStaticLayers && P.handleStaticLayers(w, t),
                        "RS-BGVIDEO" !== w[0].tagName) {
                            if (w[0].classList.add("rs-layer"),
                            "column" === b.type && (b.columnwidth = "33.33%",
                            b.verticalalign = "top",
                            b.column !== C))
                                for (var _ in f = b.column.split(";"))
                                    f.hasOwnProperty(_) && ("w" === (y = f[_].split(":"))[0] && (b.columnwidth = y[1]),
                                    "a" === y[0]) && (b.verticalalign = y[1]);
                            if ("group" === b.type && (b.verticalalign = "top",
                            b.column !== C))
                                for (var _ in f = b.column.split(";"))
                                    f.hasOwnProperty(_) && "a" === (y = f[_].split(":"))[0] && (b.verticalalign = y[1]);
                            var S = 0 <= b.startclasses.indexOf("slidelink") ? "z-index:" + b.zindex + ";width:100% !important;height:100% !important;" : ""
                              , x = "column" !== b.type && "group" !== b.type ? "" : b.verticalalign === C ? " vertical-align:top;" : " vertical-align:" + b.verticalalign + ";"
                              , k = "row" === b.type || "column" === b.type || "r" === b.pos ? "position:relative;" : "position:absolute;"
                              , L = ""
                              , O = "row" === b.type ? "rs-row-wrap" : "column" === b.type ? "rs-column-wrap" : "group" === b.type ? "rs-group-wrap" : "rs-layer-wrap"
                              , R = ""
                              , I = "";
                            b.noPevents;
                            "row" === b.type || "column" === b.type || "group" === b.type ? (w[0].classList.remove("tp-resizeme"),
                            "column" === b.type && (b.width = "auto",
                            w[0].group = "row",
                            tpGS.gsap.set(w, {
                                width: "auto"
                            }),
                            b.filteronscroll = !1)) : (R = "display:" + ("inline-block" === w[0].style.display ? "inline-block" : "block") + ";",
                            null !== P.closestNode(w[0], "RS-COLUMN") ? (w[0].group = "column",
                            b.filteronscroll = !1) : null !== P.closestNode(w[0], "RS-GROUP-WRAP") && (w[0].group = "group",
                            b.filteronscroll = !1)),
                            b.wrpcls !== C && (L = L + " " + b.wrpcls),
                            b.wrpid !== C && (I = 'id="' + b.wrpid + '"'),
                            b.thFixed = b.wrpcls !== C && b.wrpcls.includes("th-fixed") || b.startclasses !== C && b.startclasses.includes("ddd_mousebox"),
                            b.reqWrp = {
                                loop: !(1 != P[t].rtl && !b.thFixed && b.loop_0 === C && b.loop_999 === C),
                                level: {
                                    m: 0,
                                    lp: 0,
                                    p: 0
                                }
                            },
                            b.perspFix = window.isSafari11 && (b.btrans !== C && b.btrans.includes("iosfx:p") || "carousel" === P[t].sliderType && !v[m].classList.contains("rs-mtrap")),
                            b.reqWrp.mask = !!(b.perspFix || b.reqWrp.loop || 1 == P[t].rtl || b.pxundermask || b.thFixed || b.btrans !== C || b.frame_hover !== C && b.frame_hover.includes("m:t") || b.clip !== C || b.sba !== C || b.frame_0_sfx !== C || b.frame_1_sfx !== C || b.frame_999_sfx !== C || b.frame_0_mask !== C || b.frame_1_mask !== C || b.frame_2_mask !== C || b.frame_3_mask !== C || b.frame_4_mask !== C || b.frame_999_mask !== C),
                            b.reqWrp.level.m = b.pxundermask ? 2 : b.reqWrp.mask ? 1 : 0,
                            b.reqWrp.level.lp = b.reqWrp.level.m + (b.reqWrp.loop ? 1 : 0),
                            b.reqWrp.level.p = b.reqWrp.level.lp + 1,
                            b.perspFix && (S += "transform:perspective(600px);"),
                            w.wrap("<" + O + " " + I + ' class="rs-parallax-wrap ' + L + '" style="' + x + " " + S + k + R + ';pointer-events:none">' + (b.reqWrp.loop ? '<rs-loop-wrap style="' + S + k + R + '">' : "") + (b.reqWrp.mask ? '<rs-mask-wrap style="' + S + k + R + '">' : "") + (b.pxundermask ? "<rs-px-mask></rs-px-mask>" : "") + (b.reqWrp.mask ? "</rs-mask-wrap>" : "") + (b.reqWrp.loop ? "</rs-loop-wrap>" : "") + "</" + O + ">"),
                            !0 !== b.filteronscroll && "true" != b.filteronscroll || P[t].scrolleffect._L.push(w.parent()),
                            w[0].id = w[0].id === C ? "layer-" + Math.round(999999999 * Math.random()) : w[0].id,
                            P.revCheckIDS(t, w[0]),
                            P[t]._Lshortcuts[w[0].id] = {
                                p: D(w[0], b.reqWrp.level.p),
                                lp: D(w[0], b.reqWrp.level.lp),
                                m: D(w[0], b.reqWrp.level.m)
                            },
                            "column" !== b.type || "" == w[0].style.background && "" === w[0].style.backgroundColor && "" === w[0].style.backgroundImage && b.border === C ? b.cbgexists = !1 : (P[t]._Lshortcuts[w[0].id].p.append('<rs-cbg-mask-wrap><rs-column-bg id="' + w[0].id + '_rs_cbg"></rs-column-bg></rs-cbg-mask-wrap>'),
                            b.cbgexists = !0),
                            "text" === b.type && 0 < P.getByTag(w[0], "IFRAME").length && (P[t].slideHasIframe = !0,
                            w[0].classList.add("rs-ii-o")),
                            P[t].BUG_safari_clipPath && "true" != b.animationonscroll && 1 != b.animationonscroll && w[0].classList.add("rs-pelock"),
                            w[0].dataset.staticz !== C && "row" !== b.type && "row" !== w[0].group && "column" !== w[0].group && P.addStaticLayerTo(t, w[0].dataset.staticz, P[t]._Lshortcuts[w[0].id].p)
                        }
                        P.gA(w[0], "actions") && P.checkActions && P.checkActions(w, t, P[t]),
                        !P.checkVideoApis || window.rs_addedvim && window.rs_addedyt || P[t].youtubeapineeded && P[t].vimeoapineeded || P.checkVideoApis(w, t)
                    }
                P.checkActions && P.checkActions(C, t),
                P[t].c[0].addEventListener("mousedown", function() {
                    var e;
                    !0 !== P[t].onceClicked && (P[t].onceClicked = !0) !== P[t].onceVideoPlayed && P[t].activeRSSlide !== C && P[t].slides !== C && P[t].slides[P[t].activeRSSlide] !== C && (e = T(P[t].slides[P[t].activeRSSlide]).find("rs-bgvideo")) !== C && null !== e && 0 < e.length && P.playVideo(e, t)
                }),
                P[t].c[0].addEventListener("mouseenter", function() {
                    P[t].c.trigger("tp-mouseenter"),
                    P[t].overcontainer = !0
                }, {
                    passive: !0
                }),
                P[t].c[0].addEventListener("mouseover", function() {
                    P[t].c.trigger("tp-mouseover"),
                    P[t].overcontainer = !0
                }, {
                    passive: !0
                }),
                P[t].c[0].addEventListener("mouseleave", function() {
                    P[t].c.trigger("tp-mouseleft"),
                    P[t].overcontainer = !1
                }, {
                    passive: !0
                }),
                P[t].c.find(".rs-layer video").each(function(e) {
                    var t = T(this);
                    t.removeClass("video-js vjs-default-skin"),
                    t.attr("preload", ""),
                    t.css({
                        display: "none"
                    })
                }),
                P[t].rs_static_layer = P.getByTag(P[t].c[0], "RS-STATIC-LAYERS"),
                P.preLoadAudio && 0 < P[t].rs_static_layer.length && P.preLoadAudio(T(P[t].rs_static_layer), t, 1),
                0 < P[t].rs_static_layer.length && (P.loadImages(P[t].rs_static_layer[0], t, 0, !0),
                P.waitForCurrentImages(P[t].rs_static_layer[0], t, function() {
                    P[t] !== C && P[t].c.find("rs-static-layers img").each(function() {
                        this.src = P.getLoadObj(t, P.gA(this, "src") != C ? P.gA(this, "src") : this.src).src
                    })
                })),
                P[t].rowzones = [],
                P[t].rowzonesHeights = [],
                P[t].topZones = [],
                P[t].middleZones = [],
                P[t].bottomZones = [],
                P[t].rowMiddleHeights = {};
                var M, i = P.deepLink(t, F("#")[0]), e = (i !== C && (P[t].startWithSlide = i,
                P[t].deepLinkListener = !0,
                window.addEventListener("hashchange", function() {
                    var e;
                    !0 !== P[t].ignoreDeeplinkChange && (e = P.deepLink(t, F("#")[0])) !== C && P.callingNewSlide(t, e, !0),
                    P[t].ignoreDeeplinkChange = !1
                })),
                P[t].loader = P.buildSpinner(t, P[t].spinner, P[t].spinnerclr),
                P[t].loaderVisible = !0,
                P[t].c.append(P[t].loader),
                H(t),
                ("off" !== P[t].parallax.type || P[t].scrolleffect.set || P[t].sbtimeline.set) && P.checkForParallax && P.checkForParallax(t),
                P[t].fallbacks.disableFocusListener || "true" == P[t].fallbacks.disableFocusListener || !0 === P[t].fallbacks.disableFocusListener || (P[t].c.addClass("rev_redraw_on_blurfocus"),
                j()),
                P[t].viewPort);
                for (c in "on" === P[t].navigation.mouseScrollNavigation && (e.enable = !0),
                P[t].slides)
                    P[t].slides.hasOwnProperty(c) && (M = T(P[t].slides[c]),
                    P[t].rowzones[c] = [],
                    P[t].rowzonesHeights[c] = [],
                    P[t].topZones[c] = [],
                    P[t].middleZones[c] = [],
                    P[t].bottomZones[c] = [],
                    M.find("rs-zone").each(function() {
                        P[t].rowzones[c].push(T(this)),
                        0 <= this.className.indexOf("rev_row_zone_top") && P[t].topZones[c].push(this),
                        0 <= this.className.indexOf("rev_row_zone_middle") && (P[t].middleZones[c].push(this),
                        this.dataset.middle = "true"),
                        0 <= this.className.indexOf("rev_row_zone_bottom") && P[t].bottomZones[c].push(this)
                    }));
                P.lazyLoadAllSlides(t),
                P[t].srowzones = [],
                P[t].smiddleZones = [],
                P[t].slayers && P[t].slayers.find("rs-zone").each(function() {
                    P[t].srowzones.push(T(this)),
                    0 <= this.className.indexOf("rev_row_zone_middle") && (P[t].smiddleZones.push(this),
                    this.dataset.middle = "true")
                }),
                "carousel" === P[t].sliderType && tpGS.gsap.set(P[t].canvas, {
                    scale: 1,
                    perspective: 1200,
                    transformStyle: "flat",
                    opacity: 0
                }),
                P[t].c.prependTo(P[t].cpar),
                T("body").data("rs-fullScreenMode", !1),
                window.addEventListener("fullscreenchange", A, {
                    passive: !0
                }),
                window.addEventListener("mozfullscreenchange", A, {
                    passive: !0
                }),
                window.addEventListener("webkitfullscreenchange", A, {
                    passive: !0
                }),
                P.document.on("updateContainerSizes." + P[t].c.attr("id"), function() {
                    if (P[t] !== C)
                        return P[t].c != C && void (P.updateDims(t, "ignore") && window.requestAnimationFrame(function() {
                            P.updateDims(t, "ignore"),
                            P[t].fullScreenMode = P.checkfullscreenEnabled(t),
                            P.lastwindowheight = P.getWinH(t),
                            G(t)
                        }))
                }),
                e.presize && (P[t].pr_next_slide = T(P[t].slides[0]),
                P.loadImages(P[t].pr_next_slide[0], t, 0, !0),
                P.waitForCurrentImages(P[t].pr_next_slide.find(".tp-layers"), t, function() {
                    P.animateTheLayers && P.animateTheLayers({
                        slide: P[t].pr_next_key,
                        id: t,
                        mode: "preset",
                        caller: "runSlider"
                    })
                })),
                "off" == P[t].parallax.type && !P[t].sbtimeline.set && !0 !== e.enable || P.scrollTicker(t),
                !0 !== e.enable && (P[t].inviewport = !0,
                P.enterViewPort(t)),
                P.RS_toInit !== C && (P.RS_toInit[t] = !0),
                P[t].observeWrap && P.observeWraps && P.wrapObserver.observe((P[t].rsFullWidthWrap !== C ? P[t].rsFullWidthWrap : P[t].cpar)[0], t)
            }
        }
    }, u = function(e, t) {
        P.winW < P[e].hideSliderAtLimit ? (P[e].c.trigger("stoptimer"),
        !0 !== P[e].sliderIsHidden && (P.sA(P[e].cpar[0], "displaycache", "none" != P[e].cpar.css("display") ? P[e].cpar.css("display") : P.gA(P[e].cpar[0], "displaycache")),
        P[e].cpar.css({
            display: "none"
        }),
        P[e].sliderIsHidden = !0)) : (!0 === P[e].sliderIsHidden || P[e].sliderIsHidden === C && P[e].c.is(":hidden")) && t && (P[e].cpar[0].style.display = P.gA(P[e].cpar[0], "displaycache") != C && "none" != P.gA(P[e].cpar[0], "displaycache") ? P.gA(P[e].cpar[0], "displaycache") : "block",
        P[e].sliderIsHidden = !1,
        P[e].c.trigger("restarttimer"),
        window.requestAnimationFrame(function() {
            G(e, !0)
        })),
        P.hideUnHideNav && P[e].navigation.use && P.hideUnHideNav(e)
    }, G = function(e, t, i) {
        if (P[e].c === C)
            return !1;
        if (P[e].dimensionReCheck = {},
        P[e].c.trigger("revolution.slide.beforeredraw"),
        1 == P[e].infullscreenmode && (P[e].minHeight = P.getWinH(e)),
        P.ISM && (P[e].lastMobileHeight = P.getWinH(e)),
        i && P.updateDims(e),
        !P.resizeThumbsTabs || !0 === P.resizeThumbsTabs(e)) {
            if (window.requestAnimationFrame(function() {
                u(e, !0 !== t),
                _(e)
            }),
            P[e].started) {
                if ("carousel" == P[e].sliderType)
                    for (var a in P.prepareCarousel(e),
                    P[e].sbgs)
                        P[e].sbgs.hasOwnProperty(a) && P[e].sbgs[a].mDIM !== C && P.updateSlideBGs(e, P[e].sbgs[a].key, P[e].sbgs[a]);
                else
                    P.updateSlideBGs(e);
                if ("carousel" === P[e].sliderType && (P[e].carCheckconW != P[e].canv.width || "fullscreen" == P[e].sliderLayout && P[e].carCheckconH != P[e].canv.height)) {
                    for (var r in clearTimeout(P[e].pcartimer),
                    P[e].sbgs)
                        P[e].sbgs[r].loadobj !== C && P.updateSlideBGs(e, P[e].sbgs[r].key, P[e].sbgs[r]);
                    "v" == P[e].carousel.orientation && tpGS.gsap.set(P[e].canvas, {
                        height: P[e].carousel.slide_height
                    }),
                    requestAnimationFrame(function() {
                        P.prepareCarousel(e),
                        P.animateTheLayers({
                            slide: "individual",
                            id: e,
                            mode: "rebuild",
                            caller: "containerResized_1"
                        }),
                        P[e].carCheckconW = P[e].canv.width,
                        P[e].carCheckconH = P[e].canv.height
                    }),
                    P[e].lastconw = P[e].canv.width
                }
                if (P[e].pr_processing_key !== C ? P.animateTheLayers({
                    slide: P[e].pr_processing_key,
                    id: e,
                    mode: "rebuild",
                    caller: "containerResized_2"
                }) : P[e].pr_active_key !== C && P.animateTheLayers({
                    slide: P[e].pr_active_key,
                    id: e,
                    mode: "rebuild",
                    caller: "containerResized_3"
                }),
                "carousel" === P[e].sliderType)
                    for (var r in P[e].panzoomTLs) {
                        var o;
                        P[e].panzoomTLs.hasOwnProperty(r) && (o = P.gA(P[e].panzoomBGs[r][0], "key"),
                        P.startPanZoom(P[e].panzoomBGs[r], e, P[e].panzoomTLs[r].progress(), r, P[e].panzoomTLs[r].isActive() ? "play" : "reset", o))
                    }
                else
                    P[e].pr_active_bg !== C && P[e].pr_active_bg[0] !== C && h(e, P[e].pr_active_bg, P[e].pr_active_bg[0].dataset.key),
                    P[e].pr_next_bg !== C && P[e].pr_next_bg[0] !== C && h(e, P[e].pr_next_bg, P[e].pr_next_bg[0].dataset.key);
                clearTimeout(P[e].mNavigTimeout),
                P.manageNavigation && (P[e].mNavigTimeout = setTimeout(function() {
                    P.manageNavigation(e)
                }, 20))
            }
            P.prepareCoveredVideo(e)
        }
        P[e].c.trigger("revolution.slide.afterdraw", [{
            id: e
        }])
    }, h = function(e, t, i) {
        var a;
        P[e].panzoomTLs !== C && (a = P.getSlideIndex(e, i),
        P.startPanZoom(t, e, P[e].panzoomTLs[a] !== C ? P[e].panzoomTLs[a].progress() : 0, a, "play", i))
    }, H = function(e) {
        !0 !== P[e].noDetach && P[e].canvas.detach();
        var t, i = P.isFaceBook() ? "visible" : "hidden";
        P[e].autoHeight && tpGS.gsap.set([P[e].c, P[e].cpar], {
            maxHeight: "none"
        }),
        tpGS.gsap.set(P[e].canvas, P[e].modal !== C && P[e].modal.useAsModal ? {
            overflow: i,
            width: "100%",
            height: "100%"
        } : {
            overflow: i,
            width: "100%",
            height: "100%",
            maxHeight: P[e].autoHeight ? "none" : P[e].cpar.css("maxHeight")
        }),
        "carousel" === P[e].sliderType && (t = "margin-top:" + parseInt(P[e].carousel.padding_top || 0, 0) + "px;",
        P[e].canvas.css({
            overflow: "visible"
        }).wrap('<rs-carousel-wrap style="' + t + '"></rs-carousel-wrap>'),
        P[e].cpar.prepend("<rs-carousel-space></rs-carousel-space>").append("<rs-carousel-space></rs-carousel-space>"),
        P.defineCarouselElements(e)),
        P[e].startWithSlide = P[e].startWithSlide === C ? C : Math.max(1, (P[e].sliderType,
        parseInt(P[e].startWithSlide))),
        P[e].cpar.css({
            overflow: "visible"
        }),
        P[e].scrolleffect.bgs = [];
        for (var a = 0; a < P[e].slides.length; a++) {
            var r, o, s = T(P[e].slides[a]), n = P.gA(s[0], "key"), l = s.find(".rev-slidebg") || s.find(">img"), d = P[e].sbgs[n] = M(l.data(), e), c = s.data("mediafilter"), p = (d.skeyindex = P.getSlideIndex(e, n),
            d.bgvid = s.find("rs-bgvideo"),
            l.detach(),
            d.bgvid.detach(),
            (P[e].startWithSlide != C && P.gA(P[e].slides[a], "originalindex") == P[e].startWithSlide || P[e].startWithSlide === C && 0 == a) && (P[e].pr_next_key = P[e].carousel.focused = s.index()),
            tpGS.gsap.set(s, {
                width: "100%",
                height: "100%",
                overflow: i
            }),
            l.wrap('<rs-sbg-px><rs-sbg-wrap data-key="' + n + '"></rs-sbg-wrap></rs-sbg-px>'),
            d.wrap = T(P.closestNode(l[0], "RS-SBG-WRAP")),
            d.src = l[0].src,
            d.lazyload = d.lazyload = B(l[0], C, e),
            d.slidebgimage = !0,
            d.loadobj = d.loadobj === C ? {} : d.loadobj,
            d.mediafilter = c = "none" === c || c === C ? "" : c,
            d.sbg = document.createElement("rs-sbg"),
            P[e].overlay !== C && "none" != P[e].overlay.type && P[e].overlay.type != C && (p = P.createOverlay(e, P[e].overlay.type, P[e].overlay.size, {
                0: P[e].overlay.colora,
                1: P[e].overlay.colorb
            }),
            (r = document.createElement("rs-dotted")).style.backgroundImage = p,
            d.wrap.append(r),
            d.overlay = r),
            l.data("mediafilter", c),
            d.canvas = document.createElement("canvas"),
            d.sbg.appendChild(d.canvas),
            d.canvas.style.width = "100%",
            d.canvas.style.height = "100%",
            d.ctx = d.canvas.getContext("2d"),
            d.lazyload !== C && (d.sbg.dataset.lazyload = d.lazyload),
            d.sbg.className = c,
            d.sbg.src = d.src,
            d.sbg.dataset.bgcolor = d.bgcolor,
            d.sbg.style.width = "100%",
            d.sbg.style.height = "100%",
            d.key = n,
            d.wrap[0].dataset.key = n,
            T(d.sbg).data(d),
            d.wrap.data(d),
            d.wrap[0].appendChild(d.sbg),
            document.createComment("Runtime Modification - Img tag is Still Available for SEO Goals in Source - " + l.get(0).outerHTML)), g = (l.replaceWith(p),
            P.gA(s[0], "sba") === C && P.sA(s[0], "sba", ""),
            {}), u = P.gA(s[0], "sba").split(";");
            for (o in u)
                if (u.hasOwnProperty(o)) {
                    var h = u[o].split(":");
                    switch (h[0]) {
                    case "f":
                        g.f = h[1];
                        break;
                    case "b":
                        g.b = h[1];
                        break;
                    case "g":
                        g.g = h[1];
                        break;
                    case "t":
                        g.s = h[1]
                    }
                }
            P.sA(s[0], "scroll-based", !!P[e].sbtimeline.set && g.s !== C && g.s),
            0 < d.bgvid.length && (d.bgvidid = d.bgvid[0].id,
            d.animateDirection = "idle",
            d.bgvid.addClass("defaultvid").css({
                zIndex: 30
            }),
            c !== C && "" !== c && "none" !== c && d.bgvid.addClass(c),
            d.bgvid.appendTo(d.wrap),
            d.parallax != C && (d.bgvid.data("parallax", d.parallax),
            d.bgvid.data("showcoveronpause", "on"),
            d.bgvid.data("mediafilter", c)),
            d.poster = !1,
            (d.src !== C && -1 == d.src.indexOf("assets/dummy.png") && -1 == d.src.indexOf("assets/transparent.png") || d.lazyload !== C && -1 == d.lazyload.indexOf("assets/transparent.png") && -1 == d.lazyload.indexOf("assets/dummy.png")) && (d.poster = !0),
            d.bgvid.data("bgvideo", 1),
            d.bgvid[0].dataset.key = n,
            0 == d.bgvid.find(".rs-fullvideo-cover").length) && d.bgvid.append('<div class="rs-fullvideo-cover"></div>'),
            P[e].scrolleffect.set ? (P[e].scrolleffect.bgs.push({
                fade: g.f !== C ? g.f : !!P[e].scrolleffect.slide && P[e].scrolleffect.fade,
                blur: g.b !== C ? g.b : !!P[e].scrolleffect.slide && P[e].scrolleffect.blur,
                grayscale: g.g !== C ? g.g : !!P[e].scrolleffect.slide && P[e].scrolleffect.grayscale,
                c: d.wrap.wrap("<rs-sbg-effectwrap></rs-sbg-effectwrap>").parent()
            }),
            s.prepend(d.wrap.parent().parent())) : s.prepend(d.wrap.parent())
        }
        "carousel" === P[e].sliderType ? (tpGS.gsap.set(P[e].carousel.wrap, {
            opacity: 0
        }),
        P[e].c[0].appendChild(P[e].carousel.wrap[0])) : P[e].c[0].appendChild(P[e].canvas[0])
    }, M = function(e, t) {
        e.bg = e.bg === C ? "" : e.bg;
        var i, a = e.bg.split(";"), r = {
            bgposition: "50% 50%",
            bgfit: "cover",
            bgrepeat: "no-repeat",
            bgcolor: "transparent"
        };
        for (i in a)
            if (a.hasOwnProperty(i)) {
                var o = a[i].split(":")
                  , s = o[0]
                  , o = o[1]
                  , n = "";
                switch (s) {
                case "p":
                    n = "bgposition";
                    break;
                case "f":
                    n = "bgfit";
                    break;
                case "r":
                    n = "bgrepeat";
                    break;
                case "c":
                    n = "bgcolor"
                }
                n !== C && (r[n] = o)
            }
        return P[t].fallbacks.panZoomDisableOnMobile && P.ISM && (r.panzoom = C,
        r.bgfit = "cover",
        e.panzoom = C),
        T.extend(!0, e, r)
    }, m = function(a) {
        4 != P[a].syncload && P[a].loadqueue && T.each(P[a].loadqueue, function(e, t) {
            var i;
            "prepared" == t.progress && P[a].syncload <= 4 && (P[a].syncload++,
            "img" == t.type ? (i = new Image,
            P.sA(i, "reference", t.src),
            !/^([\w]+\:)?\/\//.test(t.src) || -1 !== t.src.indexOf(location.host) && -1 === t.src.indexOf("." + location.host) || "" === P[a].imgCrossOrigin || P[a].imgCrossOrigin === C || (i.crossOrigin = P[a].imgCrossOrigin),
            i.onload = function() {
                r(this, a, "loaded"),
                t.error = !1
            }
            ,
            i.onerror = function() {
                i.failedOnce || (i.failedOnce = !0,
                delete i.crossOrigin,
                i.removeAttribute("crossorigin"),
                i.src = t.src,
                r(this, a, "failed"),
                t.error = !0)
            }
            ,
            i.src = t.src,
            t.starttoload = Date.now()) : T.get(t.src, function(e) {
                t.innerHTML = (new XMLSerializer).serializeToString(e.documentElement),
                t.progress = "loaded",
                P[a].syncload--,
                m(a)
            }).fail(function() {
                t.progress = "failed",
                P[a].syncload--,
                m(a)
            }),
            t.progress = "inload")
        })
    }, v = function(e, t) {
        return console.log("Static Image " + e + "  Could not be loaded in time. Error Exists:" + t),
        !0
    }, f = function(e, t) {
        return 5e3 < Date.now() - P[t][e + "starttime"] && 1 != P[t][e + "warning"] && (P[t][e + "warning"] = !0,
        e = e + " Api Could not be loaded !",
        "https:" === location.protocol && (e += " Please Check and Renew SSL Certificate !"),
        console.error(e),
        P[t].c.append('<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>' + e + "</strong></div>")),
        !0
    }, z = function(e) {
        P[e] !== C && (P[e].pr_active_slide = T(P[e].slides[P[e].pr_active_key]),
        P[e].pr_next_slide = T(P[e].slides[P[e].pr_processing_key]),
        P[e].pr_active_bg = P[e].pr_active_slide.find("rs-sbg-wrap"),
        P[e].pr_next_bg = P[e].pr_next_slide.find("rs-sbg-wrap"),
        P[e].pr_active_bg !== C && 0 < P[e].pr_active_bg.length && tpGS.gsap.to(P[e].pr_active_bg, .5, {
            opacity: 0
        }),
        P[e].pr_next_bg !== C && 0 < P[e].pr_next_bg.length && tpGS.gsap.to(P[e].pr_next_bg, .5, {
            opacity: 0
        }),
        tpGS.gsap.set(P[e].pr_active_slide, {
            zIndex: 18
        }),
        P[e].pr_next_slide !== C && 0 < P[e].pr_next_slide.length && tpGS.gsap.set(P[e].pr_next_slide, {
            autoAlpha: 0,
            zIndex: 20
        }),
        P[e].tonpause = !1,
        P[e].pr_active_key !== C && P.removeTheLayers(P[e].pr_active_slide, e, !0),
        P[e].firststart = 1,
        setTimeout(function() {
            delete P[e].pr_active_key,
            delete P[e].pr_processing_key
        }, 200))
    }, y = function(e, t, i) {
        if (P[e] !== C)
            if (clearTimeout(P[e].waitWithSwapSlide),
            P[e].pr_processing_key !== C && !0 === P[e].firstSlideShown)
                P[e].waitWithSwapSlide = setTimeout(function() {
                    y(e, t)
                }, 18);
            else {
                if (clearTimeout(P[e].waitWithSwapSlide),
                P[e].startWithSlideKey !== C && (P[e].pr_next_key = P.getComingSlide(e, P[e].startWithSlideKey).nindex,
                P[e].startedWithOtherSlide = !0,
                delete P[e].startWithSlideKey),
                P[e].pr_active_slide = T(P[e].slides[P[e].pr_active_key]),
                P[e].pr_next_slide = T(P[e].slides[P[e].pr_next_key]),
                P[e].pr_next_key == P[e].pr_active_key)
                    return delete P[e].pr_next_key;
                var a = P.gA(P[e].pr_next_slide[0], "key")
                  , a = (P[e].sbgs[a] !== C && P[e].sbgs[a].bgvid && 0 < P[e].sbgs[a].bgvid.length && (P[e].videos == C || P[e].videos[P[e].sbgs[a].bgvid[0].id] === C) && P.manageVideoLayer(P[e].sbgs[a].bgvid, e, a),
                P[e].pr_processing_key = P[e].pr_next_key,
                P[e].pr_cache_pr_next_key = P[e].pr_next_key,
                delete P[e].pr_next_key,
                P[e].pr_next_slide !== C && P[e].pr_next_slide[0] !== C && P.gA(P[e].pr_next_slide[0], "hal") !== C && P.sA(P[e].pr_next_slide[0], "sofacounter", P.gA(P[e].pr_next_slide[0], "sofacounter") === C ? 1 : parseInt(P.gA(P[e].pr_next_slide[0], "sofacounter"), 0) + 1),
                P[e].stopLoop && P[e].pr_processing_key == P[e].lastslidetoshow - 1 && (P[e].progressC.css({
                    visibility: "hidden"
                }),
                P[e].c.trigger("revolution.slide.onstop"),
                P[e].noloopanymore = 1),
                P[e].pr_next_slide.index() === P[e].slideamount - 1 && 0 < P[e].looptogo && "disabled" !== P[e].looptogo && (P[e].looptogo--,
                P[e].looptogo <= 0) && (P[e].stopLoop = !0),
                P[e].tonpause = !0,
                P[e].slideInSwapTimer = !0,
                P[e].c.trigger("stoptimer"),
                "off" === P[e].spinner ? P[e].loader !== C && !0 === P[e].loaderVisible && (P[e].loader.css({
                    display: "none"
                }),
                P[e].loaderVisible = !1) : P[e].loadertimer = setTimeout(function() {
                    P[e].loader !== C && !0 !== P[e].loaderVisible && (P[e].loader.css({
                        display: "block"
                    }),
                    P[e].loaderVisible = !0)
                }, 100),
                "carousel" === P[e].sliderType && "all" !== P[e].lazyType ? P.loadVisibleCarouselItems(e) : P[e].pr_next_slide[0]);
                P.loadImages(a, e, 1),
                P.preLoadAudio && P.preLoadAudio(P[e].pr_next_slide, e, 1),
                P.waitForCurrentImages(a, e, function() {
                    P[e].firstSlideShown = !0,
                    P[e].pr_next_slide.find("rs-bgvideo").each(function() {
                        P.prepareCoveredVideo(e)
                    }),
                    P.loadUpcomingContent(e),
                    window.requestAnimationFrame(function() {
                        W(P[e].pr_next_slide.find("rs-sbg"), e, t, i)
                    })
                })
            }
    }, W = function(e, t, i, a) {
        if (P[t] !== C) {
            _(t),
            P[t].pr_active_slide = T(P[t].slides[P[t].pr_active_key]),
            P[t].pr_next_slide = T(P[t].slides[P[t].pr_processing_key]),
            P[t].pr_active_bg = P[t].pr_active_slide.find("rs-sbg-wrap"),
            P[t].pr_next_bg = P[t].pr_next_slide.find("rs-sbg-wrap"),
            P[t].tonpause = !1,
            clearTimeout(P[t].loadertimer),
            P[t].loader !== C && !0 === P[t].loaderVisible && (window.requestAnimationFrame(function() {
                P[t].loader.css({
                    display: "none"
                })
            }),
            P[t].loaderVisible = !1),
            P[t].onBeforeSwap = {
                slider: t,
                slideIndex: parseInt(P[t].pr_active_key, 0) + 1,
                slideLIIndex: P[t].pr_active_key,
                nextSlideIndex: parseInt(P[t].pr_processing_key, 0) + 1,
                nextSlideLIIndex: P[t].pr_processing_key,
                nextslide: P[t].pr_next_slide,
                slide: P[t].pr_active_slide,
                currentslide: P[t].pr_active_slide,
                prevslide: P[t].pr_lastshown_key !== C ? P[t].slides[P[t].pr_lastshown_key] : ""
            },
            "carousel" !== P[t].sliderType && tpGS.gsap.set(P[t].pr_next_slide, {
                display: "block"
            }),
            P[t].c.trigger("revolution.slide.onbeforeswap", P[t].onBeforeSwap);
            var r, o = P.gA(P[t].pr_active_slide[0], "key"), o = P[t].sbgs[o];
            if (o && o.panzoom && o.pzAnim && (o.pzLastFrame = !0,
            P.pzDrawShadow(t, o, o.pzAnim.start)),
            P[t].sbgs[P.gA(P[t].pr_next_slide[0], "key")] && tpGS.gsap.fromTo(P[t].sbgs[P.gA(P[t].pr_next_slide[0], "key")].overlay, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 1,
                ease: "none"
            }),
            o && tpGS.gsap.to(o.overlay, {
                opacity: 0,
                duration: 1,
                ease: "none"
            }),
            P[t].transition = 1,
            P[t].stopByVideo = !1,
            P[t].pr_next_slide[0] !== C && P.gA(P[t].pr_next_slide[0], "duration") != C && "" != P.gA(P[t].pr_next_slide[0], "duration") ? P[t].duration = parseInt(P.gA(P[t].pr_next_slide[0], "duration"), 0) : P[t].duration = P[t].origcd,
            P[t].pr_next_slide[0] === C || "true" != P.gA(P[t].pr_next_slide[0], "ssop") && !0 !== P.gA(P[t].pr_next_slide[0], "ssop") ? P[t].ssop = !1 : P[t].ssop = !0,
            P[t].sbtimeline.set && P[t].sbtimeline.fixed && P.updateFixedScrollTimes(t),
            P[t].c.trigger("nulltimer"),
            P[t].sdir = ("bullet" === P[t].sc_indicator || P[t].pr_active_key != P[t].slideamount - 1 || 0 != P[t].pr_processing_key) && P[t].pr_processing_key < P[t].pr_active_key ? 1 : 0,
            "arrow" == P[t].sc_indicator && (P[t].sdir = P[t].sc_indicator_dir),
            P[t].lsdir = P[t].sdir,
            P[t].pr_active_key != P[t].pr_processing_key && 1 != P[t].firststart && "carousel" !== P[t].sliderType && P.removeTheLayers && P.removeTheLayers(P[t].pr_active_slide, t),
            1 !== P.gA(P[t].pr_next_slide[0], "rspausetimeronce") && 1 !== P.gA(P[t].pr_next_slide[0], "rspausetimeralways") ? P[t].c.trigger("restarttimer") : (P[t].stopByVideo = !0,
            P.unToggleState(P[t].slidertoggledby)),
            P.sA(P[t].pr_next_slide[0], "rspausetimeronce", 0),
            P[t].pr_next_slide[0] !== C && P.sA(P[t].c[0], "slideactive", P.gA(P[t].pr_next_slide[0], "key")),
            "carousel" == P[t].sliderType ? (P[t].mtl = tpGS.gsap.timeline(),
            P.prepareCarousel(t),
            "v" == P[t].carousel.orientation && tpGS.gsap.set(P[t].canvas, {
                height: P[t].carousel.slide_height
            }),
            w(t, a),
            P.updateSlideBGs(t),
            !0 !== P[t].carousel.checkFVideo && (r = P.gA(P[t].pr_next_slide[0], "key"),
            P[t].sbgs[r] !== C && P[t].sbgs[r].bgvid !== C && 0 !== P[t].sbgs[r].bgvid.length && P.playBGVideo(t, r),
            P[t].carousel.checkFVideo = !0),
            P[t].transition = 0,
            P[t].startedWithOtherSlide && (setTimeout(function() {
                P[t].carousel.focused = P[t].pr_active_key,
                P.positionCarousel(t)
            }),
            delete P[t].startedWithOtherSlide)) : (P[t].pr_lastshown_key = P[t].pr_lastshown_key === C ? P[t].pr_next_key !== C ? P[t].pr_next_key : P[t].pr_processing_key !== C ? P[t].pr_processing_key : P[t].pr_active_key !== C ? P[t].pr_active_key : P[t].pr_lastshown_key : P[t].pr_lastshown_key,
            P[t].mtl = tpGS.gsap.timeline({
                paused: !0,
                onComplete: function() {
                    w(t)
                }
            }),
            P[t].pr_next_key !== C ? P.animateTheLayers({
                slide: P[t].pr_next_key,
                id: t,
                mode: "preset",
                caller: "swapSlideProgress_1"
            }) : P[t].pr_processing_key !== C ? P.animateTheLayers({
                slide: P[t].pr_processing_key,
                id: t,
                mode: "preset",
                caller: "swapSlideProgress_2"
            }) : P[t].pr_active_key !== C && P.animateTheLayers({
                slide: P[t].pr_active_key,
                id: t,
                mode: "preset",
                caller: "swapSlideProgress_3"
            }),
            1 == P[t].firststart && (P[t].pr_active_slide[0] !== C && tpGS.gsap.set(P[t].pr_active_slide, {
                autoAlpha: 0
            }),
            P[t].firststart = 0),
            P[t].pr_active_slide[0] !== C && tpGS.gsap.set(P[t].pr_active_slide, {
                zIndex: 18
            }),
            P[t].pr_next_slide[0] !== C && tpGS.gsap.set(P[t].pr_next_slide, {
                autoAlpha: 0,
                zIndex: 20
            }),
            r = P.gA(P[t].pr_next_slide[0], "key"),
            P[t].sbgs[r] !== C && P[t].sbgs[r].alt === C && (P[t].sbgs[r].alt = P.gA(P[t].pr_next_slide[0], "alttrans") || !1,
            P[t].sbgs[r].alt = !1 !== P[t].sbgs[r].alt && P[t].sbgs[r].alt.split(","),
            P[t].sbgs[r].altIndex = 0,
            P[t].sbgs[r].altLen = !1 !== P[t].sbgs[r].alt ? P[t].sbgs[r].alt.length : 0),
            P[t].firstSlideAnimDone === C && P[t].fanim !== C && !1 !== P[t].fanim || (P[t].sbgs[r].slideanimation === C || P[t].sbgs[r].slideanimationRebuild || (P[t].sbgs[r].random !== C && P.SLTR !== C || 0 < P[t].sbgs[r].altLen && P.SLTR)),
            P[t].sbgs[r].slideanimation = P[t].firstSlideAnimDone === C && P[t].fanim !== C && !1 !== P[t].fanim ? P.convertSlideAnimVals(T.extend(!0, {}, P.getSlideAnim_EmptyObject(), P[t].fanim)) : P[t].sbgs[r].slideanimation === C || P[t].sbgs[r].slideanimationRebuild || 0 < P[t].sbgs[r].altLen && "default_first_anim" == P[t].sbgs[r].alt[P[t].sbgs[r].altIndex] ? P.getSlideAnimationObj(t, {
                anim: P.gA(P[t].pr_next_slide[0], "anim"),
                filter: P.gA(P[t].pr_next_slide[0], "filter"),
                in: P.gA(P[t].pr_next_slide[0], "in"),
                out: P.gA(P[t].pr_next_slide[0], "out"),
                d3: P.gA(P[t].pr_next_slide[0], "d3")
            }, r) : P[t].sbgs[r].random !== C && P.SLTR !== C ? P.convertSlideAnimVals(T.extend(!0, {}, P.getSlideAnim_EmptyObject(), P.getAnimObjectByKey(P.getRandomSlideTrans(P[t].sbgs[r].random.rndmain, P[t].sbgs[r].random.rndgrp, P.SLTR), P.SLTR))) : 0 < P[t].sbgs[r].altLen && P.SLTR !== C ? P.convertSlideAnimVals(T.extend(!0, {
                altAnim: P[t].sbgs[r].alt[P[t].sbgs[r].altIndex]
            }, P.getSlideAnim_EmptyObject(), P.getAnimObjectByKey(P[t].sbgs[r].alt[P[t].sbgs[r].altIndex], P.SLTR))) : P[t].sbgs[r].slideanimation,
            0 < P[t].sbgs[r].altLen && (P[t].sbgs[r].firstSlideAnimDone !== C ? (P[t].sbgs[r].altIndex++,
            P[t].sbgs[r].altIndex = P[t].sbgs[r].altIndex >= P[t].sbgs[r].altLen ? 0 : P[t].sbgs[r].altIndex) : (P[t].sbgs[r].firstSlideAnimDone = !0,
            P.SLTR === C && P.SLTR_loading === C && P.loadSlideAnimLibrary(t),
            P[t].sbgs[r].alt.push("default_first_anim"),
            P[t].sbgs[r].altLen++)),
            P[t].sbgs[r].currentState = "animating",
            P.animateSlide(t, P[t].sbgs[r].slideanimation),
            P[t].firstSlideAnimDone === C && P[t].fanim !== C && !1 !== P[t].fanim && (P[t].sbgs[r].slideanimationRebuild = !0),
            P[t].firstSlideAnimDone = !0,
            P[t].pr_next_bg.data("panzoom") !== C && requestAnimationFrame(function() {
                var e = P.gA(P[t].pr_next_slide[0], "key");
                P.startPanZoom(P[t].pr_next_bg, t, 0, P.getSlideIndex(t, e), "first", e)
            }),
            P[t].mtl.pause()),
            P.animateTheLayers ? "carousel" === P[t].sliderType ? (!1 !== P[t].carousel.showLayersAllTime && (P[t].carousel.allLayersStarted ? P.animateTheLayers({
                slide: "individual",
                id: t,
                mode: "rebuild",
                caller: "swapSlideProgress_5"
            }) : P.animateTheLayers({
                slide: "individual",
                id: t,
                mode: "start",
                caller: "swapSlideProgress_4"
            }),
            P[t].carousel.allLayersStarted == C) && (P.updateCarouselRows(t),
            P[t].carousel.allLayersStarted = !0),
            0 !== P[t].firststart ? P.animateTheLayers({
                slide: 0,
                id: t,
                mode: "start",
                caller: "swapSlideProgress_6"
            }) : !0 !== i && P.animateTheLayers({
                slide: P[t].pr_next_key !== C ? P[t].pr_next_key : P[t].pr_processing_key !== C ? P[t].pr_processing_key : P[t].pr_active_key,
                id: t,
                mode: "start",
                caller: "swapSlideProgress_7"
            }),
            P[t].firststart = 0) : P.animateTheLayers({
                slide: P[t].pr_next_key !== C ? P[t].pr_next_key : P[t].pr_processing_key !== C ? P[t].pr_processing_key : P[t].pr_active_key,
                id: t,
                mode: "start",
                caller: "swapSlideProgress_8"
            }) : P[t].mtl != C && setTimeout(function() {
                P[t].mtl.resume()
            }, 18),
            "carousel" !== P[t].sliderType)
                if (P[t].scwDur = .001,
                Array.isArray(P[t].scwCallback) && 0 < P[t].scwCallback.length && P[t].pr_next_slide[0].classList.contains("rs-addon-pano-active")) {
                    P[t].scwDone = !1,
                    P[t].scwCount = P[t].scwCallback.length;
                    for (var s = 0; s < P[t].scwCallback.length; s++)
                        P[t].scwCallback[s]();
                    P[t].scwTimeout = tpGS.gsap.delayedCall(2, function() {
                        0 < P[t].scwCount && (P[t].scwTween && "function" == typeof P[t].scwTween.kill && (P[t].scwTween.kill(),
                        P[t].scwTween = null),
                        P[t].scwTween = tpGS.gsap.to(P[t].pr_next_slide, {
                            duration: P[t].scwDur,
                            autoAlpha: 1
                        }))
                    })
                } else
                    tpGS.gsap.to(P[t].pr_next_slide, {
                        duration: P[t].scwDur,
                        autoAlpha: 1
                    })
        }
    }, w = function(e) {
        if (P[e] !== C && ("done" !== P.RS_swapList[e] && (P.RS_swapList[e] = "done",
        t = T.inArray(e, P.RS_swapping),
        P.RS_swapping.splice(t, 1)),
        P[e].firstSlideAvailable === C && (P[e].firstSlideAvailable = !0,
        window.requestAnimationFrame(function() {
            "hero" !== P[e].sliderType && P.createNavigation && P[e].navigation.use && !0 !== P[e].navigation.createNavigationDone && P.createNavigation(e)
        })),
        "carousel" === P[e].sliderType && tpGS.gsap.to(P[e].carousel.wrap, 1, {
            opacity: 1
        }),
        P[e].pr_active_key = P[e].pr_processing_key !== C ? P[e].pr_processing_key : P[e].pr_active_key,
        delete P[e].pr_processing_key,
        "scroll" != P[e].parallax.type && "scroll+mouse" != P[e].parallax.type && "mouse+scroll" != P[e].parallax.type || (P[e].lastscrolltop = -999,
        P.generalObserver(P.ISM)),
        P[e].mtldiff = P[e].mtl.time(),
        delete P[e].mtl,
        P[e].pr_active_key !== C)) {
            if (P.gA(P[e].slides[P[e].pr_active_key], "sloop") !== C) {
                var i = e;
                if (P[i] !== C) {
                    P[i].sloops = P[i].sloops === C ? {} : P[i].sloops;
                    var t = P.gA(P[i].slides[P[i].pr_active_key], "key");
                    if ((r = P[i].sloops[t]) === C) {
                        var a, r = {
                            s: 2500,
                            e: 4500,
                            r: "unlimited"
                        }, o = P.gA(P[i].slides[P[i].pr_active_key], "sloop").split(";");
                        for (a in o)
                            if (o.hasOwnProperty(a)) {
                                var s = o[a].split(":");
                                switch (s[0]) {
                                case "s":
                                    r.s = parseInt(s[1], 0) / 1e3;
                                    break;
                                case "e":
                                    r.e = parseInt(s[1], 0) / 1e3;
                                    break;
                                case "r":
                                    r.r = s[1]
                                }
                            }
                        r.r = "unlimited" === r.r ? -1 : parseInt(r.r, 0),
                        (P[i].sloops[t] = r).key = t
                    }
                    r.ct = {
                        time: r.s
                    },
                    r.tl = tpGS.gsap.timeline({}),
                    r.timer = tpGS.gsap.fromTo(r.ct, r.e - r.s, {
                        time: r.s
                    }, {
                        time: r.e,
                        ease: "none",
                        onRepeat: function() {
                            for (var e in P[i].layers[r.key])
                                P[i].layers[r.key].hasOwnProperty(e) && P[i]._L[e].timeline.play(r.s);
                            var t = P[i].progressC;
                            t !== C && t[0] !== C && t[0].tween !== C && t[0].tween.time(r.s)
                        },
                        onUpdate: function() {},
                        onComplete: function() {}
                    }).repeat(r.r),
                    r.tl.add(r.timer, r.s),
                    r.tl.time(P[i].mtldiff)
                }
            }
            P.sA(P[e].slides[P[e].activeRSSlide], "isactiveslide", !1),
            P[e].activeRSSlide = P[e].pr_active_key,
            P.sA(P[e].slides[P[e].activeRSSlide], "isactiveslide", !0);
            var n = P.gA(P[e].slides[P[e].pr_active_key], "key")
              , l = P.gA(P[e].slides[P[e].pr_lastshown_key], "key")
              , l = (P.sA(P[e].c[0], "slideactive", n),
            l !== C && P[e].panzoomTLs !== C && P[e].panzoomTLs[P.getSlideIndex(e, l)] !== C && ("carousel" === P[e].sliderType ? (P[e].panzoomTLs[P.getSlideIndex(e, l)].timeScale(3),
            P[e].panzoomTLs[P.getSlideIndex(e, l)].reverse()) : P[e].panzoomTLs[P.getSlideIndex(e, l)].pause()),
            b(e, n),
            {
                slider: e,
                slideIndex: parseInt(P[e].pr_active_key, 0) + 1,
                slideLIIndex: P[e].pr_active_key,
                slide: P[e].pr_next_slide,
                currentslide: P[e].pr_next_slide,
                prevSlideIndex: P[e].pr_lastshown_key !== C && parseInt(P[e].pr_lastshown_key, 0) + 1,
                prevSlideLIIndex: P[e].pr_lastshown_key !== C && parseInt(P[e].pr_lastshown_key, 0),
                prevSlide: P[e].pr_lastshown_key !== C && P[e].slides[P[e].pr_lastshown_key]
            })
              , l = (P[e].c.trigger("revolution.slide.onchange", l),
            P[e].c.trigger("revolution.slide.onafterswap", l),
            "" + P[e].pr_lastshown_key != "" + P[e].pr_active_key && "carousel" !== P[e].sliderType && tpGS.gsap.set(l.prevSlide, {
                display: "none",
                delay: .01
            }),
            (P[e].deepLinkListener || P[e].enableDeeplinkHash) && (n = P.gA(P[e].slides[P[e].pr_active_key], "deeplink")) !== C && 0 < n.length && (P[e].ignoreDeeplinkChange = !0,
            window.location.hash = P.gA(P[e].slides[P[e].pr_active_key], "deeplink")),
            P[e].pr_lastshown_key = P[e].pr_active_key,
            P[e].startWithSlide !== C && "done" !== P[e].startWithSlide && "carousel" === P[e].sliderType && (P[e].firststart = 0),
            P[e].duringslidechange = !1,
            0 < P[e].pr_active_slide.length && 0 != P.gA(P[e].pr_active_slide[0], "hal") && P.gA(P[e].pr_active_slide[0], "hal") <= P.gA(P[e].pr_active_slide[0], "sofacounter") && P[e].c.revremoveslide(P[e].pr_active_slide.index()),
            P[e].pr_processing_key || P[e].pr_active_key || 0);
            P[e].rowzones != C && (l = l > P[e].rowzones.length ? P[e].rowzones.length : l),
            (P[e].rowzones != C && 0 < P[e].rowzones.length && P[e].rowzones[l] != C && 0 <= l && l <= P[e].rowzones.length && 0 < P[e].rowzones[l].length || P.winH < P[e].module.height) && P.updateDims(e),
            P[e].firstLetItFree === C && (P.generalObserver(P.ISM),
            P[e].firstLetItFree = !0),
            P[e].skipAttachDetach = !1
        }
    }, b = function(e, t) {
        P[e].sbgs[t] === C || P[e].sbgs[t].loadobj.img ? P[e].pr_next_bg.data("panzoom") !== C && (P[e].panzoomTLs !== C && P[e].panzoomTLs[P.getSlideIndex(e, t)] !== C ? (P[e].panzoomTLs[P.getSlideIndex(e, t)].timeScale(1),
        P[e].panzoomTLs[P.getSlideIndex(e, t)].play()) : P.startPanZoom(P[e].pr_next_bg, e, 0, P.getSlideIndex(e, t), "play", t)) : tpGS.gsap.delayedCall(.1, function() {
            b(e, t)
        })
    }, E = function(e) {
        P[e].c.children().each(function() {
            try {
                T(this).die("click")
            } catch (e) {}
            try {
                T(this).die("mouseenter")
            } catch (e) {}
            try {
                T(this).die("mouseleave")
            } catch (e) {}
            try {
                T(this).off("hover")
            } catch (e) {}
        });
        try {
            P[e].c.die("click", "mouseenter", "mouseleave")
        } catch (e) {}
        clearInterval(P[e].cdint),
        P[e].c = null
    }, _ = function(e) {
        var t, i, a, r, o = P[e].progressBar;
        if (P[e].progressC === C || 0 == P[e].progressC.length)
            if (P[e].progressC = T('<rs-progress style="visibility:hidden;"></rs-progress>'),
            "horizontal" === o.style || "vertical" === o.style) {
                if ("module" === o.basedon) {
                    for (var s = "", n = 0; n < P[e].slideamount; n++)
                        s += "<rs-progress-bar></rs-progress-bar>";
                    s += "<rs-progress-bgs>";
                    for (n = 0; n < P[e].slideamount; n++)
                        s += "<rs-progress-bg></rs-progress-bg>";
                    if (s += "</rs-progress-bgs>",
                    "nogap" !== o.gaptype)
                        for (n = 0; n < P[e].slideamount; n++)
                            s += "<rs-progress-gap></rs-progress-gap>";
                    P[e].progressC[0].innerHTML = s,
                    !0 === P[e].noDetach && P[e].c.append(P[e].progressC),
                    P[e].progressCBarBGS = P.getByTag(P[e].progressC[0], "RS-PROGRESS-BG"),
                    P[e].progressCBarGAPS = P.getByTag(P[e].progressC[0], "RS-PROGRESS-GAP"),
                    "nogap" !== o.gaptype && tpGS.gsap.set(P[e].progressCBarGAPS, {
                        backgroundColor: o.gapcolor,
                        zIndex: "gapbg" === o.gaptype ? 17 : 27
                    }),
                    tpGS.gsap.set(P[e].progressCBarBGS, {
                        backgroundColor: o.bgcolor
                    })
                } else
                    P[e].progressC[0].innerHTML = "<rs-progress-bar></rs-progress-bar>",
                    !0 === P[e].noDetach && P[e].c.append(P[e].progressC);
                P[e].progressCBarInner = P.getByTag(P[e].progressC[0], "RS-PROGRESS-BAR"),
                tpGS.gsap.set(P[e].progressCBarInner, {
                    background: o.color
                })
            } else
                P[e].progressC[0].innerHTML = '<canvas width="' + 2 * o.radius + '" height="' + 2 * o.radius + '" style="position:absolute" class="rs-progress-bar"></canvas>',
                !0 === P[e].noDetach && P[e].c.append(P[e].progressC),
                P[e].progressCBarInner = P[e].progressC[0].getElementsByClassName("rs-progress-bar")[0],
                P[e].progressBCanvas = P[e].progressCBarInner.getContext("2d"),
                P[e].progressBar.degree = "cw" === P[e].progressBar.style ? 360 : 0,
                S(e);
        !0 !== P[e].noDetach && P[e].progressC.detach(),
        P[e].progressBar.visibility[P[e].level] && 1 != P[e].progressBar.disableProgressBar ? "horizontal" === o.style || "vertical" === o.style ? (t = P[e].slideamount - 1,
        "horizontal" === o.style ? (r = "grid" === o.alignby ? P[e].gridwidth[P[e].level] : P[e].module.width,
        i = Math.ceil(r / P[e].slideamount),
        a = Math.ceil((r - t * o.gapsize) / P[e].slideamount),
        tpGS.gsap.set(P[e].progressC, {
            visibility: "visible",
            top: "top" === o.vertical ? o.y + ("grid" === o.alignby && P[e].gridOffsetHeight !== C ? Math.max(0, P[e].gridOffsetHeight) : 0) : "center" === o.vertical ? "50%" : "auto",
            bottom: "top" === o.vertical || "center" === o.vertical ? "auto" : o.y + ("grid" === o.alignby && P[e].gridOffsetHeight !== C ? Math.max(0, P[e].gridOffsetHeight) : 0),
            left: "left" === o.horizontal && "grid" === o.alignby && P[e].gridOffsetWidth !== C ? Math.max(0, P[e].gridOffsetWidth) : "auto",
            right: "right" === o.horizontal && "grid" === o.alignby && P[e].gridOffsetWidth !== C ? Math.max(0, P[e].gridOffsetWidth) : "auto",
            y: "center" === o.vertical ? o.y : 0,
            height: o.size,
            backgroundColor: "module" === o.basedon ? "transparent" : o.bgcolor,
            marginTop: "bottom" === o.vertical || "top" === o.vertical ? 0 : parseInt(o.size, 0) / 2,
            width: "grid" === o.alignby ? P[e].gridwidth[P[e].level] : "100%"
        }),
        tpGS.gsap.set(P[e].progressCBarInner, {
            x: "module" === o.basedon ? o.gap ? function(e) {
                return ("right" === o.horizontal ? t - e : e) * (a + o.gapsize)
            }
            : function(e) {
                return ("right" === o.horizontal ? t - e : e) * i
            }
            : 0,
            width: "module" === o.basedon ? o.gap ? a + "px" : 100 / P[e].slideamount + "%" : "100%"
        }),
        "module" === o.basedon && (tpGS.gsap.set(P[e].progressCBarBGS, {
            x: "module" === o.basedon ? o.gap ? function(e) {
                return e * (a + o.gapsize)
            }
            : function(e) {
                return e * i
            }
            : 0,
            width: "module" === o.basedon ? o.gap ? a + "px" : 100 / P[e].slideamount + "%" : "100%"
        }),
        tpGS.gsap.set(P[e].progressCBarGAPS, {
            width: o.gap ? o.gapsize + "px" : 0,
            x: o.gap ? function(e) {
                return (e + 1) * a + parseInt(o.gapsize, 0) * e
            }
            : 0
        }))) : "vertical" === o.style && (r = "grid" === o.alignby ? P[e].gridheight[P[e].level] : P[e].module.height,
        i = Math.ceil(r / P[e].slideamount),
        a = Math.ceil((r - t * o.gapsize) / P[e].slideamount),
        tpGS.gsap.set(P[e].progressC, {
            visibility: "visible",
            left: "left" === o.horizontal ? o.x + ("grid" === o.alignby && P[e].gridOffsetWidth !== C ? Math.max(0, P[e].gridOffsetWidth) : 0) : "center" === o.horizontal ? "50%" : "auto",
            right: "left" === o.horizontal || "center" === o.horizontal ? "auto" : o.x + ("grid" === o.alignby && P[e].gridOffsetWidth !== C ? Math.max(0, P[e].gridOffsetWidth) : 0),
            x: "center" === o.horizontal ? o.x : 0,
            top: "top" === o.vertical && "grid" === o.alignby && P[e].gridOffsetHeight !== C ? Math.max(P[e].gridOffsetHeight, 0) : "auto",
            bottom: "bottom" === o.vertical && "grid" === o.alignby && P[e].gridOffsetHeight !== C ? Math.max(P[e].gridOffsetHeight, 0) : "auto",
            width: o.size,
            marginLeft: "left" === o.horizontal || "right" === o.horizontal ? 0 : parseInt(o.size, 0) / 2,
            backgroundColor: "module" === o.basedon ? "transparent" : o.bgcolor,
            height: "grid" === o.alignby ? P[e].gridheight[P[e].level] : "100%"
        }),
        tpGS.gsap.set(P[e].progressCBarInner, {
            y: "module" === o.basedon ? o.gap ? function(e) {
                return ("bottom" === o.vertical ? t - e : e) * (a + o.gapsize)
            }
            : function(e) {
                return ("bottom" === o.vertical ? t - e : e) * i
            }
            : 0,
            height: "module" === o.basedon ? o.gap ? a + "px" : 100 / P[e].slideamount + "%" : "100%"
        }),
        "module" === o.basedon) && (tpGS.gsap.set(P[e].progressCBarBGS, {
            y: "module" === o.basedon ? o.gap ? function(e) {
                return e * (a + o.gapsize)
            }
            : function(e) {
                return e * i
            }
            : 0,
            height: "module" === o.basedon ? o.gap ? a + "px" : 100 / P[e].slideamount + "%" : "100%"
        }),
        tpGS.gsap.set(P[e].progressCBarGAPS, {
            height: o.gap ? o.gapsize + "px" : 0,
            y: o.gap ? function(e) {
                return (e + 1) * a + parseInt(o.gapsize, 0) * e
            }
            : 0
        }))) : tpGS.gsap.set(P[e].progressC, {
            top: "top" === o.vertical ? o.y + ("grid" === o.alignby && P[e].gridOffsetHeight !== C ? Math.max(0, P[e].gridOffsetHeight) : 0) : "center" === o.vertical ? "50%" : "auto",
            bottom: "top" === o.vertical || "center" === o.vertical ? "auto" : o.y + ("grid" === o.alignby && P[e].gridOffsetHeight !== C ? Math.max(0, P[e].gridOffsetHeight) : 0),
            left: "left" === o.horizontal ? o.x + ("grid" === o.alignby && P[e].gridOffsetWidth !== C ? Math.max(0, P[e].gridOffsetWidth) : 0) : "center" === o.horizontal ? "50%" : "auto",
            right: "left" === o.horizontal || "center" === o.horizontal ? "auto" : o.x + ("grid" === o.alignby && P[e].gridOffsetWidth !== C ? Math.max(0, P[e].gridOffsetWidth) : 0),
            y: "center" === o.vertical ? o.y : 0,
            x: "center" === o.horizontal ? o.x : 0,
            width: 2 * o.radius,
            height: 2 * o.radius,
            marginTop: "center" === o.vertical ? 0 - o.radius : 0,
            marginLeft: "center" === o.horizontal ? 0 - o.radius : 0,
            backgroundColor: "transparent",
            visibility: "visible"
        }) : P[e].progressC[0].style.visibility = "hidden",
        !0 !== P[e].noDetach && P[e].c.append(P[e].progressC),
        P[e].gridOffsetWidth === C && "grid" === o.alignby ? P[e].rebuildProgressBar = !0 : P[e].rebuildProgressBar = !1
    }, S = function(e) {
        var t = P[e].progressBar
          , i = (t.radius - parseInt(t.size, 0) <= 0 && (t.size = t.radius / 4),
        parseInt(t.radius))
          , a = parseInt(t.radius);
        P[e].progressBCanvas.lineCap = "round",
        P[e].progressBCanvas.clearRect(0, 0, 2 * t.radius, 2 * t.radius),
        P[e].progressBCanvas.beginPath(),
        P[e].progressBCanvas.arc(i, a, t.radius - parseInt(t.size, 0), Math.PI / 180 * 270, Math.PI / 180 * 630),
        P[e].progressBCanvas.strokeStyle = t.bgcolor,
        P[e].progressBCanvas.lineWidth = parseInt(t.size, 0) - 1,
        P[e].progressBCanvas.stroke(),
        P[e].progressBCanvas.beginPath(),
        P[e].progressBCanvas.strokeStyle = t.color,
        P[e].progressBCanvas.lineWidth = parseInt(t.size, 0),
        P[e].progressBCanvas.arc(i, a, t.radius - parseInt(t.size, 0), Math.PI / 180 * 270, Math.PI / 180 * (270 + P[e].progressBar.degree), "cw" !== t.style),
        P[e].progressBCanvas.stroke()
    }, x = function(e) {
        P[e].progressC == C && _(e),
        P[e].loop = 0,
        P[e].stopAtSlide != C && -1 < P[e].stopAtSlide ? P[e].lastslidetoshow = P[e].stopAtSlide : P[e].lastslidetoshow = 999,
        P[e].stopLoop = !1,
        0 == P[e].looptogo && (P[e].stopLoop = !0),
        P[e].c.on("stoptimer", function() {
            P[e].progressC != C && (P[e].progressC[0].tween.pause(),
            P[e].progressBar.disableProgressBar && (P[e].progressC[0].style.visibility = "hidden"),
            P[e].sliderstatus = "paused",
            P[e].slideInSwapTimer || P.unToggleState(P[e].slidertoggledby),
            P[e].slideInSwapTimer = !1)
        }),
        P[e].c.on("starttimer", function() {
            P[e].progressC == C || P[e].forcepaused || (1 != P[e].conthover && 1 != P[e].stopByVideo && P[e].module.width > P[e].hideSliderAtLimit && 1 != P[e].tonpause && 1 != P[e].overnav && 1 != P[e].ssop && (1 === P[e].noloopanymore || P[e].viewPort.enable && !P[e].inviewport || (P[e].progressBar.visibility[P[e].level] || (P[e].progressC[0].style.visibility = "visible"),
            P[e].progressC[0].tween.resume(),
            P[e].sliderstatus = "playing")),
            !P[e].progressBar.disableProgressBar && P[e].progressBar.visibility[P[e].level] || (P[e].progressC[0].style.visibility = "hidden"),
            P.toggleState(P[e].slidertoggledby))
        }),
        P[e].c.on("restarttimer", function() {
            if (!(P[e].modal !== C && P[e].modal.useAsModal && "close" == P[e].modal.lastModalCall || P[e].progressC == C || P[e].forcepaused)) {
                if (P[e].mouseoncontainer && "on" == P[e].navigation.onHoverStop && !P.ISM)
                    return !1;
                1 === P[e].noloopanymore || P[e].viewPort.enable && !P[e].inviewport || 1 == P[e].ssop ? P.unToggleState(P[e].slidertoggledby) : (P[e].progressBar.visibility[P[e].level] || (P[e].progressC[0].style.visibility = "visible"),
                P[e].progressC[0].tween !== C && P[e].progressC[0].tween.kill(),
                P[e].progressC[0].tween = t(e),
                P[e].progressC[0].tween.play(),
                P[e].sliderstatus = "playing",
                P.toggleState(P[e].slidertoggledby)),
                !P[e].progressBar.disableProgressBar && P[e].progressBar.visibility[P[e].level] || (P[e].progressC[0].style.visibility = "hidden"),
                P[e].mouseoncontainer && 1 == P[e].navigation.onHoverStop && !P.ISM && (P[e].c.trigger("stoptimer"),
                P[e].c.trigger("revolution.slide.onpause"))
            }
        }),
        P[e].c.on("nulltimer", function() {
            P[e].progressC != C && P[e].progressC[0] !== C && (P[e].progressC[0].tween !== C && P[e].progressC[0].tween.kill(),
            P[e].progressC[0].tween = t(e),
            P[e].progressC[0].tween.pause(0),
            !P[e].progressBar.disableProgressBar && P[e].progressBar.visibility[P[e].level] || (P[e].progressC[0].style.visibility = "hidden"),
            P[e].sliderstatus = "paused")
        }),
        P[e].progressC !== C && (P[e].progressC[0].tween = t(e)),
        1 < P[e].slideamount && (0 != P[e].stopAfterLoops || 1 != P[e].stopAtSlide) ? P[e].c.trigger("starttimer") : (P[e].noloopanymore = 1,
        P[e].c.trigger("nulltimer")),
        P[e].c.on("tp-mouseenter", function() {
            P[e].mouseoncontainer = !0,
            1 != P[e].navigation.onHoverStop || P.ISM || (P[e].c.trigger("stoptimer"),
            P[e].c.trigger("revolution.slide.onpause"))
        }),
        P[e].c.on("tp-mouseleft", function() {
            P[e].mouseoncontainer = !1,
            1 != P[e].c.data("conthover") && 1 == P[e].navigation.onHoverStop && (1 == P[e].viewPort.enable && P[e].inviewport || 0 == P[e].viewPort.enable) && (P[e].c.trigger("revolution.slide.onresume"),
            P[e].c.trigger("starttimer"))
        })
    }, N = function() {
        T("rs-module").each(function() {
            var e, t = this.id;
            !P[t].inviewport && P[t].viewPort.enable || (e = P[t].pr_active_slide !== C && P[t].pr_active_slide.data("key") !== C ? P[t].pr_active_slide.data("key") : P[t].pr_next_slide !== C && P[t].pr_next_slide.data("key") !== C ? P[t].pr_next_slide.data("key") : C) != C && 0 < P[t].sbgs[e].bgvid.length && P[t].videos[P[t].sbgs[e].bgvid[0].id].loop && ("visible" === document.visibilityState ? P.playVideo(P[t].sbgs[e].bgvid, t) : P.stopVideo(P[t].sbgs[e].bgvid, t))
        })
    }, j = function() {
        var e = document.documentMode === C
          , t = window.chrome;
        1 !== P.revslider_focus_blur_listener && (P.revslider_focus_blur_listener = 1,
        e && !t ? P.window.on("focusin", function() {
            !0 !== P.windowIsFocused && i(),
            P.windowIsFocused = !0
        }).on("focusout", function() {
            !0 !== P.windowIsFocused && P.windowIsFocused !== C || a(),
            P.windowIsFocused = !1
        }) : window.addEventListener ? (window.addEventListener("focus", function(e) {
            !0 !== P.windowIsFocused && i(),
            P.windowIsFocused = !0
        }, {
            capture: !1,
            passive: !0
        }),
        window.addEventListener("blur", function(e) {
            !0 !== P.windowIsFocused && P.windowIsFocused !== C || a(),
            P.windowIsFocused = !1
        }, {
            capture: !1,
            passive: !0
        })) : (window.attachEvent("focus", function(e) {
            !0 !== P.windowIsFocused && i(),
            P.windowIsFocused = !0
        }),
        window.attachEvent("blur", function(e) {
            !0 !== P.windowIsFocused && P.windowIsFocused !== C || a(),
            P.windowIsFocused = !1
        })))
    }, F = function(e) {
        for (var t, i = [], a = window.location.href.slice(window.location.href.indexOf(e) + 1).split("_"), r = 0; r < a.length; r++)
            a[r] = a[r].replace("%3D", "="),
            t = a[r].split("="),
            i.push(t[0]),
            i[t[0]] = t[1];
        return i
    }, V = function(e) {
        if (P[e].blockSpacing !== C) {
            var t, i = P[e].blockSpacing.split(";");
            for (t in P[e].blockSpacing = {},
            i)
                if (i.hasOwnProperty(t)) {
                    var a = i[t].split(":");
                    switch (a[0]) {
                    case "t":
                        P[e].blockSpacing.top = P.revToResp(a[1], 4, 0);
                        break;
                    case "b":
                        P[e].blockSpacing.bottom = P.revToResp(a[1], 4, 0);
                        break;
                    case "l":
                        P[e].blockSpacing.left = P.revToResp(a[1], 4, 0);
                        break;
                    case "r":
                        P[e].blockSpacing.right = P.revToResp(a[1], 4, 0)
                    }
                }
            P[e].blockSpacing.block = T(P.closestClass(P[e].c[0], "wp-block-themepunch-revslider")),
            P[e].level !== C && P[e].blockSpacing !== C && tpGS.gsap.set(P[e].blockSpacing.block, {
                paddingLeft: P[e].blockSpacing.left[P[e].level],
                paddingRight: P[e].blockSpacing.right[P[e].level],
                marginTop: P[e].blockSpacing.top[P[e].level],
                marginBottom: P[e].blockSpacing.bottom[P[e].level]
            })
        }
    }, X = function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }, U = function(e) {
        var t, i = T.extend(!0, {
            DPR: "dpr",
            sliderType: "standard",
            sliderLayout: "auto",
            overlay: {
                type: "none",
                size: 1,
                colora: "transparent",
                colorb: "#000000"
            },
            duration: 9e3,
            imgCrossOrigin: "",
            modal: {
                useAsModal: !1,
                cover: !0,
                coverColor: "rgba(0,0,0,0.5)",
                horizontal: "center",
                vertical: "middle",
                coverSpeed: 1
            },
            navigation: {
                keyboardNavigation: !1,
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                wheelViewPort: 50,
                wheelCallDelay: "1000ms",
                onHoverStop: !0,
                mouseScrollReverse: "default",
                target: "window",
                threshold: 50,
                touch: {
                    touchenabled: !1,
                    touchOnDesktop: !1,
                    swipe_treshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: !1,
                    mobileCarousel: !0,
                    desktopCarousel: !0
                },
                arrows: {
                    style: "",
                    enable: !1,
                    hide_onmobile: !1,
                    hide_under: 0,
                    hide_onleave: !1,
                    hide_delay: 200,
                    hide_delay_mobile: 1200,
                    hide_over: 9999,
                    tmp: "",
                    rtl: !1,
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 20,
                        v_offset: 0,
                        container: "slider"
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 20,
                        v_offset: 0,
                        container: "slider"
                    }
                },
                bullets: {
                    enable: !1,
                    hide_onmobile: !1,
                    hide_onleave: !1,
                    hide_delay: 200,
                    hide_delay_mobile: 1200,
                    hide_under: 0,
                    hide_over: 9999,
                    direction: "horizontal",
                    h_align: "center",
                    v_align: "bottom",
                    space: 5,
                    h_offset: 0,
                    v_offset: 20,
                    tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>',
                    container: "slider",
                    rtl: !1,
                    style: ""
                },
                thumbnails: {
                    container: "slider",
                    rtl: !1,
                    style: "",
                    enable: !1,
                    width: 100,
                    height: 50,
                    min_width: 100,
                    wrapper_padding: 2,
                    wrapper_color: "transparent",
                    tmp: '<span class="tp-thumb-image"></span><span class="tp-thumb-title"></span>',
                    visibleAmount: 5,
                    hide_onmobile: !1,
                    hide_onleave: !1,
                    hide_delay: 200,
                    hide_delay_mobile: 1200,
                    hide_under: 0,
                    hide_over: 9999,
                    direction: "horizontal",
                    span: !1,
                    position: "inner",
                    space: 2,
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 20,
                    mhoff: 0,
                    mvoff: 0
                },
                tabs: {
                    container: "slider",
                    rtl: !1,
                    style: "",
                    enable: !1,
                    width: 100,
                    min_width: 100,
                    height: 50,
                    wrapper_padding: 10,
                    wrapper_color: "transparent",
                    tmp: '<span class="tp-tab-image"></span>',
                    visibleAmount: 5,
                    hide_onmobile: !1,
                    hide_onleave: !1,
                    hide_delay: 200,
                    hide_delay_mobile: 1200,
                    hide_under: 0,
                    hide_over: 9999,
                    direction: "horizontal",
                    span: !1,
                    space: 0,
                    position: "inner",
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 20,
                    mhoff: 0,
                    mvoff: 0
                }
            },
            responsiveLevels: 4064,
            visibilityLevels: [2048, 1024, 778, 480],
            gridwidth: 960,
            gridheight: 500,
            minHeight: 0,
            maxHeight: 0,
            keepBPHeight: !1,
            useFullScreenHeight: !0,
            overflowHidden: !1,
            forceOverflow: !1,
            fixedOnTop: !1,
            autoHeight: !1,
            gridEQModule: !1,
            disableForceFullWidth: !1,
            fullScreenOffsetContainer: "",
            fullScreenOffset: "0",
            hideLayerAtLimit: 0,
            hideAllLayerAtLimit: 0,
            hideSliderAtLimit: 0,
            progressBar: {
                disableProgressBar: !1,
                style: "horizontal",
                size: "5px",
                radius: 10,
                vertical: "bottom",
                horizontal: "left",
                x: 0,
                y: 0,
                color: "rgba(255,255,255,0.5)",
                bgcolor: "transparent",
                basedon: "slide",
                gapsize: 0,
                reset: "reset",
                gaptype: "gapboth",
                gapcolor: "rgba(255,255,255,0.5)",
                ease: "none",
                visibility: {
                    0: !0,
                    1: !0,
                    2: !0,
                    3: !0
                }
            },
            stopAtSlide: -1,
            stopAfterLoops: 0,
            shadow: 0,
            startDelay: 0,
            lazyType: "none",
            lazyOnBg: !1,
            spinner: "off",
            shuffle: !1,
            perspective: "600px",
            perspectiveType: "local",
            viewPort: {
                enable: !1,
                global: !1,
                globalDist: "-400px",
                outof: "wait",
                visible_area: "200px",
                presize: !1
            },
            fallbacks: {
                isJoomla: !1,
                panZoomDisableOnMobile: !1,
                simplifyAll: !0,
                nextSlideOnWindowFocus: !1,
                disableFocusListener: !1,
                allowHTML5AutoPlayOnAndroid: !0
            },
            fanim: !1,
            parallax: {
                type: "off",
                levels: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
                origo: "enterpoint",
                disable_onmobile: !1,
                ddd_shadow: !1,
                ddd_bgfreeze: !1,
                ddd_overflow: "visible",
                ddd_layer_overflow: "visible",
                ddd_z_correction: 65,
                speed: 400,
                speedbg: 0,
                speedls: 0
            },
            scrolleffect: {
                set: !1,
                fade: !1,
                blur: !1,
                scale: !1,
                grayscale: !1,
                maxblur: 10,
                layers: !1,
                slide: !1,
                direction: "both",
                multiplicator: 1.35,
                multiplicator_layers: .5,
                tilt: 30,
                disable_onmobile: !1
            },
            sbtimeline: {
                set: !1,
                fixed: !1,
                fixStart: 0,
                fixEnd: 0,
                layers: !1,
                slide: !1,
                ease: "none",
                speed: 500
            },
            carousel: {
                orientation: "h",
                prevNextVis: "50px",
                easing: "power3.inOut",
                speed: 800,
                showLayersAllTime: !1,
                horizontal_align: "center",
                vertical_align: "center",
                snap: !0,
                infinity: !1,
                stopOnClick: !0,
                space: 0,
                maxVisibleItems: 3,
                stretch: !1,
                fadeout: !0,
                maxRotation: 0,
                maxOpacity: 100,
                minScale: 0,
                offsetScale: !1,
                vary_fade: !1,
                vary_rotation: !1,
                vary_scale: !1,
                border_radius: "0px",
                padding_top: 0,
                padding_bottom: 0,
                skewX: 0,
                skewY: 0,
                spin: "off",
                spinAngle: 0,
                overshoot: !1
            },
            observeWrap: !1,
            extensions: "extensions/",
            extensions_suffix: ".min.js",
            stopLoop: !1,
            waitForInit: !1,
            ignoreHeightChange: !0,
            onedpronmobile: !1
        }, e);
        for (t in i.minHeight = i.minHeight === C || "none" === i.minHeight || "0" === i.minHeight || "0px" === i.minHeight || "" == i.minHeight || " " == i.minHeight ? 0 : parseInt(i.minHeight, 0),
        i.maxHeight = "none" === i.maxHeight || "0" === i.maxHeight ? 0 : parseInt(i.maxHeight, 0),
        i.carousel.maxVisibleItems = i.carousel.maxVisibleItems < 1 ? 999 : i.carousel.maxVisibleItems,
        i.carousel.vertical_align = "top" === i.carousel.vertical_align ? "0%" : "bottom" === i.carousel.vertical_align ? "100%" : "50%",
        i.carousel.space = parseInt(i.carousel.space, 0),
        i.carousel.maxOpacity = parseInt(i.carousel.maxOpacity, 0),
        i.carousel.maxOpacity = 1 < i.carousel.maxOpacity ? i.carousel.maxOpacity / 100 : i.carousel.maxOpacity,
        i.carousel.showLayersAllTime = "true" === i.carousel.showLayersAllTime || !0 === i.carousel.showLayersAllTime ? "all" : i.carousel.showLayersAllTime,
        i.carousel.maxRotation = parseInt(i.carousel.maxRotation, 0),
        i.carousel.minScale = parseInt(i.carousel.minScale, 0),
        i.carousel.minScale = .9 < i.carousel.minScale ? i.carousel.minScale / 100 : i.carousel.minScale,
        i.carousel.speed = parseInt(i.carousel.speed, 0),
        i.carousel.skewX = parseFloat(i.carousel.skewX),
        i.carousel.skewY = parseFloat(i.carousel.skewY),
        i.carousel.spinAngle = parseFloat(i.carousel.spinAngle),
        0 === i.carousel.spinAngle && (i.carousel.spinAngle = 1),
        "v" === i.carousel.orientation && (i.carousel.justify = !1),
        i.navigation.maintypes = ["arrows", "tabs", "thumbnails", "bullets"],
        i.perspective = parseInt(i.perspective, 0),
        i.navigation.maintypes)
            i.navigation.maintypes.hasOwnProperty(t) && i.navigation[i.navigation.maintypes[t]] !== C && (i.navigation[i.navigation.maintypes[t]].animDelay = i.navigation[i.navigation.maintypes[t]].animDelay === C ? 1e3 : i.navigation[i.navigation.maintypes[t]].animDelay,
            i.navigation[i.navigation.maintypes[t]].animSpeed = i.navigation[i.navigation.maintypes[t]].animSpeed === C ? 1e3 : i.navigation[i.navigation.maintypes[t]].animSpeed,
            i.navigation[i.navigation.maintypes[t]].animDelay = parseInt(i.navigation[i.navigation.maintypes[t]].animDelay, 0) / 1e3,
            i.navigation[i.navigation.maintypes[t]].animSpeed = parseInt(i.navigation[i.navigation.maintypes[t]].animSpeed, 0) / 1e3);
        if (P.isNumeric(i.scrolleffect.tilt) || -1 !== i.scrolleffect.tilt.indexOf("%") && (i.scrolleffect.tilt = parseInt(i.scrolleffect.tilt)),
        i.scrolleffect.tilt = i.scrolleffect.tilt / 100,
        i.navigation.thumbnails.position = "outer-horizontal" == i.navigation.thumbnails.position ? "bottom" == i.navigation.thumbnails.v_align ? "outer-bottom" : "outer-top" : "outer-vertical" == i.navigation.thumbnails.position ? "left" == i.navigation.thumbnails.h_align ? "outer-left" : "outer-right" : i.navigation.thumbnails.position,
        i.navigation.tabs.position = "outer-horizontal" == i.navigation.tabs.position ? "bottom" == i.navigation.tabs.v_align ? "outer-bottom" : "outer-top" : "outer-vertical" == i.navigation.tabs.position ? "left" == i.navigation.tabs.h_align ? "outer-left" : "outer-right" : i.navigation.tabs.position,
        i.sbtimeline.speed = parseInt(i.sbtimeline.speed, 0) / 1e3 || .5,
        !0 === i.sbtimeline.set && !0 === i.sbtimeline.fixed && "auto" !== i.sliderLayout ? (i.sbtimeline.fixStart = parseInt(i.sbtimeline.fixStart),
        i.sbtimeline.fixEnd = parseInt(i.sbtimeline.fixEnd)) : i.sbtimeline.fixed = !1,
        i.progressBar === C || "true" != i.progressBar.disableProgressBar && 1 != i.progressBar.disableProgressBar || (i.progressBar.disableProgressBar = !0),
        i.startDelay = parseInt(i.startDelay, 0) || 0,
        i.navigation !== C && i.navigation.arrows != C && i.navigation.arrows.hide_under != C && (i.navigation.arrows.hide_under = parseInt(i.navigation.arrows.hide_under)),
        i.navigation !== C && i.navigation.bullets != C && i.navigation.bullets.hide_under != C && (i.navigation.bullets.hide_under = parseInt(i.navigation.bullets.hide_under)),
        i.navigation !== C && i.navigation.thumbnails != C && i.navigation.thumbnails.hide_under != C && (i.navigation.thumbnails.hide_under = parseInt(i.navigation.thumbnails.hide_under)),
        i.navigation !== C && i.navigation.tabs != C && i.navigation.tabs.hide_under != C && (i.navigation.tabs.hide_under = parseInt(i.navigation.tabs.hide_under)),
        i.navigation !== C && i.navigation.arrows != C && i.navigation.arrows.hide_over != C && (i.navigation.arrows.hide_over = parseInt(i.navigation.arrows.hide_over)),
        i.navigation !== C && i.navigation.bullets != C && i.navigation.bullets.hide_over != C && (i.navigation.bullets.hide_over = parseInt(i.navigation.bullets.hide_over)),
        i.navigation !== C && i.navigation.thumbnails != C && i.navigation.thumbnails.hide_over != C && (i.navigation.thumbnails.hide_over = parseInt(i.navigation.thumbnails.hide_over)),
        i.navigation !== C && i.navigation.tabs != C && i.navigation.tabs.hide_over != C && (i.navigation.tabs.hide_over = parseInt(i.navigation.tabs.hide_over)),
        i.lazyloaddata !== C && 0 < i.lazyloaddata.length && 0 < i.lazyloaddata.indexOf("-")) {
            var a = i.lazyloaddata.split("-");
            i.lazyloaddata = a[0];
            for (t = 1; t < a.length; t++)
                i.lazyloaddata += X(a[t])
        }
        return i.duration = parseInt(i.duration),
        "single" === i.lazyType && "carousel" === i.sliderType && (i.lazyType = "smart"),
        "carousel" === i.sliderType && i.carousel.justify && (i.justifyCarousel = !0,
        i.keepBPHeight = !0),
        i.enableUpscaling = 1 == i.enableUpscaling && "carousel" !== i.sliderType && "fullwidth" === i.sliderLayout,
        i.useFullScreenHeight = "carousel" === i.sliderType && "fullscreen" === i.sliderLayout && !0 === i.useFullScreenHeight && "v" !== i.carousel.orientation,
        i.progressBar.y = parseInt(i.progressBar.y, 0),
        i.progressBar.x = parseInt(i.progressBar.x, 0),
        "IE" !== window.RSBrowser && i.customEases !== C && (!i.customEases.SFXBounceLite && "true" != i.customEases.SFXBounceLite || tpGS.SFXBounceLite !== C || (tpGS.SFXBounceLite = tpGS.CustomBounce.create("SFXBounceLite", {
            strength: .3,
            squash: 1,
            squashID: "SFXBounceLite-squash"
        })),
        !i.customEases.SFXBounceSolid && "true" != i.customEases.SFXBounceSolid || tpGS.SFXBounceSolid !== C || (tpGS.SFXBounceSolid = tpGS.CustomBounce.create("SFXBounceSolid", {
            strength: .5,
            squash: 2,
            squashID: "SFXBounceSolid-squash"
        })),
        !i.customEases.SFXBounceStrong && "true" != i.customEases.SFXBounceStrong || tpGS.SFXBounceStrong !== C || (tpGS.SFXBounceStrong = tpGS.CustomBounce.create("SFXBounceStrong", {
            strength: .7,
            squash: 3,
            squashID: "SFXBounceStrong-squash"
        })),
        !i.customEases.SFXBounceExtrem && "true" != i.customEases.SFXBounceExtrem || tpGS.SFXBounceExtrem !== C || (tpGS.SFXBounceExtrem = tpGS.CustomBounce.create("SFXBounceExtrem", {
            strength: .9,
            squash: 4,
            squashID: "SFXBounceExtrem-squash"
        })),
        !i.customEases.BounceLite && "true" != i.customEases.BounceLite || tpGS.BounceLite !== C || (tpGS.BounceLite = tpGS.CustomBounce.create("BounceLite", {
            strength: .3
        })),
        !i.customEases.BounceSolid && "true" != i.customEases.BounceSolid || tpGS.BounceSolid !== C || (tpGS.BounceSolid = tpGS.CustomBounce.create("BounceSolid", {
            strength: .5
        })),
        !i.customEases.BounceStrong && "true" != i.customEases.BounceStrong || tpGS.BounceStrong !== C || (tpGS.BounceStrong = tpGS.CustomBounce.create("BounceStrong", {
            strength: .7
        })),
        !i.customEases.BounceExtrem && "true" != i.customEases.BounceExtrem || tpGS.BounceExtrem !== C || (tpGS.BounceExtrem = tpGS.CustomBounce.create("BounceExtrem", {
            strength: .9
        }))),
        i.modal.coverSpeed = parseFloat(i.modal.coverSpeed),
        i.modal.coverSpeed = 200 < i.modal.coverSpeed ? i.modal.coverSpeed / 1e3 : i.modal.coverSpeed,
        i.modal.coverSpeed = Math.max(Math.min(3, i.modal.coverSpeed), .3),
        i.navigation.wheelViewPort = i.navigation.wheelViewPort === C ? .5 : i.navigation.wheelViewPort / 100,
        i.navigation.wheelCallDelay = i.navigation.wheelCallDelay === C ? 1e3 : parseInt(i.navigation.wheelCallDelay),
        i.autoDPR = "string" == typeof i.DPR && -1 !== i.DPR.indexOf("ax"),
        i.DPR = i.DPR.replace("ax", ""),
        i.DPR = parseInt(i.DPR.replace("x", "")),
        i.DPR = isNaN(i.DPR) ? window.devicePixelRatio : i.autoDPR ? Math.min(window.devicePixelRatio, i.DPR) : i.DPR,
        i.DPR = 1 != i.onedpronmobile && "true" != i.onedpronmobile || !P.ISM ? i.DPR : 1,
        !1 === i.viewPort.global ? i.viewPort.enable = !1 : !0 === i.viewPort.global && (i.viewPort.local = i.viewPort.enable,
        i.viewPort.enable = !0),
        i.carousel !== C && "v" == i.carousel.orientation && (i.carousel.prevNextVisType = ("" + i.carousel.prevNextVis).includes("%") ? "%" : "px",
        i.carousel.prevNextVis = parseInt(i.carousel.prevNextVis, 0) / ("%" == i.carousel.prevNextVisType ? 100 : 1)),
        i
    }, k = (window.RS_MODULES = window.RS_MODULES || {},
    window.RS_MODULES.waiting = window.RS_MODULES.waiting || [],
    ["DOM", "main", "parallax", "video", "slideanims", "actions", "layeranimation", "navigation", "carousel", "panzoom"]);
    for (e in k)
        -1 == window.RS_MODULES.waiting.indexOf(k[e]) && window.RS_MODULES.waiting.push(k[e]);
    function L(e) {
        window.elementorFrontend !== C && elementorFrontend.hooks !== C && elementorFrontend.hooks.removeAction("frontend/element_ready/global", L),
        window.RS_MODULES.elementor = {
            loaded: !0,
            version: "6.5.0"
        },
        window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal()
    }
    function O() {
        if (window.elementorFrontend === C || window.elementorFrontend.hooks === C || window.elementorFrontend.hooks.addAction === C)
            return window.RS_MODULES.elementorCounter++,
            window.RS_MODULES.elementorCounterCheck && 20 < window.RS_MODULES.elementorCounter ? void L() : void requestAnimationFrame(O);
        window.elementorFrontend.config.environmentMode.edit ? elementorFrontend.hooks.addAction("frontend/element_ready/widget", L) : L()
    }
    function R() {
        1 != RS_MODULES.checkElementorCalled && (RS_MODULES.checkElementorCalled = !0,
        document.body) && (0 <= document.body.className.indexOf("elementor-smooth") || 0 <= document.body.className.indexOf("elementor-default")) && (window.RS_MODULES.waiting = window.RS_MODULES.waiting === C ? [] : window.RS_MODULES.waiting,
        -1 == window.RS_MODULES.waiting.indexOf("elementor") && window.RS_MODULES.waiting.push("elementor"),
        document.body && -1 == document.body.className.indexOf("elementor-editor-active") && (window.RS_MODULES.elementorCounterCheck = !0),
        window.RS_MODULES.elementorCounter = 0,
        O())
    }
    window.RS_MODULES.main = {
        loaded: !0,
        version: o
    },
    window.RS_MODULES.minimal = !1,
    window.RS_MODULES.callSliders = function() {
        for (var e in RS_MODULES.modules)
            !0 !== RS_MODULES.modules[e].once && window.RS_MODULES !== C && window.RS_MODULES.minimal && (RS_MODULES.modules[e].once = !0,
            RS_MODULES.modules[e].init())
    }
    ,
    "loading" === document.readyState ? document.addEventListener("readystatechange", function() {
        "interactive" !== document.readyState && "complete" !== document.readyState || (R(),
        window.RS_MODULES.DOM = {
            loaded: !0
        },
        window.RS_MODULES.checkMinimal())
    }) : "complete" !== document.readyState && "interactive" !== document.readyState || (R(),
    window.RS_MODULES.DOM = {
        loaded: !0
    }),
    window.RS_MODULES.checkMinimal = function() {
        if (0 == window.RS_MODULES.minimal) {
            var e = 1 == window.RS_MODULES.minimal || window.RS_MODULES.waiting !== C && T.fn.revolution !== C && window.tpGS !== C && window.tpGS.gsap !== C;
            if (e)
                for (var t in window.RS_MODULES.waiting)
                    window.RS_MODULES.waiting.hasOwnProperty(t) && "function" != typeof window.RS_MODULES.waiting[t] && e && window.RS_MODULES[window.RS_MODULES.waiting[t]] === C && (e = !1);
            e && (!0 !== window.RS_MODULES.minimal && T(document).trigger("REVSLIDER_READY_TO_USE"),
            window.RS_MODULES.minimal = !0)
        } else
            window.RS_MODULES.minimal = !0;
        !0 === window.RS_MODULES.minimal && window.RS_MODULES.callSliders()
    }
    ,
    window.RS_MODULES.checkMinimal()
}(jQuery),
!function($, undefined) {
    "use strict";
    var version = "6.6.0"
      , _R = (jQuery.fn.revolution = jQuery.fn.revolution || {},
    jQuery.fn.revolution)
      , moduleEnterLeaveActions = (jQuery.extend(!0, _R, {
        checkActions: function(e, t) {
            e === undefined ? moduleEnterLeaveActions(t) : checkActions_intern(e, t)
        },
        delayer: function(e, t, i) {
            _R[e].timeStamps = _R[e].timeStamps === undefined ? {} : _R[e].timeStamps;
            var a = (new Date).getTime()
              , r = _R[e].timeStamps[i] === undefined ? parseInt(t) + 100 : a - _R[e].timeStamps[i]
              , r = parseInt(r) > t;
            return r && (_R[e].timeStamps[i] = a),
            r
        },
        getURLDetails: function(e) {
            (e = e === undefined ? {} : e).url = e.url === undefined ? window.location.href : e.url,
            e.url = e.url.replace("www", ""),
            e.protocol = 0 === e.url.indexOf("http://") ? "http://" : 0 === e.url.indexOf("https://") ? "https://" : 0 === e.url.indexOf("//") ? "//" : "relative";
            var t = (t = e.url.replace("https://", "")).replace("http://", "")
              , t = (t = (t = "relative" === e.protocol ? t.replace("//", "") : t).split("#"),
            e.anchor = (e.anchor === undefined || "" == e.anchor || 0 == e.anchor.length) && 1 < t.length ? t[1] : e.anchor === undefined ? "" : e.anchor.replace("#", ""),
            e.anchor = e.anchor.split("?"),
            e.queries = t[0].split("?"),
            e.queries = 1 < e.queries.length ? e.queries[1] : "",
            e.queries = 1 < e.queries.length ? e.queries[1] : 1 < e.anchor.length ? e.anchor[1] : e.queries,
            e.anchor = e.anchor[0],
            (t = t[0]).split("/"),
            t.split("/"));
            return e.host = t[0],
            t.splice(0, 1),
            e.path = "/" + t.join("/"),
            "/" == e.path[e.path.length - 1] && (e.path = e.path.slice(0, -1)),
            e.origin = "relative" !== e.protocol ? e.protocol + e.host : window.location.origin.replace("www", "") + window.location.pathname,
            e.hash = ("" !== e.queries && e.queries !== undefined ? "?" + e.queries : "") + ("" !== e.anchor && e.anchor !== undefined ? "#" + e.anchor : ""),
            e
        },
        scrollToId: function(e) {
            var t, i;
            _R.scrollToObj = e,
            window.isSafari11 || (t = tpGS.gsap.getProperty("html", "scrollBehavior"),
            i = tpGS.gsap.getProperty("body", "scrollBehavior"),
            tpGS.gsap.set("html,body", {
                scrollBehavior: "auto"
            }),
            e.scrollBehaviorHtml = t,
            e.scrollBehaviorBody = i),
            _R.calcScrollToId()
        },
        calcScrollToId: function() {
            var e, t, i, a, r;
            _R.scrollToObj && (t = (e = _R.scrollToObj).tween && e.tween.progress ? e.tween.progress() : 0,
            e.tween && e.tween.kill && e.tween.kill(),
            e.startScrollPos !== undefined && null !== e.startScrollPos || (e.startScrollPos = (_R[e.id].modal.useAsModal ? _R[e.id].cpar : _R.document).scrollTop()),
            i = "scrollbelow" === e.action ? (getOffContH(_R[e.id].fullScreenOffsetContainer) || 0) - (parseInt(e.offset, 0) || 0) || 0 : 0 - (parseInt(e.offset, 0) || 0),
            a = 0 < (a = "scrollbelow" === e.action ? _R[e.id].c : jQuery("#" + e.anchor)).length ? a.offset().top : 0,
            r = {
                _y: _R[e.id].modal.useAsModal ? _R[e.id].cpar[0].scrollTop : window.pageYOffset === document.documentElement.scrollTop || 0 !== window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop
            },
            a += "scrollbelow" === e.action ? _R[e.id].sbtimeline.fixed ? _R[e.id].cpar.parent().height() + _R[e.id].fullScreenOffsetResult : jQuery(_R[e.id].slides[0]).height() : 0,
            e.tween = tpGS.gsap.fromTo(r, e.speed / 1e3, {
                _y: e.startScrollPos
            }, {
                _y: a - i,
                ease: e.ease,
                onUpdate: function() {
                    (_R[e.id].modal.useAsModal ? _R[e.id].cpar : _R.document).scrollTop(r._y)
                },
                onComplete: function() {
                    e.hash !== undefined && history.pushState(null, null, e.hash),
                    window.isSafari11 || (tpGS.gsap.set("html", {
                        scrollBehavior: e.scrollBehaviorHtml
                    }),
                    tpGS.gsap.set("body", {
                        scrollBehavior: e.scrollBehaviorBody
                    })),
                    _R.scrollToObj && (_R.scrollToObj.tween && (_R.scrollToObj.tween.kill(),
                    _R.scrollToObj.tween = null),
                    _R.scrollToObj.startScrollPos = null,
                    _R.scrollToObj = null)
                }
            }),
            e.tween.progress(t))
        }
    }),
    function(i) {
        !_R[i].moduleActionsPrepared && 0 < _R[i].c[0].getElementsByClassName("rs-on-sh").length && (_R[i].c.on("tp-mouseenter", function() {
            _R[i].mouseoncontainer = !0;
            var e, t = _R[i].pr_next_key !== undefined ? _R[i].pr_next_key : _R[i].pr_processing_key !== undefined ? _R[i].pr_processing_key : _R[i].pr_active_key !== undefined ? _R[i].pr_active_key : _R[i].pr_next_key;
            if ("none" !== t && t !== undefined) {
                if ((t = _R.gA(_R[i].slides[t], "key")) !== undefined && _R[i].layers[t])
                    for (e in _R[i].layers[t])
                        0 <= _R[i].layers[t][e].className.indexOf("rs-on-sh") && _R.renderLayerAnimation({
                            layer: jQuery(_R[i].layers[t][e]),
                            frame: "frame_1",
                            mode: "trigger",
                            id: i
                        });
                for (e in _R[i].layers.static)
                    0 <= _R[i].layers.static[e].className.indexOf("rs-on-sh") && _R.renderLayerAnimation({
                        layer: jQuery(_R[i].layers.static[e]),
                        frame: "frame_1",
                        mode: "trigger",
                        id: i
                    })
            }
        }),
        _R[i].c.on("tp-mouseleft", function() {
            _R[i].mouseoncontainer = !0;
            var e, t = _R[i].pr_next_key !== undefined ? _R[i].pr_next_key : _R[i].pr_processing_key !== undefined ? _R[i].pr_processing_key : _R[i].pr_active_key !== undefined ? _R[i].pr_active_key : _R[i].pr_next_key;
            if ("none" !== t && t !== undefined) {
                if ((t = _R.gA(_R[i].slides[t], "key")) !== undefined && _R[i].layers[t])
                    for (e in _R[i].layers[t])
                        0 <= _R[i].layers[t][e].className.indexOf("rs-on-sh") && _R.renderLayerAnimation({
                            layer: jQuery(_R[i].layers[t][e]),
                            frame: "frame_999",
                            mode: "trigger",
                            id: i
                        });
                for (e in _R[i].layers.static)
                    0 <= _R[i].layers.static[e].className.indexOf("rs-on-sh") && _R.renderLayerAnimation({
                        layer: jQuery(_R[i].layers.static[e]),
                        frame: "frame_999",
                        mode: "trigger",
                        id: i
                    })
            }
        })),
        _R[i].moduleActionsPrepared = !0
    }
    )
      , checkActions_intern = function(layer, id) {
        var actions = _R.gA(layer[0], "actions"), wrap, _L = ("RS-COLUMN" == layer[0].tagName && (wrap = _R.closestNode(layer[0], "RS-COLUMN-WRAP"),
        null !== wrap) && wrap !== undefined && (_R.sA(wrap, "action", actions),
        layer = jQuery(wrap)),
        layer.data()), ei, actions = actions.split("||");
        for (ei in layer.addClass("rs-waction"),
        _L.events = _L.events === undefined ? [] : _L.events,
        actions)
            if (actions.hasOwnProperty(ei)) {
                var event = getEventParams(actions[ei].split(";"))
                  , targetlayer = (_L.events.push(event),
                "click" === event.on && layer[0].classList.add("rs-wclickaction"),
                _R[id].fullscreen_esclistener || "exitfullscreen" != event.action && "togglefullscreen" != event.action || (_R.document.keyup(function(e) {
                    27 == e.keyCode && 0 < jQuery("#rs-go-fullscreen").length && layer.trigger(event.on)
                }),
                _R[id].fullscreen_esclistener = !0),
                "backgroundvideo" == event.layer ? jQuery("rs-bgvideo") : "firstvideo" == event.layer ? jQuery("rs-slide").find(".rs-layer-video") : jQuery("#" + event.layer));
                switch (-1 != jQuery.inArray(event.action, ["toggleslider", "toggle_mute_video", "toggle_global_mute_video", "togglefullscreen"]) && (_L._togglelisteners = !0),
                event.action) {
                case "togglevideo":
                    jQuery.each(targetlayer, function() {
                        updateToggleByList(jQuery(this), "videotoggledby", layer[0].id)
                    });
                    break;
                case "togglelayer":
                    jQuery.each(targetlayer, function() {
                        updateToggleByList(jQuery(this), "layertoggledby", layer[0].id),
                        jQuery(this).data("triggered_startstatus", event.togglestate)
                    });
                    break;
                case "toggle_global_mute_video":
                case "toggle_mute_video":
                    jQuery.each(targetlayer, function() {
                        updateToggleByList(jQuery(this), "videomutetoggledby", layer[0].id)
                    });
                    break;
                case "toggleslider":
                    _R[id].slidertoggledby == undefined && (_R[id].slidertoggledby = []),
                    _R[id].slidertoggledby.push(layer[0].id);
                    break;
                case "togglefullscreen":
                    _R[id].fullscreentoggledby == undefined && (_R[id].fullscreentoggledby = []),
                    _R[id].fullscreentoggledby.push(layer[0].id)
                }
            }
        _R[id].actionsPrepared = !0,
        _R[id].actionListenerHook = _R[id].actionListenerHook == undefined ? {
            _on: ""
        } : _R[id].actionListenerHook,
        layer.on("click mouseenter mouseleave " + _R[id].actionListenerHook._on, function(e) {
            for (var i in _L.events)
                if (_L.events.hasOwnProperty(i) && _L.events[i].on.includes(e.type)) {
                    var event = _L.events[i];
                    if (!(event.repeat !== undefined && 0 < event.repeat) || _R.delayer(id, 1e3 * event.repeat, _L.c[0].id + "_" + event.action)) {
                        if ("click" === event.on && layer.hasClass("tp-temporarydisabled"))
                            return !1;
                        ("" + event.layer).includes("layer-sta_") && (_R[id].staticPrefix = _R[id].staticPrefix || Object.keys(_R[id].layers.static)[0],
                        ("" + _R[id].staticPrefix).includes("layer-")) && (event.layer = _R[id].staticPrefix.split("layer-")[0] + "layer-" + event.layer.split("layer-sta_")[1]);
                        var targetlayer = "backgroundvideo" == event.layer ? jQuery(_R[id].slides[_R[id].pr_active_key]).find("rs-sbg-wrap rs-bgvideo") : "firstvideo" == event.layer ? jQuery(_R[id].slides[_R[id].pr_active_key]).find(".rs-layer-video").first() : jQuery("#" + event.layer)
                          , tex = 0 < targetlayer.length;
                        if ("" != _R[id].actionListenerHook._on && "click" !== e.type && "mouseenter" !== e.type && "mouseleave" !== e.type) {
                            var keepgoing = !0, cbs;
                            for (cbs in _R[id].actionListenerHook.callBacks) {
                                if (!0 !== keepgoing)
                                    break;
                                _R[id].actionListenerHook.callBacks.hasOwnProperty(cbs) && "function" == typeof _R[id].actionListenerHook.callBacks[cbs] && (keepgoing = _R[id].actionListenerHook.callBacks[cbs]({
                                    event: event,
                                    layer: layer,
                                    targetlayer: targetlayer,
                                    L: _L
                                }))
                            }
                            if (!keepgoing)
                                continue
                        }
                        switch (event.action) {
                        case "menulink":
                            var linkto = _R.getURLDetails({
                                url: event.url,
                                anchor: event.anchor
                            })
                              , linkfrom = _R.getURLDetails();
                            linkto.host == linkfrom.host && linkto.path == linkfrom.path && "_self" === event.target ? _R.scrollToId({
                                id: id,
                                offset: event.offset,
                                action: event.action,
                                anchor: event.anchor,
                                hash: linkto.hash,
                                speed: event.speed,
                                ease: event.ease
                            }) : "_self" === event.target ? window.location = linkto.url + (linkto.anchor !== undefined && "" !== linkto.anchor ? "#" + linkto.anchor : "") : window.open(linkto.url + (linkto.anchor !== undefined && "" !== linkto.anchor ? "#" + linkto.anchor : "")),
                            e.preventDefault();
                            break;
                        case "getAccelerationPermission":
                            _R.getAccelerationPermission(id);
                            break;
                        case "nextframe":
                        case "prevframe":
                        case "gotoframe":
                        case "togglelayer":
                        case "toggleframes":
                        case "startlayer":
                        case "stoplayer":
                            if (targetlayer[0] !== undefined) {
                                var _ = _R[id]._L[targetlayer[0].id]
                                  , frame = event.frame
                                  , tou = "triggerdelay";
                                if ("click" === e.type && _.clicked_time_stamp !== undefined && (new Date).getTime() - _.clicked_time_stamp < 300)
                                    return;
                                if ("mouseenter" === e.type && _.mouseentered_time_stamp !== undefined && (new Date).getTime() - _.mouseentered_time_stamp < 300)
                                    return;
                                if (clearTimeout(_.triggerdelayIn),
                                clearTimeout(_.triggerdelayOut),
                                clearTimeout(_.triggerdelay),
                                "click" === e.type && (_.clicked_time_stamp = (new Date).getTime()),
                                "mouseenter" === e.type && (_.mouseentered_time_stamp = (new Date).getTime()),
                                "mouseleave" === e.type && (_.mouseentered_time_stamp = undefined),
                                "nextframe" === event.action || "prevframe" === event.action) {
                                    _.forda = _.forda === undefined ? getFordWithAction(_) : _.forda;
                                    var inx = jQuery.inArray(_.currentframe, _.ford);
                                    for ("nextframe" === event.action && inx++,
                                    "prevframe" === event.action && inx--; "skip" !== _.forda[inx] && 0 < inx && inx < _.forda.length - 1; )
                                        "nextframe" === event.action && inx++,
                                        "prevframe" === event.action && inx--,
                                        inx = Math.min(Math.max(0, inx), _.forda.length - 1);
                                    frame = _.ford[inx]
                                }
                                0 <= jQuery.inArray(event.action, ["toggleframes", "togglelayer", "startlayer", "stoplayer"]) && (_.triggeredstate = "startlayer" === event.action || "togglelayer" === event.action && "frame_1" !== _.currentframe || "toggleframes" === event.action && _.currentframe !== event.frameN,
                                "togglelayer" === event.action && !0 === _.triggeredstate && _.currentframe !== undefined && "frame_999" !== _.currentframe && (_.triggeredstate = !1),
                                frame = _.triggeredstate ? "toggleframes" === event.action ? event.frameN : "frame_1" : "toggleframes" === event.action ? event.frameM : "frame_999",
                                tou = _.triggeredstate ? "triggerdelayIn" : "triggerdelayOut",
                                _.triggeredstate ? _R.toggleState(_.layertoggledby) : (_R.stopVideo && _R.stopVideo(targetlayer, id),
                                _R.unToggleState(_.layertoggledby)));
                                var pars = {
                                    layer: targetlayer,
                                    frame: frame,
                                    mode: "trigger",
                                    id: id
                                };
                                !0 === event.children && (pars.updateChildren = !0,
                                pars.fastforward = !0),
                                _R.renderLayerAnimation && (clearTimeout(_[tou]),
                                _[tou] = setTimeout(function(e) {
                                    _R.renderLayerAnimation(e)
                                }, 1e3 * event.delay, pars))
                            }
                            break;
                        case "playvideo":
                            tex && _R.playVideo(targetlayer, id);
                            break;
                        case "stopvideo":
                            tex && _R.stopVideo && _R.stopVideo(targetlayer, id);
                            break;
                        case "togglevideo":
                            tex && (_R.isVideoPlaying(targetlayer, id) ? _R.stopVideo && _R.stopVideo(targetlayer, id) : _R.playVideo(targetlayer, id));
                            break;
                        case "mutevideo":
                            tex && _R.Mute(targetlayer, id, !0);
                            break;
                        case "unmutevideo":
                            tex && _R.Mute && _R.Mute(targetlayer, id, !1);
                            break;
                        case "toggle_mute_video":
                            tex && (_R.Mute(targetlayer, id) ? _R.Mute(targetlayer, id, !1) : _R.Mute && _R.Mute(targetlayer, id, !0));
                            break;
                        case "toggle_global_mute_video":
                            var pvl = _R[id].playingvideos != undefined && 0 < _R[id].playingvideos.length;
                            pvl && (_R[id].globalmute ? jQuery.each(_R[id].playingvideos, function(e, t) {
                                _R.Mute && _R.Mute(t, id, !1)
                            }) : jQuery.each(_R[id].playingvideos, function(e, t) {
                                _R.Mute && _R.Mute(t, id, !0)
                            })),
                            _R[id].globalmute = !_R[id].globalmute;
                            break;
                        default:
                            tpGS.gsap.delayedCall(event.delay, function(targetlayer, id, event, layer) {
                                switch (event.action) {
                                case "openmodal":
                                    _R.openModalAPI(event.modal, event.modalslide === undefined ? 0 : event.modalslide, _R[id].ajaxUrl, !0, id, event);
                                    break;
                                case "closemodal":
                                    _R.revModal(id, {
                                        mode: "close"
                                    });
                                    break;
                                case "callback":
                                    eval(event.callback);
                                    break;
                                case "simplelink":
                                    window.open(event.url, event.target);
                                    break;
                                case "simulateclick":
                                    0 < targetlayer.length && targetlayer.trigger("click");
                                    break;
                                case "toggleclass":
                                    0 < targetlayer.length && targetlayer.toggleClass(event.classname);
                                    break;
                                case "scrollbelow":
                                case "scrollto":
                                    "scrollbelow" === event.action && layer.addClass("tp-scrollbelowslider"),
                                    _R.scrollToId({
                                        id: id,
                                        offset: event.offset,
                                        action: event.action,
                                        anchor: event.id,
                                        speed: event.speed,
                                        ease: event.ease
                                    });
                                    break;
                                case "jumptoslide":
                                    switch (_R[id].skipAttachDetach = !0,
                                    event.slide.toLowerCase()) {
                                    case "rs-random":
                                        var ts = Math.min(Math.max(0, Math.ceil(Math.random() * _R[id].realslideamount) - 1));
                                        ts = _R[id].activeRSSlide == ts ? 0 < ts ? ts - 1 : ts + 1 : ts,
                                        _R.callingNewSlide(id, _R[id].slides[ts].dataset.key, "carousel" === _R[id].sliderType);
                                        break;
                                    case "+1":
                                    case "next":
                                    case "rs-next":
                                        _R[id].sc_indicator = "arrow",
                                        _R[id].sc_indicator_dir = 0,
                                        _R.callingNewSlide(id, 1, "carousel" === _R[id].sliderType);
                                        break;
                                    case "rs-previous":
                                    case "rs-prev":
                                    case "previous":
                                    case "prev":
                                    case "-1":
                                        _R[id].sc_indicator = "arrow",
                                        _R[id].sc_indicator_dir = 1,
                                        _R.callingNewSlide(id, -1, "carousel" === _R[id].sliderType);
                                        break;
                                    case "first":
                                    case "rs-first":
                                        _R[id].sc_indicator = "arrow",
                                        _R[id].sc_indicator_dir = 1,
                                        _R.callingNewSlide(id, 0, "carousel" === _R[id].sliderType);
                                        break;
                                    case "last":
                                    case "rs-last":
                                        _R[id].sc_indicator = "arrow",
                                        _R[id].sc_indicator_dir = 0,
                                        _R.callingNewSlide(id, _R[id].slideamount - 1, "carousel" === _R[id].sliderType);
                                        break;
                                    default:
                                        var ts = _R.isNumeric(event.slide) ? parseInt(event.slide, 0) : event.slide;
                                        _R.callingNewSlide(id, ts, "carousel" === _R[id].sliderType)
                                    }
                                    break;
                                case "toggleslider":
                                    _R[id].noloopanymore = 0,
                                    "playing" == _R[id].sliderstatus ? (_R[id].c.revpause(),
                                    _R[id].forcepaused = !0,
                                    _R.unToggleState(_R[id].slidertoggledby)) : (_R[id].forcepaused = !1,
                                    _R[id].c.revresume(),
                                    _R.toggleState(_R[id].slidertoggledby));
                                    break;
                                case "pauseslider":
                                    _R[id].c.revpause(),
                                    _R.unToggleState(_R[id].slidertoggledby);
                                    break;
                                case "playslider":
                                    _R[id].noloopanymore = 0,
                                    _R[id].c.revresume(),
                                    _R.toggleState(_R[id].slidertoggledby);
                                    break;
                                case "gofullscreen":
                                case "exitfullscreen":
                                case "togglefullscreen":
                                    var gf;
                                    tpGS.gsap.set(_R[id].parallax.bgcontainers, {
                                        y: 0
                                    }),
                                    0 < jQuery(".rs-go-fullscreen").length && ("togglefullscreen" == event.action || "exitfullscreen" == event.action) ? (jQuery(".rs-go-fullscreen").removeClass("rs-go-fullscreen"),
                                    gf = 0 < _R[id].c.closest("rs-fullwidth-wrap").length ? _R[id].c.closest("rs-fullwidth-wrap") : _R[id].c.closest("rs-module-wrap"),
                                    _R[id].minHeight = _R[id].oldminheight,
                                    _R[id].infullscreenmode = !1,
                                    _R[id].c.revredraw(),
                                    _R[id].c.revredraw(),
                                    jQuery(window).trigger("resize"),
                                    _R.unToggleState(_R[id].fullscreentoggledby)) : 0 != jQuery(".rs-go-fullscreen").length || "togglefullscreen" != event.action && "gofullscreen" != event.action || (gf = 0 < _R[id].c.closest("rs-fullwidth-wrap").length ? _R[id].c.closest("rs-fullwidth-wrap") : _R[id].c.closest("rs-module-wrap"),
                                    gf.addClass("rs-go-fullscreen"),
                                    _R[id].oldminheight = _R[id].minHeight,
                                    _R[id].minHeight = _R.getWinH(id),
                                    _R[id].infullscreenmode = !0,
                                    jQuery(window).trigger("resize"),
                                    _R.toggleState(_R[id].fullscreentoggledby),
                                    _R[id].c.revredraw());
                                    break;
                                default:
                                    _R[id].c.trigger("layeraction", [event.action, layer, event])
                                }
                            }, [targetlayer, id, event, layer])
                        }
                    }
                }
        })
    };
    function getFordWithAction(e) {
        var t, i = [];
        for (t in e.ford)
            e.frames[e.ford[t]].timeline.waitoncall ? i.push(e.ford[t]) : i.push("skip");
        return i
    }
    function updateToggleByList(e, t, i) {
        var a = e.data(t);
        (a = a === undefined ? [] : a).push(i),
        e.data(t, a)
    }
    function getEventParams(e) {
        var t, i = {
            on: "click",
            delay: 0,
            ease: "power2.out",
            speed: 400
        };
        for (t in e)
            if (e.hasOwnProperty(t)) {
                var a = e[t].split(":");
                switch (2 < a.length && "call" === a[0] && (a[1] = a.join(":").replace(a[0] + ":", "")),
                a[0]) {
                case "modal":
                    i.modal = a[1];
                    break;
                case "ms":
                    i.modalslide = a[1];
                    break;
                case "m":
                    i.frameM = a[1];
                    break;
                case "n":
                    i.frameN = a[1];
                    break;
                case "o":
                    i.on = "click" === a[1] || "c" === a[1] ? "click" : "ml" === a[1] || "mouseleave" === a[1] ? "mouseleave" : "mouseenter" === a[1] || "me" === a[1] ? "mouseenter" : a[1];
                    break;
                case "d":
                    i.delay = parseInt(a[1], 0) / 1e3,
                    i.delay = "NaN" === i.delay || isNaN(i.delay) ? 0 : i.delay;
                    break;
                case "rd":
                    i.repeat = parseInt(a[1], 0) / 1e3,
                    i.repeat = "NaN" === i.repeat || isNaN(i.repeat) ? 0 : i.repeat;
                    break;
                case "a":
                    i.action = a[1];
                    break;
                case "f":
                    i.frame = a[1];
                    break;
                case "slide":
                    i.slide = a[1];
                    break;
                case "layer":
                    i.layer = a[1];
                    break;
                case "sp":
                    i.speed = parseInt(a[1], 0);
                    break;
                case "e":
                    i.ease = a[1];
                    break;
                case "ls":
                    i.togglestate = a[1];
                    break;
                case "offset":
                    i.offset = a[1];
                    break;
                case "call":
                    i.callback = a[1];
                    break;
                case "url":
                    i.url = "";
                    for (var r = 1; r < a.length; r++)
                        i.url += a[r] + (r === a.length - 1 ? "" : ":");
                    break;
                case "target":
                    i.target = a[1];
                    break;
                case "class":
                    i.classname = a[1];
                    break;
                case "ch":
                    i.children = "true" == a[1] || 1 == a[1] || "t" == a[1];
                    break;
                default:
                    0 < a[0].length && "" !== a[0] && (i[a[0]] = a[1])
                }
            }
        return i
    }
    var getOffContH = function(e) {
        var t, i;
        return e == undefined ? 0 : 1 < e.split(",").length ? (t = e.split(","),
        i = 0,
        t && jQuery.each(t, function(e, t) {
            0 < jQuery(t).length && (i += jQuery(t).outerHeight(!0))
        }),
        i) : jQuery(e).height()
    };
    window.RS_MODULES = window.RS_MODULES || {},
    window.RS_MODULES.actions = {
        loaded: !0,
        version: version
    },
    window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal()
}(jQuery),
!function() {
    "use strict";
    jQuery.fn.revolution = jQuery.fn.revolution || {};
    var y = jQuery.fn.revolution
      , w = (jQuery.extend(!0, y, {
        prepareCarousel: function(e, t, i, a) {
            var r;
            void 0 === e || ((r = y[e].carousel).slidesWithRowAdjustions = {},
            t = r.lastdirection = o(t, r.lastdirection),
            y.setCarouselDefaults(e, void 0, a),
            y.organiseCarousel(e, "right", !0, !1, !1),
            void 0 !== r.swipeTo && y.isNumeric(r.swipeTo) ? void 0 !== i ? y.swipeAnimate({
                id: e,
                to: r.swipeTo,
                distance: r.swipeToDistance,
                direction: t,
                fix: !0,
                speed: i
            }) : y.swipeAnimate({
                id: e,
                to: r.swipeTo,
                distance: r.swipeToDistance,
                direction: t,
                fix: !0
            }) : y.swipeAnimate({
                id: e,
                to: 0,
                direction: t,
                speed: 0
            }),
            "carousel" !== y[e].sliderType) || r.fadein || (tpGS.gsap.to(y[e].canvas, 1, {
                scale: 1,
                opacity: 1
            }),
            r.fadein = !0)
        },
        setupCarousel: function(i) {
            var a = y[i].carousel;
            "v" == a.orientation ? (a.length = "height",
            a.translate = "y",
            a.slide_dims = "slide_heights",
            a.deltaT = "deltaY",
            a.sliderLength = "sliderHeight",
            a.slide_length = "slide_height",
            a.wraplength = "wrapheight",
            a.align = "0%" === a.vertical_align ? "start" : "50%" === a.vertical_align ? "center" : "end",
            !a.snap || a.justify || a.infinity || (a.forceBAlign = !0)) : (a.length = "width",
            a.translate = "x",
            a.slide_dims = "slide_widths",
            a.deltaT = "deltaX",
            a.sliderLength = "sliderWidth",
            a.slide_length = "slide_width",
            a.wraplength = "wrapwidth",
            a.align = "left" === a.horizontal_align ? "start" : "center" === a.horizontal_align ? "center" : "end"),
            a[a.sliderLength] = y[i].canv[a.length],
            a.proxy = document.createElement("div"),
            a.follower = document.createElement("div"),
            a.slideamount = y[i].slideamount,
            a.infinity || a.snap || (y[i].carousel.align = "start"),
            g(i),
            b(i, a.align),
            a.inited = !0,
            a.lerpHandler = y.carLerpHandler.bind(this, i),
            void 0 === a.animInList && (a.animInList = []),
            a.draggableObj = {
                trigger: y[i].c[0],
                type: a.translate,
                edgeResistance: .5,
                zIndexBoost: !1,
                cursor: "grab",
                activeCursor: "grabbing",
                allowContextMenu: !0,
                inertia: !0,
                throwResistance: a.snap ? 8e3 : 500,
                onPress: function(e) {
                    y.closestClass(e.target, "rs-nav-element") ? (a.draggable.endDrag(),
                    a.draggable.disable()) : y[i].c.trigger("stoptimer"),
                    a.focusedOnPress = a.focused,
                    a.isPressed = !0,
                    a.fromWheel = !1,
                    a.cX = a.lerpX = this.pointerX,
                    a.cY = a.lerpY = this.pointerY,
                    a.tween && a.tween.kill && (a.tween.kill(),
                    delete a.tween)
                },
                onClick: function(e) {
                    a.isPressed = !1,
                    y.closestClass(e.target, "rs-nav-element") || y.closestClass(e.target, "rs-waction") || a.draggable.enabled() && !1 === y[i].carousel.stopOnClick && y[i].c.trigger("starttimer")
                },
                onDragStart: function() {
                    a.lerpSpeed = .1,
                    a.lerp || (a.lerp = requestAnimationFrame(a.lerpHandler)),
                    y.ISM && a.forceBAlign && ("up" === this.getDirection() && a.focused == a.slideamount - 1 || "down" === this.getDirection() && 0 == a.focused ? a.forceScroll = !0 : a.forceScroll = !1)
                },
                onDrag: function() {
                    a.cX = this.pointerX,
                    a.cY = this.pointerY
                },
                snap: function(e) {
                    var t;
                    return y.getLastPos(i),
                    a.isPressed = !1,
                    a.forceScroll && a.forceBAlign ? (t = "up" === this.getDirection() ? y[i].cpar.offset().top + y[i].module.height : y.document.scrollTop() - (window.innerHeight - y[i].cpar[0].getBoundingClientRect().top),
                    y[i].modal.useAsModal || tpGS.gsap.to([window, "body"], {
                        scrollTo: t
                    }),
                    a.focused != a.slideamount - 1 || a.infinity ? a.lastPos : a[a.wraplength] - a.totalWidth) : (y.calculateSnap(i, e),
                    e)
                }
            },
            a.draggable = tpGS.draggable.create(a.proxy, a.draggableObj)[0],
            y[i].c.one("revolution.slide.onchange", function() {
                w(i)
            })
        },
        positionCarousel: function(e) {
            var t = y[e].carousel;
            if (t[t.sliderLength] = y[e].canv[t.length],
            t.draggable && !t.draggable.isPressed) {
                for (var i = 0, a = 0; a < t.slideamount; a++)
                    t.arr[a].elem === y[e].slides[t.closest] && (i = t.arr[a].prog);
                if (Number.isNaN(i) && (i = 0),
                g(e),
                y.ISM && y[e].navigation.touch.mobileCarousel || !0 !== y.ISM && y[e].navigation.touch.desktopCarousel ? (t.draggable.vars.cursor = "grab",
                t.draggable.enable()) : (t.draggable.vars.cursor = "pointer",
                t.draggable.disable()),
                y[e].carousel.justify)
                    for (a = t.wrapperWidth = 0; a < y[e].carousel[t.slide_dims].length; a++)
                        t.wrapperWidth += y[e].carousel[t.slide_dims][a];
                else
                    t.wrapperWidth = t.slide_width * y[e].slides.length;
                void 0 === t.focused && (t.focused = 0),
                t.activeSlide = t.oldfocused = void 0 === t.focused || void 0 === t.closest ? 0 : t.closest;
                for (a = 0; a < t.arr.length; a++)
                    y.updateSlideWidth(e, a);
                var r, o, s, n = 0, l = (t.lastWrapwidth = t.wrapwidth,
                t.lastWrapheight = t.wrapheight,
                o = r = "start" === y[e].carousel.align ? 0 : "center" === y[e].carousel.align ? (t[t.wraplength] - t.arr[t.activeSlide][t.length]) / 2 : t[t.wraplength] - t.arr[t.activeSlide][t.length],
                t.infinity || "v" !== t.orientation || t.activeSlide != t.slideamount - 1 || (r = t[t.wraplength] - t.arr[t.activeSlide][t.length]),
                tpGS.gsap.set([t.proxy, t.follower], {
                    x: r,
                    y: r
                }),
                t.arr[0][t.length] * i);
                if (t.infinity) {
                    for (a = t.activeSlide; a < t.arr.length; a++)
                        a !== t.activeSlide && (n += t.space),
                        "h" === t.orientation ? tpGS.gsap.set(t.arr[a].elem, {
                            x: n + r + l
                        }) : tpGS.gsap.set(t.arr[a].elem, {
                            y: n + r + l
                        }),
                        t.arr[a].posX = n + r + l,
                        t.arr[a][t.translate] = n + r + l,
                        n += t.arr[a][t.length];
                    for (var d = r + l, a = t.activeSlide - 1; 0 <= a; a--)
                        d -= t.arr[a][t.length] + t.space,
                        t.arr[a].posX = d + l,
                        t.arr[a][t.translate] = d,
                        "h" === t.orientation ? tpGS.gsap.set(t.arr[a].elem, {
                            x: d
                        }) : tpGS.gsap.set(t.arr[a].elem, {
                            y: d
                        }),
                        n += t.arr[a][t.length] + t.space
                } else {
                    for (var c = 0, a = 0; a < t.arr.length; a++)
                        0 < a && (n += t.space),
                        a == t.activeSlide && (c += n),
                        t.arr[a].posX = n + r + l,
                        t.arr[a][t.translate] = n + r + l,
                        "h" === t.orientation ? tpGS.gsap.set(t.arr[a].elem, {
                            x: n + r + l
                        }) : tpGS.gsap.set(t.arr[a].elem, {
                            y: n + r + l
                        }),
                        n += t.arr[a][t.length];
                    tpGS.gsap.set([t.proxy, t.follower], {
                        x: r - c,
                        y: r - c
                    }),
                    "h" === t.orientation ? tpGS.gsap.set([y[e].slides], {
                        x: "-=" + c
                    }) : tpGS.gsap.set([y[e].slides], {
                        y: "-=" + c
                    });
                    for (a = 0; a < t.arr.length; a++)
                        t.arr[a].posX -= c,
                        t.arr[a][t.translate] -= c
                }
                t.startOffset = o,
                y.swapCarouselSlides(e, !0),
                t.infinity ? t.draggable.applyBounds({
                    minX: -1 / 0,
                    maxX: 1 / 0
                }) : !t.infinity && t.snap ? t.draggable.applyBounds({
                    minX: -(t.startOffset + n),
                    maxX: t.startOffset
                }) : t.infinity || t.snap || t.draggable.applyBounds({
                    minX: t.wrapwidth - n,
                    maxX: 0
                }),
                t.lastActiveSlide = t.activeSlide,
                t.totalWidth = n,
                t.lastTotalWidth = n,
                "off" !== t.spin && (o = t[t.slide_length] / 2,
                t.spinAngle = Math.max(Math.min(t.spinAngle, 360 / t.arr.length), -360 / t.arr.length),
                s = o / Math.sin(t.spinAngle / 2 * Math.PI / 180),
                t.spinR = (Math.sqrt(s * s - o * o) + t.space) * Math.sign(t.spinAngle),
                "2d" === t.spin && "h" === t.orientation ? t.spinR += (t.spinAngle <= 0 ? 0 : 1) * ("fullscreen" === y[e].sliderLayout ? t.wrapheight : t.slide_height) : "2d" === t.spin && (t.spinR += (t.spinAngle <= 0 ? 0 : 1) * ("fullscreen" === y[e].sliderLayout ? t.wrapwidth : t.slide_width)));
                for (a = 0; a < t.trackArr.length; a++)
                    for (var p = 0; p < t.arr.length; p++)
                        t.trackArr[a].elem === t.arr[p].elem && (t.trackArr[a].width = t.arr[p].width,
                        t.trackArr[a].height = t.arr[p].height);
                y.swapCarouselSlides(e, !0),
                y.applyDistanceEffect(e),
                y.swipeAnimate({
                    id: e,
                    from: "none"
                })
            }
        },
        updateSlideWidth: function(e, t) {
            var i = y[e].carousel;
            if (i.justify)
                for (var a = 0; a < y[e].slides.length; a++)
                    y[e].slides[a] === i.arr[t].elem && (i.arr[t][i.length] = i[i.slide_dims][a]);
            else
                i.arr[t][i.length] = i[i.slide_length]
        },
        swapCarouselSlides: function(e) {
            var t, i = y[e].carousel, a = !0;
            if (i.infinity && !(i.totalWidth < i[i.wraplength]))
                for (; a; ) {
                    var r, o, s = 0 < parseFloat(i.arr[0][i.translate]) || void 0 !== i.arr[0].progress && i.arr[0].progress <= i.maxVisibleItems / 2 && !(i.arr[i.arr.length - 1].progress <= i.maxVisibleItems / 2) && parseFloat(i.arr[i.arr.length - 1][i.translate]) >= i[i.wraplength], n = parseFloat(i.arr[i.arr.length - 1][i.translate]) < i[i.wraplength] - i.arr[i.arr.length - 1][i.length] || void 0 !== i.arr[i.arr.length - 1].progress && i.arr[i.arr.length - 1].progress <= i.maxVisibleItems / 2 && !(i.arr[0].progress <= i.maxVisibleItems / 2) && parseFloat(i.arr[0][i.translate]) + i.arr[0][i.length] <= 0;
                    s ? (r = parseFloat(i.arr[0][i.translate]) - i.space,
                    o = i.arr.pop(),
                    i.arr.unshift(o),
                    t === o && (a = !1),
                    t = o,
                    i.arr[0].posX = i.arr[0][i.translate] = r - i.arr[0][i.length],
                    y.getCarActiveSlide(e)) : n ? (r = parseFloat(i.arr[i.arr.length - 1][i.translate]) + i.space,
                    o = i.arr.shift(),
                    i.arr.push(o),
                    t === o && (a = !1),
                    t = o,
                    i.arr[i.arr.length - 1].posX = i.arr[i.arr.length - 1][i.translate] = r + i.arr[i.arr.length - 2][i.length],
                    y.getCarActiveSlide(e)) : a = !1
                }
        },
        onThrowComplete: function(e) {
            for (var t = y[e].carousel, i = ("carousel" !== y[e].sliderType || t.fadein || (tpGS.gsap.to(y[e].canvas, 1, {
                scale: 1,
                opacity: 1
            }),
            t.fadein = !0),
            y.getCarActiveSlide(e, !0),
            t.arr[t.activeSlide]), a = 0; a < y[e].slides.length; a++) {
                if (y[e].slides[a] === i.elem) {
                    if (t.focused = parseFloat(a),
                    y[e].pr_next_key = t.focused,
                    t.animInList.includes(t.oldfocused.toString()) || t.animInList.push(t.oldfocused.toString()),
                    "all" !== t.showLayersAllTime)
                        for (; 1 <= t.animInList.length; ) {
                            var r = t.animInList.pop();
                            t.focused != r && y.removeTheLayers(jQuery(y[e].slides[r]), e)
                        }
                    for (var o in y.callingNewSlide(e, y[e].slides[a].getAttribute("data-key"), !0, !0),
                    y[e].c.trigger("revolution.nextslide.waiting"),
                    w(e),
                    t.focused != t.oldfocused && "all" !== t.showLayersAllTime && (t.animInList.includes(t.focused.toString()) || t.animInList.push(t.focused.toString()),
                    y.animateTheLayers({
                        slide: t.focused,
                        id: e,
                        mode: "start"
                    }),
                    y.animateTheLayers({
                        slide: "individual",
                        id: e,
                        mode: y[e].carousel.allLayersStarted ? "rebuild" : "start"
                    })),
                    y[e].sbgs)
                        y[e].sbgs.hasOwnProperty(o) && void 0 !== y[e].sbgs[o].bgvid && 0 !== y[e].sbgs[o].bgvid.length && ("" + y[e].sbgs[o].skeyindex == "" + t.focused ? y.playBGVideo(e, y.gA(y[e].pr_next_slide[0], "key")) : y.stopBGVideo(e, y[e].sbgs[o].key));
                    t.oldfocused = t.focused
                }
                for (var s = y[e].slides[a].querySelectorAll(".rs-on-car"), n = 0; n < s.length; n++)
                    y[e].slides[a] !== i.elem && s[n].classList.contains("rs-layer-video") && y[e].videos[s[n].id].pauseOnSlideChange && y.stopVideo(jQuery(s[n]), e)
            }
            t.draggable[t.deltaT] = 0,
            y[e].c.trigger("restarttimer")
        },
        calculateSnap: function(e, t) {
            var i, a, r = y[e].carousel, o = (tpGS.gsap.killTweensOf(r.proxy, r.translate),
            "v" === r.orientation ? t - r.draggable.endY : t - r.draggable.endX), s = (Math.abs(o) < 3 && (o = 0),
            !0), n = "v" === r.orientation ? Math.abs(r.draggable.endY - r.draggable.startY) : Math.abs(r.draggable.endX - r.draggable.startX);
            r.focusedPreSnap = r.focused,
            r.snap ? (i = r.direction = 0 <= r.draggable[r.deltaT] ? "right" : "left",
            o = (i = y.getNextSlide(e, o, i, !0, n < 300)).delta,
            s = i.overshoot,
            r.target = i.target) : r.target = t,
            (r.infinity || r.snap) && (r.infinity || "v" !== r.orientation) || (r.target <= r[r.wraplength] - r.totalWidth ? r.target = r[r.wraplength] - r.totalWidth : 0 <= r.target && !r.snap && (r.target = 0)),
            r.swiped = !0,
            r.overshoot && s ? (tpGS.gsap.to(r, {
                duration: r.snap ? .3 : .5,
                lerpSpeed: .8
            }),
            s = Math.min(0 === r.draggable[r.deltaT] ? Math.abs(o) / 20 : Math.abs(r.draggable[r.deltaT]) / 2, r[r.wraplength] / 4) * Math.sign(o),
            a = Math.abs(s / 100),
            r.time = Math.min(Math.max(a / 10, r.speed / 1e3 * .6), r.speed / 1e3),
            r.tween = tpGS.gsap.timeline({
                onComplete: function() {
                    y.snapCompleted(e)
                }
            }),
            r.tween.to(r.proxy, {
                x: r.target + s,
                y: r.target + s,
                duration: r.time,
                ease: "power2.out"
            }).to(r.proxy, {
                x: r.target,
                y: r.target,
                duration: Math.min(2 * r.time, .6),
                ease: r.easing.replace(".inOut", ".out").replace(".in", ".out")
            }, "overshoot").to(r, {
                duration: Math.min(2 * r.time, .6),
                lerpSpeed: 1
            }, "overshoot")) : (a = Math.abs(o / 100),
            r.time = Math.min(Math.max(a / 10, r.speed / 1e3 * .6), r.speed / 1e3),
            r.tween = tpGS.gsap.to(r.proxy, {
                x: r.target,
                y: r.target,
                duration: r.time,
                ease: r.easing.replace(".inOut", ".out").replace(".in", ".out"),
                onComplete: function() {
                    y.snapCompleted(e)
                }
            }),
            tpGS.gsap.to(r, {
                duration: r.time,
                lerpSpeed: 1
            }))
        },
        carLerpHandler: function(e, t) {
            var i = y[e].carousel
              , t = ("skip" !== t && (i.lerp = requestAnimationFrame(i.lerpHandler)),
            parseFloat(i.proxy._gsap[i.translate]))
              , a = parseFloat(i.follower._gsap[i.translate])
              , t = a + (t - a) * i.lerpSpeed - a;
            "mousedrag" == y[e].parallax.type && (i.delta = t,
            i.lerpX = i.lerpX + (i.cX - i.lerpX) * i.lerpSpeed,
            i.lerpY = i.lerpY + (i.cY - i.lerpY) * i.lerpSpeed,
            y[e].parallax.frame = window.requestAnimationFrame(y[e].parallax.parallaxHandler)),
            tpGS.gsap.set(y[e].canvas, {
                skewX: i.skewX * Math.max(-1, Math.min(1, t / 100)),
                skewY: i.skewY * Math.max(-1, Math.min(1, t / 100))
            }),
            "h" === i.orientation ? (tpGS.gsap.set(i.follower, {
                x: "+=" + t
            }),
            tpGS.gsap.set(i.arr, {
                x: "+=" + t
            })) : (tpGS.gsap.set(i.follower, {
                y: "+=" + t
            }),
            tpGS.gsap.set(i.arr, {
                y: "+=" + t
            })),
            y.swapCarouselSlides(e),
            y.applyDistanceEffect(e)
        },
        snapCompleted: function(e) {
            var t = y[e].carousel;
            t.lerp = cancelAnimationFrame(t.lerp),
            t.scrollFrame = cancelAnimationFrame(t.scrollFrame),
            t.swiped = !1,
            tpGS.gsap.set(t.follower, {
                x: t.proxy._gsap[t.translate],
                y: t.proxy._gsap[t.translate]
            }),
            y.onThrowComplete(e)
        },
        applyDistanceEffect: function(e) {
            var t, i = y[e].carousel, a = 1 / 0, r = 0, o = 0, s = (void 0 === i.lastSlideProgress && (i.lastSlideProgress = 1),
            i.startOffset);
            for (t in i.startOffsetCache = i.startOffset,
            void 0 === i.tempAlign && (i.tempAlign = i.align),
            "v" !== i.orientation || i.infinity || i.justify || (s = i.startOffset + (i[i.wraplength] - i[i.slide_length] - i.startOffset) * (1 - i.lastSlideProgress)),
            i.arr) {
                var n = parseFloat(i.arr[t][i.translate]) - s;
                if (i.infinity && (n %= i.totalWidth),
                Math.abs(n) < a) {
                    for (var l = 0; l < y[e].slides.length; l++)
                        y[e].slides[l] === i.arr[t].elem && (o = l,
                        i.closestArr = t);
                    a = Math.abs(n)
                }
                i.arr[t].loaded && r++,
                i.infinity || i.snap || (0 === i.activeSlide ? n = parseFloat(i.arr[t][i.translate]) : i.activeSlide === i.arr.length - 1 && (n = parseFloat(i.arr[t][i.translate]) - (i[i.wraplength] - i.arr[t][i.length])));
                var d = Math.sign(n)
                  , c = i.arr[t].progress = Math.abs(n) / (i[i.slide_length] + i.space);
                if (i.arr[t].prog = n / (i[i.slide_length] + i.space),
                !i.justify && "mousedrag" === y[e].parallax.type)
                    for (l = 0; l < y[e].slides.length; l++)
                        y[e].slides[l] === i.arr[t].elem && (i.trackArr[l].progress = c);
                "v" !== i.orientation || i.infinity || t != i.slideamount - 1 || (c <= ("left" === i.direction ? .9 : .1) && !i.vertAlignBottom ? (tpGS.gsap.to(i, {
                    lastSlideProgress: 0,
                    duration: .2
                }),
                i.vertAlignDefault = !1,
                i.vertAlignBottom = !0,
                i.tempAlign = "end",
                b(e, "end")) : c > ("left" === i.direction ? .9 : .1) && !i.vertAlignDefault && (tpGS.gsap.to(i, {
                    lastSlideProgress: 1,
                    duration: .2
                }),
                i.vertAlignDefault = !0,
                i.vertAlignBottom = !1,
                i.tempAlign = i.align,
                b(e, i.align))),
                i.arr[t].sign = d;
                var p, g, n = i.arr[t].progress / Math.ceil(i.pDiv) * ("center" === i.tempAlign ? 1 : "start" === i.tempAlign ? d : -d), u = +Math.min(i.arr[t].progress, 1), h = 100 - 5 * Math.round(i.arr[t].progress), m = {};
                i.justify || "off" === i.spin ? 0 === i.minScale || i.justify ? m[i.translate] = i.arr[t][i.translate] : (p = 1 - (i.vary_scale ? n : u) * (1 - i.minScale),
                g = i.offsetScale ? i.arr[t].sign * (i[i.slide_length] + i.space - (i[i.slide_length] + i.space) * p) / 2 * i.arr[t].progress : i.arr[t].sign * (i[i.slide_length] - i[i.slide_length] * p) / 2 * i.arr[t].progress,
                m[i.translate] = i.arr[t][i.translate] - g,
                window.isSafari11 && (m.z = -150 * (1 - p)),
                m.scale = p) : (m[i.translate] = s,
                "2d" === i.spin ? (m.rotation = i.spinAngle * c * ("h" === i.orientation ? d : -d),
                "h" === i.orientation ? m.transformOrigin = "center " + i.spinR + "px 0" : m.transformOrigin = i.spinR + "px center 0") : ("h" === i.orientation ? m.rotationY = i.spinAngle * i.arr[t].progress * -d : m.rotationX = i.spinAngle * i.arr[t].progress * d,
                m.transformOrigin = "center center " + i.spinR + "px")),
                m.opacity = 1,
                i.justify || (0 !== i.maxRotation && (m.rotationY = i.maxRotation * (i.vary_rotation ? n : u) * -d),
                m.opacity = 1 + (i.maxOpacity - 1) * (i.vary_fade ? n : u),
                n > i.edgeRatio ? m.opacity = i.oRange(n) : n < 0 ? m.opacity = i.oRangeMin(n) : 1 === i.maxOpacity && (m.opacity = 1)),
                m.zIndex = h,
                0 < m.opacity ? ("visible" !== i.arr[t].elem.style.visibility && (m.visibility = "visible"),
                tpGS.gsap.set(i.arr[t].elem, m)) : ("hidden" !== i.arr[t].elem.style.visibility && (m.visibility = "hidden"),
                tpGS.gsap.set(i.arr[t].elem, {
                    visibility: m.visibility,
                    opacity: m.opacity
                }))
            }
            if (o !== i.closest) {
                if (i.closest = o,
                r !== i.arr.length && y.loadVisibleCarouselItems(e, !0, i.closest),
                i.draggable.isPressed) {
                    if (i.focused = i.closest,
                    y[e].pr_next_key = i.focused,
                    i.oldfocused = void 0 === i.oldfocused ? 0 : i.oldfocused,
                    y[e].carousel.allLayersStarted ? y.updateCarouselRows(e) : y.carouselRowAdjustment(i, e, i.focused),
                    "all" !== i.showLayersAllTime)
                        for (i.animInList.includes(i.oldfocused.toString()) || i.animInList.push(i.oldfocused.toString()); 1 <= i.animInList.length; ) {
                            var v = i.animInList.pop();
                            i.focused != v && y.removeTheLayers(jQuery(y[e].slides[v]), e)
                        }
                    i.focused != i.oldfocused && ("all" !== i.showLayersAllTime && (i.animInList.includes(i.focused.toString()) || i.animInList.push(i.focused.toString()),
                    y.animateTheLayers({
                        slide: i.focused,
                        id: e,
                        mode: "start"
                    }),
                    y.animateTheLayers({
                        slide: "individual",
                        id: e,
                        mode: y[e].carousel.allLayersStarted ? "rebuild" : "start"
                    })),
                    w(e, !0),
                    i.oldfocused = i.focused),
                    y[e].c.trigger("revolution.nextslide.waiting")
                }
                for (var f in y[e].sbgs)
                    y[e].sbgs.hasOwnProperty(f) && void 0 !== y[e].sbgs[f].bgvid && 0 !== y[e].sbgs[f].bgvid.length && "" + y[e].sbgs[f].skeyindex != "" + i.focused && y.stopBGVideo(e, y[e].sbgs[f].key)
            }
        },
        getCarActiveSlide: function(e) {
            var t, i, a, r = y[e].carousel, o = 999999, s = 0;
            for (i in r.arr)
                r.arr.hasOwnProperty(i) && (a = "center" === y[e].carousel.align ? Math.abs(parseFloat(r.arr[i][r.translate]) - (r[r.wraplength] - r.arr[i][r.length]) / 2) : "start" === y[e].carousel.align ? Math.abs(parseFloat(r.arr[i][r.translate])) : Math.abs(parseFloat(r.arr[i][r.translate]) - (r[r.wraplength] - r.arr[i][r.length])),
                (a = r.vertAlignBottom ? Math.abs(parseFloat(r.arr[i][r.translate]) - (r[r.wraplength] - r.arr[i][r.length])) : a) < o) && (t = r.arr[i],
                o = a,
                s = i);
            return s = parseInt(s),
            r.activeSlide = s,
            t
        },
        loadVisibleCarouselItems: function(e, t, i) {
            var a = y[e].carousel
              , r = []
              , o = i ? a.closest : a.focused;
            a.focused = parseInt(o, 0),
            a.focused = y.isNumeric(o) ? o : 0;
            for (var s = 0; s < Math.ceil(y[e].carousel.maxVisibleItems / 2); s++) {
                var n = "end" === y[e].carousel.align ? o - s : o + s
                  , l = "center" === y[e].carousel.align ? o - s : "start" === y[e].carousel.align ? y[e].carousel.maxVisibleItems + n - 1 : n - y[e].carousel.maxVisibleItems + 1
                  , n = n >= y[e].slideamount ? n - y[e].slideamount + 0 : n
                  , l = l >= y[e].slideamount ? l - y[e].slideamount + 0 : l;
                if (n = n < 0 ? y[e].slideamount + n : n,
                l = l < 0 ? y[e].slideamount + l : l,
                r.push(y[e].slides[n]),
                n !== l && r.push(y[e].slides[l]),
                a.arr)
                    for (var d = 0; d < a.arr.length; d++)
                        y[e].slides[n] === a.arr[d].elem && (a.arr[d].loaded = !0),
                        y[e].slides[l] === a.arr[d].elem && (a.arr[d].loaded = !0)
            }
            return t && (y.loadImages(r, e, 1),
            y.waitForCurrentImages(r, e)),
            r
        },
        organiseCarousel: function(e, t, i, a, r) {
            var o = y[e].carousel;
            if (y[e].slides)
                for (var s = 0; s < y[e].slides.length; s++) {
                    var n = {
                        width: !0 === o.justify ? o.slide_widths[s] : o.slide_width
                    };
                    "off" === o.spin && (n.transformOrigin = "50% " + ("h" === o.orientation ? o.vertical_align : "center")),
                    n.force3D = !0,
                    n.transformStyle = "3D" != y[e].parallax.type && "3d" != y[e].parallax.type ? "flat" : "preserve-3d",
                    !0 !== r && tpGS.gsap.set(y[e].slides[s], n)
                }
        },
        updateCarouselRows: function(e) {
            if ("carousel" === y[e].sliderType)
                for (var t = 0; t < y[e].slideamount; t++)
                    y.carouselRowAdjustment(y[e].carousel, e, t)
        },
        carouselRowAdjustment: function(e, t, i) {
            void 0 !== e.slidesWithRowAdjustions && void 0 === e.slidesWithRowAdjustions[i] && (e.slidesWithRowAdjustions[i] = !0,
            y.getRowHeights(t, i),
            y.putMiddleZoneInPosition(t, i))
        },
        getNextSlide: function(e, t, i, a, r) {
            var o, s = y[e].carousel, n = 0, l = !1, d = t, c = t;
            if (void 0 === s.trackIndex) {
                for (var p = 0; p < s.trackArr.length; p++)
                    if (s.arr[s.activeSlide].elem === s.trackArr[p].elem) {
                        o = p;
                        break
                    }
            } else
                o = s.trackIndex;
            void 0 === i && (l = !0);
            for (var g = !1; (s.snap || !a) && !l; ) {
                if (g || a && Math.abs(n) >= Math.abs(t) || void 0 === t && y[e].slides[s.focused] === s.trackArr[o].elem) {
                    t = n;
                    break
                }
                var d = n
                  , u = y.getNext(e, i, n, o, void 0 === a);
                (g = u.breakLoop) || (n = u.tempDelta,
                o = u.trackIndex)
            }
            var h = s.lastPos + t;
            return a && s.focusedOnPress != s.focusedPreSnap && (h = Math.abs(c + s.lastPos - h) <= Math.abs(c + s.lastPos - (d + s.lastPos)) ? h : d + s.lastPos),
            l && (h = s.lastPos,
            t = -s.arr[s.closestArr][s.translate]),
            {
                target: h,
                overshoot: !0,
                delta: t,
                trackIndex: o
            }
        },
        getNext: function(e, t, i, a, r) {
            var e = y[e].carousel
              , o = "right" === t ? 1 : -1
              , s = !1;
            return "start" === e.align && "left" === t ? i += (e.trackArr[a][e.length] + e.space) * o : "center" === e.align ? i += (e.trackArr[a][e.length] + e.space) / 2 * o : "end" === e.align && "right" === t && (i += (e.trackArr[a][e.length] + e.space) * o),
            "right" === t ? --a < 0 && (a = e.infinity ? e.trackArr.length - 1 : a + 1,
            e.infinity || (s = !0)) : ++a >= e.trackArr.length && (a = e.infinity ? 0 : a - 1,
            e.infinity || (s = !0)),
            s || ("start" === e.align && "right" === t && (i += (e.trackArr[a][e.length] + e.space) * o),
            "center" === e.align ? i += (e.trackArr[a][e.length] + e.space) / 2 * o : "end" === e.align && "left" === t && (i += (e.trackArr[a][e.length] + e.space) * o)),
            {
                tempDelta: i,
                trackIndex: a,
                breakLoop: s
            }
        },
        getCarDir: function(e, t, i) {
            var a = y[e].carousel
              , e = i - t
              , r = "right"
              , o = (a.sameSlide = !1,
            0)
              , s = 0;
            if (a.infinity) {
                for (var n = t; n != i; )
                    s += 1,
                    n = ++n >= a.slideamount ? 0 : n;
                for (n = t; n != i; )
                    o += 1,
                    n = --n < 0 ? a.slideamount - 1 : n;
                r = s <= o ? "left" : "right"
            } else
                a.infinity || (r = 0 <= i - t ? "left" : "right",
                s = Math.abs(i - t),
                0 == e && (r = "right",
                a.sameSlide = !0));
            return a.steps = s <= o ? s : o,
            a.direction = r
        },
        getLastPos: function(e) {
            var t = y[e].carousel;
            if (t.trackArr) {
                for (var i = 0, a = 0, r = 0; r < t.trackArr.length; r++)
                    y[e].slides[t.closest] === t.trackArr[r].elem && (t.trackIndex = r),
                    y[e].slides[t.closest] === t.arr[r].elem && (i = t.arr[r][t.translate],
                    "center" === t.align && (a = (t[t.wraplength] - t.arr[r][t.length]) / 2),
                    "end" === t.align && (a = t[t.wraplength] - t.arr[r][t.length]),
                    t.lastOffset = a);
                t.lastPos = parseFloat(t.proxy._gsap[t.translate]) - i - (parseFloat(t.proxy._gsap[t.translate]) - parseFloat(t.follower._gsap[t.translate])),
                t.lastPos += a
            }
        },
        swipeAnimate: function(e) {
            var t, i = y[e.id].carousel, a = e.id;
            y.getLastPos(a),
            i.arr && i.arr[i.closestArr] && (i.arr[i.closestArr].elem == y[e.id].slides[i.focused] || (t = y.getCarDir(a, i.trackIndex, i.focused),
            e = y.getNextSlide(e.id, void 0, t, !1),
            i.target = e.target,
            (i.infinity || i.snap) && (i.infinity || "v" !== i.orientation) || (i.target <= i[i.wraplength] - i.totalWidth ? i.target = i[i.wraplength] - i.totalWidth : 0 <= i.target && !i.snap && (i.target = 0)),
            i.lerpSpeed = 1,
            i.fromWheel = !1,
            i.tween && i.tween.kill && (i.tween.kill(),
            delete i.tween),
            i.tween = tpGS.gsap.to(i.proxy, {
                x: i.target,
                y: i.target,
                ease: i.easing,
                duration: i.speed / 1e3 + (2 <= i.steps ? (i.steps - 1) * i.speed / 2e3 : 0),
                onComplete: function() {
                    i.lerp = cancelAnimationFrame(i.lerp),
                    i.scrollFrame = cancelAnimationFrame(i.scrollFrame),
                    y.carLerpHandler(a, "skip"),
                    i.activeSlide = i.closestArr,
                    y.snapCompleted(a)
                }
            }),
            i.lerp = cancelAnimationFrame(i.lerp),
            i.scrollFrame = cancelAnimationFrame(i.scrollFrame),
            i.lerp) || (i.lerp = requestAnimationFrame(i.lerpHandler)))
        },
        carScrollTicker: function(e) {
            var t = y[e].carousel
              , i = (t.scrollFrame = requestAnimationFrame(t.scrollTicker),
            parseFloat(t.proxy._gsap[t.translate]))
              , a = i + .5 * (t.scrollProxy - i)
              , i = a - i;
            tpGS.gsap.set(t.proxy, {
                [t.translate]: a
            }),
            Math.abs(i) < .03 && (t.scrollFrame = cancelAnimationFrame(t.scrollFrame),
            t.lerp = cancelAnimationFrame(t.lerp),
            t.activeSlide = t.closestArr,
            y.snapCompleted(e))
        },
        scrollCar: function(e, t, i) {
            var a = y[e].carousel
              , r = (a.scrollFrame = cancelAnimationFrame(a.scrollFrame),
            a.lerp = cancelAnimationFrame(a.lerp),
            tpGS.gsap.to(a, {
                lerpSpeed: 1
            }),
            a.fromWheel = !0,
            Math.round(parseFloat(a.proxy._gsap[a.translate])));
            a.tween && a.tween.kill && (a.tween.kill(),
            delete a.tween),
            1 == i && a.focused == a.slideamount - 1 && r <= a[a.wraplength] - a.totalWidth && !a.infinity || -1 == i && 0 == a.focused && 0 <= r && !a.infinity ? (i = 1 == i ? y[e].cpar.offset().top + y[e].module.height : y.document.scrollTop() - (window.innerHeight - y[e].cpar[0].getBoundingClientRect().top),
            y[e].modal.useAsModal || tpGS.gsap.to([window, "body"], {
                scrollTo: i
            })) : (e = r + -8 * t,
            (a.infinity || a.snap) && (a.infinity || "v" !== a.orientation) || (e <= a[a.wraplength] - a.totalWidth ? e = a[a.wraplength] - a.totalWidth : 0 <= e && !a.snap && (e = 0)),
            a.tween = tpGS.gsap.to(a, {
                scrollProxy: e,
                duration: .5,
                ease: a.easing
            }),
            a.scrollFrame = requestAnimationFrame(a.scrollTicker),
            a.lerp || (a.lerp = requestAnimationFrame(a.lerpHandler)))
        },
        defineCarouselElements: function(e) {
            var t = y[e].carousel;
            t.infbackup = t.infinity,
            t.maxVisiblebackup = t.maxVisibleItems,
            t.slide_offset = "none",
            t.slide_offset = 0,
            t.cached_slide_offset = 0,
            t.wrap = jQuery(y[e].canvas[0].parentNode),
            0 === t.maxRotation || "3D" !== y[e].parallax.type && "3d" !== y[e].parallax.type || tpGS.gsap.set(t.wrap, {
                perspective: "1600px",
                transformStyle: "preserve-3d"
            })
        },
        setCarouselDefaults: function(e, t, i) {
            var a, r, o = y[e].carousel;
            if (o.stretchCache = void 0 === o.stretchCache ? o.stretch : o.stretchCache,
            o.stretch = !!y[e].infullscreenmode || o.stretchCache,
            o.slide_width = Math.round(!0 !== o.stretch && "v" !== o.orientation ? y[e].gridwidth[y[e].level] * (0 === y[e].CM.w ? 1 : y[e].CM.w) : y[e].canv.width),
            o.slide_height = Math.round(!0 !== o.stretch ? y[e].infullscreenmode ? y.getWinH(e) - y.getFullscreenOffsets(e) : y[e].gridheight[y[e].level] * (0 === y[e].CM.w ? 1 : y[e].CM.w) : y[e].canv.height),
            o.ratio = o.slide_width / o.slide_height,
            o.len = y[e].slides.length,
            o.maxwidth = y[e].slideamount * o.slide_width,
            o.maxheight = y[e].slideamount * o.slide_height,
            1 != o.justify && o.maxVisiblebackup > o.len && (o.maxVisibleItems = o.len % 2 ? o.len : o.len + 1),
            o.wrapwidth = o.maxVisibleItems * o.slide_width + (o.maxVisibleItems - 1) * o.space,
            o.wrapheight = o.maxVisibleItems * o.slide_height + (o.maxVisibleItems - 1) * o.space,
            o.wrapwidth = "auto" != y[e].sliderLayout ? o.wrapwidth > y[e].canv.width ? y[e].canv.width : o.wrapwidth : o.wrapwidth > y[e].module.width ? (0 !== y[e].module.width ? y[e].module : y[e].canv).width : o.wrapwidth,
            o.wrapheight = "auto" != y[e].sliderLayout ? o.wrapheight > y[e].canv.height ? y[e].canv.height : o.wrapheight : o.wrapheight > y[e].module.height ? (0 !== y[e].module.height ? y[e].module : y[e].canv).height : o.wrapheight,
            !0 === o.justify) {
                o.slide_height = Math.round("fullscreen" === y[e].sliderLayout ? y[e].module.height : y[e].gridheight[y[e].level]),
                o.slide_widths = [],
                o.slide_heights = [],
                o.slide_widthsCache = void 0 === o.slide_widthsCache ? [] : o.slide_widthsCache,
                o.slide_heightsCache = void 0 === o.slide_heightsCache ? [] : o.slide_heightsCache;
                for (var s, n = o.maxwidth = 0; n < o.len; n++)
                    y[e].slides.hasOwnProperty(n) && (s = void 0 === (s = y.gA(y[e].slides[n], "iratio")) || 0 === s || null === s ? o.ratio : s,
                    s = parseFloat(s),
                    o.slide_widths[n] = Math.round(o.slide_height * s),
                    o.slide_heights[n] = Math.round(o.slide_height),
                    !1 !== o.justifyMaxWidth && (o.slide_widths[n] = Math.min(o.wrapwidth, o.slide_widths[n])),
                    !1 !== o.justifyMaxWidth && (o.slide_heights[n] = Math.min(o.wrapheight, o.slide_heights[n])),
                    o.slide_widths[n] !== o.slide_widthsCache[n] && (o.slide_widthsCache[n] = o.slide_widths[n],
                    !0 !== t) && tpGS.gsap.set(y[e].slides[n], {
                        width: o.slide_widths[n]
                    }),
                    o.slide_heights[n] !== o.slide_heightsCache[n] && (o.slide_heightsCache[n] = o.slide_heights[n],
                    !0 !== t) && tpGS.gsap.set(y[e].slides[n], {
                        height: o.slide_heights[n]
                    }),
                    o.maxwidth += o.slide_widths[n] + o.space,
                    o.maxheight += o.slide_heights[n] + o.space)
            }
            o.infinity = !(o.wrapwidth >= o.maxwidth) && o.infbackup,
            o.forceBAlign && o.slide_height < .6 * o.wrapheight && o.wrapwidth < o.maxwidth ? o.infinity = !0 : o.forceBAlign && (o.infinity = !1),
            !0 !== o.quickmode && (o.wrapoffset = "center" === o.horizontal_align ? (y[e].canv.width - y[e].outNavDims.right - y[e].outNavDims.left - o.wrapwidth) / 2 : 0,
            o.wrapoffset = "auto" != y[e].sliderLayout && y[e].outernav ? 0 : o.wrapoffset < y[e].outNavDims.left ? y[e].outNavDims.left : o.wrapoffset,
            a = "3D" == y[e].parallax.type || "3d" == y[e].parallax.type ? "visible" : "hidden",
            r = "right" === o.horizontal_align ? {
                left: "auto",
                right: o.wrapoffset + "px",
                width: o.wrapwidth,
                overflow: a
            } : "left" === o.horizontal_align || o.wrapwidth < y.winW ? {
                right: "auto",
                left: o.wrapoffset + "px",
                width: o.wrapwidth,
                overflow: a
            } : {
                right: "auto",
                left: "auto",
                width: "100%",
                overflow: a
            },
            void 0 !== o.cacheWrapObj && r.left === o.cacheWrapObj.left && r.right === o.cacheWrapObj.right && r.width === o.cacheWrapObj.width || (window.requestAnimationFrame(function() {
                tpGS.gsap.set(o.wrap, r),
                0 < y[e].carousel.wrapoffset && tpGS.gsap.set(y[e].canvas, {
                    left: 0
                })
            }),
            o.cacheWrapObj = jQuery.extend(!0, {}, r)),
            o.inneroffset = "right" === o.horizontal_align ? o.wrapwidth - o.slide_width : 0,
            o.windhalf = "auto" === y[e].sliderLayout ? y[e].module.width / 2 : y.winW / 2),
            o.lastWrapwidth === o.wrapwidth && o.lastWrapheight === o.wrapheight || window.requestAnimationFrame(function() {
                y.positionCarousel(e)
            })
        }
    }),
    function(e, t) {
        var i = y[e].carousel
          , t = t && y[e].slides[y[e].pr_next_key] ? jQuery(y[e].slides[y[e].pr_next_key]) : y[e].pr_next_slide;
        y[e].c.trigger("revolution.slide.carouselchange", {
            slider: e,
            slideIndex: parseInt(y[e].pr_active_key, 0) + 1,
            slideLIIndex: y[e].pr_active_key,
            slide: t,
            currentslide: t,
            prevSlideIndex: void 0 !== y[e].pr_lastshown_key && parseInt(y[e].pr_lastshown_key, 0) + 1,
            prevSlideLIIndex: void 0 !== y[e].pr_lastshown_key && parseInt(y[e].pr_lastshown_key, 0),
            prevSlide: void 0 !== i.oldfocused && y[e].slides[i.oldfocused]
        })
    }
    )
      , b = function(e, t) {
        var i = y[e].carousel;
        void 0 !== e && void 0 !== i && (i.pDiv = "center" === t ? i.maxVisibleItems / 2 : i.maxVisibleItems,
        i.edgeRatio = Math.floor(i.pDiv - ("center" === t ? 0 : 1)) / Math.ceil(i.pDiv),
        1 === i.maxVisibleItems && (i.edgeRatio = 1),
        i.oEdge = 1 === i.maxOpacity ? 1 : i.vary_fade ? 1 + (i.maxOpacity - 1) * i.edgeRatio : i.maxOpacity,
        i.oEdge = 1 === i.maxVisibleItems ? i.maxOpacity : i.oEdge,
        i.oRange = 1 < i.maxVisibleItems ? tpGS.gsap.utils.mapRange(i.edgeRatio, 1, i.oEdge, 0) : tpGS.gsap.utils.mapRange(1, 1.1, i.oEdge, 0),
        i.oRangeMin = tpGS.gsap.utils.mapRange(-1 / i.maxVisibleItems, -1.1 / i.maxVisibleItems, 1, 0))
    }
      , g = function(e) {
        var t = y[e].carousel;
        if (void 0 !== e && void 0 !== t) {
            tpGS.gsap.set([t.proxy, t.follower], {
                x: "+=0",
                y: "+=0"
            }),
            t.arr = [],
            t.trackArr = [];
            for (var i = 0; i < y[e].slides.length; i++)
                t.arr.push({
                    elem: y[e].slides[i]
                }),
                t.trackArr.push({
                    elem: y[e].slides[i]
                })
        }
    }
      , o = function(e, t) {
        return null === e || jQuery.isEmptyObject(e) ? t : void 0 === e ? "right" : e
    };
    window.RS_MODULES = window.RS_MODULES || {},
    window.RS_MODULES.carousel = {
        loaded: !0,
        version: "6.6.16"
    },
    window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal()
}(jQuery),
!function() {
    "use strict";
    function h(e) {
        var t;
        return void 0 === e ? "" : (t = "",
        q.isChrome8889 && 0 === e.b_blur && (e.b_blur = .05),
        t = void 0 !== e.b_blur ? "blur(" + (e.b_blur || 0) + "px)" : "",
        (t = (t = (t = (t += void 0 !== e.b_grayscale ? (0 < t.length ? " " : "") + "grayscale(" + (e.b_grayscale || 0) + "%)" : "") + (void 0 !== e.b_sepia ? (0 < t.length ? " " : "") + "sepia(" + (e.b_sepia || 0) + "%)" : "")) + (void 0 !== e.b_invert ? (0 < t.length ? " " : "") + "invert(" + (e.b_invert || 0) + "%)" : "")) + (void 0 !== e.b_brightness ? (0 < t.length ? " " : "") + "brightness(" + (e.b_brightness || 100) + "%)" : "")) || "none")
    }
    function m(e, t, i, a, r) {
        return 0 === q[r].sdir || void 0 === t || ("mask" === i ? a = "x" === a ? "mX" : "y" === a ? "mY" : a : "chars" === i ? a = "x" === a ? "cX" : "y" === a ? "cY" : "dir" === a ? "cD" : a : "words" === i ? a = "x" === a ? "wX" : "y" === a ? "wY" : "dir" === a ? "wD" : a : "lines" === i && (a = "x" === a ? "lX" : "y" === a ? "lY" : "dir" === a ? "lD" : a),
        void 0 === t[a]) || !1 === t[a] ? e : void 0 !== t && !0 === t[a] ? "t" === e || "top" === e ? "b" : "b" === e || "bottom" === e ? "t" : "l" === e || "left" === e ? "r" : "r" === e || "right" === e ? "l" : -1 * parseFloat(e) + (0 <= ("" + e).indexOf("px") ? "px" : 0 <= ("" + e).indexOf("%") ? "%" : "") : void 0
    }
    function d(e, t, i, a, r) {
        var o, s, n, l = {}, d = {}, c = {};
        for (n in a = void 0 === a ? "transform" : a,
        "loop" === r ? (c.autoRotate = !1,
        c.yoyo_filter = !1,
        c.yoyo_rotate = !1,
        c.yoyo_move = !1,
        c.yoyo_scale = !1,
        c.curved = !1,
        c.curviness = 2,
        c.ease = "none",
        c.speed = 1e3,
        l.x = c.st = 0,
        l.y = 0,
        l.z = 0,
        l.xr = 0,
        l.yr = 0,
        l.zr = 0,
        l.scaleX = 1,
        l.scaleY = 1,
        l.originX = "50%",
        l.originY = "50%",
        l.originZ = "0",
        l.rotationX = "0deg",
        l.rotationY = "0deg",
        l.rotationZ = "0deg") : (c.speed = 300,
        i ? c.ease = "default" : l.ease = "default"),
        "sfx" === r && (l.fxc = "#ffffff"),
        e = e.split(";"))
            if (e.hasOwnProperty(n)) {
                var p = e[n].split(":");
                switch (p[0]) {
                case "u":
                    l.use = "true" === p[1] || "t" === p[1] || fasle;
                    break;
                case "c":
                    o = p[1];
                    break;
                case "fxc":
                    l.fxc = p[1];
                    break;
                case "bgc":
                    s = p[1];
                    break;
                case "auto":
                    l.auto = "t" === p[1] || void 0 === p[1] || "true" === p[1];
                    break;
                case "o":
                    l.opacity = p[1];
                    break;
                case "oX":
                    l.originX = p[1];
                    break;
                case "oY":
                    l.originY = p[1];
                    break;
                case "oZ":
                    l.originZ = p[1];
                    break;
                case "sX":
                    l.scaleX = p[1];
                    break;
                case "sY":
                    l.scaleY = p[1];
                    break;
                case "skX":
                    l.skewX = p[1];
                    break;
                case "skY":
                    l.skewY = p[1];
                    break;
                case "rX":
                    l.rotationX = p[1],
                    0 != p[1] && "0deg" !== p[1] && q.addSafariFix(t);
                    break;
                case "rY":
                    l.rotationY = p[1],
                    0 != p[1] && "0deg" !== p[1] && q.addSafariFix(t);
                    break;
                case "rZ":
                    l.rotationZ = p[1];
                    break;
                case "sc":
                    l.color = p[1];
                    break;
                case "se":
                    l.effect = p[1];
                    break;
                case "bos":
                    l.borderStyle = p[1];
                    break;
                case "boc":
                    l.borderColor = p[1];
                    break;
                case "td":
                    l.textDecoration = p[1];
                    break;
                case "zI":
                    l.zIndex = p[1];
                    break;
                case "tp":
                    l.transformPerspective = "isometric" === q[t].perspectiveType ? 0 : "global" === q[t].perspectiveType ? q[t].perspective : p[1];
                    break;
                case "cp":
                    l.clip = parseInt(p[1], 0);
                    break;
                case "cpb":
                    l.clipB = parseInt(p[1], 0);
                    break;
                case "aR":
                    c.autoRotate = "t" == p[1];
                    break;
                case "rA":
                    c.radiusAngle = p[1];
                    break;
                case "yyf":
                    c.yoyo_filter = "t" == p[1];
                    break;
                case "yym":
                    c.yoyo_move = "t" == p[1];
                    break;
                case "yyr":
                    c.yoyo_rotate = "t" == p[1];
                    break;
                case "yys":
                    c.yoyo_scale = "t" == p[1];
                    break;
                case "crd":
                    c.curved = "t" == p[1];
                    break;
                case "x":
                    l.x = "reverse" === r ? "t" === p[1] || !0 === p[1] || "true" == p[1] : "loop" === r ? parseInt(p[1], 0) : q.revToResp(p[1], q[t].rle);
                    break;
                case "y":
                    l.y = "reverse" === r ? "t" === p[1] || !0 === p[1] || "true" == p[1] : "loop" === r ? parseInt(p[1], 0) : q.revToResp(p[1], q[t].rle);
                    break;
                case "z":
                    l.z = "loop" === r ? parseInt(p[1], 0) : q.revToResp(p[1], q[t].rle),
                    0 != p[1] && q.addSafariFix(t);
                    break;
                case "bow":
                    l.borderWidth = q.revToResp(p[1], 4, 0).toString().replace(/,/g, " ");
                    break;
                case "bor":
                    l.borderRadius = q.revToResp(p[1], 4, 0).toString().replace(/,/g, " ");
                    break;
                case "m":
                    l.mask = "t" === p[1] || "f" !== p[1] && p[1];
                    break;
                case "iC":
                    l.instantClick = "t" === p[1] || "f" !== p[1] && p[1];
                    break;
                case "xR":
                    l.xr = parseInt(p[1], 0),
                    q.addSafariFix(t);
                    break;
                case "yR":
                    l.yr = parseInt(p[1], 0),
                    q.addSafariFix(t);
                    break;
                case "zR":
                    l.zr = parseInt(p[1], 0);
                    break;
                case "iosfx":
                    "default" !== p[1] && "d" !== p[1] && "p" !== p[1] && (d.iosfx = p[1]);
                    break;
                case "blu":
                    "loop" === r ? l.blur = parseInt(p[1], 0) : d.blur = parseInt(p[1], 0);
                    break;
                case "gra":
                    "loop" === r ? l.grayscale = parseInt(p[1], 0) : d.grayscale = parseInt(p[1], 0);
                    break;
                case "bri":
                    "loop" === r ? l.brightness = parseInt(p[1], 0) : d.brightness = parseInt(p[1], 0);
                    break;
                case "bB":
                    d.b_blur = parseInt(p[1], 0);
                    break;
                case "bG":
                    d.b_grayscale = parseInt(p[1], 0);
                    break;
                case "bR":
                    d.b_brightness = parseInt(p[1], 0);
                    break;
                case "bI":
                    d.b_invert = parseInt(p[1], 0);
                    break;
                case "bS":
                    d.b_sepia = parseInt(p[1], 0);
                    break;
                case "sp":
                    c.speed = parseInt(p[1], 0);
                    break;
                case "d":
                    l.delay = parseInt(p[1], 0);
                    break;
                case "crns":
                    c.curviness = parseInt(p[1], 0);
                    break;
                case "st":
                    c.start = "w" === p[1] || "a" === p[1] ? "+=0" : p[1],
                    c.waitoncall = "w" === p[1] || "a" === p[1];
                    break;
                case "sA":
                    c.startAbsolute = p[1];
                    break;
                case "sR":
                    c.startRelative = p[1];
                    break;
                case "e":
                    i ? c.ease = p[1] : l.ease = p[1];
                    break;
                default:
                    0 < p[0].length && (l[p[0]] = "t" === p[1] || "f" !== p[1] && p[1])
                }
            }
        var g = {
            timeline: c
        };
        return jQuery.isEmptyObject(d) || ("split" === r ? l = jQuery.extend(!0, l, d) : g.filter = d),
        "split" === r && (l.dir = void 0 === l.dir ? "start" : "backward" === l.dir ? "end" : "middletoedge" === l.dir ? "center" : "edgetomiddle" === l.dir ? "edge" : l.dir),
        jQuery.isEmptyObject(o) || (g.color = o),
        jQuery.isEmptyObject(s) || (g.bgcolor = s),
        g[a] = l,
        g
    }
    function p(e) {
        return void 0 !== e && (void 0 !== e.rotationY || void 0 !== e.rotationX || void 0 !== e.z)
    }
    function c(e) {
        return "thin" === (e = q.isNumeric(e) ? e : e.toLowerCase()) ? "00" : "extra light" === e ? 200 : "light" === e ? 300 : "normal" === e ? 400 : "medium" === e ? 500 : "semi bold" === e ? 600 : "bold" === e ? 700 : "extra bold" === e ? 800 : "ultra bold" === e || "black" === e ? 900 : e
    }
    function k(e, t, i, a, r) {
        var o = q.isNumeric(e) || void 0 === e ? "" : 0 <= e.indexOf("px") ? "px" : 0 <= e.indexOf("%") ? "%" : "";
        return e = q.isNumeric(parseInt(e)) ? parseInt(e) : e,
        e = null == (e = "full" === (e = q.isNumeric(e) ? e * t + o : e) ? a : "auto" === e || "none" === e ? i : e) ? r : e
    }
    function L(e) {
        return null != e && 0 !== parseInt(e, 0)
    }
    var Y = ["chars", "words", "lines"]
      , O = ["Top", "Right", "Bottom", "Left"]
      , R = ["TopLeft", "TopRight", "BottomRight", "BottomLeft"]
      , I = ["top", "right", "bottom", "left"]
      , q = (jQuery.fn.revolution = jQuery.fn.revolution || {},
    jQuery.fn.revolution)
      , Q = (jQuery.extend(!0, q, {
        checkLayerDimensions: function(e) {
            var t, i, a, r = !1;
            for (t in q[e.id].layers[e.skey])
                q[e.id].layers[e.skey].hasOwnProperty(t) && (i = q[e.id].layers[e.skey][t],
                (a = q[e.id]._L[i.id]).eow !== i.offsetWidth && "true" !== q.gA(i, "vary-layer-dims") && (r = !0),
                a.lastknownwidth = a.eow,
                a.lastknownheight = a.eoh,
                a._slidelink || q[e.id].caches.calcResponsiveLayersList.push({
                    a: q[e.id]._L[i.id].c,
                    b: e.id,
                    c: 0,
                    d: a.rsp_bd,
                    e: e.slideIndex
                }));
            return r
        },
        requestLayerUpdates: function(e, t, i, a) {
            var r, o, s, n;
            if (void 0 !== i)
                q[e]._L[r = i].pVisRequest !== q[e]._L[r].pVisStatus && (o = void 0 === q[e]._L[r]._ligid || null == q[e]._L[q[e]._L[r]._ligid] || !0 !== q[e]._L[q[e]._L[r]._ligid].childrenAtStartNotVisible ? (q[e]._L[r].pVisStatus = q[e]._L[r].pVisRequest,
                n = ("row" === q[e]._L[r].type || "column" === q[e]._L[r].type || "group" === q[e]._L[r].type) && void 0 !== q[e]._L[r].frames && void 0 !== q[e]._L[r].frames.frame_999 && void 0 !== q[e]._L[r].frames.frame_999.transform && "" + q[e]._L[r].frames.frame_999.transform.opacity != "0",
                s = 1 === q[e]._L[r].pVisRequest ? "remove" : n ? s : "add",
                1 === q[e]._L[r].pVisRequest ? "remove" : n ? "add" : o) : (s = "add",
                "remove"),
                "group" === q[e]._L[r].type && "add" == o && "hidden" == (1 === q[e]._L[r].pVisStatus ? "visible" : 0 === q[e]._L[r].pVisStatus ? "hidden" : q[e]._L[r].pVisStatus) && (s = "add"),
                void 0 !== o && q[e]._L[r].p[0].classList[o]("rs-forceuntouchable"),
                void 0 !== s) && q[e]._L[r].p[0].classList[s]("rs-forcehidden"),
                q[e]._L[r].pPointerStatus !== q[e]._L[r].pPeventsRequest && (q[e]._L[r].pPointerStatus = q[e]._L[r].pPeventsRequest,
                tpGS.gsap.set(q[e]._L[r].p[0], {
                    pointerEvents: q[e]._L[r].pPointerStatus,
                    visibility: 1 === q[e]._L[r].pVisStatus ? "visible" : 0 === q[e]._L[r].pVisStatus ? "hidden" : q[e]._L[r].pVisStatus
                })),
                void 0 !== a && "ignore" !== a && 0 !== a && (a++,
                "enterstage" === t || "leavestage" === t || "framestarted" === t ? q.isFirefox(e) ? -1 === q[e]._L[r].p[0].style.transform.indexOf("perspective") && (q[e]._L[r].p[0].style.transform += (0 === q[e]._L[r].p[0].style.transform.length ? " " : "") + "perspective(" + a + "px)") : (window.isSafari11 || !0 === q[e]._L[r].maskHasPerspective || 0 !== q[e]._L[r].p[0].style.perspective.length) && "none" != q[e]._L[r].p[0].style.perspective || (q[e]._L[r].p[0].style.perspective = a + "px") : "frameended" === t && (q.isFirefox(e) ? q[e]._L[r].p[0].style.transform = q[e]._L[r].p[0].style.transform.replace("perspective(" + a + "px)", "") : window.isSafari11 || (q[e]._L[r].p[0].style.perspective = q[e]._L[r].p[0].style.perspective.replace(a - 1 + "px", ""))));
            else
                for (r in q[e]._L)
                    q[e]._L.hasOwnProperty(r) && (q[e]._L[r].pVisRequest !== q[e]._L[r].pVisStatus && (q[e]._L[r].pVisStatus = q[e]._L[r].pVisRequest,
                    0 === q[e]._L[r].pVisStatus ? q[e]._L[r].p[0].classList.add("rs-forcehidden") : q[e]._L[r].p[0].classList.remove("rs-forcehidden")),
                    q[e]._L[r].pPointerStatus !== q[e]._L[r].pPeventsRequest) && (q[e]._L[r].pPointerStatus = q[e]._L[r].pPeventsRequest,
                    tpGS.gsap.set(q[e]._L[r].p[0], {
                        pointerEvents: q[e]._L[r].pPointerStatus,
                        visibility: q[e]._L[r].pVisStatus
                    }));
            "enterstage" === t && void 0 !== i && void 0 !== q[e]._L[i].esginside && 0 < q[e]._L[i].esginside.length && void 0 !== q[e]._L[i].esginside.esredraw && q[e]._L[i].esginside.esredraw()
        },
        updateMiddleZonesAndESG: function(e) {
            var t, i = q[e].pr_processing_key || q[e].pr_active_key || 0;
            if (q[e].middleZones && 0 < q[e].middleZones.length && void 0 !== q[e].middleZones[i])
                for (t = 0; t < q[e].middleZones[i].length; t++)
                    tpGS.gsap.set(q[e].middleZones[i][t], {
                        y: Math.round(q[e].module.height / 2 - q[e].middleZones[i][t].offsetHeight / 2) + "px"
                    });
            if (q[e].smiddleZones && 0 < q[e].smiddleZones.length)
                for (t = 0; t < q[e].smiddleZones.length; t++)
                    tpGS.gsap.set(q[e].smiddleZones[t], {
                        y: Math.round(q[e].module.height / 2 - q[e].smiddleZones[t].offsetHeight / 2) + "px"
                    })
        },
        getRowHeights: function(e, t) {
            if (!q[e].firstLayerCalculated)
                return {
                    cur: 0,
                    last: 0,
                    cache: [],
                    tz: 0
                };
            var i = 0
              , a = 0
              , r = 0
              , o = void 0 !== t ? t : q[e].pr_processing_key || q[e].pr_active_key || 0
              , s = void 0 !== t ? t : q[e].pr_active_key || 0;
            if (q[e].rowMiddleHeights = null == q[e].rowMiddleHeights ? {} : q[e].rowMiddleHeights,
            q[e].rowMiddleHeights[o] = 0,
            q[e].rowzones && 0 < q[e].rowzones.length) {
                if (void 0 !== q[e].rowzones[o])
                    for (var n = 0; n < q[e].rowzones[o].length; n++)
                        q[e].rowzonesHeights[o][n] = q[e].rowzones[o][n][0].offsetHeight,
                        i += q[e].rowzonesHeights[o][n],
                        "true" == q[e].rowzones[o][n][0].dataset.middle && (q[e].rowMiddleHeights[o] += q[e].rowzonesHeights[o][n]);
                if (s !== o)
                    for (n = q[e].rowMiddleHeights[s] = 0; n < q[e].rowzones[s].length; n++)
                        q[e].rowzonesHeights[s][n] = q[e].rowzones[s][n][0].offsetHeight,
                        a += q[e].rowzonesHeights[s][n],
                        "true" == q[e].rowzones[s][n][0].dataset.middle && (q[e].rowMiddleHeights[s] += q[e].rowzonesHeights[s][n])
            }
            if (q[e].srowzones && 0 < q[e].srowzones.length)
                for (n = q[e].rowMiddleHeights.static = 0; n < q[e].srowzones.length; n++)
                    r += q[e].srowzones[n][0].offsetHeight,
                    "true" == q[e].srowzones[n][0].dataset.middle && (q[e].rowMiddleHeights.static += q[e].srowzones[n][0].offsetHeight);
            var i = i < r ? r : i
              , t = void 0 === q[e].rowHeights ? [] : q[e].rowHeights.cache
              , l = (new Date).getTime();
            return void 0 !== q[e].rowHeights && l - q[e].rowHeights.tz < 300 ? 5 < q[e].rowHeights.cache.length && (i = q[e].rowHeights.cache[q[e].rowHeights.cache.length - 1] === i ? q[e].rowHeights.cache[q[e].rowHeights.cache.length - 2] : q[e].rowHeights.cache[q[e].rowHeights.cache.length - 1],
            l = q[e].rowHeights.tz) : t = [],
            {
                cur: i,
                last: a,
                cache: t,
                tz: l
            }
        },
        getGridOffset: function(e, t, i, a) {
            var r = "grid" === i || "carousel" !== q[e].sliderType || a ? q[e].canv.width : q[e].carousel.slide_width
              , o = (q[e].useFullScreenHeight ? q[e].module : "grid" === i ? q[e].content : "carousel" !== q[e].sliderType || a ? q[e].module : q[e].canv).height
              , s = "slide" === i || "carousel" == q[e].sliderType && "v" == q[e].carousel.orientation ? 0 : Math.max(0, "fullscreen" == q[e].sliderLayout ? q[e].module.height / 2 - q.iHE(e) * (q[e].keepBPHeight ? 1 : q[e].CM.h) / 2 : q[e].autoHeight || null != q[e].minHeight && 0 < q[e].minHeight || q[e].keepBPHeight ? q[e].canv.height / 2 - q.iHE(e) * q[e].CM.h / 2 : 0)
              , t = "slide" === i ? 0 : Math.max(0, "carousel" === q[e].sliderType && "v" !== q[e].carousel.orientation ? 0 : q[e].canv.width / 2 - q.iWA(e, t) * q[e].CM.w / 2);
            return [r, o, t = "slide" !== i && "carousel" === q[e].sliderType && a && void 0 !== q[e].carousel && void 0 !== q[e].carousel.horizontal_align ? Math.max(0, "center" === q[e].carousel.horizontal_align ? 0 + (q[e].module.width - q.iWA(e, "static") * q[e].CM.w) / 2 : "right" === q[e].carousel.horizontal_align ? q[e].module.width - q[e].gridwidth[q[e].level] * q[e].CM.w : t) : t, s]
        },
        initLayer: function(t) {
            var i, a, r, e, o = t.id, s = t.skey;
            for (e in q[o].layers[t.skey])
                if (q[o].layers[t.skey].hasOwnProperty(e)) {
                    var n = q[o].layers[t.skey][e]
                      , l = jQuery(n)
                      , d = q.gA(n, "initialised")
                      , c = d ? q[o]._L[n.id] : l.data();
                    if ("individual" === t.skey && (c.slideKey = void 0 === c.slideKey ? q.gA(l.closest("rs-slide")[0], "key") : c.slideKey,
                    c.slideIndex = void 0 === c.slideIndex ? q.getSlideIndex(o, c.slideKey) : c.slideIndex,
                    t.slideIndex = c.slideIndex,
                    s = c.slideKey),
                    void 0 === d) {
                        if (q.revCheckIDS(o, n),
                        (q[o]._L[n.id] = c).ford = void 0 === c.ford ? "frame_0;frame_1;frame_999" : c.ford,
                        c.ford = ";" == c.ford[c.ford.length - 1] ? c.ford.substring(0, c.ford.length - 1) : c.ford,
                        c.ford = c.ford.split(";"),
                        void 0 !== c.clip)
                            for (i in c.clipPath = {
                                use: !1,
                                origin: "l",
                                type: "rectangle"
                            },
                            c.clip = c.clip.split(";"),
                            c.clip)
                                c.clip.hasOwnProperty(i) && ("u" == (a = c.clip[i].split(":"))[0] && (c.clipPath.use = "true" == a[1]),
                                "o" == a[0] && (c.clipPath.origin = a[1]),
                                "t" == a[0]) && (c.clipPath.type = a[1]);
                        c.frames = M(c, o),
                        c.caches = {},
                        c.OBJUPD = {},
                        c.c = l,
                        c.p = q[o]._Lshortcuts[n.id].p,
                        c.lp = c.reqWrp.loop ? q[o]._Lshortcuts[n.id].lp : void 0,
                        c.m = c.reqWrp.mask ? q[o]._Lshortcuts[n.id].m : void 0,
                        c.triggercache = void 0 === c.triggercache ? "reset" : c.triggercache,
                        c.rsp_bd = void 0 === c.rsp_bd ? "column" === c.type || "row" === c.type ? "off" : "on" : c.rsp_bd,
                        c.rsp_o = void 0 === c.rsp_o ? "on" : c.rsp_o,
                        c.basealign = void 0 === c.basealign ? "grid" : c.basealign;
                        let e;
                        if (c.group = "group" !== c.type && null !== (e = q.closestNode(l[0], "RS-GROUP")) || "group" === c.type && null !== (e = q.closestNode(l[0].parentNode, "RS-GROUP")) ? "group" : "column" !== c.type && null !== (e = q.closestNode(l[0], "RS-COLUMN")) ? "column" : "row" !== c.type && null !== (e = q.closestNode(l[0], "RS-ROW")) ? "row" : void 0,
                        c._lig = null !== e && void 0 !== e ? jQuery(e) : void 0,
                        c._ligid = void 0 !== c._lig ? c._lig[0].id : void 0,
                        c._column = "RS-COLUMN" === l[0].tagName ? jQuery(q.closestNode(l[0], "RS-COLUMN-WRAP")) : "none",
                        c._row = "RS-COLUMN" === l[0].tagName && jQuery(q.closestNode(l[0], "RS-ROW")),
                        c._ingroup = "group" === c.group,
                        c._incolumn = "column" === c.group,
                        c._inrow = "row" === c.group,
                        c.fsom = "true" == c.fsom || 1 == c.fsom,
                        c.fullinset = "" + c.fullinset == "true",
                        c.position = void 0 !== c.pos ? "r" == c.pos ? "relative" : "absolute" : c._incolumn ? "relative" : "absolute",
                        (c._ingroup || c._incolumn) && 0 <= c._lig[0].className.indexOf("rs-sba") && (!1 !== c.animationonscroll || void 0 === c.frames.loop) && !0 !== c.animOnScrollForceDisable && (c.animationonscroll = !0,
                        l[0].className += " rs-sba",
                        q[o].sbas[s][n.id] = l[0]),
                        c.animOnScrollRepeats = 0,
                        c._isgroup = "RS-GROUP" === l[0].tagName,
                        c.type = c.type || "none",
                        "row" === c.type && (void 0 === c.cbreak && (c.cbreak = 2),
                        void 0 === c.zone) && (c.zone = q.closestNode(l[0], "RS-ZONE"),
                        c.zone = null !== c.zone && void 0 !== c.zone ? c.zone.className : ""),
                        c.esginside = jQuery(l[0].getElementsByClassName("esg-grid")[0]),
                        c._isnotext = -1 !== jQuery.inArray(c.type, ["video", "image", "audio", "shape", "row", "group"]),
                        c._mediatag = "html5" == c.audio ? "audio" : "video",
                        c.img = l.find("img"),
                        c.deepiframe = q.getByTag(l[0], "iframe"),
                        c.deepmedia = q.getByTag(l[0], c._mediatag),
                        c.layertype = "image" === c.type ? "image" : 0 <= l[0].className.indexOf("rs-layer-video") || 0 <= l[0].className.indexOf("rs-layer-audio") || 0 < c.deepiframe.length && (0 < c.deepiframe[0].src.toLowerCase().indexOf("youtube") || 0 < c.deepiframe[0].src.toLowerCase().indexOf("vimeo")) || 0 < c.deepmedia.length ? "video" : "html",
                        0 < c.deepiframe.length && q.sA(c.deepiframe[0], "layertype", c.layertype),
                        "column" === c.type && c.cbgexists && (c.cbg = jQuery(q.getByTag(c.p[0], "RS-COLUMN-BG")[0]),
                        c.cbgmask = jQuery(q.getByTag(c.p[0], "RS-CBG-MASK-WRAP")[0])),
                        c._slidelink = 0 <= l[0].className.indexOf("slidelink"),
                        c._isstatic = 0 <= l[0].className.indexOf("rs-layer-static"),
                        c.slidekey = c._isstatic ? "staticlayers" : s,
                        c._togglelisteners = 0 < l[0].getElementsByClassName("rs-toggled-content").length,
                        "text" === c.type && (-1 !== c.c[0].innerHTML.indexOf("{{total_slide_count}}") && (c.c[0].innerHTML = c.c[0].innerHTML.replace("{{total_slide_count}}", q[o].realslideamount)),
                        0 <= c.c[0].innerHTML.indexOf("{{current_slide_index}}")) && (c._isstatic ? (c.metas = c.metas || {},
                        c.metas.csi = {},
                        c.c[0].innerHTML = c.c[0].innerHTML.replace("{{current_slide_index}}", "<cusli>" + q[o].realslideamount + "</cusli>"),
                        c.metas.csi.c = c.c[0].getElementsByTagName("CUSLI")[0]) : (h = parseInt(t.slideIndex) + 1,
                        c.c[0].innerHTML = c.c[0].innerHTML.replace("{{current_slide_index}}", (h < 10 && 9 < q[o].realslideamount ? "0" : "") + h))),
                        c.bgcol = void 0 === c.bgcol ? 0 <= l[0].style.background.indexOf("gradient") ? l[0].style.background : l[0].style.backgroundColor : c.bgcol,
                        c.bgcol = "" === c.bgcol ? "rgba(0, 0, 0, 0)" : c.bgcol,
                        c.bgcol = 0 === c.bgcol.indexOf("rgba(0, 0, 0, 0)") && 18 < c.bgcol.length ? c.bgcol.replace("rgba(0, 0, 0, 0)", "") : c.bgcol,
                        c.zindex = void 0 === c.zindex ? parseInt(l[0].style.zIndex) : parseInt(c.zindex),
                        c._isgroup && (c.frames.frame_1.timeline.waitoncall && (c.childrenAtStartNotVisible = !0),
                        c.pVisRequest = 0),
                        c._togglelisteners && l.on("click", function() {
                            q.swaptoggleState([this.id])
                        }),
                        void 0 !== c.border)
                            for (i in c.border = c.border.split(";"),
                            c.bordercolor = "transparent",
                            c.border)
                                if (c.border.hasOwnProperty(i))
                                    switch ((a = c.border[i].split(":"))[0]) {
                                    case "boc":
                                        c.bordercolor = a[1];
                                        break;
                                    case "bow":
                                        c.borderwidth = q.revToResp(a[1], 4, 0);
                                        break;
                                    case "bos":
                                        c.borderstyle = q.revToResp(a[1], 4, 0);
                                        break;
                                    case "bor":
                                        c.borderradius = q.revToResp(a[1], 4, 0)
                                    }
                        if ("svg" === c.type && (c.svg = l.find("svg"),
                        c.svgI = S(c.svgi, o),
                        c.svgPath = c.svg.find(c.svgI.svgAll ? "path, circle, ellipse, line, polygon, polyline, rect" : "path"),
                        c.svgH = void 0 !== c.svgi && -1 === c.svgi.indexOf("oc:t") ? S(c.svgh, o) : {}),
                        void 0 !== c.btrans) {
                            var p = c.btrans;
                            for (i in c.btrans = {
                                rX: 0,
                                rY: 0,
                                rZ: 0,
                                o: 1
                            },
                            p = p.split(";"))
                                if (p.hasOwnProperty(i))
                                    switch ((a = p[i].split(":"))[0]) {
                                    case "rX":
                                        c.btrans.rX = a[1];
                                        break;
                                    case "rY":
                                        c.btrans.rY = a[1];
                                        break;
                                    case "rZ":
                                        c.btrans.rZ = a[1];
                                        break;
                                    case "o":
                                        c.btrans.o = a[1];
                                        break;
                                    case "iosfx":
                                        c.iOSFix = "default" == a[1] ? "d" : "r" == a[1] ? "rotationX" : "p" == a[1] ? "d" : a[1]
                                    }
                        }
                        if (void 0 !== c.tsh)
                            for (i in c.tshadow = {
                                c: "rgba(0,0,0,0.25)",
                                v: 0,
                                h: 0,
                                b: 0
                            },
                            c.tsh = c.tsh.split(";"),
                            c.tsh)
                                if (c.tsh.hasOwnProperty(i))
                                    switch ((a = c.tsh[i].split(":"))[0]) {
                                    case "c":
                                        c.tshadow.c = a[1];
                                        break;
                                    case "h":
                                        c.tshadow.h = a[1];
                                        break;
                                    case "v":
                                        c.tshadow.v = a[1];
                                        break;
                                    case "b":
                                        c.tshadow.b = a[1]
                                    }
                        if (void 0 !== c.tst)
                            for (i in c.tstroke = {
                                c: "rgba(0,0,0,0.25)",
                                w: 1
                            },
                            c.tst = c.tst.split(";"),
                            c.tst)
                                if (c.tst.hasOwnProperty(i))
                                    switch ((a = c.tst[i].split(":"))[0]) {
                                    case "c":
                                        c.tstroke.c = a[1];
                                        break;
                                    case "w":
                                        c.tstroke.w = a[1]
                                    }
                        if (void 0 !== c.bsh)
                            for (i in c.bshadow = {
                                e: "c",
                                c: "rgba(0,0,0,0.25)",
                                v: 0,
                                h: 0,
                                b: 0,
                                s: 0
                            },
                            c.bsh = c.bsh.split(";"),
                            c.bsh)
                                if (c.bsh.hasOwnProperty(i))
                                    switch ((a = c.bsh[i].split(":"))[0]) {
                                    case "c":
                                        c.bshadow.c = a[1];
                                        break;
                                    case "h":
                                        c.bshadow.h = a[1];
                                        break;
                                    case "v":
                                        c.bshadow.v = a[1];
                                        break;
                                    case "b":
                                        c.bshadow.b = a[1];
                                        break;
                                    case "s":
                                        c.bshadow.s = a[1];
                                        break;
                                    case "e":
                                        c.bshadow.e = a[1]
                                    }
                        if (void 0 !== c.dim)
                            for (i in c.dim = c.dim.split(";"),
                            c.dim)
                                if (c.dim.hasOwnProperty(i))
                                    switch ((a = c.dim[i].split(":"))[0]) {
                                    case "w":
                                        c.width = a[1];
                                        break;
                                    case "h":
                                        c.height = a[1];
                                        break;
                                    case "maxw":
                                        c.maxwidth = a[1];
                                        break;
                                    case "maxh":
                                        c.maxheight = a[1];
                                        break;
                                    case "minw":
                                        c.minwidth = a[1];
                                        break;
                                    case "minh":
                                        c.minheight = a[1]
                                    }
                        if (void 0 !== c.xy && "row" !== c.type && "column" !== c.type)
                            for (i in c.xy = c.xy.split(";"),
                            c.xy)
                                if (c.xy.hasOwnProperty(i))
                                    switch ((a = c.xy[i].split(":"))[0]) {
                                    case "x":
                                        c.x = a[1].replace("px", "");
                                        break;
                                    case "y":
                                        c.y = a[1].replace("px", "");
                                        break;
                                    case "xo":
                                        c.hoffset = a[1].replace("px", "");
                                        break;
                                    case "yo":
                                        c.voffset = a[1].replace("px", "")
                                    }
                        if (c._isnotext || void 0 === c.text)
                            if (c._isgroup && void 0 !== c.text)
                                for (i in c.text = c.text.split(";"),
                                c.text)
                                    c.text.hasOwnProperty(i) && "a" === (a = c.text[i].split(":"))[0] && (c.textalign = a[1]);
                            else
                                "column" === c.type && void 0 !== c.textDecoration && delete c.textDecoration;
                        else
                            for (i in c.text = c.text.split(";"),
                            c.text)
                                if (c.text.hasOwnProperty(i))
                                    switch ((a = c.text[i].split(":"))[0]) {
                                    case "w":
                                        c.whitespace = a[1];
                                        break;
                                    case "td":
                                        c.textDecoration = a[1];
                                        break;
                                    case "c":
                                        c.clear = a[1];
                                        break;
                                    case "f":
                                        c.float = a[1];
                                        break;
                                    case "s":
                                        c.fontsize = a[1];
                                        break;
                                    case "l":
                                        c.lineheight = a[1];
                                        break;
                                    case "ls":
                                        c.letterspacing = a[1];
                                        break;
                                    case "fw":
                                        c.fontweight = a[1];
                                        break;
                                    case "a":
                                        c.textalign = a[1]
                                    }
                        if (void 0 !== c.flcr)
                            for (i in c.flcr = c.flcr.split(";"),
                            c.flcr)
                                if (c.flcr.hasOwnProperty(i))
                                    switch ((a = c.flcr[i].split(":"))[0]) {
                                    case "c":
                                        c.clear = a[1];
                                        break;
                                    case "f":
                                        c.float = a[1]
                                    }
                        if (void 0 !== c.padding)
                            for (i in c.padding = c.padding.split(";"),
                            c.padding)
                                if (c.padding.hasOwnProperty(i))
                                    switch ((a = c.padding[i].split(":"))[0]) {
                                    case "t":
                                        c.paddingtop = a[1];
                                        break;
                                    case "b":
                                        c.paddingbottom = a[1];
                                        break;
                                    case "l":
                                        c.paddingleft = a[1];
                                        break;
                                    case "r":
                                        c.paddingright = a[1]
                                    }
                        if (void 0 !== c.margin)
                            for (i in c.margin = c.margin.split(";"),
                            c.margin)
                                if (c.margin.hasOwnProperty(i))
                                    switch ((a = c.margin[i].split(":"))[0]) {
                                    case "t":
                                        c.margintop = a[1];
                                        break;
                                    case "b":
                                        c.marginbottom = a[1];
                                        break;
                                    case "l":
                                        c.marginleft = a[1];
                                        break;
                                    case "r":
                                        c.marginright = a[1]
                                    }
                        if (void 0 !== c.spike && (c.spike = C(c.spike)),
                        void 0 !== c.corners)
                            for (i in r = c.corners.split(";"),
                            c.corners = {},
                            r)
                                r.hasOwnProperty(i) && 0 < r[i].length && (c.corners[r[i]] = jQuery("<" + r[i] + "></" + r[i] + ">"),
                                c.c.append(c.corners[r[i]]));
                        c.textalign = x(c.textalign),
                        c.vbility = q.revToResp(c.vbility, q[o].rle, !0),
                        c.hoffset = q.revToResp(c.hoffset, q[o].rle, 0),
                        c.voffset = q.revToResp(c.voffset, q[o].rle, 0),
                        c.x = q.revToResp(c.x, q[o].rle, "l"),
                        c.y = q.revToResp(c.y, q[o].rle, "t"),
                        T(l, 0, o),
                        q.sA(n, "initialised", !0),
                        q[o].c.trigger("layerinitialised", {
                            layer: l[0].id,
                            slider: o
                        })
                    }
                    var g, u, h, m, d = c.x[q[o].level], n = c.y[q[o].level], v = q.getGridOffset(o, t.slideIndex, c.basealign, c._isstatic), f = v[0], y = v[1], w = v[2], v = v[3];
                    if (c.slideIndex = t.slideIndex,
                    "updateposition" !== t.mode && (0 == c.vbility[q[o].levelForced] || "f" == c.vbility[q[o].levelForced] || f < q[o].hideLayerAtLimit && "on" == c.layeronlimit || f < q[o].hideAllLayerAtLimit ? (!0 !== c.layerIsHidden && c.p[0].classList.add("rs-layer-hidden"),
                    c.layerIsHidden = !0) : (c.layerIsHidden && c.p[0].classList.remove("rs-layer-hidden"),
                    c.layerIsHidden = !1),
                    c.poster = null == c.poster && void 0 !== c.thumbimage ? c.thumbimage : c.poster,
                    "image" === c.layertype ? (c.imgOBJ = {},
                    "cover-proportional" === c.img.data("c") ? (q.sA(c.img[0], "owidth", q.gA(c.img[0], "owidth", c.img[0].width)),
                    q.sA(c.img[0], "oheight", q.gA(c.img[0], "oheight", c.img[0].height)),
                    u = q.gA(c.img[0], "owidth") / q.gA(c.img[0], "oheight"),
                    g = c.img[0].width <= c.img[0].height ? y / f : f / y,
                    c.imgOBJ = g < u && u <= 1 || u < g && 1 < u ? {
                        width: "100%",
                        height: "auto",
                        left: "c" === d || "center" === d ? "50%" : "left" === d || "l" === d ? "0" : "auto",
                        right: "r" === d || "right" === d ? "0" : "auto",
                        top: "c" === n || "center" === n || "middle" === n || "m" === n ? "50%" : "top" === n || "t" === n ? "0" : "auto",
                        bottom: "b" === n || "bottom" === n ? "0" : "auto",
                        x: "c" === d || "center" === d || "middle" === d || "m" === d ? "-50%" : "0",
                        y: "c" === n || "center" === n || "middle" === n || "m" === n ? "-50%" : "0"
                    } : {
                        height: "100%",
                        width: "auto",
                        left: "c" === d || "center" === d ? "50%" : "left" === d || "l" === d ? "0" : "auto",
                        right: "r" === d || "right" === d ? "0" : "auto",
                        top: "c" === n || "center" === n || "middle" === n || "m" === n ? "50%" : "top" === n || "t" === n ? "0" : "auto",
                        bottom: "b" === n || "bottom" === n ? "0" : "auto",
                        x: "c" === d || "center" === d || "middle" === d || "m" === d ? "-50%" : "0",
                        y: "c" === n || "center" === n || "middle" === n || "m" === n ? "-50%" : "0"
                    }) : (void 0 === c.group && "auto" === c.width[q[o].level] && "auto" === c.height[q[o].level] && (c.width[q[o].level] = q.gA(c.img[0], "owidth", c.img[0].width),
                    c.height[q[o].level] = q.gA(c.img[0], "owidth", c.img[0].height)),
                    c.imgOBJ = {
                        width: "auto" !== c.width[q[o].level] || isNaN(c.width[q[o].level]) && 0 <= c.width[q[o].level].indexOf("%") ? "100%" : "auto",
                        height: "auto" !== c.height[q[o].level] || isNaN(c.height[q[o].level]) && 0 <= c.height[q[o].level].indexOf("%") ? "100%" : "auto"
                    })) : "video" === c.layertype && (q.manageVideoLayer(l, o, s),
                    "rebuild" !== t.mode && q.resetVideo(l, o, t.mode),
                    null != c.aspectratio && 1 < c.aspectratio.split(":").length && 1 == c.bgvideo && q.prepareCoveredVideo(o, l),
                    c.media = void 0 === c.media ? 0 < c.deepiframe.length ? jQuery(c.deepiframe[0]) : jQuery(c.deepmedia[0]) : c.media,
                    c.html5vid = void 0 === c.html5vid ? !(0 < c.deepiframe.length) : c.html5vid,
                    c.mediaOBJ = {
                        display: "block"
                    },
                    g = c.width[q[o].level],
                    u = c.height[q[o].level],
                    g = "auto" === g ? g : !q.isNumeric(g) && 0 < g.indexOf("%") ? c._incolumn || c._ingroup ? "100%" : "grid" === c.basealign ? q.iWA(o, t.slideIndex) * q[o].CM.w : f : "off" !== c.rsp_bd ? parseFloat(g) * q[o].CM.w + "px" : parseFloat(g) + "px",
                    u = "auto" === u ? u : !q.isNumeric(u) && 0 < u.indexOf("%") ? "grid" === c.basealign ? q.iHE(o) * q[o].CM.w : y : "off" !== c.rsp_bd ? parseFloat(u) * q[o].CM.h + "px" : parseFloat(u) + "px",
                    c.vd = void 0 === c.vd ? 1 < q[o].videos[l[0].id].ratio.split(":").length ? q[o].videos[l[0].id].ratio.split(":")[0] / q[o].videos[l[0].id].ratio.split(":")[1] : 1 : c.vd,
                    !c._incolumn || "100%" !== g && "auto" !== u || void 0 === c.ytid ? (-1 == l[0].className.indexOf("rs-fsv") ? (u = "auto" === u && void 0 !== c.vd && "auto" !== g ? "100%" === g ? l.width() / c.vd : g / c.vd : u,
                    c.vidOBJ = {
                        width: g,
                        height: u
                    }) : ("grid" !== c.basealign && (v = w = 0),
                    c.x = q.revToResp(0, q[o].rle, 0),
                    c.y = q.revToResp(0, q[o].rle, 0),
                    c.vidOBJ = {
                        width: g,
                        height: q[o].autoHeight ? q[o].canv.height : u
                    }),
                    0 != c.html5vid && l.hasClass("rs-fsv") || (c.mediaOBJ = {
                        width: g,
                        height: u,
                        display: "block"
                    }),
                    c._ingroup && null !== c.vidOBJ.width && void 0 !== c.vidOBJ.width && !q.isNumeric(c.vidOBJ.width) && 0 < c.vidOBJ.width.indexOf("%") && (c.OBJUPD.lppmOBJ = {
                        minWidth: g
                    })) : (m = l.width(),
                    m = "auto" === u ? m / c.vd : u,
                    c.vidOBJ = {
                        width: "auto",
                        height: m
                    },
                    c.heightSetByVideo = !0)),
                    c._slidelink || q[o].caches.calcResponsiveLayersList.push({
                        a: l,
                        b: o,
                        c: 0,
                        d: c.rsp_bd,
                        e: t.slideIndex
                    }),
                    "on" === c.rsp_ch) && "row" !== c.type && "column" !== c.type && "group" !== c.type && "image" !== c.type && "video" !== c.type && "shape" !== c.type && l.find("*").each(function() {
                        var e = jQuery(this);
                        "true" !== q.gA(this, "stylerecorder") && !0 !== q.gA(this, "stylerecorder") && T(e, "rekursive", o),
                        q[o].caches.calcResponsiveLayersList.push({
                            a: e,
                            b: o,
                            c: "rekursive",
                            d: c.rsp_bd,
                            e: t.slideIndex,
                            RSL: l
                        })
                    }),
                    "preset" !== t.mode) {
                        if (c.oldeow = c.eow,
                        c.oldeoh = c.eoh,
                        c.eow = l.outerWidth(!0),
                        c.eoh = l.outerHeight(!0),
                        0 == c.eoh && "group" == c.type && "auto" == c.height[q[o].level] && (c.eoh = c.p[0].offsetHeight),
                        void 0 !== c.metas && void 0 !== c.metas.csi && c.metas.csi.change !== q[o].focusedSlideIndex && (c.metas.csi.change = q[o].focusedSlideIndex,
                        h = parseInt(c.metas.csi.change) + 1,
                        c.metas.csi.c.innerHTML = (9 < q[o].realslideamount && h < 10 ? "0" : "") + h),
                        c.imgInFirefox = "image" == c.type && "auto" == c.width[q[o].level] && "100%" == c.height[q[o].level] && q.isFirefox(o),
                        c.imgInFirefox && (m = c.img.width(),
                        c.eow = 0 !== m ? m : c.eow),
                        c.eow <= 0 && void 0 !== c.lastknownwidth && (c.eow = c.lastknownwidth),
                        c.eoh <= 0 && void 0 !== c.lastknownheight && (c.eoh = c.lastknownheight),
                        void 0 !== c.corners && ("text" === c.type || "button" === c.type || "shape" === c.type)) {
                            for (r in c.corners)
                                c.corners.hasOwnProperty(r) && (c.corners[r].css("borderWidth", c.eoh + "px"),
                                c.corners[r].css("border" + ("rs-fcrt" === r || "rs-fcr" === r ? "Right" : "Left"), "0px solid transparent"),
                                c.corners[r].css("border" + ("rs-fcrt" == r || "rs-bcr" == r ? "Bottom" : "Top") + "Color", c.bgcol));
                            c.eow = l.outerWidth(!0)
                        }
                        0 == c.eow && 0 == c.eoh && (c.eow = ("grid" === c.basealign ? q[o].content : q[o].module).width,
                        c.eoh = ("grid" === c.basealign ? q[o].content : q[o].module).height),
                        c.basealign = q[o].justifyCarousel ? "grid" : c.basealign;
                        var b = "on" === c.rsp_o ? parseInt(c.voffset[q[o].level], 0) * q[o].CM.w : parseInt(c.voffset[q[o].level], 0)
                          , _ = "on" === c.rsp_o ? parseInt(c.hoffset[q[o].level], 0) * q[o].CM.h : parseInt(c.hoffset[q[o].level], 0)
                          , f = "grid" === c.basealign ? q.iWA(o, t.slideIndex) * q[o].CM.w : f
                          , y = "grid" === c.basealign || "carousel" == q[o].sliderType && "v" === q[o].carousel.orientation ? q.iHE(o) * (q[o].keepBPHeight || q[o].currentRowsHeight > q[o].gridheight[q[o].level] ? 1 : q[o].CM.h) : y;
                        (1 == q[o].gridEQModule || void 0 !== c._lig && "row" !== c.type && "column" !== c.type && ("group" !== c.type || c._ingroup || c._incolumn)) && (f = void 0 !== c._lig ? c._lig.width() : q[o].module.width,
                        y = void 0 !== c._lig ? c._lig.height() : q[o].module.height,
                        v = w = 0),
                        q[o].keepBPHeight && y == q[o].module.height && (v = 0),
                        "video" === c.type && null != c.vidOBJ && (0 <= c.vidOBJ.height && 0 === c.eoh && (c.eoh = c.vidOBJ.height),
                        0 <= c.vidOBJ.width) && 0 === c.eow && (c.eow = c.vidOBJ.width),
                        d = "relative" == c.position ? 0 : "c" === d || "m" === d || "center" === d || "middle" === d ? f / 2 - c.eow / 2 + _ : "l" === d || "left" === d ? _ : "r" === d || "right" === d ? f - c.eow - _ : "off" !== c.rsp_o ? d * q[o].CM.w : d,
                        n = "relative" == c.position ? 0 : "m" === n || "c" === n || "center" === n || "middle" === n ? y / 2 - c.eoh / 2 + b : "t" === n || "top" == n ? b : "b" === n || "bottom" == n ? y - c.eoh - b : "off" !== c.rsp_o ? n * q[o].CM.w : n,
                        d = c._slidelink ? 0 : q[o].rtl && -1 == ("" + c.width[q[o].level]).indexOf("%") ? parseInt(d) + c.eow : d,
                        c.calcx = "relative" != c.position || "group" !== c.type && !c._incolumn ? parseInt(d, 0) + w : 0,
                        c.calcy = "relative" != c.position || "group" !== c.type && !c._incolumn ? parseInt(n, 0) + v : 0,
                        "row" !== c.type && "column" !== c.type ? c.OBJUPD.POBJ = {
                            zIndex: c.zindex,
                            top: c.calcy,
                            left: c.calcx,
                            overwrite: "auto"
                        } : "row" !== c.type ? c.OBJUPD.POBJ = {
                            zIndex: c.zindex,
                            width: c.columnwidth,
                            top: 0,
                            left: 0,
                            overwrite: "auto"
                        } : "row" === c.type && (c.OBJUPD.POBJ = {
                            zIndex: c.zindex,
                            width: "grid" === c.basealign ? f + "px" : "100%",
                            top: 0,
                            left: q[o].rtl ? -1 * w : w,
                            overwrite: "auto"
                        },
                        c.cbreak <= q[o].level ? -1 === l[0].className.indexOf("rev_break_columns") && l[0].classList.add("rev_break_columns") : 0 < l[0].className.indexOf("rev_break_columns") && l[0].classList.remove("rev_break_columns"),
                        c.rowcalcx = c.OBJUPD.POBJ.left,
                        c.pow = c.p.outerWidth(!0)),
                        void 0 !== c.blendmode && (c.OBJUPD.POBJ.mixBlendMode = "color" === c.blendmode && window.isSafari11 ? "color-burn" : c.blendmode),
                        void 0 === c.frames.loop && !c.imgInFirefox || (c.OBJUPD.LPOBJ = {
                            width: c.eow,
                            height: c.eoh
                        }),
                        c._ingroup && (void 0 !== c._groupw && !q.isNumeric(c._groupw) && 0 < c._groupw.indexOf("%") && (c.OBJUPD.lppmOBJ.minWidth = c._groupw),
                        void 0 !== c._grouph) && !q.isNumeric(c._grouph) && 0 < c._grouph.indexOf("%") && (c.OBJUPD.lppmOBJ.minHeight = c._grouph),
                        "updateposition" !== t.mode || c.caches.POBJ_LEFT === c.OBJUPD.POBJ.left && c.caches.POBJ_TOP === c.OBJUPD.POBJ.top || (tpGS.gsap.set(c.p, c.OBJUPD.POBJ),
                        c.caches.POBJ_LEFT = c.OBJUPD.POBJ.left,
                        c.caches.POBJ_TOP = c.OBJUPD.POBJ.top),
                        t.animcompleted && q.animcompleted(l, o)
                    }
                }
        },
        hoverReverseDone: function(e) {
            q[e.id]._L[e.L[0].id].textDecoration && tpGS.gsap.set(q[e.id]._L[e.L[0].id].c, {
                textDecoration: q[e.id]._L[e.L[0].id].textDecoration
            })
        },
        animcompleted: function(e, t, i) {
            var a;
            void 0 !== q[t].videos && null != (a = q[t].videos[e[0].id]) && null != a.type && "none" != a.type && (1 == a.aplay || "true" == a.aplay || "on" == a.aplay || "1sttime" == a.aplay ? (("static" === a.slideid || "carousel" !== q[t].sliderType || e.closest("rs-slide").index() == q[t].carousel.focused || e.closest("rs-slide").index() == q[t].activeRSSlide && q[t].carousel.oldfocused == q[t].carousel.focused || i) && q.playVideo(e, t),
            q.toggleState(e.data("videotoggledby")),
            !a.aplay1 && "1sttime" != a.aplay || (a.aplay1 = !1,
            a.aplay = !1)) : ("no1sttime" == a.aplay && (a.aplay = !0),
            q.unToggleState(e.data("videotoggledby"))))
        },
        convertHoverTransform: function(e, t, i) {
            var a, r = q.clone(e.transform);
            return (r.originX || r.originY || r.originZ) && (r.transformOrigin = (void 0 === r.originX ? "50%" : r.originX) + " " + (void 0 === r.originY ? "50%" : r.originY) + " " + (void 0 === r.originZ ? "50%" : r.originZ),
            delete r.originX,
            delete r.originY,
            delete r.originZ),
            void 0 !== e && void 0 !== e.filter && (r.filter = v(e.filter),
            r["-webkit-filter"] = r.filter),
            r.color = void 0 === r.color ? "rgba(255,255,255,1)" : r.color,
            r.force3D = "auto",
            void 0 !== r.borderRadius && ((a = r.borderRadius.split(" ")).length,
            r.borderTopLeftRadius = a[0],
            r.borderTopRightRadius = a[1],
            r.borderBottomRightRadius = a[2],
            r.borderBottomLeftRadius = a[3],
            delete r.borderRadius),
            void 0 !== r.borderWidth && ((a = r.borderWidth.split(" ")).length,
            r.borderTopWidth = a[0],
            r.borderRightWidth = a[1],
            r.borderBottomWidth = a[2],
            r.borderLeftWidth = a[3],
            delete r.borderWidth),
            void 0 !== i.bg && -1 !== i.bg.indexOf("url") || (e = -1 !== i.bgCol.search("gradient"),
            (a = r.backgroundImage && "string" == typeof r.backgroundImage && -1 !== r.backgroundImage.search("gradient")) && e ? (180 !== s(i.bgCol) && 180 == s(r.backgroundImage) && (r.backgroundImage = o(r.backgroundImage, 180)),
            r.backgroundImage = tpGS.getSSGColors(i.bgCol, r.backgroundImage, void 0 === r.gs ? "fading" : r.gs).to) : a && !e ? r.backgroundImage = tpGS.getSSGColors(i.bgCol, r.backgroundImage, void 0 === r.gs ? "fading" : r.gs).to : !a && e && (r.backgroundImage = tpGS.getSSGColors(i.bgCol, r.backgroundColor, void 0 === r.gs ? "fading" : r.gs).to)),
            delete r.gs,
            r
        },
        handleStaticLayers: function(e, t) {
            var i = 0
              , a = q[t].realslideamount + 1;
            if (void 0 !== q.gA(e[0], "onslides")) {
                var r, o, s = q.gA(e[0], "onslides").split(";");
                for (r in s)
                    s.hasOwnProperty(r) && ("s" === (o = s[r].split(":"))[0] && (i = parseInt(o[1], 0)),
                    "e" === o[0]) && (a = parseInt(o[1], 0))
            }
            i = Math.max(0, i),
            a = Math.min(q[t].realslideamount, a < 0 ? q[t].realslideamount : a),
            a = 1 !== i && 0 !== i || a !== q[t].realslideamount ? a : q[t].realslideamount + 1,
            e.data("startslide", i),
            e.data("endslide", a),
            q.sA(e[0], "startslide", i),
            q.sA(e[0], "endslide", a)
        },
        updateLayersOnFullStage: function(e) {
            if (0 < q[e].caches.calcResponsiveLayersList.length) {
                !0 !== q[e].slideHasIframe && !0 !== q[e].fullScreenMode && !0 !== q[e].skipAttachDetach && ("carousel" === q[e].sliderType ? q[e].carousel.wrap : q[e].canvas).detach();
                for (var t = 0; t < q[e].caches.calcResponsiveLayersList.length; t++)
                    void 0 !== q[e].caches.calcResponsiveLayersList[t] && i(q[e].caches.calcResponsiveLayersList[t]);
                !0 !== q[e].slideHasIframe && !0 !== q[e].fullScreenMode && !0 !== q[e].skipAttachDetach && ("carousel" === q[e].sliderType ? q[e].c[0].appendChild(q[e].carousel.wrap[0]) : q[e].c[0].appendChild(q[e].canvas[0]))
            }
        },
        animateTheLayers: function(t) {
            if (void 0 === t.slide)
                return !1;
            var i = t.id;
            if (void 0 === q[i].slides[t.slide] && "individual" !== t.slide)
                return !1;
            if ("carousel" === q[i].sliderType) {
                if ("start" === t.mode && "start" === q[i].lastATLmode) {
                    if (t.slide === q[i].lastATLslide && (new Date).getTime() - q[i].lastATLtime < 1500)
                        return;
                    q[i].lastATLtime = (new Date).getTime()
                }
                q[i].lastATLmode = t.mode,
                q[i].lastATLslide = t.slide
            }
            var a = "individual" !== t.slide ? q.gA(q[i].slides[t.slide], "key") : "individual"
              , e = void 0 !== q[i].pr_processing_key ? q[i].pr_processing_key : void 0 !== q[i].pr_active_key ? q[i].pr_active_key : 0
              , r = (q[i].focusedSlideIndex = e,
            q[i].caches.calcResponsiveLayersList = [],
            q[i].layers = q[i].layers || {},
            "individual" === a ? q[i].layers.individual = void 0 === q[i].layers.individual ? "all" === q[i].carousel.showLayersAllTime ? n(jQuery(q[i].c), "rs-layer", "rs-layer-static") : n(jQuery(q[i].c), "rs-on-car") : q[i].layers.individual : (q[i].layers[a] = void 0 === q[i].layers[a] ? "all" === q[i].carousel.showLayersAllTime ? [] : n(jQuery(q[i].slides[t.slide]), "rs-layer", "carousel" === q[i].sliderType ? "rs-on-car" : void 0) : q[i].layers[a],
            q[i].layers.static = void 0 === q[i].layers.static ? n(jQuery(q[i].c.find("rs-static-layers")), "rs-layer", "rs-on-car") : q[i].layers.static,
            q[i].sbas[a] = void 0 === q[i].sbas[a] ? n(jQuery(q[i].slides[t.slide]), "rs-sba") : q[i].sbas[a]),
            "rebuild" === t.mode && "carousel" === q[i].sliderType && "individual" === a)
              , o = (void 0 !== a && q[i].layers[a] && q.initLayer({
                id: i,
                slideIndex: t.slide,
                skey: a,
                mode: t.mode,
                animcompleted: r
            }),
            q[i].layers.static && q.initLayer({
                id: i,
                skey: "static",
                slideIndex: "static",
                mode: t.mode,
                animcompleted: r
            }),
            q.updateLayersOnFullStage(i),
            "preset" !== t.mode || void 0 !== q[i].slidePresets && void 0 !== q[i].slidePresets[t.slide] || (q[i].slidePresets = void 0 === q[i].slidePresets ? {} : q[i].slidePresets,
            q[i].slidePresets[t.slide] = !0,
            q[i].c.trigger("revolution.slideprepared", {
                slide: t.slide,
                key: a
            })),
            q[i].heightInLayers = q[i].module.height,
            q[i].widthInLayers = q[i].module.width,
            q[i].levelInLayers = q[i].level,
            {
                id: i,
                skey: a,
                slide: t.slide,
                key: a,
                mode: t.mode,
                index: e
            });
            window.requestAnimationFrame(function() {
                if (void 0 === q[i].dimensionReCheck[a] ? (q.updateLayerDimensions(o),
                !0 !== q[i].doubleDimensionCheck ? setTimeout(function() {
                    q.updateLayerDimensions(o),
                    q.updateRowZones(o)
                }, 150) : q.updateRowZones(o),
                q[i].doubleDimensionCheck = !0,
                q[i].dimensionReCheck[a] = !0) : q.updateRowZones(o),
                void 0 !== a && q[i].layers[a])
                    for (var e in q[i].layers[a])
                        q[i].layers[a].hasOwnProperty(e) && q.renderLayerAnimation({
                            layer: jQuery(q[i].layers[a][e]),
                            id: i,
                            mode: t.mode,
                            caller: t.caller
                        });
                if (q[i].layers.static)
                    for (var e in q[i].layers.static)
                        q[i].layers.static.hasOwnProperty(e) && q.renderLayerAnimation({
                            layer: jQuery(q[i].layers.static[e]),
                            id: i,
                            mode: t.mode,
                            caller: t.caller
                        });
                null != q[i].mtl && q[i].mtl.resume()
            })
        },
        updateRowZones: function(e) {
            (void 0 !== q[e.id].rowzones && 0 < q[e.id].rowzones.length && 0 <= e.index && q[e.id].rowzones[Math.min(e.index, q[e.id].rowzones.length)] && 0 < q[e.id].rowzones[Math.min(e.index, q[e.id].rowzones.length)].length || void 0 !== q[e.id].srowzones && 0 < q[e.id].srowzones.length || void 0 !== q[e.id].smiddleZones && 0 < q[e.id].smiddleZones.length) && (q.updateDims(e.id),
            q.initLayer({
                id: e.id,
                skey: e.key,
                slideIndex: e.slide,
                mode: "updateposition"
            }),
            q.initLayer({
                id: e.id,
                skey: "static",
                slideIndex: "static",
                mode: "updateposition"
            }),
            "start" !== e.mode && "preset" !== e.mode || q.manageNavigation(e.id),
            window.requestAnimationFrame(function() {
                q.putRowsInPosition(e.id)
            }))
        },
        updateLayerDimensions: function(e) {
            var t = !1;
            q[e.id].caches.calcResponsiveLayersList = [],
            void 0 === e.key || "individual" != e.key && void 0 === q[e.id].layers[e.key] || !q.checkLayerDimensions({
                id: e.id,
                skey: e.key,
                slideIndex: e.slide
            }) || (t = !0),
            q.initLayer({
                id: e.id,
                skey: e.key,
                slideIndex: e.slide,
                mode: "updateAndResize"
            }),
            q[e.id].layers.static && q.checkLayerDimensions({
                id: e.id,
                skey: "static",
                slideIndex: "static"
            }) && (t = !0,
            q.initLayer({
                id: e.id,
                skey: "static",
                slideIndex: "static",
                mode: "updateAndResize"
            })),
            t && q.updateLayersOnFullStage(e.id)
        },
        updateAnimatingLayerPositions: function(e) {
            q.initLayer({
                id: e.id,
                skey: e.key,
                slideIndex: e.slide,
                mode: "updateposition"
            })
        },
        removeTheLayers: function(e, t, i) {
            var a, r = q.gA(e[0], "key");
            for (a in q[t].sloops && q[t].sloops[r] && q[t].sloops[r].tl && q[t].sloops[r].tl.pause(),
            q[t].layers[r])
                q[t].layers[r].hasOwnProperty(a) && q.renderLayerAnimation({
                    layer: jQuery(q[t].layers[r][a]),
                    frame: "frame_999",
                    mode: "continue",
                    remove: !0,
                    id: t,
                    allforce: i
                });
            for (a in q[t].layers.static)
                q[t].layers.static.hasOwnProperty(a) && q.renderLayerAnimation({
                    layer: jQuery(q[t].layers.static[a]),
                    frame: "frame_999",
                    mode: "continue",
                    remove: !0,
                    id: t,
                    allforce: i
                })
        },
        renderLayerAnimation: function(t) {
            var i, a, r = t.layer, o = t.id, s = q[o].level, n = q[o]._L[r[0].id], F = void 0 !== n.timeline ? n.timeline.time() : void 0, l = !1, d = !1, H = "none", c = !1;
            if (("containerResized_2" !== t.caller && "swapSlideProgress_2" !== t.caller || !0 === n.animationRendered) && (n.animationRendered = !0,
            "preset" !== t.mode || !0 === n.frames.frame_1.timeline.waitoncall || void 0 !== n.scrollBasedOffset)) {
                if ("trigger" == t.mode && (n.triggeredFrame = t.frame),
                n._isstatic) {
                    var p = "carousel" === q[o].sliderType && void 0 !== q[o].carousel.oldfocused ? parseInt(q[o].carousel.oldfocused) + 1 : void 0 === q[o].focusedSlideIndex ? 0 : parseInt(q[o].focusedSlideIndex, 0) + 1
                      , g = "carousel" === q[o].sliderType ? void 0 === q[o].pr_next_key ? 0 == p ? 1 : p : parseInt(q[o].pr_next_key, 0) + 1 : void 0 === q[o].pr_processing_key ? 0 == p ? 1 : p : parseInt(q[o].pr_processing_key, 0) + 1
                      , u = p >= n.startslide && p <= n.endslide
                      , g = g >= n.startslide && g <= n.endslide
                      , h = void 0 !== n.frames.frame_999 && void 0 !== n.frames.frame_999.timeline && !0 !== n.frames.frame_999.timeline.waitoncall && p === n.endslide;
                    if (void 0 === q[o].modal || "start" != t.mode && "continue" != t.mode || ("continue" === t.mode && "close" == q[o].modal.lastModalCall && (g = !1),
                    "start" !== t.mode || "show" !== q[o].modal.lastModalCall && "init" !== q[o].modal.lastModalCall || q[o].modal.lastModalCall === n.lastModalCall || (n.triggeredFrame = void 0,
                    n.triggercache = "reset",
                    void 0 !== n.timeline && void 0 !== n.timeline.currentLabel() && -1 == n.timeline.currentLabel().indexOf("frame_999") && n.timeline.pause(0)),
                    n.lastModalCall = q[o].modal.lastModalCall),
                    H = "start" === t.mode && h || p === n.endslide && "continue" === t.mode || ("continue" === t.mode || p === n.endslide) && "none",
                    "frame_999" === n.animatedFrame && "done" === n.animatingFrame | null == n.animatingFrame && (n.lastRequestedMainFrame = "frame_999"),
                    void 0 !== n.timeline && void 0 !== n.timeline.currentLabel() && -1 == n.timeline.currentLabel().indexOf("frame_999") && (c = !0),
                    !0 === t.allforce || !0 === H) {
                        if ("continue" === t.mode && g && h && void 0 !== n.timeline)
                            return void (0 <= n.timeline.currentLabel().indexOf("frame_999") ? n.timeline.pause(n.timeline.previousLabel()) : n.timeline.pause(n.timeline.currentLabel()));
                        if ("continue" === t.mode && "frame_999" === t.frame && (g || void 0 === n.lastRequestedMainFrame))
                            return
                    } else {
                        if ("preset" === t.mode && (n.elementHovered || !g))
                            return;
                        if ("rebuild" === t.mode && !u && !g)
                            return;
                        if ("start" === t.mode && g && "frame_1" === n.lastRequestedMainFrame)
                            return;
                        if (("start" === t.mode || "preset" === t.mode) && "frame_999" === n.lastRequestedMainFrame && !0 !== n.leftstage)
                            return;
                        if ("continue" === t.mode && "frame_999" === t.frame && (g || void 0 === n.lastRequestedMainFrame))
                            return;
                        if ("start" === t.mode && !g)
                            return;
                        if ("rebuild" === t.mode && n.elementHovered && n._isstatic && n.hovertimeline)
                            return
                    }
                } else
                    "start" === t.mode && "keep" !== n.triggercache && (n.triggeredFrame = void 0);
                "start" === t.mode && (void 0 !== n.layerLoop && (n.layerLoop.count = 0),
                t.frame = void 0 === n.triggeredFrame ? c ? void 0 : 0 : n.triggeredFrame),
                "continue" === t.mode || "trigger" === t.mode || void 0 === n.timeline || n._isstatic && !0 === n.leftstage || n.timeline.pause(0),
                "continue" !== t.mode && "trigger" !== t.mode || void 0 === n.timeline || n.timeline.pause(),
                n.timeline = tpGS.gsap.timeline({
                    paused: !0
                }),
                "text" !== n.type && "button" !== n.type || void 0 !== n.splitText && (void 0 !== n.splitTextFix || "start" !== t.mode && "preset" !== t.mode) || (ie({
                    layer: r,
                    id: o
                }),
                "start" === t.mode && (n.splitTextFix = !0));
                let e = q[o].duration;
                if ("carousel" === q[o].sliderType)
                    for (var m of q[o].slides)
                        n.slidekey == m.dataset.key && null != q.gA(m, "duration") && "" != q.gA(m, "duration") && (e = parseInt(q.gA(m, "duration"), 0));
                for (var v in n.ford)
                    if (n.ford.hasOwnProperty(v)) {
                        var f = n.ford[v]
                          , z = !1;
                        if ("frame_0" !== f && "frame_hover" !== f && "loop" !== f) {
                            if ("frame_999" === f && !n.frames[f].timeline.waitoncall && n.frames[f].timeline.start >= e && !0 !== t.remove && (n.frames[f].timeline.waitoncall = !0),
                            "start" === t.mode && "keep" !== n.triggercache && (n.frames[f].timeline.callstate = n.frames[f].timeline.waitoncall ? "waiting" : ""),
                            "trigger" === t.mode && n.frames[f].timeline.waitoncall && (f === t.frame ? (n.frames[f].timeline.triggered = !0,
                            n.frames[f].timeline.callstate = "called") : n.frames[f].timeline.triggered = !1),
                            "rebuild" === t.mode || n.frames[f].timeline.triggered || (n.frames[f].timeline.callstate = n.frames[f].timeline.waitoncall ? "waiting" : ""),
                            !1 !== t.fastforward) {
                                if (("continue" === t.mode || "trigger" === t.mode) && !1 === d && f !== t.frame)
                                    continue;
                                if (("rebuild" === t.mode || "preset" === t.mode) && !1 === d && void 0 !== n.triggeredFrame && f !== n.triggeredFrame)
                                    continue;
                                (f === t.frame || "rebuild" === t.mode && f === n.triggeredFrame) && (d = !0)
                            } else
                                f === t.frame && (d = !0);
                            if (f !== t.frame && n.frames[f].timeline.waitoncall && "called" !== n.frames[f].timeline.callstate && (l = !0),
                            f !== t.frame && d && (l = !0 === l && n.frames[f].timeline.waitoncall ? "skiprest" : !0 !== l && l),
                            void 0 === n.hideonfirststart && "frame_1" === f && n.frames[f].timeline.waitoncall && (n.hideonfirststart = !0),
                            l && "waiting" === n.frames[f].timeline.callstate && "preset" === t.mode && 1 != n.firstTimeRendered) {
                                if (n._isstatic && void 0 === n.currentframe)
                                    continue;
                                n.firstTimeRendered = z = !0
                            } else if ("skiprest" === l || "called" !== n.frames[f].timeline.callstate && l && t.toframe !== f)
                                continue;
                            if ("frame_999" !== f || !1 !== H || "continue" !== t.mode && "start" !== t.mode && "rebuild" !== t.mode) {
                                n.fff = "frame_1" === f && ("trigger" !== t.mode || "frame_999" === n.currentframe || "frame_0" === n.currentframe || void 0 === n.currentframe),
                                "trigger" === t.mode && "frame_1" === t.frame && !1 === n.leftstage && (n.fff = !1),
                                z || (n.frames[f].timeline.callstate = "called",
                                n.currentframe = f);
                                var y, w, b, _, S, x, k = n.frames[f], L = n.fff ? n.frames.frame_0 : void 0, O = tpGS.gsap.timeline(), W = tpGS.gsap.timeline(), v = n.c, R = void 0 !== k.sfx && ae(k.sfx.effect, n.m, k.timeline.ease), I = k.timeline.speed / 1e3, E = 0, M = re({
                                    id: o,
                                    frame: k,
                                    layer: r,
                                    ease: k.timeline.ease,
                                    splitAmount: v.length,
                                    target: f,
                                    forcefilter: void 0 !== n.frames.frame_hover && void 0 !== n.frames.frame_hover.filter
                                }), T = n.fff ? re({
                                    id: o,
                                    frame: L,
                                    layer: r,
                                    ease: k.timeline.ease,
                                    splitAmount: v.length,
                                    target: "frame_0"
                                }) : void 0, C = void 0 !== k.mask ? re({
                                    id: o,
                                    frame: {
                                        transform: {
                                            x: k.mask.x,
                                            y: k.mask.y
                                        }
                                    },
                                    layer: r,
                                    ease: M.ease,
                                    target: "mask"
                                }) : void 0, A = void 0 !== C && n.fff ? re({
                                    id: o,
                                    frame: {
                                        transform: {
                                            x: L.mask.x,
                                            y: L.mask.y
                                        }
                                    },
                                    layer: r,
                                    ease: M.ease,
                                    target: "frommask"
                                }) : void 0, D = M.ease;
                                if (M.force3D = !0,
                                "block" === R.type && (R.ft[0].background = k.sfx.fxc,
                                R.ft[0].visibility = "visible",
                                R.ft[1].visibility = "visible",
                                window.isSafari11 && (x = Math.max(T && T.z ? T.z : 0, M && M.z ? M.z : 0),
                                R.ft[0].z = Math.max(0, x + 1),
                                R.ft[1].z = Math.max(0, x + 1),
                                R.t.z = Math.max(0, x + 1),
                                R.ft[1].transformPerspective = R.ft[0].transformPerspective = R.t.transformPerspective = M.transformPerspective),
                                O.add(tpGS.gsap.fromTo(R.bmask_in, I / 2, R.ft[0], R.ft[1], 0)),
                                O.add(tpGS.gsap.fromTo(R.bmask_in, I / 2, R.ft[1], R.t, I / 2)),
                                "frame_0" !== f && "frame_1" !== f || (T.opacity = 0)),
                                void 0 !== k.color ? M.color = k.color : void 0 !== n.color && "npc" !== n.color[s] && (M.color = n.color[s]),
                                void 0 !== L && void 0 !== L.color ? T.color = L.color : void 0 !== L && void 0 !== n.color && "npc" !== n.color[s] && (T.color = n.color[s]),
                                void 0 !== k.bgcolor ? 0 <= k.bgcolor.indexOf("gradient") ? M.background = k.bgcolor : M.backgroundColor = k.bgcolor : !0 === n.bgcolinuse && (0 <= n.bgcol.indexOf("gradient") ? M.background = n.bgcol : M.backgroundColor = n.bgcol),
                                void 0 !== L && (void 0 !== L.bgcolor ? 0 <= L.bgcolor.indexOf("gradient") ? T.background = L.bgcolor : T.backgroundColor = L.bgcolor : !0 === n.bgcolinuse && (0 <= n.bgcol.indexOf("gradient") ? T.background = n.bgcol : T.backgroundColor = n.bgcol)),
                                void 0 !== n.splitText && !1 !== n.splitText)
                                    for (var P in Y)
                                        void 0 === k[Y[P]] || n.quickRendering || (y = n.splitText[Y[P]],
                                        b = re({
                                            id: o,
                                            frame: k,
                                            source: Y[P],
                                            ease: D,
                                            layer: r,
                                            splitAmount: y.length,
                                            target: f + "_" + Y[P]
                                        }),
                                        _ = n.fff ? re({
                                            id: o,
                                            frame: L,
                                            ease: b.ease,
                                            source: Y[P],
                                            layer: r,
                                            splitAmount: y.length,
                                            target: "frame_0_" + Y[P]
                                        }) : void 0,
                                        w = n.frames[f].dosplit ? void 0 === k[Y[P]].delay ? .05 : k[Y[P]].delay / 100 : 0,
                                        n.color[s] === M.color && "frame_1" === f || (b.color = M.color),
                                        void 0 !== T && n.color[s] !== T.color && (_.color = T.color),
                                        void 0 !== _ && _.color !== M.color && (b.color = M.color),
                                        b = q.clone(b),
                                        _ = n.fff ? q.clone(_) : void 0,
                                        S = k[Y[P]].dir,
                                        delete b.dir,
                                        b.data = {
                                            splitted: !0
                                        },
                                        b.stagger = "center" === S || "edge" === S ? K({
                                            each: w,
                                            offset: w / 2,
                                            from: S
                                        }) : {
                                            each: w,
                                            from: S
                                        },
                                        b.duration = I,
                                        void 0 !== _ && (void 0 !== _.opacity && (q.ISM || window.isSafari11) && (_.opacity = Math.max(.001, parseFloat(_.opacity))),
                                        delete _.dir),
                                        n.fff ? O.add(W.fromTo(y, _, b), 0) : O.add(W.to(y, b), 0),
                                        E = Math.max(E, y.length * w));
                                I += E,
                                void 0 === i && (i = "isometric" === q[o].perspectiveType ? 0 : "local" === q[o].perspectiveType ? void 0 !== M.transformPerspective ? M.transformPerspective : n.fff && void 0 !== T.transfromPerspective ? T.transfromPerspective : q[o].perspective : q[o].perspective),
                                n.knowTransformPerspective = i,
                                n.fsom && (void 0 !== M.filter || n.fff && void 0 !== T.filter) ? (C.filter = M.filter,
                                C["-webkit-filter"] = M.filter,
                                delete M.filter,
                                delete M["-webkit-filter"],
                                n.fff && void 0 !== T.filter && ((A = A || {}).filter = T.filter,
                                A["-webkit-filter"] = T.filter,
                                delete T.filter,
                                delete T["-webkit-filter"]),
                                n.forceFsom = !0) : n.forceFsom = !1,
                                n.useMaskAnimation = n.pxundermask || void 0 !== C && (void 0 !== L && "hidden" === L.mask.overflow || "hidden" === k.mask.overflow),
                                n.useMaskAnimation || n.forceFsom ? (n.useMaskAnimation ? O.add(tpGS.gsap.to(n.m, .001, {
                                    overflow: "hidden"
                                }), 0) : O.add(tpGS.gsap.to(n.m, .001, {
                                    overflow: "visible"
                                }), 0),
                                "column" === n.type && n.cbgexists && n.useMaskAnimation && O.add(tpGS.gsap.to(n.cbgmask, .001, {
                                    overflow: "hidden"
                                }), 0),
                                n.btrans && (A && (A.rotationX = n.btrans.rX,
                                A.rotationY = n.btrans.rY,
                                A.rotationZ = n.btrans.rZ,
                                A.opacity = n.btrans.o),
                                C.rotationX = n.btrans.rX,
                                C.rotationY = n.btrans.rY,
                                C.rotationZ = n.btrans.rZ,
                                C.opacity = n.btrans.o),
                                n.fff ? O.add(tpGS.gsap.fromTo(void 0 !== n.m && void 0 !== n.cbgmask ? [n.m, n.cbgmask] : void 0 !== n.m ? n.m : n.cbgmask, I, q.clone(A), q.clone(C)), .001) : O.add(tpGS.gsap.to(void 0 !== n.m && void 0 !== n.cbgmask ? [n.m, n.cbgmask] : void 0 !== n.m ? n.m : n.cbgmask, I, q.clone(C)), .001)) : void 0 !== n.btrans ? (x = {
                                    x: 0,
                                    y: 0,
                                    filter: "none",
                                    opacity: n.btrans.o,
                                    rotationX: n.btrans.rX,
                                    rotationY: n.btrans.rY,
                                    rotationZ: n.btrans.rZ,
                                    overflow: "visible"
                                },
                                0 === n.btrans.rX && 0 == n.btrans.rY || (n.maskHasPerspective = !0,
                                x.transformPerspective = i),
                                O.add(tpGS.gsap.to(n.m, .001, x), 0)) : O.add(tpGS.gsap.to(n.m, .001, {
                                    clearProps: "transform",
                                    overflow: "hidden" == n.ofHidOnHov ? "hidden" : "visible"
                                }), 0),
                                M.force3D = "auto",
                                n.fff ? (M.visibility = "visible",
                                void 0 !== n.cbg && O.fromTo(n.cbg, I, T, M, 0),
                                !q[o].BUG_safari_clipPath || T.clipPath || M.clipPath || n.spike,
                                I = 0 < I ? I - .001 : I,
                                void 0 !== n.cbg && "column" === n.type ? O.fromTo(v, I, Q(T), Q(M), 0) : O.fromTo(v, I, T, M, 0),
                                O.invalidate()) : ("frame_999" !== n.frame && (M.visibility = "visible"),
                                void 0 !== n.cbg && O.to(n.cbg, I, M, 0),
                                void 0 !== n.cbg && "column" === n.type ? O.to(v, I, Q(M), 0) : O.to(v, I, M, 0)),
                                void 0 !== D && "object" != typeof D && "function" != typeof D && 0 <= D.indexOf("SFXBounce") && O.to(v, I, {
                                    scaleY: .5,
                                    scaleX: 1.3,
                                    ease: M.ease + "-squash",
                                    transformOrigin: "bottom"
                                }, 1e-4);
                                R = "trigger" !== t.mode && (!0 !== l && "skiprest" !== l || "rebuild" !== t.mode) || t.frame === f || void 0 === k.timeline.start || !q.isNumeric(k.timeline.start) ? "+=0" === k.timeline.start || void 0 === k.timeline.start ? "+=0.001" : parseInt(k.timeline.start, 0) / 1e3 : "+=" + parseInt(void 0 === k.timeline.startRelative ? 0 : k.timeline.startRelative, 0) / 1e3;
                                n.timeline.addLabel(f, R),
                                n.timeline.add(O, R),
                                n.timeline.addLabel(f + "_end", "+=0.01"),
                                O.eventCallback("onStart", $, [{
                                    id: o,
                                    frame: f,
                                    L: r,
                                    tPE: i
                                }]),
                                "true" == n.animationonscroll || 1 == n.animationonscroll ? (O.eventCallback("onUpdate", ee, [{
                                    id: o,
                                    frame: f,
                                    L: r
                                }]),
                                O.smoothChildTiming = !0) : O.eventCallback("onUpdate", ee, [{
                                    id: o,
                                    frame: f,
                                    L: r
                                }]),
                                O.eventCallback("onComplete", te, [{
                                    id: o,
                                    frame: f,
                                    L: r,
                                    tPE: i
                                }])
                            }
                        }
                    }
                if (void 0 !== n.frames.loop) {
                    var p = parseInt(n.frames.loop.timeline.speed, 0) / 1e3
                      , h = parseInt(n.frames.loop.timeline.start) / 1e3 || 0
                      , u = "trigger" !== t.mode && "frame_999" !== t.frame || "frame_999" !== t.frame ? .2 : 0
                      , g = h + u
                      , c = (n.loop = {
                        root: tpGS.gsap.timeline({}),
                        preset: tpGS.gsap.timeline({}),
                        move: tpGS.gsap.timeline({
                            repeat: -1,
                            yoyo: n.frames.loop.timeline.yoyo_move
                        }),
                        rotate: tpGS.gsap.timeline({
                            repeat: -1,
                            yoyo: n.frames.loop.timeline.yoyo_rotate
                        }),
                        scale: tpGS.gsap.timeline({
                            repeat: -1,
                            yoyo: n.frames.loop.timeline.yoyo_scale
                        }),
                        filter: tpGS.gsap.timeline({
                            repeat: -1,
                            yoyo: n.frames.loop.timeline.yoyo_filter
                        })
                    },
                    n.frames.loop.frame_0)
                      , h = n.frames.loop.frame_999
                      , B = "blur(" + parseInt(c.blur || 0, 0) + "px) grayscale(" + parseInt(c.grayscale || 0, 0) + "%) brightness(" + parseInt(c.brightness || 100, 0) + "%)"
                      , N = "blur(" + (h.blur || 0) + "px) grayscale(" + (h.grayscale || 0) + "%) brightness(" + (h.brightness || 100) + "%)";
                    if (n.loop.root.add(n.loop.preset, 0),
                    n.loop.root.add(n.loop.move, u),
                    n.loop.root.add(n.loop.rotate, u),
                    n.loop.root.add(n.loop.scale, u),
                    n.loop.root.add(n.loop.filter, u),
                    "blur(0px) grayscale(0%) brightness(100%)" === B && "blur(0px) grayscale(0%) brightness(100%)" === N && (N = B = "none"),
                    h.originX = c.originX,
                    h.originY = c.originY,
                    h.originZ = c.originZ,
                    void 0 === i && (i = "isometric" === q[o].perspectiveType ? 0 : "local" === q[o].perspectiveType && void 0 !== M ? void 0 !== M.transformPerspective ? M.transformPerspective : n.fff && void 0 !== T.transfromPerspective ? T.transfromPerspective : q[o].perspective : q[o].perspective),
                    n.frames.loop.timeline.curved) {
                        var j, V = parseInt(n.frames.loop.timeline.radiusAngle, 0) || 0, X = [{
                            x: (c.x - c.xr) * q[o].CM.w,
                            y: 0,
                            z: (c.z - c.zr) * q[o].CM.w
                        }, {
                            x: 0,
                            y: (c.y + c.yr) * q[o].CM.w,
                            z: 0
                        }, {
                            x: (h.x + h.xr) * q[o].CM.w,
                            y: 0,
                            z: (h.z + h.zr) * q[o].CM.w
                        }, {
                            x: 0,
                            y: (h.y - h.yr) * q[o].CM.w,
                            z: 0
                        }], G = {
                            type: "thru",
                            curviness: n.frames.loop.timeline.curviness,
                            path: [],
                            autoRotate: n.frames.loop.timeline.autoRotate
                        };
                        for (j in X)
                            X.hasOwnProperty(j) && (G.path[j] = X[V],
                            V = ++V == X.length ? 0 : V);
                        ("trigger" !== t.mode && "frame_999" !== t.frame || "frame_999" !== t.frame) && n.loop.preset.fromTo(n.lp, u, {
                            "-webkit-filter": B,
                            filter: B,
                            x: 0,
                            y: 0,
                            z: 0,
                            minWidth: n._incolumn || n._ingroup ? "100%" : void 0 === n.eow ? 0 : n.eow,
                            minHeight: n._incolumn || n._ingroup ? "100%" : void 0 === n.eoh ? 0 : n.eoh,
                            scaleX: 1,
                            scaleY: 1,
                            skewX: 0,
                            skewY: 0,
                            rotationX: 0,
                            rotationY: 0,
                            rotationZ: 0,
                            transformPerspective: i,
                            transformOrigin: h.originX + " " + h.originY + " " + h.originZ,
                            opacity: 1
                        }, Z({
                            x: G.path[3].x,
                            y: G.path[3].y,
                            z: G.path[3].z,
                            scaleX: c.scaleX,
                            skewX: c.skewX,
                            skewY: c.skewY,
                            scaleY: c.scaleY,
                            rotationX: c.rotationX,
                            rotationY: c.rotationY,
                            rotationZ: c.rotationZ,
                            "-webkit-filter": B,
                            filter: B,
                            ease: "sine.inOut",
                            opacity: c.opacity
                        }), 0),
                        J(G) && n.loop.move.to(n.lp, n.frames.loop.timeline.yoyo_move ? p / 2 : p, {
                            motionPath: G,
                            ease: n.frames.loop.timeline.ease
                        })
                    } else
                        ("trigger" !== t.mode && "frame_999" !== t.frame || "frame_999" !== t.frame) && n.loop.preset.fromTo(n.lp, u, {
                            "-webkit-filter": B,
                            filter: B,
                            x: 0,
                            y: 0,
                            z: 0,
                            minWidth: n._incolumn || n._ingroup ? "100%" : void 0 === n.eow ? 0 : n.eow,
                            minHeight: n._incolumn || n._ingroup ? "100%" : void 0 === n.eoh ? 0 : n.eoh,
                            scaleX: 1,
                            scaleY: 1,
                            skewX: 0,
                            skewY: 0,
                            rotationX: 0,
                            rotationY: 0,
                            rotationZ: 0,
                            transformPerspective: i,
                            transformOrigin: h.originX + " " + h.originY + " " + h.originZ,
                            opacity: 1
                        }, Z({
                            x: c.x * q[o].CM.w,
                            y: c.y * q[o].CM.w,
                            z: c.z * q[o].CM.w,
                            scaleX: c.scaleX,
                            skewX: c.skewX,
                            skewY: c.skewY,
                            scaleY: c.scaleY,
                            rotationX: c.rotationX,
                            rotationY: c.rotationY,
                            rotationZ: c.rotationZ,
                            ease: "sine.out",
                            opacity: c.opacity,
                            "-webkit-filter": B,
                            filter: B
                        }), 0),
                        n.loop.move.to(n.lp, n.frames.loop.timeline.yoyo_move ? p / 2 : p, {
                            x: h.x * q[o].CM.w,
                            y: h.y * q[o].CM.w,
                            z: h.z * q[o].CM.w,
                            ease: n.frames.loop.timeline.ease
                        });
                    n.loop.rotate.to(n.lp, n.frames.loop.timeline.yoyo_rotate ? p / 2 : p, {
                        rotationX: h.rotationX,
                        rotationY: h.rotationY,
                        rotationZ: h.rotationZ,
                        ease: n.frames.loop.timeline.ease
                    }),
                    n.loop.scale.to(n.lp, n.frames.loop.timeline.yoyo_scale ? p / 2 : p, Z({
                        scaleX: h.scaleX,
                        scaleY: h.scaleY,
                        skewX: h.skewX,
                        skewY: h.skewY,
                        ease: n.frames.loop.timeline.ease
                    }));
                    u = {
                        opacity: h.opacity || 1,
                        ease: n.frames.loop.timeline.ease,
                        "-webkit-filter": N,
                        filter: N
                    };
                    n.loop.filter.to(n.lp, n.frames.loop.timeline.yoyo_filter ? p / 2 : p, u),
                    n.timeline.add(n.loop.root, g)
                }
                if (void 0 === n.frames.frame_hover || "start" !== t.mode && void 0 !== n.hoverframeadded || (n.hoverframeadded = !0,
                a = n.frames.frame_hover.timeline.speed / 1e3,
                n.cachedHoverSpeed = a = 0 == a ? 1e-5 : a,
                n.hoverlistener) || (n.hoverlistener = !0,
                q.document.on("mouseenter mousemove", ("column" === n.type && void 0 !== n.cbg ? "#" + n.cbg[0].id + "," : "") + "#" + n.c[0].id, function(e) {
                    n.mouseIsOver = !0,
                    1 == n.ignoreHoverFrames || "mousemove" === e.type && !0 === n.ignoremousemove || ((n.animationonscroll || n.readyForHover) && (n.elementHovered = !0,
                    n.hovertimeline || (n.hovertimeline = tpGS.gsap.timeline({
                        paused: !0
                    })),
                    0 == n.hovertimeline.progress() && (void 0 === n.lastHoveredTimeStamp || 150 < (new Date).getTime() - n.lastHoveredTimeStamp) && (n.ignoremousemove = !0,
                    n.ofHidOnHov = n.frames.frame_hover.mask ? "hidden" : "visible",
                    n.hovertimeline.to(void 0 !== n.m && void 0 !== n.cbgmask ? [n.m, n.cbgmask] : void 0 !== n.m ? n.m : n.cbgmask, a, {
                        overflow: n.ofHidOnHov
                    }, 0),
                    "column" === n.type && null != n.cbg && n.hovertimeline.to(n.cbg, a, q.clone(q.convertHoverTransform(n.frames.frame_hover, n.cbg, {
                        bgCol: n.bgcol,
                        bg: n.styleProps.background
                    })), 0),
                    "text" !== n.type && "button" !== n.type || void 0 === n.splitText || !1 === n.splitText || n.hovertimeline.to([n.splitText.lines, n.splitText.words, n.splitText.chars], a, {
                        color: n.frames.frame_hover.color,
                        ease: n.frames.frame_hover.transform.ease
                    }, 0),
                    "column" === n.type ? n.hovertimeline.to(n.c, a, Q(q.clone(q.convertHoverTransform(n.frames.frame_hover, n.c, {
                        bgCol: n.bgcol,
                        bg: n.styleProps.background
                    }))), 0) : n.hovertimeline.to(n.c, a, q.clone(q.convertHoverTransform(n.frames.frame_hover, n.c, {
                        bgCol: n.bgcol,
                        bg: n.styleProps.background
                    })), 0),
                    n.pZindex = n.p[0].style.zIndex,
                    n.p[0].style.zIndex = parseInt(n.frames && n.frames.frame_hover && void 0 !== n.frames.frame_hover.transform.zIndex ? n.frames.frame_hover.transform.zIndex : n.pZindex),
                    "svg" === n.type) && (n.svgHTemp = q.clone(n.svgH),
                    delete n.svgHTemp.svgAll,
                    e = Array.isArray(n.svgHTemp.fill) ? n.svgHTemp.fill[q[o].level] : n.svgHTemp.fill,
                    n.svgHTemp.fill = e,
                    n.hovertimeline.to(n.svg, a, n.svgHTemp, 0),
                    n.svg.length <= 0 && (n.svg = r.find("svg")),
                    n.svgPath.length <= 0 && (n.svgPath = n.svg.find(n.svgI.svgAll ? "path, circle, ellipse, line, polygon, polyline, rect" : "path")),
                    n.hovertimeline.to(n.svgPath, a, {
                        fill: e
                    }, 0)),
                    n.hovertimeline.play()),
                    n.lastHoveredTimeStamp = (new Date).getTime())
                }),
                q.document.on("mouseleave", ("column" === n.type && void 0 !== n.cbg ? "#" + n.cbg[0].id + "," : "") + "#" + n.c[0].id, function() {
                    n.mouseIsOver = !1,
                    1 != n.ignoreHoverFrames && (n.elementHovered = !1,
                    n.animationonscroll || n.readyForHover) && void 0 !== n.hovertimeline && (n.hovertimeline.reverse(),
                    n.p[0].style.zIndex = n.pZindex || n.zIndex,
                    n.hovertimeline.eventCallback("onReverseComplete", q.hoverReverseDone, [{
                        id: o,
                        L: r
                    }]))
                })),
                z || (n.lastRequestedMainFrame = "start" === t.mode ? "frame_1" : "continue" === t.mode ? void 0 === t.frame ? n.currentframe : t.frame : n.lastRequestedMainFrame),
                void 0 !== t.totime ? n.tSTART = t.totime : void 0 !== F && void 0 === t.frame ? n.tSTART = F : void 0 !== t.frame ? n.tSTART = t.frame : n.tSTART = 0,
                0 === n.tSTART && void 0 === n.startedAnimOnce && void 0 === n.leftstage && void 0 === n.startedAnimOnce && !0 === n.hideonfirststart && "preset" === t.mode && (q[o]._L[r[0].id].pVisRequest = 0,
                n.hideonfirststart = !1),
                ("frame_999" !== n.tSTART && "frame_999" !== n.triggeredFrame || !n.leftstage && void 0 !== n.startedAnimOnce) && ("true" != n.animationonscroll && 1 != n.animationonscroll ? n.timeline.play(n.tSTART) : n.timeline.time(n.tSTART),
                0 <= jQuery.inArray(n.type, ["group", "row", "column"])) && void 0 !== t.frame) {
                    if (void 0 === n.childrenJS)
                        for (var P in n.childrenJS = {},
                        q[o]._L)
                            void 0 !== q[o]._L[P]._lig && void 0 !== q[o]._L[P]._lig[0] && q[o]._L[P]._lig[0].id === r[0].id && q[o]._L[P]._lig[0].id !== q[o]._L[P].c[0].id && (n.childrenJS[q[o]._L[P].c[0].id] = q[o]._L[P].c);
                    t.frame = "0" == t.frame ? "frame_0" : t.frame,
                    t.frame = "1" == t.frame ? "frame_1" : t.frame,
                    t.frame = "999" == t.frame ? "frame_999" : t.frame;
                    var U = void 0 === t.totime ? void 0 !== n.frames[t.frame].timeline.startAbsolute ? parseInt(n.frames[t.frame].timeline.startAbsolute, 0) / 1e3 : void 0 !== n.frames[t.frame].timeline.start ? q.isNumeric(n.frames[t.frame].timeline.start) ? parseInt(n.frames[t.frame].timeline.start, 0) / 1e3 : 0 : .001 : t.totime;
                    if (!0 === t.updateChildren)
                        for (var P in n.childrenJS)
                            n.childrenJS.hasOwnProperty(P) && q.renderLayerAnimation({
                                layer: n.childrenJS[P],
                                fastforward: !1,
                                id: o,
                                mode: "continue",
                                updateChildren: !0,
                                totime: U
                            });
                    else
                        for (var P in n.childrenJS)
                            n.childrenJS.hasOwnProperty(P) && q[o]._L[P].pausedTrueParrent && (q.renderLayerAnimation({
                                layer: n.childrenJS[P],
                                fastforward: !1,
                                id: o,
                                mode: "continue",
                                updateChildren: !0,
                                totime: U
                            }),
                            q[o]._L[P].pausedTrueParrent = !1)
                }
            }
        }
    }),
    function(e) {
        e = q.clone(e);
        return delete e.backgroundColor,
        delete e.background,
        delete e.backgroundImage,
        delete e.borderSize,
        delete e.borderStyle,
        delete e["backdrop-filter"],
        e
    }
    )
      , J = function(e) {
        if (void 0 !== e && void 0 !== e.path && Array.isArray(e.path)) {
            var t, i = 0, a = 0;
            for (t in e.path)
                !e.path.hasOwnProperty(t) || 0 < i || 0 < a || (i += e.path[t].x,
                a += e.path[t].y);
            return 0 != i || 0 != a
        }
    }
      , Z = function(e) {
        return void 0 === e.skewX && delete e.skewX,
        void 0 === e.skewY && delete e.skewY,
        e
    }
      , K = function(a) {
        a.from = "edge" === a.from ? "edges" : a.from;
        var r = tpGS.gsap.utils.distribute(a);
        return function(e, t, i) {
            return r(e, t, i) + (!(e <= i.length / 2) && a.offset || 0)
        }
    }
      , $ = function(e) {
        q[e.id].BUG_safari_clipPath && e.L[0].classList.remove("rs-pelock"),
        (q[e.id]._L[e.L[0].id]._ingroup || q[e.id]._L[e.L[0].id]._incolumn || q[e.id]._L[e.L[0].id]._inrow) && void 0 !== q[e.id]._L[q[e.id]._L[e.L[0].id]._ligid] && void 0 !== q[e.id]._L[q[e.id]._L[e.L[0].id]._ligid].timeline && !q[e.id]._L[q[e.id]._L[e.L[0].id]._ligid].timeline.isActive() && void 0 !== q[e.id]._L[e.L[0].id] && void 0 !== q[e.id]._L[e.L[0].id].frames[q[e.id]._L[e.L[0].id].timeline.currentLabel()] && (null == q[e.id]._L[q[e.id]._L[e.L[0].id]._ligid].timezone || q[e.id]._L[q[e.id]._L[e.L[0].id]._ligid].timezone.to <= parseInt(q[e.id]._L[e.L[0].id].frames[q[e.id]._L[e.L[0].id].timeline.currentLabel()].timeline.start, 0)) && !0 !== q[e.id]._L[e.L[0].id].animOnScrollForceDisable && (q[e.id]._L[e.L[0].id].pausedTrueParrent = !0,
        q[e.id]._L[e.L[0].id].timeline.pause());
        var t = q[e.id]._L[e.L[0].id]
          , i = t.hovertimeline
          , i = (i && 0 < i.time() && (i.pause(),
        i.time(0),
        i.kill(),
        delete t.hovertimeline),
        delete q[e.id]._L[e.L[0].id].childrenAtStartNotVisible,
        q[e.id]._L[e.L[0].id].pVisRequest = 1,
        {
            layer: e.L
        });
        q[e.id]._L[e.L[0].id].tweenOnStart = !0,
        q[e.id]._L[e.L[0].id].animatingFrame = e.frame,
        q[e.id]._L[e.L[0].id].ignoremousemove = !1,
        q[e.id]._L[e.L[0].id].leftstage = !1,
        q[e.id]._L[e.L[0].id].readyForHover = !1,
        q[e.id]._L[e.L[0].id].tweenDirection = 1 == q[e.id]._L[e.L[0].id].animationonscroll || "true" == q[e.id]._L[e.L[0].id].animationonscroll ? q[e.id]._L[e.L[0].id].animteToTimeCache > q[e.id]._L[e.L[0].id].animteToTime ? -1 : 1 : void 0,
        void 0 !== q[e.id]._L[e.L[0].id].layerLoop && q[e.id]._L[e.L[0].id].layerLoop.from === e.frame && q[e.id]._L[e.L[0].id].layerLoop.count++,
        "" + q[e.id]._L[e.L[0].id].tweenDirection == "-1" && ("frame_0" === e.frame || "frame_1" == e.frame && q[e.id]._L[e.L[0].id].animteToTime <= .01) && "column" !== q[e.id]._L[e.L[0].id].type && "row" !== q[e.id]._L[e.L[0].id].type && "group" !== q[e.id]._L[e.L[0].id].type ? (q[e.id]._L[e.L[0].id].leftstage = !0,
        q[e.id]._L[e.L[0].id].pVisRequest = 0,
        q[e.id]._L[e.L[0].id].pPeventsRequest = "none",
        window.requestAnimationFrame(function() {
            q.requestLayerUpdates(e.id, "leftstage", e.L[0].id)
        })) : ("frame_1" === e.frame && "Safari" === window.RSBrowser && void 0 === q[e.id]._L[e.L[0].id].safariRenderIssue && (tpGS.gsap.set([q[e.id]._L[e.L[0].id].c], {
            opacity: 1
        }),
        q[e.id]._L[e.L[0].id].safariRenderIssue = !0),
        "frame_999" !== e.frame && (q[e.id]._L[e.L[0].id].startedAnimOnce = !0,
        q[e.id]._L[e.L[0].id].pPeventsRequest = q[e.id]._L[e.L[0].id].noPevents ? "none" : "auto"),
        i.eventtype = "frame_0" === e.frame || "frame_1" === e.frame ? "enterstage" : "frame_999" === e.frame ? "leavestage" : "framestarted",
        q[e.id]._L[e.L[0].id]._ingroup && void 0 !== q[e.id]._L[q[e.id]._L[e.L[0].id]._lig[0].id] && !0 !== q[e.id]._L[q[e.id]._L[e.L[0].id]._lig[0].id].frames.frame_1.timeline.waitoncall && (q[e.id]._L[q[e.id]._L[e.L[0].id]._lig[0].id].pVisRequest = 1),
        q.requestLayerUpdates(e.id, i.eventtype, e.L[0].id, void 0 !== q[e.id]._L[e.L[0].id].frames[e.frame] && void 0 !== q[e.id]._L[e.L[0].id].frames[e.frame].timeline && 0 == q[e.id]._L[e.L[0].id].frames[e.frame].timeline.usePerspective ? e.tPE : "ignore")),
        i.id = e.id,
        i.layerid = e.L[0].id,
        i.layertype = q[e.id]._L[e.L[0].id].type,
        i.frame_index = e.frame,
        i.layersettings = q[e.id]._L[e.L[0].id],
        q[e.id].c.trigger("revolution.layeraction", [i]),
        "enterstage" === i.eventtype && q.toggleState(q[e.id]._L[e.L[0].id].layertoggledby),
        "frame_1" === e.frame && q.animcompleted(e.L, e.id)
    }
      , ee = function(e) {
        q[e.id]._L[e.L[0].id].animatingFrame = e.frame,
        q[e.id]._L[e.L[0].id].tweenOnStart = !1,
        q[e.id]._L[e.L[0].id].tweenOnEnd = !1,
        "frame_999" === e.frame && (q[e.id]._L[e.L[0].id].pVisRequest = 1,
        q[e.id]._L[e.L[0].id].pPeventsRequest = q[e.id]._L[e.L[0].id].noPevents ? "none" : "auto",
        q[e.id]._L[e.L[0].id].leftstage = !1,
        window.requestAnimationFrame(function() {
            q.requestLayerUpdates(e.id, "update", e.L[0].id)
        }))
    }
      , te = function(e) {
        var t, i = !0, a = ("column" !== q[e.id]._L[e.L[0].id].type && "row" !== q[e.id]._L[e.L[0].id].type && "group" !== q[e.id]._L[e.L[0].id].type || (t = q[e.id]._L[e.L[0].id].timeline.currentLabel(),
        a = jQuery.inArray(t, q[e.id]._L[e.L[0].id].ford),
        a = q[e.id]._L[e.L[0].id].ford.length > ++a ? q[e.id]._L[e.L[0].id].ford[a] : t,
        void 0 !== q[e.id]._L[e.L[0].id].frames[a] && void 0 !== q[e.id]._L[e.L[0].id].frames[t] && (q[e.id]._L[e.L[0].id].timezone = {
            from: parseInt(q[e.id]._L[e.L[0].id].frames[t].timeline.startAbsolute, 0),
            to: parseInt(q[e.id]._L[e.L[0].id].frames[a].timeline.startAbsolute, 0)
        })),
        "frame_999" !== e.frame && q[e.id].isEdge && "shape" === q[e.id]._L[e.L[0].id].type && (t = q[e.id]._L[e.L[0].id].c[0].style.opacity,
        q[e.id]._L[e.L[0].id].c[0].style.opacity = t - 1e-4,
        tpGS.gsap.set(q[e.id]._L[e.L[0].id].c[0], {
            opacity: t - .001,
            delay: .05
        }),
        tpGS.gsap.set(q[e.id]._L[e.L[0].id].c[0], {
            opacity: t,
            delay: .1
        })),
        q[e.id]._L[e.L[0].id].animatingFrame = "done",
        q[e.id]._L[e.L[0].id].animatedFrame = e.frame,
        q[e.id]._L[e.L[0].id].tweenOnStart = !1,
        q[e.id]._L[e.L[0].id].tweenOnEnd = !0,
        q[e.id]._L[e.L[0].id].tweenDirection = 1 == q[e.id]._L[e.L[0].id].animationonscroll || "true" == q[e.id]._L[e.L[0].id].animationonscroll ? q[e.id]._L[e.L[0].id].animteToTimeCache > q[e.id]._L[e.L[0].id].animteToTime ? -1 : 1 : void 0,
        {});
        a.layer = e.L,
        a.eventtype = "frame_0" === e.frame || "frame_1" === e.frame ? "enteredstage" : "frame_999" === e.frame ? "leftstage" : "frameended",
        q[e.id]._L[e.L[0].id].readyForHover = !0,
        a.layertype = q[e.id]._L[e.L[0].id].type,
        a.frame_index = e.frame,
        a.layersettings = q[e.id]._L[e.L[0].id],
        q[e.id].c.trigger("revolution.layeraction", [a]),
        "frame_999" === e.frame && "leftstage" === a.eventtype ? (q[e.id]._L[e.L[0].id].leftstage = !0,
        q[e.id]._L[e.L[0].id].pVisRequest = 0,
        i = !(q[e.id]._L[e.L[0].id].pPeventsRequest = "none"),
        window.requestAnimationFrame(function() {
            q.requestLayerUpdates(e.id, "leftstage", e.L[0].id)
        })) : (e.L[0].id,
        void 0 !== q[e.id]._L[e.L[0].id].frames[e.frame] && void 0 !== q[e.id]._L[e.L[0].id].frames[e.frame].timeline && 0 == q[e.id]._L[e.L[0].id].frames[e.frame].timeline.usePerspective && window.requestAnimationFrame(function() {
            q.requestLayerUpdates(e.id, "frameended", e.L[0].id, e.tPE)
        })),
        "leftstage" === a.eventtype && void 0 !== q[e.id].videos && void 0 !== q[e.id].videos[e.L[0].id] && q.stopVideo && q.stopVideo(e.L, e.id),
        "column" === q[e.id]._L[e.L[0].id].type && void 0 !== q[e.id]._L[e.L[0].id].cbg && tpGS.gsap.to(q[e.id]._L[e.L[0].id].cbg, .01, {
            visibility: "visible"
        }),
        "leftstage" === a.eventtype && (q.unToggleState(e.layertoggledby),
        "video" === q[e.id]._L[e.L[0].id].type) && q.resetVideo && setTimeout(function() {
            q.resetVideo(e.L, e.id)
        }, 100),
        q[e.id].BUG_safari_clipPath && !i && e.L[0].classList.add("rs-pelock"),
        void 0 !== q[e.id]._L[e.L[0].id].layerLoop && q[e.id]._L[e.L[0].id].layerLoop.to === e.frame && (-1 == q[e.id]._L[e.L[0].id].layerLoop.repeat || q[e.id]._L[e.L[0].id].layerLoop.repeat > q[e.id]._L[e.L[0].id].layerLoop.count) && q.renderLayerAnimation({
            layer: q[e.id]._L[e.L[0].id].c,
            frame: q[e.id]._L[e.L[0].id].layerLoop.from,
            updateChildren: q[e.id]._L[e.L[0].id].layerLoop.children,
            mode: "continue",
            fastforward: !0 === q[e.id]._L[e.L[0].id].layerLoop.keep,
            id: e.id
        })
    }
      , v = function(e) {
        var t;
        return void 0 === e ? "" : (t = "",
        q.isChrome8889 && 0 === e.blur && (e.blur = .05),
        t = void 0 !== e.blur ? "blur(" + (e.blur || 0) + "px)" : "",
        (t = (t += void 0 !== e.grayscale ? (0 < t.length ? " " : "") + "grayscale(" + (e.grayscale || 0) + "%)" : "") + (void 0 !== e.brightness ? (0 < t.length ? " " : "") + "brightness(" + (e.brightness || 100) + "%)" : "")) || "none")
    }
      , o = function(e, t) {
        var i = (e = e.split("("))[0];
        return e.shift(),
        i + "(" + t + "deg, " + e.join("(")
    }
      , s = function(e) {
        if (-1 !== e.search("deg,")) {
            e = e.split("deg,")[0];
            if (-1 !== e.search(/\(/))
                return parseInt(e.split("(")[1], 10)
        }
        return 180
    }
      , S = function(e, t) {
        if (void 0 !== e && 0 <= e.indexOf("oc:t"))
            return {};
        e = void 0 === e ? "" : e.split(";");
        var i, a = {
            fill: q.revToResp("#ffffff", q[t].rle),
            stroke: "transparent",
            "stroke-width": "0px",
            "stroke-dasharray": "0",
            "stroke-dashoffset": "0"
        };
        for (i in e)
            if (e.hasOwnProperty(i)) {
                var r = e[i].split(":");
                switch (r[0]) {
                case "c":
                    a.fill = q.revToResp(r[1], q[t].rle, void 0, "||");
                    break;
                case "sw":
                    a["stroke-width"] = r[1];
                    break;
                case "sc":
                    a.stroke = r[1];
                    break;
                case "so":
                    a["stroke-dashoffset"] = r[1];
                    break;
                case "sa":
                    a["stroke-dasharray"] = r[1];
                    break;
                case "sall":
                    a.svgAll = r[1]
                }
            }
        return a
    }
      , x = function(e) {
        return "c" === e ? "center" : "l" === e ? "left" : "r" === e ? "right" : e
    }
      , ie = function(e) {
        var t = q[e.id]._L[e.layer[0].id]
          , i = !1;
        if (t.splitText && !1 !== t.splitText && t.splitText.revert(),
        "text" === t.type || "button" === t.type) {
            for (var a in t.frames)
                if (void 0 !== t.frames[a].chars || void 0 !== t.frames[a].words || void 0 !== t.frames[a].lines) {
                    i = !0;
                    break
                }
            t.splitText = !!i && new tpGS.SplitText(t.c,{
                type: "lines,words,chars",
                wordsClass: "rs_splitted_words",
                linesClass: "rs_splitted_lines",
                charsClass: "rs_splitted_chars"
            })
        } else
            t.splitText = !1
    }
      , ae = function(e, t, i) {
        if (void 0 !== e && 0 <= e.indexOf("block")) {
            var a = {};
            switch (0 === t[0].getElementsByClassName("tp-blockmask_in").length && (t.append('<div class="tp-blockmask_in"></div>'),
            t.append('<div class="tp-blockmask_out"></div>')),
            a.ft = [{
                scaleY: 1,
                scaleX: 0,
                transformOrigin: "0% 50%"
            }, {
                scaleY: 1,
                scaleX: 1,
                ease: i = void 0 === i ? "power3.inOut" : i,
                immediateRender: !1
            }],
            a.t = {
                scaleY: 1,
                scaleX: 0,
                transformOrigin: "100% 50%",
                ease: i,
                immediateRender: !1
            },
            a.bmask_in = t.find(".tp-blockmask_in"),
            a.bmask_out = t.find(".tp-blockmask_out"),
            a.type = "block",
            e) {
            case "blocktoleft":
            case "blockfromright":
                a.ft[0].transformOrigin = "100% 50%",
                a.t.transformOrigin = "0% 50%";
                break;
            case "blockfromtop":
            case "blocktobottom":
                a.ft = [{
                    scaleX: 1,
                    scaleY: 0,
                    transformOrigin: "50% 0%"
                }, {
                    scaleX: 1,
                    scaleY: 1,
                    ease: i,
                    immediateRender: !1
                }],
                a.t = {
                    scaleX: 1,
                    scaleY: 0,
                    transformOrigin: "50% 100%",
                    ease: i,
                    immediateRender: !1
                };
                break;
            case "blocktotop":
            case "blockfrombottom":
                a.ft = [{
                    scaleX: 1,
                    scaleY: 0,
                    transformOrigin: "50% 100%"
                }, {
                    scaleX: 1,
                    scaleY: 1,
                    ease: i,
                    immediateRender: !1
                }],
                a.t = {
                    scaleX: 1,
                    scaleY: 0,
                    transformOrigin: "50% 0%",
                    ease: i,
                    immediateRender: !1
                }
            }
            return a.ft[1].overwrite = "auto",
            a.t.overwrite = "auto",
            a
        }
        return !1
    }
      , re = function(e) {
        var t, i, a = q[e.id]._L[e.layer[0].id], r = void 0 === e.source ? q.clone(e.frame.transform) : q.clone(e.frame[e.source]), o = {
            originX: "50%",
            originY: "50%",
            originZ: "0"
        }, s = void 0 !== a._lig && void 0 !== q[e.id]._L[a._lig[0].id] ? q[e.id]._L[a._lig[0].id].eow : q[e.id].conw, n = void 0 !== a._lig && void 0 !== q[e.id]._L[a._lig[0].id] ? q[e.id]._L[a._lig[0].id].eoh : q[e.id].conh;
        for (i in r)
            if (r.hasOwnProperty(i)) {
                if (r[i] = "object" == typeof r[i] ? r[i][q[e.id].level] : r[i],
                "inherit" === r[i] || "delay" === i || "direction" === i || "use" === i)
                    delete r[i];
                else if ("originX" === i || "originY" === i || "originZ" === i)
                    o[i] = r[i],
                    delete r[i];
                else if (q.isNumeric(r[i], 0))
                    r[i] = m(r[i], e.frame.reverse, e.target, i, e.id, e.id);
                else if ("r" === r[i][0] && "a" === r[i][1] && "(" === r[i][3])
                    r[i] = r[i].replace("ran", "random");
                else if (0 <= r[i].indexOf("cyc(")) {
                    var l = r[i].replace("cyc(", "").replace(")", "").replace("[", "").replace("]", "").split("|");
                    r[i] = new function(e) {
                        return tpGS.gsap.utils.wrap(l, void 0)
                    }
                } else if (0 <= r[i].indexOf("%") && q.isNumeric(t = parseInt(r[i], 0)))
                    r[i] = "x" === i ? m((a.eow || 0) * t / 100, e.frame.reverse, e.target, i, e.id) : "y" === i ? m((a.eoh || 0) * t / 100, e.frame.reverse, e.target, i, e.id) : r[i];
                else {
                    r[i] = r[i].replace("[", "").replace("]", ""),
                    r[i] = m(r[i], e.frame.reverse, e.target, i, e.id, e.id);
                    var d = {
                        t: 0,
                        b: 0
                    };
                    switch ("row" === a.type && ("rev_row_zone_top" === a.zone && void 0 !== q[e.id].topZones[a.slideIndex] && void 0 !== q[e.id].topZones[a.slideIndex][0] ? d = {
                        t: 0,
                        b: 0
                    } : "rev_row_zone_middle" === a.zone && void 0 !== q[e.id].middleZones[a.slideIndex] && void 0 !== q[e.id].middleZones[a.slideIndex][0] ? d = {
                        t: Math.round(q[e.id].module.height / 2 - q[e.id].middleZones[a.slideIndex][0].offsetHeight / 2),
                        b: Math.round(q[e.id].module.height / 2 + q[e.id].middleZones[a.slideIndex][0].offsetHeight / 2)
                    } : "rev_row_zone_bottom" === a.zone && void 0 !== q[e.id].bottomZones[a.slideIndex] && void 0 !== q[e.id].bottomZones[a.slideIndex][0] && (d = {
                        t: Math.round(q[e.id].module.height - q[e.id].bottomZones[a.slideIndex][0].offsetHeight),
                        b: q[e.id].module.height + q[e.id].bottomZones[a.slideIndex][0].offsetHeight
                    })),
                    r[i]) {
                    case "t":
                    case "top":
                        r[i] = 0 - (a.eoh || 0) - ("column" !== a.type && a.calcy || 0) - q.getLayerParallaxOffset(e.id, e.layer[0].id, "v") - ("row" === a.type && void 0 !== a.marginTop ? a.marginTop[q[e.id].level] : 0) - d.b;
                        break;
                    case "b":
                    case "bottom":
                        r[i] = n - ("column" !== a.type && "row" !== a.type && a.calcy || 0) + q.getLayerParallaxOffset(e.id, e.layer[0].id, "v") - d.t;
                        break;
                    case "l":
                    case "left":
                        r[i] = 0 - ("row" === a.type ? a.pow : a.eow || 0) - ("column" === a.type ? 0 : "row" === a.type ? a.rowcalcx : a.calcx || 0) - q.getLayerParallaxOffset(e.id, e.layer[0].id, "h");
                        break;
                    case "r":
                    case "right":
                        r[i] = s - ("column" === a.type ? 0 : "row" === a.type ? a.rowcalcx : a.calcx || 0) + q.getLayerParallaxOffset(e.id, e.layer[0].id, "h");
                        break;
                    case "m":
                    case "c":
                    case "middle":
                    case "center":
                        r[i] = "x" === i ? m(s / 2 - ("column" !== a.type && a.calcx || 0) - (a.eow || 0) / 2, e.frame.reverse, e.target, i, e.id) : "y" === i ? m(n / 2 - ("column" !== a.type && a.calcy || 0) - (a.eoh || 0) / 2, e.frame.reverse, e.target, i, e.id) : r[i]
                    }
                }
                "skewX" === i && void 0 !== r[i] && (r.scaleY = void 0 === r.scaleY ? 1 : parseFloat(r.scaleY),
                r.scaleY *= Math.cos(parseFloat(r[i]) * tpGS.DEG2RAD)),
                "skewY" === i && void 0 !== r[i] && (r.scaleX = void 0 === r.scaleX ? 1 : parseFloat(r.scaleX),
                r.scaleX *= Math.cos(parseFloat(r[i]) * tpGS.DEG2RAD))
            }
        if (r.transformOrigin = o.originX + " " + o.originY + " " + o.originZ,
        !q[e.id].BUG_ie_clipPath && void 0 !== r.clip && void 0 !== a.clipPath && a.clipPath.use) {
            r.clipB = null == r.clipB ? 100 : r.clipB;
            var c = "rectangle" == a.clipPath.type
              , p = parseInt(r.clip, 0)
              , g = 100 - parseInt(r.clipB, 0)
              , u = Math.round(p / 2);
            switch (a.clipPath.origin) {
            case "invh":
                r.clipPath = "polygon(0% 0%, 0% 100%, " + p + "% 100%, " + p + "% 0%, 100% 0%, 100% 100%, " + g + "% 100%, " + g + "% 0%, 0% 0%)";
                break;
            case "invv":
                r.clipPath = "polygon(100% 0%, 0% 0%, 0% " + p + "%, 100% " + p + "%, 100% 100%, 0% 100%, 0% " + g + "%, 100% " + g + "%, 100% 0%)";
                break;
            case "cv":
                r.clipPath = c ? "polygon(" + (50 - u) + "% 0%, " + (50 + u) + "% 0%, " + (50 + u) + "% 100%, " + (50 - u) + "% 100%)" : "circle(" + p + "% at 50% 50%)";
                break;
            case "ch":
                r.clipPath = c ? "polygon(0% " + (50 - u) + "%, 0% " + (50 + u) + "%, 100% " + (50 + u) + "%, 100% " + (50 - u) + "%)" : "circle(" + p + "% at 50% 50%)";
                break;
            case "l":
                r.clipPath = c ? "polygon(0% 0%, " + p + "% 0%, " + p + "% 100%, 0% 100%)" : "circle(" + p + "% at 0% 50%)";
                break;
            case "r":
                r.clipPath = c ? "polygon(" + (100 - p) + "% 0%, 100% 0%, 100% 100%, " + (100 - p) + "% 100%)" : "circle(" + p + "% at 100% 50%)";
                break;
            case "t":
                r.clipPath = c ? "polygon(0% 0%, 100% 0%, 100% " + p + "%, 0% " + p + "%)" : "circle(" + p + "% at 50% 0%)";
                break;
            case "b":
                r.clipPath = c ? "polygon(0% 100%, 100% 100%, 100% " + (100 - p) + "%, 0% " + (100 - p) + "%)" : "circle(" + p + "% at 50% 100%)";
                break;
            case "lt":
                r.clipPath = c ? "polygon(0% 0%," + 2 * p + "% 0%, 0% " + 2 * p + "%)" : "circle(" + p + "% at 0% 0%)";
                break;
            case "lb":
                r.clipPath = c ? "polygon(0% " + (100 - 2 * p) + "%, 0% 100%," + 2 * p + "% 100%)" : "circle(" + p + "% at 0% 100%)";
                break;
            case "rt":
                r.clipPath = c ? "polygon(" + (100 - 2 * p) + "% 0%, 100% 0%, 100% " + 2 * p + "%)" : "circle(" + p + "% at 100% 0%)";
                break;
            case "rb":
                r.clipPath = c ? "polygon(" + (100 - 2 * p) + "% 100%, 100% 100%, 100% " + (100 - 2 * p) + "%)" : "circle(" + p + "% at 100% 100%)";
                break;
            case "clr":
                r.clipPath = c ? "polygon(0% 0%, 0% " + p + "%, " + (100 - p) + "% 100%, 100% 100%, 100% " + (100 - p) + "%, " + p + "% 0%)" : "circle(" + p + "% at 50% 50%)";
                break;
            case "crl":
                r.clipPath = c ? "polygon(0% " + (100 - p) + "%, 0% 100%, " + p + "% 100%, 100% " + p + "%, 100% 0%, " + (100 - p) + "% 0%)" : "circle(" + p + "% at 50% 50%)"
            }
            !0 !== q.isFirefox(e.id) && (r["-webkit-clip-path"] = r.clipPath),
            r["clip-path"] = r.clipPath,
            delete r.clip,
            delete r.clipB
        } else
            delete r.clip;
        return "mask" !== e.target && (void 0 === e.frame || void 0 === e.frame.filter && !e.forcefilter || (r.filter = v(e.frame.filter),
        r["-webkit-filter"] = r.filter,
        q.useBackdrop && (window.isSafari11 ? r["-webkit-backdrop-filter"] = h(e.frame.filter) : r["backdrop-filter"] = h(e.frame.filter)),
        window.isSafari11 && void 0 !== r.filter && void 0 === r[null == a.iOSFix || "d" == a.iOSFix ? "shape" == a.type ? "z" : "x" : a.iOSFix] && void 0 !== e.frame.filter && void 0 !== e.frame.filter.blur && (r[null == a.iOSFix || "d" == a.iOSFix ? "shape" == a.type ? "z" : "x" : a.iOSFix] = 1e-4)),
        0 <= jQuery.inArray(e.source, ["chars", "words", "lines"]) && (void 0 !== e.frame[e.source].blur || e.forcefilter) && (r.filter = v(e.frame[e.source]),
        r["-webkit-filter"] = r.filter),
        delete r.grayscale,
        delete r.blur,
        delete r.brightness),
        r.ease = (void 0 !== r.ease ? r : void 0 === r.ease && void 0 !== e.ease || void 0 !== r.ease && void 0 !== e.ease && "inherit" === r.ease ? e : e.frame.timeline).ease,
        r.ease = void 0 === r.ease || "default" === r.ease ? "power3.inOut" : r.ease,
        r
    }
      , M = function(e, t) {
        var i, a = {}, r = 0;
        for (r in void 0 === q[t]._rdF0 && (i = d("x:0;y:0;z:0;rX:0;rY:0;rZ:0;o:0;skX:0;skY:0;sX:0;sY:0;oX:50%;oY:50%;oZ:0;dir:forward;d:5", t).transform,
        q[t]._rdF0 = q[t]._rdF1 = {
            transform: d("x:0;y:0;z:0;rX:0;rY:0;rZ:0;o:0;skX:0;skY:0;sX:0;sY:0;oX:50%;oY:50%;oZ:0;tp:600px", t, !0).transform,
            mask: d("x:0;y:0", t, !0).transform,
            chars: jQuery.extend(!0, {
                blur: 0,
                grayscale: 0,
                brightness: 100
            }, i),
            words: jQuery.extend(!0, {
                blur: 0,
                grayscale: 0,
                brightness: 100
            }, i),
            lines: jQuery.extend(!0, {
                blur: 0,
                grayscale: 0,
                brightness: 100
            }, i)
        },
        q[t]._rdF1.transform.opacity = q[t]._rdF1.chars.opacity = q[t]._rdF1.words.opacity = q[t]._rdF1.lines.opacity = q[t]._rdF1.transform.scaleX = q[t]._rdF1.chars.scaleX = q[t]._rdF1.words.scaleX = q[t]._rdF1.lines.scaleX = q[t]._rdF1.transform.scaleY = q[t]._rdF1.chars.scaleY = q[t]._rdF1.words.scaleY = q[t]._rdF1.lines.scaleY = 1),
        void 0 === e.frame_0 && (e.frame_0 = "x:0"),
        void 0 === e.frame_1 && (e.frame_1 = "x:0"),
        e.dddNeeded = !1,
        e.ford)
            if (e.ford.hasOwnProperty(r)) {
                var o = e.ford[r];
                if (e[o]) {
                    if (a[o] = d(e[o], t, !0),
                    void 0 !== a[o].bgcolor && (e.bgcolinuse = !0),
                    q[t].BUG_ie_clipPath && void 0 !== e.clipPath && e.clipPath.use && void 0 !== a[o].transform.clip) {
                        var s = "rectangle" === e.clipPath.type ? 100 - parseInt(a[o].transform.clip) : 100 - Math.min(100, 2 * parseInt(a[o].transform.clip));
                        switch (e.clipPath.origin) {
                        case "clr":
                        case "rb":
                        case "rt":
                        case "r":
                            e[o + "_mask"] = "u:t;x:" + s + "%;y:0px;",
                            a[o].transform.x = q.revToResp("-" + s + "%", q[t].rle);
                            break;
                        case "crl":
                        case "lb":
                        case "lt":
                        case "cv":
                        case "l":
                            e[o + "_mask"] = "u:t;x:-" + s + "%;y:0px;",
                            a[o].transform.x = q.revToResp(s + "%", q[t].rle);
                            break;
                        case "ch":
                        case "t":
                            e[o + "_mask"] = "u:t;y:-" + s + "%;y:0px;",
                            a[o].transform.y = q.revToResp(s + "%", q[t].rle);
                            break;
                        case "b":
                            e[o + "_mask"] = "u:t;y:" + s + "%;y:0px;",
                            a[o].transform.y = q.revToResp("-" + s + "%", q[t].rle)
                        }
                        delete a[o].transform.clip,
                        delete a[o].transform.clipB
                    }
                    e[o + "_mask"] && (a[o].mask = d(e[o + "_mask"], t).transform),
                    null != a[o].mask && a[o].mask.use ? (a[o].mask.x = void 0 === a[o].mask.x ? 0 : a[o].mask.x,
                    a[o].mask.y = void 0 === a[o].mask.y ? 0 : a[o].mask.y,
                    delete a[o].mask.use,
                    a[o].mask.overflow = "hidden") : a[o].mask = {
                        ease: "default",
                        overflow: "visible"
                    },
                    e[o + "_chars"] && (a[o].chars = d(e[o + "_chars"], t, void 0, void 0, "split").transform),
                    e[o + "_words"] && (a[o].words = d(e[o + "_words"], t, void 0, void 0, "split").transform),
                    e[o + "_lines"] && (a[o].lines = d(e[o + "_lines"], t, void 0, void 0, "split").transform),
                    (e[o + "_chars"] || e[o + "_words"] || e[o + "_lines"]) && (a[o].dosplit = !0),
                    a.frame_0 = void 0 === a.frame_0 ? {
                        transform: {}
                    } : a.frame_0,
                    a[o].transform.auto && (a[o].transform = q.clone(a.frame_0.transform),
                    a[o].transform.opacity = void 0 === a[o].transform.opacity ? 0 : a[o].transform.opacity,
                    void 0 !== a.frame_0.filter && (a[o].filter = q.clone(a.frame_0.filter)),
                    void 0 !== a.frame_0.mask && (a[o].mask = q.clone(a.frame_0.mask)),
                    void 0 !== a.frame_0.chars && (a[o].chars = q.clone(a.frame_0.chars)),
                    void 0 !== a.frame_0.words && (a[o].words = q.clone(a.frame_0.words)),
                    void 0 !== a.frame_0.lines && (a[o].lines = q.clone(a.frame_0.lines)),
                    void 0 === a.frame_0.chars && void 0 === a.frame_0.words && void 0 === a.frame_0.lines || (a[o].dosplit = !0)),
                    e[o + "_sfx"] && (a[o].sfx = d(e[o + "_sfx"], t, !1, void 0, "sfx").transform),
                    e[o + "_reverse"] && (a[o].reverse = d(e[o + "_reverse"], t, !1, void 0, "reverse").transform)
                }
            }
        if (a.frame_0.dosplit && (a.frame_1.dosplit = !0),
        void 0 === e.frame_hover && void 0 === e.svgh || (a.frame_hover = d(void 0 === e.frame_hover ? "" : e.frame_hover, t),
        !q.ISM || "true" != a.frame_hover.transform.instantClick && 1 != a.frame_hover.transform.instantClick ? (delete a.frame_hover.transform.instantClick,
        a.frame_hover.transform.color = a.frame_hover.color,
        void 0 === a.frame_hover.transform.color && delete a.frame_hover.transform.color,
        void 0 !== a.frame_hover.bgcolor && 0 <= a.frame_hover.bgcolor.indexOf("gradient") ? a.frame_hover.transform.backgroundImage = a.frame_hover.bgcolor : void 0 !== a.frame_hover.bgcolor && (a.frame_hover.transform.backgroundColor = a.frame_hover.bgcolor),
        void 0 !== a.frame_hover.bgcolor && (e.bgcolinuse = !0),
        a.frame_hover.transform.opacity = void 0 === a.frame_hover.transform.opacity ? 1 : a.frame_hover.transform.opacity,
        a.frame_hover.mask = void 0 !== a.frame_hover.transform.mask && a.frame_hover.transform.mask,
        delete a.frame_hover.transform.mask,
        void 0 !== a.frame_hover.transform && ((a.frame_hover.transform.borderWidth || a.frame_hover.transform.borderStyle) && (a.frame_hover.transform.borderColor = void 0 === a.frame_hover.transform.borderColor ? "transparent" : a.frame_hover.transform.borderColor),
        "none" !== a.frame_hover.transform.borderStyle && void 0 === a.frame_hover.transform.borderWidth && (a.frame_hover.transform.borderWidth = q.revToResp(0, 4, 0).toString().replace(/,/g, " ")),
        void 0 === e.bordercolor && void 0 !== a.frame_hover.transform.borderColor && (e.bordercolor = "transparent"),
        void 0 === e.borderwidth && void 0 !== a.frame_hover.transform.borderWidth && (e.borderwidth = q.revToResp(a.frame_hover.transform.borderWidth, 4, 0)),
        void 0 === e.borderstyle) && void 0 !== a.frame_hover.transform.borderStyle && (e.borderstyle = q.revToResp(a.frame_hover.transform.borderStyle, 4, 0))) : delete a.frame_hover),
        void 0 !== e.tloop) {
            e.layerLoop = {
                from: "frame_1",
                to: "frame_999",
                repeat: -1,
                keep: !0,
                children: !0
            };
            var n = e.tloop.split(";");
            for (r in n)
                if (n.hasOwnProperty(r)) {
                    var l = n[r].split(":");
                    switch (l[0]) {
                    case "f":
                        e.layerLoop.from = l[1];
                        break;
                    case "t":
                        e.layerLoop.to = l[1];
                        break;
                    case "k":
                        e.layerLoop.keep = l[1];
                        break;
                    case "r":
                        e.layerLoop.repeat = parseInt(l[1], 0);
                        break;
                    case "c":
                        e.layerLoop.children = l[1]
                    }
                }
            e.layerLoop.count = 0
        }
        for (r in (e.loop_0 || e.loop_999) && (a.loop = d(e.loop_999, t, !0, "frame_999", "loop"),
        a.loop.frame_0 = d(e.loop_0 || "", t, !1, void 0, "loop").transform),
        a.frame_0.transform.opacity = void 0 === a.frame_0.transform.opacity ? 0 : a.frame_0.transform.opacity,
        a.frame_1.transform.opacity = void 0 === a.frame_1.transform.opacity ? 1 : a.frame_1.transform.opacity,
        a.frame_999.transform.opacity = void 0 === a.frame_999.transform.opacity ? "inherit" : a.frame_999.transform.opacity,
        e.clipPath && e.clipPath.use && (a.frame_0.transform.clip = void 0 === a.frame_0.transform.clip ? 100 : parseInt(a.frame_0.transform.clip),
        a.frame_1.transform.clip = void 0 === a.frame_1.transform.clip ? 100 : parseInt(a.frame_1.transform.clip)),
        e.resetfilter = !1,
        e.useFilter = {
            blur: !1,
            grayscale: !1,
            brightness: !1,
            b_blur: !1,
            b_grayscale: !1,
            b_brightness: !1,
            b_invert: !1,
            b_sepia: !1
        },
        a)
            void 0 !== a[r].filter ? (e.resetfilter = !0,
            e.useFilter = u(e.useFilter, a[r].filter)) : null == a[r].filter && (a[r].filter = {},
            e.useFilter.blur && (a[r].filter.blur = 0),
            e.useFilter.grayscale && (a[r].filter.grayscale = 0),
            e.useFilter.brightness && (a[r].filter.brightness = 100),
            e.useFilter.b_blur && (a[r].filter.b_blur = 0),
            e.useFilter.b_grayscale && (a[r].filter.b_grayscale = 0),
            e.useFilter.b_brightness) && (a[r].filter.b_brightness = 100);
        if (!0 !== e.resetFilter && void 0 !== a.frame_hover && (e.useFilter = u(e.useFilter, a.frame_hover)),
        e.resetfilter)
            for (var r in a.frame_0.filter = q.clone(a.frame_0.filter),
            a.frame_0.filter = g(e.useFilter, q.clone(a.frame_0.filter)),
            a)
                void 0 !== a[r].filter && "frame_1" !== r && "frame_0" !== r && (a[r].filter = q.clone(a[r].filter),
                a[r].filter = g(e.useFilter, q.clone(a[r].filter)));
        return void 0 !== a.frame_0.filter && (a.frame_1.filter = q.clone(a.frame_1.filter),
        void 0 !== a.frame_0.filter.blur && 0 !== a.frame_1.filter.blur && (a.frame_1.filter.blur = void 0 === a.frame_1.filter.blur ? 0 : a.frame_1.filter.blur),
        void 0 !== a.frame_0.filter.brightness && 100 !== a.frame_1.filter.brightness && (a.frame_1.filter.brightness = void 0 === a.frame_1.filter.brightness ? 100 : a.frame_1.filter.brightness),
        void 0 !== a.frame_0.filter.grayscale && 0 !== a.frame_1.filter.grayscale && (a.frame_1.filter.grayscale = void 0 === a.frame_1.filter.grayscale ? 0 : a.frame_1.filter.grayscale),
        void 0 !== a.frame_0.filter.b_blur && 0 !== a.frame_1.filter.b_blur && (a.frame_1.filter.b_blur = void 0 === a.frame_1.filter.b_blur ? 0 : a.frame_1.filter.b_blur),
        void 0 !== a.frame_0.filter.b_brightness && 100 !== a.frame_1.filter.b_brightness && (a.frame_1.filter.b_brightness = void 0 === a.frame_1.filter.b_brightness ? 100 : a.frame_1.filter.b_brightness),
        void 0 !== a.frame_0.filter.b_grayscale && 0 !== a.frame_1.filter.b_grayscale && (a.frame_1.filter.b_grayscale = void 0 === a.frame_1.filter.b_grayscale ? 0 : a.frame_1.filter.b_grayscale),
        void 0 !== a.frame_0.filter.b_invert && 0 !== a.frame_1.filter.b_invert && (a.frame_1.filter.b_invert = void 0 === a.frame_1.filter.b_invert ? 0 : a.frame_1.filter.b_invert),
        void 0 !== a.frame_0.filter.b_sepia) && 0 !== a.frame_1.filter.b_sepia && (a.frame_1.filter.b_sepia = void 0 === a.frame_1.filter.b_sepia ? 0 : a.frame_1.filter.b_sepia),
        f(a, t, e)
    }
      , g = function(e, t) {
        return e.blur ? t.blur = void 0 === t.blur ? 0 : t.blur : delete t.blur,
        e.brightness ? t.brightness = void 0 === t.brightness ? 100 : t.brightness : delete t.brightness,
        e.grayscale ? t.grayscale = void 0 === t.grayscale ? 0 : t.grayscale : delete t.grayscale,
        e.b_blur ? t.b_blur = void 0 === t.b_blur ? 0 : t.b_blur : delete t.b_blur,
        e.b_brightness ? t.b_brightness = void 0 === t.b_brightness ? 100 : t.b_brightness : delete t.b_brightness,
        e.b_grayscale ? t.b_grayscale = void 0 === t.b_grayscale ? 0 : t.b_grayscale : delete t.b_grayscale,
        e.b_invert ? t.b_invert = void 0 === t.b_invert ? 0 : t.b_invert : delete t.b_invert,
        e.b_sepia ? t.b_sepia = void 0 === t.b_sepia ? 0 : t.b_sepia : delete t.b_sepia,
        t
    }
      , u = function(e, t) {
        return e.blur = !0 === e.blur || void 0 !== t.blur && 0 !== t.blur && "0px" !== t.blur,
        e.grayscale = !0 === e.grayscale || void 0 !== t.grayscale && 0 !== t.grayscale && "0%" !== t.grayscale,
        e.brightness = !0 === e.brightness || void 0 !== t.brightness && 100 !== t.brightness && "100%" !== t.brightness,
        e.b_blur = !0 === e.b_blur || void 0 !== t.b_blur && 0 !== t.b_blur && "0px" !== t.b_blur,
        e.b_grayscale = !0 === e.b_grayscale || void 0 !== t.b_grayscale && 0 !== t.b_grayscale && "0%" !== t.b_grayscale,
        e.b_brightness = !0 === e.b_brightness || void 0 !== t.b_brightness && 100 !== t.b_brightness && "100%" !== t.b_brightness,
        e.b_invert = !0 === e.b_invert || void 0 !== t.b_invert && 0 !== t.b_invert && "0%" !== t.b_invert,
        e.b_sepia = !0 === e.b_sepia || void 0 !== t.b_sepia && 0 !== t.b_sepia && "0%" !== t.b_sepia,
        e
    }
      , f = function(e, t, i) {
        var a, r = {}, o = ["transform", "words", "chars", "lines", "mask"], s = "global" == q[t].perspectiveType ? q[t].perspective : 0, n = !0, l = !1;
        for (c in e)
            "loop" !== c && "frame_hover" !== c && (r = jQuery.extend(!0, r, e[c]));
        for (c in e)
            if (e.hasOwnProperty(c) && (void 0 !== e[c].timeline && (e[c].timeline.usePerspective = !1),
            "loop" !== c) && "frame_hover" !== c) {
                for (a in r.transform)
                    r.transform.hasOwnProperty(a) && (r.transform[a] = (void 0 === e[c].transform[a] ? "frame_0" === c ? q[t]._rdF0 : "frame_1" === c ? q[t]._rdF1 : r : e[c]).transform[a],
                    e[c].transform[a] = (void 0 === e[c].transform[a] ? r : e[c]).transform[a]);
                for (var d = 1; d <= 4; d++)
                    for (a in r[o[d]])
                        r[o[d]].hasOwnProperty(a) && (e[c][o[d]] = void 0 === e[c][o[d]] ? {} : e[c][o[d]],
                        r[o[d]][a] = (void 0 === e[c][o[d]][a] ? "frame_0" === c ? q[t]._rdF0 : "frame_1" === c ? q[t]._rdF1 : r : e[c])[o[d]][a],
                        e[c][o[d]][a] = (void 0 === e[c][o[d]][a] ? r : e[c])[o[d]][a]);
                void 0 !== e[c].timeline && !1 === e[c].timeline.usePerspective && void 0 !== e[c].transform && (void 0 !== e[c].transform.rotationY || void 0 !== e[c].transform.rotationX || void 0 !== e[c].transform.z || p(e[c].chars) || p(e[c].words) || p(e[c].lines)) && (s = "local" == q[t].perspectiveType ? void 0 === e[c].transform.transformPerspective ? 600 : e[c].transform.transformPerspective : s,
                e[c].timeline.usePerspective = !0,
                (p(e[c].chars) || p(e[c].words) || p(e[c].lines)) && !q.isFirefox(t) && (l = !0),
                n = !1)
            }
        if (l && requestAnimationFrame(function() {
            tpGS.gsap.set(i.c, {
                transformStyle: "preserve-3d"
            })
        }),
        void 0 !== e.frame_0.timeline && e.frame_0.timeline.usePerspective && (e.frame_0.transform.transformPerspective = "local" === q[t].perspectiveType ? void 0 === e.frame_0.transform.transformPerspective ? s : e.frame_0.transform.transformPerspective : "isometric" === q[t].perspectiveType ? 0 : q[t].perspective),
        n)
            for (var c in e) {
                if (!e.hasOwnProperty(c) || void 0 === e[c].transform)
                    continue;
                delete e[c].transform.transformPerspective
            }
        return e
    }
      , n = function(e, t, i) {
        if (0 === e.length)
            return {};
        for (var a = e[0].getElementsByClassName(t), r = {}, o = 0; o < a.length; o++)
            void 0 !== i && -1 !== a[o].className.indexOf(i) || (r[a[o].id] = a[o]);
        if (void 0 !== e[1])
            for (a = e[1].getElementsByClassName(t),
            o = 0; o < a.length; o++)
                void 0 !== i && -1 !== a[o].className.indexOf(i) || (r[a[o].id] = a[o]);
        return r
    }
      , T = function(e, t, i) {
        if ("BR" == e[0].nodeName || "br" == e[0].tagName || "object" != typeof e[0].className && 0 <= e[0].className.indexOf("rs_splitted_"))
            return !1;
        q.sA(e[0], "stylerecorder", !0),
        void 0 === e[0].id && (e[0].id = "rs-layer-sub-" + Math.round(1e6 * Math.random())),
        q[i].computedStyle[e[0].id] = window.getComputedStyle(e[0], null);
        var a = void 0 !== e[0].id && void 0 !== q[i]._L[e[0].id] ? q[i]._L[e[0].id] : e.data()
          , r = "rekursive" === t ? jQuery(q.closestClass(e[0], "rs-layer")) : void 0
          , o = (void 0 !== r && (q[i].computedStyle[r[0].id] = void 0 === q[i].computedStyle[r[0].id] ? window.getComputedStyle(r[0], null) : q[i].computedStyle[r[0].id]),
        void 0 !== r && q[i].computedStyle[e[0].id].fontSize == q[i].computedStyle[r[0].id].fontSize && c(q[i].computedStyle[e[0].id].fontWeight) == c(q[i].computedStyle[r[0].id].fontWeight) && q[i].computedStyle[e[0].id].lineHeight == q[i].computedStyle[r[0].id].lineHeight)
          , s = o ? void 0 !== r[0].id && void 0 !== q[i]._L[r[0].id] ? q[i]._L[r[0].id] : r.data() : void 0
          , n = 0;
        for (a.basealign = void 0 === a.basealign ? "grid" : a.basealign,
        a._isnotext || (a.fontSize = q.revToResp(o ? void 0 === s.fontsize ? parseInt(q[i].computedStyle[r[0].id].fontSize, 0) || 20 : s.fontsize : void 0 === a.fontsize ? "rekursive" !== t ? 20 : "inherit" : a.fontsize, q[i].rle),
        a.fontWeight = q.revToResp(o ? void 0 === s.fontweight ? q[i].computedStyle[r[0].id].fontWeight || "inherit" : s.fontweight : void 0 === a.fontweight ? q[i].computedStyle[e[0].id].fontWeight || "inherit" : a.fontweight, q[i].rle),
        a.whiteSpace = q.revToResp(o ? void 0 === s.whitespace ? "nowrap" : s.whitespace : void 0 === a.whitespace ? "nowrap" : a.whitespace, q[i].rle),
        a.textAlign = q.revToResp(o ? void 0 === s.textalign ? "left" : s.textalign : void 0 === a.textalign ? "left" : a.textalign, q[i].rle),
        a.letterSpacing = q.revToResp(o ? void 0 === s.letterspacing ? parseInt(q[i].computedStyle[r[0].id].letterSpacing, 0) || "inherit" : s.letterspacing : void 0 === a.letterspacing ? parseInt("normal" === q[i].computedStyle[e[0].id].letterSpacing ? 0 : q[i].computedStyle[e[0].id].letterSpacing, 0) || "inherit" : a.letterspacing, q[i].rle),
        a.textDecoration = o ? void 0 === s.textDecoration ? "none" : s.textDecoration : void 0 === a.textDecoration ? "none" : a.textDecoration,
        n = 25,
        n = void 0 === r || "I" !== e[0].tagName && "STRONG" !== e[0].tagName ? n : "inherit",
        void 0 !== a.tshadow && (a.tshadow.b = q.revToResp(a.tshadow.b, q[i].rle),
        a.tshadow.h = q.revToResp(a.tshadow.h, q[i].rle),
        a.tshadow.v = q.revToResp(a.tshadow.v, q[i].rle))),
        "group" === a.type && (a.whiteSpace = "normal",
        a.textAlign = q.revToResp(o ? void 0 === s.textalign ? "left" : s.textalign : void 0 === a.textalign ? "left" : a.textalign, q[i].rle)),
        void 0 !== a.bshadow && (a.bshadow.b = q.revToResp(a.bshadow.b, q[i].rle),
        a.bshadow.h = q.revToResp(a.bshadow.h, q[i].rle),
        a.bshadow.v = q.revToResp(a.bshadow.v, q[i].rle),
        a.bshadow.s = q.revToResp(a.bshadow.s, q[i].rle)),
        void 0 !== a.tstroke && (a.tstroke.w = q.revToResp(a.tstroke.w, q[i].rle)),
        a.display = (o ? void 0 === s.display ? q[i].computedStyle[r[0].id] : s : void 0 === a.display ? q[i].computedStyle[e[0].id] : a).display,
        a.float = q.revToResp(o ? void 0 === s.float ? q[i].computedStyle[r[0].id].float || "none" : s.float : void 0 === a.float ? "none" : a.float, q[i].rle),
        a.clear = q.revToResp(o ? void 0 === s.clear ? q[i].computedStyle[r[0].id].clear || "none" : s.clear : void 0 === a.clear ? "none" : a.clear, q[i].rle),
        a.lineHeight = q.revToResp(e.is("img") || -1 != jQuery.inArray(a.layertype, ["video", "image", "audio"]) ? n : o ? void 0 === s.lineheight ? parseInt(q[i].computedStyle[r[0].id].lineHeight, 0) || n : s.lineheight : void 0 === a.lineheight ? n : a.lineheight, q[i].rle),
        a.zIndex = o ? void 0 === s.zindex ? parseInt(q[i].computedStyle[r[0].id].zIndex, 0) || "inherit" : s.zindex : void 0 === a.zindex ? parseInt(q[i].computedStyle[e[0].id].zIndex, 0) || "inherit" : parseInt(a.zindex),
        l = 0; l < 4; l++)
            a["padding" + O[l]] = q.revToResp(void 0 === a["padding" + I[l]] ? parseInt(q[i].computedStyle[e[0].id]["padding" + O[l]], 0) || 0 : a["padding" + I[l]], q[i].rle),
            a["margin" + O[l]] = q.revToResp(void 0 === a["margin" + I[l]] ? parseInt(q[i].computedStyle[e[0].id]["margin" + O[l]], 0) || 0 : a["margin" + I[l]], q[i].rle),
            a["border" + O[l] + "Width"] = void 0 === a.borderwidth ? parseInt(q[i].computedStyle[e[0].id]["border" + O[l] + "Width"], 0) || 0 : a.borderwidth[l],
            a["border" + O[l] + "Color"] = void 0 === a.bordercolor ? q[i].computedStyle[e[0].id]["border-" + I[l] + "-color"] : a.bordercolor,
            a["border" + R[l] + "Radius"] = q.revToResp(void 0 === a.borderradius ? q[i].computedStyle[e[0].id]["border" + R[l] + "Radius"] || 0 : a.borderradius[l], q[i].rle);
        if (a.borderStyle = q.revToResp(void 0 === a.borderstyle ? q[i].computedStyle[e[0].id].borderStyle || 0 : a.borderstyle, q[i].rle),
        "rekursive" !== t ? (a.color = q.revToResp(void 0 === a.color ? "#ffffff" : a.color, q[i].rle, void 0, "||"),
        a.minWidth = q.revToResp(void 0 === a.minwidth ? parseInt(q[i].computedStyle[e[0].id].minWidth, 0) || 0 : a.minwidth, q[i].rle),
        a.minHeight = q.revToResp(void 0 === a.minheight ? parseInt(q[i].computedStyle[e[0].id].minHeight, 0) || 0 : a.minheight, q[i].rle),
        a.width = q.revToResp(void 0 === a.width ? "auto" : q.smartConvertDivs(a.width), q[i].rle),
        a.height = q.revToResp(void 0 === a.height ? "auto" : q.smartConvertDivs(a.height), q[i].rle),
        a.maxWidth = q.revToResp(void 0 === a.maxwidth ? parseInt(q[i].computedStyle[e[0].id].maxWidth, 0) || "none" : a.maxwidth, q[i].rle),
        a.maxHeight = q.revToResp(-1 !== jQuery.inArray(a.type, ["column", "row"]) ? "none" : void 0 !== a.maxheight ? parseInt(q[i].computedStyle[e[0].id].maxHeight, 0) || "none" : a.maxheight, q[i].rle)) : "html" === a.layertype && (a.width = q.revToResp(e[0].width, q[i].rle),
        a.height = q.revToResp(e[0].height, q[i].rle)),
        a._incolumn)
            for (var l = 0; l < a.height.length; l++)
                -1 !== a.height[l].indexOf("%") && 98 < parseFloat(a.height[l]) && (a.height[l] = a.height[l].replace("%", "px"));
        for (a.styleProps = {
            background: e[0].style.background,
            "background-color": e[0].style["background-color"],
            color: e[0].style.color,
            cursor: e[0].style.cursor,
            "font-style": e[0].style["font-style"]
        },
        null == a.bshadow && (a.styleProps.boxShadow = e[0].style.boxShadow),
        "" !== a.styleProps.background && void 0 !== a.styleProps.background && a.styleProps.background !== a.styleProps["background-color"] || delete a.styleProps.background,
        "" == a.styleProps.color && (a.styleProps.color = q[i].computedStyle[e[0].id].color),
        l = 0; l < 4; l++)
            y(a["padding" + O[l]], 0) && delete a["padding" + O[l]],
            y(a["margin" + O[l]], 0) && delete a["margin" + O[l]],
            (y(a["border" + R[l] + "Radius"], "0px") || y(a["border" + R[l] + "Radius"], "0")) && delete a["border" + R[l] + "Radius"];
        if (y(a.borderStyle, "none"))
            for (delete a.borderStyle,
            l = 0; l < 4; l++)
                delete a["border" + O[l] + "Width"],
                delete a["border" + O[l] + "Color"]
    }
      , y = function(e, t) {
        return t === e[0] && t === e[1] && t === e[2] && t === e[3]
    }
      , i = function(e) {
        var t, i, a, r, o, s = e.a, n = e.b, l = e.c, d = e.d, c = e.e, p = {}, g = {}, u = q[n]._L[s[0].id], h = s[0].className, u = void 0 === u ? {} : u;
        if ("object" == typeof h && (h = ""),
        void 0 !== s && void 0 !== s[0] && (0 <= h.indexOf("rs_splitted") || "BR" == s[0].nodeName || "br" == s[0].tagName || 0 < s[0].tagName.indexOf("FCR") || 0 < s[0].tagName.indexOf("BCR")))
            return !1;
        var m, c = "individual" === c ? u.slideIndex : c, v = function(e, t, i) {
            if (void 0 !== e) {
                if ("BR" == e[0].nodeName || "br" == e[0].tagName)
                    return !1;
                var a, r = q[t].level, o = void 0 !== e[0] && void 0 !== e[0].id && void 0 !== q[t]._L[e[0].id] ? q[t]._L[e[0].id] : e.data(), s = (void 0 === (o = void 0 === o.basealign ? i.data() : o)._isnotext && (o._isnotext = void 0 !== i && void 0 !== i[0] && 0 < i[0].length ? q.gA(i[0], "_isnotext") : o._isnotext),
                {
                    basealign: void 0 === o.basealign ? "grid" : o.basealign,
                    lineHeight: void 0 === o.basealign ? "inherit" : parseInt(o.lineHeight[r]),
                    color: void 0 === o.color ? void 0 : o.color[r],
                    width: void 0 === o.width ? void 0 : "a" === o.width[r] ? "auto" : o.width[r],
                    height: void 0 === o.height ? void 0 : "a" === o.height[r] ? "auto" : o.height[r],
                    minWidth: void 0 === o.minWidth ? void 0 : "n" === o.minWidth[r] ? "none" : o.minWidth[r],
                    minHeight: void 0 === o.minHeight ? void 0 : "n" == o.minHeight[r] ? "none" : o.minHeight[r],
                    maxWidth: void 0 === o.maxWidth ? void 0 : "n" == o.maxWidth[r] ? "none" : o.maxWidth[r],
                    maxHeight: void 0 === o.maxHeight ? void 0 : "n" == o.maxHeight[r] ? "none" : o.maxHeight[r],
                    float: o.float[r],
                    clear: o.clear[r]
                });
                for (o.borderStyle && (s.borderStyle = o.borderStyle[r]),
                a = 0; a < 4; a++)
                    o["padding" + O[a]] && (s["padding" + O[a]] = o["padding" + O[a]][r]),
                    o["margin" + O[a]] && (s["margin" + O[a]] = parseInt(o["margin" + O[a]][r])),
                    o["border" + R[a] + "Radius"] && (s["border" + R[a] + "Radius"] = o["border" + R[a] + "Radius"][r]),
                    void 0 !== s.borderStyle && "none" !== s.borderStyle && (o["border" + O[a] + "Color"] && (s["border" + O[a] + "Color"] = o["border" + O[a] + "Color"]),
                    o["border" + O[a] + "Width"]) && (s["border" + O[a] + "Width"] = parseInt(o["border" + O[a] + "Width"]));
                return o._isnotext || (s.textDecoration = o.textDecoration,
                s.fontSize = parseInt(o.fontSize[r]),
                s.fontWeight = parseInt(o.fontWeight[r]),
                s.letterSpacing = parseInt(o.letterSpacing[r]) || 0,
                s.textAlign = o.textAlign[r],
                s.whiteSpace = o.whiteSpace[r],
                s.whiteSpace = "normal" === s.whiteSpace && "auto" === s.width && (!0 !== o._incolumn && !0 !== o._ingroup || "relative" !== o.position) ? "nowrap" : s.whiteSpace,
                s.display = o.display,
                void 0 !== o.tshadow && (s.textShadow = parseInt(o.tshadow.h[r], 0) + "px " + parseInt(o.tshadow.v[r], 0) + "px " + o.tshadow.b[r] + " " + o.tshadow.c),
                void 0 !== o.tstroke && (s.textStroke = parseInt(o.tstroke.w[r], 0) + "px " + o.tstroke.c)),
                "group" === o.type && (s.whiteSpace = o.whiteSpace,
                s.textAlign = o.textAlign[r],
                s.display = o.display),
                void 0 !== o.bshadow && (s.boxShadow = parseInt(o.bshadow.h[r], 0) + "px " + parseInt(o.bshadow.v[r], 0) + "px " + parseInt(o.bshadow.b[r], 0) + "px " + parseInt(o.bshadow.s[r], 0) + "px " + o.bshadow.c),
                s
            }
        }(s, n, e.RSL), f = "off" === d ? 1 : q[n].CM.w;
        if (void 0 === u._isnotext && (u._isnotext = void 0 !== v.RSL && void 0 !== v.RSL[0] && 0 < v.RSL[0].length ? q.gA(v.RSL[0], "_isnotext") : u._isnotext),
        u._incolumn && ("shape" === u.type || "text" === u.type || "button" === u.type) && ("" + v.height).indexOf(!1) && (v.height = v.height),
        u.OBJUPD = null == u.OBJUPD ? {} : u.OBJUPD,
        u.caches = null == u.caches ? {} : u.caches,
        "column" === u.type) {
            for (i = {},
            m = {},
            t = 0; t < 4; t++)
                void 0 !== v["margin" + O[t]] && (i["padding" + O[t]] = Math.round(v["margin" + O[t]] * f) + "px",
                m["margin" + O[t]] = v["margin" + O[t]],
                delete v["margin" + O[t]]);
            jQuery.isEmptyObject(i) || tpGS.gsap.set(u._column, i)
        }
        var y = q.clone(u.OBJUPD.POBJ)
          , w = q.clone(u.OBJUPD.LPOBJ);
        if (-1 === h.indexOf("rs_splitted_")) {
            for (i = {
                overwrite: "auto"
            },
            t = 0; t < 4; t++)
                void 0 !== v["border" + R[t] + "Radius"] && (i["border" + R[t] + "Radius"] = v["border" + R[t] + "Radius"]),
                void 0 !== v["padding" + O[t]] && (i["padding" + O[t]] = Math.round(v["padding" + O[t]] * f) + "px"),
                void 0 === v["margin" + O[t]] || u._incolumn || u._ingroup && "absolute" != u.position || (i["margin" + O[t]] = "row" === u.type ? 0 : Math.round(v["margin" + O[t]] * f) + "px");
            if (void 0 !== u.spike && (i["clip-path"] = i["-webkit-clip-path"] = u.spike),
            v.boxShadow && (i.boxShadow = v.boxShadow),
            "column" !== u.type && (void 0 !== v.borderStyle && "none" !== v.borderStyle && (0 !== v.borderTopWidth || 0 < v.borderBottomWidth || 0 < v.borderLeftWidth || 0 < v.borderRightWidth) ? (i.borderTopWidth = Math.round(v.borderTopWidth * f) + "px",
            i.borderBottomWidth = Math.round(v.borderBottomWidth * f) + "px",
            i.borderLeftWidth = Math.round(v.borderLeftWidth * f) + "px",
            i.borderRightWidth = Math.round(v.borderRightWidth * f) + "px",
            i.borderStyle = v.borderStyle,
            i.borderTopColor = v.borderTopColor,
            i.borderBottomColor = v.borderBottomColor,
            i.borderLeftColor = v.borderLeftColor,
            i.borderRightColor = v.borderRightColor) : ("none" === v.borderStyle && (i.borderStyle = "none"),
            void 0 !== v.borderTopColor && (i.borderTopColor = v.borderTopColor),
            void 0 !== v.borderBottomColor && (i.borderBottomColor = v.borderBottomColor),
            void 0 !== v.borderLeftColor && (i.borderLeftColor = v.borderLeftColor),
            void 0 !== v.borderRightColor && (i.borderRightColor = v.borderRightColor))),
            "shape" !== u.type && "image" !== u.type || !(L(v.borderTopLeftRadius) || L(v.borderTopRightRadius) || L(v.borderBottomLeftRadius) || L(v.borderBottomRightRadius)) || (i.overflow = "hidden"),
            u._isnotext || ("column" !== u.type && (i.fontSize = Math.round(v.fontSize * f) + "px",
            i.fontWeight = v.fontWeight,
            i.letterSpacing = v.letterSpacing * f + "px",
            v.textShadow && (i.textShadow = v.textShadow),
            v.textStroke) && (i["-webkit-text-stroke"] = v.textStroke),
            i.lineHeight = Math.round(v.lineHeight * f) + "px",
            i.textAlign = v.textAlign),
            "video" === u.type && u.html5vid && void 0 !== u.deepmedia && void 0 !== u.deepmedia[0] && null != u.deepmedia[0].parentNode && (L(v.borderTopLeftRadius) || L(v.borderTopRightRadius) || L(v.borderBottomLeftRadius) || L(v.borderBottomRightRadius)) && tpGS.gsap.set(u.deepmedia[0].parentNode, function(e) {
                e = q.clone(e);
                return e.top = 0 - ((parseInt(e.borderTopWidth) || 0) + (parseInt(e.borderBottomWidth) || 0)) / 2 + "px",
                e.left = 0 - ((parseInt(e.borderLeftWidth) || 0) + (parseInt(e.borderRightWidth) || 0)) / 2 + "px",
                e.borderStyle = void 0 !== e.borderTopWidth || void 0 !== e.borderBottomWidth || void 0 !== e.borderLeftWidth || void 0 !== e.borderRightWidth ? "solid" : "none",
                e.borderColor = "transparent",
                e.boxSizing = "content-box",
                e
            }(i)),
            "column" === u.type && void 0 !== u.cbg && (void 0 === u.cbg_set && (u.cbg_set = u.styleProps["background-color"],
            u.cbg_set = "" == u.cbg_set || void 0 === u.cbg_set || 0 == u.cbg_set.length ? "transparent" : u.cbg_set,
            u.cbg_img = void 0 !== s[0].dataset.bglazy ? 'url("' + s[0].dataset.bglazy + '")' : s.css("backgroundImage"),
            "" !== u.cbg_img && void 0 !== u.cbg_img && "none" !== u.cbg_img && (u.cbg_img_r = s.css("backgroundRepeat"),
            u.cbg_img_p = s.css("backgroundPosition"),
            u.cbg_img_s = s.css("backgroundSize")),
            u.cbg_o = u.bgopacity && 1,
            p.backgroundColor = "transparent",
            p.backgroundImage = ""),
            i.backgroundColor = "transparent",
            i.backgroundImage = "none"),
            u._isstatic && u.elementHovered && (r = s.data("frames")) && r.frame_hover && r.frame_hover.transform)
                for (o in i)
                    i.hasOwnProperty(o) && r.frame_hover.transform.hasOwnProperty(o) && delete i[o];
            if ("IFRAME" == s[0].nodeName && "html" === q.gA(s[0], "layertype") && (b = "slide" == v.basealign ? q[n].module.width : q.iWA(n, c),
            _ = "slide" == v.basealign || "carousel" == q[n].sliderType && "v" === q[n].carousel.orientation ? q[n].module.height : q.iHE(n),
            i.width = !q.isNumeric(v.width) && 0 <= v.width.indexOf("%") ? !u._isstatic || u._incolumn || u._ingroup ? v.width : b * parseInt(v.width, 0) / 100 : k(v.width, f, "auto", b, "auto"),
            i.height = !q.isNumeric(v.height) && 0 <= v.height.indexOf("%") ? !u._isstatic || u._incolumn || u._ingroup ? v.height : _ * parseInt(v.height, 0) / 100 : k(v.height, f, "auto", b, "auto")),
            p = jQuery.extend(!0, p, i),
            q[n].firstLayerCalculated = !0,
            "rekursive" != l) {
                var b = "slide" == v.basealign ? q[n].module.width : q.iWA(n, c)
                  , _ = "slide" == v.basealign || "carousel" == q[n].sliderType && "v" === q[n].carousel.orientation ? q[n].module.height : q.iHE(n)
                  , d = !q.isNumeric(v.width) && 0 <= v.width.indexOf("%") ? !u._isstatic || u._incolumn || u._ingroup ? v.width : b * parseInt(v.width, 0) / 100 : k(v.width, f, "auto", b, "auto")
                  , h = !q.isNumeric(v.height) && 0 <= v.height.indexOf("%") ? !u._isstatic || u._incolumn || u._ingroup ? v.height : _ * parseInt(v.height, 0) / 100 : k(v.height, f, "auto", b, "auto")
                  , S = {
                    maxWidth: k(v.maxWidth, f, "none", b, "none"),
                    maxHeight: k(v.maxHeight, f, "none", _, "none"),
                    minWidth: k(v.minWidth, f, "0px", b, 0),
                    minHeight: k(v.minHeight, f, "0px", _, 0),
                    height: h,
                    width: d,
                    overwrite: "auto"
                }
                  , l = (1 == u.heightSetByVideo && (S.height = u.vidOBJ.height),
                !1);
                if (u._incolumn) {
                    for (y = jQuery.extend(!0, y, {
                        minWidth: d,
                        maxWidth: d,
                        float: v.float,
                        clear: v.clear
                    }),
                    t = 0; t < 4; t++)
                        void 0 !== v["margin" + O[t]] && (y["margin" + O[t]] = v["margin" + O[t]] * f + "px");
                    w.width = "100%",
                    void 0 !== v.display && "inline-block" !== v.display || (g = {
                        width: "100%"
                    }),
                    S.width = !q.isNumeric(v.width) && 0 <= v.width.indexOf("%") ? "100%" : d,
                    "image" === u.type && tpGS.gsap.set(u.img, {
                        width: "100%"
                    })
                } else
                    !q.isNumeric(v.width) && 0 <= v.width.indexOf("%") && (u._isgroup && "absolute" === u.position || (!0 === u._ingroup || 1 == u._incolumn) && "relative" === u.position || void 0 !== u.reqWrp && (!u.reqWrp.loop || !u.reqWrp.mask) ? y.width = "slide" === u.basealign || !0 === u._ingroup || u._isstatic ? d : q.iWA(n, c) * q[n].CM.w * parseInt(d) / 100 + "px" : y.minWidth = "slide" === u.basealign || !0 === u._ingroup || u._isstatic ? d : q.iWA(n, c) * q[n].CM.w * parseInt(d) / 100 + "px",
                    w.width = "100%",
                    g.width = "100%");
                if (!0 === u._ingroup && "relative" === u.position && (y.float = v.float,
                y.lineHeight = v.lineHeight + "px",
                p.verticalAlign = "top",
                g.verticalAlign = "top",
                w.verticalAlign = "top",
                y.verticalAlign = "inherit"),
                !q.isNumeric(v.height) && 0 <= v.height.indexOf("%") && (y.minHeight = "slide" === u.basealign || !0 === u._ingroup || u._isstatic ? h : q.iHE(n) * (q[n].currentRowsHeight > q[n].gridheight[q[n].level] ? 1 : q[n].CM.w) * parseInt(h) / 100 + "px",
                void 0 === u.reqWrp || u.reqWrp.loop || u.reqWrp.mask || (y.height = y.minHeight),
                w.height = "100%",
                g.height = "100%",
                l = !0),
                u._isnotext ? "group" == u.type && (S.whiteSpace = "normal") : (S.whiteSpace = v.whiteSpace,
                S.textAlign = v.textAlign,
                S.textDecoration = v.textDecoration),
                "npc" != v.color && void 0 !== v.color && (S.color = v.color),
                u._ingroup && (u._groupw = S.minWidth,
                u._grouph = S.minHeight),
                "row" === u.type && (q.isNumeric(S.minHeight) || 0 <= S.minHeight.indexOf("px")) && "0px" !== S.minHeight && 0 !== S.minHeight && "0" !== S.minHeight && "none" !== S.minHeight ? S.height = S.minHeight : "row" === u.type && (S.height = "auto"),
                u._isstatic && u.elementHovered && (r = s.data("frames")) && r.frame_hover && r.frame_hover.transform)
                    for (o in S)
                        S.hasOwnProperty(o) && r.frame_hover.transform.hasOwnProperty(o) && delete S[o];
                if ("group" !== u.type && "row" !== u.type && "column" !== u.type && (!q.isNumeric(S.width) && 0 <= S.width.indexOf("%") && (S.width = "100%"),
                !q.isNumeric(S.height)) && 0 <= S.height.indexOf("%") && (S.height = "100%"),
                u._isgroup) {
                    for (!q.isNumeric(S.width) && 0 <= S.width.indexOf("%") && (S.width = "100%"),
                    "absolute" != u.position || u._ingroup || u._incolumn || !l ? y.height = l ? "100%" : S.height : (y.height = y.minHeight,
                    S.height = "100%"),
                    S.lineHeight = void 0 === v.lineHeight || l ? "initial" : v.lineHeight + "px",
                    S.verticalAlign = u.verticalalign,
                    S.textAlign = v.textAlign,
                    t = 0; t < 4; t++)
                        void 0 !== p["border" + R[t] + "Radius"] && (g["border" + R[t] + "Radius"] = p["border" + R[t] + "Radius"]);
                    "relative" == u.position && void 0 !== v.display && (y.display = v.display),
                    "auto" == v.width && (g.position = "relative")
                }
                p = jQuery.extend(!0, p, S),
                null != u.svg_src && void 0 !== u.svgI && ("string" == typeof u.svgI.fill && (u.svgI.fill = [u.svgI.fill]),
                u.svgTemp = q.clone(u.svgI),
                delete u.svgTemp.svgAll,
                void 0 !== u.svgTemp.fill && !0 !== (u.elementHovered && u._isstatic) && (u.svgTemp.fill = u.svgTemp.fill[q[n].level],
                u.svg.length <= 0 && (u.svg = s.find("svg")),
                u.svgPath.length <= 0 && (u.svgPath = u.svg.find(u.svgI.svgAll ? "path, circle, ellipse, line, polygon, polyline, rect" : "path")),
                tpGS.gsap.set(u.svgPath, {
                    fill: u.svgI.fill[q[n].level]
                })),
                tpGS.gsap.set(u.svg, u.svgTemp))
            }
            if ("row" === u.type)
                for (t = 0; t < 4; t++)
                    void 0 !== v["margin" + O[t]] && (y["padding" + O[t]] = v["margin" + O[t]] * f + "px");
            if (u._ingroup && "relative" == u.position) {
                for (t = 0; t < 4; t++)
                    void 0 !== v["margin" + O[t]] && (y["margin" + O[t]] = v["margin" + O[t]] * f + "px");
                "shape" === u.type && "100%" == g.width && "100%" == g.height && (g.position = "absolute")
            }
            if ("column" === u.type && u.cbg && 0 < u.cbg.length) {
                for (void 0 !== u.cbg_img_s && void 0 !== u.cbg && (u.cbg[0].style.backgroundSize = u.cbg_img_s),
                i = {},
                "" !== u.styleProps.cursor && (i.cursor = u.styleProps.cursor),
                "" !== u.cbg_set && "transparent" !== u.cbg_set && (i.backgroundColor = u.cbg_set),
                "" !== u.cbg_img && "none" !== u.cbg_img && (i.backgroundImage = u.cbg_img,
                "" !== u.cbg_img_r && (i.backgroundRepeat = u.cbg_img_r),
                "" !== u.cbg_img_p) && (i.backgroundPosition = u.cbg_img_p),
                "" !== u.cbg_o && void 0 !== u.cbg_o && (i.opacity = u.cbg_o),
                t = 0; t < 4; t++)
                    void 0 !== v.borderStyle && "none" !== v.borderStyle && (void 0 !== v["border" + O[t] + "Width"] && (i["border" + O[t] + "Width"] = Math.round(parseInt(v["border" + O[t] + "Width"]) * f) + "px"),
                    void 0 !== v["border" + O[t] + "Color"]) && (i["border" + O[t] + "Color"] = v["border" + O[t] + "Color"]),
                    v["border" + R[t] + "Radius"] && (i["border" + R[t] + "Radius"] = v["border" + R[t] + "Radius"]);
                for (void 0 !== v.borderStyle && "none" !== v.borderStyle && (i.borderStyle = v.borderStyle),
                (a = JSON.stringify(i)) !== q[n].emptyObject && a !== u.caches.cbgS && tpGS.gsap.set(u.cbg, i),
                u.caches.cbgS = a,
                i = {},
                t = 0; t < 4; t++)
                    m["margin" + O[t]] && (i[I[t]] = m["margin" + O[t]] * f + "px");
                (a = JSON.stringify(i)) !== q[n].emptyObject && a !== u.caches.cbgmaskS && (tpGS.gsap.set(u.cbgmask, i),
                u.caches.cbgmaskS = a)
            }
            for (var x in void 0 === u.reqWrp || u.reqWrp.loop || u.reqWrp.mask || "100%" != p.width || "100%" != p.height || (p.position = "absolute"),
            "auto" === y.maxWidth && (y.maxWidth = "inherit"),
            "auto" === y.maxHeight && (y.maxHeight = "inherit"),
            "auto" === g.maxWidth && (g.maxWidth = "inherit"),
            "auto" === g.maxHeight && (g.maxHeight = "inherit"),
            "auto" === w.maxWidth && (w.maxWidth = "inherit"),
            "auto" === w.maxHeight && (w.maxHeight = "inherit"),
            u.fullinset && 1 == u._ingroup && "absolute" === u.position && (y.width = "auto",
            y.minHeight = "auto",
            y.height = "auto",
            y.left = void 0 !== p.marginLeft && "0px" !== p.marginLeft ? p.marginLeft : "0px",
            y.right = void 0 !== p.marginRight && "0px" !== p.marginRight ? p.marginRight : "0px",
            y.top = void 0 !== p.marginTop && "0px" !== p.marginTop ? p.marginTop : "0px",
            y.bottom = void 0 !== p.marginBottom && "0px" !== p.marginBottom ? p.marginBottom : "0px",
            delete p.marginLeft,
            delete p.marginRight,
            delete p.marginTop,
            delete p.marginBottom),
            void 0 !== u.vidOBJ && (p.width = u.vidOBJ.width,
            p.height = u.vidOBJ.height),
            void 0 !== u.OBJUPD.lppmOBJ && (void 0 !== u.OBJUPD.lppmOBJ.minWidth && (w.minWidth = u.OBJUPD.lppmOBJ.minWidth,
            g.minWidth = u.OBJUPD.lppmOBJ.minWidth),
            void 0 !== u.OBJUPD.lppmOBJ.minHeight) && (w.minHeight = u.OBJUPD.lppmOBJ.minHeight,
            g.minHeight = u.OBJUPD.lppmOBJ.minHeight,
            y.minHeight = u.OBJUPD.lppmOBJ.minHeight),
            u._incolumn && "group" == u.type && void 0 !== y && "100%" == y.minWidth && (g.width = "100%"),
            u._isgroup && u.thFixed && void 0 !== u.reqWrp && u.reqWrp.loop && u.reqWrp.mask && "auto" == v.width && (w.position = "relative"),
            !u._ingroup || u.reqWrp.loop || u.reqWrp.mask || "absolute" != u.position || "100%" != y.minHeight || (y.height = "100%"),
            q[n].calcResponsiveLayerHooks) {
                x = q[n].calcResponsiveLayerHooks[x]({
                    id: n,
                    L: s,
                    obj: v,
                    _: u,
                    inobj: e,
                    LOBJ: p,
                    LPOBJ: w,
                    MOBJ: g,
                    POBJ: y
                });
                null != x && (void 0 !== x.obj && (v = jQuery.extend(!0, v, x.obj)),
                void 0 !== x.LOBJ && (p = jQuery.extend(!0, p, x.LOBJ)),
                void 0 !== x.LPOBJ && (w = jQuery.extend(!0, w, x.LPOBJ)),
                void 0 !== x.MOBJ && (g = jQuery.extend(!0, g, x.MOBJ)),
                void 0 !== x.POBJ) && (y = jQuery.extend(!0, y, x.POBJ))
            }
            a = JSON.stringify(p),
            b = JSON.stringify(w),
            _ = JSON.stringify(g),
            c = JSON.stringify(y),
            void 0 === u.imgOBJ || void 0 !== u.caches.imgOBJ && u.caches.imgOBJ.width === u.imgOBJ.width && u.caches.imgOBJ.height === u.imgOBJ.height && u.caches.imgOBJ.left === u.imgOBJ.left && u.caches.imgOBJ.right === u.imgOBJ.right && u.caches.imgOBJ.top === u.imgOBJ.top && u.caches.imgOBJ.bottom === u.imgOBJ.bottom || (u.caches.imgOBJ = q.clone(u.imgOBJ),
            u.imgOBJ.position = "relative",
            tpGS.gsap.set(u.img, u.imgOBJ)),
            void 0 === u.mediaOBJ || void 0 !== u.caches.mediaOBJ && u.caches.mediaOBJ.width === u.mediaOBJ.width && u.caches.mediaOBJ.height === u.mediaOBJ.height && u.caches.mediaOBJ.display === u.mediaOBJ.display || (u.caches.mediaOBJ = q.clone(u.mediaOBJ),
            u.media.css(u.mediaOBJ)),
            a != q[n].emptyObject && a != u.caches.LOBJ && (tpGS.gsap.set(s, p),
            u.caches.LOBJ = a),
            void 0 !== u.lp && b != q[n].emptyObject && b != u.caches.LPOBJ && (tpGS.gsap.set(u.lp, w),
            u.caches.LPOBJ = b),
            _ != q[n].emptyObject && _ != u.caches.MOBJ && (tpGS.gsap.set(u.m, g),
            u.caches.MOBJ = _),
            c != q[n].emptyObject && c != u.caches.POBJ && (tpGS.gsap.set(u.p, y),
            u.caches.POBJ = c,
            u.caches.POBJ_LEFT = y.left,
            u.caches.POBJ_TOP = y.top)
        }
    }
      , C = function(e) {
        var t, i = {
            l: "none",
            lw: 10,
            r: "none",
            rw: 10
        };
        for (t in e = e.split(";"))
            if (e.hasOwnProperty(t)) {
                var a = e[t].split(":");
                switch (a[0]) {
                case "l":
                    i.l = a[1];
                    break;
                case "r":
                    i.r = a[1];
                    break;
                case "lw":
                    i.lw = a[1];
                    break;
                case "rw":
                    i.rw = a[1]
                }
            }
        return "polygon(" + r(i.l, 0, parseFloat(i.lw)) + "," + r(i.r, 100, 100 - parseFloat(i.rw), !0) + ")"
    }
      , r = function(e, t, i, a) {
        switch (e) {
        case "none":
            o = t + "% 100%," + t + "% 0%";
            break;
        case "top":
            o = i + "% 100%," + t + "% 0%";
            break;
        case "middle":
            o = i + "% 100%," + t + "% 50%," + i + "% 0%";
            break;
        case "bottom":
            o = t + "% 100%," + i + "% 0%";
            break;
        case "two":
            o = i + "% 100%," + t + "% 75%," + i + "% 50%," + t + "% 25%," + i + "% 0%";
            break;
        case "three":
            o = t + "% 100%," + i + "% 75%," + t + "% 50%," + i + "% 25%," + t + "% 0%";
            break;
        case "four":
            o = t + "% 100%," + i + "% 87.5%," + t + "% 75%," + i + "% 62.5%," + t + "% 50%," + i + "% 37.5%," + t + "% 25%," + i + "% 12.5%," + t + "% 0%";
            break;
        case "five":
            o = t + "% 100%," + i + "% 90%," + t + "% 80%," + i + "% 70%," + t + "% 60%," + i + "% 50%," + t + "% 40%," + i + "% 30%," + t + "% 20%," + i + "% 10%," + t + "% 0%"
        }
        if (a) {
            var r = o.split(",")
              , o = "";
            for (i in r)
                r.hasOwnProperty(i) && (o += r[r.length - 1 - i] + (i < r.length - 1 ? "," : ""))
        }
        return o
    };
    window.RS_MODULES = window.RS_MODULES || {},
    window.RS_MODULES.layeranimation = {
        loaded: !0,
        version: "6.6.16"
    },
    window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal()
}(jQuery),
!function() {
    "use strict";
    jQuery.fn.revolution = jQuery.fn.revolution || {};
    var O = jQuery.fn.revolution;
    function g(e, t) {
        e = new Object({
            single: ".tp-" + t,
            c: O[e].cpar.find(".tp-" + t + "s")
        });
        return e.mask = e.c.find(".tp-" + t + "-mask"),
        e.wrap = e.c.find(".tp-" + t + "s-inner-wrapper"),
        e
    }
    jQuery.extend(!0, O, {
        hideUnHideNav: function(t) {
            window.requestAnimationFrame(function() {
                var e = !1;
                f(O[t].navigation.arrows) && (e = i(O[t].navigation.arrows, t, e)),
                f(O[t].navigation.bullets) && (e = i(O[t].navigation.bullets, t, e)),
                f(O[t].navigation.thumbnails) && (e = i(O[t].navigation.thumbnails, t, e)),
                (e = f(O[t].navigation.tabs) ? i(O[t].navigation.tabs, t, e) : e) && O.manageNavigation(t)
            })
        },
        getOuterNavDimension: function(e) {
            O[e].navigation.scaler = Math.max(0, Math.min(1, (O.winW - 480) / 500));
            var t = {
                left: 0,
                right: 0,
                horizontal: 0,
                vertical: 0,
                top: 0,
                bottom: 0
            };
            return O[e].navigation.thumbnails && O[e].navigation.thumbnails.enable && (O[e].navigation.thumbnails.isVisible = O[e].navigation.thumbnails.hide_under < O[e].module.width && O[e].navigation.thumbnails.hide_over > O[e].module.width,
            O[e].navigation.thumbnails.cw = Math.max(Math.round(O[e].navigation.thumbnails.width * O[e].navigation.scaler), O[e].navigation.thumbnails.min_width),
            O[e].navigation.thumbnails.ch = Math.round(O[e].navigation.thumbnails.cw / O[e].navigation.thumbnails.width * O[e].navigation.thumbnails.height),
            O[e].navigation.thumbnails.isVisible && "outer-left" === O[e].navigation.thumbnails.position ? t.left = O[e].navigation.thumbnails.cw + 2 * O[e].navigation.thumbnails.wrapper_padding : O[e].navigation.thumbnails.isVisible && "outer-right" === O[e].navigation.thumbnails.position ? t.right = O[e].navigation.thumbnails.cw + 2 * O[e].navigation.thumbnails.wrapper_padding : O[e].navigation.thumbnails.isVisible && "outer-top" === O[e].navigation.thumbnails.position ? t.top = O[e].navigation.thumbnails.ch + 2 * O[e].navigation.thumbnails.wrapper_padding : O[e].navigation.thumbnails.isVisible && "outer-bottom" === O[e].navigation.thumbnails.position && (t.bottom = O[e].navigation.thumbnails.ch + 2 * O[e].navigation.thumbnails.wrapper_padding)),
            O[e].navigation.tabs && O[e].navigation.tabs.enable && (O[e].navigation.tabs.isVisible = O[e].navigation.tabs.hide_under < O[e].module.width && O[e].navigation.tabs.hide_over > O[e].module.width,
            O[e].navigation.tabs.cw = Math.max(Math.round(O[e].navigation.tabs.width * O[e].navigation.scaler), O[e].navigation.tabs.min_width),
            O[e].navigation.tabs.ch = Math.round(O[e].navigation.tabs.cw / O[e].navigation.tabs.width * O[e].navigation.tabs.height),
            O[e].navigation.tabs.isVisible && "outer-left" === O[e].navigation.tabs.position ? t.left += O[e].navigation.tabs.cw + 2 * O[e].navigation.tabs.wrapper_padding : O[e].navigation.tabs.isVisible && "outer-right" === O[e].navigation.tabs.position ? t.right += O[e].navigation.tabs.cw + 2 * O[e].navigation.tabs.wrapper_padding : O[e].navigation.tabs.isVisible && "outer-top" === O[e].navigation.tabs.position ? t.top += O[e].navigation.tabs.ch + 2 * O[e].navigation.tabs.wrapper_padding : O[e].navigation.tabs.isVisible && "outer-bottom" === O[e].navigation.tabs.position && (t.bottom += O[e].navigation.tabs.ch + 2 * O[e].navigation.tabs.wrapper_padding)),
            {
                left: t.left,
                right: t.right,
                horizontal: t.left + t.right,
                vertical: t.top + t.bottom,
                top: t.top,
                bottom: t.bottom
            }
        },
        resizeThumbsTabs: function(e, t) {
            var i, a, r, o, s;
            return void 0 !== O[e] && O[e].navigation.use && (O[e].navigation && O[e].navigation.bullets.enable || O[e].navigation && O[e].navigation.tabs.enable || O[e].navigation && O[e].navigation.thumbnails.enable) && (i = tpGS.gsap.timeline(),
            a = O[e].navigation.tabs,
            r = O[e].navigation.thumbnails,
            o = O[e].navigation.bullets,
            i.pause(),
            f(a) && (t || a.width > a.min_width) && d(e, i, O[e].c, a, O[e].slideamount, "tab"),
            f(r) && (t || r.width > r.min_width) && d(e, i, O[e].c, r, O[e].slideamount, "thumb", e),
            f(o) && t && (s = O[e].c.find(".tp-bullets")).find(".tp-bullet").each(function(e) {
                var t = jQuery(this)
                  , e = e + 1
                  , i = t.outerWidth() + parseInt(void 0 === o.space ? 0 : o.space, 0)
                  , a = t.outerHeight() + parseInt(void 0 === o.space ? 0 : o.space, 0);
                "vertical" === o.direction ? (t.css({
                    top: (e - 1) * a + "px",
                    left: "0px"
                }),
                s.css({
                    height: (e - 1) * a + t.outerHeight(),
                    width: t.outerWidth()
                })) : (t.css({
                    left: (e - 1) * i + "px",
                    top: "0px"
                }),
                s.css({
                    width: (e - 1) * i + t.outerWidth(),
                    height: t.outerHeight()
                }))
            }),
            i.play()),
            !0
        },
        updateNavIndexes: function(e) {
            var t = O[e].c;
            function i(e) {
                0 < t.find(e).lenght && t.find(e).each(function(e) {
                    jQuery(this).data("liindex", e)
                })
            }
            i("rs-tab"),
            i("rs-bullet"),
            i("rs-thumb"),
            O.resizeThumbsTabs(e, !0),
            O.manageNavigation(e)
        },
        manageNavigation: function(e, t) {
            O[e].navigation.use && (f(O[e].navigation.bullets) && ("fullscreen" != O[e].sliderLayout && "fullwidth" != O[e].sliderLayout && (O[e].navigation.bullets.h_offset_old = void 0 === O[e].navigation.bullets.h_offset_old ? parseInt(O[e].navigation.bullets.h_offset, 0) : O[e].navigation.bullets.h_offset_old,
            O[e].navigation.bullets.h_offset = "center" === O[e].navigation.bullets.h_align ? O[e].navigation.bullets.h_offset_old + O[e].outNavDims.left / 2 - O[e].outNavDims.right / 2 : O[e].navigation.bullets.h_offset_old + O[e].outNavDims.left),
            _(O[e].navigation.bullets, e)),
            f(O[e].navigation.thumbnails) && _(O[e].navigation.thumbnails, e),
            f(O[e].navigation.tabs) && _(O[e].navigation.tabs, e),
            f(O[e].navigation.arrows) && ("fullscreen" != O[e].sliderLayout && "fullwidth" != O[e].sliderLayout && (O[e].navigation.arrows.left.h_offset_old = void 0 === O[e].navigation.arrows.left.h_offset_old ? parseInt(O[e].navigation.arrows.left.h_offset, 0) : O[e].navigation.arrows.left.h_offset_old,
            O[e].navigation.arrows.left.h_offset = (O[e].navigation.arrows.left.h_align,
            O[e].navigation.arrows.left.h_offset_old),
            O[e].navigation.arrows.right.h_offset_old = void 0 === O[e].navigation.arrows.right.h_offset_old ? parseInt(O[e].navigation.arrows.right.h_offset, 0) : O[e].navigation.arrows.right.h_offset_old,
            O[e].navigation.arrows.right.h_offset = (O[e].navigation.arrows.right.h_align,
            O[e].navigation.arrows.right.h_offset_old)),
            _(O[e].navigation.arrows.left, e),
            _(O[e].navigation.arrows.right, e)),
            !1 !== t) && (f(O[e].navigation.thumbnails) && c(O[e].navigation.thumbnails, e),
            f(O[e].navigation.tabs)) && c(O[e].navigation.tabs, e)
        },
        showFirstTime: function(e) {
            y(e),
            O.hideUnHideNav(e)
        },
        selectNavElement: function(e, t, i, a) {
            for (var r = O[e].cpar[0].getElementsByClassName(i), o = 0; o < r.length; o++)
                O.gA(r[o], "key") === t ? (r[o].classList.add("selected"),
                void 0 !== a && a()) : r[o].classList.remove("selected")
        },
        transferParams: function(e, t) {
            if (void 0 !== t)
                for (var i in t.params)
                    e = e.replace(t.params[i].from, t.params[i].to);
            return e
        },
        updateNavElementContent: function(e, t, i, a, r) {
            if (void 0 !== O[e].pr_next_key || void 0 !== O[e].pr_active_key) {
                var o, s = void 0 === O[e].pr_next_key ? void 0 === O[e].pr_cache_pr_next_key ? O[e].pr_active_key : O[e].pr_cache_pr_next_key : O[e].pr_next_key, n = O.gA(O[e].slides[s], "key"), l = 0, d = !1;
                for (o in i.enable && O.selectNavElement(e, n, "tp-bullet"),
                a.enable && O.selectNavElement(e, n, "tp-thumb", function() {
                    c(a, e)
                }),
                r.enable && O.selectNavElement(e, n, "tp-tab", function() {
                    c(r, e)
                }),
                O[e].thumbs)
                    l = !0 === d ? l : o,
                    d = O[e].thumbs[o].id === n || o == n || d;
                s = 0 < (l = parseInt(l, 0)) ? l - 1 : O[e].slideamount - 1,
                i = l + 1 == O[e].slideamount ? 0 : l + 1;
                !0 === t.enable && t.pi !== s && t.ni !== i && (t.pi = s,
                t.ni = i,
                t.left.c[0].innerHTML = O.transferParams(t.tmp, O[e].thumbs[s]),
                i > O[e].slideamount || (t.right.c[0].innerHTML = O.transferParams(t.tmp, O[e].thumbs[i]),
                t.right.iholder = t.right.c.find(".tp-arr-imgholder"),
                t.left.iholder = t.left.c.find(".tp-arr-imgholder"),
                t.rtl ? (void 0 !== t.left.iholder[0] && tpGS.gsap.set(t.left.iholder, {
                    backgroundImage: "url(" + O[e].thumbs[i].src + ")"
                }),
                void 0 !== O[e].thumbs[s] && void 0 !== t.right.iholder[0] && tpGS.gsap.set(t.right.iholder, {
                    backgroundImage: "url(" + O[e].thumbs[s].src + ")"
                })) : (void 0 !== O[e].thumbs[s] && void 0 !== t.left.iholder[0] && tpGS.gsap.set(t.left.iholder, {
                    backgroundImage: "url(" + O[e].thumbs[s].src + ")"
                }),
                void 0 !== t.right.iholder[0] && tpGS.gsap.set(t.right.iholder, {
                    backgroundImage: "url(" + O[e].thumbs[i].src + ")"
                }))))
            }
        },
        createNavigation: function(t) {
            var e, i, a, r = O[t].navigation.arrows, o = O[t].navigation.bullets, s = O[t].navigation.thumbnails, n = O[t].navigation.tabs, l = f(r), d = f(o), c = f(s), p = f(n);
            for (e in u(t),
            h(t),
            l && (b(r, t),
            r.c = O[t].cpar.find(".tparrows")),
            O[t].slides)
                O[t].slides.hasOwnProperty(e) && "true" != O.gA(O[t].slides[e], "not_in_nav") && (i = jQuery(O[t].slides[O[t].slides.length - 1 - e]),
                a = jQuery(O[t].slides[e]),
                d && (O[t].navigation.bullets.rtl ? S(O[t].c, o, i, t) : S(O[t].c, o, a, t)),
                c && (O[t].navigation.thumbnails.rtl ? x(O[t].c, s, i, "tp-thumb", t) : x(O[t].c, s, a, "tp-thumb", t)),
                p) && (O[t].navigation.tabs.rtl ? x(O[t].c, n, i, "tp-tab", t) : x(O[t].c, n, a, "tp-tab", t));
            d && _(o, t),
            c && _(s, t),
            p && _(n, t),
            (c || p) && O.updateDims(t),
            O[t].navigation.createNavigationDone = !0,
            c && jQuery.extend(!0, s, g(t, "thumb")),
            p && jQuery.extend(!0, n, g(t, "tab")),
            O[t].c.on("revolution.slide.onafterswap revolution.nextslide.waiting", function() {
                O.updateNavElementContent(t, r, o, s, n)
            }),
            v(r),
            v(o),
            v(s),
            v(n),
            O[t].cpar.on(O.ISM ? "touchstart touchmove" : "mouseenter mousemove", function(e) {
                void 0 !== e.target && void 0 !== e.target.className && "string" == typeof e.target.className && 0 <= e.target.className.indexOf("rs-waction") || !0 !== O[t].tpMouseOver && O[t].firstSlideAvailable && (O[t].tpMouseOver = !0,
                y(t),
                O.ISM) && !0 !== O[t].someNavIsDragged && (I(O[t].hideAllNavElementTimer),
                O[t].hideAllNavElementTimer = setTimeout(function() {
                    O[t].tpMouseOver = !1,
                    w(t)
                }, 150))
            }),
            O[t].cpar.on(O.ISM ? "touchend" : "mouseleave ", function() {
                O[t].tpMouseOver = !1,
                w(t)
            }),
            (c || p || "carousel" === O[t].sliderType || O[t].navigation.touch.touchOnDesktop || O[t].navigation.touch.touchenabled && O.ISM) && m(t),
            O[t].navigation.initialised = !0,
            O.updateNavElementContent(t, r, o, s, n),
            O.showFirstTime(t)
        }
    });
    function R(e, t) {
        var i, a = !1;
        for (i in void 0 !== t.path && !O.ISM || (a = r(t.target, e)),
        t.path)
            t.path.hasOwnProperty(i) && t.path[i].tagName === e && (a = !0);
        return a
    }
    function n(e, t, i, a) {
        var a = void 0 === a ? e.outerHeight(!0) : a
          , r = null == O[i] ? 0 : (0 == O[i].canv.height ? O[i].module : O[i].canv).height
          , r = "layergrid" == t.container ? "fullscreen" == O[i].sliderLayout ? O[i].module.height / 2 - O[i].gridheight[O[i].level] * O[i].CM.h / 2 : O[i].autoHeight || null != O[i].minHeight && 0 < O[i].minHeight ? r / 2 - O[i].gridheight[O[i].level] * O[i].CM.h / 2 : 0 : 0
          , i = "top" === t.v_align ? {
            top: "0px",
            y: Math.round(t.v_offset + r) + "px"
        } : "center" === t.v_align ? {
            top: "50%",
            y: Math.round(0 - a / 2 + t.v_offset) + "px"
        } : {
            top: "100%",
            y: Math.round(0 - (a + t.v_offset + r)) + "px"
        };
        e.hasClass("outer-bottom") || tpGS.gsap.set(e, i)
    }
    function l(e, t, i, a) {
        a = void 0 === a ? e.outerWidth() : a,
        i = "layergrid" === t.container ? O[i].module.width / 2 - O[i].gridwidth[O[i].level] * O[i].CM.w / 2 : 0,
        a = "left" === t.h_align ? {
            left: "0px",
            x: Math.round(t.h_offset + i) + "px"
        } : "center" === t.h_align ? {
            left: "50%",
            x: Math.round(0 - a / 2 + t.h_offset) + "px"
        } : {
            left: "100%",
            x: Math.round(0 - (a + t.h_offset + i)) + "px"
        },
        tpGS.gsap.set(e, a)
    }
    var c = function(e, t) {
        var i, a, r, o, s, n, l;
        void 0 === e || null == e.mask || (i = "vertical" === e.direction ? e.mask.find(e.single).first().outerHeight(!0) + e.space : e.mask.find(e.single).first().outerWidth(!0) + e.space,
        a = "vertical" === e.direction ? e.mask.height() : e.mask.width(),
        o = e.mask.find(e.single + ".selected").data("liindex"),
        o = 0 < (o = void 0 === (o = e.rtl ? O[t].slideamount - o : o) ? 0 : o) && 1 === O[t].sdir && 1 < e.visibleAmount ? o - 1 : o,
        t = a / i,
        r = "vertical" === e.direction ? e.mask.height() : e.mask.width(),
        n = (o = 0 - o * i) < 0 - ((s = "vertical" === e.direction ? e.wrap.height() : e.wrap.width()) - r) ? 0 - (s - r) : o,
        l = void 0 === (l = O.gA(e.wrap[0], "offset")) ? 0 : l,
        2 < t && (n = o - (l + i) <= 0 ? o - (l + i) < 0 - i ? l : n + i : n,
        n = o - i + l + a < i && o + (Math.round(t) - 2) * i < l ? o + (Math.round(t) - 2) * i : n),
        n = "vertical" !== e.direction && e.mask.width() >= e.wrap.width() || "vertical" === e.direction && e.mask.height() >= e.wrap.height() ? 0 : n < 0 - (s - r) ? 0 - (s - r) : 0 < n ? 0 : n,
        e.c.hasClass("dragged")) || ("vertical" === e.direction ? e.wrap.data("tmmove", tpGS.gsap.to(e.wrap, .5, {
            top: n + "px",
            ease: "power3.inOut"
        })) : e.wrap.data("tmmove", tpGS.gsap.to(e.wrap, .5, {
            left: n + "px",
            ease: "power3.inOut"
        })),
        e.wrap.data("offset", n))
    }
      , d = function(e, i, t, a, r, o) {
        var t = t.parent().find(".tp-" + o + "s")
          , s = t.find(".tp-" + o + "s-inner-wrapper")
          , n = t.find(".tp-" + o + "-mask")
          , l = "vertical" === a.direction ? a.cw : a.cw * r + parseFloat(a.space) * (r - 1)
          , r = "vertical" === a.direction ? a.ch * r + parseInt(a.space) * (r - 1) : a.ch
          , d = "vertical" === a.direction ? {
            width: a.cw + "px"
        } : {
            height: a.ch + "px"
        }
          , t = (i.add(tpGS.gsap.set(t, d)),
        i.add(tpGS.gsap.set(s, {
            width: l + "px",
            height: r + "px"
        })),
        "horizontal" === a.direction ? (t = Math.min(l, a.cw * a.visibleAmount + parseFloat(a.space) * (a.visibleAmount - 1)),
        i.add(tpGS.gsap.set(n, {
            width: t + "px",
            height: r + "px"
        }))) : (d = Math.min(r, a.ch * a.visibleAmount + parseFloat(a.space) * (a.visibleAmount - 1)),
        i.add(tpGS.gsap.set(n, {
            width: l + "px",
            height: d + "px"
        }))),
        null !== s.outerWidth() && (O[e].thumbResized = !0),
        s.find(".tp-" + o));
        return t && jQuery.each(t, function(e, t) {
            "vertical" === a.direction ? i.add(tpGS.gsap.set(t, {
                top: e * (a.ch + parseInt(void 0 === a.space ? 0 : a.space, 0)),
                width: a.cw + "px",
                height: a.ch + "px"
            })) : "horizontal" === a.direction && i.add(tpGS.gsap.set(t, {
                left: e * (a.cw + parseInt(void 0 === a.space ? 0 : a.space, 0)),
                width: a.cw + "px",
                height: a.ch + "px"
            }))
        }),
        i
    }
      , u = function(t) {
        !0 === O[t].navigation.keyboardNavigation && O.document.on("keydown", function(e) {
            if ("horizontal" == O[t].navigation.keyboard_direction && 39 == e.keyCode || "vertical" == O[t].navigation.keyboard_direction && 40 == e.keyCode) {
                if (void 0 !== O[t].keydown_time_stamp && (new Date).getTime() - O[t].keydown_time_stamp < 1e3)
                    return;
                O[t].sc_indicator = "arrow",
                O[t].sc_indicator_dir = 0,
                "carousel" === O[t].sliderType && (O[t].ctNavElement = !0),
                O.callingNewSlide(t, 1, "carousel" === O[t].sliderType)
            }
            if ("horizontal" == O[t].navigation.keyboard_direction && 37 == e.keyCode || "vertical" == O[t].navigation.keyboard_direction && 38 == e.keyCode) {
                if (void 0 !== O[t].keydown_time_stamp && (new Date).getTime() - O[t].keydown_time_stamp < 1e3)
                    return;
                O[t].sc_indicator = "arrow",
                O[t].sc_indicator_dir = 1,
                "carousel" === O[t].sliderType && (O[t].ctNavElement = !0),
                O.callingNewSlide(t, -1, "carousel" === O[t].sliderType)
            }
            O[t].keydown_time_stamp = (new Date).getTime()
        })
    }
      , h = function(d) {
        O[d].carousel.scrollTicker = O.carScrollTicker.bind(window, d),
        !0 !== O[d].navigation.mouseScrollNavigation && "on" !== O[d].navigation.mouseScrollNavigation && "carousel" !== O[d].navigation.mouseScrollNavigation || O[d].c[0].addEventListener("wheel", function(e) {
            var t = function(e) {
                var t = 0;
                return "deltaY"in e || "deltaX"in e ? t = 0 != e.deltaY && -0 != e.deltaY || !(e.deltaX < 0 || 0 < e.deltaX) ? e.deltaY : e.deltaX : ("detail"in e && (t = e.detail),
                "wheelDelta"in e && (t = -e.wheelDelta / 120),
                "wheelDeltaY"in e && (t = -e.wheelDeltaY / 120)),
                (300 < (t = navigator.userAgent.match(/mozilla/i) ? 10 * t : t) || t < -300) && (t /= 10),
                t
            }(e)
              , i = !1
              , a = 0 == O[d].pr_active_key || 0 == O[d].pr_processing_key
              , r = O[d].pr_active_key == O[d].slideamount - 1 || O[d].pr_processing_key == O[d].slideamount - 1
              , o = (void 0 !== O[d].topc ? O[d].topc : 0 === O[d].canv.height ? O[d].cpar : O[d].c)[0].getBoundingClientRect()
              , s = 0 <= o.top && o.bottom <= O.winH ? 1 : 0 <= o.top && o.bottom >= O.winH ? (O.winH - Math.round(o.top)) / o.height : o.top <= 0 && o.bottom <= O.winH ? Math.round(o.bottom) / o.height : 1
              , t = t < 0 ? -1 : 1
              , n = O[d].navigation.wheelViewPort;
            s = Math.round(100 * s) / 100,
            "reverse" == O[d].navigation.mouseScrollReverse && (l = r,
            r = a,
            a = l);
            {
                var l;
                !(n - s <= O[d].navigation.threshold / 100) || n <= s || 0 <= o.top && -1 == t || o.top <= 0 && 1 == t || (e.preventDefault(),
                O[d].mScrollTween) || (l = "window" !== O[d].navigation.target && O[d].navigation.target ? O[d].navigation.target : window,
                O[d].mScrollTween = tpGS.gsap.to(l, {
                    duration: jQuery.fn.revolution.isWebkit() ? .1 : .7,
                    scrollTo: {
                        y: O[d].topc
                    },
                    ease: "power2.out",
                    onComplete: function() {
                        O[d].mScrollTween.kill(),
                        delete O[d].mScrollTween
                    }
                }))
            }
            if (Math.abs(s - n) < .1 || n <= s)
                return O[d].sc_indicator_dir = "reverse" === O[d].navigation.mouseScrollReverse && t < 0 || "reverse" !== O[d].navigation.mouseScrollReverse && 0 < t ? "reverse" !== O[d].navigation.mouseScrollReverse ? 0 : 1 : "reverse" !== O[d].navigation.mouseScrollReverse ? 1 : 0,
                "carousel" == O[d].navigation.mouseScrollNavigation || 0 === O[d].sc_indicator_dir && !r || 1 === O[d].sc_indicator_dir && !a ? void 0 === O[d].pr_processing_key && !0 !== O[d].justmouseScrolled && (O[d].sc_indicator = "arrow",
                "carousel" === O[d].sliderType && (O[d].ctNavElement = !0),
                O.callingNewSlide(d, 0 === O[d].sc_indicator_dir ? "reverse" === O[d].navigation.mouseScrollReverse ? -1 : 1 : "reverse" === O[d].navigation.mouseScrollReverse ? 1 : -1, "carousel" === O[d].sliderType),
                O[d].justmouseScrolled = !0,
                setTimeout(function() {
                    O[d].justmouseScrolled = !1
                }, O[d].navigation.wheelCallDelay)) : !0 !== O[d].justmouseScrolled && (i = !0),
                !!i || (e.preventDefault(e),
                !1)
        }, {
            passive: !1
        })
    }
      , r = function(e, t) {
        for (; e && e !== document; e = e.parentNode)
            if (e.tagName === t)
                return e;
        return !1
    }
      , m = function(x) {
        var t, e, k = O[x].carousel, L = O.is_android();
        jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"),
        O[x].navigation.touch = void 0 === O[x].navigation.touch ? {} : O[x].navigation.touch,
        O[x].navigation.touch.swipe_direction = void 0 === O[x].navigation.touch.swipe_direction ? "horizontal" : O[x].navigation.touch.swipe_direction,
        O[x].cpar.find(".rs-nav-element").rsswipe({
            allowPageScroll: "vertical",
            triggerOnTouchLeave: !0,
            treshold: O[x].navigation.touch.swipe_treshold,
            fingers: 5 < O[x].navigation.touch.swipe_min_touches ? 1 : O[x].navigation.touch.swipe_min_touches,
            excludedElements: "button, input, select, textarea, .noSwipe, .rs-waction",
            tap: function(e, t) {
                var i;
                (void 0 !== (i = void 0 !== t ? jQuery(t).closest("rs-thumb") : i) && 0 < i.length || 0 < (i = jQuery(t).closest("rs-tab")).length || 0 < (i = jQuery(t).closest("rs-bullet")).length) && i.trigger("click")
            },
            swipeStatus: function(e, t, i, a, r, o, s) {
                if ("start" !== t && "move" !== t && "end" !== t && "cancel" != t)
                    return !0;
                var n = R("RS-THUMB", e)
                  , l = R("RS-TAB", e)
                  , d = (!1 === n && !1 === l && !0 !== (n = "RS-THUMBS-WRAP" === e.target.tagName || "RS-THUMBS" === e.target.tagName || 0 <= e.target.className.indexOf("tp-thumb-mask")) && ("RS-TABS-WRAP" !== e.target.tagName && "RS-TABS" !== e.target.tagName && e.target.className.indexOf("tp-tab-mask")),
                "start" === t ? 0 : L ? s[0].end.x - s[0].start.x : e.pageX - k.screenX)
                  , c = "start" === t ? 0 : L ? s[0].end.y - s[0].start.y : e.pageY - k.screenY
                  , p = n ? ".tp-thumbs" : ".tp-tabs"
                  , l = n ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper"
                  , g = n ? ".tp-thumb" : ".tp-tab"
                  , u = n ? O[x].navigation.thumbnails : O[x].navigation.tabs
                  , h = O[x].cpar.find(n ? ".tp-thumb-mask" : ".tp-tab-mask")
                  , m = h.find(l)
                  , v = u.direction
                  , f = "vertical" === v ? m.height() : m.width()
                  , y = "vertical" === v ? h.height() : h.width()
                  , w = "vertical" === v ? h.find(g).first().outerHeight(!0) + parseFloat(u.space) : h.find(g).first().outerWidth(!0) + parseFloat(u.space)
                  , b = void 0 === m.data("offset") ? 0 : parseInt(m.data("offset"), 0)
                  , _ = 0;
                switch (t) {
                case "start":
                    "vertical" === v && e.preventDefault(),
                    k.screenX = L ? s[0].end.x : e.pageX,
                    k.screenY = L ? s[0].end.y : e.pageY,
                    O[x].cpar.find(p).addClass("dragged"),
                    b = "vertical" === v ? m.position().top : m.position().left,
                    m.data("offset", b),
                    m.data("tmmove") && m.data("tmmove").pause(),
                    O[x].someNavIsDragged = !0,
                    M(x);
                    break;
                case "move":
                    if (f <= y)
                        return !1;
                    var _ = 0 < (_ = b + ("vertical" === v ? c : d)) ? "horizontal" === v ? _ - m.width() * (_ / m.width() * _ / m.width()) : _ - m.height() * (_ / m.height() * _ / m.height()) : _
                      , S = "vertical" === v ? 0 - (m.height() - h.height()) : 0 - (m.width() - h.width());
                    _ = _ < S ? "horizontal" === v ? _ + m.width() * (_ - S) / m.width() * (_ - S) / m.width() : _ + m.height() * (_ - S) / m.height() * (_ - S) / m.height() : _,
                    "vertical" === v ? tpGS.gsap.set(m, {
                        top: _ + "px"
                    }) : tpGS.gsap.set(m, {
                        left: _ + "px"
                    }),
                    I(O[x].hideAllNavElementTimer);
                    break;
                case "end":
                case "cancel":
                    return O[x].navigation.draggable && O[x].navigation.draggable.enable && O[x].navigation.draggable.enable(),
                    k.draggable && k.draggable.enable && k.draggable.enable(),
                    _ = b + ("vertical" === v ? c : d),
                    _ = 0 < (_ = "vertical" === v ? _ < 0 - (m.height() - h.height()) ? 0 - (m.height() - h.height()) : _ : _ < 0 - (m.width() - h.width()) ? 0 - (m.width() - h.width()) : _) ? 0 : _,
                    _ = Math.abs(a) > w / 10 ? a <= 0 ? Math.floor(_ / w) * w : Math.ceil(_ / w) * w : a < 0 ? Math.ceil(_ / w) * w : Math.floor(_ / w) * w,
                    _ = 0 < (_ = "vertical" === v ? _ < 0 - (m.height() - h.height()) ? 0 - (m.height() - h.height()) : _ : _ < 0 - (m.width() - h.width()) ? 0 - (m.width() - h.width()) : _) ? 0 : _,
                    "vertical" === v ? tpGS.gsap.to(m, .5, {
                        top: _ + "px",
                        ease: "power3.out"
                    }) : tpGS.gsap.to(m, .5, {
                        left: _ + "px",
                        ease: "power3.out"
                    }),
                    _ = _ || ("vertical" === v ? m.position().top : m.position().left),
                    m.data("offset", _),
                    m.data("distance", a),
                    O[x].cpar.find(p).removeClass("dragged"),
                    !(O[x].someNavIsDragged = !1)
                }
            }
        }),
        "carousel" === O[x].sliderType && O.setupCarousel(x),
        "carousel" !== O[x].sliderType && (O.ISM && O[x].navigation.touch.touchenabled || !0 !== O.ISM && O[x].navigation.touch.touchOnDesktop) && (O[x].navigation.proxy = document.createElement("div"),
        t = O[x].navigation,
        e = {
            trigger: O[x].c[0],
            type: "horizontal" === O[x].navigation.touch.swipe_direction ? "x" : "y",
            cursor: "pointer",
            lockAxis: !0,
            onPress: function(e) {
                O.closestClass(e.target, "rs-nav-element") && (O[x].navigation.draggable.endDrag(),
                O[x].navigation.draggable.disable()),
                t.touch.pressX = e.pageX,
                t.touch.pressY = e.pageY
            },
            onDragStart: function() {
                var e = void 0 !== O[x].pr_processing_key ? O[x].pr_processing_key : void 0 === O[x].pr_active_key ? 0 : O[x].pr_active_key;
                "up" === this.getDirection() && e == O[x].slideamount - 1 || "down" === this.getDirection() && 0 === e ? t.forceScroll = !0 : t.forceScroll = !1
            },
            onDragEnd: function(e) {
                O[x].sc_indicator = "arrow";
                var t = this.getDirection()
                  , i = O[x].navigation;
                if (Math.abs(e.pageY - i.touch.pressY) > Math.abs(e.pageX - i.touch.pressX)) {
                    if ("right" === t || "left" === t)
                        return
                } else if (Math.abs(e.pageY - i.touch.pressY) > Math.abs(e.pageX - i.touch.pressX) && ("up" === t || "down" === t))
                    return;
                if (!i.forceScroll)
                    return "horizontal" == O[x].navigation.touch.swipe_direction && "left" == t || "vertical" == O[x].navigation.touch.swipe_direction && "up" == t ? (O[x].sc_indicator_dir = 0,
                    O.callingNewSlide(x, 1),
                    !1) : "horizontal" == O[x].navigation.touch.swipe_direction && "right" == t || "vertical" == O[x].navigation.touch.swipe_direction && "down" == t ? (O[x].sc_indicator_dir = 1,
                    O.callingNewSlide(x, -1),
                    !1) : void 0;
                e = "up" === this.getDirection() ? O[x].cpar.offset().top + O[x].module.height : O.document.scrollTop() - (window.innerHeight - O[x].cpar[0].getBoundingClientRect().top),
                O[x].modal.useAsModal || tpGS.gsap.to([window, "body"], {
                    scrollTo: e
                })
            }
        },
        t.touch.drag_block_vertical || (O.ISM && (e.allowContextMenu = !0),
        e.allowEventDefault = !0),
        O[x].navigation.draggable = tpGS.draggable.create(O[x].navigation.proxy, e)),
        "carousel" === O[x].sliderType && (O.ISM && 0 == O[x].navigation.touch.mobileCarousel || !0 !== O.ISM && !1 === O[x].navigation.touch.desktopCarousel) && k.wrap.addClass("noswipe"),
        O[x].navigation.touch.drag_block_vertical && O[x].c.addClass("disableVerticalScroll")
    }
      , v = function(e) {
        e.hide_delay = O.isNumeric(parseInt(e.hide_delay, 0)) ? e.hide_delay : .2,
        e.hide_delay_mobile = O.isNumeric(parseInt(e.hide_delay_mobile, 0)) ? e.hide_delay_mobile : .2
    }
      , f = function(e) {
        return e && e.enable
    }
      , I = function(e) {
        clearTimeout(e)
    }
      , y = function(t) {
        var e, i = O[t].navigation.maintypes;
        for (e in i)
            i.hasOwnProperty(e) && f(O[t].navigation[i[e]]) && void 0 !== O[t].navigation[i[e]].c && (I(O[t].navigation[i[e]].showCall),
            O[t].navigation[i[e]].showCall = setTimeout(function(e) {
                I(e.hideCall),
                e.hide_onleave && !0 !== O[t].tpMouseOver || (void 0 === e.tween ? e.tween = a(e) : e.tween.play())
            }, O[t].navigation[i[e]].hide_onleave && !0 !== O[t].tpMouseOver ? 0 : parseInt(O[t].navigation[i[e]].animDelay), O[t].navigation[i[e]]))
    }
      , M = function(e) {
        var t, i = O[e].navigation.maintypes;
        for (t in i)
            i.hasOwnProperty(t) && void 0 !== O[e].navigation[i[t]] && O[e].navigation[i[t]].hide_onleave && f(O[e].navigation[i[t]]) && I(O[e].navigation[i[t]].hideCall)
    }
      , w = function(e, t) {
        var i, a = O[e].navigation.maintypes;
        for (i in a)
            a.hasOwnProperty(i) && void 0 !== O[e].navigation[a[i]] && O[e].navigation[a[i]].hide_onleave && f(O[e].navigation[a[i]]) && (I(O[e].navigation[a[i]].hideCall),
            O[e].navigation[a[i]].hideCall = setTimeout(function(e) {
                I(e.showCall),
                e.tween && e.tween.reverse()
            }, O.ISM ? parseInt(O[e].navigation[a[i]].hide_delay_mobile, 0) : parseInt(O[e].navigation[a[i]].hide_delay, 0), O[e].navigation[a[i]]))
    }
      , a = function(e) {
        e.speed = void 0 === e.animSpeed ? .5 : e.animSpeed,
        e.anims = [],
        void 0 !== e.anim && void 0 === e.left && e.anims.push(e.anim),
        void 0 !== e.left && e.anims.push(e.left.anim),
        void 0 !== e.right && e.anims.push(e.right.anim);
        var t, i = tpGS.gsap.timeline();
        for (t in i.add(tpGS.gsap.to(e.c, e.speed, {
            delay: e.animDelay,
            opacity: 1,
            ease: "power3.inOut"
        }), 0),
        e.anims)
            if (e.anims.hasOwnProperty(t))
                switch (e.anims[t]) {
                case "left":
                    i.add(tpGS.gsap.fromTo(e.c[t], e.speed, {
                        marginLeft: -50
                    }, {
                        delay: e.animDelay,
                        marginLeft: "0px",
                        ease: "power3.inOut"
                    }), 0);
                    break;
                case "right":
                    i.add(tpGS.gsap.fromTo(e.c[t], e.speed, {
                        marginLeft: 50
                    }, {
                        delay: e.animDelay,
                        marginLeft: "0px",
                        ease: "power3.inOut"
                    }), 0);
                    break;
                case "top":
                    i.add(tpGS.gsap.fromTo(e.c[t], e.speed, {
                        marginTop: -50
                    }, {
                        delay: e.animDelay,
                        marginTop: "0px",
                        ease: "power3.inOut"
                    }), 0);
                    break;
                case "bottom":
                    i.add(tpGS.gsap.fromTo(e.c[t], e.speed, {
                        marginTop: 50
                    }, {
                        delay: e.animDelay,
                        marginTop: "0px",
                        ease: "power3.inOut"
                    }), 0);
                    break;
                case "zoomin":
                    i.add(tpGS.gsap.fromTo(e.c[t], e.speed, {
                        scale: .5
                    }, {
                        delay: e.animDelay,
                        scale: 1,
                        ease: "power3.inOut"
                    }), 0);
                    break;
                case "zoomout":
                    i.add(tpGS.gsap.fromTo(e.c[t], e.speed, {
                        scale: 1.2
                    }, {
                        delay: e.animDelay,
                        scale: 1,
                        ease: "power3.inOut"
                    }), 0)
                }
        return i.play(),
        i
    }
      , b = function(e, t) {
        e.style = void 0 === e.style ? "" : e.style,
        e.left.style = void 0 === e.left.style ? "" : e.left.style,
        e.right.style = void 0 === e.right.style ? "" : e.right.style,
        void 0 === e.left.c && (e.left.c = jQuery('<rs-arrow style="opacity:0" class="tp-leftarrow tparrows ' + e.style + " " + e.left.style + '">' + e.tmp + "</rs-arrow>"),
        O[t].c.append(e.left.c)),
        void 0 === e.right.c && (e.right.c = jQuery('<rs-arrow style="opacity:0"  class="tp-rightarrow tparrows ' + e.style + " " + e.right.style + '">' + e.tmp + "</rs-arrow>"),
        O[t].c.append(e.right.c)),
        e[e.rtl ? "left" : "right"].c.on("click", function() {
            "carousel" === O[t].sliderType && (O[t].ctNavElement = !0),
            O[t].sc_indicator = "arrow",
            O[t].sc_indicator_dir = 0,
            O[t].c.revnext()
        }),
        e[e.rtl ? "right" : "left"].c.on("click", function() {
            "carousel" === O[t].sliderType && (O[t].ctNavElement = !0),
            O[t].sc_indicator = "arrow",
            O[t].sc_indicator_dir = 1,
            O[t].c.revprev()
        }),
        e.padding_top = parseInt(O[t].carousel.padding_top || 0, 0),
        e.padding_bottom = parseInt(O[t].carousel.padding_bottom || 0, 0),
        _(e.left, t),
        _(e.right, t),
        "outer-left" != e.position && "outer-right" != e.position || (O[t].outernav = !0)
    }
      , _ = function(e, t) {
        var i, a, r, o, s;
        null == e || void 0 === e.c || (i = ("fullwidth" == O[t].sliderLayout || "fullscreen" == O[t].sliderLayout ? O[t].module : O[t].canv).width,
        r = e.c.outerWidth(),
        a = e.c.outerHeight(),
        r <= 0) || a <= 0 || (n(e.c, e, t, a),
        l(e.c, e, t, r),
        "outer-left" === e.position ? tpGS.gsap.set(e.c, {
            left: 0 - r + "px",
            x: e.h_offset + "px"
        }) : "outer-right" === e.position && tpGS.gsap.set(e.c, {
            right: 0 - r + "px",
            x: e.h_offset + "px"
        }),
        "tp-thumb" !== e.type && "tp-tab" !== e.type) || (a = parseInt(e.padding_top || 0, 0),
        r = parseInt(e.padding_bottom || 0, 0),
        o = {},
        s = {},
        e.maxw > i && "outer-left" !== e.position && "outer-right" !== e.position ? (o.left = "0px",
        o.x = 0,
        o.maxWidth = i - 2 * e.wpad + "px",
        s.maxWidth = i - 2 * e.wpad + "px") : (o.maxWidth = e.maxw,
        s.maxWidth = i + "px"),
        e.maxh + 2 * e.wpad > O[t].conh && "outer-bottom" !== e.position && "outer-top" !== e.position ? (o.top = "0px",
        o.y = 0,
        o.maxHeight = a + r + (O[t].conh - 2 * e.wpad) + "px",
        s.maxHeight = a + r + (O[t].conh - 2 * e.wpad) + "px") : (o.maxHeight = e.maxh + "px",
        s.maxHeight = e.maxh + "px"),
        e.mask = void 0 === e.mask ? e.c.find("rs-navmask") : e.mask,
        (0 < e.mhoff || 0 < e.mvoff) && (s.padding = e.mvoff + "px " + e.mhoff + "px"),
        e.span ? ("layergrid" == e.container && "outer-left" !== e.position && "outer-right" !== e.position && (a = r = 0),
        "vertical" === e.direction ? (o.maxHeight = a + r + (O[t].conh - 2 * e.wpad) + "px",
        o.height = a + r + (O[t].conh - 2 * e.wpad) + "px",
        o.top = 0,
        o.y = 0,
        s.maxHeight = a + r + Math.min(e.maxh, O[t].conh - 2 * e.wpad) + "px",
        tpGS.gsap.set(e.c, o),
        tpGS.gsap.set(e.mask, s),
        n(e.mask, e, t)) : "horizontal" === e.direction && (o.maxWidth = "100%",
        o.width = i - 2 * e.wpad + "px",
        o.left = 0,
        o.x = 0,
        s.maxWidth = e.maxw >= i ? "100%" : Math.min(e.maxw, i) + "px",
        tpGS.gsap.set(e.c, o),
        tpGS.gsap.set(e.mask, s),
        l(e.mask, e, t))) : (tpGS.gsap.set(e.c, o),
        tpGS.gsap.set(e.mask, s)))
    }
      , S = function(e, t, i, a) {
        0 === e.find(".tp-bullets").length && (t.style = void 0 === t.style ? "" : t.style,
        t.c = jQuery('<rs-bullets style="opacity:0"  class="tp-bullets ' + t.style + " " + t.direction + " nav-pos-hor-" + t.h_align + " nav-pos-ver-" + t.v_align + " nav-dir-" + t.direction + '"></rs-bullets>'));
        var r = i.data("key")
          , o = t.tmp
          , s = (void 0 !== O[a].thumbs[i.index()] && jQuery.each(O[a].thumbs[i.index()].params, function(e, t) {
            o = o.replace(t.from, t.to)
        }),
        jQuery('<rs-bullet data-key="' + r + '" class="tp-bullet">' + o + "</rs-bullet>"))
          , i = (void 0 !== O[a].thumbs[i.index()] && s.find(".tp-bullet-image").css({
            backgroundImage: "url(" + O[a].thumbs[i.index()].src + ")"
        }),
        t.c.append(s),
        e.append(t.c),
        t.c.find(".tp-bullet").length)
          , n = s.outerWidth()
          , l = s.outerHeight()
          , d = n + parseInt(void 0 === t.space ? 0 : t.space, 0)
          , c = l + parseInt(void 0 === t.space ? 0 : t.space, 0);
        "vertical" === t.direction ? (s.css({
            top: (i - 1) * c + "px",
            left: "0px"
        }),
        t.c.css({
            height: (i - 1) * c + l,
            width: n
        })) : (s.css({
            left: (i - 1) * d + "px",
            top: "0px"
        }),
        t.c.css({
            width: (i - 1) * d + n,
            height: l
        })),
        s.on("click", function() {
            "carousel" === O[a].sliderType && (O[a].ctNavElement = !0),
            O[a].sc_indicator = "bullet",
            e.revcallslidewithid(r),
            e.find(".tp-bullet").removeClass("selected"),
            jQuery(this).addClass("selected")
        }),
        t.padding_top = parseInt(O[a].carousel.padding_top || 0, 0),
        t.padding_bottom = parseInt(O[a].carousel.padding_bottom || 0, 0),
        "outer-left" != t.position && "outer-right" != t.position || (O[a].outernav = !0)
    }
      , x = function(t, e, i, a, r) {
        var o = "tp-thumb" === a ? ".tp-thumbs" : ".tp-tabs"
          , s = "tp-thumb" === a ? ".tp-thumb-mask" : ".tp-tab-mask"
          , n = "tp-thumb" === a ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper"
          , l = "tp-thumb" === a ? ".tp-thumb" : ".tp-tab"
          , d = "tp-thumb" === a ? ".tp-thumb-image" : ".tp-tab-image"
          , c = "tp-thumb" === a ? "rs-thumb" : "rs-tab"
          , p = (e.type = a,
        e.visibleAmount = e.visibleAmount > O[r].slideamount ? O[r].slideamount : e.visibleAmount,
        e.sliderLayout = O[r].sliderLayout,
        void 0 === e.c && (e.wpad = e.wrapper_padding,
        e.c = jQuery("<" + c + 's style="opacity:0" class="nav-dir-' + e.direction + " nav-pos-ver-" + e.v_align + " nav-pos-hor-" + e.h_align + " rs-nav-element " + a + "s " + (!0 === e.span ? "tp-span-wrapper" : "") + " " + e.position + " " + (void 0 === e.style ? "" : e.style) + '"><rs-navmask class="' + a + '-mask" style="overflow:hidden;position:relative"><' + c + 's-wrap class="' + a + 's-inner-wrapper" style="position:relative;"></' + c + "s-wrap></rs-navmask></" + c + "s>"),
        e.c.css({
            overflow: "visible",
            position: "outer-top" === e.position || "outer-bottom" === e.position ? "relative" : "absolute",
            background: e.wrapper_color,
            padding: e.wpad + "px",
            boxSizing: "contet-box"
        }),
        "outer-top" === e.position ? t.parent().prepend(e.c) : "outer-bottom" === e.position ? t.after(e.c) : t.append(e.c),
        "outer-left" !== e.position && "outer-right" !== e.position || tpGS.gsap.set(O[r].c, {
            overflow: "visible"
        }),
        e.padding_top = parseInt(O[r].carousel.padding_top || 0, 0),
        e.padding_bottom = parseInt(O[r].carousel.padding_bottom || 0, 0),
        "outer-left" != e.position && "outer-right" != e.position || (O[r].outernav = !0)),
        i.data("key"))
          , s = e.c.find(s)
          , g = s.find(n)
          , u = e.tmp
          , a = (e.space = parseFloat(e.space) || 0,
        e.maxw = "horizontal" === e.direction ? e.width * e.visibleAmount + e.space * (e.visibleAmount - 1) : e.width,
        e.maxh = "horizontal" === e.direction ? e.height : e.height * e.visibleAmount + e.space * (e.visibleAmount - 1),
        e.maxw += 2 * e.mhoff,
        e.maxh += 2 * e.mvoff,
        void 0 !== O[r].thumbs[i.index()] && jQuery.each(O[r].thumbs[i.index()].params, function(e, t) {
            u = u.replace(t.from, t.to)
        }),
        jQuery("<" + c + ' data-liindex="' + i.index() + '" data-key="' + p + '" class="' + a + '" style="width:' + e.width + "px;height:" + e.height + 'px;">' + u + "<" + c + ">"))
          , c = (void 0 !== O[r].thumbs[i.index()] && a.find(d).css({
            backgroundImage: "url(" + O[r].thumbs[i.index()].src + ")"
        }),
        g.append(a),
        e.c.find(l).length)
          , d = a.outerWidth()
          , i = a.outerHeight()
          , l = d + parseInt(void 0 === e.space ? 0 : e.space, 0)
          , h = i + parseInt(void 0 === e.space ? 0 : e.space, 0);
        "vertical" === e.direction ? (a.css({
            top: (c - 1) * h + "px",
            left: "0px"
        }),
        g.css({
            height: (c - 1) * h + i,
            width: d
        })) : (a.css({
            left: (c - 1) * l + "px",
            top: "0px"
        }),
        g.css({
            width: (c - 1) * l + d,
            height: i
        })),
        s.css({
            maxWidth: e.maxw + "px",
            maxHeight: e.maxh + "px"
        }),
        e.c.css({
            maxWidth: e.maxw + "px",
            maxHeight: e.maxh + "px"
        }),
        a.on("click", function() {
            O[r].sc_indicator = "bullet",
            "carousel" === O[r].sliderType && (O[r].ctNavElement = !0);
            var e = void 0 === (e = t.parent().find(n).data("distance")) ? 0 : e;
            Math.abs(e) < 10 && (t.revcallslidewithid(p),
            t.parent().find(o).removeClass("selected"),
            jQuery(this).addClass("selected"))
        })
    }
      , i = function(e, t, i) {
        return null != e && void 0 !== e.c && (e.hide_under > O[t].canv.width || O[t].canv.width > e.hide_over ? (!0 !== e.tpForceNotVisible && (e.c.addClass("tp-forcenotvisible"),
        i = !(e.isVisible = !1)),
        e.tpForceNotVisible = !0) : (!1 !== e.tpForceNotVisible && (e.c.removeClass("tp-forcenotvisible"),
        i = e.isVisible = !0),
        e.tpForceNotVisible = !1)),
        i
    };
    window.RS_MODULES = window.RS_MODULES || {},
    window.RS_MODULES.navigation = {
        loaded: !0,
        version: "6.6.0"
    },
    window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal()
}(jQuery),
!function() {
    "use strict";
    window._R_is_Editor ? RVS._R = void 0 === RVS._R ? {} : RVS._R : window._R_is_Editor = !1,
    jQuery.fn.revolution = jQuery.fn.revolution || {};
    var p = _R_is_Editor ? RVS._R : jQuery.fn.revolution;
    jQuery.extend(!0, p, {
        bgW: function(e, t) {
            return _R_is_Editor ? RVS.RMD.width : "carousel" === p[e].sliderType ? p[e].justifyCarousel ? p[e].carousel.slide_widths[void 0 !== t ? t : p[e].carousel.focused] : p[e].carousel.slide_width : p[e].module.width
        },
        bgH: function(e, t) {
            return _R_is_Editor ? RVS.RMD.height : "carousel" === p[e].sliderType ? p[e].carousel.slide_height : p[e].module.height
        },
        getPZSides: function(e, t, i, a, r, o, s) {
            e *= i,
            t *= i,
            i = Math.abs(a - e),
            a = Math.abs(r - t),
            r = new Object;
            return r.l = (0 - o) * i,
            r.r = r.l + e,
            r.t = (0 - s) * a,
            r.b = r.t + t,
            r.h = o,
            r.v = s,
            r
        },
        getPZCorners: function(e, t, i, a) {
            var e = e.bgposition.split(" ") || "center center"
              , r = "center" == e[0] ? "50%" : "left" == e[0] || "left" == e[1] ? "0%" : "right" == e[0] || "right" == e[1] ? "100%" : e[0]
              , e = "center" == e[1] ? "50%" : "top" == e[0] || "top" == e[1] ? "0%" : "bottom" == e[0] || "bottom" == e[1] ? "100%" : e[1]
              , r = parseInt(r, 0) / 100 || 0
              , e = parseInt(e, 0) / 100 || 0
              , o = new Object;
            return o.start = p.getPZSides(a.start.width, a.start.height, a.start.scale, t, i, r, e),
            o.end = p.getPZSides(a.start.width, a.start.height, a.end.scale, t, i, r, e),
            o
        },
        getPZValues: function(e) {
            var t, i = e.panzoom.split(";"), a = {
                duration: 10,
                ease: "none",
                scalestart: 1,
                scaleend: 1,
                rotatestart: .01,
                rotateend: 0,
                blurstart: 0,
                blurend: 0,
                offsetstart: "0/0",
                offsetend: "0/0"
            };
            for (t in i)
                if (i.hasOwnProperty(t)) {
                    var r = i[t].split(":")
                      , o = r[0]
                      , s = r[1];
                    switch (o) {
                    case "d":
                        a.duration = parseInt(s, 0) / 1e3;
                        break;
                    case "e":
                        a.ease = s;
                        break;
                    case "ss":
                        a.scalestart = parseInt(s, 0) / 100;
                        break;
                    case "se":
                        a.scaleend = parseInt(s, 0) / 100;
                        break;
                    case "rs":
                        a.rotatestart = parseInt(s, 0);
                        break;
                    case "re":
                        a.rotateend = parseInt(s, 0);
                        break;
                    case "bs":
                        a.blurstart = parseInt(s, 0);
                        break;
                    case "be":
                        a.blurend = parseInt(s, 0);
                        break;
                    case "os":
                        a.offsetstart = s;
                        break;
                    case "oe":
                        a.offsetend = s
                    }
                }
            return a.offsetstart = a.offsetstart.split("/") || [0, 0],
            a.offsetend = a.offsetend.split("/") || [0, 0],
            a.rotatestart = 0 === a.rotatestart ? .01 : a.rotatestart,
            e.panvalues = a,
            e.bgposition = "center center" == e.bgposition ? "50% 50%" : e.bgposition,
            a
        },
        pzCalcL: function(e, t, i) {
            var a, r, o, s = void 0 === i.panvalues ? jQuery.extend(!0, {}, p.getPZValues(i)) : jQuery.extend(!0, {}, i.panvalues), n = s.offsetstart, l = s.offsetend, d = {
                start: {
                    width: e,
                    height: _R_is_Editor ? e / i.loadobj.width * i.loadobj.height : e / i.owidth * i.oheight,
                    rotation: Math.PI / 180 * s.rotatestart,
                    rotationV: s.rotatestart,
                    scale: s.scalestart,
                    transformOrigin: "0% 0%"
                },
                end: {
                    rotation: Math.PI / 180 * s.rotateend,
                    rotationV: s.rotateend,
                    scale: s.scaleend
                }
            };
            s.scalestart,
            i.owidth,
            i.oheight,
            s.scaleend,
            i.owidth,
            i.oheight;
            return d.start.height < t && (o = t / d.start.height,
            d.start.height = t,
            d.start.width = d.start.width * o),
            .01 === s.rotatestart && 0 === s.rotateend && (delete d.start.rotation,
            delete d.end.rotation),
            o = p.getPZCorners(i, e, t, d),
            n[0] = parseFloat(n[0]) + o.start.l,
            l[0] = parseFloat(l[0]) + o.end.l,
            n[1] = parseFloat(n[1]) + o.start.t,
            l[1] = parseFloat(l[1]) + o.end.t,
            i = o.start.r - o.start.l,
            a = o.start.b - o.start.t,
            r = o.end.r - o.end.l,
            o = o.end.b - o.end.t,
            n[0] = 0 < n[0] ? 0 : i + n[0] < e ? e - i : n[0],
            l[0] = 0 < l[0] ? 0 : r + l[0] < e ? e - r : l[0],
            n[1] = 0 < n[1] ? 0 : a + n[1] < t ? t - a : n[1],
            l[1] = 0 < l[1] ? 0 : o + l[1] < t ? t - o : l[1],
            d.start.x = n[0],
            d.start.y = n[1],
            d.end.x = l[0],
            d.end.y = l[1],
            d.end.ease = s.ease,
            d
        },
        pzDrawShadow: function(e, t, i) {
            "animating" !== t.currentState && null != t.panFake && !t.pzLastFrame || (t.pzLastFrame = !1,
            t.shadowCTX.clearRect(0, 0, t.shadowCanvas.width, t.shadowCanvas.height),
            t.shadowCTX.save(),
            void 0 !== i.rotation ? t.shadowCTX.transform(Math.cos(i.rotation) * i.scale, Math.sin(i.rotation) * i.scale, Math.sin(i.rotation) * -i.scale, Math.cos(i.rotation) * i.scale, i.x, i.y) : t.shadowCTX.transform(i.scale, 0, 0, i.scale, i.x, i.y),
            t.shadowCTX.drawImage(t.loadobj.img, 0, 0, i.width, i.height),
            t.shadowCTX.restore()),
            "animating" !== t.currentState ? null != t.panFake ? (t.panFake.visible || (t.panFake.visible = !0,
            t.panFake.img.style.opacity = 1,
            t.canvas.style.opacity = 0),
            tpGS.gsap.set(t.panFake.img, {
                width: i.width,
                height: i.height,
                force3D: !0,
                x: i.x,
                y: i.y,
                transformOrigin: "0% 0%",
                rotationZ: i.rotationV + "deg",
                scale: i.scale
            }),
            void 0 !== i.blur && (t.panFake.img.style.filter = 0 === i.blur ? "none" : "blur(" + i.blur + "px)")) : (p.updateSlideBGs(e, i.slidekey, t, !0),
            void 0 !== i.blur && (t.canvas.style.filter = 0 === i.blur ? "none" : "blur(" + i.blur + "px)")) : (void 0 !== t.panFake && !1 !== t.panFake.visible && (t.panFake.visible = !1,
            t.panFake.img.style.opacity = 0,
            t.canvas.style.opacity = 1,
            t.panFake.img.style.filter = "none"),
            void 0 !== i.blur && t.canvasFilter ? t.canvasFilterBlur = i.blur : t.canvas.style.filter = 0 === i.blur ? "none" : "blur(" + i.blur + "px)")
        },
        startPanZoom: function(e, t, i, a, r, o) {
            var s, n, l, d, c = _R_is_Editor ? e : e.data();
            void 0 !== c.panzoom && null !== c.panzoom && (s = _R_is_Editor ? c : p[t].sbgs[o],
            _R_is_Editor || "carousel" !== p[t].sliderType || (p[t].carousel.justify && void 0 === p[t].carousel.slide_widths && p.setCarouselDefaults(t, !0),
            p[t].carousel.justify) || (void 0 === p[t].carousel.slide_width && (p[t].carousel.slide_width = !0 !== p[t].carousel.stretch ? p[t].gridwidth[p[t].level] * (0 === p[t].CM.w ? 1 : p[t].CM.w) : p[t].canv.width),
            void 0 === p[t].carousel.slide_height && (p[t].carousel.slide_height = !0 !== p[t].carousel.stretch ? p[t].gridheight[p[t].level] * (0 === p[t].CM.w ? 1 : p[t].CM.w) : p[t].canv.height)),
            n = p.getmDim(t, a, s),
            l = p.pzCalcL(n.width, n.height, c),
            s.pzAnim = l,
            _R_is_Editor || (p[t].panzoomTLs = void 0 === p[t].panzoomTLs ? {} : p[t].panzoomTLs,
            p[t].panzoomBGs = void 0 === p[t].panzoomBGs ? {} : p[t].panzoomBGs,
            void 0 === p[t].panzoomBGs[a] && (p[t].panzoomBGs[a] = e),
            d = p[t].panzoomTLs[a]),
            i = i || 0,
            void 0 !== d && (d.pause(),
            d.kill(),
            d = void 0),
            d = tpGS.gsap.timeline({
                paused: !0
            }),
            c.panvalues.duration = NaN === c.panvalues.duration || void 0 === c.panvalues.duration ? 10 : c.panvalues.duration,
            _R_is_Editor || void 0 === c || void 0 === s || (s.panvalues = c.panvalues),
            void 0 !== s) && (void 0 === s.shadowCanvas && (s.shadowCanvas = document.createElement("canvas"),
            s.shadowCTX = s.shadowCanvas.getContext("2d"),
            s.shadowCanvas.style.background = "transparent",
            s.shadowCanvas.style.opacity = 1),
            s.shadowCanvas.width !== n.width && (s.shadowCanvas.width = n.width),
            s.shadowCanvas.height !== n.height && (s.shadowCanvas.height = n.height),
            l.slideindex = a,
            l.slidekey = _R_is_Editor ? void 0 : o,
            l.start.slidekey = l.slidekey,
            p.pzDrawShadow(t, s, l.start),
            l.end.onUpdate = function() {
                p.pzDrawShadow(t, s, l.start)
            }
            ,
            s.panStart = jQuery.extend(!0, {}, l.start),
            void 0 === c.panvalues.blurstart || void 0 === c.panvalues.blurend || 0 === c.panvalues.blurstart && 0 === c.panvalues.blurend || (l.start.blur = c.panvalues.blurstart,
            l.end.blur = c.panvalues.blurend),
            (!_R_is_Editor && void 0 === l.start.blur && !p.isFF || window.isSafari11 && p.ISM) && (s.panFake = void 0 === s.panFake ? {
                img: s.loadobj.img.cloneNode(!0)
            } : s.panFake,
            void 0 !== s.panFake) && (!0 !== s.panFake.appended && (s.panFake.appended = !0,
            s.sbg.appendChild(s.panFake.img),
            s.panFake.img.style.position = "absolute",
            s.panFake.img.style.display = "block",
            s.panFake.img.style.zIndex = 0,
            s.panFake.img.style.opacity = 0,
            s.panFake.img.style.top = "0px",
            s.panFake.img.style.left = "0px"),
            s.panFake.img.width = l.start.width,
            s.panFake.img.height = l.start.height),
            d.add(tpGS.gsap.to(l.start, c.panvalues.duration, l.end), 0),
            d.progress(i),
            "play" !== r && "first" !== r || d.play(),
            _R_is_Editor ? RVS.TL[RVS.S.slideId].panzoom = d : p[t].panzoomTLs[a] = d)
        }
    }),
    window.RS_MODULES = window.RS_MODULES || {},
    window.RS_MODULES.panzoom = {
        loaded: !0,
        version: "6.6.0"
    },
    window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal()
}(jQuery),
!function(t) {
    "use strict";
    jQuery.fn.revolution = jQuery.fn.revolution || {};
    var k = jQuery.fn.revolution
      , l = (jQuery.extend(!0, k, {
        checkForParallax: function(a) {
            var r = k[a].parallax;
            if (!r.done) {
                if (r.done = !0,
                k.ISM && r.disable_onmobile)
                    return !1;
                if ("3D" == r.type || "3d" == r.type) {
                    for (e in k.addSafariFix(a),
                    tpGS.gsap.set(k[a].c, {
                        overflow: r.ddd_overflow
                    }),
                    tpGS.gsap.set(k[a].canvas, {
                        overflow: r.ddd_overflow
                    }),
                    ("carousel" != k[a].sliderType || "carousel" == k[a].sliderType && "mousedrag" == k[a].parallax.type) && r.ddd_shadow && (n = jQuery('<div class="dddwrappershadow"></div>'),
                    tpGS.gsap.set(n, {
                        force3D: "auto",
                        transformPerspective: 1600,
                        transformOrigin: "50% 50%",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 0
                    }),
                    k[a].c.prepend(n)),
                    k[a].slides)
                        k[a].slides.hasOwnProperty(e) && l(jQuery(k[a].slides[e]), a);
                    0 < k[a].c.find("rs-static-layers").length && (tpGS.gsap.set(k[a].c.find("rs-static-layers"), {
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }),
                    l(k[a].c.find("rs-static-layers"), a))
                }
                r.pcontainers = {},
                r.bgcontainers = [],
                r.bgcontainer_depths = [],
                r.speed = void 0 === r.speed ? 0 : parseInt(r.speed, 0),
                r.speedbg = void 0 === r.speedbg ? 0 : parseInt(r.speedbg, 0),
                r.speedls = void 0 === r.speedls ? 0 : parseInt(r.speedls, 0),
                k[a].c.find("rs-slide rs-sbg-wrap, rs-slide rs-bgvideo").each(function() {
                    var e = jQuery(this)
                      , t = e.data("parallax");
                    window.isSafari11 || (k[a].parZ = 1),
                    void 0 !== (t = "on" == t || !0 === t ? 1 : t) && "off" !== t && !1 !== t && (r.bgcontainers.push(e.closest("rs-sbg-px")),
                    r.bgcontainer_depths.push(k[a].parallax.levels[parseInt(t, 0) - 1] / 100))
                });
                for (var e = 1; e <= r.levels.length; e++) {
                    for (var t in k[a].slides)
                        k[a].slides.hasOwnProperty(t) && (i = (o = k[a].slides[t]).dataset.key,
                        void 0 === r.pcontainers[i] && (r.pcontainers[i] = {}),
                        d(e, r, o, r.pcontainers[i]));
                    var i = "static";
                    void 0 === r.pcontainers[i] && (r.pcontainers[i] = {}),
                    d(e, r, k[a].slayers[0], r.pcontainers[i]),
                    JSON.stringify(r.pcontainers[i]) == JSON.stringify({}) && delete r.pcontainers[i]
                }
                if ("mouse" == r.type || "mousedrag" == r.type || "mousescroll" == r.type || "3D" == r.type || "3d" == r.type) {
                    var o, s = "rs-slide .dddwrapper, .dddwrappershadow, rs-slide .dddwrapper-layer, rs-static-layers .dddwrapper-layer";
                    for (t in "carousel" === k[a].sliderType && (s = "rs-slide .dddwrapper, rs-slide .dddwrapper-layer, rs-static-layers .dddwrapper-layer"),
                    r.sctors = {},
                    k[a].slides)
                        k[a].slides.hasOwnProperty(t) && (i = (o = k[a].slides[t]).dataset.key,
                        r.sctors[i] = o.querySelectorAll(s));
                    k[a].slayers[0] && (r.sctors.static = k[a].slayers[0].querySelectorAll(s)),
                    r.mouseEntered = !1,
                    k[a].c.on("mouseenter", function(e) {
                        var t = k[a].c.offset().top
                          , i = k[a].c.offset().left;
                        r.mouseEnterX = e.pageX - i,
                        r.mouseEnterY = e.pageY - t,
                        r.mouseEntered = !0
                    }),
                    r.parallaxHandler = this.updateParallax.bind(this, a, r),
                    r.hasAlreadyPermission = !1,
                    "mousedrag" != r.type && k[a].c.on("mousemove.hoverdir, mouseleave.hoverdir, trigger3dpath", function(e) {
                        r.eventData = e,
                        void 0 !== r.frame && "mouseleave" !== e.type || (r.frame = window.requestAnimationFrame(r.parallaxHandler))
                    }),
                    k.ISM && (k.modulesNeedOrientationListener = null == k.modulesNeedOrientationListener ? {} : k.modulesNeedOrientationListener,
                    k.modulesNeedOrientationListener[a] = !0,
                    k.addDeviceOrientationListener(a))
                }
                var n = k[a].scrolleffect;
                n.set && (n.multiplicator_layers = parseFloat(n.multiplicator_layers),
                n.multiplicator = parseFloat(n.multiplicator)),
                void 0 !== n._L && 0 === n._L.length && (n._L = !1),
                void 0 !== n.bgs && 0 === n.bgs.length && (n.bgs = !1)
            }
        },
        removeIOSPermissionWait: function() {
            document.querySelectorAll(".iospermaccwait").forEach(function(e) {
                e.classList.add("permanenthidden")
            })
        },
        addDeviceOrientationListener: function(t) {
            var i = k[t].parallax;
            window.addEventListener("deviceorientation", function(e) {
                k.modulesNeedOrientationListener[t] && (k.modulesNeedOrientationListener[t] = !1,
                k.removeIOSPermissionWait()),
                i.eventData = e,
                void 0 === i.frame && (i.frame = window.requestAnimationFrame(i.parallaxHandler))
            })
        },
        getAccelerationPermission: function(e) {
            DeviceMotionEvent.requestPermission().then(function(e) {
                if ("granted" == e)
                    for (var t in k.modulesNeedOrientationListener)
                        k.modulesNeedOrientationListener.hasOwnProperty(t) && (k.modulesNeedOrientationListener[t] = !1,
                        k.removeIOSPermissionWait(),
                        k.addDeviceOrientationListener(t))
            })
        },
        getLayerParallaxOffset: function(e, t, i) {
            return void 0 !== k[e].parallax && void 0 !== k[e].parallax.pcontainers && void 0 !== k[e].parallax.pcontainers[k[e]._L[t].slidekey] && void 0 !== k[e].parallax.pcontainers[k[e]._L[t].slidekey][t] ? Math.abs(k[e].parallax.pcontainers[k[e]._L[t].slidekey][t]["offs" + i]) : 0
        },
        updateParallax: function(e, t) {
            t.frame && (t.frame = window.cancelAnimationFrame(t.frame));
            var i, a, r, o, s, n, l, d, c, p, g = t.eventData, u = k[e].c.offset().left, h = k[e].c.offset().top, m = k[e].canv.width, v = k[e].canv.height, f = t.speed / 1e3 || 3;
            if ("mousedrag" == t.type ? (a = -20 * k[e].carousel.delta,
            i = -20 * k[e].carousel.delta,
            k[e].carousel.fromWheel ? "v" === k[e].carousel.orientation ? i = 0 : a = 0 : "v" === k[e].carousel.orientation ? i = k[e].carousel.cX - k[e].carousel.lerpX : a = k[e].carousel.cY - k[e].carousel.lerpY) : "enterpoint" == t.origo && "deviceorientation" !== g.type ? (!1 === t.mouseEntered && (t.mouseEnterX = g.pageX - u,
            t.mouseEnterY = g.pageY - h,
            t.mouseEntered = !0),
            i = t.mouseEnterX - (g.pageX - u),
            a = t.mouseEnterY - (g.pageY - h),
            f = t.speed / 1e3 || .4) : "deviceorientation" !== g.type && (i = m / 2 - (g.pageX - u),
            a = v / 2 - (g.pageY - h)),
            ("mousedrag" != k[e].parallax.type || k[e].carousel.isPressed) && g && "deviceorientation" == g.type) {
                var y, u = g.beta - 60, w = (y = g.gamma,
                u = u,
                1 < Math.abs(t.orientationX - y) || 1 < Math.abs(t.orientationY - u));
                if (t.orientationX = y,
                t.orientationY = u,
                !w)
                    return;
                k.winW > k.getWinH(e) && (w = y,
                y = u,
                u = w),
                i = 360 / m * (y *= 1.5),
                a = 180 / v * (u *= 1.5)
            }
            for (x in !g || "mouseleave" !== g.type && "mouseout" !== g.type ? "mousedrag" == k[e].parallax.type && k[e].carousel.isPressed && ("v" === k[e].carousel.orientation && "same" == t.car_dir && (i = 0),
            "same" == t.car_dir ? "v" === k[e].carousel.orientation ? i = 0 : a = 0 : "opposite" == t.car_dir && ("v" === k[e].carousel.orientation ? (i = a,
            a = 0) : (a = i,
            i = 0)),
            "v" === k[e].carousel.orientation ? (a *= t.car_smulti,
            i *= t.car_omulti) : (a *= t.car_omulti,
            i *= t.car_smulti)) : t.mouseEntered = !1,
            t.pcontainers)
                if (t.pcontainers.hasOwnProperty(x)) {
                    var b, _ = !1;
                    if ("mousedrag" == t.type && !k[e].carousel.justify)
                        for (var S = 0; S < k[e].slideamount; S++)
                            k[e].carousel.trackArr[S].elem.getAttribute("data-key") === x && Math.abs(k[e].carousel.trackArr[S].progress <= 1) && (_ = !0);
                    if (void 0 === k[e].activeRSSlide || "static" === x || _ && "all" == t.car_env || k[e].slides[k[e].activeRSSlide].dataset.key === x)
                        for (var S in t.pcontainers[x])
                            t.pcontainers[x].hasOwnProperty(S) && ((b = t.pcontainers[x][S]).pl = "3D" == t.type || "3d" == t.type ? b.depth / 200 : b.depth / 100,
                            b.offsh = i * b.pl,
                            b.offsv = a * b.pl,
                            "mousescroll" == t.type ? tpGS.gsap.to(b.tpw, f, {
                                force3D: "auto",
                                x: b.offsh,
                                ease: "power3.out",
                                overwrite: "all"
                            }) : tpGS.gsap.to(b.tpw, f, {
                                force3D: "auto",
                                x: b.offsh,
                                y: b.offsv,
                                ease: "power3.out",
                                overwrite: "all"
                            }))
                }
            if ("3D" == t.type || "3d" == t.type)
                for (var x in t.sctors)
                    if (t.sctors.hasOwnProperty(x) && (void 0 === k[e].activeRSSlide || "static" === x || k[e].slides[k[e].activeRSSlide].dataset.key === x || k.isFF))
                        for (var S in t.sctors[x])
                            t.sctors[x].hasOwnProperty(S) && (h = jQuery(t.sctors[x][S]),
                            o = i * (r = k.isFirefox() ? Math.min(25, t.levels[t.levels.length - 1]) / 200 : t.levels[t.levels.length - 1] / 200),
                            s = a * r,
                            n = 0 != k[e].canv.width && Math.round(i / k[e].canv.width * r * 100) || 0,
                            l = 0 != k[e].canv.height && Math.round(a / k[e].canv.height * r * 100) || 0,
                            d = h.closest("rs-slide"),
                            c = 0,
                            p = !1,
                            "deviceorientation" === g.type && (o = i * (r = t.levels[t.levels.length - 1] / 200),
                            s = a * r * 3,
                            n = 0 != k[e].canv.width && Math.round(i / k[e].canv.width * r * 500) || 0,
                            l = 0 != k[e].canv.height && Math.round(a / k[e].canv.height * r * 700) || 0),
                            h.hasClass("dddwrapper-layer") && (c = t.ddd_z_correction || 65,
                            p = !0),
                            h.hasClass("dddwrapper-layer") && (s = o = 0),
                            d.index() === k[e].pr_active_key || "carousel" != k[e].sliderType || "carousel" == k[e].sliderType && "mousedrag" == k[e].parallax.type ? !t.ddd_bgfreeze || p ? tpGS.gsap.to(h, f, {
                                rotationX: l,
                                rotationY: -n,
                                x: o,
                                z: c,
                                y: s,
                                ease: "power3.out",
                                overwrite: "all"
                            }) : tpGS.gsap.to(h, .5, {
                                force3D: "auto",
                                rotationY: 0,
                                rotationX: 0,
                                z: 0,
                                ease: "power3.out",
                                overwrite: "all"
                            }) : tpGS.gsap.to(h, .5, {
                                force3D: "auto",
                                rotationY: 0,
                                x: 0,
                                y: 0,
                                rotationX: 0,
                                z: 0,
                                ease: "power3.out",
                                overwrite: "all"
                            }),
                            "mouseleave" != g.type && "mouseout" !== g.type || tpGS.gsap.to(this, 3.8, {
                                z: 0,
                                ease: "power3.out"
                            }))
        },
        parallaxProcesses: function(e, t, i, a) {
            var r = k[e].fixedOnTop ? Math.min(1, Math.max(0, window.scrollY / k.lastwindowheight)) : Math.min(1, Math.max(0, (0 - (t.top - k.lastwindowheight)) / (t.hheight + k.lastwindowheight)))
              , o = (0 <= t.top && t.top <= k.lastwindowheight || t.top <= 0 && 0 <= t.bottom || t.top <= 0 && t.bottom,
            k[e].slides[void 0 === k[e].pr_active_key ? 0 : k[e].pr_active_key]);
            if (k[e].scrollProg = r,
            k[e].scrollProgBasics = {
                top: t.top,
                height: t.hheight,
                bottom: t.bottom
            },
            k[e].sbtimeline.fixed ? (!1 === k[e].fixedScrollOnState || 0 !== k[e].drawUpdates.cpar.left || !k.stickySupported || 0 != k[e].fullScreenOffsetResult && null != k[e].fullScreenOffsetResult ? k.stickySupported = !1 : (k[e].topc.addClass("rs-stickyscrollon"),
            k[e].fixedScrollOnState = !0),
            void 0 === k[e].sbtimeline.rest && k.updateFixedScrollTimes(e),
            t.top >= k[e].fullScreenOffsetResult && t.top <= k.lastwindowheight ? (r = k[e].sbtimeline.fixStart * (1 - t.top / k.lastwindowheight) / 1e3,
            !0 !== k.stickySupported && !1 !== k[e].fixedScrollOnState && (k[e].topc.removeClass("rs-fixedscrollon"),
            tpGS.gsap.set(k[e].cpar, {
                top: 0,
                y: 0
            }),
            k[e].fixedScrollOnState = !1)) : r = t.top <= k[e].fullScreenOffsetResult && t.bottom >= k[e].module.height ? (!0 !== k.stickySupported && !0 !== k[e].fixedScrollOnState && (k[e].fixedScrollOnState = !0,
            k[e].topc.addClass("rs-fixedscrollon"),
            tpGS.gsap.set(k[e].cpar, {
                top: 0,
                y: k[e].fullScreenOffsetResult
            })),
            (k[e].sbtimeline.fixStart + k[e].sbtimeline.time * (Math.abs(t.top) / (t.hheight - k[e].module.height))) / 1e3) : (!0 !== k.stickySupported && (tpGS.gsap.set(k[e].cpar, {
                top: 0 <= k[e].scrollproc ? 0 : t.height - k[e].module.height
            }),
            !1 !== k[e].fixedScrollOnState) && (k[e].topc.removeClass("rs-fixedscrollon"),
            k[e].fixedScrollOnState = !1),
            t.top > k.lastwindowheight ? 0 : (k[e].sbtimeline.fixEnd + k[e].sbtimeline.rest * (1 - t.bottom / k[e].module.height)) / 1e3)) : r = k[e].duration * r / 1e3,
            void 0 !== o && void 0 !== k.gA(o, "key") && !0 !== i) {
                var s, n, l = 0;
                for (s in k[e].sbas[k.gA(o, "key")])
                    void 0 !== k[e]._L[s] && null == k[e]._L[s].timeline && l++,
                    void 0 === k[e]._L[s] || void 0 === k[e]._L[s].timeline || 1 != k[e]._L[s].animationonscroll && "true" != k[e]._L[s].animationonscroll || (l = -9999,
                    n = void 0 !== k[e]._L[s].scrollBasedOffset ? r + k[e]._L[s].scrollBasedOffset : r,
                    k[e]._L[s].animteToTime !== (n = n <= 0 ? 0 : n < .1 ? .1 : n) && (k[e]._L[s].animteToTimeCache = k[e]._L[s].animteToTime,
                    k[e]._L[s].animteToTime = n,
                    tpGS.gsap.to(k[e]._L[s].timeline, k[e].sbtimeline.speed, {
                        time: n,
                        ease: k[e].sbtimeline.ease
                    })));
                0 < l && requestAnimationFrame(function() {
                    k.parallaxProcesses(e, t, i, a)
                }),
                k[e].c.trigger("timeline_scroll_processed", {
                    id: e,
                    mproc: r,
                    speed: k[e].sbtimeline.speed
                })
            }
            if (k.ISM && k[e].parallax.disable_onmobile)
                return !1;
            var d, c, p = k[e].parallax;
            if (void 0 !== k[e].slides[k[e].pr_processing_key] && void 0 !== k[e].slides[k[e].pr_processing_key].dataset && (d = k[e].slides[k[e].pr_processing_key].dataset.key),
            "3d" != p.type && "3D" != p.type) {
                if ("scroll" == p.type || "mousescroll" == p.type)
                    for (var g in p.pcontainers)
                        if (p.pcontainers.hasOwnProperty(g) && (void 0 === k[e].activeRSSlide || "static" === g || k[e].slides[k[e].activeRSSlide].dataset.key === g || d === g))
                            for (var u in p.pcontainers[g])
                                p.pcontainers[g].hasOwnProperty(u) && (c = p.pcontainers[g][u],
                                v = void 0 !== a ? a : p.speedls / 1e3 || 0,
                                c.pl = c.depth / 100,
                                c.offsv = Math.round(k[e].scrollproc * -(c.pl * k[e].canv.height) * 10) / 10 || 0,
                                tpGS.gsap.to(c.tpw, v, {
                                    overwrite: "auto",
                                    force3D: "auto",
                                    y: c.offsv
                                }));
                if (p.bgcontainers)
                    for (u = 0; u < p.bgcontainers.length; u++) {
                        var h = p.bgcontainers[u]
                          , m = p.bgcontainer_depths[u]
                          , m = k[e].scrollproc * -(m * k[e].canv.height) || 0
                          , v = void 0 !== a ? a : p.speedbg / 1e3 || .015;
                        v = void 0 !== k[e].parallax.lastBGY && 0 === v && 50 < Math.abs(m - k[e].parallax.lastBGY) ? .15 : v,
                        tpGS.gsap.to(h, v, {
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            backfaceVisibility: "hidden",
                            force3D: "true",
                            y: m + "px"
                        }),
                        k[e].parallax.lastBGY = m
                    }
            }
            var f = k[e].scrolleffect;
            if (f.set && (!k.ISM || !1 === f.disable_onmobile)) {
                var y, o = (o = Math.abs(k[e].scrollproc) - f.tilt / 100) < 0 ? 0 : o;
                if (!1 !== f._L && (S = 1 - o * f.multiplicator_layers,
                x = {
                    force3D: "true"
                },
                "top" == f.direction && 0 <= k[e].scrollproc && (S = 1),
                S = 1 < (S = "bottom" == f.direction && k[e].scrollproc <= 0 ? 1 : S) ? 1 : S < 0 ? 0 : S,
                f.fade && (x.opacity = S),
                f.scale && (y = S,
                x.scale = 1 - y + 1),
                f.blur && (b = (1 - S) * f.maxblur,
                x["-webkit-filter"] = "blur(" + (b = b <= .03 ? 0 : b) + "px)",
                x.filter = "blur(" + b + "px)",
                window.isSafari11) && void 0 !== f._L && void 0 !== f._L[0] && void 0 !== f._L[0][0] && "RS-MASK-WRAP" == f._L[0][0].tagName && (x.z = .001),
                f.grayscale && (_ = "grayscale(" + 100 * (1 - S) + "%)",
                x["-webkit-filter"] = void 0 === x["-webkit-filter"] ? _ : x["-webkit-filter"] + " " + _,
                x.filter = void 0 === x.filter ? _ : x.filter + " " + _),
                tpGS.gsap.set(f._L, x)),
                !1 !== f.bgs) {
                    var w, b, _, S = 1 - o * f.multiplicator, x = {
                        backfaceVisibility: "hidden",
                        force3D: "true"
                    };
                    for (w in "top" == f.direction && 0 <= k[e].scrollproc && (S = 1),
                    S = 1 < (S = "bottom" == f.direction && k[e].scrollproc <= 0 ? 1 : S) ? 1 : S < 0 ? 0 : S,
                    f.bgs)
                        f.bgs.hasOwnProperty(w) && (f.bgs[w].fade && (x.opacity = S),
                        f.bgs[w].blur && (b = (1 - S) * f.maxblur,
                        x["-webkit-filter"] = "blur(" + b + "px)",
                        x.filter = "blur(" + b + "px)"),
                        f.bgs[w].grayscale && (_ = "grayscale(" + 100 * (1 - S) + "%)",
                        x["-webkit-filter"] = void 0 === x["-webkit-filter"] ? _ : x["-webkit-filter"] + " " + _,
                        x.filter = void 0 === x.filter ? _ : x.filter + " " + _),
                        tpGS.gsap.set(f.bgs[w].c, x))
                }
            }
        }
    }),
    function(e, t) {
        var i = k[t].parallax
          , a = (e.find("rs-sbg-wrap").wrapAll('<div class="dddwrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden"></div>'),
        e[0].querySelectorAll(".rs-parallax-wrap"))
          , r = document.createElement("div");
        r.className = "dddwrapper-layer",
        r.style.width = "100%",
        r.style.height = "100%",
        r.style.position = "absolute",
        r.style.top = "0px",
        r.style.left = "0px",
        r.style.zIndex = 5,
        r.style.overflow = i.ddd_layer_overflow;
        for (var o = 0; o < a.length; o++)
            a.hasOwnProperty(o) && null === k.closestNode(a[o], "RS-GROUP") && null === k.closestNode(a[o], "RS-ROW") && r.appendChild(a[o]);
        e[0].appendChild(r),
        e.find(".rs-pxl-tobggroup").closest(".rs-parallax-wrap").wrapAll('<div class="dddwrapper-layertobggroup" style="position:absolute;top:0px;left:0px;z-index:50;width:100%;height:100%"></div>');
        var s = e.find(".dddwrapper")
          , n = e.find(".dddwrapper-layer");
        e.find(".dddwrapper-layertobggroup").appendTo(s),
        "carousel" == k[t].sliderType && (i.ddd_shadow && s.addClass("dddwrappershadow"),
        tpGS.gsap.set(s, {
            borderRadius: k[t].carousel.border_radius
        })),
        tpGS.gsap.set(e, {
            overflow: "visible",
            transformStyle: "preserve-3d",
            perspective: 1600
        }),
        tpGS.gsap.set(s, {
            force3D: "auto",
            transformOrigin: "50% 50%",
            transformStyle: "preserve-3d",
            transformPerspective: 1600
        }),
        tpGS.gsap.set(n, {
            force3D: "auto",
            transformOrigin: "50% 50%",
            zIndex: 5,
            transformStyle: "flat",
            transformPerspective: 1600
        }),
        tpGS.gsap.set(k[t].canvas, {
            transformStyle: "preserve-3d",
            transformPerspective: 1600
        })
    }
    );
    function d(i, a, e, r) {
        t(e).find(".rs-pxl-" + i).each(function() {
            var e = 0 <= this.className.indexOf("rs-pxmask")
              , t = e ? k.closestNode(this, "RS-PX-MASK") : k.closestClass(this, "rs-parallax-wrap");
            t && (e && !window.isSafari11 && (tpGS.gsap.set(t, {
                z: 1
            }),
            tpGS.gsap.set(k.closestNode(t, "RS-BG-ELEM"), {
                z: 1
            })),
            t.dataset.parallaxlevel = a.levels[i - 1],
            t.classList.add("tp-parallax-container"),
            r[this.id] = {
                tpw: t,
                depth: a.levels[i - 1],
                offsv: 0,
                offsh: 0
            })
        })
    }
    window.RS_MODULES = window.RS_MODULES || {},
    window.RS_MODULES.parallax = {
        loaded: !0,
        version: "6.6.0"
    },
    window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal()
}(jQuery),
!function() {
    "use strict";
    window._R_is_Editor ? RVS._R = void 0 === RVS._R ? {} : RVS._R : window._R_is_Editor = !1;
    var e = "power1.inOut"
      , t = "power2.inOut"
      , b = (jQuery.fn.revolution = jQuery.fn.revolution || {},
    _R_is_Editor ? RVS._R : jQuery.fn.revolution)
      , n = (_R_is_Editor && (RVS._R.isNumeric = RVS.F.isNumeric),
    jQuery.extend(!0, b, {
        getSlideAnimationObj: function(e, t, i) {
            var a, r, o, s, n = {};
            for (r in void 0 === t.anim && null == t.in && (t.in = "o:0"),
            t)
                if (t.hasOwnProperty(r) && void 0 !== t[r])
                    for (s in o = t[r].split(";"))
                        o.hasOwnProperty(s) && void 0 !== (a = o[s].split(":"))[0] && void 0 !== a[1] && (n[r] = void 0 === n[r] ? {} : n[r],
                        n[r][a[0]] = "d3" === r && "c" === a[0] ? a[1] : a[1].split(",")[0]);
            return n.in = void 0 === n.in ? {} : n.in,
            n.anim = void 0 === n.anim ? {
                e: "basic"
            } : n.anim,
            _R_is_Editor || void 0 === n.in || void 0 === n.in.prst || b.loadSlideAnimLibrary(e, {
                key: i,
                prst: n.in.prst
            }),
            b[e].sbgs[i].slideanimationRebuild = !1,
            n
        },
        loadSlideAnimLibrary: function(a, r) {
            void 0 === b.SLTR && !0 !== b.SLTR_loading ? (b.SLTR_loading = !0,
            jQuery.ajax({
                type: "post",
                url: b[a].ajaxUrl,
                dataType: "json",
                data: {
                    action: "revslider_ajax_call_front",
                    client_action: "get_transitions"
                },
                success: function(e, t, i) {
                    1 == e.success && (b.SLTR = e.transitions,
                    void 0 !== r) && b.setRandomDefaults(a, r.key, r.prst)
                },
                error: function(e) {
                    console.log("Transition Table can not be loaded"),
                    console.log(e)
                }
            })) : void 0 !== r && void 0 !== b.SLTR && b.setRandomDefaults(a, r.key, r.prst)
        },
        convertSlideAnimVals: function(e) {
            return {
                anim: {
                    eng: e.eng,
                    ms: parseInt(e.speed, 0),
                    o: e.o,
                    e: e.e,
                    f: e.f,
                    p: e.p,
                    d: parseInt(e.d, 0),
                    adpr: e.adpr
                },
                d3: {
                    f: e.d3.f,
                    d: e.d3.d,
                    z: e.d3.z,
                    t: e.d3.t,
                    c: e.d3.c,
                    e: e.d3.e,
                    fdi: e.d3.fdi,
                    fdo: e.d3.fdo,
                    fz: e.d3.fz,
                    su: e.d3.su,
                    smi: e.d3.smi,
                    sma: e.d3.sma,
                    sc: e.d3.sc,
                    sl: e.d3.sl
                },
                in: {
                    eng: e.in.eng,
                    o: _R_is_Editor && void 0 !== e.preset && 0 === e.preset.indexOf("rnd") ? 0 : b.valBeau(e.in.o),
                    x: b.valBeau(e.in.x),
                    y: b.valBeau(e.in.y),
                    r: b.valBeau(e.in.r),
                    sx: b.valBeau(e.in.sx),
                    sy: b.valBeau(e.in.sy),
                    m: e.in.m,
                    e: e.in.e,
                    row: e.in.row,
                    col: e.in.col,
                    mo: "false" !== e.in.mou && !1 !== e.in.mou ? b.valBeau(e.in.mo) : 0,
                    moo: "false" !== e.in.mou && !1 !== e.in.mou ? b.valBeau(e.in.moo) : "none",
                    mou: e.in.mou
                },
                out: void 0 === e.out.a || "true" == e.out.a || !0 === e.out.a ? void 0 : {
                    a: o(e.out.a),
                    o: b.valBeau(e.out.o),
                    x: b.valBeau(e.out.x),
                    y: b.valBeau(e.out.y),
                    r: b.valBeau(e.out.r),
                    sx: b.valBeau(e.out.sx),
                    sy: b.valBeau(e.out.sy),
                    m: e.out.m,
                    e: e.out.e,
                    row: b.valBeau(e.out.row),
                    col: b.valBeau(e.out.col)
                },
                filter: {
                    u: e.filter.u,
                    e: e.filter.e,
                    b: e.filter.b,
                    g: e.filter.g,
                    h: e.filter.h,
                    s: e.filter.s,
                    c: e.filter.c,
                    i: e.filter.i
                },
                addOns: e.addOns
            }
        },
        setRandomDefaults: function(e, t, i) {
            b[e].sbgs[t].random = b.getAnimObjectByKey(i, b.SLTR)
        },
        getSlideAnim_AddonDefaults: function() {
            var e, t = {};
            for (e in b.enabledSlideAnimAddons)
                t = jQuery.extend(!0, t, b[b.enabledSlideAnimAddons[e]].defaults());
            return t
        },
        getSlideAnim_EmptyObject: function() {
            return {
                speed: 1e3,
                o: "inout",
                e: "basic",
                f: "start",
                p: "none",
                d: 15,
                eng: "animateCore",
                adpr: !0,
                d3: {
                    f: "none",
                    d: "horizontal",
                    z: 300,
                    t: 0,
                    c: "#ccc",
                    e: "power2.inOut",
                    fdi: 1.5,
                    fdo: 2,
                    fz: 0,
                    su: !1,
                    smi: 0,
                    sma: .5,
                    sc: "#000",
                    sl: 1
                },
                filter: {
                    u: !1,
                    e: "default",
                    b: 0,
                    g: 0,
                    h: 100,
                    s: 0,
                    c: 100,
                    i: 0
                },
                in: {
                    o: 1,
                    x: 0,
                    y: 0,
                    r: 0,
                    sx: 1,
                    sy: 1,
                    m: !1,
                    e: "power2.inOut",
                    row: 1,
                    col: 1,
                    mo: 80,
                    mou: !1
                },
                out: {
                    a: "true",
                    o: 1,
                    x: 0,
                    y: 0,
                    r: 0,
                    sx: 1,
                    sy: 1,
                    m: !1,
                    e: "power2.inOut",
                    row: 1,
                    col: 1
                },
                addOns: b.getSlideAnim_AddonDefaults()
            }
        },
        getAnimObjectByKey: function(e, t) {
            if (b.getAnimObjectCacheKey === e)
                return b.getAnimObjectCache;
            var i, a;
            for (a in b.getAnimObjectCacheKey = e,
            t)
                if (t.hasOwnProperty(a) && void 0 === i)
                    for (var r in t[a])
                        if (t[a].hasOwnProperty(r) && void 0 === i)
                            if (e === r && 0 === e.indexOf("rnd"))
                                (i = t[a][r]).main = a,
                                i.group = r;
                            else
                                for (var o in t[a][r])
                                    t[a][r].hasOwnProperty(o) && void 0 === i && o === e && ((i = t[a][r][o]).main = a,
                                    i.group = r);
            return b.getAnimObjectCache = jQuery.extend(!0, {}, i),
            i
        },
        getRandomSlideTrans: function(e, t, i) {
            if (void 0 === b.randomSlideAnimCache || void 0 === b.randomSlideAnimCache[e] || void 0 === b.randomSlideAnimCache[e][t])
                for (var a in b.randomSlideAnimCache = void 0 === b.randomSlideAnimCache ? {} : b.randomSlideAnimCache,
                b.randomSlideAnimCache[e] = void 0 === b.randomSlideAnimCache[e] ? {} : b.randomSlideAnimCache[e],
                b.randomSlideAnimCache[e][t] = void 0 === b.randomSlideAnimCache[e][t] ? [] : b.randomSlideAnimCache[e][t],
                i)
                    if (i.hasOwnProperty(a) && "random" !== a && "custom" !== a && ("all" == e || a == e))
                        for (var r in i[a])
                            if (i[a].hasOwnProperty(r) && "icon" !== r && ("" + t == "undefined" || 0 <= t.indexOf(r)))
                                for (var o in i[a][r])
                                    i[a][r].hasOwnProperty(o) && -1 == jQuery.inArray(i[a][r][o].title, ["*north*", "*south*", "*east*", "*west*"]) && b.randomSlideAnimCache[e][t].push(o);
            return b.randomSlideAnimCache[e][t][Math.floor(Math.random() * b.randomSlideAnimCache[e][t].length)]
        },
        cbgW: function(e, t) {
            return _R_is_Editor ? RVS.RMD.width : "carousel" === b[e].sliderType ? b[e].justifyCarousel ? b[e].carousel.slide_widths[void 0 !== t ? t : b[e].carousel.focused] : b[e].carousel.slide_width : b[e].canv.width
        },
        cbgH: function(e, t) {
            return _R_is_Editor ? RVS.RMD.height : "carousel" === b[e].sliderType ? "v" == b[e].carousel.orientation && ("fullscreen" === b[e].sliderLayout || b[e].infullscreenmode) || !0 === b[e].carousel.justify ? b[e].carousel.slide_height : "fullscreen" === b[e].sliderLayout || b[e].infullscreenmode ? b[e].module.height : Math.min(b[e].canv.height, b[e].gridheight[b[e].level]) : void 0 !== b[e].maxHeight && 0 < b[e].maxHeight && !b[e].fixedOnTop ? Math.min(b[e].canv.height, b[e].maxHeight) : b[e].canv.height
        },
        valBeau: function(e) {
            return e = ("" + (e = ("" + (e = ("" + (e = ("" + (e = ("" + e).split(",").join("|"))).replace("{", "ran("))).replace("}", ")"))).replace("[", "cyc("))).replace("]", ")")
        },
        animateSlide: function(e, t) {
            return _R_is_Editor && RVS.F.resetSlideTL(),
            void 0 === tpGS.eases.late && (tpGS.CustomEase.create("late", "M0,0,C0,0,0.474,0.078,0.724,0.26,0.969,0.438,1,1,1,1"),
            tpGS.CustomEase.create("late2", "M0,0 C0,0 0.738,-0.06 0.868,0.22 1,0.506 1,1 1,1 "),
            tpGS.CustomEase.create("late3", "M0,0,C0,0,0.682,0.157,0.812,0.438,0.944,0.724,1,1,1,1")),
            a(e, t)
        },
        getBasic: function(e) {
            return jQuery.extend(!0, {
                attr: null == e || void 0 === e.attr ? ["o", "r", "sx", "sy", "x", "y", "m", "e", "row", "col", "mo", "moo"] : e.attr,
                in: {
                    f: "start",
                    m: !1,
                    o: 1,
                    r: 0,
                    sx: 1,
                    sy: 1,
                    x: 0,
                    y: 0,
                    row: 1,
                    col: 1,
                    e: t,
                    ms: 1e3,
                    mo: 0,
                    moo: "none"
                },
                out: {
                    f: "start",
                    m: !1,
                    o: 1,
                    r: 0,
                    sx: 1,
                    sy: 1,
                    x: 0,
                    y: 0,
                    row: 1,
                    col: 1,
                    e: t,
                    ms: 1e3
                }
            }, e)
        },
        playBGVideo: function(e, t, i) {
            if (_R_is_Editor)
                i = void 0 === i ? RVS.SBGS[RVS.S.slideId].n : i;
            else {
                if (void 0 === i && (void 0 === b[e].pr_next_bg || 0 === b[e].pr_next_bg.length))
                    return;
                i = void 0 === i ? b[e].sbgs[void 0 === t ? b[e].pr_next_bg[0].dataset.key : t] : i
            }
            void 0 !== i.bgvid && 0 < i.bgvid.length && (c(e, {}, i, "in"),
            b.resetVideo(i.bgvid, e),
            b.playVideo(i.bgvid, e, !0),
            tpGS.gsap.to(i.bgvid[0], .2, {
                zIndex: 30,
                display: "block",
                autoAlpha: 1,
                delay: .075,
                overwrite: "all"
            }))
        },
        stopBGVideo: function(e, t, i) {
            if (_R_is_Editor)
                i = void 0 === i ? RVS.SBGS[RVS.S.slideId].n : i;
            else {
                if (void 0 === i && (void 0 === b[e].pr_next_bg || 0 === b[e].pr_next_bg.length))
                    return;
                i = void 0 === i ? b[e].sbgs[void 0 === t ? b[e].pr_next_bg[0].dataset.key : t] : i
            }
            void 0 !== i.bgvid && 0 < i.bgvid.length && (i.drawVideoCanvasImagesRecall = !1,
            b.stopVideo(i.bgvid, e),
            tpGS.gsap.to(i.bgvid[0], .2, {
                autoAlpha: 0,
                zIndex: 0,
                display: "none"
            }))
        },
        SATools: {
            getOffset: function(e, t, i, a) {
                var r = 0 <= ("" + e).indexOf("%");
                return 0 == (e = b.SATools.getSpecialValue(e, a, i)) || void 0 === e ? 0 : r ? t * (parseInt(e) / 100) : parseInt(e)
            },
            getSpecialValue: function(e, t, i, a) {
                var r;
                return b.isNumeric(parseFloat(e, 0)) ? parseFloat(e, 0) : (e = ("random" == (r = 1 < ("" + e).split("ran(").length ? "random" : 1 < ("" + e).split("cyc(").length ? "wrap" : 1 < ("" + e).split("(").length ? "dir" : "unknown") || "wrap" == r ? e.slice(4, -1) : e.slice(1, -1)).split("|"),
                "random" == r ? tpGS.gsap.utils.random(parseFloat(e[0]), parseFloat(1 < e.length ? e[1] : 0 - e[0])) : "wrap" == r ? 1 < ("" + (t = tpGS.gsap.utils.wrap(e, t))).split("(").length ? parseFloat(t.slice(1, -1)) * i + (a ? "%" : "") : t : "dir" == r ? parseFloat(e[0]) * i + (a ? "%" : "") : void 0)
            }
        },
        getmDim: function(e, t, i) {
            var a = b.cbgW(e, t)
              , t = b.cbgH(e, t);
            return i.DPR = _R_is_Editor ? Math.min(window.devicePixelRatio, 2) : b[e].DPR,
            b.maxDimCheck(i, a, t)
        },
        maxDimCheck: function(e, t, i) {
            var a, r, o, s, n, l;
            void 0 !== e.video && "img" !== e.video.tagName && null != e.video.videoWidth && e.video.videoWidth;
            return ("animating" === e.currentState || null != e.panzoom) && ("animating" !== e.currentState || null != e.panzoom || null != e.slideanimation && null != e.slideanimation.anim && "true" === e.slideanimation.anim.adpr) || 1 < e.DPR && b.ISM && 1024 < i ? (e.DPR = 1,
            a = t,
            r = i) : (void 0 === (o = {
                w: null == e.video || e.isVidImg || 0 == e.video.videoWidth ? e.loadobj.width : e.video.videoWidth,
                h: null == e.video || e.isVidImg || 0 == e.video.videoHeight ? e.loadobj.height : e.video.videoHeight
            }).w && (o.w = e.loadobj.width),
            void 0 === o.h && (o.h = e.loadobj.height),
            l = i / o.w,
            s = t / o.h,
            (n = Math.max(l, s)) > e.DPR || 1 <= l && 1 <= s ? e.DPR = 1 : e.DPR > n && (e.DPR = Math.min(e.DPR, e.DPR / n)),
            a = t * e.DPR,
            r = i * e.DPR,
            1 < e.DPR && (l = t / i,
            o.h < o.w && o.w < a ? (r = (a = Math.max(a, o.w)) / l,
            e.DPR = 1) : o.w < o.h && o.h < r && (a = (r = Math.max(r, o.h)) * l,
            e.DPR = 1))),
            {
                width: Math.round(a),
                height: Math.round(r),
                w: t,
                h: i
            }
        },
        updateSlideBGs: function(e, t, i, a) {
            if (_R_is_Editor)
                i = void 0 === i ? RVS.SBGS[RVS.S.slideId].n : i;
            else {
                if (void 0 === i && (void 0 === b[e].pr_next_bg || 0 === b[e].pr_next_bg.length))
                    return;
                i = void 0 === i ? b[e].sbgs[void 0 === t ? b[e].pr_next_bg[0].dataset.key : t] : i
            }
            (a = void 0 !== i.mDIM && a) || (i.mDIM = b.getmDim(e, i.skeyindex, i)),
            void 0 !== i.video ? ("IMG" !== i.video.tagName && (i.isVidImg = ""),
            i.cDIMS = b.getBGCanvasDetails(e, i),
            i.canvas.width = i.mDIM.width,
            i.canvas.height = i.mDIM.height,
            i.ctx.clearRect(0, 0, i.mDIM.width, i.mDIM.height),
            i.ctx.drawImage(i.shadowCanvas, 0, 0)) : (i.cDIMS = b.getBGCanvasDetails(e, i, a),
            i.canvas.width = i.mDIM.width,
            i.canvas.height = i.mDIM.height,
            "panzoom" === i.currentState || "animating" === i.currentState || void 0 === i.currentState && !_R_is_Editor && "carousel" != b[e].sliderType || (i.ctx.clearRect(0, 0, i.mDIM.width, i.mDIM.height),
            0 !== i.shadowCanvas.width && 0 !== i.shadowCanvas.height && i.ctx.drawImage(i.shadowCanvas, 0, 0))),
            "animating" === i.currentState && "carousel" !== b[e].sliderType && b.animatedCanvasUpdate(e, i)
        },
        addCanvas: function() {
            var e = document.createElement("canvas");
            return x = e.getContext("2d"),
            e.style.background = "transparent",
            e.style.opacity = 1,
            x
        },
        updateVideoFrames: function(e, t, i) {
            var a;
            t.now = Date.now(),
            t.then = void 0 === t.then ? t.now - 500 : t.then,
            t.elapsed = t.now - t.then,
            t.fps = "animating" === t.currentState && window._rs_firefox ? 50 : 33,
            t.elapsed > t.fps && (t.then = t.now - t.elapsed % t.fps,
            a = "img" === t.video.tagName || null == t.video.videoWidth || 0 == t.video.videoWidth,
            void 0 !== t.video && !t.video.BGrendered && void 0 !== t.loadobj && void 0 !== t.loadobj.img || b.ISM && b.isFirefox(e) ? (t.mDIM = b.getmDim(e, t.skeyindex, t),
            t.pDIMS = r(t.mDIM, t, {
                width: t.mDIM.width,
                height: t.mDIM.height,
                x: 0,
                y: 0,
                contw: t.loadobj.width,
                conth: t.loadobj.height
            }),
            t.shadowCanvas.width !== t.mDIM.width && (t.shadowCanvas.width = t.mDIM.width),
            t.shadowCanvas.height !== t.mDIM.height && (t.shadowCanvas.height = t.mDIM.height),
            t.shadowCTX.drawImage(t.loadobj.img, t.pDIMS.x, t.pDIMS.y, t.pDIMS.width, t.pDIMS.height)) : (!i && void 0 !== t.sDIMS && a === t.isVidImg && 0 !== t.sDIMS.width && 0 !== t.sDIMS.height || (t.isVidImg = a,
            t.mDIM = b.getmDim(e, t.skeyindex, t),
            t.sDIMS = r(t.mDIM, t, {
                width: t.mDIM.width,
                height: t.mDIM.height,
                x: 0,
                y: 0,
                contw: t.isVidImg ? t.loadobj.width : t.video.videoWidth,
                conth: t.isVidImg ? t.loadobj.height : t.video.videoHeight
            })),
            void 0 !== t.sDIMS && 0 !== t.sDIMS.width && 0 !== t.sDIMS.height && ("animating" === t.currentState ? (t.shadowCanvas.width !== t.mDIM.width && (t.shadowCanvas.width = t.mDIM.width),
            t.shadowCanvas.height !== t.mDIM.height && (t.shadowCanvas.height = t.mDIM.height),
            t.shadowCTX.drawImage(t.video, t.sDIMS.x, t.sDIMS.y, t.sDIMS.width, t.sDIMS.height)) : void 0 === t.animateDirection && (t.canvas.width !== t.mDIM.width && (t.canvas.width = t.mDIM.width),
            t.canvas.height !== t.mDIM.height && (t.canvas.height = t.mDIM.height),
            t.ctx.drawImage(t.video, t.sDIMS.x, t.sDIMS.y, t.sDIMS.width, t.sDIMS.height)),
            t.shadowCanvas_Drawn = !0))),
            (i || t.drawVideoCanvasImagesRecall && "animating" === t.currentState || "animating" === t.currentState && void 0 === t.shadowCanvas_Drawn) && window.requestAnimationFrame(function() {
                b.updateVideoFrames(e, t)
            })
        },
        createOverlay: function(e, t, i, a) {
            if ("none" === t)
                return "none";
            i = void 0 === i ? 1 : i;
            var a = void 0 === a ? {
                0: "rgba(0, 0, 0, 0)",
                1: "rgba(0, 0, 0, 1)"
            } : a
              , r = {
                none: [[0]],
                1: [[1, 0], [0, 0]],
                2: [[1, 0, 0], [0, 0, 0], [0, 0, 0]],
                3: [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
                4: [[1], [0]],
                5: [[1], [0], [0]],
                6: [[1], [0], [0], [0]],
                7: [[1, 0]],
                8: [[1, 0, 0]],
                9: [[1, 0, 0, 0]],
                10: [[1, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 0, 1]],
                11: [[0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0]],
                12: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
                13: [[0, 0, 1], [0, 1, 0], [1, 0, 0]],
                14: [[1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 0]],
                15: [[0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0]],
                16: [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1]]
            }
              , o = void 0 === r[t = void 0 === t ? 1 : t] ? r[2] : r[t];
            _R_is_Editor && (b[e] = void 0 === b[e] ? {} : b[e]),
            b[e].patternCanvas = document.createElement("canvas"),
            b[e].patternCtx = b[e].patternCanvas.getContext("2d"),
            b[e].patternCanvas.width = o[0].length * i,
            b[e].patternCanvas.height = o.length * i;
            for (var s = 0; s < o.length; s++)
                for (var n = 0; n < o[s].length; n++)
                    "transparent" != a[o[s][n]] && (b[e].patternCtx.fillStyle = a[o[s][n]],
                    b[e].patternCtx.fillRect(n * i, s * i, i, i));
            return "url(" + b[e].patternCanvas.toDataURL() + ")"
        },
        getBGCanvasDetails: function(e, t, i) {
            var a;
            return i || (t.mDIM = b.getmDim(e, t.skeyindex, t)),
            t.usepattern = ("auto" === t.bgfit || 0 <= t.bgfit.indexOf("%")) && (void 0 === t.loadobj || !0 !== t.loadobj.useBGColor),
            _R_is_Editor && void 0 === t.panzoom && delete t.shadowCanvas,
            void 0 === t.shadowCanvas && (t.shadowCanvas = document.createElement("canvas"),
            t.shadowCTX = t.shadowCanvas.getContext("2d"),
            t.shadowCanvas.style.background = "transparent",
            t.shadowCanvas.style.opacity = 1),
            !0 === t.replaceShadowCanvas || !0 === t.loadobj.bgColor || !0 === t.usebgColor || void 0 !== t.panzoom || null != t.isHTML5 && 1 != t.poster || t.usepattern ? (a = {
                width: t.mDIM.width,
                height: t.mDIM.height,
                x: 0,
                y: 0
            },
            t.usepattern && void 0 !== t.loadobj && void 0 !== t.loadobj.img ? b.getCanvasPattern(e, t, {
                ratio: t.loadobj.height / t.loadobj.width
            }) : (t.loadobj.bgColor || t.usebgColor) && (t.shadowCanvas.width !== t.mDIM.width && (t.shadowCanvas.width = t.mDIM.width),
            t.shadowCanvas.height !== t.mDIM.height && (t.shadowCanvas.height = t.mDIM.height),
            b.getCanvasGradients(e, t))) : (a = r(t.mDIM, t, {
                width: t.mDIM.width,
                height: t.mDIM.height,
                x: 0,
                y: 0,
                contw: t.loadobj.width,
                conth: t.loadobj.height
            }),
            t.shadowCanvas.width !== t.mDIM.width && (t.shadowCanvas.width = t.mDIM.width),
            t.shadowCanvas.height !== t.mDIM.height && (t.shadowCanvas.height = t.mDIM.height),
            void 0 !== t.loadobj && void 0 !== t.loadobj.img && t.shadowCTX.drawImage(t.loadobj.img, a.x, a.y, a.width, a.height),
            a = {
                width: t.mDIM.width,
                height: t.mDIM.height,
                x: 0,
                y: 0
            }),
            a
        },
        getCanvasPattern: function(e, t, i) {
            void 0 === t.patternImageCanvas && (t.patternImageCanvas = document.createElement("canvas"),
            t.patternImageCTX = t.patternImageCanvas.getContext("2d"));
            var a = t.bgfit.split(" ")
              , a = (1 === a.length && (a[1] = a[0]),
            i.width = "auto" === a[0] ? t.loadobj.width : t.loadobj.width * (parseInt(a[0], 0) / 100),
            i.height = "auto" === a[1] ? t.loadobj.height : i.width * i.ratio,
            t.DPR = _R_is_Editor ? Math.min(window.devicePixelRatio, 2) : b[e].DPR,
            i.width / i.height);
            i.width = i.width * t.DPR,
            i.height = i.height * t.DPR,
            b.isIOS && 15728640 < i.width * i.height && (t.mDIM.width > t.mDIM.height ? (i.width = t.mDIM.width,
            i.height = Math.round(t.mDIM.width / a)) : (i.height = t.mDIM.height,
            i.width = Math.round(t.mDIM.height * a))),
            t.patternImageCanvas.width = i.width,
            t.patternImageCanvas.height = i.height,
            t.patternImageCTX.drawImage(t.loadobj.img, 0, 0, i.width, i.height),
            t.shadowCanvas.width !== t.mDIM.width && (t.shadowCanvas.width = t.mDIM.width),
            t.shadowCanvas.height !== t.mDIM.height && (t.shadowCanvas.height = t.mDIM.height),
            t.shadowCTX.clearRect(0, 0, t.shadowCTX.canvas.width, t.shadowCTX.canvas.height),
            t.pattern = t.shadowCTX.createPattern(t.patternImageCanvas, t.bgrepeat),
            t.shadowCTX.fillStyle = t.pattern,
            t.shadowShifts = {
                h: t.bgposition.split(" ")[0],
                v: t.bgposition.split(" ")[1]
            },
            t.shadowShifts.hperc = b.isNumeric(parseInt(t.shadowShifts.h)) ? parseInt(t.shadowShifts.h) / 100 * t.mDIM.width : 0,
            t.shadowShifts.vperc = b.isNumeric(parseInt(t.shadowShifts.v)) ? parseInt(t.shadowShifts.v) / 100 * t.mDIM.height : 0,
            t.shadowShifts.x = "left" === t.shadowShifts.h ? 0 : "center" === t.shadowShifts.h || "50%" == t.shadowShifts.h ? "repeat" == t.bgrepeat || "repeat-x" == t.bgrepeat ? t.mDIM.width / 2 - i.width / 2 - Math.ceil(t.mDIM.width / 2 / i.width) * i.width : t.mDIM.width / 2 - i.width / 2 : "right" === t.shadowShifts.h ? "repeat" == t.bgrepeat || "repeat-x" == t.bgrepeat ? -(i.width - t.mDIM.width % i.width) : t.mDIM.width - i.width : "repeat" == t.bgrepeat || "repeat-x" == t.bgrepeat ? -(i.width - t.shadowShifts.hperc % i.width) : t.shadowShifts.hperc,
            t.shadowShifts.y = "top" === t.shadowShifts.v ? 0 : "center" === t.shadowShifts.v || "50%" == t.shadowShifts.v ? "repeat" == t.bgrepeat || "repeat-y" == t.bgrepeat ? t.mDIM.height / 2 - i.height / 2 - Math.ceil(t.mDIM.height / 2 / i.height) * i.height : t.mDIM.height / 2 - i.height / 2 : "bottom" === t.shadowShifts.v ? "repeat" == t.bgrepeat || "repeat-y" == t.bgrepeat ? -(i.height - t.mDIM.height % i.height) : t.mDIM.height - i.height : "repeat" == t.bgrepeat || "repeat-y" == t.bgrepeat ? -(i.height - t.shadowShifts.vperc % i.height) : t.shadowShifts.vperc,
            t.shadowCTX.save(),
            t.shadowCTX.translate(t.shadowShifts.x, t.shadowShifts.y),
            t.shadowCTX.fillRect(0, 0, t.mDIM.width - t.shadowShifts.x, t.mDIM.height - t.shadowShifts.y),
            t.shadowCTX.restore()
        },
        getCanvasGradients: function(e, t) {
            if (0 <= t.bgcolor.indexOf("gradient")) {
                t.gradient = null == t.gradient || _R_is_Editor ? b.getGradients(t.bgcolor) : t.gradient,
                t.shadowGrd = "radialGradient" === t.gradient.type ? t.shadowCTX.createRadialGradient(t.mDIM.width / 2, t.mDIM.height / 2, 0, t.mDIM.width / 2, t.mDIM.height / 2, Math.max(t.mDIM.width / 2, t.mDIM.height / 2)) : b.calcLinearGradient(t.shadowCTX, t.shadowCanvas.width, t.shadowCanvas.height, t.gradient.deg);
                for (var i = 0; i < t.gradient.stops.length; i += 2)
                    t.shadowGrd.addColorStop(t.gradient.stops[i + 1], t.gradient.stops[i]);
                t.shadowCTX.clearRect(0, 0, t.mDIM.width, t.mDIM.height),
                t.shadowCTX.fillStyle = t.shadowGrd
            } else
                t.shadowCTX.clearRect(0, 0, t.mDIM.width, t.mDIM.height),
                t.shadowCTX.fillStyle = t.bgcolor;
            t.shadowCTX.fillRect(0, 0, t.mDIM.width, t.mDIM.height)
        },
        cNS: function(e) {
            for (var t in e.n = document.createElementNS("http://www.w3.org/2000/svg", e.n),
            e.v)
                e.n.setAttributeNS(null, t.replace(/[A-Z]/g, function(e, t, i, a) {
                    return "-" + e.toLowerCase()
                }), e.v[t]);
            for (t in void 0 !== e.c && e.n.setAttribute("class", e.c),
            void 0 !== e.id && (e.n.id = e.id),
            void 0 !== e.t && (e.n.textContent = e.t),
            e.s)
                e.s.hasOwnProperty(t) && (e.n.style[t] = e.s[t]);
            return e.n
        },
        rgbToHex: function(e) {
            return "#" + s(e[0]) + s(e[1]) + s(e[2])
        },
        getSVGGradient: function(e) {
            if (void 0 !== e && -1 != (e = _R_is_Editor ? RSColor.convert(e) : e).indexOf("gradient")) {
                for (var t = b.getGradients(e), i = (void 0 === b.gradSVG && (b.gradSVG = b.cNS({
                    n: "svg",
                    id: "tp_svg_gradients",
                    s: {
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        pointerEvents: "none"
                    }
                }),
                b.gradSVG.setAttribute("viewBox", "0 0 1 1"),
                b.gradSVG.setAttribute("preserveAspectRatio", "none"),
                document.body.appendChild(b.gradSVG),
                b.svgGradients = []),
                !1), a = JSON.stringify(e), r = 0; r < b.svgGradients.length; r++)
                    i || b.svgGradients[r].src == a && (i = !0,
                    e = b.svgGradients[r].url);
                if (!i) {
                    for (var o, s = "radialGradient" === t.type ? 0 : t.deg * (Math.PI / 180), s = "radialGradient" === t.type ? 0 : {
                        x1: Math.round(50 + 50 * Math.sin(s)) + "%",
                        y1: Math.round(50 + 50 * Math.cos(s)) + "%",
                        x2: Math.round(50 + 50 * Math.sin(s + Math.PI)) + "%",
                        y2: Math.round(50 + 50 * Math.cos(s + Math.PI)) + "%"
                    }, n = b.cNS({
                        n: t.type,
                        id: "tp_svg_gradient_" + b.svgGradients.length,
                        v: "radialGradient" === t.type ? void 0 : {
                            gradientUnits: "userSpaceOnUse",
                            x1: s.x1,
                            y1: s.y1,
                            x2: s.x2,
                            y2: s.y2
                        }
                    }), l = 0; l <= t.stops.length / 2; l += 2)
                        o = tpGS.gsap.utils.splitColor(t.stops[l]),
                        o = b.cNS({
                            n: "stop",
                            v: {
                                offset: 100 * t.stops[l + 1] + "%",
                                stopColor: b.rgbToHex(o),
                                stopOpacity: 3 < o.length ? o[3] : 1
                            }
                        }),
                        n.appendChild(o);
                    b.gradSVG.appendChild(n),
                    e = "url(#tp_svg_gradient_" + b.svgGradients.length + ")",
                    b.svgGradients.push({
                        url: e,
                        src: a,
                        g: n
                    })
                }
            }
            return e
        },
        getGradients: function(e) {
            return 0 <= e.indexOf("radial-gradient") ? {
                stops: b.getGradientColorStopPoints(e.split("radial-gradient(ellipse at center, ")[1]),
                type: "radialGradient",
                deg: 0
            } : -1 !== e.indexOf("gradient") ? b.getLinearGradientStops(e) : e
        },
        getLinearGradientStops: function(e) {
            var t, i = e.split("linear-gradient(")[1], i = (1 < (e = (i = _R_is_Editor ? (i = i.split(", ").join(",")).split(",rgba").join(", rgba") : i).split("deg, ")).length ? e[1] : e[0]).split(" "), e = 1 < e.length ? e[0] : 180;
            for (t in i)
                i.hasOwnProperty(t) && 0 <= i[t].indexOf("%") && (i[t] = "" + Math.round(100 * parseFloat(i[t].split("%,")[0].split("%)")[0])) / 1e4);
            return {
                stops: i,
                deg: e,
                type: "linearGradient"
            }
        },
        getGradientColorStopPoints: function(e) {
            for (var t = /rgb([\s\S]*?)%/g, i = [], a = []; (o = t.exec(e)) && i.push(o[0]),
            o; )
                ;
            for (var r = 0; r < i.length; r++) {
                var o = i[r]
                  , e = /rgb([\s\S]*?)\)/.exec(o)
                  , s = /\)([\s\S]*?)%/.exec(o);
                e[0] && (e = e[0]),
                s[1] && (s = s[1]),
                a.push(e),
                a.push(parseFloat(s) / 100)
            }
            return a
        },
        calcLinearGradient: function(e, t, i, a) {
            a = a * Math.PI / 180 + Math.PI / 2;
            for (var r, o, s = t / 2, n = i / 2, l = Math.sqrt(s * s + n * n), d = {
                x1: Math.cos(a) * l + s,
                y1: Math.sin(a) * l + n,
                x2: s,
                y2: n
            }, c = [h({
                x: 0,
                y: 0
            }, a), h({
                x: t,
                y: 0
            }, a), h({
                x: t,
                y: i
            }, a), h({
                x: 0,
                y: i
            }, a)], p = [], g = 0; g < c.length; g++)
                p.push(m(c[g], d));
            return l = (u(s, n, p[0].x, p[0].y) > u(s, n, p[1].x, p[1].y) ? (r = p[0].x,
            p[0]) : (r = p[1].x,
            p[1])).y,
            t = (u(s, n, p[2].x, p[2].y) > u(s, n, p[3].x, p[3].y) ? (o = p[2].x,
            p[2]) : (o = p[3].x,
            p[3])).y,
            Math.round(100 * Math.atan2(n - l, s - r)) / 100 == Math.round(a % (2 * Math.PI) * 100) / 100 && (i = r,
            n = l,
            r = o,
            l = t,
            o = i,
            t = n),
            e.createLinearGradient(Math.round(r), Math.round(l), Math.round(o), Math.round(t))
        },
        transitions: {
            filter: {
                update: function(e, t, i) {
                    void 0 !== e && void 0 !== e.tl && (i = void 0 !== i || void 0 !== e.tl.blur ? " blur(" + (void 0 !== i ? i : 0 + e.tl.blur !== void 0 ? e.tl.blur : 0) + "px)" : "",
                    t.canvas.style.filter = void 0 === e.tl.filter ? i : e.tl.filter + i)
                },
                extendTimeLine: function(e, t, i) {
                    var a;
                    null != t && (a = void 0 !== t.g && "0%" !== t.g && 0 !== t.g ? ("" === a ? "" : " ") + "grayscale(_g_%)" : "",
                    "" !== (a = (a = (a = (a += void 0 !== t.h && "100%" !== t.h && 100 !== t.h ? ("" === a ? "" : " ") + "brightness(_h_%)" : "") + (void 0 !== t.s && "0px" !== t.s && 0 !== t.s ? ("" === a ? "" : " ") + "sepia(_s_%)" : "")) + (void 0 !== t.c && 100 !== t.c ? ("" === a ? "" : " ") + "contrast(_c_%)" : "")) + (void 0 !== t.i && 0 !== t.i ? ("" === a ? "" : " ") + "invert(_i_%)" : "")) && (t.tl = {
                        filter: a.replace("_g_", parseFloat(t.g)).replace("_h_", parseFloat(t.h)).replace("_s_", parseFloat(t.s)).replace("_c_", parseFloat(t.c)).replace("_i_", parseFloat(t.i))
                    }),
                    void 0 !== t.b && "0px" !== t.b && 0 !== t.b && (void 0 === t.tl ? t.tl = {
                        blur: parseFloat(t.b)
                    } : t.tl.blur = parseFloat(t.b)),
                    void 0 !== t.tl) && (e.add(tpGS.gsap.to(t.tl, t.ms / t.sec, void 0 === t.tl.filter ? {
                        blur: 0
                    } : void 0 === t.tl.blur ? {
                        filter: a.replace("_g_", "0").replace("_h_", "100").replace("_s_", "0").replace("_c_", 100).replace("_i_", 0),
                        ease: t.e
                    } : {
                        blur: 0,
                        filter: a.replace("_g_", "0").replace("_h_", "100").replace("_s_", "0").replace("_c_", 100).replace("_i_", 0),
                        ease: t.e
                    }), 0),
                    i.canvasFilter = !0)
                }
            },
            slidingoverlay: {
                getBasic: function() {
                    return b.getBasic({
                        attr: ["x", "y"],
                        in: {
                            m: !0,
                            o: -1,
                            _xy: 20,
                            _gxys: 10,
                            _gxye: -10,
                            zIndex: 20,
                            e: e
                        },
                        out: {
                            m: !0,
                            reversed: !1,
                            _xy: -100,
                            o: 0,
                            zIndex: 10,
                            e: e
                        }
                    })
                },
                updateAnim: function(e, t, i) {
                    var a = void 0 !== t.in.x && 0 !== t.in.x && "0%" !== t.in.x ? "x" : "y"
                      , i = (t.in["g" + a + "s"] = b.SATools.getOffset(t.in[a], t.in._gxys, i, 1) + "%",
                    t.in["g" + a + "e"] = b.SATools.getOffset(t.in[a], t.in._gxye, i, 1) + "%",
                    t.out[a] = b.SATools.getOffset(t.in[a], t.out._xy, i, 1) + "%",
                    t.in[a] = b.SATools.getOffset(t.in[a], t.in._xy, i, 1) + "%",
                    0 <= parseInt(t.in[a]));
                    return t.in.d = "x" == a ? i ? "left" : "right" : i ? "up" : "down",
                    t
                },
                beforeDraw: function(e, t, i, a) {
                    void 0 !== i.d && (i._dxs = "right" === i.d ? 0 + i.mw : "left" === i.d ? 0 - i.mw : 0,
                    i._dys = "down" === i.d ? 0 + i.mh : "up" === i.d ? 0 - i.mh : 0,
                    i._xs = "left" === i.d ? 0 - i.mw : 0,
                    i._ys = "up" === i.d ? 0 - i.mh : 0,
                    i._xe = "right" === i.d ? a.SLOT.OW + i.mw : "left" === i.d ? a.SLOT.OW - i.mw : a.SLOT.OW,
                    i._ye = "down" === i.d ? a.SLOT.OH + i.mh : "up" === i.d ? a.SLOT.OH - i.mh : a.SLOT.OH,
                    t.beginPath(),
                    t.rect("left" === i.d ? Math.max(0, i._xs) : "right" === i.d ? Math.min(0, i._xs) : 0, "up" === i.d ? Math.max(0, i._ys) : "down" === i.d ? Math.min(0, i._ys) : 0, "left" === i.d ? Math.max(a.SLOT.OW, i._xe) : "right" === i.d ? Math.min(a.SLOT.OW, i._xe) : i._xe, "up" === i.d ? Math.max(a.SLOT.OH, i._ye) : "down" === i.d ? Math.min(a.SLOT.OH, i._ye) : i._ye),
                    t.clip())
                },
                afterDraw: function(e, t, i, a, r) {
                    void 0 !== i.d && (t.save(),
                    t.beginPath(),
                    t.rect(Math.max(0, i._dxs), Math.max(0, i._dys), i._xe, i._ye),
                    t.clip(),
                    t.save(),
                    t.transform(r.csx, r.ssx, r.ssy, r.csy, .5 * a.SLOT.OW + i.x + i.sgx, .5 * a.SLOT.OH + i.y + i.sgy),
                    t.drawImage(void 0 !== a.shadowCanvas ? a.shadowCanvas : a.loadobj.img, 0, 0, a.SLOT.OW, a.SLOT.OH, i.sgx - a.SLOT.OW / 2, i.sgy - a.SLOT.OH / 2, a.SLOT.OW, a.SLOT.OH),
                    t.restore(),
                    t.fillStyle = "rgba(0,0,0,0.6)",
                    t.fillRect(i.gx, i.gy, a.SLOT.OW, a.SLOT.OH),
                    t.restore())
                },
                extendTimeLine: function(e, t, i, a, r, o) {
                    "in" !== r.direction || void 0 === a.gxe && void 0 === a.gye || (jQuery.extend(!0, i[0], {
                        d: a.d,
                        gx: void 0 === a.gxs ? 0 : 2 * b.SATools.getOffset(a.gxs, o.width, r.sdir, 0),
                        gy: void 0 === a.gys ? 0 : 2 * b.SATools.getOffset(a.gys, o.height, r.sdir, 0),
                        sgx: void 0 === a.gxs ? 0 : b.SATools.getOffset(a.gxs, o.width, r.sdir, 0),
                        sgy: void 0 === a.gys ? 0 : b.SATools.getOffset(a.gys, o.height, r.sdir, 0),
                        mw: 0 - o.width,
                        mh: 0 - o.height
                    }),
                    t.add(tpGS.gsap.to(i, a.ms / a.sec, {
                        gx: void 0 === a.gxe ? 0 : 2 * b.SATools.getOffset(a.gxe, o.width, r.sdir, 0),
                        gy: void 0 === a.gye ? 0 : 2 * b.SATools.getOffset(a.gye, o.height, r.sdir, 0),
                        sgx: void 0 === a.gxe ? 0 : 2 * b.SATools.getOffset(a.gxe, o.width, r.sdir, 0),
                        sgy: void 0 === a.gye ? 0 : 2 * b.SATools.getOffset(a.gye, o.height, r.sdir, 0),
                        mw: o.width,
                        mh: o.height,
                        ease: a.e
                    }), 0))
                }
            },
            motionFilter: {
                init: function(e, t) {
                    return void 0 !== t && 0 < parseFloat(t) ? (t = parseFloat(t),
                    e.fmExists = !0,
                    e.fmShadow = void 0 === e.fmShadow ? document.createElement("canvas") : e.fmShadow,
                    e.fmCtx = e.fmShadow.getContext("2d"),
                    e.fmShadow.width = e.ctx.canvas.width,
                    e.fmShadow.height = e.ctx.canvas.height,
                    e.fmCtx.globalAlpha = tpGS.gsap.utils.mapRange(100, 0, 40, 0, t) / 100,
                    e.fmCtx.clearRect(0, 0, e.ctx.canvas.width, e.ctx.canvas.height)) : e.fmExists = !1,
                    t
                },
                render: function(e, t) {
                    "partial" === t && (e.fmCtx.globalCompositeOperation = "source-over"),
                    e.fmCtx.drawImage(e.canvas, 0, 0, e.canvas.width, e.canvas.height),
                    e.ctx.clearRect(0, 0, e.canvas.width, e.canvas.height),
                    e.ctx.drawImage(e.fmCtx.canvas, 0, 0, e.canvas.width, e.canvas.height),
                    "partial" === t && (e.fmCtx.globalCompositeOperation = "source-atop"),
                    "partial" !== t && "full" !== t || (e.fmCtx.fillStyle = "rgba(255, 255, 255, 0.1)",
                    e.fmCtx.fillRect(0, 0, e.canvas.width, e.canvas.height))
                },
                clearFull: function(e, t) {
                    e.fmExists && void 0 !== e.fmCtx && (e.ctx.clearRect(0, 0, e.canvas.width, e.canvas.height),
                    e.fmCtx.clearRect(0, 0, e.canvas.width, e.canvas.height),
                    void 0 !== t) && t.render(t.time(), !0, !0)
                },
                complete: function(e) {
                    e.fmShadow && e.fmShadow.remove()
                }
            },
            d3: {
                ticker: function(e, t, i) {
                    var a, r;
                    void 0 !== e.helper && (a = e.smi * ("in" === i ? e.helper.oo : e.helper.o),
                    r = e.sma * ("in" === i ? e.helper.oo : e.helper.o),
                    e.gradient = "vertical" === e.d ? "in" === i ? t.ctx.createLinearGradient(0, 0, 0, t.canvas.height) : t.ctx.createLinearGradient(0, t.canvas.height, 0, 0) : "in" === i ? t.ctx.createLinearGradient(0, 0, t.canvas.width, 0) : t.ctx.createLinearGradient(t.canvas.width, 0, 0, 0),
                    e.gradient.addColorStop(0, "rgba(" + e.sc + "," + a + ")"),
                    e.gradient.addColorStop(e.sl, "rgba(" + e.sc + "," + r + ")"),
                    t.ctx.fillStyle = e.gradient,
                    t.ctx.fillRect(0, 0, t.canvas.width, t.canvas.height),
                    void 0 !== t.cube) && t.cube.ctx && (a = !1 !== (i = void 0 !== e.roomhelper && !1 !== e.roomhelper && (90 - e.roomhelper.r) / 90) ? i : e.smi * e.helper.o,
                    r = !1 !== i ? i : e.sma * e.helper.o,
                    t.cube.ctx.clearRect(0, 0, t.cube.ctx.canvas.width, t.cube.ctx.canvas.height),
                    e.gradientW = !1 !== i ? "vertical" === e.d ? e.t < 0 && 1 === e.sdir || 0 < e.t && -1 === e.sdir ? t.ctx.createRadialGradient(0, t.cube.ctx.canvas.width / 2, 0, 0, 0, 2 * t.cube.ctx.canvas.width) : t.ctx.createRadialGradient(t.cube.ctx.canvas.width, 0, 0, 0, 0, 2 * t.cube.ctx.canvas.width) : 0 < e.t && 1 === e.sdir || e.t < 0 && -1 === e.sdir ? t.ctx.createRadialGradient(t.cube.ctx.canvas.width / 2, t.cube.ctx.canvas.height, 0, t.cube.ctx.canvas.width / 2, t.cube.ctx.canvas.height, t.cube.ctx.canvas.width) : t.ctx.createRadialGradient(t.cube.ctx.canvas.width / 2, .2 * t.cube.ctx.canvas.height, 0, t.cube.ctx.canvas.width / 2, .2 * t.cube.ctx.canvas.height, t.cube.ctx.canvas.width) : "vertical" === e.d ? t.ctx.createLinearGradient(0, 0, 0, t.cube.ctx.canvas.height) : t.ctx.createLinearGradient(0, 0, t.cube.ctx.canvas.width, 0),
                    e.gradientW.addColorStop(0, "rgba(" + e.sc + "," + (!1 !== i ? "a" === e.DIR ? r : 0 : "a" === e.DIR ? 0 : r) + ")"),
                    e.gradientW.addColorStop(1, "rgba(" + e.sc + "," + (!1 !== i ? "a" === e.DIR ? 0 : r : "a" === e.DIR ? r : 0) + ")"),
                    t.cube.ctx.fillStyle = e.gradientW,
                    t.cube.ctx.fillRect(0, 0, t.cube.ctx.canvas.width, t.cube.ctx.canvas.height))
                },
                setWall: function(e, t, i, a, r, o) {
                    return e.TL = tpGS.gsap.timeline(),
                    e.TL.add(tpGS.gsap.to(e.c, .2, {
                        display: "block"
                    }), 0),
                    "rotationX" === i ? (e.ctx.canvas.width = a.w,
                    e.ctx.canvas.height = a.w,
                    e.TL.add(tpGS.gsap.set(e.w, {
                        backgroundColor: r,
                        width: a.w,
                        height: a.w,
                        transformOrigin: "50% 50% -" + a.w / 2 + "px",
                        x: 0,
                        y: 0 < t ? -(a.w - a.h) : 0,
                        rotationX: 0 < t ? -90 : 90,
                        rotationY: 0
                    }), 0)) : (e.ctx.canvas.width = o ? a.w : a.h,
                    e.ctx.canvas.height = a.h,
                    e.TL.add(tpGS.gsap.set(e.w, {
                        backgroundColor: r,
                        width: o ? a.w : a.h,
                        height: a.h,
                        transformOrigin: "50% 50% -" + (o ? a.w : a.h) / 2 + "px",
                        x: t < 0 ? a.w - a.h : 0,
                        y: 0,
                        rotationX: 0,
                        rotationY: 0 < t ? -90 : 90
                    }), 0)),
                    e.TL
                },
                buildCube: function(e) {
                    e.cube = {
                        c: document.createElement("div"),
                        w: document.createElement("canvas")
                    },
                    e.cube.ctx = e.cube.w.getContext("2d"),
                    e.cube.c.className = "rs_fake_cube",
                    e.cube.w.className = "rs_fake_cube_wall",
                    tpGS.gsap.set(e.cube.c, {
                        width: e.mDIM.w,
                        height: e.mDIM.h
                    }),
                    tpGS.gsap.set(e.cube.w, {
                        width: e.mDIM.w,
                        height: e.mDIM.h,
                        backgroundColor: "#ccc"
                    }),
                    e.cube.c.appendChild(e.cube.w),
                    e.sbg.appendChild(e.cube.c)
                },
                cubeTL: function(e, t, i, a) {
                    var r, o, s, n, l, d, c, p, g, u, h, m, v, f, y, w;
                    if ("none" !== t.f && void 0 !== t.f)
                        return i.sbg.style.transformStyle = "preserve-3d",
                        r = tpGS.gsap.timeline(),
                        o = "incube" === t.f ? 1 : -1,
                        s = "incube" === t.f || "cube" === t.f,
                        f = "fly" === t.f ? -30 : 90,
                        n = "turn" !== t.f && !1 !== t.t && (_R_is_Editor || !0 === b[e].firstSlideAnimDone),
                        l = -1 * t.z,
                        d = {},
                        c = {
                            z: n ? 0 : l,
                            ease: "power1.inOut"
                        },
                        p = {
                            ease: t.e
                        },
                        g = [i.canvas],
                        u = s ? "50% 50% " : "20% 20% ",
                        h = "rotationX",
                        m = "rotationY",
                        w = "y",
                        y = "height",
                        v = t.fd,
                        "vertical" !== t.d ? (h = "rotationY",
                        m = "rotationX",
                        w = "x",
                        y = "width",
                        t.DIR = 1 === t.sdir ? "b" : "a") : t.DIR = 1 === t.sdir ? "a" : "b",
                        y = "width" === y ? "w" : "height" === y ? "h" : y,
                        "turn" === t.f ? (f = "vertical" === t.d ? -120 : 120,
                        u = "vertical" === t.d ? 1 === t.sdir ? "in" === a ? "0% 0% 0%" : "0% 100% 0%" : "in" === a ? "0% 100% 0%" : "0% 0% 0%" : 1 === t.sdir ? "in" === a ? "0% 0% 0%" : "100% 0% 0%" : "in" === a ? "100% 0% 0%" : "0% 0% 0%",
                        c.z = 0,
                        p.ease = "out" === a ? "power3.out" : p.ease,
                        v = "out" === a ? v / 2 : v) : u += o * i.mDIM[y] / 2 + "px",
                        p[h] = 0,
                        p[w] = 0,
                        "in" === a ? d[h] = f * t.sdir : p[h] = -f * t.sdir,
                        "fly" === t.f && (f = void 0 === t.fz ? 20 * Math.random() - 10 : parseInt(t.fz),
                        "in" === a ? (d[w] = i.mDIM[y] * (void 0 === t.fdi ? 1.5 : parseFloat(t.fdi)) * t.sdir,
                        d.rotateZ = t.sdir * f,
                        p.rotateZ = 0) : (p[w] = i.mDIM[y] * (void 0 === t.fdo ? 2 : parseFloat(t.fdo)) * t.sdir * -1,
                        p.rotateZ = t.sdir * f * -1)),
                        i.sbg.style.perspective = n ? "2500px" : "1500px",
                        n ? (w = {
                            z: 0,
                            ease: "power1.inOut"
                        },
                        (y = {
                            z: l * ("fly" === t.f ? 1.5 : 3),
                            ease: "power1.inOut"
                        })[m] = -1 * t.t,
                        t.roomhelper = {
                            r: w[m] = 0
                        },
                        r.add(tpGS.gsap.set(_R_is_Editor ? RVS.SBGS[RVS.S.slideId].wrap : i.wrap[0], {
                            perspective: 1200,
                            transformStyle: "preserve-3d",
                            transformOrigin: u
                        }), 0),
                        r.add(tpGS.gsap.to(i.sbg, 3 * t.md, y), 0),
                        r.add(tpGS.gsap.to(i.sbg, 3 * t.md, w), v - t.md),
                        r.add(tpGS.gsap.to(t.roomhelper, 3 * t.md, {
                            r: Math.abs(t.t)
                        }), 0),
                        r.add(tpGS.gsap.to(t.roomhelper, 3 * t.md, {
                            r: 0
                        }), v - t.md),
                        "in" === a && 1 != o && s && (void 0 === i.cube && b.transitions.d3.buildCube(i),
                        r.add(b.transitions.d3.setWall(i.cube, y[m], m, i.mDIM, t.c), 0),
                        g.push(i.cube.c))) : (t.roomhelper = !1,
                        r.add(tpGS.gsap.set(_R_is_Editor ? RVS.SBGS[RVS.S.slideId].wrap : i.wrap[0], {
                            perspective: "none",
                            transformStyle: "none",
                            transformOrigin: "50% 50%"
                        }), 0),
                        !_R_is_Editor && !0 !== b[e].firstSlideAnimDone && s && (void 0 === i.cube && b.transitions.d3.buildCube(i),
                        r.add(b.transitions.d3.setWall(i.cube, d[h], h, i.mDIM, t.c, !0), 0),
                        r.add(tpGS.gsap.fromTo(i.cube.w, 4 * t.md, {
                            opacity: 0
                        }, {
                            opacity: 1
                        }), 0),
                        g.push(i.cube.c))),
                        t.helper = {
                            o: 0,
                            oo: 1
                        },
                        r.add(tpGS.gsap.to(t.helper, v, {
                            o: 1,
                            oo: 0,
                            ease: t.e
                        }), t.md + 0),
                        r.add(tpGS.gsap.set(g, jQuery.extend(!0, {}, d, {
                            force3D: !0,
                            transformOrigin: u
                        })), 0),
                        "turn" !== t.f && r.add(tpGS.gsap.to(g, 3 * t.md, c), 0),
                        r.add(tpGS.gsap.to(g, v, p), t.md + 0),
                        "turn" !== t.f && r.add(tpGS.gsap.to(g, 3 * t.md, {
                            z: 0,
                            ease: "power1.inOut"
                        }), v - t.md),
                        "out" === a && 1 != o && r.add(tpGS.gsap.to(g, 2 * t.md, {
                            opacity: 0
                        }), t.dur - 2 * t.md),
                        r
                }
            }
        },
        animatedCanvasUpdate: function(e, t) {
            t.cDIMS = b.getBGCanvasDetails(e, t),
            t.canvas.style.backgroundColor = "transparent",
            t.canvas.style.opacity = 1,
            t.canvas.width !== t.mDIM.width && (t.canvas.width = t.mDIM.width),
            t.canvas.height !== t.mDIM.height && (t.canvas.height = t.mDIM.height),
            _R_is_Editor || !0 !== b[e].clearModalBG || (t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height),
            b[e].clearModalBG = !1,
            t.sbg.parentNode.style.opacity = 1),
            t.col = Math.min(t.col || 1, t.canvas.width - 10),
            t.row = Math.min(t.row || 1, t.canvas.height - 10),
            t.SLOT = jQuery.extend(!0, {
                s: {},
                c: {}
            }, i(e, t.col, t.row, t.mDIM, "OW", "OH")),
            t.SLOT.DX = 0 - t.SLOT.OW / 2,
            t.SLOT.DY = 0 - t.SLOT.OH / 2,
            t.row = Math.ceil(t.mDIM.height / t.SLOT.OH) || 1,
            void 0 !== t.callFromAnimatedCanvasUpdate && t.callFromAnimatedCanvasUpdate()
        },
        slideAnimFinished: function(e, t, i, a) {
            void 0 !== t && (void 0 !== t.bgvid && 0 < t.bgvid.length && "out" === i.direction && (t.drawVideoCanvasImagesRecall = !1,
            b.stopVideo(t.bgvid, e),
            t.bgvid[0].style.display = "none",
            t.bgvid[0].style.zIndex = 0),
            t.panFake && t.panFake.img && ("out" === i.direction ? t.panFake.img.style.display = "none" : t.panFake.img.style.display = "block"),
            "in" === i.direction && (b.transitions.motionFilter.complete(t),
            t.ctx.canvas.style.filter = "none",
            tpGS.gsap.set(i.slide, {
                zIndex: 20
            }),
            delete t.animateDirection,
            0 < t.bgvid.length) && (t.isHTML5 ? tpGS.gsap.set(t.bgvid[0], {
                zIndex: 30,
                display: "block",
                opacity: 1
            }) : (b.resetVideo(t.bgvid, e),
            tpGS.gsap.delayedCall(.1, function() {
                b.playVideo(t.bgvid, e, !0),
                tpGS.gsap.set(t.bgvid[0], {
                    zIndex: 30,
                    display: "block",
                    opacity: 1
                })
            }))),
            "out" === i.direction ? (tpGS.gsap.set(i.slide, {
                zIndex: 10
            }),
            tpGS.gsap.set(t.canvas, {
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                x: 0,
                y: 0,
                z: 0,
                opacity: 1
            }),
            t.currentState = void 0) : t.currentState = "idle",
            void 0 !== t.cube && (t.cube.c.style.display = "none"),
            "in" === i.direction) && (b.updateSlideBGs(e, t.skeyindex, t),
            void 0 === t.panzoom || _R_is_Editor || b.startPanZoom(b[e].pr_next_bg, e, void 0 !== b[e].panzoomTLs[t.skeyindex] ? b[e].panzoomTLs[t.skeyindex].progress() : 0, t.skeyindex, "play", t.key),
            void 0 !== i.BG) && !0 !== a && i.BG.ctx.clearRect(0, 0, 2 * t.canvas.width, 2 * t.canvas.height)
        },
        animateCore: function(r, o, s, n) {
            var l, d, e, c, p = o.canvas, g = o.ctx, u = 0;
            if (o.col = s.col,
            o.row = s.row,
            _R_is_Editor && o.three) {
                for (o.canvas.style.display = "block"; 0 < o.three.scene.children.length; )
                    o.three.scene.remove(o.three.scene.children[0]);
                o.three.canvas.parentNode.removeChild(o.three.canvas),
                o.three = void 0
            }
            b.animatedCanvasUpdate(r, o),
            s.row = o.row,
            o.animateDirection = n.direction,
            n.delay = void 0 === n.delay ? 0 : n.delay,
            e = s.col * s.row,
            c = Array(e),
            void 0 === o.help_canvas && "out" === n.direction && void 0 !== n.bgColor && (o.help_canvas = document.createElement("canvas"),
            o.help_ctx = o.help_canvas.getContext("2d"),
            o.help_canvas.style.backgroundColor = "transparent"),
            "out" === n.direction && void 0 !== n.bgColor && (o.help_canvas.width = o.mDIM.width,
            o.help_canvas.height = o.mDIM.height,
            o.help_ctx.fillStyle = n.bgColor,
            o.help_ctx.fillRect(0, 0, o.mDIM.width, o.mDIM.height)),
            s.mo = b.transitions.motionFilter.init(o, s.mo),
            s.dur = s.ms / s.sec,
            void 0 !== n.d3 && (n.d3.dur = s.dur,
            n.d3.fd = .7 * s.dur,
            n.d3.md = .15 * s.dur,
            n.d3.sdir = n.sdir),
            o.SLOT.c = {
                ws: 0,
                hs: 0,
                wd: 0,
                hd: 0
            },
            0 < s.mo && _R_is_Editor && g.clearRect(0, 0, p.width, p.height);
            var t = tpGS.gsap.timeline({
                onUpdate: function() {
                    if ((u = 0) < s.mo ? b.transitions.motionFilter.render(o, s.moo) : g.clearRect(0, 0, p.width, p.height),
                    o.help_canvas && "out" === n.direction && g.drawImage(o.help_canvas, 0, 0),
                    (n.filter && n.filter.u || !_R_is_Editor) && b.transitions.filter.update(n.filter, g, o.canvasFilterBlur),
                    _R_is_Editor && 0 !== s.zIndex && void 0 !== s.zIndex && tpGS.gsap.set(n.slide, {
                        zIndex: s.zIndex
                    }),
                    void 0 !== o.shadowCanvas)
                        for (l = 0; l < s.col; l++)
                            for (o.SLOT.SX = o.SLOT.OW * l,
                            o.SLOT.tw = o.SLOT.OW * (l + .5),
                            o.SLOT.c.wd = o.mDIM.width - (o.SLOT.tw + o.SLOT.DX + o.SLOT.OW),
                            o.SLOT.c.wd = o.SLOT.c.wd < 0 ? o.SLOT.c.wd : 0,
                            o.SLOT.DW = o.SLOT.SW = o.SLOT.OW + o.SLOT.c.wd,
                            d = 0; d < s.row; d++) {
                                g.save();
                                var e = -Math.PI / 180 * c[u].r
                                  , t = 0 !== s.r ? Math.cos(e) * c[u].sx : c[u].sx
                                  , i = 0 !== s.r ? Math.cos(e) * c[u].sy : c[u].sy
                                  , a = 0 !== s.r ? Math.sin(e) * c[u].sx : 0
                                  , e = 0 !== s.r ? Math.sin(e) * -c[u].sy : 0;
                                o.SLOT.SY = o.SLOT.OH * d,
                                o.SLOT.th = o.SLOT.OH * (d + .5),
                                b.transitions[n.effect] && b.transitions[n.effect].beforeDraw && b.transitions[n.effect].beforeDraw(r, g, c[u], o),
                                s.m && (g.beginPath(),
                                g.rect(o.SLOT.OW * l, o.SLOT.OH * d, o.SLOT.OW, o.SLOT.OH),
                                g.clip()),
                                g.transform(t, a, e, i, o.SLOT.tw + c[u].x, o.SLOT.th + c[u].y),
                                g.globalAlpha = Math.max(0, c[u].o),
                                o.SLOT.c.hd = o.mDIM.height - (o.SLOT.th + o.SLOT.DY + o.SLOT.OH),
                                o.SLOT.c.hd = o.SLOT.c.hd < 0 ? o.SLOT.c.hd : 0,
                                o.SLOT.DH = o.SLOT.SH = o.SLOT.OH + o.SLOT.c.hd,
                                1 < o.SLOT.SW && 1 < o.SLOT.SH && g.drawImage(o.shadowCanvas, o.SLOT.SX, o.SLOT.SY, o.SLOT.SW, o.SLOT.SH, o.SLOT.DX, o.SLOT.DY, o.SLOT.DW, o.SLOT.DH),
                                g.restore(),
                                b.transitions[n.effect] && b.transitions[n.effect].afterDraw && b.transitions[n.effect].afterDraw(r, g, c[u], o, {
                                    csx: t,
                                    csy: i,
                                    ssx: a,
                                    ssy: e
                                }),
                                u++
                            }
                    void 0 !== n.d3 && n.d3.su && b.transitions.d3.ticker(n.d3, o, n.direction),
                    o.currentState = "animating"
                },
                onComplete: function() {
                    b.slideAnimFinished(r, o, n)
                }
            });
            if (s.col * s.row < 2 && (s.f = "start"),
            0 !== s.zIndex && void 0 !== s.zIndex && t.add(tpGS.gsap.set(n.slide, {
                zIndex: parseInt(s.zIndex, 0)
            }), 0),
            s.m = "false" != s.m && !1 !== s.m,
            "in" === n.direction) {
                for (l = 0; l < e; l++)
                    c[l] = {
                        x: b.SATools.getOffset(s.x, s.m ? o.SLOT.OW : o.mDIM.width, n.sdir, l),
                        y: b.SATools.getOffset(s.y, s.m ? o.SLOT.OH : o.mDIM.height, n.sdir, l),
                        o: b.SATools.getSpecialValue(s.o, l, n.sdir),
                        sx: b.SATools.getSpecialValue(s.sx, l, n.sdir),
                        sy: b.SATools.getSpecialValue(s.sy, l, n.sdir),
                        r: 0 !== s.r ? b.SATools.getSpecialValue(s.r, l, n.sdir) : 0
                    };
                t.add(tpGS.gsap.to(c, s.dur, {
                    o: 1,
                    sx: 1,
                    sy: 1,
                    r: 0,
                    x: 0,
                    y: 0,
                    ease: s.e,
                    stagger: {
                        amount: "nodelay" === s.f ? 0 : s.ms / s.stasec,
                        grid: [s.col, s.row],
                        from: "nodelay" === s.f ? "start" : s.f
                    }
                }), n.delay),
                void 0 !== n.d3 && t.add(b.transitions.d3.cubeTL(r, n.d3, o, "in"), 0),
                b.transitions.filter.extendTimeLine(t, n.filter, o)
            } else {
                for (l = 0; l < e; l++)
                    c[l] = {
                        x: 0,
                        y: 0,
                        o: 1,
                        sx: 1,
                        sy: 1,
                        r: 0
                    };
                t.add(tpGS.gsap.to(c, s.dur, {
                    o: function(e) {
                        return b.SATools.getSpecialValue(s.o, e, n.sdir)
                    },
                    sx: function(e) {
                        return b.SATools.getSpecialValue(s.sx, e, n.sdir)
                    },
                    sy: function(e) {
                        return b.SATools.getSpecialValue(s.sy, e, n.sdir)
                    },
                    r: 0 !== s.r && void 0 !== s.r ? function(e) {
                        return b.SATools.getSpecialValue(s.r, e, n.sdir)
                    }
                    : 0,
                    x: function(e) {
                        return b.SATools.getOffset(s.x, s.m ? o.SLOT.OW : o.mDIM.width, n.sdir, e) * (s.reversed ? -1 : 1)
                    },
                    y: function(e) {
                        return b.SATools.getOffset(s.y, s.m ? o.SLOT.OH : o.mDIM.height, n.sdir, e) * (s.reversed ? -1 : 1)
                    },
                    ease: s.e,
                    stagger: {
                        amount: "nodelay" === s.f ? 0 : s.ms / s.stasec,
                        grid: [s.col, s.row],
                        from: "nodelay" === s.f ? "start" : s.f
                    }
                }), n.delay + (void 0 !== s.outdelay ? s.outdelay : 0)),
                void 0 !== n.d3 && t.add(b.transitions.d3.cubeTL(r, n.d3, o, "out"), 0)
            }
            b.transitions[n.effect] && b.transitions[n.effect].extendTimeLine && b.transitions[n.effect].extendTimeLine(r, t, c, s, n, o.mDIM),
            _R_is_Editor ? RVS.TL[RVS.S.slideId].slide.add(t, 0) : b[r].mtl.add(t, n.delay)
        }
    }),
    function(e, t) {
        return void 0 !== t && b.isNumeric(t) ? parseFloat(t, 0) : null == t || "default" === t || "d" === t ? e : t
    }
    )
      , i = function(e, t, i, a, r, o) {
        var s = {};
        return s[r] = Math.ceil(a.width / t),
        s[o] = (_R_is_Editor,
        Math.ceil(a.height / i)),
        s
    }
      , l = function(e) {
        return null == e || 0 === e || NaN === e ? 1 : e
    }
      , a = function(e, t) {
        _R_is_Editor || (b[e].duringslidechange = !0);
        var i, a = _R_is_Editor ? -1 : "arrow" != b[e].sc_indicator || void 0 === b[e].sc_indicator_dir ? b[e].sdir : b[e].sc_indicator_dir, r = !!_R_is_Editor || void 0 !== b[e].pr_next_bg && 0 < b[e].pr_next_bg.length && void 0 !== b[e].pr_next_bg[0], o = !!_R_is_Editor || void 0 !== b[e].pr_active_bg && 0 < b[e].pr_active_bg.length && void 0 !== b[e].pr_active_bg[0], r = _R_is_Editor ? RVS.SBGS[RVS.S.slideId].n : r ? b[e].sbgs[b[e].pr_next_bg[0].dataset.key] : void 0, s = _R_is_Editor ? RVS.SBGS[RVS.S.slideId].c : o ? b[e].sbgs[b[e].pr_active_bg[0].dataset.key] : void 0, a = 1 === a ? -1 : 1;
        _R_is_Editor || (delete b[e].sc_indicator,
        delete b[e].sc_indicator_dir),
        i = jQuery.extend(!0, {}, function(e, t, i) {
            var a, r, o = (void 0 !== b.transitions[t.anim.e] && void 0 !== b.transitions[t.anim.e].getBasic ? b.transitions[t.anim.e] : b).getBasic();
            o.out = null == o.out ? {} : o.out,
            o.out.reversed = void 0 === t.out && (void 0 === o.out.reversed || o.out.reversed),
            void 0 !== t.iw && parseInt(t.iw, 0),
            void 0 !== t.ow && parseInt(t.ow, 0);
            for (r in o.attr)
                a = o.attr[r],
                o.in[a] = n(o.in[a], t.in[a]),
                o.out[a] = o.out.reversed ? o.in[a] : void 0 === t.out ? o.out[a] : n(o.out[a], t.out[a]);
            return o.filter = void 0 !== t.filter ? jQuery.extend(!0, t.filter, t.filter) : o.filter,
            (o = b.transitions[t.anim.e] && b.transitions[t.anim.e].updateAnim ? b.transitions[t.anim.e].updateAnim(e, o, i) : o).e = t.anim.e,
            void 0 !== o.in && (o.in.col = "random" === o.in.col ? tpGS.gsap.utils.random(1, 10, 1) : l(o.in.col),
            o.in.row = "random" === o.in.row ? tpGS.gsap.utils.random(1, 10, 1) : l(o.in.row)),
            void 0 !== o.out && (o.out.col = "random" === o.out.col ? tpGS.gsap.utils.random(1, 10, 1) : l(o.out.col),
            o.out.row = "random" === o.out.row ? tpGS.gsap.utils.random(1, 10, 1) : l(o.out.row)),
            o
        }(e, t, a)),
        void 0 !== r.random && void 0 !== b.SLTR && void 0 !== s && (delete s.help_canvas,
        delete s.help_ctx),
        i.ms = n(void 0, void 0 === t.anim.ms ? 1e3 : t.anim.ms),
        i.f = n(void 0, t.anim.f),
        i.p = n(void 0, t.anim.p),
        i.d = n(void 0, t.anim.d),
        i.o = t.anim.o,
        void 0 !== t.d3 && (t.d3.t = void 0 !== t.d3.t && 0 !== t.d3.t && t.d3.t,
        t.d3.su = "true" == t.d3.su || 1 == t.d3.su,
        t.d3.su && (t.d3.smi = void 0 === t.d3.smi ? 0 : parseFloat(t.d3.smi),
        t.d3.sl = void 0 === t.d3.sl ? 1 : parseFloat(t.d3.sl),
        t.d3.sma = void 0 === t.d3.sma ? .5 : parseFloat(t.d3.sma),
        t.d3.sc = void 0 === t.d3.sc ? "0,0,0" : tpGS.gsap.utils.splitColor(t.d3.sc).join(",")),
        i.p = "none",
        void 0 !== i.in.row) && void 0 !== i.in.col && 200 < i.in.row * i.in.col && (i.filter = void 0),
        i.in.sec = void 0 === i.in.sec ? 1e3 : i.in.sec,
        i.in.stasec = void 0 === i.in.stasec ? void 0 === i.d ? 1500 : 100 * i.d : i.in.stasec,
        i.in.ms = "default" === i.ms || "d" === i.ms ? i.in.ms : "random" === i.ms ? Math.round(1e3 * Math.random() + 300) : null != i.ms ? parseInt(i.ms, 0) : i.in.ms,
        i.out.ms = i.in.ms,
        void 0 !== i.filter && (i.filter.ms = i.in.ms,
        i.filter.sec = i.in.sec,
        i.filter.e = (void 0 === i.filter.e || "default" === i.filter.e ? i.in : i.filter).e),
        i.in.f = (void 0 === i.f || "default" === i.f || "d" === i.f ? i.in : i).f,
        i.in.f = "slidebased" === i.in.f ? 1 == a ? "start" : "end" : "oppslidebased" === i.in.f ? 1 == a ? "end" : "start" : i.in.f,
        i.out.f = i.in.f,
        i.out = jQuery.extend(!0, {}, i.in, i.out),
        i.in.eng = i.out.eng = t.anim.eng,
        void 0 !== i.out.eng && null == b[i.out.eng] && (i.out.o = 0,
        i.in.o = 0,
        i.in.ms = i.out.ms = 1e3,
        i.in.eng = i.out.eng = "animateCore"),
        void 0 !== i.p && "none" !== i.p && (i.in.bg = "dark" === i.p ? "#000" : "light" === i.p ? "#fff" : "transparent",
        i.out.delay = "none" !== i.p ? function(e, t) {
            return e / 2.5
        }
        : 0,
        1 === i.out.o) && 0 === i.out.x && 0 === i.out.y && (i.out.o = 0),
        "forceinout" === i.o ? (i.in.zIndex = 20,
        i.out.zIndex = 10) : "outin" !== i.o && (1 !== i.in.o || 0 !== i.in.x || 0 !== i.in.y || void 0 === t.out || 1 === i.out.o && 0 === i.out.x && 0 === i.out.y) || (i.in.zIndex = 10,
        i.out.zIndex = 20),
        0 < r.bgvid.length && (i.in = c(e, i.in, r, "in")),
        o && void 0 !== s.bgvid && 0 < s.bgvid.length && (i.out = c(e, i.out, s, "out")),
        void 0 !== i.out && (i.out.simplify || i.in.simplify) && (i.out = d(i.out)),
        i.in.simplify && (i.in = d(i.in)),
        _R_is_Editor || requestAnimationFrame(function() {
            b.generalObserver(b.ISM, !0)
        }),
        i.in.eng = void 0 === i.in.eng ? "animateCore" : i.in.eng,
        i.out.eng = void 0 === i.out.eng ? "animateCore" : i.out.eng,
        o && !0 !== i.out.skip && b[i.out.eng](e, s, i.out, {
            effect: i.e,
            slide: _R_is_Editor ? RVS.SBGS[RVS.S.slideId].c.sbg : b[e].pr_active_slide,
            direction: "out",
            delay: 0,
            bgColor: i.in.bg,
            sdir: a,
            filter: void 0,
            d3: t.d3,
            addOns: _R_is_Editor ? t.addOns : void 0
        }),
        !0 !== i.in.skip && b[i.in.eng](e, r, i.in, {
            effect: i.e,
            slide: _R_is_Editor ? RVS.SBGS[RVS.S.slideId].n.sbg : b[e].pr_next_slide,
            direction: "in",
            delay: o ? "function" == typeof i.out.delay ? i.out.delay(i.in.ms / 1e3, i.out.row * i.out.col) : i.out.delay : i.in.delay,
            BG: s,
            outslide: _R_is_Editor ? RVS.SBGS[RVS.S.slideId].c.sbg : b[e].pr_active_slide,
            sdir: a,
            filter: i.filter,
            d3: t.d3,
            addOns: _R_is_Editor ? t.addOns : void 0
        })
    }
      , r = function(e, t, i) {
        var a = e.height / e.width
          , a = (i.ratio = i.conth / i.contw,
        i.ratio < a && "contain" === t.bgfit || i.ratio > a && "cover" === t.bgfit ? i.height = e.width * i.ratio : i.ratio > a && "contain" === t.bgfit || i.ratio < a && "cover" === t.bgfit ? i.width = e.width * a / i.ratio : i.ratio !== a || "contain" !== t.bgfit && "cover" !== t.bgfit ? (1 === (a = t.bgfit.split(" ")).length && (a[1] = a[0]),
        i.width = "auto" === a[0] ? i.contw : e.width * (parseInt(a[0], 0) / 100),
        i.height = "auto" === a[1] ? i.conth : i.width * i.ratio,
        t.usepattern = !0) : i.width = e.width,
        a = e,
        e = i,
        1 === (t = (t = t.bgposition).split(" ")).length && (t[1] = t[0]),
        {
            x: "center" === t[0] || "50%" === t[0] ? (a.width - e.width) / 2 : "left" === t[0] ? 0 : "right" === t[0] ? a.width - e.width : b.isNumeric(t[0]) ? 0 : 0 <= t[0].indexOf("%") ? parseInt(t[0], 0) / 100 * a.width - parseInt(t[0], 0) / 100 * e.width : parseInt(t[0], 0),
            y: "center" === t[1] || "50%" === t[1] ? (a.height - e.height) / 2 : "top" === t[1] ? 0 : "bottom" === t[1] ? a.height - e.height : b.isNumeric(t[1]) ? 0 : 0 <= t[1].indexOf("%") ? parseInt(t[1], 0) / 100 * a.height - parseInt(t[1], 0) / 100 * e.height : parseInt(t[1], 0)
        });
        return i.x = a.x,
        i.y = a.y,
        i
    }
      , d = function(e) {
        return e.o = 0,
        e.r = 0,
        e.row = 1,
        e.col = 1,
        e.x = 0,
        e.y = 0,
        e.sx = 1,
        e.sy = 1,
        e
    }
      , o = function(e) {
        return e = "false" !== e && !1 !== e && "off" !== e && void 0 !== e && 0 !== e && -1 !== e
    }
      , s = function(e) {
        e = e.toString(16);
        return 1 == e.length ? "0" + e : e
    }
      , c = function(e, t, i, a) {
        return t.skip = !1,
        "in" === a ? i.isHTML5 ? (i.bgvid[0].style.display = "none",
        b.resetVideo(i.bgvid, e),
        i.animateDirection = "in",
        i.currentState = "animating",
        i.drawVideoCanvasImagesRecall = !0,
        b.updateVideoFrames(e, i, !0),
        b.playVideo(i.bgvid, e)) : (b[e].videos[i.bgvid[0].id].pauseCalled = !1,
        t.waitToSlideTrans = b[e].videos[i.bgvid[0].id].waitToSlideTrans,
        !0 !== i.poster ? (b.resetVideo(i.bgvid, e),
        !(b[e].videos[i.bgvid[0].id].prePlayForaWhile = !1) !== t.waitToSlideTrans && b.playVideo(i.bgvid, e, !0),
        tpGS.gsap.fromTo(i.bgvid, t.ms / t.sec, {
            zIndex: 30,
            display: "block",
            opacity: 0
        }, {
            opacity: 1,
            zIndex: 30,
            display: "block"
        }),
        i.loadobj.bgColor = !0,
        i.bgcolor = "#000",
        t.simplify = !0) : (b[e].videos[i.bgvid[0].id].prePlayForaWhile = !1,
        b.resetVideo(i.bgvid, e),
        b.playVideo(i.bgvid, e),
        i.bgvid[0].style.display = "none",
        i.bgvid[0].style.zIndex = 0,
        i.bgvid[0].style.opacity = 0)) : "out" === a && (i.isHTML5 ? (i.currentState = "animating",
        i.drawVideoCanvasImagesRecall = !0,
        b.updateVideoFrames(e, i, !0),
        window.requestAnimationFrame(function() {
            tpGS.gsap.to(i.bgvid, .1, {
                zIndex: 0,
                display: "none"
            })
        })) : (b.stopVideo(i.bgvid, e, !0),
        !0 !== i.poster && (i.loadobj.bgColor = !0,
        i.bgcolor = "#000"))),
        t
    }
      , u = function(e, t, i, a) {
        return Math.sqrt(Math.pow(e - i, 2) + Math.pow(t - a, 2))
    }
      , h = function(e, t) {
        t += Math.PI / 2;
        return {
            x1: e.x,
            y1: e.y,
            x2: e.x + 100 * Math.cos(t),
            y2: e.y + 100 * Math.sin(t)
        }
    }
      , m = function(e, t) {
        var i = e.y2 - e.y1
          , a = e.x1 - e.x2
          , e = i * e.x1 + a * e.y1
          , r = t.y2 - t.y1
          , o = t.x1 - t.x2
          , t = r * t.x1 + o * t.y1
          , s = i * o - r * a;
        return 0 != s && {
            x: Math.round((o * e - a * t) / s * 100) / 100,
            y: Math.round((i * t - r * e) / s * 100) / 100
        }
    };
    window.RS_MODULES = window.RS_MODULES || {},
    window.RS_MODULES.slideanims = {
        loaded: !0,
        version: "6.6.0"
    },
    window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal()
}(jQuery),
!function() {
    "use strict";
    jQuery.fn.revolution = jQuery.fn.revolution || {};
    var h = jQuery.fn.revolution;
    function n(e) {
        return null == e ? -1 : !h.isNumeric(e) && 1 < e.split(":").length ? 60 * parseInt(e.split(":")[0], 0) + parseInt(e.split(":")[1], 0) : e
    }
    jQuery.extend(!0, h, {
        preLoadAudio: function(a, r) {
            h[r].videos = void 0 === h[r].videos ? {} : h[r].videos,
            a.find(".rs-layer-audio").each(function() {
                var e = jQuery(this)
                  , t = h[r].videos[e[0].id] = void 0 === h[r].videos[e[0].id] ? u(e.data(), "audio", h.gA(a[0], "key")) : h[r].videos[e[0].id]
                  , i = {};
                0 === e.find("audio").length && (i.src = null != t.mp4 ? t.mp4 : "",
                i.pre = t.pload || "",
                this.id = void 0 === this.id || "" === this.id ? e.attr("audio-layer-" + Math.round(199999 * Math.random())) : this.id,
                i.id = this.id,
                void 0 === h[r].audioqueue && (h[r].audioqueue = []),
                h[r].audioqueue.push(i),
                h.manageVideoLayer(e, r, h.gA(a[0], "key"), !0))
            })
        },
        preLoadAudioDone: function(e, t, i) {
            var a = h[t].videos[e[0].id];
            h[t].audioqueue && 0 < h[t].audioqueue.length && jQuery.each(h[t].audioqueue, function(e, t) {
                a.mp4 !== t.src || t.pre !== i && "auto" !== t.pre || (t.status = "loaded")
            })
        },
        checkfullscreenEnabled: function(e) {
            var t;
            return void 0 !== window.fullScreen ? window.fullScreen : void 0 !== document.fullscreen ? document.fullscreen : void 0 !== document.mozFullScreen ? document.mozFullScreen : void 0 !== document.webkitIsFullScreen ? document.webkitIsFullScreen : (t = h.isWebkit() && /Apple Computer/.test(navigator.vendor) ? 42 : 5,
            screen.width == h.winW && Math.abs(screen.height - h.getWinH(e)) < t)
        },
        showVideo: function(e) {
            tpGS.gsap.to(e, .3, {
                opacity: 1,
                display: "block",
                ease: "power3.inOut"
            })
        },
        resetVideo: function(e, t, i) {
            if ("updateAndResize" !== i) {
                var a = h[t].videos[e[0].id];
                if ("resetVideo" !== a.cRS)
                    switch (a.cRS = "resetVideo",
                    a.type) {
                    case "youtube":
                        a.rwd && null != a.player && void 0 !== a.player.seekTo && (a.player.seekTo(-1 == a.ssec ? 0 : a.ssec),
                        a.player.pauseVideo()),
                        a.bgvideo || "preset" === i || 0 != a.jsposter.length || h.showVideo(e.find("iframe"));
                        break;
                    case "vimeo":
                        void 0 !== a.vimeoplayer && a.rwd && (0 !== a.ssec && -1 !== a.ssec || a.bgvideo || 0 < a.jsposter.length) && (a.vimeoplayer.setCurrentTime(-1 == a.ssec ? 0 : a.ssec),
                        a.vimeoplayer.pause()),
                        0 != a.jsposter.length || a.bgvideo || "preset" === i || h.showVideo(e.find("iframe"));
                        break;
                    case "html5":
                        if (h.ISM && a.notonmobile)
                            return !1;
                        a.bgvideo || h.showVideo(a.jvideo),
                        a.rwd && "playing" !== a.cSS && !isNaN(a.video.duration) && (a.justReseted = !0,
                        a.video.currentTime = -1 == a.ssec ? 0 : a.ssec),
                        "mute" != a.volume && !h.lastToggleState(e.videomutetoggledby) && !0 !== h[t].globalmute || (a.video.muted = !0)
                    }
            }
        },
        Mute: function(e, t, i) {
            var a = !1
              , r = h[t].videos[e[0].id];
            switch (r.type) {
            case "youtube":
                r.player && (!0 === i && r.player.mute(),
                !1 === i && y(r, parseInt(r.volcache, 0)),
                a = r.player.isMuted());
                break;
            case "vimeo":
                r.volcachecheck || (r.volcache = 1 < r.volcache ? r.volcache / 100 : r.volcache,
                r.volcachecheck = !0),
                r.volume = !0 === i ? "mute" : !1 === i ? r.volcache : r.volume,
                void 0 !== i && null != r.vimeoplayer && o(r, !0 === i ? 0 : r.volcache),
                a = "mute" == r.volume || 0 === r.volume;
                break;
            case "html5":
                r.volcachecheck || (r.volcache = 1 < r.volcache ? r.volcache / 100 : r.volcache,
                r.volcachecheck = !0),
                r.video.volume = r.volcache,
                void 0 !== i && r.video && (r.video.muted = i),
                a = void 0 !== r.video ? r.video.muted : a
            }
            if (void 0 === i)
                return a
        },
        stopVideo: function(e, t, i) {
            if (void 0 !== h[t] && void 0 !== h[t]) {
                var a = h[t].videos[e[0].id];
                if (void 0 !== a && ("stopVideo" !== a.cRS || "paused" !== a.cSS))
                    switch (a.cRS = "stopVideo",
                    h[t].leaveViewPortBasedStop || (h[t].lastplayedvideos = []),
                    h[t].leaveViewPortBasedStop = !1,
                    a.type) {
                    case "youtube":
                        void 0 !== a.player && 2 !== a.player.getPlayerState() && 5 !== a.player.getPlayerState() && (a.player.pauseVideo(),
                        void 0 !== i) && w(t, a, "hide");
                        break;
                    case "vimeo":
                        void 0 !== a.vimeoplayer && (a.vimeoplayer.pause(),
                        void 0 !== i) && w(t, a, "hide");
                        break;
                    case "html5":
                        a.video && (a.video.pause(),
                        h.ISM) && k(a, 1)
                    }
            }
        },
        playVideo: function(e, t, i) {
            var a = h[t].videos[e[0].id];
            if (clearTimeout(a.videoplaywait),
            "playVideo" !== a.cRS || "playing" !== a.cSS)
                switch (a.cRS = "playVideo",
                a.type) {
                case "youtube":
                    0 == e.find("iframe").length ? (e.append(a.videomarkup),
                    b(e, t, !0)) : void 0 !== a.player && null != a.player.playVideo ? (r = a.player.getCurrentTime(),
                    a.nseTriggered && (a.nseTriggered = !(r = -1)),
                    -1 != a.ssec && a.ssec > r && a.player.seekTo(a.ssec),
                    p(a)) : a.videoplaywait = setTimeout(function() {
                        h.playVideo(e, t)
                    }, 50);
                    break;
                case "vimeo":
                    0 == e.find("iframe").length ? (delete a.vimeoplayer,
                    e.append(a.videomarkup),
                    b(e, t, !0)) : e.hasClass("rs-apiready") && (a.vimeoplayer = null == a.vimeoplayer ? new Vimeo.Player(e.find("iframe").attr("id")) : a.vimeoplayer,
                    a.vimeoplayer.getPaused()) ? (r = void 0 === a.currenttime ? 0 : a.currenttime,
                    a.nseTriggered && (a.nseTriggered = !(r = -1)),
                    -1 != a.ssec && a.ssec > r && a.vimeoplayer.setCurrentTime(a.ssec),
                    "mute" != a.volume && 0 !== a.volume && !h.lastToggleState(e.data("videomutetoggledby")) && !0 !== h[t].globalmute || (a.volumetoken = !0,
                    a.vimeoplayer.setMuted(!0)),
                    c(a)) : a.videoplaywait = setTimeout(function() {
                        h.playVideo(e, t)
                    }, 50);
                    break;
                case "html5":
                    if (a.metaloaded) {
                        if (("" + a.video.duration == "NaN" || a.video.readyState < 4) && !i)
                            return a.loadRequested || (a.video.load(),
                            a.loadRequested = !0),
                            void setTimeout(function() {
                                h.playVideo(e, t)
                            }, 50);
                        var r = a.video.currentTime;
                        a.nseTriggered && (a.nseTriggered = !(r = -1)),
                        -1 != a.ssec && a.ssec > r && a.ssec < a.video.duration && (a.video.currentTime = a.ssec),
                        s(a, void 0, t)
                    } else
                        d(a.video, "loadedmetadata", void h.playVideo(e, t))
                }
        },
        isVideoPlaying: function(i, e) {
            var a = !1;
            return null != h[e].playingvideos && jQuery.each(h[e].playingvideos, function(e, t) {
                i.attr("id") == t.attr("id") && (a = !0)
            }),
            a
        },
        removeMediaFromList: function(e, t) {
            x(e, t)
        },
        prepareCoveredVideo: function(e) {
            clearTimeout(h[e].resizePrepareCoverVideolistener);
            var t = "carousel" === h[e].sliderType ? h[e].carousel.justify ? void 0 === h[e].carousel.slide_widths ? void 0 : h[e].carousel.slide_widths[h[e].carousel.focused] : h[e].carousel.slide_width : h[e].canv.width
              , i = "carousel" === h[e].sliderType ? h[e].carousel.slide_height : h[e].canv.height;
            if (0 === t || 0 === i || void 0 === t || void 0 === i)
                h[e].resizePrepareCoverVideolistener = setTimeout(function() {
                    h.prepareCoveredVideo(e)
                }, 100);
            else
                for (var a in h[e].videos) {
                    var r, o, s, a = h[e].videos[a];
                    void 0 !== a.jvideo && (a.bgvideo || a.jvideo.parent().hasClass("rs-fsv") || h.closestNode(a.video, "RS-LAYER") && h.closestNode(a.video, "RS-LAYER").classList.contains("rs-fsv")) && ("html5" === a.type && void 0 !== a.jvideo && tpGS.gsap.set(a.jvideo, {
                        width: t
                    }),
                    void 0 !== h[e].activeRSSlide && a.slideid !== h.gA(h[e].slides[h[e].activeRSSlide], "key") && void 0 !== h[e].pr_next_slide && a.slideid !== h.gA(h[e].pr_next_slide[0], "key") || (a.vd = 1 < a.ratio.split(":").length ? a.ratio.split(":")[0] / a.ratio.split(":")[1] : 1,
                    r = a.vd * (s = t / i) * 100,
                    o = a.vd / s * 100,
                    s = "Edge" === h.get_browser() || "IE" === h.get_browser() ? s > a.vd ? {
                        minWidth: "100%",
                        height: r + "%",
                        x: "-50%",
                        y: "-50%",
                        top: "50%",
                        left: "50%",
                        position: "absolute"
                    } : {
                        minHeight: "100%",
                        width: o + "%",
                        x: "-50%",
                        y: "-50%",
                        top: "50%",
                        left: "50%",
                        position: "absolute"
                    } : (a.bgvideo && void 0 !== a.vimeoid && "carousel" == h[e].sliderType && (o = r = 100),
                    s > a.vd ? {
                        height: (a.fitCover ? 100 : r) + "%",
                        width: "100%",
                        top: a.fitCover ? 0 : -(r - 100) / 2 + "%",
                        left: "0px",
                        position: "absolute"
                    } : {
                        width: (a.fitCover ? 100 : o) + "%",
                        height: "100%",
                        left: a.fitCover ? 0 : -(o - 100) / 2 + "%",
                        top: "0px",
                        position: "absolute"
                    }),
                    void 0 === a.vimeoid && void 0 === a.ytid || (s.maxWidth = "none",
                    s.maxHeight = "none"),
                    tpGS.gsap.set(a.jvideo, s)))
                }
        },
        checkVideoApis: function(e, t) {
            var i, a, r;
            location.protocol;
            h[t].youtubeapineeded || (i = e.find("iframe"),
            (null != e.data("ytid") || 0 < i.length && i.attr("src") && 0 < i.attr("src").toLowerCase().indexOf("youtube")) && (h[t].youtubeapineeded = !0),
            h[t].youtubeapineeded && !window.rs_addedyt && (h[t].youtubestarttime = Date.now(),
            window.rs_addedyt = !0,
            i = document.createElement("script"),
            a = h.getByTag(document, "script")[0],
            r = !0,
            i.src = "https://www.youtube.com/iframe_api",
            jQuery("head").find("*").each(function() {
                "https://www.youtube.com/iframe_api" == jQuery(this).attr("src") && (r = !1)
            }),
            r) && a.parentNode.insertBefore(i, a)),
            h[t].vimeoapineeded || (i = e.find("iframe"),
            (null != e.data("vimeoid") || 0 < i.length && i.attr("src") && 0 < i.attr("src").toLowerCase().indexOf("vimeo")) && (h[t].vimeoapineeded = !0),
            h[t].vimeoapineeded && !window.rs_addedvim && (h[t].vimeostarttime = Date.now(),
            window.rs_addedvim = !0,
            e = document.createElement("script"),
            a = h.getByTag(document, "script")[0],
            r = !0,
            e.src = "https://player.vimeo.com/api/player.js",
            jQuery("head").find("*").each(function() {
                "https://player.vimeo.com/api/player.js" == jQuery(this).attr("src") && (r = !1)
            }),
            r) && a.parentNode.insertBefore(e, a))
        },
        manageVideoLayer: function(e, t, i, a) {
            if (h[t].videos = void 0 === h[t].videos ? {} : h[t].videos,
            void 0 === h[t].videos[e[0].id] || !0 === a) {
                var r = h[t].videos[e[0].id] = void 0 === h[t].videos[e[0].id] ? u(e.data(), void 0, i) : h[t].videos[e[0].id];
                if (r.audio = void 0 !== r.audio && r.audio,
                h.ISM && r.opom)
                    0 == e.find("rs-poster").length && e.append('<rs-poster class="noSwipe" style="background-image:url(' + r.poster + ');"></rs-poster>');
                else {
                    r.jsposter = e.find("rs-poster"),
                    r.id = e[0].id,
                    r.pload = "auto" === r.pload || "canplay" === r.pload || "canplaythrough" === r.pload || "progress" === r.pload ? "auto" : r.pload,
                    r.type = null != r.mp4 || null != r.webm ? "html5" : null != r.ytid && 1 < String(r.ytid).length ? "youtube" : null != r.vimeoid && 1 < String(r.vimeoid).length ? "vimeo" : "none",
                    r.newtype = "html5" == r.type && 0 == e.find(r.audio ? "audio" : "video").length ? "html5" : "youtube" == r.type && 0 == e.find("iframe").length ? "youtube" : "vimeo" == r.type && 0 == e.find("iframe").length ? "vimeo" : "none",
                    r.extras = "",
                    r.posterMarkup = void 0 === r.posterMarkup ? "" : r.posterMarkup,
                    !r.audio && "1sttime" == r.aplay && r.pausetimer && r.bgvideo && h.sA(e.closest("rs-slide")[0], "rspausetimeronce", 1),
                    r.audio || !r.bgvideo || !r.pausetimer || 1 != r.aplay && "true" != r.aplay && "no1sttime" != r.aplay || h.sA(e.closest("rs-slide")[0], "rspausetimeralways", 1),
                    r.noInt && e.find("*").addClass("rs-nointeraction"),
                    !(null != r.poster && 2 < r.poster.length) || h.ISM && r.npom || 0 == r.jsposter.length && (r.posterMarkup += '<rs-poster class="noSwipe" style="background-image:url(' + r.poster + ');"></rs-poster>');
                    var o = !0;
                    switch (r.cSS = "created",
                    r.cRS = "created",
                    r.newtype) {
                    case "html5":
                        1 == window.isSafari11 && (h[t].slideHasIframe = !0),
                        r.audio && e.addClass("rs-audio"),
                        r.tag = r.audio ? "audio" : "video";
                        var s = "video" === r.tag && (h.is_mobile() || h.isSafari11()) ? r.aplay && "no1sttime" !== r.aplay || "true" === r.aplay ? "muted playsinline autoplay" : r.inline ? " playsinline" : "" : ""
                          , n = '<div class="html5vid rs_html5vidbasicstyles ' + (!1 === r.afs ? "hidefullscreen" : "") + '">'
                          , l = r.bgvideo && /^([\w]+\:)?\/\//.test(r.mp4) && (-1 === r.mp4.indexOf(location.host) || -1 !== r.mp4.indexOf("." + location.host)) && r.crossOriginVideo ? ' crossOrigin="anonymous" ' : "";
                        n += "<" + r.tag + " " + s + " " + (r.controls && "none" !== r.controls ? " controls" : "") + l + (r.bgvideo && -1 == s.indexOf("autoplay") ? " autoplay" : "") + (r.bgvideo && -1 == s.indexOf("muted") ? " muted" : "") + ' style="' + ("Edge" !== h.get_browser() ? (r.fitCover ? "object-fit:cover;background-size:cover;" : "") + "opacity:0;width:100%; height:100%" : "") + '" class="" ' + (r.loop ? "loop" : "") + ' preload="' + r.pload + '">',
                        "video" === r.tag && null != r.webm && "firefox" == h.get_browser().toLowerCase() && (n = n + '<source src="' + r.webm + '" type="video/webm" />'),
                        null != r.mp4 && (n = n + '<source src="' + r.mp4 + '" type="' + ("video" === r.tag ? "video/mp4" : 0 < r.mp4.toLowerCase().indexOf("m4a") ? "audio/x-m4a" : "audio/mpeg") + '" />'),
                        null != r.ogv && (n = n + '<source src="' + r.mp4 + '" type="' + r.tag + '/ogg" />'),
                        n = (n += "</" + r.tag + "></div>") + r.posterMarkup,
                        r.controls && !r.audio && void 0 === r.poster || r.bgvideo || (n += '<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>'),
                        r.videomarkup = n,
                        o = !1,
                        h.ISM && r.notonmobile || h.isIE(8) || e.append(n),
                        r.jvideo = e.find(r.tag),
                        r.video = r.jvideo[0],
                        r.html5vid = r.jvideo.parent(),
                        d(r.video, "canplay", (g(l = e, t),
                        void h.resetVideo(l, t)));
                        break;
                    case "youtube":
                        h[t].slideHasIframe = !0,
                        r.controls && "none" !== r.controls || (r.vatr = r.vatr.replace("controls=1", "controls=0"),
                        -1 == r.vatr.toLowerCase().indexOf("controls") && (r.vatr = r.vatr + "&controls=0")),
                        !r.inline && "RS-BGVIDEO" !== e[0].tagName || (r.vatr = r.vatr + "&playsinline=1"),
                        -1 != r.ssec && (r.vatr += "&start=" + r.ssec),
                        -1 != r.esec && (r.vatr += "&end=" + r.esec);
                        s = r.vatr.split("origin=https://");
                        r.vatrnew = 1 < s.length ? s[0] + "origin=https://" + (self.location.href.match(/www/gi) && !s[1].match(/www/gi) ? "www." + s[1] : s[1]) : r.vatr,
                        r.videomarkup = '<iframe allow="autoplay; ' + (!0 === r.afs ? "fullscreen" : "") + '" type="text/html" src="https://www.youtube-nocookie.com/embed/' + r.ytid + "?" + r.vatrnew + '"  width="100%" height="100%" class="intrinsic-ignore" style="opacity:0;visibility:visible;width:100%;height:100%"></iframe>';
                        break;
                    case "vimeo":
                        h[t].slideHasIframe = !0,
                        r.vatr = r.vatr.replaceAll("&background=0", "").replaceAll("&background=1", ""),
                        r.vatr = r.vatr.replaceAll("background=0", "").replaceAll("background=1", ""),
                        !r.controls || "none" === r.controls || r.bgvideo ? (r.vatr = r.vatr.replace("background=0", "background=1"),
                        -1 == r.vatr.toLowerCase().indexOf("background") && (r.vatr = r.vatr + "&background=1")) : (r.vatr = r.vatr.replace("background=1", "background=0"),
                        -1 == r.vatr.toLowerCase().indexOf("background") && (r.vatr = r.vatr + "&background=0")),
                        r.vatr = "autoplay=" + (!0 === r.aplay ? 1 : 0) + ("&" == r.vatr[0] ? "" : "&") + r.vatr,
                        r.bgvideo && (r.prePlayForaWhile = !0),
                        h.ISM && !0 === r.aplay && (r.vatr = "muted=1" + ("&" == r.vatr[0] ? "" : "&") + r.vatr),
                        r.loop && (r.vatr = "loop=1" + ("&" == r.vatr[0] ? "" : "&") + r.vatr),
                        r.videomarkup = '<iframe  allow="autoplay; ' + (!0 === r.afs ? "fullscreen" : "") + '" src="https://player.vimeo.com/video/' + r.vimeoid + "?" + r.vatr + '" ' + (!0 === r.afs ? "webkitallowfullscreen mozallowfullscreen allowfullscreen" : "") + ' width="100%" height="100%" class="intrinsic-ignore" style="opacity:0;visibility:visible;width:100%;height:100%"></iframe>'
                    }
                    if (!(null != r.poster && 2 < r.poster.length) || h.ISM && r.npom) {
                        if (h.ISM && r.notonmobile)
                            return !1;
                        0 != e.find("iframe").length || "youtube" != r.type && "vimeo" != r.type || (delete r.vimeoplayer,
                        e.append(r.videomarkup),
                        b(e, t, !("vimeo" !== r.newtype || !r.bgvideo), !0))
                    } else
                        o && 0 == e.find("rs-poster").length && e.append(r.posterMarkup),
                        0 == e.find("iframe").length && (r.jsposter = e.find("rs-poster"),
                        r.jsposter.on("click", function() {
                            if (h.playVideo(e, t, !0),
                            h.ISM) {
                                if (r.notonmobile)
                                    return !1;
                                tpGS.gsap.to(r.jsposter, .3, {
                                    opacity: 0,
                                    visibility: "hidden",
                                    force3D: "auto",
                                    ease: "power3.inOut"
                                }),
                                h.showVideo(e.find("iframe"))
                            }
                        }));
                    "none" !== r.doverlay && void 0 !== r.doverlay && (a = h.createOverlay(t, r.doverlay, r.doverlaysize, {
                        0: r.doverlaycolora,
                        1: r.doverlaycolorb
                    }),
                    r.bgvideo && 1 != e.closest("rs-sbg-wrap").find("rs-dotted").length ? e.closest("rs-sbg-wrap").append('<rs-dotted style="background-image:' + a + '"></rs-dotted>') : r.bgvideo || 1 == e.find("rs-dotted").length || e.append('<rs-dotted style="background-image:' + a + '"></rs-dotted>')),
                    r.bgvideo && ("youtube" !== r.type && "vimeo" !== r.type && (e[0].style.display = "none"),
                    e[0].style.zIndex = 0,
                    tpGS.gsap.set(e.find("video, iframe"), {
                        opacity: 0
                    }))
                }
            }
        }
    });
    function m(e, t) {
        var i = h[e].videos[t[0].id];
        (i.bgvideo || t.hasClass("rs-fsv")) && ((void 0 === i.ratio || i.ratio.split(":").length <= 1) && (i.ratio = "16:9"),
        requestAnimationFrame(function() {
            h.prepareCoveredVideo(e)
        }))
    }
    function v(e, t, i) {
        e.cSS = "playing",
        e.vimeostarted = !0,
        e.nextslidecalled = !1,
        e.jsposter = void 0 === e.jsposter || 0 === e.jsposter.length ? t.find("rs-poster") : e.jsposter,
        e.jvideo = t.find("iframe"),
        h[i].c.trigger("revolution.slide.onvideoplay", f(e.vimeoplayer, "vimeo", e)),
        h[i].stopByVideo = e.pausetimer,
        S(t, i),
        "mute" == e.volume || 0 === e.volume || h.lastToggleState(t.data("videomutetoggledby")) || !0 === h[i].globalmute ? (e.volumetoken = !0,
        e.vimeoplayer.setMuted(!0)) : o(e, parseInt(e.volcache, 0) / 100 || .75),
        h.toggleState(e.videotoggledby)
    }
    function l(e) {
        return "t" === e || !0 === e || "true" === e || "f" !== e && !1 !== e && "false" !== e && e
    }
    var d = function(e, t, i) {
        e.addEventListener ? e.addEventListener(t, i, {
            capture: !1,
            passive: !0
        }) : e.attachEvent(t, i, {
            capture: !1,
            passive: !0
        })
    }
      , f = function(e, t, i) {
        var a = {};
        return a.video = e,
        a.type = t,
        a.settings = i,
        a
    }
      , o = function(i, a) {
        var r = i.vimeoplayer;
        r.getPaused().then(function(e) {
            i.volumetoken = !0;
            var t = !e
              , e = r.setVolume(a);
            void 0 !== e && e.then(function(e) {
                r.getPaused().then(function(e) {
                    t === e && (i.volume = "mute",
                    r.getMuted().then(function(e) {
                        e || (i.volumetoken = !0,
                        r.setMuted(!0))
                    }),
                    r.play())
                }).catch(function(e) {
                    console.log("Get Paused Function Failed for Vimeo Volume Changes Inside the Promise")
                })
            }).catch(function(e) {
                t && (i.volume = "mute",
                i.volumetoken = !0,
                r.setMuted(!0),
                r.play()),
                h.ISM && k(i, 0)
            })
        }).catch(function() {
            console.log("Get Paused Function Failed for Vimeo Volume Changes")
        })
    }
      , y = function(e, t) {
        var i = e.player.getPlayerState();
        "mute" === t ? e.player.mute() : (e.player.unMute(),
        e.player.setVolume(t)),
        setTimeout(function() {
            1 === i && 1 !== e.player.getPlayerState() && (e.player.mute(),
            e.player.playVideo())
        }, 39)
    }
      , s = function(t, i, a) {
        var e;
        "playVideo" === t.cRS && (void 0 !== (e = t.video.play()) && e.then(function(e) {
            !0 === t.twaudio && !0 !== h[a].globalmute && (t.twaudio = !1,
            h.clickedOnce) && (t.video.volume = t.volcache,
            t.volume = t.volcache,
            t.video.muted = !1)
        }).catch(function(e) {
            t.video.pause(),
            !0 !== i && s(t, !0, a)
        }),
        h.ISM) && k(t, 0)
    }
      , c = function(t) {
        var e;
        "playVideo" === t.cRS && void 0 !== (e = t.vimeoplayer.play()) && e.then(function(e) {}).catch(function(e) {
            t.vimeoplayer.volumetoken = !0,
            t.vimeoplayer.setMuted(!0),
            t.vimeoplayer.play()
        })
    }
      , p = function(e) {
        "playVideo" === e.cRS && e.player.playVideo()
    }
      , w = function(e, t, i, a) {
        clearTimeout(t.repeatedPosterCalls),
        t.repeatedPosterCalls = setTimeout(function() {
            "show" === i || "playing" === t.cSS && !0 !== t.VideoIsVisible ? (void 0 !== t.showhideposter && t.showhideposter.pause(),
            t.showhideposter = tpGS.gsap.timeline(),
            0 < t.jsposter.length && t.showhideposter.add(tpGS.gsap.to(t.jsposter, .3, {
                zIndex: 5,
                autoAlpha: 0,
                force3D: "auto",
                ease: "power3.inOut"
            }), 0),
            0 < t.jvideo.length && t.showhideposter.add(tpGS.gsap.to(t.jvideo, void 0 !== a ? a : .001, {
                opacity: 1,
                display: "block",
                ease: 0 < t.jsposter.length ? "power3.inOut" : "power3.out"
            }), 0),
            t.VideoIsVisible = !0) : ("hide" === i || "paused" === t.cSS && 1 != h.checkfullscreenEnabled(e) && 0 < t.jsposter.length && !1 !== t.VideoIsVisible && !0 !== t.seeking) && (void 0 !== t.showhideposter && t.showhideposter.pause(),
            t.showhideposter = tpGS.gsap.timeline(),
            0 < t.jsposter.length && t.showhideposter.add(tpGS.gsap.to(t.jsposter, .3, {
                zIndex: 5,
                autoAlpha: 1,
                force3D: "auto",
                ease: "power3.inOut"
            }), 0),
            0 < t.jvideo.length && t.showhideposter.add(tpGS.gsap.to(t.jvideo, void 0 !== a ? a : .001, {
                opacity: 0,
                ease: 0 < t.jsposter.length ? "power3.inOut" : "power3.out"
            }), .3),
            t.bgvideo && void 0 !== t.nBG && void 0 !== t.nBG.loadobj && (t.nBG.video = t.nBG.loadobj.img),
            t.VideoIsVisible = !1)
        }, void 0 !== i ? 0 : 100)
    }
      , b = function(r, o, e, s) {
        var n = h[o].videos[r[0].id]
          , t = "iframe" + Math.round(1e5 * Math.random() + 1);
        if (n.jvideo = r.find("iframe"),
        m(o, r),
        n.jvideo.attr("id", t),
        n.startvideonow = e,
        n.videolistenerexist) {
            if (e)
                switch (n.type) {
                case "youtube":
                    h.playVideo(r, o),
                    -1 != n.ssec && n.player.seekTo(n.ssec);
                    break;
                case "vimeo":
                    h.playVideo(r, o),
                    -1 != n.ssec && n.vimeoplayer.seekTo(n.ssec)
                }
        } else
            switch (n.type) {
            case "youtube":
                "undefined" == typeof YT || void 0 === YT.Player ? (h.checkVideoApis(r, o),
                setTimeout(function() {
                    b(r, o, e, s)
                }, 50)) : n.player = new YT.Player(t,{
                    events: {
                        onStateChange: function(e) {
                            e.data == YT.PlayerState.PLAYING ? (n.cSS = "playing",
                            !(h[o].onceVideoPlayed = !0) === n.player.isMuted() && (n.volume = n.volcache = n.player.getVolume()),
                            "mute" == n.volume || 0 === n.volume || h.lastToggleState(r.data("videomutetoggledby")) || !0 === h[o].globalmute ? n.player.mute() : y(n, parseInt(n.volcache, 0) || 75),
                            h[o].stopByVideo = !0,
                            S(r, o),
                            n.pausetimer ? h[o].c.trigger("stoptimer") : h[o].stopByVideo = !1,
                            h[o].c.trigger("revolution.slide.onvideoplay", f(n.player, "youtube", n)),
                            h.toggleState(n.videotoggledby)) : (n.cSS = "paused",
                            0 == e.data && n.loop && (-1 != n.ssec && n.player.seekTo(n.ssec),
                            h.playVideo(r, o),
                            h.toggleState(n.videotoggledby)),
                            -1 != e.data && 3 != e.data && (h[o].stopByVideo = !1,
                            h[o].tonpause = !1,
                            x(r, o),
                            h[o].c.trigger("starttimer"),
                            h[o].c.trigger("revolution.slide.onvideostop", f(n.player, "youtube", n)),
                            null != h[o].videoIsPlaying && h[o].videoIsPlaying.attr("id") != r.attr("id") || h.unToggleState(n.videotoggledby)),
                            0 == e.data && n.nse ? (document.fullscreenElement !== r.find("iframe")[0] && document.webkitFullscreenElement !== r.find("iframe")[0] || _(),
                            n.nseTriggered = !0,
                            h[o].c.revnext(),
                            x(r, o)) : (x(r, o),
                            h[o].stopByVideo = !1,
                            3 !== e.data && (-1 != n.lasteventdata && 3 != n.lasteventdata && void 0 !== n.lasteventdata || -1 != e.data && 3 != e.data) && h[o].c.trigger("starttimer"),
                            h[o].c.trigger("revolution.slide.onvideostop", f(n.player, "youtube", n)),
                            null != h[o].videoIsPlaying && h[o].videoIsPlaying.attr("id") != r.attr("id") || h.unToggleState(n.videotoggledby))),
                            clearTimeout(n.postOrVideoTimer),
                            3 !== e.data && (n.postOrVideoTimer = setTimeout(function() {
                                w(o, n)
                            }, 1 === n.lasteventdata && 2 === e.data || 2 === n.lasteventdata && 3 !== e.data ? 1e3 : 0),
                            n.lasteventdata = e.data)
                        },
                        onReady: function(e) {
                            var t, i = h.is_mobile(), a = r.hasClass("rs-layer-video");
                            n.ready = !0,
                            !i && (!h.isSafari11() || i && a) || "RS-BGVIDEO" !== r[0].tagName && (!a || !0 !== n.aplay && "true" !== n.aplay) || (t = !0,
                            n.player.setVolume(n.volcache),
                            n.volume = "mute",
                            n.player.mute(),
                            clearTimeout(r.data("mobilevideotimr")),
                            2 !== n.player.getPlayerState() && -1 !== n.player.getPlayerState()) || r.data("mobilevideotimr", setTimeout(function() {
                                h.playVideo(r, o)
                            }, 500)),
                            t || "mute" != n.volume || (n.player.setVolume(n.volcache),
                            n.player.mute()),
                            r.addClass("rs-apiready"),
                            null == n.speed && 1 === n.speed || e.target.setPlaybackRate(parseFloat(n.speed)),
                            n.jsposter.off("click"),
                            n.jsposter.on("click", function() {
                                h.playVideo(r, o, !0)
                            }),
                            n.startvideonow ? (h.playVideo(r, o),
                            -1 != n.ssec && n.player.seekTo(n.ssec)) : s && w(o, n, "show", .2),
                            n.videolistenerexist = !0
                        }
                    }
                });
                break;
            case "vimeo":
                if ("undefined" == typeof Vimeo || void 0 === Vimeo.Player)
                    h.checkVideoApis(r, o),
                    setTimeout(function() {
                        b(r, o, e, s)
                    }, 50);
                else {
                    for (var i, a = {}, l = p = n.jvideo.attr("src"), d = /([^&=]+)=([^&]*)/g; i = d.exec(l); )
                        a[decodeURIComponent(i[1])] = decodeURIComponent(i[2]);
                    var c, p = (p = null != a.player_id ? p.replace(a.player_id, t) : p + "&player_id=" + t).replace(/&api=0|&api=1/g, ""), g = h.is_mobile() || h.isSafari11(), u = "RS-BGVIDEO" === r[0].tagName;
                    g && u && (p += "&background=1"),
                    n.jvideo.attr("src", p),
                    n.vimeoplayer = void 0 === n.vimeoplayer || !1 === n.vimeoplayer ? new Vimeo.Player(t) : n.vimeoplayer,
                    g && (c = !(!u && !n.aplay && "true" !== n.aplay) || c) && (n.volumetoken = !0,
                    n.vimeoplayer.setMuted(!0),
                    n.volume = "mute"),
                    n.vimeoplayer.on("play", function(e) {
                        h[o].onceVideoPlayed = !0,
                        n.cSS = "playing",
                        n.vimeostarted || v(n, r, o)
                    }),
                    n.vimeoplayer.on("loaded", function(e) {
                        var t = {};
                        n.vimeoplayer.getVideoWidth().then(function(e) {
                            t.width = e,
                            void 0 !== t.width && void 0 !== t.height && (n.ratio = t.width + ":" + t.height,
                            n.vimeoplayerloaded = !0,
                            m(o, r))
                        }),
                        n.vimeoplayer.getVideoHeight().then(function(e) {
                            t.height = e,
                            void 0 !== t.width && void 0 !== t.height && (n.ratio = t.width + ":" + t.height,
                            n.vimeoplayerloaded = !0,
                            m(o, r))
                        }),
                        n.startvideonow ? ("mute" === n.volume && (n.volumetoken = !0,
                        n.vimeoplayer.setMuted(!0)),
                        h.playVideo(r, o),
                        -1 != n.ssec && n.vimeoplayer.setCurrentTime(n.ssec)) : s && w(o, n, "show", .2),
                        null == n.speed && 1 === n.speed || n.vimeoplayer.setPlaybackRate(parseFloat(n.speed))
                    }),
                    r.addClass("rs-apiready"),
                    n.vimeoplayer.on("volumechange", function(e) {
                        n.volumetoken && (n.volume = e.volume),
                        n.volumetoken = !1
                    }),
                    n.vimeoplayer.on("timeupdate", function(e) {
                        w(o, n),
                        n.vimeostarted || 0 === e.percent || void 0 !== h[o].activeRSSlide && n.slideid !== h.gA(h[o].slides[h[o].activeRSSlide], "key") || v(n, r, o),
                        n.pausetimer && "playing" == h[o].sliderstatus && (h[o].stopByVideo = !0,
                        h[o].c.trigger("stoptimer")),
                        n.currenttime = e.seconds,
                        0 != n.esec && -1 !== n.esec && n.esec < e.seconds && !0 !== n.nextslidecalled && (n.loop ? (h.playVideo(r, o),
                        n.vimeoplayer.setCurrentTime(-1 !== n.ssec ? n.ssec : 0)) : (n.nse && (n.nseTriggered = !0,
                        n.nextslidecalled = !0,
                        h[o].c.revnext()),
                        n.vimeoplayer.pause())),
                        n.prePlayForaWhile && n.vimeoplayer.pause()
                    }),
                    n.vimeoplayer.on("ended", function(e) {
                        n.cSS = "paused",
                        w(o, n),
                        n.vimeostarted = !1,
                        x(r, o),
                        h[o].stopByVideo = !1,
                        h[o].c.trigger("starttimer"),
                        h[o].c.trigger("revolution.slide.onvideostop", f(n.vimeoplayer, "vimeo", n)),
                        n.nse && (n.nseTriggered = !0,
                        h[o].c.revnext()),
                        null != h[o].videoIsPlaying && h[o].videoIsPlaying.attr("id") != r.attr("id") || h.unToggleState(n.videotoggledby)
                    }),
                    n.vimeoplayer.on("pause", function(e) {
                        n.vimeostarted = !1,
                        n.cSS = "paused",
                        w(o, n),
                        h[o].stopByVideo = !1,
                        h[o].tonpause = !1,
                        x(r, o),
                        h[o].c.trigger("starttimer"),
                        h[o].c.trigger("revolution.slide.onvideostop", f(n.vimeoplayer, "vimeo", n)),
                        null != h[o].videoIsPlaying && h[o].videoIsPlaying.attr("id") != r.attr("id") || h.unToggleState(n.videotoggledby)
                    }),
                    n.jsposter.off("click"),
                    n.jsposter.on("click", function() {
                        if (!h.ISM)
                            return h.playVideo(r, o, !0),
                            !1
                    }),
                    n.videolistenerexist = !0
                }
            }
    }
      , _ = function() {
        document.exitFullscreen && document.fullscreen ? document.exitFullscreen() : document.mozCancelFullScreen && document.mozFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitIsFullScreen && document.webkitExitFullscreen()
    }
      , g = function(t, i, e) {
        var a, r = h[i].videos[t[0].id];
        if (h.ISM && r.notonmobile)
            return !1;
        r.metaloaded = !0,
        "html5" === r.newtype && r.bgvideo && (r.nBG = h[i].sbgs[t[0].dataset.key],
        void 0 === r.nBG.shadowCanvas && (r.nBG.shadowCanvas = document.createElement("canvas"),
        r.nBG.shadowCTX = r.nBG.shadowCanvas.getContext("2d"),
        r.nBG.shadowCanvas.style.background = "transparent",
        r.nBG.shadowCanvas.style.opacity = 1),
        r.nBG.isHTML5 = !0,
        r.nBG.video = void 0 !== r.nBG.loadobj && void 0 !== r.nBG.loadobj.img ? r.nBG.loadobj.img : r.video,
        r.nBG.drawVideoCanvasImagesRecall = !1),
        r.controls && !r.audio && void 0 === r.poster || r.noInt || (0 != t.find(".tp-video-play-button").length || h.ISM || t.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>'),
        a = "video, rs-poster, .tp-video-play-button",
        void 0 !== r.poster && r.controls && (a = ".tp-video-play-button"),
        t.find(a).on("click", function() {
            !1 === r.loop && 0 < r.esec && r.esec <= r.video.currentTime || (t.hasClass("videoisplaying") ? h.stopVideo(t, i) : h.playVideo(t, i, !0))
        })),
        (t.hasClass("rs-fsv") || r.bgvideo) && (r.bgvideo || t.hasClass("rs-fsv") ? (r.html5vid.addClass("fullcoveredvideo"),
        void 0 !== r.ratio && 1 != r.ratio.split(":").length || (r.ratio = "16:9"),
        h.prepareCoveredVideo(i)) : r.html5vid.addClass("rs-fsv")),
        d(r.video, "canplaythrough", function() {
            h.preLoadAudioDone(t, i, "canplaythrough")
        }),
        d(r.video, "canplay", function() {
            h.preLoadAudioDone(t, i, "canplay")
        }),
        d(r.video, "progress", function() {
            h.preLoadAudioDone(t, i, "progress")
        }),
        d(r.video, "pause", function() {
            h.ISM && k(r, 1)
        }),
        d(r.video, "timeupdate", function(e) {
            this.BGrendered = !0,
            w(i, r),
            -1 === r.esec && r.loop && 1 == window.isSafari11 && (r.esec = r.video.duration - .075),
            void 0 !== r.lastCurrentTime ? r.fps = r.video.currentTime - r.lastCurrentTime : r.fps = .1,
            r.lastCurrentTime = r.video.currentTime,
            0 != r.esec && -1 != r.esec && r.esec < r.video.currentTime && !r.nextslidecalled && (r.loop ? (s(r, void 0, i),
            r.video.currentTime = -1 === r.ssec ? .5 : r.ssec) : (r.nse && (r.nseTriggered = !0,
            r.nextslidecalled = !0,
            h[i].jcnah = !0,
            h[i].c.revnext(),
            setTimeout(function() {
                h[i].jcnah = !1
            }, 1e3)),
            r.video.pause()))
        }),
        d(r.video, "play", function() {
            r.cSS = "playing",
            w(i, r),
            r.bgvideo && (r.nBG.drawVideoCanvasImagesRecall = !0,
            r.nBG.videoisplaying = !0,
            r.nBG.video = r.video,
            h.updateVideoFrames(i, r.nBG)),
            h[i].onceVideoPlayed = !0,
            r.nextslidecalled = !1,
            r.volume = null != r.volume && "mute" != r.volume ? parseFloat(r.volcache) : r.volume,
            r.volcache = null != r.volcache && "mute" != r.volcache ? parseFloat(r.volcache) : r.volcache,
            h.is_mobile() || (!0 === h[i].globalmute ? r.video.muted = !0 : r.video.muted = "mute" == r.volume,
            r.volcache = h.isNumeric(r.volcache) && 1 < r.volcache ? r.volcache / 100 : r.volcache,
            "mute" == r.volume ? r.video.muted = !0 : null != r.volcache && (r.video.volume = r.volcache)),
            t.addClass("videoisplaying"),
            S(t, i),
            clearTimeout(r.showCoverSoon),
            !0 !== r.pausetimer || "audio" == r.tag ? (h[i].stopByVideo = !1,
            h[i].c.trigger("revolution.slide.onvideostop", f(r.video, "html5", r))) : (h[i].stopByVideo = !0,
            h[i].c.trigger("revolution.slide.onvideoplay", f(r.video, "html5", r))),
            r.pausetimer && "playing" == h[i].sliderstatus && (h[i].stopByVideo = !0,
            h[i].c.trigger("stoptimer")),
            h.toggleState(r.videotoggledby)
        }),
        d(r.video, "seeked", function() {
            r.seeking = !1
        }),
        d(r.video, "seeking", function() {
            r.seeking = !0
        }),
        d(r.video, "pause", function(e) {
            r.cSS = "paused",
            w(i, r),
            t.removeClass("videoisplaying"),
            r.bgvideo && (r.nBG.drawVideoCanvasImagesRecall = !1,
            r.nBG.videoisplaying = !1),
            h[i].stopByVideo = !1,
            x(t, i),
            "audio" != r.tag && h[i].c.trigger("starttimer"),
            h[i].c.trigger("revolution.slide.onvideostop", f(r.video, "html5", r)),
            null != h[i].videoIsPlaying && h[i].videoIsPlaying.attr("id") != t.attr("id") || h.unToggleState(r.videotoggledby)
        }),
        d(r.video, "ended", function() {
            r.cSS = "paused",
            document.fullscreenElement !== r.video && document.webkitFullscreenElement !== r.video || _(),
            w(i, r),
            x(t, i),
            h[i].stopByVideo = !1,
            x(t, i),
            "audio" != r.tag && h[i].c.trigger("starttimer"),
            h[i].c.trigger("revolution.slide.onvideostop", f(r.video, "html5", t.data())),
            r.nse && 0 < r.video.currentTime && (1 == !h[i].jcnah && (r.nseTriggered = !0,
            h[i].c.revnext(),
            h[i].jcnah = !0),
            setTimeout(function() {
                h[i].jcnah = !1
            }, 1500)),
            t.removeClass("videoisplaying"),
            r.bgvideo && (r.nBG.drawVideoCanvasImagesRecall = !1,
            r.nBG.videoisplaying = !1),
            !0 !== h[i].inviewport && void 0 !== h[i].inviewport || (h[i].lastplayedvideos = [])
        }),
        d(r.video, "volumechange", function() {
            r.video.muted ? r.volume = "mute" : r.volume = r.volcache = r.video.volume
        })
    }
      , u = function(e, t, i) {
        e.audio = "audio" === t;
        var a, r = void 0 === e.video ? [] : e.video.split(";"), o = {
            volume: e.audio ? 1 : "mute",
            pload: "auto",
            ratio: "16:9",
            loop: !0,
            aplay: "true",
            fitCover: !0,
            afs: !0,
            controls: !1,
            nse: !0,
            npom: !1,
            opom: !1,
            inline: !0,
            notonmobile: !1,
            start: -1,
            end: -1,
            doverlay: "none",
            doverlaysize: 1,
            doverlaycolora: "transparent",
            doverlaycolorb: "#000000",
            scop: !1,
            rwd: !0,
            speed: 1,
            ploadwait: 5,
            stopAV: 1 !== e.bgvideo,
            noInt: !1,
            volcache: 75,
            crossOriginVideo: !1
        };
        for (a in r)
            if (r.hasOwnProperty(a)) {
                var s = r[a].split(":");
                switch (s[0]) {
                case "v":
                    o.volume = s[1];
                    break;
                case "twa":
                    o.twaudio = s[1];
                    break;
                case "vd":
                    o.volcache = s[1];
                    break;
                case "p":
                    o.pload = s[1];
                    break;
                case "ar":
                    o.ratio = s[1] + (void 0 !== s[2] ? ":" + s[2] : "");
                    break;
                case "ap":
                    o.aplay = l(s[1]);
                    break;
                case "vfc":
                    o.fitCover = l(s[1]);
                    break;
                case "afs":
                    o.afs = l(s[1]);
                    break;
                case "vc":
                    o.controls = s[1];
                    break;
                case "nse":
                    o.nse = l(s[1]);
                    break;
                case "npom":
                    o.npom = l(s[1]);
                    break;
                case "opom":
                    o.opom = l(s[1]);
                    break;
                case "t":
                    o.vtype = s[1];
                    break;
                case "inl":
                    o.inline = l(s[1]);
                    break;
                case "nomo":
                    o.notonmobile = l(s[1]);
                    break;
                case "sta":
                    o.start = s[1] + (void 0 !== s[2] ? ":" + s[2] : "");
                    break;
                case "end":
                    o.end = s[1] + (void 0 !== s[2] ? ":" + s[2] : "");
                    break;
                case "do":
                    o.doverlay = s[1];
                    break;
                case "dos":
                    o.doverlaysize = s[1];
                    break;
                case "doca":
                    o.doverlaycolora = s[1];
                    break;
                case "docb":
                    o.doverlaycolorb = s[1];
                    break;
                case "scop":
                    o.scop = l(s[1]);
                    break;
                case "rwd":
                    o.rwd = l(s[1]);
                    break;
                case "sp":
                    o.speed = s[1];
                    break;
                case "vw":
                    o.ploadwait = parseInt(s[1], 0) || 5;
                    break;
                case "sav":
                    o.stopAV = l(s[1]);
                    break;
                case "noint":
                    o.noInt = l(s[1]);
                    break;
                case "l":
                    o.loopcache = s[1],
                    o.loop = "loop" === s[1] || "loopandnoslidestop" === s[1] || "none" !== s[1] && l(s[1]);
                    break;
                case "ptimer":
                    o.pausetimer = l(s[1]);
                    break;
                case "sat":
                    o.waitToSlideTrans = l(s[1]);
                    break;
                case "crossOriginVideo":
                    o.crossOriginVideo = l(s[1]);
                    break;
                case "poch":
                    o.pauseOnSlideChange = l(s[1])
                }
            }
        return null == e.mp4 && null == e.webm && (o.fitCover = !1),
        void 0 !== e.bgvideo && (o.bgvideo = e.bgvideo),
        o.noInt && (o.controls = !1),
        void 0 !== e.mp4 && (o.mp4 = e.mp4),
        void 0 !== e.videomp4 && (o.mp4 = e.videomp4),
        void 0 !== e.ytid && (o.ytid = e.ytid),
        void 0 !== e.ogv && (o.ogv = e.ogv),
        void 0 !== e.webm && (o.webm = e.webm),
        void 0 !== e.vimeoid && (o.vimeoid = e.vimeoid),
        void 0 !== e.vatr && (o.vatr = e.vatr),
        void 0 !== e.videoattributes && (o.vatr = e.videoattributes),
        void 0 !== e.poster && (o.poster = e.poster),
        o.slideid = i,
        o.aplay = "true" === o.aplay || o.aplay,
        1 === o.bgvideo && (o.volume = "mute"),
        o.ssec = n(o.start),
        o.esec = n(o.end),
        o.pausetimer = void 0 === o.pausetimer ? "loopandnoslidestop" !== o.loopcache : o.pausetimer,
        o.inColumn = e._incolumn,
        o.audio = e.audio,
        !0 !== o.loop && "true" !== o.loop || !0 !== o.nse && "true" !== o.nse || (o.loop = !1),
        o.aplay && o.twaudio && !o.bgvideo && (o.twaudio = !0),
        o
    }
      , S = function(e, t) {
        if (h[t].playingvideos = void 0 === h[t].playingvideos ? new Array : h[t].playingvideos,
        h[t].videos[e[0].id].stopAV && void 0 !== h[t].playingvideos && 0 < h[t].playingvideos.length)
            for (var i in h[t].lastplayedvideos = jQuery.extend(!0, [], h[t].playingvideos),
            h[t].playingvideos)
                h[t].playingvideos.hasOwnProperty(i) && h.stopVideo(h[t].playingvideos[i], t);
        h[t].playingvideos.push(e),
        h[t].videoIsPlaying = e
    }
      , x = function(e, t) {
        void 0 !== h[t] && void 0 !== h[t] && null != h[t].playingvideos && 0 <= jQuery.inArray(e, h[t].playingvideos) && h[t].playingvideos.splice(jQuery.inArray(e, h[t].playingvideos), 1)
    }
      , k = function(e, t) {
        var i, a, r;
        void 0 !== e && (void 0 === t && (t = 0),
        h.ISM) && !e.bgvideo && (e.playPauseBtnTween && e.playPauseBtnTween.kill && e.playPauseBtnTween.kill(),
        i = h.closestNode(e.video, "RS-LAYER"),
        a = e.controls ? 1 : 0,
        r = e.controls ? 0 : .3,
        e.controls && e.poster && 0 === t && (a = r = 0),
        i) && (e.playPauseBtnTween = tpGS.gsap.to(i.querySelector(".tp-video-play-button"), {
            duration: r,
            delay: a,
            opacity: t
        }))
    };
    window.RS_MODULES = window.RS_MODULES || {},
    window.RS_MODULES.video = {
        loaded: !0,
        version: "6.6.9"
    },
    window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal()
}(jQuery);
