package portal.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.InvoiceItem;
import portal.models.Item;

public interface InvoiceItemDao extends JpaRepository<InvoiceItem, Integer>{

	int countByItem(Item item);

	
	
}
