﻿(window._gsQueue || (window._gsQueue = [])).push(function () {
    "use strict";
    window._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
        var n = [].slice,
            r = function (t, e, n) {
                i.call(this, t, e, n), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render
            },
            a = 1e-10,
            s = i._internals.isSelector,
            o = i._internals.isArray,
            l = r.prototype = i.to({}, .1, {}),
            h = [];
        r.version = "1.11.8", l.constructor = r, l.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.ticker = i.ticker, l.invalidate = function () {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
        }, l.updateTo = function (t, e) {
            var n, r = this.ratio;
            e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (n in t) this.vars[n] = t[n];
            if (this._initted)
                if (e) this._initted = !1;
                else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                    var a = this._time;
                    this.render(0, !0, !1), this._initted = !1, this.render(a, !0, !1)
                } else if (this._time > 0) {
                    this._initted = !1, this._init();
                    for (var s, o = 1 / (1 - r), l = this._firstPT; l;) s = l.s + l.c, l.c *= o, l.s = s - l.c, l = l._next
                }
            return this
        }, l.render = function (t, e, i) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var n, r, s, o, l, u, f, c, m = this._dirty ? this.totalDuration() : this._totalDuration,
                p = this._time,
                _ = this._totalTime,
                d = this._cycle,
                v = this._duration;
            if (t >= m ? (this._totalTime = m, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (n = !0, r = "onComplete"), 0 === v && (c = this._rawPrevTime, this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > c || c === a) && c !== t && (i = !0, c > a && (r = "onReverseComplete")), this._rawPrevTime = c = !e || t || this._rawPrevTime === t ? t : a)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== _ || 0 === v && this._rawPrevTime > 0 && this._rawPrevTime !== a) && (r = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === v && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = c = !e || t || this._rawPrevTime === t ? t : a)) : this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (o = v + this._repeatDelay, this._cycle = this._totalTime / o >> 0, 0 !== this._cycle && this._cycle === this._totalTime / o && this._cycle-- , this._time = this._totalTime - this._cycle * o, this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : this._time < 0 && (this._time = 0)), this._easeType ? (l = this._time / v, u = this._easeType, f = this._easePower, (1 === u || 3 === u && l >= .5) && (l = 1 - l), 3 === u && (l *= 2), 1 === f ? l *= l : 2 === f ? l *= l * l : 3 === f ? l *= l * l * l : 4 === f && (l *= l * l * l * l), this.ratio = 1 === u ? 1 - l : 2 === u ? l : this._time / v < .5 ? l / 2 : 1 - l / 2) : this.ratio = this._ease.getRatio(this._time / v)), p === this._time && !i && d === this._cycle) return void (_ !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || h)));
            if (!this._initted) {
                if (this._init(), !this._initted || this._gc) return;
                this._time && !n ? this.ratio = this._ease.getRatio(this._time / v) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (this._active || !this._paused && this._time !== p && t >= 0 && (this._active = !0), 0 === _ && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || h))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
            this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== _ || n) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || h)), this._cycle !== d && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || h)), r && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || h), 0 === v && this._rawPrevTime === a && c !== a && (this._rawPrevTime = 0)))
        }, r.to = function (t, e, i) {
            return new r(t, e, i)
        }, r.from = function (t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(t, e, i)
        }, r.fromTo = function (t, e, i, n) {
            return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new r(t, e, n)
        }, r.staggerTo = r.allTo = function (t, e, a, l, u, f, c) {
            l = l || 0;
            var m, p, _, d, v = a.delay || 0,
                g = [],
                y = function () {
                    a.onComplete && a.onComplete.apply(a.onCompleteScope || this, arguments), u.apply(c || this, f || h)
                };
            for (o(t) || ("string" == typeof t && (t = i.selector(t) || t), s(t) && (t = n.call(t, 0))), m = t.length, _ = 0; m > _; _++) {
                p = {};
                for (d in a) p[d] = a[d];
                p.delay = v, _ === m - 1 && u && (p.onComplete = y), g[_] = new r(t[_], e, p), v += l
            }
            return g
        }, r.staggerFrom = r.allFrom = function (t, e, i, n, a, s, o) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(t, e, i, n, a, s, o)
        }, r.staggerFromTo = r.allFromTo = function (t, e, i, n, a, s, o, l) {
            return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, r.staggerTo(t, e, n, a, s, o, l)
        }, r.delayedCall = function (t, e, i, n, a) {
            return new r(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: n,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: n,
                immediateRender: !1,
                useFrames: a,
                overwrite: 0
            })
        }, r.set = function (t, e) {
            return new r(t, 0, e)
        }, r.isTweening = function (t) {
            return i.getTweensOf(t, !0).length > 0
        };
        var u = function (t, e) {
            for (var n = [], r = 0, a = t._first; a;) a instanceof i ? n[r++] = a : (e && (n[r++] = a), n = n.concat(u(a, e)), r = n.length), a = a._next;
            return n
        },
            f = r.getAllTweens = function (e) {
                return u(t._rootTimeline, e).concat(u(t._rootFramesTimeline, e))
            };
        r.killAll = function (t, i, n, r) {
            null == i && (i = !0), null == n && (n = !0);
            var a, s, o, l = f(0 != r),
                h = l.length,
                u = i && n && r;
            for (o = 0; h > o; o++) s = l[o], (u || s instanceof e || (a = s.target === s.vars.onComplete) && n || i && !a) && (t ? s.totalTime(s.totalDuration()) : s._enabled(!1, !1))
        }, r.killChildTweensOf = function (t, e) {
            if (null != t) {
                var a, l, h, u, f, c = i._tweenLookup;
                if ("string" == typeof t && (t = i.selector(t) || t), s(t) && (t = n.call(t, 0)), o(t))
                    for (u = t.length; --u > -1;) r.killChildTweensOf(t[u], e);
                else {
                    a = [];
                    for (h in c)
                        for (l = c[h].target.parentNode; l;) l === t && (a = a.concat(c[h].tweens)), l = l.parentNode;
                    for (f = a.length, u = 0; f > u; u++) e && a[u].totalTime(a[u].totalDuration()), a[u]._enabled(!1, !1)
                }
            }
        };
        var c = function (t, i, n, r) {
            i = i !== !1, n = n !== !1, r = r !== !1;
            for (var a, s, o = f(r), l = i && n && r, h = o.length; --h > -1;) s = o[h], (l || s instanceof e || (a = s.target === s.vars.onComplete) && n || i && !a) && s.paused(t)
        };
        return r.pauseAll = function (t, e, i) {
            c(!0, t, e, i)
        }, r.resumeAll = function (t, e, i) {
            c(!1, t, e, i)
        }, r.globalTimeScale = function (e) {
            var n = t._rootTimeline,
                r = i.ticker.time;
            return arguments.length ? (e = e || a, n._startTime = r - (r - n._startTime) * n._timeScale / e, n = t._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / e, n._timeScale = t._rootTimeline._timeScale = e, e) : n._timeScale
        }, l.progress = function (t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
        }, l.totalProgress = function (t) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
        }, l.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
        }, l.duration = function (e) {
            return arguments.length ? t.prototype.duration.call(this, e) : this._duration
        }, l.totalDuration = function (t) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        }, l.repeat = function (t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
        }, l.repeatDelay = function (t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
        }, l.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, r
    }, !0), window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
        var n = function (t) {
            e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
            var i, n, r = this.vars;
            for (n in r) i = r[n], s(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
            s(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
        },
            r = 1e-10,
            a = i._internals.isSelector,
            s = i._internals.isArray,
            o = [],
            l = window._gsDefine.globals,
            h = function (t) {
                var e, i = {};
                for (e in t) i[e] = t[e];
                return i
            },
            u = function (t, e, i, n) {
                t._timeline.pause(t._startTime), e && e.apply(n || t._timeline, i || o)
            },
            f = o.slice,
            c = n.prototype = new e;
        return n.version = "1.11.8", c.constructor = n, c.kill()._gc = !1, c.to = function (t, e, n, r) {
            var a = n.repeat && l.TweenMax || i;
            return e ? this.add(new a(t, e, n), r) : this.set(t, n, r)
        }, c.from = function (t, e, n, r) {
            return this.add((n.repeat && l.TweenMax || i).from(t, e, n), r)
        }, c.fromTo = function (t, e, n, r, a) {
            var s = r.repeat && l.TweenMax || i;
            return e ? this.add(s.fromTo(t, e, n, r), a) : this.set(t, r, a)
        }, c.staggerTo = function (t, e, r, s, o, l, u, c) {
            var m, p = new n({
                onComplete: l,
                onCompleteParams: u,
                onCompleteScope: c,
                smoothChildTiming: this.smoothChildTiming
            });
            for ("string" == typeof t && (t = i.selector(t) || t), a(t) && (t = f.call(t, 0)), s = s || 0, m = 0; m < t.length; m++) r.startAt && (r.startAt = h(r.startAt)), p.to(t[m], e, h(r), m * s);
            return this.add(p, o)
        }, c.staggerFrom = function (t, e, i, n, r, a, s, o) {
            return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, a, s, o)
        }, c.staggerFromTo = function (t, e, i, n, r, a, s, o, l) {
            return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, a, s, o, l)
        }, c.call = function (t, e, n, r) {
            return this.add(i.delayedCall(0, t, e, n), r)
        }, c.set = function (t, e, n) {
            return n = this._parseTimeOrLabel(n, 0, !0), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), this.add(new i(t, 0, e), n)
        }, n.exportRoot = function (t, e) {
            t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var r, a, s = new n(t),
                o = s._timeline;
            for (null == e && (e = !0), o._remove(s, !0), s._startTime = 0, s._rawPrevTime = s._time = s._totalTime = o._time, r = o._first; r;) a = r._next, e && r instanceof i && r.target === r.vars.onComplete || s.add(r, r._startTime - r._delay), r = a;
            return o.add(s, 0), s
        }, c.add = function (r, a, o, l) {
            var h, u, f, c, m, p;
            if ("number" != typeof a && (a = this._parseTimeOrLabel(a, 0, !0, r)), !(r instanceof t)) {
                if (r instanceof Array || r && r.push && s(r)) {
                    for (o = o || "normal", l = l || 0, h = a, u = r.length, f = 0; u > f; f++) s(c = r[f]) && (c = new n({
                        tweens: c
                    })), this.add(c, h), "string" != typeof c && "function" != typeof c && ("sequence" === o ? h = c._startTime + c.totalDuration() / c._timeScale : "start" === o && (c._startTime -= c.delay())), h += l;
                    return this._uncache(!0)
                }
                if ("string" == typeof r) return this.addLabel(r, a);
                if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = i.delayedCall(0, r)
            }
            if (e.prototype.add.call(this, r, a), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (m = this, p = m.rawTime() > r._startTime; m._timeline;) p && m._timeline.smoothChildTiming ? m.totalTime(m._totalTime, !0) : m._gc && m._enabled(!0, !1), m = m._timeline;
            return this
        }, c.remove = function (e) {
            if (e instanceof t) return this._remove(e, !1);
            if (e instanceof Array || e && e.push && s(e)) {
                for (var i = e.length; --i > -1;) this.remove(e[i]);
                return this
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
        }, c._remove = function (t, i) {
            e.prototype._remove.call(this, t, i);
            var n = this._last;
            return n ? this._time > n._startTime + n._totalDuration / n._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, c.append = function (t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }, c.insert = c.insertMultiple = function (t, e, i, n) {
            return this.add(t, e || 0, i, n)
        }, c.appendMultiple = function (t, e, i, n) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
        }, c.addLabel = function (t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e), this
        }, c.addPause = function (t, e, i, n) {
            return this.call(u, ["{self}", e, i, n], this, t)
        }, c.removeLabel = function (t) {
            return delete this._labels[t], this
        }, c.getLabelTime = function (t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }, c._parseTimeOrLabel = function (e, i, n, r) {
            var a;
            if (r instanceof t && r.timeline === this) this.remove(r);
            else if (r && (r instanceof Array || r.push && s(r)))
                for (a = r.length; --a > -1;) r[a] instanceof t && r[a].timeline === this && this.remove(r[a]);
            if ("string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, n);
            if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
            else {
                if (a = e.indexOf("="), -1 === a) return null == this._labels[e] ? n ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                i = parseInt(e.charAt(a - 1) + "1", 10) * Number(e.substr(a + 1)), e = a > 1 ? this._parseTimeOrLabel(e.substr(0, a - 1), 0, n) : this.duration()
            }
            return Number(e) + i
        }, c.seek = function (t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
        }, c.stop = function () {
            return this.paused(!0)
        }, c.gotoAndPlay = function (t, e) {
            return this.play(t, e)
        }, c.gotoAndStop = function (t, e) {
            return this.pause(t, e)
        }, c.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var n, a, s, l, h, u = this._dirty ? this.totalDuration() : this._totalDuration,
                f = this._time,
                c = this._startTime,
                m = this._timeScale,
                p = this._paused;
            if (t >= u ? (this._totalTime = this._time = u, this._reversed || this._hasPausedChild() || (a = !0, l = "onComplete", 0 === this._duration && (0 === t || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (h = !0, this._rawPrevTime > r && (l = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = u + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== f || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (l = "onReverseComplete", a = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (h = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (h = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== f && this._first || i || h) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || o)), this._time >= f)
                    for (n = this._first; n && (s = n._next, !this._paused || p);)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s;
                else
                    for (n = this._last; n && (s = n._prev, !this._paused || p);)(n._active || n._startTime <= f && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s;
                this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || o)), l && (this._gc || (c === this._startTime || m !== this._timeScale) && (0 === this._time || u >= this.totalDuration()) && (a && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[l] && this.vars[l].apply(this.vars[l + "Scope"] || this, this.vars[l + "Params"] || o)))
            }
        }, c._hasPausedChild = function () {
            for (var t = this._first; t;) {
                if (t._paused || t instanceof n && t._hasPausedChild()) return !0;
                t = t._next
            }
            return !1
        }, c.getChildren = function (t, e, n, r) {
            r = r || -9999999999;
            for (var a = [], s = this._first, o = 0; s;) s._startTime < r || (s instanceof i ? e !== !1 && (a[o++] = s) : (n !== !1 && (a[o++] = s), t !== !1 && (a = a.concat(s.getChildren(!0, e, n)), o = a.length))), s = s._next;
            return a
        }, c.getTweensOf = function (t, e) {
            for (var n = i.getTweensOf(t), r = n.length, a = [], s = 0; --r > -1;)(n[r].timeline === this || e && this._contains(n[r])) && (a[s++] = n[r]);
            return a
        }, c._contains = function (t) {
            for (var e = t.timeline; e;) {
                if (e === this) return !0;
                e = e.timeline
            }
            return !1
        }, c.shiftChildren = function (t, e, i) {
            i = i || 0;
            for (var n, r = this._first, a = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
            if (e)
                for (n in a) a[n] >= i && (a[n] += t);
            return this._uncache(!0)
        }, c._kill = function (t, e) {
            if (!t && !e) return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);
            return r
        }, c.clear = function (t) {
            var e = this.getChildren(!1, !0, !0),
                i = e.length;
            for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
            return t !== !1 && (this._labels = {}), this._uncache(!0)
        }, c.invalidate = function () {
            for (var t = this._first; t;) t.invalidate(), t = t._next;
            return this
        }, c._enabled = function (t, i) {
            if (t === this._gc)
                for (var n = this._first; n;) n._enabled(t, !0), n = n._next;
            return e.prototype._enabled.call(this, t, i)
        }, c.duration = function (t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
        }, c.totalDuration = function (t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, i, n = 0, r = this._last, a = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > a && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : a = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), a = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = e;
                    this._duration = this._totalDuration = n, this._dirty = !1
                }
                return this._totalDuration
            }
            return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
        }, c.usesFrames = function () {
            for (var e = this._timeline; e._timeline;) e = e._timeline;
            return e === t._rootFramesTimeline
        }, c.rawTime = function () {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }, n
    }, !0), window._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (t, e, i) {
        var n = function (e) {
            t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
        },
            r = 1e-10,
            a = [],
            s = new i(null, null, 1, 0),
            o = n.prototype = new t;
        return o.constructor = n, o.kill()._gc = !1, n.version = "1.11.8", o.invalidate = function () {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
        }, o.addCallback = function (t, i, n, r) {
            return this.add(e.delayedCall(0, t, n, r), i)
        }, o.removeCallback = function (t, e) {
            if (t)
                if (null == e) this._kill(null, t);
                else
                    for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
            return this
        }, o.tweenTo = function (t, i) {
            i = i || {};
            var n, r, o, l = {
                ease: s,
                overwrite: i.delay ? 2 : 1,
                useFrames: this.usesFrames(),
                immediateRender: !1
            };
            for (r in i) l[r] = i[r];
            return l.time = this._parseTimeOrLabel(t), n = Math.abs(Number(l.time) - this._time) / this._timeScale || .001, o = new e(this, n, l), l.onStart = function () {
                o.target.paused(!0), o.vars.time !== o.target.time() && n === o.duration() && o.duration(Math.abs(o.vars.time - o.target.time()) / o.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || o, i.onStartParams || a)
            }, o
        }, o.tweenFromTo = function (t, e, i) {
            i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [t],
                onCompleteScope: this
            }, i.immediateRender = i.immediateRender !== !1;
            var n = this.tweenTo(e, i);
            return n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001)
        }, o.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var n, s, o, l, h, u, f = this._dirty ? this.totalDuration() : this._totalDuration,
                c = this._duration,
                m = this._time,
                p = this._totalTime,
                _ = this._startTime,
                d = this._timeScale,
                v = this._rawPrevTime,
                g = this._paused,
                y = this._cycle;
            if (t >= f ? (this._locked || (this._totalTime = f, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, l = "onComplete", 0 === this._duration && (0 === t || 0 > v || v === r) && v !== t && this._first && (h = !0, v > r && (l = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = c, t = c + 1e-4)) : 1e-7 > t ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== m || 0 === c && v !== r && (v > 0 || 0 > t && v >= 0) && !this._locked) && (l = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === c && v >= 0 && this._first && (h = !0), this._rawPrevTime = t) : (this._rawPrevTime = c || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (h = !0))) : (0 === c && 0 > v && (h = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (u = c + this._repeatDelay, this._cycle = this._totalTime / u >> 0, 0 !== this._cycle && this._cycle === this._totalTime / u && this._cycle-- , this._time = this._totalTime - this._cycle * u, this._yoyo && 0 !== (1 & this._cycle) && (this._time = c - this._time), this._time > c ? (this._time = c, t = c + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time))), this._cycle !== y && !this._locked) {
                var T = this._yoyo && 0 !== (1 & y),
                    w = T === (this._yoyo && 0 !== (1 & this._cycle)),
                    x = this._totalTime,
                    b = this._cycle,
                    P = this._rawPrevTime,
                    C = this._time;
                if (this._totalTime = y * c, this._cycle < y ? T = !T : this._totalTime += c, this._time = m, this._rawPrevTime = 0 === c ? v - 1e-4 : v, this._cycle = y, this._locked = !0, m = T ? 0 : c, this.render(m, e, 0 === c), e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || a), w && (m = T ? c + 1e-4 : -1e-4, this.render(m, !0, !1)), this._locked = !1, this._paused && !g) return;
                this._time = C, this._totalTime = x, this._cycle = b, this._rawPrevTime = P
            }
            if (!(this._time !== m && this._first || i || h)) return void (p !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || a)));
            if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== p && t > 0 && (this._active = !0), 0 === p && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || a)), this._time >= m)
                for (n = this._first; n && (o = n._next, !this._paused || g);)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o;
            else
                for (n = this._last; n && (o = n._prev, !this._paused || g);)(n._active || n._startTime <= m && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o;
            this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || a)), l && (this._locked || this._gc || (_ === this._startTime || d !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[l] && this.vars[l].apply(this.vars[l + "Scope"] || this, this.vars[l + "Params"] || a)))
        }, o.getActive = function (t, e, i) {
            null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
            var n, r, a = [],
                s = this.getChildren(t, e, i),
                o = 0,
                l = s.length;
            for (n = 0; l > n; n++) r = s[n], r.isActive() && (a[o++] = r);
            return a
        }, o.getLabelAfter = function (t) {
            t || 0 !== t && (t = this._time);
            var e, i = this.getLabelsArray(),
                n = i.length;
            for (e = 0; n > e; e++)
                if (i[e].time > t) return i[e].name;
            return null
        }, o.getLabelBefore = function (t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                if (e[i].time < t) return e[i].name;
            return null
        }, o.getLabelsArray = function () {
            var t, e = [],
                i = 0;
            for (t in this._labels) e[i++] = {
                time: this._labels[t],
                name: t
            };
            return e.sort(function (t, e) {
                return t.time - e.time
            }), e
        }, o.progress = function (t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
        }, o.totalProgress = function (t) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
        }, o.totalDuration = function (e) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        }, o.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
        }, o.repeat = function (t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
        }, o.repeatDelay = function (t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
        }, o.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, o.currentLabel = function (t) {
            return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
        }, n
    }, !0),
        function () {
            var t = 180 / Math.PI,
                e = [],
                i = [],
                n = [],
                r = {},
                a = function (t, e, i, n) {
                    this.a = t, this.b = e, this.c = i, this.d = n, this.da = n - t, this.ca = i - t, this.ba = e - t
                },
                s = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                o = function (t, e, i, n) {
                    var r = {
                        a: t
                    },
                        a = {},
                        s = {},
                        o = {
                            c: n
                        },
                        l = (t + e) / 2,
                        h = (e + i) / 2,
                        u = (i + n) / 2,
                        f = (l + h) / 2,
                        c = (h + u) / 2,
                        m = (c - f) / 8;
                    return r.b = l + (t - l) / 4, a.b = f + m, r.c = a.a = (r.b + a.b) / 2, a.c = s.a = (f + c) / 2, s.b = c - m, o.b = u + (n - u) / 4, s.c = o.a = (s.b + o.b) / 2, [r, a, s, o]
                },
                l = function (t, r, a, s, l) {
                    var h, u, f, c, m, p, _, d, v, g, y, T, w, x = t.length - 1,
                        b = 0,
                        P = t[0].a;
                    for (h = 0; x > h; h++) m = t[b], u = m.a, f = m.d, c = t[b + 1].d, l ? (y = e[h], T = i[h], w = (T + y) * r * .25 / (s ? .5 : n[h] || .5), p = f - (f - u) * (s ? .5 * r : 0 !== y ? w / y : 0), _ = f + (c - f) * (s ? .5 * r : 0 !== T ? w / T : 0), d = f - (p + ((_ - p) * (3 * y / (y + T) + .5) / 4 || 0))) : (p = f - (f - u) * r * .5, _ = f + (c - f) * r * .5, d = f - (p + _) / 2), p += d, _ += d, m.c = v = p, m.b = 0 !== h ? P : P = m.a + .6 * (m.c - m.a), m.da = f - u, m.ca = v - u, m.ba = P - u, a ? (g = o(u, P, v, f), t.splice(b, 1, g[0], g[1], g[2], g[3]), b += 4) : b++ , P = _;
                    m = t[b], m.b = P, m.c = P + .4 * (m.d - P), m.da = m.d - m.a, m.ca = m.c - m.a, m.ba = P - m.a, a && (g = o(m.a, P, m.c, m.d), t.splice(b, 1, g[0], g[1], g[2], g[3]))
                },
                h = function (t, n, r, s) {
                    var o, l, h, u, f, c, m = [];
                    if (s)
                        for (t = [s].concat(t), l = t.length; --l > -1;) "string" == typeof (c = t[l][n]) && "=" === c.charAt(1) && (t[l][n] = s[n] + Number(c.charAt(0) + c.substr(2)));
                    if (o = t.length - 2, 0 > o) return m[0] = new a(t[0][n], 0, 0, t[-1 > o ? 0 : 1][n]), m;
                    for (l = 0; o > l; l++) h = t[l][n], u = t[l + 1][n], m[l] = new a(h, 0, 0, u), r && (f = t[l + 2][n], e[l] = (e[l] || 0) + (u - h) * (u - h), i[l] = (i[l] || 0) + (f - u) * (f - u));
                    return m[l] = new a(t[l][n], 0, 0, t[l + 1][n]), m
                },
                u = function (t, a, o, u, f, c) {
                    var m, p, _, d, v, g, y, T, w = {},
                        x = [],
                        b = c || t[0];
                    f = "string" == typeof f ? "," + f + "," : s, null == a && (a = 1);
                    for (p in t[0]) x.push(p);
                    if (t.length > 1) {
                        for (T = t[t.length - 1], y = !0, m = x.length; --m > -1;)
                            if (p = x[m], Math.abs(b[p] - T[p]) > .05) {
                                y = !1;
                                break
                            }
                        y && (t = t.concat(), c && t.unshift(c), t.push(t[1]), c = t[t.length - 3])
                    }
                    for (e.length = i.length = n.length = 0, m = x.length; --m > -1;) p = x[m], r[p] = -1 !== f.indexOf("," + p + ","), w[p] = h(t, p, r[p], c);
                    for (m = e.length; --m > -1;) e[m] = Math.sqrt(e[m]), i[m] = Math.sqrt(i[m]);
                    if (!u) {
                        for (m = x.length; --m > -1;)
                            if (r[p])
                                for (_ = w[x[m]], g = _.length - 1, d = 0; g > d; d++) v = _[d + 1].da / i[d] + _[d].da / e[d], n[d] = (n[d] || 0) + v * v;
                        for (m = n.length; --m > -1;) n[m] = Math.sqrt(n[m])
                    }
                    for (m = x.length, d = o ? 4 : 1; --m > -1;) p = x[m], _ = w[p], l(_, a, o, u, r[p]), y && (_.splice(0, d), _.splice(_.length - d, d));
                    return w
                },
                f = function (t, e, i) {
                    e = e || "soft";
                    var n, r, s, o, l, h, u, f, c, m, p, _ = {},
                        d = "cubic" === e ? 3 : 2,
                        v = "soft" === e,
                        g = [];
                    if (v && i && (t = [i].concat(t)), null == t || t.length < d + 1) throw "invalid Bezier data";
                    for (c in t[0]) g.push(c);
                    for (h = g.length; --h > -1;) {
                        for (c = g[h], _[c] = l = [], m = 0, f = t.length, u = 0; f > u; u++) n = null == i ? t[u][c] : "string" == typeof (p = t[u][c]) && "=" === p.charAt(1) ? i[c] + Number(p.charAt(0) + p.substr(2)) : Number(p), v && u > 1 && f - 1 > u && (l[m++] = (n + l[m - 2]) / 2), l[m++] = n;
                        for (f = m - d + 1, m = 0, u = 0; f > u; u += d) n = l[u], r = l[u + 1], s = l[u + 2], o = 2 === d ? 0 : l[u + 3], l[m++] = p = 3 === d ? new a(n, r, s, o) : new a(n, (2 * r + n) / 3, (2 * r + s) / 3, s);
                        l.length = m
                    }
                    return _
                },
                c = function (t, e, i) {
                    for (var n, r, a, s, o, l, h, u, f, c, m, p = 1 / i, _ = t.length; --_ > -1;)
                        for (c = t[_], a = c.a, s = c.d - a, o = c.c - a, l = c.b - a, n = r = 0, u = 1; i >= u; u++) h = p * u, f = 1 - h, n = r - (r = (h * h * s + 3 * f * (h * o + f * l)) * h), m = _ * i + u - 1, e[m] = (e[m] || 0) + n * n
                },
                m = function (t, e) {
                    e = e >> 0 || 6;
                    var i, n, r, a, s = [],
                        o = [],
                        l = 0,
                        h = 0,
                        u = e - 1,
                        f = [],
                        m = [];
                    for (i in t) c(t[i], s, e);
                    for (r = s.length, n = 0; r > n; n++) l += Math.sqrt(s[n]), a = n % e, m[a] = l, a === u && (h += l, a = n / e >> 0, f[a] = m, o[a] = h, l = 0, m = []);
                    return {
                        length: h,
                        lengths: o,
                        segments: f
                    }
                },
                p = window._gsDefine.plugin({
                    propName: "bezier",
                    priority: -1,
                    version: "1.3.2",
                    API: 2,
                    global: !0,
                    init: function (t, e, i) {
                        this._target = t, e instanceof Array && (e = {
                            values: e
                        }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                        var n, r, a, s, o, l = e.values || [],
                            h = {},
                            c = l[0],
                            p = e.autoRotate || i.vars.orientToBezier;
                        this._autoRotate = p ? p instanceof Array ? p : [
                            ["x", "y", "rotation", p === !0 ? 0 : Number(p) || 0]
                        ] : null;
                        for (n in c) this._props.push(n);
                        for (a = this._props.length; --a > -1;) n = this._props[a], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof t[n], h[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), o || h[n] !== l[0][n] && (o = h);
                        if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : f(l, e.type, h), this._segCount = this._beziers[n].length, this._timeRes) {
                            var _ = m(this._beziers, this._timeRes);
                            this._length = _.length, this._lengths = _.lengths, this._segments = _.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                        }
                        if (p = this._autoRotate)
                            for (this._initialRotations = [], p[0] instanceof Array || (this._autoRotate = p = [p]), a = p.length; --a > -1;) {
                                for (s = 0; 3 > s; s++) n = p[a][s], this._func[n] = "function" == typeof t[n] ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)] : !1;
                                n = p[a][2], this._initialRotations[a] = this._func[n] ? this._func[n].call(this._target) : this._target[n]
                            }
                        return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                    },
                    set: function (e) {
                        var i, n, r, a, s, o, l, h, u, f, c = this._segCount,
                            m = this._func,
                            p = this._target,
                            _ = e !== this._startRatio;
                        if (this._timeRes) {
                            if (u = this._lengths, f = this._curSeg, e *= this._length, r = this._li, e > this._l2 && c - 1 > r) {
                                for (h = c - 1; h > r && (this._l2 = u[++r]) <= e;);
                                this._l1 = u[r - 1], this._li = r, this._curSeg = f = this._segments[r], this._s2 = f[this._s1 = this._si = 0]
                            } else if (e < this._l1 && r > 0) {
                                for (; r > 0 && (this._l1 = u[--r]) >= e;);
                                0 === r && e < this._l1 ? this._l1 = 0 : r++ , this._l2 = u[r], this._li = r, this._curSeg = f = this._segments[r], this._s1 = f[(this._si = f.length - 1) - 1] || 0, this._s2 = f[this._si]
                            }
                            if (i = r, e -= this._l1, r = this._si, e > this._s2 && r < f.length - 1) {
                                for (h = f.length - 1; h > r && (this._s2 = f[++r]) <= e;);
                                this._s1 = f[r - 1], this._si = r
                            } else if (e < this._s1 && r > 0) {
                                for (; r > 0 && (this._s1 = f[--r]) >= e;);
                                0 === r && e < this._s1 ? this._s1 = 0 : r++ , this._s2 = f[r], this._si = r
                            }
                            o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                        } else i = 0 > e ? 0 : e >= 1 ? c - 1 : c * e >> 0, o = (e - i * (1 / c)) * c;
                        for (n = 1 - o, r = this._props.length; --r > -1;) a = this._props[r], s = this._beziers[a][i], l = (o * o * s.da + 3 * n * (o * s.ca + n * s.ba)) * o + s.a, this._round[a] && (l = Math.round(l)), m[a] ? p[a](l) : p[a] = l;
                        if (this._autoRotate) {
                            var d, v, g, y, T, w, x, b = this._autoRotate;
                            for (r = b.length; --r > -1;) a = b[r][2], w = b[r][3] || 0, x = b[r][4] === !0 ? 1 : t, s = this._beziers[b[r][0]], d = this._beziers[b[r][1]], s && d && (s = s[i], d = d[i], v = s.a + (s.b - s.a) * o, y = s.b + (s.c - s.b) * o, v += (y - v) * o, y += (s.c + (s.d - s.c) * o - y) * o, g = d.a + (d.b - d.a) * o, T = d.b + (d.c - d.b) * o, g += (T - g) * o, T += (d.c + (d.d - d.c) * o - T) * o, l = _ ? Math.atan2(T - g, y - v) * x + w : this._initialRotations[r], m[a] ? p[a](l) : p[a] = l)
                        }
                    }
                }),
                _ = p.prototype;
            p.bezierThrough = u, p.cubicToQuadratic = o, p._autoCSS = !0, p.quadraticToCubic = function (t, e, i) {
                return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
            }, p._cssRegister = function () {
                var t = window._gsDefine.globals.CSSPlugin;
                if (t) {
                    var e = t._internals,
                        i = e._parseToProxy,
                        n = e._setPluginRatio,
                        r = e.CSSPropTween;
                    e._registerComplexSpecialProp("bezier", {
                        parser: function (t, e, a, s, o, l) {
                            e instanceof Array && (e = {
                                values: e
                            }), l = new p;
                            var h, u, f, c = e.values,
                                m = c.length - 1,
                                _ = [],
                                d = {};
                            if (0 > m) return o;
                            for (h = 0; m >= h; h++) f = i(t, c[h], s, o, l, m !== h), _[h] = f.end;
                            for (u in e) d[u] = e[u];
                            return d.values = _, o = new r(t, "bezier", 0, 0, f.pt, 2), o.data = f, o.plugin = l, o.setRatio = n, 0 === d.autoRotate && (d.autoRotate = !0), !d.autoRotate || d.autoRotate instanceof Array || (h = d.autoRotate === !0 ? 0 : Number(d.autoRotate), d.autoRotate = null != f.end.left ? [
                                ["left", "top", "rotation", h, !1]
                            ] : null != f.end.x ? [
                                ["x", "y", "rotation", h, !1]
                            ] : !1), d.autoRotate && (s._transform || s._enableTransforms(!1), f.autoRotate = s._target._gsTransform), l._onInitTween(f.proxy, d, s._tween), o
                        }
                    })
                }
            }, _._roundProps = function (t, e) {
                for (var i = this._overwriteProps, n = i.length; --n > -1;)(t[i[n]] || t.bezier || t.bezierThrough) && (this._round[i[n]] = e)
            }, _._kill = function (t) {
                var e, i, n = this._props;
                for (e in this._beziers)
                    if (e in t)
                        for (delete this._beziers[e], delete this._func[e], i = n.length; --i > -1;) n[i] === e && n.splice(i, 1);
                return this._super._kill.call(this, t)
            }
        }(), window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t, e) {
            var i, n, r, a, s = function () {
                t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = s.prototype.setRatio
            },
                o = {},
                l = s.prototype = new t("css");
            l.constructor = s, s.version = "1.11.8", s.API = 2, s.defaultTransformPerspective = 0, s.defaultSkewType = "compensated", l = "px", s.suffixMap = {
                top: l,
                right: l,
                bottom: l,
                left: l,
                width: l,
                height: l,
                fontSize: l,
                padding: l,
                margin: l,
                perspective: l,
                lineHeight: ""
            };
            var h, u, f, c, m, p, _ = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                d = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                g = /[^\d\-\.]/g,
                y = /(?:\d|\-|\+|=|#|\.)*/g,
                T = /opacity *= *([^)]*)/,
                w = /opacity:([^;]*)/,
                x = /alpha\(opacity *=.+?\)/i,
                b = /^(rgb|hsl)/,
                P = /([A-Z])/g,
                C = /-([a-z])/gi,
                S = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                k = function (t, e) {
                    return e.toUpperCase()
                },
                A = /(?:Left|Right|Width)/i,
                R = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                D = /,(?=[^\)]*(?:\(|$))/gi,
                M = Math.PI / 180,
                X = 180 / Math.PI,
                F = {},
                $ = document,
                L = $.createElement("div"),
                Y = $.createElement("img"),
                I = s._internals = {
                    _specialProps: o
                },
                z = navigator.userAgent,
                N = function () {
                    var t, e = z.indexOf("Android"),
                        i = $.createElement("div");
                    return f = -1 !== z.indexOf("Safari") && -1 === z.indexOf("Chrome") && (-1 === e || Number(z.substr(e + 8, 1)) > 3), m = f && Number(z.substr(z.indexOf("Version/") + 8, 1)) < 6, c = -1 !== z.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(z) && (p = parseFloat(RegExp.$1)), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", t = i.getElementsByTagName("a")[0], t ? /^0.55/.test(t.style.opacity) : !1
                }(),
                E = function (t) {
                    return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                },
                B = function (t) {
                    window.console && console.log(t)
                },
                Z = "",
                U = "",
                j = function (t, e) {
                    e = e || L;
                    var i, n, r = e.style;
                    if (void 0 !== r[t]) return t;
                    for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];);
                    return n >= 0 ? (U = 3 === n ? "ms" : i[n], Z = "-" + U.toLowerCase() + "-", U + t) : null
                },
                V = $.defaultView ? $.defaultView.getComputedStyle : function () { },
                q = s.getStyle = function (t, e, i, n, r) {
                    var a;
                    return N || "opacity" !== e ? (!n && t.style[e] ? a = t.style[e] : (i = i || V(t, null)) ? a = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(P, "-$1").toLowerCase()) : t.currentStyle && (a = t.currentStyle[e]), null == r || a && "none" !== a && "auto" !== a && "auto auto" !== a ? a : r) : E(t)
                },
                W = I.convertToPixels = function (t, i, n, r, a) {
                    if ("px" === r || !r) return n;
                    if ("auto" === r || !n) return 0;
                    var o, l, h, u = A.test(i),
                        f = t,
                        c = L.style,
                        m = 0 > n;
                    if (m && (n = -n), "%" === r && -1 !== i.indexOf("border")) o = n / 100 * (u ? t.clientWidth : t.clientHeight);
                    else {
                        if (c.cssText = "border:0 solid red;position:" + q(t, "position") + ";line-height:0;", "%" !== r && f.appendChild) c[u ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                        else {
                            if (f = t.parentNode || $.body, l = f._gsCache, h = e.ticker.frame, l && u && l.time === h) return l.width * n / 100;
                            c[u ? "width" : "height"] = n + r
                        }
                        f.appendChild(L), o = parseFloat(L[u ? "offsetWidth" : "offsetHeight"]), f.removeChild(L), u && "%" === r && s.cacheWidths !== !1 && (l = f._gsCache = f._gsCache || {}, l.time = h, l.width = o / n * 100), 0 !== o || a || (o = W(t, i, n, r, !0))
                    }
                    return m ? -o : o
                },
                K = I.calculateOffset = function (t, e, i) {
                    if ("absolute" !== q(t, "position", i)) return 0;
                    var n = "left" === e ? "Left" : "Top",
                        r = q(t, "margin" + n, i);
                    return t["offset" + n] - (W(t, e, parseFloat(r), r.replace(y, "")) || 0)
                },
                G = function (t, e) {
                    var i, n, r = {};
                    if (e = e || V(t, null))
                        if (i = e.length)
                            for (; --i > -1;) r[e[i].replace(C, k)] = e.getPropertyValue(e[i]);
                        else
                            for (i in e) r[i] = e[i];
                    else if (e = t.currentStyle || t.style)
                        for (i in e) "string" == typeof i && void 0 === r[i] && (r[i.replace(C, k)] = e[i]);
                    return N || (r.opacity = E(t)), n = Pe(t, e, !1), r.rotation = n.rotation, r.skewX = n.skewX, r.scaleX = n.scaleX, r.scaleY = n.scaleY, r.x = n.x, r.y = n.y, xe && (r.z = n.z, r.rotationX = n.rotationX, r.rotationY = n.rotationY, r.scaleZ = n.scaleZ), r.filters && delete r.filters, r
                },
                H = function (t, e, i, n, r) {
                    var a, s, o, l = {},
                        h = t.style;
                    for (s in i) "cssText" !== s && "length" !== s && isNaN(s) && (e[s] !== (a = i[s]) || r && r[s]) && -1 === s.indexOf("Origin") && ("number" == typeof a || "string" == typeof a) && (l[s] = "auto" !== a || "left" !== s && "top" !== s ? "" !== a && "auto" !== a && "none" !== a || "string" != typeof e[s] || "" === e[s].replace(g, "") ? a : 0 : K(t, s), void 0 !== h[s] && (o = new fe(h, s, h[s], o)));
                    if (n)
                        for (s in n) "className" !== s && (l[s] = n[s]);
                    return {
                        difs: l,
                        firstMPT: o
                    }
                },
                Q = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                J = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                te = function (t, e, i) {
                    var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                        r = Q[e],
                        a = r.length;
                    for (i = i || V(t, null); --a > -1;) n -= parseFloat(q(t, "padding" + r[a], i, !0)) || 0, n -= parseFloat(q(t, "border" + r[a] + "Width", i, !0)) || 0;
                    return n
                },
                ee = function (t, e) {
                    (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                    var i = t.split(" "),
                        n = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                        r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                    return null == r ? r = "0" : "center" === r && (r = "50%"), ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"), e && (e.oxp = -1 !== n.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === n.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(n.replace(g, "")), e.oy = parseFloat(r.replace(g, ""))), n + " " + r + (i.length > 2 ? " " + i[2] : "")
                },
                ie = function (t, e) {
                    return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                },
                ne = function (t, e) {
                    return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * Number(t.substr(2)) + e : parseFloat(t)
                },
                re = function (t, e, i, n) {
                    var r, a, s, o, l = 1e-6;
                    return null == t ? o = e : "number" == typeof t ? o = t : (r = 360, a = t.split("_"), s = Number(a[0].replace(g, "")) * (-1 === t.indexOf("rad") ? 1 : X) - ("=" === t.charAt(1) ? 0 : e), a.length && (n && (n[i] = e + s), -1 !== t.indexOf("short") && (s %= r, s !== s % (r / 2) && (s = 0 > s ? s + r : s - r)), -1 !== t.indexOf("_cw") && 0 > s ? s = (s + 9999999999 * r) % r - (s / r | 0) * r : -1 !== t.indexOf("ccw") && s > 0 && (s = (s - 9999999999 * r) % r - (s / r | 0) * r)), o = e + s), l > o && o > -l && (o = 0), o
                },
                ae = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                se = function (t, e, i) {
                    return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 255 * (1 > 6 * t ? e + (i - e) * t * 6 : .5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
                },
                oe = function (t) {
                    var e, i, n, r, a, s;
                    return t && "" !== t ? "number" == typeof t ? [t >> 16, t >> 8 & 255, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ae[t] ? ae[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), n = t.charAt(3), t = "#" + e + e + i + i + n + n), t = parseInt(t.substr(1), 16), [t >> 16, t >> 8 & 255, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(_), r = Number(t[0]) % 360 / 360, a = Number(t[1]) / 100, s = Number(t[2]) / 100, i = .5 >= s ? s * (a + 1) : s + a - s * a, e = 2 * s - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = se(r + 1 / 3, e, i), t[1] = se(r, e, i), t[2] = se(r - 1 / 3, e, i), t) : (t = t.match(_) || ae.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : ae.black
                },
                le = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
            for (l in ae) le += "|" + l + "\\b";
            le = new RegExp(le + ")", "gi");
            var he = function (t, e, i, n) {
                if (null == t) return function (t) {
                    return t
                };
                var r, a = e ? (t.match(le) || [""])[0] : "",
                    s = t.split(a).join("").match(v) || [],
                    o = t.substr(0, t.indexOf(s[0])),
                    l = ")" === t.charAt(t.length - 1) ? ")" : "",
                    h = -1 !== t.indexOf(" ") ? " " : ",",
                    u = s.length,
                    f = u > 0 ? s[0].replace(_, "") : "";
                return u ? r = e ? function (t) {
                    var e, c, m, p;
                    if ("number" == typeof t) t += f;
                    else if (n && D.test(t)) {
                        for (p = t.replace(D, "|").split("|"), m = 0; m < p.length; m++) p[m] = r(p[m]);
                        return p.join(",")
                    }
                    if (e = (t.match(le) || [a])[0], c = t.split(e).join("").match(v) || [], m = c.length, u > m--)
                        for (; ++m < u;) c[m] = i ? c[(m - 1) / 2 | 0] : s[m];
                    return o + c.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
                } : function (t) {
                    var e, a, c;
                    if ("number" == typeof t) t += f;
                    else if (n && D.test(t)) {
                        for (a = t.replace(D, "|").split("|"), c = 0; c < a.length; c++) a[c] = r(a[c]);
                        return a.join(",")
                    }
                    if (e = t.match(v) || [], c = e.length, u > c--)
                        for (; ++c < u;) e[c] = i ? e[(c - 1) / 2 | 0] : s[c];
                    return o + e.join(h) + l
                } : function (t) {
                    return t
                }
            },
                ue = function (t) {
                    return t = t.split(","),
                        function (e, i, n, r, a, s, o) {
                            var l, h = (i + "").split(" ");
                            for (o = {}, l = 0; 4 > l; l++) o[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                            return r.parse(e, o, a, s)
                        }
                },
                fe = (I._setPluginRatio = function (t) {
                    this.plugin.setRatio(t);
                    for (var e, i, n, r, a = this.data, s = a.proxy, o = a.firstMPT, l = 1e-6; o;) e = s[o.v], o.r ? e = Math.round(e) : l > e && e > -l && (e = 0), o.t[o.p] = e, o = o._next;
                    if (a.autoRotate && (a.autoRotate.rotation = s.rotation), 1 === t)
                        for (o = a.firstMPT; o;) {
                            if (i = o.t, i.type) {
                                if (1 === i.type) {
                                    for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                    i.e = r
                                }
                            } else i.e = i.s + i.xs0;
                            o = o._next
                        }
                }, function (t, e, i, n, r) {
                    this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
                }),
                ce = (I._parseToProxy = function (t, e, i, n, r, a) {
                    var s, o, l, h, u, f = n,
                        c = {},
                        m = {},
                        p = i._transform,
                        _ = F;
                    for (i._transform = null, F = e, n = u = i.parse(t, e, n, r), F = _, a && (i._transform = p, f && (f._prev = null, f._prev && (f._prev._next = null))); n && n !== f;) {
                        if (n.type <= 1 && (o = n.p, m[o] = n.s + n.c, c[o] = n.s, a || (h = new fe(n, "s", o, h, n.r), n.c = 0), 1 === n.type))
                            for (s = n.l; --s > 0;) l = "xn" + s, o = n.p + "_" + l, m[o] = n.data[l], c[o] = n[l], a || (h = new fe(n, l, o, h, n.rxp[l]));
                        n = n._next
                    }
                    return {
                        proxy: c,
                        end: m,
                        firstMPT: h,
                        pt: u
                    }
                }, I.CSSPropTween = function (t, e, n, r, s, o, l, h, u, f, c) {
                    this.t = t, this.p = e, this.s = n, this.c = r, this.n = l || e, t instanceof ce || a.push(this.n), this.r = h, this.type = o || 0, u && (this.pr = u, i = !0), this.b = void 0 === f ? n : f, this.e = void 0 === c ? n + r : c, s && (this._next = s, s._prev = this)
                }),
                me = s.parseComplex = function (t, e, i, n, r, a, s, o, l, u) {
                    i = i || a || "", s = new ce(t, e, 0, 0, s, u ? 2 : 1, null, !1, o, i, n), n += "";
                    var f, c, m, p, v, g, y, T, w, x, P, C, S = i.split(", ").join(",").split(" "),
                        k = n.split(", ").join(",").split(" "),
                        A = S.length,
                        R = h !== !1;
                    for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (S = S.join(" ").replace(D, ", ").split(" "), k = k.join(" ").replace(D, ", ").split(" "), A = S.length), A !== k.length && (S = (a || "").split(" "), A = S.length), s.plugin = l, s.setRatio = u, f = 0; A > f; f++)
                        if (p = S[f], v = k[f], T = parseFloat(p), T || 0 === T) s.appendXtra("", T, ie(v, T), v.replace(d, ""), R && -1 !== v.indexOf("px"), !0);
                        else if (r && ("#" === p.charAt(0) || ae[p] || b.test(p))) C = "," === v.charAt(v.length - 1) ? ")," : ")", p = oe(p), v = oe(v), w = p.length + v.length > 6, w && !N && 0 === v[3] ? (s["xs" + s.l] += s.l ? " transparent" : "transparent", s.e = s.e.split(k[f]).join("transparent")) : (N || (w = !1), s.appendXtra(w ? "rgba(" : "rgb(", p[0], v[0] - p[0], ",", !0, !0).appendXtra("", p[1], v[1] - p[1], ",", !0).appendXtra("", p[2], v[2] - p[2], w ? "," : C, !0), w && (p = p.length < 4 ? 1 : p[3], s.appendXtra("", p, (v.length < 4 ? 1 : v[3]) - p, C, !1)));
                        else if (g = p.match(_)) {
                            if (y = v.match(d), !y || y.length !== g.length) return s;
                            for (m = 0, c = 0; c < g.length; c++) P = g[c], x = p.indexOf(P, m), s.appendXtra(p.substr(m, x - m), Number(P), ie(y[c], P), "", R && "px" === p.substr(x + P.length, 2), 0 === c), m = x + P.length;
                            s["xs" + s.l] += p.substr(m)
                        } else s["xs" + s.l] += s.l ? " " + p : p;
                    if (-1 !== n.indexOf("=") && s.data) {
                        for (C = s.xs0 + s.data.s, f = 1; f < s.l; f++) C += s["xs" + f] + s.data["xn" + f];
                        s.e = C + s["xs" + f]
                    }
                    return s.l || (s.type = -1, s.xs0 = s.e), s.xfirst || s
                },
                pe = 9;
            for (l = ce.prototype, l.l = l.pr = 0; --pe > 0;) l["xn" + pe] = 0, l["xs" + pe] = "";
            l.xs0 = "", l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null, l.appendXtra = function (t, e, i, n, r, a) {
                var s = this,
                    o = s.l;
                return s["xs" + o] += a && o ? " " + t : t || "", i || 0 === o || s.plugin ? (s.l++ , s.type = s.setRatio ? 2 : 1, s["xs" + s.l] = n || "", o > 0 ? (s.data["xn" + o] = e + i, s.rxp["xn" + o] = r, s["xn" + o] = e, s.plugin || (s.xfirst = new ce(s, "xn" + o, e, i, s.xfirst || s, 0, s.n, r, s.pr), s.xfirst.xs0 = 0), s) : (s.data = {
                    s: e + i
                }, s.rxp = {}, s.s = e, s.c = i, s.r = r, s)) : (s["xs" + o] += e + (n || ""), s)
            };
            var _e = function (t, e) {
                e = e || {}, this.p = e.prefix ? j(t) || t : t, o[t] = o[this.p] = this, this.format = e.formatter || he(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
            },
                de = I._registerComplexSpecialProp = function (t, e, i) {
                    "object" != typeof e && (e = {
                        parser: i
                    });
                    var n, r, a = t.split(","),
                        s = e.defaultValue;
                    for (i = i || [s], n = 0; n < a.length; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || s, r = new _e(a[n], e)
                },
                ve = function (t) {
                    if (!o[t]) {
                        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                        de(t, {
                            parser: function (t, i, n, r, a, s, l) {
                                var h = (window.GreenSockGlobals || window).com.greensock.plugins[e];
                                return h ? (h._cssRegister(), o[n].parse(t, i, n, r, a, s, l)) : (B("Error: " + e + " js file not loaded."), a)
                            }
                        })
                    }
                };
            l = _e.prototype, l.parseComplex = function (t, e, i, n, r, a) {
                var s, o, l, h, u, f, c = this.keyword;
                if (this.multi && (D.test(i) || D.test(e) ? (o = e.replace(D, "|").split("|"), l = i.replace(D, "|").split("|")) : c && (o = [e], l = [i])), l) {
                    for (h = l.length > o.length ? l.length : o.length, s = 0; h > s; s++) e = o[s] = o[s] || this.dflt, i = l[s] = l[s] || this.dflt, c && (u = e.indexOf(c), f = i.indexOf(c), u !== f && (i = -1 === f ? l : o, i[s] += " " + c));
                    e = o.join(", "), i = l.join(", ")
                }
                return me(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, a)
            }, l.parse = function (t, e, i, n, a, s) {
                return this.parseComplex(t.style, this.format(q(t, this.p, r, !1, this.dflt)), this.format(e), a, s)
            }, s.registerSpecialProp = function (t, e, i) {
                de(t, {
                    parser: function (t, n, r, a, s, o) {
                        var l = new ce(t, r, 0, 0, s, 2, r, !1, i);
                        return l.plugin = o, l.setRatio = e(t, n, a._tween, r), l
                    },
                    priority: i
                })
            };
            var ge = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective".split(","),
                ye = j("transform"),
                Te = Z + "transform",
                we = j("transformOrigin"),
                xe = null !== j("perspective"),
                be = I.Transform = function () {
                    this.skewY = 0
                },
                Pe = I.getTransform = function (t, e, i, n) {
                    if (t._gsTransform && i && !n) return t._gsTransform;
                    var r, a, o, l, h, u, f, c, m, p, _, d, v, g = i ? t._gsTransform || new be : new be,
                        y = g.scaleX < 0,
                        T = 2e-5,
                        w = 1e5,
                        x = 179.99,
                        b = x * M,
                        P = xe ? parseFloat(q(t, we, e, !1, "0 0 0").split(" ")[2]) || g.zOrigin || 0 : 0;
                    for (ye ? r = q(t, Te, e, !0) : t.currentStyle && (r = t.currentStyle.filter.match(R), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), g.x || 0, g.y || 0].join(",") : ""), a = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], o = a.length; --o > -1;) l = Number(a[o]), a[o] = (h = l - (l |= 0)) ? (h * w + (0 > h ? -.5 : .5) | 0) / w + l : l;
                    if (16 === a.length) {
                        var C = a[8],
                            S = a[9],
                            k = a[10],
                            A = a[12],
                            O = a[13],
                            D = a[14];
                        if (g.zOrigin && (D = -g.zOrigin, A = C * D - a[12], O = S * D - a[13], D = k * D + g.zOrigin - a[14]), !i || n || null == g.rotationX) {
                            var F, $, L, Y, I, z, N, E = a[0],
                                B = a[1],
                                Z = a[2],
                                U = a[3],
                                j = a[4],
                                V = a[5],
                                W = a[6],
                                K = a[7],
                                G = a[11],
                                H = Math.atan2(W, k),
                                Q = -b > H || H > b;
                            g.rotationX = H * X, H && (Y = Math.cos(-H), I = Math.sin(-H), F = j * Y + C * I, $ = V * Y + S * I, L = W * Y + k * I, C = j * -I + C * Y, S = V * -I + S * Y, k = W * -I + k * Y, G = K * -I + G * Y, j = F, V = $, W = L), H = Math.atan2(C, E), g.rotationY = H * X, H && (z = -b > H || H > b, Y = Math.cos(-H), I = Math.sin(-H), F = E * Y - C * I, $ = B * Y - S * I, L = Z * Y - k * I, S = B * I + S * Y, k = Z * I + k * Y, G = U * I + G * Y, E = F, B = $, Z = L), H = Math.atan2(B, V), g.rotation = H * X, H && (N = -b > H || H > b, Y = Math.cos(-H), I = Math.sin(-H), E = E * Y + j * I, $ = B * Y + V * I, V = B * -I + V * Y, W = Z * -I + W * Y, B = $), N && Q ? g.rotation = g.rotationX = 0 : N && z ? g.rotation = g.rotationY = 0 : z && Q && (g.rotationY = g.rotationX = 0), g.scaleX = (Math.sqrt(E * E + B * B) * w + .5 | 0) / w, g.scaleY = (Math.sqrt(V * V + S * S) * w + .5 | 0) / w, g.scaleZ = (Math.sqrt(W * W + k * k) * w + .5 | 0) / w, g.skewX = 0, g.perspective = G ? 1 / (0 > G ? -G : G) : 0, g.x = A, g.y = O, g.z = D
                        }
                    } else if (!(xe && !n && a.length && g.x === a[4] && g.y === a[5] && (g.rotationX || g.rotationY) || void 0 !== g.x && "none" === q(t, "display", e))) {
                        var J = a.length >= 6,
                            te = J ? a[0] : 1,
                            ee = a[1] || 0,
                            ie = a[2] || 0,
                            ne = J ? a[3] : 1;
                        g.x = a[4] || 0, g.y = a[5] || 0, u = Math.sqrt(te * te + ee * ee), f = Math.sqrt(ne * ne + ie * ie), c = te || ee ? Math.atan2(ee, te) * X : g.rotation || 0, m = ie || ne ? Math.atan2(ie, ne) * X + c : g.skewX || 0, p = u - Math.abs(g.scaleX || 0), _ = f - Math.abs(g.scaleY || 0), Math.abs(m) > 90 && Math.abs(m) < 270 && (y ? (u *= -1, m += 0 >= c ? 180 : -180, c += 0 >= c ? 180 : -180) : (f *= -1, m += 0 >= m ? 180 : -180)), d = (c - g.rotation) % 180, v = (m - g.skewX) % 180, (void 0 === g.skewX || p > T || -T > p || _ > T || -T > _ || d > -x && x > d && d * w | !1 || v > -x && x > v && v * w | !1) && (g.scaleX = u, g.scaleY = f, g.rotation = c, g.skewX = m), xe && (g.rotationX = g.rotationY = g.z = 0, g.perspective = parseFloat(s.defaultTransformPerspective) || 0, g.scaleZ = 1)
                    }
                    g.zOrigin = P;
                    for (o in g) g[o] < T && g[o] > -T && (g[o] = 0);
                    return i && (t._gsTransform = g), g
                },
                Ce = function (t) {
                    var e, i, n = this.data,
                        r = -n.rotation * M,
                        a = r + n.skewX * M,
                        s = 1e5,
                        o = (Math.cos(r) * n.scaleX * s | 0) / s,
                        l = (Math.sin(r) * n.scaleX * s | 0) / s,
                        h = (Math.sin(a) * -n.scaleY * s | 0) / s,
                        u = (Math.cos(a) * n.scaleY * s | 0) / s,
                        f = this.t.style,
                        c = this.t.currentStyle;
                    if (c) {
                        i = l, l = -h, h = -i, e = c.filter, f.filter = "";
                        var m, _, d = this.t.offsetWidth,
                            v = this.t.offsetHeight,
                            g = "absolute" !== c.position,
                            w = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + h + ", M22=" + u,
                            x = n.x,
                            b = n.y;
                        if (null != n.ox && (m = (n.oxp ? d * n.ox * .01 : n.ox) - d / 2, _ = (n.oyp ? v * n.oy * .01 : n.oy) - v / 2, x += m - (m * o + _ * l), b += _ - (m * h + _ * u)), g ? (m = d / 2, _ = v / 2, w += ", Dx=" + (m - (m * o + _ * l) + x) + ", Dy=" + (_ - (m * h + _ * u) + b) + ")") : w += ", sizingMethod='auto expand')", f.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(O, w) : w + " " + e, (0 === t || 1 === t) && 1 === o && 0 === l && 0 === h && 1 === u && (g && -1 === w.indexOf("Dx=0, Dy=0") || T.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(" && e.indexOf("Alpha")) && f.removeAttribute("filter")), !g) {
                            var P, C, S, k = 8 > p ? 1 : -1;
                            for (m = n.ieOffsetX || 0, _ = n.ieOffsetY || 0, n.ieOffsetX = Math.round((d - ((0 > o ? -o : o) * d + (0 > l ? -l : l) * v)) / 2 + x), n.ieOffsetY = Math.round((v - ((0 > u ? -u : u) * v + (0 > h ? -h : h) * d)) / 2 + b), pe = 0; 4 > pe; pe++) C = J[pe], P = c[C], i = -1 !== P.indexOf("px") ? parseFloat(P) : W(this.t, C, parseFloat(P), P.replace(y, "")) || 0, S = i !== n[C] ? 2 > pe ? -n.ieOffsetX : -n.ieOffsetY : 2 > pe ? m - n.ieOffsetX : _ - n.ieOffsetY, f[C] = (n[C] = Math.round(i - S * (0 === pe || 2 === pe ? 1 : k))) + "px"
                        }
                    }
                },
                Se = I.set3DTransformRatio = function () {
                    var t, e, i, n, r, a, s, o, l, h, u, f, m, p, _, d, v, g, y, T, w, x, b, P = this.data,
                        C = this.t.style,
                        S = P.rotation * M,
                        k = P.scaleX,
                        A = P.scaleY,
                        R = P.scaleZ,
                        O = P.perspective;
                    if (c) {
                        var D = 1e-4;
                        D > k && k > -D && (k = R = 2e-5), D > A && A > -D && (A = R = 2e-5), !O || P.z || P.rotationX || P.rotationY || (O = 0)
                    }
                    if (S || P.skewX) g = Math.cos(S), y = Math.sin(S), t = g, r = y, P.skewX && (S -= P.skewX * M, g = Math.cos(S), y = Math.sin(S), "simple" === P.skewType && (T = Math.tan(P.skewX * M), T = Math.sqrt(1 + T * T), g *= T, y *= T)), e = -y, a = g;
                    else {
                        if (!(P.rotationY || P.rotationX || 1 !== R || O)) return void (C[ye] = "translate3d(" + P.x + "px," + P.y + "px," + P.z + "px)" + (1 !== k || 1 !== A ? " scale(" + k + "," + A + ")" : ""));
                        t = a = 1, e = r = 0
                    }
                    u = 1, i = n = s = o = l = h = f = m = p = 0, _ = O ? -1 / O : 0, d = P.zOrigin, v = 1e5, S = P.rotationY * M, S && (g = Math.cos(S), y = Math.sin(S), l = u * -y, m = _ * -y, i = t * y, s = r * y, u *= g, _ *= g, t *= g, r *= g), S = P.rotationX * M, S && (g = Math.cos(S), y = Math.sin(S), T = e * g + i * y, w = a * g + s * y, x = h * g + u * y, b = p * g + _ * y, i = e * -y + i * g, s = a * -y + s * g, u = h * -y + u * g, _ = p * -y + _ * g, e = T, a = w, h = x, p = b), 1 !== R && (i *= R, s *= R, u *= R, _ *= R), 1 !== A && (e *= A, a *= A, h *= A, p *= A), 1 !== k && (t *= k, r *= k, l *= k, m *= k), d && (f -= d, n = i * f, o = s * f, f = u * f + d), n = (T = (n += P.x) - (n |= 0)) ? (T * v + (0 > T ? -.5 : .5) | 0) / v + n : n, o = (T = (o += P.y) - (o |= 0)) ? (T * v + (0 > T ? -.5 : .5) | 0) / v + o : o, f = (T = (f += P.z) - (f |= 0)) ? (T * v + (0 > T ? -.5 : .5) | 0) / v + f : f, C[ye] = "matrix3d(" + [(t * v | 0) / v, (r * v | 0) / v, (l * v | 0) / v, (m * v | 0) / v, (e * v | 0) / v, (a * v | 0) / v, (h * v | 0) / v, (p * v | 0) / v, (i * v | 0) / v, (s * v | 0) / v, (u * v | 0) / v, (_ * v | 0) / v, n, o, f, O ? 1 + -f / O : 1].join(",") + ")"
                },
                ke = I.set2DTransformRatio = function (t) {
                    var e, i, n, r, a, s = this.data,
                        o = this.t,
                        l = o.style;
                    return s.rotationX || s.rotationY || s.z || s.force3D ? (this.setRatio = Se, void Se.call(this, t)) : void (s.rotation || s.skewX ? (e = s.rotation * M, i = e - s.skewX * M, n = 1e5, r = s.scaleX * n, a = s.scaleY * n, l[ye] = "matrix(" + (Math.cos(e) * r | 0) / n + "," + (Math.sin(e) * r | 0) / n + "," + (Math.sin(i) * -a | 0) / n + "," + (Math.cos(i) * a | 0) / n + "," + s.x + "," + s.y + ")") : l[ye] = "matrix(" + s.scaleX + ",0,0," + s.scaleY + "," + s.x + "," + s.y + ")")
                };
            de("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType", {
                parser: function (t, e, i, n, a, o, l) {
                    if (n._transform) return a;
                    var h, u, f, c, m, p, _, d = n._transform = Pe(t, r, !0, l.parseTransform),
                        v = t.style,
                        g = 1e-6,
                        y = ge.length,
                        T = l,
                        w = {};
                    if ("string" == typeof T.transform && ye) f = v.cssText, v[ye] = T.transform, v.display = "block", h = Pe(t, null, !1), v.cssText = f;
                    else if ("object" == typeof T) {
                        if (h = {
                            scaleX: ne(null != T.scaleX ? T.scaleX : T.scale, d.scaleX),
                            scaleY: ne(null != T.scaleY ? T.scaleY : T.scale, d.scaleY),
                            scaleZ: ne(T.scaleZ, d.scaleZ),
                            x: ne(T.x, d.x),
                            y: ne(T.y, d.y),
                            z: ne(T.z, d.z),
                            perspective: ne(T.transformPerspective, d.perspective)
                        }, _ = T.directionalRotation, null != _)
                            if ("object" == typeof _)
                                for (f in _) T[f] = _[f];
                            else T.rotation = _;
                        h.rotation = re("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : "rotationZ" in T ? T.rotationZ : d.rotation, d.rotation, "rotation", w), xe && (h.rotationX = re("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : d.rotationX || 0, d.rotationX, "rotationX", w), h.rotationY = re("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : d.rotationY || 0, d.rotationY, "rotationY", w)), h.skewX = null == T.skewX ? d.skewX : re(T.skewX, d.skewX), h.skewY = null == T.skewY ? d.skewY : re(T.skewY, d.skewY), (u = h.skewY - d.skewY) && (h.skewX += u, h.rotation += u)
                    }
                    for (xe && null != T.force3D && (d.force3D = T.force3D, p = !0), d.skewType = T.skewType || d.skewType || s.defaultSkewType, m = d.force3D || d.z || d.rotationX || d.rotationY || h.z || h.rotationX || h.rotationY || h.perspective, m || null == T.scale || (h.scaleZ = 1); --y > -1;) i = ge[y], c = h[i] - d[i], (c > g || -g > c || null != F[i]) && (p = !0, a = new ce(d, i, d[i], c, a), i in w && (a.e = w[i]), a.xs0 = 0, a.plugin = o, n._overwriteProps.push(a.n));
                    return c = T.transformOrigin, (c || xe && m && d.zOrigin) && (ye ? (p = !0, i = we, c = (c || q(t, i, r, !1, "50% 50%")) + "", a = new ce(v, i, 0, 0, a, -1, "transformOrigin"), a.b = v[i], a.plugin = o, xe ? (f = d.zOrigin, c = c.split(" "), d.zOrigin = (c.length > 2 && (0 === f || "0px" !== c[2]) ? parseFloat(c[2]) : f) || 0, a.xs0 = a.e = v[i] = c[0] + " " + (c[1] || "50%") + " 0px", a = new ce(d, "zOrigin", 0, 0, a, -1, a.n), a.b = f, a.xs0 = a.e = d.zOrigin) : a.xs0 = a.e = v[i] = c) : ee(c + "", d)), p && (n._transformType = m || 3 === this._transformType ? 3 : 2), a
                },
                prefix: !0
            }), de("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            }), de("borderRadius", {
                defaultValue: "0px",
                parser: function (t, e, i, a, s) {
                    e = this.format(e);
                    var o, l, h, u, f, c, m, p, _, d, v, g, y, T, w, x, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        P = t.style;
                    for (_ = parseFloat(t.offsetWidth), d = parseFloat(t.offsetHeight), o = e.split(" "), l = 0; l < b.length; l++) this.p.indexOf("border") && (b[l] = j(b[l])), f = u = q(t, b[l], r, !1, "0px"), -1 !== f.indexOf(" ") && (u = f.split(" "), f = u[0], u = u[1]), c = h = o[l], m = parseFloat(f), g = f.substr((m + "").length), y = "=" === c.charAt(1), y ? (p = parseInt(c.charAt(0) + "1", 10), c = c.substr(2), p *= parseFloat(c), v = c.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(c), v = c.substr((p + "").length)), "" === v && (v = n[i] || g), v !== g && (T = W(t, "borderLeft", m, g), w = W(t, "borderTop", m, g), "%" === v ? (f = T / _ * 100 + "%", u = w / d * 100 + "%") : "em" === v ? (x = W(t, "borderLeft", 1, "em"), f = T / x + "em", u = w / x + "em") : (f = T + "px", u = w + "px"), y && (c = parseFloat(f) + p + v, h = parseFloat(u) + p + v)), s = me(P, b[l], f + " " + u, c + " " + h, !1, "0px", s);
                    return s
                },
                prefix: !0,
                formatter: he("0px 0px 0px 0px", !1, !0)
            }), de("backgroundPosition", {
                defaultValue: "0 0",
                parser: function (t, e, i, n, a, s) {
                    var o, l, h, u, f, c, m = "background-position",
                        _ = r || V(t, null),
                        d = this.format((_ ? p ? _.getPropertyValue(m + "-x") + " " + _.getPropertyValue(m + "-y") : _.getPropertyValue(m) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                        v = this.format(e);
                    if (-1 !== d.indexOf("%") != (-1 !== v.indexOf("%")) && (c = q(t, "backgroundImage").replace(S, ""), c && "none" !== c)) {
                        for (o = d.split(" "), l = v.split(" "), Y.setAttribute("src", c), h = 2; --h > -1;) d = o[h], u = -1 !== d.indexOf("%"), u !== (-1 !== l[h].indexOf("%")) && (f = 0 === h ? t.offsetWidth - Y.width : t.offsetHeight - Y.height, o[h] = u ? parseFloat(d) / 100 * f + "px" : parseFloat(d) / f * 100 + "%");
                        d = o.join(" ")
                    }
                    return this.parseComplex(t.style, d, v, a, s)
                },
                formatter: ee
            }), de("backgroundSize", {
                defaultValue: "0 0",
                formatter: ee
            }), de("perspective", {
                defaultValue: "0px",
                prefix: !0
            }), de("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            }), de("transformStyle", {
                prefix: !0
            }), de("backfaceVisibility", {
                prefix: !0
            }), de("userSelect", {
                prefix: !0
            }), de("margin", {
                parser: ue("marginTop,marginRight,marginBottom,marginLeft")
            }), de("padding", {
                parser: ue("paddingTop,paddingRight,paddingBottom,paddingLeft")
            }), de("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function (t, e, i, n, a, s) {
                    var o, l, h;
                    return 9 > p ? (l = t.currentStyle, h = 8 > p ? " " : ",", o = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (o = this.format(q(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, a, s)
                }
            }), de("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            }), de("autoRound,strictUnits", {
                parser: function (t, e, i, n, r) {
                    return r
                }
            }), de("border", {
                defaultValue: "0px solid #000",
                parser: function (t, e, i, n, a, s) {
                    return this.parseComplex(t.style, this.format(q(t, "borderTopWidth", r, !1, "0px") + " " + q(t, "borderTopStyle", r, !1, "solid") + " " + q(t, "borderTopColor", r, !1, "#000")), this.format(e), a, s)
                },
                color: !0,
                formatter: function (t) {
                    var e = t.split(" ");
                    return e[0] + " " + (e[1] || "solid") + " " + (t.match(le) || ["#000"])[0]
                }
            }), de("borderWidth", {
                parser: ue("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            }), de("float,cssFloat,styleFloat", {
                parser: function (t, e, i, n, r) {
                    var a = t.style,
                        s = "cssFloat" in a ? "cssFloat" : "styleFloat";
                    return new ce(a, s, 0, 0, r, -1, i, !1, 0, a[s], e)
                }
            });
            var Ae = function (t) {
                var e, i = this.t,
                    n = i.filter || q(this.data, "filter"),
                    r = this.s + this.c * t | 0;
                100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), e = !q(this.data, "filter")) : (i.filter = n.replace(x, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("opacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(T, "opacity=" + r))
            };
            de("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function (t, e, i, n, a, s) {
                    var o = parseFloat(q(t, "opacity", r, !1, "1")),
                        l = t.style,
                        h = "autoAlpha" === i;
                    return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), h && 1 === o && "hidden" === q(t, "visibility", r) && 0 !== e && (o = 0), N ? a = new ce(l, "opacity", o, e - o, a) : (a = new ce(l, "opacity", 100 * o, 100 * (e - o), a), a.xn1 = h ? 1 : 0, l.zoom = 1, a.type = 2, a.b = "alpha(opacity=" + a.s + ")", a.e = "alpha(opacity=" + (a.s + a.c) + ")", a.data = t, a.plugin = s, a.setRatio = Ae), h && (a = new ce(l, "visibility", 0, 0, a, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), a.xs0 = "inherit", n._overwriteProps.push(a.n), n._overwriteProps.push(i)), a
                }
            });
            var Re = function (t, e) {
                e && (t.removeProperty ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)), t.removeProperty(e.replace(P, "-$1").toLowerCase())) : t.removeAttribute(e))
            },
                Oe = function (t) {
                    if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                        this.t.className = 0 === t ? this.b : this.e;
                        for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Re(i, e.p), e = e._next;
                        1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else this.t.className !== this.e && (this.t.className = this.e)
                };
            de("className", {
                parser: function (t, e, n, a, s, o, l) {
                    var h, u, f, c, m, p = t.className,
                        _ = t.style.cssText;
                    if (s = a._classNamePT = new ce(t, n, 0, 0, s, 2), s.setRatio = Oe, s.pr = -11, i = !0, s.b = p, u = G(t, r), f = t._gsClassPT) {
                        for (c = {}, m = f.data; m;) c[m.p] = 1, m = m._next;
                        f.setRatio(1)
                    }
                    return t._gsClassPT = s, s.e = "=" !== e.charAt(1) ? e : p.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), a._tween._duration && (t.className = s.e, h = H(t, u, G(t), l, c), t.className = p, s.data = h.firstMPT, t.style.cssText = _, s = s.xfirst = a.parse(t, h.difs, s, o)), s
                }
            });
            var De = function (t) {
                if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var e, i, n, r, a = this.t.style,
                        s = o.transform.parse;
                    if ("all" === this.e) a.cssText = "", r = !0;
                    else
                        for (e = this.e.split(","), n = e.length; --n > -1;) i = e[n], o[i] && (o[i].parse === s ? r = !0 : i = "transformOrigin" === i ? we : o[i].p), Re(a, i);
                    r && (Re(a, ye), this.t._gsTransform && delete this.t._gsTransform)
                }
            };
            for (de("clearProps", {
                parser: function (t, e, n, r, a) {
                    return a = new ce(t, n, 0, 0, a, 2), a.setRatio = De, a.e = e, a.pr = -10, a.data = r._tween, i = !0, a
                }
            }), l = "bezier,throwProps,physicsProps,physics2D".split(","), pe = l.length; pe--;) ve(l[pe]);
            l = s.prototype, l._firstPT = null, l._onInitTween = function (t, e, o) {
                if (!t.nodeType) return !1;
                this._target = t, this._tween = o, this._vars = e, h = e.autoRound, i = !1, n = e.suffixMap || s.suffixMap, r = V(t, ""), a = this._overwriteProps;
                var l, c, p, _, d, v, g, y, T, x = t.style;
                if (u && "" === x.zIndex && (l = q(t, "zIndex", r), ("auto" === l || "" === l) && (x.zIndex = 0)), "string" == typeof e && (_ = x.cssText, l = G(t, r), x.cssText = _ + ";" + e, l = H(t, l, G(t)).difs, !N && w.test(e) && (l.opacity = parseFloat(RegExp.$1)), e = l, x.cssText = _), this._firstPT = c = this.parse(t, e, null), this._transformType) {
                    for (T = 3 === this._transformType, ye ? f && (u = !0, "" === x.zIndex && (g = q(t, "zIndex", r), ("auto" === g || "" === g) && (x.zIndex = 0)), m && (x.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : x.zoom = 1, p = c; p && p._next;) p = p._next;
                    y = new ce(t, "transform", 0, 0, null, 2), this._linkCSSP(y, null, p), y.setRatio = T && xe ? Se : ye ? ke : Ce, y.data = this._transform || Pe(t, r, !0), a.pop()
                }
                if (i) {
                    for (; c;) {
                        for (v = c._next, p = _; p && p.pr > c.pr;) p = p._next;
                        (c._prev = p ? p._prev : d) ? c._prev._next = c : _ = c, (c._next = p) ? p._prev = c : d = c, c = v
                    }
                    this._firstPT = _
                }
                return !0
            }, l.parse = function (t, e, i, a) {
                var s, l, u, f, c, m, p, _, d, v, g = t.style;
                for (s in e) m = e[s], l = o[s], l ? i = l.parse(t, m, s, this, i, a, e) : (c = q(t, s, r) + "", d = "string" == typeof m, "color" === s || "fill" === s || "stroke" === s || -1 !== s.indexOf("Color") || d && b.test(m) ? (d || (m = oe(m), m = (m.length > 3 ? "rgba(" : "rgb(") + m.join(",") + ")"), i = me(g, s, c, m, !0, "transparent", i, 0, a)) : !d || -1 === m.indexOf(" ") && -1 === m.indexOf(",") ? (u = parseFloat(c), p = u || 0 === u ? c.substr((u + "").length) : "", ("" === c || "auto" === c) && ("width" === s || "height" === s ? (u = te(t, s, r), p = "px") : "left" === s || "top" === s ? (u = K(t, s, r), p = "px") : (u = "opacity" !== s ? 0 : 1, p = "")), v = d && "=" === m.charAt(1), v ? (f = parseInt(m.charAt(0) + "1", 10), m = m.substr(2), f *= parseFloat(m), _ = m.replace(y, "")) : (f = parseFloat(m), _ = d ? m.substr((f + "").length) || "" : ""), "" === _ && (_ = s in n ? n[s] : p), m = f || 0 === f ? (v ? f + u : f) + _ : e[s], p !== _ && "" !== _ && (f || 0 === f) && u && (u = W(t, s, u, p), "%" === _ ? (u /= W(t, s, 100, "%") / 100, e.strictUnits !== !0 && (c = u + "%")) : "em" === _ ? u /= W(t, s, 1, "em") : "px" !== _ && (f = W(t, s, f, _), _ = "px"), v && (f || 0 === f) && (m = f + u + _)), v && (f += u), !u && 0 !== u || !f && 0 !== f ? void 0 !== g[s] && (m || m + "" != "NaN" && null != m) ? (i = new ce(g, s, f || u || 0, 0, i, -1, s, !1, 0, c, m), i.xs0 = "none" !== m || "display" !== s && -1 === s.indexOf("Style") ? m : c) : B("invalid " + s + " tween value: " + e[s]) : (i = new ce(g, s, u, f - u, i, 0, s, h !== !1 && ("px" === _ || "zIndex" === s), 0, c, m), i.xs0 = _)) : i = me(g, s, c, m, !0, null, i, 0, a)), a && i && !i.plugin && (i.plugin = a);
                return i
            }, l.setRatio = function (t) {
                var e, i, n, r = this._firstPT,
                    a = 1e-6;
                if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                    if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                        for (; r;) {
                            if (e = r.c * t + r.s, r.r ? e = Math.round(e) : a > e && e > -a && (e = 0), r.type)
                                if (1 === r.type)
                                    if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                    else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                    else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                    else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                    else {
                                        for (i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                        r.t[r.p] = i
                                    } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                            else r.t[r.p] = e + r.xs0;
                            r = r._next
                        } else
                        for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
                else
                    for (; r;) 2 !== r.type ? r.t[r.p] = r.e : r.setRatio(t), r = r._next
            }, l._enableTransforms = function (t) {
                this._transformType = t || 3 === this._transformType ? 3 : 2, this._transform = this._transform || Pe(this._target, r, !0)
            }, l._linkCSSP = function (t, e, i, n) {
                return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
            }, l._kill = function (e) {
                var i, n, r, a = e;
                if (e.autoAlpha || e.alpha) {
                    a = {};
                    for (n in e) a[n] = e[n];
                    a.opacity = 1, a.autoAlpha && (a.visibility = 1)
                }
                return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, a)
            };
            var Me = function (t, e, i) {
                var n, r, a, s;
                if (t.slice)
                    for (r = t.length; --r > -1;) Me(t[r], e, i);
                else
                    for (n = t.childNodes, r = n.length; --r > -1;) a = n[r], s = a.type, a.style && (e.push(G(a)), i && i.push(a)), 1 !== s && 9 !== s && 11 !== s || !a.childNodes.length || Me(a, e, i)
            };
            return s.cascadeTo = function (t, i, n) {
                var r, a, s, o = e.to(t, i, n),
                    l = [o],
                    h = [],
                    u = [],
                    f = [],
                    c = e._internals.reservedProps;
                for (t = o._targets || o.target, Me(t, h, f), o.render(i, !0), Me(t, u), o.render(0, !0), o._enabled(!0), r = f.length; --r > -1;)
                    if (a = H(f[r], h[r], u[r]), a.firstMPT) {
                        a = a.difs;
                        for (s in n) c[s] && (a[s] = n[s]);
                        l.push(e.to(f[r], i, a))
                    }
                return l
            }, t.activate([s]), s
        }, !0),
        function () {
            var t = window._gsDefine.plugin({
                propName: "roundProps",
                priority: -1,
                API: 2,
                init: function (t, e, i) {
                    return this._tween = i, !0
                }
            }),
                e = t.prototype;
            e._onInitAllProps = function () {
                for (var t, e, i, n = this._tween, r = n.vars.roundProps instanceof Array ? n.vars.roundProps : n.vars.roundProps.split(","), a = r.length, s = {}, o = n._propLookup.roundProps; --a > -1;) s[r[a]] = 1;
                for (a = r.length; --a > -1;)
                    for (t = r[a], e = n._firstPT; e;) i = e._next, e.pg ? e.t._roundProps(s, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : n._firstPT === e && (n._firstPT = i), e._next = e._prev = null, n._propLookup[t] = o), e = i;
                return !1
            }, e._add = function (t, e, i, n) {
                this._addTween(t, e, i, i + n, e, !0), this._overwriteProps.push(e)
            }
        }(), window._gsDefine.plugin({
            propName: "attr",
            API: 2,
            version: "0.3.0",
            init: function (t, e, i) {
                var n, r, a;
                if ("function" != typeof t.setAttribute) return !1;
                this._target = t, this._proxy = {}, this._start = {}, this._end = {}, this._endRatio = i.vars.runBackwards ? 0 : 1;
                for (n in e) this._start[n] = this._proxy[n] = r = t.getAttribute(n), this._end[n] = a = e[n], this._addTween(this._proxy, n, parseFloat(r), a, n), this._overwriteProps.push(n);
                return !0
            },
            set: function (t) {
                this._super.setRatio.call(this, t);
                for (var e, i = this._overwriteProps, n = i.length, r = 0 !== t && 1 !== t ? this._proxy : t === this._endRatio ? this._end : this._start; --n > -1;) e = i[n], this._target.setAttribute(e, r[e] + "")
            }
        }), window._gsDefine.plugin({
            propName: "directionalRotation",
            API: 2,
            version: "0.2.0",
            init: function (t, e) {
                "object" != typeof e && (e = {
                    rotation: e
                }), this.finals = {};
                var i, n, r, a, s, o, l = e.useRadians === !0 ? 2 * Math.PI : 360,
                    h = 1e-6;
                for (i in e) "useRadians" !== i && (o = (e[i] + "").split("_"), n = o[0], r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), a = this.finals[i] = "string" == typeof n && "=" === n.charAt(1) ? r + parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2)) : Number(n) || 0, s = a - r, o.length && (n = o.join("_"), -1 !== n.indexOf("short") && (s %= l, s !== s % (l / 2) && (s = 0 > s ? s + l : s - l)), -1 !== n.indexOf("_cw") && 0 > s ? s = (s + 9999999999 * l) % l - (s / l | 0) * l : -1 !== n.indexOf("ccw") && s > 0 && (s = (s - 9999999999 * l) % l - (s / l | 0) * l)), (s > h || -h > s) && (this._addTween(t, i, r, r + s, i), this._overwriteProps.push(i)));
                return !0
            },
            set: function (t) {
                var e;
                if (1 !== t) this._super.setRatio.call(this, t);
                else
                    for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
            }
        })._autoCSS = !0, window._gsDefine("easing.Back", ["easing.Ease"], function (t) {
            var e, i, n, r = window.GreenSockGlobals || window,
                a = r.com.greensock,
                s = 2 * Math.PI,
                o = Math.PI / 2,
                l = a._class,
                h = function (e, i) {
                    var n = l("easing." + e, function () { }, !0),
                        r = n.prototype = new t;
                    return r.constructor = n, r.getRatio = i, n
                },
                u = t.register || function () { },
                f = function (t, e, i, n) {
                    var r = l("easing." + t, {
                        easeOut: new e,
                        easeIn: new i,
                        easeInOut: new n
                    }, !0);
                    return u(r, t), r
                },
                c = function (t, e, i) {
                    this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                },
                m = function (e, i) {
                    var n = l("easing." + e, function (t) {
                        this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                    }, !0),
                        r = n.prototype = new t;
                    return r.constructor = n, r.getRatio = i, r.config = function (t) {
                        return new n(t)
                    }, n
                },
                p = f("Back", m("BackOut", function (t) {
                    return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                }), m("BackIn", function (t) {
                    return t * t * ((this._p1 + 1) * t - this._p1)
                }), m("BackInOut", function (t) {
                    return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                })),
                _ = l("easing.SlowMo", function (t, e, i) {
                    e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                }, !0),
                d = _.prototype = new t;
            return d.constructor = _, d.getRatio = function (t) {
                var e = t + (.5 - t) * this._p;
                return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
            }, _.ease = new _(.7, .7), d.config = _.config = function (t, e, i) {
                return new _(t, e, i)
            }, e = l("easing.SteppedEase", function (t) {
                t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
            }, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function (t) {
                return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
            }, d.config = e.config = function (t) {
                return new e(t)
            }, i = l("easing.RoughEase", function (e) {
                e = e || {};
                for (var i, n, r, a, s, o, l = e.taper || "none", h = [], u = 0, f = 0 | (e.points || 20), m = f, p = e.randomize !== !1, _ = e.clamp === !0, d = e.template instanceof t ? e.template : null, v = "number" == typeof e.strength ? .4 * e.strength : .4; --m > -1;) i = p ? Math.random() : 1 / f * m, n = d ? d.getRatio(i) : i, "none" === l ? r = v : "out" === l ? (a = 1 - i, r = a * a * v) : "in" === l ? r = i * i * v : .5 > i ? (a = 2 * i, r = a * a * .5 * v) : (a = 2 * (1 - i), r = a * a * .5 * v), p ? n += Math.random() * r - .5 * r : m % 2 ? n += .5 * r : n -= .5 * r, _ && (n > 1 ? n = 1 : 0 > n && (n = 0)), h[u++] = {
                    x: i,
                    y: n
                };
                for (h.sort(function (t, e) {
                    return t.x - e.x
                }), o = new c(1, 1, null), m = f; --m > -1;) s = h[m], o = new c(s.x, s.y, o);
                this._prev = new c(0, 0, 0 !== o.t ? o : o.next)
            }, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function (t) {
                var e = this._prev;
                if (t > e.t) {
                    for (; e.next && t >= e.t;) e = e.next;
                    e = e.prev
                } else
                    for (; e.prev && t <= e.t;) e = e.prev;
                return this._prev = e, e.v + (t - e.t) / e.gap * e.c
            }, d.config = function (t) {
                return new i(t)
            }, i.ease = new i, f("Bounce", h("BounceOut", function (t) {
                return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }), h("BounceIn", function (t) {
                return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
            }), h("BounceInOut", function (t) {
                var e = .5 > t;
                return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
            })), f("Circ", h("CircOut", function (t) {
                return Math.sqrt(1 - (t -= 1) * t)
            }), h("CircIn", function (t) {
                return -(Math.sqrt(1 - t * t) - 1)
            }), h("CircInOut", function (t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            })), n = function (e, i, n) {
                var r = l("easing." + e, function (t, e) {
                    this._p1 = t || 1, this._p2 = e || n, this._p3 = this._p2 / s * (Math.asin(1 / this._p1) || 0)
                }, !0),
                    a = r.prototype = new t;
                return a.constructor = r, a.getRatio = i, a.config = function (t, e) {
                    return new r(t, e)
                }, r
            }, f("Elastic", n("ElasticOut", function (t) {
                return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * s / this._p2) + 1
            }, .3), n("ElasticIn", function (t) {
                return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * s / this._p2))
            }, .3), n("ElasticInOut", function (t) {
                return (t *= 2) < 1 ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * s / this._p2) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * s / this._p2) * .5 + 1
            }, .45)), f("Expo", h("ExpoOut", function (t) {
                return 1 - Math.pow(2, -10 * t)
            }), h("ExpoIn", function (t) {
                return Math.pow(2, 10 * (t - 1)) - .001
            }), h("ExpoInOut", function (t) {
                return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
            })), f("Sine", h("SineOut", function (t) {
                return Math.sin(t * o)
            }), h("SineIn", function (t) {
                return -Math.cos(t * o) + 1
            }), h("SineInOut", function (t) {
                return -.5 * (Math.cos(Math.PI * t) - 1)
            })), l("easing.EaseLookup", {
                find: function (e) {
                    return t.map[e]
                }
            }, !0), u(r.SlowMo, "SlowMo", "ease,"), u(i, "RoughEase", "ease,"), u(e, "SteppedEase", "ease,"), p
        }, !0)
}),
    function (t) {
        "use strict";
        var e = t.GreenSockGlobals || t;
        if (!e.TweenLite) {
            var i, n, r, a, s, o = function (t) {
                var i, n = t.split("."),
                    r = e;
                for (i = 0; i < n.length; i++) r[n[i]] = r = r[n[i]] || {};
                return r
            },
                l = o("com.greensock"),
                h = 1e-10,
                u = [].slice,
                f = function () { },
                c = function () {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function (i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                    }
                }(),
                m = {},
                p = function (i, n, r, a) {
                    this.sc = m[i] ? m[i].sc : [], m[i] = this, this.gsClass = null, this.func = r;
                    var s = [];
                    this.check = function (l) {
                        for (var h, u, f, c, _ = n.length, d = _; --_ > -1;)(h = m[n[_]] || new p(n[_], [])).gsClass ? (s[_] = h.gsClass, d--) : l && h.sc.push(this);
                        if (0 === d && r)
                            for (u = ("com.greensock." + i).split("."), f = u.pop(), c = o(u.join("."))[f] = this.gsClass = r.apply(r, s), a && (e[f] = c, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + i.split(".").join("/"), [], function () {
                                return c
                            }) : "undefined" != typeof module && module.exports && (module.exports = c)), _ = 0; _ < this.sc.length; _++) this.sc[_].check()
                    }, this.check(!0)
                },
                _ = t._gsDefine = function (t, e, i, n) {
                    return new p(t, e, i, n)
                },
                d = l._class = function (t, e, i) {
                    return e = e || function () { }, _(t, [], function () {
                        return e
                    }, i), e
                };
            _.globals = e;
            var v = [0, 0, 1, 1],
                g = [],
                y = d("easing.Ease", function (t, e, i, n) {
                    this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? v.concat(e) : v
                }, !0),
                T = y.map = {},
                w = y.register = function (t, e, i, n) {
                    for (var r, a, s, o, h = e.split(","), u = h.length, f = (i || "easeIn,easeOut,easeInOut").split(","); --u > -1;)
                        for (a = h[u], r = n ? d("easing." + a, null, !0) : l.easing[a] || {}, s = f.length; --s > -1;) o = f[s], T[a + "." + o] = T[o + a] = r[o] = t.getRatio ? t : t[o] || new t
                };
            for (r = y.prototype, r._calcEnd = !1, r.getRatio = function (t) {
                if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                var e = this._type,
                    i = this._power,
                    n = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : .5 > t ? n / 2 : 1 - n / 2
            }, i = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], n = i.length; --n > -1;) r = i[n] + ",Power" + n, w(new y(null, null, 1, n), r, "easeOut", !0), w(new y(null, null, 2, n), r, "easeIn" + (0 === n ? ",easeNone" : "")), w(new y(null, null, 3, n), r, "easeInOut");
            T.linear = l.easing.Linear.easeIn, T.swing = l.easing.Quad.easeInOut;
            var x = d("events.EventDispatcher", function (t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            r = x.prototype, r.addEventListener = function (t, e, i, n, r) {
                r = r || 0;
                var o, l, h = this._listeners[t],
                    u = 0;
                for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1;) o = h[l], o.c === e && o.s === i ? h.splice(l, 1) : 0 === u && o.pr < r && (u = l + 1);
                h.splice(u, 0, {
                    c: e,
                    s: i,
                    up: n,
                    pr: r
                }), this !== a || s || a.wake()
            }, r.removeEventListener = function (t, e) {
                var i, n = this._listeners[t];
                if (n)
                    for (i = n.length; --i > -1;)
                        if (n[i].c === e) return void n.splice(i, 1)
            }, r.dispatchEvent = function (t) {
                var e, i, n, r = this._listeners[t];
                if (r)
                    for (e = r.length, i = this._eventTarget; --e > -1;) n = r[e], n.up ? n.c.call(n.s || i, {
                        type: t,
                        target: i
                    }) : n.c.call(n.s || i)
            };
            var b = t.requestAnimationFrame,
                P = t.cancelAnimationFrame,
                C = Date.now || function () {
                    return (new Date).getTime()
                },
                S = C();
            for (i = ["ms", "moz", "webkit", "o"], n = i.length; --n > -1 && !b;) b = t[i[n] + "RequestAnimationFrame"], P = t[i[n] + "CancelAnimationFrame"] || t[i[n] + "CancelRequestAnimationFrame"];
            d("Ticker", function (t, e) {
                var i, n, r, o, l, h = this,
                    u = C(),
                    c = e !== !1 && b,
                    m = function (t) {
                        S = C(), h.time = (S - u) / 1e3;
                        var e, a = h.time - l;
                        (!i || a > 0 || t === !0) && (h.frame++ , l += a + (a >= o ? .004 : o - a), e = !0), t !== !0 && (r = n(m)), e && h.dispatchEvent("tick")
                    };
                x.call(h), h.time = h.frame = 0, h.tick = function () {
                    m(!0)
                }, h.sleep = function () {
                    null != r && (c && P ? P(r) : clearTimeout(r), n = f, r = null, h === a && (s = !1))
                }, h.wake = function () {
                    null !== r && h.sleep(), n = 0 === i ? f : c && b ? b : function (t) {
                        return setTimeout(t, 1e3 * (l - h.time) + 1 | 0)
                    }, h === a && (s = !0), m(2)
                }, h.fps = function (t) {
                    return arguments.length ? (i = t, o = 1 / (i || 60), l = this.time + o, void h.wake()) : i
                }, h.useRAF = function (t) {
                    return arguments.length ? (h.sleep(), c = t, void h.fps(i)) : c
                }, h.fps(t), setTimeout(function () {
                    c && (!r || h.frame < 5) && h.useRAF(!1)
                }, 1500)
            }), r = l.Ticker.prototype = new l.events.EventDispatcher, r.constructor = l.Ticker;
            var k = d("core.Animation", function (t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, N) {
                    s || a.wake();
                    var i = this.vars.useFrames ? z : N;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            a = k.ticker = new l.Ticker, r = k.prototype, r._dirty = r._gc = r._initted = r._paused = !1, r._totalTime = r._time = 0, r._rawPrevTime = -1, r._next = r._last = r._onUpdate = r._timeline = r.timeline = null, r._paused = !1;
            var A = function () {
                s && C() - S > 2e3 && a.wake(), setTimeout(A, 2e3)
            };
            A(), r.play = function (t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, r.pause = function (t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, r.resume = function (t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, r.seek = function (t, e) {
                return this.totalTime(Number(t), e !== !1)
            }, r.restart = function (t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
            }, r.reverse = function (t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, r.render = function () { }, r.invalidate = function () {
                return this
            }, r.isActive = function () {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && t < i + this.totalDuration() / this._timeScale
            }, r._enabled = function (t, e) {
                return s || a.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, r._kill = function () {
                return this._enabled(!1, !1)
            }, r.kill = function (t, e) {
                return this._kill(t, e), this
            }, r._uncache = function (t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, r._swapSelfInParams = function (t) {
                for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                return i
            }, r.eventCallback = function (t, e, i, n) {
                if ("on" === (t || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[t];
                    null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = c(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, r.delay = function (t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, r.duration = function (t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, r.totalDuration = function (t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, r.time = function (t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, r.totalTime = function (t, e, i) {
                if (s || a.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var n = this._totalDuration,
                            r = this._timeline;
                        if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && this.render(t, e, !1)
                }
                return this
            }, r.progress = r.totalProgress = function (t, e) {
                return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
            }, r.startTime = function (t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, r.timeScale = function (t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || h, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / t
                }
                return this._timeScale = t, this._uncache(!1)
            }, r.reversed = function (t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, r.paused = function (t) {
                if (!arguments.length) return this._paused;
                if (t != this._paused && this._timeline) {
                    s || t || a.wake();
                    var e = this._timeline,
                        i = e.rawTime(),
                        n = i - this._pauseTime;
                    !t && e.smoothChildTiming && (this._startTime += n, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== n && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
                }
                return this._gc && !t && this._enabled(!0, !1), this
            };
            var R = d("core.SimpleTimeline", function (t) {
                k.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            r = R.prototype = new k, r.constructor = R, r.kill()._gc = !1, r._first = r._last = null, r._sortChildren = !1, r.add = r.insert = function (t, e) {
                var i, n;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                    for (n = t._startTime; i && i._startTime > n;) i = i._prev;
                return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this
            }, r._remove = function (t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t.timeline = null, t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), this._timeline && this._uncache(!0)), this
            }, r.render = function (t, e, i) {
                var n, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
            }, r.rawTime = function () {
                return s || a.wake(), this._totalTime
            };
            var O = d("TweenLite", function (e, i, n) {
                if (k.call(this, i, n), this.render = O.prototype.render, null == e) throw "Cannot tween a null target.";
                this.target = e = "string" != typeof e ? e : O.selector(e) || e;
                var r, a, s, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                    l = this.vars.overwrite;
                if (this._overwrite = l = null == l ? I[O.defaultOverwrite] : "number" == typeof l ? l >> 0 : I[l], (o || e instanceof Array || e.push && c(e)) && "number" != typeof e[0])
                    for (this._targets = s = u.call(e, 0), this._propLookup = [], this._siblings = [], r = 0; r < s.length; r++) a = s[r], a ? "string" != typeof a ? a.length && a !== t && a[0] && (a[0] === t || a[0].nodeType && a[0].style && !a.nodeType) ? (s.splice(r--, 1), this._targets = s = s.concat(u.call(a, 0))) : (this._siblings[r] = E(a, this, !1), 1 === l && this._siblings[r].length > 1 && B(a, this, null, 1, this._siblings[r])) : (a = s[r--] = O.selector(a), "string" == typeof a && s.splice(r + 1, 1)) : s.splice(r--, 1);
                else this._propLookup = {}, this._siblings = E(e, this, !1), 1 === l && this._siblings.length > 1 && B(e, this, null, 1, this._siblings);
                (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && this.render(-this._delay, !1, !0)
            }, !0),
                D = function (e) {
                    return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                },
                M = function (t, e) {
                    var i, n = {};
                    for (i in t) Y[i] || i in e && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!F[i] || F[i] && F[i]._autoCSS) || (n[i] = t[i], delete t[i]);
                    t.css = n
                };
            r = O.prototype = new k, r.constructor = O, r.kill()._gc = !1, r.ratio = 0, r._firstPT = r._targets = r._overwrittenProps = r._startAt = null, r._notifyPluginsOfEnabled = !1, O.version = "1.11.8", O.defaultEase = r._ease = new y(null, null, 1, 1), O.defaultOverwrite = "auto", O.ticker = a, O.autoSleep = !0, O.selector = t.$ || t.jQuery || function (e) {
                return t.$ ? (O.selector = t.$, t.$(e)) : t.document ? t.document.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e
            };
            var X = O._internals = {
                isArray: c,
                isSelector: D
            },
                F = O._plugins = {},
                $ = O._tweenLookup = {},
                L = 0,
                Y = X.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1
                },
                I = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                z = k._rootFramesTimeline = new R,
                N = k._rootTimeline = new R;
            N._startTime = a.time, z._startTime = a.frame, N._active = z._active = !0, k._updateRoot = function () {
                if (N.render((a.time - N._startTime) * N._timeScale, !1, !1), z.render((a.frame - z._startTime) * z._timeScale, !1, !1), !(a.frame % 120)) {
                    var t, e, i;
                    for (i in $) {
                        for (e = $[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete $[i]
                    }
                    if (i = N._first, (!i || i._paused) && O.autoSleep && !z._first && 1 === a._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || a.sleep()
                    }
                }
            }, a.addEventListener("tick", k._updateRoot);
            var E = function (t, e, i) {
                var n, r, a = t._gsTweenID;
                if ($[a || (t._gsTweenID = a = "t" + L++)] || ($[a] = {
                    target: t,
                    tweens: []
                }), e && (n = $[a].tweens, n[r = n.length] = e, i))
                    for (; --r > -1;) n[r] === e && n.splice(r, 1);
                return $[a].tweens
            },
                B = function (t, e, i, n, r) {
                    var a, s, o, l;
                    if (1 === n || n >= 4) {
                        for (l = r.length, a = 0; l > a; a++)
                            if ((o = r[a]) !== e) o._gc || o._enabled(!1, !1) && (s = !0);
                            else if (5 === n) break;
                        return s
                    }
                    var u, f = e._startTime + h,
                        c = [],
                        m = 0,
                        p = 0 === e._duration;
                    for (a = r.length; --a > -1;)(o = r[a]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (u = u || Z(e, 0, p), 0 === Z(o, u, p) && (c[m++] = o)) : o._startTime <= f && o._startTime + o.totalDuration() / o._timeScale > f && ((p || !o._initted) && f - o._startTime <= 2e-10 || (c[m++] = o)));
                    for (a = m; --a > -1;) o = c[a], 2 === n && o._kill(i, t) && (s = !0), (2 !== n || !o._firstPT && o._initted) && o._enabled(!1, !1) && (s = !0);
                    return s
                },
                Z = function (t, e, i) {
                    for (var n = t._timeline, r = n._timeScale, a = t._startTime; n._timeline;) {
                        if (a += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return a /= r, a > e ? a - e : i && a === e || !t._initted && 2 * h > a - e ? h : (a += t.totalDuration() / t._timeScale / r) > e + h ? 0 : a - e - h
                };
            r._init = function () {
                var t, e, i, n, r = this.vars,
                    a = this._overwrittenProps,
                    s = this._duration,
                    o = r.immediateRender,
                    l = r.ease;
                if (r.startAt) {
                    if (this._startAt && this._startAt.render(-1, !0), r.startAt.overwrite = 0, r.startAt.immediateRender = !0, this._startAt = O.to(this.target, 0, r.startAt), o)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== s) return
                } else if (r.runBackwards && 0 !== s)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt = null;
                    else {
                        i = {};
                        for (n in r) Y[n] && "autoCSS" !== n || (i[n] = r[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", this._startAt = O.to(this.target, 0, i), r.immediateRender) {
                            if (0 === this._time) return
                        } else this._startAt.render(-1, !0)
                    }
                if (this._ease = l ? l instanceof y ? r.easeParams instanceof Array ? l.config.apply(l, r.easeParams) : l : "function" == typeof l ? new y(l, r.easeParams) : T[l] || O.defaultEase : O.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, a);
                if (e && O._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = r.onUpdate, this._initted = !0
            }, r._initProps = function (e, i, n, r) {
                var a, s, o, l, h, u;
                if (null == e) return !1;
                this.vars.css || e.style && e !== t && e.nodeType && F.css && this.vars.autoCSS !== !1 && M(this.vars, e);
                for (a in this.vars) {
                    if (u = this.vars[a], Y[a]) u && (u instanceof Array || u.push && c(u)) && -1 !== u.join("").indexOf("{self}") && (this.vars[a] = u = this._swapSelfInParams(u, this));
                    else if (F[a] && (l = new F[a])._onInitTween(e, this.vars[a], this)) {
                        for (this._firstPT = h = {
                            _next: this._firstPT,
                            t: l,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: !0,
                            n: a,
                            pg: !0,
                            pr: l._priority
                        }, s = l._overwriteProps.length; --s > -1;) i[l._overwriteProps[s]] = this._firstPT;
                        (l._priority || l._onInitAllProps) && (o = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
                    } else this._firstPT = i[a] = h = {
                        _next: this._firstPT,
                        t: e,
                        p: a,
                        f: "function" == typeof e[a],
                        n: a,
                        pg: !1,
                        pr: 0
                    }, h.s = h.f ? e[a.indexOf("set") || "function" != typeof e["get" + a.substr(3)] ? a : "get" + a.substr(3)]() : parseFloat(e[a]), h.c = "string" == typeof u && "=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * Number(u.substr(2)) : Number(u) - h.s || 0;
                    h && h._next && (h._next._prev = h)
                }
                return r && this._kill(r, e) ? this._initProps(e, i, n, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && B(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r)) : o
            }, r.render = function (t, e, i) {
                var n, r, a, s, o = this._time,
                    l = this._duration;
                if (t >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete"), 0 === l && (s = this._rawPrevTime, this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > s || s === h) && s !== t && (i = !0, s > h && (r = "onReverseComplete")), this._rawPrevTime = s = !e || t || this._rawPrevTime === t ? t : h);
                else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && this._rawPrevTime > 0 && this._rawPrevTime !== h) && (r = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === l && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = s = !e || t || this._rawPrevTime === t ? t : h)) : this._initted || (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var u = t / l,
                        f = this._easeType,
                        c = this._easePower;
                    (1 === f || 3 === f && u >= .5) && (u = 1 - u), 3 === f && (u *= 2), 1 === c ? u *= u : 2 === c ? u *= u * u : 3 === c ? u *= u * u * u : 4 === c && (u *= u * u * u * u), this.ratio = 1 === f ? 1 - u : 2 === f ? u : .5 > t / l ? u / 2 : 1 - u / 2
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== o || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || g))), a = this._firstPT; a;) a.f ? a.t[a.p](a.c * this.ratio + a.s) : a.t[a.p] = a.c * this.ratio + a.s, a = a._next;
                    this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._time !== o || n) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || g)), r && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || g), 0 === l && this._rawPrevTime === h && s !== h && (this._rawPrevTime = 0)))
                }
            }, r._kill = function (t, e) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : O.selector(e) || e;
                var i, n, r, a, s, o, l, h;
                if ((c(e) || D(e)) && "number" != typeof e[0])
                    for (i = e.length; --i > -1;) this._kill(t, e[i]) && (o = !0);
                else {
                    if (this._targets) {
                        for (i = this._targets.length; --i > -1;)
                            if (e === this._targets[i]) {
                                s = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], n = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                                break
                            }
                    } else {
                        if (e !== this.target) return !1;
                        s = this._propLookup, n = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (s) {
                        l = t || s, h = t !== n && "all" !== n && t !== s && ("object" != typeof t || !t._tempKill);
                        for (r in l) (a = s[r]) && (a.pg && a.t._kill(l) && (o = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete s[r]), h && (n[r] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return o
            }, r.invalidate = function () {
                return this._notifyPluginsOfEnabled && O._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = !1, this._propLookup = this._targets ? {} : [], this
            }, r._enabled = function (t, e) {
                if (s || a.wake(), t && this._gc) {
                    var i, n = this._targets;
                    if (n)
                        for (i = n.length; --i > -1;) this._siblings[i] = E(n[i], this, !0);
                    else this._siblings = E(this.target, this, !0)
                }
                return k.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? O._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
            }, O.to = function (t, e, i) {
                return new O(t, e, i)
            }, O.from = function (t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new O(t, e, i)
            }, O.fromTo = function (t, e, i, n) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new O(t, e, n)
            }, O.delayedCall = function (t, e, i, n, r) {
                return new O(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    onCompleteScope: n,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    onReverseCompleteScope: n,
                    immediateRender: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, O.set = function (t, e) {
                return new O(t, 0, e)
            }, O.getTweensOf = function (t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : O.selector(t) || t;
                var i, n, r, a;
                if ((c(t) || D(t)) && "number" != typeof t[0]) {
                    for (i = t.length, n = []; --i > -1;) n = n.concat(O.getTweensOf(t[i], e));
                    for (i = n.length; --i > -1;)
                        for (a = n[i], r = i; --r > -1;) a === n[r] && n.splice(i, 1)
                } else
                    for (n = E(t).concat(), i = n.length; --i > -1;)(n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
                return n
            }, O.killTweensOf = O.killDelayedCallsTo = function (t, e, i) {
                "object" == typeof e && (i = e, e = !1);
                for (var n = O.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
            };
            var U = d("plugins.TweenPlugin", function (t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = U.prototype
            }, !0);
            if (r = U.prototype, U.version = "1.10.1", U.API = 2, r._firstPT = null, r._addTween = function (t, e, i, n, r, a) {
                var s, o;
                return null != n && (s = "number" == typeof n || "=" !== n.charAt(1) ? Number(n) - i : parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2))) ? (this._firstPT = o = {
                    _next: this._firstPT,
                    t: t,
                    p: e,
                    s: i,
                    c: s,
                    f: "function" == typeof t[e],
                    n: r || e,
                    r: a
                }, o._next && (o._next._prev = o), o) : void 0
            }, r.setRatio = function (t) {
                for (var e, i = this._firstPT, n = 1e-6; i;) e = i.c * t + i.s, i.r ? e = Math.round(e) : n > e && e > -n && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
            }, r._kill = function (t) {
                var e, i = this._overwriteProps,
                    n = this._firstPT;
                if (null != t[this._propName]) this._overwriteProps = [];
                else
                    for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                return !1
            }, r._roundProps = function (t, e) {
                for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
            }, O._onPluginEvent = function (t, e) {
                var i, n, r, a, s, o = e._firstPT;
                if ("_onInitAllProps" === t) {
                    for (; o;) {
                        for (s = o._next, n = r; n && n.pr > o.pr;) n = n._next;
                        (o._prev = n ? n._prev : a) ? o._prev._next = o : r = o, (o._next = n) ? n._prev = o : a = o, o = s
                    }
                    o = e._firstPT = r
                }
                for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                return i
            }, U.activate = function (t) {
                for (var e = t.length; --e > -1;) t[e].API === U.API && (F[(new t[e])._propName] = t[e]);
                return !0
            }, _.plugin = function (t) {
                if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                var e, i = t.propName,
                    n = t.priority || 0,
                    r = t.overwriteProps,
                    a = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_roundProps",
                        initAll: "_onInitAllProps"
                    },
                    s = d("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
                        U.call(this, i, n), this._overwriteProps = r || []
                    }, t.global === !0),
                    o = s.prototype = new U(i);
                o.constructor = s, s.API = t.API;
                for (e in a) "function" == typeof t[e] && (o[a[e]] = t[e]);
                return s.version = t.version, U.activate([s]), s
            }, i = t._gsQueue) {
                for (n = 0; n < i.length; n++) i[n]();
                for (r in m) m[r].func || t.console.log("GSAP encountered missing dependency: com.greensock." + r)
            }
            s = !1
        }
    }(window),
   
    function (t) {
        "use strict";
        t.module("fx.animations.assist", []).factory("Assist", ["$filter", "$window", "$timeout", "$rootScope", function (e, i, n, r) {
            return {
                emit: function (t, e, i) {
                    r.$broadcast(e + ":" + i)
                },
                parseClassList: function (n, r) {
                    var a, s = n[0].classList,
                        o = {
                            trigger: !1,
                            duration: .3,
                            ease: i.Back
                        };
                    return t.forEach(s, function (t) {
                        "fx-easing" === t.slice(0, 9) && (a = t.slice(10), o.ease = i[e("cap")(a)] || i.Elastic), "fx-trigger" === t && (o.trigger = !0), "fx-speed" === t.slice(0, 8) && (o.duration = parseInt(t.slice(9)) / 1e3)
                    }), r ? {
                        ease: o.ease,
                        speed: o.duration
                    } : o
                },
                addTimer: function (t, e, i) {
                    var r = this,
                        a = t.stagger ? 3 * t.duration * 1e3 : 1e3 * t.duration,
                        s = n(function () {
                            t.trigger && r.emit(e, t.animation, t.motion), i()
                        }, a);
                    e.data(t.timeoutKey, s)
                },
                removeTimer: function (t, e, i) {
                    n.cancel(i), t.removeData(e)
                }
            }
        }]).filter("cap", [function () {
            return function (t) {
                return t.charAt(0).toUpperCase() + t.slice(1)
            }
        }])
    }(angular),
    function (t, e, i) {
        "use strict";
        var n = "$$fxTimer";
        t.module("fx.animations.create", ["fx.animations.assist"]).factory("FadeAnimation", ["$timeout", "$window", "Assist", function (t, i, r) {
            return function (t) {
                var i = t.enter,
                    a = t.leave,
                    s = t.inverse || t.leave,
                    o = t.animation;
                this.enter = function (t, s) {
                    var l = r.parseClassList(t);
                    return l.motion = "enter", l.animation = o, l.timeoutKey = n, r.addTimer(l, t, s), i.ease = l.ease.easeOut, e.set(t, a), e.to(t, l.duration, i),
                        function (e) {
                            var i = t.data(n);
                            e && i && r.removeTimer(t, n, i)
                        }
                }, this.leave = function (t, a) {
                    var l = r.parseClassList(t);
                    return l.motion = "leave", l.animation = o, l.timeoutKey = n, r.addTimer(l, t, a), s.ease = l.ease.easeIn, e.set(t, i), e.to(t, l.duration, s),
                        function (e) {
                            var i = t.data(n);
                            e && i && r.removeTimer(t, n, i)
                        }
                }, this.move = this.enter, this.addClass = function (t, i, a) {
                    if ("ng-hide" === i) {
                        var l = r.parseClassList(t);
                        return l.motion = "enter", l.animation = o, l.timeoutKey = n, r.addTimer(l, t, a), e.to(t, l.duration, s),
                            function (e) {
                                if (e) {
                                    var i = t.data(n);
                                    i && r.removeTimer(t, n, i)
                                }
                            }
                    }
                    a()
                }, this.removeClass = function (t, s, l) {
                    if ("ng-hide" === s) {
                        var h = r.parseClassList(t);
                        return h.motion = "leave", h.animation = o, h.timeoutKey = n, e.set(t, a), e.to(t, h.duration, i),
                            function (e) {
                                if (e) {
                                    var i = t.data(n);
                                    i && r.removeTimer(t, n, i)
                                }
                            }
                    }
                    l()
                }
            }
        }]).factory("BounceAnimation", ["$timeout", "$window", "Assist", function (t, e, r) {
            return function (t) {
                var e = t.first,
                    a = t.mid,
                    s = t.third,
                    o = t.end,
                    l = t.animation,
                    h = .1;
                this.enter = function (t, h) {
                    var u = r.parseClassList(t);
                    u.motion = "enter", u.animation = l, u.timeoutKey = n, u.stagger = !0, r.addTimer(u, t, h);
                    var f = new i;
                    return f.to(t, .01, e), f.to(t, u.duration, a), f.to(t, u.duration, s), f.to(t, u.duration, o),
                        function (e) {
                            if (e) {
                                var i = t.data(n);
                                i && r.removeTimer(t, n, i)
                            }
                        }
                }, this.leave = function (t, u) {
                    var f = r.parseClassList(t);
                    f.motion = "leave", f.animation = l, f.timeoutKey = n, f.stagger = !0, r.addTimer(f, t, u);
                    var c = new i;
                    return c.to(t, h, o), c.to(t, f.duration, s), c.to(t, f.duration, a), c.to(t, f.duration, e),
                        function (e) {
                            if (e) {
                                var i = t.data(n);
                                i && r.removeTimer(t, n, i)
                            }
                        }
                }, this.move = this.enter, this.addClass = function (t, u, f) {
                    if ("ng-hide" === u) {
                        var c = r.parseClassList(t);
                        c.motion = "enter", c.animation = l, c.timeoutKey = n, r.addTimer(c, t, f);
                        var m = new i;
                        return m.to(t, h, o), m.to(t, c.duration, s), m.to(t, c.duration, a), m.to(t, c.duration, e),
                            function (e) {
                                if (e) {
                                    var i = t.data(n);
                                    i && r.removeTimer(t, n, i)
                                }
                            }
                    }
                    f()
                }, this.removeClass = function (t, u, f) {
                    if ("ng-hide" === u) {
                        var c = r.parseClassList(t);
                        c.motion = "leave", c.animation = l, c.timeoutKey = n;
                        var m = new i;
                        return m.to(t, h, e), m.to(t, c.duration, a), m.to(t, c.duration, s), m.to(t, c.duration, o),
                            function (e) {
                                if (e) {
                                    var i = t.data(n);
                                    i && r.removeTimer(t, n, i)
                                }
                            }
                    }
                    f()
                }
            }
        }]).factory("RotateAnimation", ["$timeout", "$window", "Assist", function (t, i, r) {
            return function (t) {
                var i = t.start,
                    a = t.end,
                    s = t.inverse,
                    o = t.animation;
                this.enter = function (t, s) {
                    var l = r.parseClassList(t);
                    return l.motion = "enter", l.animation = o, l.timeoutKey = n, a.ease = l.ease.easeOut, r.addTimer(l, t, s), e.set(t, i), e.to(t, l.duration, a),
                        function (e) {
                            if (e) {
                                var i = t.data(n);
                                i && r.removeTimer(t, n, i)
                            }
                        }
                }, this.leave = function (t, i) {
                    var l = r.parseClassList(t);
                    return l.motion = "leave", l.animation = o, l.timeoutKey = n, s.ease = l.ease.easeIn, r.addTimer(l, t, i), e.set(t, a), e.to(t, l.duration, s),
                        function (e) {
                            if (e) {
                                var i = t.data(n);
                                i && r.removeTimer(t, n, i)
                            }
                        }
                }, this.move = this.enter, this.addClass = function (t, s, l) {
                    if ("ng-hide" === s) {
                        var h = r.parseClassList(t);
                        return h.motion = "enter", h.animation = o, h.timeoutKey = n, r.addTimer(h, t, l), e.set(t, a), e.to(t, h.duration, i),
                            function (e) {
                                if (e) {
                                    var i = t.data(n);
                                    i && r.removeTimer(t, n, i)
                                }
                            }
                    }
                    l()
                }, this.removeClass = function (t, s, l) {
                    if ("ng-hide" === s) {
                        var h = r.parseClassList(t);
                        return h.motion = "enter", h.animation = o, h.timeoutKey = n, r.addTimer(h, t, l), e.set(t, i), e.to(t, h.duration, a),
                            function (e) {
                                if (e) {
                                    var i = t.data(n);
                                    i && r.removeTimer(t, n, i)
                                }
                            }
                    }
                    l()
                }
            }
        }]).factory("ZoomAnimation", ["$timeout", "$window", "Assist", function (t, i, r) {
            return function (t) {
                var i = t.start,
                    a = t.end,
                    s = t.animation;
                this.enter = function (t, o) {
                    var l = r.parseClassList(t);
                    return l.motion = "enter", l.animation = s, l.timeoutKey = n, a.ease = l.ease.easeOut, r.addTimer(l, t, o), e.set(t, i), e.to(t, l.duration, a),
                        function (e) {
                            if (e) {
                                var i = t.data(n);
                                i && r.removeTimer(t, n, i)
                            }
                        }
                }, this.leave = function (t, o) {
                    var l = r.parseClassList(t);
                    return l.motion = "leave", l.animation = s, l.timeoutKey = n, i.ease = l.ease.easeIn, r.addTimer(l, t, o), e.set(t, a), e.to(t, l.duration, i),
                        function (e) {
                            if (e) {
                                var i = t.data(n);
                                i && r.removeTimer(t, n, i)
                            }
                        }
                }, this.move = this.enter, this.removeClass = function (t, o, l) {
                    if ("ng-hide" === o) {
                        var h = r.parseClassList(t);
                        return h.motion = "leave", h.animation = s, h.timeoutKey = n, r.addTimer(h, t, l), e.set(t, i), e.to(t, h.duration, a),
                            function (e) {
                                if (e) {
                                    var i = t.data(n);
                                    i && r.removeTimer(t, n, i)
                                }
                            }
                    }
                    l()
                }, this.addClass = function (t, o, l) {
                    if ("ng-hide" === o) {
                        var h = r.parseClassList(t);
                        return h.motion = "enter", h.animation = s, h.timeoutKey = n, r.addTimer(h, t, l), e.set(t, a), e.to(t, h.duration, i),
                            function (e) {
                                if (e) {
                                    var i = t.data(n);
                                    i && r.removeTimer(t, n, i)
                                }
                            }
                    }
                    l()
                }
            }
        }]).factory("Flip3d", ["$window", function (i) {
            return function (n) {
                var r = n.axis,
                    a = "fx-flip" + r;
                this.addClass = function (r, s, o) {
                    var l = t.element(r.children()[0]),
                        h = function () {
                            return o()
                        };
                    s === a ? (n.transform.ease = i.Bounce.easeOut, n.transform.onComplete = h, e.to(l, n.duration, n.transform)) : o()
                }, this.removeClass = function (r, s, o) {
                    var l = t.element(r.children()[0]),
                        h = function () {
                            return o()
                        };
                    s === a ? (n.reset.ease = i.Bounce.easeOut, n.reset.onComplete = h, e.to(l, n.duration, n.reset)) : o()
                }
            }
        }])
    }(angular, TweenMax, TimelineMax),
    function (t) {
        "use strict";
        t.module("fx.animations.bounces", ["fx.animations.create"]).animation(".fx-bounce-normal", ["BounceAnimation", function (t) {
            var e = {
                first: {
                    opacity: 0,
                    transform: "scale(.3)"
                },
                mid: {
                    opacity: 1,
                    transform: "scale(1.05)"
                },
                third: {
                    transform: "scale(.9)"
                },
                end: {
                    opacity: 1,
                    transform: "scale(1)"
                },
                animation: "bounce-normal"
            };
            return new t(e)
        }]).animation(".fx-bounce-down", ["BounceAnimation", function (t) {
            var e = {
                first: {
                    opacity: 0,
                    transform: "translateY(-2000px)"
                },
                mid: {
                    opacity: 1,
                    transform: "translateY(30px)"
                },
                third: {
                    transform: "translateY(-10px)"
                },
                end: {
                    transform: "translateY(0)"
                },
                animation: "bounce-down"
            };
            return new t(e)
        }]).animation(".fx-bounce-left", ["BounceAnimation", function (t) {
            var e = {
                first: {
                    opacity: 0,
                    transform: "translateX(-2000px)"
                },
                mid: {
                    opacity: 1,
                    transform: "translateX(30px)"
                },
                third: {
                    transform: "translateX(-10px)"
                },
                end: {
                    transform: "translateX(0)"
                },
                animation: "bounce-left"
            };
            return new t(e)
        }]).animation(".fx-bounce-up", ["BounceAnimation", function (t) {
            var e = {
                first: {
                    opacity: 0,
                    transform: "translateY(2000px)"
                },
                mid: {
                    opacity: 1,
                    transform: "translateY(-30px)"
                },
                third: {
                    transform: "translateY(10px)"
                },
                end: {
                    transform: "translateY(0)"
                },
                animation: "bounce-up"
            };
            return new t(e)
        }]).animation(".fx-bounce-right", ["BounceAnimation", function (t) {
            var e = {
                first: {
                    opacity: 0,
                    transform: "translateX(2000px)"
                },
                mid: {
                    opacity: 1,
                    transform: "translateX(-30px)"
                },
                third: {
                    transform: "translateX(10px)"
                },
                end: {
                    transform: "translateX(0)"
                },
                animation: "bounce-right"
            };
            return new t(e)
        }])
    }(angular),
    function (t) {
        "use strict";
        t.module("fx.animations.fades", ["fx.animations.create"]).animation(".fx-fade-normal", ["FadeAnimation", function (t) {
            var e = {
                enter: {
                    opacity: 1
                },
                leave: {
                    opacity: 0
                },
                animation: "fade-normal"
            };
            return new t(e)
        }]).animation(".fx-fade-down", ["FadeAnimation", function (t) {
            var e = {
                enter: {
                    opacity: 1,
                    transform: "translateY(0)"
                },
                leave: {
                    opacity: 0,
                    transform: "translateY(-20px)"
                },
                inverse: {
                    opacity: 0,
                    transform: "translateY(20px)"
                },
                animation: "fade-down"
            };
            return new t(e)
        }]).animation(".fx-fade-down-big", ["FadeAnimation", function (t) {
            var e = {
                enter: {
                    opacity: 1,
                    transform: "translateY(0)"
                },
                leave: {
                    opacity: 0,
                    transform: "translateY(-2000px)"
                },
                inverse: {
                    opacity: 0,
                    transform: "translateY(2000px)"
                },
                animation: "fade-down-big"
            };
            return new t(e)
        }]).animation(".fx-fade-left", ["FadeAnimation", function (t) {
            var e = {
                enter: {
                    opacity: 1,
                    transform: "translateX(0)"
                },
                leave: {
                    opacity: 0,
                    transform: "translateX(-20px)"
                },
                inverse: {
                    opacity: 0,
                    transform: "translateX(20px)"
                },
                animation: "fade-left"
            };
            return new t(e)
        }]).animation(".fx-fade-left-big", ["FadeAnimation", function (t) {
            var e = {
                enter: {
                    opacity: 1,
                    transform: "translateX(0)"
                },
                leave: {
                    opacity: 0,
                    transform: "translateX(-2000px)"
                },
                inverse: {
                    opacity: 0,
                    transform: "translateX(2000px)"
                },
                animation: "fade-left-big"
            };
            return new t(e)
        }]).animation(".fx-fade-right", ["FadeAnimation", function (t) {
            var e = {
                enter: {
                    opacity: 1,
                    transform: "translateX(0)"
                },
                leave: {
                    opacity: 0,
                    transform: "translateX(20px)"
                },
                inverse: {
                    opacity: 0,
                    transform: "translateX(-20px)"
                },
                animation: "fade-right"
            };
            return new t(e)
        }]).animation(".fx-fade-right-big", ["FadeAnimation", function (t) {
            var e = {
                enter: {
                    opacity: 1,
                    transform: "translateX(0)"
                },
                leave: {
                    opacity: 0,
                    transform: "translateX(2000px)"
                },
                inverse: {
                    opacity: 0,
                    transform: "translateX(-2000px)"
                },
                animation: "fade-right-big"
            };
            return new t(e)
        }]).animation(".fx-fade-up", ["FadeAnimation", function (t) {
            var e = {
                enter: {
                    opacity: 1,
                    transform: "translateY(0)"
                },
                leave: {
                    opacity: 0,
                    transform: "translateY(20px)"
                },
                inverse: {
                    opacity: 0,
                    transform: "translateY(-20px)"
                },
                animation: "fade-up"
            };
            return new t(e)
        }]).animation(".fx-fade-up-big", ["FadeAnimation", function (t) {
            var e = {
                enter: {
                    opacity: 1,
                    transform: "translateY(0)"
                },
                leave: {
                    opacity: 0,
                    transform: "translateY(2000px)"
                },
                inverse: {
                    opacity: 0,
                    transform: "translateY(-2000px)"
                },
                animation: "fade-up-big"
            };
            return new t(e)
        }]).animation(".fx-fade-overlay", ["FadeAnimation", function (t) {
            var e = {
                enter: {
                    opacity: .7
                },
                leave: {
                    opacity: 0
                },
                inverse: {
                    opacity: 0
                },
                animation: "fade-overlay"
            };
            return new t(e)
        }])
    }(angular),
    function (t) {
        "use strict";
        t.module("fx.animations.rotations", ["fx.animations.create"]).animation(".fx-rotate-counterclock", ["RotateAnimation", function (t) {
            var e = {
                start: {
                    opacity: 0,
                    transformOrigin: "center center",
                    transform: "rotate(-200deg)"
                },
                end: {
                    opacity: 1,
                    transformOrigin: "center center",
                    transform: "rotate(0)"
                },
                inverse: {
                    opacity: 0,
                    transformOrigin: "center center",
                    transform: "rotate(200deg)"
                },
                animation: "rotate-counterclock"
            };
            return new t(e)
        }]).animation(".fx-rotate-clock", ["RotateAnimation", function (t) {
            var e = {
                start: {
                    opacity: 0,
                    transformOrigin: "center center",
                    transform: "rotate(200deg)"
                },
                end: {
                    opacity: 1,
                    transformOrigin: "center center",
                    transform: "rotate(0)"
                },
                inverse: {
                    opacity: 0,
                    transformOrigin: "center center",
                    transform: "rotate(-200deg)"
                },
                animation: "rotate-clock"
            };
            return new t(e)
        }]).animation(".fx-rotate-clock-left", ["RotateAnimation", function (t) {
            var e = {
                start: {
                    opacity: 0,
                    transformOrigin: "left bottom",
                    transform: "rotate(-90deg)"
                },
                end: {
                    opacity: 1,
                    transformOrigin: "left bottom",
                    transform: "rotate(0)"
                },
                inverse: {
                    opacity: 0,
                    transformOrigin: "left bottom",
                    transform: "rotate(90deg)"
                },
                animation: "rotate-clock-left"
            };
            return new t(e)
        }]).animation(".fx-rotate-counterclock-right", ["RotateAnimation", function (t) {
            var e = {
                start: {
                    opacity: 0,
                    transformOrigin: "right bottom",
                    transform: "rotate(90deg)"
                },
                end: {
                    opacity: 1,
                    transformOrigin: "right bottom",
                    transform: "rotate(0)"
                },
                inverse: {
                    opacity: 0,
                    transformOrigin: "right bottom",
                    transform: "rotate(-90deg)"
                },
                animation: "rotate-counterclock-right"
            };
            return new t(e)
        }]).animation(".fx-rotate-counterclock-up", ["RotateAnimation", function (t) {
            var e = {
                start: {
                    opacity: 0,
                    transformOrigin: "left bottom",
                    transform: "rotate(90deg)"
                },
                end: {
                    opacity: 1,
                    transformOrigin: "left bottom",
                    transform: "rotate(0)"
                },
                inverse: {
                    opacity: 0,
                    transformOrigin: "left bottom",
                    transform: "rotate(-90deg)"
                },
                animation: "rotate-counterclock-up"
            };
            return new t(e)
        }]).animation(".fx-rotate-clock-up", ["RotateAnimation", function (t) {
            var e = {
                start: {
                    opacity: 0,
                    transformOrigin: "right bottom",
                    transform: "rotate(-90deg)"
                },
                end: {
                    opacity: 1,
                    transformOrigin: "right bottom",
                    transform: "rotate(0)"
                },
                inverse: {
                    opacity: 0,
                    transformOrigin: "right bottom",
                    transform: "rotate(90deg)"
                },
                animation: "rotate-clock-up"
            };
            return new t(e)
        }])
    }(angular),
    function (t) {
        "use strict";
        t.module("fx.animations.zooms", ["fx.animations.create"]).animation(".fx-zoom-normal", ["ZoomAnimation", function (t) {
            var e = {
                start: {
                    opacity: 0,
                    transform: "scale(.3)"
                },
                end: {
                    opacity: 1,
                    transform: "scale(1)"
                },
                animation: "zoom-normal"
            };
            return new t(e)
        }]).animation(".fx-zoom-down", ["ZoomAnimation", function (t) {
            var e = {
                start: {
                    opacity: 0,
                    transform: "scale(.1) translateY(-2000px)"
                },
                end: {
                    opacity: 1,
                    transform: "scale(1) translateY(0)"
                },
                animation: "zoom-down"
            };
            return new t(e)
        }]).animation(".fx-zoom-up", ["ZoomAnimation", function (t) {
            var e = {
                start: {
                    opacity: 0,
                    transform: "scale(.1) translateY(2000px)"
                },
                end: {
                    opacity: 1,
                    transform: "scale(1) translateY(0)"
                },
                animation: "zoom-up"
            };
            return new t(e)
        }]).animation(".fx-zoom-right", ["ZoomAnimation", function (t) {
            var e = {
                start: {
                    opacity: 0,
                    transform: "scale(.1) translateX(2000px)"
                },
                end: {
                    opacity: 1,
                    transform: "scale(1) translateX(0)"
                },
                animation: "zoom-right"
            };
            return new t(e)
        }]).animation(".fx-zoom-left", ["ZoomAnimation", function (t) {
            var e = {
                start: {
                    opacity: 0,
                    transform: "scale(.1) translateX(-2000px)"
                },
                end: {
                    opacity: 1,
                    transform: "scale(1) translateX(0)"
                },
                animation: "zoom-left"
            };
            return new t(e)
        }])
    }(angular),
    function (t) {
        "use strict";
        var e = "$$fxtimer";
        t.module("fx.transitions.assist", []).factory("TransAssist", ["$timeout", function (t) {
            function i(i, n, r) {
                var a = t(function () {
                    r()
                }, 1e3 * n + 50);
                i.data(e, a)
            }

            function n(i) {
                var n = i.data(e);
                n && (i.css("z-index", "-1"), t.cancel(n), i.removeData(e))
            }
            return {
                addTimer: i,
                removeTimer: n
            }
        }])
    }(angular),
    function (t, e) {
        "use strict";

        function i(t, e) {
            t.css("position", "absolute"), e ? "leave" === e ? t.css("z-index", "9999") : t.css("z-index", "8888") : function () { }
        }

        function n(t, e) {
            var i = {
                position: "relative",
                width: "100%",
                height: "100%",
                "-webkit-perspective": "500px",
                "-moz-perspective": "500px",
                "-o-perspective": "500px",
                perspective: "500px"
            },
                n = {
                    overflow: "hidden",
                    "-webkit-backface-visibility": "hidden",
                    "-moz-backface-visibility": "hidden",
                    "backface-visibility": "hidden",
                    "-webkit-transform": "translate3d(0, 0, 0)",
                    "-moz-transform": "translate3d(0, 0, 0)",
                    transform: "translate3d(0, 0, 0),",
                    " -webkit-transform-style": "preserve-3d",
                    "-moz-transform-style": "preserve-3d",
                    "transform-style": "preserve-3d"
                };
            t.css(i), e.css(n)
        }
        t.module("fx.transitions.create", ["fx.transitions.assist", "fx.animations.assist"]).factory("SlideTransition", ["TransAssist", "Assist", function (t, n) {
            var r;
            return function (a) {
                a.from ? this.enter = function (s, o) {
                    var l;
                    return i(s), l = n.parseClassList(s, !0), a.from.ease = l.ease.easeInOut, a.duration = l.speed, t.addTimer(s, a.duration, o), r = new e, r.from(s, a.duration, a.from),
                        function (e) {
                            e && t.removeTimer(s)
                        }
                } : !a.from && a.to && (this.leave = function (s, o) {
                    var l;
                    return i(s), l = n.parseClassList(s, !0), a.to.ease = l.ease.easeInOut, a.duration = l.speed, t.addTimer(s, a.duration, o), r = new e, r.to(s, a.duration, a.to),
                        function (e) {
                            e && t.removeTimer(s)
                        }
                })
            }
        }]).factory("RotationTransition", ["TransAssist", "Assist", "$compile", function (r, a, s) {
            var o;
            return function (l) {
                this[l.when] = function (h, u) {
                    var f, c;
                    return c = s("<div></div>")(h.scope()), i(h), n(c, h), t.element(c).append(h[0].outerHTML), f = a.parseClassList(h, !0), l.from.ease = f.ease.easeOut, l.duration = f.duration, r.addTimer(h, l.duration, u), o = new e, o.from(h, 1, l.from).to(h, 1, l.to),
                        function (t) {
                            t && r.removeTimer(h)
                        }
                }
            }
        }])
    }(angular, TimelineMax),
    function () {
        "use strict";
        angular.module("fx.transitions.view", []).directive("fxAnimate", ["$injector", function (t) {
            return {
                link: function (e, i) {
                    function n(t, e) {
                        angular.forEach(t, function (t, i) {
                            "ease" === i && (t = "fx-easing-" + t), "speed" === i && (t = "fx-speed-" + t), e.addClass(t)
                        })
                    }
                    var r, a;
                    t.has("$state") && (r = t.get("$state")), t.has("$route") && (a = t.get("$route"));
                    var s;
                    if (r && r.current.animation && a && a.current && a.current.$$route && a.current.$$route.animation) throw new Error("You can only add animations on either $state or $route");
                    r && (s = r.current.animation), a && a.current && (s = a.current.$$route.animation), n(s, i)
                }
            }
        }])
    }(),
    function (t) {
        "use strict";
        t.module("fx.transitions.rotations", ["fx.transitions.create"]).animation(".rotate-out-right", ["RotationTransition", function (t) {
            var e = {
                from: {
                    transform: "rotateY(15deg)",
                    opacity: ".8"
                },
                to: {
                    transform: "scale(0.8) translateZ(-200px)",
                    opacity: "0"
                },
                when: "leave",
                duration: .5
            };
            return new t(e)
        }])
    }(angular),
    function (t) {
        "use strict";
        t.module("fx.transitions.scales", ["fx.transitions.create"]).animation(".shrink-in", ["SlideTransition", function (t) {
            var e = {
                from: {
                    opacity: "0",
                    transform: "translateZ(0) scale(1.2)"
                },
                duration: .5
            };
            return new t(e)
        }]).animation(".shrink-out", ["SlideTransition", function (t) {
            var e = {
                to: {
                    opacity: "0",
                    transform: "translateZ(0) scale(.8)"
                },
                duration: .5
            };
            return new t(e)
        }]).animation(".grow-in", ["SlideTransition", function (t) {
            var e = {
                from: {
                    opacity: "0",
                    transform: "translateZ(0) scale(.8)"
                },
                duration: .5
            };
            return new t(e)
        }]).animation(".grow-out", ["SlideTransition", function (t) {
            var e = {
                to: {
                    opacity: "0",
                    transform: "translateZ(0) scale(1.2)"
                },
                duration: .5
            };
            return new t(e)
        }])
    }(angular),
    function (t) {
        "use strict";
        t.module("fx.transitions.slides", ["fx.transitions.create"]).animation(".slide-in-left", ["SlideTransition", function (t) {
            var e = {
                from: {
                    transform: "translateZ(0) translateX(100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-out-left", ["SlideTransition", function (t) {
            var e = {
                to: {
                    transform: "translateZ(0) translateX(-100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-in-right", ["SlideTransition", function (t) {
            var e = {
                from: {
                    transform: "translateZ(0) translateX(-100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-out-right", ["SlideTransition", function (t) {
            var e = {
                to: {
                    transform: "translateZ(0) translateX(100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-in-down", ["SlideTransition", function (t) {
            var e = {
                from: {
                    transform: "translateZ(0) translateY(-100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-out-down", ["SlideTransition", function (t) {
            var e = {
                to: {
                    transform: "translateZ(0) translateY(100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-in-up", ["SlideTransition", function (t) {
            var e = {
                from: {
                    transform: "translateZ(0) translateY(100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-out-up", ["SlideTransition", function (t) {
            var e = {
                to: {
                    transform: "translateZ(0) translateY(-100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-in-left-fade", ["SlideTransition", function (t) {
            var e = {
                from: {
                    opacity: "0.3",
                    transform: "translateZ(0) translateX(100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-out-left-fade", ["SlideTransition", function (t) {
            var e = {
                to: {
                    opacity: "0.3",
                    transform: "translateZ(0) translateX(-100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-in-right-fade", ["SlideTransition", function (t) {
            var e = {
                from: {
                    opacity: "0.3",
                    transform: "translateZ(0) translateX(-100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-out-right-fade", ["SlideTransition", function (t) {
            var e = {
                to: {
                    opacity: "0.3",
                    transform: "translateZ(0) translateX(100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-in-down-fade", ["SlideTransition", function (t) {
            var e = {
                from: {
                    opacity: "0.3",
                    transform: "translateZ(0) translateY(-100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-out-down-fade", ["SlideTransition", function (t) {
            var e = {
                to: {
                    opacity: "0.3",
                    transform: "translateZ(0) translateY(100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-in-up-fade", ["SlideTransition", function (t) {
            var e = {
                from: {
                    opacity: "0.3",
                    transform: "translateZ(0) translateY(100%)"
                },
                duration: 2
            };
            return new t(e)
        }]).animation(".slide-out-up-fade", ["SlideTransition", function (t) {
            var e = {
                to: {
                    opacity: "0.3",
                    transform: "translateZ(0) translateY(-100%)"
                },
                duration: 2
            };
            return new t(e)
        }])
    }(angular),
    function (t, e) {
        "use strict";
        t.module("fx.transitions.specials", []).animation(".fx-fall-out", function () {
            return {
                leave: function (t, i) {
                    t.css("z-index", "9999");
                    var n = new e({
                        onComplete: i
                    });
                    n.to(t, {
                        transform: "rotateZ(0deg)"
                    }).to(t, .1, {
                        transform: "rotateZ(10deg)"
                    }).to(t, .3, {
                        transform: "rotateZ(17deg)"
                    }).to(t, .5, {
                        transform: "rotateZ(15deg)"
                    }).to(t, .2, {
                        transform: "translateY(100%) rotateZ(17deg)"
                    })
                }
            }
        })
    }(angular, TimelineMax),
    function (t) {
        "use strict";
        t.module("fx.animations", ["fx.animations.fades", "fx.animations.bounces", "fx.animations.rotations", "fx.animations.zooms"]), t.module("fx.transitions", ["fx.transitions.slides", "fx.transitions.scales", "fx.transitions.rotations", "fx.transitions.specials", "fx.transitions.view"]), t.module("ngFx", ["fx.animations", "fx.transitions", "ngAnimate"])
    }(angular);