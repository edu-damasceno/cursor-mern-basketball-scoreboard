export const formatTime = (timeInSeconds) => {
    if (timeInSeconds >= 60) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        const seconds = Math.floor(timeInSeconds);
        const milliseconds = Math.floor((timeInSeconds - seconds) * 100);
        return `${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    }
};