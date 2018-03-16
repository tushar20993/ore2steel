package portal.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.Invoice;

public interface InvoiceDao extends JpaRepository<Invoice, Integer>{

	Invoice findByInvoiceNumber(String invoiceNumber);

}
