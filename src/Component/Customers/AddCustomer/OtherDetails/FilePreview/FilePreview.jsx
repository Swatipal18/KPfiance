import React from 'react';
import styles from './FilePreview.module.css';

export default function FilePreview({ isOpen, content, onClose }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className={styles.modalCloseButton}>
                    ×
                </button>

                {content && content.type === 'pdf' ? (
                    <div className={styles.modalPdfContainer}>
                        <div className={styles.modalPdfIcon}>📄</div>
                        <div className={styles.modalPdfName}>{content.name}</div>
                        <a
                            href={content.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.pdfOpenLink}
                        >
                            Open PDF
                        </a>
                    </div>
                ) : content ? (
                    <img
                        src={content.url}
                        alt="Preview"
                        className={styles.modalImage}
                    />
                ) : null}
            </div>
        </div>
    );
}