export interface game {
    id: number;
    correct: number;
    incorrect: number;
    accuracy: number;
    attempted: number;
    time: number;
    rate: number;
    problemdetails: problemdetail[];
    date: string;
}

export interface problemdetail {
    num1: number;
    operation: string;
    num2: number;
    timetaken: number;
    correct: boolean;
}