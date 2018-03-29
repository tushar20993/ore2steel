package portal.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.Invoice;
import portal.models.PurchaseOrder;
import portal.models.Vehicle;

public interface InvoiceDao extends JpaRepository<Invoice, Integer> {

	Invoice findByInvoiceNumber(String invoiceNumber);
	
	List<Invoice> findByDispatchDetailVehicle(Vehicle vehicle);

	List<Invoice> findByPurchaseOrder(PurchaseOrder purchaseOrder);

}
