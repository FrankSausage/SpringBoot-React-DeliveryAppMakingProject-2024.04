import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useOrder, useTossOrder } from "../../pages/Order/Hook/useOrder"; 
import axios from "axios";

const widgetClientKey = process.env.REACT_APP_WIDGET_CLIENT_KEY;
const customerKey = process.env.REACT_APP_CUSTOMER_KEY;

export default function CheckoutPage(orderId) {
  const email = localStorage.getItem('email')
  const queryClient = useQueryClient();
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState('');
  const location = useLocation();
  const { orderData } = location.state || {};
  const navigate = useNavigate();

  // orderData의 구조가 맞는지 확인하여 수정이 필요할 수 있습니다.
  const { postOrderToss } = useTossOrder();
  const { deleteOrderByOrderId  } = useOrder(orderId);

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };
  
    fetchPaymentWidget();
  }, []);
  

  useEffect(() => {
    if (paymentWidget == null || !orderData) {
      return;
    }

    const totalPrice = orderData.totalPrice || 0;
    setPrice(totalPrice);

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: totalPrice },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement(
      "#agreement",
      { variantKey: "AGREEMENT" }
    );

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, orderData]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);
  
  console.log(orderData)

  const handlePaymentRequest = async () => {
    try {
      await postOrderToss.mutateAsync(orderData);
  
      await paymentWidget?.requestPayment({
        orderId: orderData.orderId,
        orderName: `${orderData.orderItems.length > 1 ? '외 ' + (orderData.orderItems.length - 1) + ', ' : ''}${orderData.orderItems[0].name}`,
        customerName: orderData.name || "", 
        customerEmail: email || "", 
        customerMobilePhone: orderData.tel ? orderData.tel.replace(/-/g, '') : "", 
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  const handleDelete = () => {
    deleteOrderByOrderId.mutate(orderId, {
      onSuccess: () => {navigate('/')}
    })
  }

  return (
    <div style={{ padding: 50, textAlign: 'center' }}>
      <Card>
        <CardContent>
          <div id="payment-widget" />
          <div id="agreement" />

          <div style={{ marginTop: 20 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="contained" style={{ backgroundColor: 'grey' }} onClick={handlePaymentRequest}>
                  결제하기
                </Button>
                <Button color="error" sx={{border:1, my: 1, width: 500}} onClick={() => handleDelete()}>주문내역 삭제</Button>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
