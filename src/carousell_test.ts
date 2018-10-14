import { Callback } from "aliyun-function-compute";
import { handler } from "./carousell";

const callBack: Callback = (err, result) => {
    console.log(`Error is ${err}`);
    console.log(`Result is ${result}`);
};

handler(null, null, callBack);
