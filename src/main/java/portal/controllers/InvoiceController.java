package portal.controllers;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.InvoiceDao;
import portal.models.Invoice;
import portal.models.constants.InvoiceStatuses;

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

	@Transactional
	@RequestMapping(value = "/invoice/save", method = RequestMethod.POST)
	public void saveInvoice(@RequestBody Invoice invoice) throws Exception{
		boolean invoiceExists = (invoiceDao.findByInvoiceNumber(invoice.getInvoiceNumber()) != null);
		if(invoiceExists) {
			throw new Exception("Invoice with same number already exists");
		}
		
		invoiceDao.save(invoice);
	}
	
	@Transactional
	@RequestMapping(value = "/invoice/update", method = RequestMethod.POST)
	public void updateInvoice(@RequestBody Invoice invoice){
		invoiceDao.save(invoice);
	}
	
	@ResponseBody
	@RequestMapping(value = "/invoice_status/getAll", method = RequestMethod.GET)
	public List<String> getAllInvoiceStatuses(){
		return InvoiceStatuses.getAll();
	}
	
	@Transactional
	@RequestMapping(value = "/invoice/delete", method = RequestMethod.POST)
	public void deleteCompany(@RequestBody Invoice invoice) throws Exception{
		invoiceDao.delete(invoiceDao.findOne(invoice.getInvoiceId()));
	}
	

}
