package portal.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.InvoiceDao;
import portal.models.Invoice;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
public class InvoiceController {
	
	@Autowired
	private InvoiceDao invoiceDao;
	
	@RequestMapping(value = "/invoice/getAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Invoice> getAllInvoices(){
		return invoiceDao.findAll();
	}
	
	@RequestMapping(value = "/invoice/save", method = RequestMethod.POST)
	public void saveInvoices(@RequestBody Invoice invoice){
		invoiceDao.save(invoice);
	}

}
