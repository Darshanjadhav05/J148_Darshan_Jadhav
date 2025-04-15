package com.ecom.service;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

@Service
public class SmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.no}")
    private String fromNumber;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
    }

    public void sendOrderConfirmationSms(String toNumber, String customerName, Integer orderId, double amount) {
        String smsText = String.format(
            "Order Confirmed! 🎉\n\nHi %s,\nYour order #ORD%s is confirmed.\n\n💰 Total: ₹%.2f\n\nThanks for shopping with us!",
            customerName,
            orderId,
            amount
        );
        
        Message.creator(
            new com.twilio.type.PhoneNumber(toNumber),
            new com.twilio.type.PhoneNumber(fromNumber),
            smsText
        ).create();
    }

}