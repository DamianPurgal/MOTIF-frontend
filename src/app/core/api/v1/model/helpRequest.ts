/**
 * MOTIF
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * Help request
 */
export interface HelpRequest { 
    /**
     * id
     */
    id?: number;
    /**
     * description
     */
    description?: string;
    /**
     * response
     */
    response?: string;
    /**
     * requester
     */
    requester?: string;
    /**
     * Creation date and time
     */
    date?: string;
    /**
     * Help request status
     */
    status?: HelpRequest.StatusEnum;
}
export namespace HelpRequest {
    export type StatusEnum = 'NEW' | 'CLOSED' | 'OPEN';
    export const StatusEnum = {
        New: 'NEW' as StatusEnum,
        Closed: 'CLOSED' as StatusEnum,
        Open: 'OPEN' as StatusEnum
    };
}

