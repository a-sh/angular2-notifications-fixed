import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Injectable, InjectionToken, Input, NgModule, NgZone, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DEFAULT_ICONS = {
    alert: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z\"/>\n        </svg>\n    ",
    error: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0V0z\" fill=\"none\"/>\n            <path d=\"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"/>\n        </svg>\n    ",
    info: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z\"/>\n        </svg>\n    ",
    success: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\"/>\n        </svg>\n    ",
    warn: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" width=\"64\" viewBox=\"0 0 64 64\" height=\"64\">\n          <circle cx=\"32.086\" cy=\"50.142\" r=\"2.256\"/>\n          <path d=\"M30.08 25.012V42.32c0 1.107.897 2.005 2.006 2.005s2.006-.897 2.006-2.005V25.012c0-1.107-.897-2.006-2.006-2.006s-2.006.898-2.006 2.006z\"/>\n          <path d=\"M63.766 59.234L33.856 3.082c-.697-1.308-2.844-1.308-3.54 0L.407 59.234c-.331.622-.312 1.372.051 1.975.362.605 1.015.975 1.72.975h59.816c.705 0 1.357-.369 1.721-.975.361-.603.381-1.353.051-1.975zM5.519 58.172L32.086 8.291l26.568 49.881H5.519z\"/>\n        </svg>\n    "
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NotificationsService = /** @class */ (function () {
    function NotificationsService(globalOptions) {
        this.globalOptions = globalOptions;
        this.emitter = new Subject();
        this.icons = DEFAULT_ICONS;
    }
    /**
     * @param {?} notification
     * @param {?} to
     * @return {?}
     */
    NotificationsService.prototype.set = /**
     * @param {?} notification
     * @param {?} to
     * @return {?}
     */
    function (notification, to) {
        notification.id = notification.override && notification.override.id ? notification.override.id : Math.random().toString(36).substring(3);
        notification.click = new EventEmitter();
        notification.timeoutEnd = new EventEmitter();
        this.emitter.next({ command: 'set', notification: notification, add: to });
        return notification;
    };
    
    /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} override
     * @return {?}
     */
    NotificationsService.prototype.success = /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} override
     * @return {?}
     */
    function (title, content, override) {
        if (title === void 0) { title = ''; }
        if (content === void 0) { content = ''; }
        return this.set({ title: title, content: content || '', type: 'success', icon: this.icons.success, override: override }, true);
    };
    /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} override
     * @return {?}
     */
    NotificationsService.prototype.error = /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} override
     * @return {?}
     */
    function (title, content, override) {
        if (title === void 0) { title = ''; }
        if (content === void 0) { content = ''; }
        return this.set({ title: title, content: content || '', type: 'error', icon: this.icons.error, override: override }, true);
    };
    /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} override
     * @return {?}
     */
    NotificationsService.prototype.alert = /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} override
     * @return {?}
     */
    function (title, content, override) {
        if (title === void 0) { title = ''; }
        if (content === void 0) { content = ''; }
        return this.set({ title: title, content: content || '', type: 'alert', icon: this.icons.alert, override: override }, true);
    };
    /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} override
     * @return {?}
     */
    NotificationsService.prototype.info = /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} override
     * @return {?}
     */
    function (title, content, override) {
        if (title === void 0) { title = ''; }
        if (content === void 0) { content = ''; }
        return this.set({ title: title, content: content || '', type: 'info', icon: this.icons.info, override: override }, true);
    };
    /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} override
     * @return {?}
     */
    NotificationsService.prototype.warn = /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} override
     * @return {?}
     */
    function (title, content, override) {
        if (title === void 0) { title = ''; }
        if (content === void 0) { content = ''; }
        return this.set({ title: title, content: content || '', type: 'warn', icon: this.icons.warn, override: override }, true);
    };
    /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} override
     * @return {?}
     */
    NotificationsService.prototype.bare = /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} override
     * @return {?}
     */
    function (title, content, override) {
        if (title === void 0) { title = ''; }
        if (content === void 0) { content = ''; }
        return this.set({ title: title, content: content || '', type: 'bare', icon: 'bare', override: override }, true);
    };
    // With type method
    /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} type
     * @param {?=} override
     * @return {?}
     */
    NotificationsService.prototype.create = /**
     * @param {?=} title
     * @param {?=} content
     * @param {?=} type
     * @param {?=} override
     * @return {?}
     */
    function (title, content, type, override) {
        if (title === void 0) { title = ''; }
        if (content === void 0) { content = ''; }
        if (type === void 0) { type = 'success'; }
        return this.set({ title: title, content: content, type: type, icon: (/** @type {?} */ (this.icons))[type], override: override }, true);
    };
    // HTML Notification method
    /**
     * @param {?} html
     * @param {?=} type
     * @param {?=} override
     * @param {?=} icon
     * @return {?}
     */
    NotificationsService.prototype.html = /**
     * @param {?} html
     * @param {?=} type
     * @param {?=} override
     * @param {?=} icon
     * @return {?}
     */
    function (html, type, override, icon) {
        if (type === void 0) { type = 'success'; }
        if (icon === void 0) { icon = 'bare'; }
        return this.set({ html: html, type: type, icon: (/** @type {?} */ (this.icons))[icon], override: override }, true);
    };
    // Remove all notifications method
    /**
     * @param {?=} id
     * @return {?}
     */
    NotificationsService.prototype.remove = /**
     * @param {?=} id
     * @return {?}
     */
    function (id) {
        if (id) {
            this.emitter.next({ command: 'clean', id: id });
        }
        else {
            this.emitter.next({ command: 'cleanAll' });
        }
    };
    NotificationsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NotificationsService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['options',] },] },
    ]; };
    return NotificationsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SimpleNotificationsComponent = /** @class */ (function () {
    function SimpleNotificationsComponent(service, cdr) {
        this.service = service;
        this.cdr = cdr;
        this.onCreate = new EventEmitter();
        this.onDestroy = new EventEmitter();
        this.notifications = [];
        this.position = ['bottom', 'right'];
        this.lastOnBottom = true;
        this.maxStack = 8;
        this.preventLastDuplicates = false;
        this.preventDuplicates = false;
        this.timeOut = 0;
        this.maxLength = 0;
        this.clickToClose = true;
        this.clickIconToClose = false;
        this.showProgressBar = true;
        this.pauseOnHover = true;
        this.theClass = '';
        this.rtl = false;
        this.animate = 'fromRight';
        this._usingComponentOptions = false;
    }
    Object.defineProperty(SimpleNotificationsComponent.prototype, "options", {
        set: /**
         * @param {?} opt
         * @return {?}
         */
        function (opt) {
            this._usingComponentOptions = true;
            this.attachChanges(opt);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SimpleNotificationsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /**
             * Only attach global options if config
             * options were never sent through input
             */
        if (!this._usingComponentOptions) {
            this.attachChanges(this.service.globalOptions);
        }
        this.listener = this.service.emitter
            .subscribe(function (item) {
            switch (item.command) {
                case 'cleanAll':
                    _this.notifications = [];
                    break;
                case 'clean':
                    _this.cleanSingle(/** @type {?} */ ((item.id)));
                    break;
                case 'set':
                    if (item.add) {
                        _this.add(/** @type {?} */ ((item.notification)));
                    }
                    else {
                        _this.defaultBehavior(item);
                    }
                    break;
                default:
                    _this.defaultBehavior(item);
                    break;
            }
            if (!_this.cdr['destroyed']) {
                _this.cdr.detectChanges();
            }
        });
    };
    /**
     * @return {?}
     */
    SimpleNotificationsComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.listener) {
            this.listener.unsubscribe();
        }
        this.cdr.detach();
    };
    // Default behavior on event
    /**
     * @param {?} value
     * @return {?}
     */
    SimpleNotificationsComponent.prototype.defaultBehavior = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.notifications.splice(this.notifications.indexOf(value.notification), 1);
        this.onDestroy.emit(this.buildEmit(value.notification, false));
    };
    // Add the new notification to the notification array
    /**
     * @param {?} item
     * @return {?}
     */
    SimpleNotificationsComponent.prototype.add = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        item.createdOn = new Date();
        var /** @type {?} */ toBlock = this.preventLastDuplicates || this.preventDuplicates ? this.block(item) : false;
        // Save this as the last created notification
        this.lastNotificationCreated = item;
        // Override icon if set
        if (item.override && item.override.icons && item.override.icons[item.type]) {
            item.icon = item.override.icons[item.type];
        }
        if (!toBlock) {
            // Check if the notification should be added at the start or the end of the array
            if (this.lastOnBottom) {
                if (this.notifications.length >= this.maxStack) {
                    this.notifications.splice(0, 1);
                }
                this.notifications.push(item);
            }
            else {
                if (this.notifications.length >= this.maxStack) {
                    this.notifications.splice(this.notifications.length - 1, 1);
                }
                this.notifications.splice(0, 0, item);
            }
            this.onCreate.emit(this.buildEmit(item, true));
        }
    };
    // Check if notifications should be prevented
    /**
     * @param {?} item
     * @return {?}
     */
    SimpleNotificationsComponent.prototype.block = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ toCheck = item.html ? this.checkHtml : this.checkStandard;
        if (this.preventDuplicates && this.notifications.length > 0) {
            for (var /** @type {?} */ i = 0; i < this.notifications.length; i++) {
                if (toCheck(this.notifications[i], item)) {
                    return true;
                }
            }
        }
        if (this.preventLastDuplicates) {
            var /** @type {?} */ comp = void 0;
            if (this.preventLastDuplicates === 'visible' && this.notifications.length > 0) {
                if (this.lastOnBottom) {
                    comp = this.notifications[this.notifications.length - 1];
                }
                else {
                    comp = this.notifications[0];
                }
            }
            else if (this.preventLastDuplicates === 'all' && this.lastNotificationCreated) {
                comp = this.lastNotificationCreated;
            }
            else {
                return false;
            }
            return toCheck(comp, item);
        }
        return false;
    };
    /**
     * @param {?} checker
     * @param {?} item
     * @return {?}
     */
    SimpleNotificationsComponent.prototype.checkStandard = /**
     * @param {?} checker
     * @param {?} item
     * @return {?}
     */
    function (checker, item) {
        return checker.type === item.type && checker.title === item.title && checker.content === item.content;
    };
    /**
     * @param {?} checker
     * @param {?} item
     * @return {?}
     */
    SimpleNotificationsComponent.prototype.checkHtml = /**
     * @param {?} checker
     * @param {?} item
     * @return {?}
     */
    function (checker, item) {
        return checker.html ? checker.type === item.type && checker.title === item.title && checker.content === item.content && checker.html === item.html : false;
    };
    // Attach all the changes received in the options object
    /**
     * @param {?} options
     * @return {?}
     */
    SimpleNotificationsComponent.prototype.attachChanges = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        for (var /** @type {?} */ key in options) {
            if (this.hasOwnProperty(key)) {
                (/** @type {?} */ (this))[key] = options[key];
            }
            else if (key === 'icons') {
                this.service.icons = options[key];
            }
        }
    };
    /**
     * @param {?} notification
     * @param {?} to
     * @return {?}
     */
    SimpleNotificationsComponent.prototype.buildEmit = /**
     * @param {?} notification
     * @param {?} to
     * @return {?}
     */
    function (notification, to) {
        var /** @type {?} */ toEmit = {
            createdOn: notification.createdOn,
            type: notification.type,
            icon: notification.icon,
            id: notification.id
        };
        if (notification.html) {
            toEmit.html = notification.html;
        }
        else {
            toEmit.title = notification.title;
            toEmit.content = notification.content;
        }
        if (!to) {
            toEmit.destroyedOn = new Date();
        }
        return toEmit;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    SimpleNotificationsComponent.prototype.cleanSingle = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var /** @type {?} */ indexOfDelete = 0;
        var /** @type {?} */ doDelete = false;
        var /** @type {?} */ noti;
        this.notifications.forEach(function (notification, idx) {
            if (notification.id === id) {
                indexOfDelete = idx;
                noti = notification;
                doDelete = true;
            }
        });
        if (doDelete) {
            this.notifications.splice(indexOfDelete, 1);
            this.onDestroy.emit(this.buildEmit(noti, false));
        }
    };
    SimpleNotificationsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'simple-notifications',
                    encapsulation: ViewEncapsulation.None,
                    template: "<div class=\"simple-notification-wrapper\" [ngClass]=\"position\"> <simple-notification *ngFor=\"let a of notifications; let i = index\" [item]=\"a\" [timeOut]=\"timeOut\" [clickToClose]=\"clickToClose\" [clickIconToClose]=\"clickIconToClose\" [maxLength]=\"maxLength\" [showProgressBar]=\"showProgressBar\" [pauseOnHover]=\"pauseOnHover\" [theClass]=\"theClass\" [rtl]=\"rtl\" [animate]=\"animate\" [position]=\"i\"> </simple-notification> </div>",
                    styles: [".simple-notification-wrapper { position: fixed; width: 300px; z-index: 1000; } .simple-notification-wrapper.left { left: 20px; } .simple-notification-wrapper.top { top: 20px; } .simple-notification-wrapper.right { right: 20px; } .simple-notification-wrapper.bottom { bottom: 20px; } .simple-notification-wrapper.center { left: 50%; transform: translateX(-50%); } .simple-notification-wrapper.middle { top: 50%; transform: translateY(-50%); } .simple-notification-wrapper.middle.center { transform: translate(-50%, -50%); } @media (max-width: 340px) { .simple-notification-wrapper { width: auto; left: 20px; right: 20px; } }"],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SimpleNotificationsComponent.ctorParameters = function () { return [
        { type: NotificationsService, },
        { type: ChangeDetectorRef, },
    ]; };
    SimpleNotificationsComponent.propDecorators = {
        "options": [{ type: Input },],
        "onCreate": [{ type: Output },],
        "onDestroy": [{ type: Output },],
    };
    return SimpleNotificationsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(notificationService, domSanitizer, cdr, zone) {
        var _this = this;
        this.notificationService = notificationService;
        this.domSanitizer = domSanitizer;
        this.cdr = cdr;
        this.zone = zone;
        this.titleIsTemplate = false;
        this.contentIsTemplate = false;
        this.htmlIsTemplate = false;
        this.progressWidth = 0;
        this.stopTime = false;
        this.framesPerSecond = 40;
        this.instance = function () {
            var /** @type {?} */ now = new Date().getTime();
            if (_this.endTime < now) {
                _this.remove(); /** @type {?} */
                ((_this.item.timeoutEnd)).emit();
            }
            else if (!_this.stopTime) {
                if (_this.showProgressBar) {
                    _this.progressWidth = Math.min((now - _this.startTime + _this.sleepTime /* We add this.sleepTime just to have 100% before close */) * 100 / _this.timeOut, 100);
                }
                _this.timer = setTimeout(_this.instance, _this.sleepTime);
            }
            _this.zone.run(function () {
                if (!_this.cdr['destroyed']) {
                    _this.cdr.detectChanges();
                }
            });
        };
    }
    /**
     * @return {?}
     */
    NotificationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.item.override) {
            this.attachOverrides();
        }
        if (this.animate) {
            this.item.state = this.animate;
        }
        if (this.timeOut !== 0) {
            this.startTimeOut();
        }
        this.contentType(this.item.title, 'title');
        this.contentType(this.item.content, 'content');
        this.contentType(this.item.html, 'html');
        this.safeSvg = this.domSanitizer.bypassSecurityTrustHtml(this.icon || this.item.icon);
        this.safeInputHtml = this.domSanitizer.bypassSecurityTrustHtml(this.item.html);
    };
    /**
     * @return {?}
     */
    NotificationComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        clearTimeout(this.timer);
        this.cdr.detach();
    };
    /**
     * @return {?}
     */
    NotificationComponent.prototype.startTimeOut = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.sleepTime = 1000 / this.framesPerSecond /* ms */;
        this.startTime = new Date().getTime();
        this.endTime = this.startTime + this.timeOut;
        this.zone.runOutsideAngular(function () { return _this.timer = setTimeout(_this.instance, _this.sleepTime); });
    };
    /**
     * @return {?}
     */
    NotificationComponent.prototype.onEnter = /**
     * @return {?}
     */
    function () {
        if (this.pauseOnHover) {
            this.stopTime = true;
        }
    };
    /**
     * @return {?}
     */
    NotificationComponent.prototype.onLeave = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.pauseOnHover) {
            this.stopTime = false;
            this.zone.runOutsideAngular(function () { return setTimeout(_this.instance, _this.sleepTime); });
        }
    };
    /**
     * @param {?} $e
     * @return {?}
     */
    NotificationComponent.prototype.onClick = /**
     * @param {?} $e
     * @return {?}
     */
    function ($e) {
        /** @type {?} */ ((this.item.click)).emit($e);
        if (this.clickToClose) {
            this.remove();
        }
    };
    /**
     * @param {?} $e
     * @return {?}
     */
    NotificationComponent.prototype.onClickIcon = /**
     * @param {?} $e
     * @return {?}
     */
    function ($e) {
        /** @type {?} */ ((this.item.clickIcon)).emit($e);
        if (this.clickIconToClose) {
            this.remove();
        }
    };
    // Attach all the overrides
    /**
     * @return {?}
     */
    NotificationComponent.prototype.attachOverrides = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.item.override).forEach(function (a) {
            if (_this.hasOwnProperty(a)) {
                (/** @type {?} */ (_this))[a] = _this.item.override[a];
            }
        });
    };
    /**
     * @return {?}
     */
    NotificationComponent.prototype.remove = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.animate) {
            this.item.state = this.animate + 'Out';
            setTimeout(function () {
                _this.notificationService.set(_this.item, false);
            }, 310);
        }
        else {
            this.notificationService.set(this.item, false);
        }
    };
    /**
     * @param {?} item
     * @param {?} key
     * @return {?}
     */
    NotificationComponent.prototype.contentType = /**
     * @param {?} item
     * @param {?} key
     * @return {?}
     */
    function (item, key) {
        if (item instanceof TemplateRef) {
            this[key] = item;
        }
        else {
            this[key] = this.domSanitizer.bypassSecurityTrustHtml(item);
        }
        this[key + 'IsTemplate'] = item instanceof TemplateRef;
    };
    NotificationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'simple-notification',
                    encapsulation: ViewEncapsulation.None,
                    animations: [
                        trigger('enterLeave', [
                            // Fade
                            state('fade', style({ opacity: 1 })),
                            transition('* => fade', [
                                style({ opacity: 0 }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fadeOut', style({ opacity: 0 })),
                            transition('fade => fadeOut', [
                                style({ opacity: 1 }),
                                animate('300ms ease-in-out')
                            ]),
                            // Enter from top
                            state('fromTop', style({ opacity: 1, transform: 'translateY(0)' })),
                            transition('* => fromTop', [
                                style({ opacity: 0, transform: 'translateY(-5%)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fromTopOut', style({ opacity: 0, transform: 'translateY(5%)' })),
                            transition('fromTop => fromTopOut', [
                                style({ opacity: 1, transform: 'translateY(0)' }),
                                animate('300ms ease-in-out')
                            ]),
                            // Enter from right
                            state('fromRight', style({ opacity: 1, transform: 'translateX(0)' })),
                            transition('* => fromRight', [
                                style({ opacity: 0, transform: 'translateX(5%)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fromRightOut', style({ opacity: 0, transform: 'translateX(-5%)' })),
                            transition('fromRight => fromRightOut', [
                                style({ opacity: 1, transform: 'translateX(0)' }),
                                animate('300ms ease-in-out')
                            ]),
                            // Enter from bottom
                            state('fromBottom', style({ opacity: 1, transform: 'translateY(0)' })),
                            transition('* => fromBottom', [
                                style({ opacity: 0, transform: 'translateY(5%)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fromBottomOut', style({ opacity: 0, transform: 'translateY(-5%)' })),
                            transition('fromBottom => fromBottomOut', [
                                style({ opacity: 1, transform: 'translateY(0)' }),
                                animate('300ms ease-in-out')
                            ]),
                            // Enter from left
                            state('fromLeft', style({ opacity: 1, transform: 'translateX(0)' })),
                            transition('* => fromLeft', [
                                style({ opacity: 0, transform: 'translateX(-5%)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fromLeftOut', style({ opacity: 0, transform: 'translateX(5%)' })),
                            transition('fromLeft => fromLeftOut', [
                                style({ opacity: 1, transform: 'translateX(0)' }),
                                animate('300ms ease-in-out')
                            ]),
                            // Rotate
                            state('scale', style({ opacity: 1, transform: 'scale(1)' })),
                            transition('* => scale', [
                                style({ opacity: 0, transform: 'scale(0)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('scaleOut', style({ opacity: 0, transform: 'scale(0)' })),
                            transition('scale => scaleOut', [
                                style({ opacity: 1, transform: 'scale(1)' }),
                                animate('400ms ease-in-out')
                            ]),
                            // Scale
                            state('rotate', style({ opacity: 1, transform: 'rotate(0deg)' })),
                            transition('* => rotate', [
                                style({ opacity: 0, transform: 'rotate(5deg)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('rotateOut', style({ opacity: 0, transform: 'rotate(-5deg)' })),
                            transition('rotate => rotateOut', [
                                style({ opacity: 1, transform: 'rotate(0deg)' }),
                                animate('400ms ease-in-out')
                            ])
                        ])
                    ],
                    template: "<div class=\"simple-notification\" [@enterLeave]=\"item.state\" (click)=\"onClick($event)\" [class]=\"theClass\" [ngClass]=\"{ 'alert': item.type === 'alert', 'error': item.type === 'error', 'warn': item.type === 'warn', 'success': item.type === 'success', 'info': item.type === 'info', 'bare': item.type === 'bare', 'rtl-mode': rtl, 'has-icon': item.icon !== 'bare' }\" (mouseenter)=\"onEnter()\" (mouseleave)=\"onLeave()\"> <div *ngIf=\"!item.html\"> <div class=\"sn-title\" *ngIf=\"titleIsTemplate else regularTitle\"> <ng-container *ngTemplateOutlet=\"title\"></ng-container> </div> <ng-template #regularTitle> <div class=\"sn-title\" [innerHTML]=\"title\"></div> </ng-template> <div class=\"sn-content\" *ngIf=\"contentIsTemplate else regularContent\"> <ng-container *ngTemplateOutlet=\"content\"></ng-container> </div> <ng-template #regularContent> <div class=\"sn-content\" [innerHTML]=\"content\"></div> </ng-template> <div class=\"icon\" *ngIf=\"item.icon !== 'bare'\" [innerHTML]=\"safeSvg\"></div> </div> <div *ngIf=\"item.html\"> <div class=\"sn-html\" *ngIf=\"htmlIsTemplate else regularHtml\"> <ng-container *ngTemplateOutlet=\"item.html\"></ng-container> </div> <ng-template #regularHtml> <div class=\"sn-content\" [innerHTML]=\"safeInputHtml\"></div> </ng-template> <div class=\"icon\" [class.icon-hover]=\"clickIconToClose\" *ngIf=\"item.icon\" [innerHTML]=\"safeSvg\" (click)=\"onClickIcon($event)\"></div> </div> <div class=\"sn-progress-loader\" *ngIf=\"showProgressBar\"> <span [ngStyle]=\"{'width': progressWidth + '%'}\"></span> </div> </div> ",
                    styles: [".simple-notification { width: 100%; padding: 10px 20px; box-sizing: border-box; position: relative; float: left; margin-bottom: 10px; color: #fff; cursor: pointer; transition: all 0.5s; min-height: 70px; } .simple-notification .sn-title, .simple-notification .sn-content, .simple-notification .sn-html { margin: 0; } .simple-notification .sn-title { line-height: 30px; font-size: 20px; } .simple-notification .sn-content { font-size: 16px; line-height: 20px; } .simple-notification.has-icon .sn-title, .simple-notification.has-icon .sn-content, .simple-notification.has-icon .sn-html { padding: 0 50px 0 0; } .simple-notification .icon { position: absolute; box-sizing: border-box; top: 0; right: 0; width: 70px; height: 70px; padding: 10px; } .simple-notification .icon.icon-hover:hover { opacity: 0.5; } .simple-notification .icon svg { fill: #fff; width: 100%; height: 100%; } .simple-notification .icon svg g { fill: #fff; } .simple-notification.rtl-mode.has-icon .sn-title, .simple-notification.rtl-mode.has-icon .sn-content, .simple-notification.rtl-mode.has-icon .sn-html { padding: 0 0 0 50px; } .simple-notification.rtl-mode { direction: rtl; } .simple-notification.rtl-mode .sn-content { padding: 0 0 0 50px; } .simple-notification.rtl-mode svg { left: 0; right: auto; } .simple-notification.error { background: #F44336; } .simple-notification.success { background: #8BC34A; } .simple-notification.alert { background: #ffdb5b; } .simple-notification.info { background: #03A9F4; } .simple-notification.warn { background: #ffdb5b; } .simple-notification .sn-progress-loader { position: absolute; top: 0; left: 0; width: 100%; height: 5px; } .simple-notification .sn-progress-loader span { float: left; height: 100%; } .simple-notification.success .sn-progress-loader span { background: #689F38; } .simple-notification.error .sn-progress-loader span { background: #D32F2F; } .simple-notification.alert .sn-progress-loader span { background: #edc242; } .simple-notification.info .sn-progress-loader span { background: #0288D1; } .simple-notification.warn .sn-progress-loader span { background: #edc242; } .simple-notification.bare .sn-progress-loader span { background: #ccc; } .simple-notification.warn div .sn-title, .simple-notification.warn div .sn-content, .simple-notification.warn div .sn-html { color: #444; }"],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    NotificationComponent.ctorParameters = function () { return [
        { type: NotificationsService, },
        { type: DomSanitizer, },
        { type: ChangeDetectorRef, },
        { type: NgZone, },
    ]; };
    NotificationComponent.propDecorators = {
        "timeOut": [{ type: Input },],
        "showProgressBar": [{ type: Input },],
        "pauseOnHover": [{ type: Input },],
        "clickToClose": [{ type: Input },],
        "clickIconToClose": [{ type: Input },],
        "maxLength": [{ type: Input },],
        "theClass": [{ type: Input },],
        "rtl": [{ type: Input },],
        "animate": [{ type: Input },],
        "position": [{ type: Input },],
        "item": [{ type: Input },],
    };
    return NotificationComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DEFAULT_OPTIONS = {
    position: ['bottom', 'right'],
    timeOut: 0,
    showProgressBar: true,
    pauseOnHover: true,
    lastOnBottom: true,
    clickToClose: true,
    clickIconToClose: false,
    maxLength: 0,
    maxStack: 8,
    preventDuplicates: false,
    preventLastDuplicates: false,
    theClass: '',
    rtl: false,
    animate: 'fromRight',
    icons: DEFAULT_ICONS
};

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var OPTIONS = new InjectionToken('options');
/**
 * @param {?} options
 * @return {?}
 */
function optionsFactory(options) {
    return __assign({}, DEFAULT_OPTIONS, options);
}
var SimpleNotificationsModule = /** @class */ (function () {
    function SimpleNotificationsModule() {
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    SimpleNotificationsModule.forRoot = /**
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return {
            ngModule: SimpleNotificationsModule,
            providers: [
                NotificationsService,
                {
                    provide: OPTIONS,
                    useValue: options
                },
                {
                    provide: 'options',
                    useFactory: optionsFactory,
                    deps: [OPTIONS]
                }
            ]
        };
    };
    SimpleNotificationsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        SimpleNotificationsComponent,
                        NotificationComponent
                    ],
                    exports: [SimpleNotificationsComponent]
                },] },
    ];
    return SimpleNotificationsModule;
}());

export { OPTIONS, optionsFactory, SimpleNotificationsModule, NotificationComponent, SimpleNotificationsComponent, NotificationsService };
