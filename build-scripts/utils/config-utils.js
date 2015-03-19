var _ = require('underscore');

module.exports = {

    sectionEmpty: function (section) {
        if (!section || !section.files || section.files.length == 0) {
            return true;
        }
        return false;
    },

    shouldWatchSection: function (section) {
        if (!section || !section.watch || section.watch.length == 0) {
            return true;
        }
        return true;
    },


    filenameAndPathFromDest: function (dest) {
        if (!dest || dest == '') {
            return {};
        }

        var components = dest.split("/");

        return {
            path: components.slice(0, components.length - 1).join("/"),
            filename: _.last(components)
        };

    },


    prefixFiles: function (files, prefix) {
        var prefixedFiles = [];
        _.each(files, function (file, index) {

            if(_.isString(file)) {
                prefixedFiles.push(prefix + file);
            } else if(_.isObject(file)){
                // karma config works like this
                if(file.pattern) {
                    file.pattern = prefix + file.pattern
                }
            }



        });
        return prefixedFiles;
    },

    watchFilesForSection:function(section) {

        if(!section || !section.watch || section.watch.length === 0) {
            return [];
        }

        if(_.isFunction(section.watch)) {
            return section.watch();
        }

        return section.watch;

    }

};