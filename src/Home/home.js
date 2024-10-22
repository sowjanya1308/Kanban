import React, { useState, useEffect } from 'react';
import './home.css'; // Add additional styles
import Card from '../components/card';

// Sample tickets data
const tickets = [
  { id: 1, title: 'Fix login bug', status: 'To Do', priority: 3, user: 'Alice' }, // High priority
  { id: 2, title: 'Add new feature', status: 'In Progress', priority: 2, user: 'Bob' }, // Medium priority
  { id: 3, title: 'Test deployment', status: 'Done', priority: 1, user: 'Charlie' }, // Low priority
  { id: 4, title: 'Urgent server issue', status: 'To Do', priority: 4, user: 'Alice' }, // Urgent priority
  { id: 5, title: 'User feedback analysis', status: 'In Progress', priority: 0, user: 'David' }, // No priority
  // Add more ticket data here
];

function Home() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [groupBy, setGroupBy] = useState('Status');
  const [sortBy, setSortBy] = useState('Priority');

  // Load saved view state from localStorage on component mount
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('kanbanViewState'));
    if (savedState) {
      setStatusFilter(savedState.statusFilter);
      setPriorityFilter(savedState.priorityFilter);
      setGroupBy(savedState.groupBy);
      setSortBy(savedState.sortBy);
    }
  }, []);

  // Save current view state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('kanbanViewState', JSON.stringify({ statusFilter, priorityFilter, groupBy, sortBy }));
  }, [statusFilter, priorityFilter, groupBy, sortBy]);

  // Function to group tickets
  const groupTickets = (tickets) => {
    let groupedTickets = {};
    tickets.forEach(ticket => {
      const key = groupBy === 'Status' ? ticket.status
        : groupBy === 'User' ? ticket.user
        : ticket.priority; // Default to Priority grouping

      if (!groupedTickets[key]) groupedTickets[key] = [];
      groupedTickets[key].push(ticket);
    });
    return groupedTickets;
  };

  // Function to sort tickets
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortBy === 'Priority') {
        return b.priority - a.priority; // Sort by priority descending
      } else if (sortBy === 'Title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  // Filter tickets based on selected status and priority
  const filteredTickets = tickets.filter(ticket => {
    return (statusFilter === 'All' || ticket.status === statusFilter) &&
           (priorityFilter === 'All' || ticket.priority === parseInt(priorityFilter));
  });

  // Group and sort tickets
  const groupedTickets = groupTickets(sortTickets(filteredTickets));

  return (
    <div className="home-page">
      {/* Top bar with dropdowns */}
      <div className="top-bar">
        <div className="user-info">
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <label>Priority:</label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="4">Urgent</option>
            <option value="3">High</option>
            <option value="2">Medium</option>
            <option value="1">Low</option>
            <option value="0">No priority</option>
          </select>

          <label>Group By:</label>
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <option value="Status">Status</option>
            <option value="User">User</option>
            <option value="Priority">Priority</option>
          </select>

          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="Priority">Priority</option>
            <option value="Title">Title</option>
          </select>
        </div>
      </div>

      {/* Kanban board */}
      <div className="kanban-board">
        {Object.keys(groupedTickets).map(group => (
          <div className={`kanban-column ${group.toLowerCase().replace(/\s/g, '-')}`} key={group}>
            <h4>{group}</h4>
            {groupedTickets[group].map(ticket => (
              <Card key={ticket.id} title={ticket.title} priority={ticket.priority} status={ticket.status} user={ticket.user} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
