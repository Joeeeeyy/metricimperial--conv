const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
const units = ["gal", "L", "kg", "lbs", "km", "mi"];
const spelled = ["gallons", "liters", "kilograms", "pounds", "kilometers", "miles"]


suite('Unit Tests', function () {

    suite("Function convertHandler.getNum(input)", () => {
        test("whole number input", () => {
            const input = "123kg";
            assert.equal(convertHandler.getNum(input), 123);
        });

        test("decimal input", () => {
            const input = "1.23L";
            assert.equal(convertHandler.getNum(input), 1.23);
        });

        test("fractional input", () => {
            const input = "2/4lbs";
            assert.equal(convertHandler.getNum(input), 0.5);
        });

        test("fractional input with a decimal", () => {
            const input = "6.5/2km";
            assert.equal(convertHandler.getNum(input), 3.25);
        });

        test("invalid input (double-fraction)", () => {
            const input = "3/2/3mi";
            assert.equal(convertHandler.getNum(input), "invalid number");
        });

        test("no numerical input", () => {
            const input = "gal";
            assert.equal(convertHandler.getNum(input), 1);
        });

    });

    suite("function convertHandler.getUnit(input)", () => {
        test("for each valid input unit", () => {
            units.forEach(unit => {
                assert.equal(convertHandler.getUnit(unit), unit);
            });
        });

        test("error for an invalid input unit", () => {
            assert.equal(convertHandler.getUnit("2klgrms"), "invalid unit");
        });
    });

    suite("Function convertHandler.getReturnUnit(initUnit)", () => {
        test("correct return unit for each valid input unit", () => {
            units.forEach((unit, indx, arr) => {
                if ((indx + 1) % 2 === 1) {
                    assert.equal(convertHandler.getReturnUnit(unit), arr[indx + 1]);
                } else {
                    assert.equal(convertHandler.getReturnUnit(unit), arr[indx - 1]);
                }
            });
        });
    });

    suite("Function convertHandler.spellOutUnit(unit)", () => {
        test("for each valid input unit", () => {
            units.forEach((unit, indx) => {
                assert.equal(convertHandler.spellOutUnit(unit), spelled[indx]);
            })
        });

    });

    suite("convertHandler converter tests", () => {

        test("convert gal to L", () => {
            assert.equal(convertHandler.convert(10, "gal"), 37.8541);
        });

        test("convert L to gal", () => {
            assert.equal(convertHandler.convert(10, "L"), 2.64172);
        });

        test("convert mi to km", () => {
            assert.equal(convertHandler.convert(10, "mi"), 16.0934);
        });

        test("convert km to mi", () => {
            assert.equal(convertHandler.convert(10, "km"), 6.21373);
        });

        test("convert lbs to kg", () => {
            assert.equal(convertHandler.convert(10, "lbs"), 4.53592);
        });

        test("convert kg to lbs", () => {
            assert.equal(convertHandler.convert(10, "kg"), 22.04624);
        });

    });

});