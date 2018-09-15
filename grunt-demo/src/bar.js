
define(["./foo"], function(foo) {
    //return an object to define the "my/shirt" module.
    return {
        color: "blue",
        size: "large",
        addToCart: function() {
           console.log('add fooo',foo)
            
        }
    }
}
);