import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../../AddCustomer.module.css';
import { Reset } from '../../../../SvgIcon/SvgIcon';
import FilePreview from '../FilePreview/FilePreview';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import { toast } from 'react-hot-toast';

export default function OccupationDetails({ onSave, onClose }) {
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
      ocupation: 'Job - Salaried Person',
      companyName: '',
      monthlyIncome: '',
      companyAddress: '',
      otherDocumentImageForOcupationDetails: [],
    }
  });

  const [occupationDocuments, setOccupationDocuments] = useState({
    otherDocuments: []
  });

  const [previews, setPreviews] = useState({
    otherDocuments: []
  });

  const [uploadedUrls, setUploadedUrls] = useState({
    otherDocumentImages: []
  });

  const [isExpanded, setIsExpanded] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const watchedFields = watch();

  useEffect(() => {
    const savedData = localStorage.getItem('customerDraft-occupation');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setValue('ocupation', parsed.ocupation || 'Job - Salaried Person');
      setValue('companyName', parsed.companyName || '');
      setValue('monthlyIncome', parsed.monthlyIncome || '');
      setValue('companyAddress', parsed.companyAddress || '');

      setPreviews({
        otherDocuments: parsed.otherDocuments || []
      });

      setUploadedUrls({
        otherDocumentImages: parsed.otherDocumentImages || []
      });

      // Check if there are already uploaded URLs
      const hasUploadedFiles = parsed.otherDocumentImages && parsed.otherDocumentImages.length > 0;
      setIsUploadSuccess(hasUploadedFiles);
    }
  }, [setValue]);

  // Upload images to API
  const handleUploadImages = async () => {
    setIsUploading(true);
    setIsUploadSuccess(false);
    try {
      const newUploadedUrls = {
        otherDocumentImages: []
      };

      // Upload Other Documents together
      if (occupationDocuments.otherDocuments.length > 0) {
        const formData = new FormData();
        for (const doc of occupationDocuments.otherDocuments) {
          formData.append('files', doc);
        }
        formData.append('placeName', 'OcupationDetailsDocumentImage');

        const response = await axios.post(`${baseUrl}/media/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('response: ', response.data.data);

        if (response.data.success && response.data.data.length > 0) {
          newUploadedUrls.otherDocumentImages = response.data.data;
        }
      }

      setUploadedUrls(newUploadedUrls);

      // Save to localStorage
      const draftData = {
        ocupation: watchedFields.ocupation,
        companyName: watchedFields.companyName,
        monthlyIncome: watchedFields.monthlyIncome,
        companyAddress: watchedFields.companyAddress,
        otherDocuments: previews.otherDocuments,
        otherDocumentImages: newUploadedUrls.otherDocumentImages
      };
      localStorage.setItem('customerDraft-occupation', JSON.stringify(draftData));

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
      if (uploadedUrls.otherDocumentImages.length === 0) {
        toast.error('Please upload images first');
        return;
      }

      // Send data to parent component with uploaded URLs
      if (onSave) {
        onSave({
          ...data,
          otherDocumentImageForOcupationDetails: uploadedUrls.otherDocumentImages,
          status: 'Complete'
        });
      }

      toast.success('Occupation details saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save occupation details');
    }
  };

  const handleFileSelect = (file, fieldName) => {
    // Reset upload success when new files are selected
    setIsUploadSuccess(false);

    // Handle multiple files
    const files = Array.isArray(file) ? file : [file];
    setOccupationDocuments(prev => ({
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
  };

  const handleFileRemove = (fieldName, fileId = null) => {
    // Reset upload success when files are removed
    setIsUploadSuccess(false);

    if (fileId !== null) {
      // For otherDocuments, filter by id property
      setOccupationDocuments(prev => ({
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
        otherDocumentImages: prev.otherDocumentImages.filter((_, idx) => idx !== fileId)
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
      ocupation: 'Job - Salaried Person',
      companyName: '',
      monthlyIncome: '',
      companyAddress: ''
    });
    setOccupationDocuments({
      otherDocuments: []
    });
    setPreviews({
      otherDocuments: []
    });
    setUploadedUrls({
      otherDocumentImages: []
    });
    setIsUploadSuccess(false);
    localStorage.removeItem('customerDraft-occupation');
  };

  return (
    <>
      <div
        className={styles.sectionHeader}
        onClick={toggleSection}
      >
        <h2 className={styles.sectionTitle}>Occupation Details</h2>
        <span className={styles.toggleIcon}>
          {isExpanded ? '−' : '+'}
        </span>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.sectionContent}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Occupation Type:</label>
                <select
                  {...register('ocupation')}
                  className={`${styles.select} ${styles.occupationType}`}
                >
                  <option value="Job - Salaried Person">Job - Salaried Person</option>
                  <option value="Business">Business</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="Professional">Professional</option>
                </select>
                {errors.ocupation && (
                  <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
                    {errors.ocupation.message}
                  </span>
                )}
              </div>
              <div className={`${styles.formGroup} ${styles.lab}`} >
                <label className={styles.label}>Business / Company Name:</label>
                <input
                  type="text"
                  {...register('companyName')}
                  className={`${styles.input} ${styles.companyName}`}
                />
                {errors.companyName && (
                  <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
                    {errors.companyName.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Monthly Income:</label>
                <input
                  type="text"
                  {...register('monthlyIncome')}
                  className={`${styles.input} ${styles.monthlyIncome}`}
                />
                {errors.monthlyIncome && (
                  <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
                    {errors.monthlyIncome.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Company Address:</label>
                <textarea
                  {...register('companyAddress')}
                  className={`${styles.textarea} ${styles.companyAddress}`}
                  rows="3"
                />
                {errors.companyAddress && (
                  <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>
                    {errors.companyAddress.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
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
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.saveInlineButton}
              onClick={handleUploadImages}
              disabled={isUploading || occupationDocuments.otherDocuments.length === 0}
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