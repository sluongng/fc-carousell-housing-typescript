/* 
 * Dingtalk Chatbot API
 * typeScript API definitions
 *
 * - Maintainer: [Son Luong Ngoc](sluongng@gmail.com)
 * - Official documentation here: https://open-doc.dingtalk.com/microapp/serverapi2/qf2nxq 
 */

declare module "dingtalk-chatbot" {
    
    export interface AbstractMessage {
        msgtype: string,
    }

    export interface AtTag {
        atMobiles?: Array<string>,
        isAtAll?: boolean,
    }

    export interface TextMessage extends AbstractMessage {
        msgtype: "text",
        text: {
            content: string,
        },
        at?: AtTag,
    }

    export interface LinkMessage extends AbstractMessage {
        msgtype: "link",
        link: {
            title: string,
            text: string,
            picUrl: string,
            messageUrl: string,
        },
    }

    export interface MarkdownMessage extends AbstractMessage {
        msgtype: "markdown",
        markdown: {
            title: string,
            text: string,
        },
        at?: AtTag,
    }

    interface BaseActionCard {
        title: string,
        text: string,
        hideAvatar?: "0" | "1",
        btnOrientation?: "0" | "1",
    }

    export interface SingleActionCard extends BaseActionCard {
        singleTitle: string,
        singleURL: string,
    }

    export interface ActionButton {
        title: string,
        actionURL: string,
    }

    export interface MultiActionCard extends BaseActionCard {
        btns: Array<ActionButton>,
    }
    
    export interface ActionCardMessage<T extends BaseActionCard> extends AbstractMessage {
        msgtype: "actionCard",
        actionCard: T,
    }

    export interface FeedCardLink {
        title: string,
        messageURL: string,
        picURL: string,
    }
    
    export interface FeedCardMessage extends AbstractMessage {
        msgtype: "feedCard",
        feedCard: {
            links: Array<FeedCardLink>,
        },
    }

    export interface DingtalkResponse {
        errcode: number,
        errmsg: string,
    }
}
