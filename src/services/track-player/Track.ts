export interface Track extends MediaMetadataInit {
    id: string;
    youtube_id: string;
    duration: number;
    duration_formatted: string;
    source_url: string;
    directory_url?: string;
}
