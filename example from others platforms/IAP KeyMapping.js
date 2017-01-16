(function () {

    var module = {
        id: "com.ericsson.iptv.portal.coreapps.device.pc.Info",
        version: [ 1, 0 ],
        type: "code",

        implementing: {
            loading:  { id: "com.ericsson.iptv.portal.fw.interfaces.LoadingIF", version: [ 1, 0 ], publics: { } },
            info: { id: "com.ericsson.iptv.portal.fw.device.interfaces.InfoIF", version: [ 1, 0 ],
                publics: {
                    logicalKeys: {
                        KEY_LEFT: 37, // v�nsterpil
                        KEY_RIGHT: 39, // h�gerpil
                        KEY_UP: 38, // uppil
                        KEY_DOWN: 40, // nerpil
                        KEY_EXIT: 66, // b
                        KEY_OK: 13, // enter
                        KEY_RED: 116, // F5
                        KEY_GREEN: 117, // F6
                        KEY_YELLOW: 118, // F7
                        KEY_BLUE: 119, // F8
                        KEY_INFO: 73, // i
                        KEY_MENU: 77, // 'm'
                        KEY_GUIDE: 71, // 'g'
												KEY_OPTION: 79, // 'g'
                        KEY_POWER: 27, // 'esc'
                        KEY_PLAY: 80, // p
                        KEY_PAUSE: 79, // o
                        KEY_FF: 123, // F12
                        KEY_REW: 122, // F11
                        KEY_STOP: 83, // s
                        KEY_RECORD: 82, // r
                        KEY_CHANNEL_UP: 33, // Pg Up
                        KEY_CHANNEL_DOWN: 34, // Pg Down
                        KEY_TEXT: 113, // F2
                        KEY_0: 48, // 0
                        KEY_1: 49, // 1
                        KEY_2: 50, // 2
                        KEY_3: 51, // 3
                        KEY_4: 52, // 4
                        KEY_5: 53, // 5
                        KEY_6: 54, // 6
                        KEY_7: 55, // 7
                        KEY_8: 56, // 8
                        KEY_9: 57, // 9
                        KEY_REMOTE_0:  96, // NumPad 0
                        KEY_REMOTE_1:  97, // NumPad 1
                        KEY_REMOTE_2:  98, // NumPad 2
                        KEY_REMOTE_3:  99, // NumPad 3
                        KEY_REMOTE_4: 100, // NumPad 4
                        KEY_REMOTE_5: 101, // NumPad 5
                        KEY_REMOTE_6: 102, // NumPad 6
                        KEY_REMOTE_7: 103, // NumPad 7
                        KEY_REMOTE_8: 104, // NumPad 8
                        KEY_REMOTE_9: 105, // NumPad 9
                        KEY_CAPS_LOCK: 114, // F3
                        KEY_ASTERISK: 191 // shift + [*]
                    }
                }
            }
        },

        dependencies: {
            dyn: { id: "com.ericsson.iptv.portal.fw.core.DynamicLoad", version: [ 1, 0 ]},
            utils: { id: "com.ericsson.iptv.portal.coreapps.device.pc.Utils", version: [ 1, 0 ]}
        },

        publics: { },

        constraints: {
               "device": "pc"
        }
    };

    var dyn;
    var utils;

    var inputHandler;
    var keyCode;
    var charCode;
    var repeatCount = 0;

    function keyDownHandler (event) {
        event = event || window.event;
        keyCode = event.keyCode;
        event.preventDefault();
        return false;
    }

    function keyPressHandler(event) {
        event = event || window.event;
        repeatCount++;
        charCode = event.charCode || event.which;
        inputHandler(keyCode, charCode, repeatCount);
        event.preventDefault();
        return false;
    }

    function keyUpHandler (event) {
        // Some keys (Shift, ...) does not give a keypress event. Avoid sending keyup to those.
        if(repeatCount) {
            event = event || window.event;
            inputHandler(keyCode, charCode, 0);
            keyCode = undefined;
            repeatCount = 0;
            charCode = undefined;
        }
        event.preventDefault();
        return false;
    }

    module.publics.getMacAddress = function () {
            var cookie = utils.getCookie("device");
            if (cookie === undefined  ||  cookie === null) {
              cookie = "";
            }

            return cookie;
    };

    module.publics.getIpAddress = function () {
            return "127.0.0.1";
    };

    module.implementing.info.publics.setInputHandler = function (handler) {
        if(handler) {
            inputHandler = handler;
            document.onkeypress = keyPressHandler;
            document.onkeydown = keyDownHandler;
            document.onkeyup = keyUpHandler;
        } else {
            document.onkeypress = undefined;
            document.onkeydown = undefined;
            document.onkeyup = undefined;
        }
    };

    /**
     * Sets the alpha level (video / graphics blending)
     * @param {Number} alpha The alpha blending level in percent (0..100)
     */
    module.implementing.info.publics.setAlphaBlendingLevel = function (alpha) {
    };

    /**
     * Sets the chromakey blending color
     * @param {String} color The color in hex (0x010101)
     */
    module.implementing.info.publics.setChromaKey = function (color){
    };

    module.implementing.info.publics.enterStandby = function () {
    };

    module.implementing.info.publics.exitStandby = function () {
    };

    module.implementing.info.publics.showTeletextAndSubtitlesWindow = function () {
    };

    module.implementing.info.publics.hideTeletextAndSubtitlesWindow = function () {
    };


    module.implementing.loading.publics.load = function () {
        dyn = module.dependencies.dyn.handle;
        utils = module.dependencies.utils.handle;
    };

    module.implementing.loading.publics.unload = function () {
    };


    return module;
});

