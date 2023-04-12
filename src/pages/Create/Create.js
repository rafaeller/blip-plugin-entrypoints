/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react'
import { withLoadingAsync, showToast, showModal } from '../../services/common-service'
import { setMessageTemplateAsync, getMessageTemplatesAsync } from '../../services/waba-service'
import { getApplicationDataAsync } from '../../services/application-service';
import { getLoggedUserAsync } from '../../services/user-service';
import { db, analytics } from '../../utils/firebase';
import BlipPortalToastTypes from '../../constants/blip-portal-toast-types'
import InputChips from '../../components/InputChips'
import Select from '../../components/Select'
import Modal from '../../components/Modal'
import TipsContent from './TipsContent'
import AbTest from '../AbTest'
import sherlock from '../../assets/images/sherlock.png'

const Create = () => {
    const [appInfo, setAppInfo] = useState({});
    const [user, setUser] = useState({});
    const [docId, setDocId] = useState("")
    const [gptMessages, setGptMessages] = useState([])
    const [contentTip, setContentTip] = useState("start")
    const [company, setCompany] = useState("")
    const [objective, setObjective] = useState("")
    const [msgType, setMsgType] = useState("")
    const [language, setLanguage] = useState("")
    const [templateList, setTemplatelist] = useState([])
    const [templateVariables, setTemplateVariables] = useState([])
    const [templateVariablesContent, setTemplateVariablesContent] = useState([])
    const [templateType, setTemplateType] = useState("")
    const [templateName, setTemplateName] = useState("")
    const [templateButtonsString, setTemplateButtonsString] = useState('[]')
    const [templateButtons, setTemplateButtons] = useState([[]])
    const [selectedTemplate, setSelectedTemplate] = useState("")
    const [isNameError, setIsNameError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [product, setProduct] = useState("")
    const [date, setDate] = useState("")
    const [numCaract, setNumCaract] = useState("")
    const [variableName, setVariableName] = useState(false)
    const [button, setButton] = useState(false)
    const [emoji, setEmoji] = useState(false)
    
    useEffect(() => {
        getAppDataAsync();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
    }, [gptMessages])

    const getAppDataAsync = async () => {
        const app = await getApplicationDataAsync();
        setAppInfo(app);

        const loggedUser = await getLoggedUserAsync();
        setUser(loggedUser);
    };

    const tab1Ref = useRef(null)
    const tab2Ref = useRef(null)
    const tab3Ref = useRef(null)

    const tab1RefClick = () => {
        tab1Ref.current.click()
    }
    const tab2RefClick = () => {
        tab2Ref.current.click()
    }
    const tab3RefClick = () => {
        tab2Ref.current.click()
    }

    const clearForm = () => {
        setCompany("")
        setObjective("")
        setMsgType("")
        setProduct("")
        setDate("")
        setNumCaract("")
        setContentTip('start')
        setVariableName(false)
        setButton(false)
        setButton(false)
        document.getElementById("radio-1").checked = false
        document.getElementById("radio-2").checked = false
        document.getElementById("radio-3").checked = false
        document.getElementById("switch-1").checked = false
    }

    function removeEmojis(str) {
        return str.replace(
          /(?:\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF]|\uD83E[\uDE00-\uDEFF]|\uD83F[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\u26F0-\u26F9|\u2700-\u27BF|\u2B00-\u2BFF|\u3030-\u303F|\u1F1E6-\u1F1FF])[\uDC00-\uDFFF]?/g,
          ''
        );
      }

    const updateGptMessage = (index, newText) => {
        setGptMessages(gptMessages => {
            const updatedMessages = [...gptMessages]
            updatedMessages[index] = newText
            return updatedMessages
        })
    }

    const typeOptions = [
        { value: 'Aviso', label: 'Aviso' },
        { value: 'Lembrete', label: 'Lembrete' },
        { value: 'Promoção', label: 'Promoção' },
        { value: 'Atualização', label: 'Atualização' },
        { value: 'Saudação', label: 'Saudação' },
        { value: 'Agradecimento', label: 'Agradecimento' },
        { value: 'Confirmação', label: 'Confirmação' }
    ]

    const languageOptions = [
        { value: 'Português', label: 'Português' },
        { value: 'Inglês', label: 'Inglês' },
        { value: 'Espanhol', label: 'Espanhol' }
    ]

    const templateTypeOptions = [
        { value: 'MARKETING', label: 'Marketing' },
        { value: 'TRANSACTIONAL', label: 'Transacional' },
        { value: 'OTP', label: 'Senhas Descartáveis' }
    ]

    const paramsjson = {
        numCaract,
        language,
        objective,
        msgType,
        company,
        product,
        date,
        variableName,
        button
    }

    const createPrompt = () => {
        const json = {
            numCaract,
            language,
            objective,
            msgType,
            company,
            product,
            date,
            variableName,
            button
        }
        const texts = {
            numCaract: " com aproximadamente {0} caracteres",
            language: " no idioma: {0}",
            objective: ", o objetivo dessa notificação é {0}",
            msgType: ", o tipo da mensagem é {0}",
            company: ", a notificação é da empresa {0}",
            product: ", o produto é {0}",
            date: ", irá acontecer no dia {0}",
            variableName: ". Quando for chamar o usuário pelo nome, use a variável {{1}}",
            button: ". Sempre motive o usuário a clicar nos botões ao final da notificação, mas não escreva nenhum botão."
        }
        let sentence = "Crie 1 exemplo de notificação de whatsapp"
        Object.keys(paramsjson).forEach(prop => {
            if (Object.prototype.hasOwnProperty.call(paramsjson, prop) && paramsjson[prop] !== "" && paramsjson[prop] !== false && Object.prototype.hasOwnProperty.call(texts, prop)) {
                sentence += texts[prop].replace("{0}", paramsjson[prop])
            }
        })
        sentence += ". Usando as boas práticas de UX writing para whatsapp, formate a notificação gerada usando quebras de linha{0}.".replace("{0}", emoji ? " e emojis" : " obrigatoriamente não use emojis")
        console.log(sentence)
        return sentence.trim()
    }

    const getGPTResponseAsync = async (
        prompt,
        n = 3,
        model = "text-davinci-003",
        temperature = 0.6,
        max_tokens = 300,
        top_p = 1,
        frequency_penalty = 1,
        presence_penalty = 1
    ) => {
        const requestBody = {
            prompt,
            model,
            temperature,
            max_tokens,
            top_p,
            frequency_penalty,
            presence_penalty,
            n
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify(requestBody)
        }
        const response = await fetch('https://api.openai.com/v1/completions', requestOptions)
        const data = await response.json()
        if (!emoji) {
            data.choices = data.choices.map((item) => removeEmojis(item.text))
        } else{
            data.choices = data.choices.map((item) => item.text)
        }
        try {
            const novoRegistro = {
                params: paramsjson,
                user: user?.email || 'unknown',
                bot: appInfo?.shortName || 'unknown',
                tenant: appInfo?.tenantId || 'unknown',
                responses: data.choices,
                createdAt: new Date().toISOString()
            };
            const docRef = await db.collection('gpt').add(novoRegistro);
            setDocId(docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        return data
    }

    const isValidTemplateName = (newValue) => {
        const regex = /^[a-z]([a-z0-9_])*$/
        const maxLength = 512
        return regex.test(newValue) && newValue.length <= maxLength
    }

    const templateNameChange = (event) => {
        const newValue = event.target.value
        if (isValidTemplateName(newValue)) {
            setTemplateName(event.target.value)
            setIsNameError(false)
        } else {
            setIsNameError(true)
        }
    }

    const getMessageTemplateVariables = (text) => {
        if (text) {
            const variablesList = text.match(/{{\d{1,10}}}/gm)
            return variablesList ? variablesList : []
        }
        return []
    }

    const templateReplaced = () => {
        let newtext = selectedTemplate
        if(templateVariables){
            templateVariables.map((variable, index) => {
                if (templateVariablesContent[index] !== "") {
                    newtext = newtext.replace(variable, templateVariablesContent[index])
                }
                return newtext
            })
        }

        return newtext
    }

    return (
        <>
            <Modal
                title={"Submeter template para avaliação"}
                visible={isModalOpen}
                hasFooter={true}
                confirmLabel={"Submeter"}
                cancelLabel={"Cancelar"}
                width={60}
                onClose={() => {
                    setIsModalOpen(false)
                }}
                onConfirm={async () => {
                    if (templateName !== "" && templateType !== "" && templateVariablesContent.some(string => string !== "")) {
                        if (templateList.data.some(obj => obj.name === templateName)) {
                            showToast({
                                type: BlipPortalToastTypes.DANGER,
                                message: "Esse nome de template já está sendo usado"
                            })
                        } else {
                            await withLoadingAsync(async () => {
                                await setMessageTemplateAsync(templateName, templateType, selectedTemplate, templateVariablesContent, templateButtons)
                                setIsModalOpen(false)
                                try {
                                    const novoRegistro = {
                                        name: templateName,
                                        type: templateType,
                                        template: selectedTemplate,
                                        buttons: templateButtons,
                                        user: user?.email || 'unknown',
                                        bot: appInfo?.shortName || 'unknown',
                                        tenant: appInfo?.tenantId || 'unknown',
                                        createdAt: new Date().toISOString(),
                                        genId: docId
                                    };
                                    const docRef = await db.collection('waba').add(novoRegistro);
                                } catch (e) {
                                    console.error("Error adding document: ", e);
                                }
                                showToast({
                                    type: BlipPortalToastTypes.SUCCESS,
                                    message: "Template submetido para análise com sucesso"
                                })
                            })
                        }
                    } else {
                        showToast({
                            type: BlipPortalToastTypes.DANGER,
                            message: "Preencha todos os campos para submeter o template"
                        })
                    }
                }}
            >
                <div className="mt4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <bds-typo variant="fs-14" style={{ color: "#8CA0B3" }}>Preencha os campos abaixo para submeter o template de notificação</bds-typo>
                    <div className="flex justify-center mv3">
                        <div className="w-33 mr5">
                            <bds-input
                                label="Nome do template"
                                required={true}
                                danger={isNameError}
                                error-message="Use letras minúsculas, números ou underlines, começando com uma letra."
                                value={templateName}
                                onInput={templateNameChange}
                            />
                        </div>
                        <div className="w-33">
                            <Select
                                label="Categoria do template"
                                required={true}
                                value={templateType}
                                options={templateTypeOptions}
                                onChange={(e) =>
                                    setTemplateType(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    {templateVariables.length > 0 &&
                        <div>
                            <bds-typo variant="fs-14" style={{ color: "#8CA0B3" }}>Adicione exemplos para as variáveis utilizadas na sua mensagem:</bds-typo>
                            <div className="flex">
                                <div className='w-50 pa3'>
                                    <div className='mb3'>
                                        <bds-paper elevation="static">
                                            <bds-typo style={{ whiteSpace: "pre-wrap" }}>
                                                <div className="pa3">
                                                    {templateReplaced()}
                                                </div>
                                            </bds-typo>
                                        </bds-paper>
                                    </div>
                                    <div>
                                        <InputChips
                                            chips={templateButtonsString}
                                            label="Esceva o texto de até 3 botões"
                                            onChange={(e) => {
                                                if(templateButtons.length <= 3){
                                                    setTemplateButtons(e.detail.data)
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='w-50 pa3'>
                                    {templateVariables?.map((item, index) => (
                                        <div key={index} className="pb3">
                                            <bds-input
                                                label={"Exemplo " + item}
                                                placeholder={item}
                                                required={true}
                                                value={templateVariablesContent[index]}
                                                onInput={(e) => {
                                                    const newTemplateVariablesContent = [...templateVariablesContent]
                                                    newTemplateVariablesContent[index] = e.target.value
                                                    setTemplateVariablesContent(newTemplateVariablesContent)
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                    {templateVariables.length === 0 &&
                        <div className="flex justify-center">
                            <div className='w-40 pa3'>
                                <div className='mb3'>
                                    <bds-paper elevation="static">
                                        <bds-typo style={{ whiteSpace: "pre-wrap" }}>
                                            <div className="pa3">
                                                {templateReplaced()}
                                            </div>
                                        </bds-typo>
                                    </bds-paper>
                                </div>
                                <div>
                                    <InputChips
                                        chips={templateButtonsString}
                                        label="Esceva o texto de até 3 botões"
                                        onChange={(e) => {
                                            setTemplateButtons(e.detail.data)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    
                </div>
            </Modal>
            <div className="ph1 ph4-m ph5-ns">
                <bds-tabs>
                    <bds-tab group="tab1" ref={tab1Ref} label="Criar Mensagens" />
                    <bds-tab group="tab2" ref={tab2Ref} label="Editar Notificações" />
                    <bds-tab group="tab3" ref={tab3Ref} label="Teste AB" />
                </bds-tabs>
                <bds-tab-panel group="tab1">
                    <h2 style={{ color: "#6E7B91" }}>GPT TemplateGuru</h2>
                    <div className="flex">
                        <div className='w-40 mr3'>
                            <bds-paper elevation="static">
                                <TipsContent content={contentTip} />
                            </bds-paper>
                        </div>
                        <div className='w-60'>
                            <div className="flex pb3">
                                <div className="w-50 mr3">
                                    <bds-input
                                        label="Nome da sua empresa ou negócio"
                                        value={company}
                                        onInput={(e) =>
                                            setCompany(e.target.value)
                                        }
                                        onFocus={() =>
                                            setContentTip('company')
                                        }
                                    />
                                </div>
                                <div className="w-50">
                                    <bds-input
                                        label="Nome do seu produto/serviço"
                                        value={product}
                                        onInput={(e) =>
                                            setProduct(e.target.value)
                                        }
                                        onFocus={() =>
                                            setContentTip('product')
                                        }
                                    />
                                </div>
                            </div>

                            <bds-input
                                label="Descreva o objetivo da mensagem que você quer enviar"
                                required={true}
                                is-textarea
                                rows="4"
                                value={objective}
                                onInput={(e) =>
                                    setObjective(e.target.value)
                                }
                                onFocus={() =>
                                    setContentTip('objective')
                                }
                            />

                            <div className="flex pv3">
                                <div className='w-33 mr3'>
                                    <bds-input
                                        label="Quando?"
                                        value={date}
                                        onInput={(e) =>
                                            setDate(e.target.value)
                                        }
                                        onFocus={() =>
                                            setContentTip('date')
                                        }
                                    />
                                </div>
                                <div className='w-33  mr3'
                                    onClick={() =>
                                        setContentTip('type')
                                    }
                                >
                                    <Select
                                        label="Tipo de mensagem"
                                        value={msgType}
                                        options={typeOptions}
                                        onChange={(e) =>
                                            setMsgType(e.target.value)
                                        }
                                        
                                    />
                                </div>
                                <div className='w-33'
                                    onClick={() =>
                                        setContentTip('type')
                                    }
                                >
                                    <Select
                                        label="Idioma"
                                        value={language}
                                        options={languageOptions}
                                        onChange={(e) =>
                                            setLanguage(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex pb3 justify-between bb bp-bc-neutral-medium-wave">
                                <bds-radio-group
                                    onClick={() =>
                                        setContentTip('size')
                                    }
                                >
                                    <bds-typo variant="fs-12" bold='bold' style={{ color: "#8CA0B3" }}>Tamanho da mensagem</bds-typo>
                                    <div className="flex">
                                        <div className='mr3'>
                                            <bds-radio id="radio-1" onClick={(e) => setNumCaract(e.target.value)} value="100" label="Curta" />
                                        </div>
                                        <div className='mr3'>
                                            <bds-radio id="radio-2" onClick={(e) => setNumCaract(e.target.value)} value="250" label="Média" />
                                        </div>
                                        <div className='mr3'>
                                            <bds-radio id="radio-3" onClick={(e) => setNumCaract(e.target.value)} value="400" label="Longa" />
                                        </div>
                                    </div>
                                </bds-radio-group>
                                <div className='pl3 w-25'>
                                    <bds-typo variant="fs-12" bold='bold' style={{ color: "#8CA0B3" }}>Utilizar variavel de nome</bds-typo>
                                    <div className="flex">
                                        <div className='mr3'>
                                            <bds-switch
                                                id="switch-1"
                                                size="short"
                                                onClick={(e) => {
                                                    setVariableName(e.target.checked)
                                                }}
                                                onFocus={(e) => {
                                                    setContentTip('name')
                                                }}
                                                name="string"
                                                disabled="false"
                                                checked="false"
                                            />
                                        </div>
                                        <bds-typo variant="fs-12">{variableName ? "Sim" : "Não"}</bds-typo>
                                    </div>
                                </div>
                                <div className='pl3 w-20'>
                                    <bds-typo variant="fs-12" bold='bold' style={{ color: "#8CA0B3" }}>Utilizar emojis</bds-typo>
                                    <div className="flex">
                                        <div className='mr3'>
                                            <bds-switch
                                                id="switch-1"
                                                size="short"
                                                onClick={(e) => {
                                                    setEmoji(e.target.checked)
                                                }}
                                                onFocus={(e) => {
                                                    setContentTip('emoji')
                                                }}
                                                name="string"
                                                disabled="false"
                                                checked="false"
                                            />
                                        </div>
                                        <bds-typo variant="fs-12">{emoji ? "Sim" : "Não"}</bds-typo>
                                    </div>
                                </div>
                                <div className='pl3 w-20'>
                                    <bds-typo variant="fs-12" bold='bold' style={{ color: "#8CA0B3" }}>Utilizar call to action</bds-typo>
                                    <div className="flex">
                                        <div className='mr3'>
                                            <bds-switch
                                                id="switch-1"
                                                size="short"
                                                onClick={(e) => {
                                                    setButton(e.target.checked)
                                                }}
                                                onFocus={(e) => {
                                                    setContentTip('button')
                                                }}
                                                name="string"
                                                disabled="false"
                                                checked="false"
                                            />
                                        </div>
                                        <bds-typo variant="fs-12">{button ? "Sim" : "Não"}</bds-typo>
                                    </div>
                                </div>
                            </div>
                            <div className="flex fr pt3">
                                <div className='mr3'>
                                    <bds-button
                                        variant='delete'
                                        onClick={async () => {
                                            const { response } = await showModal(
                                                'Recomeçar o preenchimento',
                                                'Você em certeza de que deseja recomeçar o preenchimento do formulário? Isso apagará todos os dados inseridos até agora.',
                                                'Recomeçar',
                                                'Cancelar'
                                            )
                                            if (response) {
                                                clearForm()
                                            }
                                        }}
                                    >
                                        Recomeçar
                                    </bds-button>
                                </div>
                                <bds-button
                                    variant='primary'
                                    arrow="true"
                                    onClick={async () => {
                                        await withLoadingAsync(async () => {
                                            setGptMessages([])
                                            const response = await getGPTResponseAsync(createPrompt())
                                            console.log(response)
                                            setGptMessages(response.choices.map((item) => item.replace(/^\n\n/, "")))
                                            showToast({
                                                type: BlipPortalToastTypes.SUCCESS,
                                                message: "Mensagens geradas com sucesso"
                                            })
                                            tab2RefClick()
                                        })
                                    }}
                                >
                                    Gerar sugestões de mensagens
                                </bds-button>
                            </div>
                        </div>
                    </div>
                </bds-tab-panel>
                <bds-tab-panel group="tab2">
                    <div>
                        {gptMessages.length === 0 &&
                            <div className="mt5">
                                <div className='flex justify-center'>
                                    <img className="w-10" src={sherlock} alt="sherlock" />
                                </div>
                                <div className='flex justify-center'>
                                    <h2 style={{ color: "#6E7B91" }}>
                                        Por favor primeiro gere uma notificação para usar esta página.
                                    </h2>
                                </div>
                                <div className='flex justify-center mt3'>
                                    <bds-button
                                        variant='primary'
                                        arrow="true"
                                        onClick={async () => {
                                            tab1RefClick()
                                        }}
                                    >
                                        Gerar sugestões de mensagens
                                    </bds-button>
                                </div>

                            </div>
                        }
                    </div>
                    <div className="flex justify-around mt5">
                        {gptMessages?.map((item, index) => (
                            <div className="w-25">
                                <bds-paper elevation="static">
                                    <div key={index} className="pa2">
                                        <div className="mb2">
                                            <bds-input
                                                id={"inputarea" + index}
                                                value={gptMessages[index]}
                                                is-textarea
                                                rows="16"
                                                expand="true"
                                                onInput={(e) => {
                                                    updateGptMessage(index, e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-around">
                                            <bds-tooltip position="left-center" tooltip-text="Gerar uma nova mensagem">
                                                <bds-button-icon
                                                    variant="secondary"
                                                    size="short"
                                                    icon="refresh"
                                                    onClick={async (e) => {
                                                        await withLoadingAsync(async () => {
                                                            const response = await getGPTResponseAsync(createPrompt(), 1)
                                                            updateGptMessage(index, response.choices[0].replace(/^\n\n/, ""))

                                                            showToast({
                                                                type: BlipPortalToastTypes.SUCCESS,
                                                                message: "Mensagem gerada com sucesso"
                                                            })
                                                        })
                                                    }}
                                                />
                                            </bds-tooltip>
                                            <bds-tooltip position="left-center" tooltip-text="Submeter mensagem para análise">
                                                <bds-button-icon
                                                    variant="secondary"
                                                    size="short"
                                                    icon="send"
                                                    onClick={async () => {
                                                        setSelectedTemplate(gptMessages[index])
                                                        setTemplateVariables(getMessageTemplateVariables(gptMessages[index]))
                                                        setTemplateVariablesContent(new Array(gptMessages[index].length).fill(''))
                                                        setIsModalOpen(true)
                                                        setTemplatelist(await getMessageTemplatesAsync())
                                                    }}
                                                />
                                            </bds-tooltip>
                                        </div>
                                    </div>
                                </bds-paper>
                            </div>
                        ))}
                    </div>
                </bds-tab-panel>
                <bds-tab-panel group="tab3">
                    <AbTest />
                </bds-tab-panel>
            </div>
        </>
    )
}

export default Create
