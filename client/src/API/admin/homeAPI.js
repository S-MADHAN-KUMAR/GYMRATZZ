import { ADMIN_API } from "../API";

export const fetchSalesReport = async (filters, setReport, setError) => {
    try {
      // Check if startDate is provided but endDate is missing
      if (filters.startDate && !filters.endDate) {
        filters.endDate = filters.startDate;
      }
  
      const response = await ADMIN_API.post('/admin/sales_report', null, {
        params: {
          startDate: filters.startDate,
          endDate: filters.endDate,
        },
      });
  
      setReport(response.data);
      console.log(response?.data);
    } catch (error) {
      console.error('Error fetching sales report:', error);
      setError('Failed to fetch sales report. Please try again.');
    }
  };