Embr.Util = (function(){

    var gl_enums = null;

    function glCheckErr(gl, msg){
        var err = gl.getError();
        if(err !== gl.NO_ERROR){
            if(gl_enums === null){
                gl_enums = {};
                for(var name in gl){
                    if(typeof gl[name] == 'number')
                        gl_enums[gl[name]] = name;
                }
            }
            throw msg + " (" + gl_enums[err] + ")";
        }
    }


    function cloneOptions(options){
        var result = {};
        for(var key in options){
            if(options[key] instanceof Object)
                result[key] = cloneOptions(options[key]);
            else
                result[key] = options[key];
        }
        return result;
    }

    function mergeOptions(defaults, options){
        if(options === undefined)
            return cloneOptions(defaults);
        var option, result = {};
        for(var key in defaults){
            option = (key in options) ? options[key] : defaults[key];
            if(option instanceof Object)
                result[key] = mergeOptions(defaults[key], options[key]);
            else
                result[key] = option;
        }
        return result;
    }


    return {
        glCheckErr:   glCheckErr,
        mergeOptions: mergeOptions
    }

})();
