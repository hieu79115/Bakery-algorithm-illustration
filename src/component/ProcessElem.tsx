import { Button } from "antd";
import React, { useEffect } from "react";

interface ProcessElemProps {
    length?: number;
    text?: string;
    key?: string;
    finish?: () => void;
    props?: any;
}

const ProcessElem: React.FC<ProcessElemProps> = ({ text = "", length = 5, finish = () => {} }) => {
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (length !== 0) {
            timer = setTimeout(() => {
                finish();
            }, length * 1000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, []);


    return (
        <Button ghost size="large" style={{
            background: "linear-gradient(90deg, #00000000 50%, #808080 50%)",
            backgroundSize: "200% 200%",
            animation: `progress ${length}s linear`
        }}>
            {text}
        </Button>
    );
}

export default ProcessElem;