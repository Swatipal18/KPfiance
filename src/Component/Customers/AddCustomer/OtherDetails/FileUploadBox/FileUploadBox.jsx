import React from 'react';
import styles from './FileUploadBox.module.css';
import { UploadFile } from '../../../../SvgIcon/SvgIcon';

/**
 * Reusable File Upload Component - Supports both single and multiple files
 * @param {string} label - Label for the upload field
 * @param {string} fieldName - Unique field identifier
 * @param {boolean} multiple - Allow multiple file uploads (default: false)
 * @param {object|array} preview - Single preview object or array of preview objects
 *        Preview object: {type: 'image'/'pdf', url: string, name?: string, id?: string}
 * @param {function} onFileSelect - Callback when file(s) selected (file/files, fieldName)
 * @param {function} onFileRemove - Callback when file is removed (fieldName, fileId for multiple)
 * @param {function} onPreviewClick - Callback when preview is clicked (preview, fieldName)
 */
export default function FileUploadBox({
    label,
    fieldName,
    multiple = false,
    preview,
    onFileSelect,
    onFileRemove,
    onPreviewClick
}) {
    const handleFileUpload = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            const maxSize = 20 * 1024 * 1024; // 20MB

            if (multiple) {
                // Handle multiple files
                const validFiles = [];
                const errors = [];

                Array.from(files).forEach(file => {
                    if (file.size > maxSize) {
                        errors.push(`${file.name}: File size exceeds 20MB`);
                    } else if (!allowedTypes.includes(file.type)) {
                        errors.push(`${file.name}: Only JPEG, PNG, and PDF files are allowed`);
                    } else {
                        validFiles.push(file);
                    }
                });

                if (errors.length > 0) {
                    alert(errors.join('\n'));
                }

                if (validFiles.length > 0 && onFileSelect) {
                    onFileSelect(validFiles, fieldName);
                }
            } else {
                // Handle single file
                const file = files[0];

                if (file.size > maxSize) {
                    alert('File size should not exceed 20MB');
                    return;
                }

                if (!allowedTypes.includes(file.type)) {
                    alert('Only JPEG, PNG, and PDF files are allowed');
                    return;
                }

                if (onFileSelect) {
                    onFileSelect(file, fieldName);
                }
            }
        }

        // Reset input
        e.target.value = '';
    };

    const handleRemove = (e, fileId = null) => {
        e.stopPropagation();
        if (onFileRemove) {
            onFileRemove(fieldName, fileId);
        }
    };

    const handlePreview = (previewItem) => {
        if (previewItem && onPreviewClick) {
            onPreviewClick(previewItem, fieldName);
        }
    };

    // Normalize preview to always be an array for easier rendering
    const previews = multiple
        ? (Array.isArray(preview) ? preview : [])
        : (preview ? [preview] : []);

    return (
        <div className={styles.formGroup}>
            <div className={styles.uploadContainer}>
                <div className={styles.uploadBox}>
                    <label className={styles.label}>{label}:</label>
                    <div className={styles.uploadButtonWrapper}>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            multiple={multiple}
                            onChange={handleFileUpload}
                            className={styles.fileInput}
                            id={`upload-${fieldName}`}
                        />
                        <label
                            htmlFor={`upload-${fieldName}`}
                            className={styles.uploadLabel}
                            style={{
                                width: "100%",
                                gap: "10px"
                            }}
                        >
                            <UploadFile />
                            Upload {multiple ? 'Files' : 'File'} (.jpeg, .png, .pdf) (Max. Size 20MB)
                        </label>
                    </div>
                </div>

                <div className={`${styles.previewBox} ${multiple ? styles.multiplePreview : ''}`}>
                    {previews.length > 0 ? (
                        multiple ? (
                            // Multiple files preview - Grid layout
                            <div className={styles.previewGrid}>
                                {previews.map((item, index) => (
                                    <div
                                        key={item.id || index}
                                        className={styles.previewItem}
                                        onClick={() => handlePreview(item)}
                                    >
                                        {item.type === 'pdf' ? (
                                            <div className={styles.pdfPreview}>
                                                <div className={styles.pdfIcon}>📄</div>
                                                <div className={styles.pdfName}>{item.name}</div>
                                            </div>
                                        ) : (
                                            <img
                                                src={item.url}
                                                alt={`Preview ${index + 1}`}
                                                className={styles.previewImage}
                                            />
                                        )}
                                        <button
                                            onClick={(e) => handleRemove(e, item.id || index)}
                                            className={styles.removeButton}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Single file preview
                            <>
                                {previews[0].type === 'pdf' ? (
                                    <div className={styles.pdfPreview}>
                                        <div className={styles.pdfIcon}>📄</div>
                                        <div className={styles.pdfName}>{previews[0].name}</div>
                                    </div>
                                ) : (
                                    <img
                                        src={previews[0].url}
                                        alt="Preview"
                                        className={styles.previewImage}
                                    />
                                )}
                                <button
                                    onClick={handleRemove}
                                    className={styles.removeButton}
                                >
                                    ×
                                </button>
                            </>
                        )
                    ) : (
                        <div className={styles.emptyPreview}>
                            <div>Preview</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}