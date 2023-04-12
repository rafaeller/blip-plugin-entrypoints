import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from '../../components/Card'
import InputChips from '../../components/InputChips'
import { withLoadingAsync, showToast } from '../../services/common-service'
import BlipPortalToastTypes from '../../constants/blip-portal-toast-types'
import { getCampaingsAsync, getCampaingDataAsync, getContactAsync, getThreadAsync } from '../../services/campaing-service'
import { getBucket, getBucketVariable, storeBucketVariable, deleteBucketVariable } from '../../services/bucket-service'
import sherlock from '../../assets/images/sherlock.png'
import { v4 as uuidv4 } from 'uuid';
import { DataFrame } from 'dataframe-js';

const AbTest = () => {
    const [title, setTitle] = useState('')
    const [uuid, setUuid] = useState('')
    const [showCampaing, setShowCampaing] = useState(false)
    const [campaingNames, setCampaingNames] = useState([])
    const [campaingNamesSting, setCampaingNamesSting] = useState('[]')
    const [testsData, setTestsData] = useState([])
    const [campaingsData, setCampaingsData] = useState([])
    const [winnerCampaing, setwinnerCampaing] = useState(null)

    const BUCKET_PREFIX = "MTC-AB-"

    useEffect(() => {
        LoadTestsAsync()
        // eslint-disable-next-line
    }, [])

    const viewStyle = (value) => {
        return {
            display: value ? "block" : "none"
        }
    }

    const colorStyle = (index, winner) => {
        if(winner !==  null && index === winner){
            return {
                backgroundColor: "#B3D4FF"
            }
        }else{
            return {}
        }
    }

    const chiSquaredTest = async (campains) => {
        const notificacoes_enviadas = campains.map(obj => obj.processed);
        const respostas = campains.map(obj => obj.answer);
        const taxa_respostas = campains.map(obj => obj.answer / 100);
    
        const totalNotificacoes = notificacoes_enviadas.reduce((acc, cur) => acc + cur);
        const totalRespostas = respostas.reduce((acc, cur) => acc + cur);
    
        const esperadoRespostas = respostas.map((_, i) => (notificacoes_enviadas[i] * totalRespostas) / totalNotificacoes);
        const esperadoNaoRespostas = esperadoRespostas.map((e, i) => notificacoes_enviadas[i] - e);
    
        const chi = respostas.reduce((acc, r, i) => {
            const res = Math.pow(r - esperadoRespostas[i], 2) / esperadoRespostas[i];
            const nRes = Math.pow(notificacoes_enviadas[i] - r - esperadoNaoRespostas[i], 2) / esperadoNaoRespostas[i];
            return acc + res + nRes;
        }, 0);
    
        // Use uma tabela de distribuição qui-quadrado com 1 grau de liberdade e alfa = 0,05
        const criticalValue = 3.841;
        
        if (chi > criticalValue) {
            console.log("Há diferença estatisticamente significativa entre as campanhas.");
            const melhor_campanha = taxa_respostas.indexOf(Math.max(...taxa_respostas));
            setwinnerCampaing(melhor_campanha)
            console.log("A campanha", melhor_campanha, "performou melhor.");
        } else {
            console.log("Não há diferença estatisticamente significativa entre as campanhas.");
        }
    }


    const LoadCampaingsAsync = async (campaings) => {
        const campaingsResult = await campaings.map(async (campaing) => {
            return await getCampaingResultAsync(campaing)
        })
        setCampaingsData(await Promise.all(campaingsResult))
        chiSquaredTest(await Promise.all(campaingsResult))
    }

    const LoadTestsAsync = async () => {
        const bucket = await getBucket()
        const tests = bucket['items'].filter((string) => string.startsWith(BUCKET_PREFIX))
        const testsList = await tests.map(async (test) => {
            const obj = await getBucketVariable(test)
            obj.id = test
            return obj
        })
        setTestsData(await Promise.all(testsList))
    }

    const getCampaingResultAsync = async (name) => {
        const campaigns = await getCampaingsAsync(0, 100)
        const campaign = campaigns['items'].find(item => item.name === name)
        const campaignData = await getCampaingDataAsync(campaign['id'])
        const statusAudience = campaignData['statusAudience']
        for (const obj of statusAudience) {
            const thread = await getThreadAsync(obj['recipientIdentity'])

            const templateIndex = thread.items.findIndex(
                (message) =>
                    message.content &&
                    message.content.template &&
                    message.content.template.name === campaignData["messageTemplate"]
            )

            if (templateIndex > 0 && thread.items[templateIndex - 1].direction === "received") {
                obj.answer = true
            } else {
                obj.answer = false
            }
        }

        let processedCount = 0
        let failedCount = 0
        let receivedCount = 0
        let readCount = 0
        let answerCount = 0

        statusAudience.forEach((obj) => {
            if (obj.processed) processedCount++
            if (obj.failed) failedCount++
            if (obj.received) receivedCount++
            if (obj.read) readCount++
            if (obj.answer) answerCount++
        })
        return {
            processed: processedCount,
            failed: failedCount,
            received: receivedCount,
            read: readCount,
            answer: answerCount,
        }
    }

    const dateFormat = (isoDate) => {
        const date = new Date(isoDate);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();

        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hour}:${minute}`;
    }

    return (
        <>
            <div style={viewStyle(!showCampaing)}>
                <div className="mv3 ph6">
                    <div className="flex justify-end mb3">
                        <div className="mr3">
                            <bds-button-icon
                                variant="secondary"
                                size="short"
                                icon="refresh"
                                onClick={() => {
                                    withLoadingAsync(async () => {
                                        await LoadTestsAsync()
                                    })
                                }}
                            />
                        </div>
                        <bds-button
                            variant='primary'
                            onClick={() => {
                                setUuid(uuidv4())
                                setTitle("")
                                setCampaingNames([])
                                setCampaingNamesSting('[]')
                                setShowCampaing(true)
                            }}
                        >
                            Nova análise
                        </bds-button>

                    </div>
                    <div>
                        {testsData.length === 0 &&
                            <div className="mt5">
                                <div className='flex justify-center'>
                                    <img className="w-10" src={sherlock} alt="sherlock" />
                                </div>
                                <div className='flex justify-center'>
                                    <h2 style={{ color: "#6E7B91" }}>
                                        Você ainda não criou um relatorio!
                                        <br />
                                        Clique em "nova análise" para começar.
                                    </h2>
                                </div>
                            </div>
                        }
                    </div>
                    {testsData?.map((item, index) => (
                        <div className="mb3">
                            <bds-paper elevation="static">
                                <div className="flex justify-between items-center pa3">
                                    <div className="w-25">
                                        <bds-typo>
                                            Titulo:<br />{item.title}
                                        </bds-typo>
                                    </div>
                                    <div className="w-25">
                                        <bds-typo>
                                            Campanhas:<br />{item.campaingNames.length}
                                        </bds-typo>
                                    </div>
                                    <div className="w-25">
                                        <bds-typo>
                                            Criado em:<br />{dateFormat(item.creationDate)}
                                        </bds-typo>
                                    </div>
                                    <div className="w-25 flex justify-end">
                                        <div className='mr3'>
                                            <bds-button-icon
                                                icon="trash"
                                                variant="delete"
                                                size="short"
                                                onClick={() => {
                                                    withLoadingAsync(async () => {
                                                        await deleteBucketVariable(item.id)
                                                        await LoadTestsAsync()
                                                    })
                                                    showToast({
                                                        type: BlipPortalToastTypes.SUCCESS,
                                                        message: "Análise deletada com sucesso"
                                                    })
                                                }}
                                            />
                                        </div>
                                        <bds-button
                                            variant='tertiary'
                                            arrow="true"
                                            onClick={async () => {
                                                setTitle(item.title)
                                                setCampaingNames(item.campaingNames)
                                                setCampaingNamesSting(JSON.stringify(item.campaingNames))
                                                setShowCampaing(true)
                                                withLoadingAsync(async () => {
                                                    await LoadCampaingsAsync(item.campaingNames)
                                                })
                                                chiSquaredTest()
                                            }}
                                        >
                                            Abrir Teste A/B
                                        </bds-button>
                                    </div>

                                </div>
                            </bds-paper>
                        </div>
                    ))}
                </div>
            </div>
            <div style={viewStyle(showCampaing)}>
                <div className="flex justify-between items-center mv3 ph6">
                    <div className="w-40 mr3">
                        <bds-input
                            label="Titulo da análise"
                            value={title}
                            onInput={(e) =>
                                setTitle(e.target.value)
                            }
                        />
                    </div>
                    <div className="flex">
                        <div className="mr3">
                            <bds-button
                                variant="secondary"
                                icon="arrow-left"
                                onClick={() => {
                                    setShowCampaing(false)
                                    withLoadingAsync(async () => {
                                        await LoadTestsAsync()
                                    })
                                }}
                            >
                                Voltar
                            </bds-button>
                        </div>
                        <div className="mr3">
                            <bds-button
                                icon="save-disk"
                                onClick={() => {
                                    storeBucketVariable(`${BUCKET_PREFIX}${uuid}`, { title, campaingNames, creationDate: new Date().toISOString() })
                                    showToast({
                                        type: BlipPortalToastTypes.SUCCESS,
                                        message: "Análise salva com sucesso"
                                    })
                                }}
                            >
                                Salvar
                            </bds-button>
                        </div>
                        <bds-button
                            icon="trash"
                            variant="delete"
                            onClick={() => {
                                deleteBucketVariable(`${BUCKET_PREFIX}${uuid}`)
                                showToast({
                                    type: BlipPortalToastTypes.SUCCESS,
                                    message: "Análise deletada com sucesso"
                                })
                            }}
                        >
                            Deletar
                        </bds-button>
                    </div>
                </div>
                <div className="flex justify-between items-center mv3 ph6">
                    <div className="w-90 mr3">
                        <InputChips
                            chips={campaingNamesSting}
                            label="Esceva o nome de cada uma das campanhas que quer comparar"
                            onChange={(e) => {
                                setCampaingNames(e.detail.data)
                            }}
                        />
                    </div>
                    <bds-button
                        onClick={async () => {
                            withLoadingAsync(async () => {
                                await LoadCampaingsAsync(campaingNames)
                            })
                        }}
                    >
                        Comparar Campanhas
                    </bds-button>
                </div>

                <div className="flex justify-around ph6">
                    {campaingsData?.map((item, index) => (
                        <Card className="min-h-18" style={colorStyle(index, winnerCampaing)}>
                            <div className="overflow-auto">
                                <h4 className="f4 mt0 mb3">
                                    {campaingNames[index]}
                                </h4>
                                <table className="f6 w-100 mw8 center">
                                    <tbody className="lh-copy">
                                        <tr>
                                            <td className="pv3 b bb b--black-20">
                                                Enviadas
                                            </td>
                                            <td className="pv3 bb b--black-20">
                                                {item.processed}
                                            </td>
                                            <td className="pv3 bb b--black-20">
                                                {(item.processed * 100 / (item.processed + item.failed)).toFixed(2)}%
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pv3 b bb b--black-20">
                                                Falhas
                                            </td>
                                            <td className="pv3 bb b--black-20">
                                                {item.failed}
                                            </td>
                                            <td className="pv3 bb b--black-20">
                                                {(item.failed * 100 / (item.processed + item.failed)).toFixed(2)}%
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pv3 b bb b--black-20">
                                                Recebidas
                                            </td>
                                            <td className="pv3 bb b--black-20">
                                                {item.received}
                                            </td>
                                            <td className="pv3 bb b--black-20">
                                                {(item.received * 100 / item.processed).toFixed(2)}%
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pv3 b bb b--black-20">
                                                Lidas
                                            </td>
                                            <td className="pv3 bb b--black-20">
                                                {item.read}
                                            </td>
                                            <td className="pv3 bb b--black-20">
                                                {(item.read * 100 / item.received).toFixed(2)}%
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pv3 b bb b--black-20">
                                                Respondidas
                                            </td>
                                            <td className="pv3 bb b--black-20">
                                                {item.answer}
                                            </td>
                                            <td className="pv3 bb b--black-20">
                                                {(item.answer * 100 / item.received).toFixed(2)}%
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}

AbTest.propTypes = {
    content: PropTypes.string
}

export default AbTest
