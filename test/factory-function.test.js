const factory = require("../js/factory-function");
const useFactory = factory();
const assert = require("assert");
describe("factory functions test's", ()=>{
    it("should be able to buy small pizza", ()=>{
        useFactory.buying("small");
        assert.equal(useFactory.getData().smallPizza, 0)
    });

    it("should be able to buy large pizza", ()=>{
        useFactory.buying("large");
        assert.equal(useFactory.getData().largePizza, 0)
    });

    it("should be able to buy medium pizza", ()=>{
        useFactory.buying("medium");
        assert.equal(useFactory.getData().mediumPizza, 0)
    });

    it("should be able to return the total cost price", ()=>{
        assert.equal(useFactory.getData().total, "0.00")
    });

});