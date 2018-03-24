package portal.controllers;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.InvoiceDao;
import portal.dao.TransporterDao;
import portal.dao.VehicleDao;
import portal.models.Invoice;
import portal.models.Transporter;
import portal.models.Vehicle;
import portal.models.constants.InvoiceStatuses;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
public class InvoiceController {

	private static final Logger logger = (Logger) LoggerFactory.getLogger(InvoiceController.class);
	
	@Autowired
	private InvoiceDao invoiceDao;
	
	@Autowired
	private TransporterDao transporterDao;
	
	@Autowired
	private VehicleDao vehicleDao;

	@RequestMapping(value = "/invoice/getAll", method = RequestMethod.GET)
	@ResponseBody
	public List<Invoice> getAllInvoices() {
		logger.info("Fetching all invoices");
		return invoiceDao.findAll();
	}

	@Transactional
	@RequestMapping(value = "/invoice/save", method = RequestMethod.POST)
	public void saveInvoice(@RequestBody Invoice invoice) throws Exception {
		boolean invoiceExists = (invoiceDao.findByInvoiceNumber(invoice.getInvoiceNumber()) != null);
		if (invoiceExists) {
			throw new Exception("Invoice with same number already exists");
		}
		logger.info("Saving Invoice {}", invoice);
		updateDetails(invoice);
		invoiceDao.save(invoice);
	}

	private void updateDetails(Invoice invoice) {
		if(invoice.getTransporter() != null) {
			Transporter t = transporterDao.findOne(invoice.getTransporter().getTransporterId());
			if(t != null) {
				invoice.setTransporter(t);
			}
		}
		
		if(invoice.getVehicle() != null) {
			Vehicle v = vehicleDao.findOne(invoice.getVehicle().getVehicleNumber());
			if(v != null) {
				invoice.setVehicle(v);
			}
		}
	}

	@Transactional
	@RequestMapping(value = "/invoice/update", method = RequestMethod.POST)
	public void updateInvoice(@RequestBody Invoice invoice) {
		logger.info("Updating invoice {}", invoice);
		updateDetails(invoice);
		invoiceDao.save(invoice);
	}

	@ResponseBody
	@RequestMapping(value = "/invoice_status/getAll", method = RequestMethod.GET)
	public List<String> getAllInvoiceStatuses() {
		logger.info("Fetching all Invoice statuses");
		return InvoiceStatuses.getAll();
	}

	@Transactional
	@RequestMapping(value = "/invoice/delete", method = RequestMethod.POST)
	public void deleteCompany(@RequestBody Invoice invoice) throws Exception {
		logger.info("Deleting Invoice {}", invoice);
		invoiceDao.delete(invoiceDao.findOne(invoice.getInvoiceId()));
	}

}
