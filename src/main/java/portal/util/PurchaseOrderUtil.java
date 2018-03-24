package portal.util;

import java.util.ArrayList;
import java.util.List;

import portal.models.PurchaseOrder;
import portal.models.constants.OrderStatuses;

public class PurchaseOrderUtil {

	public static List<PurchaseOrder> getPendingOrder(List<PurchaseOrder> purchaseOrders){
		List<PurchaseOrder> pendingOrders = new ArrayList<PurchaseOrder>();
		for(PurchaseOrder order: purchaseOrders) {
			if(OrderStatuses.isPending(order.getOrderStatus())) {
				pendingOrders.add(order);
			}
		}
		return pendingOrders;
	}
	
}
