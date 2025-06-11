import BigNumber from "bignumber.js";
import {SMALLEST_UNIT} from '../constants'


/**ALLOW ONLY STRING */
export const allowOnlyString = (inputString: any) => {
  const res = /^[a-zA-Z]+$/.test(inputString);
  return res;
};


export const convert_to_bn = (value: number, operation: string) => {
  const x: any = new BigNumber(value);
  const y = new BigNumber(SMALLEST_UNIT);
  if (operation === "*") {
    return x.multipliedBy(y).toNumber();
  } else if (operation === "/") {
    return x.dividedBy(y).toNumber();
  }
};

export const bn_operations = async (
  firstNum: any,
  secondNum: any,
  operation: string
) => {
  try {
    /* eslint-disable new-cap */
    const a = new BigNumber(firstNum.toString());
    const b = new BigNumber(secondNum.toString());
    switch (operation.toLowerCase()) {
      case "-":
        return a.minus(b).toString();
      case "+":
        return a.plus(b).toString();
      case "*":
      case "x":
        return a.multipliedBy(b).toString();
      case "÷":
      case "/":
        return a.dividedBy(b).toString();
      case ">=":
        return a.isGreaterThanOrEqualTo(b);
      case ">":
        return a.isGreaterThan(b);
      case "<=":
        return a.isLessThanOrEqualTo(b);
      case "<":
        return a.isLessThan(b);
      case "==":
        return a.isEqualTo(b);
      default:
    }
  } catch (error) {
    console.log("error in bn_operation", error);
  }
};