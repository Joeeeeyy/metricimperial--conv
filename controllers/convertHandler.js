function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    for (i in input) {
      if (/[a-z]/i.test(input[i])) {
        result = input.substr(0, i);
        break;
      }
    }
    if (result === "") {
      result = "1";
    }
    let slash = 0;
    let dot = 0;
    [...result].forEach(char => {
      if (char === ".") dot++;
      if (char === "/") slash++;
    })
    try {
      if (slash > 1 || dot > 1) {
        throw new Error();
      }
      result = eval(result);
    } catch (error) {
      return "invalid number";
    }
    return Number(result);
  };

  this.getUnit = function (input) {
    let result;
    for (i in input) {
      if (/[a-z]/i.test(input[i])) {
        result = input.substr(i);
        break;
      }
    }
    result = result.toLowerCase();
    if (!["gal", "l", "kg", "lbs", "km", "mi"].includes(result)) {
      return "invalid unit";
    }
    return result === "l" ? result.toUpperCase() : result;
  };

  this.getReturnUnit = function (initUnit) {
    switch (this.getUnit(initUnit)) {
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "kg":
        return "lbs";
      case "lbs":
        return "kg";
      case "km":
        return "mi";
      case "mi":
        return "km";
      default:
        throw new Error("invald unit");
    }
  };

  this.spellOutUnit = function (unit) {
    const units = {
      "gal": "gallons",
      "L": "liters",
      "kg": "kilograms",
      "lbs": "pounds",
      "km": "kilometers",
      "mi": "miles",
    };

    return units[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        throw new Error("invalid unit");
    }

    result = Math.round(result * 100000) / 100000;

    return result;

  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };

}

module.exports = ConvertHandler;