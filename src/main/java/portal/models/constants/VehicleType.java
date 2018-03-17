package portal.models.constants;

import java.util.ArrayList;
import java.util.List;

public final class VehicleType {

	public static final String UNKNOWN = "UNKNOWN";
	public static final String TRAILER = "TRAILER";
	public static final String LORRY = "LORRY";
	public static final String TEMPO = "TEMPO";

	public static List<String> getAllVehicleTypes() {
		List<String> vehicleTypes = new ArrayList<String>();
		vehicleTypes.add(TRAILER);
		vehicleTypes.add(LORRY);
		vehicleTypes.add(TEMPO);
		vehicleTypes.add(UNKNOWN);
		return vehicleTypes;
	}
}
