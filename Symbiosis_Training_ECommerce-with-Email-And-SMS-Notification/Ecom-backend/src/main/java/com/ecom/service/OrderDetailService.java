package com.ecom.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.configuration.JwtRequestFilter;
import com.ecom.dao.AddressDao;
import com.ecom.dao.CartDao;
import com.ecom.dao.OrderDetailDao;
import com.ecom.dao.ProductDao;
import com.ecom.dao.UserDao;
import com.ecom.entity.Address;
import com.ecom.entity.Cart;
import com.ecom.entity.OrderDetail;
import com.ecom.entity.OrderInput;
import com.ecom.entity.OrderProductQuantity;
import com.ecom.entity.Product;
import com.ecom.entity.User;

@Service
public class OrderDetailService {

    private static final String ORDER_PLACED = "Placed";

    @Autowired
    private OrderDetailDao orderDetailDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private CartDao cartDao;

    @Autowired
    private AddressDao addressDao;
    @Autowired
    private MailService mailService;

    @Autowired
    private SmsService smsService;

    public List<OrderDetail> getAllOrderDetails() {
    	return (List<OrderDetail>) orderDetailDao.findAll();
    }

    public List<OrderDetail> getOrderDetails() {
        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user = userDao.findById(currentUser).orElse(null);
        return orderDetailDao.findByUser(user);
    }

    public void placeOrder(OrderInput orderInput, boolean isSingleProductCheckout) {
        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user = userDao.findById(currentUser).orElse(null);

        // 🔍 Check if user has a saved address
        List<Address> savedAddresses = addressDao.findByUser(user);
        Address selectedAddress;

        if (!savedAddresses.isEmpty()) {
            // Use the first saved address (or later add logic to select by ID)
            selectedAddress = savedAddresses.get(0);
        } else {
            // Create a new Address entry from orderInput
            selectedAddress = new Address();
            selectedAddress.setFullName(orderInput.getFullName());
            selectedAddress.setFullAddress(orderInput.getFullAddress());
            selectedAddress.setContactNumber(orderInput.getContactNumber());
            selectedAddress.setAlternateContactNumber(orderInput.getAlternateContactNumber());
            selectedAddress.setUser(user);
            addressDao.save(selectedAddress); // Save new address
        }

        for (OrderProductQuantity o : orderInput.getOrderProductQuantityList()) {
            Product product = productDao.findById(o.getProductId()).orElse(null);

            if (product == null) continue;

            OrderDetail orderDetail = new OrderDetail(
                    selectedAddress.getFullName(),
                    selectedAddress.getFullAddress(),
                    selectedAddress.getContactNumber(),
                    selectedAddress.getAlternateContactNumber(),
                    ORDER_PLACED,
                    product.getProductDiscountedPrice() * o.getQuantity(),
                    product,
                    user
            );
            

            orderDetailDao.save(orderDetail);
            String details = String.format(
            	    "Hi %s,\nYour order #ORD%s of ₹%.2f is confirmed!\nDelivery expected by %s.",
            	    user.getUserFirstName(),
            	    orderDetail.getOrderId(),
            	    orderDetail.getOrderAmount(),
            	    LocalDate.now().plusDays(3).toString()
            	);

            	mailService.sendOrderConfirmationEmail(
            	    user.getUserEmail(), 
            	    user.getUserFirstName(), 
            	    orderDetail, 
            	    orderInput.getOrderProductQuantityList()
            	);

            	smsService.sendOrderConfirmationSms(
            	    orderDetail.getOrderContactNumber(),
            	    user.getUserFirstName(),
            	    orderDetail.getOrderId(),
            	    orderDetail.getOrderAmount()
            	);
        }

        // 🛒 Clear cart if it's a full checkout
        if (!isSingleProductCheckout) {
            cartDao.findByUser(user).forEach(cart -> cartDao.deleteById(cart.getCartId()));
        }
    }
}
