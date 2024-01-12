export class TimeTracker {
    private startTime: Date | null = null;

    startTimer() {
        this.startTime = new Date();
    }

    endTimer() {
        if (this.startTime !== null) {
            const endTime = new Date();
            const timeDifferenceInSeconds = (endTime.getTime() - this.startTime.getTime()) / 1000;
            this.startTime = null; // Reset start time for future measurements
            return timeDifferenceInSeconds;
        } else {
            console.error('startTimer must be called before endTimer.');
            return 0;
        }
    }
}
