/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react'
import { withLoadingAsync, showToast, showModal } from '../../services/common-service'
import { getBucket, getBucketVariable, storeBucketVariable, deleteBucketVariable } from '../../services/bucket-service'
import { getConfigurationAsync } from '../../services/configuration-service'
import { getApplicationDataAsync } from '../../services/application-service';
import { getLoggedUserAsync } from '../../services/user-service';
import BlipPortalToastTypes from '../../constants/blip-portal-toast-types'
import InputChips from '../../components/InputChips'
import Select from '../../components/Select'
import Modal from '../../components/Modal'
import Card from '../../components/Card'
import { v4 as uuidv4 } from 'uuid';
import sherlock from '../../assets/images/sherlock.png'

const EntryPoints = () => {
    const [appInfo, setAppInfo] = useState({});
    const [user, setUser] = useState({});
    const [configuration, setConfiguration] = useState({});
    const [phoneNumber, setPhoneNumber] = useState("");
    const [entryPointsData, setEntryPointsData] = useState([]);
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        getAppDataAsync();
        LoadEntryPointsAsync();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
    }, [entryPointsData])

    const getAppDataAsync = async () => {
        const app = await getApplicationDataAsync();
        setAppInfo(app);

        const loggedUser = await getLoggedUserAsync();
        setUser(loggedUser);

        const configurationVariables = await getConfigurationAsync(app.shortName);
        setConfiguration(configurationVariables);

        const countryCode = configurationVariables['items'].find((obj) => obj["name"] === "CountryCode" && obj["owner"] === "postmaster@wa.gw.msging.net")
        const phoneNumber = configurationVariables['items'].find((obj) => obj["name"] === "PhoneNumber" && obj["owner"] === "postmaster@wa.gw.msging.net")
        setPhoneNumber(countryCode["value"] + phoneNumber["value"])
    };

    const LoadEntryPointsAsync = async () => {
        const bucketEntryPoints = await getBucketVariable("EntryPoints-Data-Plugin")
        console.log(bucketEntryPoints)
        if (!bucketEntryPoints) {
            await storeBucketVariable("EntryPoints-Data-Plugin", { "entryPoints": [] })
        } else {
            setEntryPointsData(bucketEntryPoints["entryPoints"])
        }
        setEdited(false)
    }

    const updateEntryPointsData = (index, newItem) => {
        setEntryPointsData(entryPointsData => {
            const updatedList = [...entryPointsData]
            updatedList[index] = newItem
            return updatedList
        })
        setEdited(true)
    }

    const deleteEntryPointsData = (index) => {
        setEntryPointsData(entryPointsData => {
            if (entryPointsData.length > 1) {
                let updatedList = [...entryPointsData]
                updatedList = updatedList.splice(index, 1)
                return updatedList
            } else {
                return []
            }


        })
        setEdited(true)
    }

    const newEntryPoint = () => {
        setEntryPointsData(entryPointsData => {
            const updatedList = [...entryPointsData]
            updatedList.push({
                "Mensagem": "",
                "Tracking": "",
                "Origem": "",
                "Produto": "",
                "Convenio": "",
                "Direcionamento": ""
            })
            return updatedList
        })
    }

    const handleDownload = () => {
        const jsonBlob = new Blob([JSON.stringify({ "entryPoints": entryPointsData })], { type: 'application/json' });
        const downloadUrl = URL.createObjectURL(jsonBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = `EntryPoints_${appInfo.shortName}_${new Date().toISOString()}.json`;
        downloadLink.click();
    };

    return (
        <>
            <div className="ph1 ph4-m ph5-ns mt3">
                <div className="flex justify-end mb3">
                    <div className="mr3">
                        <bds-button-icon
                            variant="secondary"
                            size="short"
                            icon="download"
                            onClick={() => {
                                handleDownload()
                            }}
                        />
                    </div>
                    <div className="mr3">
                        <bds-button-icon
                            variant="secondary"
                            size="short"
                            icon="refresh"
                            onClick={() => {
                                withLoadingAsync(async () => {
                                    await LoadEntryPointsAsync()
                                })
                            }}
                        />
                    </div>
                    <div className="mr3">
                        <bds-button
                            variant='primary'
                            onClick={() => {
                                newEntryPoint()
                            }}
                        >
                            Novo EntryPoint
                        </bds-button>
                    </div>
                    <bds-button
                        variant='primary'
                        disabled={!edited}
                        onClick={() => {
                            withLoadingAsync(async () => {
                                console.log(entryPointsData)
                                await storeBucketVariable("EntryPoints-Data-Plugin", { "entryPoints": entryPointsData })
                                setEdited(false)
                            })
                        }}
                    >
                        Salvar
                    </bds-button>

                </div>
                {entryPointsData?.map((item, index) => (
                    <div className="mb3">
                        <bds-paper elevation="static">
                            <div className="ph3 pt3">
                                <div className="flex justify-between items-center">
                                    <div className="w-25 mr2">
                                        <bds-input
                                            label="Mensagem de contexto"
                                            id={"Mensagem" + index}
                                            value={item["Mensagem"]}
                                            onInput={(e) => {
                                                const obj = item
                                                obj["Mensagem"] = e.target.value
                                                updateEntryPointsData(index, obj)
                                            }}
                                        />
                                    </div>
                                    <div className="w-25 mr2">
                                        <bds-input
                                            label="Tracking"
                                            id={"Tracking" + index}
                                            value={item["Tracking"]}
                                            onInput={(e) => {
                                                const obj = item
                                                obj["Tracking"] = e.target.value
                                                updateEntryPointsData(index, obj)
                                            }}
                                        />
                                    </div>
                                    <div className="w-25 mr2">
                                        <bds-input
                                            label="Origem"
                                            id={"Origem" + index}
                                            value={item["Origem"]}
                                            onInput={(e) => {
                                                const obj = item
                                                obj["Origem"] = e.target.value
                                                updateEntryPointsData(index, obj)
                                            }}
                                        />
                                    </div>
                                    <div className="w-25 mr2">
                                        <bds-input
                                            label="Produto"
                                            id={"Produto" + index}
                                            value={item["Produto"]}
                                            onInput={(e) => {
                                                const obj = item
                                                obj["Produto"] = e.target.value
                                                updateEntryPointsData(index, obj)
                                            }}
                                        />
                                    </div>
                                    <div className="w-25 mr2">
                                        <bds-input
                                            label="Convenio"
                                            id={"Convenio" + index}
                                            value={item["Convenio"]}
                                            onInput={(e) => {
                                                const obj = item
                                                obj["Convenio"] = e.target.value
                                                updateEntryPointsData(index, obj)
                                            }}
                                        />
                                    </div>
                                    <div className="w-25 mr2">
                                        <bds-input
                                            label="Direcionamento"
                                            id={"Direcionamento" + index}
                                            value={item["Direcionamento"]}
                                            onInput={(e) => {
                                                const obj = item
                                                obj["Direcionamento"] = e.target.value
                                                updateEntryPointsData(index, obj)
                                            }}
                                        />
                                    </div>
                                    <div className="w-5 flex justify-end">
                                        <div className='mr3'>
                                            <bds-button-icon
                                                icon="trash"
                                                variant="delete"
                                                size="short"
                                                onClick={() => {
                                                    deleteEntryPointsData(index)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mv1">
                                    <bds-typo variant="fs-10">
                                        https://wa.me/{phoneNumber}?text={encodeURIComponent(item["Mensagem"])}
                                    </bds-typo>
                                </div>
                            </div>

                        </bds-paper>
                    </div>
                ))}

                {entryPointsData.length === 0 &&
                    <div className="mt5">
                        <div className='flex justify-center'>
                            <img className="w-10" src={sherlock} alt="sherlock" />
                        </div>
                        <div className='flex justify-center'>
                            <h2 style={{ color: "#6E7B91" }}>
                                Você ainda não tem Entry Points, vamos criar um novo?
                            </h2>
                        </div>
                        <div className='flex justify-center mt3'>
                            <bds-button
                                variant='primary'
                                onClick={async () => {
                                    newEntryPoint()
                                }}
                            >
                                Novo EntryPoint
                            </bds-button>
                        </div>

                    </div>
                }

            </div>
        </>
    )
}

export default EntryPoints
