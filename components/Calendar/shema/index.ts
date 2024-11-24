type ViewType = 'day' | 'week' | 'month';
type WeeklyDateType = {
    date: Date;
    formattedDateString: string;
    formattedDate: string;
}

export type { ViewType, WeeklyDateType };