package portal.controllers;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.InvoiceDao;
import portal.dao.PurchaseOrderDao;
import portal.dao.TransporterDao;
import portal.dao.VehicleDao;
import portal.models.Invoice;
import portal.models.InvoiceItem;
import portal.models.Transporter;
import portal.models.Vehicle;
import portal.models.constants.InvoiceStatuses;
import portal.models.constants.OrderStatuses;

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

	@Autowired
	private PurchaseOrderDao purchaseOrderDao;
	
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
		updateTransportAndVehicleDetails(invoice);
		setBackReferences(invoice);
		invoiceDao.save(invoice);
		updatePurchaseOrderStatus(invoice, OrderStatuses.DISPATCHED);
	}

	@Transactional
	@RequestMapping(value = "/invoice/update", method = RequestMethod.POST)
	public void updateInvoice(@RequestBody Invoice invoice) {
		logger.info("Updating invoice {}", invoice);
		updateTransportAndVehicleDetails(invoice);
		setBackReferences(invoice);
		invoiceDao.save(invoice);
		updatePurchaseOrderStatus(invoice, OrderStatuses.DISPATCHED);
	}

	@ResponseBody
	@RequestMapping(value = "/invoice_status/getAll", method = RequestMethod.GET)
	public List<String> getAllInvoiceStatuses() {
		logger.info("Fetching all Invoice statuses");
		return InvoiceStatuses.getAll();
	}

	@Transactional
	@RequestMapping(value = "/invoice/delete", method = RequestMethod.POST)
	public void deleteInvoice(@RequestBody Invoice invoice) throws Exception {
		logger.info("Deleting Invoice {}", invoice);
		invoiceDao.delete(invoiceDao.findOne(invoice.getInvoiceId()));
		updatePurchaseOrderStatus(invoice, OrderStatuses.ACCEPTED);
	}
	
	public void setBackReferences(Invoice invoice) {
		for(InvoiceItem item: invoice.getItems()) {
			item.setInvoice(invoice);
		}
	}

	private void updateTransportAndVehicleDetails(Invoice invoice) {
		if (invoice.getDispatchDetail() == null) {
			return;
		}
		invoice.getDispatchDetail().setInvoice(invoice);
		if (invoice.getDispatchDetail().getTransporter() != null) {
			Transporter t = transporterDao.findOne(invoice.getDispatchDetail().getTransporter().getTransporterId());
			if (t != null) {
				invoice.getDispatchDetail().setTransporter(t);
			}
		}

		if (invoice.getDispatchDetail().getVehicle() != null) {
			Vehicle v = vehicleDao.findOne(invoice.getDispatchDetail().getVehicle().getVehicleNumber());
			if (v != null) {
				invoice.getDispatchDetail().setVehicle(v);
			}
		}
	}

	public void updatePurchaseOrderStatus(Invoice invoice, String status) {
		invoice.setPurchaseOrder(purchaseOrderDao.findOne(invoice.getPurchaseOrder().getPurchaseOrderId()));
		invoice.getPurchaseOrder().setOrderStatus(status);
		invoice.getPurchaseOrder().setOrderStatusDate(new Date());
		invoice.getPurchaseOrder().getItems();
		purchaseOrderDao.save(invoice.getPurchaseOrder());
	}

}
