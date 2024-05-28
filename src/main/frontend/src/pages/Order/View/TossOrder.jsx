import React, { useEffect, useState } from 'react';

const App = () => {
  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
  const customerKey = 'YbX2HuSlsC9uVJW6NMRMj';
  const initialAmount = 15000;
  const couponAmount = 5000;
  const [amount, setAmount] = useState(initialAmount);
  const [paymentWidget, setPaymentWidget] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1/payment-widget';
    script.async = true;
    script.onload = () => {
      const widget = window.PaymentWidget(clientKey, customerKey);
      setPaymentWidget(widget);
      const methods = widget.renderPaymentMethods('#payment-method', amount);
      setPaymentMethods(methods);
      widget.renderAgreement('#agreement');
    };
    document.body.appendChild(script);
  }, [clientKey, customerKey, amount]);

  const handlePayment = () => {
    if (paymentWidget) {
      paymentWidget.requestPayment({
        orderId: 'AD8aZDpbzXs4EQa-UkIX6',
        orderName: '토스 티셔츠',
        successUrl: 'http://localhost:8080/success',
        failUrl: 'http://localhost:8080/fail',
        customerEmail: 'customer123@gmail.com',
        customerName: '김토스'
      }).catch(error => {
        if (error.code === 'USER_CANCEL') {
          // 결제 고객이 결제창을 닫았을 때 에러 처리
        } else if (error.code === 'INVALID_CARD_COMPANY') {
          // 유효하지 않은 카드 코드에 대한 에러 처리
        }
      });
    }
  };

  const handleCouponToggle = (e) => {
    if (e.target.checked) {
      setAmount(initialAmount - couponAmount);
      if (paymentMethods) {
        paymentMethods.updateAmount(initialAmount - couponAmount, '쿠폰');
      }
    } else {
      setAmount(initialAmount);
      if (paymentMethods) {
        paymentMethods.updateAmount(initialAmount);
      }
    }
  };

  const styles = {
    paymentButton: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#3065AC',
      color: 'white',
      borderRadius: '3px',
      fontSize: '16px',
      border: 'none',
      marginTop: '10px'
    },
    title: {
      margin: '0 0 4px',
      fontSize: '24px',
      fontWeight: '600',
      color: '#4e5968'
    }
  };

  return (
    <div className="App">
      <div style={styles.title}>상품 정보</div>
      <p>토스 티셔츠</p>
      <p>결제 금액: {amount.toLocaleString()}원</p>
      <form id="discount-coupon">
        <input type="checkbox" id="coupon" onChange={handleCouponToggle} />5,000원 할인받기
      </form>
      <hr />

      <div style={styles.title}>결제 방법</div>
      <div id="payment-method"></div>
      <div id="agreement"></div>
      <button style={styles.paymentButton} id="payment-button" onClick={handlePayment}>결제하기</button>
    </div>
  );
};

export default App;
