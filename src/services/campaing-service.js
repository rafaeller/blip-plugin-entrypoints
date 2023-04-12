import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPContainer from '../constants/iframe-message-proxy-container';

const AUDIENCE_URI = '/audience-summary'
const CAMPAINGS_URI = '/campaigns'
const CONTACTS_URI = '/contacts'
const THREADS_URI = '/threads'


const ACTIVE_CAMPAING_DOMAIN = 'postmaster@activecampaign.msging.net'

const getCampaingsAsync = async (skip, take) => {
    const { response } = await IframeMessageProxy.sendMessage({
        action: IMPContainer.Actions.SEND_COMMAND,
        content: {
            command: {
                method: IMPContainer.CommandMethods.GET,
                to: ACTIVE_CAMPAING_DOMAIN,
                uri: AUDIENCE_URI + `?$skip=${skip}&$take=${take}&scheduled=false`
            }
        }
    });
    return response;
};

const getCampaingDataAsync = async (id) => {
    const { response } = await IframeMessageProxy.sendMessage({
        action: IMPContainer.Actions.SEND_COMMAND,
        content: {
            command: {
                method: IMPContainer.CommandMethods.GET,
                to: ACTIVE_CAMPAING_DOMAIN,
                uri: `${CAMPAINGS_URI}/${id}/reports`
            }
        }
    });
    return response;
};

const getContactAsync = async (id) => {
    const { response } = await IframeMessageProxy.sendMessage({
        action: IMPContainer.Actions.SEND_COMMAND,
        content: {
            command: {
                method: IMPContainer.CommandMethods.GET,
                uri: `${CONTACTS_URI}/${id}`
            }
        }
    });
    return response;
};

const getThreadAsync = async (id) => {
    const { response } = await IframeMessageProxy.sendMessage({
        action: IMPContainer.Actions.SEND_COMMAND,
        content: {
            command: {
                method: IMPContainer.CommandMethods.GET,
                uri: `${THREADS_URI}/${id}?$take=20&direction=desc`
            }
        }
    });
    return response;
};

export { getCampaingsAsync, getCampaingDataAsync, getContactAsync, getThreadAsync };
