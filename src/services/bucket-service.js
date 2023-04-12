import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPContainer from '../constants/iframe-message-proxy-container';

const POST_TYPE = 'application/json';
const BUCKETS_PATH = `/buckets`;

const getBucket = async (skip = 0, take = 200) => {
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPContainer.Actions.SEND_COMMAND,
            content: {
                destination: IMPContainer.Destinations.messaging_hub_service,
                command: {
                    method: IMPContainer.CommandMethods.GET,
                    uri: BUCKETS_PATH
                }
            }
        });

        return response;
    } catch (err) {
        return false;
    }
};

const getBucketVariable = async (variable) => {
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPContainer.Actions.SEND_COMMAND,
            content: {
                destination: IMPContainer.Destinations.messaging_hub_service,
                command: {
                    method: IMPContainer.CommandMethods.GET,
                    uri: `${BUCKETS_PATH}/${variable}`
                }
            }
        });

        return response;
    } catch (err) {
        return false;
    }
};

const storeBucketVariable = async (variable, resource = {}) => {
    const { response } = await IframeMessageProxy.sendMessage({
        action: IMPContainer.Actions.SEND_COMMAND,
        content: {
            destination: IMPContainer.Destinations.messaging_hub_service,
            command: {
                method: IMPContainer.CommandMethods.SET,
                uri: `${BUCKETS_PATH}/${variable}`,
                type: POST_TYPE,
                resource
            }
        }
    });

    return response;
};

const deleteBucketVariable = async (variable) => {
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPContainer.Actions.SEND_COMMAND,
            content: {
                destination: IMPContainer.Destinations.messaging_hub_service,
                command: {
                    method: IMPContainer.CommandMethods.DELETE,
                    uri: `${BUCKETS_PATH}/${variable}`
                }
            }
        });

        return response;
    } catch (err) {
        return false;
    }
};

export { getBucket, getBucketVariable, storeBucketVariable, deleteBucketVariable };
