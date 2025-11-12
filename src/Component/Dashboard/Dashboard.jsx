import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import { AddUser, Notes, SaleIcon, Tag, Upload } from '../SvgIcon/SvgIcon';


const Dashboard = () => {
    const insightData = [
        { name: 'Jan', Disbursement: 250, Interest: 20, Members: 380 },
        { name: 'Feb', Disbursement: 250, Interest: 200, Members: 300 },
        { name: 'Mar', Disbursement: 30, Interest: 240, Members: 150 },
        { name: 'Apr', Disbursement: 260, Interest: 180, Members: 320 },
        { name: 'May', Disbursement: 220, Interest: 160, Members: 180 },
        { name: 'Jun', Disbursement: 150, Interest: 200, Members: 300 },
        { name: 'Jul', Disbursement: 320, Interest: 280, Members: 330 },
        { name: 'Aug', Disbursement: 100, Interest: 320, Members: 340 },
        { name: 'Sept', Disbursement: 340, Interest: 380, Members: 120 },
        { name: 'Oct', Disbursement: 300, Interest: 350, Members: 280 },
        { name: 'Nov', Disbursement: 15, Interest: 280, Members: 340 },
        { name: 'Dec', Disbursement: 100, Interest: 200, Members: 300 }
    ];

    const revenueData = [
        { day: 'Monday', Cash: 15000, Bank: 13000 },
        { day: 'Tuesday', Cash: 18000, Bank: 14000 },
        { day: 'Wednesday', Cash: 6000, Bank: 22000 },
        { day: 'Thursday', Cash: 17000, Bank: 5000 },
        { day: 'Friday', Cash: 13000, Bank: 14000 },
        { day: 'Saturday', Cash: 18000, Bank: 15000 },
        { day: 'Sunday', Cash: 21000, Bank: 12000 }
    ];

    const reminders = [
        { name: 'Anup Parekh', emi: 'Today', mobile: '9624917829', amount: '₹2L' },
        { name: 'Anup Parekh', emi: 'Overdue', mobile: '9624917829', emiType: '', amount: '₹2L' },
        { name: 'Anup Parekh', emi: 'Today', mobile: '9624917829', emiType: '', amount: '₹2L' }

    ];
    const member = [
        { name: 'Anup Parekh', member_id: 'KP25-0011', mobile: '9624917829', Address: 'C/70, Ashray Society..', amount: '₹2L' },
        { name: 'Anup Parekh', member_id: 'KP25-0011', mobile: '9624917829', Address: '', amount: '₹2L' },
        { name: 'Anup Parekh', member_id: 'KP25-0011', mobile: '9624917829', Address: '', amount: '₹2L' },
    ];
    const records = [
        { id: '01', label: 'Pending Number Of EMI today', value: '4', color: 'blue' },
        { id: '02', label: 'Pending Amount Of EMI today', value: '₹ 2,00,000', color: 'green' },
        { id: '03', label: 'Pending Number Of EMI Till today', value: '31', color: 'purple' },
        { id: '04', label: 'Pending Amount Of EMI Till today', value: '₹ 1,50,000', color: 'orange' },
    ];

    return (
        <div className="container">
            {/* 1 row of dashboard */}
            <div className="dashboard">
                <div className="overview">
                    <div className="header">
                        <div>
                            <h1 className="title">Overview</h1>
                            <p className="subtitle">Summary</p>
                        </div>
                        <button className="exportBtn">
                            <Upload /> Export
                        </button>
                    </div>
                    <div className="cardsGrid">
                        <div className="card cardPink">
                            <div className="cardIcon cardIconPink">
                                <SaleIcon />
                            </div>
                            <h2 className="cardValue">₹ 7,00,000</h2>
                            <p className="cardLabel">Total<br />Disbursement</p>
                        </div>

                        <div className="card cardOrange">
                            <div className="cardIcon cardIconOrange">
                                <Notes />
                            </div>
                            <h2 className="cardValue">₹ 4,00,000</h2>
                            <p className="cardLabel">Total<br />Outstanding</p>
                        </div>

                        <div className="card cardGreen">
                            <div className="cardIcon cardIconGreen">
                                <Tag />
                            </div>
                            <h2 className="cardValue">₹ 4,00,000</h2>
                            <p className="cardLabel">Total<br />Interest</p>
                        </div>

                        <div className="card cardPurple">
                            <div className="cardIcon cardIconPurple">
                                <AddUser />
                            </div>
                            <h2 className="cardValue">87</h2>
                            <p className="cardLabel">Total<br />Members</p>
                        </div>
                    </div>
                </div>
                <div className="chartCard">
                    <h3 className="chartTitle">Insights</h3>
                    <ResponsiveContainer width="100%" height={225}>
                        <LineChart data={insightData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Disbursement" stroke="#A700FF" strokeWidth={2} className='graph' />
                            <Line type="monotone" dataKey="Interest" stroke="#EF4444" strokeWidth={2} className='graph' />
                            <Line type="monotone" dataKey="Members" stroke="#3CD856" strokeWidth={2} className='graph' />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {/* 2 row of dashboard */}
            <div className="chartsGrid">
                <div className="chartCards">
                    <h3 className="chartTitle">Total Revenue</h3>
                    <ResponsiveContainer width="100%" height={235}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Cash" fill="#0095FF" />
                            <Bar dataKey="Bank" fill="#00E096" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="table">
                    <h3 className="tableTitle">Today's Reminder</h3>
                    <table className="tableContent">
                        <thead>
                            <tr>
                                <th className="th">Names</th>
                                <th className="th">EMI Date</th>
                                <th className="th">Mobile</th>
                                <th className="th">EMI</th>
                                <th className="th">Loan Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reminders.map((reminder, idx) => (
                                <tr key={idx}>
                                    <td className="td-dashboard">{reminder.name}</td>
                                    <td className={`td-dashboard ${reminder.emi === 'Overdue' ? 'overdue' : ''}`}>
                                        {reminder.emi}
                                    </td>
                                    <td className="td-dashboard">{reminder.mobile}</td>
                                    <td className="td-dashboard">{reminder.emiType}</td>
                                    <td className="td-dashboard">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{reminder.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* 3 row of dashboard */}
            <div className="chartsGrid">
                <div className="chartCards">
                    <h3 className="chartTitle">Pending Records</h3>
                    <div className="tableContent">
                        <div className="table-wrapper">
                            {records.map((record) => (
                                <div key={record.id} className="table-row">
                                    <div className="row-left">
                                        <span className="row-id">{record.id}</span>
                                        <span className="row-label">{record.label}</span>
                                    </div>

                                    <div className={`row-value ${record.color}`}>
                                        {record.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="table">
                    <h3 className="tableTitle">Recent Members</h3>
                    <table className="tableContent">
                        <thead>
                            <tr>
                                <th className="th">Names</th>
                                <th className="th">Member ID</th>
                                <th className="th">Mobile</th>
                                <th className="th">Address</th>
                                <th className="th">Loan Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {member.map((reminder, idx) => (
                                <tr key={idx}>
                                    <td className="td-dashboard">{reminder.name}</td>
                                    <td className={`td-dashboard`}>
                                        {reminder.member_id}
                                    </td>
                                    <td className="td-dashboard">{reminder.mobile}</td>
                                    <td className="td-dashboard">{reminder.Address}</td>
                                    <td className="td-dashboard">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{reminder.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;