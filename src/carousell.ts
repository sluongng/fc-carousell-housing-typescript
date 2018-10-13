import {
    Callback,
    CloudFunctionContext,
    TimeEventRecord,
    TimeHandler,
} from "aliyun-function-compute";
import Axios from "axios";
import {
    AbstractMessage,
    DingtalkResponse,
    TextMessage,
} from "dingtalk-chatbot";

export let handler: TimeHandler = (
    event: TimeEventRecord,
    context: CloudFunctionContext,
    callback: Callback<string>,
) => {

    const textMessage: TextMessage = {
        msgtype: "text",
        text: {
            content: "Hello world",
        },
    };

    SendToDingtalk(textMessage)
        .then(() => callback(null, "success"))
        .catch((reason) => callback(reason));
};

async function SendToDingtalk<T extends AbstractMessage>(message: T): Promise<void> {
    const DINGTALK_CHATBOT_HOST = "https://oapi.dingtalk.com/robot/send?access_token=";

    // TODO: Read Access Token via env variable
    const CHATBOT_ACCESS_TOKEN = "43d9b2506bcdd1f8d51c68bd94a73c532884789615eefdd75c12cdae42051019";

    return Axios.post<DingtalkResponse>(DINGTALK_CHATBOT_HOST + CHATBOT_ACCESS_TOKEN, message)
        .then((response) => {
            if (response.data.errcode === 0) {
                console.info("Sent to Dingtalk");
            } else {
                console.error(`Sent failed with code ${response.data.errcode} message ${response.data.errmsg}`);
            }
        })
        .catch((reason) => {
            console.error(reason);
            return reason;
        });
}
