export type Contest = {
    id: number;
    name: string;
    phase: string;
    startTimeSeconds: number;
    durationSeconds: number;
};

export type TestCase = {
    input: string;
    output: string;
};

export type Problem = {
    name: string;
    url?: string;
    memoryLimit: number;
    timeLimit: number;
    testCases: TestCase[];
    srcPath: string;
    local?: boolean;
};

export type Case = {
    id: number;
    result: Boolean | null;
    testcase: TestCase;
};

export type Run = {
    stdout: string;
    stderr: string;
    code: number | null;
    signal: string | null;
    time: number;
    timeOut: boolean;
};