import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../../AddCustomer.module.css';
import { Reset } from '../../../../SvgIcon/SvgIcon';
import FilePreview from '../FilePreview/FilePreview';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import { toast } from 'react-hot-toast';

export default function BankDetails({ onSave, onClose }) {
    const baseUrl = import.meta.env.VITE_API_URL;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        watch,
        reset
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            accountType: '',
            accountNumber: '',
            ifscCode: '',
            bankName: '',
            fullNameAsPerAccount: '',
            bankDocumentImage: []
        }
    });

    const [bankDocuments, setBankDocuments] = useState({
        bankDocuments: []
    });

    const [previews, setPreviews] = useState({
        bankDocuments: []
    });

    const [uploadedUrls, setUploadedUrls] = useState({
        bankDocumentImage: []
    });

    const [isExpanded, setIsExpanded] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalType, setModalType] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);

    const watchedFields = watch();

    useEffect(() => {
        const savedData = localStorage.getItem('customerDraft-bank');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setValue('accountType', parsed.accountType || '');
            setValue('fullNameAsPerAccount', parsed.fullNameAsPerAccount || '');
            setValue('accountNumber', parsed.accountNumber || '');
            setValue('ifscCode', parsed.ifscCode || '');
            setValue('bankName', parsed.bankName || '');

            setPreviews({
                bankDocuments: parsed.bankDocuments || []
            });

            setUploadedUrls({
                bankDocumentImage: parsed.bankDocumentImage || []
            });

            // Check if there are already uploaded URLs
            const hasUploadedFiles = parsed.bankDocumentImage && parsed.bankDocumentImage.length > 0;
            setIsUploadSuccess(hasUploadedFiles);
        }
    }, [setValue]);

    // Upload images to API
    const handleUploadImages = async () => {
        setIsUploading(true);
        setIsUploadSuccess(false);
        try {
            const newUploadedUrls = {
                bankDocumentImage: []
            };

            // Upload Bank Documents together
            if (bankDocuments.bankDocuments.length > 0) {
                const formData = new FormData();
                for (const doc of bankDocuments.bankDocuments) {
                    formData.append('files', doc);
                }
                formData.append('placeName', 'BankDetailsDocumentImage');

                const response = await axios.post(`${baseUrl}/media/upload`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.success && response.data.data.length > 0) {
                    newUploadedUrls.bankDocumentImage = response.data.data;
                }
            }

            setUploadedUrls(newUploadedUrls);
            setIsUploadSuccess(true);
            toast.success('Images uploaded successfully!');
        } catch (error) {
            console.error('Error uploading images:', error);
            setIsUploadSuccess(false);
            toast.error('Failed to upload images');
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            // Send data to parent component with uploaded URLs
            if (onSave) {
                onSave({
                    ...data,
                    bankDocumentImage: uploadedUrls.bankDocumentImage,
                    status: 'Complete'
                });
            }

            toast.success('Bank details saved successfully!');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to save bank details');
        }
    };

    const handleExport = async () => {
        try {
            const loadingToast = toast.loading('Exporting bank details...');

            const exportData = {
                accountType: watchedFields.accountType,
                fullNameOfAccountHolder: watchedFields.fullNameAsPerAccount,
                accountNumber: watchedFields.accountNumber,
                ifsc: watchedFields.ifscCode,
                bankName: watchedFields.bankName
            };

            const response = await axios.post(`${baseUrl}/user/generate-pdf`, exportData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'blob'
            });

            toast.dismiss(loadingToast);

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `bank-details-${watchedFields.accountNumber || 'export'}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success('Bank details exported successfully!');
        } catch (error) {
            console.error('Export Error:', error);
            toast.error(
                error.response?.data?.message ||
                'Failed to export bank details. Please try again.'
            );
        }
    };

    const handleFileSelect = (file, fieldName) => {
        // Reset upload success when new files are selected
        setIsUploadSuccess(false);

        // Handle multiple files
        const files = Array.isArray(file) ? file : [file];
        setBankDocuments(prev => ({
            ...prev,
            bankDocuments: [...prev.bankDocuments, ...files]
        }));

        const newPreviews = files.map(f => {
            if (f.type === 'application/pdf') {
                return Promise.resolve({
                    type: 'pdf',
                    name: f.name,
                    url: URL.createObjectURL(f),
                    id: Math.random().toString(36)
                });
            } else {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve({
                            type: 'image',
                            url: reader.result,
                            id: Math.random().toString(36)
                        });
                    };
                    reader.readAsDataURL(f);
                });
            }
        });

        Promise.all(newPreviews).then(resolved => {
            setPreviews(prev => ({
                ...prev,
                bankDocuments: [...prev.bankDocuments, ...resolved]
            }));
        });
    };

    const handleFileRemove = (fieldName, fileId = null) => {
        // Reset upload success when files are removed
        setIsUploadSuccess(false);

        if (fileId !== null) {
            // For bankDocuments, filter by id property
            setBankDocuments(prev => ({
                ...prev,
                bankDocuments: prev.bankDocuments.filter((_, idx) => {
                    const previewItem = previews.bankDocuments[idx];
                    return previewItem?.id !== fileId && idx !== fileId;
                })
            }));
            setPreviews(prev => ({
                ...prev,
                bankDocuments: prev.bankDocuments.filter(item => item.id !== fileId && previews.bankDocuments.indexOf(item) !== fileId)
            }));

            // Also remove from uploadedUrls if already uploaded
            setUploadedUrls(prev => ({
                ...prev,
                bankDocumentImage: prev.bankDocumentImage.filter((_, idx) => idx !== fileId)
            }));
        }
    };

    const handlePreviewClick = (preview, fieldName) => {
        if (preview) {
            setModalContent(preview);
            setModalType(fieldName);
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null);
        setModalType('');
    };

    const toggleSection = () => {
        setIsExpanded(!isExpanded);
    };

    const handleReset = () => {
        reset({
            accountType: '',
            accountNumber: '',
            ifscCode: '',
            bankName: '',
            fullNameAsPerAccount: ''
        });
        setBankDocuments({
            bankDocuments: []
        });
        setPreviews({
            bankDocuments: []
        });
        setUploadedUrls({
            bankDocumentImage: []
        });
        setIsUploadSuccess(false);
        localStorage.removeItem('customerDraft-bank');
    };

    return (
        <>
            <div
                className={styles.sectionHeader}
                onClick={toggleSection}
            >
                <h2 className={styles.sectionTitle}>Bank Details</h2>
                <span className={styles.toggleIcon}>
                    {isExpanded ? '−' : '+'}
                </span>
            </div>

            {isExpanded && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.sectionContent}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Account Type:
                                </label>
                                <input
                                    type="text"
                                    {...register('accountType', {
                                        required: 'Account Type is required'
                                    })}
                                    className={`${styles.input} ${styles.accountType}`}
                                />
                                {errors.accountType && (
                                    <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
                                        {errors.accountType.message}
                                    </span>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label className={`${styles.label} ${styles.lab} `}>
                                    Full Name Of Account Holder:
                                </label>
                                <input
                                    type="text"
                                    {...register('fullNameAsPerAccount', {
                                        required: 'Account Holder Name is required'
                                    })}
                                    className={`${styles.input} ${styles.fullName}`}

                                />
                                {errors.fullNameAsPerAccount && (
                                    <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
                                        {errors.fullNameAsPerAccount.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Account Number:
                                </label>
                                <input
                                    type="text"
                                    {...register('accountNumber', {
                                        required: 'Account Number is required',
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Only numbers allowed'
                                        }
                                    })}
                                    className={`${styles.input} ${styles.accountNumber}`}
                                />
                                {errors.accountNumber && (
                                    <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
                                        {errors.accountNumber.message}
                                    </span>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    IFSC:
                                </label>
                                <input
                                    type="text"
                                    {...register('ifscCode', {
                                        required: 'IFSC Code is required',
                                        pattern: {
                                            value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                                            message: 'Invalid IFSC Code format'
                                        }
                                    })}
                                    className={`${styles.input} ${styles.ifscCode}`}
                                />
                                {errors.ifscCode && (
                                    <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
                                        {errors.ifscCode.message}
                                    </span>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Bank Name:
                                </label>
                                <input
                                    type="text"
                                    {...register('bankName', {
                                        required: 'Bank Name is required'
                                    })}
                                    className={`${styles.input} ${styles.bankName}`}
                                />
                                {errors.bankName && (
                                    <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
                                        {errors.bankName.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <FileUploadBox
                                label="Bank Documents (Optional)"
                                fieldName="bankDocuments"
                                multiple={true}
                                preview={previews.bankDocuments}
                                onFileSelect={handleFileSelect}
                                onFileRemove={handleFileRemove}
                                onPreviewClick={handlePreviewClick}
                            />
                        </div>
                    </div>

                    <div className={styles.formActions} style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
                        <button
                            type="button"
                            className={styles.exportInlineButton}
                            onClick={handleExport}
                            disabled={!isValid}
                        >
                            Export
                        </button>
                        {bankDocuments.bankDocuments.length > 0 && (
                            <button
                                type="button"
                                className={styles.saveInlineButton}
                                onClick={handleUploadImages}
                                disabled={isUploading}
                            >
                                {isUploading ? 'Uploading...' : 'Upload Images'}
                            </button>
                        )}
                        <button
                            type="submit"
                            className={styles.saveInlineButton}
                            disabled={!isValid}
                            style={{
                                opacity: isValid ? 1 : 0.5,
                                cursor: isValid ? 'pointer' : 'not-allowed'
                            }}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className={styles.resetButton}
                            onClick={handleReset}
                        >
                            <span className={styles.resetIcon}>
                                <Reset />
                            </span>
                        </button>
                    </div>
                </form>
            )}

            {modalOpen && (
                <FilePreview isOpen={modalOpen} content={modalContent} onClose={closeModal} />
            )}
        </>
    );
}