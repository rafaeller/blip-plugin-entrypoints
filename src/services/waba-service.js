import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPContainer from '../constants/iframe-message-proxy-container';

const POST_TYPE = 'application/json'
const WABA_URI = '/message-templates'
const GATEWAY_DOMAIN = 'postmaster@wa.gw.msging.net'

const setMessageTemplateAsync = async (name, category, text, variables, buttons) => {
    const stringsToQuickReplies = (strings) => {
        return strings.map((str) => {
            return {
                type: "QUICK_REPLY",
                text: str,
            };
        });
    };
    const components = [{
        type: "BODY",
        text
    }]
    if (buttons.length > 0) {
        components.push({
            "type": "BUTTONS",
            "buttons": stringsToQuickReplies(buttons)
        })
    }
    if (variables.length > 0) {
        components[0]['example'] = {
            body_text: [
                variables
            ]
        }
    }

    const { response } = await IframeMessageProxy.sendMessage({
        action: IMPContainer.Actions.SEND_COMMAND,
        content: {
            command: {
                method: IMPContainer.CommandMethods.SET,
                to: GATEWAY_DOMAIN,
                uri: WABA_URI,
                type: POST_TYPE,
                resource: {
                    name,
                    language: 'pt_BR',
                    category,
                    components
                }
            }
        }
    });
    console.log(response)
    return response;
};

const getMessageTemplatesAsync = async () => {
    const { response } = await IframeMessageProxy.sendMessage({
        action: IMPContainer.Actions.SEND_COMMAND,
        content: {
            command: {
                method: IMPContainer.CommandMethods.GET,
                to: GATEWAY_DOMAIN,
                uri: WABA_URI
            }
        }
    });
    return response;
};

export { setMessageTemplateAsync, getMessageTemplatesAsync };
