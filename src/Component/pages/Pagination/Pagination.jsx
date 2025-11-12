// Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import styles from './Pagination.module.css';

const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    showItemsPerPageSelector = true,
    showPageInfo = true,
    itemsPerPageOptions = [5, 10, 15, 20, 25],
    maxVisiblePages = 5
}) => {
    // Calculate visible page numbers
    const getVisiblePages = () => {
        const pages = [];
        const halfVisible = Math.floor(maxVisiblePages / 2);
        
        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        // Adjust start page if we're near the end
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    if (totalPages <= 1) {
        return null; // Don't show pagination if there's only one page
    }

    return (
        <div className={styles.paginationContainer}>
            {showPageInfo && (
                <div className={styles.pageInfo}>
                    <span className={styles.itemCount}>
                        Showing {startItem}-{endItem} of {totalItems} emails
                    </span>
                </div>
            )}

            <div className={styles.paginationControls}>
                {/* Items per page selector */}
                {showItemsPerPageSelector && (
                    <div className={styles.itemsPerPageContainer}>
                        <label className={styles.itemsPerPageLabel}>
                            Show:
                        </label>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                            className={styles.itemsPerPageSelect}
                        >
                            {itemsPerPageOptions.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <span className={styles.itemsPerPageLabel}>per page</span>
                    </div>
                )}

                {/* Pagination buttons */}
                <div className={styles.paginationButtons}>
                    {/* First page button */}
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        className={`${styles.paginationButton} ${styles.navButton}`}
                        title="First page"
                    >
                        <ChevronsLeft size={16} />
                    </button>

                    {/* Previous page button */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`${styles.paginationButton} ${styles.navButton}`}
                        title="Previous page"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {/* Page number buttons */}
                    {visiblePages[0] > 1 && (
                        <>
                            <button
                                onClick={() => onPageChange(1)}
                                className={styles.paginationButton}
                            >
                                1
                            </button>
                            {visiblePages[0] > 2 && (
                                <span className={styles.ellipsis}>...</span>
                            )}
                        </>
                    )}

                    {visiblePages.map(page => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`${styles.paginationButton} ${
                                page === currentPage ? styles.active : ''
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    {visiblePages[visiblePages.length - 1] < totalPages && (
                        <>
                            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                                <span className={styles.ellipsis}>...</span>
                            )}
                            <button
                                onClick={() => onPageChange(totalPages)}
                                className={styles.paginationButton}
                            >
                                {totalPages}
                            </button>
                        </>
                    )}

                    {/* Next page button */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`${styles.paginationButton} ${styles.navButton}`}
                        title="Next page"
                    >
                        <ChevronRight size={16} />
                    </button>

                    {/* Last page button */}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`${styles.paginationButton} ${styles.navButton}`}
                        title="Last page"
                    >
                        <ChevronsRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;