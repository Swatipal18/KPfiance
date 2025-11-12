// *AddCustomer.jsx
import React, { useState } from 'react';
import styles from './AddCustomer.module.css';
import { Add, Leftarrow, Reset } from '../../SvgIcon/SvgIcon';
import { useAddCustomer } from './useAddCustomer';
import KYCDocuments from './OtherDetails/KYCDocuments/KYCDocuments';
import OccupationDetails from './OtherDetails/OccupationDetails/OccupationDetails';
import LoanDetails from './OtherDetails/LoanDetails/LoanDetails';
import Collateral from './OtherDetails/Collateral/Collateral';
import BankDetails from './OtherDetails/BankDetails/BankDetails';


const AddCustomer = () => {
    const {
        register,
        handleSubmit,
        errors,
        activeSection,
        sectionStatus,
        loading,
        handleBack,
        handleSaveAsDraft,
        handleClearDraft,
        handleSave,
        handleGenerateLoanForm,
        toggleSection,
        openSection,
        closeSection,
        handleSectionSave,
        handleReset
    } = useAddCustomer();

    // Check if all sections are complete
    const allSectionsComplete = Object.values(sectionStatus).every(status => status === 'Complete');

    // Form submit handler
    const onSubmit = (data) => {
        handleSave(data);
    };

    // Handle Generate button click with validation
    const handleGenerateClick = () => {
        if (!allSectionsComplete) {
            const incompleteSections = Object.entries(sectionStatus)
                .filter(([_, status]) => status === 'Pending')
                .map(([section]) => {
                    // Convert camelCase to readable format
                    return section.replace(/([A-Z])/g, ' $1').trim();
                });

            toast.error(`Please complete the following sections: ${incompleteSections.join(', ')}`);
            return;
        }
        handleGenerateLoanForm();
    };

    return (
        <>

            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={handleBack} disabled={loading}>
                        <span className={styles.backIcon}>
                            <Leftarrow />
                        </span>
                        Back
                    </button>
                    <div className={styles.headerButtons}>
                        <button
                            className={styles.draftButton}
                            onClick={handleClearDraft}
                            disabled={loading}
                        >
                            Clear Draft
                        </button>
                        <button
                            className={styles.draftButton}
                            onClick={handleSaveAsDraft}
                            disabled={loading}
                        >
                            Save as draft
                        </button>
                        <button
                            className={styles.saveButton}
                            onClick={handleSubmit(onSubmit)}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            className={styles.generateButton}
                            onClick={handleGenerateClick}
                            disabled={loading || !allSectionsComplete}
                            style={{
                                opacity: (!allSectionsComplete && !loading) ? 0.5 : 1,
                                cursor: (!allSectionsComplete && !loading) ? 'not-allowed' : 'pointer'
                            }}
                            title={!allSectionsComplete ? 'Please complete all sections first' : 'Generate Loan Form'}
                        >
                            {loading ? 'Generating...' : 'Generate Loan Form'}
                        </button>
                    </div>
                </div>

                <div className={styles.content}>
                    {/* Basic Details Section */}
                    <div className={styles.section}>
                        <div
                            className={styles.sectionHeader}
                            onClick={() => toggleSection('basicDetails')}
                        >
                            <h2 className={styles.sectionTitle}>Basic Details</h2>
                            <span className={styles.toggleIcon}>
                                {activeSection === 'basicDetails' ? '−' : '+'}
                            </span>
                        </div>

                        {activeSection === 'basicDetails' && (
                            <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionContent}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Name:</label>
                                        <input
                                            type="text"
                                            {...register('name', {
                                                required: 'Name is required',
                                                minLength: { value: 2, message: 'Name must be at least 2 characters' }
                                            })}
                                            className={styles.input}
                                            style={{
                                                width: "100%",
                                                marginLeft: "10px"
                                            }}
                                        />
                                        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Contact Number:</label>
                                        <input
                                            type="text"
                                            {...register('contact', {
                                                required: 'Contact number is required',
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: 'Please enter a valid 10-digit number'
                                                }
                                            })}
                                            className={styles.input}
                                            style={{
                                                width: "75%",
                                                marginLeft: "10px"
                                            }}
                                        />
                                        {errors.contact && <span className={styles.error}>{errors.contact.message}</span>}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Alternate Contact Number:</label>
                                        <input
                                            type="text"
                                            {...register('alternateContact', {
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: 'Please enter a valid 10-digit number'
                                                }
                                            })}
                                            className={styles.input}
                                            style={{
                                                width: "63.8%",
                                                marginLeft: "10px"
                                            }}
                                        />
                                        {errors.alternateContact && <span className={styles.error}>{errors.alternateContact.message}</span>}
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup} style={{ flex: 1 }}>
                                        <label className={styles.label}>Address:</label>
                                        <textarea
                                            {...register('address', {
                                                required: 'Address is required',
                                                minLength: { value: 10, message: 'Address must be at least 10 characters' }
                                            })}
                                            className={styles.textarea}
                                            rows="3"
                                            style={{
                                                width: "100%",
                                                marginLeft: "10px"
                                            }}
                                        />
                                        {errors.address && <span className={styles.error}>{errors.address.message}</span>}
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>City:</label>
                                        <input
                                            type="text"
                                            {...register('city', {
                                                required: 'City is required',
                                                minLength: { value: 2, message: 'City must be at least 2 characters' }
                                            })}
                                            className={styles.input}
                                            style={{
                                                width: "100%",
                                                marginLeft: "10px"
                                            }}
                                        />
                                        {errors.city && <span className={styles.error}>{errors.city.message}</span>}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Email ID:</label>
                                        <input
                                            type="email"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            className={styles.input}
                                            style={{
                                                width: "80%",
                                                marginLeft: "10px"
                                            }}
                                        />
                                        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                                    </div>
                                    <div className={styles.formActions}>
                                        <button
                                            type="submit"
                                            className={styles.saveInlineButton}
                                            disabled={loading}
                                        >
                                            {loading ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.resetButton}
                                            onClick={handleReset}
                                            disabled={loading}
                                        >
                                            <span className={styles.resetIcon}>
                                                <Reset />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* KYC Documents Section */}
                    {activeSection === 'kycDocuments' ? (
                        <div className={styles.section}>
                            <KYCDocuments
                                onSave={(data) => handleSectionSave('kycDocuments', data)}
                                onClose={closeSection}
                            />
                        </div>
                    ) : (
                        <div className={styles.collapsedSection} onClick={() => openSection('kycDocuments')}>
                            <span className={styles.collapsedTitle}>KYC Documents</span>
                            <div className={styles.collapsedRight}>
                                <span className={sectionStatus.kycDocuments === 'Complete' ? styles.statusComplete : styles.statusPending}>
                                    {sectionStatus.kycDocuments}
                                </span>
                                <span className={styles.addIcon}>
                                    <Add />
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Occupation Details Section */}
                    {activeSection === 'occupationDetails' ? (
                        <div className={styles.section}>
                            <OccupationDetails
                                onSave={(data) => handleSectionSave('occupationDetails', data)}
                                onClose={closeSection}
                            />
                        </div>
                    ) : (
                        <div className={styles.collapsedSection} onClick={() => openSection('occupationDetails')}>
                            <span className={styles.collapsedTitle}>Occupation Details</span>
                            <div className={styles.collapsedRight}>
                                <span className={sectionStatus.occupationDetails === 'Complete' ? styles.statusComplete : styles.statusPending}>
                                    {sectionStatus.occupationDetails}
                                </span>
                                <span className={styles.addIcon}>
                                    <Add />
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Loan Details Section */}
                    {activeSection === 'loanDetails' ? (
                        <div className={styles.section}>
                            <LoanDetails
                                onSave={(data) => handleSectionSave('loanDetails', data)}
                                onClose={closeSection}
                            />
                        </div>
                    ) : (
                        <div className={styles.collapsedSection} onClick={() => openSection('loanDetails')}>
                            <span className={styles.collapsedTitle}>Loan Details</span>
                            <div className={styles.collapsedRight}>
                                <span className={sectionStatus.loanDetails === 'Complete' ? styles.statusComplete : styles.statusPending}>
                                    {sectionStatus.loanDetails}
                                </span>
                                <span className={styles.addIcon}>
                                    <Add />
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Collateral Section */}
                    {activeSection === 'collateral' ? (
                        <div className={styles.section}>
                            <Collateral
                                onSave={(data) => handleSectionSave('collateral', data)}
                                onClose={closeSection}
                            />
                        </div>
                    ) : (
                        <div className={styles.collapsedSection} onClick={() => openSection('collateral')}>
                            <span className={styles.collapsedTitle}>Collateral</span>
                            <div className={styles.collapsedRight}>
                                <span className={sectionStatus.collateral === 'Complete' ? styles.statusComplete : styles.statusPending}>
                                    {sectionStatus.collateral}
                                </span>
                                <span className={styles.addIcon}>
                                    <Add />
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Bank Details Section */}
                    {activeSection === 'bankDetails' ? (
                        <div className={styles.section}>
                            <BankDetails
                                onSave={(data) => handleSectionSave('bankDetails', data)}
                                onClose={closeSection}
                            />
                        </div>
                    ) : (
                        <div className={styles.collapsedSection} onClick={() => openSection('bankDetails')}>
                            <span className={styles.collapsedTitle}>Bank Details</span>
                            <div className={styles.collapsedRight}>
                                <span className={sectionStatus.bankDetails === 'Complete' ? styles.statusComplete : styles.statusPending}>
                                    {sectionStatus.bankDetails}
                                </span>
                                <span className={styles.addIcon}>
                                    <Add />
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddCustomer;