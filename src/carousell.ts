import {
    Callback,
    CloudFunctionContext,
    TimeEventRecord,
    TimeHandler,
} from "aliyun-function-compute";
import Axios from "axios";
import * as cheerio from "cheerio";
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

    const BASE_URL = "https://sg.carousell.com";
    const BASE_PATH = "/categories/property-102/housing-rentals-229";

    const params = {
        sort_by: "time_created,descending",
        location_distance: 2.5,
        location_unit: 0,
        location_name: "30 Jln Kilang Barat",
        location_latitude: "1.2843839",
        location_longitude: "103.80940020000003",
        collection_id: "229",
    };

    Axios.get(BASE_URL + BASE_PATH, { params })
        .then((response) => {
            if (response.status >= 300) {
                console.error(response.data);
                callback(`request to carousell failed with status ${response.status}`);
            }

            const output: string[] = [];

            const cheerioStatic = cheerio.load(response.data);
            cheerioStatic(".card").each((index, element) => {

                const cardTag = cheerio.load(element);

                const imgTag = cardTag("a[id='productCardThumbnail'] img");
                const imgUrl = imgTag.attr("data-layzr") ? imgTag.attr("data-layzr") : imgTag.attr("src");

                const detail = cardTag("figcaption");
                const title = detail.find("h4").text();
                const price = detail.find("dd").eq(0).text();
                const description = detail.find("dd").eq(1).text();
                const roomType = detail.find("dd").eq(2).text();

                const url = BASE_URL + cardTag("a").attr("href");

                const cardMessage = `
${title}
Type: ${roomType}
Pic: ${imgUrl}
URL: ${url}
Price: ${price}
Description: ${description}
`;

                output.push(cardMessage);
            });

            callback(null, output.join("\n***\n"));
        })
        .catch((error) => {
            callback(error);
        });

    // const textMessage: TextMessage = {
    //     msgtype: "text",
    //     text: {
    //         content: "Hello world",
    //     },
    // };

    // SendToDingtalk(textMessage)
    //     .then(() => callback(null, "success"))
    //     .catch((reason) => callback(reason));
};

async function SendToDingtalk<T extends AbstractMessage>(message: T): Promise<void> {
    const DINGTALK_CHATBOT_HOST = "https://oapi.dingtalk.com/robot/send?access_token=";

    // TODO: Read Access Token via env variable
    const CHATBOT_ACCESS_TOKEN = "43d9b2506bcdd1f8d51c68bd94a73c532884789615eefdd75c12cdae42051019";
    const CHATBOT_ACCESS_TOKEN2 = process.env.CHATBOT_ACCESS_TOKEN;

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
