import { Callback, CloudFunctionContext, TimeEventRecord, TimeHandler } from "aliyun-function-compute";
import { TextMessage, ActionCardMessage, SingleActionCard, BaseResponse } from "dingtalk-chatbot";
import Axios from "axios";

export var handler: TimeHandler = function (
    event: TimeEventRecord,
    context: CloudFunctionContext,
    callback: Callback<void>
) {
    const DingtalkChatbotHost = "https://oapi.dingtalk.com/robot/send?access_token=";
    const ChatbotAccessToken = "43d9b2506bcdd1f8d51c68bd94a73c532884789615eefdd75c12cdae42051019";
    const DingtalkWebHook = DingtalkChatbotHost + ChatbotAccessToken;

    const textMessage: TextMessage = {
        msgtype: "text",
        text: {
            content: "Hello world",
        },
    };

    Axios.post<BaseResponse>(DingtalkWebHook, textMessage)
        .then(response => {
            if(response.data.errcode === 0) {
                callback("Message sent");
            } else {
                callback("Request failed: " + response.data.errmsg);
            }
        })
        .catch(reason => {
            console.error(reason);
            callback(new Error(reason))
        });
};