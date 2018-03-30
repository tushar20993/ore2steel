package portal.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.Invoice;
import portal.models.InvoiceItem;
import portal.models.Item;

public interface InvoiceItemDao extends JpaRepository<InvoiceItem, Integer> {

	public List<InvoiceItem> findByInvoice(Invoice invoice);

	public int countByItem(Item item);

}
