import React, { useState } from 'react';
import { Problem, TestCase } from '../../src/types';  // Assuming types are stored in a types.ts file

const CreateLocalProblem: React.FC = () => {
    // State for the problem
    const [problemName, setProblemName] = useState<string>('');
    const [memoryLimit, setMemoryLimit] = useState<number>(1024);  // Default memory limit
    const [timeLimit, setTimeLimit] = useState<number>(2);  // Default time limit in seconds
    const [testCases, setTestCases] = useState<TestCase[]>([]);  // Test case array

    // State for new test case
    const [newTestCaseInput, setNewTestCaseInput] = useState<string>('');
    const [newTestCaseOutput, setNewTestCaseOutput] = useState<string>('');

    // Function to add a new test case
    const addTestCase = () => {
        if (newTestCaseInput && newTestCaseOutput) {
            const newTestCase: TestCase = {
                input: newTestCaseInput,
                output: newTestCaseOutput
            };
            setTestCases([...testCases, newTestCase]);
            setNewTestCaseInput('');  // Clear input field
            setNewTestCaseOutput('');  // Clear output field
        }
    };

    // Function to create a local problem
    const createProblem = () => {
        const newProblem: Problem = {
            name: problemName,
            memoryLimit,
            timeLimit,
            testCases,
            srcPath: '',  // Set later in the extension
            local: true
        };

        console.log('Created problem:', newProblem);

        // You can now save this problem to a file or send it to the extension
        const vscode = window.acquireVsCodeApi();
        vscode.postMessage({
            command: 'saveProblem',
            problem: newProblem
        });
    };

    return (
        <div>
            <h2>Create Local Problem</h2>
            <div>
                <label>Problem Name:</label>
                <input
                    type="text"
                    value={problemName}
                    onChange={(e) => setProblemName(e.target.value)}
                    placeholder="Enter problem name"
                />
            </div>
            <div>
                <label>Memory Limit (in MB):</label>
                <input
                    type="number"
                    value={memoryLimit}
                    onChange={(e) => setMemoryLimit(Number(e.target.value))}
                    placeholder="Memory Limit"
                />
            </div>
            <div>
                <label>Time Limit (in seconds):</label>
                <input
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    placeholder="Time Limit"
                />
            </div>
            <hr />
            <h3>Test Cases</h3>
            {testCases.map((testCase, index) => (
                <div key={index}>
                    <p>Test Case {index + 1}:</p>
                    <p>Input: {testCase.input}</p>
                    <p>Output: {testCase.output}</p>
                </div>
            ))}
            <div>
                <label>Test Case Input:</label>
                <textarea
                    value={newTestCaseInput}
                    onChange={(e) => setNewTestCaseInput(e.target.value)}
                    placeholder="Enter test case input"
                />
            </div>
            <div>
                <label>Test Case Output:</label>
                <textarea
                    value={newTestCaseOutput}
                    onChange={(e) => setNewTestCaseOutput(e.target.value)}
                    placeholder="Enter test case output"
                />
            </div>
            <button onClick={addTestCase}>Add Test Case</button>
            <hr />
            <button onClick={createProblem}>Create Problem</button>
        </div>
    );
};

export default CreateLocalProblem;
