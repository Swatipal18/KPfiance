// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import styles from '../../AddCustomer.module.css';
// import { Reset } from '../../../../SvgIcon/SvgIcon';
// import FilePreview from '../FilePreview/FilePreview';
// import FileUploadBox from '../FileUploadBox/FileUploadBox';
// import { toast } from 'react-hot-toast';

// export default function Collateral({ onSave, onClose }) {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isValid },
//         setValue,
//         watch,
//         reset
//     } = useForm({
//         mode: 'onChange',
//         defaultValues: {
//             collateralType: '',
//             collateralValue: '',
//             collateralDocumentImage: [],
//         }
//     });

//     const [collateralDocuments, setCollateralDocuments] = useState({
//         proofOfCollateral1: null,
//         proofOfCollateral2: null
//     });

//     const [previews, setPreviews] = useState({
//         proofOfCollateral1: null,
//         proofOfCollateral2: null
//     });

//     const [isExpanded, setIsExpanded] = useState(true);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [modalContent, setModalContent] = useState(null);
//     const [modalType, setModalType] = useState('');

//     // Watch all form fields
//     const watchedFields = watch();

//     useEffect(() => {
//         const savedData = localStorage.getItem('customerDraft-collateral');
//         if (savedData) {
//             const parsed = JSON.parse(savedData);
//             setValue('collateralType', parsed.collateralType || '');
//             setValue('collateralValue', parsed.collateralValue || '');

//             setPreviews({
//                 proofOfCollateral1: parsed.proofOfCollateral1 || null,
//                 proofOfCollateral2: parsed.proofOfCollateral2 || null
//             });
//         }
//     }, [setValue]);

//     const onSubmit = async (data) => {
//         try {
//             const formDataToSend = new FormData();
//             formDataToSend.append('collateralType', data.collateralType);
//             formDataToSend.append('collateralValue', data.collateralValue);

//             if (collateralDocuments.proofOfCollateral1) {
//                 formDataToSend.append('proofOfCollateral1', collateralDocuments.proofOfCollateral1);
//             }
//             if (collateralDocuments.proofOfCollateral2) {
//                 formDataToSend.append('proofOfCollateral2', collateralDocuments.proofOfCollateral2);
//             }

//             // Save to localStorage for draft
//             const draftData = {
//                 collateralType: data.collateralType,
//                 collateralValue: data.collateralValue,
//                 proofOfCollateral1: previews.proofOfCollateral1,
//                 proofOfCollateral2: previews.proofOfCollateral2
//             };
//             localStorage.setItem('customerDraft-collateral', JSON.stringify(draftData));

//             // Parent component ko data bhejein with status Complete
//             if (onSave) {
//                 onSave({
//                     ...data,
//                     collateralDocuments: {
//                         proofOfCollateral1: collateralDocuments.proofOfCollateral1,
//                         proofOfCollateral2: collateralDocuments.proofOfCollateral2
//                     },
//                     status: 'Complete'
//                 });
//             }

//             toast.success('Collateral details saved successfully!');
//         } catch (error) {
//             console.error('Error:', error);
//             toast.error('Failed to save collateral details');
//         }
//     };

//     const handleFileSelect = (file, fieldName) => {
//         setCollateralDocuments(prev => ({
//             ...prev,
//             [fieldName]: file
//         }));

//         if (file.type === 'application/pdf') {
//             setPreviews(prev => ({
//                 ...prev,
//                 [fieldName]: { type: 'pdf', name: file.name, url: URL.createObjectURL(file) }
//             }));
//         } else {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreviews(prev => ({
//                     ...prev,
//                     [fieldName]: { type: 'image', url: reader.result }
//                 }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleFileRemove = (fieldName) => {
//         setCollateralDocuments(prev => ({
//             ...prev,
//             [fieldName]: null
//         }));
//         setPreviews(prev => ({
//             ...prev,
//             [fieldName]: null
//         }));
//     };

//     const handlePreviewClick = (preview, fieldName) => {
//         if (preview) {
//             setModalContent(preview);
//             setModalType(fieldName);
//             setModalOpen(true);
//         }
//     };

//     const closeModal = () => {
//         setModalOpen(false);
//         setModalContent(null);
//         setModalType('');
//     };

//     const toggleSection = () => {
//         setIsExpanded(!isExpanded);
//     };

//     const handleReset = () => {
//         reset({
//             collateralType: '',
//             collateralValue: ''
//         });
//         setCollateralDocuments({
//             proofOfCollateral1: null,
//             proofOfCollateral2: null
//         });
//         setPreviews({
//             proofOfCollateral1: null,
//             proofOfCollateral2: null
//         });
//         localStorage.removeItem('customerDraft-collateral');
//     };

//     return (
//         <>
//             <div
//                 className={styles.sectionHeader}
//                 onClick={toggleSection}
//             >
//                 <h2 className={styles.sectionTitle}>Collateral Details</h2>
//                 <span className={styles.toggleIcon}>
//                     {isExpanded ? '−' : '+'}
//                 </span>
//             </div>

//             {isExpanded && (
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className={styles.sectionContent}>
//                         <div className={styles.formRow}>
//                             <div className={styles.formGroup}>
//                                 <label className={styles.label}>Collateral Type:</label>
//                                 <input
//                                     type="text"
//                                     {...register('collateralType')}
//                                     className={styles.input}
//                                     style={{
//                                         width: "65%",
//                                         marginLeft: "10px"
//                                     }}
//                                 />
//                                 {errors.collateralType && (
//                                     <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
//                                         {errors.collateralType.message}
//                                     </span>
//                                 )}
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label className={styles.label}>Collateral Estimated Value:</label>
//                                 <input
//                                     type="text"
//                                     {...register('collateralValue')}
//                                     className={styles.input}
//                                     style={{
//                                         width: "63.8%",
//                                         marginLeft: "10px"
//                                     }}
//                                 />
//                                 {errors.collateralValue && (
//                                     <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
//                                         {errors.collateralValue.message}
//                                     </span>
//                                 )}
//                             </div>
//                         </div>

//                         <div className={styles.formActions}>
//                             <div className={styles.formRows}>
//                                 <FileUploadBox
//                                     label="Proof Of Collateral"
//                                     fieldName="proofOfCollateral1"
//                                     preview={previews.proofOfCollateral1}
//                                     onFileSelect={handleFileSelect}
//                                     onFileRemove={handleFileRemove}
//                                     onPreviewClick={handlePreviewClick}
//                                 />

//                                 <FileUploadBox
//                                     label="Proof Of Collateral"
//                                     fieldName="proofOfCollateral2"
//                                     preview={previews.proofOfCollateral2}
//                                     onFileSelect={handleFileSelect}
//                                     onFileRemove={handleFileRemove}
//                                     onPreviewClick={handlePreviewClick}
//                                 />
//                             </div>
//                             <div className={styles.formRowess} style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
//                                 <div className={styles.formActions}>
//                                     <button
//                                         type="submit"
//                                         className={styles.saveInlineButton}
//                                         style={{
//                                             cursor: 'pointer'
//                                         }}
//                                     >
//                                         Save
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className={styles.resetButton}
//                                         onClick={handleReset}
//                                     >
//                                         <span className={styles.resetIcon}>
//                                             <Reset />
//                                         </span>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             )}

//             {modalOpen && (
//                 <FilePreview isOpen={modalOpen} content={modalContent} onClose={closeModal} />
//             )}
//         </>
//     );
// }





import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../../AddCustomer.module.css';
import { Reset } from '../../../../SvgIcon/SvgIcon';
import FilePreview from '../FilePreview/FilePreview';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import { toast } from 'react-hot-toast';

export default function Collateral({ onSave, onClose }) {
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
            collateralType: '',
            collateralValue: '',
            collateralDocumentImage: [],
        }
    });

    const [collateralDocuments, setCollateralDocuments] = useState({
        proofOfCollateral: []
    });

    const [previews, setPreviews] = useState({
        proofOfCollateral: []
    });

    const [uploadedUrls, setUploadedUrls] = useState({
        collateralDocumentImage: []
    });

    const [isExpanded, setIsExpanded] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalType, setModalType] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);

    const watchedFields = watch();

    useEffect(() => {
        const savedData = localStorage.getItem('customerDraft-collateral');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setValue('collateralType', parsed.collateralType || '');
            setValue('collateralValue', parsed.collateralValue || '');

            setPreviews({
                proofOfCollateral: parsed.proofOfCollateral || []
            });

            setUploadedUrls({
                collateralDocumentImage: parsed.collateralDocumentImage || []
            });

            // Check if there are already uploaded URLs
            const hasUploadedFiles = parsed.collateralDocumentImage && parsed.collateralDocumentImage.length > 0;
            setIsUploadSuccess(hasUploadedFiles);
        }
    }, [setValue]);

    // Upload images to API
    const handleUploadImages = async () => {
        setIsUploading(true);
        setIsUploadSuccess(false);
        try {
            const newUploadedUrls = {
                collateralDocumentImage: []
            };

            // Upload Collateral Documents together
            if (collateralDocuments.proofOfCollateral.length > 0) {
                const formData = new FormData();
                for (const doc of collateralDocuments.proofOfCollateral) {
                    formData.append('files', doc);
                }
                formData.append('placeName', 'CollateralDetailsDocumentImage');

                const response = await axios.post(`${baseUrl}/media/upload`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.success && response.data.data.length > 0) {
                    newUploadedUrls.collateralDocumentImage = response.data.data;
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
            // Check if images are uploaded
            if (uploadedUrls.collateralDocumentImage.length === 0) {
                toast.error('Please upload images first');
                return;
            }

            // Send data to parent component with uploaded URLs
            if (onSave) {
                onSave({
                    ...data,
                    collateralDocumentImage: uploadedUrls.collateralDocumentImage,
                    status: 'Complete'
                });
            }

            toast.success('Collateral details saved successfully!');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to save collateral details');
        }
    };

    const handleFileSelect = (file, fieldName) => {
        // Reset upload success when new files are selected
        setIsUploadSuccess(false);

        // Handle multiple files
        const files = Array.isArray(file) ? file : [file];
        setCollateralDocuments(prev => ({
            ...prev,
            proofOfCollateral: [...prev.proofOfCollateral, ...files]
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
                proofOfCollateral: [...prev.proofOfCollateral, ...resolved]
            }));
        });
    };

    const handleFileRemove = (fieldName, fileId = null) => {
        // Reset upload success when files are removed
        setIsUploadSuccess(false);

        if (fileId !== null) {
            // For proofOfCollateral, filter by id property
            setCollateralDocuments(prev => ({
                ...prev,
                proofOfCollateral: prev.proofOfCollateral.filter((_, idx) => {
                    const previewItem = previews.proofOfCollateral[idx];
                    return previewItem?.id !== fileId && idx !== fileId;
                })
            }));
            setPreviews(prev => ({
                ...prev,
                proofOfCollateral: prev.proofOfCollateral.filter(item => item.id !== fileId && previews.proofOfCollateral.indexOf(item) !== fileId)
            }));

            // Also remove from uploadedUrls if already uploaded
            setUploadedUrls(prev => ({
                ...prev,
                collateralDocumentImage: prev.collateralDocumentImage.filter((_, idx) => idx !== fileId)
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
            collateralType: '',
            collateralValue: ''
        });
        setCollateralDocuments({
            proofOfCollateral: []
        });
        setPreviews({
            proofOfCollateral: []
        });
        setUploadedUrls({
            collateralDocumentImage: []
        });
        setIsUploadSuccess(false);
        localStorage.removeItem('customerDraft-collateral');
    };

    return (
        <>
            <div
                className={styles.sectionHeader}
                onClick={toggleSection}
            >
                <h2 className={styles.sectionTitle}>Collateral Details</h2>
                <span className={styles.toggleIcon}>
                    {isExpanded ? '−' : '+'}
                </span>
            </div>

            {isExpanded && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.sectionContent}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Collateral Type:</label>
                                <input
                                    type="text"
                                    {...register('collateralType')}
                                    className={`${styles.input} ${styles.collateralType} ml-[5px] `}
                                />
                                {errors.collateralType && (
                                    <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
                                        {errors.collateralType.message}
                                    </span>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Collateral Estimated Value:</label>
                                <input
                                    type="text"
                                    {...register('collateralValue')}
                                    className={`${styles.input} ${styles.collateralValue} ml-[5px] `}
                                    
                                    style={{
                                        width: "63.8%",
                                        marginLeft: "10px"
                                    }}
                                />
                                {errors.collateralValue && (
                                    <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
                                        {errors.collateralValue.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <FileUploadBox
                                label="Proof Of Collateral"
                                fieldName="proofOfCollateral"
                                multiple={true}
                                preview={previews.proofOfCollateral}
                                onFileSelect={handleFileSelect}
                                onFileRemove={handleFileRemove}
                                onPreviewClick={handlePreviewClick}
                            />
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="button"
                            className={styles.saveInlineButton}
                            onClick={handleUploadImages}
                            disabled={isUploading || collateralDocuments.proofOfCollateral.length === 0}
                        >
                            {isUploading ? 'Uploading...' : 'Upload Images'}
                        </button>
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
                </form>
            )}

            {modalOpen && (
                <FilePreview isOpen={modalOpen} content={modalContent} onClose={closeModal} />
            )}
        </>
    );
}