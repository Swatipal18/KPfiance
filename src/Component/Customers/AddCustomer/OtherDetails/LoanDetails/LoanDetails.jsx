import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../AddCustomer.module.css';
import { Reset } from '../../../../SvgIcon/SvgIcon';

export default function LoanDetails({ onSave, onClose }) {
    const [formData, setFormData] = useState({
        loanId: '',
        requestedAmount: '',
        interestRateType: 'Per Day',
        interestRate: '',
        tenureType: 'Month',
        tenure: '',
        startDate: '',
        endDate: '',
        emiDate: 'Every 2nd',
    });

    const [isExpanded, setIsExpanded] = useState(true);
    const [calculations, setCalculations] = useState({
        monthlyEMI: 0,
        totalInterest: 0,
        totalAmount: 0
    });

    useEffect(() => {
        const savedData = localStorage.getItem('customerDraft-loan');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        calculateEMI();
    }, [formData.requestedAmount, formData.interestRate, formData.interestRateType, formData.tenure, formData.tenureType]);

    const calculateEMI = () => {
        const principal = parseFloat(formData.requestedAmount) || 0;
        const rate = parseFloat(formData.interestRate) || 0;
        const tenureValue = parseFloat(formData.tenure) || 0;

        if (principal <= 0 || rate <= 0 || tenureValue <= 0) {
            setCalculations({ monthlyEMI: 0, totalInterest: 0, totalAmount: 0 });
            return;
        }

        // Convert tenure to months
        let tenureInMonths = tenureValue;
        if (formData.tenureType === 'Day') {
            tenureInMonths = tenureValue / 30;
        } else if (formData.tenureType === 'Year') {
            tenureInMonths = tenureValue * 12;
        }

        // Convert interest rate to monthly
        let monthlyRate = rate;

        if (formData.interestRateType === 'Per Day') {
            monthlyRate = (rate * 30) / 100;
        } else if (formData.interestRateType === 'Per Month') {
            monthlyRate = (rate / 12) / 100; // <-- FIXED
        } else if (formData.interestRateType === 'Per Year') {
            monthlyRate = (rate / 12) / 100;
        }

        // EMI Calculation
        let emi = 0;
        if (monthlyRate === 0) {
            emi = principal / tenureInMonths;
        } else {
            emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
                (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
        }

        const totalAmount = emi * tenureInMonths;
        const totalInterest = totalAmount - principal;

        setCalculations({
            monthlyEMI: Math.round(emi),
            totalInterest: Math.round(totalInterest),
            totalAmount: Math.round(totalAmount)
        });
    };

    const handleSave = () => {
        localStorage.setItem('customerDraft-loan', JSON.stringify(formData));

        if (onSave) {
            onSave(formData);
        }

        alert('Loan details saved!');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReset = () => {
        setFormData({
            loanId: '',
            requestedAmount: '',
            interestRateType: 'Per Day',
            interestRate: '',
            tenureType: 'Month',
            tenure: '',
            startDate: '',
            endDate: '',
            emiDate: 'Every 2nd',
        });
    };

    const toggleSection = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div
                className={styles.sectionHeader}
                onClick={toggleSection}
            >
                <h2 className={styles.sectionTitle}>Loan Details</h2>
                <span className={styles.toggleIcon}>
                    {isExpanded ? '−' : '+'}
                </span>
            </div>

            {isExpanded && (
                <>
                    <div className={styles.sectionContent}>
                        {/* Row 1: Loan ID and Required Loan Amount */}
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Loan ID:</label>
                                <input
                                    type="text"
                                    name="loanId"
                                    value={formData.loanId}
                                    onChange={handleInputChange}
                                    className={`${styles.input} ${styles.loanId}`}
                                />
                            </div>
                            <div className={`${styles.formGroup} ${styles.lab}`} >
                                <label className={styles.label}>Required Loan Amount:</label>
                                <input
                                    type="text"
                                    name="requestedAmount"
                                    value={formData.requestedAmount}
                                    onChange={handleInputChange}
                                    className={`${styles.input} ${styles.loanreq}`}
                                />
                            </div>
                        </div>

                        {/* Row 2: Interest Type, Interest Rate, Tenure Type, Tenure */}
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Interest Type:</label>
                                <select
                                    name="interestRateType"
                                    value={formData.interestRateType}
                                    onChange={handleInputChange}
                                    className={`${styles.select} ${styles.interestType} `}
                                >
                                    <option value="Per Day">Per Day</option>
                                    <option value="Per Month">Per Month</option>
                                    <option value="Per Year">Per Year</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Interest Rate(%):</label>
                                <input
                                    type="text"
                                    name="interestRate"
                                    value={formData.interestRate}
                                    onChange={handleInputChange}
                                    className={`${styles.input} ${styles.interestRate}`}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Tenure Type:</label>
                                <select
                                    name="tenureType"
                                    value={formData.tenureType}
                                    onChange={handleInputChange}
                                    className={`${styles.select} ${styles.tenureType}`}
                                >
                                    <option value="Day">Day</option>
                                    <option value="Month">Month</option>
                                    <option value="Year">Year</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Tenure:</label>
                                <input
                                    type="text"
                                    name="tenure"
                                    value={formData.tenure}
                                    onChange={handleInputChange}
                                    className={`${styles.input} ${styles.tenure}`}
                                />
                            </div>
                        </div>

                        {/* Row 3: Start Date, End Date, EMI Date */}
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Start Date:</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    className={`${styles.input}  ${styles.startDate}`}
                                />
                            </div>
                            <div className={`${styles.formGroup} ${styles.lab} `} >
                                <label className={styles.label}>End Date:</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    className={`${styles.input} ${styles.endDate}`}
                                />
                            </div>
                            <div className={`${styles.formGroup} ${styles.lab} `}  >
                                <label className={styles.label}>EMI Date:</label>
                                <select
                                    name="emiDate"
                                    value={formData.emiDate}
                                    onChange={handleInputChange}
                                    className={`${styles.select} ${styles.emiDate}`}
                                >
                                    {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                                        <option key={day} value={day}>
                                            Day {day}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* EMI Calculator Display */}
                    <div className={styles.emiCalculator}>
                        <div className={styles.emiCalculatorContent}>
                            <div className={styles.emiCalculatorAmount}>
                                <span className={styles.emiCalculatorLabel}>Loan Amount:</span>
                                <span className={styles.emiCalculatorValue}>
                                    ₹ {formData.requestedAmount || 0}
                                </span>
                            </div>

                            <div className={styles.emiCalculatorAmount}>
                                <span className={styles.emiCalculatorLabel}>Interest:</span>
                                <span className={styles.emiCalculatorValue}>
                                    {formData.interestRate || 0}%
                                </span>
                            </div>

                            <div className={styles.emiCalculatorAmount}>
                                <span className={styles.emiCalculatorLabel}>Interest Type:</span>
                                <span className={styles.emiCalculatorValue}>
                                    {formData.interestRateType}
                                </span>
                            </div>

                            <div className={styles.emiCalculatorAmount}>
                                <span className={styles.emiCalculatorLabel}>Tenure:</span>
                                <span className={styles.emiCalculatorValue}>
                                    {formData.tenure || 0} {formData.tenureType}s
                                </span>
                            </div>

                            <div className={styles.emiCalculatorAmount}>
                                <span className={styles.emiCalculatorLabel}>Monthly EMI:</span>
                                <span className={styles.emiCalculatorValue}>
                                    ₹ {calculations.monthlyEMI}
                                </span>
                            </div>
                        </div>

                        <div className={styles.emiCalculatorContents}>
                            <div className={styles.emiCalculatorAmount}>
                                <span className={styles.emiCalculatorLabel}>Total Interest Payable:</span>
                                <span className={styles.emiCalculatorValue}>
                                    ₹ {calculations.totalInterest}
                                </span>
                            </div>

                            <div className={styles.emiCalculatorAmount}>
                                <span className={styles.emiCalculatorLabel}>Total Amount Payable:</span>
                                <span className={styles.emiCalculatorValue}>
                                    ₹ {calculations.totalAmount}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div className={styles.formRow} style={{ justifyContent: 'flex-end', }}>
                        <div className={styles.formActions}>
                            <button className={styles.saveInlineButton} onClick={handleSave}>
                                Save
                            </button>
                            <button className={styles.resetButton} onClick={handleReset}>
                                <span className={styles.resetIcon}>
                                    <Reset />
                                </span>
                            </button>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
}