import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPContainer from '../constants/iframe-message-proxy-container';

const getConfigurationAsync = async (id) => {
    const { response } = await IframeMessageProxy.sendMessage({
        action: IMPContainer.Actions.SEND_COMMAND,
        content: {
            command: {
                method: IMPContainer.CommandMethods.GET,
                uri: `lime://${id}@msging.net/configuration/caller`,
            }
        }
    });
    return response;
};

export { getConfigurationAsync };
