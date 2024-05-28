import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function SuccessPage({orderData}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const confirm = async () => {
      const orderId = searchParams.get('orderId');
      const amount = searchParams.get('amount');
      const paymentKey = searchParams.get('paymentKey');

      const requestData = {
        orderId,
        amount,
        paymentKey,
      };
      
      try {
        const response = await fetch('ft/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const json = await response.json();

        if (!response.ok) {
          navigate(`/fail?message=${json.message}&code=${json.code}`);
          return;
        }

        // 결제 성공 시 처리할 로직을 여기에 추가하세요.
        // 예: navigate(`/success?orderId=${json.orderId}`);
      } catch (error) {
        console.error('Error confirming payment:', error);
      }
    };

    confirm();
  }, [navigate, searchParams]);

  useEffect(() =>{
    const interval  = setInterval (() =>{
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/'); // Replace '/' with your home page path
    }
  }, [countdown, navigate]);
  
  return (
    <Card variant="outlined" style={{ maxWidth: 400, margin: 'auto', marginTop: 50, padding: 20, marginBottom: 50 }}>
      <CardContent>
        <Typography variant="h5" component="h1">
          결제 성공
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {`주문번호: ${searchParams.get('orderId')}`}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {`결제 금액: ${Number(searchParams.get('amount')).toLocaleString()}원`}
        </Typography>
        <Typography>
          {`${countdown}초 후에 홈페이지로 이동합니다`}
        </Typography>
      </CardContent>
    </Card>
  );
}