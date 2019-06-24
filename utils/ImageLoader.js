/*!
 * ImageLoader.js v1.0.0
 * (c) 2019 bear.xiong
 * Released under the MIT License.
 */
(function(globel, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global.ImageLoader = factory());
}(this, (function() {
    'use strict';

    function Img({
        src,
        status = false
    }) {
        this.src = src;
        this.status = status;
    }
    /**
     * ImageLoader Constructor
     */
    function ImageLoader(options) {
        if ("development" !== 'production' &&
            !(this instanceof ImageLoader)
        ) {
            console.error('ImageLoader is a constructor and should be called with the `new` keyword');
        }
        this._init(options);
    }
    /**
     * init options.
     */
    ImageLoader.prototype._init = function({
        base,
        source,
        loading,
        loaded
    }) {
        if (typeof base !== undefined) {
            this.base = base;
        } else {
            console.error('base is a required');
            return;
        }
        this.source = source;
        this.loading = loading;
        this.loaded = loaded;
        this.time = 0;
        this.total = 0;
        let successCount = 0;
        let failCount = 0;
        Object.defineProperty(this, 'successCount', {
            get() {
                return successCount
            },
            set(value) {
                this.sourceLoaded();
                successCount = value;
            }
        });
        Object.defineProperty(this, 'failCount', {
            get() {
                return failCount
            },
            set(value) {
                this.sourceLoaded();
                failCount = value;
            }
        });
        this.start = +new Date();
        this.readyLoad = this.loadSource();
    }

    // All loaded.
    ImageLoader.prototype.sourceLoaded = function() {
        if (this.successCount + this.failCount === this.total) {
            this.loaded({
                status: true,
                timecost: +new Date() - this.start,
                success: this.successCount,
                fail: this.failCount,
                totalcount: this.total,
                sourceLoaded: this.readyLoad
            });
        } else {
            this.loading({
                status: false,
                percent: this.successCount / this.total
            });
        }
    }

    // Initialize soure, add base.
    ImageLoader.prototype.loadSource = function() {
        // copy source data
        let sourceCopy = [];
        try {
            sourceCopy = JSON.parse(JSON.stringify(this.source))
        } catch (e) {
            sourceCopy = [];
        }
        // Recursive whole source resource.
        const loop = item => {
            return item.map(source => {
                return typeCheck(source);
            });
        }
        // Judgment result type.
        const typeCheck = source => {
            let img = new Img({
                src: "",
                status: false
            });
            if (typeof source === 'string') {
                img.src = `${this.base}${source}`;
                this.total = ++this.total;
                // using wxapi load pictures.
                wx.getImageInfo({
                    src: img.src,
                    success: res => {
                        img.status = true;
                        this.successCount = ++this.successCount;
                    },
                    fail: err => {
                        img.fail = true;
                        this.failCount = ++this.failCount;
                    }
                });
                return img;
            } else if (typeof source === 'object') {
                if (Array.isArray(source)) {
                    return loop(source);
                } else {
                    for (let key in source) {
                        if (source.hasOwnProperty(key)) {
                            source[key] = typeCheck(source[key]);
                        }
                    }
                    return source;
                }
            } else {
                // If not an array, an object, or direct address, ignore it directly.
                return null;
            }
        }
        // check if object, loop source
        if (typeof sourceCopy === 'object') {
            if (Array.isArray(sourceCopy)) {
                return loop(sourceCopy);
            } else {
                return loop([sourceCopy]);
            }
        } else {
            let img = new Img({
                src: `${this.base}${sourceCopy}`,
                status: false,
            });
            // Support source as a direct string.
            return img;
        }
    }

    return ImageLoader;
})));