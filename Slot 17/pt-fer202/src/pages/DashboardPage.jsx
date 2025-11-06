import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';
import { usePayment } from '../contexts/PaymentContext';

const DashboardPage = () => {
    const { fetchPayments, loading, error } = usePayment();

    // Fetch payments when component mounts
    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    return (
        <>
            <NavigationHeader />
            <Container>
                <FilterBar />
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                {loading ? (
                    <div className="text-center p-4">Loading...</div>
                ) : (
                    <PaymentTable />
                )}
            </Container>
        </>
    );
};

export default DashboardPage;