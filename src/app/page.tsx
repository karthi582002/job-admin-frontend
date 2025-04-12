"use client"
import React, {useState,useEffect,useMemo} from 'react'
import Header from '../components/Header'
import {Box,Text} from "@mantine/core";
import FilterSection from "@/components/FilterSection";
import JobCards from "@/components/JobCards";
import JobForm from "@/components/JobForm";
import axios from 'axios';
interface FilterType {
    jobTitle: string;
    jobType: string;
    location: string;
    companyName: string;
    salaryMin: number;
    salaryMax: number;
}
interface Job {
    jobTitle: string;
    jobType: string;
    location: string;
    companyName: string;
    salaryStart: number;
    salaryEnd: number;
    createdAt: string | Date; // depending on your data
}

const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filters, setFilters] = useState<FilterType>({
        companyName: "",
        jobTitle :'',
        jobType: '',
        location: '',
        // companyName: '',
        salaryMin: 0,
        salaryMax: 1000000
    });
    console.log(filters);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get('https://web-production-3a402.up.railway.app/jobs', {
                    headers: {
                        'x-api-key': 'K.582002', // if using env
                    }
                });
                setJobs(data);
                console.log(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);
    // const job = { "id": 1,
    //     "jobTitle": "Frontend Developer",
    //     "companyName": "Amazon",
    //     "location": "TamilNadu",
    //     "jobType": "FULLTIME",
    //     "salaryStart": 50000,
    //     "salaryEnd": 70000,
    //     "applicationDeadline": "2025-05-01T00:00:00.000Z",
    //     "jobDescription": " A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
    //     "createdAt": "2025-04-11T07:00:00.000Z"}
    console.log(isModalOpen)
    // Function to open the modal
    const handleOpenModal = () => setIsModalOpen(true);

    // Function to close the modal
    const handleCloseModal = () => setIsModalOpen(false);

    const filteredJobs = useMemo(() => {
        const filtered = jobs.filter(job => {
            const matchesJobTitle = filters.jobTitle
                ? job.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase())
                : true;
            const matchesJobType = filters.jobType ? job.jobType === filters.jobType : true;
            const matchesLocation = filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
            const matchesCompany = filters.companyName ? job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()) : true;

            const matchesSalary = job.salaryEnd >= filters.salaryMin && job.salaryStart <= filters.salaryMax;

            return matchesJobTitle && matchesJobType && matchesLocation && matchesCompany && matchesSalary;
        });

        // Default sort by createdAt (newest first)
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [jobs, filters]);





    return (
        <>
            <Box
                style={{ boxShadow: '0px 0px 14px 0px #C6BFBF40' }}
                className="z-20 bg-white w-full flex flex-col items-center gap-[10px] relative"
            >
                <Header
                    onOpenModal={handleOpenModal}
                />
                {/*<FilterSection />*/}
                <FilterSection filters={filters} setFilters={setFilters} />

            </Box>

            {/*<Box*/}
            {/*    className="px-[64px] py-[46px] mt-[-10px] h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px] z-0 space-y-2 bg-[#FFFFFF]"*/}
            {/*>*/}
            <Box
                className="px-[64px] py-[46px] mt-[-10px] h-auto flex flex-row justify-between  gap-[16px] z-0 flex-wrap space-y-6 bg-[#FBFBFF]"
            >
                {
                    filteredJobs.length !== 0 ?
                    filteredJobs.map((item, index) => (
                        <JobCards key={index} job={item} index={index} />
                    )):
                        loading ? <Text> Loading ... </Text>:<Text> No Jobs Available </Text>
                }
            </Box>
            <Box>
                <JobForm isOpen={isModalOpen} onClose={handleCloseModal}/>
            </Box>

        </>
    )
}
export default Page
