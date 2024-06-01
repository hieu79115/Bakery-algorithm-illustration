import { ArrowDownOutlined, ArrowUpOutlined, LoadingOutlined, PlusOutlined, ReloadOutlined, StepForwardOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Process } from '../types/process';
import { Image } from "antd"

const BakeryAlgorithm: React.FC = () => {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [serving, setServing] = useState<Process[]>([]);
    const [finishedProcesses, setFinishedProcesses] = useState<Process[]>([]);
    const [maxNumber, setMaxNumber] = useState<number>(0);
    const [maxServing, setMaxServing] = useState<number>(1);

    const addProcess = () => {
        const newProcess: Process = {
            id: processes.length,
            queueNumber: [maxNumber + 1, processes.length + 1],
        };
        setProcesses([...processes, newProcess]);
        setMaxNumber(maxNumber + 1);
    };

    const serveNextProcess = () => {
        if (processes.length > 0 && serving.length < maxServing) {
            const sortedProcesses = [...processes].sort((a, b) => {
                const [numA, idA] = a.queueNumber;
                const [numB, idB] = b.queueNumber;
                if (numA === numB) {
                    return idA - idB;
                }
                return numA - numB;
            });
            const processesToServe = sortedProcesses.slice(0, maxServing - serving.length);
            setServing([...serving, ...processesToServe]);
            setProcesses(sortedProcesses.slice(maxServing - serving.length));
        }
    };

    const serveIncrease = () => {
        setMaxServing(maxServing + 1);
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
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (serving.length > 0) {
                const finishedProcess = serving.shift(); // Lấy process đã phục vụ xong
                if (finishedProcess) {
                    setFinishedProcesses([...finishedProcesses, finishedProcess]);
                    setServing([...serving]);
                }
            }
            serveNextProcess();
        }, 5000);
        return () => clearInterval(timer);
    }, [processes, serving, finishedProcesses]);

    return (
        <div className="text-white m-5 flex flex-col gap-4">
            <h1 className="text-5xl font-bold m-2 flex justify-center mt-10 mb-10">Bakery Algorithm</h1>
            <div className='flex flex-row gap-4 justify-center'>
                <Button
                    className="w-fit"
                    ghost
                    onClick={addProcess}
                    icon={<PlusOutlined />}
                >
                    Add Process
                </Button>
                <Button
                    className="w-fit"
                    ghost
                    onClick={serveNextProcess}
                    icon={<StepForwardOutlined />}
                >
                    Serve Next Processes
                </Button>
                <Button
                    className="w-fit"
                    ghost
                    onClick={serveIncrease}
                    icon={<ArrowUpOutlined />}
                >
                    Increase Processes Serving
                </Button>
                <Button
                    className="w-fit"
                    ghost
                    onClick={serveDecrease}
                    icon={<ArrowDownOutlined />}
                >
                    Decrease Processes Serving
                </Button>
                <Button
                    className="w-fit"
                    ghost
                    onClick={resetAll}
                    icon={<ReloadOutlined />}
                >
                    Reset
                </Button>
            </div>
            <div className='flex flex-row justify-around'>
                <div className='w-56'>
                    <h2 className="flex justify-center m-5 text-lg font-semibold">Waiting Processes ({processes.length})</h2>
                    {processes.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                            {processes.map((process) => (
                                <li key={process.id}>
                                    <Button ghost>
                                        Process {process.id}: Queue Number [{process.queueNumber.join(', ')}]
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>
                            <p className='flex justify-center'>No finished processes</p>
                            <Image src="./public/empty-box.svg" preview={false}></Image>
                        </div>
                    )}
                </div>
                <div className='w-72'>
                    <h2 className="flex justify-center m-5 text-lg font-semibold">Serving ({serving.length}/{maxServing})</h2>
                    {serving.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                            {serving.map((process) => (
                                <li key={process.id}>
                                    <Button type="primary" ghost>
                                        Serving Process {process.id}: Queue Number [{process.queueNumber.join(', ')}]
                                        <LoadingOutlined />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>
                            <p className='flex justify-center'>No finished processes</p>
                            <Image src="./public/empty-box.svg" preview={false}></Image>
                        </div>
                    )}
                </div>
                <div className='w-56'>
                    <h2 className="flex justify-center m-5 text-lg font-semibold">Finished Processes ({finishedProcesses.length})</h2>
                    {finishedProcesses.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                            {finishedProcesses.map((process) => (
                                <li key={process.id}>
                                    <Button ghost>
                                        Process {process.id}: Queue Number [{process.queueNumber.join(', ')}]
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>
                            <p className='flex justify-center'>No finished processes</p>
                            <Image src="./public/empty-box.svg" preview={false}></Image>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BakeryAlgorithm;
