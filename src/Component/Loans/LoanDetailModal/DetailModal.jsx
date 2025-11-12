import React, { useState, useEffect } from 'react';
import styles from './DetailModal.module.css';
import { X } from 'lucide-react';
import KPFiananceLoader from '../../pages/loader/KPFiananceLoader/KPFiananceLoader';
// DetailModal Component
function DetailModal({ loanData, onClose }) {
    const [activeTab, setActiveTab] = useState('loanDetails');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const defaultLoanData = {
        customerId: '#KP1102-Anup Parekh',
        phone: '9624917829',
        email: 'parekh.anup8@gmail.com',
        address: 'C2/1103, Green Glades, Godrej Garden City, Ahmedabad - 382470',
        kycStatus: 'KYC: Aadhar Uploaded, PAN Uploaded',
        activeLoans: '1 Active Loan',
        loanStatus: 'Active',
        loanId: '#LN1102',
        loanAmount: '₹ 3,00,000',
        disbursementDate: '10/10/2025 | 11:00AM',
        paymentMode: 'Bank Transfer',
        tenure: '2 Months',
        interestType: 'Per Month',
        interestRate: '5%',
        totalInterest: '₹ 15,000',
        emiAmount: '₹ 7,500',
        totalPayable: '₹ 3,15,000',
        emiSchedule: [
            {
                emiDate: '03 Nov 2025',
                emi: '₹ 2,685',
                principal: '₹ 2,000',
                interest: '₹ 685',
                status: 'PAID',
                paidOn: '03 Nov 2025'
            },
            {
                emiDate: '03 Dec 2025',
                emi: '₹ 2,685',
                principal: '₹ 2,000',
                interest: '₹ 685',
                status: 'Overdue',
                paidOn: '03 Nov 2025'
            }
        ],
        totalEMIs: 2,
        paidEMIs: 1,
        remainingEMIAmount: '₹ 7,500',
        remainingPrincipal: '₹ 2,80,000',
        outstandingAmount: '₹ 2,80,000'
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Axios API call
            // import axios from 'axios';
            // const response = await axios.get('/api/loan-details');
            // setData(response.data);

            setTimeout(() => {
                setData(loanData || defaultLoanData);
                setLoading(false);
            }, 300);
        } catch (error) {
            console.error('API Error:', error);
            setData(defaultLoanData);
            setLoading(false);
        }
    };

    const renderLoanDetails = () => (
        <div className={styles.detailsContent}>
            <div className={styles.detailRow}>
                <span className={styles.label}>Loan ID:</span>
                <span className={styles.value}> &nbsp; {data.loanId}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.label}>Loan Amount:</span>
                <span className={styles.value}> &nbsp;{data.loanAmount}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.label}>Disbursement Date:</span>
                <span className={styles.value}> &nbsp;{data.disbursementDate}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.label}>Payment Mode:</span>
                <span className={styles.value}> &nbsp;{data.paymentMode}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.label}>Tenure:</span>
                <span className={styles.value}> &nbsp;{data.tenure}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.label}>Interest Type:</span>
                <span className={styles.value}> &nbsp;{data.interestType}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.label}>Interest Rate:</span>
                <span className={styles.value}> &nbsp;{data.interestRate}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.label}>Total Interest:</span>
                <span className={styles.value}> &nbsp;{data.totalInterest}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.label}>EMI Amount:</span>
                <span className={styles.value}> &nbsp;{data.emiAmount}</span>
            </div>
            <div className={`${styles.detailRow} ${styles.lastRow}`}>
                <span className={styles.label}>Total Payable (Principal + Interest):</span>
                <span className={styles.value}> &nbsp;{data.totalPayable}</span>
            </div>
        </div>
    );

    const renderEMISchedule = () => (
        <div className={styles.emiContent}>
            <div className={styles.emiSummary}>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Total EMI's:</span>
                    <span className={styles.summaryValue}>{data.totalEMIs}</span>
                </div>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Total EMI's Paid:</span>
                    <span className={styles.summaryValue}>{data.paidEMIs}</span>
                </div>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Remaining EMI Amount:</span>
                    <span className={styles.summaryValue}>{data.remainingEMIAmount}</span>
                </div>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Remaining Principal Amount:</span>
                    <span className={styles.summaryValue}>{data.remainingPrincipal}</span>
                </div>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Outstanding Amount:</span>
                    <span className={styles.summaryValue}>{data.outstandingAmount}</span>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.emiTable}>
                    <thead>
                        <tr>
                            <th>EMI Date</th>
                            <th>EMI</th>
                            <th>Principal</th>
                            <th>Interest</th>
                            <th>Status</th>
                            <th>Paid On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.emiSchedule.map((emi, index) => (
                            <tr key={index}>
                                <td>{emi.emiDate}</td>
                                <td className={styles.bold}>{emi.emi}</td>
                                <td>{emi.principal}</td>
                                <td>{emi.interest}</td>
                                <td>
                                    <span className={`${styles.status} ${styles[emi.status.toLowerCase()]}`}>
                                        {emi.status}
                                    </span>
                                </td>
                                <td className={styles.muted}>{emi.paidOn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderBasicDetails = () => (
        <div className={styles.detailsContent}>
            <div className={styles.detailRow}>
                <span className={styles.label}>Customer ID:</span>
                <span className={styles.value}>{data.customerId}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.label}>Phone:</span>
                <span className={styles.value}>{data.phone}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{data.email}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.label}>Address:</span>
                <span className={styles.value}>{data.address}</span>
            </div>
            <div className={`${styles.detailRow} ${styles.lastRow}`}>
                <span className={styles.label}>KYC Status:</span>
                <span className={styles.value}>{data.kycStatus}</span>
            </div>
        </div>
    );

    if (!data) {
        return (
            <KPFiananceLoader />
        );
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.headerLeft}>
                        <h2>{data.customerId}</h2>
                        <p>{data.phone}</p>
                        <p>{data.email}</p>
                        <p>{data.address}</p>
                    </div>
                    <div className={styles.headerRight}>
                        <button className={styles.closeButton} onClick={onClose}>
                            <X size={100} />
                        </button>
                        <div className={styles.kycSection}>
                            <div className={styles.kycStatus}> {data.kycStatus}</div>
                            <div className={styles.activeLoans}>{data.activeLoans}</div>
                        </div>
                    </div>

                </div>
                <div className={styles.modalbody}>
                    <span className={styles.statusBadge}>{data.loanStatus}</span>
                    <div className={styles.statusSection}>

                        <div className={styles.quickInfo}>
                            <span>Loan ID: <strong>{data.loanId}</strong></span>
                            <span>Loan Amount: <strong>{data.loanAmount}</strong></span>
                            <span>Disbursement Date: <strong>{data.disbursementDate.split('|')[0].trim()}</strong></span>
                            <span>Tenure: <strong>{data.tenure}</strong></span>
                            <span>Interest: <strong>{data.interestRate}/{data.interestType}</strong></span>
                            <span>EMI's: <strong>{data.paidEMIs}/{data.totalEMIs}</strong></span>
                            <span>Up-to-Date</span>
                        </div>

                        <div className={styles.tabContainer}>
                            <button
                                className={`${styles.tab} ${activeTab === 'loanDetails' ? styles.active : ''}`}
                                onClick={() => setActiveTab('loanDetails')}
                            >
                                Loan Details
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'emiSchedule' ? styles.active : ''}`}
                                onClick={() => setActiveTab('emiSchedule')}
                            >
                                EMI Schedule
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'basicDetails' ? styles.active : ''}`}
                                onClick={() => setActiveTab('basicDetails')}
                            >
                                Basic Details
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            {activeTab === 'loanDetails' && renderLoanDetails()}
                            {activeTab === 'emiSchedule' && renderEMISchedule()}
                            {activeTab === 'basicDetails' && renderBasicDetails()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailModal;

