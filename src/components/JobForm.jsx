import React from 'react';
import {
    Modal,
    Text,
    Button,
    Box,
    TextInput,
    Select,
    Group,
    Textarea,
    rem, NativeSelect,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, Controller } from 'react-hook-form';
import { IconCurrencyRupee } from '@tabler/icons-react';
import Image from "next/image";
import { IconChevronDown, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import axios from "axios";

const JobForm = ({ isOpen, onClose }) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            jobTitle: '',
            companyName: '',
            location: '',
            jobType: '',
            salaryStart: '',
            salaryEnd: '',
            applicationDeadline: null,
            jobDescription: '',
        },
    });

    const onSubmit = async (data) => {
        const min = Number(data.salaryStart);
        const max = Number(data.salaryEnd);
        const payload = {
            ...data,
            salaryStart: parseInt(data.salaryStart),
            salaryEnd: parseInt(data.salaryEnd), // if applicable
        };


        if (min && max && min > max) {
            alert('Minimum salary should be less than or equal to Maximum salary');
            return;
        }
        console.log(data)

        try {
            const response = await axios.post(
                'https://web-production-3a402.up.railway.app/jobs',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'K.582002', // replace with your actual API key
                    },
                }
            );

            console.log('Job created:', response.data);
            alert('Job successfully created!');
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong while creating the job');
        }
    };

    // Base input style for most fields
    const inputBase = {
        label: {
            color: '#636363',
            fontSize: '19px',
            fontWeight: 600,
            marginBottom: '4px',
        },
        input: {
            // borderColor: '#BCBCBC',
            border:'1px solid #BCBCBC',
            color: '#000000',
            width: '100%',
            height: '55px',
            fontSize: '16px',
            borderRadius: '10px',
            '&:focus': {
                borderColor: '#000',
                color: '#000',
            },
        },
        error: { color: 'red', fontSize: rem(12) },
    };

    // Special style for salary inputs
    const salaryInputStyle = {
        ...inputBase,
        input: {
            ...inputBase.input,
            height: '55px',
            width: '100%',
            padding: '0 8px',
            paddingLeft:'42px'
            // paddingLeft: '36px',
        },
    };

    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            centered
            size="xl"
            withCloseButton={false}
            overlayProps={{ backgroundOpacity: 0.5 }}
            styles={{
                content: {
                    width: '848px',
                    padding: '30px',
                    maxWidth: '100%',
                    borderRadius: '10px',
                },
                inner: { padding: 0 },
            }}
        >
            <Box mb="lg" style={{ display: 'flex', justifyContent: 'center',marginTop:'-20px',marginBottom:'20px'  }}>
                <Text fw={600} style={{fontSize:'24px'}}>
                    Create Job Opening
                </Text>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box style={{ display: 'grid', gap: rem(16),marginTop:'40px' }}>
                    {/* Job Title and Company */}
                    <Group grow>
                        <Controller
                            name="jobTitle"
                            control={control}
                            rules={{ required: 'Job title is required' }}
                            render={({ field }) => (
                                <TextInput
                                    label="Job Title"
                                    placeholder="Full Stack Developer"
                                    error={errors.title?.message}
                                    styles={inputBase}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="companyName"
                            control={control}
                            rules={{ required: 'Company name is required' }}
                            render={({ field }) => (
                                <TextInput
                                    label="Company Name"
                                    placeholder="Amazon, Microsoft, Swiggy"
                                    error={errors.company?.message}
                                    styles={inputBase}
                                    {...field}
                                />
                            )}
                        />
                    </Group>

                    {/* Location and Job Type */}
                    <Group grow>
                        <Controller
                            name="location"
                            control={control}
                            rules={{ required: 'Location is required' }}
                            render={({ field }) => (
                                <NativeSelect
                                    label="Location"
                                    placeholder="Choose Preferred Location"
                                    data={[
                                        { label: 'Choose Preferred Location', value: '', disabled: true },
                                        { label: 'Bangalore', value: 'Bangalore' },
                                        { label: 'Mumbai', value: 'Mumbai' },
                                        { label: 'Delhi', value: 'Delhi' },
                                        { label: 'Chennai', value: 'Chennai' },
                                        { label: 'Hyderabad', value: 'Hyderabad' },
                                        { label: 'Pune', value: 'Pune' },
                                        { label: 'Kolkata', value: 'Kolkata' },
                                        { label: 'Ahmedabad', value: 'Ahmedabad' },
                                        { label: 'Kochi', value: 'Kochi' },
                                    ]}

                                    error={errors.location?.message}
                                    styles={inputBase}
                                    rightSection={
                                        <Image
                                            style={{ position: 'absolute', right: '20px', top: '24px' }}
                                            src="/Icons/down.svg"
                                            alt="dropdown-icon"
                                            width={14}
                                            height={8}
                                        />
                                    }
                                    {...field}
                                />

                            )}
                        />
                        <Controller
                            name="jobType"
                            control={control}
                            rules={{ required: 'Job type is required' }}
                            render={({ field }) => (
                                <Select
                                    label="Job Type"
                                    placeholder="Select Job Type"
                                    rightSection={
                                        <Image
                                            style={{ position: 'absolute', right: '20px', top: '24px' }}
                                            src="/Icons/down.svg"
                                            alt="dropdown-icon"
                                            width={14}
                                            height={8}
                                        />
                                    }
                                    data={[
                                        { label: '', value: 'Job Type', disabled: true },
                                        { label: 'FullTime', value: 'FULLTIME' },
                                        { label: 'PartTime', value: 'PARTTIME' },
                                        { label: 'Contract', value: 'CONTRACT' },
                                        { label: 'Internship', value: 'INTERNSHIP' },
                                    ]
                                    }
                                    error={errors.type?.message}
                                    styles={inputBase}

                                    {...field}
                                />
                            )}
                        />

                    </Group>

            <Group
                style={{
                        // backgroundColor: 'black',
                        width: '100%',
                }}
            >
                {/* Salary Range */}
                <Group
                    style={{
                        // backgroundColor: 'black',
                        width: '50%',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap:'nowrap',
                        // justifyContent:'center',
                        // alignItems: 'center',
                        // width: '100%',
                    }}
                >
                    <Controller
                        name="salaryStart"
                        control={control}
                        rules={{ required: 'Minimum salary is required' }}
                        render={({ field }) => (
                            <TextInput
                                type={'number'}
                                leftSection={
                                <Image
                                    style={{ position: 'absolute', right: '5px', top: '19px' }}
                                    src="/Icons/upDown.svg"
                                    alt="dropdown-icon"
                                    width={14}
                                    height={8}
                                />}
                                label="Salary Range"
                                placeholder="₹0"
                                icon={<IconCurrencyRupee size={18} />}
                                error={errors.salaryStart?.message}
                                styles={salaryInputStyle}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="salaryEnd"
                        control={control}

                        rules={{ required: 'Maximum salary is required' }}
                        render={({ field }) => (
                            <TextInput
                                type={'number'}
                                leftSection={
                                    <Image
                                        style={{ position: 'absolute', right: '5px', top: '19px' }}
                                        src="/Icons/upDown.svg"
                                        alt="dropdown-icon"
                                        width={14}
                                        height={8}
                                    />}
                                label="Salary Range"
                                placeholder="₹12,00,000"
                                icon={<IconCurrencyRupee size={18} />}
                                error={errors.salaryEnd?.message}
                                styles={salaryInputStyle}
                                {...field}
                            />
                        )}
                    />
                </Group>
                    {/*Dead Line*/}
                    <Controller
                        name="applicationDeadline"
                        control={control}
                        rules={{ required: 'Deadline is required' }}
                        render={({ field }) => (
                            <DateInput
                                label="Application Deadline"
                                minDate={new Date()}
                                placeholder="Select Date"
                                valueFormat="DD/MM/YYYY"
                                error={errors.deadline?.message}
                                styles={{
                                    ...inputBase,
                                    input: {
                                        height: 50,
                                        width:'150%',
                                        fontSize: 16,
                                        padding: '0 14px',
                                        borderRadius: 10,
                                        border: '1.5px solid #ccc',
                                    },
                                    dropdown: {
                                        borderRadius: 12,
                                        border: '1px solid #ddd',
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                                        padding: 12,
                                        backgroundColor: '#fff',
                                    },
                                    calendarHeader: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center', // centers all children (arrows + label)
                                        gap: 12,
                                        padding: '8px 0',
                                    },
                                    calendarHeaderControl: {
                                        width: 34,
                                        height: 34,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 8,
                                        backgroundColor: '#f2f2f2',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: '#e0e0e0',
                                        },
                                    },
                                    calendarHeaderLevel: {
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: '#333',
                                        minWidth: '120px',
                                        textAlign: 'center',
                                    },
                                    weekdaysRow: {
                                        marginBottom: 8,
                                        paddingTop: 4,
                                    },
                                    weekday: {
                                        fontWeight: 600,
                                        fontSize: 13,
                                        color: '#888',
                                        width: 36,
                                        textAlign: 'center',
                                    },
                                    day: {
                                        fontWeight: 500,
                                        fontSize: 14,
                                        height: 36,
                                        width: 36,
                                        borderRadius: 10,
                                        transition: 'all 0.2s ease-in-out',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        '&:hover': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                        '&[dataSelected]': {
                                            backgroundColor: '#000',
                                            color: '#fff',
                                        },
                                        '&[dataToday]': {
                                            border: '1px solid #000',
                                        },
                                        '&[dataDisabled]': {  // Correct selector for disabled days
                                            color: '#ccc', // gray out disabled dates
                                            textDecoration: 'line-through',
                                            pointerEvents: 'none',
                                            cursor: 'not-allowed',
                                        },
                                }
                                }}
                                rightSection={<Image
                                    style={{ position: 'absolute', right: '-90px', top: '18px' }}
                                    src="/Icons/dates.svg"
                                    alt="dropdown-icon"
                                    width={14}
                                    height={8}
                                />}
                                nextIcon={<IconChevronRight size={18} />}
                                previousIcon={<IconChevronLeft size={18} />}
                                {...field}
                            />

                        )}
                    />
            </Group>

                    {/* Job Description */}
                    <Controller
                        name="jobDescription"
                        control={control}
                        rules={{ required: 'Job description is required' }}
                        render={({ field }) => (
                            <Textarea
                                label="Job Description"
                                placeholder="Please share a description to let the candidate know more about the job role"
                                minRows={10}
                                error={errors.description?.message}
                                styles={{
                                    label: {
                                        color: '#636363',
                                        fontSize: '19px',
                                        fontWeight: 600,
                                        marginBottom: '4px',
                                    },
                                    input: {
                                        // borderColor: '#BCBCBC',
                                        border:'1px solid #BCBCBC',
                                        padding: '16px',
                                        color: '#000',
                                        width: '100%',
                                        height: '169px',
                                        fontSize: '16px',
                                        borderRadius: '10px',
                                        '&:focus': {
                                            borderColor: '#000',
                                            color: '#000',
                                        },
                                    },
                                    error: { color: 'red', fontSize: rem(12) },
                                }}
                                {...field}
                            />
                        )}
                    />
                </Box>

                {/* Footer Buttons */}
                <Group
                    style={{
                        marginTop: '30px',
                        width:'100%',
                        display:'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button
                        variant="default"
                        size="md"
                        radius="md"
                        style={{
                            boxShadow: '0px 0px 4px 0px #00000040',
                            width: '207px',
                            height: '59px',
                            display: 'flex',
                            padding: '12px 24px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '20px',
                            fontWeight: 600,
                            borderRadius: '10px',
                            border: '1.5px solid #222',
                            gap: '10px', // adds spacing between text and image
                        }}
                        onClick={() => {
                            reset();
                            onClose();
                        }}
                    >
                        Save Draft
                        <Image
                            src={'/Icons/bottom.svg'}
                            alt={'down-arrow'}
                            height={10}
                            width={9}
                            style={{
                                marginTop: '2px',
                                marginLeft: '10px',
                            }}
                        />
                    </Button>

                    <Button type="submit"  radius="md" color="#00AAFF"
                        style={{
                            width: '207px',
                            height: '59px',
                            display: 'flex',
                            padding: '12px 50px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '20px',
                            gap:'4px',
                            fontWeight: 600,
                        }}
                    >
                        Publish
                        <Image src={'/Icons/right.svg'} alt={'down-arrow'} height={16} width={16}
                            style={{
                                marginLeft:'5px',
                                marginTop:'2px',
                            }}
                        />
                    </Button>
                </Group>
            </form>
        </Modal>
    );
};

export default JobForm;
