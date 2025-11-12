import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Loans.module.css';
import { FilterIcon } from '../SvgIcon/SvgIcon';
import { useNavigate } from 'react-router-dom';
import { BsInfo } from "react-icons/bs";
import DetailModal from './LoanDetailModal/DetailModal';
import KPFiananceLoader from '../pages/loader/KPFiananceLoader/KPFiananceLoader';

const Loans = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showAllDropdown, setShowAllDropdown] = useState(false);
    const [showActionDropdown, setShowActionDropdown] = useState(false);
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const navigate = useNavigate();

    // Dummy data
    const dummyData = [
        {
            id: 'KP1102',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1103',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1104',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1105',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Overdue'
        },
        {
            id: 'KP1106',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1107',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1108',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1109',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Overdue'
        },
        {
            id: 'KP1110',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1111',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1112',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1113',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Overdue'
        },
        {
            id: 'KP1114',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1115',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1116',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1117',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Overdue'
        },
        {
            id: 'KP1118',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            Outstanding: '₹ 2,80,000',
            EMIs: '02/24',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1119',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1120',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Up-To-Date'
        },
        {
            id: 'KP1121',
            name: 'Anup Parekh',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            disbursementOn: '15/10/2025',
            nextEmiDate: '15th',
            EMIs: '02/24',
            Outstanding: '₹ 2,80,000',
            status: 'Overdue'
        }
    ];

    useEffect(() => {
        // fetchCustomers();
        setCustomers(dummyData);
        setLoading(false);
    }, []);

    const fetchCustomers = async () => {
        // try {
        //     setLoading(true);
        //     const response = await axios.get('YOUR_API_ENDPOINT_HERE');
        //     setCustomers(response.data);
        //     setLoading(false);
        // } catch (error) {
        //     console.log('API call failed, using dummy data');
        //     setCustomers(dummyData);
        //     setLoading(false);
        // }
        setCustomers(dummyData);
    };

    const handleAddCustomer = () => {
        setShowModal(true);
        // navigate('/ApplyLoan');
    }

    // handleDetail function 
    const handleDetail = (userId) => {
        setSelectedUserId(userId);
        setShowDetailModal(true);
    };

    const handleSelectAll = () => {
        if (selectedAll) {
            setSelectedRows([]);
        } else {
            setSelectedRows(customers.map((_, index) => index));
        }
        setSelectedAll(!selectedAll);
    };

    const handleRowSelect = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter(i => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    useEffect(() => {
        if (selectedRows.length === customers.length && customers.length > 0) {
            setSelectedAll(true);
        } else {
            setSelectedAll(false);
        }
    }, [selectedRows, customers]);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Up-To-Date':
                return styles.statusActive;
            case 'Overdue':
                return styles.statusClosed;
            default:
                return '';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button
                    className={styles.addButton}
                    onClick={handleAddCustomer}
                >
                    + Apply For A New Loan
                </button>
                <div className={styles.controls}>
                    <div className={styles.iconButton}>
                        <FilterIcon />
                    </div>
                    <div className={styles.dropdown}>
                        <button
                            className={styles.dropdownButton}
                            onClick={() => setShowAllDropdown(!showAllDropdown)}
                        >
                            All
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        {showAllDropdown && (
                            <div className={styles.dropdownMenu}>
                                <div className={styles.dropdownItem}>All</div>
                                <div className={styles.dropdownItem}>Up-To-Date</div>
                                <div className={styles.dropdownItem}>Overdue</div>
                            </div>
                        )}
                    </div>
                    <div className={styles.dropdown}>
                        <button
                            className={styles.dropdownButton}
                            onClick={() => setShowActionDropdown(!showActionDropdown)}
                        >
                            Action
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className=''>
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        {showActionDropdown && (
                            <div className={styles.dropdownMenu}>
                                <div className={styles.dropdownItem}>Edit</div>
                                <div className={styles.dropdownItem}>Delete</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectedAll}
                                    onChange={handleSelectAll}
                                    className={styles.checkbox}
                                />
                            </th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Loan Amount</th>
                            <th>Interest (%)</th>
                            <th>Disbursement On</th>
                            <th>Next EMI Date</th>
                            <th>EMI's</th>
                            <th>Outstanding</th>
                            <th>Dues</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <KPFiananceLoader />
                            </tr>
                        ) : (
                            customers.map((customer, index) => (
                                <tr key={index} className={selectedRows.includes(index) ? styles.selectedRow : ''}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(index)}
                                            onChange={() => handleRowSelect(index)}
                                            className={styles.checkbox}
                                        />
                                    </td>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.loanAmount}</td>
                                    <td>{customer.interest}</td>
                                    <td>{customer.disbursementOn}</td>
                                    <td>{customer.nextEmiDate}</td>
                                    <td>{customer.EMIs}</td>
                                    <td>{customer.Outstanding}</td>
                                    <td>
                                        <span className={`${styles.status} ${getStatusClass(customer.status)}`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td>
                                        <BsInfo
                                            onClick={() => handleDetail(customer.id)}
                                            style={{ cursor: 'pointer', fontSize: '20px' }}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Add New Customer</h2>
                            <button
                                className={styles.closeButton}
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <p>Add customer form content here...</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Detail Modal  */}
            {showDetailModal && (
                <DetailModal
                    userId={selectedUserId}
                    onClose={() => setShowDetailModal(false)}
                />
            )}
        </div>
    );
};

export default Loans;