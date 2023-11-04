const useAudio = (src: string, audioRef: React.RefObject<HTMLAudioElement>) => {
    return <audio src={src} ref={audioRef} />;
};
