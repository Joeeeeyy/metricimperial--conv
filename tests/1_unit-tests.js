const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
const units = ["gal", "L", "kg", "lbs", "km", "mi"];
const spelled = ["gallons", "liters", "kilograms", "pounds", "kilometers", "miles"]


suite('Unit Tests', function () {

    suite("convertHandler tests for numbers", () => {

        test("convertHandler should correctly read a whole number", () => {
            const input = "123kg";
            assert.equal(convertHandler.getNum(input), 123);
        });

        test("convertHandler should correctly read a decimal number input", () => {
            const input = "1.23L";
            assert.equal(convertHandler.getNum(input), 1.23);
        });

        test("convertHandler should correctly read a fractional input", () => {
            const input = "2/4lbs";
            assert.equal(convertHandler.getNum(input), 0.5);
        });

        test("convertHandler should correctly read a fractional input with a decimal", () => {
            const input = "6.5/2km";
            assert.equal(convertHandler.getNum(input), 3.25);
        });

        test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", () => {
            const input = "3/2/3mi";
            assert.equal(convertHandler.getNum(input), "invalid number");
        });

        test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", () => {
            const input = "gal";
            assert.equal(convertHandler.getNum(input), 1);
        });

    });

    suite("convertHandler tests for units", () => {

        test("convertHandler should correctly read each valid input unit", () => {
            units.forEach(unit => {
                assert.equal(convertHandler.getUnit(unit), unit);
            });
        });

        test("convertHandler should correctly return an error for an invalid input unit", () => {
            assert.equal(convertHandler.getUnit("2klgrms"), "invalid unit");
        });

        test("convertHandler should return the correct return unit for each valid input unit", () => {
            units.forEach((unit, indx, arr) => {
                if ((indx + 1) % 2 === 1) {
                    assert.equal(convertHandler.getReturnUnit(unit), arr[indx + 1]);
                } else {
                    assert.equal(convertHandler.getReturnUnit(unit), arr[indx - 1]);
                }
            });
        });

        test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", () => {
            units.forEach((unit, indx) => {
                assert.equal(convertHandler.spellOutUnit(unit), spelled[indx]);
            })
        });

    });

    suite("convertHandler converter tests", () => {

        test("convertHandler should correctly convert gal to L.", () => {
            assert.equal(convertHandler.convert(10, "gal"), 37.8541);
        });

        test("convertHandler should correctly convert L to gal.", () => {
            assert.equal(convertHandler.convert(10, "L"), 2.64172);
        });

        test("convertHandler should correctly convert mi to km.", () => {
            assert.equal(convertHandler.convert(10, "mi"), 16.0934);
        });

        test("convertHandler should correctly convert km to mi.", () => {
            assert.equal(convertHandler.convert(10, "km"), 6.21373);
        });

        test("convertHandler should correctly convert lbs to kg.", () => {
            assert.equal(convertHandler.convert(10, "lbs"), 4.53592);
        });

        test("convertHandler should correctly convert kg to lbs.", () => {
            assert.equal(convertHandler.convert(10, "kg"), 22.04624);
        });

    });

});