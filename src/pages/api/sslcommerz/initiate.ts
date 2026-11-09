import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      total_amount,
      currency = 'BDT',
      tran_id,
      success_url,
      fail_url,
      cancel_url,
      cus_name,
      cus_email,
      cus_phone,
      cus_add1,
      cus_add2,
      cus_city,
      cus_state,
      cus_postcode,
      cus_country,
      shipping_method,
      num_of_item,
      product_name,
      product_category,
      product_profile,
      ...rest
    } = req.body;

    // Generate a unique transaction ID if not provided
    const transactionId = tran_id || `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Validate required fields
    const requiredFields = {
      total_amount,
      cus_name,
      cus_email,
      cus_phone,
      cus_add1,
      cus_city,
      cus_postcode,
      cus_country,
      success_url,
      fail_url,
      cancel_url
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value || value.toString().trim() === '')
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields
      });
    }

    const storeId = process.env.SSLCOMMERZ_STORE_ID;
    const storePassword = process.env.SSLCOMMERZ_STORE_PASSWORD;
    if (!storeId || !storePassword) {
      return res.status(500).json({
        success: false,
        message: 'Payment gateway is not configured',
      });
    }

    // Create form data using URLSearchParams
    const formData = new URLSearchParams();
    formData.append('store_id', storeId);
    formData.append('store_passwd', storePassword);
    formData.append('total_amount', total_amount.toString());
    formData.append('currency', currency);
    formData.append('tran_id', transactionId);
    formData.append('success_url', success_url);
    formData.append('fail_url', fail_url);
    formData.append('cancel_url', cancel_url);
    formData.append('cus_name', cus_name);
    formData.append('cus_email', cus_email);
    formData.append('cus_phone', cus_phone);
    formData.append('cus_add1', cus_add1);
    formData.append('cus_add2', cus_add2 || '');
    formData.append('cus_city', cus_city);
    formData.append('cus_state', cus_state || '');
    formData.append('cus_postcode', cus_postcode);
    formData.append('cus_country', cus_country);
    formData.append('shipping_method', shipping_method);
    formData.append('num_of_item', num_of_item.toString());
    formData.append('product_name', product_name);
    formData.append('product_category', product_category);
    formData.append('product_profile', product_profile);

    // Add any additional fields
    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    console.log('SSLCommerz Request Data:', Object.fromEntries(formData));

    // Use the correct v3 API endpoint
    const response = await axios.post(
      'https://sandbox.sslcommerz.com/gwprocess/v3/api.php',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('SSLCommerz Response:', response.data);

    if (response.data && response.data.status === 'VALID') {
      res.status(200).json({
        success: true,
        gatewayPageURL: response.data.GatewayPageURL,
        tran_id: response.data.tran_id,
        sessionkey: response.data.sessionkey,
        ...response.data
      });
    } else {
      console.error('SSLCommerz API Error Response:', response.data);
      res.status(400).json({
        success: false,
        message: response.data.errorMessage || response.data.status || 'Failed to initiate payment',
        ...response.data
      });
    }
  } catch (error: any) {
    console.error('SSLCommerz API Error:', error.response?.data || error.message);
    console.error('Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    res.status(500).json({
      success: false,
      message: error.response?.data?.errorMessage || error.response?.data?.status || error.message || 'Failed to connect to SSLCommerz',
      error: error.response?.data || error.message
    });
  }
} 