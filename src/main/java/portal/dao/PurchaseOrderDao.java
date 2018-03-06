package portal.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.PurchaseOrder;
import portal.models.embeddables.PurchaseOrderId;

public interface PurchaseOrderDao extends JpaRepository<PurchaseOrder, PurchaseOrderId> {

	public Integer countByPurchaseOrderIdPurchaseOrderNumber(String purchaseOrderNumber);
	
	
	// find by company, site, PO number
	public int countByPurchaseOrderIdSiteSiteIdCompanyCompanyIdAndPurchaseOrderIdSiteSiteIdSiteIdAndPurchaseOrderIdPurchaseOrderNumber(Integer companyId, Integer siteId, String purchaseOrderNumber);

}
