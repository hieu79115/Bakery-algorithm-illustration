import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    PlusOutlined,
    ReloadOutlined
} from "@ant-design/icons";
import { Button, Empty, message, Image } from "antd";
import React, { useEffect, useState } from "react";
import { Process } from "../types/process";
import ProcessElem from "./ProcessElem.tsx";

const BakeryAlgorithm: React.FC = () => {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [serving, setServing] = useState<Process[]>([]);
    const [finishedProcesses, setFinishedProcesses] = useState<Process[]>([]);
    const [maxNumber, setMaxNumber] = useState<number>(0);
    const [maxServing, setMaxServing] = useState<number>(1);

    const [trigger, setTrigger] = useState<number>(0);

    const [id, setId] = useState<number>(1);

    message.config({
        maxCount: 3,
    });

    const addProcess = () => {
        const newProcess: Process = {
            id: id,
            runtime: Math.floor(Math.random() * 6) + 2
        };
        setProcesses([...processes, newProcess]);
        setMaxNumber(maxNumber + 1);
        setId((prev) => prev + 1);
    };

    const serveNextProcess = () => {
        setTrigger((prev) => prev + 1);
    };

    const finishProcess = (_id: number) => {
        const process = serving.find((p) => p.id === _id);
        if (process) {
            setFinishedProcesses((prev) => [...prev, process]);
            setServing((prev) => prev.filter((p) => p.id !== _id));
            serveNextProcess();
            message.success(`Process ${_id} finished`);
        }
    }

    const serveIncrease = () => {
        setMaxServing((prev) => prev + 1);
    };

    const serveDecrease = () => {
        if (maxServing > 1) {
            setMaxServing(maxServing - 1);
        }
    };

    const resetAll = () => {
        setProcesses([]);
        setServing([]);
        setFinishedProcesses([]);
        setMaxNumber(0);
        setMaxServing(1);
        setId(1);
    };

    useEffect(() => {
        if (processes.length > 0) {
            if (serving.length < maxServing) {
                const process = processes[0];
                setServing((prev) => [...prev, process]);
                setProcesses((prev) => prev.slice(1));
            }
        }
    }, [trigger, maxServing]);


    return (
        <div className="text-white m-5 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-center">
                <Image
                    className="translate-x-[-20px] md:translate-x-[20px]"
                    src="https://www.svgrepo.com/show/408281/bakery-christmas-cookie-cupcake-pastry-winter.svg"
                    width={150}
                    preview={false}
                />
                <h1 className="text-5xl font-bold flex mb-8 md:m-11">Bakery Algorithm</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 justify-center mb-4">
                <Button
                    className="w-fit" ghost onClick={addProcess} size="large" icon={<PlusOutlined/>}
                >
                    Add Process
                </Button>
                <Button
                    className="w-fit" ghost onClick={serveIncrease} size="large" icon={<ArrowUpOutlined/>}
                >
                    Increase Processes Serving
                </Button>
                <Button
                    className="w-fit" ghost onClick={serveDecrease} size="large" icon={<ArrowDownOutlined/>}
                >
                    Decrease Processes Serving
                </Button>
                <Button
                    className="w-fit" ghost onClick={resetAll} size="large" icon={<ReloadOutlined/>}
                >
                    Reset
                </Button>
            </div>
            <div className="flex flex-col md:flex-row justify-around">
                <div className="w-full md:w-1/3 p-2">
                    <h2 className="flex justify-center m-5 text-lg font-semibold">Waiting Processes
                        ({processes.length})</h2>
                    {processes.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                            {processes.map((process) => (
                                <li className="flex justify-center" key={`${process.id}p`}>
                                    <ProcessElem length={1}
                                                 text={`Process ${process.id}: Runtime ${process.runtime}s`}
                                                 finish={serveNextProcess}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <Empty description={false}/>
                            <p>No waiting processes</p>
                        </div>
                    )}
                </div>
                <div className="w-full md:w-1/3 p-2">
                    <h2 className="flex justify-center m-5 text-lg font-semibold">Serving
                        ({serving.length}/{maxServing})</h2>
                    {serving.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                            {serving.map((process) => (
                                <li className="flex justify-center" key={`${process.id}s`}>
                                    <ProcessElem length={process.runtime}
                                                 text={`Serving Process ${process.id}: Runtime ${process.runtime}s`}
                                                 finish={() => finishProcess(process.id)}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <Empty description={false}/>
                            <p>No serving processes</p>
                        </div>
                    )}
                </div>
                <div className="w-full md:w-1/3 p-2">
                    <h2 className="flex justify-center m-5 text-lg font-semibold">Finished Processes
                        ({finishedProcesses.length})</h2>
                    {finishedProcesses.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                            {finishedProcesses.map((process) => (
                                <li className="flex justify-center" key={`${process.id}f`}>
                                    <ProcessElem length={0}
                                                 text={`Process ${process.id}: Runtime ${process.runtime}s`}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <Empty description={false}/>
                            <p>No finished processes</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BakeryAlgorithm;
