package com.ecom.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ecom.dao.ProductDao;
import com.ecom.entity.OrderDetail;
import com.ecom.entity.OrderProductQuantity;
import com.ecom.entity.Product;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private ProductDao productdao;

    public void sendOrderConfirmationEmail(String toEmail, String customerName, OrderDetail orderDetail, List<OrderProductQuantity> items) {
        StringBuilder orderItems = new StringBuilder();
        for (OrderProductQuantity item : items) {
            Product product = productdao.findById(item.getProductId()).orElse(null);
            if (product != null) {
                orderItems.append(String.format("%s × %d - ₹%.2f\n",
                    product.getProductName(),
                    item.getQuantity(),
                    product.getProductDiscountedPrice() * item.getQuantity()));
            }
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@yourstore.com");
        message.setTo(toEmail);
        message.setSubject("Your Order #ORD" + orderDetail.getOrderId() + " is Confirmed!");
        message.setText(String.format(
            "Hi %s,\n\nThank you for your order!\n\n" +
            "📌 Order Summary:\n─────────────────\n" +
            "Order Number: ORD%s\nOrder Date: %s\n" +
            "Total Amount: ₹%.2f\n\n" +
            "🚚 Delivery Address:\n%s\n%s\n%s\n\n" +
            "🛍️ Order Details:\n─────────────────\n%s\n" +
            "Thanks for shopping with us!",
            customerName,
            orderDetail.getOrderId(),
            LocalDate.now().toString(),
            orderDetail.getOrderAmount(),
            orderDetail.getOrderFullName(),
            orderDetail.getOrderFullOrder(),
            orderDetail.getOrderContactNumber(),
            orderItems.toString()
        ));
        
        mailSender.send(message);
    }
}
