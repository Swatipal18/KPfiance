import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const baseUrl = import.meta.env.VITE_API_URL;
export const useAddCustomer = () => {
    const navigate = useNavigate();
    // React Hook Form setup with KYC fields
    const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            contact: '',
            alternateContact: '',
            address: '',
            city: '',
            email: '',
            aadharCardImage: '',
            panCardImage: '',
            otherDocumentImage: [],
            ocupation: '',
            companyName: '',
            monthlyIncome: '',
            companyAddress: '',
            otherDocumentImageForOcupationDetails: [],
            loanId: '',
            requestedAmount: '',
            interestRateType: '',
            interestRate: '',
            tenureType: '',
            tenure: '',
            startDate: '',
            endDate: '',
            emiDate: '',
            collateralDocumentImage: [],
            collateralType: '',
            collateralValue: '',
            accountType: '',
            accountNumber: '',
            ifscCode: '',
            bankName: '',
            fullNameAsPerAccount: '',
            bankDocumentImage: []
        }
    });

    const [activeSection, setActiveSection] = useState('basicDetails');
    const [loading, setLoading] = useState(false);

    // Store all section data including files
    const [allSectionData, setAllSectionData] = useState({
        basicDetails: {},
        kycDocuments: {},
        occupationDetails: {},
        loanDetails: {},
        collateral: {},
        bankDetails: {}
    });

    // Store actual file objects separately (not in form)
    const [fileData, setFileData] = useState({
        aadharCard: null,
        panCard: null,
        otherDocuments: []
    });

    const [sectionStatus, setSectionStatus] = useState({
        kycDocuments: 'Pending',
        occupationDetails: 'Pending',
        loanDetails: 'Pending',
        collateral: 'Pending',
        bankDetails: 'Pending'
    });

    // Load draft data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('customerDraft');
        if (savedData) {
            const parsedData = JSON.parse(savedData);

            // Set basic details in form
            if (parsedData.name) setValue('name', parsedData.name);
            if (parsedData.contact) setValue('contact', parsedData.contact);
            if (parsedData.alternateContact) setValue('alternateContact', parsedData.alternateContact);
            if (parsedData.address) setValue('address', parsedData.address);
            if (parsedData.city) setValue('city', parsedData.city);
            if (parsedData.email) setValue('email', parsedData.email);

            // Set KYC image URLs in form (if already uploaded)
            if (parsedData.aadharCardImage) setValue('aadharCardImage', parsedData.aadharCardImage);
            if (parsedData.panCardImage) setValue('panCardImage', parsedData.panCardImage);
            if (parsedData.otherDocumentImage) setValue('otherDocumentImage', parsedData.otherDocumentImage);

            // Set all section data
            setAllSectionData(prev => ({
                ...prev,
                basicDetails: parsedData.basicDetails || {},
                kycDocuments: parsedData.kycDocuments || {},
                occupationDetails: parsedData.occupationDetails || {},
                loanDetails: parsedData.loanDetails || {},
                collateral: parsedData.collateral || {},
                bankDetails: parsedData.bankDetails || {}
            }));

            // Update section status from saved data
            const newStatus = { ...sectionStatus };
            if (parsedData.aadharCardImage || parsedData.panCardImage) {
                newStatus.kycDocuments = 'Complete';
            }
            if (parsedData.ocupation) {
                newStatus.occupationDetails = 'Complete';
            }
            if (parsedData.loanId) {
                newStatus.loanDetails = 'Complete';
            }
            if (parsedData.collateralType) {
                newStatus.collateral = 'Complete';
            }
            if (parsedData.accountNumber) {
                newStatus.bankDetails = 'Complete';
            }
            setSectionStatus(newStatus);

            toast.success('Draft loaded successfully!');
        }
    }, [setValue]);

    // Handle back navigation
    const handleBack = () => {
        navigate(-1);
    };

    // Save as draft
    const handleSaveAsDraft = () => {
        const currentData = getValues();
        const draftData = {
            basicDetails: {
                name: currentData.name,
                contact: currentData.contact,
                alternateContact: currentData.alternateContact,
                address: currentData.address,
                city: currentData.city,
                email: currentData.email,
                aadharCardImage: currentData.aadharCardImage,
                panCardImage: currentData.panCardImage,
                otherDocumentImage: currentData.otherDocumentImage
            },
            kycDocuments: allSectionData.kycDocuments,
            occupationDetails: allSectionData.occupationDetails,
            loanDetails: allSectionData.loanDetails,
            collateral: allSectionData.collateral,
            bankDetails: allSectionData.bankDetails,
            // Also save flat data for backward compatibility
            ...currentData,
            ...allSectionData.kycDocuments,
            ...allSectionData.occupationDetails,
            ...allSectionData.loanDetails,
            ...allSectionData.collateral,
            ...allSectionData.bankDetails
        };
        localStorage.setItem('customerDraft', JSON.stringify(draftData));
        toast.success('Draft saved successfully!');
    };

    // Clear draft
    const handleClearDraft = () => {
        if (window.confirm('Are you sure you want to clear the draft?')) {
            localStorage.removeItem('customerDraft');
            localStorage.removeItem('customerDraft-kyc');
            reset();
            setFileData({
                aadharCard: null,
                panCard: null,
                otherDocuments: []
            });
            setAllSectionData({
                basicDetails: {},
                kycDocuments: {},
                occupationDetails: {},
                loanDetails: {},
                collateral: {},
                bankDetails: {}
            });
            setSectionStatus({
                kycDocuments: 'Pending',
                occupationDetails: 'Pending',
                loanDetails: 'Pending',
                collateral: 'Pending',
                bankDetails: 'Pending'
            });
            toast.success('Draft cleared successfully!');
        }
    };

    // Upload files to media/upload API
    const uploadFiles = async (files, placeName) => {
        const uploadedUrls = [];

        for (const file of files) {
            if (!file) continue;

            const formDataToSend = new FormData();
            formDataToSend.append('files', file);
            formDataToSend.append('placeName', placeName);

            try {
                const response = await axios.post(`${baseUrl}/media/upload`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('response: ', response.data);

                uploadedUrls.push(response.data.url || response.data.filePath || response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            }
        }

        return uploadedUrls;
    };

    // Save basic details and create user via API
    const handleSave = async (data) => {
        console.log('Saving basic details:', data);
        try {
            setLoading(true);

            // Validate all sections are complete
            const incompleteSections = Object.entries(sectionStatus)
                .filter(([_, status]) => status === 'Pending')
                .map(([section]) => section);

            if (incompleteSections.length > 0) {
                toast.error(`Please complete: ${incompleteSections.join(', ')}`);
                return;
            }

            // Validate basic details
            if (!data.name || !data.contact || !data.address || !data.city || !data.email) {
                toast.error('Please fill all required basic details');
                return;
            }

            // Update allSectionData
            setAllSectionData(prev => ({
                ...prev,
                basicDetails: data
            }));

            // Prepare complete data from allSectionData and form values
            const completeData = {
                // Basic Details
                name: data.name,
                contact: data.contact,
                alternateContact: data.alternateContact || '',
                address: data.address,
                city: data.city,
                email: data.email,

                // KYC Documents (URLs from uploaded files)
                aadharCardImage: allSectionData.kycDocuments.aadharCardImage || data.aadharCardImage || '',
                panCardImage: allSectionData.kycDocuments.panCardImage || data.panCardImage || '',
                otherDocumentImage: allSectionData.kycDocuments.otherDocumentImage || data.otherDocumentImage || [],

                // Occupation Details
                ocupation: allSectionData.occupationDetails.occupation || '',
                companyName: allSectionData.occupationDetails.companyName || '',
                monthlyIncome: allSectionData.occupationDetails.monthlyIncome || 0,
                companyAddress: allSectionData.occupationDetails.companyAddress || '',
                otherDocumentImageForOcupationDetails: allSectionData.occupationDetails.otherDocumentImageForOcupationDetails || [],

                // Loan Details
                loanId: allSectionData.loanDetails.loanId || '',
                requestedAmount: allSectionData.loanDetails.requestedAmount || 0,
                interestRateType: allSectionData.loanDetails.interestRateType || '',
                interestRate: allSectionData.loanDetails.interestRate || 0,
                tenureType: allSectionData.loanDetails.tenureType || '',
                tenure: allSectionData.loanDetails.tenure || 0,
                startDate: allSectionData.loanDetails.startDate || '',
                endDate: allSectionData.loanDetails.endDate || '',
                emiDate: allSectionData.loanDetails.emiDate || '',

                // Collateral
                collateralDocumentImage: allSectionData.collateral.collateralDocuments || allSectionData.collateral.collateralDocumentImage || [],
                collateralType: allSectionData.collateral.collateralType || '',
                collateralValue: allSectionData.collateral.collateralValue || 0,

                // Bank Details
                accountType: allSectionData.bankDetails.accountType || '',
                accountNumber: allSectionData.bankDetails.accountNumber || '',
                ifscCode: allSectionData.bankDetails.ifscCode || '',
                bankName: allSectionData.bankDetails.bankName || '',
                fullNameAsPerAccount: allSectionData.bankDetails.fullNameAsPerAccount || '',
                bankDocumentImage: allSectionData.bankDetails.bankDocumentImage || []
            };

            console.log('Complete data for submission:', completeData);

            // Call user/create API with all data
            const response = await axios.post(`${baseUrl}/user/create`, completeData);

            console.log('User created:', response.data.data);
            toast.success('Customer added successfully!');

            // Clear draft after successful creation
            localStorage.removeItem('customerDraft');
            localStorage.removeItem('customerDraft-kyc');
            reset();
            setFileData({
                aadharCard: null,
                panCard: null,
                otherDocuments: []
            });
            setAllSectionData({
                basicDetails: {},
                kycDocuments: {},
                occupationDetails: {},
                loanDetails: {},
                collateral: {},
                bankDetails: {}
            });
            setSectionStatus({
                kycDocuments: 'Pending',
                occupationDetails: 'Pending',
                loanDetails: 'Pending',
                collateral: 'Pending',
                bankDetails: 'Pending'
            });

            // Navigate back or to success page
            setTimeout(() => {
                navigate(-1);
            }, 1500);

            return response.data;
        } catch (error) {
            console.error('Error saving customer:', error);
            toast.error('Failed to save customer: ' + (error.response?.data?.message || error.message));
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Generate loan form - Now just validates and confirms
    const handleGenerateLoanForm = async () => {
        try {
            setLoading(true);
            const basicData = getValues();

            // Validate all sections are complete
            const incompleteSections = Object.entries(sectionStatus)
                .filter(([_, status]) => status === 'Pending')
                .map(([section]) => section);

            if (incompleteSections.length > 0) {
                toast.error(`Please complete: ${incompleteSections.join(', ')}`);
                return;
            }

            // Validate basic details
            if (!basicData.name || !basicData.contact || !basicData.address || !basicData.city || !basicData.email) {
                toast.error('Please fill all required basic details');
                return;
            }

            toast.success('All sections completed! Ready to submit.');
            return true;
        } catch (error) {
            console.error('Error validating loan form:', error);
            toast.error('Validation failed: ' + error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Toggle section
    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    // Open specific section
    const openSection = (sectionName) => {
        setActiveSection(sectionName);
    };

    // Close section and return to basic details
    const closeSection = () => {
        setActiveSection('basicDetails');
    };

    // Handle section save
    const handleSectionSave = async (sectionName, data) => {
        console.log('Saving section:', sectionName, data);
        try {
            setLoading(true);

            let processedData = { ...data };

            // Handle KYC Documents section
            if (sectionName === 'kycDocuments') {
                const { aadharCard, panCard, otherDocuments, ...restData } = data;

                // Store file objects
                setFileData({
                    aadharCard,
                    panCard,
                    otherDocuments: otherDocuments || []
                });

                // Upload Aadhar Card
                if (aadharCard) {
                    toast.loading('Uploading Aadhar Card...');
                    const urls = await uploadFiles([aadharCard], 'KYC Documents');
                    processedData.aadharCardImage = urls[0];
                    setValue('aadharCardImage', urls[0]); // Set in form
                    toast.dismiss();
                }

                // Upload PAN Card
                if (panCard) {
                    toast.loading('Uploading PAN Card...');
                    const urls = await uploadFiles([panCard], 'KYC Documents');
                    processedData.panCardImage = urls[0];
                    setValue('panCardImage', urls[0]); // Set in form
                    toast.dismiss();
                }

                // Upload Other Documents (multiple files)
                if (otherDocuments && otherDocuments.length > 0) {
                    toast.loading('Uploading Other Documents...');
                    const urls = await uploadFiles(otherDocuments, 'KYC Documents');
                    processedData.otherDocumentImage = urls;
                    setValue('otherDocumentImage', urls); // Set in form as array
                    toast.dismiss();
                }

                // Remove file objects, keep only URLs
                delete processedData.aadharCard;
                delete processedData.panCard;
                delete processedData.otherDocuments;
            }

            // Handle Occupation Details section
            if (sectionName === 'occupationDetails' && data.documents) {
                toast.loading('Uploading Occupation Documents...');
                const urls = await uploadFiles(data.documents, 'Occupation Details');
                processedData.otherDocumentImageForOcupationDetails = urls;
                delete processedData.documents;
                toast.dismiss();
            }

            // Handle Collateral section
            if (sectionName === 'collateral' && data.documents) {
                toast.loading('Uploading Collateral Documents...');
                const urls = await uploadFiles(data.documents, 'Collateral');
                processedData.collateralDocuments = urls;
                processedData.collateralDocumentImage = urls;
                delete processedData.documents;
                toast.dismiss();
            }

            // Handle Bank Details section
            if (sectionName === 'bankDetails' && data.documents) {
                toast.loading('Uploading Bank Documents...');
                const urls = await uploadFiles(data.documents, 'Bank Details');
                processedData.bankDocumentImage = urls;
                delete processedData.documents;
                toast.dismiss();
            }

            // Update allSectionData with processed data
            setAllSectionData(prev => ({
                ...prev,
                [sectionName]: processedData
            }));

            // Update localStorage with all data
            const basicData = getValues();
            const updatedDraft = {
                basicDetails: {
                    name: basicData.name,
                    contact: basicData.contact,
                    alternateContact: basicData.alternateContact,
                    address: basicData.address,
                    city: basicData.city,
                    email: basicData.email
                },
                kycDocuments: sectionName === 'kycDocuments' ? processedData : allSectionData.kycDocuments,
                occupationDetails: sectionName === 'occupationDetails' ? processedData : allSectionData.occupationDetails,
                loanDetails: sectionName === 'loanDetails' ? processedData : allSectionData.loanDetails,
                collateral: sectionName === 'collateral' ? processedData : allSectionData.collateral,
                bankDetails: sectionName === 'bankDetails' ? processedData : allSectionData.bankDetails,
                // Also save flat data
                ...basicData,
                ...(sectionName === 'kycDocuments' ? processedData : allSectionData.kycDocuments),
                ...(sectionName === 'occupationDetails' ? processedData : allSectionData.occupationDetails),
                ...(sectionName === 'loanDetails' ? processedData : allSectionData.loanDetails),
                ...(sectionName === 'collateral' ? processedData : allSectionData.collateral),
                ...(sectionName === 'bankDetails' ? processedData : allSectionData.bankDetails)
            };
            localStorage.setItem('customerDraft', JSON.stringify(updatedDraft));

            // Update section status
            setSectionStatus(prev => ({
                ...prev,
                [sectionName]: 'Complete'
            }));

            // Close section after save
            setActiveSection('basicDetails');

            toast.success(`${sectionName.replace(/([A-Z])/g, ' $1').trim()} saved successfully!`);
            return processedData;
        } catch (error) {
            console.error(`Error saving ${sectionName}:`, error);
            toast.error(`Failed to save ${sectionName}: ` + (error.response?.data?.message || error.message));
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Reset form
    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset the form?')) {
            reset();
            toast.success('Form reset successfully!');
        }
    };

    return {
        // React Hook Form methods
        register,
        handleSubmit,
        reset,
        errors,

        // State
        activeSection,
        sectionStatus,
        loading,
        allSectionData,
        fileData,

        // Handlers
        handleBack,
        handleSaveAsDraft,
        handleClearDraft,
        handleSave,
        handleGenerateLoanForm,
        toggleSection,
        openSection,
        closeSection,
        handleSectionSave,
        handleReset,
        uploadFiles
    };
};