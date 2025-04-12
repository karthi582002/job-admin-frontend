import React, {useState} from 'react'
import { Card, Text, Badge, Button, Group, Box } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import {timeAgoShort} from "@/const/TimeConvertion";
dayjs.extend(relativeTime);


const JobCards = ({job,index}) => {
    const [imgError, setImgError] = useState(false);
    const lowercaseName = job.companyName.toLowerCase();
    const experienceMap = {
        "INTERNSHIP": "0-1 yr Exp",
        "FULLTIME": "1-3 yr Exp",
        "PARTTIME": "0-1 yr Exp",
        "CONTRACT": "2-5 yr Exp",
    };
    const jobDetails = [
        {
            icon: "/icons/experience.svg",
            label: experienceMap[job.jobType] || "N/A",
            width: 17.1,
            height: 13.5,
        },
        {
            icon: "/icons/mode.svg",
            label: `${
                job.jobType === "FULLTIME"
                    ? "Onsite"
                    : job.jobType === "PARTTIME"
                        ? "Hybrid"
                        : "WFH"
            }`,

            width: 17.273,
            height: 14.682,
        },
        {
            icon: "/icons/stack.svg",
            label: `${(job.salaryEnd * 12 / 100000).toFixed(0)} LPA`,
            width: 16.364,
            height: 18.182,
        },
    ];
    return (
<>
<Card
    padding="lg"
    radius="md"
    w={320}
    h={360}
    px={"16px"}
    py={"16px"}
    key={index}
    style={{
        boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',  // More visible shadow with rgba
        backgroundColor: 'white',  // Set a white background if not already set
        zIndex: 1  // Ensure it's above other content
    }}
>
    {/* Card Content */}
<Box
        key={index}
        className={'flex justify-between'}
    >
        <Box
            className={'w-[82px] h-[82px] px-[8.79px] py-[8.05] flex justify-center items-center'}
            style={{
                boxShadow: '0px 0px 10.25px 0px rgba(148, 148, 148, 0.25)',
                borderRadius: '13.179px',
                background: 'linear-gradient(180deg, #FEFEFD 0%, #F1F1F1 100%)'
            }}
        >
            {!imgError ? (
                <Image
                    src={`/companyLogos/${lowercaseName}.png`}
                    width={65.8}
                    height={65.8}
                    alt="job"
                    onError={() => setImgError(true)}
                    style={{
                        borderRadius: '100%',
                    }}
                />
            ) : (
                <Text
                    style={{
                        fontSize: '50px',
                        fontWeight: 900,
                    }}
                >{job.companyName.charAt(0).toUpperCase()}</Text>
            )}
        </Box>
        <Box
            className={'bg-[#B0D9FF] w-[75px] h-[35px] rounded-[10px] flex justify-center items-center'}
        >
            <Text fw={500} style={{ fontSize: '14px' }}>
                {timeAgoShort(job.createdAt)}
            </Text>

        </Box>
    </Box>
        <Box
            className={'mt-[5px]'}
            >
            <Text
                style={{fontSize:'20px'}}  fw={700}
            >
                {job.jobTitle}
            </Text>
        </Box>
        <Box className="mt-[14px] w-full h-auto flex justify-center items-center">
            {jobDetails.map((detail, index) => (
                <Box
                    key={index}
                    className="w-full h-[22px] flex flex-row items-center gap-[4px] items-center justify-center"
                >
                    <Image
                        src={detail.icon}
                        alt={`${detail.label}-icon`}
                        width={detail.width}
                        height={detail.height}

                    />
                    <Text fw={500} c="#5A5A5A" style={{ fontSize: '16px' }}>
                        {detail.label}
                    </Text>
                </Box>
            ))}
        </Box>
        <Box className="ml-4 mt-[16px] mb-[20px]">
            <ul className="list-disc space-y-2 text-[#555] text-[14px] font-semibold leading-[20px]">
                <li>
                    <Text lineClamp={4}
                        style={{
                            fontsize: '14px',
                            fontWeight:500,
                        }}
                    >
                        {job.jobDescription}
                    </Text>
                </li>
            </ul>
        </Box>
        <Button
            fullWidth
            styles={{
                root: {
                    backgroundColor: '#00AAFF',
                    height: '46px',
                    padding: '12px 10px',
                    boxShadow: '0px 0px 14px 0px #5D5D5D26',
                    borderRadius: '10px',
                    border:'1px solid #00AFF',
                }
            }}
        >
            Apply Now
        </Button>

    </Card>
</>
    )
}
export default JobCards
