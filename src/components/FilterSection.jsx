'use client';

import {
    TextInput,
    NativeSelect,
    RangeSlider,
    Group,
    Text,
    Box,
    rem,
} from '@mantine/core';
import Image from 'next/image';
import React from 'react';

export default function FilterSection({ filters, setFilters }) {
    return (
        <Box className="w-full lg:h-[60px]  mb-[26px]  px-[58px] py-2 flex flex-col  lg:flex-row justify-between " spacing="md" position="apart" wrap="wrap">
            {/* Search */}
            <Box spacing="sm" className="flex flex-row lg:justify-between lg:ml-0 ml-[27px] relative">
                <Image src="/Icons/search.svg" alt="search-icon" width={18} height={18} style={{
                    position:'absolute',
                    top:8,
                    left:-15,
                    zIndex: 10,
                }} />
                <TextInput
                    name={"jobTitle"}
                    onChange={(e) => setFilters(prev => ({ ...prev, jobTitle: e.target.value }))}
                    placeholder="Search By Job Title, Role"
                    styles={{
                        input: {
                            fontSize: rem(16),
                            color: '#686868',
                            fontWeight: 500,
                            // width: rem(200),
                            width: '100%',
                            height: '100%',
                            padding: '8px 12px',
                            border: 'none',
                            boxShadow: 'none',
                            outline: 'none',
                            // box-shadow: ;
                        '::placeholder': {
                                color: '#000',
                                opacity: 1, // optional: to ensure consistent display across browsers
                            },
                        },
                    }}
                />
                <Box w={rem(2)} h={rem(48)} ml={rem(32)} className={'hidden lg:block'} bg="#EAEAEA" />
            </Box>

            {/* Location */}
            <Box spacing="sm" className="flex flex-row" ml={rem(27)} position="relative">
                <Image src="/Icons/location.svg" alt="location-icon" width={18} height={18} />
                <NativeSelect
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Preferred Location"
                    radius="md"
                    rightSection={
                        <Image
                            style={{position: 'absolute', right: '36px', top: '24px'}}
                            src="/Icons/down.svg"
                            alt="dropdown-icon"
                            width={14}
                            height={8}
                        />
                    }
                    rightSectionWidth={30}
                    styles={{
                        input: {
                            marginLeft: '27px',
                            marginRight: '72px',
                            width: '200px',
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#686868',
                            padding: '8px 14px', // slightly reduced padding
                            height: '44px',       // slightly increased height
                            lineHeight: '1.4',    // line height to give breathing room
                            display: 'flex',
                            alignItems: 'center',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            appearance: 'none',
                            outline: 'none',
                            border: 'none',
                            boxShadow: 'none',
                        },
                        rightSection: {
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    }}
                >
                    <option value="">Preferred Location</option>
                    <optgroup label="South India">
                        <option value="chennai">Chennai</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="hyderabad">Hyderabad</option>
                        <option value="kochi">Kochi</option>
                    </optgroup>
                    <optgroup label="West & North India">
                        <option value="mumbai">Mumbai</option>
                        <option value="delhi">Delhi</option>
                        <option value="pune">Pune</option>
                        <option value="kolkata">Kolkata</option>
                        <option value="ahmedabad">Ahmedabad</option>
                    </optgroup>
                </NativeSelect>
                <Box w={rem(2)} h={rem(48)} ml={rem(32)} bg="#EAEAEA" className={'hidden lg:block'}/>
            </Box>

            {/* Job Type */}
            <Box spacing="sm" align="center" className="flex flex-row" ml={rem(27)} position="relative">
                <Image src="/Icons/job.svg" alt="job-icon" width={20} height={20}/>
                <NativeSelect
                    onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value }))}
                    placeholder="Job Type"
                    radius="md"
                    rightSection={
                        <Image
                            style={{ position: 'absolute', right: '36px', top: '24px' }}
                            src="/Icons/down.svg"
                            alt="dropdown-icon"
                            width={14}
                            height={8}
                        />
                    }
                    rightSectionWidth={30}
                    styles={{
                        input: {
                            marginLeft: '27px',
                            marginRight: '72px',
                            width: '200px',
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#686868',
                            padding: '8px 14px', // slightly reduced padding
                            height: '44px',       // slightly increased height
                            lineHeight: '1.4',    // line height to give breathing room
                            display: 'flex',
                            alignItems: 'center',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            appearance: 'none',
                            outline: 'none',
                            border: 'none',
                            boxShadow: 'none',
                        },
                        rightSection: {
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    }}
                >
                    <option value="">Job Type</option>
                    <option value="INTERNSHIP">Internship</option>
                    <option value="FULLTIME">Full Time</option>
                    <option value="PARTTIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                </NativeSelect>
                <Box w={rem(2)} h={rem(48)} ml={rem(0)} bg="#EAEAEA" className={'hidden lg:block'} />
            </Box >

            {/* Salary Filtering */}
            <Box spacing="sm" align="center" ml={rem(27)} position="relative"
                className={'flex flex-col items-center justify-between gap-4'}
            >
                <Box className="flex w-full flex-row justify-between">
                    <Text
                        fw={600}
                    >
                        Salary Per Month
                    </Text>
                    <Text fw={600}>
                        ₹{filters.salaryMin / 1000}k - ₹{filters.salaryMax / 1000}k
                    </Text>
                </Box>
                <RangeSlider
                    className="w-full lg:w-[300px]"
                    color="rgba(0, 0, 0, 1)"
                    min={10000}
                    max={100000}
                    step={5000}
                    value={[filters.salaryMin, filters.salaryMax]}
                    onChange={(value) => setFilters((prev) => ({
                        ...prev,
                        salaryMin: value[0],
                        salaryMax: value[1],
                    }))}
                    size="sm"
                />
            </Box>
        </Box>
    );
}
