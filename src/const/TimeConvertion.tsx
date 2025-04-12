import dayjs from "dayjs";

export const timeAgoShort = (date: string) => {
    const diffInHours = dayjs().diff(dayjs(date), 'hour');
    if (diffInHours < 24) return `${diffInHours}h Ago`;
    const diffInDays = dayjs().diff(dayjs(date), 'day');
    return `${diffInDays}d ago`;
};

// Usage:
// {timeAgoShort(job.createdAt)}
