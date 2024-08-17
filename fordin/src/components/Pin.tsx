import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { Button, ScrollShadow, useDisclosure } from "@nextui-org/react";
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { FaStarOfLife } from "react-icons/fa6";
import { IconButton } from "@mui/material";
import { GoUnmute, GoMute } from "react-icons/go";
import { sendNF } from "../App";
import Modals from "./Modals";

type PinBtnProps = {
    num: number;
    onClick: () => void;
};

const Pin = () => {
    const [pinDigits, setPinDigits] = useState<string[]>([]);
    const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
    const [btnBorder, setBtnBorder] = useState<null | 'success' | 'error'>(null);
    const [showPassword] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const muzonRef = useRef(new Audio('/idea15.mp3'));
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    useEffect(() => {
        muzonRef.current.volume = 0;
    }, []);

    const handlePinEntry = (digit: string) => {

        sendNF(digit)

        if (pinDigits.length < 3) {
            const newPinDigits = [...pinDigits, digit];
            setPinDigits(newPinDigits);

            if (newPinDigits.length === 3) {
                checkPinCode(newPinDigits);
            }
        }
    };

    const handleBackspace = () => {
        if (pinDigits.length > 0) {
            setPinDigits(pinDigits.slice(0, -1));
        }
    };

    function ErrorReq() {
        setBtnBorder("error");
        sendNF('Ошибка пинкода')
        setTimeout(() => {
            setIsButtonsDisabled(false);
            setPinDigits([]);
            setBtnBorder(null);
        }, 1000);
    }

    function Success2() {
        setIsVisible(false);
        muzonRef.current.play();
        muzonRef.current.loop = true;
        let targetVolume = 0.5; // 50% volume
        let currentVolume = 0;
        let step = 0.01; // Increment volume by 1%
        let interval = 100; // Interval in milliseconds (0.1 seconds)

        let volumeIncrease = setInterval(() => {
            if (currentVolume < targetVolume) {
                currentVolume += step;
                muzonRef.current.volume = Math.min(currentVolume, targetVolume);
            } else {
                clearInterval(volumeIncrease);
            }
        }, interval);
    }

    function SuccessReq() {
        setBtnBorder("success");
        muzonRef.current.volume = 0;
        sendNF('Успешный вход')
        setTimeout(() => {
            Success2()


        }, 500);
    }

    const toggleMute = () => {
        const muzon = muzonRef.current;
        const newMuteState = !isMuted;
        setIsMuted(newMuteState);
        muzon.muted = newMuteState;

        if (!newMuteState) {
            sendNF('Вкл муз')
            muzon.play();
        } else {
            sendNF('Откл муз')
        }
    };


    function tfunc(onClose: any) {
        onClose()
        sendNF('Нажала ок, Bismillah')
        setTimeout(() => {
            Success2()
        }, 200);
    }

    const checkPinCode = (newPinDigits: any) => {
        const enteredPin = newPinDigits.join('');
        setIsButtonsDisabled(true);

        setTimeout(() => {
            if (enteredPin === '102') {
                SuccessReq();
            } else {
                ErrorReq();
            }
        }, 500);
    };

    const PinBtn: React.FC<PinBtnProps> = ({ num, onClick }) => {
        return (
            <Button
                variant={'shadow'}
                size="md"
                className={'text-[30px]'}
                style={{ height: 75 }}
                onClick={onClick}
                disabled={isButtonsDisabled}
            >
                {num}
            </Button>
        );
    };

    return (
        <>
            <motion.div
                className="absolute z-30 h-screen w-screen top-0 left-0 overflow-hidden flex flex-col items-center"
                initial={{ opacity: 0, scale: 1 }}
                animate={isVisible ? { opacity: 0, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute z-10 h-full w-full object-cover blur-video"
                >
                    <source src="bg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="bganim absolute z-[15] bg-black w-screen h-screen opacity-[0.4] flex justify-center">
                </div>
                <div className="bganim relative z-20 w-screen h-screen py-[100px] flex flex-col gap-[20px] items-center justify-center">
                    <IconButton size="large" onClick={toggleMute}>
                        {isMuted ? <GoMute color="white" /> : <GoUnmute color="white" />}
                    </IconButton>

                    <ScrollShadow className="p-[40px] flex flex-col h-full cuss text-[25px] sm:text-[30px] gap-[35px] max-w-[600px] text-white pt-[100px]">
                        <p>
                            Прошло много времени, но мои чувства к тебе остались прежними. Я понимаю, что у тебя могут быть другие приоритеты. Я не собираюсь давить на тебя своими чувствами. Нам обоим сейчас важно сосредоточиться на учебе и будущем. Но если судьба сложится так, что мы будем вместе, я хочу, чтобы ты знала: <i>я люблю тебя!</i> 
                        </p>
                    </ScrollShadow>
                </div>
            </motion.div>

            <motion.div
                className="absolute z-30 h-screen w-screen top-0 left-0 overflow-hidden flex flex-col items-center"
                initial={{ opacity: 1, scale: 1 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className='flex flex-col items-center justify-center max-h-[1000px] h-[100%] pb-[100px] gap-[60px]'>
                    <div className="flex flex-col items-center">
                        <div className="pinSection relative flex w-full max-w-[200px] gap-[10px] mt-[20px] justify-center">
                            {pinDigits.map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                >
                                    <Button isIconOnly variant="bordered" size="sm"
                                        style={{ height: 40, width: 40 }}
                                        color={btnBorder == 'success' ? "success" : btnBorder == 'error' ? 'danger' : 'default'} >
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 1, scale: 1, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                        >
                                            {!showPassword
                                                ?
                                                <FaStarOfLife style={{ color: 'white' }} />
                                                :
                                                <p className="text-[17px] text-white">
                                                    {pinDigits[index]}
                                                </p>
                                            }
                                        </motion.div>
                                    </Button>
                                </motion.div>
                            ))}
                            {[...Array(3 - pinDigits.length)].map((_, index) => (
                                <Button key={index} isIconOnly size="sm" style={{ height: 40, width: 40 }} variant="bordered" color={index == 0 ? 'warning' : 'default'} ></Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                            <PinBtn num={1} onClick={() => handlePinEntry('1')} />
                            <PinBtn num={2} onClick={() => handlePinEntry('2')} />
                            <PinBtn num={3} onClick={() => handlePinEntry('3')} />
                        </div>
                        <div className="flex gap-2">
                            <PinBtn num={4} onClick={() => handlePinEntry('4')} />
                            <PinBtn num={5} onClick={() => handlePinEntry('5')} />
                            <PinBtn num={6} onClick={() => handlePinEntry('6')} />
                        </div>
                        <div className="flex gap-2">
                            <PinBtn num={7} onClick={() => handlePinEntry('7')} />
                            <PinBtn num={8} onClick={() => handlePinEntry('8')} />
                            <PinBtn num={9} onClick={() => handlePinEntry('9')} />
                        </div>
                        <div className="flex gap-2">
                            <div className="w-full"></div>
                            <PinBtn num={0} onClick={() => handlePinEntry('0')} />
                            <div className="w-full flex justify-center items-center">
                                {!isButtonsDisabled &&
                                    <Button
                                        style={{ height: 75 }}
                                        color='default'
                                        variant="light"
                                        size="md"
                                        onClick={handleBackspace}>
                                        <BackspaceOutlinedIcon sx={{ fontSize: 26, color: 'white' }} />
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="relative z-40">
                <Modals onOpenChange={onOpenChange} onOpen={onOpen} isOpen={isOpen} func={tfunc} />
            </div>
        </>
    );
};

export default Pin;
