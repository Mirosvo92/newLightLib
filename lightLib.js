'use strict';

var _ = function() {

    function onpage(arg, numberOfelement) {
        //for automatic call
        if (!(this instanceof _)) {
            return new _(arg, numberOfelement);
        }
        //create array of elements
        this.domElementsArr = [];
        // if we transmit a string
        if(typeof arg === 'string'){
            var domElementsLength = arg.split(',').length,
                domElement = arg.split(',');
            for (var i = 0; i < domElementsLength; i++) {
                this.domElementsArr.push(document.querySelectorAll(domElement[i]));
            }
        }
       //we can add event on document for delegation
        if(typeof arg === 'object'){
            this.domElementsArr.push([arg]);
        }
    }
    //function for enumeration elements
    function enumeration(elementsArg, callback) {

        for (var i = 0; i < elementsArg.length; i++) {
            [].forEach.call(elementsArg[i], callback);
        }

    }
    //function for finding element target
    function findEventElement(classForEvent, nameEvent ,fun, e){
        var thisTag = e.target,
            thisTagName = thisTag.className,
            checkClass = thisTagName.indexOf(classForEvent.slice(1));
        if(thisTag && (checkClass > -1 )){
            thisTag.addEventListener(nameEvent, fun.call(thisTag));
        }
    }
    // method for adding class
    onpage.prototype.addMyClass = function (nameClass) {

        enumeration.call(this, this.domElementsArr , function(el) {
            el.classList.add(nameClass);
        });

        return this;
    };
    // method for adding event
    onpage.prototype.addEvent = function(nameEvent,fun) {
        enumeration.call(this, this.domElementsArr , function(el) {
            el.addEventListener(nameEvent, fun , false);
        });
    };
    // method for adding event (delegation)
    onpage.prototype.onAddEvent = function(nameEvent, classForEvent ,fun) {
        enumeration.call(this, this.domElementsArr , function(el) {
            el.addEventListener(nameEvent, findEventElement.bind(this, classForEvent, nameEvent , fun  ));
        });
    };

    return onpage;

}();
