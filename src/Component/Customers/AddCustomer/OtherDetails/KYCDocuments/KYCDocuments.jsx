import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from './KYCDocuments.module.css';
import { Reset } from '../../../../SvgIcon/SvgIcon';
import FilePreview from '../FilePreview/FilePreview';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import { toast } from 'react-hot-toast';

export default function KYCDocuments({ onSave, onClose }) {
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
        defaultValues: {}
    });

    const [kycDocuments, setKycDocuments] = useState({
        aadharCard: null,
        panCard: null,
        otherDocuments: []
    });

    const [previews, setPreviews] = useState({
        aadharCard: null,
        panCard: null,
        otherDocuments: []
    });

    const [uploadedUrls, setUploadedUrls] = useState({
        aadharCardImage: '',
        panCardImage: '',
        otherDocumentImage: []
    });

    const [isExpanded, setIsExpanded] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalType, setModalType] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem('customerDraft-kyc');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setPreviews({
                aadharCard: parsed.aadharCard || null,
                panCard: parsed.panCard || null,
                otherDocuments: parsed.otherDocuments || []
            });
            setUploadedUrls({
                aadharCardImage: parsed.aadharCardImage || '',
                panCardImage: parsed.panCardImage || '',
                otherDocumentImage: parsed.otherDocumentImage || []
            });

            // Check if there are already uploaded URLs
            const hasUploadedFiles = parsed.aadharCardImage || parsed.panCardImage || (parsed.otherDocumentImage && parsed.otherDocumentImage.length > 0);
            setIsUploadSuccess(hasUploadedFiles);
        }
    }, []);

    // Upload images to API
    const handleUploadImages = async () => {
        setIsUploading(true);
        setIsUploadSuccess(false);
        try {
            const newUploadedUrls = {
                aadharCardImage: '',
                panCardImage: '',
                otherDocumentImage: []
            };

            // Upload Aadhar Card separately
            if (kycDocuments.aadharCard) {
                const formData = new FormData();
                formData.append('files', kycDocuments.aadharCard);
                formData.append('placeName', 'KYCOtherDetailsDocumentImage');

                const response = await axios.post(`${baseUrl}/media/upload`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.success && response.data.data.length > 0) {
                    newUploadedUrls.aadharCardImage = response.data.data[0];
                }
            }

            // Upload PAN Card separately
            if (kycDocuments.panCard) {
                const formData = new FormData();
                formData.append('files', kycDocuments.panCard);
                formData.append('placeName', 'KYCOtherDetailsDocumentImage');

                const response = await axios.post(`${baseUrl}/media/upload`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.success && response.data.data.length > 0) {
                    newUploadedUrls.panCardImage = response.data.data[0];
                }
            }

            // Upload Other Documents together
            if (kycDocuments.otherDocuments.length > 0) {
                const formData = new FormData();
                for (const doc of kycDocuments.otherDocuments) {
                    formData.append('files', doc);
                }
                formData.append('placeName', 'KYCOtherDetailsDocumentImage');

                const response = await axios.post(`${baseUrl}/media/upload`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.success && response.data.data.length > 0) {
                    newUploadedUrls.otherDocumentImage = response.data.data;
                }
            }

            setUploadedUrls(newUploadedUrls);

            // Save to localStorage
            const draftData = {
                aadharCard: previews.aadharCard,
                panCard: previews.panCard,
                otherDocuments: previews.otherDocuments,
                aadharCardImage: newUploadedUrls.aadharCardImage,
                panCardImage: newUploadedUrls.panCardImage,
                otherDocumentImage: newUploadedUrls.otherDocumentImage
            };
            localStorage.setItem('customerDraft-kyc', JSON.stringify(draftData));

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
            // Check if images are uploaded
            if (!uploadedUrls.aadharCardImage && !uploadedUrls.panCardImage && uploadedUrls.otherDocumentImage.length === 0) {
                toast.error('Please upload images first');
                return;
            }

            // Send data to parent component
            if (onSave) {
                onSave({
                    aadharCardImage: uploadedUrls.aadharCardImage,
                    panCardImage: uploadedUrls.panCardImage,
                    otherDocumentImage: uploadedUrls.otherDocumentImage,
                    status: 'Complete'
                });
            }

            toast.success('KYC documents saved successfully!');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to save KYC documents');
        }
    };

    const handleFileSelect = (file, fieldName) => {
        // Reset upload success when new files are selected
        setIsUploadSuccess(false);

        if (fieldName === 'otherDocuments') {
            // Handle multiple files
            const files = Array.isArray(file) ? file : [file];
            setKycDocuments(prev => ({
                ...prev,
                otherDocuments: [...prev.otherDocuments, ...files]
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
                    otherDocuments: [...prev.otherDocuments, ...resolved]
                }));
            });
        } else {
            // Handle single file
            setKycDocuments(prev => ({
                ...prev,
                [fieldName]: file
            }));

            if (file.type === 'application/pdf') {
                setPreviews(prev => ({
                    ...prev,
                    [fieldName]: { type: 'pdf', name: file.name, url: URL.createObjectURL(file) }
                }));
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviews(prev => ({
                        ...prev,
                        [fieldName]: { type: 'image', url: reader.result }
                    }));
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleFileRemove = (fieldName, fileId = null) => {
        // Reset upload success when files are removed
        setIsUploadSuccess(false);

        if (fieldName === 'otherDocuments' && fileId !== null) {
            // For otherDocuments, filter by id property instead of index
            setKycDocuments(prev => ({
                ...prev,
                otherDocuments: prev.otherDocuments.filter((_, idx) => {
                    const previewItem = previews.otherDocuments[idx];
                    return previewItem?.id !== fileId && idx !== fileId;
                })
            }));
            setPreviews(prev => ({
                ...prev,
                otherDocuments: prev.otherDocuments.filter(item => item.id !== fileId && previews.otherDocuments.indexOf(item) !== fileId)
            }));

            // Also remove from uploadedUrls if already uploaded
            setUploadedUrls(prev => ({
                ...prev,
                otherDocumentImage: prev.otherDocumentImage.filter((_, idx) => idx !== fileId)
            }));
        } else {
            setKycDocuments(prev => ({
                ...prev,
                [fieldName]: null
            }));
            setPreviews(prev => ({
                ...prev,
                [fieldName]: null
            }));

            // Also clear the uploaded URL
            if (fieldName === 'aadharCard') {
                setUploadedUrls(prev => ({ ...prev, aadharCardImage: '' }));
            } else if (fieldName === 'panCard') {
                setUploadedUrls(prev => ({ ...prev, panCardImage: '' }));
            }
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
        setKycDocuments({
            aadharCard: null,
            panCard: null,
            otherDocuments: []
        });
        setPreviews({
            aadharCard: null,
            panCard: null,
            otherDocuments: []
        });
        setUploadedUrls({
            aadharCardImage: '',
            panCardImage: '',
            otherDocumentImage: []
        });
        setIsUploadSuccess(false);
        localStorage.removeItem('customerDraft-kyc');
    };

    return (
        <div className={styles.kycDocumentsContainer}>
            <div
                className={styles.sectionHeader}
                onClick={toggleSection}
            >
                <h2 className={styles.sectionTitle}>KYC Documents</h2>
                <span className={styles.toggleIcon}>
                    {isExpanded ? '−' : '+'}
                </span>
            </div>

            {isExpanded && (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionBody}>
                    {/* first row */}
                    <div className={styles.sectionContent}>
                        <div className={styles.formRow}>
                            <div>
                                <FileUploadBox
                                    label="Aadhar Card"
                                    fieldName="aadharCard"
                                    preview={previews.aadharCard}
                                    onFileSelect={handleFileSelect}
                                    onFileRemove={handleFileRemove}
                                    onPreviewClick={handlePreviewClick}
                                />
                            </div>
                            <div>
                                <FileUploadBox
                                    label="Pan Card"
                                    fieldName="panCard"
                                    preview={previews.panCard}
                                    onFileSelect={handleFileSelect}
                                    onFileRemove={handleFileRemove}
                                    onPreviewClick={handlePreviewClick}
                                />
                            </div>
                        </div>


                    </div>
                    <div className={styles.formActions}>
                        <div className={styles.otherDocumentImage}>
                            <FileUploadBox
                                label="Other Documents"
                                fieldName="otherDocuments"
                                multiple={true}
                                preview={previews.otherDocuments}
                                onFileSelect={handleFileSelect}
                                onFileRemove={handleFileRemove}
                                onPreviewClick={handlePreviewClick}
                            />
                        </div>
                        <div className={styles.uploadButton}>
                            <button
                                type="button"
                                className={styles.saveInlineButton}
                                onClick={handleUploadImages}
                                disabled={isUploading || (!kycDocuments.aadharCard && !kycDocuments.panCard && kycDocuments.otherDocuments.length === 0)}
                            >
                                {isUploading ? 'Uploading...' : ' Upload Images'}
                            </button>
                            <div className='d-flex justify-content-center gap-3'>
                                <button
                                    type="submit"
                                    className={styles.saveInlineButton}
                                    disabled={!isUploadSuccess}
                                    style={{
                                        cursor: isUploadSuccess ? 'pointer' : 'not-allowed',
                                        opacity: isUploadSuccess ? 1 : 0.6
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
                        </div>
                    </div>
                </form>
            )}

            {modalOpen && (
                <FilePreview isOpen={modalOpen} content={modalContent} onClose={closeModal} />
            )}
        </div>
    );
}