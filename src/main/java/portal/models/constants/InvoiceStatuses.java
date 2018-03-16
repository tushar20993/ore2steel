package portal.models.constants;

import java.util.ArrayList;
import java.util.List;

public final class InvoiceStatuses {
	
	public static final String LOADING = "LOADING";

	public static final String DISPATCHED = "DISPATCHED";

	public static final String HALTED = "HALTED";
	
	public static final String DELIVERED = "DELIVERED";

	public static final String REJECTED = "REJECTED";
	
	public static final String COMPLETED = "COMPLETED";
		
	public static List<String> getAll() {
		List<String> statuses = new ArrayList<String>();
		statuses.add(LOADING);
		statuses.add(DISPATCHED);
		statuses.add(HALTED);
		statuses.add(DELIVERED);
		statuses.add(REJECTED);
		statuses.add(COMPLETED);
		return statuses;
	}
	
	public static boolean isDispatched(String status) {
		if(status == null) {
			return false;
		}
		
		if(
				(status.equals(DISPATCHED)) ||
				(status.equals(HALTED)) ||
				(status.equals(DELIVERED)) || 
				(status.equals(COMPLETED)) 	
				) {
			return true;
		}
		
		return false;
	}
	
	public static boolean isValid(String status) {
		return getAll().contains(status);
	}
	
	public static boolean isDelivered(String status) {
		return (status.equals(DELIVERED) || status.equals(COMPLETED) || status.equals(REJECTED));
	}
}
