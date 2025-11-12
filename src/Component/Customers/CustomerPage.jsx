import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import styles from './CustomerPage.module.css';
import { FilterIcon } from '../SvgIcon/SvgIcon';
import { useNavigate } from 'react-router-dom';
import KPFiananceLoader from '../pages/loader/KPFiananceLoader/KPFiananceLoader';

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showAllDropdown, setShowAllDropdown] = useState(false);
    const [showActionDropdown, setShowActionDropdown] = useState(false);
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_API_URL;

    // Dummy data
    const dummyData = [
        {
            _id: 'dummy1',
            displayId: 'KP1102',
            name: 'Anup Parekh',
            mobile: '9624917829',
            loanAmount: '₹ 3,00,000',
            interest: '5%/Month',
            tenure: '30 Days',
            kyc: 'KYC',
            status: 'ACTIVE'
        },
        {
            _id: 'dummy2',
            displayId: 'KP1103',
            name: 'Ajay Panchal',
            mobile: '9876543210',
            loanAmount: '₹ 2,50,000',
            interest: '12%/Fixed',
            tenure: '24 Months',
            kyc: 'KYC',
            status: 'CLOSED'
        },
        {
            _id: 'dummy3',
            displayId: 'KP1104',
            name: 'Rahul Sharma',
            mobile: '9824917829',
            loanAmount: '₹ 5,00,000',
            interest: '8%/Month',
            tenure: '60 Days',
            kyc: 'KYC',
            status: 'DRAFT'
        },
        {
            _id: 'dummy4',
            displayId: 'KP1105',
            name: 'Priya Patel',
            mobile: '9724917829',
            loanAmount: '₹ 1,50,000',
            interest: '6%/Month',
            tenure: '45 Days',
            kyc: 'KYC',
            status: 'ACTIVE'
        }
    ];

    useEffect(() => {
        fetchCustomers();
    }, []);

    const formatCustomerData = (apiData) => {
        return apiData.map(user => ({
            _id: user._id || 'N/A',
            displayId: user.KPID || 'N/A',
            name: user.name || 'N/A',
            mobile: user.contact || 'N/A',
            loanAmount: user.requestedAmount ? `₹ ${parseInt(user.requestedAmount).toLocaleString('en-IN')}` : '₹ 0',
            interest: user.interestRate || 'N/A',
            tenure: user.tenure || 'N/A',
            kyc: user.kyc || 'KYC',
            status: user.status || 'ACTIVE'
        }));
    };

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/user/list`, {
                params: {
                    page: 1,
                    limit: 10
                }
            });
            console.log('response: ', response.data.data);

            if (response.data.success && response.data.data.users) {
                const formattedData = formatCustomerData(response.data.data.users);
                setCustomers(formattedData);
                toast.success(response.data.message || 'Users fetched successfully!');
            } else {
                setCustomers(dummyData);
                toast.info('Using default data');
            }
            setLoading(false);
        } catch (error) {
            console.error('API call failed:', error);
            toast.error('Failed to fetch users. Using default data.');
            setCustomers(dummyData);
            setLoading(false);
        }
    };

    const handleAddCustomer = () => {
        navigate('/AddCustomer');
    }

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

    // Get selected customer IDs (_id not KPID)
    const getSelectedIds = () => {
        return selectedRows.map(index => customers[index]._id);
    };

    // Handle Delete Action
    const handleDelete = async () => {
        if (selectedRows.length === 0) {
            toast.error('Please select at least one customer to delete');
            setShowActionDropdown(false);
            return;
        }

        const selectedIds = getSelectedIds();
        console.log('Selected _id for delete: ', selectedIds);

        try {
            const response = await axios.delete(`${baseUrl}/user/delete`, {
                data: { ids: selectedIds }
            });

            console.log('Delete response: ', response);
            if (response.data.success) {
                toast.success(`Successfully deleted ${selectedIds.length} customer(s)`);
                // Remove deleted customers from state
                setCustomers(customers.filter((_, index) => !selectedRows.includes(index)));
                setSelectedRows([]);
                setSelectedAll(false);
            } else {
                toast.error('Failed to delete customers');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error('Failed to delete customers. Please try again.');
        }

        setShowActionDropdown(false);
    };

    // Handle Edit Action
    const handleEdit = () => {
        if (selectedRows.length === 0) {
            toast.error('Please select a customer to edit');
            setShowActionDropdown(false);
            return;
        }

        if (selectedRows.length > 1) {
            toast.error('You can only edit one customer at a time');
            setShowActionDropdown(false);
            return;
        }

        const selectedId = getSelectedIds()[0];
        console.log('Selected _id for edit: ', selectedId);
        // Navigate to edit page with customer _id
        navigate(`/EditCustomer/${selectedId}`);
        setShowActionDropdown(false);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'ACTIVE':
                return styles.statusActive;
            case 'CLOSED':
                return styles.statusClosed;
            case 'DRAFT':
                return styles.statusDraft;
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
                    + Add New Customer
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
                                <div className={styles.dropdownItem}>Active</div>
                                <div className={styles.dropdownItem}>Closed</div>
                                <div className={styles.dropdownItem}>Draft</div>
                            </div>
                        )}
                    </div>
                    <div className={styles.dropdown}>
                        <button
                            className={styles.dropdownButton}
                            onClick={() => setShowActionDropdown(!showActionDropdown)}
                        >
                            Action
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        {showActionDropdown && (
                            <div className={styles.dropdownMenu}>
                                <div
                                    className={styles.dropdownItem}
                                    onClick={handleEdit}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Edit
                                </div>
                                <div
                                    className={styles.dropdownItem}
                                    onClick={handleDelete}
                                    style={{ cursor: 'pointer', color: '#ef4444' }}
                                >
                                    Delete
                                </div>
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
                            <th>Mobile No.</th>
                            <th>Loan Amount</th>
                            <th>Interest(%)</th>
                            <th>Tenure</th>
                            <th>KYC</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <KPFiananceLoader />
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
                                    <td>{customer.displayId}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.mobile}</td>
                                    <td>{customer.loanAmount}</td>
                                    <td>{customer.interest}</td>
                                    <td>{customer.tenure}</td>
                                    <td>{customer.kyc}</td>
                                    <td>
                                        <span className={`${styles.status} ${getStatusClass(customer.status)}`}>
                                            {customer.status}
                                        </span>
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
        </div>
    );
};

export default CustomerPage;