import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Contest} from '../../../src/types';

function Home() {
    const [ongoingContests, setOngoingContests] = useState<Contest[] | null>(null);
    const [upcomingContests, setUpcomingContests] = useState<Contest[] | null>(null);
    const [pastContests, setPastContests] = useState<Contest[] | null>(null);
    const renderOngoing = () => {
        if(ongoingContests?.length === 0){
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
                            <th> Id </th> <th> Name </th> <th> Start </th> <th> Duration </th>
                        </thead>
                        <tbody>
                            {ongoingContests!.map((contest) => (
                                <tr key={contest.id}>
                                    <td>{contest.id}</td>
                                    <td>{contest.name}</td>
                                    <td>{contest.start}</td>
                                    <td>{contest.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
    const renderUpcoming = () => {
        if(ongoingContests?.length === 0){
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
                            <th> Id </th> <th> Name </th> <th> Start </th> <th> Duration </th>
                        </thead>
                        <tbody>
                            {upcomingContests!.map((contest) => (
                                <tr key={contest.id}>
                                    <td>{contest.id}</td>
                                    <td>{contest.name}</td>
                                    <td>{contest.start}</td>
                                    <td>{contest.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
    const renderPast = () => {
        if(ongoingContests?.length === 0){
            return (
                <div>
                    <h4>No Past Contests</h4>
                </div>
            );
        }
        return (
            <div>
                <h4>Past Contests: </h4>
                <div>
                    <table>
                        <thead>
                            <th> Id </th> <th> Name </th> <th> Start </th> <th> Duration </th>
                        </thead>
                        <tbody>
                            {pastContests!.map((contest) => (
                                <tr key={contest.id}>
                                    <td>{contest.id}</td>
                                    <td>{contest.name}</td>
                                    <td>{contest.start}</td>
                                    <td>{contest.duration}</td>
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
            {renderOngoing()};
            {renderUpcoming()};
            {renderPast()};
        </div>
    );
}