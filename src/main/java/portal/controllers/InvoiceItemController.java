package portal.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.InvoiceItemDao;
import portal.models.Invoice;
import portal.models.InvoiceItem;

@RestController
public class InvoiceItemController {

	@Autowired
	private InvoiceItemDao invoiceItemDao;
	
	private final Logger logger = (Logger) LoggerFactory.getLogger(InvoiceItemController.class);

	@ResponseBody
	@RequestMapping(value = "/invoice_item/getFor", method = RequestMethod.POST)
	public List<InvoiceItem> findByInvoice(@RequestBody Invoice invoice) {
		logger.info("Getting items for Invoice {}", invoice);
		return invoiceItemDao.findByInvoice(invoice);
	}
	
	@RequestMapping(value = "/invoice_item/delete", method = RequestMethod.POST)
	public void deleteInvoiceItem(@RequestBody InvoiceItem invoiceItem) {
		logger.info("Deleting invoice item {}", invoiceItem);
		invoiceItemDao.delete(invoiceItem);
	}
	
}
