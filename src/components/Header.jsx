import React from 'react'
import {Box, Button, rem, Text, Title} from "@mantine/core";
import Image from "next/image";

const Header = ({ onOpenModal}) => {
    const headerContents = ["Home","Find Jobs","Find Talents","About us","Testimonials" ]
    return (
        <Box
            className="w-[80%] lg:w-[890px] h-[80px] border-[1px] border-[#FCFCFC] rounded-full mt-[21px] px-[26px] py-[16px] flex flex-row items-center justify-between mb-[21px]"
            style={{boxShadow: '0px 0px 20px 0px #7F7F7F26'}}
>
            <Image
                src="/logo.svg"
                alt="Logo"
                radius="md"
                width={44}
                height={44}
                className={'mr-[24px]'}
            />
            <Box

                className={'w-full h-full md:flex flex-row items-center justify-between px-5 mr-3 hidden'}
            >
                {
                    headerContents.map((header, i) => (
                        <Text key={i} c={"#303030"}  fw={600} className={'text-[12px] lg:text-[16px]'}>{header}</Text>
                    ))
                }
            </Box>
            <Button
                onClick={onOpenModal}
                radius="xl"
                w={rem(160)}
                h={rem(40)}
                px={rem(20)}
                style={{
                    background: 'linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)',
                }}
            >
                <Text fw={600} fz={rem(16)} c="#fff" style={{ lineHeight: 1 }}>
                    Create Job
                </Text>
            </Button>
        </Box>
    )
}
export default Header
