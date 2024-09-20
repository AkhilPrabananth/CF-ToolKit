import React, { useState } from 'react';
import CreateProblemFromURL from '../CreateProblemFromURL';
import CreateLocalProblem from '../CreateLocalProblem';
import { Problem, TestCase } from '../../../src/types';
import * as vscode from 'vscode';

const ProblemView: React.FC = () => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [newTestCase, setNewTestCase] = useState<TestCase>({ input: '', output: '' });

  const addTestCase = () => {
    if (problem) {
      const updatedTestCases = [
        ...problem.testCases,
        { input: newTestCase.input, output: newTestCase.output }
      ];
      setProblem({ ...problem, testCases: updatedTestCases });
      setNewTestCase({ input: '', output: '' });
      saveProblem();
    }
  };

  const saveProblem = () => {
    if (problem) {
      vscode.postMessage({ type: 'saveProblem', data: problem });
    }
  };

  return (
    <div>
      <h1>Create Problem</h1>
      {!problem ? (
        <div>
          {/* Problem creation components go here */}
        </div>
      ) : (
        <div>
          <h2>{problem.name}</h2>
          <p><strong>Memory Limit:</strong> {problem.memoryLimit} MB</p>
          <p><strong>Time Limit:</strong> {problem.timeLimit} ms</p>
          {problem.url && <p><strong>URL:</strong> <a href={problem.url}>{problem.url}</a></p>}
          <h3>Test Cases: </h3>
          <ul>
            {problem.testCases.map(( testCase, index) => (
              <li key={index}>
                <p><strong>Input:</strong> {testCase.input}</p>
                <p><strong>Output:</strong> {testCase.output}</p>
              </li>
            ))}
          </ul>
          <h3>Add Test Case</h3>
          <input
            type="text"
            value={newTestCase.input}
            onChange={(e) => setNewTestCase({ ...newTestCase, input: e.target.value })}
            placeholder="Test Case Input"
          />
          <input
            type="text"
            value={newTestCase.output}
            onChange={(e) => setNewTestCase({ ...newTestCase, output: e.target.value })}
            placeholder="Test Case Output"
          />
          <button onClick={addTestCase}>Add Test Case</button>
        </div>
      )}
    </div>
  );
};

export default ProblemView;
