package portal.models.constants;

import java.util.*;

public final class OrderStatuses {

	public static final String ACCEPTED = "ACCEPTED";
	public static final String REJECTED = "REJECTED";

	public static final String PROCESSING = "PROCESSING";
	public static final String LOADING = "LOADING";

	public static final String PART_DISPATCHED = "PART DISPATCHED";
	public static final String DISPATCHED = "DISPATCHED";
	public static final String HALTED = "HALTED";
	
	public static final String DELIVERED = "DELIVERED";
	public static final String COMPLETED = "COMPLETED";
	
	public static List<String> getPurchaseOrderStatuses() {
		List<String> statuses = new ArrayList<String>();
		statuses.add(ACCEPTED);
		statuses.add(REJECTED);
		statuses.add(PROCESSING);
		statuses.add(LOADING);
		statuses.add(PART_DISPATCHED);
		statuses.add(DISPATCHED);
		statuses.add(HALTED);
		statuses.add(DELIVERED);
		statuses.add(COMPLETED);
		return statuses;
	}
	
	public static boolean isValid(String status) {
		return getPurchaseOrderStatuses().contains(status);
	}
}
