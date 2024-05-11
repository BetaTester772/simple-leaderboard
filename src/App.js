import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';

const LeaderboardContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const LeaderboardTitle = styled.h1`
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 36px;
  font-weight: bold;
`;

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  padding: 12px;
  border-bottom: 2px solid #ccc;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ccc;
  font-size: 18px;
  ${props =>
    props.isTopThree &&
    css`
      font-weight: bold;
      color: ${props.rank === 1 ? '#ff9800' : props.rank === 2 ? '#4caf50' : '#2196f3'};
      font-size: 24px;
    `}
`;

function App() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.34.181.14/api/leaderboard');
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LeaderboardContainer>
      <LeaderboardTitle>Leaderboard</LeaderboardTitle>
      <LeaderboardTable>
        <thead>
          <TableRow>
            <TableHeader>Rank</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Money</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <TableRow key={index}>
              <TableCell rank={index + 1} isTopThree={index < 3}>{index + 1}</TableCell>
              <TableCell rank={index + 1} isTopThree={index < 3}>{entry.id}</TableCell>
              <TableCell rank={index + 1} isTopThree={index < 3}>{entry.money}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </LeaderboardTable>
    </LeaderboardContainer>
  );
};

export default App;
