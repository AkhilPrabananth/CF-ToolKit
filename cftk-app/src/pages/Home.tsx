import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Contest } from '../../../src/types';

function Home() {
  const [ongoingContests, setOngoingContests] = useState<Contest[]>([]);
  const [upcomingContests, setUpcomingContests] = useState<Contest[]>([]);
  const [pastContests, setPastContests] = useState<Contest[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchContestList = async () => {
    try {
      const response = await axios.get('https://codeforces.com/api/contest.list');
      const contests: Contest[] = response.data.result;

      // Separate contests based on phase
      const upcoming: Contest[] = contests.filter(contest => contest.phase === 'BEFORE');
      const ongoing: Contest[] = contests.filter(contest => contest.phase === 'CODING');
      const past: Contest[] = contests.filter(contest => contest.phase === 'FINISHED');

      // Update state variables
      setUpcomingContests(upcoming);
      setOngoingContests(ongoing);
      setPastContests(past);
    } catch (error) {
      setError('Failed to fetch contest data');
    }
  };

  // Fetch contests when component mounts
  useEffect(() => {
    fetchContestList();
  }, []);

  const renderOngoing = () => {
    if (ongoingContests.length === 0) {
      return (
        <div>
          <h4>No Ongoing Contests</h4>
        </div>
      );
    }
    return (
      <div>
        <h4>Ongoing Contests: </h4>
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Start</th>
                <th>Duration</th>
                <th>Link</th> {/* New column for the button */}
              </tr>
            </thead>
            <tbody>
              {ongoingContests.map((contest) => (
                <tr key={contest.id}>
                  <td>{contest.id}</td>
                  <td>{contest.name}</td>
                  <td>{new Date(contest.startTimeSeconds * 1000).toLocaleString()}</td>
                  <td>{Math.floor(contest.durationSeconds / 3600)} hours</td>
                  <td>
                    <a href={`https://codeforces.com/contest/${contest.id}`} target="_blank" rel="noopener noreferrer">
                      <button>View Contest</button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderUpcoming = () => {
    if (upcomingContests.length === 0) {
      return (
        <div>
          <h4>No Upcoming Contests</h4>
        </div>
      );
    }
    return (
      <div>
        <h4>Upcoming Contests: </h4>
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Start</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {upcomingContests.map((contest) => (
                <tr key={contest.id}>
                  <td>{contest.id}</td>
                  <td>{contest.name}</td>
                  <td>{new Date(contest.startTimeSeconds * 1000).toLocaleString()}</td>
                  <td>{Math.floor(contest.durationSeconds / 3600)} hours</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPast = () => {
    if (pastContests.length === 0) {
      return (
        <div>
          <h4>No Past Contests</h4>
        </div>
      );
    }
    
    // Truncate past contests to the most recent 10 entries
    const truncatedPastContests = pastContests.slice(0, 10);

    return (
      <div>
        <h4>Past Contests: </h4>
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Start</th>
                <th>Duration</th>
                <th>Link</th> {/* New column for the button */}
              </tr>
            </thead>
            <tbody>
              {truncatedPastContests.map((contest) => (
                <tr key={contest.id}>
                  <td>{contest.id}</td>
                  <td>{contest.name}</td>
                  <td>{new Date(contest.startTimeSeconds * 1000).toLocaleString()}</td>
                  <td>{Math.floor(contest.durationSeconds / 3600)} hours</td>
                  <td>
                    <a href={`https://codeforces.com/contest/${contest.id}`} target="_blank" rel="noopener noreferrer">
                      <button>View Contest</button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderOngoing()}
      {renderUpcoming()}
      {renderPast()}
    </div>
  );
}

export default Home;
