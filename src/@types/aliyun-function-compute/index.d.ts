// Type definitions for AliCloud Function Compute
// Project: https://cn.aliyun.com/product/fc 
//        | https://www.alibabacloud.com/product/function-compute
// Definitions by: Son, Luong Ngoc <https://github.com/sluongng>
// Definitions: https://help.aliyun.com/document_detail/70140.html
// TypeScript Version: 3.0.1
declare module "aliyun-function-compute" {

    /**
     * AliCloudRegion
     * https://help.aliyun.com/document_detail/40654.html
     */
    export type AliCloudRegion = 'cn-qingdao'
        | 'cn-beijing'
        | 'cn-zhangjiakou'
        | 'cn-huhehaote'
        | 'cn-hangzhou'
        | 'cn-shanghai'
        | 'cn-shenzhen'
        | 'cn-hongkong'
        | 'ap-southeast-1'
        | 'ap-southeast-2'
        | 'ap-southeast-3'
        | 'ap-southeast-5'
        | 'ap-south-1'
        | 'ap-northeast-1'
        | 'us-west-1'
        | 'us-east-1'
        | 'eu-central-1'
        | 'me-east-1';

    /**
     * CloudFunctionContext contains the Context Parameter definition
     * https://help.aliyun.com/document_detail/74757.html#h4-context-
     */
    export interface CloudFunctionContext {
        requestId: string;
        credentials: CredentialsContext;
        function: FunctionContext;
        service: ServiceContext;
        region: AliCloudRegion;
        accountId: string;
    }

    export interface CredentialsContext {
        accessKeyId: string;
        accessKeySecret: string;
        securityToken: string;
    }

    export interface FunctionContext {
        name: string;
        handler: string;
        memory: number;
        timeout: number;
    }

    export interface ServiceContext {
        name: string;
        logProject: string;
        logStore: string;
    }

    /**
     * IotEventRecord
     * https://help.aliyun.com/document_detail/70140.html#IoT
     */
    export interface IotEventRecord {
        [name: string]: string;
    }

    /**
     * DataHubEventRecord
     * https://help.aliyun.com/document_detail/70140.html#Datahub
     */
    export interface DataHubEventRecord {
        eventSource: "acs:datahub";
        eventName: "acs:datahub:putRecord";
        eventSourceARN: string;
        region: AliCloudRegion;
        records: DataHubRecord[];
    }

    export interface DataHubRecord {
        eventId: string;
        systemTime: number;
        data: string;
    }

    /**
     * APIGatewayEventRecord
     * https://help.aliyun.com/document_detail/70140.html#APIGateway
     */
    export interface APIGatewayEventRecord {
        path: string;
        httpMethod: string;
        headers: APIGatewayHeader;
        queryParameters: APIGatewayQueryParam;
        pathParameters: APIGatewayPathParam;
        body: string;
        isBase64Encoded: boolean;
    }

    export interface APIGatewayHeader {
        "X-Ca-Api-Gateway": string;
        "X-Forwarded-For": string;
        [name: string]: string;
    }

    export interface APIGatewayQueryParam {
        [name: string]: string;
    }


    export interface APIGatewayPathParam {
        [name: string]: string;
    }

    /**
     * TableStoreEventRecord
     * https://help.aliyun.com/document_detail/70140.html#TableStore
     */
    export interface TableStoreEventRecord {
        Version: 'Sync-v1';
        Records: TableStoreRecord[];
    }

    export interface TableStoreRecord {
        Type: 'PutRow'
        | 'UpdateRow'
        | 'DeleteRow';
        Info: TableStoreInfo;
        PrimaryKey: TableStorePrimaryKey[];
        Columns: TableStoreColumn[];
    }

    export interface TableStoreInfo {
        Timestamp: number;
    }

    export interface TableStorePrimaryKey {
        ColumnName: string;
        Value: string | number;
    }

    export interface TableStoreColumn {
        Type: string;
        ColumnName: string;
        Value: string | number;
        Timestamp: number;
    }

    /**
     * SLSEventRecord is the Log Service Trigger event definition
     * https://help.aliyun.com/document_detail/84386.html
     */
    export interface SLSEventRecord {
        jobName: string;
        taskId: string;
        cursorTime: number;
        parameter: SLSParameter;
        source: SLSSource;
    }

    export interface SLSParameter {
        [name: string]: string;
    }

    export interface SLSSource {
        endpoint: string;
        projectName: string;
        logstoreName: string;
        shardId: number;
        beginCursor: string;
        endCursor: string;
    }

    /**
     * CDNEventRecords
     * https://help.aliyun.com/document_detail/73333.html#h2-cdn-3
     */
    export interface CDNEventRecords {
        events: (CachedObjectsEventRecord | LogFileEventRecord)[];
    }

    export interface CDNBaseEventRecord<T> {
        eventName: string;
        eventParameter: T;
        eventSource: string;
        eventTime: string;
        eventVersion: string;
        region: AliCloudRegion;
        resource: ResourceInformation;
        traceId: string;
        userIdentity: UserIdentity;
    }

    export interface UserIdentity {
        aliUid: string;
    }

    export interface ResourceInformation {
        domain: string;
    }

    export interface CDNDomainEventRecord extends CDNBaseEventRecord<string> {
        eventName: 'CdnDomainStarted' | 'CdnDomainStopped';
    }

    export interface CDNDomainParameter {
        domain: string;
        status: string;
    }

    export interface CachedObjectsEventRecord extends CDNBaseEventRecord<CachedObjectParameter> {
        eventName: 'CachedObjectsRefreshed'
        | 'CachedObjectsPushed'
        | 'CachedObjectsBlocked';
    }

    export interface CachedObjectParameter {
        createTime: number;
        domain: string;
        objectPath: string[];
        objectType: "File" | "Directory";
        taskId: number;
    }

    export interface LogFileEventRecord extends CDNBaseEventRecord<string> {
        eventName: 'LogFileCreated';
    }

    export interface LogFileParameter {
        domain: string;
        endTime: number;
        startTime: number;
        filePath: string;
        fileSize: number;
    }

    /**
     * TimeEventRecord
     * https://help.aliyun.com/document_detail/68172.html#h3-event-
     */
    export interface TimeEventRecord {
        triggerTime: string;
        triggerName: string;
        payload: string;
    }

    /**
     * OSS Event Trigger
     * https://help.aliyun.com/document_detail/52633.html#event
     */
    export interface OSSEventRecords {
        events: OSSEventRecord[];
    }

    export interface OSSEventRecord {
        eventName: 'Oss:ObjectCreated:PutObject'
        | 'Oss:ObjectCreated:PutSymlink'
        | 'Oss:ObjectCreated:PostObject'
        | 'Oss:ObjectCreated:CopyObject'
        | 'Oss:ObjectCreated:InitialMultipartUpload'
        | 'Oss:ObjectCreated:UploadPart'
        | 'Oss:ObjectCreated:UploadPartCopy'
        | 'Oss:ObjectCreated:CompleteMultipartUpload'
        | 'Oss:ObjectCreated:AppendObject'
        | 'Oss:ObjectCreated:*'
        | 'Oss:ObjectRemoved:DeleteObject'
        | 'Oss:ObjectRemoved:DeleteObjects'
        | 'Oss:ObjectRemoved:AbortMultipartUpload';
        eventSource: string;
        eventTime: string;
        eventVersion: string;
        oss: OSSMetaRecord;
        region: AliCloudRegion;
        requestParameters: OSSRequestParameters;
        resposeElements: OSSResponseElements;
        userIdentity: OSSUserIdentity;
    }

    export interface OSSMetaRecord {
        bucket: OSSBucketMetaRecord;
        object: OSSObjectMetaRecord;
        ossSchemaVersion: string;
        ruleId: string;
    }

    export interface OSSBucketMetaRecord {
        arn: string;
        name: string;
        ownerIdentity: string;
        virtualBucket: string;
    }

    export interface OSSObjectMetaRecord {
        deltaSize: number;
        eTag: string;
        key: string;
        size: number;
    }

    export interface OSSRequestParameters {
        sourceIPAddress: string;
        [name: string]: string;
    }

    export interface OSSResponseElements {
        requestId: string;
        [name: string]: string;
    }

    export interface OSSUserIdentity {
        principalId: string;
        [name: string]: string;
    }

    /**
     * Handler is generic handler definition
     * for event driven type functions
     */
    export type Handler<TEvent = any, TResult = any> = (
        event: TEvent,
        context: CloudFunctionContext,
        callback: Callback<TResult>,
    ) => void | Promise<TResult>;

    export type Callback<TResult = any> = (
        error?: Error | null | string,
        result?: TResult
    ) => void;

    /**
     * OSSHandler is handler function definition
     */
    export type OSSHandler = Handler<OSSEventRecords, void>;

    export type CDNHandler = Handler<CDNEventRecords, void>;

    export type APIGatewayHandler = Handler<APIGatewayEventRecord, void>;

    export type TimeHandler = Handler<TimeEventRecord, string>;

}
