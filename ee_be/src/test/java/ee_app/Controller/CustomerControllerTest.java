package ee_app.Controller;

import ee_app.entity.Customer;
import ee_app.service.CustomerService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(CustomerController.class)
public class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private CustomerService customerService;

    @InjectMocks
    private CustomerController customerController;

    @Test
    public void testGetCustomers() throws Exception {

        Customer customer1 = new Customer(1L, "John", "Doe", "john",  "1234");
        Customer customer2 = new Customer(2L, "Jane", "Doe", "jane",  "1234");
        List<Customer> customers = Arrays.asList(customer1, customer2);


        when(customerService.getAllCustomers()).thenReturn(customers);

        mockMvc.perform(get("/api/customers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].firstName").value("John"))
                .andExpect(jsonPath("$[1].firstName").value("Jane"))
                .andExpect(jsonPath("$[0].lastName").value("Doe"));


        verify(customerService, times(1)).getAllCustomers();
    }

    @Test
    public void testGetCustomersNoData() throws Exception {

        when(customerService.getAllCustomers()).thenReturn(Arrays.asList());


        mockMvc.perform(get("/api/customers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());

        verify(customerService, times(1)).getAllCustomers();
    }

    @Test
    public void testCreateCustomer() throws Exception {
        Customer newCustomer = new Customer(null, "John", "Doe", "John",  "1234");
        Customer createdCustomer = new Customer(1L, "John", "Doe",  "John",  "1234");

        when(customerService.saveCustomer(any(Customer.class))).thenReturn(createdCustomer);

        mockMvc.perform(post("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":1,\"firstName\":\"John\",\"lastName\":\"Doe\",\"username\":\"john\",\"password\":\"123456789\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"));

        verify(customerService, times(1)).saveCustomer(any(Customer.class));
    }


    @Test
    public void testCreateCustomerInvalidData() throws Exception {
        mockMvc.perform(post("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"firstName\": \"\", \"lastName\": \"\"}"))
                .andExpect(status().isBadRequest());

        verify(customerService, times(0)).saveCustomer(any(Customer.class));
    }


}
